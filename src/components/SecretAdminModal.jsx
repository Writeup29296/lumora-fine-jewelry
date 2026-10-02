import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, X, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SecretAdminModal = ({ isOpen, onClose, onSuccess }) => {
  const { login, adminSecretCode } = useAuth();
  const [email, setEmail] = useState('admin@lumorafinejewelery.com');
  const [password, setPassword] = useState('admin123');
  const [passkey, setPasskey] = useState('');
  const [usePasskeyMode, setUsePasskeyMode] = useState(false);
  const [error, setError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setAuthenticating(true);

    if (usePasskeyMode) {
      const cleanPasskey = passkey.trim();
      if (
        cleanPasskey === 'YYY29296' || 
        cleanPasskey === 'yyy29296' || 
        cleanPasskey === 'AAA29296' || 
        cleanPasskey === 'aaa29296' || 
        cleanPasskey === 'LUMORA2026' || 
        cleanPasskey === adminSecretCode
      ) {
        const ok = login('admin@lumorafinejewelery.com', 'admin123');
        if (ok) {
          onSuccess();
          onClose();
        } else {
          setError('Failed to initialize administrator session.');
        }
      } else {
        setError('Invalid master atelier passkey. (Use YYY29296 or LUMORA2026)');
      }
    } else {
      const ok = login(email, password);
      if (ok) {
        onSuccess();
        onClose();
      } else {
        setError('Invalid credentials. Check email and password or use Master Passkey.');
      }
    }
    setAuthenticating(false);
  };

  const handleQuickUnlock = () => {
    setError('');
    const ok = login('admin@lumorafinejewelery.com', 'admin123');
    if (ok) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in text-[#1F2022]">
      <div className="bg-white border-2 border-[#C5A059] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col my-auto relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#747780] hover:text-[#1F2022] rounded-full hover:bg-[#FAF8F5] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 bg-[#FAF8F5] border-b border-[#EAE3D5] text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#1F2022] text-[#C5A059] mx-auto flex items-center justify-center shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8843E] font-semibold block">
              Restricted Access Console
            </span>
            <h3 className="font-serif text-2xl text-[#1F2022] mt-0.5">
              Director Atelier Portal
            </h3>
          </div>
          <p className="text-xs text-[#575A61] max-w-xs mx-auto">
            Authorized access for catalog management, shipment manifests, customs CSB-V filings, and discount codes.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          <div className="flex border-b border-[#EAE3D5] text-xs">
            <button
              onClick={() => { setUsePasskeyMode(false); setError(''); }}
              className={`flex-1 pb-2 font-semibold uppercase tracking-wider transition-all border-b-2 ${
                !usePasskeyMode ? 'border-[#C5A059] text-[#1F2022]' : 'border-transparent text-[#747780]'
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => { setUsePasskeyMode(true); setError(''); }}
              className={`flex-1 pb-2 font-semibold uppercase tracking-wider transition-all border-b-2 ${
                usePasskeyMode ? 'border-[#C5A059] text-[#1F2022]' : 'border-transparent text-[#747780]'
              }`}
            >
              Master Passkey
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {!usePasskeyMode ? (
              <>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Director Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Director Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Atelier Security Passkey</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter YYY29296 or LUMORA2026"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] font-mono tracking-wider focus:outline-none focus:border-[#C5A059]"
                  />
                  <Key className="w-4 h-4 text-[#A8843E] absolute left-3 top-2.5" />
                </div>
              </div>
            )}

            {error && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authenticating}
              className="w-full py-3 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Unlock Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Unlock Button */}
          <div className="pt-3 border-t border-[#F5F1E8] text-center">
            <button
              type="button"
              onClick={handleQuickUnlock}
              className="w-full py-2 bg-[#F4EFE6] hover:bg-[#EAE3D5] text-[#1F2022] border border-[#C5A059] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <span>Instant 1-Click Director Unlock (Passkey: YYY29296)</span>
            </button>
          </div>

        </div>

        {/* Security watermark footer */}
        <div className="py-2.5 bg-[#FAF8F5] border-t border-[#EAE3D5] text-center text-[10px] text-[#747780] font-mono">
          🔒 Shortcut: Ctrl + YYY29296 &bull; Encrypted Session
        </div>

      </div>
    </div>
  );
};
