'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function CrearCuenta() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    empresa: '',
    telefono: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { loginWithGoogle, loginWithFacebook } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Limpiar error al escribir
  };

  const handleCredentialsRegister = async () => {
    // Validaciones
    if (!formData.nombre || !formData.email || !formData.password) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Registrar usuario en tu API
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          password: formData.password,
          company: formData.empresa,
          phone: formData.telefono,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al crear la cuenta');
      }

      // Una vez registrado, hacer login automático
      const signInResponse = await fetch('/api/auth/signin/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          redirect: false,
        }),
      });

      if (signInResponse.ok) {
        // Obtener redirect de URL params
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect');
        
        if (redirect === 'automatico') {
          window.location.href = '/automatico';
        } else if (redirect === 'dashboard') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/elegir-modo';
        }
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError('Error al registrarse con Google');
      setIsLoading(false);
    }
  };

  const handleFacebookSignup = async () => {
    setIsLoading(true);
    try {
      await loginWithFacebook();
    } catch (err) {
      setError('Error al registrarse con Facebook');
      setIsLoading(false);
    }
  };

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
            {/* Logo */}
            <div 
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-black text-white drop-shadow-lg">
                AttributelyPro
              </span>
            </div>
            
            {/* Login Link */}
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm">¿Ya tienes cuenta?</span>
              <button 
                onClick={() => window.location.href = '/login'}
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-8">
        <div className="max-w-md w-full">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-4 rounded-full shadow-lg shadow-amber-500/30"></div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 drop-shadow-2xl">
              🚀 Crear Cuenta
            </h1>
            <p className="text-base text-amber-100 drop-shadow-lg">
              Únete a la revolución del marketing attribution
            </p>
          </div>

          {/* Formulario de Registro */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            
            {/* Social Login Buttons - AHORA FUNCIONALES */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="w-full py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70"
              >
                <span className="text-xl">🔍</span>
                <span>Continuar con Google</span>
              </button>
              
              <button
                onClick={handleFacebookSignup}
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70"
              >
                <span className="text-xl">📘</span>
                <span>Continuar con Facebook</span>
              </button>
            </div>

            {/* Separador */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900 text-white/60">O con email</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              
              {/* Nombre Completo */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Empresa */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Empresa
                </label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                  placeholder="Nombre de tu empresa (opcional)"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all pr-12"
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Confirmar Contraseña *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                  placeholder="Confirma tu contraseña"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                  placeholder="+593 99 123 4567 (opcional)"
                />
              </div>

              {/* Términos y Condiciones */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-5 h-5 text-amber-400 bg-white/10 border-white/30 rounded focus:ring-amber-400 focus:ring-2"
                />
                <label htmlFor="terms" className="text-white/90 text-sm leading-relaxed">
                  Acepto los términos y condiciones y la política de privacidad
                </label>
              </div>

              {/* Botón Submit */}
              <button
                onClick={handleCredentialsRegister}
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creando cuenta...</span>
                  </div>
                ) : (
                  'Crear Cuenta Gratuita'
                )}
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex justify-center items-center space-x-6 text-amber-200">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">🔒</span>
                <span className="text-sm">100% Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">⚡</span>
                <span className="text-sm">Setup Instantáneo</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">💎</span>
                <span className="text-sm">Gratis Siempre</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}