import React from 'react';
import { Home, Gem, Ruler, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

export const MobileBottomNav = ({ currentView, onNavigate }) => {
  const { cartCount, openCart } = useCart();
  const { settings } = useSettings();

  const whatsappNumber = settings?.whatsappNumber?.replace(/[^0-9]/g, '') || '917984029296';

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => onNavigate('home')
    },
    {
      id: 'shop',
      label: 'Jewelry',
      icon: Gem,
      action: () => onNavigate('shop')
    },
    {
      id: 'ring-size-guide',
      label: 'Ring Sizer',
      icon: Ruler,
      action: () => onNavigate('ring-size-guide')
    },
    {
      id: 'cart',
      label: 'Bag',
      icon: ShoppingBag,
      badge: cartCount,
      action: openCart
    },
    {
      id: 'whatsapp',
      label: 'Concierge',
      icon: MessageCircle,
      isExternal: true,
      action: () => {
        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Lumora Concierge, I am inquiring about handcrafted fine jewelry from your Surat atelier.")}`,
          '_blank'
        );
      }
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#EAE3D5] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] transition-all">
      <div className="grid grid-cols-5 items-center justify-items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1 px-1.5 w-full relative transition-colors ${
                isActive
                  ? 'text-[#A8843E]'
                  : 'text-[#575A61] hover:text-[#1F2022] active:text-[#A8843E]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#1F2022] text-[#FAF8F5] text-[9px] font-bold flex items-center justify-center border border-white animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.id === 'whatsapp' && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 font-medium truncate ${
                isActive ? 'font-semibold text-[#1F2022]' : ''
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
