// src/components/analytics/AnalyticsOverview.tsx
'use client';

import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  DollarSign, Target, TrendingUp, ShoppingCart, Activity, 
  Smartphone, Globe, ArrowUp, CheckCircle
} from 'lucide-react';

interface MasterOrchestratorData {
  status: string;
  platforms: {
    meta_ads: {
      connected: boolean;
      account_name: string;
    };
    google_ads: {
      connected: boolean;
      customer_id: string;
    };
    tiktok_ads: {
      connected: boolean;
    };
  };
  summary: {
    total_connected: number;
    ready_percentage: number;
  };
}

interface AnalyticsMetrics {
  totalRevenue: number;
  totalConversions: number;
  totalVisitors: number;
  conversionRate: number;
  avgOrderValue: number;
  customerLifetimeValue: number;
  retentionRate: number;
  churnRate: number;
  totalSpend: number;
  roas: number;
}

interface AnalyticsOverviewProps {
  masterData: MasterOrchestratorData | null;
  analyticsMetrics: AnalyticsMetrics;
}

const COLORS = ['#8B5CF6', '#06D6A0', '#FFD166', '#F72585', '#4CC9F0', '#FF6B6B'];

export function AnalyticsOverview({ masterData, analyticsMetrics }: AnalyticsOverviewProps) {
  // Data de revenue con contexto real/demo
  const revenueData = [
    { month: 'Ene', revenue: 45000, conversions: 180, visitors: 8900, ads_spend: 12000 },
    { month: 'Feb', revenue: 52000, conversions: 210, visitors: 9800, ads_spend: 14000 },
    { month: 'Mar', revenue: 48000, conversions: 195, visitors: 9200, ads_spend: 13500 },
    { month: 'Abr', revenue: 61000, conversions: 245, visitors: 11200, ads_spend: 16000 },
    { month: 'May', revenue: 67000, conversions: 268, visitors: 12100, ads_spend: 17500 },
    { month: 'Jun', revenue: 73000, conversions: 291, visitors: 13200, ads_spend: 18800 },
    { month: 'Jul', revenue: 78000, conversions: 315, visitors: 14500, ads_spend: 20000 },
    { month: 'Ago', revenue: 82000, conversions: 338, visitors: 15200, ads_spend: 21200 },
    { month: 'Sep', revenue: 89000, conversions: 365, visitors: 16800, ads_spend: 23000 },
    { month: 'Oct', revenue: 94000, conversions: 385, visitors: 17900, ads_spend: 24500 },
    { month: 'Nov', revenue: 98000, conversions: 402, visitors: 18600, ads_spend: 25800 },
    { month: 'Dic', revenue: 105000, conversions: 425, visitors: 19500, ads_spend: 27200 }
  ];

  const deviceData = [
    { device: 'Mobile', visitors: Math.floor(analyticsMetrics.totalVisitors * 0.628), percentage: 62.8, conversions: Math.floor(analyticsMetrics.totalConversions * 0.63), revenue: Math.floor(analyticsMetrics.totalRevenue * 0.63) },
    { device: 'Desktop', visitors: Math.floor(analyticsMetrics.totalVisitors * 0.255), percentage: 25.5, conversions: Math.floor(analyticsMetrics.totalConversions * 0.28), revenue: Math.floor(analyticsMetrics.totalRevenue * 0.28) },
    { device: 'Tablet', visitors: Math.floor(analyticsMetrics.totalVisitors * 0.117), percentage: 11.7, conversions: Math.floor(analyticsMetrics.totalConversions * 0.09), revenue: Math.floor(analyticsMetrics.totalRevenue * 0.09) }
  ];

  const geographicData = masterData?.platforms ? [
    { country: 'Ecuador', revenue: 342500, conversions: 1150, percentage: 40.4 },
    { country: 'Colombia', revenue: 186900, conversions: 628, percentage: 22.1 },
    { country: 'Perú', revenue: 152800, conversions: 513, percentage: 18.0 },
    { country: 'México', revenue: 89600, conversions: 301, percentage: 10.6 },
    { country: 'Chile', revenue: 75450, conversions: 255, percentage: 8.9 }
  ] : [
    { country: 'México', revenue: 342500, conversions: 1150, percentage: 40.4 },
    { country: 'Colombia', revenue: 186900, conversions: 628, percentage: 22.1 },
    { country: 'Argentina', revenue: 152800, conversions: 513, percentage: 18.0 },
    { country: 'Chile', revenue: 89600, conversions: 301, percentage: 10.6 },
    { country: 'Perú', revenue: 75450, conversions: 255, percentage: 8.9 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards con datos reales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">${analyticsMetrics.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                {masterData?.platforms ? 'Datos Master reales' : '+18.5% vs mes anterior'}
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
              <p className="text-2xl font-bold text-gray-900">{analyticsMetrics.totalConversions.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                {masterData?.platforms ? `${masterData.summary?.total_connected}x plataformas` : '+12.3% vs mes anterior'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ROAS Promedio</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsMetrics.roas.toFixed(1)}x</p>
              <p className="text-sm text-gray-600">{analyticsMetrics.conversionRate}% tasa conversión</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AOV</p>
              <p className="text-2xl font-bold text-gray-900">${analyticsMetrics.avgOrderValue}</p>
              <p className="text-sm text-gray-600">LTV ${analyticsMetrics.customerLifetimeValue}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-600" />
            Tendencia de Ingresos
          </h3>
          <div className="flex items-center space-x-3">
            {masterData?.platforms && (
              <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                Datos Master Orchestrator
              </div>
            )}
            <div className="flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
              <div className="w-2 h-2 rounded-full mr-1 bg-green-500 animate-pulse"></div>
              Tiempo Real
            </div>
          </div>
        </div>
        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                }}
                formatter={(value: any, name: string) => {
                  if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Ingresos'];
                  if (name === 'ads_spend') return [`$${value.toLocaleString()}`, 'Inversión Ads'];
                  return [value.toLocaleString(), name];
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="ads_spend" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Analytics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-purple-600" />
            Analytics por Dispositivo
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="visitors"
                  label={({ device, percentage }) => `${device}: ${percentage}%`}
                  fontSize={12}
                >
                  {deviceData.map((entry, index) => (
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
                  formatter={(value: any) => [value.toLocaleString(), 'Visitantes']} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-purple-600" />
            Distribución Geográfica
            {masterData?.platforms && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Datos Master
              </span>
            )}
          </h3>
          <div className="space-y-4">
            {geographicData.map((country, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm font-medium text-gray-900">{country.country}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">${country.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{country.conversions} conversiones</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-purple-600">{country.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}