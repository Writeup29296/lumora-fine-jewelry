import React, { useState, useEffect } from 'react';
import { 
  Ruler, CheckCircle2, AlertCircle, ArrowRight, 
  Sparkles, Compass, CreditCard, Printer, Globe, 
  Maximize2, RotateCcw, Info, Sliders
} from 'lucide-react';

export const INTERNATIONAL_RING_SIZES = [
  { us: '3', uk: 'F', eu: '44', germany: 14.0, japan: '4', india: '6', diameterMm: 14.0, diameterIn: 0.551, circumMm: 44.0 },
  { us: '3.5', uk: 'F 1/2', eu: '45', germany: 14.4, japan: '5', india: '7', diameterMm: 14.4, diameterIn: 0.567, circumMm: 45.2 },
  { us: '4', uk: 'H', eu: '47', germany: 14.9, japan: '6', india: '8', diameterMm: 14.9, diameterIn: 0.587, circumMm: 46.8 },
  { us: '4.5', uk: 'I', eu: '48', germany: 15.3, japan: '7', india: '9', diameterMm: 15.3, diameterIn: 0.602, circumMm: 48.0 },
  { us: '5', uk: 'J 1/2', eu: '49', germany: 15.7, japan: '8', india: '10', diameterMm: 15.7, diameterIn: 0.618, circumMm: 49.3 },
  { us: '5.5', uk: 'K 1/2', eu: '51', germany: 16.1, japan: '9', india: '11', diameterMm: 16.1, diameterIn: 0.634, circumMm: 50.6 },
  { us: '6', uk: 'L 1/2', eu: '52', germany: 16.5, japan: '11', india: '12', diameterMm: 16.5, diameterIn: 0.650, circumMm: 51.9 },
  { us: '6.5', uk: 'M 1/2', eu: '53', germany: 16.9, japan: '12', india: '13', diameterMm: 16.9, diameterIn: 0.665, circumMm: 53.1 },
  { us: '7', uk: 'N 1/2', eu: '54', germany: 17.3, japan: '14', india: '14', diameterMm: 17.3, diameterIn: 0.681, circumMm: 54.4 },
  { us: '7.5', uk: 'O 1/2', eu: '56', germany: 17.7, japan: '15', india: '15', diameterMm: 17.7, diameterIn: 0.697, circumMm: 55.7 },
  { us: '8', uk: 'P 1/2', eu: '57', germany: 18.1, japan: '16', india: '16', diameterMm: 18.1, diameterIn: 0.713, circumMm: 57.0 },
  { us: '8.5', uk: 'Q 1/2', eu: '58', germany: 18.5, japan: '17', india: '17', diameterMm: 18.5, diameterIn: 0.728, circumMm: 58.3 },
  { us: '9', uk: 'R 1/2', eu: '60', germany: 19.0, japan: '18', india: '18', diameterMm: 19.0, diameterIn: 0.748, circumMm: 59.5 },
  { us: '9.5', uk: 'S 1/2', eu: '61', germany: 19.4, japan: '19', india: '19', diameterMm: 19.4, diameterIn: 0.764, circumMm: 60.8 },
  { us: '10', uk: 'T 1/2', eu: '62', germany: 19.8, japan: '21', india: '20', diameterMm: 19.8, diameterIn: 0.780, circumMm: 62.1 },
  { us: '10.5', uk: 'U 1/2', eu: '63', germany: 20.2, japan: '22', india: '21', diameterMm: 20.2, diameterIn: 0.795, circumMm: 63.4 },
  { us: '11', uk: 'V 1/2', eu: '65', germany: 20.6, japan: '23', india: '22', diameterMm: 20.6, diameterIn: 0.811, circumMm: 64.6 },
  { us: '11.5', uk: 'W 1/2', eu: '66', germany: 21.0, japan: '24', india: '23', diameterMm: 21.0, diameterIn: 0.827, circumMm: 65.9 },
  { us: '12', uk: 'X 1/2', eu: '67', germany: 21.4, japan: '25', india: '24', diameterMm: 21.4, diameterIn: 0.843, circumMm: 67.2 },
  { us: '12.5', uk: 'Y 1/2', eu: '68', germany: 21.8, japan: '26', india: '25', diameterMm: 21.8, diameterIn: 0.858, circumMm: 68.5 },
  { us: '13', uk: 'Z 1/2', eu: '70', germany: 22.2, japan: '27', india: '26', diameterMm: 22.2, diameterIn: 0.874, circumMm: 69.7 }
];

export const RingSizeGuidePage = ({ onNavigate }) => {
  // Sizing Table selection
  const [selectedSize, setSelectedSize] = useState('6.5');
  const [regionFilter, setRegionFilter] = useState('all'); // 'all', 'na', 'uk', 'eu', 'asia'

  // At-Home Sizer Tool: Method 1 (Place Ring On Screen)
  // Pixels per mm calibration (standard 96 DPI screen is ~3.78 px/mm)
  const [pxPerMm, setPxPerMm] = useState(3.78);
  const [cardWidthPx, setCardWidthPx] = useState(324); // 85.6mm * 3.78px ≈ 324px
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [screenRingDiameterMm, setScreenRingDiameterMm] = useState(16.9); // default US 6.5

  // At-Home Sizer Tool: Method 2 (String Circumference)
  const [inputCircumference, setInputCircumference] = useState('53.1');

  // Active chart entry based on selected size
  const activeEntry = INTERNATIONAL_RING_SIZES.find(r => r.us === selectedSize) || INTERNATIONAL_RING_SIZES[7];

  // Find closest size for the on-screen physical ring measurement
  const getClosestFromDiameter = (diameter) => {
    let closest = INTERNATIONAL_RING_SIZES[0];
    let minDiff = Math.abs(diameter - closest.diameterMm);
    for (const item of INTERNATIONAL_RING_SIZES) {
      const diff = Math.abs(diameter - item.diameterMm);
      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    }
    return closest;
  };

  // Find closest size from mm circumference input
  const getClosestFromCircumference = (circumMm) => {
    const num = parseFloat(circumMm);
    if (!num || isNaN(num)) return null;
    let closest = INTERNATIONAL_RING_SIZES[0];
    let minDiff = Math.abs(num - closest.circumMm);
    for (const item of INTERNATIONAL_RING_SIZES) {
      const diff = Math.abs(num - item.circumMm);
      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    }
    return closest;
  };

  const ringOnScreenMatch = getClosestFromDiameter(screenRingDiameterMm);
  const circumferenceMatch = getClosestFromCircumference(inputCircumference);

  // Update pixels per mm when card width slider moves
  const handleCardSlider = (newWidthPx) => {
    setCardWidthPx(newWidthPx);
    // Standard credit card ISO/IEC 7810 ID-1 is exactly 85.60 mm wide
    const newPxPerMm = newWidthPx / 85.60;
    setPxPerMm(newPxPerMm);
  };

  const handlePrintSizer = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Precision Sizing Standards</span>
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#1F2022] font-normal">
          International Ring Size Guide & At-Home Sizer
        </h1>
        <p className="text-sm text-[#575A61] leading-relaxed">
          Fine heirloom rings require a tailored, comfortable fit. Use our calibrated on-screen ring sizer, DIY string calculator, or the country-wise international conversion chart to ensure your Lumora ring fits flawlessly.
        </p>
      </div>

      {/* 2. AT-HOME INTERACTIVE RING SIZER SUITE */}
      <div className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D5]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] text-[11px] font-semibold text-[#A8843E] uppercase tracking-wider mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive At-Home Measurement Studio</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1F2022] font-medium">
              At-Home Ring Sizer Tools
            </h2>
            <p className="text-xs text-[#747780]">
              Measure using an existing ring on your screen, calculate from a paper strip, or print our 1:1 scale guide.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintSizer}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#EAE3D5] text-xs font-semibold text-[#1F2022] rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4 text-[#A8843E]" />
              <span>Print 1:1 Sizing Sheet</span>
            </button>
          </div>
        </div>

        {/* METHOD 1: PLACE YOUR RING ON SCREEN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Interactive Ring Circle */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-[#FAF8F5] rounded-3xl border border-[#EAE3D5] relative min-h-[420px]">
            <div className="text-center space-y-1 mb-6">
              <span className="text-xs uppercase tracking-wider text-[#A8843E] font-semibold block">
                Method A: Place Existing Ring Over Circle
              </span>
              <p className="text-xs text-[#575A61] max-w-xs">
                Place an existing well-fitting ring directly on your screen. Adjust the slider until the golden circle aligns with the <strong>inside edge</strong> of your ring.
              </p>
            </div>

            {/* True Millimeter Circle Sizing (Scaled via pxPerMm) */}
            <div className="relative flex items-center justify-center my-4">
              <div
                className="rounded-full border-4 border-[#C5A059] flex items-center justify-center bg-white shadow-md transition-all duration-150 relative"
                style={{
                  width: `${Math.round(screenRingDiameterMm * pxPerMm)}px`,
                  height: `${Math.round(screenRingDiameterMm * pxPerMm)}px`,
                  maxWidth: '280px',
                  maxHeight: '280px'
                }}
              >
                {/* Crosshair guidelines */}
                <div className="absolute inset-x-0 top-1/2 border-t border-[#C5A059]/20 -translate-y-1/2 pointer-events-none" />
                <div className="absolute inset-y-0 left-1/2 border-l border-[#C5A059]/20 -translate-x-1/2 pointer-events-none" />

                <div className="text-center p-2 z-10 select-none">
                  <span className="block font-serif text-2xl font-bold text-[#1F2022]">
                    US {ringOnScreenMatch.us}
                  </span>
                  <span className="block text-[11px] font-mono text-[#A8843E] font-semibold">
                    {screenRingDiameterMm.toFixed(1)} mm
                  </span>
                </div>
              </div>
            </div>

            {/* Circle Slider Controls */}
            <div className="w-full max-w-xs space-y-3 mt-4">
              <div className="flex items-center justify-between text-xs text-[#575A61]">
                <span>14.0 mm (US 3)</span>
                <span className="font-semibold text-[#1F2022]">Inside Diameter</span>
                <span>22.2 mm (US 13)</span>
              </div>
              <input
                type="range"
                min="14.0"
                max="22.2"
                step="0.1"
                value={screenRingDiameterMm}
                onChange={(e) => setScreenRingDiameterMm(parseFloat(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer"
              />
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setScreenRingDiameterMm(prev => Math.max(14.0, Number((prev - 0.4).toFixed(1))))}
                  className="px-3 py-1 bg-white border border-[#EAE3D5] rounded text-xs font-bold text-[#1F2022] hover:bg-[#F4EFE6]"
                >
                  - Smaller
                </button>
                <span className="font-mono text-xs font-semibold text-[#1F2022]">
                  {screenRingDiameterMm.toFixed(1)} mm
                </span>
                <button
                  onClick={() => setScreenRingDiameterMm(prev => Math.min(22.2, Number((prev + 0.4).toFixed(1))))}
                  className="px-3 py-1 bg-white border border-[#EAE3D5] rounded text-xs font-bold text-[#1F2022] hover:bg-[#F4EFE6]"
                >
                  + Larger
                </button>
              </div>
            </div>

            {/* Screen Calibration Toggle */}
            <div className="w-full mt-6 pt-4 border-t border-[#EAE3D5] flex items-center justify-between text-xs text-[#747780]">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#A8843E]" />
                <span>Screen Scale: {pxPerMm.toFixed(2)} px/mm</span>
              </span>
              <button
                onClick={() => setIsCalibrating(!isCalibrating)}
                className="text-[#A8843E] font-semibold hover:underline"
              >
                {isCalibrating ? 'Hide Calibration' : 'Calibrate Screen 1:1'}
              </button>
            </div>

            {/* Optional Credit Card Calibration Drawer */}
            {isCalibrating && (
              <div className="w-full mt-4 p-4 rounded-xl bg-white border border-[#C5A059] space-y-3 animate-fade-in text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#A8843E]" />
                  <strong className="text-[#1F2022]">1:1 True Screen Calibration (Credit Card)</strong>
                </div>
                <p className="text-[#575A61] text-[11px]">
                  Standard debit or credit cards are exactly <strong>85.60 mm</strong> wide. Place your card against the box below and adjust the slider until the width matches your physical card exactly.
                </p>
                <div className="flex justify-center py-2">
                  <div 
                    className="h-14 bg-gradient-to-r from-amber-100 to-amber-200 border-2 border-dashed border-[#C5A059] rounded-lg flex items-center justify-center text-[11px] font-mono text-[#1F2022] font-semibold shadow-xs"
                    style={{ width: `${cardWidthPx}px`, maxWidth: '100%' }}
                  >
                    Credit / ID Card Width (85.6 mm)
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#747780]">Narrower</span>
                  <input
                    type="range"
                    min="260"
                    max="420"
                    value={cardWidthPx}
                    onChange={(e) => handleCardSlider(parseInt(e.target.value, 10))}
                    className="flex-1 accent-[#C5A059]"
                  />
                  <span className="text-[10px] text-[#747780]">Wider</span>
                  <button
                    onClick={() => handleCardSlider(324)}
                    className="text-[11px] text-[#A8843E] underline hover:text-[#1F2022]"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Real-Time Size Match across International Standards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D5]">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#A8843E]" />
                  <h3 className="font-serif text-lg text-[#1F2022] font-medium">
                    Calculated International Match
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F4EFE6] text-[#A8843E] border border-[#E0D5C1]">
                  Best Fit: US {ringOnScreenMatch.us}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#EAE3D5]">
                  <span className="text-[10px] uppercase text-[#747780] block font-semibold">US / Global Size</span>
                  <strong className="text-lg font-serif text-[#1F2022] block mt-0.5">Size {ringOnScreenMatch.us}</strong>
                  <span className="text-[10px] text-[#747780]">Lumora Standard</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#EAE3D5]">
                  <span className="text-[10px] uppercase text-[#747780] block font-semibold">UK & Australia</span>
                  <strong className="text-lg font-serif text-[#1F2022] block mt-0.5">Size {ringOnScreenMatch.uk}</strong>
                  <span className="text-[10px] text-[#747780]">British Letter</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#EAE3D5]">
                  <span className="text-[10px] uppercase text-[#747780] block font-semibold">European Union</span>
                  <strong className="text-lg font-serif text-[#1F2022] block mt-0.5">Size {ringOnScreenMatch.eu}</strong>
                  <span className="text-[10px] text-[#747780]">ISO Standard</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#EAE3D5]">
                  <span className="text-[10px] uppercase text-[#747780] block font-semibold">Germany (mm)</span>
                  <strong className="text-lg font-serif text-[#1F2022] block mt-0.5">{ringOnScreenMatch.germany} mm</strong>
                  <span className="text-[10px] text-[#747780]">Inner Diameter</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#EAE3D5]">
                  <span className="text-[10px] uppercase text-[#747780] block font-semibold">Japan & East Asia</span>
                  <strong className="text-lg font-serif text-[#1F2022] block mt-0.5">Size {ringOnScreenMatch.japan}</strong>
                  <span className="text-[10px] text-[#747780]">Asian Standard</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#EAE3D5]">
                  <span className="text-[10px] uppercase text-[#747780] block font-semibold">India</span>
                  <strong className="text-lg font-serif text-[#1F2022] block mt-0.5">Size {ringOnScreenMatch.india}</strong>
                  <span className="text-[10px] text-[#747780]">Indian Jeweler</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#575A61] border-t border-[#EAE3D5]">
                <span>Inside Circumference: <strong>{ringOnScreenMatch.circumMm} mm</strong></span>
                <span>Inside Diameter: <strong>{ringOnScreenMatch.diameterMm} mm ({ringOnScreenMatch.diameterIn}")</strong></span>
              </div>
            </div>

            {/* METHOD 2: STRING / PAPER STRIP CALCULATOR */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D5] space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#F5F1E8]">
                <Ruler className="w-4 h-4 text-[#A8843E]" />
                <h3 className="font-serif text-base text-[#1F2022] font-medium">
                  Method B: Finger Circumference (String or Paper Strip)
                </h3>
              </div>

              <p className="text-xs text-[#575A61]">
                Wrap a string or paper strip snugly around your finger knuckle, mark where it overlaps, and measure the flat length in millimeters.
              </p>

              <div className="space-y-2 text-xs">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium block">
                  Measured Circumference (mm):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    min="44"
                    max="72"
                    placeholder="e.g. 53.1"
                    value={inputCircumference}
                    onChange={(e) => setInputCircumference(e.target.value)}
                    className="w-32 px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs font-bold text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
                  />
                  <input
                    type="range"
                    min="44.0"
                    max="70.0"
                    step="0.5"
                    value={parseFloat(inputCircumference) || 53.1}
                    onChange={(e) => setInputCircumference(e.target.value)}
                    className="flex-1 accent-[#C5A059]"
                  />
                </div>
              </div>

              {circumferenceMatch && (
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#1F2022]">
                      Matching US Size: <span className="text-[#A8843E] font-serif text-sm">US {circumferenceMatch.us}</span>
                    </span>
                    <span className="text-[11px] text-[#747780]">
                      UK: {circumferenceMatch.uk} &bull; EU: {circumferenceMatch.eu} &bull; India: {circumferenceMatch.india}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#575A61]">
                    Diameter: {circumferenceMatch.diameterMm} mm. If choosing a wide band (over 4mm), we recommend sizing up by a half size.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 3. PROFESSIONAL COUNTRY-WISE RING SIZE CHART */}
      <div className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE3D5]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] text-[11px] font-semibold text-[#A8843E] uppercase tracking-wider mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span>International Conversion Matrix</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1F2022] font-medium">
              Country-Wise Ring Size Chart
            </h2>
            <p className="text-xs text-[#747780]">
              Accredited jeweler measurements across US/Global, UK/Australia, European Union, Germany, Japan, and India.
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { id: 'all', label: 'All Standards' },
              { id: 'na', label: 'US / Global' },
              { id: 'uk', label: 'UK & Australia' },
              { id: 'eu', label: 'European Union' },
              { id: 'asia', label: 'India & Japan' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setRegionFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  regionFilter === tab.id
                    ? 'bg-[#1F2022] text-[#FAF8F5] border-[#1F2022] font-semibold shadow-2xs'
                    : 'bg-[#FAF8F5] text-[#575A61] border-[#EAE3D5] hover:border-[#C5A059]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-[#EAE3D5]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-[#1F2022] border-b border-[#EAE3D5]">
                <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">US / Global Size</th>
                {(regionFilter === 'all' || regionFilter === 'uk') && (
                  <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">UK, Australia, NZ</th>
                )}
                {(regionFilter === 'all' || regionFilter === 'eu') && (
                  <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">European Union</th>
                )}
                {(regionFilter === 'all' || regionFilter === 'eu') && (
                  <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">Germany (mm)</th>
                )}
                {(regionFilter === 'all' || regionFilter === 'asia') && (
                  <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">Japan & East Asia</th>
                )}
                {(regionFilter === 'all' || regionFilter === 'asia') && (
                  <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">India</th>
                )}
                <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">Inside Diameter</th>
                <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">Circumference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F1E8]">
              {INTERNATIONAL_RING_SIZES.map((row) => {
                const isSelected = selectedSize === row.us;
                return (
                  <tr 
                    key={row.us}
                    onClick={() => {
                      setSelectedSize(row.us);
                      setScreenRingDiameterMm(row.diameterMm);
                      setInputCircumference(row.circumMm.toString());
                    }}
                    className={`cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-[#F4EFE6] font-semibold text-[#1F2022]' 
                        : 'hover:bg-[#FAF8F5] text-[#575A61]'
                    }`}
                  >
                    <td className="py-2.5 px-4 font-serif text-sm text-[#1F2022]">
                      <span className="inline-flex items-center gap-1.5">
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#A8843E]" />}
                        <span>US {row.us}</span>
                      </span>
                    </td>
                    {(regionFilter === 'all' || regionFilter === 'uk') && (
                      <td className="py-2.5 px-4 font-medium">{row.uk}</td>
                    )}
                    {(regionFilter === 'all' || regionFilter === 'eu') && (
                      <td className="py-2.5 px-4 font-medium">{row.eu}</td>
                    )}
                    {(regionFilter === 'all' || regionFilter === 'eu') && (
                      <td className="py-2.5 px-4 font-mono">{row.germany} mm</td>
                    )}
                    {(regionFilter === 'all' || regionFilter === 'asia') && (
                      <td className="py-2.5 px-4 font-medium">{row.japan}</td>
                    )}
                    {(regionFilter === 'all' || regionFilter === 'asia') && (
                      <td className="py-2.5 px-4 font-medium">{row.india}</td>
                    )}
                    <td className="py-2.5 px-4 font-mono">{row.diameterMm} mm ({row.diameterIn}")</td>
                    <td className="py-2.5 px-4 font-mono font-medium text-[#A8843E]">{row.circumMm} mm</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-[#747780] italic">
          Click any size row above to preview in the At-Home Screen Sizer or String Calculator.
        </p>
      </div>

      {/* 4. ATELIER FIT RULES & EXPERT TIPS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
        
        <div className="p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl text-[#1F2022] font-medium">Knuckle & Temperature Physics</h3>
          <p className="text-xs text-[#575A61] leading-relaxed">
            Fingers naturally swell and contract by up to half a size throughout the day depending on climate, hydration, and activity. Measure at room temperature in the late afternoon. If your knuckle is broader than the base of your finger, measure both and choose a size midway between them so the ring glides smoothly without slipping off.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl text-[#1F2022] font-medium">Band Width & Eternity Settings</h3>
          <p className="text-xs text-[#575A61] leading-relaxed">
            Wider ring bands (4mm or wider, such as cigar bands or signets) cover more skin surface and fit tighter than a slender 1.8mm solitaire band. For wide bands, we recommend choosing a half size larger. Continuous 360&deg; eternity bands cannot be resized once forged; consult our concierge if you are uncertain of your exact size.
          </p>
        </div>

      </div>

      {/* 5. Concierge Callout */}
      <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D5] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-xl text-[#1F2022] font-medium">Still Uncertain About Your Ring Fit?</h3>
          <p className="text-xs text-[#575A61] mt-1 max-w-xl">
            Our atelier concierge provides complimentary sizing guidance before your piece is cast in gold or silver. Send us your measurements or schedule a video consultation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('shop', { category: 'rings' })}
            className="px-6 py-3 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] rounded text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
          >
            <span>Browse Ring Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
