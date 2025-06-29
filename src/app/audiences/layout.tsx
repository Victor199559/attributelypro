// src/app/audiences/layout.tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Brain, Users, Target, BarChart3, TrendingUp, PieChart, 
  Sparkles, Zap, Shield, Calculator, MessageCircle, Globe, 
  Eye, Settings, Home, Bot, Crosshair, User
} from 'lucide-react';
import { StatusProvider } from '../../contexts/StatusContext';

interface AudiencesLayoutProps {
  children: ReactNode;
}

// Sidebar Component (SIN SCROLL + Badge Neural pequeño)
function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'CORE FEATURES',
      items: [
        { name: 'Panel Principal', icon: Home, href: '/dashboard', active: false },
        { name: 'Audiencias', icon: Users, href: '/audiences', active: true, badge: 'Neural' },
        { name: 'Campañas', icon: Target, href: '/campaigns', active: false, badge: '5' },
        { name: 'Attribution', icon: BarChart3, href: '/attribution', active: false, badge: 'Real' },
        { name: 'Analytics', icon: TrendingUp, href: '/analytics', active: false, badge: 'Live' },
        { name: 'Reportes', icon: PieChart, href: '/reports', active: false }
      ]
    },
    {
      title: 'AI ENGINE',
      items: [
        { name: 'AI Insights', icon: Brain, href: '/ai-insights', active: false, badge: '5/5' },
        { name: 'Profeta Creativo', icon: Sparkles, href: '/profeta-creativo', active: false, badge: 'AI' },
        { name: 'Neural Automatizador', icon: Zap, href: '/neural-automatizador', active: false, badge: 'AUTO' },
        { name: 'Fraud Detection', icon: Shield, href: '/fraud-detection', active: false, badge: 'Pro' },
        { name: 'ROI Predictor', icon: Calculator, href: '/roi-predictor', active: false, badge: 'Beta' }
      ]
    },
    {
      title: 'ADVANCED',
      items: [
        { name: 'WhatsApp Bot', icon: MessageCircle, href: '/whatsapp-bot', active: false, badge: 'Bot' },
        { name: 'Cross-Device Tracking', icon: Globe, href: '/cross-device', active: false, badge: 'Privacy' },
        { name: 'Influencer Attribution', icon: Eye, href: '/influencer', active: false, badge: 'New' },
        { name: 'Competitor Intelligence', icon: Crosshair, href: '/competitor', active: false, badge: 'Intel' },
        { name: 'Configuración', icon: Settings, href: '/settings', active: false }
      ]
    }
  ];

  const getBadgeStyle = (badge: string) => {
    const styles = {
      'Neural': 'bg-blue-100 text-blue-700',
      'AI': 'bg-blue-100 text-blue-700',
      'AUTO': 'bg-green-100 text-green-700',
      'Pro': 'bg-orange-100 text-orange-700',
      'Beta': 'bg-yellow-100 text-yellow-700',
      'Bot': 'bg-emerald-100 text-emerald-700',
      'Privacy': 'bg-indigo-100 text-indigo-700',
      'New': 'bg-pink-100 text-pink-700',
      'Intel': 'bg-red-100 text-red-700',
      'Real': 'bg-teal-100 text-teal-700',
      'Live': 'bg-cyan-100 text-cyan-700',
      '5/5': 'bg-violet-100 text-violet-700',
      '5': 'bg-gray-100 text-gray-700'
    };
    return styles[badge as keyof typeof styles] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-30 flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">AttributelyPro</span>
        </Link>

        {/* Menu Items - SIN OVERFLOW SCROLL */}
        <nav className="space-y-6 flex-1">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href === '/audiences' && pathname?.startsWith('/audiences'));
                  
                  return (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon 
                          className={`w-5 h-5 ${
                            isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                          }`} 
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span 
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            isActive && item.badge === 'Neural' 
                              ? 'bg-blue-100 text-blue-700' 
                              : isActive 
                                ? 'bg-white bg-opacity-20 text-white' 
                                : getBadgeStyle(item.badge)
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom User Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-50">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Victor Andrade
              </p>
              <p className="text-xs text-gray-500 truncate">
                CEO & Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AudiencesLayout({ children }: AudiencesLayoutProps) {
  return (
    <StatusProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 ml-64 overflow-auto">
          <div className="min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </StatusProvider>
  );
}