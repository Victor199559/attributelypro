// app/api/whatsapp/route.ts
import { NextRequest, NextResponse } from 'next/server';

// WhatsApp IA Qualification Engine
class WhatsAppQualificationIA {
  private fastapi_url = 'http://3.16.108.83:8000';
  private whatsapp_api_token = process.env.WHATSAPP_API_TOKEN || 'demo_token';

  // IA Lead Scoring Algorithm
  calculateLeadScore(leadData: any): number {
    let score = 0;
    
    // Source Quality Scoring
    const sourceScores: Record<string, number> = {
      'google': 35,
      'linkedin': 40,
      'facebook': 30,
      'meta': 30,
      'tiktok': 20,
      'youtube': 25,
      'direct': 15,
      'organic': 20
    };
    score += sourceScores[leadData.source?.toLowerCase()] || 10;
    
    // Campaign Intent Analysis
    if (leadData.campaign?.includes('enterprise') || leadData.campaign?.includes('premium')) {
      score += 20;
    } else if (leadData.campaign?.includes('startup') || leadData.campaign?.includes('small')) {
      score += 10;
    }
    
    // Message Urgency Keywords
    const urgencyKeywords = ['urgent', 'immediately', 'asap', 'today', 'now', 'budget', 'price', 'cost'];
    const messageText = leadData.message?.toLowerCase() || '';
    urgencyKeywords.forEach(keyword => {
      if (messageText.includes(keyword)) {
        score += 10;
      }
    });
    
    // Business Size Indicators
    const businessKeywords = ['enterprise', 'company', 'business', 'team', 'employees', 'scale'];
    businessKeywords.forEach(keyword => {
      if (messageText.includes(keyword)) {
        score += 8;
      }
    });
    
    return Math.min(100, Math.max(0, score));
  }

  // Generate Unique Tracking Link
  generateTrackingLink(phoneNumber: string, source: string = 'whatsapp'): string {
    const trackingId = Math.random().toString(36).substring(2, 15);
    const phoneHash = btoa(phoneNumber).substring(0, 8);
    return `https://attributelypro.com/t/${trackingId}?utm_source=${source}&utm_medium=whatsapp&phone=${phoneHash}`;
  }

  // AI Conversation Flow
  async processConversation(leadData: any) {
    const score = this.calculateLeadScore(leadData);
    const trackingLink = this.generateTrackingLink(leadData.phone, leadData.source);
    
    let action = '';
    let priority = 'LOW';
    let message = '';
    
    if (score >= 80) {
      action = 'HUMAN_HANDOFF';
      priority = 'HIGH';
      message = `🔥 HOT LEAD ALERT: Score ${score}/100\nSource: ${leadData.source}\nUrgent human review needed!`;
    } else if (score >= 60) {
      action = 'SCHEDULE_REVIEW';
      priority = 'MEDIUM';
      message = `⚡ QUALIFIED LEAD: Score ${score}/100\nSchedule human review within 2 hours`;
    } else if (score >= 40) {
      action = 'AI_NURTURING';
      priority = 'LOW';
      message = `🤖 AI NURTURING: Score ${score}/100\nStarting automated nurturing sequence`;
    } else {
      action = 'REMARKETING';
      priority = 'LOW';
      message = `📊 REMARKETING: Score ${score}/100\nAdding to remarketing automation`;
    }

    return {
      score,
      action,
      priority,
      message,
      trackingLink,
      aiConfidence: Math.round((score / 100) * 95 + 5), // Convert to confidence %
      suggestedApproach: this.generateSalesStrategy(leadData, score)
    };
  }

  // AI Sales Strategy Generator
  generateSalesStrategy(leadData: any, score: number): string {
    const strategies = {
      high: [
        `Focus on ROI and immediate value`,
        `Emphasize enterprise features and scalability`,
        `Offer custom demo and consultation`,
        `Discuss implementation timeline`
      ],
      medium: [
        `Highlight success stories and case studies`,
        `Explain core platform benefits`,
        `Offer free trial or assessment`,
        `Address specific pain points`
      ],
      low: [
        `Educate on attribution basics`,
        `Share valuable content and resources`,
        `Build trust with testimonials`,
        `Focus on long-term relationship`
      ]
    };

    const level = score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';
    return strategies[level][Math.floor(Math.random() * strategies[level].length)];
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, leadData } = await request.json();
    const whatsappIA = new WhatsAppQualificationIA();

    switch (action) {
      case 'qualify_lead':
        const result = await whatsappIA.processConversation(leadData);
        
        // Log to Attribution API
        try {
          await fetch('https://api.attributelypro.com/whatsapp/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: leadData.phone,
              source: leadData.source,
              campaign: leadData.campaign,
              score: result.score,
              action: result.action,
              timestamp: new Date().toISOString()
            })
          });
        } catch (apiError) {
          console.log('Attribution API logging failed, continuing...');
        }

        return NextResponse.json({
          status: 'success',
          action: 'qualify_lead',
          data: result
        });

      case 'get_leads':
        // Return demo leads for now
        const demoLeads = [
          {
            id: '1',
            phone: '+593 99 123 4567',
            name: 'María González',
            score: 94,
            source: 'google',
            campaign: 'enterprise_demo',
            status: 'qualified',
            message: 'Need enterprise attribution solution urgently',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            action: 'HUMAN_HANDOFF',
            priority: 'HIGH'
          },
          {
            id: '2',
            phone: '+593 98 765 4321',
            name: 'Carlos Rodríguez',
            score: 67,
            source: 'linkedin',
            campaign: 'b2b_leads',
            status: 'reviewing',
            message: 'Interested in marketing attribution for our agency',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            action: 'SCHEDULE_REVIEW',
            priority: 'MEDIUM'
          },
          {
            id: '3',
            phone: '+593 96 555 7890',
            name: 'Ana Vargas',
            score: 43,
            source: 'facebook',
            campaign: 'awareness',
            status: 'nurturing',
            message: 'What is attribution marketing?',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            action: 'AI_NURTURING',
            priority: 'LOW'
          }
        ];

        return NextResponse.json({
          status: 'success',
          action: 'get_leads',
          data: demoLeads
        });

      case 'handoff_human':
        return NextResponse.json({
          status: 'success',
          action: 'handoff_human',
          message: `Lead ${leadData.phone} transferred to human agent with high priority`
        });

      default:
        return NextResponse.json({
          status: 'error',
          message: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('WhatsApp IA Error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    service: 'WhatsApp IA Qualification Engine',
    version: '1.0.0',
    features: [
      'Lead Scoring (0-100)',
      'Auto-qualification',
      'Human handoff',
      'Attribution tracking',
      'AI sales strategy'
    ]
  });
}