import Stripe from 'stripe';

export const config = { api: { bodyParser: false } };

function rawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const body = await rawBody(req);
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('✅ Payment completed for session', session.id);
    }
    res.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error', err);
    res.status(500).json({ error: 'Webhook handler error' });
  }
}
