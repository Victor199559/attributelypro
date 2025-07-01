// src/app/reports/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ReportsHeader } from '@/components/reports/ReportsHeader';
import { ReportsTabs } from '@/components/reports/ReportsTabs';
import { ReportsOverview } from '@/components/reports/ReportsOverview';
import { ReportsTemplates } from '@/components/reports/ReportsTemplates';
import { ReportsBuilder } from '@/components/reports/ReportsBuilder';
import { ReportsSchedule } from '@/components/reports/ReportsSchedule';
import { ReportsHistory } from '@/components/reports/ReportsHistory';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Interfaces para datos reales del Master Orchestrator
interface PlatformData {
  connected: boolean;
  account_name?: string;
  account_id?: string;
  customer_id?: string;
  advertiser_count?: number;
  configured?: boolean;
}

interface MasterPlatforms {
  meta_ads?: PlatformData;
  google_ads?: PlatformData;
  tiktok_ads?: PlatformData;
  youtube_ads?: PlatformData;
  micro_budget?: PlatformData;
  [key: string]: PlatformData | undefined;
}

interface MasterDataState {
  user: { name: string; id: string } | null;
  account: { name: string; id: string; currency: string } | null;
  platforms: MasterPlatforms;
  summary?: {
    total_connected: number;
    ready_percentage: number;
    overall_status: string;
  };
  campaigns?: any[];
  isConnected: boolean;
  connectionStatus: string;
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'builder' | 'templates' | 'schedule' | 'history'>('overview');
  const [loading, setLoading] = useState(true);
  const [masterData, setMasterData] = useState<MasterDataState>({
    user: null,
    account: null,
    platforms: {},
    campaigns: [],
    isConnected: false,
    connectionStatus: 'Conectando al Master Orchestrator...'
  });

  // Conectar con Master Orchestrator Real
  useEffect(() => {
    console.log('🎯 REPORTS: Conectando con Master Orchestrator...');
    const fetchMasterData = async () => {
      try {
        setLoading(true);
        console.log('🚀 REPORTS: Haciendo fetch al Master Orchestrator...');
        
        // Conectar con Master Orchestrator (mismo endpoint que Audiences)
        const endpoints = ['/api/master'];
        let masterConnected = false;
        let masterResponse = null;

        // Intentar cada endpoint hasta que uno funcione
        for (const endpoint of endpoints) {
          try {
            console.log(`🔍 REPORTS: Probando endpoint: ${endpoint}`);
            const response = await fetch(endpoint);
            
            console.log(`📡 REPORTS: Response de ${endpoint}:`, response.status);
            
            if (response.ok) {
              const data = await response.json();
              console.log(`✅ REPORTS: Datos recibidos de ${endpoint}:`, data);
              masterResponse = data;
              masterConnected = true;
              break;
            }
          } catch (endpointError: unknown) {
            const errorMessage = endpointError instanceof Error ? endpointError.message : 'Error desconocido';
            console.log(`❌ REPORTS: Error en ${endpoint}:`, errorMessage);
            continue;
          }
        }

        if (masterConnected && masterResponse) {
          console.log('🎉 REPORTS: Master Orchestrator conectado exitosamente');
          const data = masterResponse;
          
          // Extraer información real del Master Orchestrator
          const connectedPlatforms = [];
          let accountName = 'Attributely Pro Account';
          
          // Analizar plataformas conectadas
          if (data.platforms_status?.meta?.status === "connected") {
            connectedPlatforms.push('Meta Ads');
          }
          
          if (data.platforms_status?.google?.status === "connected" || data.platforms_status?.google?.status === "connected_with_format_issue") {
            connectedPlatforms.push('Google Ads');
          }
          
          if (data.platforms_status?.tiktok?.status === "connected") {
            connectedPlatforms.push('TikTok Ads');
          }
          
          if (data.platforms_status?.youtube?.status === "connected") {
            connectedPlatforms.push('YouTube Ads');
          }

          // Validar estructura de platforms
          const safePlatforms: MasterPlatforms = {};
          if (data.platforms_status && typeof data.platforms_status === 'object') {
            Object.keys(data.platforms_status).forEach(key => {
              const platformData = (data.platforms_status as any)[key];
              if (platformData && typeof platformData === 'object') {
                safePlatforms[key] = {
                  connected: Boolean(platformData.status === "connected" || platformData.status === "connected_with_format_issue"),
                  account_name: platformData.account_name || null,
                  account_id: platformData.account_id || null,
                  customer_id: platformData.customer_id || null,
                  advertiser_count: platformData.advertiser_count || null,
                  configured: platformData.configured || null
                };
              }
            });
          }

          setMasterData({
            user: { 
              name: 'Master User Real', 
              id: 'master_user_real' 
            },
            account: { 
              name: accountName,
              id: 'master_account_real', 
              currency: 'USD' 
            },
            platforms: safePlatforms,
            summary: {
              total_connected: connectedPlatforms.length,
              ready_percentage: Number(data.quintuple_ai?.quintuple_ai_analysis?.overall_completion) || 0,
              overall_status: data.status || 'unknown'
            },
            campaigns: [],
            isConnected: true,
            connectionStatus: `✅ Conectado al Master: ${connectedPlatforms.length} plataforma(s) - ${Number(data.overall_completion || 0).toFixed(1)}% completado`
          });
          
          console.log('🎉 REPORTS: Master Orchestrator conectado exitosamente');
          console.log('📊 REPORTS: Plataformas conectadas:', connectedPlatforms);
          
        } else {
          console.log('❌ REPORTS: Ningún endpoint del Master Orchestrator respondió');
          setMasterData({
            user: { name: 'Demo User', id: 'demo' },
            account: { name: 'Demo Account', id: 'demo', currency: 'USD' },
            platforms: {
              meta_ads: { connected: false },
              google_ads: { connected: false },
              tiktok_ads: { connected: false },
              youtube_ads: { connected: false }
            },
            summary: {
              total_connected: 0,
              ready_percentage: 0,
              overall_status: 'offline'
            },
            campaigns: [],
            isConnected: false,
            connectionStatus: '❌ Master Orchestrator no disponible - Usando datos demo'
          });
        }
      } catch (error) {
        console.error('🚨 REPORTS: ERROR al conectar Master Orchestrator:', error);
        setMasterData({
          user: { name: 'Demo User', id: 'demo' },
          account: { name: 'Demo Account', id: 'demo', currency: 'USD' },
          platforms: {
            meta_ads: { connected: false },
            google_ads: { connected: false },
            tiktok_ads: { connected: false },
            youtube_ads: { connected: false }
          },
          summary: {
            total_connected: 0,
            ready_percentage: 0,
            overall_status: 'error'
          },
          campaigns: [],
          isConnected: false,
          connectionStatus: '❌ Error de conexión - Usando datos demo'
        });
      } finally {
        console.log('🏁 REPORTS: Terminando fetch Master Orchestrator');
        setLoading(false);
      }
    };

    fetchMasterData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Conectando con Master Orchestrator" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header con información del Master Orchestrator */}
      <ReportsHeader masterData={masterData} />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation Tabs */}
        <ReportsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'overview' && (
            <ReportsOverview masterData={masterData} />
          )}

          {activeTab === 'templates' && (
            <ReportsTemplates masterData={masterData} />
          )}

          {activeTab === 'builder' && (
            <ReportsBuilder masterData={masterData} />
          )}

          {activeTab === 'schedule' && (
            <ReportsSchedule masterData={masterData} />
          )}

          {activeTab === 'history' && (
            <ReportsHistory masterData={masterData} />
          )}
        </div>
      </div>

      {/* Debug info temporal - Master Orchestrator Status */}
      <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-3 text-sm max-w-sm shadow-lg">
        <div className={`font-semibold mb-1 ${masterData.isConnected ? 'text-green-900' : 'text-red-900'}`}>
          {masterData.isConnected ? '🎯 Master Orchestrator Online' : '❌ Master Orchestrator Offline'}
        </div>
        <div className={masterData.isConnected ? 'text-green-700' : 'text-red-700'}>
          <div>Endpoint: /api/master</div>
          <div>Cuenta: {masterData.account?.name || 'N/A'}</div>
          <div>Plataformas: {masterData.summary?.total_connected || 0}/5</div>
          <div>Completado: {masterData.summary?.ready_percentage?.toFixed(1) || '0'}%</div>
          <div>Estado: {masterData.summary?.overall_status || 'unknown'}</div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {masterData.connectionStatus}
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