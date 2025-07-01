// src/components/reports/ReportsHeader.tsx
'use client';

import { useState } from 'react';
import { 
  Activity, Plus, Download, Settings, Bell, Search, 
  CheckCircle, AlertTriangle
} from 'lucide-react';

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

interface ReportsHeaderProps {
  masterData: MasterDataState;
}

export function ReportsHeader({ masterData }: ReportsHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Título con datos del Master */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">
                  Reportes Avanzados con Datos Reales
                </h1>
                <p className="text-sm text-gray-600">
                  {masterData.isConnected && masterData.account?.name
                    ? `${masterData.account.name} • ${masterData.summary?.total_connected || 0} plataforma(s) conectada(s)`
                    : 'Reportes automatizados con IA, white-label y entrega programada'
                  }
                </p>
              </div>
            </div>

            {/* Indicador de conexión Master Orchestrator */}
            <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              masterData.isConnected 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                masterData.isConnected ? 'bg-green-500' : 'bg-red-500'
              } animate-pulse`}></div>
              {masterData.isConnected ? 'Master Orchestrator Online' : 'Master Orchestrator Offline'}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Búsqueda rápida */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar reportes..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>

            {/* Notificaciones */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notificaciones de Reportes</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">Reporte Executive Performance generado</p>
                          <p className="text-xs text-gray-500">Hace 5 minutos</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">Attribution Analysis programado para mañana</p>
                          <p className="text-xs text-gray-500">Hace 1 hora</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">3 reportes descargados hoy</p>
                          <p className="text-xs text-gray-500">Hace 2 horas</p>
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

            {/* Botón principal */}
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Reporte Real
            </button>

            {/* Exportar todo */}
            <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Exportar Todo
            </button>

            {/* Configuración */}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Estado del Master Orchestrator */}
      <div className={`px-6 py-3 border-t ${
        masterData.isConnected 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
          : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
      }`}>
        <div className="flex items-center">
          {masterData.isConnected ? (
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
          )}
          <div>
            <h4 className={`font-semibold ${masterData.isConnected ? 'text-green-900' : 'text-red-900'}`}>
              {masterData.isConnected ? 'Master Orchestrator Conectado ✅' : 'Master Orchestrator Desconectado ❌'}
            </h4>
            <p className={`text-sm ${masterData.isConnected ? 'text-green-700' : 'text-red-700'}`}>
              {masterData.connectionStatus}
            </p>
            {masterData.isConnected && masterData.summary && (
              <div className="text-sm text-green-700 mt-1">
                📊 Completado: {masterData.summary.ready_percentage?.toFixed(1)}% • 
                🔗 Plataformas: {masterData.summary.total_connected} • 
                📈 Estado: {masterData.summary.overall_status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}