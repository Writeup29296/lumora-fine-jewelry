import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Eye, ShieldCheck, Check, Sparkles, HelpCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

export const QuickViewModal = ({ product, isOpen, onClose, onSelectProduct, onNavigate }) => {
  const { formatPrice, activeCurrency } = useCurrency();
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(0);
      setSelectedVariant(product.variants?.[0] || null);
      setSelectedSize(product.ringSizes?.[0] || product.wristSizes?.[0] || product.chainLengths?.[0] || null);
      setAdded(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const currentPriceUSD = selectedVariant?.priceUSD || product.priceUSD;

  const handleAdd = () => {
    addToCart(
      product,
      `${selectedVariant?.metal || product.category} (${selectedVariant?.color || 'Standard'})`,
      selectedSize,
      '',
      currentPriceUSD
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const handleFullView = () => {
    onClose();
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EAE3D5] z-10 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#575A61] hover:text-[#1F2022] hover:bg-white border border-[#EAE3D5] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          
          {/* Left: Images */}
          <div className="bg-[#FAF8F5] p-6 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-[#EAE3D5]">
            <div className="aspect-square rounded-xl overflow-hidden bg-white border border-[#EAE3D5] relative">
              <img
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#1F2022]/85 text-[#FAF8F5] text-[10px] font-mono">
                Sample Piece
              </div>
            </div>

            {/* Thumbnail row */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border shrink-0 ${
                      activeImage === idx ? 'border-[#C5A059] ring-1 ring-[#C5A059]' : 'border-[#EAE3D5] opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-[#EAE3D5] flex items-center justify-between text-[11px] text-[#747780]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A8843E]" />
                BIS Hallmarked
              </span>
              <span>Jaipur & Surat Atelier</span>
            </div>
          </div>

          {/* Right: Product Details & Variant Picker */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8843E] font-semibold block">
                {product.category}
              </span>
              <h3 className="font-serif text-xl text-[#1F2022] mt-0.5">{product.name}</h3>
              <p className="text-xs text-[#747780] mt-1 line-clamp-2">{product.description}</p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xl font-semibold text-[#1F2022]">{formatPrice(currentPriceUSD)}</span>
                <span className="text-[11px] text-[#747780]">{activeCurrency.statement}</span>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-4 space-y-1.5">
                  <label className="text-[11px] font-semibold text-[#1F2022] uppercase tracking-wider block">
                    Precious Metal: <span className="text-[#A8843E] font-normal">{selectedVariant?.metal}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-2 rounded-lg border text-left text-xs transition-all ${
                          selectedVariant?.id === v.id
                            ? 'border-[#C5A059] bg-[#F4EFE6] text-[#1F2022] font-semibold'
                            : 'border-[#EAE3D5] bg-white text-[#575A61] hover:border-[#C5A059]'
                        }`}
                      >
                        <span className="block truncate text-[11px]">{v.metal}</span>
                        <span className="block text-[10px] text-[#747780]">{formatPrice(v.priceUSD)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ring / Wrist Sizes */}
              {product.ringSizes && (
                <div className="mt-3 space-y-1.5">
                  <label className="text-[11px] font-semibold text-[#1F2022] uppercase tracking-wider block">
                    Ring Size:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ringSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-8 h-8 rounded text-xs transition-all ${
                          selectedSize === sz
                            ? 'bg-[#1F2022] text-[#FAF8F5]'
                            : 'bg-white border border-[#EAE3D5] text-[#575A61] hover:border-[#C5A059]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-[#EAE3D5]">
              <button
                onClick={handleAdd}
                className="w-full py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-xs"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={handleFullView}
                className="w-full py-2 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#1F2022] border border-[#EAE3D5] transition-colors rounded text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Specifications & 360°</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
