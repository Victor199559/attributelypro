// src/components/landing/FooterSection.tsx
'use client';

import { Target } from 'lucide-react';

export function FooterSection() {
  return (
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
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Soporte</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 AttributelyPro. Todos los derechos reservados. La nueva generación de atribución.</p>
        </div>
      </div>
    </footer>
  );
}