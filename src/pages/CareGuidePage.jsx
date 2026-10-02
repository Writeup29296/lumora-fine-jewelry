import React from 'react';
import { 
  Sparkles, ShieldCheck, Droplets, AlertTriangle, 
  Package, Sun, Award, ArrowRight, Heart 
} from 'lucide-react';

export const CareGuidePage = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Preserving Your Heirlooms
        </span>
        <h1 className="text-4xl font-serif text-[#1F2022] font-normal">
          Jewellery Care & Preservation Guide
        </h1>
        <p className="text-sm text-[#575A61] leading-relaxed">
          Lumora pieces are handcrafted in solid gold and 925 sterling silver to last generations. Follow our atelier care protocols to keep your diamonds brilliant and your precious metals pristine.
        </p>
      </div>

      {/* 2. Three Material Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Pillar 1: Solid Gold */}
        <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl text-[#1F2022] font-medium">
            Solid Gold (9K, 14K, 18K)
          </h2>
          <p className="text-xs text-[#575A61] leading-relaxed">
            Solid gold does not tarnish, rust, or corrode over time. However, daily exposure to body oils, lotions, and environmental dust can coat diamond pavilions and reduce light refraction.
          </p>
          <div className="space-y-2 pt-2 border-t border-[#F5F1E8] text-xs text-[#575A61]">
            <strong className="block text-[#1F2022]">How to Clean:</strong>
            <p>1. Soak piece for 10 minutes in a bowl of warm water with 2 drops of mild dish soap.</p>
            <p>2. Gently brush prongs and underneath stones using a soft-bristled baby toothbrush.</p>
            <p>3. Rinse under lukewarm running water (ensure sink drain is plugged!).</p>
            <p>4. Pat dry with your complimentary Lumora microfiber polishing cloth.</p>
          </div>
        </div>

        {/* Pillar 2: 925 Sterling Silver */}
        <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl text-[#1F2022] font-medium">
            925 Sterling Silver
          </h2>
          <p className="text-xs text-[#575A61] leading-relaxed">
            All Lumora sterling silver heirlooms are coated with a protective anti-tarnish rhodium layer to guard against atmospheric sulfur and oxidation.
          </p>
          <div className="space-y-2 pt-2 border-t border-[#F5F1E8] text-xs text-[#575A61]">
            <strong className="block text-[#1F2022]">Storage & Care:</strong>
            <p>1. Store in the airtight anti-tarnish pouch provided in your presentation box.</p>
            <p>2. Keep away from humid bathrooms and direct sunlight when not in wear.</p>
            <p>3. Wipe with a dedicated jewelry silver cloth in gentle linear motions (never circular).</p>
            <p>4. Avoid chemical liquid silver dips, which can strip protective rhodium coatings.</p>
          </div>
        </div>

        {/* Pillar 3: Lab-Grown Diamonds & Gems */}
        <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl text-[#1F2022] font-medium">
            Lab Diamonds & Gemstones
          </h2>
          <p className="text-xs text-[#575A61] leading-relaxed">
            Lab-grown diamonds have the exact chemical composition and Mohs hardness (10) as mined diamonds, making them suitable for daily wear. Softer organic gems like pearls require gentle handling.
          </p>
          <div className="space-y-2 pt-2 border-t border-[#F5F1E8] text-xs text-[#575A61]">
            <strong className="block text-[#1F2022]">Gemstone Protocols:</strong>
            <p>1. <strong>Diamonds:</strong> Can safely be cleaned with warm soapy water or alcohol swabs.</p>
            <p>2. <strong>Pearls & Moonstones:</strong> Never submerge in hot water or ultrasonic cleaners.</p>
            <p>3. <strong>"Last on, first off":</strong> Put jewelry on after perfume, lotions, and hairspray have dried completely.</p>
          </div>
        </div>

      </div>

      {/* 3. What to Avoid (Golden Rules) */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-6">
        <div className="flex items-center gap-2 text-[#A8843E]">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="font-serif text-2xl text-[#1F2022] font-medium">What to Avoid: The Golden Rules</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-white border border-[#EAE3D5] space-y-2">
            <h4 className="font-serif text-base text-[#1F2022] font-medium">Chlorine & Swimming</h4>
            <p className="text-xs text-[#747780]">
              Chlorine in pools and hot tubs chemically weakens gold alloy solder and can cause prongs to fail.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#EAE3D5] space-y-2">
            <h4 className="font-serif text-base text-[#1F2022] font-medium">Gym & Weightlifting</h4>
            <p className="text-xs text-[#747780]">
              Heavy barbell pressure can misshape comfort-fit ring bands and loosen stones in French pavé settings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#EAE3D5] space-y-2">
            <h4 className="font-serif text-base text-[#1F2022] font-medium">Household Cleaners</h4>
            <p className="text-xs text-[#747780]">
              Bleach, ammonia, and abrasive powders will scratch polished gold surfaces and damage rhodium coats.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#EAE3D5] space-y-2">
            <h4 className="font-serif text-base text-[#1F2022] font-medium">Jumbled Storage</h4>
            <p className="text-xs text-[#747780]">
              Diamonds can scratch gold and softer stones. Always store each piece in its individual presentation slot.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Annual Maintenance Callout */}
      <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-serif text-xl text-[#1F2022] font-medium">Need Assistance or Professional Inspection?</h3>
          <p className="text-xs text-[#575A61]">
            Our concierge can assist you with cleaning inquiries, ultrasonic cleaning guidelines, or prong inspections.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-2.5 bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] transition-colors rounded text-xs uppercase tracking-wider font-semibold shrink-0"
        >
          Contact Atelier Concierge
        </button>
      </div>

    </div>
  );
};
