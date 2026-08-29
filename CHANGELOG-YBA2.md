### 2. Images — extracted from the YBA-2 designs

Source: `../YBA-2/*.jpg`. Cropped at exact design coordinates, written to
`assets/img/`.

**2.1 — 13 new team headshots** (80x80). The team grid went from 16 people
(11 of them checkerboard placeholders) to **13 people, every one a real photo**.

`team-{kay-hardy, lauren-howes, debra-paul, ian-richards, daniel-grist,
deborah-garfen, helen-holder, joanne-fahy, joseph-haslam, nicola-pinkney,
thando-jacobs, tofu-oludare, vishal-gutpa}.jpg`

Four of these overwrote existing files (kay-hardy, lauren-howes, debra-paul,
deborah-garfen); nine are new. *No file was deleted* — the previously used
`team-joe-haslam.jpg` is left in place, unreferenced.

**2.2 — 6 new Resources card images** (312x170). The Resources cards used flat
grey placeholders; the new design has real photography.

`resource-{certifications, publications, awards, podcasts, events, blog}.jpg`

**2.3 — 5 podcast thumbnails replaced** (145x145). The BA Brew artwork changed,
and **slots 4 and 5 swapped order** in the new design (The Visual Jam now comes
before Future Business Analyst), so those two files were re-cropped accordingly.

**2.4 — 3 certification logos replaced** (145x145): `cert-{assist,bcs,iiba}.png`.

**Reverse any of the above:**
```
git checkout 3c98e61 -- assets/img          # restore all replaced images
git clean -n assets/img                     # preview which new files would go
git clean -f assets/img                     # delete the newly added images
```

### 3. Global — navigation, footer and shared wording

Applied identically to **all 14 existing pages**.

**3.1 — Header navigation rebuilt**

| Before | After |
|---|---|
| About us · Get involved · Resources · Blog: A to B | About us · **Volunteer** · **Partnerships** · Resources · Blog: A to B |

"Get involved" is no longer a nav item (per the YBA-2 designs), but
`get-involved.html` still exists and is still linked from the homepage's
"Peer-powered" card. `aria-current="page"` was re-applied per page.

**3.2 — Footer rebuilt**

- The **"Company" and "Support" headings were removed** (not in the new design).
- Column 1: About us · Contact us · **Partnerships** · Privacy
- Column 2: **Volunteer** · Blog: A to B · Join for free · Resources
- "Get involved" and "LinkedIn" no longer appear in the footer.

**3.3 — Copyright** `© 2024` → **`© 2026`** on every page.

**3.4 — "Become a member" band copy**
"Join **a** growing network…" → "Join **our** growing network…"

**3.5 — `404.html` quick-links** now mirror the new nav (Volunteer and
Partnerships added). The Get involved shortcut was dropped from this list only;
the page itself is untouched.

**Reverse:** `git checkout 3c98e61 -- '*.html'` (restores every page), or for a
single page `git checkout 3c98e61 -- about.html`.

### 4. Blog cards — image placeholders removed, text-only layout

The YBA-2 designs drop the picture placeholder from every blog card. The card
is now: **title (20px) → excerpt (16px) → underlined link**.

Applied in three places (all three show the same treatment in the new designs):

| File | Cards |
|---|---|
| `index.html` — "Blog: A to B" strip | 4 |
| `blog.html` — post listing | 8 |
| `blog-post.html` — "Read more" | 4 |

**HTML** — each card went from an `<a class="post-card">` wrapping an image,
title and excerpt, to an `<li class="post-card">` containing a linked title,
the excerpt, and a `.link` beneath it:

```html
<li class="post-card">
  <h3 class="post-card__title"><a class="post-card__link" href="blog-post.html">…</a></h3>
  <p class="post-card__text">…</p>
  <a class="link post-card__more" href="blog-post.html">Lorem ipsum</a>
</li>
```

**CSS** (`assets/css/components.css`, section 5) — removed the now-unused
`.post-card__media` rules; added `.post-card__link` (inherits colour,
underlines on hover) and `.post-card__more` (12px top margin).
**No colour, font, size or spacing token was changed.**

**Reverse:**
```
git checkout 3c98e61 -- index.html blog.html blog-post.html assets/css/components.css
```

### 5. Two new pages — `volunteer.html` and `partnerships.html`

The YBA-2 set adds two pages that did not exist before. Both are built from the
same shared page shell (header, CTA band, footer) as every other page, and use
only existing type and colour tokens.

**5.1 — `volunteer.html`** (new file)
Title + animated rule, then "Become an ambassador" with three sub-sections
(Responsibilities / What we're looking for / A note on paid memberships), an
"Apply to be an ambassador" button, the feature photo, CTA band and footer.
Rendered height **2672px — exactly matching the design.**

**5.2 — `partnerships.html`** (new file)
Title + animated rule, what partnership means (with a 7-point list), a
"Partnership enquiries" button, then "Our partners" — five media rows for
AssistKD, IRM UK, BCS, BA Life and IIBA UK, reusing the existing partner logos.
Rendered height **2629px vs 2620px in the design (+9px, 0.3%).**

**5.3 — CSS added** (`assets/css/pages.css`, new section 3c)
`.rich-text` — the vertical rhythm for long-form copy with sub-headings and
bullet lists (22px between paragraphs, 24px around sub-headings, 8px between
list items). Headings reuse the existing `.section-title` (42px) and
`.card-title` (24px). **No new colours, fonts or type sizes.**

**5.4 — Two shared-component corrections**, both measured from the new designs
and both affecting the Resources sub-pages too:

| Rule | Before | After |
|---|---|---|
| `.media-row__title` bottom margin | 9px | **8px** |
| `.media-row .link` bottom padding | 8px (inherited from `.link`) | **0** — the underline sits tight under the text in a media row |

The 8px drop on `.link` is unchanged everywhere else (cards, blog, buttons).

**Reverse:**
```
rm volunteer.html partnerships.html
git checkout 3c98e61 -- assets/css/pages.css assets/css/components.css
```
(Note: reverting those two stylesheets also undoes the blog-card change in §4.)

### 6. Primary page content

**6.1 — `index.html`**

| What | Before | After |
|---|---|---|
| Hero standfirst | "**Programmes, mentorship and** opportunities for the curious and the capable." | "**Networking and** opportunities for the curious and the capable." |
| Partner logo order | ASSIST, **BCS**, IRM UK, BA Life, IIBA | ASSIST, **IRM UK**, BCS, BA Life, IIBA |
| Meta description | — | updated to match the new hero line |

The four "Built for the bold" cards are unchanged, including the "Get involved"
link on the third card, which still points at `get-involved.html`.

**6.2 — `about.html`**

- **Team roster rebuilt: 16 people → 13, every one with a real photograph**
  (previously 11 of the 16 were checkerboard placeholders). New roles throughout;
  the duplicate "Bianca Christian" entry from the old design is gone.
  Order: Kay Hardy, Lauren Howes, Debra Paul, Ian Richards, Daniel Grist,
  Deborah Garfen, Helen Holder, Joanne Fahy, Joseph Haslam, Nicola Pinkney,
  Thando Jacobs, Tofu Oludare, Vishal Gutpa.
- Standfirst: "team of **ambassadors**" → "team of **volunteer Ambassadors**".
- Outro: "driven **volunteers**" → "driven **Ambassadors**".
- Button: "Apply to volunteer" → **"Apply to be an Ambassador"**, now pointing at
  `volunteer.html` (was `get-involved.html`).
- Partner logo order updated to match the homepage.

**6.3 — `join.html`** — rebuilt to the new design

- All-new copy: intro line, "As a free member, you'll get:" and a four-point
  list, closing with an inline link to `volunteer.html`.
- The old "Volunteer" callout section is gone (it is now its own page).
- **The "Become a member" band is removed** — the new design ends the page after
  the photo, which is correct for a page that *is* the join page.
- Rendered height **1558px — exactly matching the design.**

**6.4 — `resources.html`**

- All six cards now carry **real photographs** instead of flat grey placeholders.
- Podcasts card link label: "Lorem ipsum" → **"Podcasts"**.

**6.5 — CSS additions** (both opt-in classes; nothing existing was restyled)

| Class | File | Purpose |
|---|---|---|
| `.section--end` | `base.css` | 72px below the last section on a page that does not end with the CTA band (Join) |
| `.rich-text__spaced` | `pages.css` | the wider 44px gap the Join design sets above its closing line |

**Reverse:** `git checkout 3c98e61 -- index.html about.html join.html resources.html`

### 7. Resources sub-pages, blog article and privacy

**7.1 — The five Resources sub-pages** rebuilt from the new designs. All the
"Lorem ipsum" placeholder titles and link labels are gone, replaced with the
real copy.

| Page | Rows | Thumbnails |
|---|---|---|
| `resources-certifications.html` | 3 (AssistKD, BCS, IIBA®) | **kept** — logos |
| `resources-podcasts.html` | 5 | **kept** — artwork |
| `resources-publications.html` | 2 (BA Digest, BA Times) | **removed** in the new design |
| `resources-awards.html` | 2 | **removed** |
| `resources-events.html` | 5 | **removed** |

Podcasts also **reordered**: The Visual Jam now comes before Future Business
Analyst, and every description was rewritten.

**7.2 — `blog-post.html`**
- Date format `20/10/2025` → **`20.10.2025`**.
- **The row of five "Tag" links is removed** — it is not in the new design.
- "Read more" cards lost their images (see §4).

**7.3 — `privacy.html`** — several substantive content changes

| Section | Change |
|---|---|
| Header | Last updated `21.02.26` → **`03.08.26`** |
| §1 | `[Insert central YBA email address]` → a real mailto link, **hello@youngbusinessanalysts.org** |
| §2 | Rewritten: now "under 35, including those still at school or university" (the under-18 parental-consent sentence is gone) |
| §3A | Rewritten around joining via the LinkedIn group; 7 data bullets → 3 |
| §3B | Now collected "via a Google Form"; 7 bullets → 4 |
| §9 | New opening paragraph separating Ambassador data (Google Forms) from member data (LinkedIn) |

§11 still contains the design's own `[Insert email address]` placeholder — that
is how the new design reads, so it was left as-is.

**7.4 — Spacing corrections**, each measured from the new designs:

| Rule | Before | After | Affects |
|---|---|---|---|
| `.legal li` bottom margin | 0 | **8px** | Privacy list items (worth 160px on that page) |
| `.section-heading` bottom margin | 36px | **49px** | homepage "Blog: A to B" |
| `.grid-4--posts` row gap | 72px | **84px** | blog listing |
| `.post-grid` (new) | — | 16px top | blog listing sits lower under its title |
| `.article-share` top margin | 44px | **46px** | blog article |
| `.read-more__title` bottom margin | 34px | **48px** | blog article |
| `.media-row--text` (new) | — | single column | thumbnail-less rows |

**Reverse:** `git checkout 3c98e61 -- resources-*.html blog-post.html privacy.html assets/css`

---

## 8. Result

Every page measured against its YBA-2 design at 1440px wide:

| Page | Rendered | Design | Diff |
|---|---|---|---|
| index.html | 2510 | 2508 | +2 |
| about.html | 2878 | 2877 | +1 |
| volunteer.html | 2672 | 2672 | **0** |
| partnerships.html | 2629 | 2620 | +9 |
| join.html | 1558 | 1558 | **0** |
| resources.html | 1862 | 1862 | **0** |
| resources-certifications.html | 1402 | 1402 | **0** |
| resources-publications.html | 1116 | 1114 | +2 |
| resources-awards.html | 1226 | 1224 | +2 |
| resources-podcasts.html | 1763 | 1772 | −9 |
| resources-events.html | 1522 | 1514 | +8 |
| blog.html | 1510 | 1510 | **0** |
| blog-post.html | 2584 | 2577 | +7 |
| privacy.html | 3843 | 3846 | −3 |

Worst case 9px (0.5%). Also checked:

- **Zero horizontal overflow** on all 14 pages at 1440/1280/1024/900/768/600/480/390/320px.
- **No broken links or missing assets**; no orphaned pages.
- **16/16 pages structurally clean** — balanced tags, one `<h1>` each, no
  heading-level jumps, no duplicate ids, alt text on every image.

`get-involved.html` is intentionally excluded from the design comparison: it has
no YBA-2 design and only received the global nav/footer/CTA updates.

---

## 9. Corrections made during verification

| # | Issue found | Fix |
|---|---|---|
| 9.1 | The homepage hero still read "Programmes, mentorship and…" — the copy change had landed on the meta description instead, because both contained the same phrase and only the first occurrence was replaced. | Hero standfirst corrected to "Networking and opportunities for the curious and the capable." Verified no page still contains the old wording. |
| 9.2 | `.rich-text ul` reset its own margin, out-specifying the paragraph rhythm rule, so a list following a paragraph lost its 22px gap. | Removed the redundant `margin: 0` (the global reset already zeroes it). |
| 9.3 | Media rows sat ~10px too far apart because `.link` applied its 8px card-style underline drop inside them. | Scoped `.media-row .link { padding-bottom: 0 }` to match the design. |

A final sweep confirmed no stale copy anywhere: no "Join a growing network",
"© 2024", "team of ambassadors", "Apply to volunteer", "21.02.26", "20/10/2025"
or footer headings remain. The only "Lorem ipsum" link labels left are the blog
cards, which is what the design specifies, and the only "Get involved" link is
the homepage card — kept deliberately, per instruction.

---

## 10. Post-review fixes (24 Aug 2026)

Four issues raised after the first review. **Desktop rendering is byte-for-byte
unchanged** — the verification table in §8 re-runs to exactly the same numbers.

### 10.1 — "Back" links were hard to tap on a phone

The links themselves were never broken: all six point at the right page and
navigate correctly (confirmed by clicking through). The problem was the **tap
target: the word "Back" is only 35 × 20px**, well under the 44 × 44px that is
comfortable on a touch screen, so taps were missing it.

Fixed with an invisible pseudo-element that extends the hit area to
**67 × 44px** without moving the text or its underline by a pixel:

```css
.page-header__back { position: relative; }
.page-header__back::after { content: ""; position: absolute; inset: -12px -16px; }
```

Now passes WCAG 2.5.8 (24 × 24 minimum) and the 44 × 44 comfort target.
Affects `blog-post.html` and the five `resources-*.html` pages.

### 10.2 — "PARTNERSHIPS" broke mid-word on mobile

`.page-title` bottomed out at a fixed 34px, and "PARTNERSHIPS" is a single
unbreakable word needing ~359px (including its trailing letter-spacing) against
341px of available room at 375px wide — so it wrapped to "PARTNERSHIP / S".

Below 600px the title now scales with the viewport instead:

```css
.page-title            { font-size: min(34px, calc(8.27vw - 1.65px)); }
.page-header--sub .page-title { font-size: min(26px, calc(7.3vw - 0.6px)); }
```

`min()` means **nothing changes until the text would actually overflow** — at
480px and above the size is identical to before, and desktop is untouched. At
375px the title renders at ~29px on one line with the rule beside it.

### 10.3 — "Meet the team" now shows two per row on mobile

Was one full-width tile below 520px; now two columns, with the portrait moving
above the name so both fit a half-width column.

```css
@media (max-width: 520px) {
  .team-grid   { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 20px; }
  .team-member { grid-template-columns: 1fr; gap: 12px;
                 align-items: start; align-content: start; }
}
```

`align-content: start` matters: cards in a row stretch to the tallest, and
without it the spare height is shared between the photo and text rows, so a
one-line role ("Co-Founder") sat lower than a two-line one ("Co-Founder &
Advisor") and the names stopped lining up. Verified aligned across all 7 rows.

### 10.4 — Dark mode locked off

Samsung Internet (and Chrome's "auto dark theme") were algorithmically
inverting the palette, which breaks the gradient and the black bands. The site
now declares that it only supports light:

- `color-scheme: only light` on `:root` in `tokens.css`, repeated on `html` in
  `base.css` for browsers that only read it on the root element;
- `<meta name="color-scheme" content="light">` in the `<head>` of all 16 pages,
  so the signal arrives before CSS loads and there is no flash of inverted colour.

Confirmed: with the OS set to dark **and** the browser forced to a dark colour
scheme, every page still renders the light palette unchanged.

There are no `prefers-color-scheme` rules anywhere in the stylesheets, and the
comment in `tokens.css` warns against adding one unless a real dark palette is
designed.

### Re-verified after these changes

- Page heights vs the YBA-2 designs: **identical to §8** — no desktop regression.
- Horizontal overflow, 14 pages × 9 widths (1440→320): **all zero**.

**Reverse:** `git checkout 3c98e61 -- assets/css '*.html'`

---

## 11. Mobile header and menu redesign (24 Aug 2026)

Rebuilt from two supplied mobile designs (a 390 × 844 artboard exported at 2x).
Applies below the 1024px nav breakpoint — **desktop is untouched**, and the
verification table in §8 re-runs to exactly the same numbers.

### 11.1 — Logo drops its strapline

Below 1024px the logo is the Y-B—A mark alone, without "YOUNG BUSINESS
ANALYSTS". New asset `assets/img/yba-logo-mark.svg` (viewBox 0 0 191 32),
built from the first six drawn elements of the original logo.

The mark's `B—A` dash was two abutting rectangles; under the CSS invert used
for the open state the seam showed as a hairline, so they are merged into one.
The original `yba-logo.svg` is untouched.

Markup now carries **both** images with CSS showing one:

```html
<img class="site-logo__full" src="assets/img/yba-logo.svg"      width="191" height="50">
<img class="site-logo__mark" src="assets/img/yba-logo-mark.svg" width="191" height="32">
```

This was first built with `<picture>` + a `media` source, which **caused a real
4px desktop regression**: a `<picture>` resolves its source at first layout, so
in an iframe sized after parsing it picked the mobile mark at 1440px and the
header measured 166px instead of 170px. Two images toggled by a media query
are deterministic. Worth remembering.

### 11.2 — Header

| | Before | After |
|---|---|---|
| Logo | full lockup, 150px | **mark only, 152px** |
| Hamburger | 46 × 46 solid black box, white bars | **bare icon** — three 24 × 2px black rules, no box |
| Header padding | 60px | **16px** (puts the logo top at 25px, as designed) |

### 11.3 — Menu

Was a drop-down panel inset from the gutters; now a **full-screen black
overlay**:

- Logo stays visible top-left and inverts to white (`filter: invert(1)` — the
  mark is solid black, so this gives exactly the white version).
- The hamburger becomes a bare white **×** in place, above the panel.
- Every destination is plain white text at 20px on a 50px pitch, first item
  106px from the top.
- **"Join for free" is now just another item in the list**, not an inverted
  button — the button styling is stripped inside the panel.
- The page behind the panel is scroll-locked while it is open.
- Tapping any item closes the panel.

New tokens in `tokens.css`: `--logo-width-mobile: 152px`,
`--header-pad-y-mobile: 16px`, `--fs-nav-mobile: 20px`.

`main.js` now routes every open/close through one `setOpen()` helper, which
also sets `data-nav-open` on `<body>` — that flag drives the white logo and the
scroll lock from CSS.

### 11.4 — Estimated values

The designs were supplied as images, not Figma exports, so these were read off
the artboard rather than measured exactly. All are single-token changes:

| Value | Used | How it was derived |
|---|---|---|
| Menu item size | **20px** | text-width ratio suggested 19–20px; 20px is the existing `--fs-lead` |
| Item pitch | **50px** | measured 100px at 2x |
| First item offset | **106px** | measured cap-top 126px at 1x, less the line-box offset |
| Logo width | **152px** | measured 305px at 2x |
| Header padding | **16px** | derived so the logo top lands at the measured 25px |

### 11.5 — Re-verified

- Page heights vs the YBA-2 designs: **identical to §8** — no desktop regression.
- Horizontal overflow, 14 pages × 9 widths: **all zero**.
- Open/close, Escape, resize-to-desktop, close-on-tap, scroll lock, and the
  current-page marker all behave correctly, on both phone and tablet widths.

**Reverse:** `git checkout 3c98e61 -- assets/css assets/js '*.html' && rm assets/img/yba-logo-mark.svg`
