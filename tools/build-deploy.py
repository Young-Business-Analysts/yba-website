#!/usr/bin/env python3
"""Assemble a clean folder containing exactly what should go on the web server.

    python3 tools/build-deploy.py

Creates ./deploy/ — upload the CONTENTS of that folder (not the folder itself)
into your hosting web root. Everything that is only useful while developing
(the verification harnesses, this script, the notes) is left behind.

Run it again any time; it rebuilds from scratch.
"""
import os
import pathlib
import shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "deploy"

# Anything matching these is development-only and never published.
SKIP_DIRS = {"deploy", "_ref", "tools", ".claude", ".git", "__pycache__"}
SKIP_FILES = {"README.md", "DESIGN-NOTES.md", ".DS_Store"}
SKIP_SUFFIXES = {".py", ".md"}

# ...except these, which the site genuinely needs.
KEEP_ANYWAY = {".htaccess"}


def include(path: pathlib.Path) -> bool:
    rel = path.relative_to(ROOT)
    if any(part in SKIP_DIRS for part in rel.parts):
        return False
    if path.name in KEEP_ANYWAY:
        return True
    if path.name in SKIP_FILES:
        return False
    if path.suffix in SKIP_SUFFIXES:
        return False
    return True


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)

    copied, total = 0, 0
    for path in sorted(ROOT.rglob("*")):
        if path.is_dir() or not include(path):
            continue
        target = OUT / path.relative_to(ROOT)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, target)
        copied += 1
        total += path.stat().st_size

    pages = sorted(p.name for p in OUT.glob("*.html"))
    print(f"deploy/ built — {copied} files, {total / 1024:.0f} KB\n")
    print(f"{len(pages)} pages: {', '.join(pages)}\n")

    # A missing .htaccess is easy to overlook because it starts with a dot.
    if (OUT / ".htaccess").exists():
        print("  .htaccess included (make sure your FTP client shows hidden files)")
    else:
        print("  WARNING: .htaccess is missing")

    print("\nNext: upload everything INSIDE deploy/ to your web root")
    print("      (htdocs/, public_html/ or www/ depending on the host).")


if __name__ == "__main__":
    main()
