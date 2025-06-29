// src/components/ui/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🤖</span>
            </div>
          </div>
        </div>
        <p className="mt-6 text-gray-600 text-lg font-medium">
          Conectando con Quintuple AI Master...
        </p>
        <p className="mt-2 text-gray-500 text-sm">
          Sincronizando datos en tiempo real
        </p>
      </div>
    </div>
  );
}