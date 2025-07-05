// src/components/landing/FeaturesSection.tsx
'use client';

import { Brain, Target, TrendingUp, Shield, DollarSign, Users } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'Quintuple AI',
      description: 'IA que optimiza automáticamente entre Google, Meta, TikTok, YouTube y WhatsApp con predicciones en tiempo real.',
      color: 'purple'
    },
    {
      icon: Target,
      title: 'Attribution Real',
      description: 'Tracking preciso sin cookies que rastrea cada punto de contacto del customer journey completo.',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Profeta Creativo',
      description: 'Predice qué creativos van a funcionar ANTES de gastar. Primer predictor de performance en español.',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Fraud Detection',
      description: 'IA que detecta y bloquea tráfico falso automáticamente, protegiendo tu presupuesto publicitario.',
      color: 'red'
    },
    {
      icon: DollarSign,
      title: 'ROI Garantizado',
      description: 'Solo pagas cuando generas resultados. Si no funciona, no pagas nada. Riesgo cero.',
      color: 'yellow'
    },
    {
      icon: Users,
      title: 'Dashboard Completo',
      description: 'Suite completa con Analytics, Campañas, Audiencias, Reportes y WhatsApp Attribution.',
      color: 'pink'
    }
  ];

  return (
    <section id="features" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Características Que Impulsan Resultados
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all group">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}