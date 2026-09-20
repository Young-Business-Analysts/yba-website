/**
 * YBA — site behaviour
 * ---------------------------------------------------------------------------
 * Everything here is progressive enhancement: the site is fully readable and
 * navigable with JavaScript switched off. This file only adds
 *
 *   0. revealing the text once Gotham or Montserrat has loaded — the page
 *      deliberately shows no words until one of them does. This does not
 *      break the no-JavaScript case: the flag that hides the text is itself
 *      set by script, so with JavaScript off it is never set and the page
 *      renders normally in whatever face is available.
 *   1. the mobile navigation toggle,
 *   2. a replay of the header-rule animation when the page is restored from
 *      the browser's back/forward cache (bfcache), so the line always plays,
 *   3. the blog article's share row — the network links are pointed at the
 *      page's canonical URL, and "copy link" is handled here because no href
 *      can copy to a clipboard.
 *
 * The header-rule animation itself is pure CSS — see the "page header" section
 * of assets/css/components.css.
 */

(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     0. Reveal the text once a brand face has loaded
     -----------------------------------------------------------------------
     An inline script in <head> sets `fonts-pending` on <html>, which holds
     every glyph transparent (see the matching rule in base.css). This clears
     it, but only after confirming a face genuinely loaded.

     document.fonts.ready is deliberately NOT used: it resolves once font
     loading has *settled*, success or failure alike, so a failed download
     would still reveal the page — in Arial, which is the thing being avoided.
     document.fonts.load() resolves with the faces it matched, so an empty
     result means the face is not there.

     Gotham is tried first, Montserrat second. If neither arrives the class is
     never removed and the page stays wordless, by design.
     ----------------------------------------------------------------------- */

  var docEl = document.documentElement;

  if (docEl.className.indexOf("fonts-pending") !== -1) {
    var reveal = function () {
      docEl.className = docEl.className.replace(/\bfonts-pending\b/, "").trim();
    };

    // No Font Loading API (very old browsers): reveal rather than strand them.
    if (!document.fonts || !document.fonts.load) {
      reveal();
    } else {
      // 950 is asked for last; Montserrat stops at 900 and the font matching
      // algorithm resolves it to that, which still counts as present.
      var resolves = function (family) {
        return Promise.all([
          document.fonts.load('400 1rem "' + family + '"'),
          document.fonts.load('600 1rem "' + family + '"'),
          document.fonts.load('950 1rem "' + family + '"')
        ]).then(function (matched) {
          return matched.every(function (faces) { return faces.length > 0; });
        }).catch(function () {
          return false;
        });
      };

      resolves("Gotham")
        .then(function (ok) { return ok || resolves("Montserrat"); })
        .then(function (ok) { if (ok) reveal(); });
    }
  }

  /* -----------------------------------------------------------------------
     1. Mobile navigation
     -----------------------------------------------------------------------
     The button is hidden by CSS above 1024px, so this listener simply never
     fires on desktop.
     ----------------------------------------------------------------------- */

  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    // One helper so every path (click, Escape, resize) stays in step.
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.setAttribute("data-open", String(open));
      // The body flag drives the white logo and the scroll lock in CSS.
      if (open) {
        document.body.setAttribute("data-nav-open", "true");
      } else {
        document.body.removeAttribute("data-nav-open");
      }
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close the menu on Escape, and return focus to the button.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // If the window is widened back to desktop, drop the open state so the
    // desktop nav is not left with stale attributes.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) {
        setOpen(false);
      }
    });

    // Tapping any destination closes the panel.
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
  }

  /* -----------------------------------------------------------------------
     2. Replay the header rule on back/forward navigation
     -----------------------------------------------------------------------
     When a page is served from the bfcache the CSS animation does not run
     again. Removing and re-adding the element's animation restarts it, so
     the line extends every time the page is opened.
     ----------------------------------------------------------------------- */

  window.addEventListener("pageshow", function (event) {
    if (!event.persisted) return;

    document.querySelectorAll(".header-rule").forEach(function (rule) {
      rule.style.animation = "none";
      // Reading offsetWidth forces the browser to apply the change before
      // the animation is put back — this is what restarts it.
      void rule.offsetWidth;
      rule.style.animation = "";
    });
  });

  /* -----------------------------------------------------------------------
     3. Share row
     -----------------------------------------------------------------------
     Every button shares the page's CANONICAL address, not window.location,
     so a link shared from the Netlify preview or from a local server still
     sends people to the live page.

     LinkedIn, Facebook, X and WhatsApp each publish a URL you can pass a link
     to, so all four stay real anchors — they survive a middle-click or "open
     in new tab", and degrade to a plain link if this script never runs. Their
     hrefs are filled in below.

     Only "copy link" needs script, because no href can copy to a clipboard.
     ----------------------------------------------------------------------- */

  var shareRow = document.querySelector(".share-list");

  if (shareRow) {
    var canonical = document.querySelector('link[rel="canonical"]');
    var shareUrl = canonical ? canonical.href : window.location.href;

    // The <title> carries the site name after an em dash; the networks only
    // want the article's own title.
    var shareTitle = document.title.split(" — ")[0];

    var encodedUrl = encodeURIComponent(shareUrl);
    var encodedTitle = encodeURIComponent(shareTitle);

    var intents = {
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + encodedUrl,
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl,
      x: "https://x.com/intent/post?url=" + encodedUrl + "&text=" + encodedTitle,
      // WhatsApp takes one text field, so the title and link go together.
      whatsapp: "https://wa.me/?text=" + encodeURIComponent(shareTitle + " " + shareUrl)
    };

    shareRow.querySelectorAll("[data-share]").forEach(function (link) {
      var intent = intents[link.getAttribute("data-share")];
      if (intent) link.href = intent;
    });

    /* Swap a button's hidden label for two seconds, so the outcome is
       announced to a screen reader and CSS can show a visual tick. */
    var flash = function (button, message) {
      var label = button.querySelector(".visually-hidden");
      var original = label ? label.textContent : "";

      button.setAttribute("data-copied", "true");
      if (label) label.textContent = message;

      window.setTimeout(function () {
        button.removeAttribute("data-copied");
        if (label) label.textContent = original;
      }, 2000);
    };

    var copyToClipboard = function (button, okMessage) {
      if (!navigator.clipboard) {
        flash(button, "Copying is not supported in this browser");
        return;
      }
      navigator.clipboard.writeText(shareUrl).then(
        function () { flash(button, okMessage); },
        // Without this the button would fail silently — the clipboard is
        // refused when the document is not focused, among other cases.
        function () { flash(button, "Could not copy the link"); }
      );
    };

    var copyLink = shareRow.querySelector("[data-copy-link]");

    if (copyLink) {
      copyLink.addEventListener("click", function (event) {
        event.preventDefault();
        copyToClipboard(copyLink, "Link copied");
      });
    }
  }
})();
