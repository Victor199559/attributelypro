'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Target, TrendingUp, DollarSign, Users, Eye, MousePointer, 
  Calendar, Filter, Download, Settings, Bell, Search,
  ArrowUp, ArrowDown, Play, Pause, RefreshCw, ExternalLink,
  Brain, ArrowRight, BarChart3, Megaphone, PieChart, Activity,
  Globe, Smartphone, Mail, MessageCircle, ShoppingCart, Zap,
  Calculator, Sparkles, Shield, Crown, Star, Cpu, Radio, AlertTriangle,
  FileText, TrendingDown, UserPlus, Layers
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ===== INTERFACES TYPESCRIPT =====
interface RealAccountData {
  meta: {
    status: string;
    account_id: string;
    account_name?: string;
    currency?: string;
    spend_total: number;
    impressions_total: number;
    clicks_total: number;
    conversions_total: number;
    campaigns_count: number;
    connection_quality: string;
  };
  google: {
    status: string;
    customer_id: string;
    account_name?: string;
    currency?: string;
    spend_total: number;
    impressions_total: number;
    clicks_total: number;
    conversions_total: number;
    campaigns_count: number;
    connection_quality: string;
  };
  tiktok: {
    status: string;
    advertiser_id: string;
    account_name?: string;
    spend_total: number;
    impressions_total: number;
    clicks_total: number;
    conversions_total: number;
    campaigns_count: number;
    approval_status: string;
  };
  youtube: {
    status: string;
    api_key_status: string;
    quota_usage: number;
    daily_quota_limit: number;
    data_available: boolean;
  };
  microBudget: {
    status: string;
    optimization_active: boolean;
    platforms_optimized: number;
    savings_calculated: number;
  };
}

interface QuintupleAIStatus {
  total_platforms: number;
  active_platforms: number;
  pending_platforms: number;
  unicorn_status: 'PENDING' | 'ACTIVE' | 'ACHIEVED';
  real_data_percentage: number;
}

// ===== INTERFACE PARA ATTRIBUTION EVENTS =====
interface AttributionEvent {
  id: number;
  user_id: string;
  session_id: string;
  event_type: string;
  platform: string;
  campaign_id: string | null;
  event_value: number | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  timestamp: string;
}

interface AttributionData {
  status: string;
  message: string;
  events_count: number;
  database: string;
  events: AttributionEvent[];
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [realAccountData, setRealAccountData] = useState<RealAccountData | null>(null);
  const [quintupleStatus, setQuintupleStatus] = useState<QuintupleAIStatus | null>(null);
  const [attributionData, setAttributionData] = useState<AttributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataRefreshTime, setDataRefreshTime] = useState<string>('');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [user, setUser] = useState({ 
    name: 'Victor Andrade', 
    role: 'CEO AttributelyPro',
    email: 'hostalaullido96@gmail.com'
  });

  // ===== AWS BACKEND URL - TU EC2 REAL =====
  const AWS_BACKEND_URL = 'http://3.16.108.83:8000';

  // ===== FETCH REAL ACCOUNT DATA FROM AWS BACKEND =====
  useEffect(() => {
    const fetchRealAccountData = async () => {
      try {
        console.log('🔄 Fetching real account data from AWS backend...');
        setConnectionError(null);
        
        // Health check primero
        const healthResponse = await fetch(`${AWS_BACKEND_URL}/health`);
        if (!healthResponse.ok) {
          throw new Error('AWS Backend no disponible');
        }
        const healthData = await healthResponse.json();

        // Fetch datos reales del backend AWS
        const [metaResponse, googleResponse, tiktokResponse, youtubeResponse, microBudgetResponse, quintupleResponse, eventsResponse] = await Promise.all([
          fetch(`${AWS_BACKEND_URL}/meta-ai/advantage-plus-insights/act_1038930414999384`),
          fetch(`${AWS_BACKEND_URL}/google-ai/performance-max-insights/7453703942`),
          fetch(`${AWS_BACKEND_URL}/tiktok-ai/algorithm-insights/7517787463485482881`),
          fetch(`${AWS_BACKEND_URL}/youtube-ai/video-insights/UCxxxxxx`),
          fetch(`${AWS_BACKEND_URL}/micro-budget-ai/optimize/90`),
          fetch(`${AWS_BACKEND_URL}/quintuple-ai/ultimate-optimizer`),
          fetch(`${AWS_BACKEND_URL}/analytics/events`)
        ]);

        const [metaData, googleData, tiktokData, youtubeData, microBudgetData, quintupleData, eventsData] = await Promise.all([
          metaResponse.json(),
          googleResponse.json(),
          tiktokResponse.json(),
          youtubeResponse.json(),
          microBudgetResponse.json(),
          quintupleResponse.json(),
          eventsResponse.json()
        ]);

        console.log('📊 Real AWS API responses:', { 
          health: healthData,
          meta: metaData, 
          google: googleData, 
          tiktok: tiktokData,
          youtube: youtubeData,
          microBudget: microBudgetData,
          quintuple: quintupleData,
          events: eventsData
        });

        // Procesar datos de attribution events
        setAttributionData(eventsData);

        // Procesar datos reales de Meta
        const processedMeta = {
          status: metaData.status || 'demo_mode',
          account_id: metaData.account_id || 'act_1038930414999384',
          account_name: 'AttributelyPro Affiliate Marketing',
          currency: 'USD',
          spend_total: metaData.spend_total || 0,
          impressions_total: metaData.impressions_total || 0,
          clicks_total: metaData.clicks_total || 0,
          conversions_total: metaData.conversions_total || 0,
          campaigns_count: metaData.campaigns_count || 0,
          connection_quality: metaData.status === 'success' ? 'excellent' : 'demo'
        };

        // Procesar datos reales de Google
        const processedGoogle = {
          status: googleData.status || 'demo_mode',
          customer_id: googleData.customer_id || '7453703942',
          account_name: 'Victor Daniel Andrade Garcia',
          currency: 'USD',
          spend_total: googleData.spend_total || 0,
          impressions_total: googleData.impressions_total || 0,
          clicks_total: googleData.clicks_total || 0,
          conversions_total: googleData.conversions_total || 0,
          campaigns_count: googleData.campaigns_count || 0,
          connection_quality: googleData.status === 'success' ? 'excellent' : 'demo'
        };

        // Procesar datos de TikTok
        const processedTikTok = {
          status: tiktokData.status || 'configured',
          advertiser_id: tiktokData.advertiser_id || '7517787463485482881',
          account_name: 'AttributelyPro Marketing',
          spend_total: tiktokData.spend_total || 0,
          impressions_total: tiktokData.impressions_total || 0,
          clicks_total: tiktokData.clicks_total || 0,
          conversions_total: tiktokData.conversions_total || 0,
          campaigns_count: tiktokData.campaigns_count || 0,
          approval_status: 'configured_ready'
        };

        // Procesar YouTube AI
        const processedYouTube = {
          status: youtubeData.status || 'demo_mode',
          api_key_status: youtubeData.status === 'success' ? 'active' : 'demo',
          quota_usage: youtubeData.real_data ? 50 : 0,
          daily_quota_limit: 10000,
          data_available: youtubeData.status === 'success'
        };

        // Procesar Micro-Budget AI
        const processedMicroBudget = {
          status: microBudgetData.status || 'success',
          optimization_active: microBudgetData.status === 'success',
          platforms_optimized: 5,
          savings_calculated: microBudgetData.savings_calculated || 73
        };

        // Calcular status del Quintuple AI desde el endpoint real
        let activePlatforms = 0;
        let pendingPlatforms = 0;
        
        if (processedMeta.status === 'success') activePlatforms++;
        if (processedGoogle.status === 'success') activePlatforms++;
        if (processedTikTok.status === 'success' || processedTikTok.status === 'configured') activePlatforms++;
        if (processedYouTube.status === 'success') activePlatforms++;
        if (processedMicroBudget.status === 'success') activePlatforms++;

        // Usar datos del endpoint quintuple
        const quintupleStatus: QuintupleAIStatus = {
          total_platforms: 5,
          active_platforms: activePlatforms,
          pending_platforms: pendingPlatforms,
          unicorn_status: quintupleData.quintuple_ai_status?.includes('FULLY_OPERATIONAL') ? 'ACHIEVED' : 
                         activePlatforms >= 3 ? 'ACTIVE' : 'PENDING',
          real_data_percentage: Math.round((activePlatforms / 5) * 100)
        };

        setRealAccountData({
          meta: processedMeta,
          google: processedGoogle,
          tiktok: processedTikTok,
          youtube: processedYouTube,
          microBudget: processedMicroBudget
        });

        setQuintupleStatus(quintupleStatus);
        setDataRefreshTime(new Date().toLocaleTimeString());

        console.log(`✅ Real AWS data processed: ${activePlatforms}/5 platforms active`);

      } catch (error) {
        console.error('🚨 Error fetching real account data:', error);
        setConnectionError(error instanceof Error ? error.message : 'Error de conexión');
        
        // Fallback data
        setRealAccountData(null);
        setQuintupleStatus({
          total_platforms: 5,
          active_platforms: 0,
          pending_platforms: 1,
          unicorn_status: 'PENDING',
          real_data_percentage: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRealAccountData();
    
    // Refresh data every 30 seconds for real-time updates
    const interval = setInterval(fetchRealAccountData, 30000);
    return () => clearInterval(interval);
  }, []);

  // ===== CALCULATED KPIS FROM REAL DATA =====
  const getKPIData = () => {
    if (!realAccountData) {
      return {
        revenue: 0,
        conversions: 0,
        visitors: 0,
        roas: 0,
        spend: 0,
        events: 0
      };
    }

    const totalSpend = realAccountData.meta.spend_total + realAccountData.google.spend_total + realAccountData.tiktok.spend_total;
    const totalConversions = realAccountData.meta.conversions_total + realAccountData.google.conversions_total + realAccountData.tiktok.conversions_total;
    const totalImpressions = realAccountData.meta.impressions_total + realAccountData.google.impressions_total + realAccountData.tiktok.impressions_total;
    const totalClicks = realAccountData.meta.clicks_total + realAccountData.google.clicks_total + realAccountData.tiktok.clicks_total;

    // Calculate revenue based on conversions (assuming $50 AOV)
    const estimatedRevenue = totalConversions * 50;
    const roas = totalSpend > 0 ? estimatedRevenue / totalSpend : 0;

    return {
      revenue: estimatedRevenue,
      conversions: totalConversions,
      visitors: totalClicks,
      roas: roas,
      spend: totalSpend,
      events: attributionData?.events_count || 0
    };
  };

  const kpiData = getKPIData();

  // ===== RENDER STATUS INDICATORS =====
  const getAIStatus = () => {
    if (!quintupleStatus) return { color: 'bg-yellow-500', text: 'Cargando...' };
    
    if (quintupleStatus.unicorn_status === 'ACHIEVED') {
      return { 
        color: 'bg-gradient-to-r from-purple-500 to-pink-500', 
        text: `🦄 QUINTUPLE AI ACHIEVED (${quintupleStatus.active_platforms}/5)` 
      };
    }
    
    if (quintupleStatus.active_platforms >= 3) {
      return { 
        color: 'bg-green-500', 
        text: `🤖 Multi-AI Active (${quintupleStatus.active_platforms}/5)` 
      };
    }
    
    return { 
      color: 'bg-blue-500', 
      text: `⚡ Setting Up (${quintupleStatus.active_platforms}/5)` 
    };
  };

  const getConnectionStatus = () => {
    if (connectionError) {
      return { color: 'bg-red-500', text: '❌ AWS Backend Offline' };
    }
    
    if (!realAccountData) return { color: 'bg-yellow-500', text: 'Conectando...' };
    
    const hasRealData = realAccountData.meta.status === 'success' || realAccountData.google.status === 'success';
    
    if (hasRealData) {
      return { 
        color: 'bg-green-500', 
        text: `🔗 AWS Connected (${quintupleStatus?.real_data_percentage}%)` 
      };
    }
    
    return { color: 'bg-blue-500', text: '📊 AWS Backend Ready' };
  };

  const aiStatus = getAIStatus();
  const connectionStatus = getConnectionStatus();

  // ===== PERFORMANCE DATA FOR CHARTS =====
  const getPerformanceData = () => {
    if (!realAccountData) return [];

    // Verificar que attributionData y events existan antes de usar reduce
    const platformEvents = attributionData?.events?.reduce((acc, event) => {
      acc[event.platform] = (acc[event.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return [
      { 
        name: 'Meta AI', 
        revenue: realAccountData.meta.conversions_total * 50, 
        conversions: realAccountData.meta.conversions_total,
        spend: realAccountData.meta.spend_total,
        events: platformEvents['meta'] || 0
      },
      { 
        name: 'Google AI', 
        revenue: realAccountData.google.conversions_total * 50, 
        conversions: realAccountData.google.conversions_total,
        spend: realAccountData.google.spend_total,
        events: platformEvents['google'] || 0
      },
      { 
        name: 'TikTok AI', 
        revenue: 0,
        conversions: 0,
        spend: 0,
        events: platformEvents['tiktok'] || 0
      },
      { 
        name: 'YouTube AI', 
        revenue: realAccountData.youtube.data_available ? 100 : 0,
        conversions: 0,
        spend: 0,
        events: platformEvents['youtube'] || 0
      },
      { 
        name: 'Micro AI', 
        revenue: realAccountData.microBudget.savings_calculated * 10,
        conversions: 0,
        spend: 0,
        events: platformEvents['micro'] || 0
      }
    ];
  };

  const performanceData = getPerformanceData();

  // Function to create test event
  const createTestEvent = async () => {
    try {
      const response = await fetch(`${AWS_BACKEND_URL}/track/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'dashboard_demo',
          platform: 'meta',
          event_type: 'demo_event',
          campaign_id: 'dashboard_test'
        })
      });
      
      if (response.ok) {
        // Refresh data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating test event:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Conectando con Quintuple AI AWS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar Navigation - ACTUALIZADO CON TODAS LAS PÁGINAS */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center px-4 py-6 border-b">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AttributelyPro
                </span>
              </div>
            </div>

            {/* Navigation - COMPLETO CON TODAS LAS PÁGINAS */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link
                href="/dashboard"
                className="bg-purple-100 text-purple-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <BarChart3 className="text-purple-600 mr-3 h-5 w-5" />
                Panel Principal
                {quintupleStatus?.unicorn_status === 'ACHIEVED' && (
                  <Crown className="ml-auto h-4 w-4 text-purple-600" />
                )}
              </Link>

              {/* Core Features */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Core Features
                </p>
                
                <Link
                  href="/dashboard/audiences"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <Users className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  Audiencias
                  <span className="ml-auto bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                    Neural
                  </span>
                </Link>

                <Link
                  href="/dashboard/campaigns"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <Megaphone className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  Campañas
                  <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                    5
                  </span>
                </Link>

                <Link
                  href="/dashboard/attribution"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <Target className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  Attribution
                  <span className="ml-auto bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                    Real
                  </span>
                </Link>

                <Link
                  href="/dashboard/analytics"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <Activity className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  Analytics
                  <span className="ml-auto bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full">
                    Live
                  </span>
                </Link>

                <Link
                  href="/dashboard/reports"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <FileText className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  Reportes
                </Link>
              </div>

              {/* AI Features */}
              <div className="pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  AI Features
                </p>

                <Link
                  href="/dashboard/ai-insights"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <Brain className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  AI Insights
                  <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                    {quintupleStatus?.active_platforms || 0}/5
                  </span>
                </Link>

                <Link
                  href="/dashboard/profeta-creativo"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <div className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5">🔮</div>
                  Profeta Creativo
                  <span className="ml-auto bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">AI</span>
                </Link>

                <Link
                  href="/dashboard/fraud-detection"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <Shield className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  Fraud Detection
                  <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                    Pro
                  </span>
                </Link>

                <Link
                  href="/dashboard/roi-predictor"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <Calculator className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  ROI Predictor
                  <span className="ml-auto bg-yellow-100 text-yellow-600 text-xs px-2 py-0.5 rounded-full">
                    Beta
                  </span>
                </Link>
              </div>

              {/* Communication */}
              <div className="pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Communication
                </p>

                <Link
                  href="/dashboard/whatsapp"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <MessageCircle className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  WhatsApp
                  <span className="ml-auto bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                    Bot
                  </span>
                </Link>
              </div>

              {/* Settings & Privacy */}
              <div className="pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Configuration
                </p>

                <Link
                  href="/dashboard/settings"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <Settings className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  Configuración
                </Link>

                <Link
                  href="/dashboard/privacy"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <Shield className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  Privacy
                </Link>

                <Link
                  href="/dashboard/terms"
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
                >
                  <FileText className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                  Términos
                </Link>
              </div>
            </nav>

            {/* User Profile */}
            <div className="px-4 py-4 border-t">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">VA</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - MANTENIENDO EXACTAMENTE EL MISMO ESTILO */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold text-gray-900">Panel Principal</h1>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${connectionStatus.color}`}></div>
                        <span className="text-xs text-gray-600">{connectionStatus.text}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${aiStatus.color.includes('gradient') ? 'bg-purple-500' : aiStatus.color}`}></div>
                        <span className={`text-xs font-medium ${aiStatus.color.includes('gradient') ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' : 'text-gray-600'}`}>
                          {aiStatus.text}
                        </span>
                      </div>
                      {dataRefreshTime && (
                        <div className="flex items-center space-x-1">
                          <RefreshCw className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">Actualizado: {dataRefreshTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {connectionError
                      ? '🚨 AWS Backend no disponible en api.attributelypro.com'
                      : quintupleStatus?.unicorn_status === 'ACHIEVED'
                        ? '🦄 QUINTUPLE AI ACHIEVED - World\'s First 5-Platform Attribution System!'
                        : realAccountData
                          ? `🔗 Conectado a AWS - PostgreSQL con ${kpiData.events} eventos reales`
                          : '🚀 Configurando conexiones con APIs reales...'
                    }
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="7d">Últimos 7 días</option>
                    <option value="30d">Últimos 30 días</option>
                    <option value="90d">Últimos 90 días</option>
                  </select>
                  <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Connection Error Alert - ACTUALIZADO PARA AWS */}
            {connectionError && (
              <div className="bg-red-500 rounded-lg p-6 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">🚨</div>
                    <div>
                      <h3 className="font-bold text-xl">AWS Backend No Disponible</h3>
                      <p className="text-red-100 mt-1">
                        No se puede conectar con https://api.attributelypro.com - Verifica el estado del servidor AWS
                      </p>
                      <p className="text-red-100 text-sm mt-2">
                        Estado: <code className="bg-red-600 px-2 py-1 rounded">EC2 Backend Offline</code>
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="bg-white bg-opacity-20 px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all font-medium"
                  >
                    Reintentar Conexión
                  </button>
                </div>
              </div>
            )}

            {/* Real Backend Status Alert - ACTUALIZADO PARA AWS */}
            {realAccountData && !connectionError && (
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">🔗</div>
                    <div>
                      <h3 className="font-bold text-xl">AWS Backend Conectado</h3>
                      <p className="text-green-100 mt-1">
                        Mostrando datos reales de AWS PostgreSQL: {kpiData.events} eventos de attribution
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${realAccountData.google.status === 'success' ? 'bg-green-300' : 'bg-gray-300'}`}></div>
                          Google: {realAccountData.google.customer_id}
                        </span>
                        <span className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${realAccountData.tiktok.status === 'configured' ? 'bg-green-300' : 'bg-gray-300'}`}></div>
                          TikTok: Configured
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={createTestEvent}
                    className="bg-white bg-opacity-20 px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all font-medium"
                  >
                    Crear Evento Test →
                  </button>
                </div>
              </div>
            )}

            {/* Neural Automatizador Card - FEATURE ESTRELLA */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-900">🤖</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold flex items-center">
                        Neural Automatizador
                        <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-medium">
                          EXCLUSIVO
                        </span>
                      </h3>
                      <p className="text-purple-100 mb-1">
                        IA que optimiza campañas automáticamente 24/7 en 5 plataformas
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          {quintupleStatus?.active_platforms || 0}/5 Plataformas Activas
                        </span>
                        <span className="flex items-center">
                          <Zap className="w-3 h-3 mr-1" />
                          {realAccountData?.microBudget.savings_calculated || 0}% Optimización
                        </span>
                        <span className="flex items-center">
                          <Activity className="w-3 h-3 mr-1" />
                          {kpiData.events} Eventos Procesados
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/dashboard/neural-automatizador"
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm flex items-center"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </Link>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {quintupleStatus?.unicorn_status === 'ACHIEVED' ? '🦄' : 
                           (quintupleStatus?.active_platforms ?? 0) >= 3 ? '🚀' : '⚡'}
                        </div>
                        <div className="text-xs opacity-90">
                          {quintupleStatus?.unicorn_status || 'Loading'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar del Automatizador */}
                <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progreso del Neural Engine</span>
                    <span className="font-medium">{quintupleStatus?.real_data_percentage || 0}%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${quintupleStatus?.real_data_percentage || 0}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2 opacity-90">
                    <span>Meta • Google • TikTok • YouTube • Micro-Budget</span>
                    <span>{quintupleStatus?.active_platforms || 0} de 5 conectadas</span>
                  </div>
                </div>

                {/* Neural Status Indicators */}
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {[
                    { name: 'Meta', status: realAccountData?.meta.status === 'success', icon: '🔵' },
                    { name: 'Google', status: realAccountData?.google.status === 'success', icon: '🔴' },
                    { name: 'TikTok', status: realAccountData?.tiktok.status === 'configured', icon: '🎵' },
                    { name: 'YouTube', status: realAccountData?.youtube.data_available, icon: '📺' },
                    { name: 'Micro', status: realAccountData?.microBudget.optimization_active, icon: '⚡' }
                  ].map((platform, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                        platform.status 
                          ? 'bg-green-400 bg-opacity-30 border border-green-400' 
                          : 'bg-white bg-opacity-10 border border-white border-opacity-20'
                      }`}>
                        {platform.icon}
                      </div>
                      <div className="text-xs mt-1 opacity-90">{platform.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Real KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Attribution Events</p>
                    <p className="text-2xl font-bold text-gray-900">{kpiData.events}</p>
                    <div className="text-sm text-green-600 flex items-center">
                      <div className="w-1 h-1 bg-green-500 rounded-full mr-1"></div>
                      {attributionData?.database || 'PostgreSQL AWS'}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Quintuple AI</p>
                    <p className="text-2xl font-bold text-gray-900">{quintupleStatus?.active_platforms || 0}/5</p>
                    <div className="text-sm text-blue-600 flex items-center">
                      <div className="w-1 h-1 bg-blue-500 rounded-full mr-1"></div>
                      {quintupleStatus?.unicorn_status || 'Loading'}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">AWS Status</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {connectionError ? 'OFFLINE' : 'ONLINE'}
                    </p>
                    <div className="text-sm text-purple-600 flex items-center">
                      <div className={`w-1 h-1 rounded-full mr-1 ${connectionError ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      api.attributelypro.com
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-pink-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">PostgreSQL</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {attributionData?.status === 'success' ? 'CONNECTED' : 'OFFLINE'}
                    </p>
                    <div className="text-sm text-pink-600 flex items-center">
                      <div className={`w-1 h-1 rounded-full mr-1 ${attributionData?.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      {attributionData?.database || 'Database'}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-pink-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Charts with Real Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Real Platform Performance */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Attribution Events por Plataforma
                    {quintupleStatus?.unicorn_status === 'ACHIEVED' && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                        🦄 QUINTUPLE ACTIVE
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {kpiData.events} eventos reales
                    </span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        value,
                        name === 'events' ? 'Attribution Events' : name
                      ]}
                    />
                    <Bar dataKey="events" fill="#8b5cf6" name="events" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Real Attribution Events Table */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Eventos Recientes</h3>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">PostgreSQL AWS</span>
                  </div>
                </div>
                
                {attributionData && attributionData.events && attributionData.events.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-gray-600">Usuario</th>
                          <th className="text-left py-2 text-gray-600">Plataforma</th>
                          <th className="text-left py-2 text-gray-600">Evento</th>
                          <th className="text-left py-2 text-gray-600">Hora</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attributionData.events.slice(0, 5).map((event) => (
                          <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 font-mono text-blue-600">{event.user_id}</td>
                            <td className="py-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                {event.platform}
                              </span>
                            </td>
                            <td className="py-2 text-gray-600">{event.event_type}</td>
                            <td className="py-2 text-gray-500 text-xs">
                              {new Date(event.timestamp).toLocaleTimeString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="mx-auto text-gray-400 mb-4" size={32} />
                    <p className="text-gray-500 mb-4">No hay eventos de attribution aún</p>
                    <button 
                      onClick={createTestEvent}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Crear Evento Demo
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quintuple AI Status Footer */}
            {quintupleStatus && (
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">
                      {quintupleStatus.unicorn_status === 'ACHIEVED' ? '🦄' : 
                       quintupleStatus.active_platforms >= 3 ? '🚀' : '⚡'}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Quintuple AI Status</h4>
                      <p className="text-gray-300">
                        {quintupleStatus.active_platforms}/{quintupleStatus.total_platforms} platforms active • 
                        {connectionError ? ' AWS Backend offline' : ` ${kpiData.events} eventos en PostgreSQL`} • 
                        Production AWS deployment
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {quintupleStatus.unicorn_status}
                    </div>
                    <p className="text-gray-300 text-sm">
                      AWS Backend: {connectionError ? 'OFFLINE' : 'READY'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}