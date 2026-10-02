import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image, Check, AlertCircle } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';

export const ProductFormModal = ({ isOpen, onClose, editingProduct = null, onSaveProduct }) => {
  const { addProduct, updateProduct } = useProducts();
  const isEditing = !!editingProduct;

  const [formData, setFormData] = useState({
    name: '',
    category: 'rings',
    metalCategory: 'gold',
    defaultMetal: '14K Solid Yellow Gold (BIS 585)',
    priceUSD: 395,
    originalPriceUSD: 520,
    weightGrams: '3.8g',
    gemstone: '1.50ct Lab-Grown Diamond (DEF/VVS1)',
    badge: 'North America Best Seller',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
    availableSizes: '5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10'
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        category: editingProduct.category || 'rings',
        metalCategory: editingProduct.metalCategory || 'gold',
        defaultMetal: editingProduct.defaultMetal || '14K Solid Yellow Gold (BIS 585)',
        priceUSD: editingProduct.priceUSD || 300,
        originalPriceUSD: editingProduct.originalPriceUSD || '',
        weightGrams: editingProduct.weightGrams || '3.5g',
        gemstone: editingProduct.gemstone || editingProduct.stoneType || '',
        badge: editingProduct.badge || '',
        description: editingProduct.description || '',
        imageUrl: editingProduct.images?.[0] || '',
        availableSizes: editingProduct.availableSizes 
          ? editingProduct.availableSizes.join(', ') 
          : (editingProduct.ringSizes ? editingProduct.ringSizes.join(', ') : '5, 6, 7, 8, 9, 10')
      });
    } else {
      setFormData({
        name: '',
        category: 'rings',
        metalCategory: 'gold',
        defaultMetal: '14K Solid Yellow Gold (BIS 585)',
        priceUSD: 395,
        originalPriceUSD: 520,
        weightGrams: '3.8g',
        gemstone: '1.50ct Lab-Grown Diamond (DEF/VVS1)',
        badge: 'New Arrival',
        description: 'Forged in solid 14K gold with laser BIS hallmarking and certified lab-grown diamonds.',
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
        availableSizes: '5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10'
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const sizesArray = formData.availableSizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      ...(editingProduct || {}),
      name: formData.name.trim(),
      category: formData.category,
      metalCategory: formData.metalCategory,
      defaultMetal: formData.defaultMetal.trim(),
      priceUSD: Number(formData.priceUSD),
      originalPriceUSD: formData.originalPriceUSD ? Number(formData.originalPriceUSD) : null,
      weightGrams: formData.weightGrams.trim(),
      stoneType: formData.gemstone.trim(),
      gemstone: formData.gemstone.trim(),
      badge: formData.badge.trim(),
      description: formData.description.trim(),
      images: [formData.imageUrl.trim()],
      availableSizes: sizesArray.length > 0 ? sizesArray : ['Standard'],
      ringSizes: formData.category === 'rings' ? sizesArray : undefined,
      isSample: true
    };

    if (onSaveProduct) {
      onSaveProduct(productPayload);
    } else {
      if (isEditing) {
        updateProduct(editingProduct.id, productPayload);
      } else {
        addProduct(productPayload);
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in text-[#1F2022]">
      <div className="bg-white border border-[#EAE3D5] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE3D5] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A8843E]" />
            <h3 className="text-base font-serif font-bold text-[#1F2022] tracking-wide">
              {isEditing ? `Edit Piece: ${editingProduct.name}` : 'Add New Fine Jewellery Piece'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#747780] hover:text-[#1F2022] rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Piece Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-[#575A61] block mb-1 font-medium">Piece Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Celestial Solitaire Ring"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
              >
                <option value="rings">Rings & Bands</option>
                <option value="necklaces">Necklaces & Pendants</option>
                <option value="earrings">Earrings & Huggies</option>
                <option value="bracelets">Bracelets & Cuffs</option>
              </select>
            </div>
          </div>

          {/* Metal Classification & Purity Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Metal Classification</label>
              <select
                value={formData.metalCategory}
                onChange={(e) => setFormData({ ...formData, metalCategory: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
              >
                <option value="gold">Solid Gold (14K / 18K / 9K)</option>
                <option value="silver">925 Sterling Silver</option>
                <option value="both">Both Available as Variants</option>
              </select>
            </div>

            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Default Metal Stamp</label>
              <input
                type="text"
                value={formData.defaultMetal}
                onChange={(e) => setFormData({ ...formData, defaultMetal: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
              />
            </div>
          </div>

          {/* Pricing & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Base Price (USD) *</label>
              <input
                type="number"
                required
                min="10"
                value={formData.priceUSD}
                onChange={(e) => setFormData({ ...formData, priceUSD: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] font-semibold"
              />
            </div>

            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Compare Price (USD)</label>
              <input
                type="number"
                value={formData.originalPriceUSD}
                onChange={(e) => setFormData({ ...formData, originalPriceUSD: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
              />
            </div>

            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Approx Weight (g)</label>
              <input
                type="text"
                value={formData.weightGrams}
                onChange={(e) => setFormData({ ...formData, weightGrams: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
              />
            </div>
          </div>

          {/* Gemstone / Lab-Diamond Classification */}
          <div>
            <label className="text-[#575A61] block mb-1 font-medium">
              Gemstone / Diamond Specification * (Distinguish Lab-Grown vs Natural vs Simulant)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 1.75ct Lab-Grown Diamond (CVD/HPHT, DEF/VVS1)"
              value={formData.gemstone}
              onChange={(e) => setFormData({ ...formData, gemstone: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-[#575A61] block mb-1 font-medium">Product Photography URL *</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
            />
          </div>

          {/* Available Sizes */}
          <div>
            <label className="text-[#575A61] block mb-1 font-medium">Available Sizes (Comma separated)</label>
            <input
              type="text"
              value={formData.availableSizes}
              onChange={(e) => setFormData({ ...formData, availableSizes: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[#575A61] block mb-1 font-medium">Atelier Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#EAE3D5] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#EAE3D5] rounded-lg text-[#575A61] hover:text-[#1F2022] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded-lg font-semibold uppercase tracking-wider"
            >
              {isEditing ? 'Save Changes' : 'Create Piece'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
