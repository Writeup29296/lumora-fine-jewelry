import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import { db } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Setup Stripe
const stripeKey = process.env.STRIPE_SECRET_KEY || '';
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const stripeClient = stripeKey ? new Stripe(stripeKey) : null;

// Stripe Webhook needs raw body, configure before general json middleware
app.post(
  '/api/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    if (!stripeClient || !stripeWebhookSecret) {
      console.warn('⚠️ Stripe webhook received but Stripe credentials are not configured in environment.');
      return res.status(400).send('Stripe webhook secret not configured on server.');
    }

    let event;
    try {
      event = stripeClient.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
    } catch (err) {
      console.error('❌ Stripe Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // STRICT IDEMPOTENCY CHECK: Ensure repeated webhook events never create duplicate orders
    if (db.isWebhookProcessed(event.id)) {
      console.log(`ℹ️ Webhook event ${event.id} already processed. Idempotent skip.`);
      return res.json({ received: true, idempotent_duplicate: true });
    }

    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log(`✅ Verified payment received for session: ${session.id}`);

        const orderData = JSON.parse(session.metadata?.orderData || '{}');
        const orderId = session.metadata?.orderId;

        // Check if order already exists
        let order = orderId ? db.getOrderById(orderId) : null;
        if (!order && orderData.customer) {
          order = db.createOrder({
            customer: orderData.customer,
            items: orderData.items || [],
            pricing: orderData.pricing || {
              subtotal: session.amount_subtotal / 100,
              total: session.amount_total / 100,
              currency: session.currency?.toUpperCase() || 'USD'
            },
            paymentStatus: 'paid',
            paymentMethod: `Stripe Hosted Checkout (${session.payment_method_types?.[0] || 'card'})`,
            transactionId: session.payment_intent || session.id
          });
        }

        // Mark webhook as processed
        db.markWebhookProcessed(event.id, {
          sessionId: session.id,
          orderId: order?.id,
          amount: session.amount_total / 100,
          currency: session.currency
        });
      }

      res.json({ received: true });
    } catch (processErr) {
      console.error('Error handling webhook event:', processErr);
      res.status(500).json({ error: 'Internal processing error' });
    }
  }
);

// Standard Middlewares
app.use(cors());
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[API ${req.method}] ${req.path}`);
  }
  next();
});

// Admin Auth Middleware
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'LUMORA2026';
const checkAdmin = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.headers['authorization'];
  if (token === ADMIN_PASSWORD || token === `Bearer ${ADMIN_PASSWORD}`) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
};

// --------------------------------------------------------------------------
// API ROUTES
// --------------------------------------------------------------------------

// Health & System Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Lumora Fine Jewelry',
    domain: 'lumorafinejewelery.com',
    origin: 'Jaipur & Surat, India',
    targetMarkets: ['USA', 'Canada'],
    paymentMode: stripeClient ? 'Stripe Hosted Live' : 'Test Mode (Demonstration Ready)',
    serverTime: new Date().toISOString()
  });
});

// Products
app.get('/api/products', (req, res) => {
  try {
    const products = db.getProducts(req.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', (req, res) => {
  const prod = db.getProductById(req.params.id);
  if (!prod) return res.status(404).json({ error: 'Piece not found' });
  res.json(prod);
});

app.post('/api/products', checkAdmin, (req, res) => {
  try {
    const { name, category, priceUSD, description } = req.body;
    if (!name || !category || !priceUSD) {
      return res.status(400).json({ error: 'Name, category, and priceUSD are required' });
    }
    const created = db.createProduct(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', checkAdmin, (req, res) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', checkAdmin, (req, res) => {
  try {
    const success = db.deleteProduct(req.params.id);
    if (!success) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Discounts
app.get('/api/discounts', (req, res) => {
  res.json(db.getDiscounts());
});

app.post('/api/discounts/validate', (req, res) => {
  const { code, subtotalUSD } = req.body;
  const result = db.verifyDiscount(code, Number(subtotalUSD) || 0);
  res.json(result);
});

app.post('/api/discounts', checkAdmin, (req, res) => {
  const { code, discountType, value } = req.body;
  if (!code || !discountType || value === undefined) {
    return res.status(400).json({ error: 'Code, discountType, and value are required' });
  }
  const created = db.createDiscount(req.body);
  res.status(201).json(created);
});

app.patch('/api/discounts/:code/toggle', checkAdmin, (req, res) => {
  const toggled = db.toggleDiscount(req.params.code);
  if (!toggled) return res.status(404).json({ error: 'Promo code not found' });
  res.json(toggled);
});

// Store Settings
app.get('/api/settings', (req, res) => {
  res.json(db.getSettings());
});

app.put('/api/settings', checkAdmin, (req, res) => {
  const updated = db.updateSettings(req.body);
  res.json(updated);
});

// Orders & Tracking
app.get('/api/orders/:id', (req, res) => {
  const order = db.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.post('/api/orders/lookup', (req, res) => {
  const { query, email } = req.body;
  if (!query) return res.status(400).json({ error: 'Please provide an Order ID or Tracking Number' });
  
  const order = db.getOrderByTrackingOrEmail(query);
  if (!order) return res.status(404).json({ error: 'No matching order found in atelier records.' });
  
  if (email && order.customer.email.toLowerCase() !== email.trim().toLowerCase()) {
    return res.status(403).json({ error: 'The email address does not match this order.' });
  }

  res.json(order);
});

app.post('/api/orders/:id/return', (req, res) => {
  const { reason, itemIds, notes } = req.body;
  const order = db.requestReturn(req.params.id, { reason, itemIds, notes });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ success: true, order });
});

// Checkout Session (Stripe Hosted or Test Mode)
app.post('/api/checkout/create-session', async (req, res) => {
  try {
    const { items, customer, pricing, successUrl, cancelUrl } = req.body;

    // Validate Country: Strictly USA or Canada
    if (!customer || !['US', 'CA'].includes(customer.country)) {
      return res.status(400).json({ 
        error: 'Initial checkout shipping destinations are strictly restricted to the United States and Canada.' 
      });
    }

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Shopping bag is empty.' });
    }

    // Determine charge currency (USD or CAD)
    const currency = (pricing.currency || 'USD').toLowerCase();

    // If Stripe credentials exist, create official hosted Stripe checkout session
    if (stripeClient) {
      const lineItems = items.map(item => ({
        price_data: {
          currency: currency,
          product_data: {
            name: `${item.name} (${item.metal}${item.size ? ` - Size ${item.size}` : ''})`,
            images: item.image ? [item.image] : [],
            description: `Handcrafted fine jewelry from Lumora Atelier (Jaipur & Surat, India)`
          },
          unit_amount: Math.round((item.unitPrice || 0) * 100)
        },
        quantity: item.quantity || 1
      }));

      // Add shipping fee if applicable
      if (pricing.shippingFee > 0) {
        lineItems.push({
          price_data: {
            currency: currency,
            product_data: {
              name: 'DHL Express Insured International Air Delivery (from India)',
              description: 'Insured transit to USA / Canada with signature delivery'
            },
            unit_amount: Math.round(pricing.shippingFee * 100)
          },
          quantity: 1
        });
      }

      // Add DDP duties/taxes if Canadian DDP selected
      if (pricing.dutiesTaxes > 0) {
        lineItems.push({
          price_data: {
            currency: currency,
            product_data: {
              name: 'Canada CBSA Customs Tariff & Provincial GST/HST (DDP Pre-clearance)',
              description: 'Guaranteed Delivered Duty Paid — Zero surprise fees at Canadian doorstep'
            },
            unit_amount: Math.round(pricing.dutiesTaxes * 100)
          },
          quantity: 1
        });
      }

      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: customer.email,
        line_items: lineItems,
        shipping_address_collection: {
          allowed_countries: ['US', 'CA']
        },
        metadata: {
          orderData: JSON.stringify({ customer, items, pricing }),
          exportOrigin: 'Jaipur & Surat, India',
          rbiPurposeCode: 'P0103'
        },
        success_url: successUrl || `http://localhost:5173/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `http://localhost:5173/checkout`
      });

      return res.json({
        provider: 'stripe_hosted',
        checkoutUrl: session.url,
        sessionId: session.id,
        isTestMode: false
      });
    }

    // TEST MODE FALLBACK: If Stripe API keys are not supplied in .env
    // Returns realistic simulated hosted checkout instructions and allows seamless test order placement
    return res.json({
      provider: 'test_mode',
      checkoutUrl: null,
      isTestMode: true,
      notice: 'Stripe API credentials not detected in .env. Test mode is active. Orders can be completed directly via verified simulation.',
      supportedCurrencies: ['USD', 'CAD'],
      chargeCurrency: pricing.currency || 'USD'
    });
  } catch (err) {
    console.error('Checkout session error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Test / Instant Order Confirmation (Idempotent order placement for Test Mode)
app.post('/api/checkout/confirm-test-order', (req, res) => {
  try {
    const { customer, items, pricing, transactionToken } = req.body;

    // Strict USA/Canada Validation
    if (!customer || !['US', 'CA'].includes(customer.country)) {
      return res.status(400).json({ 
        error: 'Initial checkout shipping destinations are strictly restricted to the United States and Canada.' 
      });
    }

    // Required address fields
    if (!customer.firstName || !customer.lastName || !customer.address1 || !customer.city || !customer.state || !customer.postalCode) {
      return res.status(400).json({
        error: 'Please fill in all required shipping address fields (Name, Street, City, State/Province, Postal Code).'
      });
    }

    // Idempotency check with transaction token
    const idempotencyKey = transactionToken || `test_tx_${customer.email}_${pricing?.total}`;
    if (db.isWebhookProcessed(idempotencyKey)) {
      const existing = db.getProcessedWebhook(idempotencyKey);
      const existingOrder = existing?.orderId ? db.getOrderById(existing.orderId) : null;
      if (existingOrder) {
        return res.json({ success: true, order: existingOrder, duplicatePrevented: true });
      }
    }

    const order = db.createOrder({
      customer,
      items,
      pricing,
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card (Stripe India Test Simulation)',
      transactionId: transactionToken || `test_ch_${Math.random().toString(36).substring(2, 12)}`
    });

    // Record idempotency token
    db.markWebhookProcessed(idempotencyKey, {
      orderId: order.id,
      amount: pricing.total,
      currency: pricing.currency
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Admin Operations
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: ADMIN_PASSWORD, role: 'director' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid security passkey' });
  }
});

app.get('/api/admin/orders', checkAdmin, (req, res) => {
  res.json(db.getOrders());
});

app.put('/api/admin/orders/:id/status', checkAdmin, (req, res) => {
  const updated = db.updateOrderStatus(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Order not found' });
  res.json(updated);
});

app.put('/api/admin/orders/:id/return-status', checkAdmin, (req, res) => {
  const updated = db.updateReturnStatus(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Order not found' });
  res.json(updated);
});

app.get('/api/admin/reports', checkAdmin, (req, res) => {
  res.json(db.getReports());
});

// Serve frontend build in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath);
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`💎 LUMORA FINE JEWELRY - D2C BACKEND SERVER`);
  console.log(`📡 Server listening on: http://localhost:${PORT}`);
  console.log(`🌐 Official Domain: lumorafinejewelery.com`);
  console.log(`🛫 Origin Atelier: Jaipur & Surat, India`);
  console.log(`🎯 Target Markets: United States & Canada`);
  console.log(`💳 Stripe Status: ${stripeClient ? 'Configured (Live/Test)' : 'Test Mode Simulation Active'}`);
  console.log(`====================================================`);
});
