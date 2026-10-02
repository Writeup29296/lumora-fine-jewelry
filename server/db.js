import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial demonstration catalog data
const initialProducts = [
  {
    id: 'lum-01',
    name: 'Astraea Oval Solitaire Ring',
    category: 'rings',
    subtitle: 'Classic 4-Prong Hidden Halo Solitaire',
    priceUSD: 420,
    priceCAD: 575,
    isSample: true,
    isBestSeller: true,
    isNew: false,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Forged in solid gold or 925 sterling silver with a delicate hidden halo setting and an elongated oval lab-grown diamond. Hand-finished by master jewelers in Jaipur with comfort-fit band profile.',
    stoneType: 'Lab-Grown Diamond (CVD/HPHT)',
    stoneDetails: {
      type: 'Lab-Grown Diamond',
      carat: '1.75 ct Center + 0.10 ct Hidden Halo',
      color: 'DEF (Colorless)',
      clarity: 'VVS1 - VS1',
      cut: 'Ideal Oval Brilliant',
      certification: '[IGI / GIA Lab Certificate Included — Certified #' + 'Pending Merchant Upload]'
    },
    metalDetails: {
      purityOptions: ['925 Sterling Silver', '9K Gold (375)', '14K Gold (585)', '18K Gold (750)'],
      colorOptions: ['Yellow Gold', 'White Gold (Rhodium)', 'Rose Gold'],
      approxWeightGrams: 3.8,
      hallmark: 'BIS Hallmarked (Bureau of Indian Standards) / 925 Laser Stamped'
    },
    variants: [
      { id: 'v-925', metal: '925 Sterling Silver', purity: '925', color: 'White Gold (Rhodium)', priceUSD: 160, priceCAD: 220, stock: 12 },
      { id: 'v-9k-yg', metal: '9K Gold', purity: '375', color: 'Yellow Gold', priceUSD: 310, priceCAD: 425, stock: 8 },
      { id: 'v-9k-wg', metal: '9K Gold', purity: '375', color: 'White Gold (Rhodium)', priceUSD: 310, priceCAD: 425, stock: 6 },
      { id: 'v-14k-yg', metal: '14K Gold', purity: '585', color: 'Yellow Gold', priceUSD: 420, priceCAD: 575, stock: 15 },
      { id: 'v-14k-wg', metal: '14K Gold', purity: '585', color: 'White Gold (Rhodium)', priceUSD: 420, priceCAD: 575, stock: 10 },
      { id: 'v-14k-rg', metal: '14K Gold', purity: '585', color: 'Rose Gold', priceUSD: 420, priceCAD: 575, stock: 7 },
      { id: 'v-18k-yg', metal: '18K Gold', purity: '750', color: 'Yellow Gold', priceUSD: 590, priceCAD: 810, stock: 5 },
      { id: 'v-18k-wg', metal: '18K Gold', purity: '750', color: 'White Gold (Rhodium)', priceUSD: 590, priceCAD: 810, stock: 4 },
      { id: 'v-18k-rg', metal: '18K Gold', purity: '750', color: 'Rose Gold', priceUSD: 590, priceCAD: 810, stock: 3 }
    ],
    ringSizes: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11', '12'],
    processingTime: '1–2 business days (Standard sizes) / 5–7 business days (Custom sizing)',
    shippingTime: '3–5 business days via DHL Express from Jaipur, India to USA & Canada',
    packaging: 'Lumora Hardcover Velvet Presentation Vault, BIS Hallmark Certificate Card, Microfiber Polishing Cloth',
    returnsEligibility: 'Eligible for 30-Day Return in original unworn condition with intact security tags. Custom engraved pieces are non-returnable.',
    careGuide: 'Avoid direct contact with perfumes, hand sanitizers, and household chlorine. Clean with lukewarm water, mild baby soap, and soft bristle brush.'
  },
  {
    id: 'lum-02',
    name: 'Kyoto Hand-Carved Botanical Signet Ring',
    category: 'rings',
    subtitle: 'Chiseled Relief with Natural Blue Moonstone',
    priceUSD: 145,
    priceCAD: 200,
    isSample: true,
    isBestSeller: true,
    isNew: false,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Substantial heirloom-weight 925 sterling silver or solid gold signet ring featuring hand-carved botanical floral engraving and an untreated natural rainbow moonstone exhibiting vivid blue adularescence.',
    stoneType: 'Natural Rainbow Moonstone (Untreated)',
    stoneDetails: {
      type: 'Natural Moonstone',
      carat: '2.50 ct (10x8mm Cabochon)',
      color: 'Electric Blue Flash on Translucent White',
      clarity: 'Natural Mineral Inclusions (Eye Clean)',
      cut: 'Polished Smooth Oval Cabochon',
      certification: '[Certificate of Authenticity Provided — Mineral Verification Placeholder]'
    },
    metalDetails: {
      purityOptions: ['925 Sterling Silver', '9K Gold (375)', '14K Gold (585)'],
      colorOptions: ['White Gold (Rhodium)', 'Yellow Gold', 'Rose Gold'],
      approxWeightGrams: 6.4,
      hallmark: '925 Laser Stamped / BIS 585'
    },
    variants: [
      { id: 'v2-925', metal: '925 Sterling Silver', purity: '925', color: 'White Gold (Rhodium)', priceUSD: 145, priceCAD: 200, stock: 20 },
      { id: 'v2-9k-yg', metal: '9K Gold', purity: '375', color: 'Yellow Gold', priceUSD: 360, priceCAD: 495, stock: 5 },
      { id: 'v2-14k-yg', metal: '14K Gold', purity: '585', color: 'Yellow Gold', priceUSD: 490, priceCAD: 675, stock: 4 }
    ],
    ringSizes: ['5', '6', '7', '8', '9', '10', '11', '12', '13'],
    processingTime: '1–2 business days for ready stock',
    shippingTime: '3–5 business days via DHL Express from Jaipur, India to USA & Canada',
    packaging: 'Velvet Travel Pouch and Presentation Box, Polishing Cloth',
    returnsEligibility: '30-Day Return window for unworn condition. Engraved pieces excluded.',
    careGuide: 'Store separately to protect moonstone surface. Polish gently with dry microfiber cloth.'
  },
  {
    id: 'lum-03',
    name: 'Elysian Radiant Cut Tennis Bracelet',
    category: 'bracelets',
    subtitle: 'Full Eternity Diamond Line with Double Safety Clasp',
    priceUSD: 780,
    priceCAD: 1070,
    isSample: true,
    isBestSeller: true,
    isNew: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A continuous line of radiant cut lab-grown diamonds set in precision 4-prong baskets with an articulated fluid hinge design. Finished with an engineered double-safety tongue clasp.',
    stoneType: 'Lab-Grown Diamond (CVD/HPHT)',
    stoneDetails: {
      type: 'Lab-Grown Diamond',
      carat: '4.50 ct Total Diamond Weight (approx 52 stones)',
      color: 'F-G (Near Colorless)',
      clarity: 'VS1 - VS2',
      cut: 'Radiant Cut Brilliant',
      certification: '[Diamond Laboratory Certificate Provided with Shipment — ID Pending]'
    },
    metalDetails: {
      purityOptions: ['925 Sterling Silver', '14K Gold (585)', '18K Gold (750)'],
      colorOptions: ['White Gold (Rhodium)', 'Yellow Gold', 'Rose Gold'],
      approxWeightGrams: 11.5,
      hallmark: 'BIS 585 / BIS 750 / 925'
    },
    variants: [
      { id: 'v3-925', metal: '925 Sterling Silver', purity: '925', color: 'White Gold (Rhodium)', priceUSD: 360, priceCAD: 495, stock: 10 },
      { id: 'v3-14k-wg', metal: '14K Gold', purity: '585', color: 'White Gold (Rhodium)', priceUSD: 780, priceCAD: 1070, stock: 6 },
      { id: 'v3-14k-yg', metal: '14K Gold', purity: '585', color: 'Yellow Gold', priceUSD: 780, priceCAD: 1070, stock: 7 },
      { id: 'v3-18k-wg', metal: '18K Gold', purity: '750', color: 'White Gold (Rhodium)', priceUSD: 1080, priceCAD: 1485, stock: 3 },
      { id: 'v3-18k-yg', metal: '18K Gold', purity: '750', color: 'Yellow Gold', priceUSD: 1080, priceCAD: 1485, stock: 4 }
    ],
    wristSizes: ['6.5 inch', '7.0 inch', '7.5 inch'],
    processingTime: '2–3 business days inspection and dispatch',
    shippingTime: '3–5 business days via DHL Express Priority Air with Signature Required',
    packaging: 'Jewelry Armored Vault Box with Individual Velvet Travel Case',
    returnsEligibility: '30-Day Return window for unworn items with security seals intact.',
    careGuide: 'Inspect prongs annually. Ultrasonic clean safe only when verified with jeweler.'
  },
  {
    id: 'lum-04',
    name: 'Aurelia Bezel-Set Huggie Hoop Earrings',
    category: 'earrings',
    subtitle: 'Daily Luxury Clicker Hoops in Solid Gold',
    priceUSD: 240,
    priceCAD: 330,
    isSample: true,
    isBestSeller: true,
    isNew: false,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Low-profile bezel-set lab-grown diamonds set flush into comfort-clicker huggies. Designed for 24/7 wear, active lifestyles, and sleeping without snagging.',
    stoneType: 'Lab-Grown Diamond (CVD/HPHT)',
    stoneDetails: {
      type: 'Lab-Grown Diamond',
      carat: '0.36 ct Total (0.18 ct per earring)',
      color: 'E-F (Colorless)',
      clarity: 'VS1',
      cut: 'Round Brilliant',
      certification: '[Atelier Authenticity Certificate Included]'
    },
    metalDetails: {
      purityOptions: ['925 Sterling Silver', '9K Gold (375)', '14K Gold (585)', '18K Gold (750)'],
      colorOptions: ['Yellow Gold', 'White Gold (Rhodium)', 'Rose Gold'],
      approxWeightGrams: 2.9,
      hallmark: 'BIS 585 / 925'
    },
    variants: [
      { id: 'v4-925', metal: '925 Sterling Silver', purity: '925', color: 'Yellow Gold', priceUSD: 95, priceCAD: 130, stock: 25 },
      { id: 'v4-9k-yg', metal: '9K Gold', purity: '375', color: 'Yellow Gold', priceUSD: 175, priceCAD: 240, stock: 12 },
      { id: 'v4-14k-yg', metal: '14K Gold', purity: '585', color: 'Yellow Gold', priceUSD: 240, priceCAD: 330, stock: 18 },
      { id: 'v4-14k-wg', metal: '14K Gold', purity: '585', color: 'White Gold (Rhodium)', priceUSD: 240, priceCAD: 330, stock: 14 },
      { id: 'v4-14k-rg', metal: '14K Gold', purity: '585', color: 'Rose Gold', priceUSD: 240, priceCAD: 330, stock: 9 },
      { id: 'v4-18k-yg', metal: '18K Gold', purity: '750', color: 'Yellow Gold', priceUSD: 340, priceCAD: 465, stock: 6 }
    ],
    processingTime: '1 business day (Ready in Atelier)',
    shippingTime: '3–5 business days via DHL Express to USA / Canada',
    packaging: 'Satin Ribbon Presentation Box + Polishing Cloth',
    returnsEligibility: '30-Day Return policy for hygienic unworn condition with tag seal.',
    careGuide: 'Listen for audible "click" when securing clasp. Wipe clean after wearing.'
  },
  {
    id: 'lum-05',
    name: 'Soleil Hammered Byzantine Medallion Pendant',
    category: 'necklaces',
    subtitle: 'Artisanal Chiseled Medallion on Solid Chain',
    priceUSD: 385,
    priceCAD: 530,
    isSample: true,
    isBestSeller: false,
    isNew: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Inspired by historical Byzantine relics, each disc is hand-hammered by Surat metalsmiths to catch light with organic brilliance. Suspended from an adjustable 16-18-20 inch cable chain.',
    stoneType: 'Center Lab-Grown Diamond (0.08ct) Accent',
    stoneDetails: {
      type: 'Lab-Grown Diamond Accent',
      carat: '0.08 ct Star-Set Center',
      color: 'G-H',
      clarity: 'SI1',
      cut: 'Single Cut Round',
      certification: '[Authenticity Certificate Included]'
    },
    metalDetails: {
      purityOptions: ['925 Sterling Silver', '14K Gold (585)', '18K Gold (750)'],
      colorOptions: ['Yellow Gold', 'Rose Gold', 'White Gold (Rhodium)'],
      approxWeightGrams: 5.6,
      hallmark: 'BIS 585 / BIS 750 / 925'
    },
    variants: [
      { id: 'v5-925', metal: '925 Sterling Silver', purity: '925', color: 'Yellow Gold', priceUSD: 140, priceCAD: 195, stock: 15 },
      { id: 'v5-14k-yg', metal: '14K Gold', purity: '585', color: 'Yellow Gold', priceUSD: 385, priceCAD: 530, stock: 8 },
      { id: 'v5-14k-rg', metal: '14K Gold', purity: '585', color: 'Rose Gold', priceUSD: 385, priceCAD: 530, stock: 5 },
      { id: 'v5-18k-yg', metal: '18K Gold', purity: '750', color: 'Yellow Gold', priceUSD: 540, priceCAD: 740, stock: 4 }
    ],
    chainLengths: ['16 inch (Choker length)', '18 inch (Standard)', '20 inch (Layering)'],
    processingTime: '1–2 business days',
    shippingTime: '3–5 business days to USA / Canada',
    packaging: 'Velvet Jewelry Box with Anti-Tarnish Strip',
    returnsEligibility: '30-Day Return window for unworn items.',
    careGuide: 'Store flat to prevent chain knotting. Wipe with soft lint-free cloth.'
  },
  {
    id: 'lum-06',
    name: 'Celeste French-Set Diamond Eternity Band',
    category: 'rings',
    subtitle: 'Continuous Lab-Grown Diamond Band in Solid Gold',
    priceUSD: 460,
    priceCAD: 630,
    isSample: true,
    isBestSeller: true,
    isNew: false,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Scalloped French-set lab-grown diamonds wrapping 360 degrees around the finger. Low-profile design sits completely flush next to any engagement ring.',
    stoneType: 'Lab-Grown Diamond (CVD/HPHT)',
    stoneDetails: {
      type: 'Lab-Grown Diamond',
      carat: '0.85 ct Total Carat Weight (approx 28 stones)',
      color: 'DEF (Colorless)',
      clarity: 'VS1',
      cut: 'Round Brilliant',
      certification: '[Atelier Laboratory Diamond Grade Verification]'
    },
    metalDetails: {
      purityOptions: ['925 Sterling Silver', '9K Gold (375)', '14K Gold (585)', '18K Gold (750)'],
      colorOptions: ['Yellow Gold', 'White Gold (Rhodium)', 'Rose Gold'],
      approxWeightGrams: 2.6,
      hallmark: 'BIS 585 / BIS 750 / 925'
    },
    variants: [
      { id: 'v6-925', metal: '925 Sterling Silver', purity: '925', color: 'White Gold (Rhodium)', priceUSD: 175, priceCAD: 240, stock: 14 },
      { id: 'v6-14k-yg', metal: '14K Gold', purity: '585', color: 'Yellow Gold', priceUSD: 460, priceCAD: 630, stock: 10 },
      { id: 'v6-14k-wg', metal: '14K Gold', purity: '585', color: 'White Gold (Rhodium)', priceUSD: 460, priceCAD: 630, stock: 9 },
      { id: 'v6-18k-yg', metal: '18K Gold', purity: '750', color: 'Yellow Gold', priceUSD: 620, priceCAD: 850, stock: 4 }
    ],
    ringSizes: ['4', '5', '6', '7', '8', '9', '10'],
    processingTime: '2–4 business days',
    shippingTime: '3–5 business days to USA & Canada',
    packaging: 'Luxury Ring Presentation Vault',
    returnsEligibility: '30-Day Return window. Note: Eternity bands cannot be resized after forging.',
    careGuide: 'Clean gently between scalloped settings using a soft toothbrush.'
  },
  {
    id: 'lum-07',
    name: 'Chandrika Royal Filigree Chandelier Earrings',
    category: 'earrings',
    subtitle: 'Jaipur Openwork Artistry in 925 Silver & 18K Gold Vermeil',
    priceUSD: 195,
    priceCAD: 270,
    isSample: true,
    isBestSeller: false,
    isNew: true,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Heritage royal openwork filigree crafted by traditional Jaipur silver and goldsmiths. Features articulate dangling drops that move with luminous grace.',
    stoneType: 'Natural Freshwater Seed Pearls',
    stoneDetails: {
      type: 'Natural Cultured Freshwater Pearls',
      carat: '3mm Seed Pearls with High Luster',
      color: 'Warm Ivory Luster',
      clarity: 'Natural Organic Surface',
      cut: 'Near Round',
      certification: '[Cultured Pearl Origin Certificate Included]'
    },
    metalDetails: {
      purityOptions: ['925 Sterling Silver', '14K Gold (585)'],
      colorOptions: ['Yellow Gold', 'White Gold (Rhodium)'],
      approxWeightGrams: 7.2,
      hallmark: '925 Laser Hallmark / BIS 585'
    },
    variants: [
      { id: 'v7-925', metal: '925 Sterling Silver', purity: '925', color: 'Yellow Gold', priceUSD: 195, priceCAD: 270, stock: 18 },
      { id: 'v7-925-wg', metal: '925 Sterling Silver', purity: '925', color: 'White Gold (Rhodium)', priceUSD: 195, priceCAD: 270, stock: 15 },
      { id: 'v7-14k-yg', metal: '14K Gold', purity: '585', color: 'Yellow Gold', priceUSD: 690, priceCAD: 950, stock: 3 }
    ],
    processingTime: '1–2 business days',
    shippingTime: '3–5 business days to USA & Canada',
    packaging: 'Jewelry Presentation Vault with Velvet Insert',
    returnsEligibility: '30-Day Return window for unworn items with security seals.',
    careGuide: 'Keep pearls away from moisture and cosmetic sprays. Put on after perfume dries.'
  },
  {
    id: 'lum-08',
    name: 'Noor Marquise Cluster Tennis Necklace',
    category: 'necklaces',
    subtitle: 'Graduated Marquise Lab-Grown Diamond Collar',
    priceUSD: 1250,
    priceCAD: 1720,
    isSample: true,
    isBestSeller: false,
    isNew: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An architectural statement piece featuring alternating marquise and round brilliant lab-grown diamonds that rest gracefully on the collarbone. Handcrafted in solid 14K or 18K gold.',
    stoneType: 'Lab-Grown Diamond (CVD/HPHT)',
    stoneDetails: {
      type: 'Lab-Grown Diamond',
      carat: '6.20 ct Total Diamond Weight',
      color: 'E-F (Colorless)',
      clarity: 'VVS2 - VS1',
      cut: 'Marquise & Round Brilliant Ideal Cut',
      certification: '[Independent Diamond Laboratory Certification Included]'
    },
    metalDetails: {
      purityOptions: ['14K Gold (585)', '18K Gold (750)'],
      colorOptions: ['White Gold (Rhodium)', 'Yellow Gold'],
      approxWeightGrams: 16.8,
      hallmark: 'BIS 585 / BIS 750'
    },
    variants: [
      { id: 'v8-14k-wg', metal: '14K Gold', purity: '585', color: 'White Gold (Rhodium)', priceUSD: 1250, priceCAD: 1720, stock: 4 },
      { id: 'v8-14k-yg', metal: '14K Gold', purity: '585', color: 'Yellow Gold', priceUSD: 1250, priceCAD: 1720, stock: 5 },
      { id: 'v8-18k-wg', metal: '18K Gold', purity: '750', color: 'White Gold (Rhodium)', priceUSD: 1680, priceCAD: 2310, stock: 2 }
    ],
    chainLengths: ['16 inch Collar Fit', '17 inch Comfort Fit'],
    processingTime: '3–5 business days final setting & certification',
    shippingTime: '3–5 business days via DHL Express Armored Priority Air',
    packaging: 'Luxury Handcrafted Velvet Presentation Case with Wax Seal',
    returnsEligibility: '30-Day Return window with original laboratory certificate card intact.',
    careGuide: 'Professional jewelry inspection recommended every 12 months.'
  }
];

const initialDiscounts = [
  { code: 'WELCOME10', discountType: 'percentage', value: 10, minSpendUSD: 100, active: true, description: '10% off for first-time US & Canadian clients' },
  { code: 'LUMORA50', discountType: 'fixed', value: 50, minSpendUSD: 400, active: true, description: '$50 off orders over $400 USD' },
  { code: 'HEIRLOOM15', discountType: 'percentage', value: 15, minSpendUSD: 750, active: true, description: '15% off fine heirloom orders over $750 USD' }
];

const initialSettings = {
  storeName: 'Lumora Fine Jewelry',
  domain: 'lumorafinejewelery.com',
  brandOrigin: 'Jaipur & Surat, India',
  targetMarkets: ['United States', 'Canada'],
  defaultCurrency: 'USD',
  supportedCurrencies: ['USD', 'CAD'],
  currencyRates: {
    USD: 1.0,
    CAD: 1.37
  },
  // Configurable 30-day return policy
  returnPolicyDays: 30,
  returnPolicyDetails: 'Eligible for 30-day return in original unworn condition with security tags and certificates intact. Custom engravings and bespoke commissions are non-refundable.',
  returnAddressPlaceholder: '[US/Canadian Return Logistics Facility: Address to be configured by merchant upon carrier onboarding]',
  
  // Transparent shipping details
  shippingOriginCity: 'Jaipur & Surat, India',
  shippingCarrier: 'DHL Express Worldwide & FedEx International Priority',
  dispatchLeadTime: '1–2 business days for ready pieces / 5–7 business days for custom sizing',
  transitTimeUSA: '3–5 business days',
  transitTimeCanada: '4–6 business days',
  freeShippingThresholdUSD: 150,
  freeShippingThresholdCAD: 200,
  standardShippingFeeUSD: 24,
  standardShippingFeeCAD: 32,
  priorityArmoredFeeUSD: 35,
  priorityArmoredFeeCAD: 48,
  
  // Transparent customs & duties explanation
  usaCustomsExplanation: 'USA Section 321 De Minimis: Under 19 U.S.C. § 1321, shipments imported by one person on one day valued at $800 USD or less are generally exempt from US Customs duty and formal entry. Courier handles electronic entry.',
  canadaCustomsExplanation: 'Canada CBSA Import: Fine jewelry imports into Canada are subject to CBSA customs duties (standard 6.5%) and provincial taxes (GST/HST). Lumora provides optional DDP (Delivered Duty Paid) checkout calculation to avoid COD surprise fees.',
  dutyHandlingMode: 'DDP', // 'DDP' or 'DDU'

  // Indian Export & Banking Compliance Credentials
  rbiPurposeCode: 'P0103', // Export of goods under RBI FEMA
  iecCodePlaceholder: '[IEC: Import Export Code to be entered in Admin]',
  adCodePlaceholder: '[AD Code: Bank Authorized Dealer Code registered with Customs]',
  gstLutPlaceholder: '[GST LUT: Letter of Undertaking for Zero-Rated Exports]',
  hallmarkAuthority: 'Bureau of Indian Standards (BIS) Approved Assaying Centers',
  
  // Payment gateway configuration
  paymentProvider: 'Stripe India (Hosted Checkout) / International Cards',
  stripeTestMode: true,
  stripePublicKey: '',
  stripeSecretKey: '',
  stripeWebhookSecret: '',
  
  // Contact
  supportEmail: 'concierge@lumorafinejewelery.com',
  whatsappNumber: '+91 98765 43210 (VIP Concierge)',
  usPhonePlaceholder: '[US/Canada Toll-Free Inquiries: Number to be configured]',
  supportHours: 'Mon–Sat: 9:00 AM – 8:00 PM EST (Dedicated North America hours)',

  // Storefront CMS Studio Settings
  brandName: 'LUMORA',
  brandSubtitle: 'FINE JEWELRY',
  atelierAddress: 'Ateliers in Jaipur & Surat, Rajasthan / Gujarat, India',
  brandTagline: 'Solid gold (9K, 14K, 18K) and 925 sterling silver fine jewelry handcrafted in the historic artisan workshops of Jaipur and Surat, India. Delivered directly to clients across the United States and Canada with 100% transit insurance and transparent customs clearance.',
  
  // 1. HERO SECTION
  heroBadge: 'Jaipur & Surat Ateliers • Direct Export to USA & Canada',
  heroTitle: 'Everyday Heirlooms,',
  heroTitleHighlight: 'Direct from Master Ateliers.',
  heroDescription: 'Handcrafted solid gold, 925 sterling silver, and certified lab-grown diamonds. Shipped directly from the jewelry capitals of Jaipur and Surat straight to North America — without traditional 400% boutique markups.',
  heroImageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
  heroCardTitle: 'Aura Solitaire Diamond Ring',
  heroCardSubtitle: '14K Gold • BIS 585',
  heroCardPrice: 420,
  heroCtaPrimary: 'Explore The Shop',
  heroCtaSecondary: 'Solitaires & Bands',
  heroCtaTertiary: 'Atelier Story',

  // 2. ANNOUNCEMENT BAR
  announcementActive: true,
  announcement1: 'Direct Atelier Pricing: Handcrafted in Jaipur & Surat • Zero 400% Retail Markups',
  announcement1Link: 'Our Atelier Story',
  announcement1Page: 'about',
  announcement2: '🇺🇸 USA: Section 321 Duty-Free Under $800 • 🇨🇦 Canada: CBSA & Provincial DDP Pre-Cleared',
  announcement2Link: 'Shipping & Customs',
  announcement2Page: 'shipping',
  announcement3: 'Complimentary Insured DHL Air Express on Orders Over $150 • 30-Day Effortless Returns',
  announcement3Link: '30-Day Return Policy',
  announcement3Page: 'returns',

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
  bannerBadge: 'Science & Conscience',
  bannerTitle: 'Why Discerning North American Buyers Choose Certified Lab Diamonds',
  bannerDescription: 'Lab-grown diamonds are 100% crystallized carbon. Under the microscope, Raman spectroscopy, and diamond testers, they possess the exact same physical, optical, and chemical lattice as mined diamonds (Mohs hardness 10).',
  bannerImageUrl: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80',
  bannerButtonText: 'Browse Solitaire Lab Diamonds',
  bannerFeature1Title: 'Type IIa Purity',
  bannerFeature1Desc: 'Chemically the purest diamonds, representing the top 2% of diamonds globally.',
  bannerFeature2Title: 'Zero Mining Conflict',
  bannerFeature2Desc: 'Created using advanced CVD and HPHT technology with traceable origins.',
  bannerFeature3Title: 'IGI / GIA Standards',
  bannerFeature3Desc: 'Graded strictly across the 4Cs: Carat, Color (DEF), Clarity (VS1+), Ideal Cut.',

  // 5. GIFTING SECTION
  giftHeadline: 'Curated Gifting by Budget',
  giftSubtitle: 'The Art of Giving',

  // 6. TRUST BADGES
  trustBadge1Title: 'Ships from India',
  trustBadge1Desc: '3–5 Days via DHL Express',
  trustBadge2Title: 'US Section 321 / DDP',
  trustBadge2Desc: 'Zero US Duty under $800',
  trustBadge3Title: 'BIS Hallmarked',
  trustBadge3Desc: 'Solid 9K/14K/18K Gold'
};

const initialOrders = [
  {
    id: 'LUM-84920',
    date: '2026-09-28T14:22:00Z',
    customer: {
      firstName: 'Sarah',
      lastName: 'Jenkins',
      email: 'sarah.jenkins@example.com',
      phone: '+1 (415) 555-0198',
      address1: '450 Sutter St, Suite 1200',
      address2: '',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94108',
      country: 'US'
    },
    items: [
      {
        id: 'lum-01',
        name: 'Astraea Oval Solitaire Ring',
        metal: '14K Gold',
        purity: '585',
        color: 'Yellow Gold',
        size: '6.5',
        quantity: 1,
        unitPrice: 420,
        currency: 'USD'
      }
    ],
    pricing: {
      subtotal: 420,
      discountAmount: 42,
      discountCode: 'WELCOME10',
      shippingFee: 0,
      dutiesTaxes: 0,
      total: 378,
      currency: 'USD'
    },
    payment: {
      status: 'paid',
      method: 'Credit Card (Stripe Hosted Checkout)',
      transactionId: 'ch_test_3Oq9V4Lk201948271',
      paidAt: '2026-09-28T14:23:45Z',
      currencyCharged: 'USD'
    },
    shipping: {
      carrier: 'DHL Express Worldwide',
      trackingNumber: 'DHL-IN-9382049182',
      origin: 'Jaipur Atelier, India',
      destination: 'San Francisco, CA, USA',
      csbVNumber: 'CSB-V-2026-DEL-098234',
      hsCode: '7113.19.10',
      fulfillmentStatus: 'in_transit', // processing, csb_filed, in_transit, delivered
      statusHistory: [
        { status: 'order_confirmed', timestamp: '2026-09-28T14:23:45Z', note: 'Order confirmed and sent to atelier' },
        { status: 'crafting_complete', timestamp: '2026-09-29T11:00:00Z', note: 'Quality inspection and BIS hallmark verified' },
        { status: 'csb_filed', timestamp: '2026-09-30T09:30:00Z', note: 'Indian Customs CSB-V Electronic Bill filed at Air Cargo Complex' },
        { status: 'handed_to_carrier', timestamp: '2026-09-30T17:45:00Z', note: 'Handed over to DHL Express Air Cargo' }
      ]
    },
    returnRequest: null
  }
];

class Database {
  constructor() {
    this.data = null;
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
        let needsSave = false;
        if (!this.data.products || this.data.products.length === 0) {
          this.data.products = [...initialProducts];
          needsSave = true;
        }
        if (!this.data.discounts || this.data.discounts.length === 0) {
          this.data.discounts = [...initialDiscounts];
          needsSave = true;
        }
        if (!this.data.settings) {
          this.data.settings = { ...initialSettings };
          needsSave = true;
        } else {
          for (const key of Object.keys(initialSettings)) {
            if (this.data.settings[key] === undefined) {
              this.data.settings[key] = initialSettings[key];
              needsSave = true;
            }
          }
        }
        if (needsSave) {
          this.save();
        }
      } else {
        this.data = {
          products: initialProducts,
          discounts: initialDiscounts,
          settings: initialSettings,
          orders: initialOrders,
          processedWebhooks: {},
          lastUpdated: new Date().toISOString()
        };
        this.save();
      }
    } catch (err) {
      console.error('Error loading database, resetting to defaults:', err);
      this.data = {
        products: initialProducts,
        discounts: initialDiscounts,
        settings: initialSettings,
        orders: initialOrders,
        processedWebhooks: {},
        lastUpdated: new Date().toISOString()
      };
      this.save();
    }
  }

  save() {
    try {
      this.data.lastUpdated = new Date().toISOString();
      const tmpFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tmpFile, JSON.stringify(this.data, null, 2), 'utf8');
      fs.renameSync(tmpFile, DB_FILE);
    } catch (err) {
      console.error('Failed to save database:', err);
    }
  }

  // Products
  getProducts(filters = {}) {
    let list = [...this.data.products];
    if (filters.category && filters.category !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.metal && filters.metal !== 'all') {
      list = list.filter(p => {
        const purities = p.metalDetails?.purityOptions?.join(' ').toLowerCase() || '';
        return purities.includes(filters.metal.toLowerCase());
      });
    }
    if (filters.stone && filters.stone !== 'all') {
      list = list.filter(p => p.stoneType?.toLowerCase().includes(filters.stone.toLowerCase()));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.stoneType.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getProductById(id) {
    return this.data.products.find(p => p.id === id) || null;
  }

  createProduct(product) {
    const id = product.id || `lum-${Date.now().toString().slice(-6)}`;
    const newProduct = {
      ...product,
      id,
      isSample: true, // Marked as demonstration data
      createdAt: new Date().toISOString()
    };
    this.data.products.push(newProduct);
    this.save();
    return newProduct;
  }

  updateProduct(id, updates) {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.data.products[index] = { ...this.data.products[index], ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.products[index];
  }

  deleteProduct(id) {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.data.products.splice(index, 1);
    this.save();
    return true;
  }

  // Orders
  getOrders() {
    return this.data.orders;
  }

  getOrderById(id) {
    return this.data.orders.find(o => o.id.toLowerCase() === id.toLowerCase()) || null;
  }

  getOrderByTrackingOrEmail(query) {
    const q = query.trim().toLowerCase();
    return this.data.orders.find(o => 
      o.id.toLowerCase() === q ||
      o.customer.email.toLowerCase() === q ||
      o.shipping.trackingNumber?.toLowerCase() === q
    ) || null;
  }

  createOrder(orderData) {
    // Generate secure order ID
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    const orderId = `LUM-${randomHex}`;
    
    // Auto-generate DHL Express Tracking Number placeholder for international air cargo
    const trackingNumber = `DHL-IN-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const csbVNumber = `CSB-V-${new Date().getFullYear()}-DEL-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      customer: orderData.customer,
      items: orderData.items,
      pricing: orderData.pricing,
      payment: {
        status: orderData.paymentStatus || 'paid',
        method: orderData.paymentMethod || 'Stripe Hosted Checkout (Test Mode)',
        transactionId: orderData.transactionId || `tx_${Date.now()}`,
        paidAt: new Date().toISOString(),
        currencyCharged: orderData.pricing.currency
      },
      shipping: {
        carrier: 'DHL Express Worldwide',
        trackingNumber: trackingNumber,
        origin: 'Jaipur / Surat Atelier, India',
        destination: `${orderData.customer.city}, ${orderData.customer.state || ''}, ${orderData.customer.country}`,
        csbVNumber: csbVNumber,
        hsCode: '7113.19.10',
        fulfillmentStatus: 'processing',
        statusHistory: [
          {
            status: 'order_confirmed',
            timestamp: new Date().toISOString(),
            note: 'Order placed and payment authorized. Atelier preparing pieces for quality verification.'
          }
        ]
      },
      returnRequest: null
    };

    // Decrement stock for purchased variants
    for (const item of orderData.items) {
      const prod = this.getProductById(item.id);
      if (prod && prod.variants) {
        const variant = prod.variants.find(v => 
          (v.id && v.id === item.variantId) || 
          (v.metal === item.metal && v.color === item.color)
        );
        if (variant && typeof variant.stock === 'number') {
          variant.stock = Math.max(0, variant.stock - (item.quantity || 1));
        }
      }
    }

    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  updateOrderStatus(orderId, { fulfillmentStatus, trackingNumber, carrier, note }) {
    const order = this.getOrderById(orderId);
    if (!order) return null;

    if (fulfillmentStatus) order.shipping.fulfillmentStatus = fulfillmentStatus;
    if (trackingNumber) order.shipping.trackingNumber = trackingNumber;
    if (carrier) order.shipping.carrier = carrier;

    if (note || fulfillmentStatus) {
      order.shipping.statusHistory.push({
        status: fulfillmentStatus || order.shipping.fulfillmentStatus,
        timestamp: new Date().toISOString(),
        note: note || `Status updated to ${fulfillmentStatus}`
      });
    }

    this.save();
    return order;
  }

  requestReturn(orderId, { reason, itemIds, notes }) {
    const order = this.getOrderById(orderId);
    if (!order) return null;

    order.returnRequest = {
      requestedAt: new Date().toISOString(),
      reason,
      itemIds: itemIds || [],
      notes: notes || '',
      status: 'pending_review', // pending_review, approved, label_sent, completed, rejected
      instructions: 'Please do not ship items back without authorization. If approved, return hub instructions will be dispatched to your email.'
    };

    this.save();
    return order;
  }

  updateReturnStatus(orderId, { status, adminNotes }) {
    const order = this.getOrderById(orderId);
    if (!order || !order.returnRequest) return null;

    order.returnRequest.status = status;
    if (adminNotes) order.returnRequest.adminNotes = adminNotes;
    order.returnRequest.updatedAt = new Date().toISOString();

    this.save();
    return order;
  }

  // Webhook Idempotency Check
  isWebhookProcessed(eventId) {
    return Boolean(this.data.processedWebhooks && this.data.processedWebhooks[eventId]);
  }

  getProcessedWebhook(eventId) {
    return this.data.processedWebhooks ? this.data.processedWebhooks[eventId] : null;
  }

  markWebhookProcessed(eventId, metadata = {}) {
    if (!this.data.processedWebhooks) {
      this.data.processedWebhooks = {};
    }
    this.data.processedWebhooks[eventId] = {
      timestamp: new Date().toISOString(),
      ...metadata
    };
    this.save();
  }

  // Discounts
  getDiscounts() {
    return this.data.discounts;
  }

  verifyDiscount(code, subtotalUSD = 0) {
    if (!code) return { valid: false, message: 'Please enter a promo code.' };
    const clean = code.trim().toUpperCase();
    const d = this.data.discounts.find(item => item.code.toUpperCase() === clean);
    if (!d || !d.active) {
      return { valid: false, message: 'Invalid or expired promotional code.' };
    }
    if (d.minSpendUSD && subtotalUSD < d.minSpendUSD) {
      return { 
        valid: false, 
        message: `This code requires a minimum spend of $${d.minSpendUSD} USD.` 
      };
    }
    let discountAmount = 0;
    if (d.discountType === 'percentage') {
      discountAmount = (subtotalUSD * d.value) / 100;
    } else {
      discountAmount = Math.min(subtotalUSD, d.value);
    }
    return {
      valid: true,
      discount: d,
      discountAmount: Number(discountAmount.toFixed(2)),
      message: `${d.value}${d.discountType === 'percentage' ? '%' : '$'} discount applied!`
    };
  }

  createDiscount(discount) {
    const newDiscount = {
      ...discount,
      code: discount.code.trim().toUpperCase(),
      active: discount.active !== false
    };
    this.data.discounts.push(newDiscount);
    this.save();
    return newDiscount;
  }

  toggleDiscount(code) {
    const d = this.data.discounts.find(item => item.code.toUpperCase() === code.toUpperCase());
    if (!d) return null;
    d.active = !d.active;
    this.save();
    return d;
  }

  // Settings
  getSettings() {
    return this.data.settings;
  }

  updateSettings(updates) {
    this.data.settings = { ...this.data.settings, ...updates };
    this.save();
    return this.data.settings;
  }

  // Reports
  getReports() {
    const orders = this.data.orders;
    const paidOrders = orders.filter(o => o.payment && o.payment.status === 'paid');
    
    let totalRevenueUSD = 0;
    let totalRevenueCAD = 0;
    let usOrders = 0;
    let caOrders = 0;

    for (const order of paidOrders) {
      const cur = order.pricing?.currency || 'USD';
      const tot = order.pricing?.total || 0;
      if (cur === 'CAD') {
        totalRevenueCAD += tot;
      } else {
        totalRevenueUSD += tot;
      }

      if (order.customer?.country === 'CA') {
        caOrders++;
      } else {
        usOrders++;
      }
    }

    // Top selling items
    const itemMap = {};
    for (const order of paidOrders) {
      for (const item of (order.items || [])) {
        if (!itemMap[item.name]) {
          itemMap[item.name] = { name: item.name, quantity: 0, revenueUSD: 0 };
        }
        itemMap[item.name].quantity += item.quantity || 1;
        itemMap[item.name].revenueUSD += (item.unitPrice || 0) * (item.quantity || 1);
      }
    }

    const topItems = Object.values(itemMap).sort((a, b) => b.quantity - a.quantity).slice(0, 5);

    return {
      totalOrders: orders.length,
      paidOrdersCount: paidOrders.length,
      totalRevenueUSD: Number(totalRevenueUSD.toFixed(2)),
      totalRevenueCAD: Number(totalRevenueCAD.toFixed(2)),
      usOrders,
      caOrders,
      topItems,
      recentOrders: orders.slice(0, 10)
    };
  }
}

export const db = new Database();
