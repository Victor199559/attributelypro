'use client';

import React from 'react';

export default function ElegirModo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Neuromarketing Background Layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-violet-900/20"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-rose-900/10"></div>
      
      {/* Dynamic Money Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-4xl text-emerald-400 animate-pulse">💰</div>
        <div className="absolute top-40 right-20 text-3xl text-amber-400 animate-bounce" style={{animationDelay: '1s'}}>📈</div>
        <div className="absolute bottom-40 left-20 text-3xl text-violet-400 animate-pulse" style={{animationDelay: '2s'}}>💎</div>
        <div className="absolute bottom-20 right-10 text-4xl text-emerald-400 animate-bounce" style={{animationDelay: '0.5s'}}>🚀</div>
        <div className="absolute top-1/2 left-1/4 text-2xl text-amber-400 animate-pulse" style={{animationDelay: '1.5s'}}>⭐</div>
        <div className="absolute top-1/3 right-1/3 text-2xl text-violet-400 animate-bounce" style={{animationDelay: '2.5s'}}>💸</div>
      </div>
      
      {/* Floating Success Elements */}
      <div className="fixed top-16 left-16 w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full animate-float shadow-lg shadow-emerald-500/20"></div>
      <div className="fixed top-24 right-24 w-8 h-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full animate-bounce shadow-lg shadow-amber-500/20"></div>
      <div className="fixed bottom-32 left-32 w-16 h-16 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full animate-pulse shadow-lg shadow-violet-500/20"></div>
      <div className="fixed bottom-16 right-16 w-10 h-10 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full animate-float shadow-lg shadow-rose-500/20" style={{animationDelay: '1s'}}></div>
      
      {/* Subtle Grid Pattern for Trust */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Premium Glow Effect */}
      <div className="fixed top-0 left-1/2 w-96 h-96 bg-gradient-radial from-amber-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-gradient-radial from-violet-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className="relative z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="w-full px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo - Esquina izquierda */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-black text-white drop-shadow-lg">
                AttributelyPro
              </span>
            </div>
            
            {/* Auth Buttons - Esquina derecha */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/login'}
                className="text-white/90 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
              >
                Iniciar Sesión
              </button>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-2 rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/30"
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center items-center">
        {/* Header - Solo cambio la línea para subir todo */}
        <div className="text-center mb-12">
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-4 rounded-full shadow-lg shadow-amber-500/30"></div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">
            🚀 Elige tu experiencia
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto drop-shadow-lg">
            Descubre el futuro del marketing attribution
          </p>
        </div>

        {/* Mode Selection */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch max-w-5xl mx-auto mb-12">
          
          {/* Modo Automático */}
          <div 
            onClick={() => {
              // Verificar si está logueado (simulado)
              const isLoggedIn = localStorage.getItem('user_logged_in');
              if (isLoggedIn) {
                window.location.href = '/automatico';
              } else {
                window.location.href = '/signup?redirect=automatico';
              }
            }}
            className="relative group cursor-pointer flex-1 max-w-md"
          >
            <div className="relative bg-gradient-to-br from-emerald-800/50 via-teal-800/40 to-green-900/50 backdrop-blur-xl border border-emerald-400/30 rounded-3xl p-8 text-center transition-all duration-500 hover:border-emerald-300/60 hover:shadow-2xl hover:shadow-emerald-400/30 hover:-translate-y-2 group-hover:scale-105 h-full">
              
              {/* Badge Recomendado - ARREGLADO */}
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-amber-200">
                  Recomendado
                </div>
              </div>
              
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-lg">
                💚
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors drop-shadow-lg">
                Automático
              </h2>
              
              <p className="text-base text-emerald-100 mb-6 group-hover:text-white transition-colors">
                IA hace todo el trabajo
              </p>
              
              <p className="text-emerald-200 leading-relaxed mb-8 group-hover:text-emerald-100 transition-colors text-sm">
                Dinos qué vendes y nuestro sistema inteligente creará, 
                lanzará y optimizará campañas automáticamente. 
                Zero configuración, máximos resultados.
              </p>
              
              <div className="space-y-3 mb-8 text-left">
                {[
                  'Setup instantáneo en 3 minutos',
                  'Publicación automática multi-plataforma',
                  'Optimización con IA en tiempo real',
                  'Análisis predictivo de audiencias',
                  'Garantía de resultados o reembolso'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3 text-emerald-200 group-hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105 hover:from-emerald-400 hover:to-teal-400">
                Comenzar Automático
                <div className="text-xs opacity-80 mt-1">Se requiere cuenta gratuita</div>
              </button>
            </div>
          </div>

          {/* Modo Pro */}
          <div 
            onClick={() => {
              // Verificar si está logueado (simulado)
              const isLoggedIn = localStorage.getItem('user_logged_in');
              if (isLoggedIn) {
                window.location.href = '/dashboard';
              } else {
                window.location.href = '/signup?redirect=dashboard';
              }
            }}
            className="relative group cursor-pointer flex-1 max-w-md"
          >
            <div className="relative bg-gradient-to-br from-fuchsia-800/60 via-purple-800/50 to-indigo-800/60 backdrop-blur-xl border-2 border-fuchsia-400/40 rounded-3xl p-8 text-center transition-all duration-500 hover:border-fuchsia-300/70 hover:shadow-2xl hover:shadow-fuchsia-400/40 hover:-translate-y-2 group-hover:scale-105 h-full ring-1 ring-fuchsia-300/20">
              
              {/* Premium Badge */}
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-fuchsia-200">
                  PREMIUM
                </div>
              </div>
              
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                👑
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-fuchsia-300 transition-colors drop-shadow-lg">
                Pro
              </h2>
              
              <p className="text-base text-fuchsia-100 mb-6 group-hover:text-white transition-colors">
                Control total y analytics
              </p>
              
              <p className="text-fuchsia-200 leading-relaxed mb-8 group-hover:text-fuchsia-100 transition-colors text-sm">
                Dashboard completo con todas las métricas, 
                configuraciones avanzadas y herramientas profesionales 
                para el control total de tus campañas.
              </p>
              
              <div className="space-y-3 mb-8 text-left">
                {[
                  'Dashboard analytics completo',
                  'Attribution modeling avanzado',
                  'Configuraciones granulares',
                  'Reportes personalizables',
                  'Integración con todas las plataformas'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3 text-fuchsia-200 group-hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-fuchsia-400 rounded-full shadow-sm"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-fuchsia-500/50 transition-all duration-300 group-hover:scale-105 hover:from-fuchsia-400 hover:to-pink-400 shadow-lg">
                Acceder a Pro
                <div className="text-xs opacity-80 mt-1">Se requiere cuenta gratuita</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-amber-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">💎</span>
              </div>
              <div>
                <div className="font-semibold text-white drop-shadow-sm">100% Gratis</div>
                <div className="text-sm text-amber-200">Solo pagas por resultados</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">🛡️</span>
              </div>
              <div>
                <div className="font-semibold text-white drop-shadow-sm">Sin Riesgo</div>
                <div className="text-sm text-amber-200">No funciona, no pagas</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">⚡</span>
              </div>
              <div>
                <div className="font-semibold text-white drop-shadow-sm">Resultados Inmediatos</div>
                <div className="text-sm text-amber-200">Campañas live en minutos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}