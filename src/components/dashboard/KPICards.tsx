// src/components/dashboard/KPICards.tsx
'use client';

import { Target, Brain, Activity, Users, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { useStatus } from '@/contexts/StatusContext';

export function KPICards() {
  const { attributionData, quintupleStatus, masterStatus, realAccountData } = useStatus();

  const getKPIData = () => {
    if (!realAccountData) {
      return {
        attributionEvents: 0,
        quintupleAI: '0/5',
        masterStatus: 'OFFLINE',
        postgresqlStatus: 'OFFLINE'
      };
    }

    const totalSpend = realAccountData.meta.spend_total + realAccountData.google.spend_total + realAccountData.tiktok.spend_total;
    const totalConversions = realAccountData.meta.conversions_total + realAccountData.google.conversions_total + realAccountData.tiktok.conversions_total;

    return {
      attributionEvents: attributionData?.events_count || 0,
      quintupleAI: `${quintupleStatus?.active_platforms || 0}/5`,
      masterStatus: masterStatus === 'online' ? 'ONLINE' : 'OFFLINE',
      postgresqlStatus: attributionData?.status === 'success' ? 'CONNECTED' : 'OFFLINE'
    };
  };

  const kpiData = getKPIData();

  const cards = [
    {
      title: 'Attribution Events',
      value: kpiData.attributionEvents.toLocaleString(),
      description: attributionData?.database || 'PostgreSQL AWS',
      icon: Target,
      color: 'green',
      trend: '+12%',
      isUp: true
    },
    {
      title: 'Quintuple AI',
      value: kpiData.quintupleAI,
      description: quintupleStatus?.unicorn_status || 'Loading',
      icon: Brain,
      color: 'blue',
      trend: `${quintupleStatus?.real_data_percentage || 0}%`,
      isUp: true
    },
    {
      title: 'Master Status',
      value: kpiData.masterStatus,
      description: '/api/master',
      icon: Activity,
      color: masterStatus === 'online' ? 'purple' : 'red',
      trend: masterStatus === 'online' ? 'Online' : 'Offline',
      isUp: masterStatus === 'online'
    },
    {
      title: 'PostgreSQL',
      value: kpiData.postgresqlStatus,
      description: attributionData?.database || 'Database',
      icon: Users,
      color: attributionData?.status === 'success' ? 'pink' : 'red',
      trend: attributionData?.status === 'success' ? 'Connected' : 'Offline',
      isUp: attributionData?.status === 'success'
    }
  ];

  const getColorStyles = (color: string) => {
    const styles = {
      green: {
        border: 'border-green-500',
        bg: 'bg-green-100',
        icon: 'text-green-600',
        trend: 'text-green-600'
      },
      blue: {
        border: 'border-blue-500',
        bg: 'bg-blue-100',
        icon: 'text-blue-600',
        trend: 'text-blue-600'
      },
      purple: {
        border: 'border-purple-500',
        bg: 'bg-purple-100',
        icon: 'text-purple-600',
        trend: 'text-purple-600'
      },
      pink: {
        border: 'border-pink-500',
        bg: 'bg-pink-100',
        icon: 'text-pink-600',
        trend: 'text-pink-600'
      },
      red: {
        border: 'border-red-500',
        bg: 'bg-red-100',
        icon: 'text-red-600',
        trend: 'text-red-600'
      }
    };
    return styles[color as keyof typeof styles] || styles.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const colorStyles = getColorStyles(card.color);
        
        return (
          <div 
            key={index}
            className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${colorStyles.border} hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {card.value}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 flex items-center">
                    <div className={`w-1 h-1 rounded-full mr-2 ${
                      card.isUp ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    {card.description}
                  </div>
                  
                  <div className={`text-xs font-medium flex items-center ${colorStyles.trend}`}>
                    {card.isUp ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {card.trend}
                  </div>
                </div>
              </div>
              
              <div className={`w-12 h-12 ${colorStyles.bg} rounded-lg flex items-center justify-center ml-4`}>
                <Icon className={`w-6 h-6 ${colorStyles.icon}`} />
              </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Estado</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    card.isUp ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}></div>
                  <span className={`font-medium ${
                    card.isUp ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.isUp ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}