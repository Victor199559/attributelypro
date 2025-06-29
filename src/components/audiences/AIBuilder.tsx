// src/components/audiences/AIBuilder.tsx
'use client';

import Link from 'next/link';
import { Brain, Sparkles, ArrowRight, AlertTriangle, Zap, Target, ArrowLeft } from 'lucide-react';
import { useStatus } from '../../contexts/StatusContext';

export function AIBuilder() {
  const { quintupleStatus, masterStatus, connectionError } = useStatus();

  const isNeuralReady = (quintupleStatus?.active_platforms || 0) >= 3 && !connectionError;

  if (connectionError || !isNeuralReady) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <AlertTriangle className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Neural Builder No Disponible</h3>
          <p className="text-gray-500 mb-6">
            {connectionError 
              ? 'Necesitas conectar con Master Orchestrator'
              : `Quintuple AI al ${quintupleStatus?.real_data_percentage || 0}% - Necesitas al menos 3 plataformas activas para usar Neural Builder`
            }
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Neural Automatizador Connection Card */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h3 className="text-xl font-bold flex items-center">
                Campaña Neural Automatizada
                <span className="ml-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                  IA AVANZADA
                </span>
              </h3>
              <p className="text-purple-100 mb-2">
                Inicia tu campaña completamente automatizada con Neural Automatizador
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <Brain className="w-3 h-3 mr-1" />
                  {quintupleStatus?.active_platforms || 0}/5 Plataformas Listas
                </span>
                <span className="flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  David vs Goliath Ready
                </span>
              </div>
            </div>
          </div>
          
          <Link
            href="/neural-automatizador"
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-500 hover:to-orange-500 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 flex items-center shadow-lg"
          >
            <span>Comenzar Automatización</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* Flujo del Proceso */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Flujo Neural Completo</h3>
          <div className="ml-auto flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">
              {quintupleStatus?.active_platforms || 0}/5 Plataformas
            </span>
          </div>
        </div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {[
            { 
              step: 1, 
              name: 'Profeta Creativo', 
              status: 'completed', 
              icon: '🔮',
              href: '/profeta-creativo'
            },
            { 
              step: 2, 
              name: 'Audiencias Neural', 
              status: 'current', 
              icon: '🧠',
              href: '/audiences'
            },
            { 
              step: 3, 
              name: 'Fraud Detection', 
              status: 'ready', 
              icon: '🛡️',
              href: '/fraud-detection'
            },
            { 
              step: 4, 
              name: 'AI Insights', 
              status: 'ready', 
              icon: '📊',
              href: '/ai-insights'
            },
            { 
              step: 5, 
              name: 'Neural Automatizador', 
              status: 'ready', 
              icon: '⚡',
              href: '/neural-automatizador'
            },
            { 
              step: 6, 
              name: 'David vs Goliath', 
              status: 'pending', 
              icon: '🎯',
              href: '/neural-automatizador'
            }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                item.status === 'current' 
                  ? 'border-purple-500 bg-purple-50' 
                  : item.status === 'completed'
                    ? 'border-green-500 bg-green-50'
                    : item.status === 'ready'
                      ? 'border-blue-500 bg-blue-50 hover:border-blue-600'
                      : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                <div className={`text-xs mt-1 ${
                  item.status === 'current' ? 'text-purple-600' :
                  item.status === 'completed' ? 'text-green-600' :
                  item.status === 'ready' ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {item.status === 'current' ? 'Activo' :
                   item.status === 'completed' ? 'Completado' :
                   item.status === 'ready' ? 'Listo' : 'Pendiente'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Neural Builder Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="w-4 h-4 mr-2 text-purple-600" />
          Configuración Neural Builder
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de Audiencia Neural
              </label>
              <input
                type="text"
                placeholder="Audiencia High-Intent con IA"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motor Neural
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>🧠 Motor de Descubrimiento IA</option>
                <option>🎯 Algoritmo Neural Lookalike</option>
                <option>📊 Análisis Predictivo Behavioral</option>
                <option>⚡ Tracking de Conversión Tiempo Real</option>
                <option>💬 Calificación Neural WhatsApp</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objetivos de Optimización Neural
              </label>
              <div className="space-y-2">
                {[
                  'Maximizar Revenue (ROAS > 15x)',
                  'Optimizar Conversion Rate (>20%)',
                  'Predecir Customer Lifetime Value',
                  'Score de Calificación WhatsApp (>8/10)'
                ].map((goal, idx) => (
                  <label key={idx} className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-700">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Neural Preview */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
            <h5 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-4 h-4 mr-2 text-purple-600" />
              Vista Previa Neural
            </h5>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tamaño estimado:</span>
                <span className="text-sm font-medium text-gray-900">Esperando datos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Conv. rate predicho:</span>
                <span className="text-sm font-medium text-gray-600">TBD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue forecast:</span>
                <span className="text-sm font-medium text-gray-900">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Neural confidence:</span>
                <span className="text-sm font-medium text-purple-600">
                  {quintupleStatus?.real_data_percentage || 0}%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-purple-200">
              <h6 className="text-sm font-medium text-gray-900 mb-2">Insights Neural</h6>
              <div className="space-y-1">
                {[
                  'Esperando eventos de tracking',
                  'Configurar pixel de attribution',
                  'Conectar Google Analytics'
                ].map((insight, idx) => (
                  <div key={idx} className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                    {insight}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/neural-automatizador"
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            >
              <span>Crear con Neural Engine</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}