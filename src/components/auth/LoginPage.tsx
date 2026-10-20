/**
 * @file LoginPage.tsx
 * @description Halaman Login PRISMA AI yang secara presisi mereplikasi Mockup Halaman 1.
 */

import React, { useState } from 'react';
import type { UserRole } from '../../types/index.ts';

interface LoginPageProps {
  onLoginSuccess: (email: string, password: string, role?: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('rinasetiawati@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email.trim()) {
        setErrorMsg('Email wajib diisi.');
        return;
      }
      setErrorMsg('');
      onLoginSuccess(email, password, 'pengusul');
    } catch (err) {
      console.error('Error saat login:', err);
      setErrorMsg('Gagal melakukan proses login.');
    }
  };

  const handleQuickRoleLogin = (role: UserRole) => {
    if (role === 'pengusul') {
      onLoginSuccess('rinasetiawati@gmail.com', 'password123', 'pengusul');
    } else if (role === 'reviewer') {
      onLoginSuccess('budi.santoso@brin.go.id', 'password123', 'reviewer');
    } else {
      onLoginSuccess('publik@prisma.ai.go.id', 'password123', 'public');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 md:p-8">
      {/* Container Card */}
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative">
        {/* Left Side: Illustration & Branding */}
        <div className="bg-[#EBF3FE] p-8 md:p-12 flex flex-col justify-between items-center text-center border-r border-blue-50">
          <div className="w-full flex justify-start">
            <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
              Platform Nasional
            </span>
          </div>

          {/* Graphical Mock Illustration */}
          <div className="my-8 relative w-64 h-48 bg-slate-900 rounded-xl shadow-2xl p-4 flex flex-col justify-between border-2 border-slate-800 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
            {/* Top Bar with lights */}
            <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>

            {/* Simulated UI Cards inside Illustration */}
            <div className="grid grid-cols-2 gap-2 my-auto">
              <div className="bg-blue-600/90 rounded-md p-2.5 text-white flex flex-col justify-center">
                <div className="w-8 h-2 bg-blue-300 rounded mb-1"></div>
                <div className="w-12 h-1.5 bg-blue-400/80 rounded"></div>
              </div>
              <div className="bg-pink-600/90 rounded-md p-2.5 text-white flex flex-col justify-center">
                <div className="w-8 h-2 bg-pink-300 rounded mb-1"></div>
                <div className="w-10 h-1.5 bg-pink-400/80 rounded"></div>
              </div>
              <div className="bg-emerald-500 rounded-md p-2.5 text-white flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold">
                  AI
                </div>
              </div>
              <div className="bg-amber-400 rounded-md p-2.5 text-slate-900 flex flex-col justify-center">
                <div className="w-10 h-1.5 bg-amber-800/60 rounded mb-1"></div>
                <div className="w-7 h-1.5 bg-amber-800/60 rounded"></div>
              </div>
            </div>
          </div>

          {/* Slogan */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              PRISMA AI
            </h2>
            <p className="text-xs text-slate-600 mt-2 max-w-xs font-normal">
              Platform Registrasi, Integrasi, dan Sistem Monitoring AI Nasional
            </p>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              <span className="w-2 h-2 rounded-full bg-blue-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span className="w-2 h-2 rounded-full bg-blue-300"></span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md mb-3">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900">Login - PRISMA AI</h1>
            <p className="text-xs text-slate-500 mt-1">
              New Here?{' '}
              <a href="#register" className="text-blue-600 hover:underline font-medium">
                Create an account
              </a>
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                required
                aria-label="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <input
                type="password"
                required
                aria-label="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Remember me?</span>
              </label>
              <a href="#forgot" className="text-rose-500 hover:underline">
                Forget Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold">OR</span>
            </div>
          </div>

          {/* Social / SSO Logins from Mockup */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleQuickRoleLogin('pengusul')}
              className="w-full py-2.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span className="font-bold text-rose-500">G</span>
              <span>Sign In with Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin('reviewer')}
              className="w-full py-2.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span className="font-bold text-blue-700">f</span>
              <span>Sign In with Facebook</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin('public')}
              className="w-full py-2.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span className="font-bold text-sky-500">🐦</span>
              <span>Sign In with Twitter</span>
            </button>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400 font-medium block mb-2">
              Akses Cepat Pengujian Prototipe:
            </span>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => handleQuickRoleLogin('pengusul')}
                className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-[11px] font-medium hover:bg-blue-100"
              >
                Pengusul (Kemenkes)
              </button>
              <button
                type="button"
                onClick={() => handleQuickRoleLogin('reviewer')}
                className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded text-[11px] font-medium hover:bg-amber-100"
              >
                Reviewer / Kurator
              </button>
              <button
                type="button"
                onClick={() => handleQuickRoleLogin('public')}
                className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[11px] font-medium hover:bg-slate-200"
              >
                Visitor Publik
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Callout Banner from Mockup Page 1 */}
      <div className="fixed bottom-6 right-6 max-w-sm bg-blue-600 text-white p-4 rounded-2xl shadow-xl flex items-start space-x-3 hidden lg:flex">
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
          i
        </div>
        <p className="text-xs leading-relaxed">
          Login PRISMA memberikan akses terpersonalisasi sesuai peran pengguna. Setiap pengguna hanya melihat fitur dan data yang relevan dengan fungsinya.
        </p>
      </div>
    </div>
  );
};
