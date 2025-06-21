'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  defaultMessage?: string;
  companyName?: string;
  position?: 'bottom-right' | 'bottom-left';
  utm_source?: string;
  utm_campaign?: string;
}

export default function WhatsAppWidget({
  phoneNumber = '+593987654321',
  defaultMessage = 'Hi! I\'m interested in AttributelyPro marketing attribution platform',
  companyName = 'AttributelyPro',
  position = 'bottom-right',
  utm_source = 'website',
  utm_campaign = 'whatsapp_widget'
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [message, setMessage] = useState(defaultMessage);
  const [isProcessing, setIsProcessing] = useState(false);
  const [leadScore, setLeadScore] = useState<number | null>(null);
  const [trackingLink, setTrackingLink] = useState<string>('');

  // Position classes
  const positionClasses = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  // Auto-qualify lead when widget opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      qualifyLead();
    }
  }, [isOpen, isMinimized]);

  const qualifyLead = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'qualify_lead',
          leadData: {
            phone: phoneNumber,
            source: utm_source,
            campaign: utm_campaign,
            message: message,
            timestamp: new Date().toISOString()
          }
        })
      });

      const result = await response.json();
      if (result.status === 'success') {
        setLeadScore(result.data.score);
        setTrackingLink(result.data.trackingLink);
      }
    } catch (error) {
      console.error('Lead qualification failed:', error);
    }
    setIsProcessing(false);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Generate WhatsApp link with tracking
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    // Track click event
    if (trackingLink) {
      // Open tracking link in background
      const trackingFrame = document.createElement('iframe');
      trackingFrame.style.display = 'none';
      trackingFrame.src = trackingLink;
      document.body.appendChild(trackingFrame);
      
      setTimeout(() => {
        document.body.removeChild(trackingFrame);
      }, 1000);
    }

    // Open WhatsApp
    window.open(whatsappLink, '_blank');
    
    // Close widget
    setIsOpen(false);
    setIsMinimized(true);
  };

  if (!isOpen) {
    return (
      <div className={`fixed ${positionClasses} z-50`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            💬 Chat with AI Assistant
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed ${positionClasses} z-50`}>
      <div className="bg-white rounded-lg shadow-2xl w-80 border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-green-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">{companyName}</h3>
              <div className="flex items-center space-x-1 text-green-100 text-sm">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span>IA Assistant Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 rounded p-1"
            >
              <span className="text-lg">{isMinimized ? '□' : '−'}</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        {!isMinimized && (
          <div className="p-4 space-y-4">
            {/* AI Status */}
            {leadScore !== null && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-800">🤖 IA Analysis</span>
                  <span className="text-sm text-purple-600">Score: {leadScore}/100</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${leadScore}%` }}
                  ></div>
                </div>
                <p className="text-xs text-purple-600 mt-1">
                  {leadScore >= 80 ? '🔥 High Priority Lead' :
                   leadScore >= 60 ? '⚡ Qualified Lead' :
                   '📊 Nurturing Candidate'}
                </p>
              </div>
            )}

            {/* Welcome Message */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    ¡Hola! 👋 Soy la IA de {companyName}. 
                    {isProcessing ? (
                      <span className="ml-2">
                        <span className="animate-pulse">🤖 Analizando tu perfil...</span>
                      </span>
                    ) : leadScore !== null ? (
                      <span className="ml-2">
                        ¿En qué puedo ayudarte con attribution marketing?
                      </span>
                    ) : (
                      <span className="ml-2">¿En qué puedo ayudarte?</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                rows={3}
              />
              
              {/* Quick Actions */}
              <div className="space-y-2">
                <div className="text-xs text-gray-500 mb-2">💡 Mensajes rápidos:</div>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    '¿Qué es attribution marketing?',
                    'Necesito una demo del producto',
                    'Precios y planes disponibles',
                    'Quiero hablar con un experto'
                  ].map((quickMessage, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(quickMessage)}
                      className="text-left text-xs text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded transition-colors"
                    >
                      {quickMessage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isProcessing}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4" />
                    <span>Continuar en WhatsApp</span>
                  </>
                )}
              </button>
            </div>

            {/* Attribution Notice */}
            <div className="text-xs text-gray-500 text-center border-t pt-2">
              🔒 Powered by AttributelyPro IA • Conversation tracked for analytics
            </div>
          </div>
        )}
      </div>
    </div>
  );
}