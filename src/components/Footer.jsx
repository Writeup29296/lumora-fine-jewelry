import React from 'react';
import { brandConfig } from '../data/brandConfig';
import { 
  ShieldCheck, Plane, Award, Mail, Phone, MapPin, 
  Globe, Lock, ExternalLink, Settings, Sparkles, Heart 
} from 'lucide-react';

export const Footer = ({ onNavigate, onOpenAdmin, onOpenDomainGuide }) => {
  return (
    <footer className="bg-[#FAF8F5] text-[#575A61] border-t border-[#EAE3D5] pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1 & 2: Brand Info & Transparent Export Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col cursor-pointer" onClick={() => onNavigate('home')}>
              <span className="text-2xl font-serif tracking-[0.25em] font-semibold text-[#1F2022]">
                {brandConfig.brandName}
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A8843E] font-medium">
                {brandConfig.brandSubtitle} &bull; DIRECT EXPORT TO USA & CANADA
              </span>
            </div>

            <p className="text-xs text-[#575A61] leading-relaxed max-w-sm">
              Solid gold (9K, 14K, 18K) and 925 sterling silver fine jewelry handcrafted in the historic artisan workshops of Jaipur and Surat, India. Delivered directly to clients across the United States and Canada with 100% transit insurance and transparent customs clearance.
            </p>

            <div className="space-y-1.5 text-xs text-[#575A61]">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#A8843E]" />
                <span className="font-mono text-[#1F2022]">lumorafinejewelery.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A8843E]" />
                <a href={`mailto:${brandConfig.concierge.supportEmail}`} className="hover:text-[#1F2022]">
                  {brandConfig.concierge.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A8843E]" />
                <span>Ateliers in Jaipur & Surat, Rajasthan / Gujarat, India</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={onOpenDomainGuide}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EAE3D5] text-xs font-mono text-[#1F2022] hover:border-[#C5A059] transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-[#A8843E]" />
                <span>Domain & DNS Setup Hub</span>
              </button>
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EAE3D5] text-xs font-mono text-[#1F2022] hover:border-[#C5A059] transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-[#A8843E]" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

          {/* Column 3: Fine Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#1F2022]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('shop', { category: 'rings' })} className="hover:text-[#A8843E] transition-colors">
                  Rings & Eternity Bands
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', { category: 'earrings' })} className="hover:text-[#A8843E] transition-colors">
                  Earrings & Huggie Hoops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', { category: 'necklaces' })} className="hover:text-[#A8843E] transition-colors">
                  Necklaces & Medallions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', { category: 'bracelets' })} className="hover:text-[#A8843E] transition-colors">
                  Tennis Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ring-size-guide')} className="hover:text-[#A8843E] transition-colors">
                  Ring Size & Converter Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('care')} className="hover:text-[#A8843E] transition-colors">
                  Jewellery Care Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#1F2022]">
              Care & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('shipping')} className="hover:text-[#A8843E] transition-colors">
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('returns')} className="hover:text-[#A8843E] transition-colors">
                  30-Day Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#A8843E] transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#A8843E] transition-colors">
                  VIP Atelier Concierge
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account')} className="hover:text-[#A8843E] transition-colors">
                  Customer Account & Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-[#A8843E] transition-colors">
                  Privacy Policy & CCPA
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Indian Export Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#1F2022]">
              Export Disclosures
            </h4>
            <ul className="space-y-2 text-xs text-[#747780]">
              <li><span>&bull; Origin: Jaipur & Surat, India</span></li>
              <li><span>&bull; Electronic CSB-V Customs Clearance</span></li>
              <li><span>&bull; HS 7113.19.10 (Gold) / 7113.11 (Silver)</span></li>
              <li><span>&bull; BIS Hallmarked (375 / 585 / 750)</span></li>
              <li><span>&bull; RBI Purpose Code: P0103</span></li>
              <li><span>&bull; 100% Insured Signed Delivery</span></li>
            </ul>
          </div>

        </div>

        {/* Payment Badges & Security */}
        <div className="pt-8 border-t border-[#EAE3D5] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#575A61]">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted Hosted Checkout &bull; PCI-DSS Level 1 Compliant</span>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {['Visa', 'Mastercard', 'American Express', 'Apple Pay', 'Google Pay', 'Stripe Hosted'].map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded bg-white border border-[#EAE3D5] text-[10px] text-[#1F2022] font-mono shadow-2xs"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-4 border-t border-[#EAE3D5] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#747780]">
          <p>
            &copy; {new Date().getFullYear()} {brandConfig.brandFullName} ({brandConfig.domain}). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('privacy')} className="hover:text-[#1F2022] transition-colors">
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button onClick={() => onNavigate('privacy')} className="hover:text-[#1F2022] transition-colors">
              Terms of Sale
            </button>
            <span>&bull;</span>
            <button onClick={() => onNavigate('shipping')} className="hover:text-[#1F2022] transition-colors">
              US Section 321 & Canada Customs
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
