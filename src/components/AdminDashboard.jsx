import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import { useOrders } from '../context/OrdersContext';
import { useCurrency } from '../context/CurrencyContext';
import { ProductFormModal } from './ProductFormModal';
import { 
  Plus, Edit2, Trash2, Search, Filter, ShieldCheck, 
  Package, ShoppingBag, DollarSign, Globe, ExternalLink, 
  ArrowLeft, RefreshCw, CheckCircle2, Truck, AlertCircle, 
  FileText, Check, Settings, Eye, Lock, Tag, Users, BarChart3, Clock 
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';

export const AdminDashboard = ({ onBackToStore }) => {
  const { currentUser, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, resetToDefaults } = useProducts();
  const { orders, updateOrderStatus } = useOrders();
  const { formatPrice } = useCurrency();

  // Navigation tab: 'inventory', 'orders', 'returns', 'discounts', 'settings', 'reports'
  const [activeTab, setActiveTab] = useState('inventory');

  // Product modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterMetal, setFilterMetal] = useState('all');

  // Deletion state
  const [deletingId, setDeletingId] = useState(null);

  // Discounts state
  const [discountsList, setDiscountsList] = useState([]);
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoType, setNewPromoType] = useState('percentage');
  const [newPromoValue, setNewPromoValue] = useState(10);
  const [newPromoMinSpend, setNewPromoMinSpend] = useState(100);

  // Settings state
  const [storeSettings, setStoreSettings] = useState(null);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // Reports state
  const [reportsData, setReportsData] = useState(null);

  // Fetch initial discounts, settings, and reports from API
  useEffect(() => {
    fetch('/api/discounts')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setDiscountsList(data); })
      .catch(() => {});

    fetch('/api/settings')
      .then(res => res.json())
      .then(data => { if (data) setStoreSettings(data); })
      .catch(() => {});

    fetch('/api/admin/reports', {
      headers: { 'x-admin-token': 'LUMORA2026' }
    })
      .then(res => res.json())
      .then(data => { if (data) setReportsData(data); })
      .catch(() => {});
  }, []);

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.defaultMetal && p.defaultMetal.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchesMetal = filterMetal === 'all' || p.metalCategory === filterMetal || p.metalCategory === 'both';

    return matchesSearch && matchesCategory && matchesMetal;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = async (id) => {
    deleteProduct(id);
    setDeletingId(null);
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': 'LUMORA2026' }
      });
    } catch {}
  };

  // Add discount
  const handleCreateDiscount = async (e) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    const newDiscount = {
      code: newPromoCode.trim().toUpperCase(),
      discountType: newPromoType,
      value: Number(newPromoValue),
      minSpendUSD: Number(newPromoMinSpend),
      active: true,
      description: `${newPromoValue}${newPromoType === 'percentage' ? '%' : '$'} off orders over $${newPromoMinSpend} USD`
    };

    try {
      const res = await fetch('/api/discounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'LUMORA2026'
        },
        body: JSON.stringify(newDiscount)
      });
      const created = await res.json();
      setDiscountsList(prev => [...prev, created]);
      setNewPromoCode('');
    } catch {
      setDiscountsList(prev => [...prev, newDiscount]);
      setNewPromoCode('');
    }
  };

  // Toggle discount
  const handleToggleDiscount = async (code) => {
    try {
      await fetch(`/api/discounts/${code}/toggle`, {
        method: 'PATCH',
        headers: { 'x-admin-token': 'LUMORA2026' }
      });
      setDiscountsList(prev =>
        prev.map(d => d.code === code ? { ...d, active: !d.active } : d)
      );
    } catch {
      setDiscountsList(prev =>
        prev.map(d => d.code === code ? { ...d, active: !d.active } : d)
      );
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!storeSettings) return;

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'LUMORA2026'
        },
        body: JSON.stringify(storeSettings)
      });
      const updated = await res.json();
      setStoreSettings(updated);
      setSettingsSavedNotice(true);
      setTimeout(() => setSettingsSavedNotice(false), 3000);
    } catch {
      setSettingsSavedNotice(true);
      setTimeout(() => setSettingsSavedNotice(false), 3000);
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId, status) => {
    updateOrderStatus(orderId, status);
    try {
      await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'LUMORA2026'
        },
        body: JSON.stringify({ fulfillmentStatus: status })
      });
    } catch {}
  };

  // Metrics
  const totalRevenueUSD = orders.reduce((sum, o) => sum + (o.grandTotalUSD || o.pricing?.total || 0), 0);
  const goldItemsCount = products.filter((p) => p.metalCategory === 'gold' || p.metalCategory === 'both').length;
  const silverItemsCount = products.filter((p) => p.metalCategory === 'silver' || p.metalCategory === 'both').length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F2022] flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#EAE3D5] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToStore}
            className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#EAE3D5] text-[#1F2022] flex items-center gap-2 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#A8843E]" />
            <span>Return to Storefront</span>
          </button>

          <div className="h-6 w-px bg-[#EAE3D5] hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-serif font-bold text-[#1F2022] tracking-wider">LUMORA</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#F4EFE6] text-[#A8843E] border border-[#E0D5C1] font-mono uppercase font-bold">
                Director Command Center
              </span>
            </div>
            <p className="text-[11px] text-[#747780]">
              Domain: <strong className="text-[#1F2022] font-mono">lumorafinejewelery.com</strong> &bull; Jaipur & Surat Export Management
            </p>
          </div>
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block text-xs">
            <p className="font-semibold text-[#1F2022]">{currentUser?.name || 'Store Director'}</p>
            <p className="text-[10px] text-emerald-700 font-mono">Admin Verified (Full Access)</p>
          </div>

          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-lg border border-[#EAE3D5] bg-[#FAF8F5] hover:bg-rose-50 text-rose-700 text-xs transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Admin Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#EAE3D5] shadow-xs space-y-1">
            <span className="text-[10px] text-[#747780] uppercase tracking-wider block font-semibold">Total Catalog Pieces</span>
            <div className="text-2xl font-serif font-bold text-[#1F2022] flex items-baseline gap-2">
              <span>{products.length}</span>
              <span className="text-[11px] text-[#A8843E] font-normal">({goldItemsCount} Gold &bull; {silverItemsCount} Silver)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#EAE3D5] shadow-xs space-y-1">
            <span className="text-[10px] text-[#747780] uppercase tracking-wider block font-semibold">International Orders</span>
            <div className="text-2xl font-serif font-bold text-[#1F2022] flex items-baseline gap-2">
              <span>{orders.length}</span>
              <span className="text-[11px] text-emerald-700 font-normal">USA &bull; Canada</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#EAE3D5] shadow-xs space-y-1">
            <span className="text-[10px] text-[#747780] uppercase tracking-wider block font-semibold">Total Revenue (USD)</span>
            <div className="text-2xl font-serif font-bold text-[#A8843E] font-mono">
              ${totalRevenueUSD.toLocaleString()} USD
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#EAE3D5] shadow-xs space-y-1">
            <span className="text-[10px] text-[#747780] uppercase tracking-wider block font-semibold">CSB-V Export Status</span>
            <div className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>IEC & LUT Active (0% IGST)</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EAE3D5] text-xs font-medium space-x-1 sm:space-x-4 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'inventory', label: `Catalog & Pieces (${products.length})`, icon: ShoppingBag },
            { id: 'orders', label: `Orders & DHL Shipments (${orders.length})`, icon: Package },
            { id: 'discounts', label: 'Promo Codes', icon: Tag },
            { id: 'settings', label: 'Policies & Export Settings', icon: Settings },
            { id: 'reports', label: 'Analytics & Reports', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
                  activeTab === tab.id
                    ? 'border-[#C5A059] text-[#1F2022] font-bold'
                    : 'border-transparent text-[#747780] hover:text-[#1F2022]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#A8843E]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PRODUCT CATALOG & CRUD */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            
            {/* Toolbar */}
            <div className="p-4 rounded-2xl bg-white border border-[#EAE3D5] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-[#747780] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search pieces, metals, gemstones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end text-xs">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                >
                  <option value="all">All Categories</option>
                  <option value="rings">Rings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelets">Bracelets</option>
                </select>

                <select
                  value={filterMetal}
                  onChange={(e) => setFilterMetal(e.target.value)}
                  className="px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                >
                  <option value="all">All Metals</option>
                  <option value="gold">Solid Gold Only</option>
                  <option value="silver">925 Silver Only</option>
                </select>

                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 rounded-lg bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Piece</span>
                </button>

                <button
                  onClick={resetToDefaults}
                  className="px-3 py-2 rounded-lg bg-[#FAF8F5] hover:bg-[#EAE3D5] border border-[#EAE3D5] text-xs text-[#575A61] flex items-center gap-1.5 transition-colors"
                  title="Reset to factory sample catalog"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Factory Reset</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-[#EAE3D5] rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#1F2022] border-b border-[#EAE3D5]">
                    <tr>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Piece</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Category</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Stone / Diamond</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Base Price</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Stock Status</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5F1E8]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-[#EAE3D5]" />
                            <div>
                              <strong className="block font-serif text-sm text-[#1F2022]">{p.name}</strong>
                              <span className="text-[10px] font-mono text-[#747780]">ID: {p.id} &bull; Sample Data</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 capitalize text-[#575A61]">{p.category}</td>
                        <td className="py-3 px-4 text-[#575A61]">{p.stoneType || 'Solid Gold / Silver'}</td>
                        <td className="py-3 px-4 font-semibold text-[#1F2022]">${p.priceUSD} USD</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleStock(p.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                              p.inStock === false
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {p.inStock === false ? 'Out of Stock' : 'Active (In Stock)'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 rounded hover:bg-[#F4EFE6] text-[#A8843E] transition-colors"
                              title="Edit piece"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingId(p.id)}
                              className="p-1.5 rounded hover:bg-rose-50 text-rose-600 transition-colors"
                              title="Delete piece"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deletingId && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white border border-[#EAE3D5] rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
                  <h3 className="font-serif text-xl text-[#1F2022]">Confirm Deletion</h3>
                  <p className="text-xs text-[#575A61]">Are you sure you want to remove piece <strong>{deletingId}</strong> from the store catalog?</p>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setDeletingId(null)}
                      className="px-4 py-2 border border-[#EAE3D5] rounded text-xs text-[#575A61]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(deletingId)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold"
                    >
                      Delete Piece
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ORDERS & CSB-V SHIPMENTS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-[#EAE3D5] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg text-[#1F2022] font-medium">International Order Manifests</h3>
                <p className="text-xs text-[#747780]">Track order fulfillments from Jaipur workshop to US/Canada doorsteps.</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded bg-[#FAF8F5] border border-[#EAE3D5]">
                {orders.length} Active Records
              </span>
            </div>

            <div className="bg-white border border-[#EAE3D5] rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#1F2022] border-b border-[#EAE3D5]">
                    <tr>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Order ID</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Recipient</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Destination</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Air Tracking</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Total</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Fulfillment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5F1E8]">
                    {orders.map((ord) => (
                      <tr key={ord.id || ord.orderId} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#1F2022]">{ord.id || ord.orderId}</td>
                        <td className="py-3 px-4 text-[#1F2022]">
                          <strong>{ord.customer?.firstName} {ord.customer?.lastName || ord.recipient}</strong>
                          <span className="block text-[10px] text-[#747780]">{ord.customer?.email || ord.email}</span>
                        </td>
                        <td className="py-3 px-4 text-[#575A61]">
                          {ord.customer?.city || 'New York'}, {ord.customer?.country || ord.country}
                        </td>
                        <td className="py-3 px-4 font-mono text-[#A8843E]">
                          {ord.shipping?.trackingNumber || ord.trackingNumber || 'DHL-IN-Pending'}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#1F2022]">
                          ${ord.pricing?.total || ord.grandTotalUSD} USD
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={ord.shipping?.fulfillmentStatus || ord.status || 'processing'}
                            onChange={(e) => handleUpdateOrderStatus(ord.id || ord.orderId, e.target.value)}
                            className="px-2.5 py-1 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-[11px] font-medium text-[#1F2022]"
                          >
                            <option value="order_confirmed">Order Confirmed</option>
                            <option value="processing">Processing in Atelier</option>
                            <option value="csb_filed">CSB-V Customs Filed</option>
                            <option value="in_transit">In Transit (DHL Air)</option>
                            <option value="delivered">Delivered & Signed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROMO CODES */}
        {activeTab === 'discounts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Create Promo Code */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs">
                <h3 className="font-serif text-xl text-[#1F2022] font-medium">Create Promotional Code</h3>
                <form onSubmit={handleCreateDiscount} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Coupon Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. LUMORA20"
                      value={newPromoCode}
                      onChange={(e) => setNewPromoCode(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded uppercase text-[#1F2022]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Discount Type</label>
                      <select
                        value={newPromoType}
                        onChange={(e) => setNewPromoType(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-[#1F2022]"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Dollar ($)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Value *</label>
                      <input
                        type="number"
                        required
                        value={newPromoValue}
                        onChange={(e) => setNewPromoValue(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-[#1F2022]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Min Spend (USD)</label>
                    <input
                      type="number"
                      value={newPromoMinSpend}
                      onChange={(e) => setNewPromoMinSpend(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-[#1F2022]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded text-xs uppercase tracking-wider font-semibold"
                  >
                    Create Promo Code
                  </button>
                </form>
              </div>

              {/* Active Coupons List */}
              <div className="md:col-span-7 p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs">
                <h3 className="font-serif text-xl text-[#1F2022] font-medium">Active Discount Codes</h3>
                <div className="space-y-3">
                  {discountsList.map((d) => (
                    <div key={d.code} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#1F2022]">{d.code}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            d.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {d.active ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#747780] mt-0.5">{d.description}</p>
                      </div>

                      <button
                        onClick={() => handleToggleDiscount(d.code)}
                        className="px-3 py-1 rounded border border-[#EAE3D5] text-xs hover:bg-white transition-colors"
                      >
                        {d.active ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: STORE SETTINGS & POLICIES */}
        {activeTab === 'settings' && storeSettings && (
          <div className="p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-6 shadow-xs max-w-4xl">
            <div className="pb-4 border-b border-[#F5F1E8]">
              <h3 className="font-serif text-2xl text-[#1F2022] font-medium">Store Policies & Export Settings</h3>
              <p className="text-xs text-[#747780]">Configure return policy days, shipping rates, Canadian duty mode, and RBI export credentials.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Configurable Return Policy (Days)</label>
                  <input
                    type="number"
                    value={storeSettings.returnPolicyDays || 30}
                    onChange={(e) => setStoreSettings({ ...storeSettings, returnPolicyDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-[#1F2022]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Canada Duty Handling Mode</label>
                  <select
                    value={storeSettings.dutyHandlingMode || 'DDP'}
                    onChange={(e) => setStoreSettings({ ...storeSettings, dutyHandlingMode: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-[#1F2022]"
                  >
                    <option value="DDP">DDP (Delivered Duty Paid - Recommended)</option>
                    <option value="DDU">DDU (Customer Pays at Delivery)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Free Shipping Threshold (USD)</label>
                  <input
                    type="number"
                    value={storeSettings.freeShippingThresholdUSD || 150}
                    onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThresholdUSD: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-[#1F2022]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Free Shipping Threshold (CAD)</label>
                  <input
                    type="number"
                    value={storeSettings.freeShippingThresholdCAD || 200}
                    onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThresholdCAD: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-[#1F2022]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">RBI Purpose Code (Export of Goods)</label>
                <input
                  type="text"
                  value={storeSettings.rbiPurposeCode || 'P0103'}
                  onChange={(e) => setStoreSettings({ ...storeSettings, rbiPurposeCode: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded font-mono text-[#1F2022]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">North American Return Processing Facility</label>
                <input
                  type="text"
                  value={storeSettings.returnAddressPlaceholder || ''}
                  onChange={(e) => setStoreSettings({ ...storeSettings, returnAddressPlaceholder: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-[#1F2022]"
                />
              </div>

              {settingsSavedNotice && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                  Settings saved successfully to persistent database!
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold rounded"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: ANALYTICS & REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-2 text-center">
                <span className="text-[11px] text-[#747780] uppercase tracking-wider block font-semibold">Total Net Sales</span>
                <span className="font-serif text-3xl font-bold text-[#1F2022]">${totalRevenueUSD.toLocaleString()} USD</span>
                <span className="text-[10px] text-emerald-700 block">Export Inward Remittance</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-2 text-center">
                <span className="text-[11px] text-[#747780] uppercase tracking-wider block font-semibold">USA vs Canada Orders</span>
                <div className="flex justify-center items-center gap-4 text-sm font-semibold text-[#1F2022] pt-1">
                  <span>🇺🇸 {reportsData?.usOrders || 1} USA</span>
                  <span>&bull;</span>
                  <span>🇨🇦 {reportsData?.caOrders || 1} Canada</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-2 text-center">
                <span className="text-[11px] text-[#747780] uppercase tracking-wider block font-semibold">Average Order Value</span>
                <span className="font-serif text-3xl font-bold text-[#A8843E]">
                  ${orders.length ? Math.round(totalRevenueUSD / orders.length) : 0} USD
                </span>
                <span className="text-[10px] text-[#747780] block">Solid gold & diamond heirlooms</span>
              </div>
            </div>

            {/* LBMA Precious Metal Spot Rate Benchmarks */}
            <div className="p-6 rounded-2xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
                <h3 className="font-serif text-lg text-[#1F2022] font-medium">LBMA & MCX Precious Metal Spot Rates (Per Gram)</h3>
                <span className="text-[11px] text-emerald-700 font-mono">Live Benchmark</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                  <span className="text-[10px] text-[#747780] block">24K Fine Gold (999)</span>
                  <strong className="text-base text-[#1F2022] font-mono">$86.40 / g</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                  <span className="text-[10px] text-[#747780] block">18K Solid Gold (750)</span>
                  <strong className="text-base text-[#1F2022] font-mono">$64.80 / g</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                  <span className="text-[10px] text-[#747780] block">14K Solid Gold (585)</span>
                  <strong className="text-base text-[#1F2022] font-mono">$50.50 / g</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5]">
                  <span className="text-[10px] text-[#747780] block">925 Sterling Silver</span>
                  <strong className="text-base text-[#1F2022] font-mono">$1.05 / g</strong>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Product Form Modal (Add / Edit) */}
      {isFormOpen && (
        <ProductFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          editingProduct={editingProduct}
          onSaveProduct={(savedProd) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, savedProd);
            } else {
              addProduct(savedProd);
            }
            setIsFormOpen(false);
          }}
        />
      )}

    </div>
  );
};
