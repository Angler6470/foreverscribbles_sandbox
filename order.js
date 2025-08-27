/**
 * Forever Scribbles - Checkout launcher
 * Three package keys: DIGITAL, PICKUP, SHIPPED
 * Configure API_BASE to your API project domain (no trailing slash).
 */

const API_BASE = 'https://foreverscribbles-sandbox.vercel.app'; // <-- set to your API project

function log(...args){ try { console.log('[order.js]', ...args); } catch(_){} }

async function startCheckout(priceKey) {
  try {
    if(!priceKey) throw new Error('Missing priceKey');
    const emailEl = document.getElementById('orderEmail');
    const customer_email = emailEl && emailEl.value ? String(emailEl.value).trim() : undefined;

    const endpoint = API_BASE + '/api/create-checkout-session';
    log('POST', endpoint, { priceKey, customer_email });

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceKey, customer_email })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = await res.json();
    log('Session response', data);
    if (!data || !data.url) throw new Error('No checkout URL in response');
    window.location.href = data.url;
  } catch (err) {
    console.error('[order.js] Could not start checkout:', err);
    alert('Sorry, we could not start checkout. Please refresh and try again.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-price]');
  log(`Found ${buttons.length} package buttons`);
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-price');
      startCheckout(key);
    });
  });
});
