# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FBCLID Cleaner is a Chrome extension (Manifest V3) that removes Facebook and marketing tracking parameters from URLs and optionally blocks Meta Pixel endpoints.

## Build and Distribution

Package the extension for distribution:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\package.ps1
```

Output: `dist\fbclid-cleaner-0.2.0.zip` and `dist\unpacked\`

**No automated tests.** Testing is manual — see `test_checklist.md` for the full QA checklist.

## Local Install for Testing

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select `dist\unpacked` (or the project root)

Do not load the `.zip` file — Chrome expects a folder.

## Architecture

Three components work together:

**Background service worker (`background.js`)** — Owns all mode state. On mode change, calls `chrome.declarativeNetRequest.updateEnabledRulesets()` to swap which JSON ruleset is active, then persists the selection to `chrome.storage.local`. Responds to two message types from the popup: `get-mode` and `set-mode`.

**Popup (`popup.html` / `popup.js`)** — The only user-facing UI. Sends `set-mode` messages to the background worker and reads the current mode on open via `get-mode`. Has no independent state.

**Rule sets (`rules-safe.json`, `rules-strict.json`)** — Static Declarative Net Request rules. Safe mode: one rule strips `fbclid`, `utm_source`, `utm_medium`, `utm_campaign` from `main_frame` requests initiated from `facebook.com`. Strict mode: extends to additional params (`utm_term`, `utm_content`, `gclid`, `dclid`, `msclkid`, `mc_eid`, `igshid`) without initiator restriction, plus two block rules for `connect.facebook.net` and `facebook.com/tr` in third-party contexts.

**Mode matrix:**

| Mode   | `ruleset_safe` | `ruleset_strict` |
|--------|----------------|------------------|
| Safe   | enabled        | disabled         |
| Strict | enabled        | enabled          |
| Off    | disabled       | disabled         |

## Key Constraints

- Manifest V3 only — no background pages, no `webRequest` blocking API.
- Rules must be static JSON; no dynamic or remotely fetched rules.
- No external network calls from extension scripts are permitted.
- `ruleset_safe` is the default on install and startup.
- Any invalid mode value passed to `applyMode()` falls back to `MODES.SAFE`.
- When bumping the version, update it in both `manifest.json` and `package.ps1`.
