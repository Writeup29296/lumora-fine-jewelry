import React, { useState } from 'react';
import { brandConfig } from '../data/brandConfig';
import { useCurrency, COUNTRIES } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  Globe, ShoppingBag, Menu, X, Sparkles, ShieldCheck, 
  ChevronDown, Settings, User, LogOut, Package, Lock, HelpCircle 
} from 'lucide-react';

export const Navbar = ({ onNavigate, onOpenAdmin, onOpenBespoke, onOpenDomainGuide }) => {
  const { country, setCountry, currency, setCurrency, activeCurrency, activeCountry } = useCurrency();
  const { cartCount, openCart } = useCart();
  const { currentUser, isAdmin, isLoggedIn, openLogin, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D5]">
      
      {/* 1. TOP ANNOUNCEMENT BAR (Transparent India Origin & USA/Canada Terms) */}
      <div className="bg-[#FAF8F5] border-b border-[#EAE3D5] py-2 px-4 text-xs tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-[#575A61]">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs">
              Handcrafted in India &bull; 🇺🇸 <strong>USA:</strong> Section 321 Duty-Free under $800 &bull; 🇨🇦 <strong>Canada:</strong> Optional DDP Clearance &bull; <strong>Free Express DHL over $150</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#747780]">
            <button
              onClick={() => onNavigate('shipping')}
              className="hover:text-[#1F2022] transition-colors"
            >
              Shipping Policy
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onNavigate('returns')}
              className="hover:text-[#1F2022] transition-colors"
            >
              30-Day Returns
            </button>
            <span>&bull;</span>
            {/* Quick Admin Access */}
            <button
              onClick={isAdmin ? onOpenAdmin : openLogin}
              className="text-[#A8843E] hover:text-[#1F2022] flex items-center gap-1 font-mono transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdmin ? 'Admin Portal' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex flex-col text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-serif tracking-[0.25em] font-semibold text-[#1F2022] group-hover:text-[#A8843E] transition-colors">
              LUMORA
            </span>
            <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#C5A059]/40 text-[#A8843E] bg-[#F4EFE6] font-sans hidden sm:inline-block font-medium">
              FINE JEWELRY
            </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#747780] font-medium">
            Solid Gold & 925 Silver &bull; Jaipur & Surat to North America
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.15em] font-medium text-[#575A61]">
          <button 
            onClick={() => onNavigate('shop')}
            className="hover:text-[#1F2022] transition-colors"
          >
            Shop All
          </button>
          <button 
            onClick={() => onNavigate('shop', { category: 'rings' })}
            className="hover:text-[#1F2022] transition-colors"
          >
            Rings
          </button>
          <button 
            onClick={() => onNavigate('shop', { category: 'earrings' })}
            className="hover:text-[#1F2022] transition-colors"
          >
            Earrings
          </button>
          <button 
            onClick={() => onNavigate('shop', { category: 'necklaces' })}
            className="hover:text-[#1F2022] transition-colors"
          >
            Necklaces
          </button>
          <button 
            onClick={() => onNavigate('shop', { category: 'bracelets' })}
            className="hover:text-[#1F2022] transition-colors"
          >
            Bracelets
          </button>
          <button 
            onClick={() => onNavigate('about')}
            className="hover:text-[#1F2022] transition-colors"
          >
            About Atelier
          </button>
          <button 
            onClick={() => onNavigate('ring-size-guide')}
            className="hover:text-[#1F2022] transition-colors"
          >
            Size Guide
          </button>
          <button 
            onClick={() => onNavigate('care')}
            className="hover:text-[#1F2022] transition-colors"
          >
            Care
          </button>
          <button 
            onClick={() => onNavigate('faq')}
            className="hover:text-[#1F2022] transition-colors"
          >
            FAQ
          </button>
        </div>

        {/* Right Actions: Country/Currency Selector + Account + Cart + Admin */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          
          {/* Admin Command Center Quick Button */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
              title="Open Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Admin</span>
            </button>
          )}

          {/* Country & Currency Switcher (USA & Canada) */}
          <div className="relative">
            <button
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#EAE3D5] text-[#1F2022] hover:border-[#C5A059] transition-colors text-xs font-semibold"
            >
              <span className="text-sm">{activeCountry.flag}</span>
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-[#747780]" />
            </button>

            {countryDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#EAE3D5] rounded-xl shadow-lg p-2 z-50 text-xs">
                <span className="block px-3 py-1 text-[10px] uppercase tracking-wider text-[#747780] font-semibold">
                  Destination & Currency:
                </span>
                <button
                  onClick={() => {
                    setCountry('US');
                    setCurrency('USD');
                    setCountryDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    country === 'US' ? 'bg-[#FAF8F5] text-[#A8843E] font-semibold' : 'text-[#575A61] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🇺🇸</span>
                    <span>United States (USD $)</span>
                  </span>
                  {country === 'US' && <span className="text-xs">&check;</span>}
                </button>
                <button
                  onClick={() => {
                    setCountry('CA');
                    setCurrency('CAD');
                    setCountryDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    country === 'CA' ? 'bg-[#FAF8F5] text-[#A8843E] font-semibold' : 'text-[#575A61] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🇨🇦</span>
                    <span>Canada (CAD CA$)</span>
                  </span>
                  {country === 'CA' && <span className="text-xs">&check;</span>}
                </button>

                <div className="mt-2 pt-2 border-t border-[#F5F1E8] px-2 text-[10px] text-[#747780] leading-tight">
                  Pricing billed transparently in USD or CAD. Zero hidden conversion fees.
                </div>
              </div>
            )}
          </div>

          {/* User Account Icon */}
          <button
            onClick={() => onNavigate('account')}
            className="p-2 rounded-lg bg-white border border-[#EAE3D5] text-[#1F2022] hover:border-[#C5A059] transition-colors"
            title="Customer Account & Order Tracking"
          >
            <User className="w-4 h-4 text-[#575A61]" />
          </button>

          {/* Shopping Bag Drawer Toggle */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-lg bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] transition-colors"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#A8843E] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white border border-[#EAE3D5] text-[#1F2022]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAE3D5] p-5 space-y-4 shadow-md text-xs uppercase tracking-wider font-medium text-[#575A61]">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#EAE3D5]">
            <button
              onClick={() => { onNavigate('shop'); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              Shop All Heirlooms
            </button>
            <button
              onClick={() => { onNavigate('shop', { category: 'rings' }); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              Rings & Bands
            </button>
            <button
              onClick={() => { onNavigate('shop', { category: 'earrings' }); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              Earrings & Huggies
            </button>
            <button
              onClick={() => { onNavigate('shop', { category: 'necklaces' }); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              Necklaces
            </button>
            <button
              onClick={() => { onNavigate('shop', { category: 'bracelets' }); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              Tennis Bracelets
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              About Atelier
            </button>
            <button
              onClick={() => { onNavigate('ring-size-guide'); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              Ring Size Guide
            </button>
            <button
              onClick={() => { onNavigate('care'); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              Jewellery Care
            </button>
            <button
              onClick={() => { onNavigate('shipping'); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              Shipping Policy
            </button>
            <button
              onClick={() => { onNavigate('returns'); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              30-Day Returns
            </button>
            <button
              onClick={() => { onNavigate('faq'); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              FAQ
            </button>
            <button
              onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
              className="py-2.5 text-left hover:text-[#A8843E]"
            >
              Contact Concierge
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => { onNavigate('account'); setMobileMenuOpen(false); }}
              className="text-xs text-[#1F2022] font-semibold"
            >
              Customer Account & Order Tracking
            </button>
            <button
              onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
              className="text-xs text-[#A8843E] font-semibold"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
