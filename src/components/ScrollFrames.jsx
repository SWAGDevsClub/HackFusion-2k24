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
}) {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const drawnFrame = useRef(-1);
    const targetFrame = useRef(0);
    const readyRef = useRef(false);
    const [ready, setReady] = useState(false);

    const drawFrame = (index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // fall back to the nearest earlier frame that has loaded
        let i = index;
        while (i >= 0) {
            const im = imagesRef.current[i];
            if (im && im.complete && im.naturalWidth) break;
            i--;
        }
        if (i < 0) return;

        const img = imagesRef.current[i];
        const ctx = canvas.getContext("2d");
        const { width: cw, height: ch } = canvas;
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
        drawnFrame.current = index;

        if (!readyRef.current) {
            readyRef.current = true;
            setReady(true);
        }
    };

    // preload frames in the background (non-blocking)
    useEffect(() => {
        imagesRef.current = frameUrls.map((src, i) => {
            const img = new Image();
            img.onload = () => {
                // decode up front so drawing later doesn't stall
                (img.decode ? img.decode() : Promise.resolve())
                    .catch(() => { })
                    .finally(() => {
                        if (i === 0 || i === targetFrame.current) {
                            drawFrame(targetFrame.current);
                        }
                    });
            };
            img.src = src;
            return img;
        });
    }, []);

    // canvas size
    useEffect(() => {
        const resize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            drawFrame(targetFrame.current);
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    // Keep the displayed frame in sync with the current scroll position.
    useEffect(() => {
        let raf;

        const tick = () => {
            const section = sectionRef.current;
            if (section && FRAME_COUNT) {
                const { top, height } = section.getBoundingClientRect();
                const holdHeight = holdScreens * window.innerHeight;
                const scrollable = Math.max(height - window.innerHeight - holdHeight, 1);
                const progress = clamp(-top / scrollable, 0, 1);
                const target = progress * (FRAME_COUNT - 1);
                const index = Math.round(target);
                targetFrame.current = index;
                if (index !== drawnFrame.current) drawFrame(index);
            }
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [holdScreens]);

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
            <div className="sticky top-0 h-screen w-full">
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