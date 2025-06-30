// src/components/campaigns/CampaignsOverview.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Megaphone, Target, DollarSign, TrendingUp, CheckCircle, 
  Settings, ExternalLink, Facebook, Search, MousePointer,
  Play, AlertCircle, Clock, Plus
} from 'lucide-react';
import { useStatus } from '../../contexts/StatusContext';

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
  source: 'real';
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

export function CampaignsOverview() {
  const { masterData, connectionError } = useStatus();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Generar campañas REALES basadas en Master Orchestrator
  useEffect(() => {
    if (!masterData || connectionError) {
      setCampaigns([]);
      return;
    }

    const realCampaigns: Campaign[] = [];
    
    // Meta Ads - Campaña real en estado inicial
    if (masterData.platforms?.meta_ads?.connected) {
      realCampaigns.push({
        id: `meta_real_${masterData.platforms.meta_ads.account_id || 'connected'}`,
        name: `${masterData.platforms.meta_ads.account_name || 'Meta Ads Account'} - Setup Required`,
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
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        objective: 'Ready to launch - Configure first campaign',
        source: 'real'
      });
    }
    
    // Google Ads - Campaña real en estado inicial
    if (masterData.platforms?.google_ads?.connected) {
      realCampaigns.push({
        id: `google_real_${masterData.platforms.google_ads.customer_id || 'connected'}`,
        name: `Google Ads Customer ${masterData.platforms.google_ads.customer_id || 'Connected'} - Setup Required`,
        status: 'draft',
        platform: 'google',
        budget: 0,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        cpa: 0,
        roas: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        objective: 'Ready to launch - Configure first campaign',
        source: 'real'
      });
    }
    
    // TikTok Ads - Campaña real en estado inicial
    if (masterData.platforms?.tiktok_ads?.connected) {
      realCampaigns.push({
        id: `tiktok_real_connected`,
        name: `TikTok Ads Connected - Setup Required`,
        status: 'draft',
        platform: 'tiktok',
        budget: 0,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        cpa: 0,
        roas: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        objective: 'Ready to launch - Configure first campaign',
        source: 'real'
      });
    }

    setCampaigns(realCampaigns);
  }, [masterData, connectionError]);

  // Métricas calculadas basadas en datos reales
  const campaignMetrics: CampaignMetrics = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    avgRoas: campaigns.length > 0 && campaigns.some(c => c.roas > 0)
      ? parseFloat((campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length).toFixed(1))
      : 0,
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    avgCtr: campaigns.length > 0 && campaigns.some(c => c.ctr > 0)
      ? parseFloat((campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length).toFixed(1))
      : 0
  };

  const getPlatformIcon = (platform: Campaign['platform']) => {
    switch (platform) {
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />;
      case 'google': return <Search className="w-4 h-4 text-red-600" />;
      case 'tiktok': return <MousePointer className="w-4 h-4 text-black" />;
      case 'youtube': return <Play className="w-4 h-4 text-red-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      {masterData && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <h4 className="font-semibold text-green-900">✅ Master Orchestrator Conectado - Datos Reales</h4>
                <p className="text-sm text-green-700">
                  {Object.values(masterData.platforms || {}).filter((p: any) => p?.connected).length} plataforma(s) real(es) conectada(s)
                  • Quintuple AI: {masterData.platforms?.quintuple_ai?.completion_percentage || 0}% completo
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-700">Sistema {masterData.summary?.ready_percentage || 0}% Listo</div>
              <div className="text-xs text-green-600 mt-1">Estado inicial: Campañas en 0 (configuración pendiente)</div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Campañas</p>
              <p className="text-2xl font-bold text-gray-900">{campaignMetrics.totalCampaigns}</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1 inline-block"></span>
                {campaignMetrics.activeCampaigns} activas • {campaigns.filter(c => c.status === 'draft').length} draft
                <span className="ml-2 text-xs bg-green-100 px-2 py-0.5 rounded text-green-700">Real</span>
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
                <span className="ml-2 text-xs text-blue-600">(Estado inicial)</span>
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
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {campaignMetrics.avgCtr}% CTR • Esperando campañas activas
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
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Real Campaigns List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            Campañas Reales - Master Orchestrator
          </h3>
          <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <CheckCircle className="w-4 h-4 mr-1" />
            {campaigns.length} campaña(s) real(es) en draft
          </div>
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
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1 inline-block"></span>
                    Datos reales - Estado inicial (configuración pendiente)
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
                  <div className="font-bold text-gray-400">{campaign.roas > 0 ? `${campaign.roas}x` : 'N/A'}</div>
                  <div className="text-gray-500">ROAS</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg transition-colors bg-blue-100 text-blue-600 hover:bg-blue-200" title="Configurar campaña">
                    <Settings className="w-4 h-4" />
                  </button>
                  <Link href={`/campaigns/${campaign.id}`} className="flex items-center px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Configurar
                  </Link>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay campañas configuradas</h3>
              <p className="text-gray-600 mb-4">
                {connectionError 
                  ? 'Conecta el Master Orchestrator para ver campañas reales'
                  : 'Las plataformas están conectadas. Configura tu primera campaña para comenzar.'
                }
              </p>
              {!connectionError && (
                <Link href="/neural-automatizador" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Primera Campaña
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}