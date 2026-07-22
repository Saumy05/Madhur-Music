import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { Logo } from '@/components/common/Logo';

export const PodcastLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('host@podcaststudio.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'PODCAST_HOST');
    navigate('/podcast/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050b07] text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body dark selection:bg-[#059669]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <Logo size={48} showText={false} to="/podcast/login" />
        <h2 className="text-3xl font-black tracking-tight text-white">
          Sign In to Podcast Studio
        </h2>
        <p className="text-xs text-zinc-400">
          Enter host credentials to manage your show episodes, monitor subscribers, and check sponsor placements.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-emerald-950/20 border border-emerald-900/40 py-8 px-4 shadow-2xl rounded-3xl sm:px-10 space-y-6 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          <div className="p-4.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-400 text-2xl animate-pulse">mic</span>
            <div className="text-xs">
              <p className="font-extrabold text-emerald-400">Creator Desk Terminal</p>
              <p className="text-zinc-400 mt-0.5">High-definition audio distribution & statistics engine.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                Host Account Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                Workspace Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:opacity-95 transition-opacity shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              Sign In to Podcast Studio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
