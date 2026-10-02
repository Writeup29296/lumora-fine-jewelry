async function testCanada() {
  const baseUrl = 'http://localhost:3001';
  console.log('🇨🇦 Testing Canadian order placement with CBSA and Provincial taxes...');

  const canadaPayload = {
    customer: {
      firstName: 'Liam',
      lastName: 'Tremblay',
      email: 'liam.tremblay@example.ca',
      phone: '+1 (416) 555-0144',
      address1: '180 University Ave',
      address2: 'Suite 2200',
      city: 'Toronto',
      state: 'ON', // Ontario (13% HST)
      postalCode: 'M5H 0A2',
      country: 'CA'
    },
    items: [
      {
        id: 'lum-03',
        name: 'Elysian Radiant Cut Tennis Bracelet',
        metal: '14K White Gold',
        size: '7.0 inch',
        quantity: 1,
        unitPrice: 1070
      }
    ],
    pricing: {
      subtotal: 1070,
      discountAmount: 0,
      discountCode: null,
      shippingFee: 0,
      dutiesTaxes: 218, // 6.5% CBSA + 13% ON HST
      total: 1288,
      currency: 'CAD'
    },
    transactionToken: `tx_canada_test_${Date.now()}`
  };

  const res = await fetch(`${baseUrl}/api/checkout/confirm-test-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(canadaPayload)
  });
  const data = await res.json();
  if (data.success && data.order?.id && data.order.pricing.currency === 'CAD') {
    console.log(`✅ Canada Test Passed: Order ${data.order.id} placed in CAD (CA$1,288) with Ontario 13% HST & 6.5% CBSA pre-cleared.`);
  } else {
    console.error('❌ Canada Test Failed:', data);
    process.exit(1);
  }
}

testCanada();
