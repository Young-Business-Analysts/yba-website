# Fonts

## What the site uses today

**Montserrat**, loaded from Google Fonts by a `<link>` in the `<head>` of every
page. Three weights are used:

| Weight | Where |
|---|---|
| 400 | body copy |
| 600 | navigation, buttons, names, footer headings |
| 900 | every display heading |

## Why Montserrat

The brand typeface is **Gotham** (Hoefler&Co). It is commercially licensed and
cannot be shipped with a public website without a webfont licence, so the site
ships with the closest freely available substitute.

Montserrat was not chosen by eye. Ten candidate geometric sans faces were
tested by measuring the width of every heading and paragraph in the Figma
exports and solving for the letter-spacing that best reproduced them.
Montserrat had by far the best body-copy match (mean error 1.5%, worst case
2.0%) and its display match is within 1.3% once tracked at the values in
`tokens.css`. It is also the closest to Gotham in character: geometric, circular
bowls, flat-sided uppercase.

The tracking values that this produced live in `assets/css/tokens.css`:

```css
--ls-display: 0.188em;   /* 72px page titles  */
--ls-heading: 0.172em;   /* 42px headings     */
--ls-label:   0.186em;   /* 24px card labels  */
```

## Switching to the real Gotham

If YBA obtains a Gotham **webfont** licence, no markup or class changes are
needed — the font stacks already name Gotham first:

```css
--font-display: "Gotham", "Montserrat", "Helvetica Neue", Arial, sans-serif;
--font-body:    "Gotham", "Montserrat", "Helvetica Neue", Arial, sans-serif;
```

Three steps:

**1.** Drop the licensed `.woff2` files into this folder, e.g.

```
assets/fonts/Gotham-Book.woff2
assets/fonts/Gotham-Medium.woff2
assets/fonts/Gotham-Black.woff2
```

**2.** Add this block to the very top of `assets/css/base.css`:

```css
@font-face {
  font-family: "Gotham";
  src: url("../fonts/Gotham-Book.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Gotham";
  src: url("../fonts/Gotham-Medium.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Gotham";
  src: url("../fonts/Gotham-Black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
```

**3.** Delete the three Google Fonts `<link>` tags from the `<head>` of all 13
HTML pages (search for `fonts.googleapis.com`).

After switching, re-check the tracking values above. Gotham is very slightly
narrower than Montserrat, so headings may want a touch more letter-spacing —
around `0.19em`–`0.20em` for `--ls-display`. Compare against the Figma exports
and adjust the three tokens until they line up.

## Self-hosting Montserrat instead

If you would rather not depend on Google Fonts (for privacy, or so the site
works offline), download Montserrat from
<https://fonts.google.com/specimen/Montserrat>, put the `.woff2` files here,
and follow the same three steps above using `font-family: "Montserrat"`.
