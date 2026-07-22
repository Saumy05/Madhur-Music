import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore, UserRole, getRoleHomePath } from '@/shared/auth/useAuthStore';
import { PillButton } from '@/components/ui/PillButton';
import { Logo } from '@/components/common/Logo';

const ROLE_OPTIONS: { role: UserRole; label: string; icon: string }[] = [
  { role: 'USER', label: 'Listener', icon: 'headphones' },
  { role: 'ARTIST', label: 'Artist', icon: 'mic_external_on' },
  { role: 'MUSIC_LABEL', label: 'Music Label', icon: 'domain' },
  { role: 'PODCAST_HOST', label: 'Podcast Host', icon: 'podcasts' },
  { role: 'EVENT_PROMOTER', label: 'Promoter', icon: 'confirmation_number' },
  { role: 'MODERATOR', label: 'Moderator', icon: 'gavel' },
  { role: 'ADMIN', label: 'Admin', icon: 'admin_panel_settings' },
];

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('saumya@example.com');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('USER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email, selectedRole);
      navigate(getRoleHomePath(selectedRole));
    } else {
      signup(name || email.split('@')[0], email, selectedRole);
      if (selectedRole === 'USER' || selectedRole === 'LISTENER') {
        navigate('/onboarding');
      } else {
        navigate(getRoleHomePath(selectedRole));
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">
      <div className="text-center space-y-2 flex flex-col items-center">
        <Logo size={48} showText={false} />
        <h1 className="font-extrabold text-3xl text-[#281718] dark:text-white">
          {isLogin ? 'Welcome Back to Madhur' : 'Create Your Account'}
        </h1>
        <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
          {isLogin
            ? 'Sign in to access your Backstage Pass, presets & tailored dashboard'
            : 'Join the premier audiophile music community and control room'}
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#281718] dark:text-white mb-2">
              Select Your Ecosystem Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ROLE_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.role}
                  onClick={() => setSelectedRole(opt.role)}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    selectedRole === opt.role
                      ? 'premium-gradient text-white border-transparent shadow-md'
                      : 'bg-[#ffe9e9]/60 dark:bg-white/5 border-white/40 text-[#5d3f40] dark:text-zinc-300 hover:border-[#ba0034]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{opt.icon}</span>
                  <span className="text-[11px] truncate">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Saumya Tiwari"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#ba0034]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#ba0034]"
            />
          </div>

          <PillButton type="submit" variant="primary" glow className="w-full py-3">
            {isLogin ? `Sign In as ${ROLE_OPTIONS.find((r) => r.role === selectedRole)?.label}` : `Register as ${ROLE_OPTIONS.find((r) => r.role === selectedRole)?.label}`}
          </PillButton>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-[#ba0034] hover:underline cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

