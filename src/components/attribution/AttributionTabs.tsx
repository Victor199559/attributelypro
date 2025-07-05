// src/components/attribution/AttributionTabs.tsx
'use client';

import { 
  Database, Settings, TrendingUp, Lightbulb, MessageSquare,
  Brain, MousePointer, Eye, Zap, Activity
} from 'lucide-react';

type TabId = 'memoria' | 'modelos' | 'journey' | 'insights' | 'whatsapp';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
  isNeuralFeature?: boolean;
}

interface AttributionTabsProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export function AttributionTabs({ activeTab, setActiveTab }: AttributionTabsProps) {
  
  const tabs: Tab[] = [
    {
      id: 'memoria',
      label: 'Quintuple Memory',
      icon: Database,
      description: 'Centro neural de Attribution',
      badge: 'Neural',
      isNeuralFeature: true
    },
    {
      id: 'modelos',
      label: 'Modelos',
      icon: Settings,
      description: '6 modelos de attribution',
      badge: 'Pro'
    },
    {
      id: 'journey',
      label: 'Customer Journey',
      icon: TrendingUp,
      description: 'Viaje completo del cliente',
      badge: 'Neural',
      isNeuralFeature: true
    },
    {
      id: 'insights',
      label: 'Neural Insights',
      icon: Lightbulb,
      description: 'IA predictions y recomendaciones',
      badge: 'Neural',
      isNeuralFeature: true
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Attribution',
      icon: MessageSquare,
      description: 'Attribution especial para WhatsApp',
      badge: 'Beta'
    }
  ];

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Neural': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pro': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Beta': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 mb-8">
      <div className="px-6">
        {/* Tab Header */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              Attribution Neural Engine
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Selecciona una sección para explorar diferentes aspectos de attribution
            </p>
          </div>
          
          {/* Neural Features Counter */}
          <div className="hidden md:flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              3 Neural Features Activas
            </span>
          </div>
        </div>

        {/* Tabs Navigation */}
        <nav className="flex space-x-0 overflow-x-auto scrollbar-hide" aria-label="Attribution Sections">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-3 px-6 py-4 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap group ${
                  isActive
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Tab Icon */}
                <tab.icon className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                
                {/* Tab Content */}
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <span>{tab.label}</span>
                    
                    {/* Badge */}
                    {tab.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                        isActive && tab.isNeuralFeature 
                          ? 'bg-blue-100 text-blue-700 border-blue-200'
                          : isActive
                          ? 'bg-white bg-opacity-80 text-purple-700 border-purple-200'
                          : getBadgeStyle(tab.badge)
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                    
                    {/* Neural Feature Indicator */}
                    {tab.isNeuralFeature && (
                      <div className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-blue-500 animate-pulse' : 'bg-blue-300'
                      }`} />
                    )}
                  </div>
                  
                  {/* Tab Description */}
                  <div className={`text-xs mt-1 ${
                    isActive ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}>
                    {tab.description}
                  </div>
                </div>

                {/* Active Tab Indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content Preview */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Current Tab Info */}
            {(() => {
              const currentTab = tabs.find(tab => tab.id === activeTab);
              return currentTab ? (
                <>
                  <currentTab.icon className="w-5 h-5 text-purple-600" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {currentTab.label}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {currentTab.description}
                    </p>
                  </div>
                </>
              ) : null;
            })()}
          </div>

          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>Real-time Data</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3" />
              <span>Live Attribution</span>
            </div>
            <div className="flex items-center space-x-1">
              <Brain className="w-3 h-3" />
              <span>Neural Active</span>
            </div>
          </div>
        </div>

        {/* Quick Actions for Current Tab */}
        {activeTab === 'memoria' && (
          <div className="mt-3 flex items-center space-x-2">
            <button className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
              Ver Memory Stats
            </button>
            <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
              Neural Analysis
            </button>
          </div>
        )}

        {activeTab === 'modelos' && (
          <div className="mt-3 flex items-center space-x-2">
            <button className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
              Comparar Modelos
            </button>
            <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
              Activar Neural IA
            </button>
          </div>
        )}

        {activeTab === 'journey' && (
          <div className="mt-3 flex items-center space-x-2">
            <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
              Ver Journey Map
            </button>
            <button className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
              Cross-Device Analysis
            </button>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="mt-3 flex items-center space-x-2">
            <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
              Neural Predictions
            </button>
            <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
              Optimization Tips
            </button>
          </div>
        )}

        {activeTab === 'whatsapp' && (
          <div className="mt-3 flex items-center space-x-2">
            <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
              Setup WhatsApp
            </button>
            <button className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors">
              Ver Attribution Beta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}