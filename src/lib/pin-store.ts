// src/lib/pin-store.ts
interface PinData {
  pin: string;
  expires: number;
  attempts: number;
}

// Store temporal en memoria (para desarrollo local)
const memoryStore = new Map<string, PinData>();

export class PinStore {
  static async set(email: string, data: PinData): Promise<void> {
    console.log('🔥 PinStore.set called for:', email, 'PIN:', data.pin);
    
    // Guardar en memoria por ahora
    memoryStore.set(email, data);
    console.log('✅ PIN saved to memory store successfully');
  }

  static async get(email: string): Promise<PinData | undefined> {
    console.log('🔥 PinStore.get called for:', email);
    
    const data = memoryStore.get(email);
    
    if (!data) {
      console.log('🔥 No PIN found in memory store');
      return undefined;
    }

    // Verificar si expiró
    if (data.expires < Date.now()) {
      console.log('🔥 PIN expired, deleting');
      memoryStore.delete(email);
      return undefined;
    }

    console.log('✅ PIN found in memory store');
    return data;
  }

  static async delete(email: string): Promise<boolean> {
    const deleted = memoryStore.delete(email);
    console.log('🔥 PIN deleted from memory store:', deleted);
    return deleted;
  }

  static async cleanup(): Promise<number> {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [email, data] of memoryStore.entries()) {
      if (data.expires < now) {
        memoryStore.delete(email);
        cleaned++;
      }
    }
    
    console.log('🔥 Cleaned expired PINs:', cleaned);
    return memoryStore.size;
  }

  static size(): number {
    return memoryStore.size;
  }
}