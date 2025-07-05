// src/components/attribution/AttributionHeader.tsx
'use client';

import Link from 'next/link';
import { 
  ArrowLeft, Brain, Filter, Download, RefreshCw, CheckCircle,
  TrendingUp, Target, Zap, Settings, AlertTriangle, Database,
  Wifi, Activity, Clock, Eye
} from 'lucide-react';

interface MasterOrchestratorData {
  status: string;
  platforms: {
    quintuple_ai: {
      connected: boolean;
      completion_percentage: number;
      ready_for_campaigns: boolean;
      missing_configs: string[];
    };
    meta_ads: {
      connected: boolean;
      account_name: string;
      account_id: string;
      has_campaigns: boolean;
      total_campaigns: number;
    };
    google_ads: {
      connected: boolean;
      customer_id: string;
      accessible_customers: number;
    };
    tiktok_ads: {
      connected: boolean;
      advertiser_count: number;
    };
    youtube_ads: {
      connected: boolean;
    };
    micro_budget: {
      configured: boolean;
    };
  };
  summary: {
    total_connected: number;
    ready_percentage: number;
    recommended_action: string;
  };
}

type AttributionModel = 'neural-ai' | 'first-click' | 'last-click' | 'linear' | 'time-decay' | 'position-based';

interface AttributionHeaderProps {
  masterData: MasterOrchestratorData | null;
  connectionStatus: string;
  selectedModel: AttributionModel;
}

export function AttributionHeader({ masterData, connectionStatus, selectedModel }: AttributionHeaderProps) {
  
  // Determinar el estado del sistema
  const getSystemStatus = () => {
    if (!masterData) {
      return {
        color: 'red',
        text: 'Desconectado',
        icon: AlertTriangle,
        description: 'Master Orchestrator no disponible'
      };
    }

    if (masterData.summary.total_connected === 0) {
      return {
        color: 'yellow',
        text: 'Setup Requerido',
        icon: Settings,
        description: 'Conecta plataformas para activar Attribution'
      };
    }

    return {
      color: 'green',
      text: 'Neural Engine Activo',
      icon: CheckCircle,
      description: `${masterData.summary.total_connected} plataformas conectadas`
    };
  };

  const systemStatus = getSystemStatus();

  // Obtener info del modelo seleccionado
  const getModelInfo = () => {
    const models = {
      'neural-ai': { name: 'Neural IA', confidence: 96, icon: Brain },
      'first-click': { name: 'Primer Clic', confidence: 72, icon: Target },
      'last-click': { name: 'Último Clic', confidence: 68, icon: TrendingUp },
      'linear': { name: 'Lineal', confidence: 78, icon: Activity },
      'time-decay': { name: 'Time Decay', confidence: 82, icon: Clock },
      'position-based': { name: 'Position Based', confidence: 85, icon: Eye }
    };
    return models[selectedModel];
  };

  const modelInfo = getModelInfo();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Title + Status */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            
            <div>
              <div className="flex items-center space-x-3">
                <Brain className="w-7 h-7 text-purple-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Quintuple AI Memory
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Neural Attribution Engine • 
                    <span className="ml-1 font-medium">{connectionStatus}</span>
                  </p>
                </div>
              </div>

              {/* System Status Indicator */}
              <div className="flex items-center space-x-2 mt-3">
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                  systemStatus.color === 'green' ? 'bg-green-100 text-green-700' :
                  systemStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  <systemStatus.icon className="w-3 h-3" />
                  <span>{systemStatus.text}</span>
                </div>
                
                {masterData && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Database className="w-3 h-3" />
                    <span>{systemStatus.description}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Model Info + Actions */}
          <div className="flex items-center space-x-4">
            {/* Selected Model Info */}
            <div className="hidden md:flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2">
              <modelInfo.icon className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">{modelInfo.name}</div>
                <div className="text-xs text-gray-600">{modelInfo.confidence}% confidence</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtros</span>
              </button>
              
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar</span>
              </button>
              
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Platform Connections Status */}
        {masterData && masterData.summary.total_connected > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Plataformas Conectadas</h3>
              <span className="text-xs text-gray-500">
                {masterData.summary.total_connected} de 4 activas
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mt-2">
              {masterData.platforms.meta_ads.connected && (
                <div className="flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-1.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-medium text-blue-700">Meta Ads</span>
                  <span className="text-xs text-blue-600">
                    {masterData.platforms.meta_ads.total_campaigns} campañas
                  </span>
                </div>
              )}
              
              {masterData.platforms.google_ads.connected && (
                <div className="flex items-center space-x-2 bg-green-50 rounded-lg px-3 py-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">Google Ads</span>
                  <span className="text-xs text-green-600">
                    {masterData.platforms.google_ads.accessible_customers} cuentas
                  </span>
                </div>
              )}
              
              {masterData.platforms.tiktok_ads.connected && (
                <div className="flex items-center space-x-2 bg-pink-50 rounded-lg px-3 py-1.5">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-xs font-medium text-pink-700">TikTok Ads</span>
                  <span className="text-xs text-pink-600">
                    {masterData.platforms.tiktok_ads.advertiser_count} advertisers
                  </span>
                </div>
              )}
              
              {masterData.platforms.quintuple_ai.connected && (
                <div className="flex items-center space-x-2 bg-purple-50 rounded-lg px-3 py-1.5">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-purple-700">Quintuple AI</span>
                  <span className="text-xs text-purple-600">
                    {masterData.platforms.quintuple_ai.completion_percentage}% activo
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Setup Required Message */}
        {masterData && masterData.summary.total_connected === 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Settings className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Setup Requerido</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Conecta tus plataformas publicitarias (Meta, Google, TikTok) para activar 
                    Quintuple AI Memory y empezar a hacer attribution neural.
                  </p>
                  <Link 
                    href="/dashboard" 
                    className="text-sm text-yellow-800 font-medium mt-2 inline-flex items-center hover:text-yellow-900"
                  >
                    Ir a Dashboard para conectar →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}