// src/app/api/users/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Crear cliente de Supabase de forma segura SOLO en runtime
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Starting user registration...');
    
    // Verificar que tenemos las variables necesarias
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Missing Supabase environment variables');
      return NextResponse.json({
        success: false,
        message: 'Server configuration error',
        error: 'Missing environment variables'
      }, { status: 500 });
    }

    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password are required'
      }, { status: 400 });
    }

    // Crear cliente en runtime
    const supabase = getSupabaseClient();
    
    console.log('✅ Supabase client created successfully');

    // Verificar si el usuario ya existe
    const { data: existingUser, error: checkError } = await supabase
      .from('attributelypro_users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'User already exists'
      }, { status: 409 });
    }

    // Crear usuario en Supabase Auth
    console.log('🔍 Creating user in Supabase Auth...');
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true // Email ya verificado con PIN
    });

    if (authError) {
      console.error('❌ Supabase auth error:', authError);
      return NextResponse.json({
        success: false,
        message: 'Failed to create user account',
        error: authError.message
      }, { status: 500 });
    }

    console.log('✅ User created in Supabase Auth:', authUser.user?.id);

    // Crear registro en tabla de usuarios
    const { data: userData, error: userError } = await supabase
      .from('attributelypro_users')
      .insert({
        email,
        password_hash: password, // En producción, hashear esto
        name: name || email.split('@')[0],
        plan: 'free',
        supabase_user_id: authUser.user?.id
      })
      .select()
      .single();

    if (userError) {
      console.error('❌ Database error:', userError);
      return NextResponse.json({
        success: false,
        message: 'Failed to save user data',
        error: userError.message
      }, { status: 500 });
    }

    console.log('✅ User registered successfully:', userData.email);

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        plan: userData.plan
      }
    });

  } catch (error: any) {
    console.error('❌ Registration error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}