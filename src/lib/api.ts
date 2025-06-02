// src/lib/api.ts
// Cliente API simple para conectar frontend con backend

const API_URL = 'http://localhost:8000';

// Función simple para hacer peticiones
async function apiRequest(endpoint: string, options: any = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Funciones específicas que puedes usar en tus páginas
export const api = {
  // Obtener datos del dashboard
  async getDashboardData() {
    return apiRequest('/analytics/dashboard');
  },
  
  // Obtener campañas
  async getCampaigns() {
    return apiRequest('/campaigns');
  },
  
  // Crear nueva campaña
  async createCampaign(campaignData: any) {
    return apiRequest('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
  },
  
  // Registrar nuevo usuario
  async register(userData: any) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  // Login
  async login(email: string, password: string) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  // Verificar que el backend está funcionando
  async healthCheck() {
    return apiRequest('/health');
  }
};

// Función de prueba que puedes usar para verificar conexión
export async function testConnection() {
  try {
    const health = await api.healthCheck();
    console.log('✅ Backend conectado:', health);
    return true;
  } catch (error) {
    console.log('❌ Backend no conectado:', error);
    return false;
  }
}