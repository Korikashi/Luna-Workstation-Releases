"""Generates the web versions of the official screenshots.

Reads the originals in docs/Capturas (never modified) and writes WebP files to public/screenshots:
  <slug>.webp      full resolution, lossless (identical pixels; used by the in-page viewer)
  <slug>-960.webp  960 px wide, high-quality lossy (gallery thumbnails and Hero on small screens)

The aspect ratio is always preserved (no cropping). The originals are fully opaque, so the alpha channel is dropped
without any visual change. Requires Python 3 with Pillow (WebP support).

Usage, from the project root:  python scripts/optimize_screenshots.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "Capturas"
OUT = ROOT / "public" / "screenshots"

# original file name -> published slug
SHOTS = {
    "Home.png": "home-pink",
    "Sesion activa.png": "active-session",
    "Grid.png": "grid-2x2",
    "Home borde redondo otro tema.png": "home-blue-rounded",
}

THUMB_WIDTH = 960


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, slug in SHOTS.items():
        with Image.open(SRC / name) as im:
            if im.mode == "RGBA" and im.getchannel("A").getextrema() != (255, 255):
                raise SystemExit(f"{name}: has transparent pixels; review before converting")
            rgb = im.convert("RGB")
            full = OUT / f"{slug}.webp"
            rgb.save(full, "WEBP", lossless=True, quality=100, method=6)
            height = round(rgb.height * THUMB_WIDTH / rgb.width)
            thumb = OUT / f"{slug}-{THUMB_WIDTH}.webp"
            rgb.resize((THUMB_WIDTH, height), Image.LANCZOS).save(thumb, "WEBP", quality=90, method=6)
            print(f"{slug}: {rgb.width}x{rgb.height} -> {full.stat().st_size} B; "
                  f"{THUMB_WIDTH}x{height} -> {thumb.stat().st_size} B")


if __name__ == "__main__":
    main()
