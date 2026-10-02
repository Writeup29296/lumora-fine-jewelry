import React, { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

const INITIAL_ORDERS = [
  {
    orderId: 'LUM-US-892415',
    trackingNumber: 'DHL-8492018471',
    date: '2026-03-28',
    recipient: 'Victoria Sterling',
    email: 'victoria@nyc.com',
    address: '740 Park Ave, Apt 11B, New York, NY 10021',
    country: 'United States',
    carrier: 'DHL Express Worldwide',
    status: 'In Transit - JFK Hub',
    subtotalUSD: 420,
    shippingUSD: 0,
    dutyUSD: 0,
    taxUSD: 0,
    grandTotalUSD: 420,
    dutyType: 'Section 321 Duty-Free Entry ($0.00)',
    csbVNumber: 'CSB-V/DEL/AIR/2026/41092',
    hsCode: '7113.19.10',
    items: [
      {
        name: 'Astraea Oval Solitaire Ring',
        metal: '14K Yellow Gold (BIS 585)',
        size: 'US 6.5',
        quantity: 1,
        unitPriceUSD: 420,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'
      }
    ]
  },
  {
    orderId: 'LUM-CA-771923',
    trackingNumber: 'DHL-9923847120',
    date: '2026-03-24',
    recipient: 'Liam Tremblay',
    email: 'liam.t@toronto.ca',
    address: '180 University Ave, Toronto, ON M5H 0A2',
    country: 'Canada',
    carrier: 'DHL Express Canada DDP',
    status: 'Delivered - Signature Verified',
    subtotalUSD: 780,
    shippingUSD: 0,
    dutyUSD: 51,
    taxUSD: 108,
    grandTotalUSD: 939,
    dutyType: 'Delivered Duty Paid (DDP) - CBSA Cleared',
    csbVNumber: 'CSB-V/DEL/AIR/2026/39811',
    hsCode: '7113.19.10',
    items: [
      {
        name: 'Elysian Radiant Cut Tennis Bracelet',
        metal: '14K White Gold',
        size: '7.0 inch (Standard US)',
        quantity: 1,
        unitPriceUSD: 780,
        image: 'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=900&q=80'
      }
    ]
  }
];

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    if (typeof window === 'undefined') return INITIAL_ORDERS;
    try {
      const saved = localStorage.getItem('lumora_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lumora_orders', JSON.stringify(orders));
      } catch (e) {
        console.error('Failed to save orders', e);
      }
    }
  }, [orders]);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      createdAt: new Date().toISOString(),
      status: 'Processing in Jaipur Atelier'
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const getOrdersByEmail = (email) => {
    if (!email) return [];
    return orders.filter((o) => o.email.toLowerCase() === email.toLowerCase());
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrdersByEmail
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
