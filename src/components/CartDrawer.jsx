import React, { useState } from 'react';
import { 
  X, ShoppingBag, Plus, Minus, Trash2, 
  ShieldCheck, ArrowRight, Plane, Sparkles, CheckCircle2, 
  Gift, Heart, Check 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export const CartDrawer = ({ onNavigateToCheckout }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    addToCart,
    cartSubtotalUSD,
    hasFreeShipping,
    freeShippingRemainingUSD,
    freeShippingProgressPercent,
    isUsDeMinimisEligible
  } = useCart();

  const { formatPrice, currency, activeCurrency } = useCurrency();
  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Add-on products (Mejuri style one-click cross sell)
  const addOns = [
    {
      id: 'addon-pen',
      name: 'Atelier Diamond & Gold Polishing Wand',
      priceUSD: 18,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80',
      description: 'Microfiber polishing solution for radiant sparkle.'
    },
    {
      id: 'addon-pouch',
      name: 'Signature Velvet Travel Jewel Pouch',
      priceUSD: 24,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80',
      description: 'Anti-tarnish compartments for travel protection.'
    }
  ];

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    }
  };

  const handleAddAddon = (addon) => {
    addToCart(
      {
        id: addon.id,
        name: addon.name,
        category: 'Care Accessories',
        images: [addon.image],
        priceUSD: addon.priceUSD
      },
      'Standard Atelier Accessory',
      null,
      '',
      addon.priceUSD
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#EAE3D5] flex flex-col shadow-2xl text-[#1F2022]">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#EAE3D5] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#A8843E]" />
              <h2 className="text-xl font-serif tracking-wider text-[#1F2022]">Your Shopping Bag</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F4EFE6] text-[#A8843E] border border-[#E0D5C1] font-semibold">
                {items.length} {items.length === 1 ? 'piece' : 'pieces'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#747780] hover:text-[#1F2022] rounded-lg hover:bg-[#FAF8F5] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#FAF8F5] px-4 sm:px-6 py-3.5 border-b border-[#EAE3D5]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {hasFreeShipping ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Unlocked: Free Insured DHL Express Worldwide!
                </span>
              ) : (
                <span className="text-[#575A61]">
                  Add <strong className="text-[#A8843E]">{formatPrice(freeShippingRemainingUSD)}</strong> for <strong className="text-[#1F2022]">Free Insured Express Air</strong>
                </span>
              )}
              <span className="text-[#747780] text-[11px] font-mono">{freeShippingProgressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#EAE3D5] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#C5A059] to-[#A8843E] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 divide-y divide-[#F5F1E8]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#747780] border border-[#EAE3D5]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif text-[#1F2022]">Your bag is currently empty</h3>
                <p className="text-xs text-[#747780] max-w-xs leading-relaxed">
                  Discover our solid gold & 925 sterling silver collections handcrafted in Surat, Gujarat for insured worldwide delivery.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-[#1F2022] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#A8843E] transition-colors"
                >
                  Explore Jewelry
                </button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.cartItemId} className="pt-5 first:pt-0 flex gap-4">
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover border border-[#EAE3D5] bg-[#FAF8F5] shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between space-y-1">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-medium text-[#1F2022] line-clamp-1">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-[#747780] hover:text-rose-600 transition-colors p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-[11px] text-[#747780] space-y-0.5">
                          <p>{item.metal}</p>
                          {item.size && <p>Size: {item.size}</p>}
                          {item.engraving && (
                            <p className="text-[#A8843E] italic">Engraved: "{item.engraving}"</p>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-[#EAE3D5] rounded bg-[#FAF8F5]">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1 text-[#575A61] hover:text-[#1F2022] hover:bg-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold font-mono text-[#1F2022]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1 text-[#575A61] hover:text-[#1F2022] hover:bg-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-semibold text-sm text-[#1F2022]">
                          {formatPrice(item.unitPriceUSD * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* ONE-CLICK CROSS-SELL ADD-ONS (Mejuri Style) */}
                <div className="pt-6 mt-6 border-t border-[#EAE3D5] space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#A8843E] font-semibold block">
                    Complete Your Heirloom Suite:
                  </span>
                  <div className="space-y-2">
                    {addOns.map((addon) => {
                      const alreadyInCart = items.some(it => it.id === addon.id);
                      return (
                        <div 
                          key={addon.id} 
                          className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] flex items-center justify-between gap-3"
                        >
                          <img 
                            src={addon.image} 
                            alt={addon.name} 
                            className="w-10 h-10 rounded-lg object-cover border border-[#EAE3D5] shrink-0" 
                          />
                          <div className="min-w-0 flex-1">
                            <h5 className="text-xs font-medium text-[#1F2022] truncate">{addon.name}</h5>
                            <span className="text-[11px] font-semibold text-[#A8843E]">{formatPrice(addon.priceUSD)}</span>
                          </div>
                          {alreadyInCart ? (
                            <span className="px-2.5 py-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 rounded border border-emerald-200 flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Added
                            </span>
                          ) : (
                            <button
                              onClick={() => handleAddAddon(addon)}
                              className="px-2.5 py-1 text-[11px] font-semibold rounded bg-white hover:bg-[#1F2022] hover:text-white border border-[#EAE3D5] transition-colors"
                            >
                              + Add
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* COMPLIMENTARY GIFT NOTE ACCORDION */}
                <div className="pt-4 border-t border-[#F5F1E8]">
                  <button
                    onClick={() => setIsGiftNoteOpen(!isGiftNoteOpen)}
                    className="w-full flex items-center justify-between text-xs text-[#575A61] hover:text-[#1F2022]"
                  >
                    <span className="flex items-center gap-1.5 font-medium">
                      <Gift className="w-4 h-4 text-[#A8843E]" />
                      <span>Complimentary Gift Packaging & Card</span>
                    </span>
                    <span className="text-xs text-[#A8843E]">{isGiftNoteOpen ? 'Hide' : '+ Add Note'}</span>
                  </button>

                  {isGiftNoteOpen && (
                    <div className="mt-2.5 space-y-1.5 animate-fade-in">
                      <textarea
                        rows={2}
                        maxLength={150}
                        placeholder="Write a message to accompany your gift..."
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        className="w-full p-2.5 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                      />
                      <span className="text-[10px] text-[#747780] block text-right">
                        {150 - giftNote.length} characters remaining
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#FAF8F5] border-t border-[#EAE3D5] space-y-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <div className="space-y-1.5 text-xs text-[#575A61]">
                <div className="flex justify-between items-center text-sm font-semibold text-[#1F2022]">
                  <span>Subtotal</span>
                  <span className="font-serif text-lg">{formatPrice(cartSubtotalUSD)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span>Express DHL Air Delivery:</span>
                  <span className="text-emerald-700 font-semibold">
                    {hasFreeShipping ? 'FREE (Orders over $300)' : '$24 USD'}
                  </span>
                </div>
                <p className="text-[10px] text-[#747780] leading-tight">
                  Handcrafted in Surat, Gujarat &bull; Fast Insured Worldwide Delivery.
                </p>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Information */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-[#747780] border-t border-[#EAE3D5]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A8843E]" />
                <span>Handcrafted in Surat, India &bull; Insured Worldwide Delivery</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
