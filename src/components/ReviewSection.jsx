import React from 'react';
import { reviews, trustStats } from '../data/reviews';
import { brandConfig } from '../data/brandConfig';
import { Star, CheckCircle2, ShieldCheck, Quote } from 'lucide-react';

export const ReviewSection = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#0d0f17] border-b border-white/10 text-[#e0e2ec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            North American Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight">
            Treasured Across the United States & Canada
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            Read verified impressions from US and Canadian collectors who received their solid gold & silver heirlooms direct from our atelier via DHL Express.
          </p>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-[#12151e] border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#d4af37]">5.0 ★</div>
            <div className="text-xs text-white/50 mt-1">Average Client Rating</div>
          </div>
          <div className="p-4 rounded-xl bg-[#12151e] border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">{trustStats.northAmericaDeliveries}</div>
            <div className="text-xs text-white/50 mt-1">Shipped to USA & Canada</div>
          </div>
          <div className="p-4 rounded-xl bg-[#12151e] border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">100%</div>
            <div className="text-xs text-white/50 mt-1">Section 321 Duty-Free Rate</div>
          </div>
          <div className="p-4 rounded-xl bg-[#12151e] border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#d4af37]">3–5 Days</div>
            <div className="text-xs text-white/50 mt-1">Avg DHL Air Delivery</div>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#12151e] border border-white/10 relative flex flex-col justify-between space-y-4 hover:border-[#d4af37]/40 transition-colors"
            >
              <div className="space-y-3">
                {/* Header: Stars, Verified Badge, Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#d4af37] text-sm">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Delivery</span>
                  </div>
                </div>

                {/* Purchased item */}
                <div className="text-[11px] text-[#d4af37] font-medium font-serif">
                  {rev.itemPurchased}
                </div>

                {/* Review Text */}
                <p className="text-xs text-white/70 leading-relaxed font-light italic">
                  "{rev.reviewText}"
                </p>
              </div>

              {/* Reviewer Profile */}
              <div className="pt-3 border-t border-white/5 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0"
                />
                <div>
                  <div className="text-xs font-semibold text-white">{rev.author}</div>
                  <div className="text-[11px] text-white/40">{rev.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
