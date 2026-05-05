# FBCLID Cleaner v0.2 Test Checklist

Browser: Chrome (latest stable)  
Extension build: `dist/unpacked`  
Test date: __________  
Tester: __________

## A) Setup

- [ ] Open `chrome://extensions`
- [ ] Enable Developer mode
- [ ] Load unpacked -> select `dist/unpacked`
- [ ] Confirm extension loads with no parse errors
- [ ] Pin extension icon for quick mode switching

## B) Safe Mode Tests (cleanup only from Facebook initiator)

- [ ] Set mode = `Safe` in popup
- [ ] From `facebook.com`, click outbound link containing `?fbclid=ABC123`  
      Expected: destination URL has no `fbclid`  
      Result URL: ______________________________

- [ ] From `facebook.com`, click outbound link containing `?a=1&fbclid=ABC123&b=2`  
      Expected: URL becomes `?a=1&b=2` (order may vary)  
      Result URL: ______________________________

- [ ] From `facebook.com`, click outbound link containing `?utm_source=x&utm_medium=y&utm_campaign=z`  
      Expected: these 3 params removed in Safe mode  
      Result URL: ______________________________

- [ ] From `facebook.com`, click outbound link containing `?a=1#section`  
      Expected: hash fragment (`#section`) preserved  
      Result URL: ______________________________

- [ ] Open same destination directly (not from Facebook) with `?fbclid=ABC123`  
      Expected in Safe mode: unchanged (initiator not Facebook)  
      Result URL: ______________________________

## C) Strict Mode Tests (broader cleanup + pixel blocking)

- [ ] Set mode = `Strict` in popup
- [ ] Directly open URL with `?utm_term=t&utm_content=c&gclid=g&dclid=d&msclkid=m&mc_eid=e&igshid=i`  
      Expected: all above removed in Strict mode  
      Result URL: ______________________________

- [ ] Open a site known to include Meta Pixel  
      DevTools -> Network -> filter `connect.facebook.net`  
      Expected: requests blocked/absent  
      Observed: ______________________________

- [ ] In same page, filter `facebook.com/tr`  
      Expected: requests blocked/absent  
      Observed: ______________________________

- [ ] Confirm normal site functionality still works (login, checkout, forms, navigation)  
      Expected: no breakage  
      Observed: ______________________________

## D) Off Mode Regression Tests

- [ ] Set mode = `Off` in popup
- [ ] Re-open test URL with `?fbclid=ABC123`  
      Expected: `fbclid` remains (no cleanup)  
      Result URL: ______________________________

- [ ] Re-check Network for `connect.facebook.net` / `facebook.com/tr`  
      Expected: requests may appear again (site-dependent)  
      Observed: ______________________________

## E) A/B Comparison Evidence

- [ ] Capture screenshots:
  - Safe: cleaned URL after Facebook click
  - Strict: blocked pixel request in Network
  - Off: tracker request present (if site emits it)
  - File names: ______________________________

- [ ] Record request counts on same page load:
  - Off mode: `connect.facebook.net` = ___, `facebook.com/tr` = ___
  - Strict mode: `connect.facebook.net` = ___, `facebook.com/tr` = ___
  - Expected: Strict <= Off

## F) Pass/Fail Criteria

- [ ] PASS if all are true:
  - Safe removes `fbclid` and core `utm_*` when initiator is Facebook
  - Strict removes extended params
  - Strict blocks major Meta Pixel endpoints
  - Off disables behavior
  - No critical page breakage

Overall verdict: PASS / FAIL

Notes:
____________________________________________________________
____________________________________________________________

---

# Known Limitations Checklist

Use this list to avoid over-claiming privacy guarantees.

- [ ] Facebook can still know you clicked a link inside Facebook itself.
- [ ] Removing query params does not erase Facebook's internal click logs.
- [ ] Logged-in session correlation can still link behavior probabilistically.
- [ ] Sites using server-side Conversions API may still report events to Meta.
- [ ] Strict mode may break attribution-dependent flows on some sites.
- [ ] New/unknown tracking params are not removed until rules are updated.
- [ ] This extension reduces major tracking vectors but does not provide full anonymity.

## Quick Statement Template

"This extension reduces common Facebook and marketing tracking signals (`fbclid`, selected UTM and click IDs, plus optional Meta Pixel blocking in Strict mode). It improves privacy, but does not fully prevent Facebook from knowing outbound clicks or all forms of cross-site attribution."
