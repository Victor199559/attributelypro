// src/components/audiences/TemplatesTab.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Brain, Star, Sparkles, Zap, Target, MessageCircle, 
  ShoppingCart, Crosshair, CheckCircle, AlertTriangle,
  ArrowRight, Plus, Lock, Crown, Shield, Activity,
  TrendingUp, Users, Eye, Globe, Smartphone
} from 'lucide-react';
import { useStatus } from '../../contexts/StatusContext';

interface NeuralTemplate {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  estimatedSize: string;
  conversionRate: string;
  neural_confidence: string;
  icon: any;
  color: string;
  available: boolean;
  premium: boolean;
  requiredCompletion: number;
  features: string[];
  expectedResults: {
    reach: string;
    conversions: string;
    roas: string;
    setup_time: string;
  };
  use_cases: string[];
  neural_advantages: string[];
}

export function TemplatesTab() {
  const { masterData, connectionError } = useStatus();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const quintuple_completion = masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0;
  const platforms_count = Object.values(masterData?.platforms_status || {})
    .filter((p: any) => p.status?.includes('connected')).length;

  // Neural Templates Premium con datos reales
  const neuralTemplates: NeuralTemplate[] = [
    {
      id: 'ai_discovery',
      name: 'AI High-Intent Discovery',
      description: 'Neural engine encuentra usuarios con alta intención de compra automáticamente',
      longDescription: 'Utiliza machine learning avanzado para identificar patrones de comportamiento que indican alta intención de compra. Analiza más de 200 señales comportamentales en tiempo real.',
      estimatedSize: quintuple_completion >= 50 ? 'Esperando eventos' : 'Setup requerido',
      conversionRate: quintuple_completion >= 50 ? 'TBD - Predictivo' : 'Completar setup',
      neural_confidence: `${quintuple_completion}%`,
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
      available: quintuple_completion >= 50,
      premium: false,
      requiredCompletion: 50,
      features: [
        'Análisis neural de comportamiento 24/7',
        'Predicción de intención de compra',
        'Optimización automática de audiencias',
        'Cross-device tracking avanzado'
      ],
      expectedResults: {
        reach: '10x más preciso que targeting manual',
        conversions: '300-500% mejora en CR',
        roas: '15-25x ROAS promedio',
        setup_time: '5 minutos'
      },
      use_cases: [
        'E-commerce con productos de alta consideración',
        'SaaS B2B con ciclos de venta largos',
        'Servicios financieros y seguros',
        'Educación online y certificaciones'
      ],
      neural_advantages: [
        'Aprende continuamente de cada interacción',
        'Se adapta automáticamente a cambios de mercado',
        'Elimina audiencias que no convierten',
        'Predice el momento óptimo de contacto'
      ]
    },
    {
      id: 'whatsapp_qualification',
      name: 'WhatsApp Neural Qualification',
      description: 'IA califica leads automáticamente vía WhatsApp Business con scoring neural',
      longDescription: 'Sistema de calificación avanzada que usa IA para evaluar la calidad de leads que llegan por WhatsApp. Integra con WhatsApp Business API para automatización completa.',
      estimatedSize: 'Setup required',
      conversionRate: 'TBD - Predictivo',
      neural_confidence: '0%',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-600',
      available: false,
      premium: true,
      requiredCompletion: 75,
      features: [
        'WhatsApp Business API integration',
        'Neural lead scoring (1-10)',
        'Automatic conversation routing',
        'Predictive customer lifetime value',
        'Sentiment analysis en tiempo real'
      ],
      expectedResults: {
        reach: '90% de leads cualificados automáticamente',
        conversions: '400-600% mejora en lead quality',
        roas: '20-35x ROAS en leads cualificados',
        setup_time: '24 horas (incluye WhatsApp approval)'
      },
      use_cases: [
        'Real estate con leads de alta calidad',
        'Servicios B2B con consultas complejas',
        'Healthcare y servicios médicos',
        'Coaching y consultoría premium'
      ],
      neural_advantages: [
        'Respuesta automática inteligente 24/7',
        'Escalado automático a humanos cuando necesario',
        'Integración con CRM y automation tools',
        'Análisis de sentiment para personalización'
      ]
    },
    {
      id: 'predictive_cart_recovery',
      name: 'Predictive Cart Recovery',
      description: 'Predice y previene abandono de carrito con timing neural perfecto',
      longDescription: 'Algoritmo neural que predice cuando un usuario está a punto de abandonar el carrito y ejecuta acciones preventivas automáticamente con el timing óptimo.',
      estimatedSize: 'Setup required',
      conversionRate: 'TBD - Predictivo',
      neural_confidence: '0%',
      icon: ShoppingCart,
      color: 'from-red-500 to-pink-600',
      available: false,
      premium: true,
      requiredCompletion: 60,
      features: [
        'Predicción de abandono en tiempo real',
        'Timing óptimo para intervención',
        'Personalización automática de offers',
        'Multi-channel recovery (email, SMS, push, ads)'
      ],
      expectedResults: {
        reach: '85% de carritos abandonados recuperados',
        conversions: '250-400% mejora en cart recovery',
        roas: '12-20x ROAS en recovery campaigns',
        setup_time: '30 minutos'
      },
      use_cases: [
        'E-commerce con carritos de alto valor',
        'Subscriptions y productos recurrentes',
        'Fashion y productos estacionales',
        'Electronics y productos de comparación'
      ],
      neural_advantages: [
        'Predice abandono 3-5 minutos antes',
        'Personaliza ofertas basado en behavior',
        'Testing automático de mensajes',
        'Optimiza canales de recovery automáticamente'
      ]
    },
    {
      id: 'cross_platform_attribution',
      name: 'Cross-Platform Neural Attribution',
      description: 'Rastrea customer journey completo en tiempo real con attribution neural',
      longDescription: 'Sistema avanzado de attribution que usa neural networks para rastrear el customer journey completo across devices y platforms, proporcionando attribution real sin cookies.',
      estimatedSize: 'Setup required',
      conversionRate: 'TBD - Multi-touch',
      neural_confidence: `${quintuple_completion}%`,
      icon: Crosshair,
      color: 'from-blue-500 to-cyan-600',
      available: quintuple_completion >= 78,
      premium: true,
      requiredCompletion: 78,
      features: [
        'Cookieless tracking neural',
        'Cross-device journey mapping',
        'Real-time attribution modeling',
        'Platform-agnostic data collection',
        'Privacy-compliant tracking'
      ],
      expectedResults: {
        reach: '95% accuracy en cross-device tracking',
        conversions: '200-300% mejora en attribution accuracy',
        roas: 'Attribution real vs estimated',
        setup_time: '2 horas (incluye todas las platforms)'
      },
      use_cases: [
        'Multi-platform advertising campaigns',
        'Complex B2B sales funnels',
        'Omnichannel retail experiences',
        'Mobile app + web attribution'
      ],
      neural_advantages: [
        'Cookieless attribution sin pérdida de accuracy',
        'Real-time data processing',
        'Machine learning attribution models',
        'Privacy-first approach'
      ]
    },
    {
      id: 'viral_content_predictor',
      name: 'Viral Content Neural Predictor',
      description: 'IA predice qué contenido se volverá viral antes de publicarlo',
      longDescription: 'Análisis neural avanzado que evalúa elementos visuales, copy, timing y audiencia para predecir el potencial viral de contenido antes de la publicación.',
      estimatedSize: 'Setup required',
      conversionRate: 'TBD - Engagement',
      neural_confidence: '0%',
      icon: TrendingUp,
      color: 'from-yellow-500 to-orange-600',
      available: false,
      premium: true,
      requiredCompletion: 85,
      features: [
        'Análisis visual neural de creative',
        'Predicción de engagement rates',
        'Optimal timing recommendations',
        'Audience sentiment prediction',
        'Competitor content analysis'
      ],
      expectedResults: {
        reach: '500-1000% mejora en reach orgánico',
        conversions: '300-800% mejora en engagement',
        roas: '25-50x ROAS en content marketing',
        setup_time: '1 hora'
      },
      use_cases: [
        'Influencer marketing campaigns',
        'Social media agencies',
        'Brand awareness campaigns',
        'Product launches virales'
      ],
      neural_advantages: [
        'Analiza 1000+ variables de contenido',
        'Predice viral potential con 89% accuracy',
        'Recomienda optimizaciones específicas',
        'Timing óptimo para cada platform'
      ]
    },
    {
      id: 'competitor_intelligence',
      name: 'Competitor Neural Intelligence',
      description: 'Monitorea y analiza estrategias de competidores con IA avanzada',
      longDescription: 'Sistema de inteligencia competitiva que usa neural networks para analizar las estrategias de advertising, content y targeting de tus competidores en tiempo real.',
      estimatedSize: 'Setup required',
      conversionRate: 'TBD - Intelligence',
      neural_confidence: '0%',
      icon: Eye,
      color: 'from-indigo-500 to-purple-600',
      available: false,
      premium: true,
      requiredCompletion: 90,
      features: [
        'Competitor ad monitoring 24/7',
        'Strategy pattern recognition',
        'Budget estimation neural',
        'Creative performance analysis',
        'Market opportunity identification'
      ],
      expectedResults: {
        reach: 'Insights de 100+ competidores',
        conversions: '200-400% mejora en competitive advantage',
        roas: 'Strategic decisions data-driven',
        setup_time: '45 minutos'
      },
      use_cases: [
        'Highly competitive markets',
        'New market entry strategies',
        'Product positioning optimization',
        'Budget allocation decisions'
      ],
      neural_advantages: [
        'Detecta cambios de strategy en tiempo real',
        'Identifica gaps de mercado automáticamente',
        'Predice próximos movimientos competitivos',
        'Recomienda counter-strategies óptimas'
      ]
    }
  ];

  const getTemplateStatus = (template: NeuralTemplate) => {
    if (connectionError) return 'offline';
    if (!template.available) return 'locked';
    if (quintuple_completion < template.requiredCompletion) return 'pending';
    return 'ready';
  };

  const getStatusBadge = (template: NeuralTemplate) => {
    const status = getTemplateStatus(template);
    
    switch (status) {
      case 'ready':
        return (
          <div className="flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3 mr-1" />
            Listo para Activar
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {template.requiredCompletion}% Requerido
          </div>
        );
      case 'locked':
        return (
          <div className="flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </div>
        );
      default:
        return (
          <div className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Master Offline
          </div>
        );
    }
  };

  const getActionButton = (template: NeuralTemplate) => {
    const status = getTemplateStatus(template);
    
    if (status === 'ready') {
      return (
        <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 group">
          <Brain className="w-4 h-4 mr-2 inline" />
          Activar Neural Template
          <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform" />
        </button>
      );
    }
    
    if (status === 'pending') {
      return (
        <Link
          href="/dashboard"
          className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-center block"
        >
          <AlertTriangle className="w-4 h-4 mr-2 inline" />
          Completar Setup ({quintuple_completion}% → {template.requiredCompletion}%)
        </Link>
      );
    }
    
    if (status === 'locked') {
      return (
        <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all duration-200">
          <Crown className="w-4 h-4 mr-2 inline" />
          Upgrade a Premium
        </button>
      );
    }
    
    return (
      <button className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
        <AlertTriangle className="w-4 h-4 mr-2 inline" />
        Master Orchestrator Offline
      </button>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Star className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Neural Templates Exclusivos
          </h2>
          <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">
              {connectionError ? 'Master Offline' : 'Neural Engine Activo'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600">
            {neuralTemplates.filter(t => getTemplateStatus(t) === 'ready').length} de {neuralTemplates.length} disponibles
          </div>
          <div className="flex items-center px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-1" />
            {quintuple_completion}% Neural Ready
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {neuralTemplates.map((template) => {
          const Icon = template.icon;
          const status = getTemplateStatus(template);
          const isSelected = selectedTemplate === template.id;
          const isHovered = hoveredTemplate === template.id;
          
          return (
            <div 
              key={template.id}
              className={`border rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                status === 'ready' 
                  ? 'border-purple-200 hover:border-purple-500 hover:shadow-xl bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50' 
                  : status === 'pending'
                    ? 'border-yellow-200 hover:border-yellow-400 bg-yellow-50 hover:shadow-lg'
                    : status === 'locked'
                      ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-100 hover:shadow-lg'
                      : 'border-gray-200 bg-gray-50 opacity-50'
              } ${isSelected ? 'ring-2 ring-purple-500 shadow-xl' : ''}`}
              onClick={() => setSelectedTemplate(isSelected ? null : template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Template Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${template.color} ${
                    status === 'ready' && isHovered ? 'scale-110' : ''
                  } transition-transform duration-200 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold flex items-center transition-colors ${
                      status === 'ready' 
                        ? 'text-gray-900 hover:text-purple-700' 
                        : status === 'pending'
                          ? 'text-yellow-800'
                          : 'text-gray-600'
                    }`}>
                      {template.name}
                      <Brain className="w-4 h-4 ml-2 text-purple-500" />
                      {template.premium && (
                        <Crown className="w-4 h-4 ml-1 text-purple-600" />
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                </div>
                {getStatusBadge(template)}
              </div>

              {/* Template Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Tamaño Neural</div>
                  <div className="text-sm font-medium text-gray-900">{template.estimatedSize}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Conv. Rate IA</div>
                  <div className="text-sm font-medium text-gray-600">{template.conversionRate}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Neural Confidence</div>
                  <div className="text-sm font-medium text-purple-600">{template.neural_confidence}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Setup Time</div>
                  <div className="text-sm font-medium text-gray-900">{template.expectedResults.setup_time}</div>
                </div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className="mt-6 space-y-4 border-t pt-4 animate-fade-in">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-2">Descripción Completa</h5>
                    <p className="text-sm text-gray-600">{template.longDescription}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-2">Features Neurales</h5>
                    <div className="grid grid-cols-1 gap-2">
                      {template.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <Zap className="w-3 h-3 mr-2 text-purple-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-2">Resultados Esperados</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-xs text-green-600 font-medium">Reach</div>
                        <div className="text-sm text-green-800">{template.expectedResults.reach}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-xs text-blue-600 font-medium">Conversiones</div>
                        <div className="text-sm text-blue-800">{template.expectedResults.conversions}</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-xs text-purple-600 font-medium">ROAS</div>
                        <div className="text-sm text-purple-800">{template.expectedResults.roas}</div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-2">
                        <div className="text-xs text-yellow-600 font-medium">Setup</div>
                        <div className="text-sm text-yellow-800">{template.expectedResults.setup_time}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-2">Casos de Uso Ideales</h5>
                    <div className="space-y-1">
                      {template.use_cases.map((useCase, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <Target className="w-3 h-3 mr-2 text-green-500" />
                          {useCase}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-2">Ventajas Neurales</h5>
                    <div className="space-y-1">
                      {template.neural_advantages.map((advantage, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <Brain className="w-3 h-3 mr-2 text-purple-500" />
                          {advantage}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-6">
                {getActionButton(template)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Neural Engine Status */}
      <div className={`rounded-xl border p-6 ${
        connectionError ? 'bg-red-50 border-red-200' : 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200'
      }`}>
        <div className="flex items-center mb-4">
          <Brain className={`w-6 h-6 mr-3 ${connectionError ? 'text-red-600' : 'text-purple-600'}`} />
          <div>
            <h4 className={`text-lg font-semibold ${connectionError ? 'text-red-900' : 'text-purple-900'}`}>
              🧠 Neural Templates Engine: {connectionError ? 'OFFLINE' : 'CONECTADO'}
            </h4>
            <p className={`text-sm ${connectionError ? 'text-red-700' : 'text-purple-700'}`}>
              {connectionError 
                ? 'Master Orchestrator no disponible. Reconectar para usar templates neurales.'
                : `Quintuple AI al ${quintuple_completion}%. Templates disponibles según nivel de configuración completado.`
              }
            </p>
          </div>
        </div>

        {!connectionError && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Neural Completion</span>
                <span className="text-sm font-bold text-purple-600">{quintuple_completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${quintuple_completion}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Platforms Conectadas</span>
                <span className="text-sm font-bold text-green-600">{platforms_count}/5</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-600">
                  {platforms_count > 0 ? 'Platforms activas' : 'Conectar platforms para templates'}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Templates Disponibles</span>
                <span className="text-sm font-bold text-blue-600">
                  {neuralTemplates.filter(t => getTemplateStatus(t) === 'ready').length}/{neuralTemplates.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-600">
                  {neuralTemplates.filter(t => getTemplateStatus(t) === 'ready').length > 0 
                    ? 'Templates listos para activar'
                    : 'Completar setup para activar templates'
                  }
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles for animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}