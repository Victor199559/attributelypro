// src/components/landing/NavigationBar.tsx
'use client';

import { Target } from 'lucide-react';

export function NavigationBar() {
  return (
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
            <a href="#features" className="hover:text-white transition-colors">Características</a>
            <a href="#pricing" className="hover:text-white transition-colors">Precios</a>
          </div>
        </div>
        
        {/* Botones de Auth */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => window.location.href = '/login'}
            className="text-white/90 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => window.location.href = '/signup'}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Empezar Aquí
          </button>
        </div>
      </div>
    </nav>
  );
}