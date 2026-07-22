import React from 'react';
import { Navigate } from 'react-router';
import { useAuthStore, UserRole, getRoleHomePath } from '@/shared/auth/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, setRole } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.some((r) => {
      if (r === 'USER' || r === 'LISTENER') {
        return user.role === 'USER' || user.role === 'LISTENER';
      }
      if (r === 'ADMIN' || r === 'ADMINISTRATOR') {
        return user.role === 'ADMIN' || user.role === 'ADMINISTRATOR';
      }
      return user.role === r;
    });

    if (!isAllowed) {
      const primaryRole = allowedRoles[0];
      return (
        <div className="max-w-xl mx-auto my-12 p-8 glass-panel rounded-3xl border border-red-500/30 text-center space-y-6 animate-in fade-in duration-200">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl">lock</span>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#281718] dark:text-white mb-2">
              Role Protection Access Alert
            </h2>
            <p className="text-xs text-[#5d3f40] dark:text-zinc-300 leading-relaxed">
              Your account current role (<strong className="text-[#ba0034]">{user.role}</strong>) does not have permission to view this route. Required role: <strong className="text-[#ba0034]">{allowedRoles.join(' / ')}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => setRole(primaryRole)}
              className="px-5 py-2.5 rounded-full premium-gradient text-white font-bold text-xs glow-button hover:opacity-95 transition-all cursor-pointer"
            >
              Switch Role to {primaryRole}
            </button>

            <a
              href={getRoleHomePath(user.role)}
              className="px-5 py-2.5 rounded-full bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] dark:text-zinc-200 font-bold text-xs hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer"
            >
              Go to Your Dashboard ({user.role})
            </a>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
