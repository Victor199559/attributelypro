// src/components/analytics/AnalyticsHeader.tsx
'use client';

import { useState } from 'react';
import { 
  BarChart3, Download, RefreshCw, Settings, CheckCircle, 
  AlertTriangle
} from 'lucide-react';

interface MasterOrchestratorData {
  status: string;
  platforms: {
    meta_ads: {
      connected: boolean;
      account_name: string;
      account_id: string;
    };
    google_ads: {
      connected: boolean;
      customer_id: string;
    };
    tiktok_ads: {
      connected: boolean;
    };
  };
  summary: {
    total_connected: number;
    ready_percentage: number;
  };
}

interface AnalyticsHeaderProps {
  masterData: MasterOrchestratorData | null;
  dateRange: string;
  setDateRange: (range: string) => void;
  connectionStatus: string;
}

export function AnalyticsHeader({ 
  masterData, 
  dateRange, 
  setDateRange, 
  connectionStatus 
}: AnalyticsHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard Reales</h1>
                <p className="text-sm text-gray-600">
                  {masterData?.platforms?.meta_ads?.account_name
                    ? `${masterData.platforms.meta_ads.account_name} • ${masterData.summary?.total_connected || 0} plataforma(s) conectada(s)`
                    : 'Analíticas avanzadas con insights de IA y attribution'
                  }
                </p>
              </div>
            </div>

            <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              masterData?.platforms
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                masterData?.platforms ? 'bg-green-500' : 'bg-yellow-500'
              } animate-pulse`}></div>
              {masterData?.platforms ? 'Datos Reales Master' : 'Datos Demo'}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)} 
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
              <option value="12m">Últimos 12 meses</option>
            </select>
            <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sincronizar
            </button>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Alert de conexión Master */}
      {masterData?.platforms && (
        <div className="px-6 py-3 border-t bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <h4 className="font-semibold text-green-900">✅ Master Orchestrator Conectado - Analytics Reales</h4>
              <p className="text-sm text-green-700">
                Mostrando analytics en tiempo real del Master Orchestrator. 
                {masterData.summary?.total_connected || 0} plataforma(s) conectada(s) • 
                Sistema {masterData.summary?.ready_percentage || 0}% completo.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}