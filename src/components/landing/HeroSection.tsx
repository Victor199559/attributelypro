// src/components/landing/HeroSection.tsx
'use client';

import { ArrowRight, Star, Shield, Users, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm">Atribución con IA</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Marketing Attribution
          <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Que Realmente Funciona
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Gratis hasta que generes resultados. Nuestra plataforma con IA rastrea cada punto de contacto 
          y solo cobra comisión cuando funciona. Sin riesgo, sin membresías, sin trucos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a 
            href="/signup" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg text-white font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center space-x-2"
          >
            <span>Empezar Aquí</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a 
            href="/login" 
            className="border border-white/20 px-8 py-4 rounded-lg text-white font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
          >
            <span>Iniciar Sesión</span>
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 text-gray-400">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span>Configuración en 5 minutos</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span>100% Gratis para empezar</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span>Solo pagas por resultados</span>
          </div>
        </div>
      </div>
    </section>
  );
}