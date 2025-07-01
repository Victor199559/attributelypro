// src/components/reports/ReportsSchedule.tsx
'use client';

import { Calendar } from 'lucide-react';

interface MasterDataState {
  user: { name: string; id: string } | null;
  account: { name: string; id: string; currency: string } | null;
  platforms: any;
  summary?: {
    total_connected: number;
    ready_percentage: number;
    overall_status: string;
  };
  isConnected: boolean;
  connectionStatus: string;
}

interface ReportsScheduleProps {
  masterData: MasterDataState;
}

export function ReportsSchedule({ masterData }: ReportsScheduleProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {masterData.isConnected ? 'Programación Automática Master Orchestrator' : 'Programación Automática'}
        </h3>
        <p className="text-gray-600 mb-6">
          {masterData.isConnected 
            ? `Configure la entrega automática de reportes con datos reales del Master Orchestrator (${masterData.summary?.total_connected || 0} plataformas conectadas)`
            : 'Configure la entrega automática de reportes'
          }
        </p>
        <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200">
          {masterData.isConnected ? 'Configurar Programación Master' : 'Configurar Programación'}
        </button>
      </div>
    </div>
  );
}