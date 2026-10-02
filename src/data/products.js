export const products = [
  {
    id: 'lum-01',
    name: 'Astraea Oval Solitaire Ring',
    category: 'rings',
    metalCategory: 'gold',
    defaultMetal: '14K Yellow Gold',
    priceUSD: 420,
    originalPriceUSD: 560,
    weightGrams: '3.8g',
    rating: 5.0,
    reviewCount: 118,
    badge: 'North America Best Seller',
    isBestSeller: true,
    isNew: false,
    usDeMinimisEligible: true,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Forged in solid 14K or 18K gold with a delicate hidden halo setting and a 1.75ct elongated oval brilliant lab-gemstone. Stamped with the BIS hallmark and certified by SGL/IGI.',
    availableMetals: [
      { name: '14K Yellow Gold', priceDelta: 0, stamp: 'BIS 585' },
      { name: '14K White Gold (Rhodium)', priceDelta: 0, stamp: 'BIS 585' },
      { name: '18K Yellow Gold', priceDelta: 160, stamp: 'BIS 750' },
      { name: '18K Rose Gold', priceDelta: 160, stamp: 'BIS 750' },
      { name: '925 Sterling Silver (Anti-Tarnish)', priceDelta: -280, stamp: '925 Laser' }
    ],
    availableSizes: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11', '12'],
    specs: [
      { label: 'Metal Options', value: '14K / 18K Solid Gold or 925 Silver' },
      { label: 'Main Gemstone', value: '1.75ct Elongated Oval Brilliant (DEF / VVS1)' },
      { label: 'Band Profile', value: '1.8mm Comfort Fit French Pavé' },
      { label: 'Assay Hallmarking', value: 'BIS Bureau of Indian Standards Laser Stamp' },
      { label: 'Certification', value: 'Individual Certificate of Authenticity Included' },
      { label: 'Origin', value: 'Handcrafted in Jaipur, India' }
    ]
  },
  {
    id: 'lum-02',
    name: 'Kyoto Vintage Floral Signet Ring',
    category: 'rings',
    metalCategory: 'silver',
    defaultMetal: '925 Sterling Silver',
    priceUSD: 135,
    originalPriceUSD: 185,
    weightGrams: '6.4g',
    rating: 4.9,
    reviewCount: 86,
    badge: 'Artisan Carved',
    isBestSeller: true,
    isNew: false,
    usDeMinimisEligible: true,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Heirloom-weight 925 sterling silver signet ring with hand-chiseled botanical engraving and an untreated natural rainbow moonstone exhibiting vivid blue adularescence.',
    availableMetals: [
      { name: '925 Sterling Silver (Anti-Tarnish)', priceDelta: 0, stamp: '925 Laser' },
      { name: '14K Gold Plated 925 Silver (Vermeil 2.5µm)', priceDelta: 30, stamp: '925 Gold Vermeil' },
      { name: '14K Solid Yellow Gold', priceDelta: 320, stamp: 'BIS 585' }
    ],
    availableSizes: ['5', '6', '7', '8', '9', '10', '11', '12', '13'],
    specs: [
      { label: 'Metal', value: 'Recycled 925 Sterling Silver' },
      { label: 'Gemstone', value: 'Natural Blue-Flash Rainbow Moonstone (10x8mm)' },
      { label: 'Finish', value: 'Oxidized Antiqued Relief with Mirror Bezel' },
      { label: 'Hypoallergenic', value: '100% Nickel-free & Lead-free' },
      { label: 'Certification', value: 'BIS 925 Certified Silver Purity' },
      { label: 'Packaging', value: 'Velvet Jewelry Vault Box + Polishing Cloth' }
    ]
  },
  {
    id: 'lum-03',
    name: 'Elysian Radiant Cut Tennis Bracelet',
    category: 'bracelets',
    metalCategory: 'gold',
    defaultMetal: '14K White Gold',
    priceUSD: 780,
    originalPriceUSD: 1050,
    weightGrams: '11.5g',
    rating: 5.0,
    reviewCount: 64,
    badge: 'Under $800 Duty-Free US',
    isBestSeller: true,
    isNew: true,
    usDeMinimisEligible: true,
    images: [
      'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A timeless continuous line of radiant lab-grown diamonds set in solid 14K white gold. Equipped with a double-safety lock mechanism engineered for daily luxury wear.',
    availableMetals: [
      { name: '14K White Gold (Rhodium)', priceDelta: 0, stamp: 'BIS 585' },
      { name: '14K Yellow Gold', priceDelta: 0, stamp: 'BIS 585' },
      { name: '18K White Gold', priceDelta: 240, stamp: 'BIS 750' },
      { name: '925 Sterling Silver (Anti-Tarnish)', priceDelta: -450, stamp: '925 Laser' }
    ],
    availableSizes: ['6.5 inch (Small)', '7.0 inch (Standard US)', '7.5 inch (Medium)', '8.0 inch (Large)'],
    specs: [
      { label: 'Total Carat Weight', value: '5.50 ctw (DEF / VVS1)' },
      { label: 'Lock Type', value: 'Custom Double-Latching Box Clasp' },
      { label: 'Metal Weight', value: '11.5 grams solid gold' },
      { label: 'Hallmark', value: 'BIS 585 / 750 Certified' },
      { label: 'US Customs Duty', value: '$0.00 (Qualifies for Section 321 Duty-Free)' },
      { label: 'Insurance', value: '100% Insured Armored Transit via DHL Express' }
    ]
  },
  {
    id: 'lum-04',
    name: 'Soleil Hammered Byzantine Gold Pendant',
    category: 'necklaces',
    metalCategory: 'gold',
    defaultMetal: '18K Yellow Gold',
    priceUSD: 495,
    originalPriceUSD: 640,
    weightGrams: '5.2g',
    rating: 4.9,
    reviewCount: 92,
    badge: 'Master Goldsmith Piece',
    isBestSeller: false,
    isNew: true,
    usDeMinimisEligible: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Hand-hammered 18K solid yellow gold medallion showcasing a celestial sunburst motif. Comes with an 18-inch adjustable diamond-cut cable chain.',
    availableMetals: [
      { name: '18K Yellow Gold', priceDelta: 0, stamp: 'BIS 750' },
      { name: '14K Yellow Gold', priceDelta: -110, stamp: 'BIS 585' },
      { name: '925 Sterling Silver (High Polish)', priceDelta: -340, stamp: '925 Laser' }
    ],
    availableSizes: ['16 inch + 2 inch extender', '18 inch + 2 inch extender', '22 inch Heavy Chain'],
    specs: [
      { label: 'Pendant Diameter', value: '20mm (Nickel-coin size)' },
      { label: 'Chain Type', value: '1.2mm Diamond-Cut Cable Chain' },
      { label: 'Clasp', value: 'Heavy Duty Lobster Clasp' },
      { label: 'Hallmark Stamp', value: 'BIS 750 Yellow Gold' },
      { label: 'Complimentary Engraving', value: 'Available on reverse side' }
    ]
  },
  {
    id: 'lum-05',
    name: 'Lunette Crescent Moonstone Silver Collar',
    category: 'necklaces',
    metalCategory: 'silver',
    defaultMetal: '925 Sterling Silver',
    priceUSD: 165,
    originalPriceUSD: 220,
    weightGrams: '9.8g',
    rating: 5.0,
    reviewCount: 77,
    badge: 'Pure 925 Silver',
    isBestSeller: true,
    isNew: false,
    usDeMinimisEligible: true,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An architectural crescent lariat handcrafted in heavy 925 sterling silver with micro-beaded bezels securing teardrop rainbow moonstones from Tamil Nadu.',
    availableMetals: [
      { name: '925 Sterling Silver (Anti-Tarnish)', priceDelta: 0, stamp: '925 Laser' },
      { name: '14K Gold Vermeil over 925 Silver', priceDelta: 45, stamp: '925 Vermeil' },
      { name: '14K Solid Yellow Gold', priceDelta: 410, stamp: 'BIS 585' }
    ],
    availableSizes: ['16-18 inch Adjustable', '20-22 inch Opera Length'],
    specs: [
      { label: 'Metal', value: 'Solid 925 Sterling Silver (Rhodium Plated)' },
      { label: 'Gemstones', value: '3 Natural Ceylon-Cut Moonstones' },
      { label: 'Finish', value: 'Hypoallergenic Anti-Tarnish Coating' },
      { label: 'Weight', value: '9.8 Grams Sterling Silver' },
      { label: 'Assay Mark', value: 'Govt. Approved 925 Assay Stamped' }
    ]
  },
  {
    id: 'lum-06',
    name: 'Aurelia Bezel Set Diamond Huggie Hoops',
    category: 'earrings',
    metalCategory: 'gold',
    defaultMetal: '14K Yellow Gold',
    priceUSD: 340,
    originalPriceUSD: 450,
    weightGrams: '3.2g',
    rating: 4.9,
    reviewCount: 103,
    badge: 'Everyday Luxury',
    isBestSeller: true,
    isNew: false,
    usDeMinimisEligible: true,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Pair of seamless clicker huggie earrings in 14K solid gold featuring flush-set round brilliant lab diamonds. Designed for sleeping, showering, and timeless elegance.',
    availableMetals: [
      { name: '14K Yellow Gold', priceDelta: 0, stamp: 'BIS 585' },
      { name: '14K White Gold', priceDelta: 0, stamp: 'BIS 585' },
      { name: '18K Yellow Gold', priceDelta: 120, stamp: 'BIS 750' },
      { name: '925 Sterling Silver', priceDelta: -210, stamp: '925 Laser' }
    ],
    availableSizes: ['10mm (Snug Lobe)', '12mm (Standard Lobe)', '14mm (Comfort Lobe)'],
    specs: [
      { label: 'Total Diamond Weight', value: '0.40 ctw (DEF / VS1)' },
      { label: 'Hoop Diameter', value: '12mm Outer, 9mm Inner' },
      { label: 'Closure Mechanism', value: 'Precision Snap-Lock Clicker' },
      { label: 'Hallmark', value: 'BIS 585 Solid Gold Stamped' },
      { label: 'Comfort', value: '100% Hypoallergenic & Nickel-Free' }
    ]
  },
  {
    id: 'lum-07',
    name: 'Zephyr Raw Emerald Art Deco Cocktail Ring',
    category: 'rings',
    metalCategory: 'both',
    defaultMetal: '18K Yellow Gold',
    priceUSD: 690,
    originalPriceUSD: 920,
    weightGrams: '5.6g',
    rating: 5.0,
    reviewCount: 48,
    badge: 'Natural Zambian Emerald',
    isBestSeller: false,
    isNew: true,
    usDeMinimisEligible: true,
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An architectural 1920s Art Deco masterpiece centering a 2.10ct natural Zambian vivid green emerald flanked by geometric stepped trapezoid side stones.',
    availableMetals: [
      { name: '18K Yellow Gold', priceDelta: 0, stamp: 'BIS 750' },
      { name: '14K Yellow Gold', priceDelta: -140, stamp: 'BIS 585' },
      { name: '925 Sterling Silver', priceDelta: -450, stamp: '925 Laser' }
    ],
    availableSizes: ['4', '5', '6', '7', '8', '9', '10', '11'],
    specs: [
      { label: 'Center Gemstone', value: '2.10ct Natural Zambian Emerald' },
      { label: 'Gem Treatment', value: 'Traditional Minor Cedarwood Oil (Standard)' },
      { label: 'Side Stones', value: 'Tapered Baguette Lab Diamonds (0.50 ctw)' },
      { label: 'Gold Purity', value: '18 Karat Solid Gold (75.0% Fine Gold)' },
      { label: 'Origin of Cutting', value: 'Jaipur Precision Lapidary' }
    ]
  },
  {
    id: 'lum-08',
    name: 'Marquise Pavé Diamond Eternity Ring',
    category: 'rings',
    metalCategory: 'gold',
    defaultMetal: '14K Rose Gold',
    priceUSD: 510,
    originalPriceUSD: 680,
    weightGrams: '4.1g',
    rating: 4.9,
    reviewCount: 71,
    badge: 'Bridal Favorite',
    isBestSeller: true,
    isNew: false,
    usDeMinimisEligible: true,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Alternating round and marquise diamonds set in warm 14K solid rose gold. Sculpted scalloped edges provide extraordinary sparkle as a wedding band or luxury stacker.',
    availableMetals: [
      { name: '14K Rose Gold', priceDelta: 0, stamp: 'BIS 585' },
      { name: '14K Yellow Gold', priceDelta: 0, stamp: 'BIS 585' },
      { name: '14K White Gold', priceDelta: 0, stamp: 'BIS 585' },
      { name: '18K Rose Gold', priceDelta: 140, stamp: 'BIS 750' },
      { name: '925 Sterling Silver', priceDelta: -320, stamp: '925 Laser' }
    ],
    availableSizes: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '10'],
    specs: [
      { label: 'Diamond Type', value: 'Lab-Grown D-E Colorless VVS' },
      { label: 'Band Width', value: '2.4mm Scalloped' },
      { label: 'Setting Style', value: 'Micro-Prong Shared Setting' },
      { label: 'Purity Stamp', value: 'BIS 585 Laser Inscription' }
    ]
  },
  {
    id: 'lum-09',
    name: 'Kada Ribbed Architectural Silver Bangle',
    category: 'bracelets',
    metalCategory: 'silver',
    defaultMetal: '925 Sterling Silver',
    priceUSD: 195,
    originalPriceUSD: 260,
    weightGrams: '22.4g',
    rating: 5.0,
    reviewCount: 53,
    badge: 'Heavy 22g Silver',
    isBestSeller: true,
    isNew: false,
    usDeMinimisEligible: true,
    images: [
      'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Substantial 22.4 gram architectural cuff bangle inspired by royal Rajput arm cuffs. Ribbed sculptural fluting with an invisible concealed hinge and double safety clasp.',
    availableMetals: [
      { name: '925 Sterling Silver (Anti-Tarnish)', priceDelta: 0, stamp: '925 Laser' },
      { name: '14K Solid Yellow Gold (Heirloom Order)', priceDelta: 950, stamp: 'BIS 585' }
    ],
    availableSizes: ['Small (6.0 inch wrist)', 'Medium (6.5 - 7.0 inch wrist)', 'Large (7.5 inch wrist)'],
    specs: [
      { label: 'Solid Metal Weight', value: '22.4 Grams 925 Sterling Silver' },
      { label: 'Internal Dimensions', value: '58mm x 50mm Oval Wrist Fit' },
      { label: 'Closure', value: 'Concealed Push-Button with Safety Tongue' },
      { label: 'Assay Mark', value: 'Govt. 925 Assay Certified' }
    ]
  },
  {
    id: 'lum-10',
    name: 'Heritage Jhumka Chandelier Filigree Earrings',
    category: 'earrings',
    metalCategory: 'both',
    defaultMetal: '925 Sterling Silver',
    priceUSD: 185,
    originalPriceUSD: 250,
    weightGrams: '14.2g',
    rating: 4.9,
    reviewCount: 65,
    badge: 'Hand-Filigree',
    isBestSeller: false,
    isNew: false,
    usDeMinimisEligible: true,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Graceful bell chandelier earrings handcrafted with microscopic silver wirework and seed pearls. Engineered with weighted balance for extended evening comfort.',
    availableMetals: [
      { name: '925 Sterling Silver (Oxidized Antique)', priceDelta: 0, stamp: '925 Laser' },
      { name: '14K Gold Vermeil over 925 Silver', priceDelta: 40, stamp: '925 Vermeil' },
      { name: '18K Solid Yellow Gold', priceDelta: 680, stamp: 'BIS 750' }
    ],
    availableSizes: ['Standard 48mm Drop Length'],
    specs: [
      { label: 'Technique', value: 'Centuries-old Jaipur Tarakashi (Wire Filigree)' },
      { label: 'Accents', value: 'Natural Basra Seed Pearls' },
      { label: 'Earring Post', value: 'Solid 925 Silver Post & Push Backing' },
      { label: 'Length', value: '48mm drop x 22mm bell diameter' }
    ]
  }
];
