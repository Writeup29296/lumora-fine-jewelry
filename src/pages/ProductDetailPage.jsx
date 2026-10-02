import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Plane, Award, Sparkles, Check, 
  ArrowLeft, ShoppingBag, Eye, Heart, HelpCircle, 
  Clock, Package, RefreshCw, ZoomIn, Play, Star, ChevronRight 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { brandConfig } from '../data/brandConfig';

export const ProductDetailPage = ({ product, onBack, onSelectProduct, onNavigate, allProducts = [] }) => {
  const { formatPrice, activeCurrency, activeCountry } = useCurrency();
  const { addToCart, openCheckout } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [engraving, setEngraving] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [addedNotice, setAddedNotice] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedVariant(product.variants?.[0] || null);
      setSelectedSize(product.ringSizes?.[0] || product.wristSizes?.[0] || product.chainLengths?.[0] || null);
      setEngraving('');
      setQuantity(1);
      setAddedNotice(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  if (!product) return null;

  // Calculate current price based on variant
  const currentPriceUSD = selectedVariant?.priceUSD || product.priceUSD;

  // Zoom handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${product.images[activeImageIndex] || product.images[0]})`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      `${selectedVariant?.metal || product.category} (${selectedVariant?.color || 'Standard'})`,
      selectedSize,
      engraving,
      currentPriceUSD
    );
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      `${selectedVariant?.metal || product.category} (${selectedVariant?.color || 'Standard'})`,
      selectedSize,
      engraving,
      currentPriceUSD
    );
    onNavigate('checkout');
  };

  // Related products (same category or others, excluding current)
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || Math.random() > 0.3))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-[#747780]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[#575A61] hover:text-[#1F2022] font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </button>
        <div className="flex items-center gap-2">
          <span>Shop</span>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-[#1F2022] font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: MULTI-IMAGE GALLERY WITH ZOOM & VIDEO */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Stage Image with Zoom */}
          <div 
            className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#EAE3D5] shadow-sm cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />

            {/* Hover Zoom Overlay */}
            <div
              className="absolute inset-0 pointer-events-none bg-no-repeat transition-opacity duration-150"
              style={{
                ...zoomStyle,
                backgroundSize: '220%'
              }}
            />

            {/* Sample Badge */}
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#1F2022]/85 text-[#FAF8F5] text-[11px] font-mono tracking-wide">
              Sample Data &bull; Demonstration Item
            </div>

            {/* Zoom hint */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-white/90 backdrop-blur-sm border border-[#EAE3D5] text-[10px] text-[#575A61] flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Hover to Zoom</span>
            </div>
          </div>

          {/* Thumbnails + Video Button */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setIsVideoOpen(false);
                }}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                  activeImageIndex === idx && !isVideoOpen
                    ? 'border-[#C5A059] shadow-sm'
                    : 'border-[#EAE3D5] opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}

            {/* Optional 360 Video Demonstration Preview */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className={`w-20 h-20 rounded-xl border-2 transition-all shrink-0 bg-[#FAF8F5] flex flex-col items-center justify-center text-[#575A61] hover:text-[#1F2022] ${
                isVideoOpen ? 'border-[#C5A059]' : 'border-[#EAE3D5]'
              }`}
            >
              <Play className="w-5 h-5 text-[#A8843E] fill-current" />
              <span className="text-[10px] mt-1 font-medium">360° Video</span>
            </button>
          </div>

          {/* Video Modal / Inline Player Simulation */}
          {isVideoOpen && (
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] mx-auto flex items-center justify-center text-[#A8843E]">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <h4 className="font-serif text-base text-[#1F2022] font-medium">Atelier 360° Macro Video Demonstration</h4>
              <p className="text-xs text-[#747780] max-w-md mx-auto">
                Product turntable video showcasing prong alignment, diamond light refraction, and comfort-fit band profile under daylight illumination.
              </p>
              <div className="aspect-video max-w-lg mx-auto rounded-xl bg-[#1F2022] flex items-center justify-center text-white text-xs font-mono">
                [Turntable Macro Video Demonstration Placeholder — Merchant Video Upload]
              </div>
            </div>
          )}

          {/* Origin & Hallmarking Trust Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white border border-[#EAE3D5] text-xs text-[#575A61]">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#A8843E]" />
              <span>Ships from Jaipur / Surat, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#A8843E]" />
              <span>BIS Hallmarked Purity</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#A8843E]" />
              <span>Signature Vault Box</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PRODUCT SPECIFICATIONS, VARIANTS & ACTIONS */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2 border-b border-[#EAE3D5] pb-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
                Lumora Atelier Heirlooms
              </span>
              <span className="text-[11px] text-[#747780] font-mono">ID: {product.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif text-[#1F2022] font-normal leading-snug">
              {product.name}
            </h1>

            <p className="text-xs text-[#747780]">
              {product.subtitle || product.stoneType}
            </p>

            {/* Price display with currency explanation */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-2xl font-semibold text-[#1F2022]">
                {formatPrice(currentPriceUSD)}
              </span>
              <span className="text-xs text-[#747780]">
                {activeCurrency.statement}
              </span>
            </div>
          </div>

          {/* VARIANT PICKER: PRECIOUS METAL & PURITY */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-[#1F2022] uppercase tracking-wider text-[11px]">
                  Select Metal & Purity:
                </label>
                <span className="text-[#A8843E] font-medium">
                  {selectedVariant?.metal} ({selectedVariant?.color})
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                      selectedVariant?.id === v.id
                        ? 'border-[#C5A059] bg-[#F4EFE6] text-[#1F2022] shadow-xs'
                        : 'border-[#EAE3D5] bg-white text-[#575A61] hover:border-[#C5A059]'
                    }`}
                  >
                    <span className="text-xs font-medium block truncate">{v.metal}</span>
                    <span className="text-[10px] text-[#747780] block truncate">{v.color}</span>
                    <span className="text-[11px] font-semibold text-[#1F2022] mt-1">
                      {formatPrice(v.priceUSD)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RING SIZE / WRIST SIZE / CHAIN LENGTH PICKER */}
          {product.ringSizes && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-[#1F2022] uppercase tracking-wider text-[11px]">
                  US / Canadian Ring Size:
                </label>
                <button
                  onClick={() => onNavigate('ring-size-guide')}
                  className="text-[#A8843E] hover:underline flex items-center gap-1 text-[11px]"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Size & Measurement Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.ringSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-10 h-10 rounded-lg text-xs font-medium transition-all ${
                      selectedSize === sz
                        ? 'bg-[#1F2022] text-[#FAF8F5] shadow-xs'
                        : 'bg-white border border-[#EAE3D5] text-[#575A61] hover:border-[#C5A059] hover:text-[#1F2022]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chain Length or Wrist size where available */}
          {product.wristSizes && (
            <div className="space-y-2">
              <label className="font-semibold text-[#1F2022] uppercase tracking-wider text-[11px] block">
                Bracelet Wrist Length:
              </label>
              <div className="flex gap-2">
                {product.wristSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      selectedSize === sz
                        ? 'bg-[#1F2022] text-[#FAF8F5]'
                        : 'bg-white border border-[#EAE3D5] text-[#575A61]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.chainLengths && (
            <div className="space-y-2">
              <label className="font-semibold text-[#1F2022] uppercase tracking-wider text-[11px] block">
                Chain Length:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.chainLengths.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setSelectedSize(ch)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      selectedSize === ch
                        ? 'bg-[#1F2022] text-[#FAF8F5]'
                        : 'bg-white border border-[#EAE3D5] text-[#575A61]'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Complimentary Custom Laser Engraving */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#1F2022]">Complimentary Custom Engraving</span>
              <span className="text-[10px] text-[#747780]">{20 - engraving.length} chars left</span>
            </div>
            <input
              type="text"
              maxLength={20}
              placeholder="e.g. Forever & Always"
              value={engraving}
              onChange={(e) => setEngraving(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-[#EAE3D5] rounded focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
            />
            <p className="text-[10px] text-[#747780]">
              Custom engraved pieces are personalized and excluded from 30-day returns.
            </p>
          </div>

          {/* QUANTITY & ACTIONS */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <div className="flex items-center border border-[#EAE3D5] rounded bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm text-[#575A61] hover:text-[#1F2022]"
                >
                  -
                </button>
                <span className="px-2 text-xs font-medium text-[#1F2022]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm text-[#575A61] hover:text-[#1F2022]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3 bg-[#F4EFE6] hover:bg-[#EAE3D5] text-[#1F2022] border border-[#C5A059] transition-colors rounded text-xs uppercase tracking-wider font-semibold"
            >
              Instant Express Checkout &rarr;
            </button>

            {addedNotice && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Item successfully added to your shopping bag!</span>
              </div>
            )}
          </div>

          {/* TABS FOR SPECIFICATIONS, DIAMOND CLARITY, SHIPPING & RETURNS */}
          <div className="pt-4 border-t border-[#EAE3D5] space-y-4">
            
            <div className="flex border-b border-[#EAE3D5] text-xs">
              {[
                { id: 'specs', label: 'Specifications' },
                { id: 'diamond', label: 'Stone Details' },
                { id: 'shipping', label: 'Shipping & Duties' },
                { id: 'returns', label: 'Returns & Care' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-3 font-medium transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[#C5A059] text-[#1F2022]'
                      : 'border-transparent text-[#747780] hover:text-[#1F2022]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 py-1.5 border-b border-[#F5F1E8]">
                  <span className="text-[#747780]">Precious Metal</span>
                  <span className="text-[#1F2022] font-medium">{selectedVariant?.metal || 'Solid Gold / 925 Silver'}</span>
                </div>
                <div className="grid grid-cols-2 py-1.5 border-b border-[#F5F1E8]">
                  <span className="text-[#747780]">Purity Standard</span>
                  <span className="text-[#1F2022] font-medium">{product.metalDetails?.hallmark || 'BIS Hallmark Laser Stamped'}</span>
                </div>
                <div className="grid grid-cols-2 py-1.5 border-b border-[#F5F1E8]">
                  <span className="text-[#747780]">Approximate Weight</span>
                  <span className="text-[#1F2022] font-medium">{product.metalDetails?.approxWeightGrams} grams</span>
                </div>
                <div className="grid grid-cols-2 py-1.5 border-b border-[#F5F1E8]">
                  <span className="text-[#747780]">Crafting Atelier</span>
                  <span className="text-[#1F2022] font-medium">Jaipur & Surat, India</span>
                </div>
                <div className="grid grid-cols-2 py-1.5">
                  <span className="text-[#747780]">Included Packaging</span>
                  <span className="text-[#1F2022] font-medium">{product.packaging}</span>
                </div>
              </div>
            )}

            {/* TAB 2: STONE & DIAMOND DISTINCTION */}
            {activeTab === 'diamond' && (
              <div className="space-y-3 text-xs bg-[#FAF8F5] p-4 rounded-xl border border-[#EAE3D5]">
                <div className="flex items-center gap-1.5 text-[#A8843E] font-semibold uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-4 h-4" />
                  <span>Gemstone & Diamond Transparency</span>
                </div>

                <p className="text-[#575A61] leading-relaxed">
                  Lumora strictly maintains transparent gemstone classifications. Lab-grown diamonds (CVD/HPHT) are chemically, physically, and optically identical to mined diamonds. We never describe diamond simulants (such as cubic zirconia or moissanite) as diamonds.
                </p>

                {product.stoneDetails && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EAE3D5]">
                    <div>
                      <span className="text-[#747780] block text-[10px]">Classification:</span>
                      <strong className="text-[#1F2022]">{product.stoneDetails.type}</strong>
                    </div>
                    <div>
                      <span className="text-[#747780] block text-[10px]">Carat / Weight:</span>
                      <strong className="text-[#1F2022]">{product.stoneDetails.carat}</strong>
                    </div>
                    <div>
                      <span className="text-[#747780] block text-[10px]">Color Grade:</span>
                      <strong className="text-[#1F2022]">{product.stoneDetails.color}</strong>
                    </div>
                    <div>
                      <span className="text-[#747780] block text-[10px]">Clarity Grade:</span>
                      <strong className="text-[#1F2022]">{product.stoneDetails.clarity}</strong>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-[#EAE3D5] text-[11px] text-[#747780]">
                  <strong>Certification:</strong> {product.stoneDetails?.certification || '[Laboratory Certificate Card Included]'}
                </div>
              </div>
            )}

            {/* TAB 3: SHIPPING & DUTIES */}
            {activeTab === 'shipping' && (
              <div className="space-y-2.5 text-xs text-[#575A61]">
                <p>
                  <strong>Shipping Origin:</strong> Handcrafted and dispatched from our ateliers in Jaipur & Surat, India via insured air cargo (DHL Express Worldwide & FedEx Priority).
                </p>
                <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE3D5] space-y-1">
                  <span className="font-semibold text-[#1F2022] block">Destination Clearance:</span>
                  <p>
                    <strong>USA:</strong> Orders valued up to $800 USD generally enter duty-free under Section 321 de minimis (19 U.S.C. § 1321).<br />
                    <strong>Canada:</strong> Shipments are subject to CBSA customs duties (~6.5%) and provincial GST/HST. Optional DDP calculation is available at checkout.
                  </p>
                </div>
                <p>
                  <strong>Processing & Transit Time:</strong> {product.processingTime} + {product.shippingTime}.
                </p>
              </div>
            )}

            {/* TAB 4: RETURNS & CARE */}
            {activeTab === 'returns' && (
              <div className="space-y-2.5 text-xs text-[#575A61]">
                <p>
                  <strong>Configurable 30-Day Return Window:</strong> {product.returnsEligibility}
                </p>
                <p>
                  <strong>Jewelry Care:</strong> {product.careGuide}
                </p>
                <button
                  onClick={() => onNavigate('care')}
                  className="text-[#A8843E] hover:underline font-medium block pt-1"
                >
                  View Complete Jewellery Care Guide &rarr;
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* RELATED HEIRLOOMS */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#EAE3D5] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl text-[#1F2022] font-normal">Related Heirloom Pieces</h3>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs text-[#A8843E] hover:underline font-medium"
            >
              Explore Full Catalog &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel)}
                className="bg-white border border-[#EAE3D5] rounded-xl overflow-hidden hover:border-[#C5A059] transition-all cursor-pointer group flex flex-col"
              >
                <div className="aspect-square bg-[#FAF8F5] overflow-hidden">
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A8843E] font-semibold">
                      {rel.category}
                    </span>
                    <h4 className="font-serif text-base text-[#1F2022] font-medium group-hover:text-[#A8843E] transition-colors mt-0.5 line-clamp-1">
                      {rel.name}
                    </h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#F5F1E8] flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1F2022]">
                      {formatPrice(rel.priceUSD)}
                    </span>
                    <span className="text-xs text-[#A8843E] font-medium">View Piece &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
