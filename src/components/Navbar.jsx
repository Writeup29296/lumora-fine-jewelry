import React, { useState } from 'react';
import { brandConfig } from '../data/brandConfig';
import { useCurrency, COUNTRIES } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AnnouncementBar } from './AnnouncementBar';
import { SearchModal } from './SearchModal';
import { LumoraCrest } from './LumoraCrest';
import { 
  Globe, ShoppingBag, Menu, X, Sparkles, ShieldCheck, 
  ChevronDown, Settings, User, LogOut, Package, Lock, 
  HelpCircle, Search, ArrowRight, Heart, Ruler, 
  RefreshCw, Plane, MessageCircle 
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
        { label: 'Surat Filigree Drop Earrings', category: 'earrings' },
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

        {/* Official Brand Symbol & Logo */}
        <div 
          onClick={() => {
            setActiveMegaMenu(null);
            onNavigate('home');
          }}
          className="flex items-center cursor-pointer group py-1"
          title="Lumora — Jewels That Shine Forever"
        >
          <img 
            src="/lumora-logo.png" 
            alt="Lumora — Jewels That Shine Forever" 
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] select-none"
          />
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
                  <span>Surat Direct Export</span>
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

      {/* 4. LUXURY MOBILE SLIDE-OVER DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-[88vw] max-w-xs bg-[#FAF8F5] border-r border-[#EAE3D5] flex flex-col shadow-2xl animate-slide-right text-[#1F2022] overflow-y-auto">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#EAE3D5] flex items-center justify-between bg-white sticky top-0 z-10">
                <div 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('home');
                  }}
                  className="cursor-pointer"
                  title="Lumora — Jewels That Shine Forever"
                >
                  <img 
                    src="/lumora-logo.png" 
                    alt="Lumora — Jewels That Shine Forever" 
                    className="h-9 w-auto object-contain select-none"
                  />
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#747780] hover:text-[#1F2022] rounded-lg hover:bg-[#FAF8F5] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-5 space-y-6 flex-1">
                
                {/* Search Trigger */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#EAE3D5] text-[#747780] flex items-center gap-2 text-xs text-left shadow-xs hover:border-[#C5A059] transition-colors"
                >
                  <Search className="w-4 h-4 text-[#A8843E]" />
                  <span>Search solitaires, bands, metals...</span>
                </button>

                {/* Main Collections Navigation */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8843E] font-semibold block px-2 mb-1.5">
                    Fine Collections
                  </span>

                  {[
                    { label: 'Shop All Jewelry', category: 'all', badge: 'Complete Suite' },
                    { label: 'Heirloom Rings & Bands', category: 'rings', badge: 'Solitaires' },
                    { label: 'Earrings & Huggie Hoops', category: 'earrings', badge: 'Pavé' },
                    { label: 'Necklaces & Pendants', category: 'necklaces', badge: 'Chains' },
                    { label: 'Tennis Suite & Bracelets', category: 'bracelets', badge: 'Diamond' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('shop', { category: item.category });
                      }}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-medium text-[#1F2022] hover:bg-white hover:text-[#A8843E] transition-all text-left"
                    >
                      <span className="font-serif text-sm">{item.label}</span>
                      <span className="text-[10px] text-[#747780] font-sans px-2 py-0.5 rounded bg-white/70 border border-[#EAE3D5]">
                        {item.badge}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Essential Client Services */}
                <div className="space-y-1 pt-3 border-t border-[#EAE3D5]">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#747780] font-semibold block px-2 mb-1.5">
                    Client Services
                  </span>

                  {[
                    { label: 'International Ring Size Guide', page: 'ring-size-guide', icon: Ruler },
                    { label: 'Surat Atelier Heritage & Craft', page: 'about', icon: Sparkles },
                    { label: 'Jewelry Care & Cleaning Guide', page: 'care', icon: ShieldCheck },
                    { label: 'Worldwide Insured Air Shipping', page: 'shipping', icon: Plane },
                    { label: '30-Day Evaluation & Returns', page: 'returns', icon: RefreshCw },
                    { label: 'Frequently Asked Questions', page: 'faq', icon: HelpCircle },
                    { label: 'Order Tracking & Account', page: 'account', icon: Package }
                  ].map((srv, idx) => {
                    const SrvIcon = srv.icon || ChevronRight;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onNavigate(srv.page);
                        }}
                        className="w-full flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs text-[#575A61] hover:text-[#1F2022] hover:bg-white transition-all text-left"
                      >
                        <SrvIcon className="w-3.5 h-3.5 text-[#A8843E] shrink-0" />
                        <span>{srv.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* VIP WhatsApp Concierge Card */}
                <div className="p-4 rounded-xl bg-white border border-[#EAE3D5] shadow-xs space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Atelier WhatsApp Concierge
                    </span>
                    <span className="text-[10px] text-[#747780] font-mono">+91 79840 29296</span>
                  </div>
                  <p className="text-[11px] text-[#575A61] leading-relaxed">
                    Collaborate directly with our Surat master goldsmiths for custom sizes, 18K purity, or video previews.
                  </p>
                  <a
                    href="https://wa.me/917984029296"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open WhatsApp VIP Chat</span>
                  </a>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-white border-t border-[#EAE3D5] text-[11px] text-[#747780] space-y-1">
                <div className="flex items-center justify-between">
                  <span>Origin: Surat, Gujarat, India</span>
                  <span className="text-emerald-700 font-medium">100% BIS Hallmarked</span>
                </div>
                <div className="text-[10px] text-[#575A61]">
                  Complimentary Insured Delivery Worldwide
                </div>
              </div>

            </div>
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
