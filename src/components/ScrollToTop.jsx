import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, state } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const isNewPage = prevPathRef.current !== pathname;
    prevPathRef.current = pathname;

    // Only reset scroll when actually navigating to a different page / route
    if (!isNewPage) return;

    // If the navigation specifies a target section to scroll to, let the page/navbar handler manage it
    if (state?.scrollTo) return;

    const reset = () => {
      if (window.lenis) {
        window.lenis.resize();
        window.lenis.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo(0, 0);
    };

    reset();

    // Catch any post-render / layout / lazy component mount shifts
    const rafId = requestAnimationFrame(() => {
      reset();
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname, search, state]);

  return null;
}
