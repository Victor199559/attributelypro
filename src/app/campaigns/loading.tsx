// src/app/campaigns/loading.tsx
'use client';

import { Megaphone } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
            <Megaphone className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Conectando al Master Orchestrator</h3>
          <p className="text-gray-600">Cargando campañas reales...</p>
        </div>
      </div>
    </div>
  );
}