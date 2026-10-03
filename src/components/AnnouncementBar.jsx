import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Plane, ShieldCheck } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const AnnouncementBar = ({ onNavigate }) => {
  const { settings } = useSettings();
  const [currentIdx, setCurrentIdx] = useState(0);

  const messages = [
    {
      icon: Sparkles,
      text: settings?.announcement1 || 'Direct Atelier Pricing: Handcrafted in Surat • Zero 400% Retail Markups',
      linkText: settings?.announcement1Link || 'Our Atelier Story',
      page: settings?.announcement1Page || 'about'
    },
    {
      icon: ShieldCheck,
      text: settings?.announcement2 || '🌍 Worldwide Insured Express Delivery • Door-to-Door Tracking',
      linkText: settings?.announcement2Link || 'Shipping Policy',
      page: settings?.announcement2Page || 'shipping'
    },
    {
      icon: Plane,
      text: settings?.announcement3 || 'Complimentary Insured DHL Air Express on Orders Over $150 • 30-Day Effortless Returns',
      linkText: settings?.announcement3Link || '30-Day Return Policy',
      page: settings?.announcement3Page || 'returns'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [messages.length]);

  if (settings?.announcementActive === false) {
    return null;
  }

  const msg = messages[currentIdx] || messages[0];
  const Icon = msg.icon;

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % messages.length);
  };

  return (
    <div className="bg-[#FAF8F5] border-b border-[#EAE3D5] py-2 px-3 text-xs tracking-wider relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[#575A61] gap-2">
        
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="p-1 hover:text-[#1F2022] transition-colors hidden sm:block"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Central Rotating Message */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center transition-all duration-300">
          <Icon className="w-3.5 h-3.5 text-[#A8843E] shrink-0" />
          <span className="text-[#1F2022] font-medium text-[11px] sm:text-xs">
            {msg.text}
          </span>
          <button 
            onClick={() => onNavigate(msg.page)}
            className="text-[11px] text-[#A8843E] hover:text-[#1F2022] underline underline-offset-2 ml-1 hidden md:inline font-semibold"
          >
            {msg.linkText} &rarr;
          </button>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="p-1 hover:text-[#1F2022] transition-colors hidden sm:block"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
