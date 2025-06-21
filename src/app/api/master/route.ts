// app/api/master/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Master Orchestrator Class
class AttributelyProOrchestrator {
  private fastapi_url = 'https://api.attributelypro.com';
  private react_dashboard_url = 'http://3.16.108.83:3000';
  
  constructor() {
    console.log('🚀 AttributelyPro Master Orchestrator initialized');
  }

  // Fetch data from FastAPI backend
  async fetchAttributionData() {
    try {
      const [dashboard, campaigns, events] = await Promise.all([
        fetch(`${this.fastapi_url}/dashboard`),
        fetch(`${this.fastapi_url}/campaigns`),
        fetch(`${this.fastapi_url}/dashboard`) // For recent events
      ]);

      return {
        dashboard: await dashboard.json(),
        campaigns: await campaigns.json(),
        events: await events.json(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Error fetching attribution data:', error);
      throw error;
    }
  }

  // AI Analysis Engine
  async analyzeWithAI(attributionData: any) {
    const { dashboard, campaigns } = attributionData;
    
    // AI Budget Optimization Logic
    const platformPerformance = this.calculatePlatformROI(dashboard, campaigns);
    const optimizations = this.generateOptimizations(platformPerformance);
    const predictions = this.generatePredictions(dashboard);
    
    return {
      platform_performance: platformPerformance,
      optimizations: optimizations,
      predictions: predictions,
      confidence_score: this.calculateConfidence(optimizations),
      recommended_actions: this.generateRecommendations(optimizations)
    };
  }

  // Calculate ROI per platform
  private calculatePlatformROI(dashboard: any, campaigns: any) {
    const platforms = ['meta', 'google', 'tiktok', 'youtube', 'linkedin'];
    const performance: any = {};

    campaigns.campaigns?.forEach((campaign: any) => {
      const platform = this.extractPlatformFromCampaign(campaign.id);
      if (!performance[platform]) {
        performance[platform] = {
          total_revenue: 0,
          total_events: 0,
          total_conversions: 0,
          campaigns: 0,
          roi: 0,
          avg_conversion_rate: 0
        };
      }

      performance[platform].total_revenue += campaign.metrics.value || 0;
      performance[platform].total_events += campaign.metrics.events || 0;
      performance[platform].total_conversions += campaign.metrics.conversions || 0;
      performance[platform].campaigns += 1;
    });

    // Calculate ROI and conversion rates
    Object.keys(performance).forEach(platform => {
      const p = performance[platform];
      p.avg_conversion_rate = p.total_events > 0 ? (p.total_conversions / p.total_events) * 100 : 0;
      p.roi = p.total_revenue; // Simplified ROI calculation
    });

    return performance;
  }

  // Extract platform from campaign ID
  private extractPlatformFromCampaign(campaignId: string): string {
    if (campaignId.includes('facebook') || campaignId.includes('meta')) return 'meta';
    if (campaignId.includes('google')) return 'google';
    if (campaignId.includes('tiktok')) return 'tiktok';
    if (campaignId.includes('youtube')) return 'youtube';
    if (campaignId.includes('linkedin')) return 'linkedin';
    return 'unknown';
  }

  // Generate AI optimizations
  private generateOptimizations(platformPerformance: any) {
    const optimizations: any = {
      increase_budget: [],
      decrease_budget: [],
      pause_campaigns: [],
      new_opportunities: []
    };

    Object.entries(platformPerformance).forEach(([platform, data]: [string, any]) => {
      if (data.roi > 1000 && data.avg_conversion_rate > 5) {
        optimizations.increase_budget.push({
          platform,
          reason: `High ROI (${data.roi}) and conversion rate (${data.avg_conversion_rate.toFixed(1)}%)`,
          recommended_increase: '50%',
          confidence: 0.9
        });
      } else if (data.roi < 100 || data.avg_conversion_rate < 1) {
        optimizations.decrease_budget.push({
          platform,
          reason: `Low ROI (${data.roi}) or conversion rate (${data.avg_conversion_rate.toFixed(1)}%)`,
          recommended_decrease: '25%',
          confidence: 0.8
        });
      } else if (data.roi < 50) {
        optimizations.pause_campaigns.push({
          platform,
          reason: `Very low ROI (${data.roi})`,
          confidence: 0.95
        });
      }
    });

    return optimizations;
  }

  // Generate predictions
  private generatePredictions(dashboard: any) {
    const currentRevenue = dashboard.summary?.total_value || 0;
    const currentConversions = dashboard.summary?.total_conversions || 0;
    const currentEvents = dashboard.summary?.total_events || 0;

    return {
      next_30_days: {
        predicted_revenue: currentRevenue * 1.2, // 20% growth prediction
        predicted_conversions: currentConversions * 1.15,
        predicted_events: currentEvents * 1.1
      },
      next_7_days: {
        predicted_revenue: currentRevenue * 0.25,
        predicted_conversions: currentConversions * 0.23,
        predicted_events: currentEvents * 0.22
      },
      confidence: 0.85
    };
  }

  // Calculate overall confidence
  private calculateConfidence(optimizations: any): number {
    const totalRecommendations = 
      optimizations.increase_budget.length + 
      optimizations.decrease_budget.length + 
      optimizations.pause_campaigns.length;
    
    if (totalRecommendations === 0) return 0.5;
    
    const avgConfidence = [
      ...optimizations.increase_budget,
      ...optimizations.decrease_budget,
      ...optimizations.pause_campaigns
    ].reduce((sum, item) => sum + (item.confidence || 0.7), 0) / totalRecommendations;
    
    return avgConfidence;
  }

  // Generate actionable recommendations
  private generateRecommendations(optimizations: any): string[] {
    const recommendations: string[] = [];

    optimizations.increase_budget.forEach((opt: any) => {
      recommendations.push(`🚀 Increase ${opt.platform} budget by ${opt.recommended_increase} - ${opt.reason}`);
    });

    optimizations.decrease_budget.forEach((opt: any) => {
      recommendations.push(`⚠️ Decrease ${opt.platform} budget by ${opt.recommended_decrease} - ${opt.reason}`);
    });

    optimizations.pause_campaigns.forEach((opt: any) => {
      recommendations.push(`🛑 Consider pausing ${opt.platform} campaigns - ${opt.reason}`);
    });

    if (recommendations.length === 0) {
      recommendations.push('✅ All platforms performing within acceptable ranges');
    }

    return recommendations;
  }

  // Send updates to React Dashboard
  async updateReactDashboard(aiAnalysis: any) {
    try {
      // In production, this would be a WebSocket or Server-Sent Events
      console.log('📊 Sending updates to React Dashboard:', aiAnalysis);
      
      // For now, we'll store in a way the React dashboard can fetch
      return {
        status: 'success',
        message: 'Dashboard updated with AI insights',
        data: aiAnalysis
      };
    } catch (error) {
      console.error('❌ Error updating React dashboard:', error);
      throw error;
    }
  }

  // Master execution method
  async execute(action: string, platform?: string, data?: any) {
    try {
      console.log(`🎯 Executing action: ${action}`);

      switch (action) {
        case 'analyze_performance':
          const attributionData = await this.fetchAttributionData();
          const aiAnalysis = await this.analyzeWithAI(attributionData);
          await this.updateReactDashboard(aiAnalysis);
          return {
            status: 'success',
            action,
            data: aiAnalysis,
            attribution_data: attributionData
          };

        case 'optimize_budgets':
          const optimizationData = await this.fetchAttributionData();
          const optimization = await this.analyzeWithAI(optimizationData);
          return {
            status: 'success',
            action,
            optimization: optimization.optimizations,
            confidence: optimization.confidence_score
          };

        case 'predict_performance':
          const predictionData = await this.fetchAttributionData();
          const predictions = await this.analyzeWithAI(predictionData);
          return {
            status: 'success',
            action,
            predictions: predictions.predictions
          };

        default:
          return {
            status: 'error',
            message: `Unknown action: ${action}`
          };
      }
    } catch (error) {
      console.error('❌ Orchestrator execution error:', error);
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        action
      };
    }
  }
}

// API Route Handler
export async function POST(request: NextRequest) {
  try {
    const { action, platform, data } = await request.json();
    
    const orchestrator = new AttributelyProOrchestrator();
    const result = await orchestrator.execute(action, platform, data);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ API Route error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to process request'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const orchestrator = new AttributelyProOrchestrator();
    const result = await orchestrator.execute('analyze_performance');
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ API Route GET error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to fetch analysis'
    }, { status: 500 });
  }
}