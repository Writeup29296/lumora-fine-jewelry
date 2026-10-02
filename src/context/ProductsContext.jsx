import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    if (typeof window === 'undefined') return initialProducts;
    try {
      const saved = localStorage.getItem('lumora_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lumora_products', JSON.stringify(products));
      } catch (e) {
        console.error('Failed to save products to localStorage', e);
      }
    }
  }, [products]);

  // Add new product
  const addProduct = (productData) => {
    const newId = `lum-${Date.now().toString().slice(-6)}`;
    const newProduct = {
      ...productData,
      id: newId,
      priceUSD: Number(productData.priceUSD) || 100,
      originalPriceUSD: productData.originalPriceUSD ? Number(productData.originalPriceUSD) : null,
      rating: 5.0,
      reviewCount: 1,
      isNew: true,
      usDeMinimisEligible: (Number(productData.priceUSD) || 100) < 800,
      images: productData.images && productData.images.length > 0 
        ? productData.images 
        : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'],
      availableMetals: productData.availableMetals || [
        { name: '14K Yellow Gold', priceDelta: 0, stamp: 'BIS 585' },
        { name: '18K Yellow Gold', priceDelta: 150, stamp: 'BIS 750' },
        { name: '925 Sterling Silver', priceDelta: -250, stamp: '925 Laser' }
      ],
      availableSizes: productData.availableSizes || ['5', '6', '7', '8', '9', '10', '11'],
      specs: productData.specs || [
        { label: 'Purity Stamp', value: 'BIS Hallmark Certified' },
        { label: 'Origin', value: 'Jaipur Atelier, India' },
        { label: 'US Customs Duty', value: (Number(productData.priceUSD) || 100) < 800 ? '$0.00 (Section 321 Duty-Free)' : 'Standard HTS 7113' }
      ]
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  // Update existing product
  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedPrice = updatedFields.priceUSD !== undefined ? Number(updatedFields.priceUSD) : item.priceUSD;
          return {
            ...item,
            ...updatedFields,
            priceUSD: updatedPrice,
            originalPriceUSD: updatedFields.originalPriceUSD !== undefined ? (updatedFields.originalPriceUSD ? Number(updatedFields.originalPriceUSD) : null) : item.originalPriceUSD,
            usDeMinimisEligible: updatedPrice < 800
          };
        }
        return item;
      })
    );
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle in-stock / status
  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inStock: item.inStock === false ? true : false } : item))
    );
  };

  // Reset to initial catalog
  const resetToDefaults = () => {
    setProducts(initialProducts);
    try {
      localStorage.setItem('lumora_products', JSON.stringify(initialProducts));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        resetToDefaults
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
