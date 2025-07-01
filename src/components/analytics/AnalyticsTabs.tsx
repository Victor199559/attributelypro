// src/components/analytics/AnalyticsTabs.tsx
'use client';

import { BarChart3, Target, Globe, TrendingUp, Brain } from 'lucide-react';

interface AnalyticsTabsProps {
  activeTab: 'overview' | 'attribution' | 'channels' | 'conversions' | 'insights';
  setActiveTab: (tab: 'overview' | 'attribution' | 'channels' | 'conversions' | 'insights') => void;
}

export function AnalyticsTabs({ activeTab, setActiveTab }: AnalyticsTabsProps) {
  const tabs = [
    { key: 'overview', label: 'Resumen', icon: BarChart3 },
    { key: 'attribution', label: 'Attribution', icon: Target },
    { key: 'channels', label: 'Canales', icon: Globe },
    { key: 'conversions', label: 'Conversiones', icon: TrendingUp },
    { key: 'insights', label: 'Insights IA', icon: Brain }
  ] as const;

  return (
    <div className="bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-100">
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}