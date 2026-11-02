import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Disable automatic browser scroll restoration so it doesn't fight SPA route transitions
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      lerp: 0.08,          // lower = smoother/slower (0.05–0.12)
      wheelMultiplier: 0.8, // < 1 caps how far one wheel notch travels
      touchMultiplier: 1.2,
      smoothWheel: true,
    });

    window.lenis = lenis;

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (window.lenis === lenis) {
        window.lenis = null;
      }
    };
  }, []);

  return children;
}
