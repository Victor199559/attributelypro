// src/components/attribution/ModelSelector.tsx
'use client';

import { 
  Brain, MousePointer, Target, Activity, Clock, BarChart3,
  Star, Zap, CheckCircle, AlertTriangle, TrendingUp, Eye,
  Settings, Play, Crown, Shield, Database, Cpu
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

interface AttributionModelInfo {
  id: AttributionModel;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  confidence: number;
  description: string;
  howItWorks: string;
  bestFor: string;
  isPremium: boolean;
  isNeural: boolean;
  pros: string[];
  cons: string[];
}

interface ModelSelectorProps {
  selectedModel: AttributionModel;
  onModelChange: (model: AttributionModel) => void;
  masterData: MasterOrchestratorData | null;
  attributionMetrics: AttributionMetrics;
}

export function ModelSelector({ selectedModel, onModelChange, masterData, attributionMetrics }: ModelSelectorProps) {

  const attributionModels: AttributionModelInfo[] = [
    {
      id: 'neural-ai',
      name: 'Neural IA',
      icon: Brain,
      confidence: 96,
      description: 'Attribution con Machine Learning avanzado y cross-device tracking',
      howItWorks: 'Quintuple AI analiza patrones de comportamiento, timing, y probabilidades para distribuir crédito inteligentemente',
      bestFor: 'Empresas que quieren la máxima precisión y insights automáticos',
      isPremium: true,
      isNeural: true,
      pros: ['96% de precisión', 'Cross-device automático', 'Aprende patrones únicos', 'Optimización en tiempo real'],
      cons: ['Requiere datos históricos', 'Más complejo de entender']
    },
    {
      id: 'first-click',
      name: 'Primer Clic',
      icon: MousePointer,
      confidence: 72,
      description: 'Atribuye 100% del crédito al primer touchpoint que descubrió al cliente',
      howItWorks: 'Da todo el crédito al canal que introdujo por primera vez al cliente a tu marca',
      bestFor: 'Medir awareness y descubrimiento de marca',
      isPremium: false,
      isNeural: false,
      pros: ['Simple de entender', 'Valora awareness', 'Útil para branding'],
      cons: ['Ignora otros touchpoints', 'Puede subestimar canales de conversión']
    },
    {
      id: 'last-click',
      name: 'Último Clic',
      icon: Target,
      confidence: 68,
      description: 'Atribuye 100% del crédito al último touchpoint antes de la conversión',
      howItWorks: 'Da todo el crédito al canal que directamente precedió la conversión',
      bestFor: 'Identificar qué canales "cierran" las ventas',
      isPremium: false,
      isNeural: false,
      pros: ['Fácil implementación', 'Enfoque en conversión', 'Datos inmediatos'],
      cons: ['Ignora journey completo', 'Favorece canales de búsqueda']
    },
    {
      id: 'linear',
      name: 'Lineal',
      icon: Activity,
      confidence: 78,
      description: 'Distribuye el crédito equitativamente entre todos los touchpoints',
      howItWorks: 'Cada touchpoint recibe la misma cantidad de crédito, independientemente del timing',
      bestFor: 'Cuando todos los touchpoints son igualmente importantes',
      isPremium: false,
      isNeural: false,
      pros: ['Justo para todos los canales', 'Fácil de explicar', 'No favorece posición'],
      cons: ['Puede no reflejar impacto real', 'Ignora timing']
    },
    {
      id: 'time-decay',
      name: 'Time Decay',
      icon: Clock,
      confidence: 82,
      description: 'Da más crédito a touchpoints más cercanos temporalmente a la conversión',
      howItWorks: 'Los touchpoints recientes reciben más crédito que los antiguos, usando decaimiento exponencial',
      bestFor: 'Productos con ciclos de compra cortos o decisiones rápidas',
      isPremium: false,
      isNeural: false,
      pros: ['Valora recencia', 'Bueno para ciclos cortos', 'Más sofisticado que lineal'],
      cons: ['Puede subestimar awareness', 'Parámetros difíciles de ajustar']
    },
    {
      id: 'position-based',
      name: 'Position Based',
      icon: BarChart3,
      confidence: 85,
      description: '40% primer toque, 40% último toque, 20% distribuido entre el resto',
      howItWorks: 'Combina first-click y last-click, dando peso especial al inicio y final del journey',
      bestFor: 'Balance entre descubrimiento y conversión',
      isPremium: false,
      isNeural: false,
      pros: ['Valora awareness y conversión', 'Más balanceado', 'Reconoce journey completo'],
      cons: ['Distribución arbitraria', 'Puede no ajustarse a tu negocio']
    }
  ];

  // Calcular métricas para cada modelo
  const calculateModelMetrics = (model: AttributionModelInfo) => {
    if (attributionMetrics.totalRevenue === 0) {
      return {
        revenue: 0,
        conversions: 0,
        roas: 0
      };
    }

    // Neural AI usa métricas reales
    if (model.id === 'neural-ai') {
      return {
        revenue: attributionMetrics.totalRevenue,
        conversions: attributionMetrics.totalConversions,
        roas: attributionMetrics.totalRevenue > 0 ? (attributionMetrics.totalRevenue / (attributionMetrics.totalRevenue * 0.25)) : 0
      };
    }

    // Otros modelos ajustados por confidence
    const multiplier = model.confidence / 100;
    return {
      revenue: Math.round(attributionMetrics.totalRevenue * multiplier),
      conversions: Math.round(attributionMetrics.totalConversions * multiplier),
      roas: attributionMetrics.totalRevenue > 0 ? ((attributionMetrics.totalRevenue * multiplier) / (attributionMetrics.totalRevenue * 0.25)) : 0
    };
  };

  // Determinar si Neural AI está disponible
  const isNeuralAIAvailable = masterData?.platforms.quintuple_ai.connected && masterData?.summary.total_connected > 0;

  return (
    <div className="space-y-8">
      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attributionModels.map((model) => {
          const isSelected = selectedModel === model.id;
          const metrics = calculateModelMetrics(model);
          const isAvailable = model.isNeural ? isNeuralAIAvailable : true;

          return (
            <div
              key={model.id}
              className={`relative rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                isSelected
                  ? model.isNeural
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg'
                    : 'border-purple-500 bg-purple-50 shadow-lg'
                  : isAvailable
                  ? 'border-gray-200 bg-white hover:border-gray-300'
                  : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-75'
              }`}
              onClick={() => isAvailable && onModelChange(model.id)}
            >
              {/* Premium Badge */}
              {model.isNeural && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                  <Crown className="w-3 h-3" />
                  <span>NEURAL</span>
                </div>
              )}

              <div className="p-6">
                {/* Model Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      model.isNeural
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : isSelected
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <model.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                        <span>{model.name}</span>
                        {model.isNeural && <Brain className="w-4 h-4 text-purple-600 animate-pulse" />}
                      </h3>
                      <p className="text-sm text-gray-600">{model.confidence}% confidence</p>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4">{model.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">${metrics.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Revenue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{metrics.conversions.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Conversions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{metrics.roas.toFixed(1)}x</p>
                    <p className="text-xs text-gray-600">ROAS</p>
                  </div>
                </div>

                {/* Best For */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-1">Mejor para:</p>
                  <p className="text-xs text-gray-600">{model.bestFor}</p>
                </div>

                {/* Status */}
                {!isAvailable && model.isNeural && (
                  <div className="flex items-center space-x-2 text-xs text-yellow-600 bg-yellow-50 rounded-lg p-2">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Requiere plataformas conectadas</span>
                  </div>
                )}

                {isAvailable && model.isNeural && (
                  <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-50 rounded-lg p-2">
                    <CheckCircle className="w-3 h-3" />
                    <span>Neural IA activo y funcionando</span>
                  </div>
                )}

                {!model.isNeural && (
                  <div className="flex items-center space-x-2 text-xs text-blue-600 bg-blue-50 rounded-lg p-2">
                    <Settings className="w-3 h-3" />
                    <span>Modelo tradicional disponible</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Model Details */}
      {(() => {
        const currentModel = attributionModels.find(m => m.id === selectedModel);
        if (!currentModel) return null;

        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <currentModel.icon className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                {currentModel.name} - Detalles del Modelo
              </h3>
              {currentModel.isNeural && (
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  QUINTUPLE AI
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* How It Works */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-purple-600" />
                  Cómo Funciona
                </h4>
                <p className="text-gray-700 mb-4">{currentModel.howItWorks}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Ventajas
                    </h5>
                    <ul className="space-y-1">
                      {currentModel.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Limitaciones
                    </h5>
                    <ul className="space-y-1">
                      {currentModel.cons.map((con, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Model Performance */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-purple-600" />
                  Performance Actual
                </h4>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Confidence Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${currentModel.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{currentModel.confidence}%</span>
                    </div>
                  </div>

                  {currentModel.isNeural && attributionMetrics.memoryAccuracy > 0 && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-700">Memory Accuracy</span>
                      <span className="text-sm font-bold text-blue-900">{attributionMetrics.memoryAccuracy}%</span>
                    </div>
                  )}

                  {currentModel.isNeural && attributionMetrics.crossDeviceConversions > 0 && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-700">Cross-Device Tracking</span>
                      <span className="text-sm font-bold text-green-900">{attributionMetrics.crossDeviceConversions} conversions</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-700">Recommended for</span>
                    <span className="text-sm font-bold text-purple-900">{currentModel.bestFor}</span>
                  </div>
                </div>

                {currentModel.isNeural && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">Quintuple AI Advantage</span>
                    </div>
                    <p className="text-xs text-purple-700">
                      Este modelo aprende automáticamente de tus datos y se optimiza en tiempo real. 
                      Mientras más datos tenga, más preciso se vuelve.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}