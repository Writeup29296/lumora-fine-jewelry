import React, { useState } from 'react';
import { 
  ChevronDown, HelpCircle, Sparkles, Plane, 
  ShieldCheck, RefreshCw, CreditCard, ArrowRight 
} from 'lucide-react';

const FAQ_SECTIONS = [
  {
    category: 'Diamonds & Materials',
    icon: Sparkles,
    questions: [
      {
        q: 'What is a lab-grown diamond, and how does it compare to a mined diamond?',
        a: 'Lab-grown diamonds are 100% genuine diamonds forged in specialized laboratory environments replicating the extreme heat and pressure of the earth (using CVD or HPHT techniques). They possess the exact same chemical structure (pure crystallized carbon), optical dispersion, and Mohs hardness (10) as mined diamonds. They are NOT diamond simulants (such as cubic zirconia or moissanite). Lumora never describes a simulant as a diamond.'
      },
      {
        q: 'What precious metal purities do you craft in?',
        a: 'We craft our heirlooms in solid 9K Gold (375 purity), 14K Gold (585 purity), 18K Gold (750 purity), and heavy-gauge 925 Sterling Silver. We offer Yellow Gold, White Gold (plated with high-luster anti-tarnish rhodium), and Rose Gold alloy options.'
      },
      {
        q: 'Are Lumora gold and silver pieces officially hallmarked?',
        a: 'Yes. Every gold piece is stamped in accordance with Bureau of Indian Standards (BIS) hallmarking regulations (e.g., BIS 585 for 14K, BIS 750 for 18K). Sterling silver pieces carry laser-etched 925 purity hallmarks and are shipped with an assay verification card.'
      }
    ]
  },
  {
    category: 'Worldwide Shipping & Delivery',
    icon: Plane,
    questions: [
      {
        q: 'Where does Lumora ship from?',
        a: 'All Lumora jewelry is handcrafted in our master fine jewelry atelier located in Surat, Gujarat, India. Consignments are dispatched directly from our atelier to clients worldwide via international air express.'
      },
      {
        q: 'How long does delivery take?',
        a: 'Ready in-stock pieces dispatch within 1–2 business days. Air transit via DHL Express Worldwide or FedEx International Priority takes approximately 3–5 business days worldwide with full online tracking.'
      },
      {
        q: 'Is my shipment insured during international transit?',
        a: 'Yes, 100%. Every Lumora shipment is fully insured against loss or transit damage until delivery is verified with an adult signature. Packages are double-boxed in discreet armored packaging without exterior luxury branding to maintain total security.'
      }
    ]
  },
  {
    category: 'Customs & Export Clearance',
    icon: ShieldCheck,
    questions: [
      {
        q: 'How does international customs clearance work?',
        a: 'All international consignments are declared under Indian Customs Courier Shipping Bill V (CSB-V) electronic manifests with verified HS Codes and accompanied by official BIS assay certification.'
      },
      {
        q: 'What packaging is used for high-value fine jewelry shipments?',
        a: 'Every piece arrives in our signature hardcover velvet presentation vault box, sealed inside a tamper-evident numbered pouch and packed in a discreet, unbranded exterior carton with adult signature required.'
      }
    ]
  },
  {
    category: 'Payments & Currencies',
    icon: CreditCard,
    questions: [
      {
        q: 'What currency are orders processed in?',
        a: 'All orders are transparently priced and billed in US Dollars (USD). The checkout displays the exact item cost, insured shipping, and total before authorization with zero hidden fees.'
      },
      {
        q: 'How are online payments secured?',
        a: 'All transactions are processed directly through secure hosted payment gateways with full end-to-end encryption. Lumora never stores your credit card details on our servers.'
      }
    ]
  },
  {
    category: 'Returns, Sizing & Guarantees',
    icon: RefreshCw,
    questions: [
      {
        q: 'What is Lumora’s return policy?',
        a: 'We offer a configurable 30-day return policy for eligible catalog pieces in original, unworn condition with intact security tags and presentation boxes. Custom laser-engraved pieces, personalized resizes, and bespoke commissions are final sale.'
      },
      {
        q: 'What if I order the wrong ring size?',
        a: 'We provide an interactive Ring Size Guide with exact millimeter measurements. If you receive your ring and need a size adjustment, contact our concierge. Most solitaire bands can be resized, though 360-degree eternity bands cannot be altered after forging.'
      },
      {
        q: 'Is custom laser engraving really complimentary?',
        a: 'Yes. We offer complimentary inside-band laser engraving up to 20 characters on eligible rings and pendants. Please note that engraved items cannot be returned.'
      }
    ]
  }
];

export const FaqPage = ({ onNavigate }) => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (catIdx, qIdx) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Transparent Answers
        </span>
        <h1 className="text-4xl font-serif text-[#1F2022] font-normal">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#575A61] leading-relaxed">
          Everything you need to know about our Surat atelier craftsmanship, lab-grown diamond standards, worldwide shipping, and 30-day return policies.
        </p>
      </div>

      {/* 2. Categorized Accordion */}
      <div className="space-y-10">
        {FAQ_SECTIONS.map((sec, catIdx) => {
          const Icon = sec.icon;
          return (
            <div key={catIdx} className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-[#F5F1E8]">
                <div className="w-8 h-8 rounded-full bg-[#F4EFE6] text-[#A8843E] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h2 className="font-serif text-xl text-[#1F2022] font-medium">{sec.category}</h2>
              </div>

              <div className="space-y-3">
                {sec.questions.map((item, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = Boolean(openItems[key]);
                  return (
                    <div
                      key={qIdx}
                      className="border border-[#EAE3D5] rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleItem(catIdx, qIdx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 bg-[#FAF8F5] hover:bg-[#F4EFE6] transition-colors"
                      >
                        <span className="text-xs font-semibold text-[#1F2022]">{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-[#A8843E] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white text-xs text-[#575A61] leading-relaxed border-t border-[#EAE3D5]">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Need more help? */}
      <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D5] text-center space-y-4">
        <h3 className="font-serif text-2xl text-[#1F2022] font-medium">Still have a question?</h3>
        <p className="text-xs text-[#575A61] max-w-md mx-auto">
          Our VIP jewelry concierge team in Surat is available on WhatsApp (+91 79840 29296) or email (lumoragemofficial@gmail.com) to assist with custom sizing, bespoke settings, and delivery inquiries.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-2.5 bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] transition-colors rounded text-xs uppercase tracking-wider font-semibold"
        >
          Contact Concierge Team
        </button>
      </div>

    </div>
  );
};
