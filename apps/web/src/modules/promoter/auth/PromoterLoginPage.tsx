import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { Logo } from '@/components/common/Logo';

export const PromoterLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('promoter@madhurevents.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'EVENT_PROMOTER');
    navigate('/promoter/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0f0a05] text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body dark selection:bg-[#d97706]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <Logo size={48} showText={false} to="/promoter/login" />
        <h2 className="text-3xl font-black tracking-tight text-white">
          Sign In to Madhur Events
        </h2>
        <p className="text-xs text-zinc-400">
          Enter promoter credentials to organize concerts, configure ticketing gates, and track live attendee registrations.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-amber-950/10 border border-amber-900/30 py-8 px-4 shadow-2xl rounded-3xl sm:px-10 space-y-6 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

          <div className="p-4.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-400 text-2xl animate-pulse">confirmation_number</span>
            <div className="text-xs">
              <p className="font-extrabold text-amber-400">Promoter Console Terminal</p>
              <p className="text-zinc-400 mt-0.5">Real-time box office ticketing & concert campaign stats.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                Promoter Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-xs font-semibold text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                Dashboard Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-xs font-semibold text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-amber-600 to-orange-700 hover:opacity-95 transition-opacity shadow-lg shadow-amber-600/20 cursor-pointer"
            >
              Access Promoter Console
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
