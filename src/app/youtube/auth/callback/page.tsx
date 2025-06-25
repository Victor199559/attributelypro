'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function YouTubeCallback() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    const authCode = searchParams?.get('code');
    const authState = searchParams?.get('state');
    
    if (authCode) {
      setCode(authCode);
    }
    if (authState) {
      setState(authState);
    }
  }, [searchParams]);

  const exchangeToken = async () => {
    try {
      const response = await fetch('http://3.16.108.83:8000/youtube-ads/exchange-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_code: code }),
      });
      
      const result = await response.json();
      alert('Token intercambiado: ' + JSON.stringify(result));
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">YouTube OAuth Callback</h1>
        
        {code ? (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">✅ Autorización Exitosa</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Código de Autorización:</label>
              <code className="block bg-gray-700 p-3 rounded text-sm break-all">
                {code}
              </code>
            </div>
            
            {state && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">State:</label>
                <code className="block bg-gray-700 p-3 rounded text-sm">
                  {state}
                </code>
              </div>
            )}
            
            <button 
              onClick={exchangeToken}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-medium"
            >
              Intercambiar por Access Token
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg">
            <p>Esperando código de autorización...</p>
          </div>
        )}
      </div>
    </div>
  );
}