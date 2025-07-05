// src/lib/hybrid-database.ts
import { createClient } from '@supabase/supabase-js';

// Store en memoria para desarrollo local
const memoryStore = {
  users: new Map<string, any>(),
  pins: new Map<string, any>()
};

class HybridDatabase {
  private supabase: any = null;
  private isSupabaseAvailable = false;

  constructor() {
    this.initializeSupabase();
  }

  private async initializeSupabase() {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (supabaseUrl && supabaseKey) {
        this.supabase = createClient(supabaseUrl, supabaseKey);
        
        // Test connection
        const { data, error } = await this.supabase
          .from('attributelypro_users')
          .select('count(*)')
          .limit(1);
        
        this.isSupabaseAvailable = !error;
        console.log('🚀 Supabase status:', this.isSupabaseAvailable ? 'CONNECTED' : 'FALLBACK TO MEMORY');
      }
    } catch (error) {
      console.log('⚡ Using memory store for local development');
      this.isSupabaseAvailable = false;
    }
  }

  // PIN OPERATIONS
  async savePIN(email: string, pin: string, expiresInMinutes: number = 10) {
    const pinData = {
      email,
      pin,
      expires_at: new Date(Date.now() + expiresInMinutes * 60 * 1000),
      verified: false,
      created_at: new Date()
    };

    if (this.isSupabaseAvailable) {
      try {
        const { error } = await this.supabase
          .from('pin_verifications')
          .insert(pinData);
        
        if (!error) {
          console.log('✅ PIN saved to Supabase');
          return { success: true };
        }
      } catch (error) {
        console.log('⚡ Falling back to memory store');
      }
    }

    // Fallback to memory
    memoryStore.pins.set(email, pinData);
    console.log('✅ PIN saved to memory store');
    return { success: true };
  }

  async verifyPIN(email: string, pin: string) {
    if (this.isSupabaseAvailable) {
      try {
        const { data, error } = await this.supabase
          .from('pin_verifications')
          .select('*')
          .eq('email', email)
          .eq('pin', pin)
          .eq('verified', false)
          .gt('expires_at', new Date().toISOString())
          .single();

        if (data && !error) {
          // Mark as verified
          await this.supabase
            .from('pin_verifications')
            .update({ verified: true })
            .eq('id', data.id);
          
          console.log('✅ PIN verified via Supabase');
          return { success: true };
        }
      } catch (error) {
        console.log('⚡ Falling back to memory store');
      }
    }

    // Fallback to memory
    const pinData = memoryStore.pins.get(email);
    if (pinData && pinData.pin === pin && new Date() < pinData.expires_at) {
      pinData.verified = true;
      console.log('✅ PIN verified via memory store');
      return { success: true };
    }

    return { success: false, error: 'Invalid or expired PIN' };
  }

  // USER OPERATIONS
  async createUser(userData: any) {
    if (this.isSupabaseAvailable) {
      try {
        // Create in Supabase Auth
        const { data: authUser, error: authError } = await this.supabase.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          email_confirm: true
        });

        if (authUser && !authError) {
          // Create in users table
          const { data, error } = await this.supabase
            .from('attributelypro_users')
            .insert({
              email: userData.email,
              password_hash: userData.password, // In production, hash this
              name: userData.name,
              plan: 'free'
            })
            .select()
            .single();

          if (data && !error) {
            console.log('✅ User created in Supabase');
            return { success: true, user: data };
          }
        }
      } catch (error) {
        console.log('⚡ Falling back to memory store');
      }
    }

    // Fallback to memory
    const user = {
      id: Date.now(),
      email: userData.email,
      password_hash: userData.password,
      name: userData.name,
      plan: 'free',
      created_at: new Date()
    };

    memoryStore.users.set(userData.email, user);
    console.log('✅ User created in memory store');
    return { success: true, user };
  }

  async findUserByEmail(email: string) {
    if (this.isSupabaseAvailable) {
      try {
        const { data, error } = await this.supabase
          .from('attributelypro_users')
          .select('*')
          .eq('email', email)
          .single();

        if (data && !error) {
          return data;
        }
      } catch (error) {
        // Fallback to memory
      }
    }

    return memoryStore.users.get(email) || null;
  }

  // Status check
  getStatus() {
    return {
      supabaseAvailable: this.isSupabaseAvailable,
      mode: this.isSupabaseAvailable ? 'production' : 'development',
      memoryUsers: memoryStore.users.size,
      memoryPins: memoryStore.pins.size
    };
  }
}

// Singleton instance
export const db = new HybridDatabase();