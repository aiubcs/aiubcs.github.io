import React, { useState } from 'react';
import { ArrowLeft, Lock, ShieldCheck, User as UserIcon } from 'lucide-react';
import { loginAdmin } from '../services/api';

interface AdminLoginProps {
  onLogin: (token: string, username: string) => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Enter your username and password');
      return;
    }
    setSubmitting(true);
    setError('');
    const result = await loginAdmin(username.trim(), password);
    setSubmitting(false);

    if (result) {
      onLogin(result.token, result.username);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-app bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <div className="max-w-md mx-auto w-full min-h-app bg-white dark:bg-slate-900 relative flex flex-col">
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 pl-[calc(var(--safe-left)+1rem)] pr-[calc(var(--safe-right)+1rem)] pt-3 pt-[calc(var(--safe-top)+0.75rem)] pb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Back to app"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">Admin Login</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
        </header>

        <main className="flex-1 px-6 py-8 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#043927] text-white flex items-center justify-center shadow-lg shadow-teal-950/20">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="mt-3 text-sm font-extrabold text-slate-900 dark:text-white">Administrator Access</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Sign in to manage announcements, materials and courses
              </p>
            </div>

            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete="username"
                className="w-full pl-10 pr-3 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
              />
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full pl-10 pr-3 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
              />
            </div>

            {error && (
              <p className="text-[11px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#043927] hover:bg-[#075239] disabled:opacity-60 text-white text-xs font-bold rounded-2xl shadow-lg shadow-teal-950/20 transition-all"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};
