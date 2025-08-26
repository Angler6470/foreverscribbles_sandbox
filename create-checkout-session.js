import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { priceKey = 'DIGITAL', customer_email, metadata = {} } = JSON.parse(req.body || '{}');

    const priceMap = {
      DIGITAL: process.env.STRIPE_PRICE_DIGITAL,
      PDF: process.env.STRIPE_PRICE_PDF,
      BUNDLE: process.env.STRIPE_PRICE_BUNDLE
    };

    const priceId = priceMap[priceKey];
    if (!priceId) return res.status(400).json({ error: 'Invalid priceKey' });

    const origin = process.env.SITE_ORIGIN || 'https://foreverscribbles.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      customer_email: customer_email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/upload.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      metadata
    });

    return res.status(200).json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('create-checkout-session error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}