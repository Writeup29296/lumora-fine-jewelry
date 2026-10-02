import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Plane, ShieldCheck, Lock } from 'lucide-react';

const MESSAGES = [
  {
    icon: Sparkles,
    text: 'Direct Atelier Pricing: Handcrafted in Jaipur & Surat • Zero 400% Retail Markups',
    linkText: 'Our Atelier Story',
    page: 'about'
  },
  {
    icon: ShieldCheck,
    text: '🇺🇸 USA: Section 321 Duty-Free Under $800 • 🇨🇦 Canada: CBSA & Provincial DDP Pre-Cleared',
    linkText: 'Shipping & Customs',
    page: 'shipping'
  },
  {
    icon: Plane,
    text: 'Complimentary Insured DHL Air Express on Orders Over $300 • 30-Day Effortless Returns',
    linkText: '30-Day Return Policy',
    page: 'returns'
  }
];

export const AnnouncementBar = ({ onNavigate }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const msg = MESSAGES[currentIdx];
  const Icon = msg.icon;

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
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
          <span className="text-[11px] sm:text-xs font-medium text-[#1F2022]">
            {msg.text}
          </span>
          <button
            onClick={() => onNavigate(msg.page)}
            className="hidden md:inline-block text-[11px] underline decoration-[#C5A059] hover:text-[#A8843E] text-[#575A61] font-normal transition-colors"
          >
            {msg.linkText}
          </button>
        </div>

        {/* Right Arrow */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleNext}
            className="p-1 hover:text-[#1F2022] transition-colors hidden sm:block"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
