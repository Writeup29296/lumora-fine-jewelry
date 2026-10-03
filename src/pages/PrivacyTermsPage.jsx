import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { brandConfig } from '../data/brandConfig';

export const PrivacyTermsPage = () => {
  const [activeSection, setActiveSection] = useState('privacy');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Legal & Compliance
        </span>
        <h1 className="text-4xl font-serif text-[#1F2022] font-normal">
          Privacy Policy & Terms of Service
        </h1>
        <p className="text-sm text-[#575A61] leading-relaxed">
          Official policies for <strong>lumorafinejewelery.com</strong> governing customer data protection, international export transactions, and storefront terms of sale for United States and Canadian shoppers.
        </p>
      </div>

      {/* 2. Switcher */}
      <div className="flex justify-center border-b border-[#EAE3D5]">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveSection('privacy')}
            className={`pb-3 px-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
              activeSection === 'privacy'
                ? 'border-[#C5A059] text-[#1F2022]'
                : 'border-transparent text-[#747780] hover:text-[#1F2022]'
            }`}
          >
            Privacy & Cookie Policy
          </button>
          <button
            onClick={() => setActiveSection('terms')}
            className={`pb-3 px-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
              activeSection === 'terms'
                ? 'border-[#C5A059] text-[#1F2022]'
                : 'border-transparent text-[#747780] hover:text-[#1F2022]'
            }`}
          >
            Terms of Sale & International Export
          </button>
        </div>
      </div>

      {/* 3. Content */}
      <div className="bg-white border border-[#EAE3D5] rounded-3xl p-8 sm:p-14 space-y-8 text-xs text-[#575A61] leading-relaxed">
        
        {activeSection === 'privacy' ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-[#1F2022] font-normal mb-2">Privacy Policy</h2>
              <p className="text-[11px] text-[#747780]">Last Updated: October 2026 &bull; Compliant with CCPA, PIPEDA, and GDPR Standards</p>
            </div>

            <section className="space-y-2">
              <h3 className="font-semibold text-sm text-[#1F2022]">1. Information We Collect</h3>
              <p>
                When you browse our storefront, configure a piece of jewelry, or complete a checkout on <strong>lumorafinejewelery.com</strong>, we collect relevant information necessary to fulfill international export orders:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Contact Information:</strong> Name, email address, telephone number.</li>
                <li><strong>Shipping & Customs Information:</strong> Physical delivery address worldwide, region/country, and postal code.</li>
                <li><strong>Transactional Details:</strong> Items purchased, ring sizing specifications, precious metal purity choices, custom engraving texts.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-sm text-[#1F2022]">2. Payment Processing Security</h3>
              <p>
                All payment processing is executed through secure checkout sessions powered by authorized international banking partners. Lumora Fine Jewelry never stores, views, or logs credit card numbers or security codes on our servers. All financial transmissions are encrypted using standard industry TLS security.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-sm text-[#1F2022]">3. Use of Personal Information</h3>
              <p>
                We use collected information strictly to:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Handcraft, resize, and prepare your jewelry orders at our Surat bench.</li>
                <li>File electronic export declarations (CSB-V) with Indian Customs and air carriers (DHL Express / FedEx).</li>
                <li>Provide accurate shipping tracking numbers and post-delivery concierge support.</li>
                <li>We do not sell, rent, or trade customer data to third-party marketing brokers.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-sm text-[#1F2022]">4. Your Privacy Rights</h3>
              <p>
                Customers worldwide may request access to, correction of, or permanent deletion of their personal records by contacting <code>lumoragemofficial@gmail.com</code>.
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-[#1F2022] font-normal mb-2">Terms of Sale & International Export</h2>
              <p className="text-[11px] text-[#747780]">Governing Purchases on lumorafinejewelery.com</p>
            </div>

            <section className="space-y-2">
              <h3 className="font-semibold text-sm text-[#1F2022]">1. Merchant Identity & Origin</h3>
              <p>
                <strong>Lumora Fine Jewelry</strong> operates from registered workshops and cutting facilities in Surat, Gujarat, India. All goods are exported under the regulatory framework of the Indian Directorate General of Foreign Trade (DGFT) and Reserve Bank of India (RBI) under Purpose Code <code>P0103</code>.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-sm text-[#1F2022]">2. Currency & Checkout Transparency</h3>
              <p>
                Prices are displayed in US Dollars (USD). The checkout engine clearly states the exact charged amount prior to final payment authorization. We do not apply unannounced currency conversion surcharges.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-sm text-[#1F2022]">3. Worldwide Customs & Insured Export</h3>
              <p>
                All orders are exported under Indian Customs electronic CSB-V guidelines with DHL Express and FedEx Priority. Every parcel is shipped with 100% full declared-value transit insurance door-to-door.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-sm text-[#1F2022]">4. Title of Goods & Transit Insurance</h3>
              <p>
                Title of goods and risk of loss pass to the customer only upon confirmed physical delivery with an adult signature. Every consignment is insured during international air transit.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-sm text-[#1F2022]">5. Governing Law</h3>
              <p>
                These terms are governed in accordance with applicable international commercial trade law and the laws of Rajasthan / Gujarat, India, with respect to export compliance.
              </p>
            </section>
          </div>
        )}

      </div>

    </div>
  );
};
