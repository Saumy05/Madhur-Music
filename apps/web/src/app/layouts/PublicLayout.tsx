import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router';
import { useAuthStore, getRoleHomePath } from '@/shared/auth/useAuthStore';

const isAuthRoute = (pathname: string) => {
  const normalized = pathname.toLowerCase();
  return (
    normalized === '/login' ||
    normalized === '/signup' ||
    normalized === '/auth' ||
    normalized.endsWith('/login')
  );
};

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();

  if (isAuthRoute(location.pathname)) {
    if (isAuthenticated && user) {
      return <Navigate to={getRoleHomePath(user.role)} replace />;
    }
    return (
      <div className="min-h-screen bg-[#fff8f7] text-[#281718] dark:bg-[#180d0e] dark:text-white flex flex-col font-body transition-colors duration-200">
        <main className="flex-1 overflow-x-hidden min-w-0">
          <Outlet />
        </main>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return <Navigate to={getRoleHomePath(user.role)} replace />;
  }

  return <Navigate to="/login" replace />;
};

