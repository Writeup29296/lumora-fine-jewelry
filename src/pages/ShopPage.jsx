import React, { useState, useMemo } from 'react';
import { 
  Filter, Search, SlidersHorizontal, ArrowUpDown, 
  Check, X, Sparkles, Eye, ShieldCheck, ShoppingBag 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

export const ShopPage = ({ products = [], onSelectProduct, initialCategory = 'all' }) => {
  const { formatPrice, activeCurrency } = useCurrency();
  const { addToCart } = useCart();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedMetal, setSelectedMetal] = useState('all');
  const [selectedPurity, setSelectedPurity] = useState('all');
  const [selectedStone, setSelectedStone] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Metal
      if (selectedMetal !== 'all') {
        const purities = p.metalDetails?.purityOptions?.join(' ').toLowerCase() || '';
        if (selectedMetal === 'gold' && !purities.includes('gold')) return false;
        if (selectedMetal === 'silver' && !purities.includes('silver') && !purities.includes('925')) return false;
      }
      // Gold Purity
      if (selectedPurity !== 'all') {
        const purities = p.metalDetails?.purityOptions?.join(' ') || '';
        if (!purities.includes(selectedPurity)) return false;
      }
      // Stone Type
      if (selectedStone !== 'all') {
        const stone = (p.stoneType || '').toLowerCase();
        if (selectedStone === 'lab_diamond' && !stone.includes('lab-grown')) return false;
        if (selectedStone === 'natural_gem' && !stone.includes('natural')) return false;
        if (selectedStone === 'pearl' && !stone.includes('pearl')) return false;
      }
      // Price Range in USD
      if (selectedPriceRange !== 'all') {
        const price = p.priceUSD;
        if (selectedPriceRange === 'under250' && price >= 250) return false;
        if (selectedPriceRange === '250to500' && (price < 250 || price > 500)) return false;
        if (selectedPriceRange === '500to1000' && (price < 500 || price > 1000)) return false;
        if (selectedPriceRange === 'over1000' && price <= 1000) return false;
      }
      // Availability
      if (selectedAvailability !== 'all') {
        if (selectedAvailability === 'instock' && p.inStock === false) return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchStone = (p.stoneType || '').toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchStone) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price_desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [
    products, selectedCategory, selectedMetal, selectedPurity, 
    selectedStone, selectedPriceRange, selectedAvailability, 
    searchQuery, sortBy
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedMetal('all');
    setSelectedPurity('all');
    setSelectedStone('all');
    setSelectedPriceRange('all');
    setSelectedAvailability('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeFilterCount = [
    selectedCategory !== 'all',
    selectedMetal !== 'all',
    selectedPurity !== 'all',
    selectedStone !== 'all',
    selectedPriceRange !== 'all',
    selectedAvailability !== 'all',
    searchQuery.trim().length > 0
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#FAF8F5] border border-[#EAE3D5] rounded-2xl p-6 sm:p-10 text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Curated Atelier Collection
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1F2022] font-normal">
          Fine Jewelry Shop
        </h1>
        <p className="text-sm text-[#575A61] max-w-2xl mx-auto">
          Explore solid 9K, 14K, and 18K gold and 925 sterling silver jewelry. Featuring certified lab-grown diamonds (CVD/HPHT) and natural untreated gemstones handcrafted in Jaipur & Surat, India.
        </p>

        {/* Currency & Duty Notice */}
        <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs text-[#575A61]">
          <span className="px-3 py-1 rounded-full bg-white border border-[#EAE3D5]">
            Pricing Display: <strong>{activeCurrency.name} ({activeCurrency.symbol})</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#EAE3D5]">
            Checkout Currency: <strong>{activeCurrency.statement}</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#EAE3D5]">
            Destination: <strong>USA & Canada Direct Air Cargo</strong>
          </span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EAE3D5]">
        {[
          { id: 'all', label: 'All Heirlooms' },
          { id: 'rings', label: 'Rings & Bands' },
          { id: 'earrings', label: 'Earrings & Huggies' },
          { id: 'necklaces', label: 'Necklaces & Pendants' },
          { id: 'bracelets', label: 'Tennis Bracelets' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-[#1F2022] text-[#FAF8F5] shadow-sm'
                : 'bg-white border border-[#EAE3D5] text-[#575A61] hover:border-[#C5A059] hover:text-[#1F2022]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Filters Sidebar + Product Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP FILTERS SIDEBAR */}
        <div className="hidden lg:block lg:col-span-3 bg-white border border-[#EAE3D5] rounded-xl p-5 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D5]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#A8843E]" />
              <h2 className="text-xs uppercase tracking-wider font-semibold text-[#1F2022]">Filter Catalog</h2>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#A8843E] hover:underline"
              >
                Reset ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search piece, gem, style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
              />
              <Search className="w-3.5 h-3.5 text-[#747780] absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Metal Classification */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Precious Metal</label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Metals' },
                { id: 'gold', label: 'Solid Gold (9K, 14K, 18K)' },
                { id: 'silver', label: '925 Sterling Silver' }
              ].map((m) => (
                <label key={m.id} className="flex items-center gap-2 text-xs text-[#575A61] cursor-pointer hover:text-[#1F2022]">
                  <input
                    type="radio"
                    name="metalFilter"
                    checked={selectedMetal === m.id}
                    onChange={() => setSelectedMetal(m.id)}
                    className="accent-[#A8843E]"
                  />
                  <span>{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gold Purity */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Gold Purity (BIS)</label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'Any Purity' },
                { id: '18K', label: '18K Solid Gold (BIS 750)' },
                { id: '14K', label: '14K Solid Gold (BIS 585)' },
                { id: '9K', label: '9K Solid Gold (375)' }
              ].map((p) => (
                <label key={p.id} className="flex items-center gap-2 text-xs text-[#575A61] cursor-pointer hover:text-[#1F2022]">
                  <input
                    type="radio"
                    name="purityFilter"
                    checked={selectedPurity === p.id}
                    onChange={() => setSelectedPurity(p.id)}
                    className="accent-[#A8843E]"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Stone Type */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Gemstone / Diamond</label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Gemstones' },
                { id: 'lab_diamond', label: 'Lab-Grown Diamond (CVD/HPHT)' },
                { id: 'natural_gem', label: 'Natural Moonstone / Gem' },
                { id: 'pearl', label: 'Cultured Freshwater Pearl' }
              ].map((st) => (
                <label key={st.id} className="flex items-center gap-2 text-xs text-[#575A61] cursor-pointer hover:text-[#1F2022]">
                  <input
                    type="radio"
                    name="stoneFilter"
                    checked={selectedStone === st.id}
                    onChange={() => setSelectedStone(st.id)}
                    className="accent-[#A8843E]"
                  />
                  <span>{st.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Price Range (USD)</label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under250', label: 'Under $250' },
                { id: '250to500', label: '$250 – $500' },
                { id: '500to1000', label: '$500 – $1,000' },
                { id: 'over1000', label: 'Over $1,000' }
              ].map((pr) => (
                <label key={pr.id} className="flex items-center gap-2 text-xs text-[#575A61] cursor-pointer hover:text-[#1F2022]">
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={selectedPriceRange === pr.id}
                    onChange={() => setSelectedPriceRange(pr.id)}
                    className="accent-[#A8843E]"
                  />
                  <span>{pr.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2 pt-2 border-t border-[#EAE3D5]">
            <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Stock Status</label>
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-xs text-[#575A61] cursor-pointer hover:text-[#1F2022]">
                <input
                  type="radio"
                  name="availFilter"
                  checked={selectedAvailability === 'all'}
                  onChange={() => setSelectedAvailability('all')}
                  className="accent-[#A8843E]"
                />
                <span>All Pieces</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[#575A61] cursor-pointer hover:text-[#1F2022]">
                <input
                  type="radio"
                  name="availFilter"
                  checked={selectedAvailability === 'instock'}
                  onChange={() => setSelectedAvailability('instock')}
                  className="accent-[#A8843E]"
                />
                <span>Ready Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROLS & PRODUCT GRID */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Bar: Count & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#EAE3D5]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3 py-1.5 rounded bg-[#FAF8F5] border border-[#EAE3D5] text-xs font-medium text-[#1F2022] flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>
              <span className="text-xs text-[#575A61]">
                Showing <strong>{filteredProducts.length}</strong> heirloom pieces
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#747780]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-xs text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
              >
                <option value="featured">Featured Heirlooms</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Drawer (toggleable) */}
          {mobileFilterOpen && (
            <div className="lg:hidden p-5 rounded-xl bg-white border border-[#EAE3D5] space-y-4 shadow-md">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D5]">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1F2022]">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-[#747780]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile search */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded"
              />

              {/* Mobile reset */}
              <button
                onClick={resetFilters}
                className="w-full py-2 bg-[#FAF8F5] border border-[#EAE3D5] text-xs font-medium text-[#1F2022] rounded"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#EAE3D5] rounded-2xl space-y-3">
              <p className="text-base font-serif text-[#1F2022]">No pieces match your selected filter criteria.</p>
              <p className="text-xs text-[#747780]">Try clearing or adjusting your search, metal, or price filters.</p>
              <button
                onClick={resetFilters}
                className="mt-2 px-5 py-2 bg-[#1F2022] text-[#FAF8F5] rounded text-xs uppercase tracking-wider font-medium"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#EAE3D5] rounded-xl overflow-hidden hover:border-[#C5A059] transition-all hover:shadow-lg flex flex-col group"
                >
                  {/* Image container */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-square overflow-hidden bg-[#FAF8F5] cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Sample Data Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#1F2022]/85 text-[#FAF8F5] text-[10px] font-mono tracking-tight">
                      Sample Data
                    </div>
                    {product.isBestSeller && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#F4EFE6] text-[#A8843E] border border-[#E0D5C1] text-[10px] font-semibold uppercase tracking-wider">
                        Best Seller
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#A8843E] font-semibold">
                        <span>{product.category}</span>
                        <span className="text-[#747780] font-normal">Jaipur Atelier</span>
                      </div>
                      
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-base text-[#1F2022] font-medium hover:text-[#A8843E] cursor-pointer transition-colors mt-1 line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#747780] line-clamp-2 mt-1">
                        {product.description}
                      </p>

                      {/* Stone Type distinction */}
                      <div className="mt-2.5 inline-block px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE3D5] text-[10px] text-[#575A61] font-mono">
                        {product.stoneType}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#F5F1E8] flex items-center justify-between">
                      <div>
                        <span className="text-base font-semibold text-[#1F2022]">
                          {formatPrice(product.priceUSD)}
                        </span>
                        <span className="block text-[10px] text-[#747780]">
                          {activeCurrency.statement}
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectProduct(product)}
                        className="px-3.5 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#1F2022] hover:text-[#FAF8F5] border border-[#EAE3D5] text-xs font-medium text-[#1F2022] transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Piece</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
