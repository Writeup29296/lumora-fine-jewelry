import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { useCurrency } from '../context/CurrencyContext';
import { X, User, Package, MapPin, LogOut, Truck, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CustomerAccountModal = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();
  const { getOrdersByEmail } = useOrders();
  const { formatPrice } = useCurrency();

  if (!isOpen || !currentUser) return null;

  const userOrders = getOrdersByEmail(currentUser.email);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in text-[#e0e2ec]">
      <div className="bg-[#0e1017] border border-white/10 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 bg-[#12151e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white tracking-wide">
                {currentUser.name}
              </h3>
              <p className="text-xs text-white/50">{currentUser.email} &bull; {currentUser.country || 'Worldwide'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-xs">
          
          {/* Order History Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/90 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#d4af37]" />
                <span>My International Orders ({userOrders.length})</span>
              </h4>
              <span className="text-[10px] text-white/40 font-mono">100% Insured DHL Delivery</span>
            </div>

            {userOrders.length === 0 ? (
              <div className="p-8 text-center bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                <p className="text-white/60">No previous orders found for {currentUser.email}.</p>
                <p className="text-[11px] text-white/40">Your future gold and silver purchases will appear here with live DHL tracking.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userOrders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-4 rounded-xl bg-[#12151e] border border-white/10 space-y-3 hover:border-[#d4af37]/30 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#d4af37] text-sm">{ord.orderId}</span>
                        <span className="text-white/40 text-[11px] ml-2">{ord.date}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                        <Truck className="w-3 h-3" /> {ord.status}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2.5">
                            {it.image && (
                              <img src={it.image} alt="" className="w-8 h-8 rounded object-cover border border-white/10" />
                            )}
                            <div>
                              <p className="font-medium text-white">{it.name}</p>
                              <p className="text-white/40">{it.metal} &bull; Qty: {it.quantity}</p>
                            </div>
                          </div>
                          <span className="font-mono text-white font-semibold">
                            {formatPrice(it.unitPriceUSD * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom row */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/50">
                      <span>Airway Bill: <strong className="text-white font-mono">{ord.trackingNumber}</strong></span>
                      <span className="text-xs font-mono font-bold text-white">
                        Total: {formatPrice(ord.grandTotalUSD)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Account Details Box */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <h5 className="font-semibold text-white uppercase text-[10px] tracking-wider">
              Account Privileges & Guarantees
            </h5>
            <ul className="space-y-1.5 text-white/60 text-[11px]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Worldwide Priority Dispatch via DHL / FedEx Air Cargo</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>30-Day Hassle-Free Returns Worldwide</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Complimentary Ring Resizing on all solid gold & silver pieces</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#12151e] flex items-center justify-between">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
