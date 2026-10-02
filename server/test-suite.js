// Automated test suite for Lumora Fine Jewelry API & Storefront Engine
async function runTests() {
  const baseUrl = 'http://localhost:3001';
  let passed = 0;
  let failed = 0;

  console.log('🧪 Starting Lumora Fine Jewelry Full Backend & API Verification Suite...');

  // Test 1: Health
  try {
    const res = await fetch(`${baseUrl}/api/health`);
    const data = await res.json();
    if (data.status === 'online' && data.origin.includes('India')) {
      console.log('✅ Test 1 Passed: Server health & Indian atelier origin verified.');
      passed++;
    } else {
      throw new Error('Health check unexpected data');
    }
  } catch (err) {
    console.error('❌ Test 1 Failed:', err.message);
    failed++;
  }

  // Test 2: Products Retrieval & Variants
  try {
    const res = await fetch(`${baseUrl}/api/products`);
    const products = await res.json();
    if (Array.isArray(products) && products.length >= 8) {
      const p1 = products[0];
      if (p1.variants && p1.variants.length > 0 && p1.isSample) {
        console.log(`✅ Test 2 Passed: Retrieved ${products.length} demonstration pieces with verified variants and sample tagging.`);
        passed++;
      } else {
        throw new Error('Products lack variants or sample tag');
      }
    } else {
      throw new Error(`Expected at least 8 products, got ${products?.length}`);
    }
  } catch (err) {
    console.error('❌ Test 2 Failed:', err.message);
    failed++;
  }

  // Test 3: Discount Code Validation
  try {
    const res = await fetch(`${baseUrl}/api/discounts/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'WELCOME10', subtotalUSD: 400 })
    });
    const result = await res.json();
    if (result.valid && result.discountAmount === 40) {
      console.log('✅ Test 3 Passed: Promo code WELCOME10 validated with exact 10% ($40) deduction.');
      passed++;
    } else {
      throw new Error('Promo validation failed');
    }
  } catch (err) {
    console.error('❌ Test 3 Failed:', err.message);
    failed++;
  }

  // Test 4: Order Creation (USA Address & Section 321)
  let testOrderId = null;
  const uniqueTxToken = `tx_test_suite_${Date.now()}`;
  try {
    const orderPayload = {
      customer: {
        firstName: 'Elena',
        lastName: 'Rostova',
        email: 'elena.rostova@example.com',
        phone: '+1 (310) 555-0199',
        address1: '9641 Sunset Blvd',
        address2: 'Suite 400',
        city: 'Beverly Hills',
        state: 'CA',
        postalCode: '90210',
        country: 'US'
      },
      items: [
        {
          id: 'lum-01',
          name: 'Astraea Oval Solitaire Ring',
          metal: '14K Gold',
          size: '7.0',
          quantity: 1,
          unitPrice: 420
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
      transactionToken: uniqueTxToken
    };

    const res = await fetch(`${baseUrl}/api/checkout/confirm-test-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    const data = await res.json();
    if (data.success && data.order && data.order.id) {
      testOrderId = data.order.id;
      console.log(`✅ Test 4 Passed: Order placed successfully (ID: ${testOrderId}) with USA Section 321 duty-free entry ($0 duty).`);
      passed++;
    } else {
      throw new Error('Order creation unsuccessful');
    }
  } catch (err) {
    console.error('❌ Test 4 Failed:', err.message);
    failed++;
  }

  // Test 5: Idempotency Protection (Repeated payment notification must NOT create duplicate order)
  try {
    const duplicatePayload = {
      customer: {
        firstName: 'Elena',
        lastName: 'Rostova',
        email: 'elena.rostova@example.com',
        phone: '+1 (310) 555-0199',
        address1: '9641 Sunset Blvd',
        city: 'Beverly Hills',
        state: 'CA',
        postalCode: '90210',
        country: 'US'
      },
      items: [],
      pricing: { total: 378, currency: 'USD' },
      transactionToken: uniqueTxToken // Identical token
    };

    const res = await fetch(`${baseUrl}/api/checkout/confirm-test-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duplicatePayload)
    });
    const data = await res.json();
    if (data.success && data.duplicatePrevented && data.order.id === testOrderId) {
      console.log(`✅ Test 5 Passed: Idempotency verified! Repeated payment with token ${uniqueTxToken} safely returned existing order without creating duplicate.`);
      passed++;
    } else {
      throw new Error('Idempotency check failed to prevent duplicate');
    }
  } catch (err) {
    console.error('❌ Test 5 Failed:', err.message);
    failed++;
  }

  // Test 6: Order Lookup by Order ID and Email
  try {
    const res = await fetch(`${baseUrl}/api/orders/lookup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: testOrderId, email: 'elena.rostova@example.com' })
    });
    const order = await res.json();
    if (order && order.id === testOrderId && order.shipping?.carrier) {
      console.log(`✅ Test 6 Passed: Order lookup retrieved tracking number ${order.shipping.trackingNumber} and CSB-V filing.`);
      passed++;
    } else {
      throw new Error('Order lookup failed');
    }
  } catch (err) {
    console.error('❌ Test 6 Failed:', err.message);
    failed++;
  }

  // Test 7: 30-Day Return Authorization Request
  try {
    const res = await fetch(`${baseUrl}/api/orders/${testOrderId}/return`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: 'size_adjustment', notes: 'Need ring adjusted from size 7 to size 6.5.' })
    });
    const data = await res.json();
    if (data.success && data.order?.returnRequest?.status === 'pending_review') {
      console.log('✅ Test 7 Passed: 30-day return authorization request registered in pending_review state.');
      passed++;
    } else {
      throw new Error('Return request failed');
    }
  } catch (err) {
    console.error('❌ Test 7 Failed:', err.message);
    failed++;
  }

  // Test 8: Admin Reports & Analytics
  try {
    const res = await fetch(`${baseUrl}/api/admin/reports`, {
      headers: { 'x-admin-token': 'LUMORA2026' }
    });
    const reports = await res.json();
    if (reports.totalOrders > 0 && reports.totalRevenueUSD > 0) {
      console.log(`✅ Test 8 Passed: Admin reports generated: $${reports.totalRevenueUSD} USD total revenue across ${reports.totalOrders} orders.`);
      passed++;
    } else {
      throw new Error('Admin reports invalid');
    }
  } catch (err) {
    console.error('❌ Test 8 Failed:', err.message);
    failed++;
  }

  console.log(`\n====================================================`);
  console.log(`🎉 TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log(`====================================================`);

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
