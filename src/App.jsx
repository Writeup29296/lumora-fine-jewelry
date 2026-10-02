import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductsProvider, useProducts } from './context/ProductsContext';
import { OrdersProvider, useOrders } from './context/OrdersContext';
import { CartProvider } from './context/CartContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { DomainSetupModal } from './components/DomainSetupModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { AdminDashboard } from './components/AdminDashboard';

// All 13 Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CareGuidePage } from './pages/CareGuidePage';
import { RingSizeGuidePage } from './pages/RingSizeGuidePage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnsPolicyPage } from './pages/ReturnsPolicyPage';
import { PrivacyTermsPage } from './pages/PrivacyTermsPage';
import { FaqPage } from './pages/FaqPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';

function StoreLayout() {
  const { isAdmin, openLogin } = useAuth();
  const { products } = useProducts();
  const { orders } = useOrders();

  // Navigation State
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash.startsWith('product-')) return 'product';
      if (['shop', 'about', 'contact', 'care', 'ring-size-guide', 'shipping', 'returns', 'privacy', 'faq', 'checkout', 'confirmation', 'account', 'admin'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  const [activeProduct, setActiveProduct] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash.startsWith('product-')) {
        const prodId = hash.replace('product-', '');
        return products.find(p => p.id === prodId) || products[0] || null;
      }
    }
    return products[0] || null;
  });

  const [shopCategory, setShopCategory] = useState('all');
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [domainGuideOpen, setDomainGuideOpen] = useState(false);

  // Sync route with URL hash for browser back/forward and deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash.startsWith('product-')) {
        const prodId = hash.replace('product-', '');
        const found = products.find(p => p.id === prodId);
        if (found) {
          setActiveProduct(found);
          setCurrentView('product');
        }
      } else if (['home', 'shop', 'about', 'contact', 'care', 'ring-size-guide', 'shipping', 'returns', 'privacy', 'faq', 'checkout', 'confirmation', 'account', 'admin'].includes(hash)) {
        setCurrentView(hash);
      } else if (!hash) {
        setCurrentView('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [products]);

  // Navigate helper
  const handleNavigate = (viewName, params = {}) => {
    if (params.category) {
      setShopCategory(params.category);
    }
    setCurrentView(viewName);
    window.location.hash = `#${viewName}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setActiveProduct(product);
    setCurrentView('product');
    window.location.hash = `#product-${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order) => {
    setConfirmedOrder(order);
    setCurrentView('confirmation');
    window.location.hash = '#confirmation';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setCurrentView('admin');
      window.location.hash = '#admin';
    } else {
      openLogin();
    }
  };

  // If Admin View is active and user is admin, render Admin Dashboard
  if (currentView === 'admin' && isAdmin) {
    return (
      <AdminDashboard 
        onBackToStore={() => handleNavigate('home')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F2022] flex flex-col selection:bg-[#C5A059]/25 selection:text-[#1F2022]">
      
      {/* Navigation Header */}
      <Navbar 
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
        onOpenDomainGuide={() => setDomainGuideOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        
        {/* 1. HOMEPAGE */}
        {currentView === 'home' && (
          <HomePage 
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            products={products}
          />
        )}

        {/* 2. SHOP CATALOG */}
        {currentView === 'shop' && (
          <ShopPage 
            products={products}
            initialCategory={shopCategory}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* 3. PRODUCT DETAIL PAGE */}
        {currentView === 'product' && (
          <ProductDetailPage 
            product={activeProduct || products[0]}
            allProducts={products}
            onBack={() => handleNavigate('shop')}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {/* 4. ABOUT LUMORA */}
        {currentView === 'about' && (
          <AboutPage 
            onNavigate={handleNavigate}
          />
        )}

        {/* 5. CONTACT CONCIERGE */}
        {currentView === 'contact' && (
          <ContactPage 
            onNavigate={handleNavigate}
          />
        )}

        {/* 6. JEWELLERY CARE GUIDE */}
        {currentView === 'care' && (
          <CareGuidePage 
            onNavigate={handleNavigate}
          />
        )}

        {/* 7. RING SIZE GUIDE */}
        {currentView === 'ring-size-guide' && (
          <RingSizeGuidePage 
            onNavigate={handleNavigate}
          />
        )}

        {/* 8. SHIPPING & DELIVERY POLICY */}
        {currentView === 'shipping' && (
          <ShippingPolicyPage 
            onNavigate={handleNavigate}
          />
        )}

        {/* 9. RETURNS & EXCHANGES POLICY */}
        {currentView === 'returns' && (
          <ReturnsPolicyPage 
            onNavigate={handleNavigate}
          />
        )}

        {/* 10. PRIVACY POLICY & TERMS */}
        {currentView === 'privacy' && (
          <PrivacyTermsPage />
        )}

        {/* 11. FAQ */}
        {currentView === 'faq' && (
          <FaqPage 
            onNavigate={handleNavigate}
          />
        )}

        {/* 12. CHECKOUT */}
        {currentView === 'checkout' && (
          <CheckoutPage 
            onNavigate={handleNavigate}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {/* 13. ORDER CONFIRMATION */}
        {currentView === 'confirmation' && (
          <OrderConfirmationPage 
            order={confirmedOrder || orders[0]}
            onNavigate={handleNavigate}
          />
        )}

        {/* 14. CUSTOMER ACCOUNT & ORDER TRACKING */}
        {currentView === 'account' && (
          <AccountPage 
            onNavigate={handleNavigate}
          />
        )}

      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
        onOpenDomainGuide={() => setDomainGuideOpen(true)}
      />

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer 
        onNavigateToCheckout={() => handleNavigate('checkout')}
      />

      {/* Domain Setup & Deployment Guide Modal */}
      <DomainSetupModal
        isOpen={domainGuideOpen}
        onClose={() => setDomainGuideOpen(false)}
      />

      {/* Customer & Director Authentication Modal */}
      <AuthModal />

      {/* Cookie & Privacy Consent Banner */}
      <CookieConsentBanner 
        onNavigateToPrivacy={() => handleNavigate('privacy')}
      />

    </div>
  );
}

export function App() {
  return (
    <CurrencyProvider>
      <AuthProvider>
        <ProductsProvider>
          <OrdersProvider>
            <CartProvider>
              <StoreLayout />
            </CartProvider>
          </OrdersProvider>
        </ProductsProvider>
      </AuthProvider>
    </CurrencyProvider>
  );
}

export default App;
