// src/components/ui/LoadingSpinner.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, Brain, Globe, Target, TrendingUp, Activity,
  Zap, CheckCircle, Settings, Smartphone, Mail, Users
} from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'analytics' | 'master' | 'neural' | 'minimal';
  submessage?: string;
  progress?: number;
  showProgress?: boolean;
  animated?: boolean;
}

const loadingMessages = [
  { main: "Conectando con Master Orchestrator...", sub: "Sincronizando datos en tiempo real" },
  { main: "Analizando campañas activas...", sub: "Recopilando métricas de performance" },
  { main: "Optimizando con IA Quintuple...", sub: "Aplicando algoritmos de machine learning" },
  { main: "Sincronizando plataformas...", sub: "Meta Ads, Google Ads, TikTok Ads" },
  { main: "Calculando insights avanzados...", sub: "Generando recomendaciones personalizadas" },
  { main: "Preparando dashboard...", sub: "Cargando analytics en tiempo real" }
];

export function LoadingSpinner({ 
  message,
  size = 'lg',
  variant = 'default',
  submessage,
  progress,
  showProgress = false,
  animated = true
}: LoadingSpinnerProps = {}) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  // **RETROCOMPATIBILIDAD TOTAL**: Si solo se pasa message, usar diseño original mejorado
  if (message && !submessage && size === 'lg' && variant === 'default' && !showProgress) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            {/* Spinner principal mejorado */}
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🤖</span>
              </div>
            </div>
            {/* Partículas flotantes mejoradas */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-1/2 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-500"></div>
          </div>
          <p className="mt-6 text-gray-600 text-lg font-medium">
            {message || "Conectando con Quintuple AI Master..."}
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            Sincronizando datos en tiempo real
          </p>
          
          {/* Indicadores de estado mejorados */}
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs max-w-xs mx-auto">
            <div className="flex items-center justify-center space-x-1 p-2 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Meta</span>
            </div>
            <div className="flex items-center justify-center space-x-1 p-2 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
              <span className="text-gray-700">Google</span>
            </div>
            <div className="flex items-center justify-center space-x-1 p-2 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
              <span className="text-gray-700">TikTok</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Efectos para mensajes animados
  useEffect(() => {
    if (!animated) return;

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 95) return 0;
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [animated]);

  // Configuraciones de tamaño
  const getSizeClasses = () => {
    if (size === 'sm') return { container: 'h-32', spinner: 'h-8 w-8', icon: 'w-4 h-4' };
    if (size === 'md') return { container: 'h-64', spinner: 'h-16 w-16', icon: 'w-8 h-8' };
    if (size === 'lg') return { container: 'h-96', spinner: 'h-24 w-24', icon: 'w-12 h-12' };
    if (size === 'xl') return { container: 'min-h-screen', spinner: 'h-32 w-32', icon: 'w-16 h-16' };
    return { container: 'h-96', spinner: 'h-24 w-24', icon: 'w-12 h-12' };
  };

  // Configuraciones por variante
  const getVariantContent = () => {
    if (variant === 'analytics') {
      return {
        icon: BarChart3,
        gradient: 'from-purple-600 to-pink-600',
        bgGradient: 'from-purple-50 to-pink-50',
        borderColor: 'border-purple-600',
        defaultMessage: "Cargando Analytics Avanzados...",
        defaultSub: "Procesando datos de múltiples plataformas"
      };
    }
    
    if (variant === 'master') {
      return {
        icon: Globe,
        gradient: 'from-blue-600 to-cyan-600',
        bgGradient: 'from-blue-50 to-cyan-50',
        borderColor: 'border-blue-600',
        defaultMessage: "Conectando Master Orchestrator...",
        defaultSub: "Sincronizando con plataformas publicitarias"
      };
    }
    
    if (variant === 'neural') {
      return {
        icon: Brain,
        gradient: 'from-green-600 to-emerald-600',
        bgGradient: 'from-green-50 to-emerald-50',
        borderColor: 'border-green-600',
        defaultMessage: "Activando Neural Automatizador...",
        defaultSub: "Inicializando algoritmos de IA"
      };
    }
    
    if (variant === 'minimal') {
      return {
        icon: Activity,
        gradient: 'from-gray-600 to-gray-800',
        bgGradient: 'from-gray-50 to-gray-100',
        borderColor: 'border-gray-600',
        defaultMessage: "Cargando...",
        defaultSub: "Por favor espera"
      };
    }
    
    // Default variant
    return {
      icon: Target,
      gradient: 'from-purple-600 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-600',
      defaultMessage: "Inicializando Attributely...",
      defaultSub: "Preparando tu plataforma de attribution"
    };
  };

  const sizeClasses = getSizeClasses();
  const variantContent = getVariantContent();
  const Icon = variantContent.icon;
  
  const currentMessage = animated ? loadingMessages[currentMessageIndex] : {
    main: message || variantContent.defaultMessage,
    sub: submessage || variantContent.defaultSub
  };

  const displayProgress = showProgress ? (progress !== undefined ? progress : currentProgress) : undefined;

  // Variante minimal simplificada
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center ${sizeClasses.container}`}>
        <div className="flex items-center space-x-3">
          <div className={`animate-spin rounded-full ${sizeClasses.spinner} border-4 border-gray-200 border-t-gray-600`}></div>
          <span className="text-gray-600 font-medium">{currentMessage.main}</span>
        </div>
      </div>
    );
  }

  // Todas las demás variantes
  return (
    <div className={`flex items-center justify-center ${sizeClasses.container} bg-gradient-to-br ${variantContent.bgGradient}`}>
      <div className="text-center max-w-md mx-auto px-6">
        {/* Spinner Principal */}
        <div className="relative mb-8">
          {/* Anillo exterior giratorio */}
          <div className={`animate-spin rounded-full ${sizeClasses.spinner} border-4 border-gray-200 ${variantContent.borderColor} border-t-4 mx-auto`}></div>
          
          {/* Anillo interior con pulso */}
          <div className={`absolute inset-4 rounded-full bg-gradient-to-r ${variantContent.gradient} animate-pulse`}></div>
          
          {/* Icono central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-16 h-16 bg-gradient-to-r ${variantContent.gradient} rounded-full flex items-center justify-center shadow-lg`}>
              <Icon className={`${sizeClasses.icon} text-white`} />
            </div>
          </div>

          {/* Partículas flotantes para variantes principales */}
          {(variant === 'analytics' || variant === 'master' || variant === 'neural') && (
            <>
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-1/2 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-500"></div>
              <div className="absolute top-1/4 -right-4 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-700"></div>
            </>
          )}
        </div>

        {/* Mensaje Principal */}
        <div className="space-y-2 mb-6">
          <h3 className="text-xl font-bold text-gray-900 transition-all duration-500">
            {currentMessage.main}
          </h3>
          <p className="text-gray-600 transition-all duration-500">
            {currentMessage.sub}
          </p>
        </div>

        {/* Barra de Progreso */}
        {displayProgress !== undefined && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progreso</span>
              <span>{Math.round(displayProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${variantContent.gradient} h-2 rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${Math.min(displayProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Indicadores de Estado para analytics y master */}
        {(variant === 'analytics' || variant === 'master') && (
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="flex items-center justify-center space-x-1 p-2 bg-white/70 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Meta Ads</span>
            </div>
            <div className="flex items-center justify-center space-x-1 p-2 bg-white/70 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
              <span className="text-gray-700">Google Ads</span>
            </div>
            <div className="flex items-center justify-center space-x-1 p-2 bg-white/70 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
              <span className="text-gray-700">TikTok Ads</span>
            </div>
          </div>
        )}

        {/* Features para neural */}
        {variant === 'neural' && (
          <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2 p-2 bg-white/70 rounded-lg">
              <Zap className="w-3 h-3 text-yellow-600" />
              <span className="text-gray-700">Auto Optimization</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-white/70 rounded-lg">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-gray-700">ROI Prediction</span>
            </div>
          </div>
        )}

        {/* Tip para tamaños grandes */}
        {size === 'xl' && (
          <div className="mt-8 p-4 bg-white/80 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>
                💡 <strong>Tip:</strong> Mientras cargas, nuestro sistema está optimizando automáticamente 
                tus campañas para maximizar el ROI.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Animaciones de fondo para variantes no minimal */}
      {variant === 'default' || variant === 'analytics' || variant === 'master' || variant === 'neural' ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/15 rounded-full animate-pulse delay-500"></div>
        </div>
      ) : null}
    </div>
  );
}