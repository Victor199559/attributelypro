// src/components/reports/ReportsTemplates.tsx
'use client';

import { Sparkles, FileText, Star, Crown, CheckCircle } from 'lucide-react';

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

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  metrics: string[];
  estimatedPages: number;
  popularity: number;
  preview: string;
  platforms: string[];
  realDataReady: boolean;
}

interface ReportsTemplatesProps {
  masterData: MasterDataState;
}

export function ReportsTemplates({ masterData }: ReportsTemplatesProps) {
  // Templates basados en datos reales del Master Orchestrator
  const reportTemplates: ReportTemplate[] = masterData.isConnected ? [
    {
      id: 'master_executive_1',
      name: `Executive Real Data ${masterData.account?.name || 'Master'}`,
      description: `Reporte ejecutivo con datos reales del Master Orchestrator para ${masterData.account?.name || 'tu cuenta'}`,
      category: 'Executive',
      metrics: [
        'Revenue Real Multi-Platform', 
        'ROAS Cross-Platform Real', 
        'Attribution Real Master', 
        'Performance Live Data',
        'Conversion Real Tracking'
      ],
      estimatedPages: 12,
      popularity: 98,
      preview: '/api/preview/master-executive',
      platforms: masterData.platforms ? Object.keys(masterData.platforms).filter(key => masterData.platforms[key]?.connected) : [],
      realDataReady: true
    },
    {
      id: 'master_attribution_2',
      name: 'Attribution Deep Dive Master Real',
      description: 'Análisis completo de attribution con datos reales del Master Orchestrator',
      category: 'Attribution',
      metrics: [
        'Real Cross-Platform Conversions', 
        'Actual Customer Journey Master', 
        'Live Attribution Models',
        'Real Touch Points Analysis'
      ],
      estimatedPages: 18,
      popularity: 95,
      preview: '/api/preview/master-attribution',
      platforms: masterData.platforms ? Object.keys(masterData.platforms).filter(key => masterData.platforms[key]?.connected) : [],
      realDataReady: true
    },
    {
      id: 'master_performance_3',
      name: 'Performance Analysis Master Real',
      description: 'Performance detallado con datos reales actuales del Master Orchestrator',
      category: 'Performance',
      metrics: [
        'Live Performance Master', 
        'Real ROI Multi-Platform', 
        'Actual Budget Allocation Real',
        'Master Orchestrator KPIs'
      ],
      estimatedPages: 20,
      popularity: 94,
      preview: '/api/preview/master-performance',
      platforms: masterData.platforms ? Object.keys(masterData.platforms).filter(key => masterData.platforms[key]?.connected) : [],
      realDataReady: true
    },
    {
      id: 'master_audience_4',
      name: 'Real Audience Segmentation Master',
      description: 'Segmentación basada en datos reales de audiencia del Master Orchestrator',
      category: 'Audiences',
      metrics: [
        'Real Segment Performance Master', 
        'Actual Behavioral Data Cross-Platform', 
        'Live Patterns Master',
        'Real Demographics Analysis'
      ],
      estimatedPages: 14,
      popularity: 90,
      preview: '/api/preview/master-audience',
      platforms: masterData.platforms ? Object.keys(masterData.platforms).filter(key => masterData.platforms[key]?.connected) : [],
      realDataReady: true
    },
    {
      id: 'master_fraud_5',
      name: 'Fraud Detection Master Real',
      description: 'Reporte de seguridad con datos reales del Master Orchestrator',
      category: 'Security',
      metrics: [
        'Real Threats Blocked Master', 
        'Actual Money Saved Cross-Platform', 
        'Live Risk Analysis Master',
        'Real Fraud Patterns'
      ],
      estimatedPages: 10,
      popularity: 87,
      preview: '/api/preview/master-fraud',
      platforms: masterData.platforms ? Object.keys(masterData.platforms).filter(key => masterData.platforms[key]?.connected) : [],
      realDataReady: true
    },
    {
      id: 'master_roi_6',
      name: 'ROI Predictor Master Real Data',
      description: 'Predicciones IA basadas en datos reales actuales del Master Orchestrator',
      category: 'AI Insights',
      metrics: [
        'Real ROI Predictions Master', 
        'Actual Budget Recommendations Cross-Platform', 
        'Live Optimization Master',
        'AI Insights Real Data'
      ],
      estimatedPages: 16,
      popularity: 92,
      preview: '/api/preview/master-roi',
      platforms: masterData.platforms ? Object.keys(masterData.platforms).filter(key => masterData.platforms[key]?.connected) : [],
      realDataReady: true
    }
  ] : [
    {
      id: 'demo_executive_1',
      name: 'Executive Performance Dashboard',
      description: 'Reporte ejecutivo demo con KPIs principales',
      category: 'Executive',
      metrics: ['Revenue Demo', 'ROAS Demo', 'Conversion Rate Demo'],
      estimatedPages: 8,
      popularity: 85,
      preview: '/api/preview/demo-executive',
      platforms: ['Demo'],
      realDataReady: false
    },
    {
      id: 'demo_attribution_2',
      name: 'Attribution Analysis Demo',
      description: 'Análisis de attribution con datos demo',
      category: 'Attribution',
      metrics: ['Touch Points Demo', 'Customer Journey Demo', 'Attribution Models Demo'],
      estimatedPages: 12,
      popularity: 78,
      preview: '/api/preview/demo-attribution',
      platforms: ['Demo'],
      realDataReady: false
    },
    {
      id: 'demo_performance_3',
      name: 'Performance Overview Demo',
      description: 'Reporte de performance con métricas demo',
      category: 'Performance',
      metrics: ['ROAS Demo', 'CPM Demo', 'Conversion Rate Demo'],
      estimatedPages: 10,
      popularity: 82,
      preview: '/api/preview/demo-performance',
      platforms: ['Demo'],
      realDataReady: false
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            {masterData.isConnected ? `Plantillas Master Orchestrator Real` : 'Plantillas Premium'}
          </h3>
          <div className="ml-auto flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
            <Crown className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">
              {masterData.isConnected ? 'Datos Master Reales' : 'Profesionales'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {reportTemplates.map((template, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-purple-500 hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${
                    index % 2 === 0 ? 'from-purple-500 to-pink-500' : 'from-blue-500 to-purple-500'
                  } group-hover:scale-110 transition-transform duration-200`}>
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {template.name}
                    </h4>
                    <p className="text-sm text-gray-500">{template.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">{template.popularity}</span>
                  {template.realDataReady && (
                    <div className="ml-2 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Métricas incluidas:</span>
                  <span className="font-medium text-gray-900">{template.metrics.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Páginas estimadas:</span>
                  <span className="font-medium text-gray-900">{template.estimatedPages}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Plataformas:</span>
                  <span className="font-medium text-gray-900">{template.platforms.length}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {template.metrics.slice(0, 3).map((metric, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {metric}
                  </span>
                ))}
                {template.metrics.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{template.metrics.length - 3} más
                  </span>
                )}
              </div>

              {template.platforms.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.platforms.map((platform, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {platform}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="space-x-2">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm group-hover:from-purple-600 group-hover:to-pink-600">
                  {template.realDataReady ? 'Usar con Datos Reales' : 'Usar Plantilla'}
                </button>
                <button className="w-full mt-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de datos reales en templates */}
      {masterData.isConnected && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <h4 className="font-semibold text-green-900">Plantillas Optimizadas con Master Orchestrator</h4>
              <p className="text-sm text-green-700">
                Estas plantillas están conectadas directamente con el Master Orchestrator y 
                utilizan datos reales de las {masterData.summary?.total_connected || 0} plataforma(s) conectada(s). 
                Sistema {masterData.summary?.ready_percentage?.toFixed(1)}% completado.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}