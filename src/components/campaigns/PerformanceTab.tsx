// src/components/campaigns/PerformanceTab.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, Activity, BarChart3, Target, CheckCircle,
  RefreshCw, Calendar, Filter, Download
} from 'lucide-react';
import { useStatus } from '../../contexts/StatusContext';

const COLORS = ['#8B5CF6', '#06D6A0', '#FFD166', '#F72585', '#4CC9F0'];

export function PerformanceTab() {
  const { masterData, connectionError } = useStatus();
  const [timeRange, setTimeRange] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);

  // Datos de performance en tiempo real (inicialmente en 0)
  const performanceData = [
    { day: 'Lun', impressions: 0, clicks: 0, conversions: 0, spent: 0 },
    { day: 'Mar', impressions: 0, clicks: 0, conversions: 0, spent: 0 },
    { day: 'Mié', impressions: 0, clicks: 0, conversions: 0, spent: 0 },
    { day: 'Jue', impressions: 0, clicks: 0, conversions: 0, spent: 0 },
    { day: 'Vie', impressions: 0, clicks: 0, conversions: 0, spent: 0 },
    { day: 'Sáb', impressions: 0, clicks: 0, conversions: 0, spent: 0 },
    { day: 'Dom', impressions: 0, clicks: 0, conversions: 0, spent: 0 }
  ];

  // Datos por plataforma (basados en Master Orchestrator)
  const generatePlatformData = () => {
    if (!masterData?.platforms) return [];
    
    const platformData = [];
    
    if (masterData.platforms.meta_ads?.connected) {
      platformData.push({
        platform: 'Meta Ads',
        campaigns: masterData.platforms.meta_ads.total_campaigns || 0,
        spent: 0,
        conversions: 0,
        roas: 0,
        color: '#1877F2'
      });
    }
    
    if (masterData.platforms.google_ads?.connected) {
      platformData.push({
        platform: 'Google Ads',
        campaigns: 0, // Estado inicial
        spent: 0,
        conversions: 0,
        roas: 0,
        color: '#34A853'
      });
    }
    
    if (masterData.platforms.tiktok_ads?.connected) {
      platformData.push({
        platform: 'TikTok Ads',
        campaigns: 0, // Estado inicial
        spent: 0,
        conversions: 0,
        roas: 0,
        color: '#000000'
      });
    }

    return platformData;
  };

  const platformData = generatePlatformData();

  // Datos de conversión por hora (para mostrar el potencial)
  const hourlyData = [
    { hour: '00:00', conversions: 0, potential: 12 },
    { hour: '04:00', conversions: 0, potential: 8 },
    { hour: '08:00', conversions: 0, potential: 25 },
    { hour: '12:00', conversions: 0, potential: 35 },
    { hour: '16:00', conversions: 0, potential: 42 },
    { hour: '20:00', conversions: 0, potential: 38 },
    { hour: '24:00', conversions: 0, potential: 15 }
  ];

  // Métricas de rendimiento
  const performanceMetrics = [
    {
      name: 'Impresiones Totales',
      value: '0',
      change: '+0%',
      trend: 'neutral',
      description: 'Esperando campañas activas'
    },
    {
      name: 'CTR Promedio',
      value: '0%',
      change: '+0%',
      trend: 'neutral',
      description: 'Click-through rate'
    },
    {
      name: 'CPC Promedio',
      value: '$0.00',
      change: '+0%',
      trend: 'neutral',
      description: 'Costo por click'
    },
    {
      name: 'CPA Promedio',
      value: '$0.00',
      change: '+0%',
      trend: 'neutral',
      description: 'Costo por adquisición'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simular refresh de datos reales
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Performance en Tiempo Real</h2>
          <div className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            {connectionError ? 'Master Offline' : 'Datos Reales'}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="1d">Último día</option>
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
          </select>
          
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Actualizando...' : 'Actualizar'}
          </button>
          
          <button className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Métricas de rendimiento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
              <Activity className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
              <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                {metric.change}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de performance diaria */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Diaria</h3>
            <div className="text-sm text-gray-500">
              {connectionError ? 'Master Offline' : 'Estado inicial - Esperando datos'}
            </div>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    `${value}${name === 'spent' ? '$' : ''}`, 
                    name === 'spent' ? 'Gastado' : 
                    name === 'impressions' ? 'Impresiones' :
                    name === 'clicks' ? 'Clicks' : 'Conversiones'
                  ]} 
                />
                <Legend />
                <Line type="monotone" dataKey="impressions" stroke="#8B5CF6" strokeWidth={2} name="Impresiones" />
                <Line type="monotone" dataKey="clicks" stroke="#06D6A0" strokeWidth={2} name="Clicks" />
                <Line type="monotone" dataKey="conversions" stroke="#F72585" strokeWidth={2} name="Conversiones" />
                <Line type="monotone" dataKey="spent" stroke="#FFD166" strokeWidth={2} name="Gastado ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance por plataforma */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance por Plataforma</h3>
            <div className="text-sm text-green-600">
              {platformData.length} plataforma(s) conectada(s)
            </div>
          </div>
          
          {platformData.length > 0 ? (
            <div className="space-y-4">
              {platformData.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{platform.platform}</h4>
                      <p className="text-sm text-gray-500">{platform.campaigns} campañas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${platform.spent}</div>
                    <div className="text-sm text-gray-500">{platform.conversions} conv.</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Sin plataformas conectadas</h4>
              <p className="text-sm text-gray-500">Conecta plataformas para ver performance</p>
            </div>
          )}
        </div>

        {/* Conversiones por hora */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Conversiones por Hora</h3>
            <div className="text-sm text-purple-600">Potencial vs Real</div>
          </div>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversions" fill="#8B5CF6" name="Conversiones Reales" />
                <Bar dataKey="potential" fill="#E5E7EB" name="Potencial Estimado" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Métricas adicionales */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas Clave</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Frequency</span>
              <span className="font-medium text-gray-900">0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Reach</span>
              <span className="font-medium text-gray-900">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Video View Rate</span>
              <span className="font-medium text-gray-900">0%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Engagement Rate</span>
              <span className="font-medium text-gray-900">0%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Quality Score</span>
              <span className="font-medium text-gray-900">N/A</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <h4 className="font-medium text-blue-900">Estado Inicial</h4>
                <p className="text-sm text-blue-700">Las métricas se poblarán automáticamente cuando las campañas estén activas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}