import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const StickyAddToCart = ({ 
  product, 
  selectedVariant, 
  selectedSize, 
  currentPriceUSD, 
  onAddToCart, 
  onBuyNow 
}) => {
  const { formatPrice } = useCurrency();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling down 450px
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product || !isVisible) return null;

  return (
    <div className="fixed bottom-[58px] lg:bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE3D5] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] py-2.5 sm:py-3 px-3 sm:px-4 transition-all duration-300 animate-slide-up">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Product Thumbnail & Meta */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover border border-[#EAE3D5] bg-[#FAF8F5] shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-serif text-xs sm:text-sm font-medium text-[#1F2022] truncate">{product.name}</h4>
            <div className="text-[10px] sm:text-[11px] text-[#747780] truncate flex items-center gap-1.5 sm:gap-2">
              <span>{selectedVariant?.metal || product.category}</span>
              {selectedSize && <span>&bull; Size {selectedSize}</span>}
            </div>
          </div>
        </div>

        {/* Right: Price & Quick CTA Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="text-right">
            <span className="text-xs sm:text-base font-semibold text-[#1F2022] block leading-tight">{formatPrice(currentPriceUSD)}</span>
            <span className="hidden sm:block text-[10px] text-[#747780]">Free Express Air</span>
          </div>

          <button
            onClick={onAddToCart}
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 sm:gap-2 shadow-xs shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs">Add to Bag</span>
          </button>

          <button
            onClick={onBuyNow}
            className="hidden md:flex px-4 py-2.5 bg-[#F4EFE6] hover:bg-[#EAE3D5] text-[#1F2022] border border-[#C5A059] transition-colors rounded text-xs uppercase tracking-wider font-semibold items-center gap-1"
          >
            <span>Express Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
