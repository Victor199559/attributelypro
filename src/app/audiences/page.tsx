// src/app/audiences/page.tsx
'use client';

import { useState } from 'react';
import { useStatus } from '../../contexts/StatusContext';
import { AudiencesHeader } from '../../components/audiences/AudiencesHeader'; 
import { AudiencesOverview } from '../../components/audiences/AudiencesOverview';
import { AIBuilder } from '../../components/audiences/AIBuilder';
import { InsightsTab } from '../../components/audiences/InsightsTab';
import { TemplatesTab } from '../../components/audiences/TemplatesTab';
import { ConnectionAlert } from '../../components/audiences/ConnectionAlert';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function AudiencesPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'builder' | 'insights' | 'templates'>('overview');
  const { loading } = useStatus();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header con Neural Status - Ahora con background propio */}
      <AudiencesHeader />
      
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Connection Status */}
        <ConnectionAlert />
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-100">
          <div className="flex space-x-1">
            {[
              { key: 'overview', label: 'Neural Overview', icon: '🧠' },
              { key: 'builder', label: 'IA Builder', icon: '✨' },
              { key: 'insights', label: 'Insights en Tiempo Real', icon: '📊' },
              { key: 'templates', label: 'Neural Templates', icon: '⭐' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key 
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'overview' && <AudiencesOverview />}
          {activeTab === 'builder' && <AIBuilder />}
          {activeTab === 'insights' && <InsightsTab />}
          {activeTab === 'templates' && <TemplatesTab />}
        </div>
      </div>
    </div>
  );
}