'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, useContext, ReactNode } from 'react';

// Context para datos adicionales de AttributelyPro
interface AttributelyProContextType {
  // Aquí puedes agregar datos específicos de tu app
  quintupleAIAccess: boolean;
  userTier: 'free' | 'pro' | 'enterprise';
}

const AttributelyProContext = createContext<AttributelyProContextType>({
  quintupleAIAccess: true,
  userTier: 'free'
});

export const useAttributelyPro = () => useContext(AttributelyProContext);

interface AuthProviderProps {
  children: ReactNode;
  session?: any;
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider session={session}>
      <AttributelyProContext.Provider 
        value={{
          quintupleAIAccess: true,
          userTier: 'free'
        }}
      >
        {children}
      </AttributelyProContext.Provider>
    </SessionProvider>
  );
}