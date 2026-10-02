import React, { useState } from 'react';
import { brandConfig } from '../data/brandConfig';
import { useCurrency, COUNTRIES } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AnnouncementBar } from './AnnouncementBar';
import { SearchModal } from './SearchModal';
import { 
  Globe, ShoppingBag, Menu, X, Sparkles, ShieldCheck, 
  ChevronDown, Settings, User, LogOut, Package, Lock, 
  HelpCircle, Search, ArrowRight, Heart 
} from 'lucide-react';

export const Navbar = ({ onNavigate, onSelectProduct, products = [] }) => {
  const { currency, activeCurrency } = useCurrency();
  const { cartCount, openCart } = useCart();
  const { currentUser, isLoggedIn, openLogin, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const megaMenuData = {
    rings: {
      title: 'Heirloom Rings & Bands',
      links: [
        { label: 'All Rings', category: 'rings' },
        { label: 'Solitaire Rings (Lab Diamonds)', category: 'rings', filter: 'solitaire' },
        { label: 'French-Set Eternity Bands', category: 'rings', filter: 'eternity' },
        { label: 'Minimalist Stacking Bands', category: 'rings', filter: 'stack' },
        { label: 'Artisan Signet & Cocktail Rings', category: 'rings', filter: 'signet' },
        { label: 'Ring Size & Millimetre Guide', page: 'ring-size-guide' }
      ],
      featured: {
        title: 'Aura Solitaire Diamond Ring',
        subtitle: '1.20 ct Round Brilliant Lab Diamond • 14K Gold',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
        badge: 'Best Seller',
        id: 'lum-01'
      }
    },
    earrings: {
      title: 'Fine Earrings & Huggies',
      links: [
        { label: 'All Earrings', category: 'earrings' },
        { label: 'Clicker Huggie Hoops', category: 'earrings' },
        { label: 'Lab Diamond Solitaire Studs', category: 'earrings' },
        { label: 'Jaipur Filigree Drop Earrings', category: 'earrings' },
        { label: 'Solid 14K Gold & 925 Silver Hoops', category: 'earrings' }
      ],
      featured: {
        title: 'Seraphina Pavé Huggie Hoops',
        subtitle: '0.40 ctw Lab Diamonds • Comfort Click Clasp',
        image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
        badge: 'Atelier Favorite',
        id: 'lum-02'
      }
    },
    necklaces: {
      title: 'Necklaces & Pendants',
      links: [
        { label: 'All Necklaces', category: 'necklaces' },
        { label: 'Elysian Diamond Tennis Necklaces', category: 'necklaces' },
        { label: 'Byzantine Medallions & Charms', category: 'necklaces' },
        { label: 'Solitaire Floating Pendants', category: 'necklaces' },
        { label: 'Layering Chains (Solid Gold & Silver)', category: 'necklaces' }
      ],
      featured: {
        title: 'Byzantine Sunburst Medallion',
        subtitle: 'Natural Blue Sapphire & Rainbow Moonstone',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
        badge: 'Hand-Carved',
        id: 'lum-04'
      }
    },
    bracelets: {
      title: 'Bracelets & Tennis Suite',
      links: [
        { label: 'All Bracelets', category: 'bracelets' },
        { label: 'Radiant Cut Tennis Bracelets', category: 'bracelets' },
        { label: 'Solid Gold Bangle Cuffs', category: 'bracelets' },
        { label: '925 Sterling Silver Fluid Chains', category: 'bracelets' }
      ],
      featured: {
        title: 'Elysian Radiant Tennis Bracelet',
        subtitle: '4.50 ctw Lab Diamonds • Double Safety Clasp',
        image: 'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=600&q=80',
        badge: 'Milestone Heirloom',
        id: 'lum-03'
      }
    },
    gifting: {
      title: 'Curated Milestone Gifting',
      links: [
        { label: 'Gifts Under $250 USD', category: 'all', price: 'under250' },
        { label: 'Gifts Under $500 USD', category: 'all', price: '250to500' },
        { label: 'Milestone Lab Diamonds', category: 'all', filter: 'diamond' },
        { label: 'Complimentary Custom Engraving', page: 'shop' },
        { label: 'Jewellery Care Guidelines', page: 'care' }
      ],
      featured: {
        title: 'Signature Velvet Vault Box',
        subtitle: 'Included with every Lumora fine jewelry order',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
        badge: 'Complimentary Packaging',
        page: 'about'
      }
    }
  };

  const handleLinkClick = (menuItem) => {
    setActiveMegaMenu(null);
    if (menuItem.page) {
      onNavigate(menuItem.page);
    } else {
      onNavigate('shop', { category: menuItem.category });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D5]">
      
      {/* 1. ROTATING ANNOUNCEMENT BAR */}
      <AnnouncementBar 
        onNavigate={onNavigate} 
      />

      {/* 2. MAIN NAVIGATION */}
      <nav 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative"
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#575A61] hover:text-[#1F2022]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setSearchModalOpen(true)}
            className="p-2 text-[#575A61] hover:text-[#1F2022]"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Logo */}
        <div 
          onClick={() => {
            setActiveMegaMenu(null);
            onNavigate('home');
          }}
          className="flex flex-col text-center lg:text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <span className="text-2xl sm:text-3xl font-serif tracking-[0.25em] font-semibold text-[#1F2022] group-hover:text-[#A8843E] transition-colors">
              LUMORA
            </span>
            <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#C5A059]/40 text-[#A8843E] bg-[#F4EFE6] font-sans hidden sm:inline-block font-medium">
              FINE JEWELRY
            </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#747780] font-medium hidden xs:block">
            Solid Gold & 925 Silver &bull; Jaipur & Surat to North America
          </span>
        </div>

        {/* Desktop Links with Hover Mega-Menu */}
        <div className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.15em] font-medium text-[#575A61] h-full">
          <button 
            onClick={() => {
              setActiveMegaMenu(null);
              onNavigate('home');
            }}
            className="hover:text-[#1F2022] transition-colors py-7 font-semibold"
          >
            Home
          </button>

          <button 
            onClick={() => {
              setActiveMegaMenu(null);
              onNavigate('shop');
            }}
            className="hover:text-[#1F2022] transition-colors py-7"
          >
            Shop All
          </button>

          <button 
            onMouseEnter={() => setActiveMegaMenu('rings')}
            onClick={() => {
              setActiveMegaMenu(null);
              onNavigate('shop', { category: 'rings' });
            }}
            className={`hover:text-[#1F2022] transition-colors py-7 flex items-center gap-1 ${
              activeMegaMenu === 'rings' ? 'text-[#1F2022] font-semibold' : ''
            }`}
          >
            <span>Rings</span>
            <ChevronDown className="w-3 h-3 text-[#747780]" />
          </button>

          <button 
            onMouseEnter={() => setActiveMegaMenu('earrings')}
            onClick={() => {
              setActiveMegaMenu(null);
              onNavigate('shop', { category: 'earrings' });
            }}
            className={`hover:text-[#1F2022] transition-colors py-7 flex items-center gap-1 ${
              activeMegaMenu === 'earrings' ? 'text-[#1F2022] font-semibold' : ''
            }`}
          >
            <span>Earrings</span>
            <ChevronDown className="w-3 h-3 text-[#747780]" />
          </button>

          <button 
            onMouseEnter={() => setActiveMegaMenu('necklaces')}
            onClick={() => {
              setActiveMegaMenu(null);
              onNavigate('shop', { category: 'necklaces' });
            }}
            className={`hover:text-[#1F2022] transition-colors py-7 flex items-center gap-1 ${
              activeMegaMenu === 'necklaces' ? 'text-[#1F2022] font-semibold' : ''
            }`}
          >
            <span>Necklaces</span>
            <ChevronDown className="w-3 h-3 text-[#747780]" />
          </button>

          <button 
            onMouseEnter={() => setActiveMegaMenu('bracelets')}
            onClick={() => {
              setActiveMegaMenu(null);
              onNavigate('shop', { category: 'bracelets' });
            }}
            className={`hover:text-[#1F2022] transition-colors py-7 flex items-center gap-1 ${
              activeMegaMenu === 'bracelets' ? 'text-[#1F2022] font-semibold' : ''
            }`}
          >
            <span>Bracelets</span>
            <ChevronDown className="w-3 h-3 text-[#747780]" />
          </button>

          <button 
            onMouseEnter={() => setActiveMegaMenu('gifting')}
            onClick={() => {
              setActiveMegaMenu(null);
              onNavigate('shop');
            }}
            className={`hover:text-[#1F2022] transition-colors py-7 flex items-center gap-1 text-[#A8843E] ${
              activeMegaMenu === 'gifting' ? 'font-semibold' : ''
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gifting</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          <button 
            onClick={() => {
              setActiveMegaMenu(null);
              onNavigate('about');
            }}
            className="hover:text-[#1F2022] transition-colors py-7"
          >
            Our Atelier
          </button>
        </div>

        {/* Right Actions: Search + Account + Cart */}
        <div className="flex items-center space-x-2.5 sm:space-x-4">
          
          {/* Live Search Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE3D5] text-[#747780] hover:text-[#1F2022] hover:border-[#C5A059] transition-colors text-xs"
          >
            <Search className="w-3.5 h-3.5 text-[#A8843E]" />
            <span className="text-xs">Search Jewelry...</span>
          </button>

          {/* Account / Tracking Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="p-2 text-[#575A61] hover:text-[#1F2022] hover:bg-white rounded-lg transition-colors"
              title="Customer Account & Order Tracking"
            >
              <User className="w-5 h-5" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#EAE3D5] rounded-xl shadow-lg p-2 z-50 text-xs">
                {isLoggedIn ? (
                  <>
                    <div className="px-3 py-2 border-b border-[#F5F1E8]">
                      <span className="text-[10px] uppercase tracking-wider text-[#747780] block">Signed in as</span>
                      <strong className="text-xs text-[#1F2022] truncate block">{currentUser?.email}</strong>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('account');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-[#FAF8F5] text-[#575A61] hover:text-[#1F2022] rounded flex items-center gap-2"
                    >
                      <Package className="w-4 h-4 text-[#A8843E]" />
                      <span>Order Tracking & Returns</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 rounded flex items-center gap-2 border-t border-[#F5F1E8] mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('account');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-[#FAF8F5] text-[#575A61] hover:text-[#1F2022] rounded flex items-center gap-2 font-medium"
                    >
                      <Package className="w-4 h-4 text-[#A8843E]" />
                      <span>Track International Order</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openLogin();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-[#FAF8F5] text-[#1F2022] rounded font-semibold border-t border-[#F5F1E8] mt-1"
                    >
                      Sign In / Register
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon & Slide-over Trigger */}
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-full bg-white border border-[#EAE3D5] text-[#1F2022] hover:border-[#C5A059] transition-colors shadow-xs"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#1F2022]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1F2022] text-[#FAF8F5] text-[10px] font-bold flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

        </div>

        {/* 3. DESKTOP MEGA-MENU FLYOUT */}
        {activeMegaMenu && megaMenuData[activeMegaMenu] && (
          <div 
            className="absolute top-20 left-0 right-0 bg-white border-b border-[#EAE3D5] shadow-2xl p-8 z-50 animate-fade-in"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
              
              {/* Left Links Column */}
              <div className="col-span-7 space-y-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#A8843E] font-semibold block">
                  {megaMenuData[activeMegaMenu].title}
                </span>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {megaMenuData[activeMegaMenu].links.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLinkClick(link)}
                      className="text-left py-2 px-3 rounded-lg hover:bg-[#FAF8F5] text-xs font-medium text-[#575A61] hover:text-[#1F2022] transition-colors flex items-center justify-between group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 text-[#747780] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#F5F1E8] flex items-center gap-6 text-[11px] text-[#747780]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A8843E]" />
                    BIS Assay Hallmarked
                  </span>
                  <span>Jaipur & Surat Direct Export</span>
                  <span>DHL Air Express 3-5 Days</span>
                </div>
              </div>

              {/* Right Featured Editorial Spotlight Card */}
              <div className="col-span-5 border-l border-[#EAE3D5] pl-8">
                <div 
                  onClick={() => {
                    setActiveMegaMenu(null);
                    const prod = products.find(p => p.id === megaMenuData[activeMegaMenu].featured.id);
                    if (prod && onSelectProduct) {
                      onSelectProduct(prod);
                    } else {
                      onNavigate('shop');
                    }
                  }}
                  className="group cursor-pointer bg-[#FAF8F5] border border-[#EAE3D5] rounded-xl p-4 flex gap-4 items-center hover:border-[#C5A059] transition-all shadow-xs"
                >
                  <img
                    src={megaMenuData[activeMegaMenu].featured.image}
                    alt={megaMenuData[activeMegaMenu].featured.title}
                    className="w-24 h-24 rounded-lg object-cover border border-[#EAE3D5] group-hover:scale-105 transition-transform shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#A8843E] font-semibold block">
                      {megaMenuData[activeMegaMenu].featured.badge}
                    </span>
                    <h4 className="font-serif text-base text-[#1F2022] font-medium group-hover:text-[#A8843E] transition-colors">
                      {megaMenuData[activeMegaMenu].featured.title}
                    </h4>
                    <p className="text-xs text-[#747780] line-clamp-2">
                      {megaMenuData[activeMegaMenu].featured.subtitle}
                    </p>
                    <span className="text-xs font-semibold text-[#1F2022] flex items-center gap-1 pt-1">
                      <span>Explore Piece</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </nav>

      {/* 4. MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE3D5] bg-[#FAF8F5] px-6 py-6 space-y-5 animate-fade-in shadow-lg">
          <div className="space-y-3 text-xs uppercase tracking-wider font-semibold text-[#1F2022]">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="block w-full text-left py-2 border-b border-[#EAE3D5] text-[#A8843E]"
            >
              Home
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('shop');
              }}
              className="block w-full text-left py-2 border-b border-[#EAE3D5]"
            >
              Shop All Jewelry
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('shop', { category: 'rings' });
              }}
              className="block w-full text-left py-2 border-b border-[#EAE3D5]"
            >
              Rings & Bands
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('shop', { category: 'earrings' });
              }}
              className="block w-full text-left py-2 border-b border-[#EAE3D5]"
            >
              Earrings & Huggies
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('shop', { category: 'necklaces' });
              }}
              className="block w-full text-left py-2 border-b border-[#EAE3D5]"
            >
              Necklaces & Pendants
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('shop', { category: 'bracelets' });
              }}
              className="block w-full text-left py-2 border-b border-[#EAE3D5]"
            >
              Tennis Bracelets
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('about');
              }}
              className="block w-full text-left py-2 border-b border-[#EAE3D5]"
            >
              Atelier Heritage & Jaipur Story
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('ring-size-guide');
              }}
              className="block w-full text-left py-2 border-b border-[#EAE3D5]"
            >
              US / Canada Ring Size Guide
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('shipping');
              }}
              className="block w-full text-left py-2 border-b border-[#EAE3D5]"
            >
              Shipping & Customs (Section 321 / DDP)
            </button>
          </div>
        </div>
      )}

      {/* 5. LIVE PREDICTIVE SEARCH MODAL */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        products={products}
        onSelectProduct={onSelectProduct}
        onNavigate={onNavigate}
      />

    </header>
  );
};
