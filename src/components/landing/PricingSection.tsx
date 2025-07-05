// src/components/landing/PricingSection.tsx
'use client';

import { CheckCircle } from 'lucide-react';

export function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-20 bg-slate-800/30">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Modelo de Pago Justo
        </h2>
        <p className="text-xl text-gray-300 mb-16">
          Paga solo cuando generes resultados reales. Sin membresías, sin contratos, sin trucos.
        </p>
        
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">🎯 Modelo por Comisión</h3>
          <p className="text-purple-300 text-lg mb-6">Solo pagas cuando funciona</p>
          <p className="text-gray-300 mb-8">
            Empiezas completamente gratis. Cuando generes resultados, cobramos una pequeña comisión del ad spend optimizado.
          </p>
          
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center space-y-2 text-purple-300">
              <CheckCircle className="w-6 h-6 text-purple-400" />
              <div className="text-center">
                <div className="font-semibold">Entrada</div>
                <div className="text-2xl font-bold text-white">$0</div>
                <div className="text-sm">Completamente gratis</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 text-purple-300">
              <CheckCircle className="w-6 h-6 text-purple-400" />
              <div className="text-center">
                <div className="font-semibold">Uso</div>
                <div className="text-2xl font-bold text-white">$0</div>
                <div className="text-sm">Plataforma gratuita</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 text-purple-300">
              <CheckCircle className="w-6 h-6 text-purple-400" />
              <div className="text-center">
                <div className="font-semibold">Comisión</div>
                <div className="text-2xl font-bold text-white">15-20%</div>
                <div className="text-sm">Solo del ad spend</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 text-purple-300">
              <CheckCircle className="w-6 h-6 text-purple-400" />
              <div className="text-center">
                <div className="font-semibold">Sin resultados</div>
                <div className="text-2xl font-bold text-white">$0</div>
                <div className="text-sm">Garantía total</div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Ejemplo Real:</h4>
            <div className="text-gray-300">
              <p className="mb-2">Ad Spend: $1,000</p>
              <p className="mb-2">Nuestra comisión (15%): $150</p>
              <p className="mb-2">Total que pagas: $1,150</p>
              <p className="text-purple-300 font-semibold">vs Ketly: $1,000 ad spend + $3,000 mensualidad = $4,000</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/signup'}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Empezar Gratis
          </button>
        </div>
      </div>
    </section>
  );
}