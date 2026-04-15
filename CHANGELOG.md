# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Timer persistence across page refresh (survives F5 / embed reload)
- Property auto-detection from Notion database schema (with trim for trailing spaces)
- Server-side API key support via Vercel ENV (`NOTION_API_KEY`)
- Sound notification (Web Audio API beep) when countdown timer expires
- Browser notifications when timer reaches estimate
- Retry queue for failed Notion write-backs
- YouTube focus music player (youtube-nocookie.com for privacy)
- Content Security Policy meta tag
- Hardened proxy with path allowlist (`/v1/databases/`, `/v1/pages/` only)

### Changed
- Timers now use `Date.now()` timestamps instead of counter increments (drift-proof)
- All magic numbers extracted to frozen `C` config object
- Estimate dropdown built from `C.PRESETS` array (not hardcoded HTML)
- Property mapping uses `<select>` dropdowns (auto-populated from schema)

### Fixed
- Notion `"Status "` property with trailing space now matched correctly via `matchProp()`
