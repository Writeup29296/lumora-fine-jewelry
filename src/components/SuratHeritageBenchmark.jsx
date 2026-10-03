import React, { useState } from 'react';
import { Gem, Sparkles, Award, ShieldCheck, Compass, Eye, ArrowRight, Check } from 'lucide-react';
import { LumoraCrest } from './LumoraCrest';

export const SuratHeritageBenchmark = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('optical');

  const pillars = {
    optical: {
      badge: "Gemological Benchmark",
      title: "57-Facet Optical Fire & Dispersion",
      subtitle: "Ideal Brilliant Cut Symmetry",
      body: "Every lab diamond is cut to mathematical exacting angles (54-57% table width, 34-35° crown angle) ensuring total internal light refraction. Light enters the crown and returns as intense white brilliance (brilliance) and rainbow spectral flashes (fire).",
      specs: [
        { label: "Cut Standard", val: "Triple Excellent (3EX)" },
        { label: "Symmetry", val: "Hearts & Arrows Pattern" },
        { label: "Polish Grade", val: "Mirror Facet Polish" },
        { label: "Purity Type", val: "Type IIa (Top 2% Carbon)" }
      ],
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    },
    precious: {
      badge: "Precious Metals",
      title: "BIS Laser Hallmarking Assay",
      subtitle: "Government-Certified Gold & 925 Silver",
      body: "Our solid 14K (585) and 18K (750) alloys undergo rigorous spectrometry assaying at Bureau of Indian Standards (BIS) accredited centers. Each heirloom is laser-microstamped with purity marks and our atelier identification seal.",
      specs: [
        { label: "Solid 14K Gold", val: "58.5% Pure Fine Gold (585)" },
        { label: "Solid 18K Gold", val: "75.0% Pure Fine Gold (750)" },
        { label: "925 Sterling Silver", val: "92.5% Fine Silver + Rhodium" },
        { label: "Nickel Standard", val: "100% Hypoallergenic EU Standard" }
      ],
      image: "https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=800&q=80"
    },
    artisan: {
      badge: "Lapidary Heritage",
      title: "500-Year Diamond Capital Provenance",
      subtitle: "Generational Master Craftsmen",
      body: "Surat, Gujarat is the historic heart of global diamond manufacturing, where over 90% of the world's precious stones are cut and set. Our master setter benches carry generations of specialized micro-pavé and prongs precision, bypassing multinational corporate overhead.",
      specs: [
        { label: "Atelier Bench", val: "Surat, Gujarat, India" },
        { label: "Setting Technique", val: "Microscope Claw & Flush Pavé" },
        { label: "Comfort Profile", val: "Ergonomic Silk-Fit Shanks" },
        { label: "Lead Time", val: "1-2 Days In-Stock / 5-7 Days Bespoke" }
      ],
      image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80"
    }
  };

  const current = pillars[activeTab];

  return (
    <section className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-12 lg:p-16 shadow-xs relative overflow-hidden text-left">
      {/* Decorative background watermark */}
      <div className="absolute right-6 -bottom-10 opacity-5 pointer-events-none hidden md:block">
        <LumoraCrest className="w-96 h-96" color="#1F2022" />
      </div>

      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EAE3D5]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] text-[#A8843E] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium">
              <img src="/lumora-logo-square.png" alt="Lumora" className="w-3.5 h-3.5 object-contain" />
              <span>Surat Atelier Benchmark</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F2022] font-light tracking-tight">
              The Science of Brilliance, <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#A8843E]">The Art of Permanence.</span>
            </h2>
          </div>

          {/* Switcher Buttons */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'optical', label: 'Diamond Fire' },
              { id: 'precious', label: 'Gold Purity (BIS)' },
              { id: 'artisan', label: 'Surat Heritage' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs transition-all uppercase tracking-wider font-semibold ${
                  activeTab === tab.id
                    ? 'bg-[#1F2022] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#FAF8F5] text-[#575A61] border border-[#EAE3D5] hover:border-[#C5A059]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#A8843E] font-medium font-mono">
                {current.badge} &bull; {current.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1F2022] font-medium">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#575A61] leading-relaxed font-light">
                {current.body}
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {current.specs.map((spec, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#747780] font-medium block">
                    {spec.label}
                  </span>
                  <strong className="text-xs sm:text-sm font-serif text-[#1F2022] block">
                    {spec.val}
                  </strong>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-3 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 shadow-xs"
              >
                <span>Explore Certified Solitaires</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-xs uppercase tracking-wider text-[#575A61] hover:text-[#1F2022] font-semibold py-3"
              >
                Atelier Story &rarr;
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#EAE3D5] shadow-xl bg-[#FAF8F5] group">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 [image-rendering:high-quality]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#E8D3A2]">
                  Surat Master Bench Certified
                </span>
                <h4 className="font-serif text-base font-medium">
                  {current.title}
                </h4>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
