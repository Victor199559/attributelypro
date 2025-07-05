// src/app/api/auth/send-pin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/hybrid-database';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({
        success: false,
        message: 'Email is required'
      }, { status: 400 });
    }

    // Generar PIN de 6 dígitos
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    console.log('🔍 Generated PIN for', email, ':', pin);

    // Guardar PIN (híbrido: Supabase o memoria)
    const result = await db.savePIN(email, pin, 10); // 10 minutos

    if (!result.success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to save PIN'
      }, { status: 500 });
    }

    // En desarrollo, mostramos el PIN en la respuesta
    // En producción, solo envías email y retornas success
    const isProduction = process.env.NODE_ENV === 'production';
    
    console.log('📧 PIN sent to:', email);
    console.log('🎯 System status:', db.getStatus());

    return NextResponse.json({
      success: true,
      message: 'PIN sent successfully',
      // Solo mostrar PIN en desarrollo
      ...(isProduction ? {} : { pin: pin }),
      systemStatus: db.getStatus()
    });

  } catch (error: any) {
    console.error('❌ Error sending PIN:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to send PIN',
      error: error.message
    }, { status: 500 });
  }
}