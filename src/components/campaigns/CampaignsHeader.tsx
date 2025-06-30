// src/components/campaigns/CampaignsHeader.tsx
'use client';

import { useState } from 'react';
import { Megaphone, Plus, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { useStatus } from '../../contexts/StatusContext';
import { CreateCampaignModal } from './CreateCampaignModal';

export function CampaignsHeader() {
  const { masterData, connectionError } = useStatus();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const connectedPlatforms = masterData ? Object.values(masterData).filter(Boolean).length : 0;
  const readyPercentage = masterData?.summary?.ready_percentage || 0;

  return (
    <>
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Megaphone className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    Gestión de Campañas Reales
                  </h1>
                  <p className="text-sm text-gray-600">
                    {connectionError 
                      ? 'Master Orchestrator offline'
                      : `${connectedPlatforms} plataforma(s) conectada(s) • ${readyPercentage}% listo`
                    }
                  </p>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center space-x-2">
                {connectionError ? (
                  <div className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Master Offline
                  </div>
                ) : (
                  <>
                    <div className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <div className="w-2 h-2 rounded-full mr-2 bg-green-500 animate-pulse"></div>
                      Datos Reales
                    </div>
                    <div className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {readyPercentage}% Ready
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={() => window.location.reload()} 
                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sincronizar
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nueva Campaña
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <CreateCampaignModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </>
  );
}