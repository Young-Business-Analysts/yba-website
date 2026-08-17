#!/usr/bin/env python3
"""Tiny static file server for local preview.

Identical to `python3 -m http.server` except that it tells the browser never
to cache anything, so a hard refresh is never needed while editing.

    python3 tools/serve.py [port]

This is a development convenience only — it is not used in production.
"""
import functools
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Keep the console readable: only report failures.
        if not args or not str(args[1]).startswith("2"):
            super().log_message(fmt, *args)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4321
    handler = functools.partial(NoCacheHandler, directory=ROOT)
    print(f"YBA site running at http://localhost:{port}  (serving {ROOT})")
    http.server.ThreadingHTTPServer(("", port), handler).serve_forever()
