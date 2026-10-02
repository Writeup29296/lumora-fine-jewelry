import React, { useState } from 'react';
import { 
  Mail, MessageSquare, Phone, Clock, MapPin, 
  Send, Check, Sparkles, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';

export const ContactPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'US',
    subject: 'sizing',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep success message visible
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Customer Service & Concierge
        </span>
        <h1 className="text-4xl font-serif text-[#1F2022] font-normal">
          Connect with Lumora Atelier
        </h1>
        <p className="text-sm text-[#575A61] leading-relaxed">
          Whether you need assistance with custom ring sizing, metal selection, diamond specifications, or tracking an international DHL shipment, our concierge team is at your service.
        </p>
      </div>

      {/* 2. Grid: Contact Details + Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Atelier Concierge Channels */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-5 shadow-xs">
            <h3 className="font-serif text-xl text-[#1F2022] font-medium">Direct Concierge Channels</h3>

            <div className="space-y-4 text-xs">
              
              {/* WhatsApp Concierge */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#1F2022] text-xs">Instant WhatsApp VIP Concierge</strong>
                  <span className="text-[#575A61] block mt-0.5">{brandConfig.concierge.whatsappNumber}</span>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-1.5 text-[#A8843E] hover:underline font-medium"
                  >
                    Open Chat with Jaipur Atelier &rarr;
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                <div className="w-8 h-8 rounded-full bg-[#F4EFE6] text-[#A8843E] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#1F2022] text-xs">Email Concierge</strong>
                  <a href={`mailto:${brandConfig.concierge.supportEmail}`} className="text-[#575A61] hover:text-[#1F2022] block mt-0.5">
                    {brandConfig.concierge.supportEmail}
                  </a>
                  <a href={`mailto:${brandConfig.concierge.ordersEmail}`} className="text-[#747780] hover:text-[#1F2022] block">
                    {brandConfig.concierge.ordersEmail}
                  </a>
                </div>
              </div>

              {/* North America Phone Line Placeholder */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                <div className="w-8 h-8 rounded-full bg-[#F4EFE6] text-[#A8843E] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#1F2022] text-xs">Toll-Free Phone Support</strong>
                  <span className="text-[#747780] block mt-0.5">
                    {brandConfig.concierge.usPhonePlaceholder}
                  </span>
                </div>
              </div>

              {/* Support Hours */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                <div className="w-8 h-8 rounded-full bg-[#F4EFE6] text-[#A8843E] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#1F2022] text-xs">Hours of Operation</strong>
                  <span className="text-[#575A61] block mt-0.5">{brandConfig.concierge.businessHours}</span>
                  <span className="text-[#747780] block text-[11px]">Synchronized with US Eastern Standard Time</span>
                </div>
              </div>

              {/* Atelier Origin */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                <div className="w-8 h-8 rounded-full bg-[#F4EFE6] text-[#A8843E] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#1F2022] text-xs">Artisanal Atelier Locations</strong>
                  <span className="text-[#575A61] block mt-0.5">Jaipur & Surat, Rajasthan / Gujarat, India</span>
                  <span className="text-[#747780] block text-[11px]">All orders dispatch via DHL Air Cargo directly to USA & Canada</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Interactive Concierge Inquiry Form */}
        <div className="lg:col-span-7 bg-white border border-[#EAE3D5] rounded-2xl p-6 sm:p-10 shadow-xs">
          
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-[#1F2022] font-medium">Inquiry Dispatched to Atelier</h3>
              <p className="text-xs text-[#575A61] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. A dedicated concierge specialist from our Jaipur atelier will review your message and reply to <strong>{formData.email}</strong> within 12 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', country: 'US', subject: 'sizing', message: '' });
                }}
                className="mt-4 px-6 py-2.5 bg-[#1F2022] text-[#FAF8F5] rounded text-xs uppercase tracking-wider font-semibold hover:bg-[#A8843E] transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-serif text-2xl text-[#1F2022] font-medium">Send an Inquiry</h3>
                <p className="text-xs text-[#747780] mt-1">Our jewelers provide personalized guidance on ring sizing, metal choice, and export delivery.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victoria Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. victoria@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Country / Market *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                  >
                    <option value="US">🇺🇸 United States</option>
                    <option value="CA">🇨🇦 Canada</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                  >
                    <option value="sizing">Ring Sizing & Fit Assistance</option>
                    <option value="bespoke">Bespoke Custom Jewelry Commission</option>
                    <option value="diamonds">Lab-Grown Diamond Specifications</option>
                    <option value="shipping">DHL Shipping & Customs Questions</option>
                    <option value="returns">Returns & Exchanges (30-Day Policy)</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe how our atelier can assist you..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Concierge</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
