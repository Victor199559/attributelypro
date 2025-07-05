// src/app/api/auth/verify-pin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Mismo store que send-pin (en producción sería compartido via Redis)
const pinStore = new Map<string, { pin: string; expires: number; attempts: number }>();

// Crear cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(request: NextRequest) {
  try {
    const { email, pin, password, name } = await request.json();

    console.log('🔍 Verificando PIN para:', email);

    if (!email || !pin || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email, PIN y contraseña son requeridos'
      }, { status: 400 });
    }

    // Verificar PIN
    const storedPinData = pinStore.get(email);
    if (!storedPinData) {
      return NextResponse.json({
        success: false,
        message: 'Código no encontrado o expirado'
      }, { status: 400 });
    }

    if (Date.now() > storedPinData.expires) {
      pinStore.delete(email);
      return NextResponse.json({
        success: false,
        message: 'Código expirado'
      }, { status: 400 });
    }

    if (storedPinData.pin !== pin) {
      return NextResponse.json({
        success: false,
        message: 'Código incorrecto'
      }, { status: 400 });
    }

    console.log('✅ PIN verificado correctamente');

    if (!supabase) {
      return NextResponse.json({
        success: false,
        message: 'Error de configuración del servidor'
      }, { status: 500 });
    }

    // Verificar si el usuario ya existe
    const { data: existingUser, error: checkError } = await supabase
      .from('attributelypro_users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'El usuario ya existe'
      }, { status: 409 });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      // Crear usuario en Supabase Auth
      console.log('🔍 Creando usuario en Supabase Auth...');
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true // Email ya verificado con PIN
      });

      if (authError) {
        console.error('❌ Error en Supabase Auth:', authError);
        return NextResponse.json({
          success: false,
          message: 'Error creando cuenta de usuario'
        }, { status: 500 });
      }

      console.log('✅ Usuario creado en Supabase Auth:', authUser.user?.id);

      // Crear registro en tabla de usuarios
      const { data: userData, error: userError } = await supabase
        .from('attributelypro_users')
        .insert({
          email,
          password_hash: hashedPassword,
          name: name || email.split('@')[0],
          plan: 'free',
          supabase_user_id: authUser.user?.id
        })
        .select()
        .single();

      if (userError) {
        console.error('❌ Error en base de datos:', userError);
        // Si falla la tabla, eliminar el usuario auth
        await supabase.auth.admin.deleteUser(authUser.user!.id);
        return NextResponse.json({
          success: false,
          message: 'Error guardando datos de usuario'
        }, { status: 500 });
      }

      // Limpiar PIN usado
      pinStore.delete(email);

      console.log('✅ Usuario registrado exitosamente:', userData.email);

      return NextResponse.json({
        success: true,
        message: 'Usuario registrado exitosamente',
        user: {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          plan: userData.plan
        }
      });

    } catch (error: any) {
      console.error('❌ Error creando usuario:', error);
      return NextResponse.json({
        success: false,
        message: 'Error interno creando usuario'
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('❌ Error en verify-pin:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor'
    }, { status: 500 });
  }
}