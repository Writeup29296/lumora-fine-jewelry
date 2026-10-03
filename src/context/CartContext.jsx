import React, { createContext, useContext, useState, useEffect } from 'react';
import { brandConfig } from '../data/brandConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('lumora_cart');
      return saved ? JSON.parse(saved) : [
        // Seed with 1 initial sample item so user can immediately test bag/checkout experience
        {
          cartItemId: 'seed-01',
          productId: 'lum-01',
          name: 'Astraea Oval Solitaire Ring',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
          metal: '14K Yellow Gold (BIS 585)',
          size: 'US 6.5',
          engraving: 'Forever & Always',
          unitPriceUSD: 420,
          quantity: 1,
          weightGrams: '3.8g'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lumora_cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [items]);

  const addToCart = (product, selectedMetal, selectedSize, engraving = '', customPriceUSD = null) => {
    const finalPrice = customPriceUSD !== null ? customPriceUSD : product.priceUSD;
    const cartItemId = `${product.id}-${selectedMetal || 'default'}-${selectedSize || 'default'}-${engraving || 'none'}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prevItems,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          image: product.images?.[0] || '',
          metal: selectedMetal || product.defaultMetal || 'Solid Gold / Silver',
          size: selectedSize || 'Standard',
          engraving: engraving.trim(),
          unitPriceUSD: finalPrice,
          quantity: 1,
          weightGrams: product.weightGrams || '3.5g'
        }
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalUSD = items.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);

  const freeShippingThresholdUSD = brandConfig.shipping.freeShippingThresholdUSD;
  const hasFreeShipping = cartSubtotalUSD >= freeShippingThresholdUSD;
  const freeShippingRemainingUSD = Math.max(0, freeShippingThresholdUSD - cartSubtotalUSD);
  const freeShippingProgressPercent = Math.min(100, Math.round((cartSubtotalUSD / freeShippingThresholdUSD) * 100));

  // Worldwide insured door-to-door transit
  const isUsDeMinimisEligible = true;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotalUSD,
        hasFreeShipping,
        freeShippingRemainingUSD,
        freeShippingProgressPercent,
        freeShippingThresholdUSD,
        isUsDeMinimisEligible,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isCheckoutOpen,
        setIsCheckoutOpen,
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
