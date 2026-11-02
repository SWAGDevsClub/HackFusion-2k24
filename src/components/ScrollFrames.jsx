import { useEffect, useRef, useState } from "react";

// ADD THE 120/192 FRAMES IN THE ASSETS/HEROFRAMES FOLDER

const modules = import.meta.glob("../assets/HeroFrames/frames3/frame_*.webp", {
    eager: true,
    import: "default",
});
const frameUrls = Object.keys(modules)
    .sort()
    .map((key) => modules[key]);
const FRAME_COUNT = frameUrls.length;

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

export default function ScrollFrames({
    children,
    poster,
    scrollHeight = "400vh",
    holdScreens = 0,
    onProgress,
}) {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef(new Array(FRAME_COUNT));
    const drawnFrame = useRef(-1);
    const targetFrame = useRef(0);
    const displayFrame = useRef(0);
    const readyRef = useRef(false);
    const [ready, setReady] = useState(false);
    const onProgressRef = useRef(onProgress);
    const rafIdRef = useRef(0);
    const geometryRef = useRef({ top: 0, height: 0, scrollable: 1 });

    useEffect(() => {
        onProgressRef.current = onProgress;
    }, [onProgress]);

    const drawFrame = (index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Fall back to nearest earlier frame that has finished loading
        let i = index;
        while (i >= 0) {
            const im = imagesRef.current[i];
            if (im && im.complete && im.naturalWidth) break;
            i--;
        }
        if (i < 0) return;

        const img = imagesRef.current[i];
        const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
        if (!ctx) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const w = Math.round(img.naturalWidth * scale);
        const h = Math.round(img.naturalHeight * scale);
        const x = Math.round((cw - w) / 2);
        const y = Math.round((ch - h) / 2);

        ctx.drawImage(img, x, y, w, h);
        drawnFrame.current = index;

        if (!readyRef.current) {
            readyRef.current = true;
            setReady(true);
        }
    };

    // Helper to load a single frame
    const loadFrame = (idx) => {
        if (idx < 0 || idx >= FRAME_COUNT) return;
        if (imagesRef.current[idx]) return imagesRef.current[idx];

        const img = new Image();
        imagesRef.current[idx] = img;
        img.onload = () => {
            const currentIdx = Math.round(displayFrame.current);
            if (idx === currentIdx || (idx === 0 && drawnFrame.current === -1)) {
                drawFrame(currentIdx);
            }
        };
        img.src = frameUrls[idx];
        return img;
    };

    // Helper to preload a window around a given frame
    const preloadWindow = (centerIdx, radiusAhead = 15, radiusBehind = 5) => {
        const start = Math.max(0, centerIdx - radiusBehind);
        const end = Math.min(FRAME_COUNT - 1, centerIdx + radiusAhead);
        for (let j = start; j <= end; j++) {
            loadFrame(j);
        }
    };

    // Progressive loading:
    // 1. Immediately load first 18 frames so initial view & zoom start are fast & smooth
    // 2. Then load remaining frames progressively in small chunks in the background
    useEffect(() => {
        // High priority first batch
        for (let i = 0; i < Math.min(18, FRAME_COUNT); i++) {
            loadFrame(i);
        }

        // Idle / progressive load for remaining frames
        let nextIdx = 18;
        let idleTimer = null;
        const loadBatch = () => {
            if (nextIdx >= FRAME_COUNT) return;
            const batchEnd = Math.min(nextIdx + 6, FRAME_COUNT);
            for (let i = nextIdx; i < batchEnd; i++) {
                loadFrame(i);
            }
            nextIdx = batchEnd;
            if (nextIdx < FRAME_COUNT) {
                idleTimer = setTimeout(loadBatch, 60);
            }
        };

        idleTimer = setTimeout(loadBatch, 400);

        return () => {
            if (idleTimer) clearTimeout(idleTimer);
        };
    }, []);

    // Canvas size
    useEffect(() => {
        const resize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const maxDpr = window.innerWidth < 768 ? 1 : 1.5;
            const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
            canvas.width = Math.round(window.innerWidth * dpr);
            canvas.height = Math.round(window.innerHeight * dpr);
            drawFrame(Math.round(displayFrame.current));
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    // Cache section layout & measurements to avoid getBoundingClientRect layout thrashing on scroll
    useEffect(() => {
        const updateGeometry = () => {
            const section = sectionRef.current;
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            const top = rect.top + scrollTop;
            const height = section.offsetHeight || rect.height;
            const holdHeight = holdScreens * window.innerHeight;
            const scrollable = Math.max(height - window.innerHeight - holdHeight, 1);
            geometryRef.current = { top, height, scrollable };
        };

        updateGeometry();
        window.addEventListener("resize", updateGeometry);
        return () => window.removeEventListener("resize", updateGeometry);
    }, [holdScreens]);

    // Smooth animation loop + scroll tracking
    useEffect(() => {
        let isRunning = false;

        const loop = () => {
            const target = targetFrame.current;
            const current = displayFrame.current;
            const diff = target - current;

            // Interpolate smoothly: lerp factor ~0.22 eliminates mobile touch scroll jitter
            // while feeling snappy and responsive
            if (Math.abs(diff) > 0.005) {
                displayFrame.current += diff * 0.22;
                if (Math.abs(target - displayFrame.current) < 0.01) {
                    displayFrame.current = target;
                }
            } else {
                displayFrame.current = target;
            }

            const currFrame = displayFrame.current;
            const index = Math.round(currFrame);

            if (index !== drawnFrame.current) {
                drawFrame(index);
            }

            if (onProgressRef.current) {
                const progress = clamp(currFrame / (FRAME_COUNT - 1), 0, 1);
                onProgressRef.current({
                    progress,
                    frame: currFrame,
                    frameIndex: index,
                    frameCount: FRAME_COUNT,
                });
            }

            if (Math.abs(target - displayFrame.current) > 0.005) {
                rafIdRef.current = requestAnimationFrame(loop);
            } else {
                isRunning = false;
                rafIdRef.current = 0;
            }
        };

        const startLoop = () => {
            if (!isRunning) {
                isRunning = true;
                rafIdRef.current = requestAnimationFrame(loop);
            }
        };

        const onScroll = () => {
            const { top, scrollable } = geometryRef.current;
            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            const currentTop = top - scrollTop;
            const progress = clamp(-currentTop / scrollable, 0, 1);
            const target = progress * (FRAME_COUNT - 1);
            targetFrame.current = target;

            // Ensure upcoming frames are loaded
            preloadWindow(Math.round(target), 15, 5);

            startLoop();
        };

        // Initial update
        onScroll();

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className="relative w-full"
            style={{
                // `scrollHeight` is the desired frame-scroll distance. Add the sticky viewport
                // and any optional hold after the animation so following sections wait.
                height: `calc(${scrollHeight} + ${(1 + holdScreens) * 100}vh)`,
            }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {poster && (
                        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    )}
                    <canvas
                        ref={canvasRef}
                        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"
                            }`}
                    />
                </div>

                {/* content renders immediately */}
                <div className="relative z-10 h-full w-full">{children}</div>
            </div>
        </div>
    );
}
