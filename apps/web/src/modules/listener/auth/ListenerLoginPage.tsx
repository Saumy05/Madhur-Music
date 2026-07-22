import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { PillButton } from '@/components/ui/PillButton';
import { Logo } from '@/components/common/Logo';

export const ListenerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login } = useAuthStore();
  const [email, setEmail] = useState('listener@example.com');
  const [password, setPassword] = useState('••••••••');

  if (isAuthenticated && user) {
    return <Navigate to="/listener" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'USER');
    navigate('/listener');
  };

  return (
    <div className="max-w-xl mx-auto py-12 space-y-6">
      <div className="text-center space-y-2 flex flex-col items-center">
        <Logo size={48} showText={false} />
        <h1 className="font-extrabold text-3xl text-[#281718] dark:text-white">
          Sign In to Madhur
        </h1>
        <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
          Enter your credentials to access your personalized melodic music experience.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#ba0034]/15 to-[#8d2ebc]/15 border border-[#ba0034]/20 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ba0034] text-2xl animate-pulse">headphones</span>
            <div className="text-xs">
              <p className="font-bold text-[#ba0034] dark:text-rose-400">Welcome Back Listener</p>
              <p className="text-[#5d3f40] dark:text-zinc-400 mt-0.5">Stream over 100M+ high-res songs, curate playlists, and join jam sessions.</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#ba0034]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#ba0034]"
            />
          </div>

          <PillButton type="submit" variant="primary" glow className="w-full py-3">
            Sign In & Tune In
          </PillButton>
        </form>

        <div className="text-center pt-2 border-t border-[#e6bcbd]/40">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            New listener?{' '}
            <Link to="/signup" className="font-bold text-[#ba0034] hover:underline">
              Create Free Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
