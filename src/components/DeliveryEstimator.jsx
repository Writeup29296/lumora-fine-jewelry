import React, { useState, useEffect } from 'react';
import { Clock, Plane, ShieldCheck } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const DeliveryEstimator = () => {
  const { country, activeCountry } = useCurrency();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format dates: 3-5 business days from now
  const today = new Date();
  const startDay = new Date(today);
  startDay.setDate(today.getDate() + 3);
  const endDay = new Date(today);
  endDay.setDate(today.getDate() + 6);

  const formatDate = (d) => {
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] text-xs space-y-2">
      <div className="flex items-center justify-between text-[#1F2022]">
        <div className="flex items-center gap-1.5 font-medium">
          <Clock className="w-4 h-4 text-[#A8843E]" />
          <span>
            Order within{' '}
            <span className="font-mono text-[#A8843E] font-semibold">
              {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
          DHL Express Air
        </span>
      </div>

      <div className="flex items-center gap-2 text-[#575A61] text-[11px]">
        <Plane className="w-3.5 h-3.5 text-[#A8843E] shrink-0" />
        <span>
          Estimated Delivery to <strong className="text-[#1F2022]">{activeCountry.name}</strong>:{' '}
          <strong className="text-[#1F2022] underline decoration-[#C5A059]">{formatDate(startDay)} – {formatDate(endDay)}</strong>
        </span>
      </div>

      <div className="pt-1 border-t border-[#EAE3D5]/60 flex items-center justify-between text-[10px] text-[#747780]">
        <span>Direct from Jaipur/Surat Ateliers</span>
        <span className="flex items-center gap-1 text-[#1F2022]">
          <ShieldCheck className="w-3 h-3 text-[#A8843E]" />
          100% Insured Doorstep Delivery
        </span>
      </div>
    </div>
  );
};
