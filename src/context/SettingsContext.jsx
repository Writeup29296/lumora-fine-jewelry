import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const DEFAULT_CMS_SETTINGS = {
  // Store identity
  storeName: "Lumora Fine Jewelry",
  brandName: "LUMORA",
  brandSubtitle: "FINE JEWELRY",
  domain: "lumorafinejewelery.com",
  brandOrigin: "Surat, Gujarat, India",
  supportEmail: "lumoragemofficial@gmail.com",
  whatsappNumber: "+91 79840 29296",
  atelierAddress: "Atelier in Surat, Gujarat, India",
  logoUrl: "/lumora-logo.png",
  logoSquareUrl: "/lumora-logo-square.png",
  brandTagline: "Jewels That Shine Forever — Handcrafted in Surat, India, Delivered Worldwide.",

  // 1. HERO SECTION
  heroBadge: "Surat Atelier • Worldwide Express Delivery",
  heroTitle: "Everyday Heirlooms,",
  heroTitleHighlight: "Direct from Master Ateliers.",
  heroDescription: "Handcrafted solid gold, 925 sterling silver, and certified lab-grown diamonds. Shipped directly from the diamond capital of Surat to clients worldwide — without traditional 400% boutique markups.",
  heroImageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
  heroCardTitle: "Aura Solitaire Diamond Ring",
  heroCardSubtitle: "14K Gold • BIS 585",
  heroCardPrice: 420,
  heroCtaPrimary: "Explore The Shop",
  heroCtaSecondary: "Solitaires & Bands",
  heroCtaTertiary: "Atelier Story",

  // 2. ANNOUNCEMENT BAR
  announcementActive: true,
  announcement1: "Direct Atelier Pricing: Handcrafted in Surat • Zero 400% Retail Markups",
  announcement1Link: "Our Atelier Story",
  announcement1Page: "about",
  announcement2: "🌍 Worldwide Insured Express Delivery • Door-to-Door Tracking",
  announcement2Link: "Shipping Policy",
  announcement2Page: "shipping",
  announcement3: "Complimentary Insured DHL Air Express on Orders Over $150 • 30-Day Effortless Returns",
  announcement3Link: "30-Day Return Policy",
  announcement3Page: "returns",

  // 3. CURATED CATEGORY CIRCLES
  categoryPills: [
    { id: 'rings', name: 'Solitaire Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80' },
    { id: 'bracelets', name: 'Tennis Suite', image: 'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=400&q=80' },
    { id: 'earrings', name: 'Huggie Hoops', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80' },
    { id: 'necklaces', name: 'Pendants', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80' },
    { id: 'rings', name: 'Eternity Bands', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=400&q=80' },
    { id: 'shop', name: 'Solid 14K Gold', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80' }
  ],

  // 4. PROMOTIONAL LAB DIAMOND FEATURE BANNER
  bannerBadge: "Science & Conscience",
  bannerTitle: "Why Discerning Buyers Choose Certified Lab Diamonds",
  bannerDescription: "Lab-grown diamonds are 100% crystallized carbon. Under the microscope, Raman spectroscopy, and diamond testers, they possess the exact same physical, optical, and chemical lattice as mined diamonds (Mohs hardness 10).",
  bannerImageUrl: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80",
  bannerButtonText: "Browse Solitaire Lab Diamonds",
  bannerFeature1Title: "Type IIa Purity",
  bannerFeature1Desc: "Chemically the purest diamonds, representing the top 2% of diamonds globally.",
  bannerFeature2Title: "Zero Mining Conflict",
  bannerFeature2Desc: "Created using advanced CVD and HPHT technology with traceable origins.",
  bannerFeature3Title: "IGI / GIA Standards",
  bannerFeature3Desc: "Graded strictly across the 4Cs: Carat, Color (DEF), Clarity (VS1+), Ideal Cut.",

  // 5. GIFTING SECTION
  giftHeadline: "Curated Gifting by Budget",
  giftSubtitle: "The Art of Giving",

  // 6. TRUST BADGES
  trustBadge1Title: "Ships from Surat, India",
  trustBadge1Desc: "Fast Worldwide Air Express",
  trustBadge2Title: "Insured Worldwide Transit",
  trustBadge2Desc: "100% Door-to-Door Coverage",
  trustBadge3Title: "BIS Hallmarked",
  trustBadge3Desc: "Solid 9K/14K/18K Gold",

  // 7. POLICIES & RATES
  returnPolicyDays: 30,
  freeShippingThresholdUSD: 150,
  freeShippingThresholdCAD: 200,
  dutyHandlingMode: "DDP"
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('lumora_cms_settings');
        if (cached) return { ...DEFAULT_CMS_SETTINGS, ...JSON.parse(cached) };
      } catch (e) {}
    }
    return DEFAULT_CMS_SETTINGS;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch settings from server on mount
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setSettings(prev => {
            const merged = { ...DEFAULT_CMS_SETTINGS, ...data };
            try {
              localStorage.setItem('lumora_cms_settings', JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
      })
      .catch(err => {
        console.warn('Using local CMS settings fallback:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Save settings method
  const updateSettings = async (newSettings) => {
    setIsSaving(true);
    const updated = { ...settings, ...newSettings };
    setSettings(updated);

    try {
      localStorage.setItem('lumora_cms_settings', JSON.stringify(updated));
    } catch (e) {}

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'LUMORA2026'
        },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        const savedData = await res.json();
        setSettings(prev => ({ ...prev, ...savedData }));
        setIsSaving(false);
        return { success: true, settings: savedData };
      }
    } catch (e) {
      console.error('Server settings save error:', e);
    }

    setIsSaving(false);
    return { success: true, settings: updated };
  };

  const resetToFactoryDefaults = async () => {
    return await updateSettings(DEFAULT_CMS_SETTINGS);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetToFactoryDefaults,
        isLoading,
        isSaving
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    return {
      settings: DEFAULT_CMS_SETTINGS,
      updateSettings: async () => ({ success: true }),
      resetToFactoryDefaults: async () => ({ success: true }),
      isLoading: false,
      isSaving: false
    };
  }
  return context;
};
