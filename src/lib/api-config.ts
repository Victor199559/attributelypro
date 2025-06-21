// src/lib/api-config.ts
// AttributelyPro - API Configuration for AWS Backend

export const API_CONFIG = {
  // Use Next.js API proxy to avoid CORS
  BASE_URL: '/api/proxy',
  
  // Direct AWS Backend URL (for reference)
  AWS_DIRECT_URL: 'http://3.16.108.83:8000',
  
  // Fallback to local for development
  DEV_URL: 'http://localhost:8000',
  
  // Get the correct URL based on environment
  getApiUrl: () => {
    // Always use proxy to avoid CORS issues
    return '/api/proxy';
  }
};

// API Endpoints
export const ENDPOINTS = {
  // Health and status
  HEALTH: '/health',
  ROOT: '/',
  
  // Attribution tracking
  TRACK: '/track',
  ATTRIBUTION: '/attribution',
  
  // Dashboard data
  DASHBOARD: '/dashboard',
  CAMPAIGNS: '/campaigns',
  
  // Demo data
  GENERATE_DEMO: '/demo/generate-data',
  
  // Meta Ads (if available)
  META_ADS: '/meta-ads',
  META_TEST: '/meta-ads/test-connection',
};

// API Client Class
export class AttributelyProAPI {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = API_CONFIG.getApiUrl();
  }
  
  // Generic fetch wrapper
  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Request failed:`, error);
      throw error;
    }
  }
  
  // Health check
  async healthCheck() {
    return this.fetchAPI(ENDPOINTS.HEALTH);
  }
  
  // Track attribution event
  async trackEvent(eventData: {
    event_type: string;
    campaign_id?: string;
    user_id?: string;
    page_url?: string;
    event_value?: number;
    properties?: Record<string, any>;
  }) {
    return this.fetchAPI(ENDPOINTS.TRACK, {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }
  
  // Get attribution data
  async getAttribution(campaignId: string) {
    return this.fetchAPI(`${ENDPOINTS.ATTRIBUTION}/${campaignId}`);
  }
  
  // Get dashboard data
  async getDashboardData() {
    return this.fetchAPI(ENDPOINTS.DASHBOARD);
  }
  
  // Get campaigns
  async getCampaigns() {
    return this.fetchAPI(ENDPOINTS.CAMPAIGNS);
  }
  
  // Generate demo data
  async generateDemoData() {
    return this.fetchAPI(ENDPOINTS.GENERATE_DEMO, {
      method: 'POST',
    });
  }
  
  // Test Meta Ads connection (if available)
  async testMetaConnection() {
    try {
      return this.fetchAPI(ENDPOINTS.META_TEST);
    } catch (error) {
      console.warn('Meta Ads endpoints not available:', error);
      return { status: 'unavailable', message: 'Meta Ads API not configured' };
    }
  }
}

// Export singleton instance
export const apiClient = new AttributelyProAPI();

// Connection test function
export async function testBackendConnection() {
  try {
    const response = await apiClient.healthCheck();
    console.log('✅ Backend connection successful:', response);
    return { success: true, data: response };
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}