import React, { useState } from 'react';
import { brandConfig } from '../data/brandConfig';
import { X, MessageSquare, Send, Sparkles, CheckCircle2, Mail, Phone } from 'lucide-react';

export const BespokeModal = ({ isOpen, onClose, initialProduct = null }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'United States',
    metalChoice: initialProduct?.metalCategory === 'silver' ? '925 Sterling Silver' : '14K Solid Gold (BIS 585)',
    ringSize: 'US 7',
    budgetUSD: '$500 - $1,500',
    notes: initialProduct ? `Inquiring about bespoke customization for "${productTitle(initialProduct)}"` : '',
  });

  const [submitted, setSubmitted] = useState(false);

  function productTitle(prod) {
    return prod ? prod.name : 'Custom Piece';
  }

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `*New Bespoke Jewellery Inquiry - ${brandConfig.brandFullName}*\n` +
      `• Client Name: ${formData.name}\n` +
      `• Destination: ${formData.country}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone || 'N/A'}\n` +
      `• Metal Preference: ${formData.metalChoice}\n` +
      `• Target Size: ${formData.ringSize}\n` +
      `• Estimated Budget: ${formData.budgetUSD}\n` +
      `• Custom Specifications: ${formData.notes}\n` +
      `• Reference: ${initialProduct ? initialProduct.name : 'Custom Heirloom Commission'}`
    );
    window.open(`https://wa.me/${brandConfig.concierge.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    setSubmitted(true);
  };

  const handleSubmitEmail = () => {
    const subject = encodeURIComponent(`Bespoke Jewelry Inquiry: ${formData.name} (${formData.country})`);
    const body = encodeURIComponent(
      `Hello Lumora Concierge,\n\nI would like to inquire about a custom heirloom piece:\n\n` +
      `Name: ${formData.name}\n` +
      `Country: ${formData.country}\n` +
      `Phone: ${formData.phone}\n` +
      `Metal: ${formData.metalChoice}\n` +
      `Size: ${formData.ringSize}\n` +
      `Budget: ${formData.budgetUSD}\n\n` +
      `Specifications:\n${formData.notes}\n\nThank you!`
    );
    window.location.href = `mailto:${brandConfig.concierge.supportEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in text-[#e0e2ec]">
      <div 
        className="relative w-full max-w-xl bg-[#0e1017] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 text-xs font-semibold text-[#d4af37] uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jaipur Atelier VIP Concierge</span>
            </div>
            <h3 className="text-2xl font-serif font-medium text-white tracking-tight">
              Commission a Bespoke Heirloom
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Collaborate directly with our master goldsmiths in Jaipur to forge unique engagement rings, anniversary bands, custom 18K/22K gold, or rare gemstone settings.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-serif font-bold text-white">Inquiry Transmitted to Our Master Jeweler</h4>
              <p className="text-xs text-white/70 max-w-md mx-auto">
                Our concierge is reviewing your specifications and will respond with initial metal weight estimates, 3D CAD renders, and gemstone options within 12 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2 rounded-lg bg-[#d4af37] text-[#0b0c10] text-xs font-bold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitWhatsApp} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victoria Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. victoria@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-white/70 block mb-1">Destination Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-2.5 py-2 bg-[#1a1d26] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="United States">🇺🇸 United States</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Other">🌐 Other International</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/70 block mb-1">Metal Preference</label>
                  <select
                    value={formData.metalChoice}
                    onChange={(e) => setFormData({ ...formData, metalChoice: e.target.value })}
                    className="w-full px-2.5 py-2 bg-[#1a1d26] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="14K Solid Gold (Yellow/White/Rose)">14K Solid Gold (BIS 585)</option>
                    <option value="18K Solid Gold (Yellow/White/Rose)">18K Solid Gold (BIS 750)</option>
                    <option value="22K Solid Gold (Heritage)">22K Solid Gold (BIS 916)</option>
                    <option value="925 Sterling Silver">925 Sterling Silver</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/70 block mb-1">Target Ring Size</label>
                  <input
                    type="text"
                    placeholder="e.g. US 6.5, US 8.25"
                    value={formData.ringSize}
                    onChange={(e) => setFormData({ ...formData, ringSize: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/70 block mb-1">Target Budget Range</label>
                <select
                  value={formData.budgetUSD}
                  onChange={(e) => setFormData({ ...formData, budgetUSD: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1a1d26] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="$150 - $400 USD">$150 – $400 USD (Silver & Everyday 14K)</option>
                  <option value="$400 - $800 USD">$400 – $800 USD (Duty-Free US Section 321)</option>
                  <option value="$800 - $2,500 USD">$800 – $2,500 USD (18K Bridal & Solitaires)</option>
                  <option value="$2,500+ USD">$2,500+ USD (High Jewelry / Heavy Karat)</option>
                </select>
              </div>

              <div>
                <label className="text-white/70 block mb-1">Design Vision or Desired Gemstones</label>
                <textarea
                  rows={3}
                  placeholder="Describe your vision (e.g., emerald cut lab diamond solitaire with cathedral band, antique floral filigree, specific heirloom engraving...)"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp VIP Consultation</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitEmail}
                  className="py-3 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#d4af37]" />
                  <span>Send via Email Inquiry</span>
                </button>
              </div>

              <div className="text-center text-[10px] text-white/40 pt-1">
                Direct response from our Jaipur master goldsmith within 12 hours. Zero commitment.
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
