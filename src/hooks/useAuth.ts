import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authService } from '@/services/authService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: any | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    profile: null,
  });

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
        }));

        // Defer profile fetching with setTimeout to avoid deadlock
        if (session?.user) {
          setTimeout(async () => {
            const profile = await fetchProfile(session.user.id);
            setAuthState(prev => ({
              ...prev,
              profile,
              loading: false,
            }));
          }, 0);
        } else {
          setAuthState(prev => ({
            ...prev,
            profile: null,
            loading: false,
          }));
        }
      }
    );

    // THEN check for existing session
    authService.getCurrentSession().then(async (session) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
      }));

      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setAuthState(prev => ({
          ...prev,
          profile,
          loading: false,
        }));
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      await authService.signIn({ email, password });
      toast.success('Connexion réussie');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la connexion');
      throw error;
    }
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'student' | 'teacher' | 'admin' | 'staff';
  }) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      await authService.signUp(userData);
      toast.success('Inscription réussie. Vérifiez votre email.');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'inscription');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setAuthState({
        user: null,
        session: null,
        loading: false,
        profile: null,
      });
      toast.success('Déconnexion réussie');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la déconnexion');
      throw error;
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      if (!authState.user) throw new Error('Utilisateur non connecté');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', authState.user.id);

      if (error) throw error;

      // Refresh profile data
      const profile = await fetchProfile(authState.user.id);
      setAuthState(prev => ({ ...prev, profile }));
      
      toast.success('Profil mis à jour');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour du profil');
      throw error;
    }
  };

  const isAdmin = () => authState.profile?.role === 'admin';
  const isTeacher = () => authState.profile?.role === 'teacher';
  const isStudent = () => authState.profile?.role === 'student';
  const isStaff = () => authState.profile?.role === 'staff';

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAdmin,
    isTeacher,
    isStudent,
    isStaff,
  };
}