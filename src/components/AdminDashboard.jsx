import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import { useOrders } from '../context/OrdersContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSettings, DEFAULT_CMS_SETTINGS } from '../context/SettingsContext';
import { ProductFormModal } from './ProductFormModal';
import { DomainSetupModal } from './DomainSetupModal';
import { 
  Plus, Edit2, Trash2, Search, Filter, ShieldCheck, 
  Package, ShoppingBag, DollarSign, Globe, ExternalLink, 
  ArrowLeft, RefreshCw, CheckCircle2, Truck, AlertCircle, 
  FileText, Check, Settings, Eye, Lock, Tag, Users, BarChart3, Clock,
  Sparkles, Image as ImageIcon, Sliders, Save, RotateCcw, Layout, Compass
} from 'lucide-react';
import { brandConfig } from '../data/brandConfig';

export const AdminDashboard = ({ onBackToStore }) => {
  const { currentUser, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, resetToDefaults } = useProducts();
  const { orders, updateOrderStatus } = useOrders();
  const { formatPrice } = useCurrency();
  const { settings, updateSettings, resetToFactoryDefaults, isSaving: isCmsSaving } = useSettings();

  // Navigation tab: 'cms', 'inventory', 'orders', 'discounts', 'settings', 'reports'
  const [activeTab, setActiveTab] = useState('cms');

  // CMS state
  const [cmsForm, setCmsForm] = useState(settings || DEFAULT_CMS_SETTINGS);
  const [cmsSavedToast, setCmsSavedToast] = useState(false);
  const [cmsSection, setCmsSection] = useState('hero'); // 'hero', 'categories', 'announcements', 'banner', 'gifting', 'trust', 'brand'
  const [domainModalOpen, setDomainModalOpen] = useState(false);

  useEffect(() => {
    if (settings) {
      setCmsForm(settings);
    }
  }, [settings]);

  const handleSaveCMS = async (e) => {
    if (e) e.preventDefault();
    await updateSettings(cmsForm);
    setCmsSavedToast(true);
    setTimeout(() => setCmsSavedToast(false), 4000);
  };

  const handleResetCMS = async () => {
    if (window.confirm('Reset all website headlines, photography URLs, and banners to factory brand defaults?')) {
      await resetToFactoryDefaults();
      setCmsSavedToast(true);
      setTimeout(() => setCmsSavedToast(false), 4000);
    }
  };

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

        {/* Profile, Domain Hub & Logout */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block text-xs">
            <p className="font-semibold text-[#1F2022]">{currentUser?.name || 'Store Director'}</p>
            <p className="text-[10px] text-emerald-700 font-mono">Admin Verified (Full Access)</p>
          </div>

          <button
            onClick={() => setDomainModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EAE3D5] bg-white hover:border-[#C5A059] text-xs font-mono text-[#1F2022] transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-[#A8843E]" />
            <span>DNS & Domain Hub</span>
          </button>

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
            { id: 'cms', label: 'Storefront CMS & Customizer', icon: Sparkles },
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

        {/* TAB 0: STOREFRONT CMS & LIVE CUSTOMIZER */}
        {activeTab === 'cms' && (
          <div className="space-y-6">
            
            {/* CMS Action Bar */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#A8843E]" />
                  <h2 className="font-serif text-2xl text-[#1F2022] font-medium">
                    Storefront CMS & Live Customizer
                  </h2>
                </div>
                <p className="text-xs text-[#575A61]">
                  Live-edit homepage banner, photography URLs, announcements, and trust disclosures across <span className="font-mono text-[#1F2022]">lumorafinejewelery.com</span>.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={onBackToStore}
                  className="px-4 py-2 rounded-lg border border-[#EAE3D5] bg-[#FAF8F5] hover:bg-[#F4EFE6] text-xs font-semibold text-[#1F2022] flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#A8843E]" />
                  <span>Preview Storefront</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetCMS}
                  className="px-4 py-2 rounded-lg border border-[#EAE3D5] bg-[#FAF8F5] hover:bg-rose-50 text-xs font-medium text-rose-700 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Factory Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveCMS}
                  disabled={isCmsSaving}
                  className="px-6 py-2 rounded-lg bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{isCmsSaving ? 'Saving Changes...' : 'Save All Website Changes'}</span>
                </button>
              </div>
            </div>

            {/* Notification Toast */}
            {cmsSavedToast && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  Website customized successfully! All headlines, photos, copy, and banners are updated live across the entire storefront.
                </span>
              </div>
            )}

            {/* CMS Section Switcher */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'hero', label: '🖼️ Hero Banner & Photos' },
                { id: 'categories', label: '💎 Category Circles & Photos' },
                { id: 'announcements', label: '📢 Announcement Bar' },
                { id: 'banner', label: '✨ Promo Banner & Lab Diamonds' },
                { id: 'gifting', label: '🎁 Gifting Section' },
                { id: 'trust', label: '🛡️ Trust Badges & Export' },
                { id: 'brand', label: '🏛️ Brand & Footer Contacts' }
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setCmsSection(sec.id)}
                  className={`px-4 py-2 rounded-xl border font-medium transition-all ${
                    cmsSection === sec.id
                      ? 'bg-[#1F2022] text-[#FAF8F5] border-[#1F2022] shadow-xs font-semibold'
                      : 'bg-white text-[#575A61] border-[#EAE3D5] hover:border-[#C5A059]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* SECTION 1: HERO BANNER & PHOTOS */}
            {cmsSection === 'hero' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-5 shadow-xs text-xs">
                  <div className="pb-3 border-b border-[#F5F1E8]">
                    <h3 className="font-serif text-xl text-[#1F2022] font-medium">Hero Headline, Copy & Buttons</h3>
                    <p className="text-[11px] text-[#747780]">Primary entrance section visible to all visiting customers.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Hero Top Badge Text</label>
                    <input
                      type="text"
                      value={cmsForm.heroBadge || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, heroBadge: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Main Headline</label>
                      <input
                        type="text"
                        value={cmsForm.heroTitle || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroTitle: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] font-serif text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Highlight Text (Italic Gold)</label>
                      <input
                        type="text"
                        value={cmsForm.heroTitleHighlight || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroTitleHighlight: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#A8843E] font-serif text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Hero Story & Description</label>
                    <textarea
                      rows={3}
                      value={cmsForm.heroDescription || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, heroDescription: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Hero Main Photograph URL</label>
                    <input
                      type="url"
                      value={cmsForm.heroImageUrl || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, heroImageUrl: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] font-mono text-[11px]"
                    />
                    {/* Quick Preset Buttons */}
                    <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="text-[#747780]">Presets:</span>
                      <button
                        type="button"
                        onClick={() => setCmsForm({ ...cmsForm, heroImageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80' })}
                        className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE3D5] hover:border-[#C5A059]"
                      >
                        Solitaire Ring
                      </button>
                      <button
                        type="button"
                        onClick={() => setCmsForm({ ...cmsForm, heroImageUrl: 'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=1200&q=80' })}
                        className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE3D5] hover:border-[#C5A059]"
                      >
                        Tennis Suite
                      </button>
                      <button
                        type="button"
                        onClick={() => setCmsForm({ ...cmsForm, heroImageUrl: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=80' })}
                        className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE3D5] hover:border-[#C5A059]"
                      >
                        Artisan Master
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#F5F1E8]">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-[#747780] font-medium">Card Piece Title</label>
                      <input
                        type="text"
                        value={cmsForm.heroCardTitle || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroCardTitle: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-[#747780] font-medium">Card Subtitle / Hallmark</label>
                      <input
                        type="text"
                        value={cmsForm.heroCardSubtitle || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroCardSubtitle: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-[#747780] font-medium">Card Price (USD)</label>
                      <input
                        type="number"
                        value={cmsForm.heroCardPrice || 420}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroCardPrice: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#F5F1E8]">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-[#747780] font-medium">Primary Button Label</label>
                      <input
                        type="text"
                        value={cmsForm.heroCtaPrimary || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroCtaPrimary: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-[#747780] font-medium">Secondary Button Label</label>
                      <input
                        type="text"
                        value={cmsForm.heroCtaSecondary || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroCtaSecondary: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Photo & Hero Stage Preview */}
                <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
                    <span className="text-xs uppercase tracking-wider text-[#A8843E] font-semibold">
                      Live Hero Preview
                    </span>
                    <span className="text-[10px] text-[#747780]">Instant Storefront Render</span>
                  </div>

                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#EAE3D5] shadow-lg bg-[#FAF8F5]">
                    <img
                      src={cmsForm.heroImageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#EAE3D5] shadow-sm text-left">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#A8843E] font-semibold block">Atelier Signature</span>
                          <h4 className="font-serif text-sm text-[#1F2022] font-medium">{cmsForm.heroCardTitle || 'Aura Solitaire Diamond Ring'}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-[#1F2022]">${cmsForm.heroCardPrice || 420} USD</span>
                          <span className="block text-[9px] text-[#747780]">{cmsForm.heroCardSubtitle || '14K Gold • BIS 585'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveCMS}
                    className="w-full py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Hero Section</span>
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 2: CATEGORY CIRCLES */}
            {cmsSection === 'categories' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-6 shadow-xs text-xs">
                <div className="pb-3 border-b border-[#F5F1E8] flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-[#1F2022] font-medium">Curated Fine Jewelry Category Circles</h3>
                    <p className="text-[11px] text-[#747780]">Customize the 6 circular categories and images displayed on the homepage.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveCMS}
                    className="px-4 py-2 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Categories</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(cmsForm.categoryPills || []).map((cat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#C5A059] shrink-0 bg-white shadow-2xs">
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[10px] uppercase text-[#A8843E] font-semibold block">Slot #{idx + 1}</span>
                          <input
                            type="text"
                            value={cat.name}
                            onChange={(e) => {
                              const copy = [...(cmsForm.categoryPills || [])];
                              copy[idx] = { ...copy[idx], name: e.target.value };
                              setCmsForm({ ...cmsForm, categoryPills: copy });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-[#EAE3D5] rounded text-xs font-semibold text-[#1F2022]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-[#747780] font-medium">Image URL</label>
                        <input
                          type="url"
                          value={cat.image}
                          onChange={(e) => {
                            const copy = [...(cmsForm.categoryPills || [])];
                            copy[idx] = { ...copy[idx], image: e.target.value };
                            setCmsForm({ ...cmsForm, categoryPills: copy });
                          }}
                          className="w-full px-2.5 py-1 bg-white border border-[#EAE3D5] rounded text-[11px] font-mono text-[#1F2022]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-[#747780] font-medium">Target Category Link</label>
                        <select
                          value={cat.id}
                          onChange={(e) => {
                            const copy = [...(cmsForm.categoryPills || [])];
                            copy[idx] = { ...copy[idx], id: e.target.value };
                            setCmsForm({ ...cmsForm, categoryPills: copy });
                          }}
                          className="w-full px-2.5 py-1 bg-white border border-[#EAE3D5] rounded text-xs text-[#1F2022]"
                        >
                          <option value="rings">Rings & Bands</option>
                          <option value="bracelets">Bracelets</option>
                          <option value="earrings">Earrings</option>
                          <option value="necklaces">Necklaces & Pendants</option>
                          <option value="shop">All Jewelry</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: ANNOUNCEMENT BAR */}
            {cmsSection === 'announcements' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-6 shadow-xs text-xs max-w-3xl">
                <div className="pb-3 border-b border-[#F5F1E8] flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-[#1F2022] font-medium">Top Announcement Bar Carousel</h3>
                    <p className="text-[11px] text-[#747780]">Configure the rotating banner at the very top of every page.</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cmsForm.announcementActive !== false}
                      onChange={(e) => setCmsForm({ ...cmsForm, announcementActive: e.target.checked })}
                      className="accent-[#C5A059] w-4 h-4 rounded"
                    />
                    <span className="font-semibold text-xs text-[#1F2022]">Enable Top Bar</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-2">
                    <span className="text-[10px] uppercase text-[#A8843E] font-semibold block">Message 1 (Jaipur & Surat Pricing)</span>
                    <input
                      type="text"
                      value={cmsForm.announcement1 || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, announcement1: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-[#EAE3D5] rounded text-xs text-[#1F2022]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Link Label"
                        value={cmsForm.announcement1Link || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, announcement1Link: e.target.value })}
                        className="px-3 py-1 bg-white border border-[#EAE3D5] rounded text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Target Page (e.g. about, shop)"
                        value={cmsForm.announcement1Page || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, announcement1Page: e.target.value })}
                        className="px-3 py-1 bg-white border border-[#EAE3D5] rounded text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-2">
                    <span className="text-[10px] uppercase text-[#A8843E] font-semibold block">Message 2 (Customs & Duties)</span>
                    <input
                      type="text"
                      value={cmsForm.announcement2 || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, announcement2: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-[#EAE3D5] rounded text-xs text-[#1F2022]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Link Label"
                        value={cmsForm.announcement2Link || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, announcement2Link: e.target.value })}
                        className="px-3 py-1 bg-white border border-[#EAE3D5] rounded text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Target Page (e.g. shipping)"
                        value={cmsForm.announcement2Page || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, announcement2Page: e.target.value })}
                        className="px-3 py-1 bg-white border border-[#EAE3D5] rounded text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-2">
                    <span className="text-[10px] uppercase text-[#A8843E] font-semibold block">Message 3 (Free Shipping & 30-Day Returns)</span>
                    <input
                      type="text"
                      value={cmsForm.announcement3 || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, announcement3: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-[#EAE3D5] rounded text-xs text-[#1F2022]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Link Label"
                        value={cmsForm.announcement3Link || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, announcement3Link: e.target.value })}
                        className="px-3 py-1 bg-white border border-[#EAE3D5] rounded text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Target Page (e.g. returns)"
                        value={cmsForm.announcement3Page || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, announcement3Page: e.target.value })}
                        className="px-3 py-1 bg-white border border-[#EAE3D5] rounded text-xs"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveCMS}
                  className="px-6 py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Announcement Bar</span>
                </button>
              </div>
            )}

            {/* SECTION 4: PROMOTIONAL BANNER & LAB DIAMONDS */}
            {cmsSection === 'banner' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs text-xs">
                  <div className="pb-3 border-b border-[#F5F1E8]">
                    <h3 className="font-serif text-xl text-[#1F2022] font-medium">Promotional Feature Banner & Lab Diamonds</h3>
                    <p className="text-[11px] text-[#747780]">Editorial educational banner showcasing your craftsmanship and certified diamonds.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Banner Badge</label>
                    <input
                      type="text"
                      value={cmsForm.bannerBadge || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, bannerBadge: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Banner Headline</label>
                    <input
                      type="text"
                      value={cmsForm.bannerTitle || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, bannerTitle: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs font-serif text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Banner Body Copy</label>
                    <textarea
                      rows={3}
                      value={cmsForm.bannerDescription || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, bannerDescription: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Banner Photograph URL</label>
                    <input
                      type="url"
                      value={cmsForm.bannerImageUrl || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, bannerImageUrl: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Button Label</label>
                    <input
                      type="text"
                      value={cmsForm.bannerButtonText || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, bannerButtonText: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg font-semibold"
                    />
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#F5F1E8]">
                    <span className="text-[11px] uppercase text-[#747780] font-semibold block">3 Pillar Feature Cards:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE3D5] space-y-1">
                        <input
                          type="text"
                          placeholder="Pillar 1 Title"
                          value={cmsForm.bannerFeature1Title || ''}
                          onChange={(e) => setCmsForm({ ...cmsForm, bannerFeature1Title: e.target.value })}
                          className="w-full font-semibold text-xs px-2 py-1 bg-white border border-[#EAE3D5] rounded"
                        />
                        <textarea
                          rows={2}
                          placeholder="Description"
                          value={cmsForm.bannerFeature1Desc || ''}
                          onChange={(e) => setCmsForm({ ...cmsForm, bannerFeature1Desc: e.target.value })}
                          className="w-full text-[10px] px-2 py-1 bg-white border border-[#EAE3D5] rounded"
                        />
                      </div>
                      <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE3D5] space-y-1">
                        <input
                          type="text"
                          placeholder="Pillar 2 Title"
                          value={cmsForm.bannerFeature2Title || ''}
                          onChange={(e) => setCmsForm({ ...cmsForm, bannerFeature2Title: e.target.value })}
                          className="w-full font-semibold text-xs px-2 py-1 bg-white border border-[#EAE3D5] rounded"
                        />
                        <textarea
                          rows={2}
                          placeholder="Description"
                          value={cmsForm.bannerFeature2Desc || ''}
                          onChange={(e) => setCmsForm({ ...cmsForm, bannerFeature2Desc: e.target.value })}
                          className="w-full text-[10px] px-2 py-1 bg-white border border-[#EAE3D5] rounded"
                        />
                      </div>
                      <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE3D5] space-y-1">
                        <input
                          type="text"
                          placeholder="Pillar 3 Title"
                          value={cmsForm.bannerFeature3Title || ''}
                          onChange={(e) => setCmsForm({ ...cmsForm, bannerFeature3Title: e.target.value })}
                          className="w-full font-semibold text-xs px-2 py-1 bg-white border border-[#EAE3D5] rounded"
                        />
                        <textarea
                          rows={2}
                          placeholder="Description"
                          value={cmsForm.bannerFeature3Desc || ''}
                          onChange={(e) => setCmsForm({ ...cmsForm, bannerFeature3Desc: e.target.value })}
                          className="w-full text-[10px] px-2 py-1 bg-white border border-[#EAE3D5] rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs">
                  <span className="text-xs uppercase tracking-wider text-[#A8843E] font-semibold block pb-2 border-b border-[#F5F1E8]">
                    Banner Photo Preview
                  </span>
                  <div className="aspect-square rounded-2xl overflow-hidden border border-[#EAE3D5] bg-[#FAF8F5]">
                    <img
                      src={cmsForm.bannerImageUrl || 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80'}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveCMS}
                    className="w-full py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Promo Banner</span>
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 5: GIFTING SECTION */}
            {cmsSection === 'gifting' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs text-xs max-w-2xl">
                <div className="pb-3 border-b border-[#F5F1E8]">
                  <h3 className="font-serif text-xl text-[#1F2022] font-medium">Curated Gifting Section Copy</h3>
                  <p className="text-[11px] text-[#747780]">Configure the titles for the budget-friendly gifting section.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Subtitle Badge</label>
                  <input
                    type="text"
                    value={cmsForm.giftSubtitle || ''}
                    onChange={(e) => setCmsForm({ ...cmsForm, giftSubtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Section Headline</label>
                  <input
                    type="text"
                    value={cmsForm.giftHeadline || ''}
                    onChange={(e) => setCmsForm({ ...cmsForm, giftHeadline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs font-serif text-sm"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveCMS}
                  className="px-6 py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Gifting Section</span>
                </button>
              </div>
            )}

            {/* SECTION 6: TRUST BADGES & EXPORT */}
            {cmsSection === 'trust' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs text-xs max-w-3xl">
                <div className="pb-3 border-b border-[#F5F1E8]">
                  <h3 className="font-serif text-xl text-[#1F2022] font-medium">Trust Badges & Export Guarantees</h3>
                  <p className="text-[11px] text-[#747780]">Highlight your direct shipping from India, US Section 321 de minimis, and BIS hallmarking.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-2">
                    <span className="text-[10px] uppercase text-[#A8843E] font-semibold block">Badge 1 (Shipping Origin)</span>
                    <input
                      type="text"
                      placeholder="Title"
                      value={cmsForm.trustBadge1Title || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, trustBadge1Title: e.target.value })}
                      className="w-full font-bold px-3 py-1.5 bg-white border border-[#EAE3D5] rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle"
                      value={cmsForm.trustBadge1Desc || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, trustBadge1Desc: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-[#EAE3D5] rounded text-xs"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-2">
                    <span className="text-[10px] uppercase text-[#A8843E] font-semibold block">Badge 2 (Customs & Duties)</span>
                    <input
                      type="text"
                      placeholder="Title"
                      value={cmsForm.trustBadge2Title || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, trustBadge2Title: e.target.value })}
                      className="w-full font-bold px-3 py-1.5 bg-white border border-[#EAE3D5] rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle"
                      value={cmsForm.trustBadge2Desc || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, trustBadge2Desc: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-[#EAE3D5] rounded text-xs"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-2">
                    <span className="text-[10px] uppercase text-[#A8843E] font-semibold block">Badge 3 (Precious Metal Hallmark)</span>
                    <input
                      type="text"
                      placeholder="Title"
                      value={cmsForm.trustBadge3Title || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, trustBadge3Title: e.target.value })}
                      className="w-full font-bold px-3 py-1.5 bg-white border border-[#EAE3D5] rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle"
                      value={cmsForm.trustBadge3Desc || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, trustBadge3Desc: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-[#EAE3D5] rounded text-xs"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveCMS}
                  className="px-6 py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Trust Badges</span>
                </button>
              </div>
            )}

            {/* SECTION 7: BRAND IDENTITY & FOOTER CONTACTS */}
            {cmsSection === 'brand' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D5] space-y-4 shadow-xs text-xs max-w-3xl">
                <div className="pb-3 border-b border-[#F5F1E8]">
                  <h3 className="font-serif text-xl text-[#1F2022] font-medium">Brand Identity & Concierge Contacts</h3>
                  <p className="text-[11px] text-[#747780]">Update store name, support email, phone numbers, and workshop location.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Brand Display Name</label>
                    <input
                      type="text"
                      value={cmsForm.brandName || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, brandName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg font-serif font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Brand Subtitle</label>
                    <input
                      type="text"
                      value={cmsForm.brandSubtitle || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, brandSubtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg uppercase tracking-wider text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Concierge Support Email</label>
                    <input
                      type="email"
                      value={cmsForm.supportEmail || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, supportEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">VIP WhatsApp Concierge Phone</label>
                    <input
                      type="text"
                      value={cmsForm.whatsappNumber || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Ateliers Physical Location</label>
                  <input
                    type="text"
                    value={cmsForm.atelierAddress || ''}
                    onChange={(e) => setCmsForm({ ...cmsForm, atelierAddress: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#747780] font-medium">Brand Tagline & Mission (Footer)</label>
                  <textarea
                    rows={3}
                    value={cmsForm.brandTagline || ''}
                    onChange={(e) => setCmsForm({ ...cmsForm, brandTagline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveCMS}
                  className="px-6 py-2.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Brand Information</span>
                </button>
              </div>
            )}

          </div>
        )}

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
