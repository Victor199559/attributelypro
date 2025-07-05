// src/components/landing/CTASection.tsx
'use client';

export function CTASection() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          ¿Listo para Generar Resultados?
        </h2>
        <p className="text-xl text-gray-300 mb-12">
          Únete a empresas que ya optimizan sin riesgo con AttributelyPro
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button 
            onClick={() => window.location.href = '/signup'}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg text-white font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all"
          >
            Empezar Aquí Gratis
          </button>
          
          <button 
            onClick={() => window.location.href = '/login'}
            className="border border-white/20 px-8 py-4 rounded-lg text-white font-semibold text-lg hover:bg-white/10 transition-all"
          >
            Iniciar Sesión
          </button>
        </div>
        
        <p className="text-gray-400 text-sm mt-4">
          Gratis hasta que funcione • Sin riesgo • Sin membresías
        </p>
      </div>
    </section>
  );
}