import React, { useState } from 'react';
import { Sparkles, Info } from 'lucide-react';

const SIZES = [
  { carat: '0.50 ct', mm: '5.1 mm', scale: 28, description: 'Understated, dainty daily sparkle with refined brilliance.' },
  { carat: '1.00 ct', mm: '6.5 mm', scale: 40, description: 'The timeless classic proportion for solitaires and engagement rings.' },
  { carat: '1.50 ct', mm: '7.3 mm', scale: 48, description: 'Noticeable finger coverage with substantial presence and light return.' },
  { carat: '2.00 ct', mm: '8.1 mm', scale: 56, description: 'Statement luxury solitaire with maximum fire, scintillation, and brilliance.' }
];

export const DiamondScaleVisualizer = ({ currentCarat = '1.00 ct' }) => {
  const [selected, setSelected] = useState(SIZES[1]);

  return (
    <div className="p-4 rounded-xl bg-white border border-[#EAE3D5] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1F2022]">
          <Sparkles className="w-3.5 h-3.5 text-[#A8843E]" />
          <span>Interactive Diamond Carat Scale Guide</span>
        </div>
        <span className="text-[10px] text-[#747780] font-mono">100% CVD/HPHT Certified</span>
      </div>

      {/* Carat Selector Pills */}
      <div className="grid grid-cols-4 gap-2">
        {SIZES.map((sz) => (
          <button
            key={sz.carat}
            onClick={() => setSelected(sz)}
            className={`py-2 px-1 text-center rounded-lg border text-xs transition-all ${
              selected.carat === sz.carat
                ? 'border-[#C5A059] bg-[#F4EFE6] text-[#1F2022] font-semibold shadow-xs'
                : 'border-[#EAE3D5] bg-[#FAF8F5] text-[#575A61] hover:border-[#C5A059]'
            }`}
          >
            <span className="block text-xs">{sz.carat}</span>
            <span className="block text-[10px] text-[#747780] font-mono">{sz.mm}</span>
          </button>
        ))}
      </div>

      {/* Visual Diamond on Finger / Scale Display */}
      <div className="relative h-32 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] flex flex-col items-center justify-center overflow-hidden">
        {/* Stylized finger band outline */}
        <div className="w-48 h-5 border-t-2 border-b-2 border-[#E0D5C1] bg-gradient-to-r from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] relative flex items-center justify-center">
          
          {/* Diamond setting */}
          <div 
            className="absolute rounded-full bg-gradient-to-tr from-white via-cyan-50 to-amber-100 border border-[#C5A059] shadow-lg flex items-center justify-center transition-all duration-300"
            style={{ 
              width: `${selected.scale}px`, 
              height: `${selected.scale}px`,
              boxShadow: '0 0 15px rgba(197, 160, 89, 0.45)'
            }}
          >
            {/* Sparkle faceted star effect */}
            <div className="w-2 h-2 rotate-45 bg-[#C5A059]/40 rounded-xs" />
          </div>
        </div>

        <div className="absolute bottom-2 text-center text-[11px] text-[#575A61]">
          Approximate visual diameter: <strong className="text-[#1F2022] font-mono">{selected.mm}</strong> (Round Brilliant)
        </div>
      </div>

      <p className="text-[11px] text-[#747780] leading-relaxed">
        {selected.description} All Lumora lab-grown diamonds are verified Type IIa (the purest chemical classification of diamonds, representing the top 2% of diamonds globally).
      </p>
    </div>
  );
};
