# Young Business Analysts — website

A hand-built, responsive static website reproducing the YBA Figma prototypes.
No frameworks, no build step: every page is plain HTML that you can open,
read and edit directly.

---

## Quick start

Open `index.html` in a browser — that is genuinely all you need.

To preview it the way a real server would (recommended, because links and
paths behave exactly as they will once published):

```bash
python3 tools/serve.py
```

Then visit <http://localhost:4321>. The server sends no-cache headers, so a
plain refresh always shows your latest edit.

---

## What's in here

```
yba-website/
├── index.html                       Homepage
├── about.html                       About us
├── volunteer.html                   Volunteer (become an Ambassador)
├── partnerships.html                Partnerships + Our partners
├── get-involved.html                Get involved (kept; not in the current designs)
├── join.html                        Join for free
├── resources.html                   Resources hub (6 cards)
│   ├── resources-certifications.html
│   ├── resources-publications.html
│   ├── resources-awards.html
│   ├── resources-podcasts.html
│   └── resources-events.html
├── blog.html                        Blog: A to B — post listing
├── blog-post.html                   Blog: A to B — single article template
├── privacy.html                     Privacy policy
│
├── assets/
│   ├── css/
│   │   ├── tokens.css      ← every colour, size and spacing value
│   │   ├── base.css        reset, typography, layout helpers
│   │   ├── components.css  header, nav, footer, buttons, cards, lists
│   │   └── pages.css       rules for one page or page type only
│   ├── js/
│   │   └── main.js         mobile menu, share "copy link"
│   ├── img/                all photos, logos and placeholders
│   └── fonts/README.md     how to install the real Gotham
│
└── tools/
    └── serve.py            local preview server
```

The four CSS files load in that order, and each has a numbered table of
contents at the top. **If you only want to change how the site looks, start
with `assets/css/tokens.css`** — it holds every colour, font size, spacing
value and animation setting in one place, each one commented.

---

## How to make common changes

### Change a colour

`assets/css/tokens.css`, the "BRAND COLOURS" block. For example, to warm up
the gradient:

```css
--c-green: #dcf8cf;   /* the colour in the middle of the gradient */
--c-blue:  #cedcf9;   /* the colour at every edge                 */
```

Both the homepage hero and the "Become a member" band update automatically.

### Change the header line animation

`assets/css/tokens.css`, the "THE HEADER RULE" block:

```css
--rule-height: 15px;      /* how thick the line is                  */
--rule-start: 50px;       /* how long it is before it starts moving */
--rule-duration: 3000ms;  /* how long the extension takes           */
--rule-delay: 400ms;      /* pause before it begins                 */
--rule-ease: cubic-bezier(0.22, 0.61, 0.36, 1);
```

`--rule-start` is set to 50px because that is the length of the `B—A` dash
inside the logo — the line begins as that mark and grows out of it.

### Add a team member

`about.html`, inside `<ul class="team-grid">`. Copy one `<li class="team-member">`
block and change the name, role and image. If there is no photo yet, leave
`assets/img/placeholder.png` in place.

### Add a blog post

`blog.html`, inside `<ul class="grid-4 grid-4--posts">`. Copy one `<li>` block
and change the title, the excerpt and the two `href`s. Blog cards are text
only — title, excerpt, link — so there is no image to supply. To create the
article itself, copy `blog-post.html` and edit it.

### Add a resource

Each resource sub-page (`resources-podcasts.html` and friends) is a list of
`<li class="media-row">` blocks — a 145×145 thumbnail plus a title, a
description and a link. Copy one and edit it. For a row with no image, leave
the `<div class="media-row__thumb"></div>` empty and it renders as the
design's soft grey box.

### Change the navigation

The header and footer markup is repeated at the top and bottom of every page,
between the comments:

```html
<!-- SITE HEADER (shared — keep identical on every page) -->
...
<!-- /SITE HEADER -->
```

If you edit one, apply the same edit to all 13 pages so they stay in step.
(This is the one trade-off of having no build step; it keeps every page a
self-contained file you can open and read.)

---

## Things left for you to fill in

These are marked with `<!-- TODO -->` comments in the HTML:

| Where | What is needed |
|---|---|
| Footer, every page | A **Contact us** address or page |
| Footer, every page | Deborah Garfen's portfolio/LinkedIn URL for the design credit |
| `join.html` | The real sign-up destination for the "Join for free" button |
| `volunteer.html` | The Ambassador application form URL |
| `partnerships.html` | Partnership enquiries address, and each partner's website |
| Resource sub-pages | Destination URLs for each entry (labels are now final) |
| `privacy.html` | The `[Insert email address]` placeholder in section 11 |

The blog pages and the homepage blog strip use the design's placeholder copy
("Lorem ipsum…"), exactly as the prototype does. Replace them as real posts are
written — the cards are text-only now, so there is no image to supply.

---

## Fonts

The brand typeface is **Gotham** (Hoefler&Co), which is commercially licensed
and cannot be redistributed. The site ships with **Montserrat** as the
stand-in — it is the closest widely available match for Gotham's geometric
letterforms, and its metrics were measured against the designs so that
headings and body copy land within about 1% of the Figma widths.

If YBA holds a Gotham web licence, see `assets/fonts/README.md`. Adding it is
a single `@font-face` block; the font stacks in `tokens.css` already list
Gotham first, so every page picks it up with no other change.

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The site uses
`clamp()`, CSS grid, `aspect-ratio` and custom properties, all of which have
been widely supported since 2021.

Accessibility built in:

- A "Skip to content" link on every page.
- The current page is marked with `aria-current="page"` and underlined.
- Visible focus outlines for keyboard users.
- The mobile menu is a real `<button>` with `aria-expanded`, and closes on `Esc`.
- The header line animation is suppressed for anyone whose system asks for
  reduced motion.
- Every meaningful image has alt text; decorative placeholders have empty alt.

---

## How closely it matches the design

Each page was measured against its Figma export at 1440px wide. Every page's
full rendered height is within **5 pixels** of the original — see
`DESIGN-NOTES.md` for the per-page figures, the measurements the layout was
built from, and the handful of deliberate decisions where the designs
contradicted themselves.

The site was updated in August 2026 to the **YBA-2** designs. Every change made
in that pass — and how to reverse each one — is recorded in
`CHANGELOG-YBA2.md`.
