'use client';

import React, { useState } from 'react';
import { ArrowRight, Zap, Brain, Target, Shield, TrendingUp, Users, DollarSign, CheckCircle, Star, Play, Globe } from 'lucide-react';

const translations = {
  es: {
    nav: {
      features: 'Características',
      pricing: 'Precios',
      demo: 'Demo',
      getStarted: 'Comenzar Gratis'
    },
    hero: {
      badge: 'Atribución con IA',
      title: 'Atribución de Marketing',
      titleHighlight: 'Que Realmente Funciona',
      subtitle: 'Deja de adivinar qué campañas generan ingresos. Nuestra plataforma con IA rastrea cada punto de contacto, predice el valor de vida del cliente y optimiza tu gasto publicitario automáticamente.',
      startTrial: 'Prueba Gratuita',
      watchDemo: 'Ver Demo',
      setupTime: 'Configuración en 5 minutos',
      gdprCompliant: 'Cumple con GDPR',
      happyCustomers: '500+ Clientes Satisfechos'
    },
    comparison: {
      title: 'Por Qué Elegir AttributelyPro?',
      oldSolutions: 'Cometly y Competencia',
      ourSolution: 'AttributelyPro (IA + Español)',
      oldFeatures: [
        'Setup complejo (5+ días)',
        'Precios abusivos ($500-5000/mes)',
        'Solo en inglés',
        'Interfaces anticuadas',
        'Sin IA predictiva',
        'Solo reportes básicos'
      ],
      newFeatures: [
        'Setup en 5 minutos',
        'Precios justos ($0-299/mes)',
        'Español + Inglés nativo',
        'UI moderna estilo Netflix',
        '🔮 Profeta Creativo con IA',
        '🦄 AI cross-platform único'
      ]
    },
    features: {
      title: 'Características Que Impulsan Resultados',
      list: [
        {
          title: 'Profeta Creativo IA',
          description: 'Predice qué creativos van a funcionar ANTES de gastar. Primer predictor de performance creativo en español del mundo.'
        },
        {
          title: 'AI Insights Cross-Platform',
          description: 'Optimización automática entre Google, Meta y TikTok con recomendaciones específicas de IA.'
        },
        {
          title: 'Fraud Detection Enterprise',
          description: 'IA que detecta y bloquea tráfico falso automáticamente, protegiendo tu presupuesto publicitario.'
        },
        {
          title: 'Dashboard Completo',
          description: 'Suite completa con 8 páginas: Analytics, Campañas, Audiencias, Reportes y más.'
        },
        {
          title: 'Pioneer Program',
          description: 'Sé el primero en tu industria. Testing gratuito + datos exclusivos de tu nicho.'
        },
        {
          title: 'White-Label Ready',
          description: 'Perfecto para agencias - rebrandea completamente y revende a tus clientes.'
        }
      ]
    },
    pricing: {
      title: 'Precios Que Escalan Con Tu Éxito',
      subtitle: 'Hasta 10x más barato que Cometly. Paga por resultados, no por acceso.',
      plans: [
        {
          name: 'Gratuito',
          price: '$0',
          description: 'Perfecto para validar y empezar',
          features: ['Dashboard principal básico', 'Hasta 3 campañas', 'Analíticas básicas (7 días)', 'Configuración manual', 'Soporte por email'],
          cta: 'Comenzar Gratis',
          highlight: false
        },
        {
          name: 'Pro',
          price: '$99',
          description: 'Todo lo que necesitas para crecer',
          features: ['🔮 Profeta Creativo ilimitado', '🦄 AI Insights cross-platform', '📊 Dashboard completo + todas las páginas', '🛡️ Fraud Detection básico', 'Pioneer Program (nuevos nichos)', 'Reportes automatizados', 'Soporte prioritario'],
          cta: 'Empezar Prueba',
          highlight: true
        },
        {
          name: 'Empresa',
          price: '$299',
          description: 'Para equipos que dominan el mercado',
          features: ['Todo de Pro +', '🦄 White-label completo', '🛡️ Fraud Detection enterprise', 'Modelos ML personalizados', 'API completa', 'Integraciones custom', 'Manager dedicado', 'SLA 99.9%'],
          cta: 'Contactar Ventas',
          highlight: false
        }
      ],
      pioneer: {
        title: '🚀 Programa Pioneer',
        subtitle: 'Sé el primero en tu industria',
        description: 'Solo $50/mes extra: Testeo gratuito de $50 + predicciones exclusivas para tu nicho',
        features: ['Testing gratuito incluido', 'Datos exclusivos de tu industria', 'Influencia en desarrollo IA', '6 meses de ventaja vs competencia']
      }
    },
    cta: {
      title: '¿Listo para Potenciar tu Marketing?',
      subtitle: 'Únete a cientos de empresas que ya optimizan su atribución con AttributelyPro',
      placeholder: 'Ingresa tu email',
      button: 'Comenzar',
      terms: 'Prueba gratuita de 14 días • Sin tarjeta de crédito • Configuración en 5 minutos'
    },
    footer: {
      privacy: 'Privacidad',
      terms: 'Términos',
      support: 'Soporte',
      contact: 'Contacto',
      copyright: '© 2024 AttributelyPro. Todos los derechos reservados. La nueva generación de atribución.'
    }
  },
  en: {
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      demo: 'Demo',
      getStarted: 'Get Started Free'
    },
    hero: {
      badge: 'AI-Powered Attribution',
      title: 'Marketing Attribution',
      titleHighlight: 'That Actually Works',
      subtitle: 'Stop guessing which campaigns drive revenue. Our AI-powered platform tracks every touchpoint, predicts customer lifetime value, and optimizes your ad spend automatically.',
      startTrial: 'Start Free Trial',
      watchDemo: 'Watch Demo',
      setupTime: 'Setup in 5 minutes',
      gdprCompliant: 'GDPR Compliant',
      happyCustomers: '500+ Happy Customers'
    },
    comparison: {
      title: 'Why Choose AttributelyPro?',
      oldSolutions: 'Cometly & Competition',
      ourSolution: 'AttributelyPro (AI + Spanish)',
      oldFeatures: [
        'Complex setup (5+ days)',
        'Abusive pricing ($500-5000/month)',
        'English only',
        'Outdated interfaces',
        'No predictive AI',
        'Basic reports only'
      ],
      newFeatures: [
        'Setup in 5 minutes',
        'Fair pricing ($0-299/month)',
        'Native Spanish + English',
        'Modern Netflix-style UI',
        '🔮 Profeta Creativo with AI',
        '🦄 Unique cross-platform AI'
      ]
    },
    features: {
      title: 'Features That Drive Results',
      list: [
        {
          title: 'Profeta Creativo AI',
          description: 'Predict which creatives will work BEFORE spending. World\'s first creative performance predictor in Spanish.'
        },
        {
          title: 'AI Insights Cross-Platform',
          description: 'Automatic optimization across Google, Meta and TikTok with specific AI recommendations.'
        },
        {
          title: 'Enterprise Fraud Detection',
          description: 'AI that detects and blocks fake traffic automatically, protecting your advertising budget.'
        },
        {
          title: 'Complete Dashboard',
          description: 'Complete suite with 8 pages: Analytics, Campaigns, Audiences, Reports and more.'
        },
        {
          title: 'Pioneer Program',
          description: 'Be first in your industry. Free testing + exclusive data from your niche.'
        },
        {
          title: 'White-Label Ready',
          description: 'Perfect for agencies - completely rebrand and resell to your clients.'
        }
      ]
    },
    pricing: {
      title: 'Pricing That Scales With Your Success',
      subtitle: 'Up to 10x cheaper than Cometly. Pay for results, not access.',
      plans: [
        {
          name: 'Free',
          price: '$0',
          description: 'Perfect to validate and start',
          features: ['Basic main dashboard', 'Up to 3 campaigns', 'Basic analytics (7 days)', 'Manual setup', 'Email support'],
          cta: 'Start Free',
          highlight: false
        },
        {
          name: 'Pro',
          price: '$99',
          description: 'Everything you need to grow',
          features: ['🔮 Unlimited Profeta Creativo', '🦄 AI Insights cross-platform', '📊 Complete dashboard + all pages', '🛡️ Basic Fraud Detection', 'Pioneer Program (new niches)', 'Automated reports', 'Priority support'],
          cta: 'Start Trial',
          highlight: true
        },
        {
          name: 'Enterprise',
          price: '$299',
          description: 'For teams that dominate the market',
          features: ['Everything in Pro +', '🦄 Complete white-label', '🛡️ Enterprise Fraud Detection', 'Custom ML models', 'Full API access', 'Custom integrations', 'Dedicated manager', '99.9% SLA'],
          cta: 'Contact Sales',
          highlight: false
        }
      ],
      pioneer: {
        title: '🚀 Pioneer Program',
        subtitle: 'Be first in your industry',
        description: 'Only $50/month extra: Free $50 testing + exclusive predictions for your niche',
        features: ['Free testing included', 'Exclusive industry data', 'Influence AI development', '6 months advantage vs competition']
      }
    },
    cta: {
      title: 'Ready to Supercharge Your Marketing?',
      subtitle: 'Join hundreds of businesses already optimizing their attribution with AttributelyPro',
      placeholder: 'Enter your email',
      button: 'Get Started',
      terms: 'Free 14-day trial • No credit card required • Setup in 5 minutes'
    },
    footer: {
      privacy: 'Privacy',
      terms: 'Terms',
      support: 'Support',
      contact: 'Contact',
      copyright: '© 2024 AttributelyPro. All rights reserved. The next generation of attribution.'
    }
  }
};

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [currentLang, setCurrentLang] = useState<'es' | 'en'>('es');
  
  const t = translations[currentLang];

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'es' ? 'en' : 'es');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AttributelyPro</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8 text-gray-300">
              <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
              <a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a>
              <a href="#demo" className="hover:text-white transition-colors">{t.nav.demo}</a>
            </div>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white hover:bg-slate-700 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
            </button>
          </div>
          
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            {t.nav.getStarted}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t.hero.title}
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/dashboard" className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg text-white font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center space-x-2">
              <span>{t.hero.startTrial}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="border border-gray-600 px-8 py-4 rounded-lg text-white font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>{t.hero.watchDemo}</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 text-gray-400">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span>{t.hero.setupTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>{t.hero.gdprCompliant}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>{t.hero.happyCustomers}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-6 py-16 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            {t.comparison.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Old Solutions Column */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-6 text-center">{t.comparison.oldSolutions}</h3>
              <div className="space-y-4">
                {t.comparison.oldFeatures.map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-red-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AttributelyPro Column */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-400 mb-6 text-center">{t.comparison.ourSolution}</h3>
              <div className="space-y-4">
                {t.comparison.newFeatures.map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-green-300">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            {t.features.title}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, color: 'purple' },
              { icon: Target, color: 'blue' },
              { icon: TrendingUp, color: 'green' },
              { icon: Shield, color: 'red' },
              { icon: DollarSign, color: 'yellow' },
              { icon: Users, color: 'pink' }
            ].map((feature, i) => {
              const Icon = feature.icon;
              const featureData = t.features.list[i];
              return (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all group">
                  <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{featureData.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{featureData.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 bg-slate-800/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-xl text-gray-300 mb-16">
            {t.pricing.subtitle}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.pricing.plans.map((plan, i) => (
              <div key={i} className={`relative bg-slate-800/50 border rounded-xl p-8 ${plan.highlight ? 'border-purple-500 scale-105' : 'border-slate-700'}`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-white text-sm font-semibold">
                    Más Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  {plan.price}
                  {plan.price !== '$0' && <span className="text-lg text-gray-400">/mes</span>}
                </div>
                <p className="text-gray-400 mb-8">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center space-x-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => {
                    if (plan.name === 'Gratuito' || plan.name === 'Free') {
                      window.location.href = '/dashboard';
                    } else if (plan.name === 'Pro') {
                      window.location.href = '/dashboard';
                    } else {
                      window.location.href = 'mailto:ceo@attributelypro.com?subject=Enterprise Plan Interest';
                    }
                  }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.highlight 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25' 
                      : 'border border-gray-600 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Pioneer Program Section */}
          <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">{t.pricing.pioneer.title}</h3>
            <p className="text-purple-300 text-lg mb-4">{t.pricing.pioneer.subtitle}</p>
            <p className="text-gray-300 mb-6">{t.pricing.pioneer.description}</p>
            
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {t.pricing.pioneer.features.map((feature, i) => (
                <div key={i} className="flex items-center space-x-2 text-purple-300">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => window.location.href = '/profeta-creativo'}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              Convertirme en Pioneer
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            {t.cta.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={t.cta.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <button 
              onClick={() => {
                setEmail('');
                window.location.href = '/dashboard';
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              {t.cta.button}
            </button>
          </div>
          
          <p className="text-gray-400 text-sm mt-4">
            {t.cta.terms}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AttributelyPro</span>
            </div>
            
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.support}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.contact}</a>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}