'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginWithGoogle, loginWithFacebook, loginWithCredentials } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Limpiar error al escribir
  };

  const handleCredentialsLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await loginWithCredentials(formData.email, formData.password);
    } catch (err) {
      setError('Email o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError('Error al iniciar sesión con Google');
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithFacebook();
    } catch (err) {
      setError('Error al iniciar sesión con Facebook');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Mismo fondo que tienes en elegir-modo */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-violet-900/20"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-rose-900/10"></div>
      
      {/* Navigation Bar */}
      <nav className="relative z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="w-full px-6 py-3">
          <div className="flex justify-between items-center">
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
            
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm">¿No tienes cuenta?</span>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-4 py-2 rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/30 text-sm"
              >
                Crear Cuenta
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
              👋 Bienvenido de vuelta
            </h1>
            <p className="text-base text-amber-100 drop-shadow-lg">
              Accede a tu cuenta de AttributelyPro
            </p>
          </div>

          {/* Formulario de Login */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            
            {/* Social Login Buttons - AHORA FUNCIONALES */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70"
              >
                <span className="text-xl">🔍</span>
                <span>Continuar con Google</span>
              </button>
              
              <button
                onClick={handleFacebookLogin}
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
              {/* Email */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Email
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

              {/* Contraseña */}
              <div>
                <label className="block text-white font-medium mb-2 text-sm">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
                  placeholder="Tu contraseña"
                />
              </div>

              {/* Botón Login */}
              <button
                onClick={handleCredentialsLogin}
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex justify-center items-center space-x-6 text-amber-200">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">🔒</span>
                <span className="text-sm">Datos Seguros</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">⚡</span>
                <span className="text-sm">Acceso Inmediato</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">💎</span>
                <span className="text-sm">Siempre Gratis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}