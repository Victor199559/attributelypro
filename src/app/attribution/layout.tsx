// src/app/attribution/layout.tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Brain, Users, Target, BarChart3, TrendingUp, PieChart, 
  Sparkles, Zap, Shield, Calculator, MessageSquare,
  Activity, Star, FileText, Eye, Bot, Smartphone, 
  Network, UserCheck, Building, Settings, Crown
} from 'lucide-react';
import { StatusProvider } from '../../contexts/StatusContext';

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  isActive?: boolean;
}

function SidebarItem({ icon: Icon, label, href, badge, badgeColor, isActive }: SidebarItemProps) {
  const getBadgeStyle = (badge?: string, color?: string) => {
    if (color) {
      const colors: Record<string, string> = {
        'Neural': 'bg-blue-100 text-blue-700',
        'Real': 'bg-green-100 text-green-700', 
        'Live': 'bg-purple-100 text-purple-700',
        'AUTO': 'bg-orange-100 text-orange-700',
        'Pro': 'bg-red-100 text-red-700',
        'Beta': 'bg-yellow-100 text-yellow-700',
        'Bot': 'bg-teal-100 text-teal-700',
        'Privacy': 'bg-indigo-100 text-indigo-700',
        'New': 'bg-pink-100 text-pink-700',
        'Intel': 'bg-gray-100 text-gray-700',
        '5': 'bg-blue-100 text-blue-700'
      };
      return colors[color] || 'bg-gray-100 text-gray-700';
    }
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
        isActive
          ? 'bg-purple-100 text-purple-700 border-l-2 border-purple-500'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getBadgeStyle(badge, badgeColor)}`}>
          {badge}
        </span>
      )}
    </Link>
  );
}

interface AttributionLayoutProps {
  children: ReactNode;
}

export default function AttributionLayout({ children }: AttributionLayoutProps) {
  const pathname = usePathname();
  
  // Core Features
  const coreFeatures = [
    { icon: BarChart3, label: 'Panel Principal', href: '/dashboard' },
    { icon: Users, label: 'Audiencias', href: '/audiences', badge: 'Neural', badgeColor: 'Neural' },
    { icon: Target, label: 'Campañas', href: '/campaigns', badge: '5', badgeColor: '5' },
    { icon: Brain, label: 'Attribution', href: '/attribution', badge: 'Real', badgeColor: 'Real', isActive: pathname === '/attribution' },
    { icon: TrendingUp, label: 'Analytics', href: '/analytics', badge: 'Live', badgeColor: 'Live' },
    { icon: FileText, label: 'Reportes', href: '/reports' }
  ];

  // AI Engine
  const aiEngine = [
    { icon: Eye, label: 'AI Insights', href: '/ai-insights', badge: '5/5', badgeColor: '5' },
    { icon: Sparkles, label: 'Profeta Creativo', href: '/profeta-creativo', badge: 'AI', badgeColor: 'Neural' },
    { icon: Zap, label: 'Neural Automatizador', href: '/neural-automatizador', badge: 'AUTO', badgeColor: 'AUTO' },
    { icon: Shield, label: 'Fraud Detection', href: '/fraud-detection', badge: 'Pro', badgeColor: 'Pro' },
    { icon: Calculator, label: 'ROI Predictor', href: '/roi-predictor', badge: 'Beta', badgeColor: 'Beta' }
  ];

  // Advanced
  const advanced = [
    { icon: MessageSquare, label: 'WhatsApp Bot', href: '/whatsapp-bot', badge: 'Bot', badgeColor: 'Bot' },
    { icon: Network, label: 'Cross-Device Tracking', href: '/cross-device', badge: 'Privacy', badgeColor: 'Privacy' },
    { icon: UserCheck, label: 'Influencer Attribution', href: '/influencer', badge: 'New', badgeColor: 'New' },
    { icon: Building, label: 'Competitor Intelligence', href: '/competitor', badge: 'Intel', badgeColor: 'Intel' },
    { icon: Settings, label: 'Configuración', href: '/settings' }
  ];

  return (
    <StatusProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Lado Izquierdo */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
          {/* Header Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900">AttributelyPro</h1>
                <p className="text-xs text-gray-600">Quintuple AI</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 py-4 px-3">
            {/* Core Features */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                CORE FEATURES
              </h3>
              <div className="space-y-1">
                {coreFeatures.map((item) => (
                  <SidebarItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    badge={item.badge}
                    badgeColor={item.badgeColor}
                    isActive={item.isActive}
                  />
                ))}
              </div>
            </div>

            {/* AI Engine */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                AI ENGINE
              </h3>
              <div className="space-y-1">
                {aiEngine.map((item) => (
                  <SidebarItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    badge={item.badge}
                    badgeColor={item.badgeColor}
                  />
                ))}
              </div>
            </div>

            {/* Advanced */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                ADVANCED
              </h3>
              <div className="space-y-1">
                {advanced.map((item) => (
                  <SidebarItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    badge={item.badge}
                    badgeColor={item.badgeColor}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">V</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Victor Andrade</p>
                <p className="text-xs text-gray-600">CEO AttributelyPro</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Content Area - CON SCROLL ARREGLADO */}
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full bg-gradient-to-br from-slate-50 to-gray-100 p-6">
            {children}
          </div>
        </div>
      </div>
    </StatusProvider>
  );
}