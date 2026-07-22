import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { Logo } from '@/components/common/Logo';

export const LabelLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('executive@apexmusic.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'MUSIC_LABEL');
    navigate('/label/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body dark selection:bg-[#3b82f6]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <Logo size={48} showText={false} to="/label/login" />
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Sign In to Madhur Label Hub
        </h2>
        <p className="text-xs text-slate-400">
          Enter executive credentials to access catalog rights and smart-contract royalty statements.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/60 border border-slate-800 py-8 px-4 shadow-2xl rounded-3xl sm:px-10 space-y-6 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

          <div className="p-4.5 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-400 text-2xl animate-pulse">domain</span>
            <div className="text-xs">
              <p className="font-extrabold text-blue-400">Enterprise Executive Terminal</p>
              <p className="text-slate-400 mt-0.5">Secure gateway for registered record labels.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Corporate Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-800/50 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-800/50 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-95 transition-opacity shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Sign In to Hub Console
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
