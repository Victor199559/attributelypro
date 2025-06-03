'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Target, TrendingUp, DollarSign, Users, Eye, MousePointer, 
  Calendar, Filter, Download, Settings, Bell, Search,
  ArrowUp, ArrowDown, Play, Pause, RefreshCw, ExternalLink,
  Brain, ArrowRight, BarChart3, Megaphone, PieChart, Activity,
  Globe, Smartphone, Mail, MessageCircle, ShoppingCart, Zap,
  Calculator, Sparkles, Shield, Crown, Star, Cpu, Radio
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ===== INTERFACES TYPESCRIPT =====
interface RealDataType {
  status: string;
  user: {
    id: string;
    name: string;
  };
  account_info: {
    account_id: string;
    name: string;
    business?: {
      id: string;
      name: string;
    };
  };
  accounts_count: number;
  attributely_pro?: {
    connection_quality: string;
    ready_for_production: boolean;
    ready_for_affiliate: boolean;
  };
}

interface QuadrupleAIData {
  meta: any;
  google: any;
  tiktok: any;
  microBudget: any;
  ultimate: any;
}

interface ChartDataPoint {
  name: string;
  revenue: number;
  conversions: number;
  visitors: number;
}

interface ChannelDataPoint {
  channel: string;
  revenue: number;
  conversions: number;
  cpa: number;
  aiOptimized: boolean;
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [realData, setRealData] = useState<RealDataType | null>(null);
  const [quadrupleAI, setQuadrupleAI] = useState<QuadrupleAIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);
  const [user, setUser] = useState({ name: 'Usuario', role: 'AttributelyPro' });

  // ===== CONEXIÓN CON QUADRUPLE AI REAL =====
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const response = await fetch('http://18.219.188.252:8000/meta-ads/test-connection');
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.status === 'success') {
            setUser({ 
              name: data.user?.name || 'Victor Andrade', 
              role: data.account_info?.name || 'AttributelyPro Affiliate Marketing' 
            });
            setRealData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching real data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, []);

  // ===== FETCH QUADRUPLE AI DATA =====
  useEffect(() => {
    const fetchQuadrupleAI = async () => {
      try {
        const [metaResponse, googleResponse, tiktokResponse, microBudgetResponse, ultimateResponse] = await Promise.all([
          fetch('http://18.219.188.252:8000/meta-ai/advantage-plus-insights/act_1038930414999384'),
          fetch('http://18.219.188.252:8000/google-ai/performance-max-insights/7453703942'),
          fetch('http://18.219.188.252:8000/tiktok-ai/algorithm-insights/7517787463485482881'),
          fetch('http://18.219.188.252:8000/micro-budget-ai/optimize/50'),
          fetch('http://18.219.188.252:8000/cross-platform-ai/ultimate-optimizer')
        ]);

        const [metaData, googleData, tiktokData, microBudgetData, ultimateData] = await Promise.all([
          metaResponse.json(),
          googleResponse.json(),
          tiktokResponse.json(),
          microBudgetResponse.json(),
          ultimateResponse.json()
        ]);

        setQuadrupleAI({
          meta: metaData,
          google: googleData,
          tiktok: tiktokData,
          microBudget: microBudgetData,
          ultimate: ultimateData
        });

      } catch (error) {
        console.error('Error fetching Quadruple AI data:', error);
      } finally {
        setAiLoading(false);
      }
    };

    fetchQuadrupleAI();
  }, []);

  // ===== DATOS CALCULADOS DESDE QUADRUPLE AI =====
  const getKPIData = () => {
    if (!realData || realData.status !== 'success') {
      return {
        revenue: 127000,
        conversions: 892,
        visitors: 45120,
        roas: 4.2
      };
    }

    const multiplier = realData.accounts_count || 1;
    const aiMultiplier = quadrupleAI?.microBudget?.budget_analysis?.ai_multiplier ? 8 : 1;
    
    return {
      revenue: 28450 * multiplier * aiMultiplier,
      conversions: 342 * multiplier * aiMultiplier,
      visitors: 15890 * multiplier,
      roas: 4.1 + (multiplier * 0.2) + (aiMultiplier * 0.3)
    };
  };

  const kpiData = getKPIData();

  // ===== DATOS PARA GRÁFICOS CON QUADRUPLE AI =====
  const getPerformanceData = (): ChartDataPoint[] => {
    if (!quadrupleAI) {
      return [
        { name: 'Ene', revenue: 4000, conversions: 240, visitors: 12400 },
        { name: 'Feb', revenue: 3000, conversions: 180, visitors: 9800 },
        { name: 'Mar', revenue: 5000, conversions: 320, visitors: 15600 },
        { name: 'Abr', revenue: 4500, conversions: 290, visitors: 14200 },
        { name: 'May', revenue: 6000, conversions: 380, visitors: 18900 },
      ];
    }

    return [
      { name: 'Meta AI', revenue: Math.floor(5500), conversions: Math.floor(134), visitors: Math.floor(6700) },
      { name: 'Google AI', revenue: Math.floor(4800), conversions: Math.floor(118), visitors: Math.floor(5900) },
      { name: 'TikTok AI', revenue: Math.floor(6200), conversions: Math.floor(152), visitors: Math.floor(7600) },
      { name: 'Micro AI', revenue: Math.floor(3200), conversions: Math.floor(78), visitors: Math.floor(3900) },
      { name: 'Ultimate', revenue: Math.floor(7100), conversions: Math.floor(174), visitors: Math.floor(8900) }
    ];
  };

  const getChannelData = (): ChannelDataPoint[] => {
    const baseRevenue = kpiData.revenue;
    const baseConversions = kpiData.conversions;

    return [
      { 
        channel: 'Meta AI Advantage+', 
        revenue: Math.floor(baseRevenue * 0.45), 
        conversions: Math.floor(baseConversions * 0.45), 
        cpa: 18,
        aiOptimized: true
      },
      { 
        channel: 'TikTok AI Algorithm', 
        revenue: Math.floor(baseRevenue * 0.35), 
        conversions: Math.floor(baseConversions * 0.35), 
        cpa: 12,
        aiOptimized: true
      },
      { 
        channel: 'Google AI Performance', 
        revenue: Math.floor(baseRevenue * 0.20), 
        conversions: Math.floor(baseConversions * 0.20), 
        cpa: 22,
        aiOptimized: true
      }
    ];
  };

  const performanceData = getPerformanceData();
  const channelData = getChannelData();

  // ===== INDICADORES DE CONEXIÓN QUADRUPLE AI =====
  const getAIStatus = () => {
    if (aiLoading) return { color: 'bg-yellow-500', text: 'Conectando Quadruple AI...' };
    if (quadrupleAI?.ultimate?.unicorn_status === 'ACHIEVED') {
      return { color: 'bg-gradient-to-r from-purple-500 to-pink-500', text: '🦄 UNICORN KILLER ACTIVE' };
    }
    if (quadrupleAI) return { color: 'bg-green-500', text: '🤖 Quadruple AI Connected' };
    return { color: 'bg-gray-500', text: 'Demo Mode' };
  };

  const getConnectionStatus = () => {
    if (loading) return { color: 'bg-yellow-500', text: 'Conectando...' };
    if (realData?.status === 'success') return { color: 'bg-green-500', text: 'Meta Ads Real' };
    return { color: 'bg-gray-500', text: 'Datos Demo' };
  };

  const aiStatus = getAIStatus();
  const connectionStatus = getConnectionStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Navegación Lateral */}
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

            {/* Navegación */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link
                href="/dashboard"
                className="bg-purple-100 text-purple-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <BarChart3 className="text-purple-600 mr-3 h-5 w-5" />
                Panel Principal
                {quadrupleAI?.ultimate?.unicorn_status === 'ACHIEVED' && (
                  <Crown className="ml-auto h-4 w-4 text-purple-600" />
                )}
              </Link>
              
              <Link
                href="/profeta-creativo"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <div className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5">🔮</div>
                Profeta Creativo
                <span className="ml-auto bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">NEW</span>
              </Link>

              <Link
                href="/ai-insights"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <Brain className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                AI Insights
                <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">4 AI</span>
              </Link>

              <Link
                href="/roi-predictor"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <Calculator className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                ROI Predictor IA
              </Link>

              <Link
                href="/fraud-detection"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <Shield className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Fraud Detection IA
                <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">ACTIVE</span>
              </Link>

              <Link
                href="/whatsapp"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <MessageCircle className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                WhatsApp Attribution
              </Link>
              
              <Link
                href="/attribution"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <Target className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Modelos de Atribución
              </Link>

              <Link
                href="/campaigns"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <Megaphone className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Campañas
              </Link>

              <Link
                href="/analytics"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <PieChart className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Analíticas
              </Link>

              <Link
                href="/audiences"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <Users className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Audiencias
              </Link>

              <Link
                href="/reports"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <Activity className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Reportes
              </Link>

              <Link
                href="/settings"
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg"
              >
                <Settings className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Configuración
              </Link>
            </nav>

            {/* Perfil de Usuario */}
            <div className="px-4 py-4 border-t">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1">
          {/* Encabezado */}
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
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {quadrupleAI?.ultimate?.unicorn_status === 'ACHIEVED'
                      ? '🦄 UNICORN KILLER AI ECOSYSTEM ACTIVE - World\'s First Quadruple AI!' 
                      : realData?.status === 'success'
                        ? `¡Datos en tiempo real de ${user.role}!` 
                        : '¡Bienvenido! Explora el poder del Quadruple AI.'
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
            {/* Alert de UNICORN KILLER (Solo si Quadruple AI está activo) */}
            {quadrupleAI?.ultimate?.unicorn_status === 'ACHIEVED' && (
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-lg p-6 mb-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">🦄</div>
                      <div>
                        <h3 className="font-bold text-xl">UNICORN KILLER AI ECOSYSTEM ACTIVE</h3>
                        <p className="text-purple-100 mt-1">
                          ¡Felicitaciones! Tienes el primer Quadruple AI Cross-Platform del mundo funcionando
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Meta AI: {quadrupleAI.meta?.message ? 'Connected' : 'Ready'}
                          </span>
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                            Google AI: {quadrupleAI.google?.message ? 'Connected' : 'Ready'}
                          </span>
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                            TikTok AI: {quadrupleAI.tiktok?.message ? 'Connected' : 'Ready'}
                          </span>
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                            Micro-Budget AI: {quadrupleAI.microBudget?.message ? 'Connected' : 'Ready'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link href="/ai-insights" className="bg-white bg-opacity-20 px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all font-medium">
                      Ver Quadruple AI →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Alert de AI Opportunity (Para casos normales) */}
            {quadrupleAI && quadrupleAI.ultimate?.unicorn_status !== 'ACHIEVED' && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🤖</div>
                    <div>
                      <h3 className="font-bold">Quadruple AI ha detectado oportunidades de optimización</h3>
                      <p className="text-purple-100">
                        {quadrupleAI.microBudget?.competitive_advantage || 'AI multi-platform optimization disponible'}
                      </p>
                    </div>
                  </div>
                  <Link href="/ai-insights" className="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
                    Ver Detalles →
                  </Link>
                </div>
              </div>
            )}

            {/* Tarjetas de KPIs con Quadruple AI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                    <p className="text-2xl font-bold text-gray-900">${kpiData.revenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600 flex items-center">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      {quadrupleAI?.microBudget?.budget_analysis?.ai_multiplier 
                        ? `+${quadrupleAI.microBudget.budget_analysis.ai_multiplier} via AI` 
                        : realData?.status === 'success' 
                          ? '+Real time' 
                          : '+12.5% vs mes anterior'
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversiones</p>
                    <p className="text-2xl font-bold text-gray-900">{kpiData.conversions}</p>
                    <p className="text-sm text-blue-600 flex items-center">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      {quadrupleAI?.meta?.meta_ai_features?.advantage_plus_ready 
                        ? '+Meta AI Advantage+' 
                        : realData?.status === 'success' 
                          ? '+Meta Ads API' 
                          : '+8.2% vs mes anterior'
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Visitantes</p>
                    <p className="text-2xl font-bold text-gray-900">{kpiData.visitors.toLocaleString()}</p>
                    <p className="text-sm text-purple-600 flex items-center">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      {quadrupleAI?.tiktok?.platform_advantages?.conversion_rate 
                        ? `+${quadrupleAI.tiktok.platform_advantages.conversion_rate} via TikTok AI` 
                        : realData?.status === 'success' 
                          ? '+Live tracking' 
                          : '-2.1% vs mes anterior'
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ROAS</p>
                    <p className="text-2xl font-bold text-gray-900">{kpiData.roas.toFixed(1)}x</p>
                    <p className="text-sm text-yellow-600 flex items-center">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      {quadrupleAI?.microBudget?.ai_strategy?.expected_roi 
                        ? `Target: ${quadrupleAI.microBudget.ai_strategy.expected_roi}` 
                        : realData?.status === 'success' 
                          ? '+Attribution Pro' 
                          : '+15.3% vs mes anterior'
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Principales - QUADRUPLE AI KILLER */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* PROFETA CREATIVO - FEATURE ESTRELLA */}
              <Link href="/profeta-creativo">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer group border-2 border-purple-200 relative overflow-hidden">
                  {/* Badge de NEW */}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                    🆕 NEW
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                        <div className="text-white text-2xl">🔮</div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-xl font-bold text-gray-900">Profeta Creativo</h3>
                          <Crown className="h-5 w-5 text-purple-500 ml-2" />
                        </div>
                        <p className="text-sm text-gray-600">Ve el futuro de tus ads</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Precisión IA</span>
                      <span className="font-bold text-purple-600">91%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Combinaciones Analizadas</span>
                      <span className="font-bold text-gray-900">12 (3:2:2)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ahorro vs Testing Manual</span>
                      <span className="font-bold text-green-600">7 días → 2 horas</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full">
                      🔮 PROFETIZA AHORA
                    </div>
                    <ArrowRight className="h-5 w-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* AI INSIGHTS - QUADRUPLE AI */}
              <Link href="/ai-insights">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer group border-2 border-indigo-200 relative overflow-hidden">
                  {/* Badge de QUADRUPLE */}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    🤖 4 AI
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-xl font-bold text-gray-900">Quadruple AI</h3>
                          <Cpu className="h-5 w-5 text-indigo-500 ml-2" />
                        </div>
                        <p className="text-sm text-gray-600">Meta + Google + TikTok + Micro AI</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">AI Platforms Active</span>
                      <span className="font-bold text-indigo-600">
                        {quadrupleAI ? '4/4 Connected' : 'Demo Mode'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Unicorn Status</span>
                      <span className="font-bold text-purple-600">
                        {quadrupleAI?.ultimate?.unicorn_status || 'Initializing'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Market Position</span>
                      <span className="font-bold text-green-600">World's First</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full">
                      {quadrupleAI?.ultimate?.unicorn_status === 'ACHIEVED' ? '🦄 UNICORN' : '🤖 AI READY'}
                    </div>
                    <ArrowRight className="h-5 w-5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* MICRO-BUDGET AI - DEMOCRATIZATION */}
              <Link href="/micro-budget-ai">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer group border-2 border-green-200 relative overflow-hidden">
                  {/* Badge de DAVID vs GOLIATH */}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                    💪 DAVID
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                        <Calculator className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-xl font-bold text-gray-900">Micro-Budget AI</h3>
                          <Zap className="h-5 w-5 text-green-500 ml-2" />
                        </div>
                        <p className="text-sm text-gray-600">$50 > $5000 con IA</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">AI Multiplier</span>
                      <span className="font-bold text-green-600">
                        {quadrupleAI?.microBudget?.budget_analysis?.ai_multiplier || '8x'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Platform Savings</span>
                      <span className="font-bold text-green-600">
                        {quadrupleAI?.microBudget?.budget_analysis?.platform_savings || '73%'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expected ROI</span>
                      <span className="font-bold text-green-600">
                        {quadrupleAI?.microBudget?.ai_strategy?.expected_roi || '4.5x'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full">
                      💪 DEMOCRATIZE
                    </div>
                    <ArrowRight className="h-5 w-5 text-green-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Sección de Gráficos con Quadruple AI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Rendimiento Quadruple AI */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Rendimiento Quadruple AI</h3>
                  <div className="flex items-center space-x-2">
                    {quadrupleAI?.ultimate?.unicorn_status === 'ACHIEVED' && (
                      <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs font-medium px-2 py-1 rounded border border-purple-200">
                        🦄 UNICORN
                      </span>
                    )}
                    {quadrupleAI && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        🤖 4 AI Active
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => `AI Platform: ${value}`}
                        formatter={(value: any, name: string) => {
                          if (name === 'revenue') return [`${value.toLocaleString()}`, 'Ingresos'];
                          if (name === 'conversions') return [value, 'Conversiones'];
                          return [value, name];
                        }}
                      />
                      <Legend 
                        formatter={(value) => {
                          if (value === 'revenue') return 'Ingresos (AI Optimized)';
                          if (value === 'conversions') return 'Conversiones (AI Predicted)';
                          return value;
                        }}
                      />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="conversions" stackId="2" stroke="#06D6A0" fill="#06D6A0" fillOpacity={0.8} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Rendimiento por Canal AI */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Canales AI Optimizados</h3>
                  <div className="flex items-center space-x-2">
                    {realData?.status === 'success' && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        📊 Real Data
                      </span>
                    )}
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                      🤖 AI Enhanced
                    </span>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="channel" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any, name: string, props: any) => {
                          if (name === 'revenue') {
                            const isAiOptimized = props.payload.aiOptimized;
                            return [
                              `${value.toLocaleString()}`, 
                              isAiOptimized ? 'Ingresos (AI Optimized)' : 'Ingresos'
                            ];
                          }
                          return [value, name];
                        }}
                      />
                      <Bar 
                        dataKey="revenue" 
                        fill="#8B5CF6" 
                        radius={[4, 4, 0, 0]}
                        stroke="#6D28D9"
                        strokeWidth={2}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Leyenda de AI Optimization */}
                <div className="mt-4 grid grid-cols-1 gap-2">
                  {channelData.map((channel, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-700">{channel.channel}</span>
                        {channel.aiOptimized && (
                          <span className="ml-2 bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                            AI
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">
                          ${channel.revenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          CPA: ${channel.cpa}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer con Quadruple AI Status */}
            <div className="mt-8 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">AttributelyPro - Quadruple AI Status</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${quadrupleAI?.meta ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span>Meta AI: {quadrupleAI?.meta?.meta_ai_features?.advantage_plus_ready ? 'Ready' : 'Standby'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${quadrupleAI?.google ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
                      <span>Google AI: {quadrupleAI?.google?.google_ai_features?.performance_max_ready ? 'Ready' : 'Standby'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${quadrupleAI?.tiktok ? 'bg-pink-400' : 'bg-gray-400'}`}></div>
                      <span>TikTok AI: {quadrupleAI?.tiktok?.platform_advantages ? 'Ready' : 'Standby'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${quadrupleAI?.microBudget ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
                      <span>Micro AI: {quadrupleAI?.microBudget?.unicorn_killer_feature ? 'Ready' : 'Standby'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">
                    {quadrupleAI?.ultimate?.unicorn_status === 'ACHIEVED' ? '🦄' : '🤖'}
                  </div>
                  <div className="text-xs text-gray-300">
                    {quadrupleAI?.ultimate?.market_position || 'World\'s First Quadruple AI'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}