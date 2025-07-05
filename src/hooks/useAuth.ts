// src/hooks/useAuth.ts
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAttributelyPro } from '@/components/providers/AuthProvider';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { quintupleAIAccess, userTier } = useAttributelyPro();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  // Login con Google
  const loginWithGoogle = async () => {
    try {
      const result = await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: false 
      });
      
      if (result?.ok) {
        router.push('/dashboard');
      }
      
      return result;
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
  };

  // Login con Facebook
  const loginWithFacebook = async () => {
    try {
      const result = await signIn('facebook', { 
        callbackUrl: '/dashboard',
        redirect: false 
      });
      
      if (result?.ok) {
        router.push('/dashboard');
      }
      
      return result;
    } catch (error) {
      console.error('Error logging in with Facebook:', error);
      throw error;
    }
  };

  // Login con credenciales (email/password)
  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        router.push('/dashboard');
      }

      return result;
    } catch (error) {
      console.error('Error logging in with credentials:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: false 
      });
      
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  // Obtener información del usuario
  const getUserInfo = () => {
    if (!session?.user) return null;

    return {
      id: session.user.email || 'unknown', // NextAuth no tiene id por defecto
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  };

  // Check si el usuario está autenticado
  const requireAuth = () => {
    if (!isAuthenticated && !isLoading) {
      router.push('/login');
      return false;
    }
    return true;
  };

  return {
    // Estado
    session,
    isLoading,
    isAuthenticated,
    user: getUserInfo(),
    
    // AttributelyPro específico
    quintupleAIAccess,
    userTier,
    
    // Métodos de autenticación
    loginWithGoogle,
    loginWithFacebook,
    loginWithCredentials,
    logout,
    
    // Utilidades
    requireAuth,
  };
}