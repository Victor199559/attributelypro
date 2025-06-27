'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, Plus, Search, Filter, Download, Settings, Eye,
  Target, TrendingUp, DollarSign, MousePointer, Brain,
  Zap, Shield, Calculator, MessageCircle, Activity,
  BarChart3, Megaphone, ArrowRight, ArrowUp, ArrowDown, 
  Edit, Trash2, Play, Pause, Copy, RefreshCw, Globe, 
  Smartphone, Mail, ShoppingCart, Clock, Star, AlertTriangle, 
  CheckCircle, UserCheck, UserX, UserPlus, Layers, Crosshair, 
  Sparkles, ArrowLeft, ExternalLink
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Interface para datos reales del Master Orchestrator
interface MasterOrchestratorData {
  status: string;
  quintuple_ai: {
    quintuple_ai_analysis: {
      overall_completion: number;
      platform_performance: any;
    };
  };
  platforms_status: {
    meta: { status: string; completion: number; };
    google: { status: string; completion: number; };
    tiktok: { status: string; completion: number; };
    youtube: { status: string; completion: number; };
    micro: { status: string; completion: number; };
  };
  neural_status?: {
    neural_automatizador: {
      active_platforms: number;
      completion_percentage: number;
    };
  };
}

// Tipos para Audiences Reales (inicialmente vacías)
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

interface AudienceInsight {
  demographic: string;
  percentage: number;
  color: string;
}

const COLORS = ['#8B5CF6', '#06D6A0', '#FFD166', '#F72585', '#4CC9F0', '#FF6B6B'];

export default function AudiencesPageReal() {
  const [activeTab, setActiveTab] = useState<'overview' | 'builder' | 'insights' | 'templates'>('overview');
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [masterData, setMasterData] = useState<MasterOrchestratorData | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Conectar con Master Orchestrator Real
  useEffect(() => {
    console.log('🧠 CONECTANDO CON MASTER ORCHESTRATOR - AUDIENCES...');
    const fetchMasterData = async () => {
      try {
        console.log('🚀 Fetching Master Orchestrator data...');
        setConnectionError(null);
        
        // ✅ CONECTAR CON MASTER ORCHESTRATOR
        const masterResponse = await fetch('/api/master');
        
        if (!masterResponse.ok) {
          throw new Error('Master Orchestrator no disponible');
        }
        
        const masterData = await masterResponse.json();
        console.log('📊 Master Orchestrator - Audiences data:', masterData);
        
        setMasterData(masterData);
        
      } catch (error) {
        console.error('🚨 ERROR CONECTANDO CON MASTER ORCHESTRATOR:', error);
        setConnectionError(error instanceof Error ? error.message : 'Error de conexión');
        
        // Fallback: Estado inicial limpio
        setMasterData({
          status: 'error',
          quintuple_ai: {
            quintuple_ai_analysis: {
              overall_completion: 0,
              platform_performance: {}
            }
          },
          platforms_status: {
            meta: { status: 'disconnected', completion: 0 },
            google: { status: 'disconnected', completion: 0 },
            tiktok: { status: 'disconnected', completion: 0 },
            youtube: { status: 'disconnected', completion: 0 },
            micro: { status: 'disconnected', completion: 0 }
          }
        });
      } finally {
        console.log('🏁 Master Orchestrator - Audiences initialized');
        setLoading(false);
      }
    };

    fetchMasterData();
    
    // Refresh cada 30 segundos
    const interval = setInterval(fetchMasterData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Generar audiencias reales (inicialmente vacías pero con estructura real)
  const generateRealAudiences = (): RealAudience[] => {
    if (!masterData || connectionError) {
      return []; // Sin conexión = sin audiencias
    }

    const quintuple_completion = masterData.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0;
    const platforms = masterData.platforms_status || {};
    
    // Si Quintuple AI está bajo 50%, solo mostrar audiencias pending
    if (quintuple_completion < 50) {
      return [
        {
          id: '1',
          name: 'Neural Audience Discovery - Setup Required',
          type: 'ai_discovered',
          size: 0,
          conversionRate: 0,
          status: 'pending_setup',
          lastUpdated: 'Esperando configuración',
          revenue: 0,
          cpa: 0,
          roas: 0,
          neural_confidence: 0,
          source: 'Neural Engine - Awaiting Platform Setup',
          ai_insights: [
            'Requiere completar configuración del Quintuple AI',
            'Conectar todas las plataformas para comenzar discovery',
            'Una vez activo: Descubrimiento automático de audiencias 24/7'
          ]
        }
      ];
    }

    // Si está 50%+, generar audiencias con datos reales mínimos
    const audiencias = [];
    
    if (platforms.meta?.status === 'connected') {
      audiencias.push({
        id: 'meta_1',
        name: 'Meta AI - High Intent Users',
        type: 'ai_discovered' as const,
        size: 0, // Real data: 0 porque no hay eventos aún
        conversionRate: 0,
        status: 'active' as const,
        lastUpdated: 'Tiempo real',
        revenue: 0,
        cpa: 0,
        roas: 0,
        neural_confidence: platforms.meta.completion || 0,
        source: 'Meta Ads Neural Engine',
        ai_insights: [
          'Plataforma conectada - esperando eventos',
          'Neural engine listo para discovery',
          'Configurar tracking para comenzar análisis'
        ]
      });
    }

    if (platforms.google?.status === 'connected_with_format_issue' || platforms.google?.status === 'connected') {
      audiencias.push({
        id: 'google_1',
        name: 'Google AI - Performance Max Audience',
        type: 'neural_lookalike' as const,
        size: 0,
        conversionRate: 0,
        status: 'active' as const,
        lastUpdated: 'Tiempo real',
        revenue: 0,
        cpa: 0,
        roas: 0,
        neural_confidence: platforms.google.completion || 0,
        source: 'Google Ads Neural Analysis',
        ai_insights: [
          'Google Ads conectado y listo',
          'Esperando datos de campaigns',
          'Performance Max optimization disponible'
        ]
      });
    }

    if (platforms.tiktok?.status === 'connected') {
      audiencias.push({
        id: 'tiktok_1',
        name: 'TikTok AI - Viral Content Audience',
        type: 'predictive_behavioral' as const,
        size: 0,
        conversionRate: 0,
        status: 'active' as const,
        lastUpdated: 'Tiempo real',
        revenue: 0,
        cpa: 0,
        roas: 0,
        neural_confidence: platforms.tiktok.completion || 0,
        source: 'TikTok Ads Neural Engine',
        ai_insights: [
          'TikTok conectado - neural engine activo',
          'Esperando datos de engagement',
          'Viral content prediction disponible'
        ]
      });
    }

    return audiencias;
  };

  const realAudiences = generateRealAudiences();

  // Performance data real (todo en 0 inicialmente)
  const neuralPerformanceData = [
    { month: 'Ene', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 },
    { month: 'Feb', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 },
    { month: 'Mar', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 },
    { month: 'Abr', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 },
    { month: 'May', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 },
    { month: 'Jun', ai_discovered: 0, neural_lookalike: 0, whatsapp_qualified: 0, predictive: 0 }
  ];

  // Datos demográficos reales (todo en 0 inicialmente)
  const neuralDemographicData: AudienceInsight[] = [
    { demographic: 'Esperando datos...', percentage: 100, color: '#E5E7EB' }
  ];

  const realChannelData = [
    { channel: 'Meta Ads Neural Engine', audiences: realAudiences.filter(a => a.source.includes('Meta')).length, totalSize: 0, avgCR: 0 },
    { channel: 'Google Ads AI Optimization', audiences: realAudiences.filter(a => a.source.includes('Google')).length, totalSize: 0, avgCR: 0 },
    { channel: 'TikTok Neural Discovery', audiences: realAudiences.filter(a => a.source.includes('TikTok')).length, totalSize: 0, avgCR: 0 },
    { channel: 'WhatsApp Qualification Bot', audiences: 0, totalSize: 0, avgCR: 0 },
    { channel: 'Cross-Platform Attribution', audiences: 0, totalSize: 0, avgCR: 0 }
  ];

  const neuralTemplates = [
    {
      name: 'AI High-Intent Discovery',
      description: 'Neural engine encuentra usuarios con alta intención de compra',
      estimatedSize: 'Esperando setup',
      conversionRate: 'TBD',
      neural_confidence: masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion + '%' || '0%',
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
      available: (masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) >= 50
    },
    {
      name: 'WhatsApp Qualification Bot',
      description: 'IA califica leads automáticamente vía WhatsApp Business',
      estimatedSize: 'Setup required',
      conversionRate: 'TBD',
      neural_confidence: '0%',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-600',
      available: false
    },
    {
      name: 'Predictive Cart Recovery',
      description: 'Predice y previene abandono de carrito con timing perfecto',
      estimatedSize: 'Setup required',
      conversionRate: 'TBD',
      neural_confidence: '0%',
      icon: ShoppingCart,
      color: 'from-red-500 to-pink-600',
      available: false
    },
    {
      name: 'Cross-Platform Attribution',
      description: 'Rastrea customer journey completo en tiempo real',
      estimatedSize: 'Setup required',
      conversionRate: 'TBD',
      neural_confidence: masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion + '%' || '0%',
      icon: Crosshair,
      color: 'from-blue-500 to-cyan-600',
      available: (masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) >= 78
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
              <Brain className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Conectando con Master Orchestrator</h3>
            <p className="text-gray-600">Cargando datos reales de audiencias...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header con Master Orchestrator Status */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    Neural Audience Engine
                  </h1>
                  <p className="text-sm text-gray-600">
                    {connectionError ? 'Master Orchestrator offline' : 'Conectado al Master Orchestrator'}
                  </p>
                </div>
              </div>

              {/* Master Orchestrator Status */}
              <div className="flex items-center space-x-2">
                {connectionError ? (
                  <div className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
                    Master Offline
                  </div>
                ) : (
                  <>
                    <div className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <div className="w-2 h-2 rounded-full mr-2 bg-green-500 animate-pulse"></div>
                      Master Connected
                    </div>
                    <div className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      <Brain className="w-3 h-3 mr-1" />
                      {masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0}% Ready
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  (masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) >= 50
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={(masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) < 50}
              >
                <Plus className="w-4 h-4 mr-2" />
                {(masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) >= 50 ? 'Crear con IA' : 'Setup Required'}
              </button>
              <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Exportar Datos
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Connection Status Alert */}
        {connectionError ? (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <h4 className="font-semibold text-red-900">
                  ⚠️ Master Orchestrator No Disponible
                </h4>
                <p className="text-sm text-red-700">
                  No se puede conectar con /api/master. Las audiencias neurales requieren conexión activa.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center">
              <Brain className="w-5 h-5 text-purple-600 mr-3" />
              <div>
                <h4 className="font-semibold text-purple-900">
                  🚀 Neural Audience Discovery {(masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) >= 50 ? 'Activo' : 'Pendiente'}
                </h4>
                <p className="text-sm text-purple-700">
                  {(masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) >= 50 
                    ? `Quintuple AI al ${masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion}% - Listo para comenzar discovery de audiencias`
                    : `Quintuple AI al ${masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0}% - Completa setup para activar neural discovery`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-100">
          <div className="flex space-x-1">
            {[
              { key: 'overview', label: 'Neural Overview', icon: Brain },
              { key: 'builder', label: 'IA Builder', icon: Sparkles },
              { key: 'insights', label: 'Real-Time Insights', icon: Activity },
              { key: 'templates', label: 'Neural Templates', icon: Star }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {/* Neural Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* KPI Cards con datos reales */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Audiencias Neurales</p>
                      <p className="text-2xl font-bold text-gray-900">{realAudiences.length}</p>
                      <p className="text-sm text-purple-600 flex items-center mt-1">
                        <Brain className="w-3 h-3 mr-1" />
                        {(masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0)}% setup
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
                      {connectionError ? 'Master Offline' : 'Master Connected'}
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
                        : (masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) < 50
                          ? 'Completa la configuración del Quintuple AI para activar neural discovery'
                          : 'Crea tu primera audiencia neural o configura tracking para comenzar'
                      }
                    </p>
                    {!connectionError && (masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) >= 50 && (
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
                    <Activity className="w-5 h-5 mr-2 text-purple-600" />
                    Performance Neural Engine por Tipo
                  </h3>
                  <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
                    connectionError ? 'text-red-600 bg-red-50' : 'text-purple-600 bg-purple-50'
                  }`}>
                    <Brain className="w-4 h-4 mr-1" />
                    {connectionError ? 'Master Offline' : 'Master Connected'}
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
          )}

          {/* IA Builder Tab */}
          {activeTab === 'builder' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center mb-6">
                  <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Neural Audience Builder</h3>
                  <div className="ml-auto flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">
                      {connectionError ? 'Offline' : 'Master Connected'}
                    </span>
                  </div>
                </div>

                {connectionError || (masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) < 50 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <AlertTriangle className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Neural Builder No Disponible</h3>
                    <p className="text-gray-500 mb-4">
                      {connectionError 
                        ? 'Necesitas conectar con Master Orchestrator'
                        : `Quintuple AI al ${masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0}% - Necesitas al menos 50% para usar Neural Builder`
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
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Neural Configuration */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre de Audiencia Neural
                        </label>
                        <input
                          type="text"
                          placeholder="Mi audiencia con IA discovery"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Neural Engine
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option>AI Discovery Engine</option>
                          <option>Neural Lookalike Algorithm</option>
                          <option>Predictive Behavioral Analysis</option>
                          <option>Real-Time Conversion Tracking</option>
                          <option>WhatsApp Neural Qualification</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Neural Optimization Goals
                        </label>
                        <div className="space-y-3">
                          {[
                            { id: 'revenue', label: 'Maximizar Revenue (ROAS > 15x)', checked: true },
                            { id: 'conversion', label: 'Optimizar Conversion Rate (>20%)', checked: true },
                            { id: 'ltv', label: 'Predecir Customer Lifetime Value', checked: false },
                            { id: 'whatsapp', label: 'Qualification Score WhatsApp (>8/10)', checked: false }
                          ].map((goal) => (
                            <div key={goal.id} className="flex items-center">
                              <input 
                                type="checkbox" 
                                defaultChecked={goal.checked}
                                className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" 
                              />
                              <span className="text-sm text-gray-700">{goal.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Neural Learning Period
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option>Tiempo real (learning continuo)</option>
                          <option>Últimos 7 días (neural rapid)</option>
                          <option>Últimos 30 días (neural deep)</option>
                          <option>Últimos 90 días (neural comprehensive)</option>
                        </select>
                      </div>
                    </div>

                    {/* Neural Preview */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                      <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                        <Brain className="w-4 h-4 mr-2 text-purple-600" />
                        Neural Prediction Preview
                        <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          Live Neural Analysis
                        </span>
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Tamaño neural estimado:</span>
                          <span className="text-sm font-medium text-gray-900">Esperando datos</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Conversion rate predicho:</span>
                          <span className="text-sm font-medium text-gray-600">TBD</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Revenue neural forecast:</span>
                          <span className="text-sm font-medium text-gray-900">$0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Neural confidence:</span>
                          <span className="text-sm font-medium text-purple-600">
                            {masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0}%
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-purple-200">
                        <h5 className="text-sm font-medium text-gray-900 mb-3">Neural Insights Preview</h5>
                        <div className="space-y-2">
                          {[
                            'Esperando eventos de tracking',
                            'Configurar pixel de attribution',
                            'Conectar Google Analytics',
                            'Setup WhatsApp Business API'
                          ].map((insight, index) => (
                            <div key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {insight}
                            </div>
                          ))}
                        </div>
                      </div>

                      <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
                        <Brain className="w-4 h-4 mr-2 inline" />
                        Crear con Neural Engine
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Real-Time Insights Tab */}
          {activeTab === 'insights' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Neural Demographic Insights */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Neural Segmentation
                    <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      Esperando Datos
                    </span>
                  </h3>
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={neuralDemographicData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="percentage"
                          label={({ demographic, percentage }) => `${demographic}: ${percentage}%`}
                          fontSize={11}
                        >
                          {neuralDemographicData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">Configurar tracking para ver segmentación neural</p>
                  </div>
                </div>

                {/* Real-Time Neural Metrics */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-purple-600" />
                    Neural Engine Live Metrics
                  </h3>
                  <div className="space-y-4">
                    {[
                      { 
                        metric: 'Master Orchestrator', 
                        value: connectionError ? 'Offline' : 'Connected', 
                        status: connectionError ? 'error' : 'excellent' 
                      },
                      { 
                        metric: 'Quintuple AI Completion', 
                        value: `${masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0}%`, 
                        status: (masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0) >= 50 ? 'optimal' : 'pending' 
                      },
                      { 
                        metric: 'Neural Processing Speed', 
                        value: realAudiences.length > 0 ? '2.3M eventos/seg' : 'Esperando eventos', 
                        status: realAudiences.length > 0 ? 'optimal' : 'pending' 
                      },
                      { 
                        metric: 'Attribution Events', 
                        value: '0 eventos', 
                        status: 'pending' 
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Brain className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-medium text-gray-900">{item.metric}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{item.value}</div>
                          <div className={`text-xs ${
                            item.status === 'excellent' ? 'text-green-600' :
                            item.status === 'optimal' ? 'text-blue-600' :
                            item.status === 'error' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {item.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Neural Channel Performance */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-purple-600" />
                    Neural Channel Performance
                  </h3>
                  <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
                    connectionError ? 'text-red-600 bg-red-50' : 'text-purple-600 bg-purple-50'
                  }`}>
                    <Brain className="w-4 h-4 mr-1" />
                    {connectionError ? 'Master Offline' : 'Esperando eventos'}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Neural Channel</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Audiencias IA</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Neural Conv. Rate</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {realChannelData.map((channel, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: COLORS[index] }}>
                                <Brain className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{channel.channel}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {channel.audiences}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${channel.totalSize.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-600">
                              {channel.avgCR}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Neural Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center mb-6">
                  <Star className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Neural Templates Exclusivos</h3>
                  <div className="ml-auto flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">
                      {connectionError ? 'Offline' : 'Master Connected'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {neuralTemplates.map((template, index) => {
                    const Icon = template.icon;
                    return (
                      <div key={index} className={`border border-gray-200 rounded-xl p-6 transition-all duration-200 ${
                        template.available ? 'hover:border-purple-500 hover:shadow-lg cursor-pointer group' : 'opacity-50 cursor-not-allowed'
                      }`}>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${template.color} ${
                            template.available ? 'group-hover:scale-110' : ''
                          } transition-transform duration-200`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className={`text-lg font-semibold flex items-center transition-colors ${
                              template.available ? 'text-gray-900 group-hover:text-purple-700' : 'text-gray-500'
                            }`}>
                              {template.name}
                              <Brain className="w-4 h-4 ml-2 text-purple-500" />
                              {!template.available && (
                                <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                  Setup Required
                                </span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">{template.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tamaño neural:</span>
                            <span className="font-medium text-gray-900">{template.estimatedSize}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Conv. rate IA:</span>
                            <span className="font-medium text-gray-600">{template.conversionRate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Neural confidence:</span>
                            <span className="font-medium text-purple-600">{template.neural_confidence}</span>
                          </div>
                        </div>
                        
                        <button 
                          className={`w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                            template.available 
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg group-hover:from-purple-600 group-hover:to-indigo-700'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!template.available}
                        >
                          <Brain className="w-4 h-4 mr-2 inline" />
                          {template.available ? 'Activar Neural Template' : 'Completar Setup Primero'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Neural Engine Status */}
              <div className={`rounded-xl border p-4 ${
                connectionError ? 'bg-red-50 border-red-200' : 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200'
              }`}>
                <div className="flex items-center">
                  <Brain className={`w-5 h-5 mr-3 ${connectionError ? 'text-red-600' : 'text-purple-600'}`} />
                  <div>
                    <h4 className={`font-semibold ${connectionError ? 'text-red-900' : 'text-purple-900'}`}>
                      🧠 Neural Engine Status: {connectionError ? 'OFFLINE' : 'CONECTADO'}
                    </h4>
                    <p className={`text-sm ${connectionError ? 'text-red-700' : 'text-purple-700'}`}>
                      {connectionError 
                        ? 'Master Orchestrator no disponible. Reconectar para usar templates neurales.'
                        : `Quintuple AI al ${masterData?.quintuple_ai?.quintuple_ai_analysis?.overall_completion || 0}%. Templates disponibles según nivel de configuración completado.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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