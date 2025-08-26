// api/upload-url.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { filename = 'upload.bin' } = JSON.parse(req.body || '{}');
    // Placeholder: generate dummy URL. Replace with actual R2 signing logic or AWS S3 SDK
    const url = `https://example.com/${Date.now()}-${filename}`;
    return res.status(200).json({ url, key: filename });
  } catch (err) {
    console.error('upload-url error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}