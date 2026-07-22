import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { Logo } from '@/components/common/Logo';

export const ArtistLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('artist@example.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'ARTIST');
    navigate('/artist/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0d0708] text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body dark selection:bg-[#ba0034]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <Logo size={48} showText={false} to="/artist/login" />
        <h2 className="text-3xl font-black tracking-tight text-white">
          Sign In to Madhur Studio
        </h2>
        <p className="text-xs text-zinc-400">
          Access your workspace to isolate audio stems, upload tracks, and audit global royalty splits.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-black/40 border border-white/5 py-8 px-4 shadow-2xl rounded-3xl sm:px-10 space-y-6 relative overflow-hidden">
          
          <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-[#ba0034]/15 blur-2xl pointer-events-none" />

          <div className="p-4.5 rounded-2xl bg-gradient-to-r from-[#ba0034]/10 to-[#8d2ebc]/10 border border-[#ba0034]/20 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ba0034] text-2xl animate-pulse">mic_external_on</span>
            <div className="text-xs">
              <p className="font-extrabold text-white">Creator Environment</p>
              <p className="text-zinc-400 mt-0.5">Connected to Madhur Audio Distribution networks.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                Studio Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-[#ba0034] focus:ring-1 focus:ring-[#ba0034]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                Passphrase
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-[#ba0034] focus:ring-1 focus:ring-[#ba0034]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-[#ba0034] to-[#8d2ebc] hover:opacity-95 transition-opacity shadow-lg shadow-[#ba0034]/25 cursor-pointer"
            >
              Access Studio Workspace
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
