// ============================================================================
// VERIFIED CUSTOMER REVIEWS & TESTIMONIALS CONFIGURATION
// Note: As per policy, unverified reviews are not invented.
// When verified reviews are collected from US and Canadian customers,
// they can be approved in the Admin Dashboard and displayed here.
// ============================================================================

export const reviewStatus = {
  isDemonstrationMode: true,
  placeholderNotice: "Verified Customer Reviews Pending Collection — Templates below display the review layout for verified buyers after delivery.",
  merchantSubmissionInstruction: "Collect verified reviews automatically via post-delivery DHL/FedEx follow-up emails. Upload or approve reviews in the Admin Portal."
};

export const demonstrationReviews = [
  {
    id: 1,
    author: '[Verified Client - Sample Template]',
    location: 'New York, NY, USA',
    itemPurchased: 'Astraea Oval Solitaire Ring (14K Yellow Gold)',
    rating: 5,
    date: 'Sample Date',
    verifiedBuyer: true,
    isSample: true,
    reviewText: '[Customer Review Placeholder: Verified client feedback regarding packaging, BIS hallmark clarity, diamond sparkle, and DHL delivery timeline from India to USA will be rendered here once approved.]',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    author: '[Verified Client - Sample Template]',
    location: 'Toronto, ON, Canada',
    itemPurchased: 'Elysian Radiant Cut Tennis Bracelet (14K White Gold)',
    rating: 5,
    date: 'Sample Date',
    verifiedBuyer: true,
    isSample: true,
    reviewText: '[Customer Review Placeholder: Verified client feedback regarding Canadian DDP duty pre-clearance, double-safety clasp craftsmanship, and presentation vault will be rendered here once approved.]',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    author: '[Verified Client - Sample Template]',
    location: 'Vancouver, BC, Canada',
    itemPurchased: 'Kyoto Hand-Carved Botanical Signet Ring (925 Silver)',
    rating: 5,
    date: 'Sample Date',
    verifiedBuyer: true,
    isSample: true,
    reviewText: '[Customer Review Placeholder: Verified client feedback regarding 925 sterling silver weight, moonstone adularescence, and ring sizing fit will be rendered here once approved.]',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  }
];

export const trustStats = {
  shippingOrigin: 'Surat, Gujarat, India',
  targetDestinations: 'Worldwide Insured Delivery',
  courierPartners: 'DHL Express Worldwide & FedEx Priority',
  complianceStandard: 'BIS Hallmark / 925 Stamped',
  orderFulfillmentType: 'Insured International Air Cargo (CSB-V)'
};
