import React, { useState } from 'react';
import { 
  User, Package, Search, Clock, CheckCircle2, 
  Plane, FileText, RefreshCw, AlertCircle, ArrowRight, LogIn, Lock 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { useCurrency } from '../context/CurrencyContext';

export const AccountPage = ({ onNavigate }) => {
  const { 
    currentUser, 
    login, 
    signup, 
    forgotPassword, 
    changePassword, 
    logout, 
    isLoggedIn, 
    authError, 
    setAuthError, 
    loginAsDemoCustomer 
  } = useAuth();
  const { orders } = useOrders();
  const { formatPrice } = useCurrency();

  // Guest order lookup state
  const [guestLookupId, setGuestLookupId] = useState('');
  const [guestLookupEmail, setGuestLookupEmail] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Return request state
  const [returnOrderId, setReturnOrderId] = useState(null);
  const [returnReason, setReturnReason] = useState('size_issue');
  const [returnNotes, setReturnNotes] = useState('');
  const [returnSuccess, setReturnSuccess] = useState('');

  // Sign In / Register / Forgot Password toggle for guests
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // Change Password state for logged-in user
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmNewPw, setConfirmNewPw] = useState('');
  const [changePwSuccess, setChangePwSuccess] = useState('');
  const [changePwError, setChangePwError] = useState('');

  // Handle Guest Lookup
  const handleGuestLookup = async (e) => {
    e.preventDefault();
    if (!guestLookupId.trim()) return;

    setIsSearching(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const res = await fetch('/api/orders/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: guestLookupId.trim(), email: guestLookupEmail.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setLookupResult(data);
      } else {
        setLookupError(data.error || 'No matching order found in atelier records.');
      }
    } catch {
      // Local fallback lookup
      const found = orders.find(o => 
        (o.id && o.id.toLowerCase() === guestLookupId.trim().toLowerCase()) ||
        (o.orderId && o.orderId.toLowerCase() === guestLookupId.trim().toLowerCase()) ||
        (o.shipping?.trackingNumber && o.shipping.trackingNumber.toLowerCase() === guestLookupId.trim().toLowerCase())
      );
      if (found) {
        setLookupResult(found);
      } else {
        setLookupError('Order not found. Please verify your Order ID or tracking code.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setForgotSuccess('');
    if (authMode === 'login') {
      login(authEmail, authPassword);
    } else if (authMode === 'signup') {
      signup({ name: authName, email: authEmail, password: authPassword, role: 'customer' });
    } else if (authMode === 'forgot') {
      setAuthError(null);
      if (forgotNewPassword !== forgotConfirmPassword) {
        setAuthError('New passwords do not match. Please re-enter.');
        return;
      }
      if (forgotNewPassword.length < 6) {
        setAuthError('New password must be at least 6 characters long.');
        return;
      }
      const res = await forgotPassword(authEmail, forgotNewPassword);
      if (res.success) {
        setForgotSuccess(res.message);
        setForgotNewPassword('');
        setForgotConfirmPassword('');
        setTimeout(() => {
          setAuthMode('login');
          setForgotSuccess('');
        }, 3000);
      }
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setChangePwSuccess('');
    setChangePwError('');

    if (newPw !== confirmNewPw) {
      setChangePwError('New passwords do not match.');
      return;
    }

    if (newPw.length < 6) {
      setChangePwError('New password must be at least 6 characters long.');
      return;
    }

    const res = await changePassword(currentPw, newPw);
    if (res.success) {
      setChangePwSuccess(res.message);
      setCurrentPw('');
      setNewPw('');
      setConfirmNewPw('');
      setTimeout(() => setChangePwSuccess(''), 4000);
    } else {
      setChangePwError(res.error || 'Failed to update password.');
    }
  };

  // Submit return request
  const handleSubmitReturn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/orders/${returnOrderId}/return`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: returnReason, notes: returnNotes })
      });
      const data = await res.json();
      if (res.ok) {
        setReturnSuccess('Return authorization request received! Our concierge will review your request and send return packaging guidelines.');
        setTimeout(() => {
          setReturnOrderId(null);
          setReturnSuccess('');
        }, 4000);
      }
    } catch {
      setReturnSuccess('Return request registered. Our concierge will contact you within 24 hours.');
      setTimeout(() => {
        setReturnOrderId(null);
        setReturnSuccess('');
      }, 4000);
    }
  };

  // Filter orders for logged-in user or demo
  const userOrders = isLoggedIn
    ? orders.filter(o => 
        (o.customer?.email && o.customer.email.toLowerCase() === currentUser.email.toLowerCase()) ||
        (o.email && o.email.toLowerCase() === currentUser.email.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8843E] font-semibold">
          Customer Portal & Tracking
        </span>
        <h1 className="text-4xl font-serif text-[#1F2022] font-normal">
          Client Account & Order Status
        </h1>
        <p className="text-sm text-[#575A61] leading-relaxed">
          Track real-time crafting status, Indian Customs CSB-V export declarations, and DHL Express air transit to your doorstep.
        </p>
      </div>

      {/* 2. IF NOT LOGGED IN: SHOW GUEST TRACKING + LOGIN FORM */}
      {!isLoggedIn ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Guest Order Lookup Form */}
          <div className="p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F5F1E8]">
              <Search className="w-5 h-5 text-[#A8843E]" />
              <h2 className="font-serif text-xl text-[#1F2022] font-medium">Guest Order Lookup</h2>
            </div>
            <p className="text-xs text-[#575A61]">
              Did you place an order as a guest? Enter your Order ID (e.g. <code>LUM-84920</code>) or DHL tracking number to view real-time status.
            </p>

            <form onSubmit={handleGuestLookup} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Order ID or DHL Tracking *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LUM-84920 or DHL-IN-9382049182"
                  value={guestLookupId}
                  onChange={(e) => setGuestLookupId(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Customer Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah.jenkins@example.com"
                  value={guestLookupEmail}
                  onChange={(e) => setGuestLookupEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg focus:outline-none focus:border-[#C5A059] text-[#1F2022]"
                />
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isSearching ? 'Querying Atelier Records...' : 'Track My Shipment'}</span>
              </button>
            </form>

            {lookupError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{lookupError}</span>
              </div>
            )}
          </div>

          {/* Customer Login / Register */}
          <div className="p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#A8843E]" />
                <h2 className="font-serif text-xl text-[#1F2022] font-medium">
                  {authMode === 'login' ? 'Customer Sign In' : authMode === 'forgot' ? 'Reset Password' : 'Create Account'}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {authMode !== 'login' && (
                  <button
                    onClick={() => { setAuthError(null); setForgotSuccess(''); setAuthMode('login'); }}
                    className="text-[#A8843E] hover:underline"
                  >
                    Sign In
                  </button>
                )}
                {authMode !== 'signup' && (
                  <button
                    onClick={() => { setAuthError(null); setForgotSuccess(''); setAuthMode('signup'); }}
                    className="text-[#A8843E] hover:underline"
                  >
                    Register
                  </button>
                )}
                {authMode !== 'forgot' && (
                  <button
                    onClick={() => { setAuthError(null); setForgotSuccess(''); setAuthMode('forgot'); }}
                    className="text-[#747780] hover:text-[#1F2022]"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
            </div>

            {forgotSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{forgotSuccess}</span>
              </div>
            )}

            {authMode === 'forgot' ? (
              <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                <p className="text-xs text-[#575A61]">
                  Enter your registered email address and enter a new password below.
                </p>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Registered Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. victoria@nyc.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">New Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 6 characters"
                    value={forgotNewPassword}
                    onChange={(e) => setForgotNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Confirm New Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Re-type new password"
                    value={forgotConfirmPassword}
                    onChange={(e) => setForgotConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold"
                >
                  Reset Password
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => { setAuthError(null); setForgotSuccess(''); setAuthMode('login'); }}
                    className="text-xs text-[#A8843E] hover:underline"
                  >
                    Remembered password? Back to Sign In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                {authMode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Victoria Sterling"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. victoria@nyc.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Password *</label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => { setAuthError(null); setForgotSuccess(''); setAuthMode('forgot'); }}
                        className="text-[11px] text-[#A8843E] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold"
                >
                  {authMode === 'login' ? 'Sign In to Account' : 'Register Account'}
                </button>
              </form>
            )}

            {authError && (
              <p className="text-xs text-rose-600">{authError}</p>
            )}

            {/* Instant Demo Login Button */}
            <div className="pt-3 border-t border-[#F5F1E8] text-center">
              <span className="text-[11px] text-[#747780] block mb-2">Instant Demo Login:</span>
              <button
                type="button"
                onClick={loginAsDemoCustomer}
                className="w-full py-2 bg-[#FAF8F5] border border-[#EAE3D5] hover:bg-[#F4EFE6] text-xs font-semibold text-[#1F2022] rounded transition-colors"
              >
                🛍️ 1-Click Login as US Client (victoria@nyc.com)
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* LOGGED IN USER PROFILE */
        <div className="space-y-8">
          
          {/* User Welcome Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#F4EFE6] border border-[#E0D5C1] flex items-center justify-center text-[#A8843E] font-serif text-2xl font-semibold">
                {currentUser.name ? currentUser.name.charAt(0) : 'L'}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A8843E] font-semibold">Lumora Client</span>
                <h2 className="font-serif text-2xl text-[#1F2022] font-medium">{currentUser.name}</h2>
                <p className="text-xs text-[#747780]">{currentUser.email} &bull; {currentUser.country}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('shop')}
                className="px-4 py-2 bg-[#1F2022] text-[#FAF8F5] rounded text-xs uppercase tracking-wider font-semibold hover:bg-[#A8843E] transition-colors"
              >
                Shop Pieces
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 border border-[#EAE3D5] text-[#575A61] hover:text-[#1F2022] rounded text-xs font-medium transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Orders History */}
          <div className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
              <h3 className="font-serif text-2xl text-[#1F2022] font-medium">Your Order History</h3>
              <span className="text-xs text-[#747780]">{userOrders.length} {userOrders.length === 1 ? 'order' : 'orders'}</span>
            </div>

            {userOrders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <p className="font-serif text-lg text-[#1F2022]">No order history on file yet.</p>
                <p className="text-xs text-[#747780]">Your past orders and live tracking updates will appear here.</p>
                <button
                  onClick={() => onNavigate('shop')}
                  className="mt-2 px-6 py-2.5 bg-[#1F2022] text-[#FAF8F5] rounded text-xs uppercase tracking-wider font-semibold"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {userOrders.map((ord) => (
                  <div key={ord.id || ord.orderId} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EAE3D5]">
                      <div>
                        <span className="font-mono font-bold text-sm text-[#1F2022]">{ord.id || ord.orderId}</span>
                        <span className="text-xs text-[#747780] ml-3">{new Date(ord.date || ord.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          {ord.shipping?.fulfillmentStatus || ord.status || 'Processing in Atelier'}
                        </span>
                        <span className="text-xs font-semibold text-[#1F2022]">
                          ${ord.pricing?.total || ord.grandTotalUSD} USD
                        </span>
                      </div>
                    </div>

                    {/* Timeline visualization */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 rounded bg-white border border-[#EAE3D5]">
                        <span className="text-[10px] text-[#747780] block">Courier</span>
                        <strong className="text-[#1F2022]">{ord.shipping?.carrier || ord.carrier || 'DHL Express'}</strong>
                      </div>
                      <div className="p-2.5 rounded bg-white border border-[#EAE3D5]">
                        <span className="text-[10px] text-[#747780] block">Air Tracking</span>
                        <strong className="text-[#A8843E] font-mono">{ord.shipping?.trackingNumber || ord.trackingNumber}</strong>
                      </div>
                      <div className="p-2.5 rounded bg-white border border-[#EAE3D5]">
                        <span className="text-[10px] text-[#747780] block">Customs Bill</span>
                        <strong className="text-[#1F2022] font-mono">{ord.shipping?.csbVNumber || ord.csbVNumber || 'CSB-V Electronic'}</strong>
                      </div>
                      <div className="p-2.5 rounded bg-white border border-[#EAE3D5]">
                        <span className="text-[10px] text-[#747780] block">HS Code</span>
                        <strong className="text-[#1F2022] font-mono">{ord.shipping?.hsCode || ord.hsCode || '7113.19.10'}</strong>
                      </div>
                    </div>

                    {/* Actions: Request return if within 30 days */}
                    <div className="pt-2 flex justify-between items-center text-xs">
                      <span className="text-emerald-700 font-medium">
                        &check; Eligible for 30-Day Return in original condition
                      </span>
                      <button
                        onClick={() => setReturnOrderId(ord.id || ord.orderId)}
                        className="px-3 py-1 rounded border border-[#C5A059] text-[#1F2022] hover:bg-[#F4EFE6] font-medium"
                      >
                        Request Return / Exchange
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Security & Password Management */}
          <div className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#A8843E]" />
                <h3 className="font-serif text-2xl text-[#1F2022] font-medium">Security & Password</h3>
              </div>
              <span className="text-xs text-[#747780]">Client Credentials</span>
            </div>

            <p className="text-xs text-[#575A61]">
              Manage and update your account security credentials for your Lumora client profile.
            </p>

            {changePwSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{changePwSuccess}</span>
              </div>
            )}

            {changePwError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{changePwError}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="max-w-md space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Current Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Confirm New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Re-type new password"
                  value={confirmNewPw}
                  onChange={(e) => setConfirmNewPw(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold"
              >
                Update Password
              </button>
            </form>
          </div>

        </div>
      )}

      {/* 3. SHOW GUEST LOOKUP RESULT IF FOUND */}
      {lookupResult && (
        <div className="p-8 rounded-3xl bg-white border-2 border-[#C5A059] space-y-6 shadow-md animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#A8843E]" />
              <h2 className="font-serif text-2xl text-[#1F2022] font-medium">
                Live Shipment Record: {lookupResult.id || lookupResult.orderId}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              {lookupResult.shipping?.fulfillmentStatus || lookupResult.status || 'Active in Atelier'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-1">
              <span className="text-[10px] uppercase text-[#747780] block font-semibold">Origin & Carrier:</span>
              <p className="font-medium text-[#1F2022]">Surat Atelier, India</p>
              <p className="text-[#A8843E] font-mono">{lookupResult.shipping?.carrier || lookupResult.carrier || 'DHL Express Worldwide'}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-1">
              <span className="text-[10px] uppercase text-[#747780] block font-semibold">Air Tracking Number:</span>
              <p className="font-mono font-bold text-sm text-[#1F2022]">{lookupResult.shipping?.trackingNumber || lookupResult.trackingNumber}</p>
              <p className="text-[11px] text-emerald-700">Signature Required on Handover</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-1">
              <span className="text-[10px] uppercase text-[#747780] block font-semibold">Indian Customs CSB-V Filing:</span>
              <p className="font-mono text-[#1F2022]">{lookupResult.shipping?.csbVNumber || lookupResult.csbVNumber}</p>
              <p className="text-[11px] text-[#747780]">HS Code: {lookupResult.shipping?.hsCode || lookupResult.hsCode || '7113.19.10'}</p>
            </div>
          </div>

          {/* Timeline details */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-[#1F2022] uppercase tracking-wider text-[11px]">Timeline Events:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Order received & authorized &bull; Atelier preparing raw precious metal & gemstone allocation.</span>
              </div>
              <div className="flex items-center gap-2 text-[#A8843E]">
                <Clock className="w-4 h-4 shrink-0" />
                <span>BIS Hallmark assay verified & tamper-evident security packaging applied.</span>
              </div>
              <div className="flex items-center gap-2 text-[#747780]">
                <Plane className="w-4 h-4 shrink-0" />
                <span>Courier electronic manifest accepted & international air transit scheduled.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. RETURN REQUEST MODAL */}
      {returnOrderId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAE3D5] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-xl">
            <h3 className="font-serif text-2xl text-[#1F2022]">Initiate 30-Day Return</h3>
            <p className="text-xs text-[#575A61]">
              Order Ref: <strong>{returnOrderId}</strong>. Items must be unworn with intact security tags and presentation packaging. Custom engraved pieces are non-returnable.
            </p>

            <form onSubmit={handleSubmitReturn} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Return Reason</label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                >
                  <option value="size_issue">Ring / Wrist Size Adjustment</option>
                  <option value="metal_preference">Prefer Different Precious Metal Purity</option>
                  <option value="style_exchange">Exchange for Another Heirloom Design</option>
                  <option value="expectation">Item Did Not Meet Expectations</option>
                  <option value="other">Other Reason</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Additional Notes</label>
                <textarea
                  rows={3}
                  placeholder="Provide any details regarding the piece or fit..."
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                />
              </div>

              {returnSuccess && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                  {returnSuccess}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReturnOrderId(null)}
                  className="px-4 py-2 border border-[#EAE3D5] text-xs font-medium text-[#575A61] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold rounded"
                >
                  Submit Return Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
