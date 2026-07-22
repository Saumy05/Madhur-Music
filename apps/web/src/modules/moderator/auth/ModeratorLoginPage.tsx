import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { Logo } from '@/components/common/Logo';

export const ModeratorLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('agent@madhursafety.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'MODERATOR');
    navigate('/moderator/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body dark selection:bg-[#475569]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <Logo size={48} showText={false} to="/moderator/login" />
        <h2 className="text-3xl font-black tracking-tight text-white">
          Sign In to Trust & Safety Console
        </h2>
        <p className="text-xs text-slate-400">
          Enter staff credentials to moderate copyright claims, reported podcasts, and artist verification queues.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/40 border border-slate-800 py-8 px-4 shadow-2xl rounded-3xl sm:px-10 space-y-6 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-slate-500/10 blur-2xl pointer-events-none" />

          <div className="p-4.5 rounded-2xl bg-slate-500/5 border border-slate-500/20 flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400 text-2xl animate-pulse">security</span>
            <div className="text-xs">
              <p className="font-extrabold text-slate-300">Staff Moderation Terminal</p>
              <p className="text-slate-400 mt-0.5">Secure, logged gateway for authorized Madhur Trust agents.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-xs font-semibold text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Terminal Access Key
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-xs font-semibold text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full text-xs font-extrabold text-white bg-slate-700 hover:bg-slate-600 transition-colors shadow-lg cursor-pointer"
            >
              Verify Credentials & Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
