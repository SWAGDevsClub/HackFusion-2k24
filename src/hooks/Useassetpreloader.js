import { useEffect, useState } from "react";

/**
 * Preloads everything in src/assets and reports real progress (0-100).
 *
 * Put this file in src/hooks/. If your assets folder is somewhere else,
 * change the glob path below (it is relative to THIS file).
 *
 * Vite 5+ syntax. On Vite 3/4 use: { eager: true, as: "url" }
 */
const assetEntries = import.meta.glob("../assets/**/*", { eager: true, query: "?url", import: "default" });
// Exclude the 190 heavy hero sequence frames from the general asset preloader
// so the splash screen loads quickly and doesn't exhaust mobile device memory.
// Only keep the first frame as the poster.
const ASSET_URLS = Object.entries(assetEntries)
  .filter(([path]) => !path.includes("HeroFrames/frames3/frame_") || path.endsWith("frame_001.webp"))
  .map(([, url]) => url);

const IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|svg|bmp|ico)(\?.*)?$/i;
const FONT_RE = /\.(woff2?|ttf|otf)(\?.*)?$/i;

const IMAGES = ASSET_URLS.filter((u) => IMAGE_RE.test(u));
const FONT_FILES = ASSET_URLS.filter((u) => FONT_RE.test(u));
const PUBLIC_IMAGES = [
  "/images/winners_section.webp",
  "/images/winners/hackfusion-3-first.webp",
  "/images/winners/hackfusion-3-second.webp",
  "/images/winners/hackfusion-3-third.webp",
  "/images/footer/bedrock.webp",
  "/images/footer/map.webp",
];

// ---- individual loaders ----

const loadImage = (url) => () =>
  new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (!img.decode) {
        resolve();
        return;
      }
      img.decode().then(resolve, () => {
        if (!img.naturalWidth) console.warn(`Preloader could not decode image: ${url}`);
        resolve();
      });
    };
    img.onerror = () => {
      console.warn(`Preloader could not load image: ${url}`);
      resolve();
    };
    img.src = url;
  });

const loadFile = (url) => () =>
  fetch(url).then((response) => {
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    return response.blob();
  });

const waitForPageLoad = () =>
  new Promise((resolve) => {
    if (document.readyState === "complete") return resolve();
    window.addEventListener("load", () => resolve(), { once: true });
  });

const waitForFonts = () => (document.fonts?.ready ?? Promise.resolve()).then(() => {});

// don't let one stuck file freeze the bar forever
const withTimeout = (promise, ms, label) =>
  new Promise((resolve) => {
    const t = setTimeout(() => {
      console.warn(`Preloader timed out waiting for ${label}`);
      resolve();
    }, ms);
    promise.then(
      () => {
        clearTimeout(t);
        resolve();
      },
      (error) => {
        clearTimeout(t);
        console.warn(`Preloader failed for ${label}`, error);
        resolve();
      }
    );
  });

/**
 * @param minDuration  bar never finishes faster than this (ms), so cached loads don't flash
 */
export default function useAssetPreloader({ minDuration = 1200 } = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    let real = 0; // actual fraction loaded, 0-1
    let shown = 0; // smoothed fraction that drives the bar
    const start = performance.now();
    let last = start;

    const tasks = [
      { label: "page load", run: waitForPageLoad },
      { label: "fonts", run: waitForFonts },
      ...IMAGES.map((url) => ({ label: url, run: loadImage(url) })),
      ...PUBLIC_IMAGES.map((url) => ({ label: url, run: loadImage(url) })),
      ...FONT_FILES.map((url) => ({ label: url, run: loadFile(url) })),
    ];

    let done = 0;
    tasks.forEach(({ label, run }) => {
      withTimeout(run(), 60000, label).then(() => {
        done += 1;
        real = done / tasks.length;
      });
    });

    const tick = (now) => {
      if (cancelled) return;
      const dt = (now - last) / 1000;
      last = now;

      const elapsed = now - start;
      const cap = Math.min(1, elapsed / minDuration);
      const target = Math.min(real, cap);

      // ease towards the target so the bar glides instead of jumping
      shown += (target - shown) * (1 - Math.exp(-dt * 5));
      if (target >= 1 && shown > 0.995) shown = 1;

      setProgress(shown * 100);
      if (shown < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [minDuration]);

  return { progress };
}
