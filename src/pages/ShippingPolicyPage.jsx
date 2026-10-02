import React from 'react';
import { 
  Plane, ShieldCheck, Clock, Package, 
  MapPin, AlertCircle, Award, CheckCircle2 
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';

export const ShippingPolicyPage = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          International Logistics & Customs
        </span>
        <h1 className="text-4xl font-serif text-[#1F2022] font-normal">
          Shipping & Delivery Policy
        </h1>
        <p className="text-sm text-[#575A61] leading-relaxed">
          Lumora Fine Jewelry ships directly from our Indian ateliers to customers across the United States and Canada. We communicate all transit times, courier workflows, and cross-border duties transparently.
        </p>
      </div>

      {/* 2. Key Shipping Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-2 text-center">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] mx-auto flex items-center justify-center text-[#A8843E] mb-2">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base text-[#1F2022] font-medium">Origin: India</h3>
          <p className="text-xs text-[#747780]">Dispatched directly from Jaipur and Surat workshops.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-2 text-center">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] mx-auto flex items-center justify-center text-[#A8843E] mb-2">
            <Plane className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base text-[#1F2022] font-medium">3–5 Business Days</h3>
          <p className="text-xs text-[#747780]">Air transit via DHL Express & FedEx International Priority.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-2 text-center">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] mx-auto flex items-center justify-center text-[#A8843E] mb-2">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base text-[#1F2022] font-medium">100% Insured</h3>
          <p className="text-xs text-[#747780]">Full transit loss insurance with adult signature confirmation.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-2 text-center">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] mx-auto flex items-center justify-center text-[#A8843E] mb-2">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base text-[#1F2022] font-medium">Armored Packaging</h3>
          <p className="text-xs text-[#747780]">Tamper-evident seals and discrete armored outer boxes.</p>
        </div>
      </div>

      {/* 3. North America Customs & Duties (Transparent Guidance) */}
      <div className="bg-[#FAF8F5] border border-[#EAE3D5] rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
            Cross-Border Transparency
          </span>
          <h2 className="text-3xl font-serif text-[#1F2022] font-normal">
            Import Duties & Customs Clearance
          </h2>
          <p className="text-sm text-[#575A61]">
            How customs, duties, and provincial taxes are assessed on your order based on destination country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* USA Section 321 */}
          <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇺🇸</span>
                <h3 className="font-serif text-xl text-[#1F2022] font-medium">United States (Section 321)</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-mono">
                Under $800 USD Duty-Free
              </span>
            </div>

            <p className="text-xs text-[#575A61] leading-relaxed">
              Under 19 U.S.C. § 1321 (commonly referred to as Section 321 De Minimis), shipments imported by one individual on one day with an aggregate fair retail value not exceeding <strong>$800 USD</strong> generally enter the United States free of formal customs duty and taxes.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#575A61]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Orders under $800 USD clear electronically via DHL Express without customs bills to the buyer.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>For orders exceeding $800 USD, US Customs (CBP) formal entry duties (approx. 5.5% on gold jewelry) will apply and be communicated prior to final delivery.</span>
              </div>
            </div>
          </div>

          {/* Canada CBSA & GST/HST */}
          <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇨🇦</span>
                <h3 className="font-serif text-xl text-[#1F2022] font-medium">Canada (CBSA & DDP Option)</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-800 font-mono">
                DDP Pre-Clearance
              </span>
            </div>

            <p className="text-xs text-[#575A61] leading-relaxed">
              Canada Border Services Agency (CBSA) assesses imported fine jewelry originating outside NAFTA/USMCA. Under Canadian customs tariff codes (HS 7113), jewelry is subject to an approximate <strong>6.5% customs duty</strong> plus applicable provincial sales tax (GST/HST/PST).
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#575A61]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Optional DDP (Delivered Duty Paid):</strong> Choose DDP at checkout to calculate and pay duties and GST/HST in advance, eliminating courier COD surprise fees at your doorstep.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>DDU (Delivered Duty Unpaid):</strong> If selected, CBSA duties and provincial taxes will be billed directly by DHL/FedEx prior to final handover.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Packaging & Security Protocol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
            Security & Discretion
          </span>
          <h2 className="text-3xl font-serif text-[#1F2022] font-normal">
            Armored Double-Boxed Packaging
          </h2>
          <p className="text-xs text-[#575A61] leading-relaxed">
            High-value fine jewelry requires specialized export packing to prevent theft and damage across international transit corridors:
          </p>

          <ul className="space-y-2.5 text-xs text-[#575A61]">
            <li className="flex items-start gap-2">
              <span className="text-[#A8843E] font-bold">&bull;</span>
              <span><strong>Inner Vault:</strong> Hardcover luxury presentation vault box lined with velvet and containing your physical BIS assay hallmark certificate.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A8843E] font-bold">&bull;</span>
              <span><strong>Tamper-Evident Seal:</strong> The presentation box is sealed inside a numbered security bag that leaves visible indicators if disturbed.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A8843E] font-bold">&bull;</span>
              <span><strong>Discrete Outer Box:</strong> The exterior carton contains no exterior branding, logos, or references to "jewelry" or "diamonds" to maintain security during transit.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A8843E] font-bold">&bull;</span>
              <span><strong>Mandatory Signature:</strong> Couriers will not leave packages unattended on doorsteps without an adult signature.</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
          <h3 className="font-serif text-xl text-[#1F2022] font-medium">Estimated Timelines</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-[#F5F1E8]">
              <span className="text-[#747780]">Ready In-Stock Dispatch:</span>
              <strong className="text-[#1F2022]">1–2 Business Days</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F5F1E8]">
              <span className="text-[#747780]">Custom Ring Sizing Dispatch:</span>
              <strong className="text-[#1F2022]">5–7 Business Days</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F5F1E8]">
              <span className="text-[#747780]">DHL Air Transit to USA:</span>
              <strong className="text-[#1F2022]">3–5 Business Days</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F5F1E8]">
              <span className="text-[#747780]">DHL Air Transit to Canada:</span>
              <strong className="text-[#1F2022]">4–6 Business Days</strong>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#747780]">Standard Shipping Fee:</span>
              <strong className="text-[#1F2022]">$24 USD / $32 CAD (Free over $150 USD / $200 CAD)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Indian Export Compliance (CSB-V) Disclosures */}
      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] text-xs text-[#747780] space-y-2">
        <h4 className="font-semibold text-[#1F2022] uppercase tracking-wider text-[11px]">
          Regulatory Export Compliance Disclosures
        </h4>
        <p>
          All international consignments are declared under Indian Customs <strong>Courier Shipping Bill V (CSB-V)</strong> electronic EDI manifests with verified HS Codes: <code>7113.19.10</code> for gold articles and <code>7113.11.00</code> for silver articles.
        </p>
        <p>
          Export banking is reconciled under Reserve Bank of India (RBI) FEMA guidelines using Purpose Code <code>P0103 - Export of Goods</code>.
        </p>
      </div>

    </div>
  );
};
