# Launch Progress

Strategy: Free → Listen → Pro (Approach A)
Full spec: `docs/superpowers/specs/2026-05-05-launch-strategy-design.md`
Full plan: `docs/superpowers/plans/2026-05-05-phase1-launch.md`

---

## Phase 1 — Launch Checklist

### Completed
- [x] Git initialized and all source files committed
- [x] Feedback link added to popup (`popup.js`, `popup.html`, `popup.css`)
- [x] Privacy policy written (`privacy-policy.md`)
- [x] README rewritten for public GitHub (`README.md`)
- [x] GitHub Issue templates created (`.github/ISSUE_TEMPLATE/`)
- [x] Chrome Web Store listing copy drafted (`docs/store-listing.md`)
- [x] MIT LICENSE added
- [x] `.gitignore` added (excludes `dist/`, `_metadata/`, `.superpowers/`)
- [x] Code pushed to GitHub: https://github.com/bankthe1/fbclid-cleaner
- [x] Google Form created and wired into popup: https://forms.gle/o7Lezu1ngbZBWKZH6

### Remaining
- [ ] **Task 8 — Screenshots** (manual, done in Chrome)
  - Load unpacked extension from project root in `chrome://extensions`
  - Screenshot popup in Safe mode → save as `docs/screenshots/popup-safe.png`
  - Screenshot popup in Strict mode → save as `docs/screenshots/popup-strict.png`
  - Screenshot clean URL in address bar → save as `docs/screenshots/url-clean.png`
  - Commit: `git add docs/screenshots/ && git commit -m "docs: add CWS screenshots" && git push`

- [ ] **Task 9 — CWS Submission** (manual, done in Chrome Web Store dashboard)
  - Run `package.ps1` to rebuild zip with all changes:
    ```powershell
    powershell -NoProfile -ExecutionPolicy Bypass -File .\package.ps1
    ```
  - Go to https://chrome.google.com/webstore/devconsole
  - Click **New item** → upload `dist\fbclid-cleaner-0.2.0.zip`
  - Fill listing fields from `docs/store-listing.md`
  - Upload the 3 screenshots from `docs/screenshots/`
  - Paste privacy policy URL: `https://raw.githubusercontent.com/bankthe1/fbclid-cleaner/main/privacy-policy.md`
  - Click **Submit for review** (takes 1–3 business days)
  - After approval: copy the extension ID and update README install links

- [ ] **GitHub Sponsors** — enroll at https://github.com/sponsors/bankthe1

- [ ] **After CWS approval** — update README with real CWS extension ID:
  - Replace `REPLACE_WITH_CWS_ID` in `README.md` with the actual ID
  - Run: `git add README.md && git commit -m "docs: add CWS extension ID" && git push`

---

## Phase 2 — Listen (start after CWS is live)

Monitor these sources. Do NOT build new features until the move-on signal is met.

| Source | What to watch |
|---|---|
| CWS dashboard | Installs, weekly active users, uninstall rate |
| CWS reviews | Recurring themes in positive and negative reviews |
| GitHub Issues | Tag and count feature requests by topic |
| Google Form | Look for repeated words across responses |

**Move-on signal to Phase 3:** 50+ installs AND 10+ feedback items AND one feature requested by 3+ independent users.

**If no traction after 6 weeks:** Post on ProductHunt before building anything.
