// api/upload-url.js

function cors(req, res) {
  const origin = process.env.CORS_ORIGIN || process.env.SITE_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const { filename = 'upload.bin', contentType = 'application/octet-stream' } = body;
    // Placeholder presign (replace later with R2 signing)
    const url = `https://example.com/${Date.now()}-${encodeURIComponent(filename)}`;
    return res.status(200).json({ url, key: filename });
  } catch (err) {
    console.error('upload-url error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
