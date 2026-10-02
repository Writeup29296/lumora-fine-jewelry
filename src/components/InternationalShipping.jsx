import React, { useState } from 'react';
import { shippingData } from '../data/shippingData';
import { brandConfig } from '../data/brandConfig';
import { 
  Plane, ShieldCheck, Clock, FileCheck, Package, 
  CheckCircle2, AlertCircle, ArrowRight, Calculator, Lock 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const CAN_PROVINCES = [
  { code: 'AB', name: 'Alberta', rate: 0.05, label: '5% GST' },
  { code: 'BC', name: 'British Columbia', rate: 0.12, label: '5% GST + 7% PST' },
  { code: 'MB', name: 'Manitoba', rate: 0.12, label: '5% GST + 7% PST' },
  { code: 'NB', name: 'New Brunswick', rate: 0.15, label: '15% HST' },
  { code: 'NL', name: 'Newfoundland', rate: 0.15, label: '15% HST' },
  { code: 'NS', name: 'Nova Scotia', rate: 0.15, label: '15% HST' },
  { code: 'ON', name: 'Ontario', rate: 0.13, label: '13% HST' },
  { code: 'PE', name: 'Prince Edward Island', rate: 0.15, label: '15% HST' },
  { code: 'QC', name: 'Quebec', rate: 0.14975, label: '5% GST + 9.975% QST' },
  { code: 'SK', name: 'Saskatchewan', rate: 0.11, label: '5% GST + 6% PST' },
];

export const InternationalShipping = () => {
  const { formatPrice } = useCurrency();

  // Interactive Estimator State
  const [calcCountry, setCalcCountry] = useState('USA');
  const [calcAmount, setCalcAmount] = useState(420);
  const [calcProvince, setCalcProvince] = useState('ON');

  // Duty Calculation
  const isUsDutyFree = calcCountry === 'USA' && calcAmount < 800;
  const usDuty = isUsDutyFree ? 0 : Math.round(calcAmount * 0.055);
  
  const canProvinceObj = CAN_PROVINCES.find((p) => p.code === calcProvince) || CAN_PROVINCES[6];
  const canJewelryDuty = Math.round(calcAmount * 0.065);
  const canProvTax = Math.round((calcAmount + canJewelryDuty) * canProvinceObj.rate);

  return (
    <section id="shipping-customs" className="py-16 sm:py-24 bg-[#0d0e15] border-b border-white/10 text-[#e0e2ec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
            <Plane className="w-3.5 h-3.5" />
            <span>North America Express Corridor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight">
            Seamless Cross-Border Shipping to USA & Canada
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            Shipping precious solid gold and silver overseas requires ironclad legal compliance, electronic CSB-V clearance, and trusted air express carriers. Here is how we guarantee a frictionless delivery.
          </p>
        </div>

        {/* North America Core Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {shippingData.northAmericaHighlights.map((dest, idx) => (
            <div 
              key={idx} 
              className="p-6 sm:p-8 rounded-2xl bg-[#12151e] border border-white/10 hover:border-[#d4af37]/40 transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{dest.flag}</span>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white">{dest.country}</h3>
                      <p className="text-xs text-[#d4af37] font-semibold">{dest.threshold}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                    {dest.deliveryTime}
                  </span>
                </div>

                {/* Duty Box */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{dest.dutyTitle}</span>
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {dest.dutyDetails}
                  </p>
                </div>

                {/* Feature Checkmarks */}
                <ul className="space-y-2 text-xs text-white/70">
                  {dest.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/5 text-[11px] text-white/40 flex items-center justify-between">
                <span>Carrier: {dest.couriers}</span>
                <span className="text-emerald-400 font-medium">Signature Required</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Duty & Delivery Estimator */}
        <div className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-b from-[#141722] to-[#0e1017] p-6 sm:p-8 mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4" />
                <span>Live Customs & Transit Calculator</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                Estimate Your USA / Canada Duty & Delivery Date
              </h3>
            </div>
            <span className="text-xs text-white/50">
              Live updates via official Indian CSB-V EDI rates
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Calculator Inputs */}
            <div className="lg:col-span-6 space-y-5">
              {/* Destination Radio */}
              <div>
                <label className="text-xs uppercase text-white/70 font-medium block mb-2">
                  Destination Country:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCalcCountry('USA')}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      calcCountry === 'USA'
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-white'
                        : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                    }`}
                  >
                    <span>🇺🇸 United States</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcCountry('Canada')}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      calcCountry === 'Canada'
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-white'
                        : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                    }`}
                  >
                    <span>🇨🇦 Canada</span>
                  </button>
                </div>
              </div>

              {/* Order Value Slider / Input */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <label className="text-white/70 uppercase font-medium">Estimated Order Value (USD):</label>
                  <span className="font-mono text-[#d4af37] font-bold text-sm">${calcAmount} USD</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="1500"
                  step="10"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                  <span>$80</span>
                  <span className="text-emerald-400 font-semibold">$800 (US Section 321 Threshold)</span>
                  <span>$1,500</span>
                </div>
              </div>

              {/* Canadian Province dropdown if Canada selected */}
              {calcCountry === 'Canada' && (
                <div>
                  <label className="text-xs uppercase text-white/70 font-medium block mb-1.5">
                    Canadian Province:
                  </label>
                  <select
                    value={calcProvince}
                    onChange={(e) => setCalcProvince(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#1a1d26] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {CAN_PROVINCES.map((prov) => (
                      <option key={prov.code} value={prov.code}>
                        {prov.name} ({prov.label})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Calculator Results Display */}
            <div className="lg:col-span-6 p-6 rounded-xl bg-black/40 border border-white/10 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                Transparent Cross-Border Summary
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Item Value:</span>
                  <span className="font-mono text-white">${calcAmount} USD</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>DHL Express Air Courier:</span>
                  <span className="font-mono text-emerald-400">
                    {calcAmount >= 150 ? 'FREE (Orders over $150)' : '$24.00 USD'}
                  </span>
                </div>

                {calcCountry === 'USA' ? (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <div className="flex justify-between items-center text-emerald-400 font-semibold">
                      <span>US Customs Duty (Section 321):</span>
                      <span className="text-sm font-mono">{isUsDutyFree ? '$0.00 (Duty-Free)' : `~$${usDuty} USD`}</span>
                    </div>
                    <p className="text-[11px] text-white/60">
                      {isUsDutyFree 
                        ? '100% duty-free and tariff-free under 19 U.S.C. 1321. No customs paperwork required.'
                        : 'Over $800 threshold: Subject to formal entry ~5.5% duty pre-arranged via DHL.'}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1">
                    <div className="flex justify-between items-center text-amber-300 font-semibold">
                      <span>Canada DDP Total (Tariff + Tax):</span>
                      <span className="text-sm font-mono">${canJewelryDuty + canProvTax} USD</span>
                    </div>
                    <p className="text-[11px] text-white/60">
                      Includes 6.5% CBSA jewelry tariff (${canJewelryDuty}) + {canProvinceObj.label} (${canProvTax}). Pre-cleared so your package arrives directly at your door with zero COD fees.
                    </p>
                  </div>
                )}

                <div className="flex justify-between text-white/70 pt-2 border-t border-white/10">
                  <span>Estimated Delivery Timeline:</span>
                  <span className="font-semibold text-white">3 to 5 Business Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Packaging Security Protocol */}
        <div>
          <h3 className="text-2xl font-serif text-white text-center mb-8">
            White-Glove Armored Packaging Protocol
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingData.packagingSteps.map((pkg) => (
              <div 
                key={pkg.step}
                className="p-5 rounded-xl bg-[#12151e] border border-white/5 space-y-2 relative"
              >
                <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 text-[#d4af37] font-bold text-xs flex items-center justify-center font-mono">
                  {pkg.step}
                </div>
                <h4 className="text-sm font-semibold text-white font-serif">{pkg.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed font-light">{pkg.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
