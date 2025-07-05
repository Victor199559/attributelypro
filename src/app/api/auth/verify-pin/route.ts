// src/app/api/auth/verify-pin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/hybrid-database';

export async function POST(request: NextRequest) {
  try {
    const { email, pin, password, name } = await request.json();

    console.log('🔍 Verifying PIN for:', email);

    // Verificar PIN
    const pinResult = await db.verifyPIN(email, pin);
    
    if (!pinResult.success) {
      return NextResponse.json({
        success: false,
        message: 'Invalid or expired PIN'
      }, { status: 400 });
    }

    console.log('✅ PIN verified successfully, proceeding to create user');

    // Crear usuario
    const userResult = await db.createUser({
      email,
      password,
      name
    });

    if (!userResult.success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to create user'
      }, { status: 500 });
    }

    console.log('✅ User created successfully');

    // Status del sistema
    const status = db.getStatus();
    console.log('🎯 Database status:', status);

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: userResult.user,
      systemStatus: status
    });

  } catch (error: any) {
    console.error('❌ Error in verify-pin:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}