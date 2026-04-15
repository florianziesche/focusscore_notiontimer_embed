# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | Yes                |

## Reporting a Vulnerability

**Do not open a public issue for security vulnerabilities.**

Instead, please report security vulnerabilities through one of these channels:

1. **GitHub Private Vulnerability Reporting:**
   Use the "Report a vulnerability" button on the Security tab of this
   repository.

2. **Email:**
   Send details to **[INSERT SECURITY EMAIL]**.

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Impact assessment (what could an attacker do?)
- Suggested fix (if any)

### Response Timeline

- **Acknowledgment:** within 48 hours
- **Initial assessment:** within 7 days
- **Fix or mitigation:** depends on severity, targeting 30 days for critical issues

## Security Considerations

Focus Score stores a Notion API key. When self-hosting:

- **Recommended:** Set `NOTION_API_KEY` as a server-side environment variable
  on Vercel, so the key never reaches the browser.
- **Fallback:** If the key is stored client-side, it is in `localStorage` and
  accessible to any script on the same origin. Only use this on trusted devices.
- The Vercel proxy enforces a **path allowlist** — only `/v1/databases/` and
  `/v1/pages/` endpoints are forwarded to the Notion API.

## Dependencies

Focus Score has **zero runtime dependencies**. The only external resource loaded
is the YouTube embed iframe (from `youtube-nocookie.com`), controlled by a CSP
meta tag.
