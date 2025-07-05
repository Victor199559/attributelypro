// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const handler = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
    // Facebook OAuth
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    
    // Email/Password
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
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
    async signIn({ user, account, profile }) {
      try {
        // Registrar nuevo usuario en tu sistema AttributelyPro
        if (account?.provider && user.email) {
          await fetch(`${process.env.NEXTAUTH_URL}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              provider: account.provider,
              avatar: user.image,
              quintuple_ai_access: true, // Acceso a tu Quintuple AI
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

    async session({ session, token }) {
      // Agregar datos adicionales a la sesión
      if (session.user?.email) {
        try {
          // Obtener datos del usuario desde tu API Master
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

    async jwt({ token, user, account }) {
      // Almacenar datos adicionales en el token
      if (user) {
        token.attributelyPro = {
          hasQuintupleAccess: true,
          provider: account?.provider || 'credentials'
        };
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
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
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };