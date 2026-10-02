import React, { useState } from 'react';
import { 
  X, ShieldCheck, Lock, CreditCard, CheckCircle2, 
  Plane, AlertCircle, FileText, ChevronRight, Download, 
  ExternalLink, Sparkles, Building, Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';
import { brandConfig } from '../data/brandConfig';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const CAN_PROVINCES = [
  { code: 'AB', name: 'Alberta', rate: 0.05, label: '5% GST' },
  { code: 'BC', name: 'British Columbia', rate: 0.12, label: '5% GST + 7% PST' },
  { code: 'MB', name: 'Manitoba', rate: 0.12, label: '5% GST + 7% PST' },
  { code: 'NB', name: 'New Brunswick', rate: 0.15, label: '15% HST' },
  { code: 'NL', name: 'Newfoundland', rate: 0.15, label: '15% HST' },
  { code: 'NS', name: 'Nova Scotia', rate: 0.15, label: '15% HST' },
  { code: 'ON', name: 'Ontario', rate: 0.13, label: '13% HST' },
  { code: 'PE', name: 'Prince Edward Island', rate: 0.15, label: '15% HST' },
  { code: 'QC', name: 'Quebec', rate: 0.14975, label: '5% GST + 9.975% QST' },
  { code: 'SK', name: 'Saskatchewan', rate: 0.11, label: '5% GST + 6% PST' },
  { code: 'NT', name: 'Northwest Territories', rate: 0.05, label: '5% GST' },
  { code: 'NU', name: 'Nunavut', rate: 0.05, label: '5% GST' },
  { code: 'YT', name: 'Yukon', rate: 0.05, label: '5% GST' }
];

export const CheckoutModal = () => {
  const { 
    items, 
    cartSubtotalUSD, 
    hasFreeShipping, 
    isCheckoutOpen, 
    closeCheckout,
    clearCart
  } = useCart();

  const { formatPrice, currency, setCurrency, activeCurrency } = useCurrency();
  const { addOrder } = useOrders();
  const { currentUser } = useAuth();

  // Form State
  const [country, setCountry] = useState(currentUser?.country === 'Canada' ? 'Canada' : 'USA');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [firstName, setFirstName] = useState(currentUser?.name ? currentUser.name.split(' ')[0] : '');
  const [lastName, setLastName] = useState(currentUser?.name ? currentUser.name.split(' ').slice(1).join(' ') : '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('NY');
  const [provinceCode, setProvinceCode] = useState('ON');
  const [postalCode, setPostalCode] = useState('10001');
  const [phone, setPhone] = useState('');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('dhl'); // 'dhl' or 'fedex'
  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'apple_pay', 'paypal', 'klarna'
  // Mock Card Fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('921');

  // Checkout Steps: 'review' -> 'processing' -> 'success'
  const [step, setStep] = useState('review');
  const [orderSummary, setOrderSummary] = useState(null);

  if (!isCheckoutOpen) return null;

  // Shipping calculation
  const baseShippingUSD = hasFreeShipping ? 0 : 24;
  const shippingCostUSD = shippingMethod === 'fedex' ? (hasFreeShipping ? 15 : 35) : baseShippingUSD;

  // Duties & Taxes calculation
  let dutyUSD = 0;
  let taxUSD = 0;
  let dutyLabel = '';

  if (country === 'USA') {
    if (cartSubtotalUSD < 800) {
      dutyUSD = 0;
      dutyLabel = 'Section 321 Duty-Free Exemption (Personal import under $800 USD)';
    } else {
      dutyUSD = Math.round(cartSubtotalUSD * 0.055); // ~5.5% estimated for gold over $800
      dutyLabel = 'Estimated US Customs Duty (HTS 7113.19)';
    }
  } else if (country === 'Canada') {
    const selectedProv = CAN_PROVINCES.find((p) => p.code === provinceCode) || CAN_PROVINCES[6];
    const jewelryTariff = 0.065; // 6.5% Canadian CBSA jewellery tariff
    dutyUSD = Math.round(cartSubtotalUSD * jewelryTariff);
    taxUSD = Math.round((cartSubtotalUSD + dutyUSD) * selectedProv.rate);
    dutyLabel = `Canada DDP: 6.5% CBSA Tariff + ${selectedProv.label}`;
  }

  const grandTotalUSD = cartSubtotalUSD + shippingCostUSD + dutyUSD + taxUSD;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const orderId = `LUM-${country === 'USA' ? 'US' : 'CA'}-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `DHL-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      
      const summary = {
        orderId,
        trackingNumber,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        recipient: `${firstName || 'Victoria'} ${lastName || 'Sterling'}`,
        email: email || 'client@example.com',
        address: `${address || '742 Evergreen Terrace'}, ${city || (country === 'USA' ? 'New York' : 'Toronto')}, ${country === 'USA' ? stateCode : provinceCode} ${postalCode}`,
        country: country === 'USA' ? 'United States' : 'Canada',
        items: [...items],
        subtotalUSD: cartSubtotalUSD,
        shippingUSD: shippingCostUSD,
        dutyUSD,
        taxUSD,
        grandTotalUSD,
        carrier: shippingMethod === 'fedex' ? 'FedEx International Priority' : 'DHL Express Worldwide',
        csbVNumber: `CSB-V/DEL/AIR/${new Date().getFullYear()}/${Math.floor(10000 + Math.random() * 90000)}`,
        hsCode: '7113.19.10 (Articles of Jewellery of Precious Metals)',
        paymentMethodDisplay: paymentMethod === 'card' ? 'Visa ending in 4242' : (paymentMethod === 'apple_pay' ? 'Apple Pay' : 'PayPal Express')
      };

      setOrderSummary(summary);
      addOrder(summary);
      setStep('success');
      clearCart();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in text-[#e0e2ec]">
      <div className="bg-[#0e1017] border border-white/10 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#12151e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#d4af37] font-serif tracking-widest text-lg font-bold">LUMORA</span>
            <span className="text-white/30">|</span>
            <span className="text-xs uppercase tracking-wider text-white/70 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit Encrypted International Checkout
            </span>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {step === 'processing' && (
          <div className="p-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" />
            <h3 className="text-xl font-serif text-white">Transmitting Order to Indian Export Customs EDI...</h3>
            <p className="text-sm text-white/50 max-w-md">
              Filing CSB-V manifest, assigning DHL Express courier airway bill, and confirming payment receipt with RBI remittance gateway.
            </p>
          </div>
        )}

        {step === 'review' && (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-white/10">
              
              {/* Destination Selector */}
              <div>
                <label className="block text-xs uppercase font-medium tracking-wider text-white/80 mb-2">
                  Destination Country / Market
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCountry('USA');
                      setCurrency('USD');
                    }}
                    className={`py-3 px-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                      country === 'USA'
                        ? 'border-[#d4af37] bg-[#d4af37]/10 text-white ring-1 ring-[#d4af37]'
                        : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">🇺🇸</span>
                      <div>
                        <p className="text-xs font-semibold text-white">United States</p>
                        <p className="text-[10px] text-emerald-400">Duty-free under $800</p>
                      </div>
                    </div>
                    {country === 'USA' && <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCountry('Canada');
                      setCurrency('CAD');
                    }}
                    className={`py-3 px-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                      country === 'Canada'
                        ? 'border-[#d4af37] bg-[#d4af37]/10 text-white ring-1 ring-[#d4af37]'
                        : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">🇨🇦</span>
                      <div>
                        <p className="text-xs font-semibold text-white">Canada</p>
                        <p className="text-[10px] text-amber-300">Guaranteed DDP Pre-Cleared</p>
                      </div>
                    </div>
                    {country === 'Canada' && <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />}
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-medium tracking-wider text-white/80">
                  1. Contact & Recipient Details
                </h4>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email address (for DHL tracking & BIS certificate)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-medium tracking-wider text-white/80">
                  2. Shipping Address
                </h4>
                <input
                  type="text"
                  required
                  placeholder="Street address (No P.O. Boxes for courier security)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
                <div className="grid grid-cols-12 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="col-span-5 px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                  />

                  {country === 'USA' ? (
                    <select
                      value={stateCode}
                      onChange={(e) => setStateCode(e.target.value)}
                      className="col-span-3 px-2 py-2.5 text-xs bg-[#1a1d26] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      {US_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={provinceCode}
                      onChange={(e) => setProvinceCode(e.target.value)}
                      className="col-span-3 px-2 py-2.5 text-xs bg-[#1a1d26] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      {CAN_PROVINCES.map((prov) => (
                        <option key={prov.code} value={prov.code}>{prov.code} ({prov.name})</option>
                      ))}
                    </select>
                  )}

                  <input
                    type="text"
                    required
                    placeholder={country === 'USA' ? 'ZIP code' : 'Postal (A1A 1A1)'}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="col-span-4 px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Mobile phone for DHL delivery SMS & signature verification"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Courier Selection */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-medium tracking-wider text-white/80">
                  3. Insured Express Air Courier
                </h4>
                <div className="space-y-2">
                  <label 
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                      shippingMethod === 'dhl' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="courier" 
                        checked={shippingMethod === 'dhl'} 
                        onChange={() => setShippingMethod('dhl')} 
                        className="text-[#d4af37] focus:ring-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">DHL Express Worldwide Air</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                            3–5 Days
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Direct signature required, GPS air tracking, 100% loss/damage insurance.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-white">
                      {hasFreeShipping ? <span className="text-emerald-400 font-bold">FREE</span> : formatPrice(24)}
                    </span>
                  </label>

                  <label 
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                      shippingMethod === 'fedex' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="courier" 
                        checked={shippingMethod === 'fedex'} 
                        onChange={() => setShippingMethod('fedex')} 
                        className="text-[#d4af37] focus:ring-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">FedEx International Priority Armored</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">
                            2–4 Days
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          High-value precious metals locked container handling.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-white">
                      {formatPrice(hasFreeShipping ? 15 : 35)}
                    </span>
                  </label>
                </div>
              </div>

              {/* Payment Selector */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-medium tracking-wider text-white/80">
                  4. Payment Method
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'apple_pay', label: 'Apple Pay', icon: Sparkles },
                    { id: 'paypal', label: 'PayPal', icon: ExternalLink },
                    { id: 'klarna', label: 'Pay in 4', icon: FileText }
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-2.5 rounded-lg border text-center flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === pm.id
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-white'
                          : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                      }`}
                    >
                      <pm.icon className="w-4 h-4 text-[#d4af37]" />
                      <span className="text-[11px] font-medium">{pm.label}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div>
                      <label className="text-[10px] text-white/50 uppercase">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-black/40 border border-white/10 rounded font-mono text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-white/50 uppercase">Expires</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-black/40 border border-white/10 rounded font-mono text-white focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 uppercase">CVC</label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-black/40 border border-white/10 rounded font-mono text-white focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'klarna' && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                    <p className="font-semibold">Klarna / Afterpay: 4 Interest-Free Installments</p>
                    <p className="text-[11px] text-white/70 mt-0.5">
                      Pay <strong>{formatPrice(Math.round(grandTotalUSD / 4))}</strong> today, and the rest every 2 weeks. Zero interest.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary & North American Tax Engine */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#12151e] flex flex-col justify-between space-y-6">
              <div>
                <h4 className="text-xs uppercase font-medium tracking-wider text-white/80 pb-3 border-b border-white/10">
                  Order Summary ({items.length} items)
                </h4>

                {/* Items preview */}
                <div className="py-4 space-y-3 max-h-48 overflow-y-auto divide-y divide-white/5">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-10 h-12 object-cover rounded border border-white/10" 
                        />
                        <div>
                          <p className="font-medium text-white truncate max-w-[140px] font-serif">{item.name}</p>
                          <p className="text-[10px] text-[#d4af37]">{item.metal}</p>
                          <p className="text-[10px] text-white/40">Qty: {item.quantity} {item.size ? `• Size: ${item.size}` : ''}</p>
                        </div>
                      </div>
                      <span className="font-mono text-white font-medium">
                        {formatPrice(item.unitPriceUSD * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Customs & Taxes Breakdown */}
                <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-white/70">
                    <span>Items Subtotal</span>
                    <span className="font-mono text-white">{formatPrice(cartSubtotalUSD)}</span>
                  </div>

                  <div className="flex justify-between text-white/70">
                    <span>Insured Air Express</span>
                    <span className="font-mono text-emerald-400">
                      {shippingCostUSD === 0 ? 'FREE' : formatPrice(shippingCostUSD)}
                    </span>
                  </div>

                  {/* Duty row */}
                  <div className="flex justify-between text-white/70 items-start">
                    <div>
                      <span>Customs Duties & Tariffs</span>
                      <p className="text-[10px] text-white/40 leading-tight max-w-[180px]">{dutyLabel}</p>
                    </div>
                    <span className={`font-mono ${dutyUSD === 0 ? 'text-emerald-400' : 'text-white'}`}>
                      {dutyUSD === 0 ? '$0.00 (Duty-Free)' : formatPrice(dutyUSD)}
                    </span>
                  </div>

                  {/* Canadian Tax row if Canada */}
                  {country === 'Canada' && taxUSD > 0 && (
                    <div className="flex justify-between text-white/70">
                      <span>Canadian GST / HST</span>
                      <span className="font-mono text-white">{formatPrice(taxUSD)}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-semibold text-white">
                    <span>Total Due ({activeCurrency.code})</span>
                    <span className="text-lg font-mono text-[#d4af37]">{formatPrice(grandTotalUSD)}</span>
                  </div>
                </div>

                {/* Country Specific Explanatory Box */}
                <div className="mt-4 p-3.5 rounded-xl border text-xs space-y-1.5 bg-[#0e1017] border-white/10">
                  {country === 'USA' ? (
                    <>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                        <ShieldCheck className="w-4 h-4" />
                        <span>US Customs Section 321 Compliance</span>
                      </div>
                      <p className="text-[11px] text-white/60 leading-relaxed">
                        Shipments into the USA valued under $800 USD per individual are admitted free of duty and tax under Section 321 (19 U.S.C. 1321). No paperwork required from your end.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                        <Plane className="w-4 h-4" />
                        <span>Canada CBSA Guaranteed DDP</span>
                      </div>
                      <p className="text-[11px] text-white/60 leading-relaxed">
                        Delivered Duty Paid. All Canadian tariffs and provincial taxes are collected transparently above. Your parcel is delivered directly to your door without brokerage fees.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#0b0c10] font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-[0.99] transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Place Insured Order • {formatPrice(grandTotalUSD)}</span>
                </button>

                <div className="flex items-center justify-center gap-3 text-[10px] text-white/40">
                  <span>BIS Hallmarked</span>
                  <span>•</span>
                  <span>CSB-V Compliant</span>
                  <span>•</span>
                  <span>DHL Real-Time GPS Tracking</span>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Success / Order Confirmation Screen */}
        {step === 'success' && orderSummary && (
          <div className="p-8 sm:p-12 overflow-y-auto max-h-[85vh] space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif text-white">Order Confirmed & Export EDI Dispatched!</h2>
              <p className="text-xs text-white/60 max-w-lg mx-auto">
                Thank you for choosing Lumora Fine Jewelry. Your bespoke heirlooms are being prepared in our atelier and registered for DHL Express Worldwide air dispatch.
              </p>
            </div>

            {/* Official Export Manifest Card */}
            <div className="bg-[#12151e] border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs">
                <div>
                  <span className="text-white/40 block">Order Number</span>
                  <span className="text-base font-mono font-bold text-[#d4af37]">{orderSummary.orderId}</span>
                </div>
                <div>
                  <span className="text-white/40 block">Airway Bill / Tracking</span>
                  <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" /> {orderSummary.trackingNumber}
                  </span>
                </div>
                <div>
                  <span className="text-white/40 block">Date of Export</span>
                  <span className="text-white/80">{orderSummary.date}</span>
                </div>
                <div>
                  <span className="text-white/40 block">Carrier</span>
                  <span className="text-white/80">{orderSummary.carrier}</span>
                </div>
              </div>

              {/* Legal Indian Export Compliance Block */}
              <div className="p-4 rounded-lg bg-black/40 border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                <div>
                  <span className="text-white/40 block">Indian Customs EDI Filing</span>
                  <span className="font-mono text-white/80">{orderSummary.csbVNumber}</span>
                </div>
                <div>
                  <span className="text-white/40 block">International HS Harmonized Code</span>
                  <span className="font-mono text-white/80">{orderSummary.hsCode}</span>
                </div>
                <div>
                  <span className="text-white/40 block">Exemption / Duty Type</span>
                  <span className="font-mono text-emerald-400 font-medium">
                    {orderSummary.country === 'United States' ? 'Section 321 Duty-Free Entry' : 'Delivered Duty Paid (DDP)'}
                  </span>
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="text-xs space-y-1">
                <span className="text-white/40">Delivering To:</span>
                <p className="font-semibold text-white">{orderSummary.recipient}</p>
                <p className="text-white/70">{orderSummary.address}</p>
              </div>

              {/* Itemized breakdown */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Grand Total Paid</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {formatPrice(orderSummary.grandTotalUSD)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-white/40">
                  <span>Payment Method</span>
                  <span>{orderSummary.paymentMethodDisplay}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Print Official Export Receipt</span>
              </button>
              <button
                onClick={closeCheckout}
                className="px-6 py-2.5 rounded-lg bg-[#d4af37] hover:bg-[#e6ca65] text-[#0b0c10] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Continue Exploring Lumora
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
