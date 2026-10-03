import React, { useState } from 'react';
import { 
  X, Globe, Check, Copy, ExternalLink, ShieldCheck, 
  CreditCard, Terminal, Sparkles, Building, FileCheck, ArrowRight
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';

export const DomainSetupModal = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeTab, setActiveTab] = useState('dns'); // 'dns', 'payments', 'export'

  if (!isOpen) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in text-[#e0e2ec]">
      <div className="bg-[#0e1017] border border-white/10 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 bg-[#12151e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif font-bold text-white tracking-wide">
                  Domain & Global Export Hub
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                  lumorafinejewelery.com
                </span>
              </div>
              <p className="text-xs text-white/50">
                Live DNS routing, Stripe/PayPal US-Canada payments & CSB-V export guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#10131c] px-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('dns')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'dns'
                ? 'border-[#d4af37] text-white font-semibold'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>1. Domain DNS Settings</span>
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'payments'
                ? 'border-[#d4af37] text-white font-semibold'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>2. Worldwide Payments</span>
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'export'
                ? 'border-[#d4af37] text-white font-semibold'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>3. CSB-V & Courier Setup</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-xs">
          {/* TAB 1: DNS */}
          {activeTab === 'dns' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-white/90 space-y-1">
                <p className="font-semibold text-sm text-[#d4af37] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Connect lumorafinejewelery.com to Vercel or Cloudflare
                </p>
                <p className="text-white/60 leading-relaxed">
                  Log in to where you purchased <strong>lumorafinejewelery.com</strong> (e.g., GoDaddy, Namecheap, Google, Hostinger) and add these two DNS records in your DNS Management:
                </p>
              </div>

              {/* DNS Table */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-4">Type</th>
                      <th className="py-2.5 px-4">Name / Host</th>
                      <th className="py-2.5 px-4">Value / Target</th>
                      <th className="py-2.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 text-[#d4af37] font-bold">A</td>
                      <td className="py-3 px-4 text-white">@ (or leave blank)</td>
                      <td className="py-3 px-4 text-emerald-400">76.76.21.21</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => copyToClipboard('76.76.21.21', 'a-record')}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white flex items-center gap-1.5 ml-auto text-[10px]"
                        >
                          {copiedKey === 'a-record' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'a-record' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 text-[#d4af37] font-bold">CNAME</td>
                      <td className="py-3 px-4 text-white">www</td>
                      <td className="py-3 px-4 text-emerald-400">cname.vercel-dns.com</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => copyToClipboard('cname.vercel-dns.com', 'cname-record')}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white flex items-center gap-1.5 ml-auto text-[10px]"
                        >
                          {copiedKey === 'cname-record' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'cname-record' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-semibold text-white">Deploying in 2 Minutes on Vercel:</h4>
                <ol className="list-decimal list-inside space-y-1 text-white/70 text-[11px] leading-relaxed">
                  <li>Push this project folder to your GitHub account (e.g., <code className="bg-black/50 px-1 py-0.5 rounded text-white">lumora-fine-jewelry</code>).</li>
                  <li>Go to <strong>vercel.com</strong> and click <strong>"Add New Project"</strong> → Select your GitHub repo.</li>
                  <li>Click <strong>Deploy</strong>. Vercel automatically compiles the React/Tailwind build in ~30 seconds!</li>
                  <li>In Vercel Project Settings → <strong>Domains</strong>, type <code className="text-[#d4af37]">lumorafinejewelery.com</code>.</li>
                  <li>Vercel issues free lifetime auto-renewing SSL (HTTPS) for both apex and <code className="text-[#d4af37]">www.lumorafinejewelery.com</code>.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-white/90 space-y-1">
                <p className="font-semibold text-blue-300">Receiving International Currencies from Global Shoppers</p>
                <p className="text-white/60">
                  Because you have an Indian entity with IEC & GST LUT, you can receive foreign currencies directly into your Indian Current Account.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <span className="text-lg">💳</span> Stripe India (Export Mode)
                  </div>
                  <p className="text-white/60 text-[11px] leading-relaxed">
                    Allows international customers to pay with Visa, Mastercard, Amex, Apple Pay, and Google Pay.
                  </p>
                  <ul className="text-[10px] text-white/50 space-y-1 list-disc list-inside">
                    <li>Requires Purpose Code: <strong className="text-white">P0103 (Export of goods)</strong></li>
                    <li>Automatic monthly/quarterly e-FIRA generation</li>
                    <li>Funds settle in INR in your Indian bank within 48 hours</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <span className="text-lg">🅿️</span> PayPal India Business
                  </div>
                  <p className="text-white/60 text-[11px] leading-relaxed">
                    High conversion booster worldwide where international buyers prefer 1-click PayPal.
                  </p>
                  <ul className="text-[10px] text-white/50 space-y-1 list-disc list-inside">
                    <li>Link your GST & IEC to PayPal India</li>
                    <li>Auto-withdrawal to Indian bank via FIRC/e-FIRA</li>
                    <li>Full PayPal Seller Protection for international tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-white/90 space-y-1">
                <p className="font-semibold text-emerald-400">Indian Customs CSB-V E-Commerce Export Workflow</p>
                <p className="text-white/60">
                  You already have IEC, GST LUT, and DHL/FedEx courier setup. Here is the exact daily shipping process:
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    step: 'Step 1: Order Received',
                    desc: 'Customer places order in USD or CAD on lumorafinejewelery.com. Website records item, gram weight, purity, and recipient address.'
                  },
                  {
                    step: 'Step 2: Generate Commercial Invoice & Packing Slip',
                    desc: 'Invoice states HS Code 7113.19.10 (Gold Jewellery) or 7113.11.00 (Silver Jewellery), GST LUT declaration for zero IGST, and declared FOB value.'
                  },
                  {
                    step: 'Step 3: DHL / FedEx CSB-V Electronic Filing',
                    desc: 'Log in to DHL Express (MyDHL+) or FedEx Ship Manager. Select "Commercial Shipping Bill V (CSB-V)". Enter your IEC and registered AD Code.'
                  },
                  {
                    step: 'Step 4: Tamper-Evident Packaging & Pickup',
                    desc: 'Affix the Airway Bill (AWB) and CSB-V barcode. Courier collects the parcel from your atelier in Surat, Gujarat and transports it to Air Cargo Complex.'
                  },
                  {
                    step: 'Step 5: Worldwide Fast Clearance & Doorstep Delivery',
                    desc: 'Parcels clear international customs electronically with DHL/FedEx Express with 100% full insurance coverage. Delivered worldwide in 3-5 business days!'
                  }
                ].map((s, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white text-[11px]">{s.step}</p>
                      <p className="text-white/60 text-[10px] leading-relaxed mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#12151e] flex items-center justify-between">
          <span className="text-[11px] text-white/50">
            Domain: <strong className="text-white">lumorafinejewelery.com</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#d4af37] hover:bg-[#e6ca65] text-[#0b0c10] text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
