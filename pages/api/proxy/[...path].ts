// pages/api/proxy/[...path].ts
// Next.js API Proxy para evitar problemas de CORS

import { NextApiRequest, NextApiResponse } from 'next';

const AWS_BACKEND_URL = 'http://3.16.108.83:8000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Obtener el path de la URL
  const { path } = req.query;
  const pathString = Array.isArray(path) ? path.join('/') : path || '';
  
  // Construir URL completa del backend
  const backendUrl = `${AWS_BACKEND_URL}/${pathString}`;
  
  try {
    // Preparar headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Copiar algunos headers importantes del request original
    if (req.headers.authorization) {
      headers.authorization = req.headers.authorization;
    }
    
    // Preparar opciones del fetch
    const fetchOptions: RequestInit = {
      method: req.method || 'GET',
      headers,
    };
    
    // Agregar body para métodos POST/PUT/PATCH
    if (req.method && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
      fetchOptions.body = JSON.stringify(req.body);
    }
    
    // Hacer request al backend AWS
    const response = await fetch(backendUrl, fetchOptions);
    
    // Obtener data de respuesta
    const data = await response.json();
    
    // Configurar headers de respuesta
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Enviar respuesta con el mismo status code
    res.status(response.status).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    
    res.status(500).json({
      error: 'Proxy request failed',
      message: error instanceof Error ? error.message : String(error),
      backend_url: backendUrl
    });
  }
}

// Configurar para manejar todos los métodos HTTP
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}