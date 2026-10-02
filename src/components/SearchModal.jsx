import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const SearchModal = ({ isOpen, onClose, products = [], onSelectProduct, onNavigate }) => {
  const { formatPrice } = useCurrency();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSearches = [
    'Solitaire Ring',
    'Tennis Bracelet',
    'Lab-Grown Diamond',
    'Gold Huggie Earrings',
    'Solid 14K Gold',
    '925 Sterling Silver'
  ];

  const filtered = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.stoneType && p.stoneType.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  const handleSelect = (product) => {
    onClose();
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleSearchTerm = (term) => {
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#EAE3D5] overflow-hidden z-10 animate-fade-in">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EAE3D5] flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#A8843E] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lab diamonds, gold rings, tennis bracelets, earrings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#1F2022] placeholder-[#747780] focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-[#747780] hover:text-[#1F2022]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-[#575A61] hover:text-[#1F2022] border border-[#EAE3D5] rounded bg-white"
          >
            Esc
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-5">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A8843E] uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Trending Searches in USA & Canada</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearchTerm(term)}
                    className="px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] hover:border-[#C5A059] text-xs text-[#575A61] hover:text-[#1F2022] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-[#F5F1E8]">
                <span className="text-[11px] uppercase tracking-wider text-[#747780] font-semibold block mb-2">
                  Featured Atelier Collections
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['Rings', 'Earrings', 'Necklaces', 'Bracelets'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        onClose();
                        onNavigate('shop', { category: cat.toLowerCase() });
                      }}
                      className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE3D5] hover:border-[#C5A059] text-center font-medium text-[#1F2022] transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#747780] space-y-2">
              <p className="font-serif text-base text-[#1F2022]">No matching jewelry found for "{query}"</p>
              <p>Try searching for "gold", "lab-grown diamond", "solitaire", or "silver".</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs text-[#747780] flex justify-between items-center">
                <span>Matching Pieces ({filtered.length})</span>
                <span className="text-[10px]">Direct from Atelier</span>
              </div>

              <div className="divide-y divide-[#F5F1E8]">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className="py-2.5 flex items-center justify-between gap-3 hover:bg-[#FAF8F5] px-2 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#EAE3D5] shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-medium text-[#1F2022] group-hover:text-[#A8843E] transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-[#747780] truncate">
                          {product.category} &bull; {product.stoneType}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex items-center gap-3">
                      <div>
                        <span className="text-sm font-semibold text-[#1F2022]">{formatPrice(product.priceUSD)}</span>
                        <span className="block text-[10px] text-[#747780]">BIS Hallmark</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#747780] group-hover:text-[#A8843E] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FAF8F5] border-t border-[#EAE3D5] flex items-center justify-between text-[11px] text-[#747780] px-5">
          <span>🇺🇸 Section 321 Duty-Free &bull; 🇨🇦 Canada DDP Pre-Cleared</span>
          <button
            onClick={() => {
              onClose();
              onNavigate('shop');
            }}
            className="text-[#A8843E] font-medium hover:underline flex items-center gap-1"
          >
            <span>View All Collections &rarr;</span>
          </button>
        </div>

      </div>
    </div>
  );
};
