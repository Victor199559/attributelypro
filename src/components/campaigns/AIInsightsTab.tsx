// src/components/campaigns/AIInsightsTab.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, Zap, TrendingUp, Target, ArrowRight, Sparkles,
  CheckCircle, AlertTriangle, Settings, Globe, Eye,
  Megaphone, Plus, Activity, Shield
} from 'lucide-react';
import { useStatus } from '../../contexts/StatusContext';

interface AIRecommendation {
  id: string;
  type: 'optimization' | 'scaling' | 'targeting' | 'setup' | 'campaign' | 'expansion' | 'automation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  potentialGain: string;
  actionType: 'neural_automatizador' | 'setup' | 'optimize' | 'expand';
  priority: number;
}

export function AIInsightsTab() {
  const { masterData, connectionError } = useStatus();
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  // Generar recomendaciones IA basadas en datos reales del Master Orchestrator
  useEffect(() => {
    if (!masterData || connectionError) {
      setRecommendations([
        {
          id: 'connect_master',
          type: 'setup',
          title: 'Conectar Master Orchestrator',
          description: 'Conecta al sistema principal para obtener recomendaciones basadas en datos reales',
          impact: 'high',
          potentialGain: 'Acceso a IA real',
          actionType: 'setup',
          priority: 1
        }
      ]);
      return;
    }

    const newRecommendations: AIRecommendation[] = [];

    // 1. RECOMENDACIÓN PRINCIPAL: Neural Automatizador
    if (masterData.platforms?.quintuple_ai?.completion_percentage > 70) {
      newRecommendations.push({
        id: 'neural_automatizador_main',
        type: 'automation',
        title: '🚀 Activar Neural Automatizador - Recomendación Principal',
        description: `Quintuple AI ${masterData.platforms.quintuple_ai.completion_percentage}% completo. Activa la optimización automática 24/7 en todas tus campañas. El Neural Automatizador optimizará presupuestos, audiencias y bids automáticamente.`,
        impact: 'high',
        potentialGain: '+40% Performance Automático',
        actionType: 'neural_automatizador',
        priority: 1
      });
    }

    // 2. Recomendación de primera campaña con Neural Automatizador
    if (masterData.platforms?.meta_ads?.connected && (masterData.platforms.meta_ads.total_campaigns || 0) === 0) {
      newRecommendations.push({
        id: 'first_campaign_neural',
        type: 'campaign',
        title: 'Crear Primera Campaña con Neural Automatizador',
        description: `Cuenta "${masterData.platforms.meta_ads.account_name || 'Meta Ads'}" está conectada y lista. Crea tu primera campaña y activa el Neural Automatizador para optimización automática desde el día 1.`,
        impact: 'high',
        potentialGain: 'Primera campaña + Automatización',
        actionType: 'neural_automatizador',
        priority: 2
      });
    }

    // 3. Optimización Google Ads con Neural
    if (masterData.platforms?.google_ads?.connected) {
      newRecommendations.push({
        id: 'google_neural',
        type: 'optimization',
        title: 'Optimizar Google Ads con Neural Automatizador',
        description: `Customer ID ${masterData.platforms.google_ads.customer_id || 'Connected'} conectado. Configura campañas de búsqueda y activa el Neural Automatizador para bid management automático.`,
        impact: 'high',
        potentialGain: 'Smart Bidding Neural',
        actionType: 'neural_automatizador',
        priority: 3
      });
    }

    // 4. TikTok + Neural Automatizador
    if (masterData.platforms?.tiktok_ads?.connected) {
      newRecommendations.push({
        id: 'tiktok_neural',
        type: 'expansion',
        title: 'Lanzar TikTok Ads con Neural Automatizador',
        description: `TikTok Ads API conectado exitosamente. Perfecto para audiencias Gen Z. Usa el Neural Automatizador para optimizar contenido viral y engagement automáticamente.`,
        impact: 'high',
        potentialGain: 'Audiencia Gen Z + Automatización',
        actionType: 'neural_automatizador',
        priority: 4
      });
    }

    // 5. Expansion a YouTube con Neural
    if (!masterData.platforms?.youtube_ads?.connected) {
      newRecommendations.push({
        id: 'youtube_expansion',
        type: 'expansion',
        title: 'Expandir a YouTube + Neural Automatizador',
        description: 'Conecta YouTube Ads y activa el Neural Automatizador para optimización automática de anuncios de video.',
        impact: 'medium',
        potentialGain: 'Video Marketing Automatizado',
        actionType: 'neural_automatizador',
        priority: 5
      });
    }

    // 6. Cross-platform optimization
    const connectedPlatforms = Object.values(masterData.platforms || {}).filter((p: any) => p?.connected).length;
    if (connectedPlatforms >= 2) {
      newRecommendations.push({
        id: 'cross_platform',
        type: 'optimization',
        title: 'Optimización Cross-Platform con Neural',
        description: `${connectedPlatforms} plataformas conectadas. El Neural Automatizador puede optimizar presupuestos entre plataformas automáticamente para maximizar ROAS global.`,
        impact: 'high',
        potentialGain: 'ROAS Cross-Platform Optimizado',
        actionType: 'neural_automatizador',
        priority: 6
      });
    }

    setRecommendations(newRecommendations.slice(0, 6)); // Top 6 recomendaciones
  }, [masterData, connectionError]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'automation': return <Zap className="w-4 h-4 text-purple-600" />;
      case 'optimization': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'scaling': return <ArrowRight className="w-4 h-4 text-blue-600" />;
      case 'targeting': return <Target className="w-4 h-4 text-purple-600" />;
      case 'setup': return <Settings className="w-4 h-4 text-yellow-600" />;
      case 'campaign': return <Megaphone className="w-4 h-4 text-red-600" />;
      case 'expansion': return <Globe className="w-4 h-4 text-indigo-600" />;
      default: return <Eye className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionButton = (recommendation: AIRecommendation) => {
    if (recommendation.actionType === 'neural_automatizador') {
      return (
        <Link 
          href="/neural-automatizador"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 group"
        >
          <Zap className="w-4 h-4 mr-2" />
          Ir a Neural Automatizador
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      );
    }
    
    return (
      <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
        <Settings className="w-4 h-4 mr-2" />
        Configurar
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Insights IA - Recomendaciones Inteligentes</h2>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Powered by Master Orchestrator</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {recommendations.length} recomendación(es) disponible(s)
        </div>
      </div>

      {/* CTA Principal - Neural Automatizador */}
      {!connectionError && masterData?.platforms?.quintuple_ai?.completion_percentage > 70 && (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">🚀 Neural Automatizador Listo</h3>
                <p className="text-purple-100">
                  Quintuple AI {masterData.platforms.quintuple_ai.completion_percentage}% completo. 
                  Activa la optimización automática 24/7 para todas tus campañas.
                </p>
              </div>
            </div>
            <Link 
              href="/neural-automatizador"
              className="flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <Zap className="w-5 h-5 mr-2" />
              Activar Ahora
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}

      {/* Recomendaciones IA */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-6">
          <Brain className="w-6 h-6 text-purple-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Recomendaciones IA - Basadas en Datos Reales</h3>
          <div className="ml-auto flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <CheckCircle className="w-4 h-4 mr-1" />
            {connectionError ? 'Master Offline' : 'Datos Reales'}
          </div>
        </div>
        
        <div className="grid gap-4">
          {recommendations.map((rec, index) => (
            <div key={rec.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    rec.type === 'automation' ? 'bg-purple-100' :
                    rec.type === 'optimization' ? 'bg-green-100' :
                    rec.type === 'scaling' ? 'bg-blue-100' :
                    rec.type === 'targeting' ? 'bg-purple-100' :
                    rec.type === 'setup' ? 'bg-yellow-100' :
                    rec.type === 'campaign' ? 'bg-red-100' :
                    rec.type === 'expansion' ? 'bg-indigo-100' :
                    'bg-gray-100'
                  }`}>
                    {getTypeIcon(rec.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                    <div className="text-xs text-green-600 mt-1 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Recomendación basada en datos reales del Master Orchestrator
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(rec.impact)}`}>
                    {rec.impact.toUpperCase()}
                  </span>
                  <div className="text-sm font-bold text-green-600 mt-1">{rec.potentialGain}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <Brain className="w-3 h-3 mr-1" />
                  <span>Prioridad #{rec.priority} • Análisis IA basado en datos reales</span>
                </div>
                {getActionButton(rec)}
              </div>
            </div>
          ))}
        </div>

        {/* Sin recomendaciones */}
        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sin recomendaciones disponibles</h3>
            <p className="text-gray-600 mb-4">
              {connectionError 
                ? 'Conecta el Master Orchestrator para obtener recomendaciones IA'
                : 'Configura campañas para recibir insights personalizados'
              }
            </p>
          </div>
        )}
      </div>

      {/* Neural Automatizador Promotion */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                ⚡ Neural Automatizador - Optimización 24/7
                <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">EXCLUSIVO</span>
              </h3>
              <p className="text-gray-600 mt-1">
                Deja que la IA optimice tus campañas automáticamente mientras duermes. 
                Ajusta presupuestos, audiencias y bids en tiempo real para maximizar ROAS.
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1 text-green-500" />
                  Fraud Detection integrado
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-1 text-blue-500" />
                  Optimización en tiempo real
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-1 text-purple-500" />
                  Cross-platform optimization
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Link 
              href="/neural-automatizador"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 group"
            >
              <Zap className="w-5 h-5 mr-2" />
              Comenzar Automatización
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="text-xs text-purple-600 mt-1">
              +40% Performance promedio
            </div>
          </div>
        </div>
      </div>

      {/* Footer con estadísticas */}
      {!connectionError && masterData && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                Master Orchestrator conectado
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1 text-purple-500" />
                {Object.values(masterData.platforms || {}).filter((p: any) => p?.connected).length} plataforma(s) activa(s)
              </div>
              <div className="flex items-center">
                <Brain className="w-4 h-4 mr-1 text-blue-500" />
                Quintuple AI {masterData.platforms?.quintuple_ai?.completion_percentage || 0}% completo
              </div>
            </div>
            <div className="text-purple-600 font-medium">
              {recommendations.filter(r => r.actionType === 'neural_automatizador').length} acciones Neural disponibles
            </div>
          </div>
        </div>
      )}
    </div>
  );
}