import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { Logo } from '@/components/common/Logo';
import { loginAdmin } from '@/data/songsApi';
import { useAdminAuthStore } from './useAdminAuthStore';
import { useAuthStore } from '@/shared/auth/useAuthStore';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, adminUser, setSession } = useAdminAuthStore();
  const { login: setMockSession } = useAuthStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (token && adminUser) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { accessToken, user } = await loginAdmin(username, password);

      if (user.role !== 'ADMIN') {
        setError('Access denied: insufficient privileges');
        return;
      }

      // 1. Store the real JWT + user profile for API calls
      setSession(accessToken, user);

      // 2. Sync with the app-wide auth store so ProtectedRoute passes
      setMockSession(`${user.username}@madhur.com`, 'ADMIN');

      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body dark selection:bg-[#1e293b]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <Logo size={48} showText={false} to="/admin/login" />
        <h2 className="text-3xl font-extrabold tracking-tight text-white font-mono">
          [System Administration]
        </h2>
        <p className="text-xs text-slate-400">
          Enter root credentials to manage user access privileges, audit server logs, and configure system databases.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-950/80 border border-slate-800 py-8 px-4 shadow-2xl rounded-3xl sm:px-10 space-y-6 relative overflow-hidden font-mono">
          <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-slate-500/5 blur-2xl pointer-events-none" />

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
            <p className="text-emerald-500 font-bold">$ madhurctl status</p>
            <p>• Nodes: 12 Active</p>
            <p>• Auth Service: Nominal</p>
            <p className="text-amber-500">• SSL Certificate: Nominal</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-400 text-xs font-bold">
              ✗ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">
                Administrator Username
              </label>
              <input
                id="admin-username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. jigar"
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-xs font-semibold text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 font-mono placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">
                Root Security Token
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-xs font-semibold text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 font-mono"
              />
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700 cursor-pointer uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating…' : 'Verify SSH Credentials & Bind'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
