// src/components/reports/ReportsTabs.tsx
'use client';

import { Eye, Layers, Sparkles, Calendar, Clock } from 'lucide-react';

interface ReportsTabsProps {
  activeTab: 'overview' | 'builder' | 'templates' | 'schedule' | 'history';
  setActiveTab: (tab: 'overview' | 'builder' | 'templates' | 'schedule' | 'history') => void;
}

export function ReportsTabs({ activeTab, setActiveTab }: ReportsTabsProps) {
  const tabs = [
    { key: 'overview', label: 'Resumen', icon: Eye },
    { key: 'builder', label: 'Constructor', icon: Layers },
    { key: 'templates', label: 'Plantillas', icon: Sparkles },
    { key: 'schedule', label: 'Programación', icon: Calendar },
    { key: 'history', label: 'Historial', icon: Clock }
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