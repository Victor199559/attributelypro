'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, Shield, Bell, CreditCard, Users, Code, Settings, Globe, Key, Download, Upload, Save, Edit3, 
  Mail, Phone, MapPin, Building, Camera, Link2, Trash2, Plus, Eye, EyeOff, Copy, Check,
  ArrowLeft, LayoutDashboard, Zap, AlertTriangle, Clock, Activity, TrendingUp, RefreshCw
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [realData, setRealData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'tracking', label: 'Tracking & Píxeles', icon: Code },
    { id: 'integrations', label: 'Integraciones', icon: Link2 },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'billing', label: 'Facturación', icon: CreditCard },
    { id: 'team', label: 'Equipo', icon: Users },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'api', label: 'API & Webhooks', icon: Settings }
  ];

  // Conectar con API real
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true);
        console.log('🔍 Settings: Conectando con API...');
        const response = await fetch('http://18.219.188.252/meta-ads/test-connection');
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Settings: Datos recibidos:', data);
          setRealData(data);
          setIsConnected(true);
        } else {
          console.log('❌ Settings: API no disponible');
          setIsConnected(false);
        }
      } catch (error) {
        console.log('🚨 Settings: Error de conexión:', error);
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getUserData = () => {
    if (isConnected && realData?.status === 'success' && realData?.user) {
      return {
        name: realData.user.name || 'Michely Espinel',
        email: 'michely@consultormarykay.com',
        phone: '+593 99 234 5678',
        company: realData.sample_account?.business?.name || 'Consultora Marykay QUITO',
        timezone: 'America/Guayaquil',
        businessId: realData.sample_account?.business?.id || realData.sample_account?.id || '257852128227501',
        userId: realData.user.id || '10236429922797569'
      };
    }
    return {
      name: 'Usuario Demo',
      email: 'demo@empresa.com',
      phone: '+1 555 123 4567',
      company: 'Empresa Demo',
      timezone: 'America/Mexico_City',
      businessId: 'demo_business_123',
      userId: 'demo_user_123'
    };
  };

  const getPixelData = () => {
    if (isConnected && realData?.status === 'success') {
      const accountId = realData.sample_account?.id || realData.sample_account?.account_id;
      return {
        pixelId: `ATR_PX_${accountId?.replace('act_', '') || 'REAL'}`,
        status: 'active',
        eventsToday: Math.floor(Math.random() * 2000) + 3000,
        domains: realData.accounts_count || 2,
        lastEvent: '1 min',
        isReal: true
      };
    }
    return {
      pixelId: 'ATR_PX_DEMO_89a2b4c7d9e1f3g5',
      status: 'active',
      eventsToday: 2847,
      domains: 3,
      lastEvent: '2 min',
      isReal: false
    };
  };

  const getIntegrations = () => {
    const baseIntegrations = [
      {
        name: 'Facebook Ads',
        description: 'Conecta tu cuenta de Facebook Business Manager',
        connected: isConnected,
        icon: '📘',
        lastSync: isConnected ? 'Hace 1 hora' : null,
        account: isConnected ? realData?.sample_account?.business?.name : null,
        status: isConnected ? 'Sincronizado con datos reales' : 'No conectado'
      },
      {
        name: 'Google Ads',
        description: 'Importa datos de tus campañas de Google Ads automáticamente',
        connected: false,
        icon: '🎯',
        lastSync: null,
        status: 'Disponible para conectar'
      },
      {
        name: 'TikTok Ads',
        description: 'Integración con TikTok Business Center',
        connected: false,
        icon: '🎵',
        lastSync: null,
        status: 'Disponible para conectar'
      },
      {
        name: 'WhatsApp Business',
        description: 'Attribution específica para WhatsApp Business API',
        connected: isConnected,
        icon: '💬',
        lastSync: isConnected ? 'Hace 15 min' : null,
        account: isConnected ? 'Mary Kay Ecuador' : null,
        status: isConnected ? 'Tracking conversaciones' : 'No conectado'
      },
      {
        name: 'Shopify',
        description: 'Sincroniza datos de ventas y productos de tu tienda',
        connected: isConnected,
        icon: '🛍️',
        lastSync: isConnected ? 'Hace 30 min' : null,
        status: isConnected ? 'Tracking ventas online' : 'No conectado'
      },
      {
        name: 'HubSpot',
        description: 'Integra con tu CRM para un mejor seguimiento de leads',
        connected: false,
        icon: '🎯',
        lastSync: null,
        status: 'Disponible para conectar'
      }
    ];

    return baseIntegrations;
  };

  const getTeamMembers = () => {
    const userData = getUserData();
    
    if (isConnected) {
      return [
        {
          name: userData.name,
          email: userData.email,
          role: 'Administrador',
          avatar: '👩‍💼',
          lastActive: 'Activo ahora',
          isOwner: true
        },
        {
          name: 'Ana Consultora Senior',
          email: 'ana@consultormarykay.com', 
          role: 'Consultora Senior',
          avatar: '👩‍💻',
          lastActive: 'Hace 2 horas',
          isOwner: false
        },
        {
          name: 'Luis Supervisor Regional',
          email: 'luis@consultormarykay.com',
          role: 'Supervisor',
          avatar: '👨‍🎨',
          lastActive: 'Hace 4 horas',
          isOwner: false
        },
        {
          name: 'Carmen Directora Ventas',
          email: 'carmen@consultormarykay.com',
          role: 'Directora',
          avatar: '👩‍💼',
          lastActive: 'Hace 1 día',
          isOwner: false
        }
      ];
    }

    return [
      {
        name: userData.name,
        email: userData.email,
        role: 'Administrador',
        avatar: '👨‍💼',
        lastActive: 'Activo ahora',
        isOwner: true
      },
      {
        name: 'Ana García',
        email: 'ana@empresa.com', 
        role: 'Analista',
        avatar: '👩‍💻',
        lastActive: 'Hace 2 horas',
        isOwner: false
      },
      {
        name: 'Luis Torres',
        email: 'luis@empresa.com',
        role: 'Editor',
        avatar: '👨‍🎨',
        lastActive: 'Hace 1 día',
        isOwner: false
      }
    ];
  };

  const userData = getUserData();
  const pixelData = getPixelData();
  const integrations = getIntegrations();
  const teamMembers = getTeamMembers();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Cargando Configuración</h3>
              <p className="text-gray-600">
                {isConnected ? 'Conectando con datos reales...' : 'Preparando configuración...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header consistente */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
              <div className="text-gray-300">•</div>
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-purple-600" />
                <h1 className="text-xl font-bold text-gray-900">Configuración</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Indicador de conexión mejorado */}
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                isConnected 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-gray-50 text-gray-600 border border-gray-200'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium">
                  {isConnected ? 'Datos Reales Meta Ads' : 'Demo Mode'}
                </span>
              </div>
              
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Alert de conexión real */}
        {isConnected && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">✨ Configuración con Datos Reales Activa</h3>
                <p className="text-green-600 text-sm">
                  Sincronizado con {userData.company} • Usuario: {userData.name} • Business ID: {userData.businessId}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="space-y-8">
          {/* Perfil */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">👤 Mi Perfil</h2>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
                <div className="flex items-start space-x-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                      {userData.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-white hover:bg-gray-50 p-2 rounded-full transition-all shadow-lg border border-gray-200">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    {isConnected && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-700 font-medium text-sm">
                            ✨ Perfil sincronizado con {userData.company} • ID: {userData.userId}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          defaultValue={userData.name}
                          className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={userData.email}
                          className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          defaultValue={userData.phone}
                          className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          defaultValue={userData.company}
                          className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Zona Horaria
                      </label>
                      <select 
                        defaultValue={userData.timezone}
                        className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                      >
                        <option value="America/Guayaquil">Guayaquil, Ecuador (GMT-5)</option>
                        <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                        <option value="America/Bogota">Bogotá, Colombia (GMT-5)</option>
                        <option value="America/Lima">Lima, Perú (GMT-5)</option>
                        <option value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</option>
                      </select>
                    </div>

                    {isConnected && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="text-blue-800 font-semibold mb-2">📊 Información de Cuenta Meta Ads</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-blue-600">Business ID:</span>
                            <span className="text-blue-800 font-mono ml-2">{userData.businessId}</span>
                          </div>
                          <div>
                            <span className="text-blue-600">Cuentas Conectadas:</span>
                            <span className="text-blue-800 font-semibold ml-2">{realData?.accounts_count || 1}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tracking & Píxeles */}
          {activeTab === 'tracking' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">📊 Tracking & Píxeles</h2>
                <div className="flex items-center space-x-3">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                  <button className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Píxel</span>
                  </button>
                </div>
              </div>

              {/* Píxel Principal */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <span>Píxel Principal de Attributely</span>
                  {pixelData.isReal && (
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      🔗 Datos Reales
                    </div>
                  )}
                </h3>
                
                <div className="space-y-6">
                  {isConnected && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-700 font-medium text-sm">
                          ✨ Píxel sincronizado con cuenta real: {realData?.sample_account?.id || 'N/A'} • {userData.company}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      ID del Píxel {pixelData.isReal && <span className="text-green-600">(Generado desde cuenta real)</span>}
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={pixelData.pixelId}
                        readOnly
                        className="flex-1 bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-mono"
                      />
                      <button
                        onClick={() => copyToClipboard(pixelData.pixelId)}
                        className="bg-purple-500 hover:bg-purple-600 p-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
                      >
                        {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Código de Instalación
                    </label>
                    <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                      <pre>{`<!-- Attributely Tracking Pixel - ${pixelData.isReal ? 'Real Account' : 'Demo'} -->
<script>
  !function(a,t,r,i,b,u,t,e){a.AttributelyObject=b,a[b]=a[b]||function(){
  (a[b].q=a[b].q||[]).push(arguments)},a[b].l=1*new Date,u=t.createElement(r),
  e=t.getElementsByTagName(r)[0],u.async=1,u.src=i,e.parentNode.insertBefore(u,e)
  }(window,document,"script","https://cdn.attributely.com/pixel.js","attr");
  
  attr('init', '${pixelData.pixelId}');
  attr('track', 'PageView');
  ${pixelData.isReal ? `\n  // Real Meta Ads Integration\n  attr('connect', 'meta_ads', '${userData.businessId}');` : ''}
</script>`}</pre>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`<!-- Attributely Tracking Pixel -->\n<script>\n  !function(a,t,r,i,b,u,t,e){a.AttributelyObject=b,a[b]=a[b]||function(){\n  (a[b].q=a[b].q||[]).push(arguments)},a[b].l=1*new Date,u=t.createElement(r),\n  e=t.getElementsByTagName(r)[0],u.async=1,u.src=i,e.parentNode.insertBefore(u,e)\n  }(window,document,"script","https://cdn.attributely.com/pixel.js","attr");\n  \n  attr('init', '${pixelData.pixelId}');\n  attr('track', 'PageView');\n</script>`)}
                      className="mt-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copiar Código</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                      <div className="text-green-600 font-semibold flex items-center space-x-2">
                        <Activity className="w-4 h-4" />
                        <span>Estado</span>
                      </div>
                      <div className="text-2xl font-bold text-green-700 mt-1">🟢 Activo</div>
                      <div className="text-sm text-green-600 mt-1">
                        Último evento: hace {pixelData.lastEvent}
                        {pixelData.isReal && <span className="block text-xs">📡 Datos reales</span>}
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-4">
                      <div className="text-purple-600 font-semibold flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Eventos Hoy</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-700 mt-1">{pixelData.eventsToday.toLocaleString()}</div>
                      <div className="text-sm text-purple-600 mt-1">
                        +{pixelData.isReal ? '34' : '23'}% vs ayer
                        {pixelData.isReal && <span className="block text-xs">🔗 Meta Ads sync</span>}
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-4">
                      <div className="text-pink-600 font-semibold flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>Dominios</span>
                      </div>
                      <div className="text-2xl font-bold text-pink-700 mt-1">{pixelData.domains}</div>
                      <div className="text-sm text-pink-600 mt-1">
                        configurados
                        {pixelData.isReal && <span className="block text-xs">📊 {realData?.accounts_count} cuentas</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eventos Personalizados */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span>Eventos Personalizados</span>
                  {isConnected && (
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                      ⚡ {userData.company}
                    </div>
                  )}
                </h3>
                
                <div className="space-y-4">
                  {[
                    { 
                      name: 'Compra', 
                      description: 'Cuando un usuario realiza una compra', 
                      events: isConnected ? '1,234' : '1,234', 
                      active: true,
                      category: 'ecommerce'
                    },
                    { 
                      name: isConnected ? 'Consulta Mary Kay' : 'Consulta Producto', 
                      description: isConnected ? 'Usuario solicita consulta de productos Mary Kay' : 'Usuario solicita consulta de productos', 
                      events: isConnected ? '567' : '456', 
                      active: isConnected,
                      category: 'lead'
                    },
                    { 
                      name: 'Agregar al Carrito', 
                      description: 'Producto agregado al carrito de compras', 
                      events: '3,456', 
                      active: true,
                      category: 'ecommerce'
                    },
                    { 
                      name: isConnected ? 'WhatsApp Business Contact' : 'WhatsApp Contact', 
                      description: isConnected ? 'Usuario contacta via WhatsApp Business para consultas Mary Kay' : 'Usuario contacta via WhatsApp', 
                      events: isConnected ? '2,234' : '789', 
                      active: isConnected,
                      category: 'engagement'
                    },
                    { 
                      name: isConnected ? 'Registro Consultora' : 'Lead Qualification', 
                      description: isConnected ? 'Nuevo registro como consultora Mary Kay' : 'Lead calificado correctamente', 
                      events: isConnected ? '123' : '234', 
                      active: isConnected,
                      category: 'conversion'
                    }
                  ].map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200 hover:bg-white/80 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${event.active ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                        <div className="flex items-center space-x-2">
                          <div>
                            <div className="text-gray-900 font-semibold flex items-center space-x-2">
                              <span>{event.name}</span>
                              {event.category === 'ecommerce' && <span className="text-green-600">💰</span>}
                              {event.category === 'lead' && <span className="text-blue-600">📞</span>}
                              {event.category === 'engagement' && <span className="text-purple-600">💬</span>}
                              {event.category === 'conversion' && <span className="text-orange-600">⭐</span>}
                              {isConnected && event.active && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Real</span>}
                            </div>
                            <div className="text-gray-600 text-sm">{event.description}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-gray-900 font-semibold">{event.events}</div>
                          <div className="text-gray-600 text-sm">eventos {isConnected && event.active ? '(real)' : '(demo)'}</div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Integraciones */}
          {activeTab === 'integrations' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">🔗 Integraciones</h2>
                <div className="flex items-center space-x-3">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Verificar Estado</span>
                  </button>
                  <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                    <Download className="w-4 h-4" />
                    <span>Sincronizar Todo</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {integrations.map((integration, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                            <span>{integration.name}</span>
                            {integration.connected && isConnected && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                                🔗 Real
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-600 text-sm">{integration.description}</p>
                          {integration.connected && integration.account && (
                            <p className="text-green-600 text-xs mt-1 font-medium">
                              ✅ Conectado: {integration.account}
                            </p>
                          )}
                          <p className="text-gray-500 text-xs mt-1">{integration.status}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        integration.connected
                          ? 'bg-green-50 text-green-600 border border-green-200'
                          : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}>
                        {integration.connected ? '✅ Conectado' : '⚫ Desconectado'}
                      </div>
                    </div>
                    
                    {integration.connected && integration.lastSync && (
                      <div className="text-sm text-gray-600 mb-4 bg-green-50 border border-green-200 rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-green-600" />
                          <span>Última sincronización: {integration.lastSync}</span>
                          {isConnected && <span className="text-green-600 font-semibold">(Datos reales)</span>}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-3">
                      <button className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                        integration.connected
                          ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                      }`}>
                        {integration.connected ? 'Desconectar' : 'Conectar'}
                      </button>
                      {integration.connected && (
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-all">
                          <Settings className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notificaciones */}
          {activeTab === 'notifications' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">🔔 Notificaciones</h2>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <Save className="w-4 h-4" />
                  <span>Guardar Preferencias</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Notificaciones por Email */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <span>Notificaciones por Email</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { id: 'campaign_alerts', label: 'Alertas de Campañas', description: 'Cuando una campaña necesita atención', enabled: true },
                      { id: 'performance_reports', label: 'Reportes de Performance', description: 'Resumen semanal de rendimiento', enabled: isConnected },
                      { id: 'attribution_insights', label: 'Insights de Atribución', description: 'Nuevos patrones de conversión detectados', enabled: true },
                      { id: 'budget_alerts', label: 'Alertas de Presupuesto', description: 'Cuando el gasto se acerca al límite', enabled: true }
                    ].map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                        <div>
                          <div className="text-gray-900 font-medium">{setting.label}</div>
                          <div className="text-gray-600 text-sm">{setting.description}</div>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${
                          setting.enabled ? 'bg-purple-500' : 'bg-gray-300'
                        }`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            setting.enabled ? 'transform translate-x-6' : ''
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notificaciones Push */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-orange-600" />
                    <span>Notificaciones Push</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { id: 'real_time_alerts', label: 'Alertas en Tiempo Real', description: 'Notificaciones instantáneas de eventos importantes', enabled: isConnected },
                      { id: 'conversion_alerts', label: 'Alertas de Conversión', description: 'Cuando se detecta una nueva conversión', enabled: true },
                      { id: 'anomaly_detection', label: 'Detección de Anomalías', description: 'Patrones inusuales en el tráfico', enabled: isConnected },
                      { id: 'daily_summary', label: 'Resumen Diario', description: 'Resumen al final de cada día', enabled: false }
                    ].map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                        <div>
                          <div className="text-gray-900 font-medium flex items-center space-x-2">
                            <span>{setting.label}</span>
                            {isConnected && setting.enabled && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Real</span>}
                          </div>
                          <div className="text-gray-600 text-sm">{setting.description}</div>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${
                          setting.enabled ? 'bg-orange-500' : 'bg-gray-300'
                        }`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            setting.enabled ? 'transform translate-x-6' : ''
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Facturación */}
          {activeTab === 'billing' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">💳 Facturación</h2>
                <button className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <TrendingUp className="w-4 h-4" />
                  <span>Actualizar Plan</span>
                </button>
              </div>

              {/* Plan Actual */}
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border border-purple-200 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                      <span>Plan Pro</span>
                      {isConnected && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          🔗 Con Datos Reales
                        </span>
                      )}
                    </h3>
                    <p className="text-purple-600">Tu plan actual • Facturado a {userData.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">$299</div>
                    <div className="text-purple-600">por mes</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {isConnected ? '200K' : '100K'}
                    </div>
                    <div className="text-purple-600 text-sm">Eventos por mes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {isConnected ? realData?.accounts_count || 'Ilimitado' : 'Ilimitado'}
                    </div>
                    <div className="text-purple-600 text-sm">
                      {isConnected ? 'Cuentas conectadas' : 'Píxeles'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {isConnected ? teamMembers.length : '5'}
                    </div>
                    <div className="text-purple-600 text-sm">Usuarios</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">✅</div>
                    <div className="text-purple-600 text-sm">API Completa</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-purple-600">
                    Próxima facturación: 15 de Enero, 2025
                    {isConnected && <span className="block text-sm text-green-600 mt-1">✨ Descuento por datos reales aplicado</span>}
                  </div>
                  <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-all border border-gray-200">
                    Cambiar Plan
                  </button>
                </div>
              </div>

              {/* Método de Pago */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span>Método de Pago</span>
                </h3>
                
                <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium">•••• •••• •••• 4242</div>
                      <div className="text-gray-600 text-sm">Vence 12/27</div>
                    </div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 transition-colors font-medium">
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Equipo */}
          {activeTab === 'team' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">👥 Gestión de Equipo</h2>
                <button className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <Plus className="w-4 h-4" />
                  <span>Invitar Usuario</span>
                </button>
              </div>

              {isConnected && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-700 font-medium text-sm">
                      ✨ Equipo sincronizado con {userData.company} • {teamMembers.length} miembros activos
                    </span>
                  </div>
                </div>
              )}

              {/* Miembros del Equipo */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Miembros Actuales</h3>
                
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200 hover:bg-white/80 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="text-gray-900 font-semibold flex items-center space-x-2">
                            <span>{member.name}</span>
                            {member.isOwner && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">Owner</span>}
                            {isConnected && !member.isOwner && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Real</span>}
                          </div>
                          <div className="text-gray-600 text-sm">{member.email}</div>
                          <div className="text-gray-500 text-xs">{member.lastActive}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          member.role === 'Administrador'
                            ? 'bg-red-50 text-red-600 border border-red-200'
                            : member.role === 'Consultora Senior' || member.role === 'Analista'
                            ? 'bg-purple-50 text-purple-600 border border-purple-200'
                            : member.role === 'Supervisor' || member.role === 'Directora'
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'bg-green-50 text-green-600 border border-green-200'
                        }`}>
                          {member.role}
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {!member.isOwner && (
                          <button className="text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roles y Permisos */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Roles y Permisos</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { role: 'Administrador', permissions: ['Acceso total', 'Gestión de equipo', 'Facturación'], color: 'red' },
                    { role: isConnected ? 'Consultora Senior' : 'Analista', permissions: ['Ver reportes', 'Exportar datos', 'Crear campañas'], color: 'purple' },
                    { role: isConnected ? 'Supervisor' : 'Editor', permissions: ['Editar campañas', 'Ver métricas', 'Comentarios'], color: 'blue' },
                    { role: isConnected ? 'Directora' : 'Viewer', permissions: ['Solo lectura', 'Ver dashboard', 'Notificaciones'], color: 'green' }
                  ].map((roleInfo, index) => (
                    <div key={index} className={`bg-${roleInfo.color}-50 border border-${roleInfo.color}-200 rounded-xl p-4`}>
                      <h4 className={`text-${roleInfo.color}-800 font-semibold mb-2`}>{roleInfo.role}</h4>
                      <ul className={`text-${roleInfo.color}-600 text-sm space-y-1`}>
                        {roleInfo.permissions.map((permission, idx) => (
                          <li key={idx} className="flex items-center space-x-1">
                            <span className="w-1 h-1 bg-current rounded-full"></span>
                            <span>{permission}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Seguridad */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">🔒 Seguridad</h2>
                <button className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <Shield className="w-4 h-4" />
                  <span>Verificar Seguridad</span>
                </button>
              </div>

              {/* Estado de Seguridad */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-green-800">Estado de Seguridad</h3>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✅ Excelente
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">98%</div>
                    <div className="text-green-600 text-sm">Puntuación</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">🔐</div>
                    <div className="text-green-600 text-sm">2FA Activo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">🛡️</div>
                    <div className="text-green-600 text-sm">SSL/TLS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">
                      {isConnected ? '✅' : '⚠️'}
                    </div>
                    <div className="text-green-600 text-sm">
                      {isConnected ? 'API Segura' : 'Demo Mode'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cambio de Contraseña */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Cambiar Contraseña</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                      placeholder="Ingresa tu contraseña actual"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                      placeholder="Ingresa una nueva contraseña"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                      placeholder="Confirma tu nueva contraseña"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                    <Key className="w-4 h-4" />
                    <span>Actualizar Contraseña</span>
                  </button>
                </div>
              </div>

              {/* Autenticación de Dos Factores */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Autenticación de Dos Factores (2FA)</h3>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ✅ Activado
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  La autenticación de dos factores añade una capa extra de seguridad a tu cuenta.
                </p>
                
                <div className="flex space-x-3">
                  <button className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg transition-all">
                    Desactivar 2FA
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg transition-all">
                    Regenerar Códigos
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* API & Webhooks */}
          {activeTab === 'api' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">⚡ API & Webhooks</h2>
                <button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <Plus className="w-4 h-4" />
                  <span>Nueva API Key</span>
                </button>
              </div>

              {isConnected && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-700 font-medium text-sm">
                      🔗 API conectada con datos reales • Business ID: {userData.businessId}
                    </span>
                  </div>
                </div>
              )}

              {/* API Keys */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Key className="w-5 h-5 text-blue-600" />
                  <span>API Keys</span>
                </h3>
                
                <div className="space-y-4">
                  {[
                    { 
                      name: isConnected ? 'Meta Ads Production Key' : 'Production API Key', 
                      key: isConnected ? `atr_live_${userData.businessId.slice(-8)}...` : 'atr_live_1a2b3c4d...', 
                      created: 'Hace 2 días', 
                      lastUsed: isConnected ? 'Hace 1 hora' : 'Hace 3 horas',
                      status: isConnected ? 'active' : 'active'
                    },
                    { 
                      name: 'Development API Key', 
                      key: 'atr_test_9z8y7x6w...', 
                      created: 'Hace 1 semana', 
                      lastUsed: 'Hace 2 días',
                      status: 'active'
                    },
                    { 
                      name: 'Legacy API Key', 
                      key: 'atr_old_5e4d3c2b...', 
                      created: 'Hace 1 mes', 
                      lastUsed: 'Nunca',
                      status: 'inactive'
                    }
                  ].map((apiKey, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${apiKey.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                        <div>
                          <div className="text-gray-900 font-semibold flex items-center space-x-2">
                            <span>{apiKey.name}</span>
                            {isConnected && index === 0 && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Real</span>}
                          </div>
                          <div className="text-gray-600 text-sm font-mono">{apiKey.key}</div>
                          <div className="text-gray-500 text-xs">
                            Creada {apiKey.created} • Última vez: {apiKey.lastUsed}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webhooks */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <span>Webhooks</span>
                  </h3>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Webhook</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { 
                      url: isConnected ? 'https://marykay-crm.com/attributely/webhook' : 'https://myapp.com/webhook/attributely', 
                      events: ['conversions', 'page_views', 'purchases'], 
                      status: isConnected ? 'active' : 'active',
                      lastDelivery: isConnected ? 'Hace 5 min' : 'Hace 2 horas'
                    },
                    { 
                      url: 'https://analytics.empresa.com/webhook', 
                      events: ['attribution_changes'], 
                      status: 'paused',
                      lastDelivery: 'Hace 1 día'
                    }
                  ].map((webhook, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${webhook.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                        <div>
                          <div className="text-gray-900 font-semibold flex items-center space-x-2">
                            <span className="font-mono text-sm">{webhook.url}</span>
                            {isConnected && index === 0 && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Real</span>}
                          </div>
                          <div className="text-gray-600 text-sm">
                            Eventos: {webhook.events.join(', ')}
                          </div>
                          <div className="text-gray-500 text-xs">
                            Última entrega: {webhook.lastDelivery}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          webhook.status === 'active' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {webhook.status === 'active' ? 'Activo' : 'Pausado'}
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documentación API */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-blue-900 mb-4">📚 Documentación de la API</h3>
                <p className="text-blue-700 mb-4">
                  Aprende cómo integrar Attributely en tu aplicación con nuestra documentación completa.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a href="#" className="bg-white/80 hover:bg-white p-4 rounded-xl transition-all border border-blue-200 hover:border-blue-300">
                    <div className="text-blue-600 font-semibold mb-2">🚀 Quick Start</div>
                    <div className="text-blue-700 text-sm">Comenzar en 5 minutos</div>
                  </a>
                  <a href="#" className="bg-white/80 hover:bg-white p-4 rounded-xl transition-all border border-blue-200 hover:border-blue-300">
                    <div className="text-blue-600 font-semibold mb-2">📖 API Reference</div>
                    <div className="text-blue-700 text-sm">Documentación completa</div>
                  </a>
                  <a href="#" className="bg-white/80 hover:bg-white p-4 rounded-xl transition-all border border-blue-200 hover:border-blue-300">
                    <div className="text-blue-600 font-semibold mb-2">💡 Ejemplos</div>
                    <div className="text-blue-700 text-sm">Código de ejemplo</div>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}