import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import mossyStoneWall from "../assets/digvijay's_assets/mossy-stone-wall-m.webp";
import glowingVineCanopy from "../assets/digvijay's_assets/glowing-vine-canopy.webp";
import hangingLantern from "../assets/digvijay's_assets/hanging-lantern-asset.webp";
import rulebookTransition from "../assets/digvijay's_assets/amethyst-rulebook-transition.webp";
import chickenFlapping from "../assets/digvijay's_assets/chicken-flapping.webp";
import coldFrog from "../assets/digvijay's_assets/cold-frog.gif";
import ruleBookCover from "../assets/digvijay's_assets/pixel-art-rule-book-cover.webp";

// The book (and its assets) is code-split: nothing from it is rendered or decoded until the person opens it.
const loadBook = () => import("./MinecraftBook.jsx");
const MinecraftBook = lazy(loadBook);

const LANTERNS = [
  // ["left-0 top-[-3%]", 0, "0ms"],
  ["left-[18%] top-[7%] max-[540px]:left-[22%] max-[540px]:top-[9%]", -2, "150ms"],
  ["right-[18%] top-[-4%] max-[540px]:right-[22%] max-[540px]:top-[-3%]", -3.5, "280ms"],
  // ["right-0 top-[8%] max-[540px]:right-[-5%] max-[540px]:top-[10%]", -1, "420ms"],
];

export default function BookSection() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const sectionRef = useRef(null);
  // `entered` fires once (drop-in animations); `visible` is live and pauses looping animations off-screen.
  const entered = useInView(sectionRef, { once: true, amount: 0.18 });
  const visible = useInView(sectionRef, { margin: "200px 0px" });

  // Warm up the book's code (not its rendering) shortly after the section appears, so opening feels instant.
  useEffect(() => {
    if (!entered) return undefined;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 600));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => { loadBook(); });
    return () => cancel(id);
  }, [entered]);

  const openBook = () => { setHasOpened(true); setIsBookOpen(true); };

  return (
    <section
      ref={sectionRef}
      className="relative isolate grid min-h-svh place-items-center overflow-visible bg-[#101914] px-4 py-8 max-[540px]:min-h-[88svh] max-[540px]:px-3 max-[540px]:pt-[34vw] max-[540px]:pb-8 max-[540px]:overflow-x-clip"
      aria-label="HackFusion field notes"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[100vw] w-[100svh] -translate-x-1/2 -translate-y-1/2 rotate-90 bg-[#101914] bg-center bg-no-repeat [background-size:100%_100%,100%_100%,100%_100%] max-[540px]:!h-full max-[540px]:!w-full max-[540px]:!rotate-0 max-[540px]:![background-size:100%_100%,100%_100%,cover]" style={{ backgroundImage: `linear-gradient(180deg,rgba(3,12,11,.24),transparent 24% 76%,rgba(3,10,14,.44)),radial-gradient(ellipse at 50% 48%,transparent 34%,rgba(5,12,12,.44)),url("${mossyStoneWall}")` }} />
      {/* Big soft glow: the 24px blur is the most expensive paint here, so phones use a plain radial gradient (no blur filter). */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] aspect-square w-[min(78vw,880px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,189,103,.13),rgba(95,159,119,.09)_42%,transparent_70%)] blur-[24px] max-[540px]:blur-none" />
      <div className="pointer-events-none absolute inset-x-0 -top-[3%] bottom-0 z-[1] overflow-hidden" aria-hidden="true">
        {/* Left vine panel. On phones the filter shadow is removed and the inner edge is faded with a mask. */}
        {/* <div className={`absolute left-0 top-0 h-full w-[min(55vw,900px)] translate-y-[-150px] opacity-0 [filter:drop-shadow(0_22px_24px_rgba(0,0,0,.72))_drop-shadow(0_8px_10px_rgba(0,0,0,.48))] will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:animate-none ${entered ? "animate-[vines-drop-in_1.05s_cubic-bezier(.18,.72,.24,1)_180ms_both]" : ""} max-[540px]:w-[64vw] max-[540px]:[filter:none] max-[540px]:[-webkit-mask-image:linear-gradient(90deg,#000_78%,transparent)] max-[540px]:[mask-image:linear-gradient(90deg,#000_78%,transparent)]`}>
          <img className="block h-full w-full select-none object-cover object-top mix-blend-lighten" src={glowingVineCanopy} alt="" loading="lazy" decoding="async" fetchPriority="low" draggable="false" />
        </div> */}
        {/* Center vine panel: hidden on phones (the two side panels already overlap there), saving a whole layer. */}
        {/* <div className={`absolute left-[calc(50%_-_min(27.5vw,450px))] top-0 h-full w-[min(55vw,900px)] translate-y-[-150px] opacity-0 [filter:drop-shadow(0_22px_24px_rgba(0,0,0,.72))_drop-shadow(0_8px_10px_rgba(0,0,0,.48))] will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:animate-none ${entered ? "animate-[vines-drop-in_1.05s_cubic-bezier(.18,.72,.24,1)_360ms_both]" : ""} max-[540px]:hidden`}>
          <img className="block h-full w-full select-none object-cover object-top mix-blend-lighten" src={glowingVineCanopy} alt="" loading="lazy" decoding="async" fetchPriority="low" draggable="false" />
        </div> */}
        {/* <div className={`absolute right-0 top-0 h-full w-[min(55vw,900px)] translate-y-[-150px] opacity-0 [filter:drop-shadow(0_22px_24px_rgba(0,0,0,.72))_drop-shadow(0_8px_10px_rgba(0,0,0,.48))] will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:animate-none ${entered ? "animate-[vines-drop-in_1.05s_cubic-bezier(.18,.72,.24,1)_540ms_both]" : ""} max-[540px]:w-[64vw] max-[540px]:[filter:none] max-[540px]:[-webkit-mask-image:linear-gradient(90deg,transparent,#000_22%)] max-[540px]:[mask-image:linear-gradient(90deg,transparent,#000_22%)]`}>
          <img className="block h-full w-full scale-x-[-1] select-none object-cover object-top mix-blend-lighten" src={glowingVineCanopy} alt="" loading="lazy" decoding="async" fetchPriority="low" draggable="false" />
        </div> */}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        {LANTERNS.map(([pos, sway, delay], i) => <img key={i} className={`absolute w-[clamp(180px,18vw,310px)] mix-blend-screen [filter:drop-shadow(0_0_16px_rgba(255,153,44,.42))_drop-shadow(0_20px_14px_rgba(0,0,0,.88))_drop-shadow(0_8px_8px_rgba(0,0,0,.68))] translate-y-[-220px] opacity-0 will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:animate-none ${pos} max-[540px]:w-[clamp(130px,25vw,190px)] max-[540px]:[filter:drop-shadow(0_0_8px_rgba(255,153,44,.4))]`} style={{ animation: entered ? "lantern-drop-in 1s cubic-bezier(.18,.72,.24,1) both, lantern-sway 5.5s ease-in-out infinite alternate" : undefined, animationDelay: entered ? `${delay},${sway}s` : undefined, animationPlayState: visible ? "running" : "paused" }} src={hangingLantern} alt="" loading="lazy" decoding="async" fetchPriority="low" draggable="false" />)}
      </div>
      <img className="pointer-events-none absolute left-0 top-[-22vh] z-[1] block h-auto w-full select-none max-[540px]:top-[-15vw]" src={rulebookTransition} alt="" aria-hidden="true" loading="lazy" decoding="async" draggable="false" />
      <motion.div
        className="relative z-[2] w-[min(96vw,72svh,980px)] [aspect-ratio:736/904] [transform-style:preserve-3d] [filter:drop-shadow(0_42px_46px_rgba(0,0,0,.88))_drop-shadow(0_14px_16px_rgba(0,0,0,.72))] will-change-transform max-[540px]:w-[min(84vw,60svh)] max-[540px]:[filter:drop-shadow(0_14px_16px_rgba(0,0,0,.6))]"
      >
        <motion.div
          className="absolute inset-0 z-[1] rounded-[3%]"
          animate={{ opacity: isBookOpen ? 1 : 0, scale: isBookOpen ? 1 : 0.985 }}
          transition={{ duration: 0.48, ease: "easeInOut" }}
          style={{ pointerEvents: isBookOpen ? "auto" : "none" }}
          aria-hidden={!isBookOpen}
        >
          {/* Nothing below is mounted (or downloaded) until the book is opened the first time. */}
          {hasOpened && (
            <>
              <Suspense fallback={null}>
                <MinecraftBook />
              </Suspense>
              {/* <img className="pointer-events-none absolute left-[-12%] top-[-3%] z-[12] w-[clamp(112px,27%,240px)] -scale-x-100 select-none object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,.42)] max-[540px]:left-[-9%] max-[540px]:top-[-1%] max-[540px]:w-[28%] max-[540px]:drop-shadow-none" src={chickenFlapping} alt="" aria-hidden="true" decoding="async" draggable="false" />
              <img className="pointer-events-none absolute right-[-12%] bottom-[-3%] z-[12] w-[clamp(112px,27%,240px)] select-none object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,.42)] max-[540px]:right-[-9%] max-[540px]:bottom-[-1%] max-[540px]:w-[28%] max-[540px]:drop-shadow-none" src={coldFrog} alt="" aria-hidden="true" decoding="async" draggable="false" /> */}
            </>
          )}
          <button
            className="absolute right-[2.5%] top-[2.5%] z-20 grid aspect-square w-[clamp(36px,6.2%,58px)] place-items-center border-[3px] border-[#300b0b] rounded-[2px] bg-[#a81920] p-[7px] [box-shadow:inset_0_0_0_2px_#f34a3e,4px_4px_0_rgba(42,11,9,.88),0_8px_12px_rgba(0,0,0,.42)] transition-[transform,filter] duration-[120ms] [transition-timing-function:steps(2)] hover:-translate-y-0.5 hover:brightness-125 active:translate-y-0.5 focus-visible:outline-[3px] focus-visible:outline-[#fff2a6] focus-visible:outline-offset-1 max-[540px]:right-[2%] max-[540px]:top-[2%] max-[540px]:w-[8%] max-[540px]:p-[5px]"
            type="button"
            onClick={() => setIsBookOpen(false)}
            aria-label="Close the rule book"
            title="Close book"
          >
            <svg className="h-full w-full fill-[#fff1df]" viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
              <path d="M2 1h3v2h2v2h2V3h2V1h3v3h-2v2h-2v2h2v2h2v3h-3v-2h-2V9H7v2H5v2H2v-3h2V8h2V6H4V4H2z" />
            </svg>
          </button>
        </motion.div>
        <AnimatePresence>
          {!isBookOpen && (
            <motion.div
              key="rule-book-cover"
              className="absolute inset-0 z-[3] grid place-items-center overflow-hidden rounded-[3%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.48, ease: "easeInOut" }}
            >
              <img
                className="block h-full w-full select-none object-fill [image-rendering:pixelated] drop-shadow-[0_14px_18px_rgba(0,0,0,.42)] max-[540px]:drop-shadow-none"
                src={ruleBookCover}
                alt="Rule Book"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
              {/* The glow pulse animates box-shadow (repaints every frame), so it is switched off on phones; the static glow stays. */}
              <button className="absolute bottom-[11%] left-1/2 inline-flex min-w-[30%] -translate-x-1/2 items-center justify-center gap-[.65em] border-4 border-[#321407] rounded-[2px] bg-[linear-gradient(180deg,#fff5a6_0%,#ffd34a_18%,#f18a16_52%,#b84010_100%)] px-[.8em] pb-[.3em] pt-[.38em] text-[clamp(22px,3.6vw,42px)] font-bold leading-none tracking-[.12em] text-[#fff3d2] [font-family:'VT323','Courier_New',monospace] [text-shadow:2px_2px_#61230c,-1px_-1px_#61230c] [box-shadow:inset_0_0_0_3px_#fff1a1,inset_0_5px_8px_rgba(255,255,226,.72),0_0_10px_4px_rgba(255,206,71,.92),0_0_30px_12px_rgba(255,139,20,.64),0_6px_0_#321407,0_12px_22px_rgba(0,0,0,.56)] [image-rendering:pixelated] [animation:open-button-glow_2.1s_ease-in-out_infinite_alternate] transition-[transform,filter,box-shadow] duration-150 [transition-timing-function:steps(3)] hover:-translate-y-[3px] hover:brightness-[1.14] focus-visible:outline-[3px] focus-visible:outline-[#fff2a6] focus-visible:outline-offset-1 active:translate-y-[3px] max-[540px]:bottom-[8%] max-[540px]:min-w-[40%] max-[540px]:border-[3px] max-[540px]:[animation:none] motion-reduce:[animation:none]" type="button" onClick={openBook}>
                <span>OPEN</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}