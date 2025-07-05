// src/app/api/test-supabase/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Verificar variables de entorno
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log('Environment check:', {
      supabaseUrl: !!supabaseUrl,
      supabaseKey: !!supabaseKey,
      urlValue: supabaseUrl
    });
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Missing environment variables',
        supabaseUrl: !!supabaseUrl,
        supabaseKey: !!supabaseKey,
        details: {
          url: supabaseUrl || 'MISSING',
          key: supabaseKey ? 'PRESENT' : 'MISSING'
        }
      }, { status: 500 });
    }
    
    // Crear cliente
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Probar conexión básica
    console.log('Testing basic connection...');
    const { data: basicTest, error: basicError } = await supabase
      .from('attributelypro_users')
      .select('count(*)')
      .limit(1);
    
    if (basicError) {
      console.error('Basic connection failed:', basicError);
      return NextResponse.json({
        error: 'Supabase basic query failed',
        details: basicError.message,
        code: basicError.code
      }, { status: 500 });
    }
    
    // Probar tabla pin_verifications
    console.log('Testing pin_verifications table...');
    const { data: pinTest, error: pinError } = await supabase
      .from('pin_verifications')
      .select('count(*)')
      .limit(1);
    
    if (pinError) {
      console.error('Pin table test failed:', pinError);
      return NextResponse.json({
        error: 'pin_verifications table not found',
        details: pinError.message,
        suggestion: 'Create the pin_verifications table in Supabase'
      }, { status: 500 });
    }
    
    // Todo funcionando
    return NextResponse.json({
      success: true,
      message: '🚀 Supabase connection successful!',
      tables: {
        attributelypro_users: 'OK',
        pin_verifications: 'OK'
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Connection test error:', error);
    return NextResponse.json({
      error: 'Connection test failed',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}