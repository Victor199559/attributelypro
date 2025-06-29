// src/app/dashboard/page.tsx
'use client';

import { useStatus } from '../../contexts/StatusContext';
import { NeuralAutomatizadorCard } from '../../components/dashboard/NeuralAutomatizadorCard';
import { KPICards } from '../../components/dashboard/KPICards';
import { PerformanceCharts } from '../../components/dashboard/PerformanceCharts';
import { ConnectionAlerts } from '../../components/dashboard/ConnectionAlerts';
import { QuintupleAIFooter } from '../../components/dashboard/QuintupleAIFooter';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function DashboardPage() {
  const { loading } = useStatus();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      {/* Connection Status Alerts */}
      <ConnectionAlerts />
      
      {/* Neural Automatizador - Feature Star */}
      <NeuralAutomatizadorCard />
      
      {/* KPI Cards */}
      <KPICards />
      
      {/* Performance Charts */}
      <PerformanceCharts />
      
      {/* Quintuple AI Status Footer */}
      <QuintupleAIFooter />
    </div>
  );
}