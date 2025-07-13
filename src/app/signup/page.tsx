'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function CrearCuenta() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: formulario, 2: verificar PIN
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const [pinData, setPinData] = useState({
    pin: '',
    pinSent: false
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors([]); // Limpiar errores al escribir
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.email) newErrors.push('Email es requerido');
    if (!formData.email.includes('@')) newErrors.push('Email inválido');
    if (!formData.password) newErrors.push('Contraseña es requerida');
    if (formData.password.length < 6) newErrors.push('Contraseña debe tener al menos 6 caracteres');
    if (formData.password !== formData.confirmPassword) newErrors.push('Las contraseñas no coinciden');
    if (!formData.name) newErrors.push('Nombre es requerido');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Enviar código PIN
  const handleSendPin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors([]);

    try {
      const response = await fetch('http://3.16.108.83/auth/send-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPinData({ ...pinData, pinSent: true });
        setStep(2);
        setSuccessMessage('✅ Código enviado a tu email');
        
        // Mostrar PIN en desarrollo
        if (data.pin) {
          console.log('🔍 PIN de desarrollo:', data.pin);
          alert(`PIN de desarrollo: ${data.pin}`);
        }
      } else {
        setErrors([data.message || 'Error enviando código']);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors(['Error de conexión']);
    } finally {
      setLoading(false);
    }
  };

  // Verificar PIN y crear cuenta
  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pinData.pin) {
      setErrors(['Ingresa el código de verificación']);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const response = await fetch('http://3.16.108.83/auth/verify-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          pin: pinData.pin,
          password: formData.password,
          name: formData.name
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('🎉 ¡Cuenta creada exitosamente!');
        setTimeout(() => {
          router.push('/login?message=Cuenta creada. Inicia sesión.');
        }, 2000);
      } else {
        setErrors([data.message || 'Error verificando código']);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors(['Error de conexión']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-600">
            {step === 1 ? 'Completa tus datos para empezar' : 'Verifica tu email para continuar'}
          </p>
        </div>

        {/* Paso indicador */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            1
          </div>
          <div className={`w-12 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Errores */}
          {errors.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              {errors.map((error, index) => (
                <p key={index} className="text-red-600 text-sm">{error}</p>
              ))}
            </div>
          )}

          {/* Mensaje de éxito */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">{successMessage}</p>
            </div>
          )}

          {/* PASO 1: Formulario de registro */}
          {step === 1 && (
            <form onSubmit={handleSendPin} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmar contraseña */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirma tu contraseña"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Enviando código...
                  </>
                ) : (
                  <>
                    📧 Enviar Código de Verificación
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* PASO 2: Verificar PIN */}
          {step === 2 && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">📧</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Código enviado
                </h3>
                <p className="text-gray-600 text-sm">
                  Hemos enviado un código de 6 dígitos a<br />
                  <span className="font-medium">{formData.email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyPin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código de Verificación
                  </label>
                  <input
                    type="text"
                    value={pinData.pin}
                    onChange={(e) => setPinData({ ...pinData, pin: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || pinData.pin.length !== 6}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Verificando...
                    </>
                  ) : (
                    <>
                      ✅ Verificar y Crear Cuenta
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-gray-600 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  ← Volver al formulario
                </button>
              </form>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Inicia Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}