import React from 'react';
import { ShieldCheck, Sparkles, Building, Gem, Plane, Scissors } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const AtelierCostComparison = ({ productPriceUSD = 420, productName = 'Aura Solitaire Ring' }) => {
  const { formatPrice } = useCurrency();
  const traditionalRetailUSD = Math.round(productPriceUSD * 2.85);

  return (
    <div className="bg-white border border-[#EAE3D5] rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Transparent Atelier Pricing
        </span>
        <h3 className="text-xl sm:text-2xl font-serif text-[#1F2022]">
          Why Fine Jewelry Doesn't Need a 400% Retail Markup
        </h3>
        <p className="text-xs text-[#575A61]">
          We bypass wholesale distributors, Fifth Avenue boutique leases, and licensing agents to bring master jewelry crafting straight from India to North America.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Traditional Retail Box */}
        <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-4 relative">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D5]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#747780] font-semibold">Traditional Luxury Store</span>
              <h4 className="font-serif text-lg text-[#575A61] line-through font-normal">
                {formatPrice(traditionalRetailUSD)}
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
              ~280% Markup
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-[#747780]">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5"><Gem className="w-3.5 h-3.5 text-[#747780]" /> Solid Gold & Diamonds</span>
              <span className="font-mono text-[#1F2022]">{formatPrice(Math.round(productPriceUSD * 0.45))}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5"><Scissors className="w-3.5 h-3.5 text-[#747780]" /> Jeweler Bench Labor</span>
              <span className="font-mono text-[#1F2022]">{formatPrice(Math.round(productPriceUSD * 0.35))}</span>
            </div>
            <div className="flex justify-between items-center text-rose-600">
              <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5" /> High-Rent Boutique Leases</span>
              <span className="font-mono font-medium">+{formatPrice(Math.round(productPriceUSD * 0.95))}</span>
            </div>
            <div className="flex justify-between items-center text-rose-600">
              <span>Wholesale Importers & Middlemen</span>
              <span className="font-mono font-medium">+{formatPrice(Math.round(productPriceUSD * 0.65))}</span>
            </div>
            <div className="flex justify-between items-center text-rose-600">
              <span>Celebrity Licensing & Advertising</span>
              <span className="font-mono font-medium">+{formatPrice(Math.round(productPriceUSD * 0.45))}</span>
            </div>
          </div>
        </div>

        {/* Lumora Atelier Direct Box */}
        <div className="p-5 rounded-xl bg-[#FAF8F5] border-2 border-[#C5A059] space-y-4 relative shadow-sm">
          <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#1F2022] text-[#FAF8F5] text-[10px] uppercase tracking-wider font-semibold">
            Direct Atelier Price
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D5]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A8843E] font-semibold">Lumora Fine Jewelry</span>
              <h4 className="font-serif text-2xl text-[#1F2022] font-semibold">
                {formatPrice(productPriceUSD)}
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              You Save ~{Math.round(((traditionalRetailUSD - productPriceUSD) / traditionalRetailUSD) * 100)}%
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-[#575A61]">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-[#1F2022] font-medium"><Gem className="w-3.5 h-3.5 text-[#A8843E]" /> Solid Gold & Certified Diamonds</span>
              <span className="font-mono text-[#1F2022] font-semibold">{formatPrice(Math.round(productPriceUSD * 0.45))}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-[#1F2022] font-medium"><Scissors className="w-3.5 h-3.5 text-[#A8843E]" /> Master Surat Bench Craftsman</span>
              <span className="font-mono text-[#1F2022] font-semibold">{formatPrice(Math.round(productPriceUSD * 0.35))}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-[#1F2022] font-medium"><Plane className="w-3.5 h-3.5 text-[#A8843E]" /> Insured DHL Air Express & Customs CSB-V</span>
              <span className="font-mono text-[#1F2022] font-semibold">{formatPrice(Math.round(productPriceUSD * 0.08))}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#1F2022] font-medium">Fair Sustainable Atelier Margin</span>
              <span className="font-mono text-[#1F2022] font-semibold">{formatPrice(Math.round(productPriceUSD * 0.12))}</span>
            </div>
            <div className="pt-2 border-t border-[#EAE3D5] flex items-center justify-between text-emerald-700 font-semibold text-[11px]">
              <span>Zero Middlemen & Zero Storefront Leases</span>
              <span>100% Transparency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
