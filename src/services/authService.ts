import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'student' | 'teacher' | 'admin' | 'staff';
}

export interface SignInData {
  email: string;
  password: string;
}

class AuthService {
  async signUp(userData: SignUpData) {
    const { email, password, firstName, lastName, role = 'student' } = userData;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role,
        },
      },
    });

    if (error) throw error;
    return data;
  }

  async signIn(credentials: SignInData) {
    const { email, password } = credentials;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  async getCurrentSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
  }

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) throw error;
  }
}

export const authService = new AuthService();