// src/app/api/users/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    const { email, name, provider, avatar, quintuple_ai_access } = userData;

    // Verificar si el usuario ya existe
    const { data: existingUser } = await supabase
      .from('attributelypro_users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({
        status: 'exists',
        message: 'User already registered',
        user: existingUser
      });
    }

    // Crear nuevo usuario en AttributelyPro
    const { data: newUser, error } = await supabase
      .from('attributelypro_users')
      .insert([
        {
          email,
          name,
          provider,
          avatar_url: avatar,
          quintuple_ai_access: quintuple_ai_access || true,
          connected_platforms: [],
          membership: 'free',
          total_campaigns: 0,
          total_revenue: 0,
          join_source: 'web_signup',
          last_login: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          // Analytics para remarketing
          utm_source: null,
          utm_campaign: null,
          utm_medium: null,
          referrer: null,
          // Flags para marketing automation
          email_verified: provider !== 'credentials',
          onboarding_completed: false,
          first_campaign_created: false,
          first_conversion: false
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Trigger welcome email y onboarding sequence
    await triggerWelcomeSequence(newUser);

    // Notificar a tu API Master sobre nuevo usuario
    await notifyMasterOrchestrator(newUser);

    return NextResponse.json({
      status: 'success',
      message: 'User registered successfully',
      user: newUser
    });

  } catch (error) {
    console.error('User registration error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to register user'
    }, { status: 500 });
  }
}

// Trigger welcome email sequence
async function triggerWelcomeSequence(user: any) {
  try {
    // Aquí integrarías con tu sistema de email marketing
    // Por ejemplo: Resend, SendGrid, etc.
    
    const welcomeData = {
      user_id: user.id,
      email: user.email,
      name: user.name,
      sequence: 'welcome_onboarding',
      trigger: 'signup',
      quintuple_access: user.quintuple_ai_access
    };

    // Placeholder para tu sistema de email
    console.log('🎉 Welcome sequence triggered:', welcomeData);
    
  } catch (error) {
    console.error('Welcome sequence error:', error);
  }
}

// Notificar a tu Master Orchestrator
async function notifyMasterOrchestrator(user: any) {
  try {
    // Conectar con tu API Master para analytics
    await fetch('http://3.16.108.83:8000/users/new-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        email: user.email,
        provider: user.provider,
        quintuple_access: user.quintuple_ai_access,
        timestamp: user.created_at
      })
    }).catch(console.error);

  } catch (error) {
    console.error('Master notification error:', error);
  }
}

// Profile endpoint
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from('attributelypro_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}