import Stripe from 'stripe';

function cors(req, res) {
  const origin = process.env.CORS_ORIGIN || process.env.SITE_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

export default async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const { priceKey = 'DIGITAL', customer_email, metadata = {} } = body;

    const priceMap = {
      DIGITAL: process.env.STRIPE_PRICE_DIGITAL,
      PICKUP: process.env.STRIPE_PRICE_PICKUP,
      SHIPPED: process.env.STRIPE_PRICE_SHIPPED
    };

    const priceId = priceMap[priceKey];
    if (!priceId) return res.status(400).json({ error: 'Invalid priceKey' });

    const origin = process.env.SITE_ORIGIN || 'https://foreverscribbles.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      allow_promotion_codes: true,
      customer_email: customer_email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/upload.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      automatic_tax: { enabled: false },
      metadata
    });

    return res.status(200).json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('create-checkout-session error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
