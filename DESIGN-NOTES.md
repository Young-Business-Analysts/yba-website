# Design notes

> **August 2026 — these notes describe the original build.** The site has since
> been updated to the YBA-2 designs (new nav, new Volunteer and Partnerships
> pages, text-only blog cards, real team photos). See `CHANGELOG-YBA2.md` for
> everything that changed and the current per-page accuracy figures.

How this website was derived from the Figma prototypes, what was measured,
and the handful of decisions where the designs needed interpreting.

---

## 1. Method

The thirteen Figma exports are 1440px-wide PNG/JPG frames. Rather than eyeball
them, every value in the site was **measured out of the pixels**:

- Background bands were found by sampling a column of pixels down each export
  and recording where the colour changes — that gives exact section boundaries.
- Element positions came from scanning for runs of dark pixels row by row and
  column by column.
- Type sizes were derived from measured **cap heights** (cap height ÷ 0.71 for
  this typeface), and confirmed against the measured **ink widths** of the
  actual strings.
- Letter-spacing was fitted numerically: for each heading size, the tracking
  that minimised the error across every real heading in the designs.

The result was then checked the other way round: each finished page is
rendered in a browser at 1440px and its element positions and total height
compared back against the export.

---

## 2. The system that came out of it

### Grid

| | |
|---|---|
| Frame width | 1440px |
| Content column | **1320px**, 60px gutters each side |
| Underlying grid | 12 columns of 88px, 24px gutters |
| Card row | 4 × 312px with 24px gutters (3 grid columns each) |

### Colour

| Token | Value | Used for |
|---|---|---|
| `--c-black` | `#000000` | text, buttons, footer, the header rule |
| `--c-white` | `#ffffff` | page background |
| `--c-surface` | `#faf8f9` | cards, the "Working with" band, empty thumbnails |
| `--c-placeholder` | `#c4c4c4` | grey box where a photo is not yet chosen |
| `--c-blue` | `#cedcf9` | outer colour of the gradient |
| `--c-green` | `#dcf8cf` | centre colour of the gradient |

The gradient is not a guess. Sampling it across both axes showed an ellipse
whose radii are exactly half the width and half the height of its box, mixing
linearly from green at the centre to blue at every edge — reproduced exactly by:

```css
radial-gradient(ellipse 50% 50% at 50% 50%, #dcf8cf 0%, #cedcf9 100%)
```

Sampled midpoints matched the predicted mix to within one value per channel.

### Type

| Role | Size | Line height | Tracking | Weight |
|---|---|---|---|---|
| Page title / hero | 72px | 70px | 0.188em | 900 |
| Section heading | 42px | 1.1 | 0.172em | 900 |
| Card title / label | 24px | 1.17 | 0.186em | 900 |
| Lead paragraph | 20px | 26px | — | 400 |
| Body | 16px | 22px | — | 400 |
| Footer / small | 14px | 20px | — | 400/600 |

All display type is uppercase. Every secondary heading in the designs —
`BUILT FOR THE BOLD`, `MEET THE TEAM`, `VOLUNTEER`, the Resources sub-page
titles, the blog article title — measures the same 42px; there is no separate
third heading size.

### Vertical rhythm

Major sections are **72px** apart throughout. Each `.section` carries that
space above itself only, so two sections in a row are always exactly 72px
apart no matter what they contain.

### The header rule

| | |
|---|---|
| Thickness | 15px |
| Vertical position | centred on the title, nudged 3px down |
| Gap after the title | ~27px from the last letter |
| Right end | runs to the edge of the page (full bleed) |

On the homepage it is attached to the **last line** of the three-line hero, not
the block as a whole — which is why it lines up with `AMBITIOUS`.

### The animation

The line starts at **50px** — the length of the `B—A` dash inside the logo —
and extends to the page edge. It is done with pure CSS: the visible bar is a
pseudo-element animated from `width: 50px` to `width: 100%` of the space the
flex row gives it. That means the easing plays across the full distance on
every page, whatever the title's length, without any JavaScript measuring
things.

Verified by sampling the animation's own timeline on the About page:

| Time | Bar length |
|---|---|
| 0–400ms | 50px (the delay, holding the logo mark) |
| 700ms | 268px |
| 1000ms | 454px |
| 1400ms | 628px |
| 3400ms | 855px — the full width |

Anyone whose system asks for reduced motion sees the finished line immediately.

### Footer

240px tall, 30px padding. Two link columns 159px wide with a 34px gap,
right-aligned to the content edge. Links sit on a 40px pitch (20px line +
20px gap).

---

## 3. Accuracy

Full rendered page height at 1440px versus the Figma export:

| Page | Rendered | Figma | Difference |
|---|---|---|---|
| index.html | 2677 | 2675 | +2 |
| about.html | 2918 | 2917 | +1 |
| get-involved.html | 2002 | 2004 | −2 |
| join.html | 2108 | 2110 | −2 |
| resources.html | 1902 | 1902 | 0 |
| resources-certifications.html | 1433 | 1435 | −2 |
| resources-publications.html | 1248 | 1250 | −2 |
| resources-awards.html | 1248 | 1250 | −2 |
| resources-podcasts.html | 1803 | 1805 | −2 |
| resources-events.html | 1803 | 1805 | −2 |
| blog.html | 1802 | 1806 | −4 |
| blog-post.html | 2798 | 2793 | +5 |
| privacy.html | 3789 | 3792 | −3 |

Worst case 5px over 2793 — 0.2%. The residual comes from Montserrat's metrics
differing slightly from Gotham's; it will shrink further if the real Gotham is
installed.

Paragraph line breaks were matched too, by setting each text block to the same
measure the design uses (940px for intro copy, 740px for blog article copy,
940px for the privacy policy) so that copy wraps on the same words.

---

## 4. Decisions and deviations

Places where the designs were ambiguous or contradicted themselves, and what
was done about it.

### 4.1 Header navigation alignment — the one deliberate change

In Figma the navigation group's right edge sits at **x = 1351 on the homepage**
and **x = 1325 on every other page**. Meanwhile everything else in the
designs — footer columns, card grids, photos, page titles — aligns to
**x = 1380** (a 60px margin).

Two different values cannot both be intentional, and neither lines up with the
rest of the page. The navigation is therefore aligned to the content edge at
1380, consistently on all thirteen pages. This makes the header agree with the
footer and with every element beneath it, and keeps the responsive layout
coherent.

To go back to the Figma positions instead, add this to `pages.css`:

```css
.site-header__inner { padding-right: 115px; }          /* inner pages */
.hero .site-header__inner { padding-right: 89px; }     /* homepage    */
```

### 4.2 Copyright year

Twelve of the thirteen exports read **© 2024**; the blog article frame reads
**© 2026**. The site uses 2024 everywhere. Worth confirming which is intended
before launch.

### 4.3 The Privacy page has no logo in the design

The `Resources_Privacy` frame's header is blank where the logo sits on every
other page — almost certainly a hidden layer in that one Figma frame. The
built page includes the logo, as a site with a missing logo on one page would
read as broken.

### 4.4 Duplicate team member

The About page's team grid lists **"Bianca Christian / Role" twice** (row 2
column 4, and row 3 column 1). This is reproduced faithfully, but it looks
like an oversight in the design and probably wants correcting.

### 4.5 Two button sizes

The designs use two: a 16px label (131 × 46px) in the header, hero and CTA
band, and an 18px label (143 × 46px) for buttons inside page copy. Both exist
as `.btn` and `.btn--lg`.

### 4.6 Fixed card height

Both card grids draw their cards at exactly 430px tall (170px image + 260px
panel), even where the copy does not fill the panel. Reproduced with
`min-height: 430px`, which is released below 840px where cards stack and a
fixed height would only add dead space.

### 4.7 Placeholder content kept as designed

The designs contain deliberate placeholder copy, all of it reproduced as-is
and marked with `TODO` comments in the HTML:

- "Lorem ipsum" body text and link labels on the blog and resource sub-pages
- The "Lorem ipsum" link label on the Resources page's Podcasts card
- "Role" as the job title for most team members, and "Tag" for article tags
- "Include what this actually involves" on Get involved — a note to self left
  in the design
- The checkerboard placeholder image, which is the Figma "no image chosen"
  swatch

### 4.8 Which blog export is which

`Page-YBA_Desktop_Blog_Landing.jpg` is the **post listing** (it has the
animated rule beside the title) and `Page-YBA_Desktop_Blog.jpg` is the
**single article** (it has a Back link). They map to `blog.html` and
`blog-post.html` respectively.

### 4.9 Typeface

Gotham is licensed and cannot ship with a public site, so Montserrat stands
in. See `assets/fonts/README.md` for the reasoning, the measurements behind
the choice, and how to swap the real Gotham in.

---

## 5. Responsive behaviour

The designs only exist at 1440px, so the smaller layouts are an
interpretation. Three breakpoints are used consistently:

| Width | What changes |
|---|---|
| 1080px | gutters 60 → 40px; 4-column rows become 2; team grid to 3 |
| 1024px | navigation collapses into a menu button and drop-down panel |
| 840px | gutters → 32px; section rhythm tightens; rule thins to 10px; team grid to 2; cards free to size to their content |
| 600px | gutters → 20px; everything stacks to one column; rule thins to 8px and starts at 32px |

Display type is fluid via `clamp()`, so headings scale smoothly rather than
jumping at each breakpoint. Every page was checked at 1440, 1280, 1024, 900,
768, 600, 480, 390 and 320px for horizontal overflow — there is none.

---

## 6. Reproducing the checks

Three small harnesses live in `_ref/` — a development-only folder that can be
deleted before publishing without affecting the site.

Start the server first: `python3 tools/serve.py`

| Open | What it does |
|---|---|
| <http://localhost:4321/_ref/verify.html> | Renders every page at 1440px and tabulates its height against the Figma export |
| <http://localhost:4321/_ref/verify-responsive.html> | Renders every page at nine widths and reports any horizontal overflow |
| <http://localhost:4321/_ref/font-calibration.html> | Measures candidate typefaces against the design's heading and body widths — re-run this if you ever change font |

### The difference overlay

The most useful technique of the whole build: lay the Figma export on top of
the live page in difference-blend mode, so anything misaligned glows white and
anything that lines up goes black.

First copy the export you want to check into `_ref/`:

```bash
cp "/Users/tofu/Downloads/YBA/YBA_Desktop_Homepage.jpg" _ref/
```

Then open the matching page and paste this into the browser console:

```js
const o = document.createElement('img');
o.src = '/_ref/YBA_Desktop_Homepage.jpg';   // match the page you are on
o.style.cssText = 'position:absolute;top:0;left:0;width:1440px;z-index:9999;' +
                  'pointer-events:none;mix-blend-mode:difference';
document.body.style.position = 'relative';
document.body.appendChild(o);
```

Run it again to remove the overlay. Do this at a 1440px-wide window.
