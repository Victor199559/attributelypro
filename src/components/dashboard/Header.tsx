// src/components/dashboard/Header.tsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Bell, Search, Download, RefreshCw, Settings, User,
  Crown, Zap, Activity, AlertCircle, CheckCircle,
  Filter, Calendar, ExternalLink
} from 'lucide-react';
import { useStatus } from '@/contexts/StatusContext';

const pageNames: Record<string, string> = {
  '/dashboard': 'Panel Principal',
  '/dashboard/audiences': 'Audiencias',
  '/dashboard/campaigns': 'Campañas',
  '/dashboard/attribution': 'Attribution',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/reports': 'Reportes',
  '/dashboard/ai-insights': 'AI Insights',
  '/dashboard/profeta-creativo': 'Profeta Creativo',
  '/dashboard/neural-automatizador': 'Neural Automatizador',
  '/dashboard/fraud-detection': 'Fraud Detection',
  '/dashboard/roi-predictor': 'ROI Predictor',
  '/dashboard/whatsapp': 'WhatsApp Bot',
  '/dashboard/cross-device': 'Cross-Device Tracking',
  '/dashboard/influencer': 'Influencer Attribution',
  '/dashboard/competitor': 'Competitor Intelligence',
  '/dashboard/settings': 'Configuración',
};

export function Header() {
  const pathname = usePathname();
  const [timeRange, setTimeRange] = useState('30d');
  const [showNotifications, setShowNotifications] = useState(false);
  const { masterStatus, quintupleStatus, lastUpdate, refreshData } = useStatus();

  const getCurrentPageName = () => {
    if (typeof pathname === 'string' && pathname in pageNames) {
      return pageNames[pathname];
    }
    return 'Dashboard';
  };

  const getStatusColor = (status: string) => {
    if (status === 'online' || status === 'connected' || status === 'ACHIEVED') return 'bg-green-500';
    if (status === 'warning' || status === 'ACTIVE') return 'bg-yellow-500';
    if (status === 'error' || status === 'offline') return 'bg-red-500';
    return 'bg-gray-500';
  };

  const getStatusText = () => {
    if (masterStatus === 'offline') return '❌ Master Offline';
    if (quintupleStatus?.unicorn_status === 'ACHIEVED') {
      return `🦄 QUINTUPLE AI ACHIEVED (${quintupleStatus.active_platforms}/5)`;
    }
    if ((quintupleStatus?.active_platforms ?? 0) >= 3) {
      return `🤖 Multi-AI Active (${quintupleStatus?.active_platforms ?? 0}/5)`;
    }
    return `⚡ Configurando (${quintupleStatus?.active_platforms || 0}/5)`;
  };

  const getStatusDescription = () => {
    if (masterStatus === 'offline') {
      return '🚨 Master no disponible - Verifica la conexión';
    }
    if (quintupleStatus?.unicorn_status === 'ACHIEVED') {
      return '🦄 QUINTUPLE AI ACHIEVED - World\'s First 5-Platform Attribution System!';
    }
    return `🔗 Master conectado - ${quintupleStatus?.real_data_percentage || 0}% completado`;
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Page Title and Status */}
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                {getCurrentPageName()}
                {quintupleStatus?.unicorn_status === 'ACHIEVED' && (
                  <Crown className="ml-2 h-6 w-6 text-yellow-500" />
                )}
              </h1>
              
              {/* Status Indicators */}
              <div className="flex items-center space-x-4">
                {/* Master Orchestrator Status */}
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(masterStatus)}`}></div>
                  <span className="text-xs text-gray-600 font-medium">
                    Master: {masterStatus === 'online' ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
                
                {/* Quintuple AI Status */}
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${
                    quintupleStatus?.unicorn_status === 'ACHIEVED' 
                      ? 'bg-purple-500 animate-pulse' 
                      : getStatusColor(quintupleStatus?.unicorn_status || 'pending')
                  }`}></div>
                  <span className={`text-xs font-medium ${
                    quintupleStatus?.unicorn_status === 'ACHIEVED' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                      : 'text-gray-600'
                  }`}>
                    {getStatusText()}
                  </span>
                </div>

                {/* Last Update */}
                {lastUpdate && (
                  <div className="flex items-center space-x-1">
                    <RefreshCw className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {lastUpdate}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Status Description */}
            <p className="mt-1 text-sm text-gray-600">
              {getStatusDescription()}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </div>

            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="24h">Últimas 24h</option>
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
              <option value="1y">Último año</option>
            </select>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">3</span>
                </span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">Notificaciones</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Meta Campaign Optimized
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            CTR mejorado 23% automáticamente
                          </p>
                          <span className="text-xs text-gray-400">Hace 5 min</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Neural Automatizador Activo
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Optimizando budgets en tiempo real
                          </p>
                          <span className="text-xs text-gray-400">Hace 12 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            New Attribution Events
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            47 nuevos eventos procesados
                          </p>
                          <span className="text-xs text-gray-400">Hace 25 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshData}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Actualizar datos"
            >
              <RefreshCw className="h-5 w-5 text-gray-600" />
            </button>

            {/* Export Button */}
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>

            {/* Settings Button */}
            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}