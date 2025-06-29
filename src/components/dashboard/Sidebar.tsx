// src/components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Target, BarChart3, Users, Megaphone, Activity, FileText,
  Brain, Shield, Calculator, MessageCircle, Settings, Crown,
  Sparkles, Zap, Radio, Globe, PieChart, TrendingUp, Layers
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
  isNew?: boolean;
  isPro?: boolean;
}

const navigation: NavItem[] = [
  // Core Dashboard
  { name: 'Panel Principal', href: '/dashboard', icon: BarChart3 },
  
  // Core Features
  { name: 'Audiencias', href: '/audiences', icon: Users, badge: 'Neural', badgeColor: 'purple' },
  { name: 'Campañas', href: '/campaigns', icon: Megaphone, badge: '5', badgeColor: 'blue' },
  { name: 'Attribution', href: '/attribution', icon: Target, badge: 'Real', badgeColor: 'green' },
  { name: 'Analytics', href: '/analytics', icon: Activity, badge: 'Live', badgeColor: 'indigo' },
  { name: 'Reportes', href: '/reports', icon: FileText },
  
  // AI Features
  { name: 'AI Insights', href: '/ai-insights', icon: Brain, badge: '5/5', badgeColor: 'blue' },
  { name: 'Profeta Creativo', href: '/profeta-creativo', icon: Sparkles, badge: 'AI', badgeColor: 'purple', isNew: true },
  { name: 'Neural Automatizador', href: '/neural-automatizador', icon: Zap, badge: 'AUTO', badgeColor: 'yellow', isNew: true },
  { name: 'Fraud Detection', href: '/fraud-detection', icon: Shield, badge: 'Pro', badgeColor: 'red', isPro: true },
  { name: 'ROI Predictor', href: '/roi-predictor', icon: Calculator, badge: 'Beta', badgeColor: 'yellow' },
  
  // Communication
  { name: 'WhatsApp Bot', href: '/whatsapp', icon: MessageCircle, badge: 'Bot', badgeColor: 'green' },
  
  // Advanced Features
  { name: 'Cross-Device Tracking', href: '/cross-device', icon: Globe, badge: 'Privacy', badgeColor: 'blue', isPro: true },
  { name: 'Influencer Attribution', href: '/influencer', icon: Radio, badge: 'New', badgeColor: 'pink', isNew: true },
  { name: 'Competitor Intelligence', href: '/competitor', icon: Layers, badge: 'Intel', badgeColor: 'orange', isPro: true },
  
  // Configuration
  { name: 'Configuración', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname ? pathname.startsWith(href) : false;
  };

  const getBadgeStyles = (color: string) => {
    const styles = {
      purple: 'bg-purple-100 text-purple-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      pink: 'bg-pink-100 text-pink-600',
      orange: 'bg-orange-100 text-orange-600',
    };
    return styles[color as keyof typeof styles] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AttributelyPro
              </span>
              <div className="text-xs text-gray-500 flex items-center mt-0.5">
                <Crown className="w-3 h-3 mr-1 text-yellow-500" />
                Quintuple AI
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {/* Core Features */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-3">
              Core Features
            </p>
            {navigation.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 transition-colors ${
                    isActive(item.href) ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`} />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getBadgeStyles(item.badgeColor || 'gray')}`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive(item.href) && item.href === '/dashboard' && (
                    <Crown className="ml-2 h-4 w-4 text-purple-600" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* AI Features */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-3">
              AI Engine
            </p>
            {navigation.slice(6, 11).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 transition-colors ${
                    isActive(item.href) ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`} />
                  <span className="flex-1">{item.name}</span>
                  
                  <div className="flex items-center space-x-1">
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getBadgeStyles(item.badgeColor || 'gray')}`}>
                        {item.badge}
                      </span>
                    )}
                    {item.isNew && (
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                    {item.isPro && (
                      <Crown className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Communication & Advanced */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-3">
              Advanced
            </p>
            {navigation.slice(11).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 transition-colors ${
                    isActive(item.href) ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`} />
                  <span className="flex-1">{item.name}</span>
                  
                  <div className="flex items-center space-x-1">
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getBadgeStyles(item.badgeColor || 'gray')}`}>
                        {item.badge}
                      </span>
                    )}
                    {item.isNew && (
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                    {item.isPro && (
                      <Crown className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">VA</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Victor Andrade</p>
              <p className="text-xs text-gray-500">CEO AttributelyPro</p>
            </div>
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}