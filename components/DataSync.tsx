'use client';

import { useEffect, useState } from 'react';
import { Activity, Database, Wifi, WifiOff } from 'lucide-react';

interface SyncStatus {
  fastapi: boolean;
  react_dashboard: boolean;
  nextjs_ai: boolean;
  last_sync: string;
}

export default function DataSync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    fastapi: false,
    react_dashboard: false,
    nextjs_ai: true, // Next.js is always available
    last_sync: ''
  });

  const checkConnections = async () => {
    try {
      // Check FastAPI
      const fastapiResponse = await fetch('https://api.attributelypro.com/health', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const fastapiHealthy = fastapiResponse.ok;

      // Check React Dashboard (try to reach it)
      let reactHealthy = false;
      try {
        const reactResponse = await fetch('http://3.16.108.83:3000/health', {
          method: 'GET',
          mode: 'no-cors' // Since it's cross-origin
        });
        reactHealthy = true; // If no error, assume it's running
      } catch {
        reactHealthy = false;
      }

      setSyncStatus({
        fastapi: fastapiHealthy,
        react_dashboard: reactHealthy,
        nextjs_ai: true,
        last_sync: new Date().toISOString()
      });

    } catch (error) {
      console.error('Connection check failed:', error);
      setSyncStatus(prev => ({
        ...prev,
        fastapi: false,
        react_dashboard: false,
        last_sync: new Date().toISOString()
      }));
    }
  };

  useEffect(() => {
    checkConnections();
    const interval = setInterval(checkConnections, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const syncData = async () => {
    try {
      const response = await fetch('/api/master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'analyze_performance' })
      });

      if (response.ok) {
        await checkConnections();
        return true;
      }
    } catch (error) {
      console.error('Sync failed:', error);
    }
    return false;
  };

  const getStatusIcon = (status: boolean) => {
    return status ? <Wifi className="h-4 w-4 text-green-400" /> : <WifiOff className="h-4 w-4 text-red-400" />;
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-900/20 border-green-700/50' : 'bg-red-900/20 border-red-700/50';
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-blue-400" />
          <h3 className="font-semibold">System Status</h3>
        </div>
        <button
          onClick={syncData}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
        >
          Sync Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* FastAPI Backend */}
        <div className={`p-3 rounded-lg border ${getStatusColor(syncStatus.fastapi)}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">FastAPI Backend</span>
            {getStatusIcon(syncStatus.fastapi)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {syncStatus.fastapi ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {/* React Dashboard */}
        <div className={`p-3 rounded-lg border ${getStatusColor(syncStatus.react_dashboard)}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">React Dashboard</span>
            {getStatusIcon(syncStatus.react_dashboard)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {syncStatus.react_dashboard ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {/* Next.js AI */}
        <div className={`p-3 rounded-lg border ${getStatusColor(syncStatus.nextjs_ai)}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Next.js AI</span>
            {getStatusIcon(syncStatus.nextjs_ai)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {syncStatus.nextjs_ai ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>

      {syncStatus.last_sync && (
        <div className="mt-3 text-xs text-gray-500">
          Last sync: {new Date(syncStatus.last_sync).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}