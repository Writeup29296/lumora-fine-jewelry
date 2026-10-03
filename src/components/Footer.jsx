import React from 'react';
import { brandConfig } from '../data/brandConfig';
import { useSettings } from '../context/SettingsContext';
import { 
  ShieldCheck, Plane, Award, Mail, Phone, MapPin, 
  Globe, ExternalLink, Settings, Sparkles, Heart, MessageCircle 
} from 'lucide-react';
import { LumoraCrest } from './LumoraCrest';

export const Footer = ({ onNavigate, onOpenAdmin, onOpenDomainGuide }) => {
  const { settings } = useSettings();

  const supportEmail = settings?.supportEmail || 'lumoragemofficial@gmail.com';
  const whatsappNumber = settings?.whatsappNumber || '+91 79840 29296';
  const atelierAddress = settings?.atelierAddress || 'Atelier in Surat, Gujarat, India';

  return (
    <footer className="bg-[#FAF8F5] text-[#575A61] border-t border-[#EAE3D5] pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Maison Official Logo & Prestige Benchmark Header */}
        <div className="pb-10 border-b border-[#EAE3D5] flex flex-col items-center text-center space-y-3">
          <img 
            src="/lumora-logo.png" 
            alt="Lumora — Jewels That Shine Forever" 
            className="h-14 sm:h-16 w-auto object-contain select-none"
          />
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#A8843E] font-medium">
            MAISON DE HAUTE JOAILLERIE &bull; SURAT MASTER BENCH &bull; WORLDWIDE
          </p>
          <p className="text-xs text-[#747780] max-w-xl font-serif italic">
            "Artisanal solid gold & certified lab diamonds crafted at the global diamond capital of Surat, Gujarat, delivered directly with insured worldwide door-to-door escort."
          </p>
        </div>

        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1 & 2: Brand Info & Transparent Export Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col cursor-pointer" onClick={() => onNavigate('home')} title="Lumora — Jewels That Shine Forever">
              <img 
                src="/lumora-logo.png" 
                alt="Lumora" 
                className="h-8 sm:h-9 w-auto object-contain self-start"
              />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A8843E] font-medium mt-1">
                SURAT MASTER BENCH &bull; DIRECT WORLDWIDE EXPRESS DELIVERY
              </span>
            </div>

            <p className="text-xs text-[#575A61] leading-relaxed max-w-sm">
              {settings?.brandTagline || brandConfig.brandTagline}
            </p>

            <div className="space-y-1.5 text-xs text-[#575A61]">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#A8843E]" />
                <span className="font-mono text-[#1F2022]">{settings?.domain || brandConfig.domain}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A8843E]" />
                <a href={`mailto:${supportEmail}`} className="hover:text-[#1F2022] transition-colors">
                  {supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#A8843E]" />
                <a 
                  href="https://wa.me/917984029296" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#1F2022] transition-colors font-mono"
                >
                  WhatsApp: {whatsappNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A8843E]" />
                <span>{atelierAddress}</span>
              </div>
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
                  Worldwide Shipping & Delivery
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
              <li><span>&bull; Origin: Surat, Gujarat, India</span></li>
              <li><span>&bull; Electronic CSB-V Customs Clearance</span></li>
              <li><span>&bull; HS 7113.19.10 (Gold) / 7113.11 (Silver)</span></li>
              <li><span>&bull; BIS Hallmarked (375 / 585 / 750)</span></li>
              <li><span>&bull; RBI Purpose Code: P0103</span></li>
              <li><span>&bull; 100% Insured Signed Delivery</span></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-[#EAE3D5] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#747780]">
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
              Worldwide Shipping
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
