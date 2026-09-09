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
| `join.html` | The real sign-up destination for the "Join for free" button |
| `volunteer.html` | The Ambassador application form URL |
| `partnerships.html` | Partnership enquiries address, and each partner's website (5) |
| Resource sub-pages | Destination URLs for each entry, 17 in all (labels are final) |
| 3 blog posts | Artwork for 7 figures, left as commented-out `<figure>` blocks |
| `blog-ba-skills-to-product.html` | **Unpublished** — pulled from the live site for want of an author photograph. The file is intact and carries `robots: noindex`; nothing links to it. Supply a headshot for Soni Kaur, then add a card back to `blog.html` and `index.html` and drop the robots tag. |

Resolved: the footer **Contact us** address and the Deborah Garfen design
credit are live on every page; `privacy.html` carries the real contact address
in both section 1 and section 11; every post is dated 09.09.2026; and the share
row's Instagram button was replaced by WhatsApp, which — unlike Instagram —
publishes a share URL that works on desktop as well as mobile.

The blog runs eight live posts (nine were built) from the source documents in
`../blog files/`. `blog-post.html` is the original dummy article; nothing links
to it any more, and it is kept only as a template for writing the next post.

---

## Fonts

The brand typeface is **Gotham** (Hoefler&Co), and the licensed web fonts are
now installed — Book (400), Medium (600), Black (900) and Ultra (950), served
from `assets/fonts/` via `assets/css/fonts.css`. Montserrat remains second in
the font stack as a fallback only.

Note that the tracking values in `tokens.css` were originally fitted to
Montserrat, which is the wider face. See `assets/fonts/README.md`.

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

Pre-Prod development branch for Netlify
