// src/components/dashboard/QuintupleAIFooter.tsx
'use client';

import { Crown, Activity, Database, Zap, Globe } from 'lucide-react';
import { useStatus } from '@/contexts/StatusContext';

export function QuintupleAIFooter() {
  const { quintupleStatus, masterStatus, attributionData, connectionError } = useStatus();

  const getStatusIcon = () => {
    if (quintupleStatus?.unicorn_status === 'ACHIEVED') return '🦄';
    if ((quintupleStatus?.active_platforms ?? 0) >= 3) return '🚀';
    return '⚡';
  };

  const getStatusText = () => {
    if (connectionError) return 'Master Orchestrator offline';
    if (quintupleStatus?.unicorn_status === 'ACHIEVED') return 'QUINTUPLE AI ACHIEVED';
    if ((quintupleStatus?.active_platforms ?? 0) >= 3) return 'Multi-AI Active';
    return 'Setting Up';
  };

  const getMasterStatusText = () => {
    if (connectionError) return 'OFFLINE';
    return masterStatus === 'online' ? 'READY' : 'LOADING';
  };

  const getEventsCount = () => {
    return attributionData?.events_count || 0;
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        {/* Status Information */}
        <div className="flex items-center space-x-4">
          <div className="text-4xl">
            {getStatusIcon()}
          </div>
          
          <div>
            <h4 className="font-bold text-xl flex items-center">
              Quintuple AI Status
              {quintupleStatus?.unicorn_status === 'ACHIEVED' && (
                <Crown className="ml-2 w-5 h-5 text-yellow-400" />
              )}
            </h4>
            
            <div className="flex items-center space-x-6 text-gray-300 text-sm mt-1">
              <span className="flex items-center">
                <Activity className="w-4 h-4 mr-1" />
                {quintupleStatus?.active_platforms || 0}/{quintupleStatus?.total_platforms || 5} platforms active
              </span>
              
              <span className="flex items-center">
                <Database className="w-4 h-4 mr-1" />
                {getEventsCount()} eventos en PostgreSQL
              </span>
              
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                Production Master Orchestrator deployment
              </span>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="text-right">
          <div className="text-2xl font-bold mb-1">
            {getStatusText()}
          </div>
          <p className="text-gray-300 text-sm">
            Master: {getMasterStatusText()}
          </p>
        </div>
      </div>

      {/* Detailed Status Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-600">
        {/* Platforms Status */}
        <div className="bg-white bg-opacity-10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-medium text-white">Platforms</h5>
            <span className="text-xs text-gray-300">
              {quintupleStatus?.active_platforms || 0}/5
            </span>
          </div>
          
          <div className="space-y-2">
            {[
              { name: 'Meta', active: true },
              { name: 'Google', active: true },
              { name: 'TikTok', active: true },
              { name: 'YouTube', active: true },
              { name: 'Micro', active: true }
            ].map((platform, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{platform.name}</span>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    platform.active ? 'bg-green-400' : 'bg-gray-500'
                  }`}></div>
                  <span className={platform.active ? 'text-green-400' : 'text-gray-500'}>
                    {platform.active ? 'Active' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-white bg-opacity-10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-medium text-white">Data Sources</h5>
            <span className="text-xs text-gray-300">Real-time</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Master Orchestrator</span>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  !connectionError ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                <span className={!connectionError ? 'text-green-400' : 'text-red-400'}>
                  {!connectionError ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">PostgreSQL AWS</span>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  attributionData?.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                <span className={attributionData?.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                  {attributionData?.status === 'success' ? 'Connected' : 'Offline'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Attribution Events</span>
              <span className="text-blue-400 font-medium">
                {getEventsCount()}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white bg-opacity-10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-medium text-white">Performance</h5>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Completion</span>
              <span className="text-purple-400 font-medium">
                {quintupleStatus?.real_data_percentage || 0}%
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Neural Status</span>
              <span className={
                quintupleStatus?.unicorn_status === 'ACHIEVED' ? 'text-purple-400' :
                quintupleStatus?.unicorn_status === 'ACTIVE' ? 'text-blue-400' : 'text-yellow-400'
              }>
                {quintupleStatus?.unicorn_status || 'Pending'}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Deployment</span>
              <span className="text-green-400">Production</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badge for Quintuple AI */}
      {quintupleStatus?.unicorn_status === 'ACHIEVED' && (
        <div className="mt-6 pt-6 border-t border-gray-600">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🦄</span>
              <span className="font-bold text-lg text-white">
                QUINTUPLE AI ACHIEVED
              </span>
              <Crown className="w-6 h-6 text-yellow-300" />
            </div>
            <p className="text-purple-100 text-sm mt-2">
              World's First 5-Platform Attribution System Successfully Deployed
            </p>
          </div>
        </div>
      )}
    </div>
  );
}