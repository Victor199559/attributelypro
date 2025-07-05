// src/components/landing/ComparisonSection.tsx
'use client';

import { CheckCircle } from 'lucide-react';

export function ComparisonSection() {
  const oldFeatures = [
    'Setup complejo (5+ días)',
    'Precios abusivos ($3000/mes)',
    'Solo en inglés',
    'Interfaces anticuadas',
    'Sin IA predictiva',
    'Pago fijo sin garantías'
  ];

  const newFeatures = [
    'Setup en 5 minutos',
    'Solo pagas por resultados',
    'Español nativo',
    'UI moderna estilo Netflix',
    '🔮 Profeta Creativo con IA',
    '🛡️ Fraud Detection incluido'
  ];

  return (
    <section className="px-6 py-16 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          ¿Por Qué Elegir AttributelyPro?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-red-400 mb-6 text-center">Ketly y Competencia</h3>
            <div className="space-y-4">
              {oldFeatures.map((item, i) => (
                <div key={i} className="flex items-center space-x-3 text-red-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-400 mb-6 text-center">AttributelyPro</h3>
            <div className="space-y-4">
              {newFeatures.map((item, i) => (
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
  );
}