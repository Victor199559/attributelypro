// src/components/audiences/AudiencesHeader.tsx
'use client';

import Link from 'next/link';
import { Brain, Plus, Download, ArrowLeft } from 'lucide-react';
import { useStatus } from '../../contexts/StatusContext';

export function AudiencesHeader() {
  const { masterStatus, quintupleStatus, connectionError } = useStatus();

  const isNeuralReady = (quintupleStatus?.active_platforms || 0) >= 3 && !connectionError;

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Ya no necesitamos el botón de "Volver al Dashboard" porque tenemos sidebar */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">
                  Motor de Audiencias Neural
                </h1>
                <p className="text-sm text-gray-600">
                  {connectionError ? 'Master Orchestrator offline' : 'Conectado al Master Orchestrator'}
                </p>
              </div>
            </div>

            {/* Neural Status Indicators */}
            <div className="flex items-center space-x-2">
              {connectionError ? (
                <div className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
                  Master Offline
                </div>
              ) : (
                <>
                  <div className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <div className="w-2 h-2 rounded-full mr-2 bg-green-500 animate-pulse"></div>
                    Master Conectado
                  </div>
                  <div className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    <Brain className="w-3 h-3 mr-1" />
                    {quintupleStatus?.real_data_percentage || 0}% Neural Ready
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                isNeuralReady
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isNeuralReady}
            >
              <Plus className="w-4 h-4 mr-2" />
              {isNeuralReady ? 'Crear con IA' : 'Setup Requerido'}
            </button>
            <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Exportar Datos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}