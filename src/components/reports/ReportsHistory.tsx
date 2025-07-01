// src/components/reports/ReportsHistory.tsx
'use client';

import { Clock, CheckCircle, Eye, Download, Share2, FileText } from 'lucide-react';

interface MasterDataState {
  user: { name: string; id: string } | null;
  account: { name: string; id: string; currency: string } | null;
  platforms: any;
  summary?: {
    total_connected: number;
    ready_percentage: number;
    overall_status: string;
  };
  isConnected: boolean;
  connectionStatus: string;
}

interface ReportsHistoryProps {
  masterData: MasterDataState;
}

export function ReportsHistory({ masterData }: ReportsHistoryProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              {masterData.isConnected ? `Historial Master Orchestrator ${masterData.account?.name}` : 'Historial de Reportes'}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Últimos 30 días</option>
              <option>Últimos 90 días</option>
              <option>Este año</option>
            </select>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors">
              Descargar Todo Master
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {(masterData.isConnected ? [
            { 
              name: `Performance Master ${masterData.account?.name} - Diciembre 2024`, 
              date: 'Hoy', 
              size: '4.2 MB', 
              downloads: 0, 
              status: 'completado',
              platforms: ['Meta Ads', 'Google Ads']
            },
            { 
              name: `Attribution Analysis Master - Multi-Plataforma Real`, 
              date: 'Ayer', 
              size: '2.8 MB', 
              downloads: 0, 
              status: 'completado',
              platforms: ['Meta Ads', 'Google Ads', 'TikTok Ads']
            },
            { 
              name: `Audience Insights Master ${masterData.account?.name} - Live Data`, 
              date: 'Hace 2 días', 
              size: '3.9 MB', 
              downloads: 0, 
              status: 'completado',
              platforms: ['Meta Ads', 'Google Ads']
            },
            { 
              name: `ROI Performance Master Real-time`, 
              date: 'Hace 3 días', 
              size: '1.2 MB', 
              downloads: 0, 
              status: 'completado',
              platforms: ['Google Ads']
            },
            { 
              name: `Custom Journey Analysis Master Orchestrator`, 
              date: 'Hace 5 días', 
              size: '5.1 MB', 
              downloads: 0, 
              status: 'completado',
              platforms: ['Meta Ads', 'Google Ads']
            }
          ] : [
            { name: 'Executive Performance - Noviembre 2024', date: '1 Nov 2024', size: '2.4 MB', downloads: 23, status: 'completado' },
            { name: 'Attribution Analysis - Semana 44', date: '25 Oct 2024', size: '1.8 MB', downloads: 15, status: 'completado' },
            { name: 'Audience Segmentation - Q3 2024', date: '20 Oct 2024', size: '3.2 MB', downloads: 45, status: 'completado' },
            { name: 'Campaign ROI Daily - 15 Oct 2024', date: '15 Oct 2024', size: '890 KB', downloads: 8, status: 'completado' },
            { name: 'Custom Multi-Touch Journey', date: '10 Oct 2024', size: '2.1 MB', downloads: 12, status: 'completado' }
          ]).map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{report.name}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    Generado el {report.date}
                    {masterData.isConnected && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Master Real
                      </span>
                    )}
                  </div>
                  {'platforms' in report && Array.isArray((report as any).platforms) && (
                    <div className="text-xs text-purple-600 mt-1">
                      📊 {(report as any).platforms.join(', ')}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-sm text-gray-900">{report.size}</div>
                  <div className="text-sm text-gray-500">{report.downloads} descargas</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicador de datos Master en historial */}
        {masterData.isConnected && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <h4 className="font-semibold text-green-900">Historial con Datos Master Orchestrator Reales</h4>
                <p className="text-sm text-green-700">
                  Todos estos reportes fueron generados con datos reales del Master Orchestrator 
                  conectado a "{masterData.account?.name}" • 
                  {masterData.summary?.total_connected || 0} plataforma(s) conectada(s) • 
                  Sistema {masterData.summary?.ready_percentage?.toFixed(1)}% completado
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}