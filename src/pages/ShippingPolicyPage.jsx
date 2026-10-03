import React from 'react';
import { 
  Plane, ShieldCheck, Clock, MapPin, Package, 
  CheckCircle2, FileText, Globe 
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';

export const ShippingPolicyPage = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Worldwide Courier Logistics & Clearances
        </span>
        <h1 className="text-4xl font-serif text-[#1F2022] font-normal">
          Shipping & Delivery Policy
        </h1>
        <p className="text-sm text-[#575A61] leading-relaxed">
          Lumora Fine Jewelry ships directly from our Surat atelier to customers worldwide. We communicate all transit times, courier workflows, and international customs clearance transparently.
        </p>
      </div>

      {/* 2. Key Shipping Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-2 text-center">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] mx-auto flex items-center justify-center text-[#A8843E] mb-2">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base text-[#1F2022] font-medium">Origin: Surat, India</h3>
          <p className="text-xs text-[#747780]">Dispatched directly from our Surat diamond & fine jewelry atelier.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-2 text-center">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] mx-auto flex items-center justify-center text-[#A8843E] mb-2">
            <Plane className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base text-[#1F2022] font-medium">3–5 Business Days</h3>
          <p className="text-xs text-[#747780]">Fast air transit via DHL Express Worldwide & FedEx International Priority.</p>
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

      {/* 3. Global Shipping & Customs Clearance */}
      <div className="bg-[#FAF8F5] border border-[#EAE3D5] rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
            Worldwide Delivery Standards
          </span>
          <h2 className="text-3xl font-serif text-[#1F2022] font-normal">
            International Courier & Customs Processing
          </h2>
          <p className="text-sm text-[#575A61]">
            Seamless, fully documented international delivery straight from our master atelier to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F5F1E8]">
              <Globe className="w-5 h-5 text-[#A8843E]" />
              <h3 className="font-serif text-xl text-[#1F2022] font-medium">Insured Worldwide Door-to-Door Delivery</h3>
            </div>

            <p className="text-xs text-[#575A61] leading-relaxed">
              Every shipment is dispatched with DHL Express Worldwide or FedEx International Priority under discrete armored wrapping. We partner with premier air logistics networks to ensure rapid, dependable delivery to clients across the globe.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#575A61]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Live GPS Tracking: Real-time milestone updates provided via email and SMS.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Adult Signature Required: Handed over exclusively with direct signature confirmation.</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F5F1E8]">
              <FileText className="w-5 h-5 text-[#A8843E]" />
              <h3 className="font-serif text-xl text-[#1F2022] font-medium">Official Customs Clearance (CSB-V)</h3>
            </div>

            <p className="text-xs text-[#575A61] leading-relaxed">
              Every export is legally processed through Indian Customs using electronic Courier Shipping Bill V (CSB-V) with verified Harmonized System (HS) codes and BIS assay certification.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#575A61]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Full Export Transparency: Commercial invoice and assay certificates accompanied with courier packet.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>RBI FEMA Reconciliation: Compliant with Reserve Bank of India export Purpose Code P0103.</span>
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
              <span className="text-[#747780]">Custom Sizing Dispatch:</span>
              <strong className="text-[#1F2022]">5–7 Business Days</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F5F1E8]">
              <span className="text-[#747780]">DHL Air Express Transit:</span>
              <strong className="text-[#1F2022]">3–5 Business Days Worldwide</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F5F1E8]">
              <span className="text-[#747780]">Priority Armored Transit:</span>
              <strong className="text-[#1F2022]">2–4 Business Days Worldwide</strong>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#747780]">Standard Shipping:</span>
              <strong className="text-[#1F2022]">$24 USD (Free over $150 USD)</strong>
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
