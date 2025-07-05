// src/app/api/auth/send-pin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Store temporal para PINs (en producción usarías Redis o base de datos)
const pinStore = new Map<string, { pin: string; expires: number; attempts: number }>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({
        success: false,
        message: 'Email es requerido'
      }, { status: 400 });
    }

    // Verificar rate limit (máximo 3 intentos por hora)
    const existingPin = pinStore.get(email);
    if (existingPin && existingPin.attempts >= 3) {
      return NextResponse.json({
        success: false,
        message: 'Demasiados intentos. Intenta más tarde.'
      }, { status: 429 });
    }

    // Generar PIN de 6 dígitos
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutos

    // Guardar PIN temporalmente
    pinStore.set(email, {
      pin,
      expires,
      attempts: existingPin ? existingPin.attempts + 1 : 1
    });

    console.log('📧 PIN generado para', email, ':', pin); // Para debug

    try {
      // Enviar email
      const { data, error } = await resend.emails.send({
        from: 'AttributelyPro <noreply@resend.dev>', // En producción usa tu dominio
        to: [email],
        subject: 'Código de Verificación - AttributelyPro',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">🔐 Código de Verificación</h2>
            <p>Tu código de verificación para AttributelyPro es:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h1 style="color: #1f2937; font-size: 32px; letter-spacing: 4px; margin: 0;">${pin}</h1>
            </div>
            <p style="color: #6b7280;">Este código expira en 10 minutos.</p>
            <p style="color: #6b7280;">Si no solicitaste este código, puedes ignorar este email.</p>
            <br>
            <p>Saludos,<br><strong>Equipo AttributelyPro</strong></p>
          </div>
        `
      });

      if (error) {
        console.error('❌ Error enviando email:', error);
        return NextResponse.json({
          success: false,
          message: 'Error enviando email'
        }, { status: 500 });
      }

      console.log('✅ Email enviado exitosamente:', data?.id);

      return NextResponse.json({
        success: true,
        message: 'Código enviado exitosamente',
        // Solo en desarrollo mostrar el PIN
        ...(process.env.NODE_ENV === 'development' && { pin })
      });

    } catch (emailError) {
      console.error('❌ Error de Resend:', emailError);
      return NextResponse.json({
        success: false,
        message: 'Error del servicio de email'
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('❌ Error en send-pin:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor'
    }, { status: 500 });
  }
}

// Limpiar PINs expirados (ejecutar periódicamente)
export async function GET() {
  const now = Date.now();
  let removed = 0;
  
  for (const [email, data] of pinStore.entries()) {
    if (data.expires < now) {
      pinStore.delete(email);
      removed++;
    }
  }
  
  return NextResponse.json({
    status: 'cleanup completed',
    removed,
    remaining: pinStore.size
  });
}