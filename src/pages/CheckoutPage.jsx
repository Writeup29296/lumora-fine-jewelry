import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { brandConfig } from '../data/brandConfig';
import { 
  ShieldCheck, Lock, ArrowLeft, ArrowRight, Truck, 
  Sparkles, CheckCircle2, AlertCircle, Info, Plane, Globe
} from 'lucide-react';

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
];

export const CANADIAN_PROVINCES = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland & Labrador' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'YT', name: 'Yukon' }
];

export const WORLD_COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'USD' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'USD' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'USD' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'USD' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'USD' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'USD' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'USD' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'USD' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'USD' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'USD' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'USD' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'USD' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', currency: 'USD' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', currency: 'USD' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', currency: 'USD' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', currency: 'USD' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', currency: 'USD' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', currency: 'USD' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', currency: 'USD' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'USD' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', currency: 'USD' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', currency: 'USD' },
  { code: 'OTHER', name: 'Other International Destination', flag: '🌍', currency: 'USD' }
];

export const CheckoutPage = ({ onNavigate, onOrderSuccess }) => {
  const { country, setCountry, currency, setCurrency, activeCurrency, formatPrice } = useCurrency();
  const { items, clearCart, cartSubtotalUSD } = useCart();

  // Customer Address State
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: country === 'US' ? 'NY' : (country === 'CA' ? 'ON' : ''),
    postalCode: '',
    country: country || 'US'
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('express'); // 'express' or 'armored'

  // Discount code state
  const [discountCode, setDiscountCode] = useState('');
  const [discountData, setDiscountData] = useState(null);
  const [discountError, setDiscountError] = useState('');
  const [isApplyingCode, setIsApplyingCode] = useState(false);

  // Submitting
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Country Switch
  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
    setCustomer(prev => ({
      ...prev,
      country: newCountry,
      state: newCountry === 'US' ? 'NY' : (newCountry === 'CA' ? 'ON' : prev.state)
    }));
    if (newCountry === 'CA') {
      setCurrency('CAD');
    } else {
      setCurrency('USD');
    }
  };

  // Convert subtotal to active currency
  const subtotal = currency === 'CAD' ? Math.round(cartSubtotalUSD * activeCurrency.rate) : cartSubtotalUSD;

  // Discount calculation
  let discountAmount = 0;
  if (discountData) {
    if (discountData.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * discountData.value) / 100);
    } else {
      const fixedConverted = currency === 'CAD' ? Math.round(discountData.value * activeCurrency.rate) : discountData.value;
      discountAmount = Math.min(subtotal, fixedConverted);
    }
  }

  // Shipping calculation
  const freeThreshold = currency === 'CAD' ? brandConfig.shipping.freeShippingThresholdCAD : brandConfig.shipping.freeShippingThresholdUSD;
  const isFreeShipping = (subtotal - discountAmount) >= freeThreshold;
  
  let shippingFee = 0;
  if (shippingMethod === 'express') {
    shippingFee = isFreeShipping ? 0 : (currency === 'CAD' ? brandConfig.shipping.standardExpressCostCAD : brandConfig.shipping.standardExpressCostUSD);
  } else {
    shippingFee = currency === 'CAD' ? brandConfig.shipping.priorityArmoredCostCAD : brandConfig.shipping.priorityArmoredCostUSD;
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Apply promo code via API
  const handleApplyPromo = async (e) => {
    e.preventDefault();
    if (!discountCode.trim()) return;

    setIsApplyingCode(true);
    setDiscountError('');
    try {
      const res = await fetch('/api/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: discountCode.trim(),
          subtotalUSD: cartSubtotalUSD
        })
      });
      const data = await res.json();
      if (data.valid) {
        setDiscountData(data.discount);
      } else {
        setDiscountError(data.reason || 'Invalid promotional code');
        setDiscountData(null);
      }
    } catch (err) {
      setDiscountError('Unable to validate promo code at this moment.');
    } finally {
      setIsApplyingCode(false);
    }
  };

  // Handle Order Placement
  const handleProcessPayment = async () => {
    // Validate inputs
    if (!customer.firstName || !customer.lastName || !customer.email || !customer.address1 || !customer.city || !customer.postalCode) {
      setErrorMessage('Please fill in all required shipping address fields (* marked).');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    if (!items.length) {
      setErrorMessage('Your shopping bag is empty.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const sessionPayload = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          metal: item.metal || 'Solid Gold / Silver',
          purity: item.purity,
          color: item.color,
          size: item.size || 'Standard',
          quantity: item.quantity,
          unitPrice: currency === 'CAD' ? Math.round(item.priceUSD * activeCurrency.rate) : item.priceUSD,
          image: item.image || item.images?.[0]
        })),
        customer: {
          ...customer,
          state: customer.state || 'N/A'
        },
        pricing: {
          subtotal,
          discountAmount,
          discountCode: discountData?.code || null,
          shippingFee,
          dutiesTaxes: 0,
          total: grandTotal,
          currency: currency
        },
        successUrl: `${window.location.origin}/#confirmation`,
        cancelUrl: `${window.location.origin}/#checkout`
      };

      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionPayload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initiate checkout session.');
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        // Direct simulation / instant confirmation in Test Mode
        const confirmRes = await fetch('/api/checkout/confirm-test-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...sessionPayload,
            transactionToken: `test_token_${Date.now()}`
          })
        });

        const confirmData = await confirmRes.json();
        if (confirmData.success && confirmData.order) {
          clearCart();
          if (onOrderSuccess) {
            onOrderSuccess(confirmData.order);
          }
          onNavigate('confirmation');
        } else {
          throw new Error(confirmData.error || 'Could not verify test order.');
        }
      }

    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!items.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] flex items-center justify-center text-[#A8843E] mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl text-[#1F2022] mb-2 font-normal">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#747780] max-w-sm mb-6">
          Explore our handcrafted solid gold and lab-grown diamond collections from our Surat atelier.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-8 py-3 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded-lg text-xs font-semibold uppercase tracking-wider"
        >
          Explore The Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb & Country Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D5]">
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-1.5 text-xs text-[#747780] hover:text-[#1F2022] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#1F2022] font-normal">
              Worldwide Express Checkout
            </h1>
          </div>

          {/* Worldwide Destination Selector */}
          <div className="flex items-center gap-2 text-xs">
            <Globe className="w-4 h-4 text-[#A8843E]" />
            <span className="text-[#747780]">Destination:</span>
            <select
              value={customer.country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#EAE3D5] bg-white text-xs font-medium text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
            >
              {WORLD_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Checkout Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: CUSTOMER ADDRESS & SHIPPING METHOD */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Customer Contact & Shipping Address */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
                <h2 className="font-serif text-xl text-[#1F2022] font-medium flex items-center gap-2">
                  <span>1. Shipping Destination & Contact</span>
                </h2>
                <span className="text-[11px] text-emerald-700 font-medium">Worldwide Insured Express Delivery</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victoria"
                    value={customer.firstName}
                    onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sterling"
                    value={customer.lastName}
                    onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Email Address (for DHL Tracking) *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@example.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Phone (for Delivery Signature) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 555-0192 / +44 7911..."
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street name and building number"
                  value={customer.address1}
                  onChange={(e) => setCustomer({ ...customer, address1: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Apartment, Suite, Unit (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Apt 14B"
                  value={customer.address2}
                  onChange={(e) => setCustomer({ ...customer, address2: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="City / Town"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                  />
                </div>

                {/* State / Province Dynamic Field */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">
                    {customer.country === 'US' ? 'State *' : (customer.country === 'CA' ? 'Province *' : 'State / Province / Region')}
                  </label>
                  {customer.country === 'US' ? (
                    <select
                      value={customer.state}
                      onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                    >
                      {US_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  ) : customer.country === 'CA' ? (
                    <select
                      value={customer.state}
                      onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                    >
                      {CANADIAN_PROVINCES.map((prov) => (
                        <option key={prov.code} value={prov.code}>{prov.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder="e.g. Greater London, Dubai, etc."
                      value={customer.state}
                      onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">
                    {customer.country === 'US' ? 'ZIP Code *' : 'Postal Code *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Postal / ZIP code"
                    value={customer.postalCode}
                    onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                  />
                </div>
              </div>

              {/* Origin disclosure */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] flex items-center gap-2.5 text-[11px] text-[#575A61]">
                <Plane className="w-4 h-4 text-[#A8843E] shrink-0" />
                <span>
                  Dispatched directly from our <strong>Surat Atelier, India</strong>. Insured door-to-door transit via DHL Express / FedEx Air.
                </span>
              </div>
            </div>

            {/* Step 2: Shipping Method Selection */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
                <h2 className="font-serif text-xl text-[#1F2022] font-medium flex items-center gap-2">
                  <span>2. Delivery Courier Method</span>
                </h2>
                <span className="text-[11px] text-[#747780]">Air Express</span>
              </div>

              <div className="space-y-3">
                <label
                  className={`p-4 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                    shippingMethod === 'express' ? 'border-[#C5A059] bg-[#FAF8F5]' : 'border-[#EAE3D5] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shippingOption"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="mt-0.5 accent-[#A8843E]"
                    />
                    <div>
                      <strong className="text-xs text-[#1F2022] block font-semibold">
                        DHL Express Worldwide / FedEx Priority Air
                      </strong>
                      <span className="text-[11px] text-[#747780] block mt-0.5">
                        3–5 business days from Surat atelier. 100% insured with adult signature required.
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#1F2022]">
                    {isFreeShipping ? 'FREE' : formatPrice(currency === 'CAD' ? 32 : 24)}
                  </span>
                </label>

                <label
                  className={`p-4 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                    shippingMethod === 'armored' ? 'border-[#C5A059] bg-[#FAF8F5]' : 'border-[#EAE3D5] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shippingOption"
                      checked={shippingMethod === 'armored'}
                      onChange={() => setShippingMethod('armored')}
                      className="mt-0.5 accent-[#A8843E]"
                    />
                    <div>
                      <strong className="text-xs text-[#1F2022] block font-semibold">
                        Priority Armored Vault Air Cargo
                      </strong>
                      <span className="text-[11px] text-[#747780] block mt-0.5">
                        High-value discrete security escort, expedited airport customs clearance.
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#1F2022]">
                    {formatPrice(currency === 'CAD' ? 48 : 35)}
                  </span>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY & PAYMENT AUTHORIZATION */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EAE3D5] space-y-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
                <h2 className="font-serif text-xl text-[#1F2022] font-medium">Order Summary</h2>
                <span className="text-xs text-[#747780]">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
              </div>

              {/* Itemized pieces list */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3 text-xs py-2 border-b border-[#F5F1E8]">
                    <img
                      src={item.image || item.images?.[0]}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-[#EAE3D5] bg-[#FAF8F5]"
                    />
                    <div className="flex-1">
                      <strong className="block font-serif text-[#1F2022]">{item.name}</strong>
                      <span className="text-[10px] text-[#747780] block">
                        {item.metal} {item.size && `• Size ${item.size}`} • Qty {item.quantity}
                      </span>
                    </div>
                    <span className="font-semibold text-[#1F2022]">
                      {formatPrice((currency === 'CAD' ? Math.round(item.priceUSD * activeCurrency.rate) : item.priceUSD) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Promo Code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg uppercase tracking-wider focus:outline-none focus:border-[#C5A059] font-mono text-[#1F2022]"
                  />
                  <button
                    type="submit"
                    disabled={isApplyingCode || !discountCode}
                    className="px-4 py-2 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded-lg text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
                  >
                    {isApplyingCode ? 'Verifying...' : 'Apply'}
                  </button>
                </div>
                {discountData && (
                  <p className="text-xs text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Promo code {discountData.code} applied!</span>
                  </p>
                )}
                {discountError && (
                  <p className="text-xs text-rose-600">{discountError}</p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-2 pt-3 border-t border-[#F5F1E8] text-xs">
                <div className="flex justify-between text-[#575A61]">
                  <span>Item Subtotal</span>
                  <span>{activeCurrency.symbol}{subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promotion Discount</span>
                    <span>-{activeCurrency.symbol}{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#575A61]">
                  <span>Insured International Air Freight</span>
                  <span>{shippingFee === 0 ? 'FREE' : `${activeCurrency.symbol}${shippingFee}`}</span>
                </div>

                <div className="flex justify-between text-[#575A61]">
                  <span>Export & Customs Clearance</span>
                  <span className="text-emerald-700 font-medium">Included (CSB-V Electronic Filing)</span>
                </div>

                {/* Total & Clear Currency Notice */}
                <div className="pt-3 border-t-2 border-[#EAE3D5] space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-lg font-semibold text-[#1F2022]">Total Due</span>
                    <div className="text-right">
                      <span className="font-serif text-2xl font-bold text-[#1F2022]">
                        {activeCurrency.symbol}{grandTotal.toLocaleString()}
                      </span>
                      <span className="block text-[10px] text-[#747780] font-mono">
                        Charged in {currency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Checkout Submit Button */}
              <button
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-all rounded-lg text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                <Lock className="w-4 h-4 text-[#C5A059]" />
                <span>{isProcessing ? 'Connecting to Payment Gateway...' : `Authorize Payment (${activeCurrency.symbol}${grandTotal.toLocaleString()} ${currency})`}</span>
              </button>

              {/* Trust Disclosures */}
              <div className="pt-2 text-center text-[10px] text-[#747780]">
                <p>Handcrafted in Surat, Gujarat, India &bull; Insured Worldwide Delivery</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
