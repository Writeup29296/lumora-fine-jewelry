import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Award, Gift, Check, Lock, ChevronRight } from 'lucide-react';
import { LumoraCrest } from './LumoraCrest';

export const VelvetVaultExperience = ({ onOpenSizer }) => {
  const [activeStep, setActiveStep] = useState(0);

  const ritualItems = [
    {
      title: "Signature Velvet Vault Box",
      tagline: "Hand-Crafted Presentation Box",
      desc: "Every Lumora heirloom arrives encased in a weighted, hand-upholstered velvet jewel box with brass hinges and plush champagne satin interior cushions.",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      pill: "Velvet Craftsmanship"
    },
    {
      title: "Embossed Provenance Portfolio",
      tagline: "BIS Hallmark & Gemological Certification",
      desc: "Enclosed in a gold-foil stamped envelope: Your Bureau of Indian Standards (BIS) hallmarking assay card, stone grading dossier, and Surat bench artisan card.",
      image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=800&q=80",
      pill: "Certified Provenance"
    },
    {
      title: "Atelier Suede Travel Pouch",
      tagline: "Everyday Heirloom Preservation",
      desc: "A bespoke travel pouch with anti-tarnish micro-compartments and a gold-cleaning polishing cloth to keep diamond facets firing at full dispersion.",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      pill: "Everyday Care"
    },
    {
      title: "Armored Air Transit Packaging",
      tagline: "100% Insured Worldwide Delivery",
      desc: "Dispatched from Surat via DHL Express or FedEx Priority under official Indian CSB-V regulations with serialized tamper-evident security vault seals.",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      pill: "Discreet & Insured"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#1A1B1E] text-[#FAF8F5] rounded-3xl border border-[#303238] shadow-2xl p-6 sm:p-12 lg:p-16">
      {/* Background radial gold glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#A8843E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10 sm:space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#E8D3A2] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium font-sans">
            <img src="/lumora-logo-square.png" alt="Lumora" className="w-3.5 h-3.5 object-contain" />
            <span>The High-Jewelry Unboxing Ritual</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-tight text-[#FAF8F5]">
            Unveiling The <span className="italic font-normal text-[#D8BD7B]">Velvet Vault</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A0A4AE] font-light max-w-xl mx-auto leading-relaxed">
            The acquisition of fine jewelry is an intimate ceremony. From the moment your parcel crosses your threshold, every detail mirrors the reverent quiet of Place Vendôme.
          </p>
        </div>

        {/* Interactive Ritual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 4 Interactive Step Tiles */}
          <div className="lg:col-span-6 space-y-3">
            {ritualItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                  activeStep === idx
                    ? 'bg-[#25272D] border-[#C5A059] shadow-lg shadow-[#C5A059]/5'
                    : 'bg-[#1F2024]/60 border-[#2D2F35] hover:border-[#42444C] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/40 text-[#C5A059] border border-[#C5A059]/30">
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#A0A4AE] font-sans">
                        {item.tagline}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-medium text-[#FAF8F5]">
                      {item.title}
                    </h3>

                    {activeStep === idx && (
                      <p className="text-xs text-[#B5B9C2] font-light leading-relaxed pt-1 animate-fade-in">
                        {item.desc}
                      </p>
                    )}
                  </div>

                  <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full border transition-all ${
                    activeStep === idx
                      ? 'border-[#C5A059] text-[#D8BD7B] bg-[#C5A059]/10'
                      : 'border-transparent text-[#747780]'
                  }`}>
                    {item.pill}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Visual Vault Stage */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden border border-[#3E4048] shadow-2xl bg-[#141518] group">
              <img
                src={ritualItems[activeStep].image}
                alt={ritualItems[activeStep].title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 [image-rendering:high-quality]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Monogram Overlay */}
              <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-2">
                <img src="/lumora-logo-square.png" alt="Lumora" className="w-5 h-5 object-contain" />
                <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#E8D3A2]">
                  Surat Atelier Bench Standard
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-5 left-5 right-5 text-left text-xs space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#C5A059] tracking-wider">
                  Included With Every Heirloom
                </span>
                <h4 className="font-serif text-lg text-white font-medium">
                  {ritualItems[activeStep].title}
                </h4>
                <p className="text-[11px] text-white/70 line-clamp-2 font-light">
                  {ritualItems[activeStep].desc}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* High-Jewelry Reassurance Bar */}
        <div className="pt-6 border-t border-[#2D2F35] grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          <div className="space-y-1">
            <div className="font-serif text-sm font-semibold text-[#D8BD7B]">100% BIS Hallmarked</div>
            <p className="text-[10px] text-[#80838C]">Indian Bureau of Standards assay tested</p>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-sm font-semibold text-[#D8BD7B]">Zero Conflict CVD</div>
            <p className="text-[10px] text-[#80838C]">Type IIa purity grading standard</p>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-sm font-semibold text-[#D8BD7B]">30-Day Evaluation</div>
            <p className="text-[10px] text-[#80838C]">In-hand diamond fire guarantee</p>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-sm font-semibold text-[#D8BD7B]">Complimentary Sizer</div>
            <p className="text-[10px] text-[#80838C]">Free precision ring gauge with order</p>
          </div>
        </div>

      </div>
    </section>
  );
};
