// src/components/dashboard/NeuralAutomatizadorCard.tsx
'use client';

import Link from 'next/link';
import { Settings, Zap, Activity, Crown } from 'lucide-react';
import { useStatus } from '../../contexts/StatusContext';

export function NeuralAutomatizadorCard() {
  const { quintupleStatus, realAccountData, attributionData } = useStatus();

  const eventsCount = attributionData?.events_count || 0;
  const savingsPercentage = realAccountData?.microBudget.savings_calculated || 0;

  const getStatusIcon = () => {
    if (quintupleStatus?.unicorn_status === 'ACHIEVED') return '🦄';
    if ((quintupleStatus?.active_platforms ?? 0) >= 3) return '🚀';
    return '⚡';
  };

  const getStatusText = () => {
    if (quintupleStatus?.unicorn_status === 'ACHIEVED') return 'QUINTUPLE ACHIEVED';
    if ((quintupleStatus?.active_platforms ?? 0) >= 3) return 'MULTI-AI ACTIVE';
    return 'SETTING UP';
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Robot icon con círculo amarillo - SIN VA */}
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🤖</span>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-xl font-bold">Neural Automatizador</h3>
              <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                EXCLUSIVO
              </span>
            </div>
            <p className="text-purple-100 mb-2">
              IA que optimiza campañas automáticamente 24/7 en 5 plataformas
            </p>
            
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                {quintupleStatus?.active_platforms || 0}/5 Plataformas Activas
              </span>
              <span className="flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                {savingsPercentage}% Optimización
              </span>
              <span className="flex items-center">
                <Activity className="w-3 h-3 mr-1" />
                {eventsCount} Eventos Procesados
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex flex-col space-y-2">
            <Link
              href="/neural-automatizador"
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-500 hover:to-orange-500 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center shadow-lg"
            >
              <Settings className="w-4 h-4 mr-2" />
              Entrar
            </Link>
            
            <div className="text-right">
              <div className="text-2xl font-bold mb-2">
                {getStatusIcon()}
              </div>
              <div className="text-xs opacity-90">
                {getStatusText()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar del Neural Engine */}
      <div className="mt-4 pt-4 border-t border-white border-opacity-20">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Progreso del Neural Engine</span>
          <span className="font-medium">{quintupleStatus?.real_data_percentage || 0}%</span>
        </div>
        
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${quintupleStatus?.real_data_percentage || 0}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between text-xs mt-2 opacity-90">
          <span>Meta • Google • TikTok • YouTube • Micro-Budget</span>
          <span>{quintupleStatus?.active_platforms || 0} de 5 conectadas</span>
        </div>
      </div>

      {/* Quintuple AI Achievement Badge */}
      {quintupleStatus?.unicorn_status === 'ACHIEVED' && (
        <div className="mt-4 pt-4 border-t border-white border-opacity-20">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-2 rounded-lg flex items-center justify-center font-bold text-sm">
            <Crown className="w-4 h-4 mr-2" />
            🦄 QUINTUPLE AI ACHIEVED - World's First 5-Platform Attribution System!
          </div>
        </div>
      )}
    </div>
  );
}