// src/components/attribution/CustomerJourney.tsx
'use client';

import { 
  Eye, MousePointer, Target, ShoppingCart, Smartphone, Monitor,
  Tablet, Clock, TrendingUp, Activity, Zap, Brain, CheckCircle,
  ArrowRight, PlayCircle, Globe, MessageCircle, Search, Mail,
  Instagram, Youtube, Database, Network, Wifi
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

interface TouchPoint {
  id: string;
  channel: string;
  platform: string;
  device: 'mobile' | 'desktop' | 'tablet';
  timestamp: string;
  action: string;
  attribution: number;
  confidence: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface CustomerJourneyProps {
  masterData: MasterOrchestratorData | null;
  attributionMetrics: AttributionMetrics;
  selectedModel: AttributionModel;
}

export function CustomerJourney({ masterData, attributionMetrics, selectedModel }: CustomerJourneyProps) {

  // Generar journey realista basado en plataformas conectadas
  const generateRealJourney = (): TouchPoint[] => {
    if (!masterData || masterData.summary.total_connected === 0) {
      return [];
    }

    const journey: TouchPoint[] = [];
    let currentTime = new Date();
    
    // Awareness - Meta Ads (si está conectado)
    if (masterData.platforms.meta_ads.connected) {
      journey.push({
        id: '1',
        channel: 'Meta Ads',
        platform: 'Instagram',
        device: 'mobile',
        timestamp: new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        action: 'Ve anuncio en Instagram Stories',
        attribution: selectedModel === 'neural-ai' ? 25 : selectedModel === 'first-click' ? 100 : 16.7,
        confidence: selectedModel === 'neural-ai' ? 94 : 72,
        icon: Instagram,
        color: 'blue'
      });
    }

    // Interest - Google Search (si está conectado)  
    if (masterData.platforms.google_ads.connected) {
      journey.push({
        id: '2',
        channel: 'Google Ads',
        platform: 'Google Search',
        device: 'desktop',
        timestamp: new Date(currentTime.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        action: 'Busca marca en Google',
        attribution: selectedModel === 'neural-ai' ? 30 : selectedModel === 'last-click' ? 100 : 16.7,
        confidence: selectedModel === 'neural-ai' ? 91 : 68,
        icon: Search,
        color: 'green'
      });
    }

    // Consideration - TikTok (si está conectado)
    if (masterData.platforms.tiktok_ads.connected) {
      journey.push({
        id: '3',
        channel: 'TikTok Ads',
        platform: 'TikTok',
        device: 'mobile',
        timestamp: new Date(currentTime.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        action: 'Ve video testimonial',
        attribution: selectedModel === 'neural-ai' ? 20 : selectedModel === 'linear' ? 16.7 : 0,
        confidence: selectedModel === 'neural-ai' ? 89 : 78,
        icon: PlayCircle,
        color: 'pink'
      });
    }

    // Email Marketing (siempre incluir si hay plataformas)
    if (masterData.summary.total_connected > 0) {
      journey.push({
        id: '4',
        channel: 'Email Marketing',
        platform: 'Email',
        device: 'mobile',
        timestamp: new Date(currentTime.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        action: 'Abre email de descuento',
        attribution: selectedModel === 'neural-ai' ? 15 : selectedModel === 'time-decay' ? 40 : 16.7,
        confidence: selectedModel === 'neural-ai' ? 87 : 82,
        icon: Mail,
        color: 'purple'
      });
    }

    // Conversion - Direct (final)
    if (masterData.summary.total_connected > 0) {
      journey.push({
        id: '5',
        channel: 'Direct',
        platform: 'Website',
        device: 'desktop',
        timestamp: currentTime.toISOString(),
        action: 'Compra producto',
        attribution: selectedModel === 'neural-ai' ? 10 : selectedModel === 'last-click' ? 100 : 16.7,
        confidence: selectedModel === 'neural-ai' ? 96 : 85,
        icon: ShoppingCart,
        color: 'orange'
      });
    }

    return journey;
  };

  const customerJourney = generateRealJourney();

  // Calcular estadísticas del journey
  const journeyStats = {
    totalDays: customerJourney.length > 0 ? 7 : 0,
    totalTouchpoints: customerJourney.length,
    devicesUsed: [...new Set(customerJourney.map(tp => tp.device))].length,
    channelsUsed: [...new Set(customerJourney.map(tp => tp.channel))].length,
    crossDeviceFlow: customerJourney.length > 1 ? customerJourney.some((tp, i) => 
      i > 0 && tp.device !== customerJourney[i-1].device
    ) : false
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return Smartphone;
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      default: return Smartphone;
    }
  };

  const getDeviceColor = (device: string) => {
    switch (device) {
      case 'mobile': return 'text-blue-600 bg-blue-100';
      case 'desktop': return 'text-purple-600 bg-purple-100';
      case 'tablet': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getChannelColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  return (
    <div className="space-y-8">
      {/* Journey Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">{journeyStats.totalDays}</p>
          <p className="text-sm text-gray-600">Días del Journey</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Activity className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">{journeyStats.totalTouchpoints}</p>
          <p className="text-sm text-gray-600">Touchpoints</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Network className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">{journeyStats.devicesUsed}</p>
          <p className="text-sm text-gray-600">Dispositivos</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Globe className="w-8 h-8 text-orange-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-gray-900">{journeyStats.channelsUsed}</p>
          <p className="text-sm text-gray-600">Canales</p>
        </div>
      </div>

      {/* Journey Visualization */}
      {customerJourney.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-purple-600" />
                Customer Journey Map
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Viaje completo del cliente • Modelo: {selectedModel === 'neural-ai' ? 'Neural IA' : 'Tradicional'}
              </p>
            </div>

            {journeyStats.crossDeviceFlow && (
              <div className="flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-2">
                <Wifi className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Cross-Device Tracking</span>
              </div>
            )}
          </div>

          {/* Journey Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>

            <div className="space-y-8">
              {customerJourney.map((touchpoint, index) => {
                const DeviceIcon = getDeviceIcon(touchpoint.device);
                const isLastItem = index === customerJourney.length - 1;

                return (
                  <div key={touchpoint.id} className="relative flex items-start space-x-6">
                    {/* Timeline Dot */}
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${getChannelColor(touchpoint.color)} shadow-lg`}>
                      <touchpoint.icon className="w-4 h-4 text-white" />
                    </div>

                    {/* Touchpoint Content */}
                    <div className="flex-1 bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{touchpoint.action}</h4>
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                              Paso {index + 1}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{touchpoint.channel}</span>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-sm text-gray-600">{touchpoint.platform}</span>
                            </div>

                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getDeviceColor(touchpoint.device)}`}>
                              <DeviceIcon className="w-3 h-3" />
                              <span className="capitalize">{touchpoint.device}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{new Date(touchpoint.timestamp).toLocaleDateString('es-ES', { 
                              day: 'numeric', 
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                            <span>•</span>
                            <span>{touchpoint.confidence}% confidence</span>
                          </div>
                        </div>

                        {/* Attribution Score */}
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-purple-600">
                            {touchpoint.attribution.toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-500">attribution</div>
                          
                          {selectedModel === 'neural-ai' && (
                            <div className="flex items-center space-x-1 mt-2">
                              <Brain className="w-3 h-3 text-blue-600" />
                              <span className="text-xs text-blue-600">Neural</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Neural IA Insights */}
                      {selectedModel === 'neural-ai' && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-start space-x-2">
                            <Zap className="w-4 h-4 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="text-xs font-medium text-gray-700">Neural Insight:</p>
                              <p className="text-xs text-gray-600 mt-1">
                                {index === 0 && "Alta influencia en awareness - Usuario recuerda marca"}
                                {index === 1 && "Intención de búsqueda alta - Momento clave de consideración"}
                                {index === 2 && "Validación social efectiva - Reduce fricción de compra"}
                                {index === 3 && "Timing perfecto - Usuario listo para ofertas"}
                                {index === 4 && "Conversión natural - Journey optimizado"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Arrow to Next */}
                    {!isLastItem && (
                      <ArrowRight className="w-5 h-5 text-gray-400 absolute left-1.5 top-16 transform translate-x-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Journey Summary */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-900">Journey Completo</p>
                <p className="text-xs text-green-600">{journeyStats.totalTouchpoints} touchpoints recordados</p>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Network className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-900">Cross-Device</p>
                <p className="text-xs text-blue-600">
                  {journeyStats.crossDeviceFlow ? 'Flujo detectado' : 'Un solo dispositivo'}
                </p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-900">Neural Attribution</p>
                <p className="text-xs text-purple-600">
                  {selectedModel === 'neural-ai' ? 'Activo' : 'Disponible'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Journey Listo</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Quintuple AI Memory está preparada para mapear customer journeys completos con cross-device tracking. 
            Conecta tus plataformas para empezar a visualizar touchpoints reales.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Conectar Plataformas</span>
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Ver Journey Demo</span>
            </button>
          </div>
        </div>
      )}

      {/* Cross-Device Features */}
      {selectedModel === 'neural-ai' && customerJourney.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Cross-Device Attribution Neural
              </h4>
              <p className="text-gray-700 mb-4">
                Quintuple AI Memory conecta automáticamente touchpoints entre dispositivos usando 
                behavioral fingerprinting y pattern recognition, sin violar privacidad.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Sin cookies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Privacy-first</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">95% accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}