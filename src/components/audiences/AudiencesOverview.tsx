// src/components/audiences/AudiencesOverview.tsx
'use client';

import { useState } from 'react';
import { Brain, Target, Zap, DollarSign, TrendingUp, Plus, Search, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useStatus } from '../../contexts/StatusContext';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface RealAudience {
  id: string;
  name: string;
  type: 'ai_discovered' | 'neural_lookalike' | 'predictive_behavioral' | 'real_time_conversion' | 'whatsapp_qualified';
  size: number;
  conversionRate: number;
  status: 'active' | 'optimizing' | 'neural_analyzing' | 'pending_setup';
  lastUpdated: string;
  revenue: number;
  cpa: number;
  roas: number;
  neural_confidence: number;
  source: string;
  ai_insights?: string[];
}

export function AudiencesOverview() {
  const { masterStatus, quintupleStatus, connectionError } = useStatus();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);

  // Generar audiencias reales basadas en Master Orchestrator
  const generateRealAudiences = (): RealAudience[] => {
    if (connectionError) return [];

    const neuralCompletion = quintupleStatus?.real_data_percentage || 0;
    
    // Si Neural está bajo 50%, solo mostrar setup requerido
    if (neuralCompletion < 50) {
      return [
        {
          id: '1',
          name: 'Motor de Descubrimiento Neural - Setup Requerido',
          type: 'ai_discovered',
          size: 0,
          conversionRate: 0,
          status: 'pending_setup',
          lastUpdated: 'Esperando configuración',
          revenue: 0,
          cpa: 0,
          roas: 0,
          neural_confidence: 0,
          source: 'Motor Neural - Esperando Setup de Plataformas',
          ai_insights: [
            'Requiere completar configuración del Quintuple AI',
            'Conectar todas las plataformas para comenzar discovery',
            'Una vez activo: Descubrimiento automático de audiencias 24/7'
          ]
        }
      ];
    }

    // Si está 50%+, generar audiencias con estructura real
    const audiencias = [];
    
    if ((quintupleStatus?.active_platforms || 0) >= 1) {
      audiencias.push({
        id: 'meta_1',
        name: 'Meta AI - Usuarios High Intent',
        type: 'ai_discovered' as const,
        size: 0,
        conversionRate: 0,
        status: 'active' as const,
        lastUpdated: 'Tiempo real',
        revenue: 0,
        cpa: 0,
        roas: 0,
        neural_confidence: neuralCompletion,
        source: 'Motor Neural Meta Ads',
        ai_insights: [
          'Plataforma conectada - esperando eventos',
          'Motor neural listo para discovery',
          'Configurar tracking para comenzar análisis'
        ]
      });
    }

    if ((quintupleStatus?.active_platforms || 0) >= 2) {
      audiencias.push({
        id: 'google_1',
        name: 'Google AI - Audiencia Performance Max',
        type: 'neural_lookalike' as const,
        size: 0,
        conversionRate: 0,
        status: 'active' as const,
        lastUpdated: 'Tiempo real',
        revenue: 0,
        cpa: 0,
        roas: 0,
        neural_confidence: neuralCompletion,
        source: 'Análisis Neural Google Ads',
        ai_insights: [
          'Google Ads conectado y listo',
          'Esperando datos de campaigns',
          'Optimización Performance Max disponible'
        ]
      });
    }

    if ((quintupleStatus?.active_platforms || 0) >= 3) {
      audiencias.push({
        id: 'tiktok_1',
        name: 'TikTok AI - Audiencia Contenido Viral',
        type: 'predictive_behavioral' as const,
        size: 0,
        conversionRate: 0,
        status: 'active' as const,
        lastUpdated: 'Tiempo real',
        revenue: 0,
        cpa: 0,
        roas: 0,
        neural_confidence: neuralCompletion,
        source: 'Motor Neural TikTok Ads',
        ai_insights: [
          'TikTok conectado - motor neural activo',
          'Esperando datos de engagement',
          'Predicción de contenido viral disponible'
        ]
      });
    }

    return audiencias;
  };

  const realAudiences = generateRealAudiences();

  // Performance data (inicialmente en 0)
  const neuralPerformanceData = [
    { month: 'Ene', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 },
    { month: 'Feb', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 },
    { month: 'Mar', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 },
    { month: 'Abr', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 },
    { month: 'May', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 },
    { month: 'Jun', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ai_discovered': return 'bg-purple-100 text-purple-700';
      case 'neural_lookalike': return 'bg-blue-100 text-blue-700';
      case 'predictive_behavioral': return 'bg-green-100 text-green-700';
      case 'real_time_conversion': return 'bg-yellow-100 text-yellow-700';
      case 'whatsapp_qualified': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'optimizing': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'neural_analyzing': return <Brain className="w-4 h-4 text-purple-600 animate-pulse" />;
      case 'pending_setup': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredAudiences = realAudiences.filter(audience => {
    const matchesSearch = audience.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || audience.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* KPI Cards con datos reales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Audiencias Neurales</p>
              <p className="text-2xl font-bold text-gray-900">{realAudiences.length}</p>
              <p className="text-sm text-purple-600 flex items-center mt-1">
                <Brain className="w-3 h-3 mr-1" />
                {quintupleStatus?.real_data_percentage || 0}% setup
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Usuarios Cualificados</p>
              <p className="text-2xl font-bold text-gray-900">
                {realAudiences.reduce((sum, aud) => sum + aud.size, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <Target className="w-3 h-3 mr-1" />
                Esperando eventos
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conv. Rate Neural</p>
              <p className="text-2xl font-bold text-gray-900">0%</p>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <Zap className="w-3 h-3 mr-1" />
                Esperando datos
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue Predicho</p>
              <p className="text-2xl font-bold text-gray-900">$0</p>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Esperando tracking
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar audiencias neurales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todos los tipos neurales</option>
              <option value="ai_discovered">IA Discovered</option>
              <option value="neural_lookalike">Neural Lookalike</option>
              <option value="predictive_behavioral">Predictive Behavioral</option>
              <option value="real_time_conversion">Real-Time Conversion</option>
              <option value="whatsapp_qualified">WhatsApp Qualified</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
              connectionError ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'
            }`}>
              <CheckCircle className="w-4 h-4 mr-1" />
              {connectionError ? 'Master Offline' : 'Master Conectado'}
            </div>
            <span className="text-sm text-gray-600">
              {filteredAudiences.length} audiencias neurales
            </span>
          </div>
        </div>
      </div>

      {/* Tabla Neural Audiences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {realAudiences.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Audiencia Neural
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo IA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tamaño
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conv. Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Neural Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AI Insights
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAudiences.map((audience) => (
                  <tr key={audience.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAudiences.includes(audience.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAudiences([...selectedAudiences, audience.id]);
                            } else {
                              setSelectedAudiences(selectedAudiences.filter(id => id !== audience.id));
                            }
                          }}
                          className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {audience.name}
                            <Brain className="w-3 h-3 ml-2 text-purple-500" />
                          </div>
                          <div className="text-sm text-gray-500">{audience.source}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(audience.type)}`}>
                        {audience.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {audience.size.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-600">
                        {audience.conversionRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${audience.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${audience.neural_confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-purple-600">
                          {audience.neural_confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(audience.status)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">
                          {audience.status.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {audience.ai_insights?.slice(0, 2).map((insight, idx) => (
                          <div key={idx} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                            {insight}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Brain className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sin Audiencias Neurales</h3>
            <p className="text-gray-500 mb-4">
              {connectionError 
                ? 'Necesitas conectar con Master Orchestrator para comenzar'
                : (quintupleStatus?.real_data_percentage || 0) < 50
                  ? 'Completa la configuración del Quintuple AI para activar descubrimiento neural'
                  : 'Crea tu primera audiencia neural o configura tracking para comenzar'
              }
            </p>
            {!connectionError && (quintupleStatus?.real_data_percentage || 0) >= 50 && (
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                <Plus className="w-4 h-4 mr-2 inline" />
                Crear Primera Audiencia Neural
              </button>
            )}
          </div>
        )}
      </div>

      {/* Neural Performance Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
            Performance del Motor Neural por Tipo
          </h3>
          <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
            connectionError ? 'text-red-600 bg-red-50' : 'text-purple-600 bg-purple-50'
          }`}>
            <Brain className="w-4 h-4 mr-1" />
            {connectionError ? 'Master Offline' : 'Master Conectado'}
          </div>
        </div>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={neuralPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: any) => [`${value.toLocaleString()}`, 'Revenue']} />
              <Legend />
              <Bar dataKey="ai_discovered" fill="#8B5CF6" name="AI Discovered" radius={[2, 2, 0, 0]} />
              <Bar dataKey="neural_lookalike" fill="#06D6A0" name="Neural Lookalike" radius={[2, 2, 0, 0]} />
              <Bar dataKey="whatsapp_qualified" fill="#FFD166" name="WhatsApp Qualified" radius={[2, 2, 0, 0]} />
              <Bar dataKey="predictive" fill="#F72585" name="Predictive" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {realAudiences.length === 0 && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Esperando datos para mostrar performance...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}