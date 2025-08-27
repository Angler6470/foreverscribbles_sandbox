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
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: 'Missing session_id' });
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const paid = session.payment_status === 'paid';
    return res.status(200).json({ paid, session: { id: session.id, amount_total: session.amount_total, currency: session.currency, customer_email: session.customer_details?.email } });
  } catch (err) {
    console.error('verify-session error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
