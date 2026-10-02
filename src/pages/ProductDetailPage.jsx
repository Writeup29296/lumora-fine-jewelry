import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Plane, Award, Sparkles, Check, 
  ArrowLeft, ShoppingBag, Eye, Heart, HelpCircle, 
  Clock, Package, RefreshCw, ZoomIn, Play, Star, ChevronRight, 
  Share2, Gem, CheckCircle2 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { brandConfig } from '../data/brandConfig';
import { DeliveryEstimator } from '../components/DeliveryEstimator';
import { DiamondScaleVisualizer } from '../components/DiamondScaleVisualizer';
import { StickyAddToCart } from '../components/StickyAddToCart';

export const ProductDetailPage = ({ product, onBack, onSelectProduct, onNavigate, allProducts = [] }) => {
  const { formatPrice, activeCurrency, activeCountry } = useCurrency();
  const { addToCart } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [engraving, setEngraving] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [addedNotice, setAddedNotice] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Related products
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || Math.random() > 0.3))
    .slice(0, 3);

  const isDiamond = (product.stoneType || '').toLowerCase().includes('diamond');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-[#747780]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[#575A61] hover:text-[#1F2022] font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>
        <div className="flex items-center gap-2">
          <span>Shop</span>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-[#1F2022] font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: MULTI-IMAGE GALLERY WITH CURSOR ZOOM */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Visual Stage */}
          <div 
            className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EAE3D5] cursor-crosshair group shadow-sm"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {isVideoOpen ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF8F5] p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E] animate-pulse">
                  <Play className="w-8 h-8 fill-[#A8843E]" />
                </div>
                <h4 className="font-serif text-lg text-[#1F2022]">360&deg; High-Definition Studio Preview</h4>
                <p className="text-xs text-[#575A61] max-w-sm">
                  Rotating view under daylight-balanced 5500K diamond lighting in our Jaipur testing laboratory.
                </p>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="px-4 py-1.5 bg-[#1F2022] text-[#FAF8F5] rounded text-xs uppercase tracking-wider"
                >
                  Return to Photography
                </button>
              </div>
            ) : (
              <>
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={`${product.name} - View ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Floating Zoom Lens Preview */}
                <div
                  className="absolute inset-0 pointer-events-none bg-no-repeat z-20 hidden md:block rounded-2xl"
                  style={{
                    ...zoomStyle,
                    backgroundSize: '250%'
                  }}
                />

                {/* Sample Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1F2022]/85 text-[#FAF8F5] text-xs font-mono tracking-tight z-10">
                  Sample Data
                </div>

                {/* Zoom Hint */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm border border-[#EAE3D5] text-[11px] text-[#575A61] flex items-center gap-1.5 pointer-events-none z-10">
                  <ZoomIn className="w-3.5 h-3.5 text-[#A8843E]" />
                  <span>Hover to zoom facets</span>
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Gallery & 360 Video Toggle */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setIsVideoOpen(false);
                }}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  activeImageIndex === idx && !isVideoOpen
                    ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30'
                    : 'border-[#EAE3D5] hover:border-[#C5A059] opacity-80'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}

            {/* 360 Video Button */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className={`w-20 h-20 rounded-xl border-2 shrink-0 flex flex-col items-center justify-center gap-1 transition-all bg-[#FAF8F5] ${
                isVideoOpen
                  ? 'border-[#C5A059] bg-[#F4EFE6] text-[#A8843E]'
                  : 'border-[#EAE3D5] text-[#747780] hover:border-[#C5A059] hover:text-[#1F2022]'
              }`}
            >
              <Play className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-tight">360&deg; Studio</span>
            </button>
          </div>

          {/* Interactive Diamond Carat Scale Visualizer for Diamond Pieces */}
          {isDiamond && (
            <div className="pt-4">
              <DiamondScaleVisualizer currentCarat={product.stoneDetails?.carat || '1.00 ct'} />
            </div>
          )}

          {/* Trust Value Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] text-xs text-[#575A61]">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#A8843E] shrink-0" />
              <span>Direct Jaipur/Surat Export</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#A8843E] shrink-0" />
              <span>BIS Hallmarked Purity</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#A8843E] shrink-0" />
              <span>Velvet Presentation Box</span>
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
              <button
                onClick={handleShare}
                className="text-xs text-[#747780] hover:text-[#1F2022] flex items-center gap-1"
                title="Share piece"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif text-[#1F2022] font-normal leading-snug">
              {product.name}
            </h1>

            <p className="text-xs text-[#747780]">
              {product.subtitle || product.stoneType}
            </p>

            {/* Price display with currency explanation */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-semibold text-[#1F2022]">
                {formatPrice(currentPriceUSD)}
              </span>
              <span className="text-xs text-[#747780]">
                {activeCurrency.statement}
              </span>
            </div>
          </div>

          {/* DYNAMIC DELIVERY ESTIMATOR (Mejuri / Brilliant Earth standard) */}
          <DeliveryEstimator />

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
                  <span>Size & Millimetre Guide</span>
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

          {/* Complimentary Custom Laser Engraving */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#1F2022]">Complimentary Custom Laser Engraving</span>
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
              Custom engraved pieces are personalized and excluded from standard 30-day returns.
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
                className="flex-1 py-3.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-[#F4EFE6] hover:bg-[#EAE3D5] text-[#1F2022] border border-[#C5A059] transition-colors rounded text-xs uppercase tracking-wider font-semibold"
            >
              Instant Express Checkout &rarr;
            </button>

            {addedNotice && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Piece successfully added to your shopping bag!</span>
              </div>
            )}
          </div>

          {/* SPECIFICATIONS & ACCORDION TABS */}
          <div className="pt-4 border-t border-[#EAE3D5] space-y-4">
            
            <div className="flex border-b border-[#EAE3D5] text-xs overflow-x-auto pb-1">
              {[
                { id: 'specs', label: 'Specifications' },
                { id: 'diamond', label: 'Diamond & Stone' },
                { id: 'shipping', label: 'Shipping & Duties' },
                { id: 'unboxing', label: 'Unboxing' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-3 font-medium transition-all border-b-2 shrink-0 ${
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
              </div>
            )}

            {/* TAB 2: STONE DETAILS */}
            {activeTab === 'diamond' && (
              <div className="space-y-3 text-xs bg-[#FAF8F5] p-4 rounded-xl border border-[#EAE3D5]">
                <div className="flex items-center gap-1.5 text-[#A8843E] font-semibold uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-4 h-4" />
                  <span>Lab Diamond Transparency</span>
                </div>

                <p className="text-[#575A61] leading-relaxed">
                  Lab-grown diamonds (CVD/HPHT) are 100% genuine carbon crystals with identical brilliance, fire, and hardness (Mohs 10) to mined diamonds.
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
              </div>
            )}

            {/* TAB 3: SHIPPING & CUSTOMS */}
            {activeTab === 'shipping' && (
              <div className="space-y-2.5 text-xs text-[#575A61]">
                <p>
                  <strong>United States:</strong> Orders enter duty-free under 19 U.S.C. § 1321 ($800 de minimis threshold).
                </p>
                <p>
                  <strong>Canada:</strong> CBSA 6.5% jewelry tariff and provincial taxes (HST/GST) calculated at checkout for Delivery Duty Paid (DDP) transit.
                </p>
                <p>
                  <strong>Carrier:</strong> Dispatched via DHL Express Worldwide with adult signature verification.
                </p>
              </div>
            )}

            {/* TAB 4: UNBOXING EXPERIENCE */}
            {activeTab === 'unboxing' && (
              <div className="space-y-3 text-xs text-[#575A61]">
                <div className="flex gap-3 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=200&q=80"
                    alt="Lumora Velvet Vault Presentation Box"
                    className="w-16 h-16 rounded-lg object-cover border border-[#EAE3D5]"
                  />
                  <div>
                    <h5 className="font-serif text-sm text-[#1F2022] font-medium">Signature Velvet Vault Box</h5>
                    <p className="text-[11px] text-[#747780]">
                      Includes plush velvet travel case, embossed certificate envelope, and gold cleaning cloth.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* STICKY BOTTOM ADD TO BAG ACTION BAR */}
      <StickyAddToCart
        product={product}
        selectedVariant={selectedVariant}
        selectedSize={selectedSize}
        currentPriceUSD={currentPriceUSD}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

    </div>
  );
};
