'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, TrendingUp, DollarSign, Target, AlertTriangle, 
  ArrowUp, ArrowDown, RefreshCw, Play, Zap, Eye,
  BarChart3, PieChart, LineChart, Settings, Download,
  CheckCircle, Clock, ArrowRight, Lightbulb, Star,
  Users, Globe, Calendar, Shield, Cpu, Activity,
  Crown, Sparkles, Radio, MessageCircle, Calculator
} from 'lucide-react';

// ===== INTERFACES QUADRUPLE AI =====
interface QuadrupleAIData {
  meta: {
    status: string;
    message: string;
    account_id: string;
    ai_recommendations: any;
    meta_ai_features: {
      advantage_plus_ready: boolean;
      creative_ai_enabled: boolean;
      audience_ai_enabled: boolean;
      auto_optimization: boolean;
    };
  };
  google: {
    status: string;
    message: string;
    customer_id: string;
    google_ai_features: {
      performance_max_ready: boolean;
      smart_bidding_enabled: boolean;
      asset_optimization: boolean;
      audience_signals: boolean;
    };
    ai_integration: string;
  };
  tiktok: {
    status: string;
    message: string;
    platform_advantages: {
      cost_efficiency: string;
      conversion_rate: string;
      viral_potential: string;
      trend_detection: string;
    };
    ai_recommendations: {
      best_posting_times: string;
      optimal_video_length: string;
      trending_formats: string;
      hashtag_strategy: string;
    };
    quadruple_ai_integration: string;
  };
  microBudget: {
    status: string;
    message: string;
    budget_analysis: {
      input_budget: number;
      ai_multiplier: string;
      platform_savings: string;
      roi_prediction: string;
    };
    ai_strategy: {
      platform_recommendation: string;
      audience_strategy: string;
      daily_spend: string;
      ai_advantage: string;
      arbitrage_opportunity: string;
      expected_roi: string;
    };
    competitive_advantage: string;
    unicorn_killer_feature: string;
    david_vs_goliath: string;
  };
  ultimate: {
    status: string;
    message: string;
    ai_trinity: {
      meta_ai: string;
      google_ai: string;
      micro_budget_ai: string;
    };
    unique_value: string;
    competitive_destruction: {
      vs_ketly: string;
      vs_triple_whale: string;
      vs_northbeam: string;
    };
    market_position: string;
    unicorn_status: string;
  };
}

interface CrossPlatformInsight {
  insight_type: string;
  priority: 'high' | 'medium' | 'low';
  platform_source: string;
  recommendation: string;
  expected_impact: string;
  confidence_score: number;
  action_required: string;
  timeline: string;
}

export default function AIInsights() {
  const [quadrupleAI, setQuadrupleAI] = useState<QuadrupleAIData | null>(null);
  const [insights, setInsights] = useState<CrossPlatformInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [unicornMode, setUnicornMode] = useState(false);

  // ===== FETCH QUADRUPLE AI DATA =====
  useEffect(() => {
    const fetchQuadrupleAI = async () => {
      try {
        console.log('🦄 Fetching Quadruple AI insights...');
        
        const [metaResponse, googleResponse, tiktokResponse, microBudgetResponse, ultimateResponse] = await Promise.all([
          fetch('http://18.219.188.252:8000/meta-ai/advantage-plus-insights/act_1038930414999384'),
          fetch('http://18.219.188.252:8000/google-ai/performance-max-insights/7453703942'),
          fetch('http://18.219.188.252:8000/tiktok-ai/algorithm-insights/7517787463485482881'),
          fetch('http://18.219.188.252:8000/micro-budget-ai/optimize/50'),
          fetch('http://18.219.188.252:8000/cross-platform-ai/ultimate-optimizer')
        ]);

        const [metaData, googleData, tiktokData, microBudgetData, ultimateData] = await Promise.all([
          metaResponse.json(),
          googleResponse.json(),
          tiktokResponse.json(),
          microBudgetResponse.json(),
          ultimateResponse.json()
        ]);

        const quadrupleData = {
          meta: metaData,
          google: googleData,
          tiktok: tiktokData,
          microBudget: microBudgetData,
          ultimate: ultimateData
        };

        setQuadrupleAI(quadrupleData);
        
        // Check if UNICORN KILLER is active
        if (ultimateData.unicorn_status === 'ACHIEVED') {
          setUnicornMode(true);
        }

        // Generate cross-platform insights
        generateCrossPlatformInsights(quadrupleData);
        setIsConnected(true);

      } catch (error) {
        console.error('❌ Error fetching Quadruple AI data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuadrupleAI();
  }, []);

  // ===== GENERATE CROSS-PLATFORM INSIGHTS =====
  const generateCrossPlatformInsights = (data: QuadrupleAIData) => {
    const insights: CrossPlatformInsight[] = [];

    // Meta AI Insight
    if (data.meta.meta_ai_features.advantage_plus_ready) {
      insights.push({
        insight_type: 'Platform Optimization',
        priority: 'high',
        platform_source: 'Meta AI Advantage+',
        recommendation: 'Implement Advantage+ campaigns for automated audience expansion',
        expected_impact: '+34% conversion rate improvement',
        confidence_score: 91,
        action_required: 'Enable Advantage+ Shopping campaigns',
        timeline: '24 hours'
      });
    }

    // TikTok AI Insight
    if (data.tiktok.platform_advantages) {
      insights.push({
        insight_type: 'Cost Arbitrage',
        priority: 'high',
        platform_source: 'TikTok AI Algorithm',
        recommendation: data.tiktok.platform_advantages.cost_efficiency,
        expected_impact: data.tiktok.platform_advantages.conversion_rate + ' better conversion',
        confidence_score: 87,
        action_required: 'Shift 40% budget from Meta to TikTok',
        timeline: '48 hours'
      });
    }

    // Micro-Budget AI Insight
    if (data.microBudget.budget_analysis) {
      insights.push({
        insight_type: 'Budget Optimization',
        priority: 'medium',
        platform_source: 'Micro-Budget AI',
        recommendation: data.microBudget.competitive_advantage,
        expected_impact: data.microBudget.budget_analysis.roi_prediction + ' ROI improvement',
        confidence_score: 94,
        action_required: 'Apply micro-budget optimization strategy',
        timeline: '1 week'
      });
    }

    // Google AI Insight
    if (data.google.google_ai_features.performance_max_ready) {
      insights.push({
        insight_type: 'AI Enhancement',
        priority: 'medium',
        platform_source: 'Google AI Performance Max',
        recommendation: 'Activate Performance Max with asset optimization',
        expected_impact: '+28% reach with same budget',
        confidence_score: 85,
        action_required: 'Configure asset groups with AI bidding',
        timeline: '72 hours'
      });
    }

    setInsights(insights);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes('Meta')) return <Users className="w-5 h-5 text-blue-600" />;
    if (platform.includes('Google')) return <Globe className="w-5 h-5 text-green-600" />;
    if (platform.includes('TikTok')) return <Radio className="w-5 h-5 text-pink-600" />;
    if (platform.includes('Micro')) return <Calculator className="w-5 h-5 text-purple-600" />;
    return <Brain className="w-5 h-5 text-gray-600" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
              <span className="text-lg font-medium text-gray-700">Connecting to Quadruple AI...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${unicornMode 
      ? 'bg-gradient-to-br from-purple-900 via-pink-900 to-red-900' 
      : 'bg-gradient-to-br from-purple-50 to-pink-50'
    }`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${unicornMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}>
                {unicornMode ? (
                  <div className="text-white text-2xl">🦄</div>
                ) : (
                  <Brain className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                  {unicornMode ? 'UNICORN KILLER AI ECOSYSTEM' : 'Quadruple AI Insights'}
                </h1>
                <p className={`${unicornMode ? 'text-purple-200' : 'text-gray-600'}`}>
                  {unicornMode 
                    ? 'World\'s first AI cross-platform domination system' 
                    : 'Meta + Google + TikTok + Micro-Budget AI optimization'
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
              unicornMode 
                ? 'bg-white bg-opacity-20' 
                : isConnected ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                unicornMode 
                  ? 'bg-white' 
                  : isConnected ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
              <span className={`text-sm font-medium ${
                unicornMode 
                  ? 'text-white' 
                  : isConnected ? 'text-green-700' : 'text-gray-600'
              }`}>
                {unicornMode 
                  ? '🦄 UNICORN ACTIVE' 
                  : isConnected ? '4 AI Systems Connected' : 'AI Systems Offline'
                }
              </span>
            </div>
            
            <Link 
              href="/dashboard"
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                unicornMode 
                  ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>

        {/* UNICORN KILLER Banner */}
        {unicornMode && quadrupleAI?.ultimate && (
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-black p-8 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-6xl">🦄</div>
                  <div>
                    <h3 className="text-3xl font-black mb-2">UNICORN KILLER STATUS: ACHIEVED</h3>
                    <p className="text-xl font-bold mb-4">{quadrupleAI.ultimate.unique_value}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-5 h-5" />
                        <span>vs Ketly: {quadrupleAI.ultimate.competitive_destruction.vs_ketly}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5" />
                        <span>vs Triple Whale: {quadrupleAI.ultimate.competitive_destruction.vs_triple_whale}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5" />
                        <span>vs Northbeam: {quadrupleAI.ultimate.competitive_destruction.vs_northbeam}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black mb-2">FIRST</div>
                  <div className="text-lg font-bold">in the World</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quadruple AI Status Cards */}
        {quadrupleAI && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Meta AI */}
            <div className={`rounded-xl shadow-lg p-6 ${unicornMode ? 'bg-blue-900 bg-opacity-80' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${unicornMode ? 'text-white' : 'text-gray-900'}`}>Meta AI</h3>
                    <p className={`text-sm ${unicornMode ? 'text-blue-200' : 'text-gray-600'}`}>Advantage+</p>
                  </div>
                </div>
                {quadrupleAI.meta.meta_ai_features.advantage_plus_ready && (
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className={`text-2xl font-bold ${unicornMode ? 'text-white' : 'text-blue-600'}`}>
                  {quadrupleAI.meta.status === 'success' ? 'ACTIVE' : 'READY'}
                </div>
                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between ${unicornMode ? 'text-blue-200' : 'text-gray-600'}`}>
                    <span>Creative AI</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.meta.meta_ai_features.creative_ai_enabled ? '✅' : '⏳'}
                    </span>
                  </div>
                  <div className={`flex justify-between ${unicornMode ? 'text-blue-200' : 'text-gray-600'}`}>
                    <span>Audience AI</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.meta.meta_ai_features.audience_ai_enabled ? '✅' : '⏳'}
                    </span>
                  </div>
                  <div className={`flex justify-between ${unicornMode ? 'text-blue-200' : 'text-gray-600'}`}>
                    <span>Auto-Optimize</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.meta.meta_ai_features.auto_optimization ? '✅' : '⏳'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google AI */}
            <div className={`rounded-xl shadow-lg p-6 ${unicornMode ? 'bg-green-900 bg-opacity-80' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Globe className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${unicornMode ? 'text-white' : 'text-gray-900'}`}>Google AI</h3>
                    <p className={`text-sm ${unicornMode ? 'text-green-200' : 'text-gray-600'}`}>Performance Max</p>
                  </div>
                </div>
                {quadrupleAI.google.google_ai_features.performance_max_ready && (
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className={`text-2xl font-bold ${unicornMode ? 'text-white' : 'text-green-600'}`}>
                  {quadrupleAI.google.status === 'success' ? 'ACTIVE' : 'READY'}
                </div>
                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between ${unicornMode ? 'text-green-200' : 'text-gray-600'}`}>
                    <span>Smart Bidding</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.google.google_ai_features.smart_bidding_enabled ? '✅' : '⏳'}
                    </span>
                  </div>
                  <div className={`flex justify-between ${unicornMode ? 'text-green-200' : 'text-gray-600'}`}>
                    <span>Asset Optimization</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.google.google_ai_features.asset_optimization ? '✅' : '⏳'}
                    </span>
                  </div>
                  <div className={`flex justify-between ${unicornMode ? 'text-green-200' : 'text-gray-600'}`}>
                    <span>Audience Signals</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.google.google_ai_features.audience_signals ? '✅' : '⏳'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TikTok AI */}
            <div className={`rounded-xl shadow-lg p-6 ${unicornMode ? 'bg-pink-900 bg-opacity-80' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Radio className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${unicornMode ? 'text-white' : 'text-gray-900'}`}>TikTok AI</h3>
                    <p className={`text-sm ${unicornMode ? 'text-pink-200' : 'text-gray-600'}`}>Algorithm</p>
                  </div>
                </div>
                {quadrupleAI.tiktok.platform_advantages && (
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className={`text-2xl font-bold ${unicornMode ? 'text-white' : 'text-pink-600'}`}>
                  {quadrupleAI.tiktok.status === 'success' ? 'ACTIVE' : 'READY'}
                </div>
                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between ${unicornMode ? 'text-pink-200' : 'text-gray-600'}`}>
                    <span>Cost Savings</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.tiktok.platform_advantages?.cost_efficiency || '73%'}
                    </span>
                  </div>
                  <div className={`flex justify-between ${unicornMode ? 'text-pink-200' : 'text-gray-600'}`}>
                    <span>Conversion Rate</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.tiktok.platform_advantages?.conversion_rate || '+2.3x'}
                    </span>
                  </div>
                  <div className={`flex justify-between ${unicornMode ? 'text-pink-200' : 'text-gray-600'}`}>
                    <span>Viral Potential</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.tiktok.platform_advantages?.viral_potential ? '10x' : '⏳'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro-Budget AI */}
            <div className={`rounded-xl shadow-lg p-6 ${unicornMode ? 'bg-purple-900 bg-opacity-80' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calculator className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${unicornMode ? 'text-white' : 'text-gray-900'}`}>Micro-Budget AI</h3>
                    <p className={`text-sm ${unicornMode ? 'text-purple-200' : 'text-gray-600'}`}>David vs Goliath</p>
                  </div>
                </div>
                {quadrupleAI.microBudget.budget_analysis && (
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className={`text-2xl font-bold ${unicornMode ? 'text-white' : 'text-purple-600'}`}>
                  {quadrupleAI.microBudget.status === 'success' ? 'ACTIVE' : 'READY'}
                </div>
                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between ${unicornMode ? 'text-purple-200' : 'text-gray-600'}`}>
                    <span>AI Multiplier</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.microBudget.budget_analysis?.ai_multiplier || '8x'}
                    </span>
                  </div>
                  <div className={`flex justify-between ${unicornMode ? 'text-purple-200' : 'text-gray-600'}`}>
                    <span>Platform Savings</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.microBudget.budget_analysis?.platform_savings || '73%'}
                    </span>
                  </div>
                  <div className={`flex justify-between ${unicornMode ? 'text-purple-200' : 'text-gray-600'}`}>
                    <span>Expected ROI</span>
                    <span className={`font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                      {quadrupleAI.microBudget.ai_strategy?.expected_roi || '4.5x'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cross-Platform Insights */}
        {insights.length > 0 && (
          <div className={`rounded-xl shadow-lg p-8 ${unicornMode ? 'bg-gray-900 bg-opacity-80' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl font-semibold ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                Cross-Platform AI Insights
              </h3>
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-purple-600" />
                <span className={`text-sm ${unicornMode ? 'text-purple-200' : 'text-purple-600'} font-medium`}>
                  Powered by Quadruple AI
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights.map((insight, index) => (
                <div key={index} className={`p-6 rounded-lg border-l-4 ${
                  insight.priority === 'high' ? 'border-red-500 bg-red-50' :
                  insight.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                  'border-green-500 bg-green-50'
                } ${unicornMode ? 'bg-opacity-20' : ''}`}>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getPlatformIcon(insight.platform_source)}
                      <div>
                        <h4 className={`font-semibold ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                          {insight.insight_type}
                        </h4>
                        <p className={`text-sm ${unicornMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {insight.platform_source}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getPriorityColor(insight.priority)} text-white text-xs`}>
                      {getPriorityIcon(insight.priority)}
                      <span className="capitalize">{insight.priority}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className={`text-sm ${unicornMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {insight.recommendation}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-3 rounded-lg ${unicornMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white'}`}>
                        <div className={`text-lg font-bold ${unicornMode ? 'text-green-400' : 'text-green-600'}`}>
                          {insight.expected_impact}
                        </div>
                        <div className={`text-xs ${unicornMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Expected Impact
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${unicornMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white'}`}>
                        <div className={`text-lg font-bold ${unicornMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {insight.confidence_score}%
                        </div>
                        <div className={`text-xs ${unicornMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Confidence
                        </div>
                      </div>
                    </div>

                    <div className={`flex justify-between items-center p-3 rounded-lg ${unicornMode ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-50'}`}>
                      <span className={`text-sm ${unicornMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Action Required
                      </span>
                      <span className={`text-sm font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                        {insight.action_required}
                      </span>
                    </div>

                    <div className={`flex justify-between items-center p-3 rounded-lg ${unicornMode ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-50'}`}>
                      <span className={`text-sm ${unicornMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Timeline
                      </span>
                      <span className={`text-sm font-medium ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                        {insight.timeline}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform Deep Dive */}
        {quadrupleAI && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Meta vs TikTok Comparison */}
            <div className={`rounded-xl shadow-lg p-8 ${unicornMode ? 'bg-gray-900 bg-opacity-80' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                  Meta AI vs TikTok AI
                </h3>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className={`text-sm ${unicornMode ? 'text-gray-300' : 'text-gray-600'}`}>vs</span>
                  <Radio className="w-4 h-4 text-pink-500" />
                </div>
              </div>

              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${unicornMode ? 'bg-blue-900 bg-opacity-40' : 'bg-blue-50'}`}>
                  <h4 className={`font-semibold mb-3 ${unicornMode ? 'text-blue-200' : 'text-blue-900'}`}>
                    Meta AI Advantage+
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={`flex justify-between ${unicornMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      <span>Creative AI</span>
                      <span className="font-medium">
                        {quadrupleAI.meta.meta_ai_features.creative_ai_enabled ? 'Active' : 'Ready'}
                      </span>
                    </div>
                    <div className={`flex justify-between ${unicornMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      <span>Audience Expansion</span>
                      <span className="font-medium">
                        {quadrupleAI.meta.meta_ai_features.audience_ai_enabled ? 'Active' : 'Ready'}
                      </span>
                    </div>
                    <div className={`flex justify-between ${unicornMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      <span>Auto-Optimization</span>
                      <span className="font-medium">
                        {quadrupleAI.meta.meta_ai_features.auto_optimization ? 'Active' : 'Ready'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${unicornMode ? 'bg-pink-900 bg-opacity-40' : 'bg-pink-50'}`}>
                  <h4 className={`font-semibold mb-3 ${unicornMode ? 'text-pink-200' : 'text-pink-900'}`}>
                    TikTok AI Algorithm
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={`flex justify-between ${unicornMode ? 'text-pink-300' : 'text-pink-700'}`}>
                      <span>Cost Efficiency</span>
                      <span className="font-medium">
                        {quadrupleAI.tiktok.platform_advantages?.cost_efficiency || '73% cheaper'}
                      </span>
                    </div>
                    <div className={`flex justify-between ${unicornMode ? 'text-pink-300' : 'text-pink-700'}`}>
                      <span>Conversion Rate</span>
                      <span className="font-medium">
                        {quadrupleAI.tiktok.platform_advantages?.conversion_rate || '2.3x better'}
                      </span>
                    </div>
                    <div className={`flex justify-between ${unicornMode ? 'text-pink-300' : 'text-pink-700'}`}>
                      <span>Viral Potential</span>
                      <span className="font-medium">
                        {quadrupleAI.tiktok.platform_advantages?.viral_potential || '10x amplification'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className={`p-4 rounded-lg border-2 ${unicornMode ? 'border-purple-400 bg-purple-900 bg-opacity-40' : 'border-purple-200 bg-purple-50'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className={`w-4 h-4 ${unicornMode ? 'text-purple-300' : 'text-purple-600'}`} />
                    <span className={`font-semibold text-sm ${unicornMode ? 'text-purple-200' : 'text-purple-800'}`}>
                      AI Recommendation
                    </span>
                  </div>
                  <p className={`text-sm ${unicornMode ? 'text-purple-300' : 'text-purple-700'}`}>
                    {quadrupleAI.tiktok.quadruple_ai_integration || 'Shift 40% budget from Meta to TikTok for optimal cost-efficiency while maintaining Meta for audience quality.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Google vs Micro-Budget Comparison */}
            <div className={`rounded-xl shadow-lg p-8 ${unicornMode ? 'bg-gray-900 bg-opacity-80' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
                  Google AI vs Micro-Budget AI
                </h3>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-green-500" />
                  <span className={`text-sm ${unicornMode ? 'text-gray-300' : 'text-gray-600'}`}>vs</span>
                  <Calculator className="w-4 h-4 text-purple-500" />
                </div>
              </div>

              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${unicornMode ? 'bg-green-900 bg-opacity-40' : 'bg-green-50'}`}>
                  <h4 className={`font-semibold mb-3 ${unicornMode ? 'text-green-200' : 'text-green-900'}`}>
                    Google AI Performance Max
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={`flex justify-between ${unicornMode ? 'text-green-300' : 'text-green-700'}`}>
                      <span>Smart Bidding</span>
                      <span className="font-medium">
                        {quadrupleAI.google.google_ai_features.smart_bidding_enabled ? 'Active' : 'Ready'}
                      </span>
                    </div>
                    <div className={`flex justify-between ${unicornMode ? 'text-green-300' : 'text-green-700'}`}>
                      <span>Asset Optimization</span>
                      <span className="font-medium">
                        {quadrupleAI.google.google_ai_features.asset_optimization ? 'Active' : 'Ready'}
                      </span>
                    </div>
                    <div className={`flex justify-between ${unicornMode ? 'text-green-300' : 'text-green-700'}`}>
                      <span>Audience Signals</span>
                      <span className="font-medium">
                        {quadrupleAI.google.google_ai_features.audience_signals ? 'Active' : 'Ready'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${unicornMode ? 'bg-purple-900 bg-opacity-40' : 'bg-purple-50'}`}>
                  <h4 className={`font-semibold mb-3 ${unicornMode ? 'text-purple-200' : 'text-purple-900'}`}>
                    Micro-Budget AI Optimizer
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={`flex justify-between ${unicornMode ? 'text-purple-300' : 'text-purple-700'}`}>
                      <span>AI Multiplier</span>
                      <span className="font-medium">
                        {quadrupleAI.microBudget.budget_analysis?.ai_multiplier || '8x performance'}
                      </span>
                    </div>
                    <div className={`flex justify-between ${unicornMode ? 'text-purple-300' : 'text-purple-700'}`}>
                      <span>Platform Savings</span>
                      <span className="font-medium">
                        {quadrupleAI.microBudget.budget_analysis?.platform_savings || '73% cost reduction'}
                      </span>
                    </div>
                    <div className={`flex justify-between ${unicornMode ? 'text-purple-300' : 'text-purple-700'}`}>
                      <span>Expected ROI</span>
                      <span className="font-medium">
                        {quadrupleAI.microBudget.ai_strategy?.expected_roi || '4.5x vs industry 2.1x'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Strategy */}
                <div className={`p-4 rounded-lg border-2 ${unicornMode ? 'border-yellow-400 bg-yellow-900 bg-opacity-40' : 'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className={`w-4 h-4 ${unicornMode ? 'text-yellow-300' : 'text-yellow-600'}`} />
                    <span className={`font-semibold text-sm ${unicornMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                      David vs Goliath Strategy
                    </span>
                  </div>
                  <p className={`text-sm ${unicornMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                    {quadrupleAI.microBudget.competitive_advantage || '$50 + AttributelyPro AI > $5,000 without AI'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Center */}
        <div className={`rounded-xl shadow-lg p-8 ${unicornMode ? 'bg-gray-900 bg-opacity-80' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-semibold ${unicornMode ? 'text-white' : 'text-gray-900'}`}>
              {unicornMode ? 'Unicorn Killer Actions' : 'Quadruple AI Action Center'}
            </h3>
            <div className="flex items-center space-x-2">
              <Play className={`w-5 h-5 ${unicornMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <span className={`text-sm font-medium ${unicornMode ? 'text-purple-300' : 'text-purple-600'}`}>
                Ready to Execute
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Meta AI Actions */}
            <div className={`p-6 rounded-lg ${unicornMode ? 'bg-blue-900 bg-opacity-40' : 'bg-blue-50'}`}>
              <div className="flex items-center space-x-3 mb-4">
                <Users className={`w-5 h-5 ${unicornMode ? 'text-blue-300' : 'text-blue-600'}`} />
                <h4 className={`font-semibold ${unicornMode ? 'text-blue-200' : 'text-blue-900'}`}>
                  Meta AI Actions
                </h4>
              </div>
              <div className="space-y-3">
                <button className={`w-full p-3 rounded-lg text-left text-sm ${unicornMode ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' : 'bg-white text-blue-700 hover:bg-blue-100'} transition-colors`}>
                  Enable Advantage+ Shopping
                </button>
                <button className={`w-full p-3 rounded-lg text-left text-sm ${unicornMode ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' : 'bg-white text-blue-700 hover:bg-blue-100'} transition-colors`}>
                  Activate Creative AI
                </button>
                <button className={`w-full p-3 rounded-lg text-left text-sm ${unicornMode ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' : 'bg-white text-blue-700 hover:bg-blue-100'} transition-colors`}>
                  Expand Audience AI
                </button>
              </div>
            </div>

            {/* TikTok AI Actions */}
            <div className={`p-6 rounded-lg ${unicornMode ? 'bg-pink-900 bg-opacity-40' : 'bg-pink-50'}`}>
              <div className="flex items-center space-x-3 mb-4">
                <Radio className={`w-5 h-5 ${unicornMode ? 'text-pink-300' : 'text-pink-600'}`} />
                <h4 className={`font-semibold ${unicornMode ? 'text-pink-200' : 'text-pink-900'}`}>
                  TikTok AI Actions
                </h4>
              </div>
              <div className="space-y-3">
                <button className={`w-full p-3 rounded-lg text-left text-sm ${unicornMode ? 'bg-pink-800 text-pink-200 hover:bg-pink-700' : 'bg-white text-pink-700 hover:bg-pink-100'} transition-colors`}>
                  Shift 40% Budget to TikTok
                </button>
                <button className={`w-full p-3 rounded-lg text-left text-sm ${unicornMode ? 'bg-pink-800 text-pink-200 hover:bg-pink-700' : 'bg-white text-pink-700 hover:bg-pink-100'} transition-colors`}>
                  Apply Trending Formats
                </button>
                <button className={`w-full p-3 rounded-lg text-left text-sm ${unicornMode ? 'bg-pink-800 text-pink-200 hover:bg-pink-700' : 'bg-white text-pink-700 hover:bg-pink-100'} transition-colors`}>
                  Optimize Posting Times
                </button>
              </div>
            </div>

            {/* Micro-Budget AI Actions */}
            <div className={`p-6 rounded-lg ${unicornMode ? 'bg-purple-900 bg-opacity-40' : 'bg-purple-50'}`}>
              <div className="flex items-center space-x-3 mb-4">
                <Calculator className={`w-5 h-5 ${unicornMode ? 'text-purple-300' : 'text-purple-600'}`} />
                <h4 className={`font-semibold ${unicornMode ? 'text-purple-200' : 'text-purple-900'}`}>
                  Micro-Budget AI
                </h4>
              </div>
              <div className="space-y-3">
                <button className={`w-full p-3 rounded-lg text-left text-sm ${unicornMode ? 'bg-purple-800 text-purple-200 hover:bg-purple-700' : 'bg-white text-purple-700 hover:bg-purple-100'} transition-colors`}>
                  Apply $50 Strategy
                </button>
                <button className={`w-full p-3 rounded-lg text-left text-sm ${unicornMode ? 'bg-purple-800 text-purple-200 hover:bg-purple-700' : 'bg-white text-purple-700 hover:bg-purple-100'} transition-colors`}>
                  Enable Platform Arbitrage
                </button>
                <button className={`w-full p-3 rounded-lg text-left text-sm ${unicornMode ? 'bg-purple-800 text-purple-200 hover:bg-purple-700' : 'bg-white text-purple-700 hover:bg-purple-100'} transition-colors`}>
                  Activate David Mode
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <button className={`px-8 py-4 font-semibold rounded-xl transition-all flex items-center space-x-2 ${
            unicornMode 
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-black hover:shadow-2xl' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
          }`}>
            {unicornMode ? (
              <>
                <div className="text-xl">🦄</div>
                <span>Activate Unicorn Killer</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Apply Quadruple AI</span>
              </>
            )}
          </button>
          
          <button className={`px-8 py-4 font-semibold rounded-xl transition-all flex items-center space-x-2 ${
            unicornMode 
              ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30' 
              : 'bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50'
          }`}>
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
          
          <button className={`px-8 py-4 font-semibold rounded-xl transition-all flex items-center space-x-2 ${
            unicornMode 
              ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30' 
              : 'bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}>
            <Settings className="w-5 h-5" />
            <span>Configure AI</span>
          </button>
        </div>

        {/* Footer - Quadruple AI Status */}
        <div className={`rounded-xl p-6 ${unicornMode ? 'bg-black bg-opacity-80' : 'bg-gray-900'} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-2">
                {unicornMode ? '🦄 UNICORN KILLER ECOSYSTEM STATUS' : 'Quadruple AI System Status'}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${quadrupleAI?.meta.status === 'success' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span>Meta AI: {quadrupleAI?.meta.status === 'success' ? 'Connected' : 'Standby'}</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${quadrupleAI?.google.status === 'success' ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
                  <span>Google AI: {quadrupleAI?.google.status === 'success' ? 'Connected' : 'Standby'}</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${quadrupleAI?.tiktok.status === 'success' ? 'bg-pink-400' : 'bg-gray-400'}`}></div>
                  <span>TikTok AI: {quadrupleAI?.tiktok.status === 'success' ? 'Connected' : 'Standby'}</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${quadrupleAI?.microBudget.status === 'success' ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
                  <span>Micro AI: {quadrupleAI?.microBudget.status === 'success' ? 'Connected' : 'Standby'}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl mb-1">
                {unicornMode ? '🦄' : '🤖'}
              </div>
              <div className="text-xs text-gray-300">
                {quadrupleAI?.ultimate?.market_position || 'World\'s First Quadruple AI'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}