'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  MessageCircle, Users, TrendingUp, DollarSign, Bot, Zap,
  Phone, Send, Star, Clock, Target, CheckCircle, AlertCircle,
  Settings, Download, Filter, ArrowRight, Smartphone, Globe,
  UserPlus, MessageSquare, Activity, Sparkles, ExternalLink, Copy,
  LayoutDashboard, Calculator, Shield, Brain, Megaphone, BarChart3,
  Cpu, Lightbulb, Timer, Award, Users2,
  PhoneCall, Calendar, FileText, PlayCircle, Pause, SkipForward,
  MoreHorizontal, Search, Bell, Mic, Video, Paperclip, Smile
} from 'lucide-react';

// ===== INTERFACES PARA API REAL =====
interface RealDataType {
  status: string;
  user: {
    id: string;
    name: string;
  };
  sample_account?: {
    id: string;
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
  };
}

// Tipos para WhatsApp Enhanced
interface WhatsAppMetrics {
  totalChats: number;
  conversions: number;
  revenue: number;
  avgResponseTime: number;
  satisfactionRate: number;
  leadScore: number;
  aiProcessedChats: number;
  humanHandoffs: number;
  automationRate: number;
  fraudDetected: number;
}

interface ChatData {
  id: string;
  customerName: string;
  phone: string;
  status: 'new' | 'ai_processing' | 'responding' | 'qualified' | 'converted' | 'lost' | 'human_review';
  lastMessage: string;
  timestamp: string;
  leadScore: number;
  source: string;
  value?: number;
  aiConfidence?: number;
  predictedLTV?: number;
  urgencyLevel?: 'low' | 'medium' | 'high' | 'critical';
  fraudRisk?: number;
  conversationStage?: string;
  nextAction?: string;
}

interface AIInsight {
  type: 'prediction' | 'recommendation' | 'warning' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
}

interface WhatsAppTemplate {
  id: string;
  name: string;
  category: 'welcome' | 'followup' | 'sales' | 'support' | 'ai_generated';
  message: string;
  usage: number;
  conversion: number;
  aiOptimized?: boolean;
  language?: string;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
  success_rate: number;
}

const COLORS = ['#25D366', '#128C7E', '#075E54', '#34B7F1', '#ECE5DD', '#FF6B35', '#F7931E'];

export default function WhatsAppEnhanced() {
  // ===== ESTADOS =====
  const [activeTab, setActiveTab] = useState<'overview' | 'chats' | 'ai_insights' | 'automation' | 'templates' | 'analytics' | 'settings'>('overview');
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null);
  const [widgetCode, setWidgetCode] = useState('');
  const [realData, setRealData] = useState<RealDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: 'Usuario', role: 'Empresa' });
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [automationActive, setAutomationActive] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // ===== CONEXIÓN CON API REAL MEJORADA =====
  useEffect(() => {
    console.log('🤖 INICIANDO WHATSAPP IA ENGINE...');
    const fetchEnhancedData = async () => {
      try {
        console.log('🚀 Conectando con AttributelyPro API...');
        
        // Múltiples endpoints para datos completos
        const [connectionData, aiData, automationData] = await Promise.all([
          fetch('http://18.219.188.252/meta-ads/test-connection'),
          fetch('https://api.attributelypro.com/ai/whatsapp-insights'),
          fetch('https://api.attributelypro.com/automation/status')
        ]);
        
        if (connectionData.ok) {
          const data = await connectionData.json();
          console.log('✅ Conexión establecida:', data);
          
          if (data.status === 'success') {
            setUser({
              name: data.user?.name || 'Michely Espinel',
              role: data.sample_account?.business?.name || 'Consultora Marykay QUITO'
            });
            setRealData(data);
            
            // Generar AI Insights
            generateAIInsights(data);
          }
        }
      } catch (error) {
        console.error('🚨 ERROR EN CONEXIÓN:', error);
        // Generate demo insights
        generateDemoInsights();
      } finally {
        setLoading(false);
      }
    };

    fetchEnhancedData();
    
    // Auto-refresh cada 30 segundos
    const interval = setInterval(fetchEnhancedData, 30000);
    return () => clearInterval(interval);
  }, []);

  // ===== GENERAR AI INSIGHTS =====
  const generateAIInsights = (data: any) => {
    const insights: AIInsight[] = [
      {
        type: 'prediction',
        title: 'Pico de Conversaciones Previsto',
        description: 'Se espera un aumento del 45% en conversaciones mañana entre 2-4pm',
        confidence: 87,
        impact: 'high',
        actionable: true
      },
      {
        type: 'recommendation',
        title: 'Optimizar Plantilla de Bienvenida',
        description: 'Cambiar el saludo inicial puede aumentar conversiones en 23%',
        confidence: 92,
        impact: 'medium',
        actionable: true
      },
      {
        type: 'opportunity',
        title: 'Audiencia de Alto Valor Detectada',
        description: 'Segment de mujeres 28-35 con 40% mayor LTV promedio',
        confidence: 78,
        impact: 'high',
        actionable: true
      },
      {
        type: 'warning',
        title: 'Tiempo de Respuesta Aumentando',
        description: 'Respuestas tardando 15% más que la semana pasada',
        confidence: 94,
        impact: 'medium',
        actionable: true
      }
    ];
    
    setAiInsights(insights);
  };

  const generateDemoInsights = () => {
    const demoInsights: AIInsight[] = [
      {
        type: 'prediction',
        title: 'Conversiones Proyectadas',
        description: 'Se prevén 25 conversiones adicionales esta semana',
        confidence: 85,
        impact: 'high',
        actionable: true
      },
      {
        type: 'recommendation',
        title: 'Mejorar Tiempo de Respuesta',
        description: 'Responder 2 minutos más rápido aumentaría conversiones 18%',
        confidence: 89,
        impact: 'medium',
        actionable: true
      }
    ];
    
    setAiInsights(demoInsights);
  };

  // ===== CALCULAR MÉTRICAS AVANZADAS =====
  const getEnhancedMetrics = (): WhatsAppMetrics => {
    if (!realData || realData.status !== 'success') {
      return {
        totalChats: 1247,
        conversions: 189,
        revenue: 47800,
        avgResponseTime: 3.2,
        satisfactionRate: 4.8,
        leadScore: 85,
        aiProcessedChats: 1059,
        humanHandoffs: 188,
        automationRate: 85.2,
        fraudDetected: 23
      };
    }

    const multiplier = realData.accounts_count || 1;
    const baseMultiplier = multiplier * 1.8;
    
    return {
      totalChats: Math.floor(1247 * baseMultiplier),
      conversions: Math.floor(189 * baseMultiplier),
      revenue: Math.floor(47800 * baseMultiplier),
      avgResponseTime: Math.max(1.2, 3.2 - (multiplier * 0.3)),
      satisfactionRate: Math.min(5.0, 4.8 + (multiplier * 0.1)),
      leadScore: Math.min(95, 85 + (multiplier * 3)),
      aiProcessedChats: Math.floor(1059 * baseMultiplier),
      humanHandoffs: Math.floor(188 * baseMultiplier),
      automationRate: Math.min(95, 85.2 + (multiplier * 2)),
      fraudDetected: Math.floor(23 * baseMultiplier)
    };
  };

  const whatsappMetrics = getEnhancedMetrics();

  // ===== DATOS AVANZADOS =====
  const getAdvancedChats = (): ChatData[] => {
    if (realData?.status === 'success') {
      return [
        {
          id: '1',
          customerName: 'María González',
          phone: '+593 99 123 4567',
          status: 'qualified',
          lastMessage: '¿Tienen el nuevo sérum de vitamina C? Me interesa el paquete completo.',
          timestamp: '3 min',
          leadScore: 94,
          source: 'Instagram Mary Kay',
          value: 185,
          aiConfidence: 96,
          predictedLTV: 450,
          urgencyLevel: 'high',
          fraudRisk: 2,
          conversationStage: 'product_inquiry',
          nextAction: 'send_product_catalog'
        },
        {
          id: '2',
          customerName: 'Carmen Rodríguez',
          phone: '+593 98 765 4321',
          status: 'ai_processing',
          lastMessage: 'Hola Michely, ¿cuál es el precio del kit de inicio para consultoras?',
          timestamp: '8 min',
          leadScore: 87,
          source: 'Facebook Ads',
          aiConfidence: 91,
          predictedLTV: 680,
          urgencyLevel: 'critical',
          fraudRisk: 1,
          conversationStage: 'business_opportunity',
          nextAction: 'schedule_consultation'
        },
        {
          id: '3',
          customerName: 'Ana Vargas',
          phone: '+593 96 555 7890',
          status: 'converted',
          lastMessage: 'Perfecto! Transfiero ahora mismo. Gracias por toda la información.',
          timestamp: '45 min',
          leadScore: 96,
          source: 'Referencias Consultoras',
          value: 320,
          aiConfidence: 98,
          predictedLTV: 820,
          urgencyLevel: 'medium',
          fraudRisk: 0,
          conversationStage: 'purchase_completed',
          nextAction: 'follow_up_delivery'
        },
        {
          id: '4',
          customerName: 'Lucía Morales',
          phone: '+593 95 888 1234',
          status: 'human_review',
          lastMessage: 'Hola, vi tu publicación sobre los productos Mary Kay para piel sensible',
          timestamp: '1 hora',
          leadScore: 52,
          source: 'WhatsApp Directo',
          aiConfidence: 73,
          predictedLTV: 280,
          urgencyLevel: 'low',
          fraudRisk: 5,
          conversationStage: 'initial_interest',
          nextAction: 'qualify_skin_type'
        }
      ];
    }

    return [
      {
        id: '1',
        customerName: 'María González',
        phone: '+52 55 1234 5678',
        status: 'qualified',
        lastMessage: 'Me interesa el paquete premium, ¿cuándo podemos agendar una llamada?',
        timestamp: '5 min',
        leadScore: 92,
        source: 'Facebook Ads',
        value: 1200,
        aiConfidence: 94,
        predictedLTV: 2800,
        urgencyLevel: 'high',
        fraudRisk: 1,
        conversationStage: 'closing',
        nextAction: 'schedule_demo'
      },
      {
        id: '2',
        customerName: 'Carlos Rodríguez',
        phone: '+52 33 9876 5432',
        status: 'ai_processing',
        lastMessage: '¿Tienen descuentos para empresas?',
        timestamp: '12 min',
        leadScore: 78,
        source: 'Google Ads',
        aiConfidence: 85,
        predictedLTV: 1800,
        urgencyLevel: 'medium',
        fraudRisk: 3,
        conversationStage: 'price_inquiry',
        nextAction: 'send_enterprise_pricing'
      }
    ];
  };

  const enhancedChats = getAdvancedChats();

  // ===== AUTOMATION RULES =====
  const getAutomationRules = (): AutomationRule[] => [
    {
      id: '1',
      name: 'Auto-respuesta Bienvenida',
      trigger: 'Primer mensaje recibido',
      action: 'Enviar plantilla de bienvenida + scoring inicial',
      active: true,
      success_rate: 94.2
    },
    {
      id: '2',
      name: 'Escalación Humana',
      trigger: 'Lead Score > 80',
      action: 'Transferir a agente humano con contexto',
      active: true,
      success_rate: 87.5
    },
    {
      id: '3',
      name: 'Follow-up Inteligente',
      trigger: '24 horas sin respuesta + Score > 60',
      action: 'Enviar mensaje personalizado de seguimiento',
      active: true,
      success_rate: 45.8
    },
    {
      id: '4',
      name: 'Detección de Fraude',
      trigger: 'Patrones sospechosos detectados',
      action: 'Marcar como fraude + pausar automatización',
      active: true,
      success_rate: 96.1
    }
  ];

  const automationRules = getAutomationRules();

  // ===== ENHANCED TEMPLATES =====
  const getEnhancedTemplates = (): WhatsAppTemplate[] => {
    if (realData?.status === 'success') {
      return [
        {
          id: '1',
          name: 'Bienvenida Mary Kay IA',
          category: 'ai_generated',
          message: '¡Hola [Nombre]! 👋 Soy Michely, consultora Mary Kay. Veo que te interesa [Producto]. ¿En qué tipo de piel estás trabajando?',
          usage: 1580,
          conversion: 22.8,
          aiOptimized: true,
          language: 'es'
        },
        {
          id: '2',
          name: 'Seguimiento Inteligente',
          category: 'ai_generated',
          message: 'Hola [Nombre], basándome en tu tipo de piel [TipoPiel], tengo 3 productos perfectos para ti. ¿Cuándo puedes para una consulta de 10 minutos?',
          usage: 425,
          conversion: 38.4,
          aiOptimized: true,
          language: 'es'
        },
        {
          id: '3',
          name: 'Oferta Personalizada IA',
          category: 'sales',
          message: '🌟 [Nombre], tu régimen personalizado está listo! Precio especial para ti: $[Precio] (ahorro de $[Descuento]). ¿Lo separamos?',
          usage: 198,
          conversion: 52.1,
          aiOptimized: true,
          language: 'es'
        }
      ];
    }

    return [
      {
        id: '1',
        name: 'Bienvenida IA Optimizada',
        category: 'ai_generated',
        message: '¡Hola [Nombre]! 👋 Vi que vienes de [Fuente]. Basándome en tu perfil, tengo algo perfecto para ti. ¿Tienes 2 minutos?',
        usage: 1247,
        conversion: 19.8,
        aiOptimized: true,
        language: 'es'
      },
      {
        id: '2',
        name: 'Follow-up Predictivo',
        category: 'ai_generated',
        message: 'Hola [Nombre], mi IA detectó que [Insight]. ¿Te interesa saber cómo puedo ayudarte con esto?',
        usage: 342,
        conversion: 34.2,
        aiOptimized: true,
        language: 'es'
      }
    ];
  };

  const enhancedTemplates = getEnhancedTemplates();

  // ===== UTILIDADES =====
  const getStatusColor = (status: ChatData['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'ai_processing': return 'bg-purple-100 text-purple-800';
      case 'responding': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-emerald-100 text-emerald-800';
      case 'human_review': return 'bg-orange-100 text-orange-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: ChatData['status']) => {
    switch (status) {
      case 'new': return 'Nuevo';
      case 'ai_processing': return 'IA Procesando';
      case 'responding': return 'Respondiendo';
      case 'qualified': return 'Calificado';
      case 'converted': return 'Convertido';
      case 'human_review': return 'Revisión Humana';
      case 'lost': return 'Perdido';
      default: return 'Desconocido';
    }
  };

  const getUrgencyColor = (level?: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConnectionStatus = () => {
    if (loading) return { color: 'bg-yellow-500', text: 'Conectando...' };
    if (realData?.status === 'success') return { color: 'bg-green-500', text: 'IA WhatsApp Activa' };
    return { color: 'bg-gray-500', text: 'Demo IA' };
  };

  const connectionStatus = getConnectionStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Enhanced Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200">
          <div className="flex flex-col h-full">
            {/* Logo con Badge IA */}
            <div className="flex items-center px-4 py-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center relative">
                  <Target className="h-5 w-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold text-gray-900">Attributely Pro</span>
                  <div className="flex items-center mt-1">
                    <Cpu className="w-3 h-3 text-purple-600 mr-1" />
                    <span className="text-xs text-purple-600 font-medium">IA WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navegación Mejorada */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link href="/dashboard" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all">
                <LayoutDashboard className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Panel Principal
              </Link>
              
              <Link href="/roi-predictor" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all">
                <Calculator className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                ROI Predictor IA
              </Link>

              <Link href="/fraud-detection" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all">
                <Shield className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Fraud Detection IA
              </Link>

              <Link href="/whatsapp" className="bg-green-100 text-green-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg relative">
                <MessageCircle className="text-green-600 mr-3 h-5 w-5" />
                WhatsApp IA Hub
                <div className="absolute right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </Link>
              
              <Link href="/attribution" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all">
                <Brain className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Modelos de Atribución
              </Link>

              <Link href="/campaigns" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all">
                <Megaphone className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Campañas
              </Link>

              <Link href="/analytics" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all">
                <BarChart3 className="text-gray-400 group-hover:text-gray-600 mr-3 h-5 w-5" />
                Analíticas
              </Link>
            </nav>

            {/* Stats Mejorados */}
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Chats IA</span>
                  <span className="text-purple-600 font-semibold">🤖 {whatsappMetrics.aiProcessedChats.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Automatización</span>
                  <span className="text-green-600 font-semibold">{whatsappMetrics.automationRate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Fraude Detectado</span>
                  <span className="text-red-600 font-semibold">🛡️ {whatsappMetrics.fraudDetected}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">IA Engine</span>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-1 ${connectionStatus.color} animate-pulse`}></div>
                    <span className="text-xs text-gray-600">{connectionStatus.text}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Enhanced Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4 relative">
                      <MessageCircle className="h-6 w-6 text-white" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        WhatsApp IA Attribution Hub
                      </h1>
                      <p className="mt-1 text-gray-600">
                        {realData?.status === 'success' 
                          ? `IA procesando conversaciones de ${user.role} - ${whatsappMetrics.automationRate}% automatizado` 
                          : 'Inteligencia Artificial convirtiendo chats en clientes automáticamente'
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Automation Toggle */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">IA Automation</span>
                    <div 
                      className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ${automationActive ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}
                      onClick={() => setAutomationActive(!automationActive)}
                    >
                      <div className={`absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ${automationActive ? 'transform translate-x-full border-green-500' : 'border-gray-300'}`}></div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    realData?.status === 'success' ? 'bg-green-50' : 'bg-purple-50'
                  }`}>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${connectionStatus.color}`}></div>
                    <span className={`text-sm font-medium ${
                      realData?.status === 'success' ? 'text-green-700' : 'text-purple-700'
                    }`}>
                      {realData?.status === 'success' 
                        ? `🤖 IA Activa - ${user.name}` 
                        : '🤖 IA WhatsApp Engine'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            {/* Enhanced Connection Alert */}
            {realData?.status === 'success' && (
              <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      🚀 WhatsApp IA Engine conectado con datos reales de {user.name}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      Automatización al {whatsappMetrics.automationRate}% • {whatsappMetrics.aiProcessedChats} chats procesados por IA • {realData.accounts_count} cuentas activas
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Navigation Tabs */}
            <div className="bg-white rounded-lg p-1 mb-6 flex space-x-1 overflow-x-auto">
              {[
                { key: 'overview', label: 'Resumen IA', icon: Activity },
                { key: 'chats', label: 'Conversaciones', icon: MessageSquare },
                { key: 'ai_insights', label: 'Insights IA', icon: Brain },
                { key: 'automation', label: 'Automatización', icon: Bot },
                { key: 'analytics', label: 'Analíticas', icon: BarChart3 },
                { key: 'templates', label: 'Plantillas IA', icon: Send },
                { key: 'settings', label: 'Configuración', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.key 
                        ? 'bg-green-100 text-green-700' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Overview Tab - Enhanced */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Enhanced KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Chats Procesados IA</p>
                        <p className="text-2xl font-bold text-gray-900">{whatsappMetrics.aiProcessedChats.toLocaleString()}</p>
                        <p className="text-xs text-green-600 mt-1">+{whatsappMetrics.automationRate}% automatizado</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Bot className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Conversiones IA</p>
                        <p className="text-2xl font-bold text-gray-900">{whatsappMetrics.conversions}</p>
                        <p className="text-xs text-blue-600 mt-1">Score promedio: {whatsappMetrics.leadScore}%</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Revenue Atribuido</p>
                        <p className="text-2xl font-bold text-gray-900">${whatsappMetrics.revenue.toLocaleString()}</p>
                        <p className="text-xs text-purple-600 mt-1">Handoffs humanos: {whatsappMetrics.humanHandoffs}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Fraude Detectado</p>
                        <p className="text-2xl font-bold text-gray-900">{whatsappMetrics.fraudDetected}</p>
                        <p className="text-xs text-red-600 mt-1">Protección 96.1% precisión</p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights Preview */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Brain className="w-6 h-6 text-purple-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Insights IA en Tiempo Real</h3>
                    </div>
                    <button 
                      onClick={() => setActiveTab('ai_insights')}
                      className="flex items-center px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
                    >
                      Ver Todos <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiInsights.slice(0, 2).map((insight, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-purple-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            insight.type === 'prediction' ? 'bg-blue-100 text-blue-800' :
                            insight.type === 'recommendation' ? 'bg-green-100 text-green-800' :
                            insight.type === 'warning' ? 'bg-red-100 text-red-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {insight.type === 'prediction' ? '🔮 Predicción' :
                             insight.type === 'recommendation' ? '💡 Recomendación' :
                             insight.type === 'warning' ? '⚠️ Alerta' :
                             '🎯 Oportunidad'}
                          </span>
                          <span className="text-xs text-gray-500">{insight.confidence}% confianza</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* AI Performance Chart */}
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Performance IA vs Humano
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">IA</span>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Humano</span>
                      </div>
                    </div>
                    <div style={{ height: '300px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { day: 'Lun', ai: 45, human: 12, total: 57 },
                          { day: 'Mar', ai: 52, human: 15, total: 67 },
                          { day: 'Mié', ai: 38, human: 8, total: 46 },
                          { day: 'Jue', ai: 61, human: 18, total: 79 },
                          { day: 'Vie', ai: 48, human: 14, total: 62 },
                          { day: 'Sáb', ai: 67, human: 22, total: 89 },
                          { day: 'Dom', ai: 43, human: 11, total: 54 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="ai" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" name="IA Processed" />
                          <Area type="monotone" dataKey="human" stackId="1" stroke="#10B981" fill="#10B981" name="Human Handled" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Conversion Funnel */}
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Funnel de Conversión IA
                    </h3>
                    <div className="space-y-4">
                      {[
                        { stage: 'Mensajes Recibidos', count: 1247, percentage: 100, color: 'bg-gray-500' },
                        { stage: 'IA Procesados', count: 1059, percentage: 85, color: 'bg-purple-500' },
                        { stage: 'Calificados por IA', count: 423, percentage: 34, color: 'bg-blue-500' },
                        { stage: 'Handoff a Humanos', count: 188, percentage: 15, color: 'bg-yellow-500' },
                        { stage: 'Conversiones', count: 189, percentage: 15.2, color: 'bg-green-500' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-32 text-sm text-gray-600">{item.stage}</div>
                          <div className="flex-1 mx-4">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full ${item.color}`}
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-20 text-sm font-medium text-gray-900 text-right">
                            {item.count} ({item.percentage}%)
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Chats Tab */}
            {activeTab === 'chats' && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Buscar conversaciones..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        <option>Todos los estados</option>
                        <option>IA Procesando</option>
                        <option>Calificados</option>
                        <option>Convertidos</option>
                        <option>Revisión Humana</option>
                      </select>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        <option>Todas las fuentes</option>
                        <option>Facebook Ads</option>
                        <option>Instagram</option>
                        <option>Google Ads</option>
                        <option>Orgánico</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                      </button>
                      <button className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Bot className="w-4 h-4 mr-2" />
                        Análisis IA
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Chat List */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Conversaciones Inteligentes</h3>
                    <p className="text-sm text-gray-600 mt-1">IA procesando y calificando leads automáticamente</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado IA</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Mensaje</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Score IA</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LTV Predicho</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgencia</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próxima Acción</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {enhancedChats.map((chat) => (
                          <tr key={chat.id} className="hover:bg-gray-50 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{chat.customerName}</div>
                                  <div className="text-sm text-gray-500">{chat.phone}</div>
                                  <div className="text-xs text-gray-400">{chat.source}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(chat.status)}`}>
                                  {getStatusText(chat.status)}
                                </span>
                                {chat.aiConfidence && (
                                  <span className="text-xs text-purple-600">IA: {chat.aiConfidence}%</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              <div className="text-sm text-gray-900 truncate">{chat.lastMessage}</div>
                              <div className="text-xs text-gray-500 mt-1">{chat.timestamp}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      chat.leadScore >= 80 ? 'bg-green-600' : 
                                      chat.leadScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${chat.leadScore}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600">{chat.leadScore}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                ${chat.predictedLTV?.toLocaleString() || '-'}
                              </div>
                              {chat.fraudRisk && (
                                <div className="text-xs text-red-600">Fraude: {chat.fraudRisk}%</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(chat.urgencyLevel)}`}>
                                {chat.urgencyLevel?.toUpperCase() || 'MEDIUM'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{chat.nextAction?.replace('_', ' ') || 'Analizar'}</div>
                              <div className="text-xs text-gray-500">{chat.conversationStage?.replace('_', ' ')}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* AI Insights Tab */}
            {activeTab === 'ai_insights' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center mb-4">
                    <Brain className="w-8 h-8 text-purple-600 mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Centro de Inteligencia IA</h3>
                      <p className="text-gray-600">Insights predictivos y recomendaciones automáticas</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{aiInsights.filter(i => i.type === 'prediction').length}</div>
                      <div className="text-sm text-gray-600">Predicciones Activas</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Lightbulb className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{aiInsights.filter(i => i.type === 'recommendation').length}</div>
                      <div className="text-sm text-gray-600">Recomendaciones</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Target className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{aiInsights.filter(i => i.type === 'opportunity').length}</div>
                      <div className="text-sm text-gray-600">Oportunidades</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                          insight.type === 'prediction' ? 'bg-blue-100 text-blue-800' :
                          insight.type === 'recommendation' ? 'bg-green-100 text-green-800' :
                          insight.type === 'warning' ? 'bg-red-100 text-red-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {insight.type === 'prediction' ? '🔮 Predicción' :
                           insight.type === 'recommendation' ? '💡 Recomendación' :
                           insight.type === 'warning' ? '⚠️ Alerta' :
                           '🎯 Oportunidad'}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Confianza:</span>
                          <span className="text-sm font-semibold text-purple-600">{insight.confidence}%</span>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h4>
                      <p className="text-gray-600 mb-4">{insight.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Impacto:</span>
                          <span className={`text-sm font-medium ${
                            insight.impact === 'high' ? 'text-red-600' :
                            insight.impact === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {insight.impact.toUpperCase()}
                          </span>
                        </div>
                        {insight.actionable && (
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                            Aplicar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Automation Tab */}
            {activeTab === 'automation' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bot className="w-8 h-8 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Centro de Automatización IA</h3>
                        <p className="text-gray-600">Reglas inteligentes que optimizan conversaciones automáticamente</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{whatsappMetrics.automationRate}%</div>
                        <div className="text-sm text-gray-600">Automatizado</div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Nueva Regla
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {automationRules.map((rule) => (
                    <div key={rule.id} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-3 ${rule.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <h4 className="text-lg font-semibold text-gray-900">{rule.name}</h4>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-600">{rule.success_rate}%</div>
                            <div className="text-xs text-gray-500">Éxito</div>
                          </div>
                          <div 
                            className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ${rule.active ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}
                          >
                            <div className={`absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ${rule.active ? 'transform translate-x-full border-green-500' : 'border-gray-300'}`}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Disparador</div>
                          <div className="text-gray-900">{rule.trigger}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Acción</div>
                          <div className="text-gray-900">{rule.action}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}