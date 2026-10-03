import React, { createContext, useContext, useState, useEffect } from 'react';

export const COUNTRIES = {
  US: {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    deMinimisLimit: 800,
    shippingNotice: '100% insured door-to-door express delivery from our Surat atelier.',
    deliveryDays: '3–5 business days via DHL Express / FedEx Priority'
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    currencySymbol: 'CA$',
    deMinimisLimit: 20,
    shippingNotice: 'Optional DDP checkout calculates 6.5% CBSA jewelry customs & provincial GST/HST upfront.',
    deliveryDays: '4–6 business days via DHL Express / FedEx Priority'
  }
};

export const CURRENCIES = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    rate: 1.0,
    checkoutSupported: true,
    statement: 'Billed directly in USD at checkout'
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    flag: '🇨🇦',
    rate: 1.37,
    checkoutSupported: true,
    statement: 'Billed directly in CAD at checkout'
  }
};

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [country, setCountry] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lumora_country') : null;
    return saved && COUNTRIES[saved] ? saved : 'US';
  });

  const [currency, setCurrency] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lumora_currency') : null;
    return saved && CURRENCIES[saved] ? saved : 'USD';
  });

  // When country changes, synchronize default currency
  const handleSetCountry = (newCountry) => {
    if (COUNTRIES[newCountry]) {
      setCountry(newCountry);
      setCurrency(COUNTRIES[newCountry].currency);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lumora_country', newCountry);
        localStorage.setItem('lumora_currency', COUNTRIES[newCountry].currency);
      }
    }
  };

  const handleSetCurrency = (newCurrency) => {
    if (CURRENCIES[newCurrency]) {
      setCurrency(newCurrency);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lumora_currency', newCurrency);
      }
    }
  };

  const activeCountry = COUNTRIES[country] || COUNTRIES.US;
  const activeCurrency = CURRENCIES[currency] || CURRENCIES.USD;

  const formatPrice = (usdPrice) => {
    if (usdPrice === null || usdPrice === undefined) return '';
    const converted = (usdPrice || 0) * activeCurrency.rate;
    return `${activeCurrency.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const convertAmount = (usdPrice) => {
    return Math.round((usdPrice || 0) * activeCurrency.rate);
  };

  return (
    <CurrencyContext.Provider value={{
      country,
      setCountry: handleSetCountry,
      activeCountry,
      currency,
      setCurrency: handleSetCurrency,
      activeCurrency,
      formatPrice,
      convertAmount,
      COUNTRIES,
      CURRENCIES
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
