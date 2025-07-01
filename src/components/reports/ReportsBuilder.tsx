// src/components/reports/ReportsBuilder.tsx
'use client';

import { Layers, Brain, Eye, CheckCircle, AlertTriangle, Crown } from 'lucide-react';

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

interface ReportsBuilderProps {
  masterData: MasterDataState;
}

export function ReportsBuilder({ masterData }: ReportsBuilderProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <Layers className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Constructor de Reportes Master Orchestrator</h3>
          <div className="ml-auto flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">
              {masterData.isConnected ? 'Con Datos Master Reales' : 'Inteligencia IA'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuración */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Reporte
              </label>
              <input
                type="text"
                placeholder={masterData.isConnected ? `Reporte Master ${masterData.account?.name} personalizado` : "Mi reporte personalizado"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Reporte
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                {masterData.isConnected ? (
                  <>
                    <option>Reporte Ejecutivo Master {masterData.account?.name}</option>
                    <option>Análisis Performance Datos Master Reales</option>
                    <option>Attribution Deep Dive Master Real</option>
                    <option>Audience Segmentation Master Real</option>
                    <option>Custom Multi-Plataforma Master</option>
                  </>
                ) : (
                  <>
                    <option>Reporte Ejecutivo</option>
                    <option>Análisis de Performance</option>
                    <option>Attribution Deep Dive</option>
                    <option>Audience Segmentation</option>
                    <option>Custom Multi-métrica</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Métricas a Incluir
              </label>
              <div className="space-y-3">
                {(masterData.isConnected ? [
                  'Revenue real Master Orchestrator',
                  'ROAS actual multi-plataforma',
                  'Attribution Master real tracking',
                  'Performance datos Master reales',
                  'Fraud detection Master real',
                  'ROI predictions datos Master actuales'
                ] : [
                  'Revenue y ROAS por canal',
                  'Attribution multi-touch analysis',
                  'WhatsApp conversion tracking',
                  'Audience performance breakdown',
                  'Fraud detection summary',
                  'ROI predictions y recomendaciones'
                ]).map((metric, index) => (
                  <div key={index} className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked={index < 3}
                      className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" 
                    />
                    <span className="text-sm text-gray-700">{metric}</span>
                    {masterData.isConnected && index < 3 && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Master Real
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>PDF Premium Master</option>
                  <option>Excel Detallado Master</option>
                  <option>Dashboard Live Master</option>
                  <option>CSV Data Export Master</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Período
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Últimos 30 días</option>
                  <option>Últimos 90 días</option>
                  <option>Mes actual</option>
                  <option>Trimestre actual</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plataformas Incluidas (Master Orchestrator)
              </label>
              <div className="space-y-3">
                {masterData.isConnected && masterData.platforms ? 
                  Object.entries(masterData.platforms).map(([platform, data]) => {
                    const platformData = data as any;
                    return (
                      <div key={platform} className="flex items-center">
                        <input 
                          type="checkbox" 
                          defaultChecked={platformData?.connected === true}
                          disabled={platformData?.connected !== true}
                          className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" 
                        />
                        <span className={`text-sm ${platformData?.connected === true ? 'text-gray-700' : 'text-gray-400'}`}>
                          {platform.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        {platformData?.connected === true && (
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Conectado
                          </span>
                        )}
                        {platformData?.connected !== true && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                            No conectado
                          </span>
                        )}
                      </div>
                    );
                  }) : [
                    'Meta Ads Demo',
                    'Google Ads Demo', 
                    'TikTok Ads Demo',
                    'YouTube Ads Demo'
                  ].map((platform, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        defaultChecked={index < 2}
                        className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" 
                      />
                      <span className="text-sm text-gray-700">{platform}</span>
                    </div>
                  ))
                }
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branding (White-label)
              </label>
              <div className="space-y-3">
                {[
                  masterData.isConnected ? `Incluir logo ${masterData.account?.name}` : 'Incluir logo de la empresa',
                  'Colores personalizados marca',
                  'Ocultar marca Attributely'
                ].map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked={index === 0}
                      className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" 
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview con datos Master */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-4 h-4 mr-2 text-purple-600" />
              Preview del Reporte Master
              {masterData.isConnected && (
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Datos Master reales
                </span>
              )}
            </h4>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {masterData.isConnected ? `${masterData.account?.name} Master Performance Report` : 'Executive Performance Report'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {masterData.isConnected ? 'Generado con datos Master Orchestrator reales' : 'Generado automáticamente'}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Páginas estimadas:</span>
                    <span className="font-medium text-gray-900">
                      {masterData.isConnected ? `${15 + (masterData.summary?.total_connected || 0) * 3} páginas` : '12 páginas'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiempo de generación:</span>
                    <span className="font-medium text-gray-900">
                      {masterData.isConnected ? '~15 segundos (Master API optimizada)' : '~45 segundos'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tamaño estimado:</span>
                    <span className="font-medium text-gray-900">
                      {masterData.isConnected ? `${3.2 + (masterData.summary?.total_connected || 0) * 0.8} MB` : '2.8 MB'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plataformas incluidas:</span>
                    <span className="font-medium text-gray-900">
                      {masterData.isConnected ? `${masterData.summary?.total_connected || 0} reales` : '4 demo'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Contenido Incluido:</h5>
                <div className="space-y-2 text-sm">
                  {(masterData.isConnected ? [
                    `Executive Summary ${masterData.account?.name}`,
                    'Revenue Analysis Master Orchestrator Real',
                    'Attribution Breakdown Multi-Plataforma Real',
                    'Performance Analysis Master Actual',
                    'Audience Insights Master Reales',
                    'AI Recommendations Master Optimizadas'
                  ] : [
                    'Executive Summary',
                    'Revenue Analysis',
                    'Attribution Breakdown',
                    'Channel Performance',
                    'Audience Insights',
                    'Recommendations'
                  ]).map((item, index) => (
                    <div key={index} className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {masterData.isConnected && masterData.platforms && Object.keys(masterData.platforms).length > 0 && (
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h5 className="text-sm font-medium text-gray-900 mb-3">Plataformas Master Conectadas:</h5>
                  <div className="space-y-1 text-sm">
                    {Object.entries(masterData.platforms).map(([platform, data]) => {
                      const platformData = data as any;
                      return (
                        <div key={platform} className={`flex items-center ${platformData?.connected === true ? 'text-green-600' : 'text-gray-400'}`}>
                          {platformData?.connected === true ? (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 mr-2" />
                          )}
                          <span>{platform.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          {platformData?.connected === true && (
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded">
                              ✓
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-x-2">
                <button className="w-full mb-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200">
                  {masterData.isConnected ? 'Generar Reporte con Master Real' : 'Generar Reporte'}
                </button>
                <button className="w-full px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50">
                  Guardar como Plantilla Master
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}