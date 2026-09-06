/**
 * YBA — site behaviour
 * ---------------------------------------------------------------------------
 * Everything here is progressive enhancement: the site is fully readable and
 * navigable with JavaScript switched off. This file only adds
 *
 *   1. the mobile navigation toggle,
 *   2. a replay of the header-rule animation when the page is restored from
 *      the browser's back/forward cache (bfcache), so the line always plays,
 *   3. the share row's network links, pointed at the current page URL,
 *   4. "copy link" on the blog article's share row.
 *
 * The header-rule animation itself is pure CSS — see the "page header" section
 * of assets/css/components.css.
 */

(function () {
  "use strict";

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
     3. Share row — point each network at the current page
     -----------------------------------------------------------------------
     The links ship with the bare intent URL so the markup carries no
     hard-coded domain; here the page's own address is appended, which means
     the same file works on localhost, the Netlify preview and the live site.
     ----------------------------------------------------------------------- */

  var shareLinks = document.querySelectorAll("[data-share]");

  if (shareLinks.length) {
    var pageUrl = encodeURIComponent(window.location.href);

    var intents = {
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + pageUrl,
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + pageUrl,
      x: "https://twitter.com/intent/tweet?url=" + pageUrl
    };

    shareLinks.forEach(function (link) {
      var intent = intents[link.getAttribute("data-share")];
      if (intent) link.href = intent;
    });
  }

  /* -----------------------------------------------------------------------
     4. Share row — copy the current page link
     ----------------------------------------------------------------------- */

  var copyLink = document.querySelector("[data-copy-link]");

  if (copyLink && navigator.clipboard) {
    copyLink.addEventListener("click", function (event) {
      event.preventDefault();

      navigator.clipboard.writeText(window.location.href).then(function () {
        var label = copyLink.querySelector(".visually-hidden");
        var original = label ? label.textContent : "";

        copyLink.setAttribute("data-copied", "true");
        if (label) label.textContent = "Link copied";

        window.setTimeout(function () {
          copyLink.removeAttribute("data-copied");
          if (label) label.textContent = original;
        }, 2000);
      });
    });
  }
})();
