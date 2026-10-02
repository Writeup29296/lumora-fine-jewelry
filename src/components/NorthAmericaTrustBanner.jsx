import React from 'react';
import { ShieldCheck, Plane, Award, Sparkles, CheckCircle2, Globe, Truck, RotateCcw } from 'lucide-react';
import { brandConfig } from '../data/brandConfig';

export const NorthAmericaTrustBanner = () => {
  return (
    <section className="bg-[#10131c] border-y border-white/10 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Badges Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          
          {/* US Duty Free Under $800 */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#d4af37]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <span className="text-xl">🇺🇸</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-serif">USA Section 321</h4>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">100% Duty-Free Under $800</p>
              <p className="text-[11px] text-white/50 mt-0.5 leading-snug">
                Personal shipments clear US Customs with zero tariffs or paperwork.
              </p>
            </div>
          </div>

          {/* Canada Guaranteed DDP */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#d4af37]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <span className="text-xl">🇨🇦</span>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-serif">Canada DDP Service</h4>
              <p className="text-[11px] text-amber-300 font-medium">Zero Surprise Door Fees</p>
              <p className="text-[11px] text-white/50 mt-0.5 leading-snug">
                GST/HST & CBSA jewelry duties pre-cleared for hassle-free delivery.
              </p>
            </div>
          </div>

          {/* DHL Express 3-5 Days */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#d4af37]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0 text-[#d4af37]">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-serif">DHL Express Air</h4>
              <p className="text-[11px] text-[#d4af37] font-medium">3–5 Days Worldwide</p>
              <p className="text-[11px] text-white/50 mt-0.5 leading-snug">
                100% Insured armored courier transit with direct signature delivery.
              </p>
            </div>
          </div>

          {/* BIS Hallmarked Gold & 925 Silver */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#d4af37]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-serif">Govt. BIS Hallmarked</h4>
              <p className="text-[11px] text-blue-300 font-medium">14K, 18K & 925 Silver</p>
              <p className="text-[11px] text-white/50 mt-0.5 leading-snug">
                Physical assay certificate of authenticity included with each piece.
              </p>
            </div>
          </div>

        </div>

        {/* Ticker / Trust Strip */}
        <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Official Storefront: <strong className="text-white">lumorafinejewelery.com</strong>
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span className="flex items-center gap-1.5 text-white/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" /> CSB-V Electronic Export Clearance
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-white/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" /> Zero 500% Fifth Ave Markups
            </span>
            <span className="flex items-center gap-1.5 text-white/80">
              <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" /> 30-Day US/CA Returns
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
