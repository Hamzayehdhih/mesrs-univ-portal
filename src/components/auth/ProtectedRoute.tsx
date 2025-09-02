import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'teacher' | 'student' | 'staff';
  allowedRoles?: ('admin' | 'teacher' | 'student' | 'staff')[];
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  allowedRoles 
}: ProtectedRouteProps) {
  const { user, loading, profile } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(profile?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}