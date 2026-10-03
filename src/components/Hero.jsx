import React from 'react';
import { brandConfig } from '../data/brandConfig';
import { ShieldCheck, Plane, Star, Award, Sparkles, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Hero = ({ onOpenBespoke }) => {
  const { openCart } = useCart();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-white/10">
      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#d4af37]/15 via-[#8a681c]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#94a3b8]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Value Propositions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Direct Cross-Border Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#141722] text-xs font-medium text-[#f3e5ab]">
              <span className="flex text-amber-400">
                {'★'.repeat(5)}
              </span>
              <span className="font-semibold text-white">Direct-from-Atelier Export</span>
              <span className="text-white/40">&bull;</span>
              <span className="text-emerald-400 font-medium">Duty-Free US Entry Under $800</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-[1.12]">
              Heirloom <span className="gold-gradient-text italic font-serif">Solid Gold</span> &{' '}
              <span className="silver-gradient-text italic font-serif">925 Sterling Silver</span>, Direct to North America.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-light">
              By crafting directly in India's premier diamond and jewelry capital of Surat, <strong className="text-white font-medium">Lumora</strong> eliminates 500%+ luxury retail markups. Every piece is BIS Hallmarked, packaged in vault presentation boxes, and delivered to your doorstep <strong className="text-white">Worldwide</strong> via DHL Express in 3–5 days.
            </p>

            {/* Key Differentiators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Origin:</strong> Handcrafted in Surat, Gujarat</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Worldwide:</strong> 100% Insured Air Express Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span><strong>Purity:</strong> BIS 14K (585) & 18K (750) + 925 Silver</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span><strong>Direct Atelier:</strong> Zero Broker & Retail Markups</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href="#collections"
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#0b0c10] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#d4af37]/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2.5"
              >
                <span>Explore Fine Collections</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#shipping-customs"
                className="px-6 py-4 rounded-xl border border-white/15 bg-white/5 hover:border-[#d4af37]/50 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Plane className="w-4 h-4 text-[#d4af37]" />
                <span>US & Canada Customs Calculator</span>
              </a>

              <button
                onClick={onOpenBespoke}
                className="px-3 py-2 text-xs text-[#d4af37] hover:underline font-medium flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Ring / Bridal Inquiries &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Jewel Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame with Gold Border Glow */}
              <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#12141c] gold-border-glow group">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85"
                  alt="Lumora Fine Jewelry - Astraea 14K Solitaire Ring"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-black/20" />

                {/* Floating Bottom Card: Featured Piece */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0b0c10]/90 backdrop-blur-md border border-white/10 shadow-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">Featured Masterpiece</span>
                      <h4 className="text-sm font-serif font-bold text-white">Astraea Oval Solitaire Ring</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                      Worldwide Insured Delivery
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                    <span className="text-white/60">BIS 14K Solid Gold &bull; 1.75ct DEF VVS1</span>
                    <a
                      href="#collections"
                      className="text-[#d4af37] hover:text-[#f3e5ab] font-medium flex items-center gap-1"
                    >
                      <span>View Specs</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Certification Badge */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-[#12151e] border border-[#d4af37]/40 rounded-xl p-3.5 shadow-2xl flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider">Hallmark Standard</p>
                  <p className="text-xs font-bold text-white font-mono">BIS 585 / 750 &bull; 925</p>
                </div>
              </div>

              {/* Floating Delivery Guarantee */}
              <div className="absolute -bottom-4 -right-4 bg-[#12151e] border border-white/15 rounded-xl p-3.5 shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider">DHL Express Direct</p>
                  <p className="text-xs font-bold text-white">3–5 Days Worldwide Priority</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
