// API Configuration for QUADRUPLE AI
export const API_CONFIG = {
  BASE_URL: 'http://18.219.188.252:8000',
  ENDPOINTS: {
    META_AI: '/meta-ai/advantage-plus-insights/act_1038930414999384',
    GOOGLE_AI: '/google-ai/performance-max-insights/7453703942', 
    TIKTOK_AI: '/tiktok-ai/algorithm-insights/7517787463485482881',
    MICRO_BUDGET_AI: '/micro-budget-ai/optimize/50',
    ULTIMATE_AI: '/cross-platform-ai/ultimate-optimizer'
  }
};

// API Helper Functions
export const fetchQuadrupleAI = async () => {
  const responses = await Promise.all([
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.META_AI}`),
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GOOGLE_AI}`),
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TIKTOK_AI}`),
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MICRO_BUDGET_AI}`)
  ]);

  const [metaData, googleData, tiktokData, microBudgetData] = await Promise.all(
    responses.map(r => r.json())
  );

  return {
    meta: metaData,
    google: googleData,
    tiktok: tiktokData,
    microBudget: microBudgetData,
    timestamp: new Date().toISOString()
  };
};