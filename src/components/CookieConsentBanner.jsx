import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const CookieConsentBanner = ({ onNavigateToPrivacy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('lumora_cookie_consent');
      if (!consent) {
        setVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('lumora_cookie_consent', 'accepted_all');
    setVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('lumora_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside 
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EAE3D5] shadow-xl text-[#1F2022] text-xs space-y-3 animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-[#A8843E] font-semibold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & Cookie Preferences</span>
        </div>
        <button
          onClick={handleAcceptEssential}
          className="text-[#747780] hover:text-[#1F2022] p-1"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-[#575A61] leading-relaxed">
        Lumora uses cookies and secure local storage to retain your shopping bag, country selection (USA or Canada), and active currency (USD or CAD). We do not sell personal data to marketing brokers.
      </p>

      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          onClick={() => {
            if (onNavigateToPrivacy) onNavigateToPrivacy();
          }}
          className="text-[11px] text-[#A8843E] hover:underline"
        >
          Read Privacy Policy
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAcceptEssential}
            className="px-3 py-1.5 rounded-lg border border-[#EAE3D5] bg-[#FAF8F5] text-[11px] font-medium text-[#575A61] hover:text-[#1F2022]"
          >
            Essential Only
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-3.5 py-1.5 rounded-lg bg-[#1F2022] text-[#FAF8F5] text-[11px] font-semibold uppercase tracking-wider hover:bg-[#A8843E] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
};
