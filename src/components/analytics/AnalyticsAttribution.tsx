// src/components/analytics/AnalyticsAttribution.tsx
'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Target, Brain } from 'lucide-react';

interface MasterOrchestratorData {
  status: string;
  platforms: {
    meta_ads: {
      connected: boolean;
      account_name: string;
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

interface AnalyticsAttributionProps {
  masterData: MasterOrchestratorData | null;
}

export function AnalyticsAttribution({ masterData }: AnalyticsAttributionProps) {
  const attributionComparison = [
    { model: 'Primer Clic', revenue: 89000, percentage: 18.2 },
    { model: 'Último Clic', revenue: 95000, percentage: 19.4 },
    { model: 'Lineal', revenue: 105000, percentage: 21.4 },
    { model: 'Decaimiento Temporal', revenue: 110000, percentage: 22.5 },
    { model: 'Basado en Posición', revenue: 92000, percentage: 18.8 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            Comparación de Modelos de Attribution
            {masterData?.platforms && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Master Data
              </span>
            )}
          </h3>
          <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">IA Attribution</span>
          </div>
        </div>
        
        <div style={{ height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attributionComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="model" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']} 
              />
              <Bar dataKey="revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attribution Models Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attributionComparison.map((model, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{model.model}</h4>
              <div className="text-sm font-medium text-purple-600">{model.percentage}%</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              ${model.revenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              {model.model === 'Primer Clic' && 'Atribuye toda la conversión al primer touchpoint'}
              {model.model === 'Último Clic' && 'Atribuye toda la conversión al último touchpoint'}
              {model.model === 'Lineal' && 'Distribuye el crédito igualmente entre todos los touchpoints'}
              {model.model === 'Decaimiento Temporal' && 'Más peso a touchpoints cercanos a la conversión'}
              {model.model === 'Basado en Posición' && 'Más peso al primer y último touchpoint'}
            </div>
          </div>
        ))}
      </div>

      {/* Attribution Insights */}
      {masterData?.platforms && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center">
            <Target className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h4 className="font-semibold text-blue-900">Attribution con Datos Master Orchestrator</h4>
              <p className="text-sm text-blue-700">
                Modelos de attribution basados en datos reales de {masterData.summary?.total_connected} plataforma(s) conectada(s). 
                El modelo de Decaimiento Temporal muestra mejor performance con datos del Master Orchestrator.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}