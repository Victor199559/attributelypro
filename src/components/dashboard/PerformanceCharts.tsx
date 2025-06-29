// src/components/dashboard/PerformanceCharts.tsx
'use client';

import { RefreshCw, Target, TrendingUp } from 'lucide-react';
import { useStatus } from '@/contexts/StatusContext';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export function PerformanceCharts() {
  const { realAccountData, attributionData, quintupleStatus } = useStatus();

  const getPerformanceData = () => {
    if (!realAccountData) return [];

    // Platform events from attribution data
    const platformEvents = attributionData?.events?.reduce((acc, event) => {
      acc[event.platform] = (acc[event.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return [
      { 
        name: 'Meta AI', 
        events: platformEvents['meta'] || 0,
        conversions: realAccountData.meta.conversions_total,
        spend: realAccountData.meta.spend_total,
        status: realAccountData.meta.status === 'connected'
      },
      { 
        name: 'Google AI', 
        events: platformEvents['google'] || 0,
        conversions: realAccountData.google.conversions_total,
        spend: realAccountData.google.spend_total,
        status: realAccountData.google.status === 'connected_with_format_issue'
      },
      { 
        name: 'TikTok AI', 
        events: platformEvents['tiktok'] || 0,
        conversions: 0,
        spend: 0,
        status: realAccountData.tiktok.status === 'connected'
      },
      { 
        name: 'YouTube AI', 
        events: platformEvents['youtube'] || 0,
        conversions: 0,
        spend: 0,
        status: realAccountData.youtube.data_available
      },
      { 
        name: 'Micro AI', 
        events: platformEvents['micro'] || 0,
        conversions: 0,
        spend: 0,
        status: realAccountData.microBudget.optimization_active
      }
    ];
  };

  const getTimelineData = () => {
    // Generate mock timeline data based on real events
    const eventsCount = attributionData?.events_count || 0;
    const baseValue = Math.floor(eventsCount / 7);
    
    return [
      { day: 'Lun', events: baseValue + Math.floor(Math.random() * 10) },
      { day: 'Mar', events: baseValue + Math.floor(Math.random() * 10) },
      { day: 'Mié', events: baseValue + Math.floor(Math.random() * 10) },
      { day: 'Jue', events: baseValue + Math.floor(Math.random() * 10) },
      { day: 'Vie', events: baseValue + Math.floor(Math.random() * 10) },
      { day: 'Sáb', events: baseValue + Math.floor(Math.random() * 10) },
      { day: 'Dom', events: baseValue + Math.floor(Math.random() * 10) },
    ];
  };

  const performanceData = getPerformanceData();
  const timelineData = getTimelineData();

  const createTestEvent = async () => {
    try {
      const AWS_BACKEND_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
        ? 'http://3.16.108.83:8000'
        : '/api/proxy';
        
      await fetch(`${AWS_BACKEND_URL}/track/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'dashboard_demo',
          platform: 'meta',
          event_type: 'demo_event',
          campaign_id: 'dashboard_test'
        })
      });
      
      window.location.reload();
    } catch (error) {
      console.error('Error creating test event:', error);
    }
  };

  const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Attribution Events por Plataforma */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              Attribution Events por Plataforma
              {quintupleStatus?.unicorn_status === 'ACHIEVED' && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                  🦄 QUINTUPLE ACTIVE
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Eventos en tiempo real desde PostgreSQL
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
              {attributionData?.events_count || 0} eventos reales
            </span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [
                value,
                name === 'events' ? 'Attribution Events' : name
              ]}
            />
            <Bar 
              dataKey="events" 
              fill="#8b5cf6" 
              name="events"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Eventos Recientes + Timeline */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Eventos Recientes</h3>
            <p className="text-sm text-gray-500 mt-1">
              Timeline de eventos de attribution
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">PostgreSQL AWS</span>
          </div>
        </div>
        
        {attributionData && attributionData.events && attributionData.events.length > 0 ? (
          <div className="space-y-4">
            {/* Recent Events Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-600 font-medium">Usuario</th>
                    <th className="text-left py-2 text-gray-600 font-medium">Plataforma</th>
                    <th className="text-left py-2 text-gray-600 font-medium">Evento</th>
                    <th className="text-left py-2 text-gray-600 font-medium">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {attributionData.events.slice(0, 4).map((event) => (
                    <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-mono text-blue-600 text-xs">
                        {event.user_id.length > 12 ? `${event.user_id.substring(0, 12)}...` : event.user_id}
                      </td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 font-medium">
                          {event.platform}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600 text-xs">{event.event_type}</td>
                      <td className="py-3 text-gray-500 text-xs">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mini Timeline Chart */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Eventos esta semana</h4>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={timelineData}>
                  <XAxis 
                    dataKey="day" 
                    fontSize={10}
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="events" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="mx-auto text-gray-400 mb-4" size={32} />
            <p className="text-gray-500 mb-4">No hay eventos de attribution aún</p>
            <button 
              onClick={createTestEvent}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Crear Evento 
            </button>
          </div>
        )}
      </div>
    </div>
  );
}