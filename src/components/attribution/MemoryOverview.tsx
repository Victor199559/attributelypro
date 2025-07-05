// src/components/attribution/MemoryOverview.tsx
'use client';

import { 
  Brain, Database, Zap, TrendingUp, Target, Users, DollarSign,
  Activity, Smartphone, Wifi, CheckCircle, AlertTriangle, Clock,
  Eye, Shield, BarChart3, Layers, Network, Cpu, HardDrive
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

interface AttributionMetrics {
  totalRevenue: number;
  totalConversions: number;
  totalTouchpoints: number;
  crossDeviceConversions: number;
  memoryAccuracy: number;
  neuralConfidence: number;
  averageJourneyLength: number;
  whatsappConversions: number;
}

type AttributionModel = 'neural-ai' | 'first-click' | 'last-click' | 'linear' | 'time-decay' | 'position-based';

interface MemoryOverviewProps {
  masterData: MasterOrchestratorData | null;
  attributionMetrics: AttributionMetrics;
  selectedModel: AttributionModel;
}

export function MemoryOverview({ masterData, attributionMetrics, selectedModel }: MemoryOverviewProps) {

  // Determinar el estado de la memoria neural
  const getMemoryStatus = () => {
    if (!masterData) {
      return {
        status: 'offline',
        color: 'red',
        text: 'Memoria Offline',
        description: 'Master Orchestrator desconectado',
        icon: AlertTriangle
      };
    }

    if (masterData.summary.total_connected === 0) {
      return {
        status: 'waiting',
        color: 'yellow',
        text: 'Memoria en Standby',
        description: 'Esperando conexión de plataformas',
        icon: Clock
      };
    }

    return {
      status: 'active',
      color: 'green',
      text: 'Memoria Neural Activa',
      description: `Recordando datos de ${masterData.summary.total_connected} plataformas`,
      icon: CheckCircle
    };
  };

  const memoryStatus = getMemoryStatus();

  // Generar datos de plataformas para visualización
  const generatePlatformMemory = () => {
    if (!masterData) return [];

    const platforms = [];
    
    if (masterData.platforms.meta_ads.connected) {
      platforms.push({
        name: 'Meta Ads',
        color: 'blue',
        campaigns: masterData.platforms.meta_ads.total_campaigns,
        touchpoints: attributionMetrics.totalTouchpoints * 0.35,
        revenue: attributionMetrics.totalRevenue * 0.35,
        status: 'active'
      });
    }

    if (masterData.platforms.google_ads.connected) {
      platforms.push({
        name: 'Google Ads',
        color: 'green', 
        campaigns: masterData.platforms.google_ads.accessible_customers,
        touchpoints: attributionMetrics.totalTouchpoints * 0.30,
        revenue: attributionMetrics.totalRevenue * 0.30,
        status: 'active'
      });
    }

    if (masterData.platforms.tiktok_ads.connected) {
      platforms.push({
        name: 'TikTok Ads',
        color: 'pink',
        campaigns: masterData.platforms.tiktok_ads.advertiser_count,
        touchpoints: attributionMetrics.totalTouchpoints * 0.25,
        revenue: attributionMetrics.totalRevenue * 0.25,
        status: 'active'
      });
    }

    return platforms;
  };

  const platformMemory = generatePlatformMemory();

  return (
    <div className="space-y-8">
      {/* Memory Status Hero */}
      <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute top-16 right-8 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute bottom-8 left-16 w-16 h-16 border border-white rounded-full"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Quintuple AI Memory</h2>
                <p className="text-blue-200 mt-1">Neural Attribution Engine • Centro de Memoria</p>
              </div>
            </div>

            <div className="text-right">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                memoryStatus.color === 'green' ? 'bg-green-500 bg-opacity-20 border border-green-400' :
                memoryStatus.color === 'yellow' ? 'bg-yellow-500 bg-opacity-20 border border-yellow-400' :
                'bg-red-500 bg-opacity-20 border border-red-400'
              }`}>
                <memoryStatus.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{memoryStatus.text}</span>
              </div>
              <p className="text-sm text-blue-200 mt-2">{memoryStatus.description}</p>
            </div>
          </div>

          {/* Memory Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Database className="w-6 h-6 text-blue-300" />
                <div>
                  <p className="text-sm text-blue-200">Accuracy</p>
                  <p className="text-2xl font-bold">{attributionMetrics.memoryAccuracy}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-yellow-300" />
                <div>
                  <p className="text-sm text-blue-200">Neural Confidence</p>
                  <p className="text-2xl font-bold">{attributionMetrics.neuralConfidence}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Network className="w-6 h-6 text-green-300" />
                <div>
                  <p className="text-sm text-blue-200">Cross-Device</p>
                  <p className="text-2xl font-bold">{attributionMetrics.crossDeviceConversions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Layers className="w-6 h-6 text-purple-300" />
                <div>
                  <p className="text-sm text-blue-200">Touchpoints</p>
                  <p className="text-2xl font-bold">{attributionMetrics.totalTouchpoints.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Memory Performance KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Revenue Atribuido</p>
              <p className="text-3xl font-bold text-gray-900">
                ${attributionMetrics.totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1">Neural Attribution</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          {attributionMetrics.totalRevenue === 0 && (
            <p className="text-xs text-gray-500 mt-3">
              🧠 Memoria lista para recordar revenue cuando conectes campañas
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Conversiones Recordadas</p>
              <p className="text-3xl font-bold text-gray-900">
                {attributionMetrics.totalConversions.toLocaleString()}
              </p>
              <p className="text-sm text-blue-600 mt-1">Multi-Touch Attribution</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Journey Length Promedio</p>
              <p className="text-3xl font-bold text-gray-900">
                {attributionMetrics.averageJourneyLength}
              </p>
              <p className="text-sm text-purple-600 mt-1">Touchpoints por conversión</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Memory Grid */}
      {platformMemory.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <HardDrive className="w-5 h-5 mr-2 text-purple-600" />
            Memoria por Plataforma
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformMemory.map((platform, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${
                platform.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                platform.color === 'green' ? 'bg-green-50 border-green-200' :
                'bg-pink-50 border-pink-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-medium ${
                    platform.color === 'blue' ? 'text-blue-900' :
                    platform.color === 'green' ? 'text-green-900' :
                    'text-pink-900'
                  }`}>
                    {platform.name}
                  </h4>
                  <div className={`w-3 h-3 rounded-full ${
                    platform.color === 'blue' ? 'bg-blue-500' :
                    platform.color === 'green' ? 'bg-green-500' :
                    'bg-pink-500'
                  } animate-pulse`} />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campañas/Cuentas:</span>
                    <span className="font-medium">{platform.campaigns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Touchpoints:</span>
                    <span className="font-medium">{Math.round(platform.touchpoints).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue Atribuido:</span>
                    <span className="font-medium">${Math.round(platform.revenue).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Setup Required State */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Database className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Memoria Neural Lista</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Quintuple AI Memory está preparada para recordar todos los touchpoints y customer journeys. 
            Conecta tus plataformas publicitarias para empezar a entrenar la memoria neural.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Conectar Plataformas</span>
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Ver Demo</span>
            </button>
          </div>
        </div>
      )}

      {/* Neural Engine Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Cpu className="w-5 h-5 mr-2 text-purple-600" />
          Estado del Neural Engine
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-900">Memory Core</p>
            <p className="text-xs text-green-600">Online</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Brain className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-900">Neural Network</p>
            <p className="text-xs text-blue-600">Activo</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Network className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-purple-900">Cross-Device</p>
            <p className="text-xs text-purple-600">Tracking</p>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Shield className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-yellow-900">Privacy-First</p>
            <p className="text-xs text-yellow-600">Protegido</p>
          </div>
        </div>
      </div>
    </div>
  );
}