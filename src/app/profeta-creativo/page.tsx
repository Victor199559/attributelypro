'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Upload, Eye, Brain, Zap, Target, TrendingUp, 
  ArrowUp, ArrowDown, Play, Download, Share2,
  Image, Video, Type, FileText, Sparkles, Crown,
  CheckCircle, AlertTriangle, Star, Award, Rocket,
  BarChart3, PieChart, LineChart, Activity, Calculator,
  Lightbulb, Flame, ThumbsUp, Users, Globe
} from 'lucide-react';

// Interfaces
interface CreativeFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
  score?: number;
}

interface CombinationPrediction {
  id: string;
  creative: number;
  headline: number;
  copy: number;
  score: number;
  expectedROAS: number;
  confidence: number;
  insights: string[];
  recommendation: 'winner' | 'test' | 'avoid';
}

interface CreativeAnalysis {
  elementType: string;
  performance: number;
  insight: string;
  color: string;
}

export default function ProfetaCreativo() {
  // Estados
  const [creatives, setCreatives] = useState<CreativeFile[]>([]);
  const [headlines, setHeadlines] = useState<string[]>(['', '']);
  const [copies, setCopies] = useState<string[]>(['', '']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [predictions, setPredictions] = useState<CombinationPrediction[]>([]);
  const [topPrediction, setTopPrediction] = useState<CombinationPrediction | null>(null);

  // Simular análisis de IA
  const analyzeCreatives = async () => {
    setIsAnalyzing(true);
    
    // Simular tiempo de procesamiento de IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generar predicciones realistas
    const combinations: CombinationPrediction[] = [];
    let bestScore = 0;
    let bestCombination: CombinationPrediction | null = null;
    
    for (let c = 0; c < Math.min(creatives.length, 3); c++) {
      for (let h = 0; h < 2; h++) {
        for (let copy = 0; copy < 2; copy++) {
          const score = Math.floor(Math.random() * 40) + 60; // 60-100 score
          const combination: CombinationPrediction = {
            id: `${c}-${h}-${copy}`,
            creative: c,
            headline: h,
            copy: copy,
            score: score,
            expectedROAS: (score / 100) * 6 + Math.random() * 2, // 3.6-8.0 ROAS
            confidence: Math.floor(Math.random() * 15) + 85, // 85-100% confidence
            insights: generateInsights(score),
            recommendation: score >= 85 ? 'winner' : score >= 75 ? 'test' : 'avoid'
          };
          
          combinations.push(combination);
          
          if (score > bestScore) {
            bestScore = score;
            bestCombination = combination;
          }
        }
      }
    }
    
    setPredictions(combinations.sort((a, b) => b.score - a.score));
    setTopPrediction(bestCombination);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const generateInsights = (score: number): string[] => {
    const insights = [
      "Los videos superan a las imágenes por 34% en este vertical",
      "Los títulos con urgencia aumentan CTR en 28%", 
      "El copy emocional convierte 41% mejor",
      "Los colores cálidos generan 23% más engagement",
      "Las caras humanas aumentan confianza en 45%",
      "Los textos cortos mejoran legibilidad en 38%",
      "Los call-to-action directos convierten 52% más",
      "Los elementos de escasez impulsan ventas en 29%"
    ];
    
    const numInsights = score >= 90 ? 3 : score >= 80 ? 2 : 1;
    return insights.slice(0, numInsights);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newCreative: CreativeFile = {
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: e.target?.result as string,
            type: file.type.startsWith('video/') ? 'video' : 'image'
          };
          
          setCreatives(prev => [...prev, newCreative].slice(0, 3)); // Máximo 3
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeCreative = (id: string) => {
    setCreatives(prev => prev.filter(c => c.id !== id));
  };

  const updateHeadline = (index: number, value: string) => {
    const newHeadlines = [...headlines];
    newHeadlines[index] = value;
    setHeadlines(newHeadlines);
  };

  const updateCopy = (index: number, value: string) => {
    const newCopies = [...copies];
    newCopies[index] = value;
    setCopies(newCopies);
  };

  const canAnalyze = creatives.length > 0 && headlines.some(h => h.trim()) && copies.some(c => c.trim());

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'winner': return 'bg-green-100 text-green-800 border-green-200';
      case 'test': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'avoid': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'winner': return <Crown className="w-4 h-4" />;
      case 'test': return <Eye className="w-4 h-4" />;
      case 'avoid': return <AlertTriangle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Mystical */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-full">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative text-white text-2xl">🔮</div>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Profeta Creativo
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span className="text-lg text-gray-600 font-medium">Ve los ganadores de mañana, hoy</span>
                <Sparkles className="w-5 h-5 text-pink-500" />
              </div>
            </div>
          </div>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            La primera IA que predice qué combinación de creativos será viral antes de gastar un centavo
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <span>IA Predictiva</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-indigo-500" />
              <span>91% Precisión</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-pink-500" />
              <span>Resultados en 24h</span>
            </div>
          </div>
        </div>

        {!showResults ? (
          <>
            {/* Upload Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Creativos */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Image className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Creativos</h3>
                    <p className="text-sm text-gray-600">Sube hasta 3 imágenes o videos</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {creatives.map((creative, index) => (
                    <div key={creative.id} className="relative group">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                          {creative.type === 'image' ? (
                            <img src={creative.preview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <video src={creative.preview} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            {creative.type === 'video' ? <Video className="w-4 h-4" /> : <Image className="w-4 h-4" />}
                            <span className="font-medium">Creativo {index + 1}</span>
                          </div>
                          <p className="text-sm text-gray-600">{creative.file.name}</p>
                        </div>
                        <button
                          onClick={() => removeCreative(creative.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}

                  {creatives.length < 3 && (
                    <label className="block">
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 cursor-pointer transition-colors">
                        <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-purple-600 font-medium">Haz clic para subir</p>
                        <p className="text-sm text-gray-500">PNG, JPG, MP4 hasta 10MB</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Títulos */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Type className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Títulos</h3>
                    <p className="text-sm text-gray-600">Escribe 2 variaciones de título</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {headlines.map((headline, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título {index + 1}
                      </label>
                      <textarea
                        value={headline}
                        onChange={(e) => updateHeadline(index, e.target.value)}
                        placeholder={`Escribe tu título ${index + 1}...`}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        rows={3}
                      />
                      <div className="mt-1 text-xs text-gray-500">
                        {headline.length}/125 caracteres
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Textos */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <FileText className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Textos</h3>
                    <p className="text-sm text-gray-600">Escribe 2 variaciones de copy</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {copies.map((copy, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Texto {index + 1}
                      </label>
                      <textarea
                        value={copy}
                        onChange={(e) => updateCopy(index, e.target.value)}
                        placeholder={`Escribe tu copy ${index + 1}...`}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
                        rows={4}
                      />
                      <div className="mt-1 text-xs text-gray-500">
                        {copy.length}/300 caracteres
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="text-center">
              <button
                onClick={analyzeCreatives}
                disabled={!canAnalyze || isAnalyzing}
                className={`inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
                  canAnalyze && !isAnalyzing
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Profetizando el futuro...</span>
                  </>
                ) : (
                  <>
                    <div className="text-2xl">🔮</div>
                    <span>Predecir Ganadores</span>
                    <Sparkles className="w-6 h-6" />
                  </>
                )}
              </button>
              
              {!canAnalyze && (
                <p className="mt-3 text-gray-500">
                  Completa al menos 1 creativo, 1 título y 1 texto para continuar
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Results Section */}
            <div className="space-y-8">
              
              {/* Winner Prediction */}
              {topPrediction && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-start space-x-6">
                    <div className="p-4 bg-white/20 rounded-2xl">
                      <Crown className="w-12 h-12" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <h2 className="text-3xl font-bold">¡Ganador Predicho!</h2>
                        <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                          Combinación #{topPrediction.id}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold">{topPrediction.score}</div>
                          <div className="text-lg opacity-90">Score de IA</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold">{topPrediction.expectedROAS.toFixed(1)}x</div>
                          <div className="text-lg opacity-90">ROAS Esperado</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold">{topPrediction.confidence}%</div>
                          <div className="text-lg opacity-90">Confianza</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold">Insights del Profeta:</h4>
                        {topPrediction.insights.map((insight, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Lightbulb className="w-5 h-5" />
                            <span>{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2">
                        <Rocket className="w-5 h-5" />
                        <span>Lanzar Ahora</span>
                      </button>
                      <button className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors flex items-center space-x-2">
                        <Download className="w-5 h-5" />
                        <span>Exportar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* All Predictions */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Todas las Predicciones</h3>
                  <div className="text-sm text-gray-600">
                    {predictions.length} combinaciones analizadas
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {predictions.map((prediction, index) => (
                    <div key={prediction.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold">#{index + 1}</span>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(prediction.recommendation)}`}>
                            <div className="flex items-center space-x-1">
                              {getRecommendationIcon(prediction.recommendation)}
                              <span className="capitalize">{prediction.recommendation}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                          {prediction.score}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">ROAS Esperado</span>
                          <span className="font-medium">{prediction.expectedROAS.toFixed(1)}x</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Confianza</span>
                          <span className="font-medium">{prediction.confidence}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Combinación</span>
                          <span className="font-medium">C{prediction.creative + 1}-T{prediction.headline + 1}-Tx{prediction.copy + 1}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500 space-y-1">
                          {prediction.insights.slice(0, 2).map((insight, idx) => (
                            <div key={idx} className="flex items-start space-x-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Center */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Centro de Acción</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button className="flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all">
                    <Rocket className="w-5 h-5" />
                    <span>Lanzar Ganadores</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-6 py-4 bg-white border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 transition-colors">
                    <BarChart3 className="w-5 h-5" />
                    <span>Ver Análisis</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-6 py-4 bg-white border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Exportar Todo</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-6 py-4 bg-white border-2 border-pink-200 text-pink-600 rounded-xl hover:bg-pink-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Compartir</span>
                  </button>
                </div>
              </div>

              {/* New Analysis Button */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setCreatives([]);
                    setHeadlines(['', '']);
                    setCopies(['', '']);
                    setPredictions([]);
                    setTopPrediction(null);
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 text-purple-600 hover:text-purple-700 font-medium"
                >
                  <div className="text-xl">🔮</div>
                  <span>Nuevo Análisis Profético</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Back to Dashboard */}
        <div className="text-center pt-8 border-t border-purple-200">
          <Link 
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <span>← Volver al Dashboard</span>
          </Link>
        </div>

      </div>
    </div>
  );
}