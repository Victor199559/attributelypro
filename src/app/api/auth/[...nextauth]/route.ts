// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import { createClient } from '@supabase/supabase-js';

// Verificar variables de entorno con fallbacks seguros
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

// Crear cliente Supabase solo si las variables están disponibles
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

const authOptions = {
  // Solo usar SupabaseAdapter si tenemos las variables necesarias
  ...(supabaseUrl && supabaseServiceKey && {
    adapter: SupabaseAdapter({
      url: supabaseUrl,
      secret: supabaseServiceKey,
    })
  }),
  
  providers: [
    // Solo agregar Google si tenemos las credenciales
    ...(googleClientId && googleClientSecret ? [
      GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      })
    ] : []),
    
    // Solo agregar Facebook si tenemos las credenciales
    ...(facebookClientId && facebookClientSecret ? [
      FacebookProvider({
        clientId: facebookClientId,
        clientSecret: facebookClientSecret,
      })
    ] : []),
    
    // Credentials provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !supabase) {
          return null;
        }

        try {
          // Verificar credenciales con Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error || !data.user) {
            return null;
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.name || data.user.email,
            image: data.user.user_metadata?.avatar_url,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async signIn({ user, account, profile }: any) {
      try {
        // Solo registrar si tenemos las variables necesarias
        if (account?.provider && user.email && process.env.NEXTAUTH_URL) {
          await fetch(`${process.env.NEXTAUTH_URL}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              provider: account.provider,
              avatar: user.image,
              quintuple_ai_access: true,
              timestamp: new Date().toISOString()
            })
          }).catch(console.error);
        }
        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return true; // Permitir login aunque falle el registro interno
      }
    },

    async session({ session, token }: any) {
      // Solo agregar datos adicionales si tenemos acceso a la base de datos
      if (session.user?.email && process.env.NEXTAUTH_URL) {
        try {
          const userData = await fetch(`${process.env.NEXTAUTH_URL}/api/users/profile?email=${session.user.email}`)
            .then(res => res.json())
            .catch(() => null);

          return {
            ...session,
            user: {
              ...session.user,
              attributelyPro: {
                hasQuintupleAccess: userData?.quintuple_ai_access || true,
                platforms: userData?.connected_platforms || [],
                membership: userData?.membership || 'free',
                joinDate: userData?.created_at || new Date().toISOString()
              }
            }
          };
        } catch (error) {
          console.error('Session callback error:', error);
        }
      }
      return session;
    },

    async jwt({ token, user, account }: any) {
      // Almacenar datos adicionales en el token
      if (user) {
        token.attributelyPro = {
          hasQuintupleAccess: true,
          provider: account?.provider || 'credentials'
        };
      }
      return token;
    },

    async redirect({ url, baseUrl }: any) {
      // Redirigir después del login
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      
      // Redirigir a elegir-modo para nuevos usuarios
      return `${baseUrl}/elegir-modo`;
    }
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },

  secret: nextAuthSecret,
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };