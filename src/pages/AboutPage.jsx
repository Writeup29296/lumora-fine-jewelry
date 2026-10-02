import React from 'react';
import { 
  Sparkles, Award, ShieldCheck, Plane, 
  MapPin, Heart, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] text-[#A8843E] text-xs uppercase tracking-[0.2em] font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generational Indian Artistry</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#1F2022] font-normal leading-tight">
          Handcrafted in India.<br />
          <span className="italic font-light text-[#A8843E]">Cherished in North America.</span>
        </h1>
        <p className="text-base text-[#575A61] leading-relaxed">
          Lumora Fine Jewelry was founded on a simple conviction: luxury fine jewelry should reflect the true value of precious metals and diamond craftsmanship, not the inflated markups of traditional boutique showrooms.
        </p>
      </div>

      {/* 2. Visual Story Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
            Our Two Ateliers
          </span>
          <h2 className="text-3xl font-serif text-[#1F2022] font-normal">
            Jaipur & Surat: The Historic Epicenters of Jewelry Artistry
          </h2>
          <p className="text-sm text-[#575A61] leading-relaxed">
            For over four centuries, the walled city of <strong>Jaipur, Rajasthan</strong> has served as the gemstone cutting capital of the world. Here, generational silversmiths and goldsmiths preserve intricate techniques like hand-chiseled engraving, comfort-fit bezel setting, and filigree wirework.
          </p>
          <p className="text-sm text-[#575A61] leading-relaxed">
            Just south in <strong>Surat, Gujarat</strong>, our diamond setting studio works with cutting-edge optical lasers and master setters to forge precision four-prong solitaires, seamless French pavé eternity bands, and radiant tennis bracelets.
          </p>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2022]">
              <MapPin className="w-4 h-4 text-[#A8843E]" />
              <span>Transparent Shipping Origin: India</span>
            </div>
            <p className="text-xs text-[#747780]">
              Every order is handcrafted in our Indian workshops and dispatched via insured international express air courier (DHL Express & FedEx) directly to clients throughout the United States and Canada.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#EAE3D5] shadow-lg bg-white">
            <img
              src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=80"
              alt="Artisans crafting fine gold jewelry in Jaipur"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* 3. The Direct-to-Consumer Model (Cutting Retail Markups) */}
      <div className="bg-[#FAF8F5] border border-[#EAE3D5] rounded-3xl p-8 sm:p-14 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
            Price Transparency
          </span>
          <h2 className="text-3xl font-serif text-[#1F2022] font-normal">
            The Traditional Retail Gap
          </h2>
          <p className="text-sm text-[#575A61]">
            Comparing traditional luxury department store distribution versus the Lumora direct atelier export model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Retail */}
          <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
              <h3 className="font-serif text-lg text-[#747780] font-medium">Traditional Retail Boutiques</h3>
              <span className="text-xs font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded">400%–500% Markup</span>
            </div>
            <ul className="space-y-3 text-xs text-[#747780]">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                <span>Prime Fifth Avenue / luxury shopping mall retail rent built into pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                <span>Multi-tier wholesale distributors and export broker commissions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                <span>Substantial celebrity sponsorship campaigns and showroom overhead</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                <span>Opaque origins: pieces rarely disclose the atelier where they were forged</span>
              </li>
            </ul>
          </div>

          {/* Lumora Atelier Model */}
          <div className="p-6 rounded-2xl bg-white border-2 border-[#C5A059] space-y-4 shadow-sm relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
              <h3 className="font-serif text-lg text-[#1F2022] font-medium">Lumora Direct Atelier</h3>
              <span className="text-xs font-mono text-[#A8843E] bg-[#F4EFE6] px-2 py-0.5 rounded font-semibold">Atelier Direct</span>
            </div>
            <ul className="space-y-3 text-xs text-[#575A61]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero retail boutique markups: pieces travel directly from jeweler's bench to you</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% genuine BIS hallmarked solid 9K, 14K, 18K gold and 925 sterling silver</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Certified lab-grown diamonds (CVD/HPHT) offering identical brilliance with complete transparency</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Transparent customs handling: US Section 321 duty-free under $800 & Canada DDP</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Standards of Integrity */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
            Our Commitments
          </span>
          <h2 className="text-3xl font-serif text-[#1F2022] font-normal">
            Honest Material Integrity
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#1F2022] font-medium">Bureau of Indian Standards</h3>
            <p className="text-xs text-[#575A61] leading-relaxed">
              Every gold piece is stamped under strict Bureau of Indian Standards (BIS) assay guidelines: 375 for 9K, 585 for 14K, and 750 for 18K solid gold. Silver pieces carry the 925 hallmark.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#1F2022] font-medium">Lab-Grown Diamonds</h3>
            <p className="text-xs text-[#575A61] leading-relaxed">
              We exclusively specify lab-grown diamonds created via CVD or HPHT processes. Optically and chemically identical to mined diamonds, without ecological degradation. We never label diamond simulants as diamonds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#1F2022] font-medium">Insured Express Logistics</h3>
            <p className="text-xs text-[#575A61] leading-relaxed">
              Shipped via DHL Express Worldwide and FedEx Priority air freight. Every consignment is insured in transit until confirmed receipt with mandatory signature.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Clearly Labelled Placeholders for Remaining Merchant Data */}
      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] text-xs text-[#747780] space-y-2">
        <h4 className="font-semibold text-[#1F2022] uppercase tracking-wider text-[11px]">
          Atelier Documentation & Business Disclosures
        </h4>
        <p>
          &bull; <strong>Indian Export Registration:</strong> Handled under Indian Directorate General of Foreign Trade (DGFT) Courier Shipping Bill V regulations. {brandConfig.exportCompliance.iecStatus}.
        </p>
        <p>
          &bull; <strong>Merchant Address:</strong> {brandConfig.brandOrigin}.
        </p>
        <p>
          &bull; <strong>US/Canadian Returns:</strong> {brandConfig.guarantees.returnAddressPlaceholder}.
        </p>
      </div>

      {/* 6. CTA to Shop */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('shop')}
          className="px-8 py-3.5 bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] transition-all rounded shadow-md text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
        >
          <span>Explore The Fine Jewelry Collection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
