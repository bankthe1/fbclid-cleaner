# FBCLID Cleaner — Launch & Growth Strategy

**Date:** 2026-05-05
**Product:** FBCLID Cleaner (Chrome Extension v0.2.0)
**Approach:** Sequential — Free → Listen → Pro

---

## Context

Solo developer, work-from-home, good time availability. Primary constraint is Claude Code token budget, so build sessions must be well-scoped and deferred until user signal confirms what to build. The extension is functionally ready at v0.2.0. Chrome Web Store developer account already registered. Priority before launch is confirming the store listing assets and any minor feature additions worth including in the initial public release.

## Goals (in priority order)

1. **Revenue** — build a Pro tier over time based on real demand
2. **Audience** — grow a community of privacy-conscious users
3. **Profile** — open source presence on GitHub builds credibility
4. **Validation** — learn what a broader privacy product could look like

## Strategy: Approach A — Sequential

Free launch → observe real users → build only what was repeatedly requested as Pro.

Core principle: **do not spend tokens building features until at least 3 different users independently request the same thing.**

---

## Phase 1 — Launch (Month 1)

### Chrome Web Store
- ~~Create developer account~~ — already registered
- Write store listing with clear, privacy-focused copy
- Take screenshots: popup UI + before/after URL comparison
- Write a short Privacy Policy page (required by Google — no data collected, no telemetry, local storage only)
- Submit for review (typically 1–3 business days)

### GitHub
- Create public repository with MIT license
- README: what it does, install instructions, screenshots, link to CWS listing
- Enable GitHub Sponsors
- Add Issue templates: "Feature request" and "Bug report"
- Cross-link: CWS listing description links to GitHub, README links to CWS

### Feedback loop (built in from day 1)
- Add a small "Send feedback" link to the extension popup → Google Form
- Form has one question: *What would make this extension 10x more useful to you?*
- No email capture required — open-ended text only

### Initial distribution (space these out, do not post all at once)
- **r/privacy** — primary audience, privacy-conscious users
- **Hacker News "Show HN"** — broader tech reach
- **r/chrome** — secondary, broader audience

---

## Phase 2 — Listen (Month 2–3)

Do not build any new features during this phase. Observe and categorize only.

### What to monitor
| Source | What to track |
|---|---|
| CWS dashboard | Install count, weekly active users, uninstall rate |
| CWS reviews | Positive and negative themes |
| GitHub Issues | Count and categorize feature requests by topic |
| Google Form | Open-ended answers — look for repeated words/phrases |

### Move-on signal
Move to Phase 3 when **all** of the following are true:
- 50+ installs
- 10+ feedback items with identifiable patterns
- At least one feature has been requested independently by 3+ different people

### If no traction after 6 weeks
Do a ProductHunt launch before deciding to build anything. Traction problem may be distribution, not product.

---

## Phase 3 — Monetize (Month 4+)

### What to build
Build only the top 2–3 features from Phase 2 feedback. Do not guess.

Likely candidates (based on comparable tools — confirm with actual feedback):
- Custom rules editor (add your own tracking params to strip)
- Cross-device rule sync
- Broader platform coverage (Twitter/X, TikTok, LinkedIn tracking params)
- Rule set import/export

### Payment and gating
- **Payment processor:** Gumroad — simple setup, worldwide users supported, no monthly fee for indie sellers
- **Gating mechanism:** license key stored in `chrome.storage.local`, validated on Pro feature access
- **Pricing starting point:** $9 one-time or $3/month — keep it simple, adjust based on conversion
- **Core extension stays free forever** — this is a trust commitment, do not break it

### Announcing Pro
- GitHub release notes describing the new Pro features
- CWS update with "Pro tier now available" in the changelog
- Do not cold-email anyone — announce in channels where users already are

---

## Growth Management

| Stage | Action |
|---|---|
| 0–100 users | Focus on feedback quality. One detailed conversation > 50 silent installs. |
| 100–1,000 users | GitHub Issues become the product roadmap. Engage with power users — they become Pro early adopters. |
| 1,000+ users | Build a simple landing page. Consider a ProductHunt relaunch. Pro tier should exist by now. |
| Viral spike | Do not panic-build. Stay on the listen-first plan. Ship nothing unvalidated. |

---

## What this strategy does NOT include

- A backend, accounts, or database (not needed until/unless the dashboard SaaS path is chosen later)
- B2B or enterprise sales (wrong stage and wrong fit for a solo builder at launch)
- Paid advertising (organic distribution first; revisit only after Pro is live and converting)
- A fixed timeline for Pro launch (depends entirely on user signal, not a calendar date)
