import React from 'react';
import { brandConfig } from '../data/brandConfig';
import { Sparkles, Hammer, Gem, ShieldCheck } from 'lucide-react';

export const Craftsmanship = () => {
  return (
    <section id="craftsmanship" className="py-16 sm:py-24 border-b border-white/10 bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Grid of Atelier Work */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
                  alt="Jaipur Silver and Gold Crafting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 rounded-xl bg-[#12151e] border border-white/10 text-left">
                <div className="text-xs font-semibold text-[#d4af37]">5th-Generation Goldsmiths</div>
                <div className="text-[11px] text-white/50 mt-0.5">Hand-chiseled master molds & microscope stone setting</div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 rounded-xl bg-[#12151e] border border-white/10 text-left">
                <div className="text-xs font-semibold text-[#d4af37]">Direct Gemstone Lapidary</div>
                <div className="text-[11px] text-white/50 mt-0.5">Precision faceting in Jaipur's historic Johari Bazaar</div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
                  alt="Fine Gemstone Setting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Craft Story */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#f3e5ab] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              The Lumora Heritage
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white leading-tight">
              Direct from the World's Premier Jewelry Capital
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              For centuries, the Pink City of Jaipur and the diamond centers of Surat have forged the world's most legendary crown jewels. At <strong>{brandConfig.brandFullName}</strong>, we bring this royal heritage directly to the United States and Canada—bypassing traditional retail brokers and luxury brand markups.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] shrink-0 mt-1">
                  <Hammer className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-serif">Solid Metal Purity</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    We never use hollow gold or cheap base metal brass. Every creation is forged in solid 14K (585) or 18K (750) gold, or 925 sterling silver with tarnish-resistant rhodium plating.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] shrink-0 mt-1">
                  <Gem className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-serif">Conflict-Free Gemstones</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Our lab-grown diamonds, moissanites, natural Zambian emeralds, and blue-flash moonstones adhere to the Kimberley Process and strict ethical sourcing protocols.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] shrink-0 mt-1">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-serif">BIS Government Hallmarking</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Independently tested and stamped by Bureau of Indian Standards (BIS) accredited assay centres, ensuring 100% purity accuracy.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#collections"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider hover:text-[#f3e5ab] transition-colors"
              >
                <span>Explore the Jaipur Atelier Catalog &rarr;</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
