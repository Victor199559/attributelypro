'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

type FormStep = 'form' | 'pin' | 'success';

export default function CrearCuenta() {
  const [step, setStep] = useState<FormStep>('form');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    empresa: '',
    telefono: ''
  });
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const { loginWithGoogle, loginWithFacebook } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSendPin = async () => {
    // Validaciones básicas
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
      const response = await fetch('/api/auth/send-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar código');
      }

      setEmailSent(true);
      setStep('pin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar código');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPin = async () => {
    if (!pin || pin.length !== 6) {
      setError('Por favor ingresa el código de 6 dígitos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          pin: pin,
          name: formData.nombre,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al verificar código');
      }

      setStep('success');
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = '/login?message=account-created';
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al verificar código');
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

  const renderFormStep = () => (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
      {/* Social Login Buttons */}
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
          onClick={handleSendPin}
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Enviando código...</span>
            </div>
          ) : (
            '📧 Enviar Código de Verificación'
          )}
        </button>
      </div>
    </div>
  );

  const renderPinStep = () => (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📧</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          ¡Código Enviado!
        </h3>
        <p className="text-amber-100 text-sm">
          Hemos enviado un código de 6 dígitos a<br />
          <span className="font-semibold">{formData.email}</span>
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* PIN Input */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3 text-center">
          Ingresa el código de verificación
        </label>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="123456"
          className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all text-center text-2xl font-mono tracking-widest"
          maxLength={6}
        />
        <p className="text-xs text-amber-200 mt-2 text-center">
          ⏰ El código expira en 10 minutos
        </p>
      </div>

      {/* Botones */}
      <div className="space-y-3">
        <button
          onClick={handleVerifyPin}
          disabled={isLoading || pin.length !== 6}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Verificando...</span>
            </div>
          ) : (
            '✅ Verificar y Crear Cuenta'
          )}
        </button>

        <button
          onClick={() => setStep('form')}
          className="w-full py-3 bg-white/10 border border-white/30 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
        >
          ← Volver al formulario
        </button>
      </div>

      {/* Reenviar código */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSendPin}
          disabled={isLoading}
          className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
        >
          ¿No recibiste el código? Reenviar
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🎉</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          ¡Cuenta Creada Exitosamente!
        </h3>
        <p className="text-amber-100 mb-6">
          Tu cuenta ha sido verificada y creada correctamente.<br />
          Ahora puedes iniciar sesión.
        </p>
        <div className="w-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg p-4 border border-emerald-500/30">
          <p className="text-emerald-300 text-sm">
            🔄 Redirigiendo al login en unos segundos...
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background elements - same as original */}
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
            <div onClick={() => window.location.href = '/'} className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-black text-white drop-shadow-lg">AttributelyPro</span>
            </div>
            
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
              {step === 'form' && '🚀 Crear Cuenta'}
              {step === 'pin' && '📧 Verificar Email'}
              {step === 'success' && '🎉 ¡Listo!'}
            </h1>
            <p className="text-base text-amber-100 drop-shadow-lg">
              {step === 'form' && 'Únete a la revolución del marketing attribution'}
              {step === 'pin' && 'Verifica tu email con el código que te enviamos'}
              {step === 'success' && 'Tu cuenta está lista para usar'}
            </p>
          </div>

          {/* Render current step */}
          {step === 'form' && renderFormStep()}
          {step === 'pin' && renderPinStep()}
          {step === 'success' && renderSuccessStep()}

          {/* Trust Indicators - only show on form step */}
          {step === 'form' && (
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
          )}
        </div>
      </div>
    </div>
  );
}