// src/app/campaigns/page.tsx
'use client';

import { useState } from 'react';
import { useStatus } from '../../contexts/StatusContext';
import { CampaignsHeader } from '../../components/campaigns/CampaignsHeader';
import { CampaignsOverview } from '../../components/campaigns/CampaignsOverview';
// import { CampaignsManager } from '../../components/campaigns/CampaignsManager';
// import { PerformanceTab } from '../../components/campaigns/PerformanceTab';
// import { AIInsightsTab } from '../../components/campaigns/AIInsightsTab';

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'manager' | 'performance' | 'ai-insights'>('overview');
  const { loading } = useStatus();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Conectando con Master Orchestrator</h3>
            <p className="text-gray-600">Cargando datos reales de campañas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header con Campaign Status */}
      <CampaignsHeader />
      
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-100">
          <div className="flex space-x-1">
            {[
              { key: 'overview', label: 'Resumen', icon: '📊' },
              { key: 'manager', label: 'Administrador', icon: '⚙️' },
              { key: 'performance', label: 'Performance', icon: '📈' },
              { key: 'ai-insights', label: 'Insights IA', icon: '🧠' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'overview' && <CampaignsOverview />}
          {activeTab === 'manager' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Administrador de Campañas</h2>
              <p className="text-gray-600">Componente en desarrollo...</p>
            </div>
          )}
          {activeTab === 'performance' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance</h2>
              <p className="text-gray-600">Componente en desarrollo...</p>
            </div>
          )}
          {activeTab === 'ai-insights' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights IA</h2>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">🚀 Neural Automatizador</h3>
                    <p className="text-purple-700 mt-1">
                      Activa la optimización automática 24/7 para todas tus campañas.
                    </p>
                  </div>
                  <a 
                    href="/neural-automatizador"
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    Ir a Neural Automatizador →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}