import React, { useState } from 'react';
import { 
  HelpCircle, Ruler, CheckCircle2, AlertCircle, 
  ArrowRight, Sparkles, Compass 
} from 'lucide-react';

export const RING_SIZE_DATA = [
  { us: '4', diameterMm: 14.9, circumMm: 46.8, uk: 'H', eu: '47' },
  { us: '4.5', diameterMm: 15.3, circumMm: 48.0, uk: 'I', eu: '48' },
  { us: '5', diameterMm: 15.7, circumMm: 49.3, uk: 'J 1/2', eu: '49' },
  { us: '5.5', diameterMm: 16.1, circumMm: 50.6, uk: 'K 1/2', eu: '51' },
  { us: '6', diameterMm: 16.5, circumMm: 51.9, uk: 'L 1/2', eu: '52' },
  { us: '6.5', diameterMm: 16.9, circumMm: 53.1, uk: 'M 1/2', eu: '53' },
  { us: '7', diameterMm: 17.3, circumMm: 54.4, uk: 'N 1/2', eu: '54' },
  { us: '7.5', diameterMm: 17.7, circumMm: 55.7, uk: 'O 1/2', eu: '56' },
  { us: '8', diameterMm: 18.1, circumMm: 57.0, uk: 'P 1/2', eu: '57' },
  { us: '8.5', diameterMm: 18.5, circumMm: 58.3, uk: 'Q 1/2', eu: '58' },
  { us: '9', diameterMm: 19.0, circumMm: 59.5, uk: 'R 1/2', eu: '60' },
  { us: '9.5', diameterMm: 19.4, circumMm: 60.8, uk: 'S 1/2', eu: '61' },
  { us: '10', diameterMm: 19.8, circumMm: 62.1, uk: 'T 1/2', eu: '62' },
  { us: '10.5', diameterMm: 20.2, circumMm: 63.4, uk: 'U 1/2', eu: '63' },
  { us: '11', diameterMm: 20.6, circumMm: 64.6, uk: 'V 1/2', eu: '65' },
  { us: '11.5', diameterMm: 21.0, circumMm: 65.9, uk: 'W 1/2', eu: '66' },
  { us: '12', diameterMm: 21.4, circumMm: 67.2, uk: 'X 1/2', eu: '67' },
  { us: '12.5', diameterMm: 21.8, circumMm: 68.5, uk: 'Y 1/2', eu: '68' },
  { us: '13', diameterMm: 22.2, circumMm: 69.7, uk: 'Z 1/2', eu: '70' }
];

export const RingSizeGuidePage = ({ onNavigate }) => {
  const [selectedSize, setSelectedSize] = useState('6.5');
  const [inputCircumference, setInputCircumference] = useState('53');

  const activeEntry = RING_SIZE_DATA.find(r => r.us === selectedSize) || RING_SIZE_DATA[5];

  // Helper to find closest size from mm circumference
  const closestFromMm = () => {
    const num = parseFloat(inputCircumference);
    if (!num || isNaN(num)) return null;
    let closest = RING_SIZE_DATA[0];
    let minDiff = Math.abs(num - closest.circumMm);
    for (const item of RING_SIZE_DATA) {
      const diff = Math.abs(num - item.circumMm);
      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    }
    return closest;
  };

  const calculatedSize = closestFromMm();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Precision Fit Standards
        </span>
        <h1 className="text-4xl font-serif text-[#1F2022] font-normal">
          North American Ring Size Guide
        </h1>
        <p className="text-sm text-[#575A61] leading-relaxed">
          United States and Canadian jewelers use the standardized US ring sizing scale. Use our interactive converter and millimeter measurement guide to guarantee your heirloom ring fits comfortably from day one.
        </p>
      </div>

      {/* 2. Interactive Sizer Tool */}
      <div className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D5]">
          <div>
            <h2 className="font-serif text-2xl text-[#1F2022] font-medium">Interactive Size Converter</h2>
            <p className="text-xs text-[#747780]">Select a US/Canadian size or enter millimeter circumference.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#575A61]">Select US Size:</span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-sm font-semibold text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
            >
              {RING_SIZE_DATA.map((r) => (
                <option key={r.us} value={r.us}>
                  Size US {r.us} ({r.circumMm} mm)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Visual Ring Circle Scale */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 flex flex-col items-center justify-center p-8 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D5]">
            <span className="text-xs uppercase tracking-wider text-[#A8843E] font-semibold mb-4">
              Inside Diameter Preview (Scale)
            </span>
            <div
              className="rounded-full border-4 border-[#C5A059] flex items-center justify-center bg-white shadow-inner transition-all duration-300"
              style={{
                width: `${Math.min(220, activeEntry.diameterMm * 8.5)}px`,
                height: `${Math.min(220, activeEntry.diameterMm * 8.5)}px`
              }}
            >
              <div className="text-center p-2">
                <span className="block font-serif text-2xl font-bold text-[#1F2022]">US {activeEntry.us}</span>
                <span className="block text-[11px] font-mono text-[#A8843E] font-medium">{activeEntry.diameterMm} mm</span>
              </div>
            </div>
            <p className="text-[10px] text-[#747780] mt-4 text-center">
              Scale representation. Measure across inside edge of your existing ring.
            </p>
          </div>

          <div className="md:col-span-7 space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                <span className="text-[10px] uppercase text-[#747780] block">US / Canada</span>
                <strong className="text-base font-serif text-[#1F2022] block mt-0.5">Size {activeEntry.us}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                <span className="text-[10px] uppercase text-[#747780] block">Inside Diameter</span>
                <strong className="text-base font-serif text-[#1F2022] block mt-0.5">{activeEntry.diameterMm} mm</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                <span className="text-[10px] uppercase text-[#747780] block">Circumference</span>
                <strong className="text-base font-serif text-[#1F2022] block mt-0.5">{activeEntry.circumMm} mm</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                <span className="text-[10px] uppercase text-[#747780] block">UK / Australia</span>
                <strong className="text-base font-serif text-[#1F2022] block mt-0.5">Size {activeEntry.uk}</strong>
              </div>
            </div>

            {/* Calculate size from MM input */}
            <div className="p-4 rounded-xl bg-white border border-[#EAE3D5] space-y-2">
              <span className="font-semibold text-[#1F2022] block">Measure by Finger Circumference (mm):</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 53"
                  value={inputCircumference}
                  onChange={(e) => setInputCircumference(e.target.value)}
                  className="px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-xs text-[#1F2022] w-32"
                />
                <button
                  onClick={() => {
                    if (calculatedSize) setSelectedSize(calculatedSize.us);
                  }}
                  className="px-4 py-1.5 bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] rounded text-xs font-medium"
                >
                  Convert to US Size
                </button>
              </div>
              {calculatedSize && (
                <p className="text-[#A8843E] font-medium text-xs pt-1">
                  Closest fit: <strong>US Size {calculatedSize.us}</strong> ({calculatedSize.circumMm} mm circumference &bull; {calculatedSize.diameterMm} mm diameter).
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 3. Sizing Table */}
      <div className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D5]">
          <h2 className="font-serif text-2xl text-[#1F2022] font-medium">Full US / Canada Millimeter Conversion Table</h2>
          <span className="text-xs text-[#747780]">Sizes 4 to 13</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-[#1F2022] border-b border-[#EAE3D5]">
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">US / Canada Size</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Inside Diameter (mm)</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Circumference (mm)</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">British / Australian Size</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">European Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F1E8]">
              {RING_SIZE_DATA.map((row) => (
                <tr 
                  key={row.us}
                  className={`hover:bg-[#FAF8F5] transition-colors ${
                    selectedSize === row.us ? 'bg-[#F4EFE6] font-semibold text-[#1F2022]' : 'text-[#575A61]'
                  }`}
                >
                  <td className="py-2.5 px-4 font-serif text-sm">US {row.us}</td>
                  <td className="py-2.5 px-4 font-mono">{row.diameterMm} mm</td>
                  <td className="py-2.5 px-4 font-mono">{row.circumMm} mm</td>
                  <td className="py-2.5 px-4">{row.uk}</td>
                  <td className="py-2.5 px-4">{row.eu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. DIY Measurement Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <Ruler className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl text-[#1F2022] font-medium">Method 1: Measure An Existing Ring</h3>
          <p className="text-xs text-[#575A61] leading-relaxed">
            1. Select a ring that currently fits the intended finger comfortably.<br />
            2. Place the ring flat against a millimeter ruler.<br />
            3. Measure straight across the inside edge of the ring circle (do not include the metal rim width).<br />
            4. Compare your measurement to the <strong>Inside Diameter (mm)</strong> in the chart above.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl text-[#1F2022] font-medium">Method 2: Paper Strip Measurement</h3>
          <p className="text-xs text-[#575A61] leading-relaxed">
            1. Cut a narrow strip of paper approximately 100mm long.<br />
            2. Wrap the strip snugly around the base of your finger, keeping it snug against skin.<br />
            3. Mark the exact point where the paper overlaps with a pen.<br />
            4. Measure the marked length with a ruler in millimeters to find your <strong>Circumference (mm)</strong>.
          </p>
        </div>

      </div>

      {/* 5. Essential Sizing Rules */}
      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-3 text-xs text-[#575A61]">
        <h4 className="font-semibold text-[#1F2022] uppercase tracking-wider text-[11px]">
          Important Sizing Tips from the Atelier:
        </h4>
        <ul className="space-y-1.5 list-disc list-inside">
          <li><strong>Consider Knuckle Width:</strong> If your knuckle is significantly larger than the base of your finger, measure both and choose a size halfway between them.</li>
          <li><strong>Measure at Room Temperature:</strong> Fingers expand in warm environments and contract in cold weather. Never measure immediately after exercise or cold outdoor air.</li>
          <li><strong>Wide Bands (Over 4mm):</strong> Wider ring profiles fit tighter than delicate 1.8mm solitaires. If ordering a wide signet or cigar band, consider ordering a half-size larger.</li>
          <li><strong>Eternity Bands:</strong> Continuous 360-degree eternity rings with stones around the entire circumference cannot be resized after forging. Contact our concierge for complimentary sizing consultation.</li>
        </ul>
      </div>

    </div>
  );
};
