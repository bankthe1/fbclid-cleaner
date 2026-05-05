# Phase 1 Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Get FBCLID Cleaner v0.2.0 published on the Chrome Web Store with a public GitHub repository, feedback loop, and clean store listing.

**Architecture:** Minimal code change (feedback link in popup) + content creation (privacy policy, README, store listing) + platform setup (GitHub, CWS). The extension logic is unchanged — this plan is purely launch preparation.

**Tech Stack:** Chrome Extension MV3, HTML/CSS/JS, GitHub, Chrome Web Store dashboard, Google Forms (external — user creates manually)

---

## Pre-flight check

Before starting, confirm:
- [ ] Chrome Web Store developer account is active (already registered)
- [ ] Git is initialized in the project root — if not, run `git init && git add -A && git commit -m "chore: initial commit"`

---

### Task 1: Add feedback link to popup

**Files:**
- Modify: `popup.js` — add `FEEDBACK_URL` constant
- Modify: `popup.html` — add feedback link element
- Modify: `popup.css` — style feedback link

**Note:** There is no automated test framework in this project. Verification is manual by loading the unpacked extension.

- [ ] **Step 1: Add the feedback URL constant to `popup.js`**

Open `popup.js`. At the very top of the file, before any existing code, add:

```js
const FEEDBACK_URL = "https://forms.google.com/REPLACE_WITH_YOUR_FORM_URL";
```

You will replace this URL after creating your Google Form (see Task 7). Leave the placeholder for now.

- [ ] **Step 2: Wire the constant to the link at runtime**

At the bottom of `popup.js`, after all existing code, add:

```js
document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("feedback-link");
  if (link) link.href = FEEDBACK_URL;
});
```

- [ ] **Step 3: Add the link element to `popup.html`**

Open `popup.html`. Locate the closing `</body>` tag. Directly before it, add:

```html
<div class="feedback-bar">
  <a id="feedback-link" href="#" target="_blank" rel="noopener noreferrer">Send feedback</a>
</div>
```

- [ ] **Step 4: Style the feedback bar in `popup.css`**

Open `popup.css`. At the end of the file, add:

```css
.feedback-bar {
  text-align: center;
  padding: 8px 0 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 8px;
}

.feedback-bar a {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
}

.feedback-bar a:hover {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: underline;
}
```

- [ ] **Step 5: Manual verification**

  1. Open `chrome://extensions`
  2. Click **Reload** on FBCLID Cleaner (or load unpacked from project root if not already loaded)
  3. Click the extension icon
  4. Confirm a subtle "Send feedback" link appears at the bottom of the popup
  5. Click it — it should open a new tab (URL will be `#` for now, which is fine until Task 7)

- [ ] **Step 6: Commit**

```bash
git add popup.js popup.html popup.css
git commit -m "feat: add feedback link to popup"
```

---

### Task 2: Write privacy policy

**Files:**
- Create: `privacy-policy.md`

The Chrome Web Store requires a privacy policy URL for extensions that use any permissions. FBCLID Cleaner uses `storage` and `declarativeNetRequest` — a policy is mandatory.

- [ ] **Step 1: Create `privacy-policy.md` in the project root**

```markdown
# Privacy Policy — FBCLID Cleaner

**Last updated:** 2026-05-05

## What this extension does

FBCLID Cleaner removes Facebook tracking parameters and selected marketing query parameters from URLs as you browse. In Strict mode, it also blocks Meta Pixel network requests.

## Data we collect

None. This extension collects no personal data, browsing history, URLs, or any other information about you or your activity.

## Data stored

The extension stores one value locally on your device: your selected privacy mode (`safe`, `strict`, or `off`). This is stored using `chrome.storage.local` and never leaves your device.

## Network requests

The extension makes no network requests of its own. No analytics, no telemetry, no remote configuration.

## Third-party services

None. The extension has no dependencies on external services.

## Changes to this policy

If this policy changes in a meaningful way, the changelog in the Chrome Web Store listing will note it.

## Contact

For questions, open an issue on [GitHub](https://github.com/REPLACE_WITH_YOUR_GITHUB_USERNAME/fbclid-cleaner).
```

- [ ] **Step 2: Replace the GitHub URL placeholder**

In the file you just created, replace `REPLACE_WITH_YOUR_GITHUB_USERNAME` with your actual GitHub username.

- [ ] **Step 3: Commit**

```bash
git add privacy-policy.md
git commit -m "docs: add privacy policy"
```

- [ ] **Step 4: Note the raw GitHub URL**

Once you push to GitHub (Task 6), the privacy policy will be accessible at:
`https://raw.githubusercontent.com/YOUR_USERNAME/fbclid-cleaner/main/privacy-policy.md`

You will paste this URL into the CWS developer dashboard. Write it down now so you don't forget.

---

### Task 3: Rewrite README for public GitHub

**Files:**
- Modify: `README.md`

The current README is developer-facing. This version is for public GitHub visitors — potential users, contributors, and press.

- [ ] **Step 1: Replace the full contents of `README.md`**

```markdown
# FBCLID Cleaner

A Chrome extension that removes Facebook and marketing tracking parameters from URLs — quietly, with no setup required.

[Install from Chrome Web Store](https://chrome.google.com/webstore/detail/REPLACE_WITH_CWS_ID) · [Send feedback](https://forms.google.com/REPLACE_WITH_YOUR_FORM_URL) · [GitHub Sponsors](https://github.com/sponsors/REPLACE_WITH_YOUR_GITHUB_USERNAME)

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

Bug reports and feature requests welcome via [GitHub Issues](https://github.com/REPLACE_WITH_YOUR_GITHUB_USERNAME/fbclid-cleaner/issues).

## Support

If this extension is useful to you, consider [sponsoring on GitHub](https://github.com/sponsors/REPLACE_WITH_YOUR_GITHUB_USERNAME).

## License

MIT
```

- [ ] **Step 2: Replace all placeholders**

Find and replace:
- `REPLACE_WITH_CWS_ID` → your CWS extension ID (available after submission in Task 8)
- `REPLACE_WITH_YOUR_FORM_URL` → your Google Form URL (from Task 7)
- `REPLACE_WITH_YOUR_GITHUB_USERNAME` → your GitHub username

For now, leave the CWS and Form URLs as placeholders — you will update them in later tasks. Replace only your GitHub username now.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for public GitHub"
```

---

### Task 4: Set up GitHub Issue templates

**Files:**
- Create: `.github/ISSUE_TEMPLATE/feature_request.md`
- Create: `.github/ISSUE_TEMPLATE/bug_report.md`

These make it easy for users to file useful feedback on GitHub.

- [ ] **Step 1: Create `.github/ISSUE_TEMPLATE/feature_request.md`**

```markdown
---
name: Feature request
about: Suggest something that would make this extension more useful
title: "[Feature] "
labels: enhancement
assignees: ''
---

**What would you like the extension to do that it doesn't do today?**

(Be as specific as possible — what URL, what parameter, what behavior?)

**How often do you run into this?**

Daily / Weekly / Occasionally

**Any other context?**

```

- [ ] **Step 2: Create `.github/ISSUE_TEMPLATE/bug_report.md`**

```markdown
---
name: Bug report
about: Something isn't working as expected
title: "[Bug] "
labels: bug
assignees: ''
---

**What happened?**

**What did you expect to happen?**

**Steps to reproduce:**

1.
2.
3.

**Mode you were in:** Safe / Strict / Off

**Chrome version:**

**Any other context (screenshots, URLs with params redacted)?**

```

- [ ] **Step 3: Commit**

```bash
git add .github/
git commit -m "chore: add GitHub issue templates"
```

---

### Task 5: Write Chrome Web Store listing copy

**Files:**
- Create: `docs/store-listing.md`

Draft all CWS listing fields here before entering them into the dashboard. Easier to edit in a file than in the web UI.

- [ ] **Step 1: Create `docs/store-listing.md`**

```markdown
# Chrome Web Store Listing — FBCLID Cleaner

## Name
FBCLID Cleaner

## Short description (132 characters max)
Removes Facebook and marketing tracking parameters from URLs. Three modes: Safe, Strict, and Off.

## Full description

FBCLID Cleaner quietly removes tracking parameters from URLs as you browse — no setup, no configuration required.

**Safe mode (default)**
Strips `fbclid`, `utm_source`, `utm_medium`, and `utm_campaign` from links clicked on Facebook. Your URLs stay clean without affecting anything else.

**Strict mode**
Removes a wider set of marketing parameters (`utm_term`, `utm_content`, `gclid`, `dclid`, `msclkid`, `mc_eid`, `igshid`) on all navigations. Also blocks Meta Pixel endpoints (`connect.facebook.net`, `facebook.com/tr`) in third-party contexts.

**Off mode**
Disables all rules instantly. Switch back anytime.

**Privacy first**
- No data collected. No analytics. No telemetry.
- Rules are static — no remote updates, no remote configuration.
- Stores only your selected mode, locally on your device.
- Open source: github.com/REPLACE_WITH_YOUR_GITHUB_USERNAME/fbclid-cleaner

Switch modes with one click from the toolbar popup.

## Category
Productivity

## Language
English

## Privacy policy URL
https://raw.githubusercontent.com/REPLACE_WITH_YOUR_GITHUB_USERNAME/fbclid-cleaner/main/privacy-policy.md

## Screenshots needed (1280x800 or 640x400)
1. Popup showing Safe mode selected
2. Popup showing Strict mode selected
3. Browser address bar — before (with fbclid) vs after (clean URL)

## What's new (for update submissions)
Initial public release.
```

- [ ] **Step 2: Replace the GitHub username placeholder** in the file.

- [ ] **Step 3: Commit**

```bash
git add docs/store-listing.md
git commit -m "docs: add CWS store listing copy"
```

---

### Task 6: Push to GitHub

- [ ] **Step 1: Create a `LICENSE` file in the project root**

```
MIT License

Copyright (c) 2026 REPLACE_WITH_YOUR_NAME

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Replace `REPLACE_WITH_YOUR_NAME` with your name.

```bash
git add LICENSE
git commit -m "chore: add MIT license"
```

- [ ] **Step 2: Create a new public repository on GitHub**

  Go to https://github.com/new and create a repo named `fbclid-cleaner`. Set visibility to **Public**. Do not initialize with a README (you already have one).

- [ ] **Step 3: Add the remote and push**

```bash
git remote add origin https://github.com/YOUR_USERNAME/fbclid-cleaner.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

- [ ] **Step 4: Enable GitHub Sponsors**

  Go to your GitHub profile → Settings → Sponsors. Follow the enrollment steps. Once active, the "Sponsor" button will appear on your repo.

- [ ] **Step 5: Update README placeholders**

  Now that the repo is live, update `README.md`:
  - Replace all `REPLACE_WITH_YOUR_GITHUB_USERNAME` instances with your actual username (if not already done in Task 3)
  - The CWS and Form URLs are still placeholders — update them after Tasks 7 and 8

```bash
git add README.md
git commit -m "docs: update README with live GitHub links"
git push
```

---

### Task 7: Create Google Form for feedback

This is done in the browser, not in code.

- [ ] **Step 1: Go to https://forms.google.com and create a new form**

  - Title: *FBCLID Cleaner — Feedback*
  - Add one Short answer question: *What would make this extension 10x more useful to you?*
  - No email collection required — leave "Collect email addresses" off

- [ ] **Step 2: Get the shareable link**

  Click **Send** → link icon → copy the URL. It will look like:
  `https://forms.gle/XXXXXXXXXXXXXXXXX`

- [ ] **Step 3: Update `popup.js` with the real URL**

  Open `popup.js`. Replace the placeholder:

  ```js
  // Before:
  const FEEDBACK_URL = "https://forms.google.com/REPLACE_WITH_YOUR_FORM_URL";

  // After (example):
  const FEEDBACK_URL = "https://forms.gle/XXXXXXXXXXXXXXXXX";
  ```

- [ ] **Step 4: Update `README.md` feedback link** with the same URL.

- [ ] **Step 5: Commit and push**

```bash
git add popup.js README.md
git commit -m "chore: add real feedback form URL"
git push
```

- [ ] **Step 6: Manual verification**

  Reload the extension in `chrome://extensions`, open the popup, click "Send feedback" — confirm it opens the Google Form in a new tab.

---

### Task 8: Prepare screenshots for CWS

This is a manual task done in Chrome.

- [ ] **Step 1: Load the extension in Chrome**

  Open `chrome://extensions`, load unpacked from the project root, pin the icon.

- [ ] **Step 2: Take screenshot — Safe mode**

  Open the popup with Safe mode selected. Take a screenshot. Resize/crop to 1280×800 if needed. Save as `docs/screenshots/popup-safe.png`.

- [ ] **Step 3: Take screenshot — Strict mode**

  Switch to Strict, take screenshot. Save as `docs/screenshots/popup-strict.png`.

- [ ] **Step 4: Take screenshot — before/after URL**

  Navigate to any URL that contains `?fbclid=ABC123` (you can construct one manually, e.g., `https://example.com?fbclid=ABC123&utm_source=fb`). With Safe mode on and Facebook as the initiator, the params will be stripped. Take a screenshot of the clean address bar. If hard to demonstrate in a single screenshot, use a simple before/after composite. Save as `docs/screenshots/url-before-after.png`.

- [ ] **Step 5: Commit screenshots**

```bash
mkdir -p docs/screenshots
git add docs/screenshots/
git commit -m "docs: add CWS screenshots"
git push
```

---

### Task 9: Submit to Chrome Web Store

- [ ] **Step 1: Open the CWS developer dashboard**

  Go to https://chrome.google.com/webstore/devconsole and sign in.

- [ ] **Step 2: Create a new item**

  Click **New item** → Upload `dist\fbclid-cleaner-0.2.0.zip` (run `package.ps1` first to regenerate it with the feedback link changes).

  ```powershell
  powershell -NoProfile -ExecutionPolicy Bypass -File .\package.ps1
  ```

- [ ] **Step 3: Fill in the listing fields**

  Copy each field from `docs/store-listing.md`:
  - Name, short description, full description
  - Category: Productivity
  - Language: English
  - Privacy policy URL: the raw GitHub URL from Task 2

- [ ] **Step 4: Upload screenshots**

  Upload the three screenshots from `docs/screenshots/`.

- [ ] **Step 5: Submit for review**

  Click **Submit for review**. Review typically takes 1–3 business days.

- [ ] **Step 6: Note your extension ID**

  After submission, the dashboard shows your extension ID (a 32-character string). Copy it and update the CWS install links in `README.md` and `docs/store-listing.md`.

```bash
git add README.md docs/store-listing.md
git commit -m "docs: add CWS extension ID to README"
git push
```

---

## Done

Phase 1 is complete when:
- [ ] Extension is live on Chrome Web Store
- [ ] GitHub repository is public with Sponsors enabled
- [ ] Feedback link in popup opens the real Google Form
- [ ] README links to CWS listing and GitHub Sponsors

**Next:** Begin Phase 2 — monitor installs, CWS reviews, GitHub Issues, and feedback form. Do not build new features until the move-on signal is met (50+ installs, 10+ feedback items, one feature requested by 3+ independent users).
