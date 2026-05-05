# FBCLID Cleaner

A Chrome extension that removes Facebook and marketing tracking parameters from URLs — quietly, with no setup required.

[Install from Chrome Web Store](https://chrome.google.com/webstore/detail/REPLACE_WITH_CWS_ID) · [Send feedback](https://forms.google.com/REPLACE_WITH_YOUR_FORM_URL) · [GitHub Sponsors](https://github.com/sponsors/bankthe1)

---

## What it does

When you click a link from Facebook, the destination URL often contains tracking parameters like `fbclid`, `utm_source`, and others that identify you across sites. This extension removes them before the page loads.

### Modes

| Mode | What it removes | When it applies |
|------|----------------|-----------------|
| **Safe** (default) | `fbclid`, `utm_source`, `utm_medium`, `utm_campaign` | Only on links clicked from Facebook |
| **Strict** | Above + `utm_term`, `utm_content`, `gclid`, `dclid`, `msclkid`, `mc_eid`, `igshid` | All navigations. Also blocks `connect.facebook.net` and `facebook.com/tr` |
| **Off** | Nothing | — |

Switch modes at any time from the popup.

## Privacy

- No data collected. No analytics. No telemetry.
- Manifest V3 only — static rules, no remote configuration.
- Stores only your selected mode, locally on your device.

[Full privacy policy](privacy-policy.md)

## Install

**From Chrome Web Store (recommended):**
[Install FBCLID Cleaner](https://chrome.google.com/webstore/detail/REPLACE_WITH_CWS_ID)

**Manual install (developer mode):**
1. Download or clone this repository
2. Open `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked** → select this folder

## Build / package

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\package.ps1
```

Output: `dist\fbclid-cleaner-0.2.0.zip` and `dist\unpacked\`

## Known limitations

- Facebook still knows you clicked a link inside Facebook.
- Removing query params does not erase Facebook's internal click logs.
- Strict mode may break attribution-dependent checkout flows on some sites.
- New tracking params not in the ruleset won't be removed until rules are updated.

## Contributing

Bug reports and feature requests welcome via [GitHub Issues](https://github.com/bankthe1/fbclid-cleaner/issues).

## Support

If this extension is useful to you, consider [sponsoring on GitHub](https://github.com/sponsors/bankthe1).

## License

MIT
