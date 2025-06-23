'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TikTokCallback() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const authCode = searchParams?.get('code');
    const state = searchParams?.get('state');
    
    if (authCode) {
      setIsProcessing(true);
      // Simular procesamiento
      setTimeout(() => {
        setCode(authCode);
        setStep(2);
        setIsProcessing(false);
      }, 2000);
    }
  }, [searchParams]);

  const copyToClipboard = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      
      const result = await response.json();
      
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
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
                <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.954-1.07-2.28-.591-3.429.089-.214.025-.46-.156-.606C16.735.146 16.38.004 16 .004c-.38 0-.735.142-.994.299-.181.146-.245.392-.156.606.479 1.149.258 2.475-.591 3.429a6.228 6.228 0 0 1-1.137.966c-.146.095-.297.175-.443.258C10.171 7.056 8 9.784 8 13v7c0 1.104.896 2 2 2h4c1.104 0 2-.896 2-2v-7c0-3.216-2.171-5.944-4.679-7.438z"/>
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
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                    className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <span className="text-3xl">🎉</span>
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">
                    ¡TikTok Completamente Conectado!
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-lg">
                    El Neural Automatizador TikTok está ahora operativo y listo para optimizar tus campañas.
                  </p>

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

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}