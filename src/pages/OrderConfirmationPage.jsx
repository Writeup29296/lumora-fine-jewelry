import React from 'react';
import { 
  CheckCircle2, Plane, Package, ShieldCheck, 
  Printer, ArrowRight, MapPin, Clock, Award, FileText 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const OrderConfirmationPage = ({ order, onNavigate }) => {
  const { formatPrice } = useCurrency();

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#1F2022]">No Active Order Found</h2>
        <p className="text-xs text-[#747780]">If you placed an order, please visit Customer Account to track status.</p>
        <button
          onClick={() => onNavigate('account')}
          className="px-6 py-2.5 bg-[#1F2022] text-[#FAF8F5] rounded text-xs uppercase tracking-wider font-semibold"
        >
          Track My Order
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* 1. Success Hero Banner */}
      <div className="text-center space-y-3 bg-[#FAF8F5] border border-[#EAE3D5] rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Payment Authorized & Verified
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1F2022] font-normal">
          Thank You for Your Lumora Order
        </h1>
        <p className="text-sm text-[#575A61] max-w-lg mx-auto">
          Your order has been transmitted directly to our master jewelers in Jaipur & Surat, India. A formal confirmation and commercial export invoice have been sent to <strong>{order.customer?.email}</strong>.
        </p>

        <div className="pt-2 flex flex-wrap justify-center items-center gap-3 text-xs">
          <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#EAE3D5] font-mono font-bold text-[#1F2022]">
            Order Ref: {order.id}
          </span>
          <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#EAE3D5] font-mono text-[#A8843E]">
            Air Tracking: {order.shipping?.trackingNumber}
          </span>
        </div>
      </div>

      {/* 2. Visual Export Fulfillment Timeline */}
      <div className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
          <h2 className="font-serif text-xl text-[#1F2022] font-medium flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#A8843E]" />
            <span>International Export & Delivery Stages</span>
          </h2>
          <span className="text-xs text-[#747780]">Origin: Jaipur & Surat, India &rarr; {order.customer?.country}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-1.5 relative">
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>1. Order Paid</span>
            </div>
            <p className="text-[11px] text-[#747780]">Payment verified via hosted checkout session.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#A8843E] font-semibold">
              <Clock className="w-4 h-4" />
              <span>2. Atelier Crafting</span>
            </div>
            <p className="text-[11px] text-[#747780]">Jewelers forging settings & BIS hallmark assay stamping.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#747780] font-semibold">
              <FileText className="w-4 h-4" />
              <span>3. CSB-V Customs</span>
            </div>
            <p className="text-[11px] text-[#747780]">Electronic Indian customs filing (HS 7113.19.10).</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#747780] font-semibold">
              <Plane className="w-4 h-4" />
              <span>4. DHL Air Transit</span>
            </div>
            <p className="text-[11px] text-[#747780]">3–5 days insured express flight to US/Canada doorstep.</p>
          </div>
        </div>
      </div>

      {/* 3. Itemized Receipt */}
      <div className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
          <h2 className="font-serif text-xl text-[#1F2022] font-medium">Itemized Receipt</h2>
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg border border-[#EAE3D5] text-xs font-medium text-[#1F2022] hover:bg-[#FAF8F5] flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-[#A8843E]" />
            <span>Print Invoice</span>
          </button>
        </div>

        <div className="space-y-4">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex gap-4 text-xs py-2 border-b border-[#F5F1E8]">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-[#EAE3D5]" />
              )}
              <div className="flex-1">
                <h4 className="font-serif text-sm font-medium text-[#1F2022]">{item.name}</h4>
                <span className="text-[11px] text-[#747780] block">{item.metal} {item.size && `• Size ${item.size}`}</span>
                {item.engraving && (
                  <span className="text-[10px] text-[#A8843E] block italic">Engraved: "{item.engraving}"</span>
                )}
                <span className="text-[11px] text-[#575A61]">Qty: {item.quantity || 1}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-sm text-[#1F2022]">
                  {order.pricing?.currency === 'CAD' ? 'CA$' : '$'}{(item.unitPrice * (item.quantity || 1)).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="pt-2 space-y-2 text-xs border-t border-[#EAE3D5] max-w-sm ml-auto">
          <div className="flex justify-between text-[#575A61]">
            <span>Subtotal</span>
            <span>{order.pricing?.currency === 'CAD' ? 'CA$' : '$'}{order.pricing?.subtotal?.toLocaleString()}</span>
          </div>
          {order.pricing?.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Discount ({order.pricing?.discountCode})</span>
              <span>-{order.pricing?.currency === 'CAD' ? 'CA$' : '$'}{order.pricing?.discountAmount?.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-[#575A61]">
            <span>Shipping (DHL Express)</span>
            <span>{order.pricing?.shippingFee === 0 ? 'FREE' : `${order.pricing?.currency === 'CAD' ? 'CA$' : '$'}${order.pricing?.shippingFee}`}</span>
          </div>
          <div className="flex justify-between text-[#575A61]">
            <span>Customs & Duties</span>
            <span>{order.pricing?.dutiesTaxes === 0 ? '$0.00 (Exempt)' : `${order.pricing?.currency === 'CAD' ? 'CA$' : '$'}${order.pricing?.dutiesTaxes}`}</span>
          </div>
          <div className="flex justify-between pt-2 border-t-2 border-[#EAE3D5] font-semibold text-sm text-[#1F2022]">
            <span>Total Paid ({order.pricing?.currency})</span>
            <span>{order.pricing?.currency === 'CAD' ? 'CA$' : '$'}{order.pricing?.total?.toLocaleString()}</span>
          </div>
        </div>

        {/* Shipping Destination Address */}
        <div className="pt-4 border-t border-[#EAE3D5] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#575A61]">
          <div>
            <strong className="block text-[#1F2022] mb-1 font-serif text-sm">Delivery Recipient:</strong>
            <p>{order.customer?.firstName} {order.customer?.lastName}</p>
            <p>{order.customer?.address1} {order.customer?.address2}</p>
            <p>{order.customer?.city}, {order.customer?.state} {order.customer?.postalCode}</p>
            <p>{order.customer?.country === 'CA' ? 'Canada' : 'United States'}</p>
            <p className="mt-1 text-[#747780]">Phone: {order.customer?.phone}</p>
          </div>

          <div>
            <strong className="block text-[#1F2022] mb-1 font-serif text-sm">Export Documentation:</strong>
            <p><strong>Courier:</strong> {order.shipping?.carrier || 'DHL Express Worldwide'}</p>
            <p><strong>Tracking Number:</strong> {order.shipping?.trackingNumber}</p>
            <p><strong>Declared HS Code:</strong> {order.shipping?.hsCode || '7113.19.10 (Gold Jewelry)'}</p>
            <p><strong>Electronic Shipping Bill:</strong> {order.shipping?.csbVNumber || 'CSB-V-Filed'}</p>
            <p className="mt-1 text-emerald-700 font-medium">Eligible for 30-Day Return in original condition</p>
          </div>
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 bg-[#1F2022] text-[#FAF8F5] hover:bg-[#A8843E] transition-colors rounded text-xs uppercase tracking-wider font-semibold"
        >
          Continue Exploring Heirlooms
        </button>
        <button
          onClick={() => onNavigate('account')}
          className="px-6 py-3 border border-[#C5A059] text-[#1F2022] hover:bg-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold"
        >
          View in Customer Account & Track Status
        </button>
      </div>

    </div>
  );
};
