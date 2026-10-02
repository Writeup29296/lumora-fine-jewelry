import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductsContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { Eye, Star, Sparkles, Filter, Heart, ShoppingBag, ShieldCheck, Check } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Heirlooms' },
  { id: 'rings', label: 'Rings & Bands' },
  { id: 'necklaces', label: 'Necklaces & Pendants' },
  { id: 'earrings', label: 'Earrings & Huggies' },
  { id: 'bracelets', label: 'Bracelets & Bangles' }
];

const METALS = [
  { id: 'all', label: 'All Metals' },
  { id: 'gold', label: 'Solid Gold (14K/18K)' },
  { id: 'silver', label: '925 Sterling Silver' }
];

export const ProductCatalog = ({ onSelectProduct, onOpenBespoke }) => {
  const { products } = useProducts();
  const { formatPrice, currency } = useCurrency();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMetal, setSelectedMetal] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('lumora_favorites') : null;
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (productId, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('lumora_favorites', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    addToCart(product, product.defaultMetal, product.availableSizes?.[0] || 'Standard', '', product.priceUSD);
    setAddedItemNotice(product.id);
    setTimeout(() => setAddedItemNotice(null), 1800);
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by metal
    if (selectedMetal !== 'all') {
      list = list.filter((p) => p.metalCategory === selectedMetal || p.metalCategory === 'both');
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [selectedCategory, selectedMetal, sortBy]);

  return (
    <section id="collections" className="py-16 sm:py-24 border-b border-white/10 bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-xs text-[#d4af37] uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>North American Direct Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight">
            Curated Fine Gold & Sterling Silver Heirlooms
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            Every piece is made-to-order or in limited batches with genuine BIS Hallmarking and certified lab or natural gemstones. Transparent pricing direct from the source.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#12151e] border border-white/10 rounded-2xl p-4 sm:p-5 mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#d4af37] text-[#0b0c10] font-semibold shadow-md'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Metal Filter & Sort Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Metal selector */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
                {METALS.map((metal) => (
                  <button
                    key={metal.id}
                    onClick={() => setSelectedMetal(metal.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      selectedMetal === metal.id
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {metal.label}
                  </button>
                ))}
              </div>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/40 border border-white/10 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#d4af37]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            const isAdded = addedItemNotice === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-[#12151e] border border-white/10 hover:border-[#d4af37]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10 flex flex-col cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-black/30 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151e] via-transparent to-black/10 opacity-70" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0b0c10]/80 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] text-[10px] uppercase font-semibold tracking-wider">
                      {product.badge}
                    </div>
                  )}

                  {/* US Section 321 Duty-Free Marker */}
                  {currency === 'USD' && product.usDeMinimisEligible && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> US Duty-Free &lt;$800
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(product.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#0b0c10]/60 backdrop-blur-md border border-white/10 hover:bg-[#0b0c10] text-white/70 hover:text-rose-400 transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Metal and Rating line */}
                    <div className="flex items-center justify-between text-xs text-white/50 mb-1.5">
                      <span className="text-[#d4af37] font-medium uppercase tracking-wider text-[10px]">
                        {product.defaultMetal}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-[11px]">
                        <span>★</span>
                        <span className="text-white/80 font-mono">{product.rating}</span>
                        <span className="text-white/40">({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-serif font-medium text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-white/60 line-clamp-2 mt-1.5 font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-serif font-bold text-white font-mono">
                          {formatPrice(product.priceUSD)}
                        </span>
                        {product.originalPriceUSD && (
                          <span className="text-xs text-white/40 line-through font-mono">
                            {formatPrice(product.originalPriceUSD)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Add or View Specs */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                          isAdded
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#d4af37] text-[#0b0c10] hover:bg-[#e6ca65] active:scale-95'
                        }`}
                        title="Add to Bag with standard settings"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onSelectProduct(product)}
                        className="p-2 rounded-lg border border-white/10 hover:border-[#d4af37]/40 text-white/60 hover:text-white bg-white/5 transition-colors"
                        title="Customize metal purity and ring size"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Piece Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#171a25] via-[#211a0f] to-[#171a25] border border-[#d4af37]/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif text-white">Seeking a Custom Gold Purity, 22K Karat, or Bespoke Diamond Setting?</h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            Our Jaipur master ateliers craft bespoke engagement rings, matching bridal bands, family crest signets, and investment gold bullion pieces. Direct video consultation with our goldsmith.
          </p>
          <button
            onClick={() => onOpenBespoke()}
            className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e6ca65] text-[#0b0c10] text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20"
          >
            Schedule Free VIP Atelier Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
