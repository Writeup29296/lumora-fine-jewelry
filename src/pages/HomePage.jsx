import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, Plane, Award, ArrowRight, 
  Gift, Heart, Star, Check, Compass, Eye, ChevronRight, 
  Layers, CheckCircle2, TrendingUp, Gem 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { brandConfig } from '../data/brandConfig';
import { demonstrationReviews, trustStats } from '../data/reviews';
import { AtelierCostComparison } from '../components/AtelierCostComparison';
import { QuickViewModal } from '../components/QuickViewModal';

export const HomePage = ({ onNavigate, onSelectProduct, products = [] }) => {
  const { formatPrice, activeCurrency, activeCountry } = useCurrency();
  const { addToCart } = useCart();
  const { settings } = useSettings();

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeGiftTab, setActiveGiftTab] = useState('under250');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Top 4 best sellers
  const bestSellers = products.slice(0, 4);

  // Category circular avatars (Dynamic from Admin CMS with fallback)
  const defaultCategoryPills = [
    { id: 'rings', name: 'Solitaire Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80' },
    { id: 'bracelets', name: 'Tennis Suite', image: 'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=400&q=80' },
    { id: 'earrings', name: 'Huggie Hoops', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80' },
    { id: 'necklaces', name: 'Pendants', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80' },
    { id: 'rings', name: 'Eternity Bands', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=400&q=80' },
    { id: 'shop', name: 'Solid 14K Gold', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80' }
  ];

  const categoryPills = settings?.categoryPills && settings.categoryPills.length > 0 
    ? settings.categoryPills 
    : defaultCategoryPills;

  // Gift tabs data
  const getGiftProducts = () => {
    if (activeGiftTab === 'under250') {
      return products.filter(p => p.priceUSD <= 250).slice(0, 4);
    } else if (activeGiftTab === 'under500') {
      return products.filter(p => p.priceUSD > 250 && p.priceUSD <= 500).slice(0, 4);
    } else if (activeGiftTab === 'diamonds') {
      return products.filter(p => (p.stoneType || '').toLowerCase().includes('lab-grown')).slice(0, 4);
    }
    return products.slice(0, 4);
  };

  const giftItems = getGiftProducts();

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION (Editorial North American Fine Jewelry Standard) */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#FAF8F5] pt-8 pb-16 border-b border-[#EAE3D5]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F4EFE6] via-[#FAF8F5] to-[#FAF8F5] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] text-[#A8843E] text-xs uppercase tracking-[0.2em] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{settings.heroBadge || "Jaipur & Surat Ateliers • Direct Export to USA & Canada"}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1F2022] leading-[1.12] font-normal tracking-tight">
                {settings.heroTitle || "Everyday Heirlooms,"} <br />
                <span className="italic font-light text-[#A8843E]">{settings.heroTitleHighlight || "Direct from Master Ateliers."}</span>
              </h1>

              <p className="text-base sm:text-lg text-[#575A61] max-w-xl leading-relaxed">
                {settings.heroDescription || "Handcrafted solid gold, 925 sterling silver, and certified lab-grown diamonds. Shipped directly from the jewelry capitals of Jaipur and Surat straight to North America — without traditional 400% boutique markups."}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-8 py-3.5 bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] transition-all rounded shadow-md text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
                >
                  <span>{settings.heroCtaPrimary || "Explore The Shop"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('shop', { category: 'rings' })}
                  className="px-6 py-3.5 border border-[#C5A059] text-[#1F2022] hover:bg-[#F4EFE6] transition-all rounded text-xs font-semibold tracking-wider uppercase"
                >
                  {settings.heroCtaSecondary || "Solitaires & Bands"}
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="px-4 py-3.5 text-[#575A61] hover:text-[#1F2022] transition-colors text-xs font-semibold tracking-wider uppercase flex items-center gap-1"
                >
                  <span>{settings.heroCtaTertiary || "Atelier Story"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-[#EAE3D5] grid grid-cols-3 gap-4 text-xs text-[#575A61]">
                <div className="flex items-start gap-2">
                  <Plane className="w-4 h-4 text-[#A8843E] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#1F2022]">{settings.trustBadge1Title || "Ships from India"}</strong>
                    <span>{settings.trustBadge1Desc || "3–5 Days via DHL Express"}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#A8843E] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#1F2022]">{settings.trustBadge2Title || "US Section 321 / DDP"}</strong>
                    <span>{settings.trustBadge2Desc || "Zero US Duty under $800"}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#A8843E] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#1F2022]">{settings.trustBadge3Title || "BIS Hallmarked"}</strong>
                    <span>{settings.trustBadge3Desc || "Solid 9K/14K/18K Gold"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stage: High-Resolution Visual Presentation */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#EAE3D5] shadow-2xl bg-white">
                  <img
                    src={settings.heroImageUrl || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80"}
                    alt={settings.heroCardTitle || "Aura Solitaire Lab-Grown Diamond Ring"}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Atelier Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#EAE3D5] shadow-lg text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#A8843E] font-semibold">Atelier Signature</span>
                        <h4 className="font-serif text-base text-[#1F2022] font-medium">{settings.heroCardTitle || "Aura Solitaire Diamond Ring"}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#1F2022]">{formatPrice(settings.heroCardPrice || 420)}</span>
                        <span className="block text-[10px] text-[#747780]">{settings.heroCardSubtitle || "14K Gold • BIS 585"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-2 border border-[#C5A059]/30 rounded-2xl -z-10 translate-x-2 translate-y-2 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PRESS & EDITORIAL PRAISE STRIP (Mejuri / VRAI style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 px-4 bg-white border border-[#EAE3D5] rounded-2xl text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#747780] font-semibold block mb-4">
            REDEFINING NORTH AMERICAN FINE JEWELRY
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center opacity-85 text-xs text-[#575A61] font-serif italic">
            <div className="space-y-1">
              <span className="font-sans font-bold tracking-widest text-[#1F2022] text-sm uppercase not-italic">VOGUE</span>
              <p className="text-[11px]">"Democratizing solid gold with authentic artisan transparency."</p>
            </div>
            <div className="space-y-1">
              <span className="font-sans font-bold tracking-widest text-[#1F2022] text-sm uppercase not-italic">FORBES</span>
              <p className="text-[11px]">"Cutting retail markups by shipping direct from Indian ateliers."</p>
            </div>
            <div className="space-y-1">
              <span className="font-sans font-bold tracking-widest text-[#1F2022] text-sm uppercase not-italic">ELLE</span>
              <p className="text-[11px]">"Certified lab diamonds with timeless, everyday elegance."</p>
            </div>
            <div className="space-y-1">
              <span className="font-sans font-bold tracking-widest text-[#1F2022] text-sm uppercase not-italic">HARPER'S BAZAAR</span>
              <p className="text-[11px]">"Heirloom jewelry craftsmanship tailored for modern styling."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL CATEGORY CIRCLES (Mejuri Signature Feature) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">Curated Collections</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1F2022] mt-1 font-normal">Shop by Fine Jewelry Category</h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
          {categoryPills.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('shop', { category: cat.id === 'shop' ? 'all' : cat.id })}
              className="flex flex-col items-center group cursor-pointer space-y-2.5"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#EAE3D5] group-hover:border-[#C5A059] p-1 bg-white transition-all shadow-xs group-hover:shadow-md">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-medium text-[#1F2022] group-hover:text-[#A8843E] transition-colors text-center">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS GRID WITH DUAL IMAGE HOVER & QUICK VIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EAE3D5]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">Atelier Best Sellers</span>
            <h2 className="text-3xl font-serif text-[#1F2022] mt-1 font-normal">Most-Requested Heirloom Pieces</h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-3 md:mt-0 text-sm font-medium text-[#A8843E] hover:text-[#1F2022] flex items-center gap-1 transition-colors"
          >
            <span>View All Jewelry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => {
            const hasMultipleImages = product.images && product.images.length > 1;
            const isHovered = hoveredCardId === product.id;
            const displayImg = isHovered && hasMultipleImages ? product.images[1] : product.images[0];

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredCardId(product.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="bg-white border border-[#EAE3D5] rounded-xl overflow-hidden hover:border-[#C5A059] transition-all hover:shadow-lg flex flex-col group relative"
              >
                {/* Image Container with hover transition */}
                <div 
                  className="relative aspect-square overflow-hidden bg-[#FAF8F5] cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={displayImg}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#1F2022]/85 text-[#FAF8F5] text-[10px] font-mono tracking-tight">
                    Sample Data
                  </div>

                  {product.isBestSeller && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#F4EFE6] text-[#A8843E] border border-[#E0D5C1] text-[10px] font-semibold uppercase tracking-wider">
                      Best Seller
                    </div>
                  )}

                  {/* Quick View Hover Button */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="w-full py-2 bg-white/95 backdrop-blur-xs text-[#1F2022] hover:bg-[#1F2022] hover:text-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#A8843E] font-semibold">
                      <span>{product.category}</span>
                      <span className="text-[#747780] font-normal">Jaipur Atelier</span>
                    </div>

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

                  {/* Metal swatches indicators */}
                  {product.variants && (
                    <div className="flex items-center gap-1.5 pt-1">
                      {product.variants.map((v, i) => (
                        <span 
                          key={i} 
                          title={`${v.metal} (${v.color})`}
                          className={`w-3 h-3 rounded-full border border-black/20 ${
                            v.color.includes('Yellow') ? 'bg-amber-300' :
                            v.color.includes('Rose') ? 'bg-rose-300' : 'bg-slate-200'
                          }`}
                        />
                      ))}
                      <span className="text-[10px] text-[#747780] ml-1">
                        {product.variants.length} metals
                      </span>
                    </div>
                  )}

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
                      className="px-3 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#1F2022] hover:text-[#FAF8F5] border border-[#EAE3D5] text-xs font-medium text-[#1F2022] transition-colors"
                    >
                      View Piece
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 5. TRANSPARENT PRICING & COST COMPARISON (Quince / Mejuri Signature) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AtelierCostComparison productPriceUSD={420} productName="Aura Solitaire Diamond Ring" />
      </section>

      {/* 6. CURATED GIFTING BY BUDGET TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#EAE3D5] rounded-3xl p-6 sm:p-10 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#EAE3D5]">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">{settings.giftSubtitle || "The Art of Giving"}</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1F2022] mt-1 font-normal">
                {settings.giftHeadline || "Curated Gifting by Budget"}
              </h2>
            </div>

            {/* Budget Switcher Tabs */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActiveGiftTab('under250')}
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeGiftTab === 'under250'
                    ? 'bg-[#1F2022] text-[#FAF8F5] border-[#1F2022] font-semibold shadow-xs'
                    : 'bg-[#FAF8F5] text-[#575A61] border-[#EAE3D5] hover:border-[#C5A059]'
                }`}
              >
                Gifts Under $250
              </button>
              <button
                onClick={() => setActiveGiftTab('under500')}
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeGiftTab === 'under500'
                    ? 'bg-[#1F2022] text-[#FAF8F5] border-[#1F2022] font-semibold shadow-xs'
                    : 'bg-[#FAF8F5] text-[#575A61] border-[#EAE3D5] hover:border-[#C5A059]'
                }`}
              >
                Gifts Under $500
              </button>
              <button
                onClick={() => setActiveGiftTab('diamonds')}
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeGiftTab === 'diamonds'
                    ? 'bg-[#1F2022] text-[#FAF8F5] border-[#1F2022] font-semibold shadow-xs'
                    : 'bg-[#FAF8F5] text-[#575A61] border-[#EAE3D5] hover:border-[#C5A059]'
                }`}
              >
                Lab-Grown Diamonds
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftItems.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group cursor-pointer bg-[#FAF8F5] border border-[#EAE3D5] rounded-xl overflow-hidden hover:border-[#C5A059] transition-all hover:shadow-md flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-white">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-white/90 text-[#A8843E] text-[10px] font-semibold border border-[#EAE3D5]">
                    {formatPrice(p.priceUSD)}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#747780] font-semibold">
                      {p.category}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-[#1F2022] group-hover:text-[#A8843E] transition-colors line-clamp-1 mt-0.5">
                      {p.name}
                    </h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#EAE3D5] flex items-center justify-between text-xs font-semibold text-[#1F2022] group-hover:text-[#A8843E]">
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. THE LAB-GROWN DIAMOND REVOLUTION (Brilliant Earth & VRAI Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#EAE3D5] rounded-3xl p-8 sm:p-14 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
                {settings.bannerBadge || "Science & Conscience"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1F2022] font-normal leading-snug">
                {settings.bannerTitle || "Why Discerning North American Buyers Choose Certified Lab Diamonds"}
              </h2>
              <p className="text-sm text-[#575A61] leading-relaxed">
                {settings.bannerDescription || "Lab-grown diamonds are 100% crystallized carbon. Under the microscope, Raman spectroscopy, and diamond testers, they possess the exact same physical, optical, and chemical lattice as mined diamonds (Mohs hardness 10)."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#EAE3D5]">
                  <Gem className="w-5 h-5 text-[#A8843E] mb-2" />
                  <h4 className="font-serif text-sm text-[#1F2022] font-medium">{settings.bannerFeature1Title || "Type IIa Purity"}</h4>
                  <p className="text-[11px] text-[#747780] mt-1">{settings.bannerFeature1Desc || "Chemically the purest diamonds, representing the top 2% of diamonds globally."}</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#EAE3D5]">
                  <Sparkles className="w-5 h-5 text-[#A8843E] mb-2" />
                  <h4 className="font-serif text-sm text-[#1F2022] font-medium">{settings.bannerFeature2Title || "Zero Mining Conflict"}</h4>
                  <p className="text-[11px] text-[#747780] mt-1">{settings.bannerFeature2Desc || "Created using advanced CVD and HPHT technology with traceable origins."}</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#EAE3D5]">
                  <Award className="w-5 h-5 text-[#A8843E] mb-2" />
                  <h4 className="font-serif text-sm text-[#1F2022] font-medium">{settings.bannerFeature3Title || "IGI / GIA Standards"}</h4>
                  <p className="text-[11px] text-[#747780] mt-1">{settings.bannerFeature3Desc || "Graded strictly across the 4Cs: Carat, Color (DEF), Clarity (VS1+), Cut."}</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('shop', { category: 'rings' })}
                  className="px-6 py-3 bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] transition-colors rounded text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <span>{settings.bannerButtonText || "Browse Solitaire Lab Diamonds"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-square rounded-2xl overflow-hidden border border-[#EAE3D5] shadow-lg bg-white">
                <img
                  src={settings.bannerImageUrl || "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80"}
                  alt="Jaipur and Surat Master Gem Setter"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. VERIFIED CUSTOMER REVIEWS (North American Buyers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">Client Testimonials</span>
          <h2 className="text-3xl font-serif text-[#1F2022] mt-1 font-normal">Loved Across the US & Canada</h2>
          <div className="flex items-center justify-center gap-1 mt-2 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-[#575A61] ml-2 font-medium">4.9 / 5.0 Average Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demonstrationReviews.map((rev) => (
            <div key={rev.id} className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Purchaser
                </span>
              </div>

              <h4 className="font-serif text-base text-[#1F2022] font-medium">"{rev.title}"</h4>
              <p className="text-xs text-[#575A61] leading-relaxed">
                {rev.body}
              </p>

              <div className="pt-3 border-t border-[#F5F1E8] flex items-center justify-between text-[11px] text-[#747780]">
                <div>
                  <strong className="text-[#1F2022] block">{rev.author}</strong>
                  <span>{rev.location}</span>
                </div>
                <span className="italic">{rev.verifiedProduct}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK VIEW POPUP MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onSelectProduct={onSelectProduct}
        onNavigate={onNavigate}
      />

    </div>
  );
};
