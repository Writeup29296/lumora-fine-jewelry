import React from 'react';
import { 
  Sparkles, ShieldCheck, Plane, Award, ArrowRight, 
  Gift, Heart, Star, Check, Compass, Eye, ChevronRight 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { brandConfig } from '../data/brandConfig';
import { demonstrationReviews, trustStats } from '../data/reviews';

export const HomePage = ({ onNavigate, onSelectProduct, products = [] }) => {
  const { formatPrice, activeCurrency, activeCountry } = useCurrency();
  const { addToCart } = useCart();

  // Pick top 4 products for best sellers
  const bestSellers = products.slice(0, 4);

  const collections = [
    {
      id: 'rings',
      name: 'Rings & Bands',
      tagline: 'Solitaires, French-set eternity bands, and hand-carved signets',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      count: '3 Pieces (Sample)'
    },
    {
      id: 'earrings',
      name: 'Earrings & Huggies',
      tagline: 'Comfort clicker huggies, studs, and filigree drops',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      count: '2 Pieces (Sample)'
    },
    {
      id: 'necklaces',
      name: 'Necklaces & Pendants',
      tagline: 'Tennis necklaces, Byzantine hammered medallions, and chains',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      count: '2 Pieces (Sample)'
    },
    {
      id: 'bracelets',
      name: 'Tennis Bracelets',
      tagline: 'Fluid continuous diamond tennis bracelets with double clasps',
      image: 'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=800&q=80',
      count: '1 Piece (Sample)'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#FAF8F5] pt-8 pb-16 border-b border-[#EAE3D5]">
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F4EFE6] via-[#FAF8F5] to-[#FAF8F5] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] text-[#A8843E] text-xs uppercase tracking-[0.2em] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handcrafted in India &bull; Direct Export to USA & Canada</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1F2022] leading-[1.15] font-normal tracking-tight">
                Heirloom Gold & <br />
                <span className="italic font-light text-[#A8843E]">Lab-Grown Diamonds.</span>
              </h1>

              <p className="text-lg text-[#575A61] max-w-xl leading-relaxed">
                Handcrafted in the historic jewelry ateliers of Jaipur and Surat. Delivered directly to your doorstep in the United States and Canada via insured express air cargo — free from traditional 400% retail markups.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-8 py-3.5 bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] transition-all rounded shadow-md text-sm font-medium tracking-wider uppercase flex items-center gap-2"
                >
                  <span>Explore The Shop</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('shop', { category: 'rings' })}
                  className="px-6 py-3.5 border border-[#C5A059] text-[#1F2022] hover:bg-[#F4EFE6] transition-all rounded text-sm font-medium tracking-wider uppercase"
                >
                  View Rings & Bands
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="px-4 py-3.5 text-[#575A61] hover:text-[#1F2022] transition-colors text-sm font-medium tracking-wide flex items-center gap-1"
                >
                  <span>Our Atelier Heritage</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Transparent Shipping & Hallmarking Badge */}
              <div className="pt-6 border-t border-[#EAE3D5] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#575A61]">
                <div className="flex items-start gap-2">
                  <Plane className="w-4 h-4 text-[#A8843E] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#1F2022]">Ships from India</strong>
                    <span>3–5 Days via DHL Express</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#A8843E] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#1F2022]">Section 321 / DDP</strong>
                    <span>Transparent US & CA Customs</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#A8843E] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#1F2022]">BIS Hallmarked</strong>
                    <span>Solid 9K/14K/18K & 925 Silver</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stage: High-Resolution Jewelry Presentation */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#EAE3D5] shadow-xl bg-[#FFFFFF]">
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80"
                    alt="Astraea Oval Solitaire Ring - Lumora Fine Jewelry"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Atelier Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#EAE3D5] shadow-lg text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#A8843E] font-semibold">Featured Solitaire</span>
                        <h4 className="font-serif text-base text-[#1F2022] font-medium">Astraea Oval Solitaire</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#1F2022]">{formatPrice(420)}</span>
                        <span className="block text-[10px] text-[#747780]">14K Gold &bull; BIS 585</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative border frame */}
                <div className="absolute -inset-2 border border-[#C5A059]/30 rounded-2xl -z-10 translate-x-2 translate-y-2 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRANSPARENT NORTH AMERICA VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#EAE3D5] rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">Cross-Border Transparency</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1F2022] mt-1 font-normal">
              Direct from Jaipur & Surat to USA & Canada
            </h2>
            <p className="text-sm text-[#575A61] mt-2">
              We communicate our shipping origin and international trade policies transparently so you know exactly what to expect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1F2022] font-medium">India to North America Air Express</h3>
              <p className="text-xs text-[#575A61] leading-relaxed">
                Handcrafted in our specialized Indian ateliers and dispatched via DHL Express Worldwide or FedEx International Priority with full door-to-door tracking and required adult signature.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1F2022] font-medium">US Section 321 & Canada Customs</h3>
              <p className="text-xs text-[#575A61] leading-relaxed">
                <strong>USA:</strong> Single daily orders under $800 USD enter duty-free under 19 U.S.C. § 1321.<br />
                <strong>Canada:</strong> CBSA customs tariff (~6.5%) and provincial GST/HST calculated transparently before checkout to prevent COD surprises.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1F2022] font-medium">BIS Hallmarking & Lab Diamonds</h3>
              <p className="text-xs text-[#575A61] leading-relaxed">
                Every gold piece is officially stamped under Bureau of Indian Standards (BIS 585 / BIS 750) guidelines. Lab-grown diamonds are 100% CVD/HPHT with authentic lab certification placeholders provided.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EAE3D5]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">The Core Collections</span>
            <h2 className="text-3xl font-serif text-[#1F2022] mt-1 font-normal">Fine Jewelry by Category</h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-3 md:mt-0 text-sm font-medium text-[#A8843E] hover:text-[#1F2022] flex items-center gap-1 transition-colors"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onNavigate('shop', { category: col.id })}
              className="group cursor-pointer bg-[#FFFFFF] border border-[#EAE3D5] rounded-xl overflow-hidden hover:border-[#C5A059] transition-all hover:shadow-md flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-[#FAF8F5]">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-[10px] font-medium text-[#575A61] border border-[#EAE3D5]">
                  {col.count}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#1F2022] group-hover:text-[#A8843E] transition-colors font-medium">
                    {col.name}
                  </h3>
                  <p className="text-xs text-[#747780] mt-1 line-clamp-2">
                    {col.tagline}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F5F1E8] flex items-center justify-between text-xs font-medium text-[#1F2022] group-hover:text-[#A8843E]">
                  <span>Explore Pieces</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EAE3D5]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">Atelier Highlights</span>
            <h2 className="text-3xl font-serif text-[#1F2022] mt-1 font-normal">Most-Requested Heirlooms</h2>
          </div>
          <div className="mt-3 md:mt-0 flex items-center gap-2 text-xs text-[#747780]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All demonstration pieces ready for live testing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="bg-[#FFFFFF] border border-[#EAE3D5] rounded-xl overflow-hidden hover:border-[#C5A059] transition-all hover:shadow-lg flex flex-col group"
            >
              <div 
                className="relative aspect-square overflow-hidden bg-[#FAF8F5] cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {/* Demonstration Sample Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#1F2022]/85 text-[#FAF8F5] text-[10px] font-mono tracking-tight">
                  Sample Data
                </div>
                {product.isBestSeller && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#F4EFE6] text-[#A8843E] border border-[#E0D5C1] text-[10px] font-semibold uppercase tracking-wider">
                    Best Seller
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A8843E] font-semibold">
                    {product.category}
                  </span>
                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-base text-[#1F2022] font-medium hover:text-[#A8843E] cursor-pointer transition-colors mt-0.5 line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#747780] line-clamp-1 mt-0.5">
                    {product.stoneType}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F5F1E8] flex items-center justify-between">
                  <div>
                    <span className="text-base font-semibold text-[#1F2022]">
                      {formatPrice(product.priceUSD)}
                    </span>
                    <span className="block text-[10px] text-[#747780]">
                      {activeCurrency.statement}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="px-3 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#1F2022] hover:text-[#FAF8F5] border border-[#EAE3D5] text-xs font-medium text-[#1F2022] transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BRAND INTRODUCTION & ATELIER STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#EAE3D5] rounded-3xl p-8 sm:p-14 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
                Direct-from-Atelier Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1F2022] font-normal leading-snug">
                Why Traditional Luxury Jewelry Markups Don't Exist at Lumora
              </h2>
              <p className="text-sm text-[#575A61] leading-relaxed">
                When fine jewelry is bought on Fifth Avenue or in North American shopping boutiques, up to 75% of the sticker price covers prime retail leases, wholesale distributors, and multi-tier broker markups.
              </p>
              <p className="text-sm text-[#575A61] leading-relaxed">
                <strong>Lumora Fine Jewelry</strong> operates directly in the world's most renowned artisanal jewelry capitals: <em>Jaipur</em>, celebrated for centuries of gemstone cutting and royal silversmithing, and <em>Surat</em>, the premier diamond cutting and polishing center.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#EAE3D5]">
                  <h4 className="font-serif text-base text-[#1F2022] font-medium">Zero Retail Middlemen</h4>
                  <p className="text-xs text-[#747780] mt-1">Our pieces pass directly from our jeweler's bench to your doorstep in the US or Canada.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#EAE3D5]">
                  <h4 className="font-serif text-base text-[#1F2022] font-medium">Assay Hallmarked Authenticity</h4>
                  <p className="text-xs text-[#747780] mt-1">Every gold piece is officially stamped under Bureau of Indian Standards (BIS 585 / BIS 750).</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] transition-colors rounded text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <span>Read The Full Lumora Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#EAE3D5] shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80"
                  alt="Jaipur and Surat Master Jewelry Craftsmanship"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. GIFTING & SPECIAL OCCASIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#EAE3D5] rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="w-12 h-12 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] mx-auto flex items-center justify-center text-[#A8843E] mb-3">
              <Gift className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">The Art of Giving</span>
            <h2 className="text-3xl font-serif text-[#1F2022] mt-1 font-normal">
              Curated Heirlooms for Milestone Moments
            </h2>
            <p className="text-sm text-[#575A61] mt-2">
              Every Lumora piece arrives in our signature hardcover velvet presentation vault with an assay certificate and polishing cloth — ready for unforgettable gifting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              onClick={() => onNavigate('shop', { category: 'rings' })}
              className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] hover:border-[#C5A059] transition-all cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4EFE6] mx-auto flex items-center justify-center text-[#A8843E] mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1F2022] font-medium group-hover:text-[#A8843E] transition-colors">
                Anniversary & Solitaires
              </h3>
              <p className="text-xs text-[#747780] mt-2 leading-relaxed">
                Lab-grown diamond solitaire rings and continuous eternity bands celebrating enduring commitment.
              </p>
              <span className="mt-4 inline-block text-xs font-medium text-[#A8843E]">Explore Anniversary &rarr;</span>
            </div>

            <div 
              onClick={() => onNavigate('shop', { category: 'necklaces' })}
              className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] hover:border-[#C5A059] transition-all cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4EFE6] mx-auto flex items-center justify-center text-[#A8843E] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1F2022] font-medium group-hover:text-[#A8843E] transition-colors">
                Birthdays & Milestones
              </h3>
              <p className="text-xs text-[#747780] mt-2 leading-relaxed">
                Hand-hammered Byzantine gold pendants and genuine rainbow moonstones for personal celebrations.
              </p>
              <span className="mt-4 inline-block text-xs font-medium text-[#A8843E]">Explore Milestones &rarr;</span>
            </div>

            <div 
              onClick={() => onNavigate('shop', { category: 'earrings' })}
              className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] hover:border-[#C5A059] transition-all cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4EFE6] mx-auto flex items-center justify-center text-[#A8843E] mb-4">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1F2022] font-medium group-hover:text-[#A8843E] transition-colors">
                Everyday Luxury Hoops
              </h3>
              <p className="text-xs text-[#747780] mt-2 leading-relaxed">
                Solid gold huggie earrings engineered with low profiles and secure clicks for 24/7 wear.
              </p>
              <span className="mt-4 inline-block text-xs font-medium text-[#A8843E]">Explore Hoops &rarr;</span>
            </div>

            <div 
              onClick={() => onNavigate('shop', { category: 'bracelets' })}
              className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] hover:border-[#C5A059] transition-all cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4EFE6] mx-auto flex items-center justify-center text-[#A8843E] mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1F2022] font-medium group-hover:text-[#A8843E] transition-colors">
                Tennis Bracelets
              </h3>
              <p className="text-xs text-[#747780] mt-2 leading-relaxed">
                A seamless radiant diamond tennis line with double-safety tongue clasp for heirloom grace.
              </p>
              <span className="mt-4 inline-block text-xs font-medium text-[#A8843E]">Explore Bracelets &rarr;</span>
            </div>
          </div>

          {/* Complimentary Packaging Banner */}
          <div className="mt-8 p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#575A61]">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-[#A8843E] shrink-0" />
              <span>
                <strong>Signature Packaging Included:</strong> Lumora velvet presentation vault box, wax-sealed assay certificate card, and microfiber cleaning cloth included with every order.
              </span>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="text-[#A8843E] hover:text-[#1F2022] font-medium shrink-0"
            >
              Add Complimentary Gift Note &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED REVIEWS PLACEHOLDER & TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#EAE3D5] rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">Client Feedback Standards</span>
            <h2 className="text-3xl font-serif text-[#1F2022] mt-1 font-normal">Customer Reviews</h2>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Demonstration Layout — Verified post-purchase client reviews will appear here upon launch.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demonstrationReviews.map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-white border border-[#EAE3D5] flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#A8843E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#575A61] italic leading-relaxed">
                    "{rev.reviewText}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F5F1E8] flex items-center justify-between text-xs">
                  <div>
                    <strong className="block text-[#1F2022]">{rev.author}</strong>
                    <span className="text-[#747780]">{rev.location}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE3D5] text-[10px] text-[#A8843E] font-medium">
                    Verified Buyer Placeholder
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
