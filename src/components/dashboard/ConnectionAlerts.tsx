// src/components/dashboard/ConnectionAlerts.tsx
'use client';

import { useStatus } from '@/contexts/StatusContext';
import { AlertTriangle, CheckCircle, RefreshCw, ExternalLink } from 'lucide-react';

export function ConnectionAlerts() {
  const { connectionError, realAccountData, attributionData, refreshData } = useStatus();

  const createTestEvent = async () => {
    try {
      const AWS_BACKEND_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
        ? 'http://3.16.108.83:8000'
        : '/api/proxy';
        
      const response = await fetch(`${AWS_BACKEND_URL}/track/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'dashboard_demo',
          platform: 'meta',
          event_type: 'demo_event',
          campaign_id: 'dashboard_test'
        })
      });
      
      if (response.ok) {
        await refreshData();
      }
    } catch (error) {
      console.error('Error creating test event:', error);
    }
  };

  // Error Alert
  if (connectionError) {
    return (
      <div className="bg-red-500 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Master Orchestrator No Disponible</h3>
              <p className="text-red-100 mt-1">
                No se puede conectar con /api/master - Verifica el Master Orchestrator
              </p>
              <p className="text-red-100 text-sm mt-2">
                Estado: <code className="bg-red-600 px-2 py-1 rounded text-xs">Orchestrator Offline</code>
              </p>
            </div>
          </div>
          <button 
            onClick={refreshData} 
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg transition-all font-medium flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar Conexión</span>
          </button>
        </div>
      </div>
    );
  }

  // Success Alert
  if (realAccountData && !connectionError) {
    const eventsCount = attributionData?.events_count || 0;
    
    return (
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-4 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-white" />
            <div>
              <h3 className="font-bold text-lg">Master Conectado</h3>
              <p className="text-green-100 text-sm">
                {eventsCount} eventos • Quintuple AI activo
              </p>
            </div>
          </div>
          <button 
            onClick={createTestEvent}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg transition-all font-bold text-sm flex items-center space-x-2 shadow-md"
          >
            <span>Crear Test</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}