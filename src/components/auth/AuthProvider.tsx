import React, { createContext, useContext } from 'react';
import { useAuth, AuthState } from '@/hooks/useAuth';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'student' | 'teacher' | 'admin' | 'staff';
  }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  isAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
  isStaff: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}