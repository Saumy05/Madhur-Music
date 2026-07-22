import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { PillButton } from '@/components/ui/PillButton';
import { Logo } from '@/components/common/Logo';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name, email, 'USER');
    navigate('/welcome');
  };

  return (
    <div className="max-w-xl mx-auto py-12 space-y-6">
      <div className="text-center space-y-2 flex flex-col items-center">
        <Logo size={48} showText={false} />
        <h1 className="font-extrabold text-3xl text-[#281718] dark:text-white font-body">
          Join Madhur
        </h1>
        <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
          Create your free account to start streaming high-fidelity audio today.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#ba0034]"
            />
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
            Create Free Account
          </PillButton>
        </form>

        <div className="text-center pt-2 border-t border-[#e6bcbd]/40">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Already have an account?{' '}
            <Link to="/listener/login" className="font-bold text-[#ba0034] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
