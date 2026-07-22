import React from 'react';
import { Navigate } from 'react-router';
import { useAdminAuthStore } from '@/modules/admin/auth/useAdminAuthStore';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { token, adminUser } = useAdminAuthStore();

  if (!token || !adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
