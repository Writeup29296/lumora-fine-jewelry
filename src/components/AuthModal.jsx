import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, Key, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    authError,
    setAuthError,
    login,
    signup,
    closeAuthModal,
    loginAsDemoAdmin,
    loginAsDemoCustomer,
    adminSecretCode
  } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('customer');
  const [signupAdminPasskey, setSignupAdminPasskey] = useState('');
  const [signupCountry, setSignupCountry] = useState('United States');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    signup({
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      role: signupRole,
      adminPasskey: signupAdminPasskey,
      country: signupCountry
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in text-[#1F2022]">
      <div className="bg-white border border-[#EAE3D5] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EAE3D5] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#1F2022] font-serif tracking-widest text-lg font-bold">LUMORA</span>
            <span className="text-[#EAE3D5]">|</span>
            <span className="text-xs uppercase tracking-wider text-[#A8843E] font-medium">
              {authModalMode === 'login' ? 'Authentication' : 'Register Account'}
            </span>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-[#747780] hover:text-[#1F2022] rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#EAE3D5] bg-[#FAF8F5] text-xs">
          <button
            onClick={() => {
              setAuthError(null);
              setAuthModalMode('login');
            }}
            className={`flex-1 py-3 font-semibold uppercase tracking-wider transition-all border-b-2 ${
              authModalMode === 'login'
                ? 'border-[#C5A059] text-[#1F2022] bg-white'
                : 'border-transparent text-[#747780] hover:text-[#1F2022]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthError(null);
              setAuthModalMode('signup');
            }}
            className={`flex-1 py-3 font-semibold uppercase tracking-wider transition-all border-b-2 ${
              authModalMode === 'signup'
                ? 'border-[#C5A059] text-[#1F2022] bg-white'
                : 'border-transparent text-[#747780] hover:text-[#1F2022]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-5 text-xs">
          
          {authError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {authError}
            </div>
          )}

          {authModalMode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#747780] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. victoria@nyc.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#747780] absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded-lg font-semibold uppercase tracking-wider"
              >
                Sign In
              </button>
            </form>
          ) : (
            /* SIGNUP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Victoria Sterling"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs text-[#1F2022]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. victoria@nyc.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs text-[#1F2022]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs text-[#1F2022]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Account Role</label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs text-[#1F2022]"
                >
                  <option value="customer">Client (Shopper)</option>
                  <option value="admin">Store Admin / Director (Requires Passkey)</option>
                </select>
              </div>

              {signupRole === 'admin' && (
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#A8843E] font-medium">Admin Security Passkey</label>
                  <input
                    type="password"
                    placeholder={`Secret passkey (Default: ${adminSecretCode})`}
                    value={signupAdminPasskey}
                    onChange={(e) => setSignupAdminPasskey(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#C5A059] rounded-lg text-xs text-[#1F2022]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded-lg font-semibold uppercase tracking-wider"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Quick Demo Instant Logins */}
          <div className="pt-4 border-t border-[#EAE3D5] space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#747780] block text-center font-semibold">
              Instant 1-Click Demo Accounts:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#EAE3D5] text-[11px] text-[#1F2022] font-semibold text-center transition-colors"
              >
                👑 Store Director (Admin)
              </button>
              <button
                type="button"
                onClick={loginAsDemoCustomer}
                className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#EAE3D5] text-[11px] text-[#1F2022] font-semibold text-center transition-colors"
              >
                🛍️ US Client (Shopper)
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
