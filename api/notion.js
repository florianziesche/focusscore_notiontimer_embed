// /api/notion.js — Hardened Vercel Serverless Proxy
//
// Security improvements:
// 1. API key stored as ENV var (NOTION_API_KEY), never sent from browser
// 2. Path allowlist: only /v1/databases and /v1/pages endpoints
// 3. Proper error forwarding

const ALLOWED_PATHS = ['/v1/databases/', '/v1/pages/'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Notion-Version');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const notionPath = req.query.path;
  if (!notionPath) {
    return res.status(400).json({ error: 'Missing ?path= parameter' });
  }

  // Path allowlist — block access to anything outside databases/pages
  if (!ALLOWED_PATHS.some(p => notionPath.startsWith(p))) {
    return res.status(403).json({ error: 'Path not allowed: ' + notionPath });
  }

  // Prefer server-side key (ENV), fall back to client-provided header
  const serverKey = process.env.NOTION_API_KEY;
  const clientKey = req.headers['authorization'];
  const authHeader = serverKey ? ('Bearer ' + serverKey) : (clientKey || '');

  if (!authHeader) {
    return res.status(401).json({ error: 'No API key: set NOTION_API_KEY env var or send Authorization header' });
  }

  try {
    const response = await fetch('https://api.notion.com' + notionPath, {
      method: req.method,
      headers: {
        'Authorization': authHeader,
        'Notion-Version': req.headers['notion-version'] || '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(502).json({ error: 'Proxy error: ' + error.message });
  }
}
