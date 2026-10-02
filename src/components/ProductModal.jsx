import React, { useState, useEffect } from 'react';
import { 
  X, Check, ShieldCheck, Plane, Award, Sparkles, 
  ShoppingBag, ArrowRight, Truck, Info, HelpCircle, Heart
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { brandConfig } from '../data/brandConfig';

export const ProductModal = ({ product, onClose, onOpenBespoke, onOpenRingSizer }) => {
  const { formatPrice, currency } = useCurrency();
  const { addToCart, openCheckout } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [engraving, setEngraving] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedMetal(product.availableMetals?.[0] || null);
      setSelectedSize(product.availableSizes?.[0] || null);
      setEngraving('');
      setAddedSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  // Calculate dynamic variant price
  const basePriceUSD = product.priceUSD;
  const metalPriceDelta = selectedMetal?.priceDelta || 0;
  const currentPriceUSD = basePriceUSD + metalPriceDelta;

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedMetal?.name || product.defaultMetal,
      selectedSize,
      engraving,
      currentPriceUSD
    );
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      selectedMetal?.name || product.defaultMetal,
      selectedSize,
      engraving,
      currentPriceUSD
    );
    onClose();
    openCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in text-[#e0e2ec]">
      <div className="bg-[#0e1017] border border-white/10 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#12151e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
              Lumora Atelier Collection
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="text-xs text-white/60 font-mono">ID: {product.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#0b0c10] flex flex-col space-y-4 border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {selectedMetal && (
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-[#0b0c10]/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono">
                  {selectedMetal.stamp} Certified
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#d4af37] ring-1 ring-[#d4af37]'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Security Guarantee Box */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#d4af37] font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Export Packaging & Authentication</span>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Includes serialized Bureau of Indian Standards (BIS) hallmark certificate, wax-sealed presentation case, and tamper-evident outer vault carton.
              </p>
            </div>
          </div>

          {/* Right Column: Customizer & Order Actions */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#12151e] flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Product Title & Reviews */}
              <div>
                <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                  <span className="uppercase text-[#d4af37] font-semibold tracking-wider text-[10px]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <span>★</span>
                    <span className="text-white font-mono">{product.rating}</span>
                    <span className="text-white/40">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h2 className="text-2xl font-serif font-medium text-white tracking-tight">
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-2xl font-serif font-bold text-white font-mono">
                    {formatPrice(currentPriceUSD)}
                  </span>
                  {product.originalPriceUSD && (
                    <span className="text-sm text-white/40 line-through font-mono">
                      {formatPrice(product.originalPriceUSD + metalPriceDelta)}
                    </span>
                  )}
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                    Direct Artisan Rate
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-white/70 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Metal Purity Customizer */}
              {product.availableMetals && product.availableMetals.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="text-white/80 font-medium">Select Metal & Purity:</label>
                    <span className="text-[#d4af37] font-mono text-[11px] font-semibold">
                      {selectedMetal?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.availableMetals.map((metal, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedMetal(metal)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          selectedMetal?.name === metal.name
                            ? 'border-[#d4af37] bg-[#d4af37]/15 text-white font-semibold'
                            : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                        }`}
                      >
                        <span className="truncate pr-1 text-[11px]">{metal.name}</span>
                        <span className="font-mono text-[10px] text-white/50 shrink-0">
                          {metal.priceDelta > 0 ? `+${formatPrice(metal.priceDelta)}` : (metal.priceDelta < 0 ? `-${formatPrice(Math.abs(metal.priceDelta))}` : '')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="text-white/80 font-medium">Size (US / Canada Standards):</label>
                    {product.category === 'rings' && (
                      <a
                        href="#sizing-guide"
                        onClick={onClose}
                        className="text-[#d4af37] hover:underline flex items-center gap-1 text-[11px]"
                      >
                        <HelpCircle className="w-3 h-3" /> Ring Size Chart
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
                    {product.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                          selectedSize === sz
                            ? 'bg-[#d4af37] text-[#0b0c10] font-bold shadow'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Laser Engraving */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-white/80 font-medium">
                    Complimentary Engraving (Optional):
                  </label>
                  <span className="text-[10px] text-white/40 font-mono">
                    {engraving.length}/20 chars
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={20}
                  placeholder="e.g. Forever Yours, 10.24.26"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37] font-serif italic"
                />
              </div>

              {/* Specifications Accordion / List */}
              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <h4 className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                  Atelier Specifications
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                  {product.specs?.map((sp, idx) => (
                    <div key={idx} className="flex justify-between border-b border-white/5 py-1">
                      <span className="text-white/50">{sp.label}:</span>
                      <span className="text-white/90 text-right truncate pl-2">{sp.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 ${
                    addedSuccess
                      ? 'bg-emerald-500 text-white'
                      : 'border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 active:scale-95'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Bag
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#0b0c10] text-xs uppercase tracking-wider font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-1.5"
                >
                  <span>Instant Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Express Delivery Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-white/60">
                <Plane className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Estimated USA/Canada Delivery: <strong>3–5 Business Days</strong> via DHL Express</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
