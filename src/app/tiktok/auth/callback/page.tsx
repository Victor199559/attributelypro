'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Componente que usa useSearchParams envuelto en Suspense
function CallbackContent() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const authCode = searchParams?.get('code');
    const state = searchParams?.get('state');
    
    if (authCode) {
      setIsProcessing(true);
      // Simular procesamiento inicial
      setTimeout(() => {
        setCode(authCode);
        setStep(2);
        setIsProcessing(false);
      }, 2000);
    }
  }, [searchParams]);

  const copyToClipboard = async () => {
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const completeAuthorization = async () => {
    if (!code) return;
    
    setStep(3);
    setIsProcessing(true);

    try {
      const response = await fetch('http://3.16.108.83:8000/tiktok-ads/exchange-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_code: code }),
      });
      
      const resultData = await response.json();
      setResult(resultData);
      
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
        
        // Si es exitoso, redirigir después de 5 segundos
        if (resultData.status === 'success') {
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 5000);
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setResult({ status: 'error', message: 'Error connecting to backend' });
      setIsProcessing(false);
      setStep(4);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, 120, 0],
              y: [0, -80, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6"
            >
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
              </svg>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              TikTok <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">OAuth</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Conectando AttributelyPro con TikTok Ads API para potenciar tu Neural Automatizador
            </motion.p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-8">
              {[
                { num: 1, label: "Autorización", icon: "🔐" },
                { num: 2, label: "Código Recibido", icon: "📋" },
                { num: 3, label: "Procesando", icon: "⚡" },
                { num: 4, label: "Completado", icon: "🎉" }
              ].map((stepItem, index) => (
                <motion.div 
                  key={stepItem.num}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                    step >= stepItem.num 
                      ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step > stepItem.num ? '✓' : stepItem.icon}
                  </div>
                  <span className={`mt-2 text-sm font-medium transition-colors duration-500 ${
                    step >= stepItem.num ? 'text-white' : 'text-gray-500'
                  }`}>
                    {stepItem.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <div className="text-center">
                  <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6"></div>
                  <h2 className="text-2xl font-bold text-white mb-4">Esperando Autorización</h2>
                  <p className="text-gray-300">
                    Por favor, completa la autorización en la ventana de TikTok...
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && code && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">¡Código Recibido!</h2>
                  <p className="text-gray-300 mb-6">
                    Autorización exitosa. Tu código de acceso ha sido generado.
                  </p>
                </div>

                <div className="bg-black/30 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-400">Código de Autorización</span>
                    <button 
                      onClick={copyToClipboard}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        copied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {copied ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <code className="block text-sm font-mono text-green-400 break-all leading-relaxed">
                    {code}
                  </code>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={completeAuthorization}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🚀 Completar Automatización
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    📋 Solo Copiar Código
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-2 border-4 border-pink-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">⚡</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Procesando Autorización</h2>
                  <p className="text-gray-300 mb-6">
                    Intercambiando código por access token y configurando Neural Automatizador TikTok...
                  </p>
                  <div className="bg-black/30 rounded-xl p-4">
                    <div className="flex items-center justify-center space-x-2 text-blue-400">
                      <motion.div 
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <span className="ml-3 font-medium">Configurando API...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`backdrop-blur-lg rounded-2xl p-8 border ${
                  result?.status === 'success' 
                    ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30'
                    : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30'
                }`}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                      result?.status === 'success'
                        ? 'bg-gradient-to-r from-green-400 to-blue-500'
                        : 'bg-gradient-to-r from-red-400 to-orange-500'
                    }`}
                  >
                    <span className="text-3xl">
                      {result?.status === 'success' ? '🎉' : '❌'}
                    </span>
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {result?.status === 'success' 
                      ? '¡TikTok Completamente Conectado!'
                      : '❌ Error en la Integración'
                    }
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-lg">
                    {result?.status === 'success' 
                      ? 'El Neural Automatizador TikTok está ahora operativo y listo para optimizar tus campañas.'
                      : `Error: ${result?.message || 'Falló la conexión con TikTok'}`
                    }
                  </p>

                  {result?.status === 'success' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                          { 
                            icon: "🤖", 
                            title: "Neural Automatizador", 
                            desc: "Optimización 24/7 activada" 
                          },
                          { 
                            icon: "📊", 
                            title: "Analytics Avanzados", 
                            desc: "Métricas en tiempo real" 
                          },
                          { 
                            icon: "🎯", 
                            title: "Targeting Inteligente", 
                            desc: "Audiencias optimizadas con IA" 
                          }
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="bg-black/30 rounded-xl p-4"
                          >
                            <div className="text-2xl mb-2">{feature.icon}</div>
                            <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.desc}</p>
                          </motion.div>
                        ))}
                      </div>

                      <p className="text-sm text-gray-400 mb-6">
                        Redirigiendo al dashboard en 5 segundos...
                      </p>
                    </>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => window.location.href = '/dashboard'}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      🚀 Ir al Dashboard
                    </button>
                    <button
                      onClick={() => window.open('http://3.16.108.83:8000/quintuple-ai/status', '_blank')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      📈 Ver Estado Quintuple AI
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-12 text-gray-400"
          >
            <p className="text-sm">
              🔐 Conexión segura • 🚀 Powered by AttributelyPro • 🤖 Neural Automatizador
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Loading component para Suspense
function CallbackLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Cargando TikTok OAuth...</p>
      </div>
    </div>
  );
}

// Componente principal con Suspense
export default function TikTokCallback() {
  return (
    <Suspense fallback={<CallbackLoading />}>
      <CallbackContent />
    </Suspense>
  );
}