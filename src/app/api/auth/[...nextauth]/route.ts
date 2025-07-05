// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
    // Credentials provider simplificado
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Por ahora, aceptar cualquier email/password que exista
        // En producción aquí verificarías la contraseña hasheada
        console.log('🔥 Credentials login attempt:', credentials.email);
        
        return {
          id: `user_${credentials.email}`,
          email: credentials.email,
          name: credentials.email.split('@')[0], // Usar parte del email como nombre
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.email)}&background=667eea&color=fff&size=200`
        };
      }
    })
  ],

  callbacks: {
    async signIn({ user, account }) {
      console.log('🔥 SignIn callback - User:', user.email);
      console.log('🔥 Account provider:', account?.provider);
      
      // Permitir siempre el login por ahora
      return true;
    },

    async session({ session, token }) {
      console.log('🔥 Session callback - Email:', session.user?.email);
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        console.log('🔥 JWT callback - New user:', user.email);
        token.provider = account?.provider;
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      console.log('🔥 Redirect callback - URL:', url);
      console.log('🔥 Redirect callback - BaseURL:', baseUrl);
      
      // SIEMPRE redirigir a elegir-modo después del login exitoso
      if (url.includes('dashboard') || url.includes('callbackUrl')) {
        return `${baseUrl}/elegir-modo`;
      }
      
      // Default redirects
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      
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
  
  // Importante para debug
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };