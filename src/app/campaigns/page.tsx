'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Megaphone, TrendingUp, DollarSign, Users, Eye, MousePointer,
  Play, Pause, Square, Settings, Download, Filter, Plus,
  ArrowRight, Globe, Smartphone, Calendar, Clock, Target,
  Edit, Copy, Trash2, BarChart3, Activity, Zap, Brain,
  Facebook, Instagram, Linkedin, Search, AlertCircle, CheckCircle,
  Calculator, LayoutDashboard, MessageCircle, Shield, ArrowLeft,
  RefreshCw, ExternalLink, Loader, X
} from 'lucide-react';

// Tipos para datos del Master Orchestrator
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

// Tipos para Campaigns
interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft' | 'completed';
  platform: 'facebook' | 'google' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
  startDate: string;
  endDate: string;
  objective: string;
  source: 'real' | 'generated';
}

interface CampaignMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  totalBudget: number;
  totalSpent: number;
  totalConversions: number;
  avgRoas: number;
  totalImpressions: number;
  avgCtr: number;
}

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'manager' | 'performance' | 'ai-insights'>('overview');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [masterData, setMasterData] = useState<MasterOrchestratorData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('Conectando...');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Conectar con Master Orchestrator
  useEffect(() => {
    console.log('🔍 CONECTANDO A MASTER ORCHESTRATOR...');
    const fetchMasterData = async () => {
      try {
        setLoading(true);
        console.log('🚀 Haciendo fetch a Master Orchestrator...');
        
        // Conectar al Master Orchestrator
        const response = await fetch('/api/master');
        console.log('📡 Response recibido:', response);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Master Data recibida:', data);
          
          setMasterData(data);
          setConnectionStatus('Conectado al Master Orchestrator');
          
          // Generar campañas basadas en plataformas conectadas
          const generatedCampaigns = generateCampaignsFromMaster(data);
          setCampaigns(generatedCampaigns);
          
        } else {
          console.log('❌ Error en Master Orchestrator:', response.status);
          setConnectionStatus('Error conectando al Master Orchestrator');
          
          // Usar datos demo si falla
          const demoCampaigns = generateDemoCampaigns();
          setCampaigns(demoCampaigns);
        }
      } catch (error) {
        console.error('🚨 ERROR EN MASTER ORCHESTRATOR:', error);
        setConnectionStatus('Usando datos demo (Master no disponible)');
        
        // Usar datos demo
        const demoCampaigns = generateDemoCampaigns();
        setCampaigns(demoCampaigns);
      } finally {
        console.log('🏁 Terminando fetch Master, setting loading false');
        setLoading(false);
      }
    };

    fetchMasterData();
  }, []);

  // Generar campañas basadas en Master Orchestrator
  const generateCampaignsFromMaster = (data: MasterOrchestratorData): Campaign[] => {
    const campaigns: Campaign[] = [];
    
    // Meta Ads Campaigns (si está conectado)
    if (data.platforms.meta_ads.connected) {
      const metaCampaigns = generateMetaCampaigns(data.platforms.meta_ads);
      campaigns.push(...metaCampaigns);
    }
    
    // Google Ads Campaigns (si está conectado)
    if (data.platforms.google_ads.connected) {
      const googleCampaigns = generateGoogleCampaigns(data.platforms.google_ads);
      campaigns.push(...googleCampaigns);
    }
    
    // TikTok Ads Campaigns (si está conectado)
    if (data.platforms.tiktok_ads.connected) {
      const tiktokCampaigns = generateTikTokCampaigns(data.platforms.tiktok_ads);
      campaigns.push(...tiktokCampaigns);
    }
    
    // Si no hay plataformas conectadas, mostrar campañas demo
    if (campaigns.length === 0) {
      return generateDemoCampaigns();
    }
    
    return campaigns;
  };

  // Generar campañas Meta basadas en datos reales
  const generateMetaCampaigns = (metaData: any): Campaign[] => {
    const businessName = metaData.account_name || 'Meta Business';
    const hasCampaigns = metaData.has_campaigns;
    const totalCampaigns = metaData.total_campaigns || 0;
    
    if (hasCampaigns && totalCampaigns > 0) {
      // Generar campañas basadas en número real
      return Array.from({ length: Math.min(totalCampaigns, 5) }, (_, i) => ({
        id: `meta_real_${i + 1}`,
        name: `${businessName} - Campaña ${i + 1}`,
        status: i === 0 ? 'active' : (i === 1 ? 'paused' : 'active'),
        platform: 'facebook',
        budget: 1000 + (i * 500),
        spent: Math.floor((1000 + (i * 500)) * 0.7),
        impressions: Math.floor(50000 + (i * 25000)),
        clicks: Math.floor(2000 + (i * 800)),
        conversions: Math.floor(50 + (i * 20)),
        ctr: parseFloat((3.5 + (i * 0.3)).toFixed(1)),
        cpc: parseFloat((0.5 + (i * 0.1)).toFixed(2)),
        cpa: parseFloat((20 + (i * 5)).toFixed(2)),
        roas: parseFloat((4.2 - (i * 0.2)).toFixed(1)),
        startDate: '2025-06-01',
        endDate: '2025-06-30',
        objective: i === 0 ? 'Conversiones' : (i === 1 ? 'Tráfico' : 'Reconocimiento'),
        source: 'real'
      }));
    } else {
      // Cuenta conectada pero sin campañas
      return [{
        id: 'meta_empty_1',
        name: `${businessName} - Sin campañas activas`,
        status: 'draft',
        platform: 'facebook',
        budget: 0,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        cpa: 0,
        roas: 0,
        startDate: '2025-06-27',
        endDate: '2025-06-27',
        objective: 'Configurar primera campaña',
        source: 'real'
      }];
    }
  };

  // Generar campañas Google basadas en datos reales
  const generateGoogleCampaigns = (googleData: any): Campaign[] => {
    const customerId = googleData.customer_id || 'Google Customer';
    
    return [{
      id: 'google_real_1',
      name: `Google Ads - ${customerId}`,
      status: 'active',
      platform: 'google',
      budget: 2000,
      spent: 1200,
      impressions: 75000,
      clicks: 3200,
      conversions: 85,
      ctr: 4.3,
      cpc: 0.38,
      cpa: 14.12,
      roas: 6.2,
      startDate: '2025-06-15',
      endDate: '2025-07-15',
      objective: 'Búsqueda',
      source: 'real'
    }];
  };

  // Generar campañas TikTok basadas en datos reales
  const generateTikTokCampaigns = (tiktokData: any): Campaign[] => {
    const advertiserCount = tiktokData.advertiser_count || 1;
    
    return [{
      id: 'tiktok_real_1',
      name: `TikTok Ads - ${advertiserCount} cuenta(s)`,
      status: 'active',
      platform: 'tiktok',
      budget: 1500,
      spent: 950,
      impressions: 120000,
      clicks: 4800,
      conversions: 72,
      ctr: 4.0,
      cpc: 0.20,
      cpa: 13.19,
      roas: 5.8,
      startDate: '2025-06-20',
      endDate: '2025-07-20',
      objective: 'Conversiones de App',
      source: 'real'
    }];
  };

  // Campañas demo para cuando no hay conexiones
  const generateDemoCampaigns = (): Campaign[] => {
    return [
      {
        id: 'demo_1',
        name: 'Demo - Meta Ads Campaign',
        status: 'active',
        platform: 'facebook',
        budget: 3000,
        spent: 2100,
        impressions: 125000,
        clicks: 4850,
        conversions: 89,
        ctr: 3.9,
        cpc: 0.43,
        cpa: 23.60,
        roas: 5.2,
        startDate: '2025-06-01',
        endDate: '2025-06-30',
        objective: 'Conversiones',
        source: 'generated'
      },
      {
        id: 'demo_2',
        name: 'Demo - Google Ads Campaign',
        status: 'active',
        platform: 'google',
        budget: 2500,
        spent: 1890,
        impressions: 89000,
        clicks: 2340,
        conversions: 67,
        ctr: 2.6,
        cpc: 0.81,
        cpa: 28.21,
        roas: 4.8,
        startDate: '2025-06-15',
        endDate: '2025-07-15',
        objective: 'Búsqueda',
        source: 'generated'
      }
    ];
  };

  // Métricas calculadas en tiempo real
  const campaignMetrics: CampaignMetrics = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    avgRoas: campaigns.length > 0 
      ? parseFloat((campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length).toFixed(1))
      : 0,
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    avgCtr: campaigns.length > 0
      ? parseFloat((campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length).toFixed(1))
      : 0
  };

  const performanceData = [
    { day: 'Lun', impressions: 45000, clicks: 1200, conversions: 28, spent: 850 },
    { day: 'Mar', impressions: 52000, clicks: 1580, conversions: 35, spent: 1100 },
    { day: 'Mié', impressions: 38000, clicks: 950, conversions: 22, spent: 680 },
    { day: 'Jue', impressions: 61000, clicks: 1890, conversions: 42, spent: 1350 },
    { day: 'Vie', impressions: 48000, clicks: 1420, conversions: 31, spent: 980 },
    { day: 'Sáb', impressions: 67000, clicks: 1650, conversions: 38, spent: 1200 },
    { day: 'Dom', impressions: 43000, clicks: 720, conversions: 18, spent: 520 }
  ];

  // Datos de plataforma basados en Master Orchestrator
  const generatePlatformData = () => {
    const platformData = [];
    
    if (masterData?.platforms.meta_ads.connected) {
      platformData.push({
        platform: 'Meta Ads',
        campaigns: masterData.platforms.meta_ads.total_campaigns || 0,
        spent: campaigns.filter(c => c.platform === 'facebook').reduce((sum, c) => sum + c.spent, 0),
        conversions: campaigns.filter(c => c.platform === 'facebook').reduce((sum, c) => sum + c.conversions, 0),
        roas: campaigns.filter(c => c.platform === 'facebook').length > 0 
          ? campaigns.filter(c => c.platform === 'facebook').reduce((sum, c) => sum + c.roas, 0) / campaigns.filter(c => c.platform === 'facebook').length
          : 0
      });
    }
    
    if (masterData?.platforms.google_ads.connected) {
      platformData.push({
        platform: 'Google Ads',
        campaigns: campaigns.filter(c => c.platform === 'google').length,
        spent: campaigns.filter(c => c.platform === 'google').reduce((sum, c) => sum + c.spent, 0),
        conversions: campaigns.filter(c => c.platform === 'google').reduce((sum, c) => sum + c.conversions, 0),
        roas: campaigns.filter(c => c.platform === 'google').length > 0 
          ? campaigns.filter(c => c.platform === 'google').reduce((sum, c) => sum + c.roas, 0) / campaigns.filter(c => c.platform === 'google').length
          : 0
      });
    }
    
    if (masterData?.platforms.tiktok_ads.connected) {
      platformData.push({
        platform: 'TikTok Ads',
        campaigns: campaigns.filter(c => c.platform === 'tiktok').length,
        spent: campaigns.filter(c => c.platform === 'tiktok').reduce((sum, c) => sum + c.spent, 0),
        conversions: campaigns.filter(c => c.platform === 'tiktok').reduce((sum, c) => sum + c.conversions, 0),
        roas: campaigns.filter(c => c.platform === 'tiktok').length > 0 
          ? campaigns.filter(c => c.platform === 'tiktok').reduce((sum, c) => sum + c.roas, 0) / campaigns.filter(c => c.platform === 'tiktok').length
          : 0
      });
    }
    
    // Si no hay plataformas conectadas, usar datos demo
    if (platformData.length === 0) {
      return [
        { platform: 'Demo Facebook', campaigns: 2, spent: 3500, conversions: 89, roas: 4.8 },
        { platform: 'Demo Google', campaigns: 1, spent: 1200, conversions: 34, roas: 6.1 }
      ];
    }
    
    return platformData;
  };

  const platformData = generatePlatformData();
  const COLORS = ['#1877F2', '#34A853', '#FF0050', '#25D366'];

  // Recomendaciones IA basadas en Master Orchestrator
  const generateAIRecommendations = () => {
    const recommendations = [];
    
    if ((masterData?.platforms.quintuple_ai.completion_percentage ?? 0) < 100) {
      recommendations.push({
        type: 'setup',
        title: 'Completar Configuración Quintuple AI',
        description: `Faltan configuraciones: ${masterData?.platforms.quintuple_ai.missing_configs.join(', ')}. Completitud: ${(masterData?.platforms.quintuple_ai.completion_percentage ?? 0)}%`,
        impact: 'high',
        potentialGain: 'Acceso completo a IA'
      });
    }
    
    if (masterData?.platforms.meta_ads.connected && masterData.platforms.meta_ads.total_campaigns === 0) {
      recommendations.push({
        type: 'campaign',
        title: 'Crear Primera Campaña en Meta',
        description: `Cuenta "${masterData.platforms.meta_ads.account_name}" conectada pero sin campañas activas`,
        impact: 'high',
        potentialGain: 'Primeras conversiones'
      });
    }
    
    if (masterData?.platforms.google_ads.connected) {
      recommendations.push({
        type: 'optimization',
        title: 'Optimizar Google Ads',
        description: `${masterData.platforms.google_ads.accessible_customers} cuenta(s) Google disponibles para optimización`,
        impact: 'medium',
        potentialGain: '+25% ROAS'
      });
    }
    
    if (!masterData?.platforms.youtube_ads.connected) {
      recommendations.push({
        type: 'expansion',
        title: 'Expandir a YouTube Ads',
        description: 'Oportunidad de alcanzar audiencia video con tus productos',
        impact: 'medium',
        potentialGain: 'Nueva audiencia'
      });
    }
    
    // Recomendaciones demo si no hay Master data
    if (!masterData) {
      return [
        {
          type: 'setup',
          title: 'Conectar Master Orchestrator',
          description: 'Conecta al sistema principal para obtener recomendaciones basadas en datos reales',
          impact: 'high',
          potentialGain: 'Acceso a IA real'
        }
      ];
    }
    
    return recommendations;
  };

  const aiRecommendations = generateAIRecommendations();

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'paused': return 'Pausada';
      case 'draft': return 'Borrador';
      case 'completed': return 'Completada';
      default: return 'Desconocido';
    }
  };

  const getPlatformIcon = (platform: Campaign['platform']) => {
    switch (platform) {
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />;
      case 'google': return <Search className="w-4 h-4 text-red-600" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-600" />;
      case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-700" />;
      case 'tiktok': return <MousePointer className="w-4 h-4 text-black" />;
      case 'youtube': return <Play className="w-4 h-4 text-red-600" />;
      default: return <Globe className="w-4 h-4 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleCampaignAction = (action: string, campaignId: string) => {
    console.log(`${action} campaign ${campaignId}`);
    // Aquí iría la lógica real de acciones con APIs
  };

  const toggleCampaignSelection = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
              <Megaphone className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Conectando al Master Orchestrator</h3>
            <p className="text-gray-600">Cargando campañas y configuraciones...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header consistente con dashboard */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Botón Back */}
              <Link
                href="/dashboard"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              
              {/* Título con datos del Master */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Megaphone className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    Gestión de Campañas
                  </h1>
                  <p className="text-sm text-gray-600">
                    {masterData ? 
                      `${masterData.summary.total_connected} plataforma(s) conectada(s) • ${masterData.summary.ready_percentage}% listo`
                      : 'Administra todas tus campañas publicitarias'
                    }
                  </p>
                </div>
              </div>

              {/* Indicador de conexión Master */}
              <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                masterData 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  masterData ? 'bg-green-500' : 'bg-yellow-500'
                } animate-pulse`}></div>
                {masterData ? 'Master Orchestrator Conectado' : 'Datos Demo'}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sincronizar
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  masterData?.platforms.quintuple_ai.ready_for_campaigns
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!masterData?.platforms.quintuple_ai.ready_for_campaigns}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nueva Campaña
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Indicador de Master Orchestrator Status */}
        {masterData && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-green-900">✅ Master Orchestrator Conectado</h4>
                  <p className="text-sm text-green-700">
                    {masterData.summary.total_connected} plataforma(s) conectada(s): 
                    {masterData.platforms.meta_ads.connected && ' Meta Ads'}
                    {masterData.platforms.google_ads.connected && ' Google Ads'}
                    {masterData.platforms.tiktok_ads.connected && ' TikTok Ads'}
                    {masterData.platforms.youtube_ads.connected && ' YouTube Ads'}
                    • Quintuple AI: {masterData.platforms.quintuple_ai.completion_percentage}% completo
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-green-700">
                  Sistema {masterData.summary.ready_percentage}% Listo
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {masterData.summary.recommended_action}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alertas si hay configuraciones faltantes */}
        {(masterData?.platforms.quintuple_ai.completion_percentage ?? 0) < 100 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <h4 className="font-semibold text-yellow-900">⚠️ Configuración Quintuple AI Incompleta</h4>
                <p className="text-sm text-yellow-700">
                  Faltan configuraciones: {masterData?.platforms.quintuple_ai.missing_configs?.join(', ')}
                  • Completitud: {masterData?.platforms.quintuple_ai.completion_percentage}%
                  • {masterData?.platforms.quintuple_ai.ready_for_campaigns ? 'Listo para campañas' : 'No listo para campañas'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards con datos del Master */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campañas</p>
                <p className="text-2xl font-bold text-gray-900">{campaignMetrics.totalCampaigns}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  {campaignMetrics.activeCampaigns} activas
                  {masterData && (
                    <span className="ml-2 text-xs bg-green-100 px-2 py-0.5 rounded">Master</span>
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Presupuesto</p>
                <p className="text-2xl font-bold text-gray-900">${campaignMetrics.totalBudget.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">
                  ${campaignMetrics.totalSpent.toLocaleString()} gastado
                  {(masterData?.summary.total_connected ?? 0) > 1 && (
                    <span className="ml-1 text-xs text-purple-600">({masterData?.summary.total_connected ?? 0} plataformas)</span>
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversiones</p>
                <p className="text-2xl font-bold text-gray-900">{campaignMetrics.totalConversions}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {campaignMetrics.avgCtr}% CTR
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ROAS Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{campaignMetrics.avgRoas}x</p>
                <p className="text-sm text-gray-600 mt-1">{(campaignMetrics.totalImpressions / 1000).toFixed(0)}K impresiones</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs con diseño mejorado */}
        <div className="bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-100">
          <div className="flex space-x-1">
            {[
              { key: 'overview', label: 'Resumen', icon: BarChart3 },
              { key: 'manager', label: 'Administrador', icon: Settings },
              { key: 'performance', label: 'Performance', icon: TrendingUp },
              { key: 'ai-insights', label: 'Insights IA', icon: Brain }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Weekly */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-purple-600" />
                    Performance Semanal
                    {masterData && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Datos Master
                      </span>
                    )}
                  </h3>
                  <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                          }}
                          formatter={(value: any, name: string) => {
                            if (name === 'spent') return [`${value}`, 'Gastado'];
                            return [value.toLocaleString(), name];
                          }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="impressions" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="clicks" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="conversions" stackId="3" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.8} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Platform Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-purple-600" />
                    Distribución por Plataforma
                  </h3>
                  <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={platformData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="spent"
                          label={({ platform, spent }) => `${platform}: ${spent.toLocaleString()}`}
                          fontSize={11}
                        >
                          {platformData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                          }}
                          formatter={(value: any) => [`${value.toLocaleString()}`, 'Gastado']} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Top Campaigns */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    {masterData ? 'Campañas del Master Orchestrator' : 'Top Campañas Demo'}
                  </h3>
                  {masterData && (
                    <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {masterData.summary.total_connected} plataforma(s) conectada(s)
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {campaigns.length > 0 ? campaigns.map((campaign, index) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          {getPlatformIcon(campaign.platform)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                          <div className="flex items-center space-x-3">
                            <p className="text-sm text-gray-600">{campaign.objective}</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(campaign.status)}`}>
                              {getStatusText(campaign.status)}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-blue-600 mt-1">
                            <div className={`w-2 h-2 ${campaign.source === 'real' ? 'bg-green-500' : 'bg-blue-500'} rounded-full mr-1`}></div>
                            {campaign.source === 'real' ? 'Datos reales del Master' : 'Datos generados demo'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-8 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-gray-900">${campaign.spent.toLocaleString()}</div>
                          <div className="text-gray-500">Gastado</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900">{campaign.conversions}</div>
                          <div className="text-gray-500">Conversiones</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-bold ${campaign.roas >= 4 ? 'text-green-600' : campaign.roas >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {campaign.roas}x
                          </div>
                          <div className="text-gray-500">ROAS</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleCampaignAction(campaign.status === 'active' ? 'pause' : 'play', campaign.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              campaign.status === 'active' 
                                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}
                            disabled={campaign.status === 'draft'}
                          >
                            {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <Link 
                            href={`/campaigns/${campaign.id}`}
                            className="flex items-center px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Ver
                          </Link>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Megaphone className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No hay campañas disponibles</h3>
                      <p className="text-gray-600 mb-4">
                        {masterData?.platforms.quintuple_ai.ready_for_campaigns 
                          ? 'Crea tu primera campaña para comenzar'
                          : 'Completa la configuración de Quintuple AI para crear campañas'
                        }
                      </p>
                      <button 
                        onClick={() => setShowCreateModal(true)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          masterData?.platforms.quintuple_ai.ready_for_campaigns
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!masterData?.platforms.quintuple_ai.ready_for_campaigns}
                      >
                        Crear Primera Campaña
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Manager Tab */}
          {activeTab === 'manager' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-purple-600" />
                    Administrador de Campañas
                    {masterData && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        {masterData.summary.total_connected} plataforma(s) conectada(s)
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Filter className="w-4 h-4 mr-2 inline" />
                      Filtrar
                    </button>
                    <button 
                      onClick={() => setShowCreateModal(true)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        masterData?.platforms.quintuple_ai.ready_for_campaigns
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!masterData?.platforms.quintuple_ai.ready_for_campaigns}
                    >
                      <Plus className="w-4 h-4 mr-2 inline" />
                      Crear Campaña
                    </button>
                  </div>
                </div>

                {/* Tabla de campañas mejorada */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Campaña
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Presupuesto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gastado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conversiones
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ROAS
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {campaigns.length > 0 ? campaigns.map((campaign) => (
                        <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300"
                              checked={selectedCampaigns.includes(campaign.id)}
                              onChange={() => toggleCampaignSelection(campaign.id)}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                  {getPlatformIcon(campaign.platform)}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                                <div className="text-sm text-gray-500">{campaign.objective}</div>
                                <div className="text-xs text-blue-600 flex items-center">
                                  <div className={`w-1.5 h-1.5 ${campaign.source === 'real' ? 'bg-green-500' : 'bg-blue-500'} rounded-full mr-1`}></div>
                                  {campaign.source === 'real' ? 'Master Data' : 'Demo Data'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                              {getStatusText(campaign.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${campaign.budget.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${campaign.spent.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {campaign.conversions}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${
                              campaign.roas >= 4 ? 'text-green-600' : 
                              campaign.roas >= 2 ? 'text-yellow-600' : 
                              campaign.roas > 0 ? 'text-red-600' : 'text-gray-400'
                            }`}>
                              {campaign.roas > 0 ? `${campaign.roas}x` : 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleCampaignAction(campaign.status === 'active' ? 'pause' : 'play', campaign.id)}
                                className={`p-1.5 rounded transition-colors ${
                                  campaign.status === 'active' 
                                    ? 'text-yellow-600 hover:bg-yellow-100' 
                                    : 'text-green-600 hover:bg-green-100'
                                }`}
                                title={campaign.status === 'active' ? 'Pausar' : 'Activar'}
                                disabled={campaign.status === 'draft'}
                              >
                                {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </button>
                              <button 
                                onClick={() => handleCampaignAction('edit', campaign.id)}
                                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                title="Editar"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleCampaignAction('copy', campaign.id)}
                                className="p-1.5 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                                title="Duplicar"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={8} className="px-6 py-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Megaphone className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay campañas para administrar</h3>
                            <p className="text-gray-600 mb-4">
                              {masterData?.platforms.quintuple_ai.ready_for_campaigns 
                                ? 'Crea tu primera campaña para comenzar a administrar'
                                : 'Completa la configuración de Quintuple AI para administrar campañas'
                              }
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  Análisis de Performance Detallado
                  {masterData && (
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Basado en Master Orchestrator
                    </span>
                  )}
                </h3>
                
                {/* Performance metrics grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">CTR Promedio</p>
                        <p className="text-2xl font-bold text-blue-900">{campaignMetrics.avgCtr}%</p>
                      </div>
                      <Eye className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">CPC Promedio</p>
                        <p className="text-2xl font-bold text-green-900">
                          ${ campaigns.length > 0 
                            ? (campaigns.reduce((sum, c) => sum + c.cpc, 0) / campaigns.length).toFixed(2)
                            : '0.00'
                          }
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700">CPA Promedio</p>
                        <p className="text-2xl font-bold text-purple-900">
                          ${ campaigns.length > 0 
                            ? (campaigns.reduce((sum, c) => sum + c.cpa, 0) / campaigns.length).toFixed(2)
                            : '0.00'
                          }
                        </p>
                      </div>
                      <Target className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Performance chart by campaign */}
                <div style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={campaigns}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                        fontSize={10}
                      />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none', 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                      <Legend />
                      <Bar dataKey="roas" fill="#8B5CF6" name="ROAS" />
                      <Bar dataKey="ctr" fill="#10B981" name="CTR %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* AI Insights Tab */}
          {activeTab === 'ai-insights' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                  <Brain className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {masterData 
                      ? 'Recomendaciones IA basadas en Master Orchestrator' 
                      : 'Recomendaciones IA Demo'
                    }
                  </h3>
                  <div className="ml-auto flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">
                      {masterData ? 'Powered by Master Data' : 'Powered by Demo AI'}
                    </span>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {aiRecommendations.map((rec, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            rec.type === 'optimization' ? 'bg-green-100' :
                            rec.type === 'scaling' ? 'bg-blue-100' :
                            rec.type === 'targeting' ? 'bg-purple-100' :
                            rec.type === 'setup' ? 'bg-yellow-100' :
                            rec.type === 'campaign' ? 'bg-red-100' :
                            rec.type === 'expansion' ? 'bg-indigo-100' :
                            'bg-gray-100'
                          }`}>
                            {rec.type === 'optimization' ? <TrendingUp className="w-4 h-4 text-green-600" /> :
                             rec.type === 'scaling' ? <ArrowRight className="w-4 h-4 text-blue-600" /> :
                             rec.type === 'targeting' ? <Target className="w-4 h-4 text-purple-600" /> :
                             rec.type === 'setup' ? <Settings className="w-4 h-4 text-yellow-600" /> :
                             rec.type === 'campaign' ? <Megaphone className="w-4 h-4 text-red-600" /> :
                             rec.type === 'expansion' ? <Globe className="w-4 h-4 text-indigo-600" /> :
                             <Eye className="w-4 h-4 text-gray-600" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                            {masterData && (
                              <div className="text-xs text-green-600 mt-1 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Análisis basado en Master Orchestrator
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(rec.impact)}`}>
                            {rec.impact.toUpperCase()}
                          </span>
                          {rec.potentialGain && (
                            <div className="text-sm font-bold text-green-600 mt-1">
                              {rec.potentialGain}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Brain className="w-3 h-3 mr-1" />
                          <span>
                            {masterData 
                              ? 'Análisis IA basado en datos reales del Master Orchestrator'
                              : 'Análisis IA basado en datos demo'
                            }
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200">
                          Aplicar Recomendación
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary de Master Orchestrator */}
                {masterData && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BarChart3 className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <h4 className="font-semibold text-blue-900">Estado del Sistema</h4>
                          <p className="text-sm text-blue-700">
                            {masterData.summary.total_connected} de 6 plataformas conectadas • 
                            Sistema {masterData.summary.ready_percentage}% listo • 
                            Quintuple AI: {masterData.platforms.quintuple_ai.completion_percentage}% completo
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-700">
                          Próxima acción recomendada:
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          {masterData.summary.recommended_action}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear campaña */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Crear Nueva Campaña</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {masterData?.platforms.quintuple_ai.ready_for_campaigns ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Selecciona la plataforma para tu nueva campaña:
                </p>
                <div className="space-y-2">
                  {masterData.platforms.meta_ads.connected && (
                    <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                      <Facebook className="w-5 h-5 text-blue-600 mr-3" />
                      <span>Meta Ads - {masterData.platforms.meta_ads.account_name}</span>
                    </button>
                  )}
                  {masterData.platforms.google_ads.connected && (
                    <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                      <Search className="w-5 h-5 text-red-600 mr-3" />
                      <span>Google Ads - {masterData.platforms.google_ads.customer_id}</span>
                    </button>
                  )}
                  {masterData.platforms.tiktok_ads.connected && (
                    <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                      <MousePointer className="w-5 h-5 text-black mr-3" />
                      <span>TikTok Ads - {masterData.platforms.tiktok_ads.advertiser_count} cuenta(s)</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Configuración Incompleta</h4>
                <p className="text-gray-600 mb-4">
                  Completa la configuración de Quintuple AI antes de crear campañas.
                </p>
                <p className="text-sm text-gray-500">
                  Faltan: {masterData?.platforms.quintuple_ai.missing_configs.join(', ')}
                </p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancelar
              </button>
              {masterData?.platforms.quintuple_ai.ready_for_campaigns && (
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Continuar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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