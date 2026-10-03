import React from 'react';
import { 
  RefreshCw, CheckCircle2, XCircle, Clock, 
  ShieldCheck, AlertCircle, ArrowRight, HelpCircle 
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';

export const ReturnsPolicyPage = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Customer Confidence
        </span>
        <h1 className="text-4xl font-serif text-[#1F2022] font-normal">
          30-Day Return & Exchange Policy
        </h1>
        <p className="text-sm text-[#575A61] leading-relaxed">
          We want you to treasure your Lumora piece. If an eligible item does not meet your expectations, we offer a straightforward 30-day return process for items in original, unworn condition.
        </p>
      </div>

      {/* 2. Key Policy Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg text-[#1F2022] font-medium">30-Day Return Window</h3>
          <p className="text-xs text-[#575A61] leading-relaxed">
            You have 30 calendar days from the date of carrier delivery confirmation to request a return authorization.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg text-[#1F2022] font-medium">Pristine Condition Required</h3>
          <p className="text-xs text-[#575A61] leading-relaxed">
            Items must remain unworn, unaltered, with original security tags attached, accompanied by the presentation box and certificates.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E]">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg text-[#1F2022] font-medium">Prompt Refund Processing</h3>
          <p className="text-xs text-[#575A61] leading-relaxed">
            Refunds are credited to your original payment method within 3–5 business days following atelier inspection.
          </p>
        </div>
      </div>

      {/* 3. Eligible Items vs Approved Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Eligible */}
        <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-serif text-xl font-medium text-[#1F2022]">Eligible for Return</h3>
          </div>
          <p className="text-xs text-[#575A61]">
            Standard catalog pieces that satisfy all following criteria:
          </p>
          <ul className="space-y-2.5 text-xs text-[#575A61]">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">&check;</span>
              <span>Unworn, unscratched, and completely free of perfumes, lotions, or signs of handling.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">&check;</span>
              <span>Intact tamper-evident security tag firmly attached (removal voids return eligibility).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">&check;</span>
              <span>Complete original presentation vault, wax-sealed assay certificate card, and polishing cloth.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">&check;</span>
              <span>Return authorization requested within 30 days of confirmed delivery.</span>
            </li>
          </ul>
        </div>

        {/* Excluded */}
        <div className="p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
          <div className="flex items-center gap-2 text-rose-700">
            <XCircle className="w-5 h-5" />
            <h3 className="font-serif text-xl font-medium text-[#1F2022]">Approved Non-Returnable Exclusions</h3>
          </div>
          <p className="text-xs text-[#575A61]">
            As per fine jewelry industry standards, the following are final sale:
          </p>
          <ul className="space-y-2.5 text-xs text-[#575A61]">
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">&times;</span>
              <span><strong>Custom Laser Engravings:</strong> Pieces personalized with custom text, names, dates, or symbols cannot be restocked.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">&times;</span>
              <span><strong>Bespoke Commissions:</strong> Custom one-of-a-kind designs forged specifically to client specifications.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">&times;</span>
              <span><strong>Altered or Resized Items:</strong> Any piece modified by a third-party jeweler or resized after delivery.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">&times;</span>
              <span><strong>Missing Certificates:</strong> Returns missing physical BIS assay cards or lab diamond certificates.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 4. Step-by-Step Return Procedure */}
      <div className="bg-[#FAF8F5] border border-[#EAE3D5] rounded-3xl p-8 sm:p-12 space-y-6">
        <h3 className="font-serif text-2xl text-[#1F2022] font-medium text-center">
          How to Initiate a Return
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#575A61]">
          <div className="p-5 rounded-xl bg-white border border-[#EAE3D5] space-y-2">
            <strong className="block text-sm font-serif text-[#1F2022]">Step 1: Request RMA</strong>
            <p>
              Log in to your <strong>Customer Account</strong> or email <code>lumoragemofficial@gmail.com</code> with your Order ID and photo of the item with security tag intact.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#EAE3D5] space-y-2">
            <strong className="block text-sm font-serif text-[#1F2022]">Step 2: Safe Packing</strong>
            <p>
              Once approved, you will receive Return Merchandise Authorization (RMA) instructions. Pack the piece securely in its presentation vault inside an armored outer carton.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#EAE3D5] space-y-2">
            <strong className="block text-sm font-serif text-[#1F2022]">Step 3: Atelier Inspection & Refund</strong>
            <p>
              Upon receipt, our master jewelers verify metal purity and stone integrity. Your refund is issued within 3–5 business days directly to your card.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Return Logistics Facility Notice */}
      <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] text-xs text-[#747780] space-y-2">
        <h4 className="font-semibold text-[#1F2022] uppercase tracking-wider text-[11px]">
          Return Processing Facility Notice
        </h4>
        <p>
          &bull; <strong>Return Logistics Destination:</strong> {brandConfig.guarantees.returnAddressPlaceholder}.
        </p>
        <p>
          &bull; Please do not mail packages back without prior written Return Merchandise Authorization (RMA) to avoid customs delays or refusal at our facility.
        </p>
      </div>

    </div>
  );
};
