// ============================================================
// Focus Score — Hardened Notion API Proxy (Cloudflare Worker)
// ============================================================
// Setup:
//   1. dash.cloudflare.com → Workers & Pages → Create Worker
//   2. Name: focus-proxy → Deploy
//   3. Edit Code → paste this → Deploy
//   4. Settings → Variables and Secrets → Add Secret:
//      Name: NOTION_TOKEN   Value: secret_...
//   5. URL: https://focus-proxy.<subdomain>.workers.dev
// ============================================================

const ALLOWED = ["/v1/databases/", "/v1/pages/"];
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Notion-Version",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Path allowlist — only databases and pages endpoints
    if (!ALLOWED.some((a) => path.startsWith(a))) {
      return new Response(JSON.stringify({ error: "Path not allowed" }), {
        status: 403,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // Prefer server-side secret (env.NOTION_TOKEN), fall back to client header
    const serverKey = env.NOTION_TOKEN || "";
    const clientKey = request.headers.get("Authorization") || "";
    const auth = serverKey ? "Bearer " + serverKey : clientKey;

    if (!auth) {
      return new Response(JSON.stringify({ error: "No API key" }), {
        status: 401,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    try {
      const res = await fetch("https://api.notion.com" + path + url.search, {
        method: request.method,
        headers: {
          Authorization: auth,
          "Notion-Version": request.headers.get("Notion-Version") || "2022-06-28",
          "Content-Type": "application/json",
        },
        body: ["GET", "HEAD"].includes(request.method)
          ? undefined
          : await request.text(),
      });

      const body = await res.text();
      return new Response(body, {
        status: res.status,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 502,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }
  },
};
