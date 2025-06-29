// src/app/dashboard/layout.tsx
'use client';

import { ReactNode } from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { Header } from '../../components/dashboard/Header';
import { StatusProvider } from '../../contexts/StatusContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <StatusProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar Navigation */}
          <Sidebar />
          
          {/* Main Content Area */}
          <div className="flex-1">
            <Header />
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </StatusProvider>
  );
}