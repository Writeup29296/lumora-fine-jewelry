import React, { useState } from 'react';
import { Ruler, ShieldAlert, Sparkles, Check, Info } from 'lucide-react';

const SIZES = [
  { us: '4', uk: 'H', eu: '47', ind: '7', diaMm: '14.9', circMm: '46.8' },
  { us: '5', uk: 'J 1/2', eu: '49', ind: '9', diaMm: '15.7', circMm: '49.3' },
  { us: '6', uk: 'L 1/2', eu: '51.5', ind: '11', diaMm: '16.5', circMm: '51.9' },
  { us: '7', uk: 'N 1/2', eu: '54', ind: '14', diaMm: '17.3', circMm: '54.4' },
  { us: '8', uk: 'P 1/2', eu: '56.5', ind: '16', diaMm: '18.1', circMm: '57.0' },
  { us: '9', uk: 'R 1/2', eu: '59', ind: '19', diaMm: '18.9', circMm: '59.5' },
  { us: '10', uk: 'T 1/2', eu: '61.5', ind: '21', diaMm: '19.8', circMm: '62.1' },
  { us: '11', uk: 'V 1/2', eu: '64', ind: '24', diaMm: '20.6', circMm: '64.6' },
  { us: '12', uk: 'X 1/2', eu: '66.5', ind: '26', diaMm: '21.4', circMm: '67.2' },
];

export const RingSizeGuide = () => {
  const [selectedSize, setSelectedSize] = useState(SIZES[3]); // Default US 7

  return (
    <section id="sizing-guide" className="py-16 sm:py-24 border-b border-white/10 bg-[#0d0e15] text-[#e0e2ec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#f3e5ab] uppercase tracking-widest">
            <Ruler className="w-3.5 h-3.5 text-[#d4af37]" />
            North American Sizing Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight">
            Ring Size Converter & Metal Purity Guide
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            Ensure an exact fit before ordering. We craft custom half and quarter sizes (e.g. 6.25, 7.75) at no extra charge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Ring Size Calculator */}
          <div className="lg:col-span-7 rounded-2xl bg-[#12151e] border border-white/10 p-6 sm:p-8 text-left space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-serif font-medium text-white">
                  Universal Ring Size Converter
                </h3>
                <p className="text-xs text-white/50">
                  Select your usual size to see cross-border standard conversions.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#d4af37]/10 text-[#f3e5ab] font-mono">
                US & Canada Base
              </span>
            </div>

            {/* Quick Size Select Buttons */}
            <div>
              <label className="text-xs text-white/70 block mb-2 font-medium">Select US / Canada Ring Size:</label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s.us}
                    onClick={() => setSelectedSize(s)}
                    className={`w-11 h-11 rounded-lg text-sm font-semibold transition-all ${
                      selectedSize.us === s.us
                        ? 'bg-[#d4af37] text-[#0b0c10] shadow-md shadow-[#d4af37]/20 scale-105 font-bold'
                        : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                    }`}
                  >
                    {s.us}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Size Comparison Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-white/40">US & Canada</span>
                <div className="text-xl font-serif font-bold text-white">
                  Size {selectedSize.us}
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-white/40">UK / Australia</span>
                <div className="text-xl font-serif font-bold text-[#d4af37]">
                  {selectedSize.uk}
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-white/40">EU Circumference</span>
                <div className="text-xl font-serif font-bold text-white">
                  {selectedSize.eu} mm
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-white/40">Diameter</span>
                <div className="text-xl font-serif font-bold text-white/70">
                  {selectedSize.diaMm} mm
                </div>
              </div>
            </div>

            {/* Sizing Tip */}
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white/[0.02] border border-white/10 text-xs text-white/70">
              <Info className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>
                <strong>Atelier Custom Sizing:</strong> If you are between sizes or need an exact quarter size (e.g., 6.25 or 7.75), simply add a note at checkout or contact our concierge after ordering. Complimentary resizing included.
              </span>
            </div>
          </div>

          {/* Right Column: Precious Metal Purity Comparison */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h3 className="text-xl font-serif font-medium text-white">
              Understanding Our Precious Metals
            </h3>

            {/* 18K Solid Gold */}
            <div className="p-4 rounded-xl bg-[#12151e] border border-[#d4af37]/40 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#f3e5ab] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                  18K Solid Gold (BIS 750 Hallmarked)
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#f3e5ab] font-mono">75.0% Fine Gold</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Rich, saturated golden warmth prized in high-jewelry bridal heirloom pieces. Completely hypoallergenic, tarnish-proof, and crafted with nickel-safe alloys.
              </p>
            </div>

            {/* 14K Solid Gold */}
            <div className="p-4 rounded-xl bg-[#12151e] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e6ca65]" />
                  14K Solid Gold (BIS 585 Hallmarked)
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#e6ca65]/20 text-[#f3e5ab] font-mono">58.5% Fine Gold</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                The North American gold standard for engagement rings and active lifestyles. Offers superior tensile strength and scratch resistance for everyday wear.
              </p>
            </div>

            {/* 925 Sterling Silver */}
            <div className="p-4 rounded-xl bg-[#12151e] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]" />
                  925 Sterling Silver (Anti-Tarnish Rhodium Plated)
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white font-mono">92.5% Pure Silver</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Heavy, solid 925 sterling silver sealed with a protective platinum-family rhodium layer to preserve radiant mirror shine and prevent oxidation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
