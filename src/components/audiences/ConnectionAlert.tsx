// src/components/audiences/ConnectionAlert.tsx
'use client';

import { Brain, AlertTriangle, CheckCircle } from 'lucide-react';
import { useStatus } from '../../contexts/StatusContext';

export function ConnectionAlert() {
  const { connectionError, quintupleStatus, masterStatus } = useStatus();

  if (connectionError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
          <div>
            <h4 className="font-semibold text-red-900">
              ⚠️ Master Orchestrator No Disponible
            </h4>
            <p className="text-sm text-red-700">
              No se puede conectar con /api/master. Las audiencias neurales requieren conexión activa.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const neuralCompletion = quintupleStatus?.real_data_percentage || 0;
  const isNeuralReady = (quintupleStatus?.active_platforms || 0) >= 3;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
      <div className="flex items-center">
        <Brain className="w-5 h-5 text-purple-600 mr-3" />
        <div>
          <h4 className="font-semibold text-purple-900">
            🚀 Motor de Descubrimiento Neural {isNeuralReady ? 'Activo' : 'Configurando'}
          </h4>
          <p className="text-sm text-purple-700">
            {isNeuralReady 
              ? `Quintuple AI al ${neuralCompletion}% - Listo para descubrir audiencias con IA avanzada`
              : `Quintuple AI al ${neuralCompletion}% - Completa setup para activar descubrimiento neural`
            }
          </p>
        </div>
        <div className="ml-auto">
          {isNeuralReady ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          )}
        </div>
      </div>
    </div>
  );
}