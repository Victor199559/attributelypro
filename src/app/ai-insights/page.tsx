'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, TrendingUp, DollarSign, Target, AlertTriangle, 
  ArrowUp, ArrowDown, RefreshCw, Play, Zap, Eye,
  BarChart3, PieChart, LineChart, Settings, Download,
  CheckCircle, Clock, ArrowRight, Lightbulb, Star,
  Users, Globe, Calendar, Shield, Cpu, Activity
} from 'lucide-react';

// Interfaces
interface AIRecommendation {
  status: string;
  timestamp: string;
  prediction_model: string;
  data_sources: string[];
  current_performance: {
    meta_ads: {
      monthly_spend: number;
      roas: number;
      conversions: number;
      percent_of_budget: number;
    };
    google_ads: {
      monthly_spend: number;
      roas: number;
      conversions: number;
      percent_of_budget: number;
    };
  };
  ai_recommendation: {
    optimal_distribution: {
      meta_ads: string;
      google_ads: string;
    };
    expected_improvement: {
      roi_lift: string;
      additional_revenue: string;
      confidence_score: number;
    };
    reasoning: string;
    action_required: string;
    urgency: string;
  };
  next_actions: string[];
  advanced_insights: {
    seasonal_factors: string;
    audience_overlap: string;
    creative_performance: string;
    attribution_model: string;
  };
}

interface PlatformComparison {
  status: string;
  comparison_date: string;
  platforms: {
    meta_ads: any;
    google_ads: any;
  };
  ai_recommendations: {
    primary_platform: string;
    budget_allocation: {
      meta_ads: string;
      google_ads: string;
    };
    testing_strategy: string[];
    next_quarter_strategy: string;
  };
}

export default function AIInsights() {
  const [aiData, setAiData] = useState<AIRecommendation | null>(null);
  const [platformData, setPlatformData] = useState<PlatformComparison | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchAIInsights = async () => {
      try {
        console.log('🤖 Fetching AI insights...');
        
        // Fetch AI Predictor data
        const aiResponse = await fetch('http://18.219.188.252/ai-predictor/cross-platform-advanced');
        if (aiResponse.ok) {
          const aiResult = await aiResponse.json();
          console.log('✅ AI Predictor data:', aiResult);
          setAiData(aiResult);
        }

        // Fetch Platform Comparison data
        const platformResponse = await fetch('http://18.219.188.252/ai-insights/platform-comparison');
        if (platformResponse.ok) {
          const platformResult = await platformResponse.json();
          console.log('✅ Platform comparison data:', platformResult);
          setPlatformData(platformResult);
        }

        setIsConnected(true);
      } catch (error) {
        console.error('❌ Error fetching AI insights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAIInsights();
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
              <span className="text-lg font-medium text-gray-700">Loading AI Insights...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI-Powered Insights</h1>
                <p className="text-gray-600">Cross-platform optimization powered by machine learning</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className={`text-sm font-medium ${isConnected ? 'text-green-700' : 'text-gray-600'}`}>
                {isConnected ? 'AI Model Active' : 'AI Model Offline'}
              </span>
            </div>
            
            <Link 
              href="/dashboard"
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>

        {/* AI Alert Banner */}
        {aiData && aiData.ai_recommendation.urgency === 'high' && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">High-Priority Optimization Detected</h3>
                <p className="text-lg mb-4">{aiData.ai_recommendation.action_required}</p>
                <div className="flex items-center space-x-6">
                  <div className="text-sm">
                    <div className="font-semibold">Expected Gain</div>
                    <div className="text-2xl font-bold">{aiData.ai_recommendation.expected_improvement.additional_revenue}</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">ROI Lift</div>
                    <div className="text-2xl font-bold">{aiData.ai_recommendation.expected_improvement.roi_lift}</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">Confidence</div>
                    <div className="text-2xl font-bold">{aiData.ai_recommendation.expected_improvement.confidence_score}%</div>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Apply Recommendation
              </button>
            </div>
          </div>
        )}

        {/* AI Recommendation Cards */}
        {aiData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Current Performance */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Performance</h3>
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              
              <div className="space-y-4">
                {/* Meta Ads */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-900">Meta Ads</span>
                    <span className="text-sm text-blue-600">{aiData.current_performance.meta_ads.percent_of_budget}% budget</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Spend</div>
                      <div className="font-semibold">€{aiData.current_performance.meta_ads.monthly_spend}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">ROAS</div>
                      <div className="font-semibold">{aiData.current_performance.meta_ads.roas}x</div>
                    </div>
                  </div>
                </div>

                {/* Google Ads */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-900">Google Ads</span>
                    <span className="text-sm text-green-600">{aiData.current_performance.google_ads.percent_of_budget}% budget</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Spend</div>
                      <div className="font-semibold">€{aiData.current_performance.google_ads.monthly_spend}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">ROAS</div>
                      <div className="font-semibold">{aiData.current_performance.google_ads.roas}x</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Recommendation</h3>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getUrgencyColor(aiData.ai_recommendation.urgency)} text-white text-xs`}>
                  {getUrgencyIcon(aiData.ai_recommendation.urgency)}
                  <span className="capitalize">{aiData.ai_recommendation.urgency}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-900 mb-2">Optimal Distribution</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Meta Ads</span>
                      <span className="font-semibold">{aiData.ai_recommendation.optimal_distribution.meta_ads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Google Ads</span>
                      <span className="font-semibold">{aiData.ai_recommendation.optimal_distribution.google_ads}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{aiData.ai_recommendation.expected_improvement.roi_lift}</div>
                    <div className="text-sm text-gray-600">ROI Lift</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{aiData.ai_recommendation.expected_improvement.confidence_score}%</div>
                    <div className="text-sm text-gray-600">Confidence</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expected Impact */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Expected Impact</h3>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>

              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {aiData.ai_recommendation.expected_improvement.additional_revenue}
                  </div>
                  <div className="text-sm text-gray-600">Additional Revenue</div>
                  <div className="text-xs text-gray-500 mt-1">Per month with optimization</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Confidence Score</span>
                    <span className="font-semibold">{aiData.ai_recommendation.expected_improvement.confidence_score}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Time to Implement</span>
                    <span className="font-semibold">1-2 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Platform Comparison */}
        {platformData && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Platform Performance Analysis</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Cpu className="w-4 h-4" />
                <span>Powered by {aiData?.prediction_model}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Meta Ads */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Meta Ads</h4>
                    <p className="text-sm text-gray-600">Real API • {platformData.platforms.meta_ads.user}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{platformData.platforms.meta_ads.accounts_connected}</div>
                    <div className="text-sm text-gray-600">Accounts Connected</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-semibold text-blue-600">{platformData.platforms.meta_ads.connection_quality}</div>
                    <div className="text-sm text-gray-600">Connection Quality</div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Strengths</h5>
                  <ul className="space-y-1">
                    {platformData.platforms.meta_ads.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Optimization Opportunities</h5>
                  <ul className="space-y-1">
                    {platformData.platforms.meta_ads.optimization_opportunities.map((opp: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Google Ads */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Globe className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Google Ads</h4>
                    <p className="text-sm text-gray-600">AI Simulation • Performance Max</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{platformData.platforms.google_ads.campaigns_active}</div>
                    <div className="text-sm text-gray-600">Active Campaigns</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{platformData.platforms.google_ads.ai_optimization_score}</div>
                    <div className="text-sm text-gray-600">AI Score</div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Strengths</h5>
                  <ul className="space-y-1">
                    {platformData.platforms.google_ads.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Optimization Opportunities</h5>
                  <ul className="space-y-1">
                    {platformData.platforms.google_ads.optimization_opportunities.map((opp: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Actions */}
        {aiData && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Recommended Actions</h3>
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-600 font-medium">Ready to Execute</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Immediate Actions</h4>
                <div className="space-y-3">
                  {aiData.next_actions.map((action, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                      </div>
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Advanced Insights</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900 mb-1">Seasonal Factors</div>
                    <div className="text-sm text-blue-700">{aiData.advanced_insights.seasonal_factors}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-900 mb-1">Audience Overlap</div>
                    <div className="text-sm text-green-700">{aiData.advanced_insights.audience_overlap}</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="font-medium text-purple-900 mb-1">Creative Performance</div>
                    <div className="text-sm text-purple-700">{aiData.advanced_insights.creative_performance}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Apply AI Recommendations</span>
          </button>
          
          <button className="px-8 py-4 bg-white border-2 border-purple-200 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
          
          <button className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configure AI Model</span>
          </button>
        </div>

        {/* Data Sources Footer */}
        <div className="bg-gray-900 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-2">Data Sources & Model Info</h4>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Meta Ads API (Real-time)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span>Google Performance Max (AI Simulation)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>AttributelyPro ML Model v1.0</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Last updated: {aiData?.timestamp || 'N/A'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}