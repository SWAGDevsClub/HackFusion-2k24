import CascadeSection from "./CascadeSection"
import TeleportEnderman from "./TeleportEnderman"
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const assetFiles = import.meta.glob("../assets/digvijay's_assets/*.{webp,gif}", {
  eager: true,
  query: "?url",
  import: "default",
});
const asset = (key) => {
  if (key.startsWith("http")) return key;
  const filename = key.includes(".") ? key : `amethyst-design-${key}.webp`;
  const url = assetFiles[`../assets/digvijay's_assets/${filename}`];
  if (!url) throw new Error(`Info asset not found: ${filename}`);
  return url;
};
// Evaluated once: heavy per-layer CSS filters (blur / big drop-shadows) are dropped on phones for smooth scrolling.
const isMobile = typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(max-width: 600px)").matches;

function Layer({ section, image, mobileImage, x = 0, width = 100, top, bottom, height, speed = 0, z = 5, filter, opacity, className = "", imgClassName = "", duration, delay, flip, children }) {
  const src = image ? asset(image) : undefined;
  const loading = section === "s1" && image === "sky" ? "eager" : "lazy";
  return <div className={`world-layer pointer-events-none absolute will-change-transform ${className.includes("world-drift") ? "animate-[world-drift_38s_ease-in-out_infinite_alternate] motion-reduce:animate-none" : ""} ${className}`.trim()} data-section={section} data-speed={speed} data-depth={z} style={{ left: `${x}vw`, width: `${width}vw`, ...(top !== undefined ? { top } : {}), ...(bottom !== undefined ? { bottom } : {}), ...(height ? { height } : {}), zIndex: z }} aria-hidden="true">
    {image && <picture className="block h-full w-full">
      {mobileImage && <source media="(max-width: 768px)" srcSet={asset(mobileImage)} type="image/webp" />}
      <img className={`block h-auto w-full select-none ${height ? "h-full object-cover" : ""} ${className.includes("world-bob") ? "will-change-[translate] animate-[world-bob_9s_ease-in-out_infinite_alternate] motion-reduce:animate-none" : ""} ${imgClassName}`.trim()} src={src} alt="" draggable="false" decoding="async" loading={loading} fetchPriority={section === "s1" && image === "sky" ? "high" : "auto"} style={{ ...(filter ? { filter } : {}), ...(opacity !== undefined ? { opacity } : {}), ...(duration ? { animationDuration: duration } : {}), ...(delay ? { animationDelay: delay } : {}), ...(flip ? { transform: "scaleX(-1)" } : {}) }} />
    </picture>}{children}
  </div>;
}

const geodes = [
  ["c1", 8, 22, 11, -.2, 3, "far", 9, 2, .75], ["c4", 78, 30, 12, -.2, 3, "far", 10, 5, .75], ["g3", 46, 142, 10, -.18, 3, "far", 11, 3, .75],
  ["g1", 55, 40, 26, .07, 7, "lit", 11, 0], ["g0", 10, 62, 16, .1, 12, "lit", 9, 3],
  ["c2", 70, 122, 15, .12, 12, "lit", 12, 1], ["c0", 48, 94, 7, .14, 12, "lit", 8, 4], ["c3", 18, 150, 11, .12, 12, "lit", 10, 6],
  ["t0", -3, 128, 25, .22, 7, "glowing", 13, 2], ["t1", 76, 80, 22, .26, 7, "glowing", 12, 4],
];
const shards = [[22, 36, 5, .18], [44, 58, 4, .24], [66, 34, 5, .2], [84, 70, 4, .3], [30, 96, 6, .26], [58, 132, 5, .2], [8, 104, 4, .28], [88, 150, 5, .24]];
function FloatLayer({ item }) {
  const [key, x, y, width, speed, z, tint, duration, delay, opacity] = item;
  const baseFilter = isMobile
    ? (tint === "far" ? "brightness(.55)" : "")
    : tint === "far" ? "brightness(.55) saturate(.9) blur(2.4px)" : tint === "glowing" ? "saturate(1.05) drop-shadow(0 0 28px rgba(190,80,255,.45))" : tint === "lit" ? "saturate(1.05)" : "saturate(1.1)";
  const filter = [baseFilter, "drop-shadow(0 3px 5px rgba(0,0,0,.24))"].filter(Boolean).join(" ");
  // --float-scale keeps the geodes inside the shortened amethyst section on both
  // desktop and mobile while preserving their relative vertical arrangement.
  return <Layer section="s3" image={key} x={x} width={width} top={`calc(${y}vh * var(--float-scale, 1))`} speed={speed} z={z} filter={filter} opacity={opacity} className="world-bob" duration={`${duration}s`} delay={`-${delay}s`} />;
}
export default function Info() {
  const worldRef = useRef(null);
  useEffect(() => {
  const world = worldRef.current;
  if (!world) return undefined;

  // Mobile only: stop any stray horizontal overflow from shifting/clipping the page sideways.
  const root = document.documentElement, body = document.body, prevRootX = root.style.overflowX, prevBodyX = body.style.overflowX;
  if (matchMedia("(max-width: 600px)").matches) { root.style.overflowX = "clip"; body.style.overflowX = "clip"; }

  const parent = world.parentElement, grade = parent.querySelector(".world-grade");
  const sections = [...world.querySelectorAll(".world-section")];
  const layers = [...world.querySelectorAll(".world-layer")].map(element => ({
    element,
    si: Number(element.dataset.section.slice(1)) - 1,
    speed: Number(element.dataset.speed || 0),
  }));
  const geo = sections.map(() => ({ mid: 0, end: 0 }));
  const grades = ["rgba(255,210,150,.12)", "rgba(10,5,0,.45)", "rgba(110,30,190,.3)", "rgba(0,0,0,0)"];
  let current = scrollY, target = scrollY, viewportHeight = innerHeight, raf = 0, resizeTimer, mounted = true, gradeIdx = -1;

  const schedule = () => { if (!raf && mounted) raf = requestAnimationFrame(draw); };
  // Section geometry is measured ONCE (and on resize), never inside the frame loop.
  const measure = () => {
    viewportHeight = innerHeight;
    const origin = parent.getBoundingClientRect().top + scrollY;
    sections.forEach((s, i) => { geo[i] = { mid: origin + s.offsetTop + s.offsetHeight / 2, end: origin + s.offsetTop + s.offsetHeight }; });
    schedule();
  };
  const onScroll = () => { target = scrollY; schedule(); };
  const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 200); };

  function draw() {
    raf = 0;
    if (!mounted) return;
    // Only the scroll parallax is eased here, which gives the smooth "liquid" depth feel.
    const diff = target - current;
    current = Math.abs(diff) < .2 ? target : current + diff * .16;
    const half = viewportHeight / 2;
    for (let i = 0; i < layers.length; i++) {
      const l = layers[i], d = geo[l.si].mid - current - half;
      l.element.style.transform = `translate3d(0,${d * l.speed * 1.35}px,0)`;
    }
    const mid = current + half, idx = mid < geo[0].end ? 0 : mid < geo[1].end ? 1 : mid < geo[2].end ? 2 : 3;
    if (grade && idx !== gradeIdx) { gradeIdx = idx; grade.style.backgroundColor = grades[idx]; }
    if (current !== target) schedule();
  }

  measure();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  const observer = window.ResizeObserver ? new ResizeObserver(() => measure()) : null; observer?.observe(world);

  return () => {
    root.style.overflowX = prevRootX; body.style.overflowX = prevBodyX;
    mounted = false; cancelAnimationFrame(raf); clearTimeout(resizeTimer);
    observer?.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
  };
}, []);

  const geodeHeight = "140vh";
  const height = `calc(112vh + 175vh + ${geodeHeight})`;
  // Mobile: sky 100svh + cave 80svh + amethyst 68svh = 248svh.
  // The spacer MUST equal the sum of the three sections or the world drifts off the page flow.
  return (
    <CascadeSection className="bg-transparent">
      <div id="info" className="relative isolate [overflow-x:clip] bg-[#050a1c] text-2xl text-[#f3f3f3] [font-family:'VT323',ui-monospace,monospace]">
        <div className="pointer-events-none h-[427vh] w-full max-[600px]:!h-[248svh]" style={{ height }} aria-hidden="true" />
        <div className="absolute left-0 top-0 z-[1] w-full" ref={worldRef}>
          <section className="world-section relative h-[112vh] w-full overflow-visible max-[768px]:!h-[100svh]" style={{ background: "#2f7dff" }}>
            <Layer section="s1" image="sky" top="0%" height="130%" speed={-.12} z={1} className="max-[768px]:!top-[-8%] max-[768px]:!h-[124%] max-[768px]:[clip-path:inset(0_0_13%_0)]" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {[["cl0", -3, 34, "6vh", -.34, "31s"], ["cl1", 60, 36, "20vh", -.28, "44s"], ["cl2", 24, 28, "40vh", -.2, "37s"], ["cl3", 68, 30, "56vh", -.14, "50s"]].map(([image, x, width, top, speed, duration]) => <Layer key={image} section="s1" image={image} x={x} width={width} top={`calc(${top} + 25vh)`} speed={speed} z={image === "cl0" || image === "cl3" ? 8 : 2} className="world-drift" duration={duration} opacity={.92} />)}
            </div>
            <Layer section="s1" x={7} width={86} top="3%" speed={0} z={12} className="max-[768px]:!left-[4vw] max-[768px]:!top-[3%] max-[768px]:!w-[92vw]">
              <h2 id="morning-heading" className="text-center text-[clamp(24px,3vw,48px)] font-bold leading-[1.45] text-[#fff5d8] [font-family:'Press_Start_2P',monospace] [text-shadow:3px_4px_0_#160b25,0_0_22px_#140a30] max-[768px]:text-[clamp(18px,4.8vw,23px)]">A Fusion of Ideas, Code, and Excitement!</h2>
            </Layer>
            <Layer section="s1" image="morning-parchment-banner.webp" x={27} width={46} top="17%" speed={0} z={14} className="max-[768px]:!left-[8vw] max-[768px]:!top-[25%] max-[768px]:!w-[84vw]">
              <div id="morning-description" className="absolute left-[18%] right-[18%] top-[7%] bottom-[8%] flex items-center justify-center overflow-hidden px-1 text-center text-[clamp(16px,1.2vw,20px)] font-bold leading-[1.5] text-[#3b2615] [font-family:'Press_Start_2P',monospace] [text-shadow:0_1px_0_rgba(255,255,220,.55)] max-[768px]:left-[15%] max-[768px]:right-[15%] max-[768px]:text-[clamp(11px,2.8vw,13px)] max-[768px]:leading-[1.25]">
                <p>Join <strong>Hackfusion 4</strong>, a national-level hackathon at <strong>SGGSIE&amp;T Nanded</strong>, where 100+ teams unite to innovate, code, and compete! Experience the fusion of ideas, technology, and excitement while connecting with passionate developers, expert mentors, and industry sponsors.</p>
              </div>
            </Layer>
            <Layer section="s1" image="morning-bee.gif" x={13} width={5} top="48%" speed={.08} z={9} className="bee-orbit-left max-[768px]:!left-[1vw] max-[768px]:!top-[22%] max-[768px]:!w-[11vw]" />
            <Layer section="s1" image="morning-bee.gif" x={82} width={5} top="58%" speed={-.06} z={9} className="bee-orbit-right max-[768px]:!left-[87vw] max-[768px]:!top-[51%] max-[768px]:!w-[11vw]" flip />
            {/* Mobile island: desktop offsets (-8vw / 7.1655vw) scaled by the mobile width ratio (170vw / 100vw)
            so the cross-section and the forest keep the same relationship as on desktop. */}
            <Layer section="s1" image="floating-voxel-island-cross-section.webp" bottom="-8vw" speed={-.04} z={9} className="drop-shadow-[0_12px_18px_rgba(0,0,0,0.65)] max-[768px]:!hidden" imgClassName="[clip-path:inset(40%_0_0_0)]" />
            <Layer section="s1" bottom="14vw" height="8vw" speed={0} z={7} className="hidden min-[769px]:!block"><div className="h-full w-full bg-[#2f7dff]" /></Layer>
            <Layer section="s1" image="forest-island-current.webp" mobileImage="forest-island-current-mobile.webp" bottom="7.1655vw" speed={-.04} z={10} className="max-[768px]:!left-[-35vw] max-[768px]:!w-[170vw] max-[768px]:!bottom-0" />
            <Layer section="s1" image="floating-voxel-island-cross-section-mobile.webp" bottom="-8vw" speed={-.04} z={9} className="hidden max-[768px]:!block max-[768px]:!z-[11] max-[768px]:!left-[-35vw] max-[768px]:!w-[170vw] max-[768px]:!bottom-[calc(-24.5vw+1vh)]" />
          </section>
          <section className="world-section relative h-[175vh] w-full overflow-visible max-[600px]:!h-[80svh] max-[600px]:!overflow-hidden" style={{ background: "#0c0d12" }}>

            <Layer section="s2" image="cavebg" top="0%" height="120%" speed={-.08} z={1} filter="brightness(.62)" className="max-[600px]:!top-0 max-[600px]:!h-[116%]" imgClassName="max-[600px]:object-cover max-[600px]:object-center" />
            {/* Mobile walls: start flush with the section top and fill the section. object-cover +
            object-top keeps the aspect ratio (no stretching) and can never spill into the amethyst section. */}
        <Layer section="s2" image="walls" top="3vh" speed={.1} z={8} className="max-[600px]:!top-0 max-[600px]:!h-full max-[600px]:[-webkit-mask-image:linear-gradient(to_bottom,#000_30%,transparent_60%)] max-[600px]:[mask-image:linear-gradient(to_bottom,#000_30%,transparent_60%)]" imgClassName="max-[600px]:!h-full max-[600px]:object-cover max-[600px]:object-top">
          <div className="cave-torch-glow pointer-events-none absolute inset-0 mix-blend-screen animate-[cave-torch-flicker_2.6s_ease-in-out_infinite_alternate]"/>
        </Layer>
        <Layer section="s2" x={10} width={80} top="14%" speed={0} z={12} className="max-[600px]:!left-[5vw] max-[600px]:!top-[8%] max-[600px]:!w-[90vw]">
          <h2 id="participate-heading" className="text-center text-[clamp(34px,4.4vw,66px)] font-bold leading-[1.45] text-[#fff1d4] [font-family:'Press_Start_2P',monospace] [text-shadow:3px_4px_0_#090b12,0_0_20px_#ff9a36] max-[600px]:text-[clamp(20px,5vw,25px)]">Why Participate?</h2>
        </Layer>
        <Layer section="s2" image="cave-scroll-banner.webp" x={17} width={66} top="27%" speed={0} z={10} className="max-[600px]:!left-[2vw] max-[600px]:!top-[20%] max-[600px]:!w-[96vw]">
          <div id="participate-description" className="absolute left-[18%] right-[18%] top-[10%] bottom-[8%] flex items-center justify-center overflow-hidden px-1 text-center text-[clamp(15px,1.25vw,20px)] font-bold leading-[1.8] text-[#f3f0ea] [font-family:'Press_Start_2P',monospace] [text-shadow:1px_2px_2px_#111] max-[600px]:left-[16%] max-[600px]:right-[16%] max-[600px]:top-[12%] max-[600px]:bottom-[12%] max-[600px]:text-[clamp(8px,2.1vw,10px)]">
            <p>Hackfusion 4 is where innovation meets opportunity. Turn bold ideas into real-world solutions, collaborate with brilliant minds, and learn from industry experts. Build, experiment, and make your mark. <strong className="text-[#ffd16a]">Think big. Code bold. Be the fusion!</strong></p>
          </div>
        </Layer>
      </section>
      <section className="world-section relative h-[140vh] w-full overflow-visible [--float-scale:.9] max-[600px]:!h-[68svh] max-[600px]:[--float-scale:.44]" style={{background:"#10091f"}}>
        <Layer section="s3" image="geo" top="-6%" height="112%" speed={-.07} z={1} filter="brightness(.95)" className="max-[600px]:!top-[-14%] max-[600px]:!h-[128%]" imgClassName="max-[600px]:object-cover max-[600px]:object-center"/>
        <Layer section="s3" x={5} width={90} top="11%" speed={0} z={32} className="max-[600px]:!left-[5vw] max-[600px]:!top-0 max-[600px]:!w-[90vw]">
          <h2 id="faq-heading" className="text-center text-[clamp(34px,4.4vw,66px)] font-bold leading-[1.45] text-[#fff1ff] [font-family:'Press_Start_2P',monospace] [text-shadow:3px_4px_0_#15092b,0_0_22px_#b45cff] max-[600px]:text-[clamp(20px,5vw,25px)]">Have Any Questions?</h2>
        </Layer>
        <Layer section="s3" image="amethyst-crystal-banner.webp" x={20} width={60} top="24%" speed={0} z={10} className="max-[600px]:!left-[2vw] max-[600px]:!top-[10%] max-[600px]:!w-[96vw]">
          <div id="faq-description" className="absolute left-[18%] right-[18%] top-[10%] bottom-[8%] flex items-center justify-center overflow-hidden px-1 text-center text-[clamp(15px,1.25vw,20px)] font-bold leading-[1.8] text-[#f5edff] [font-family:'Press_Start_2P',monospace] [text-shadow:1px_2px_3px_#170923] max-[600px]:left-[14%] max-[600px]:right-[14%] max-[600px]:text-[clamp(8px,2.1vw,10px)]">
            <p>Wondering how Hackfusion 4 works? Explore our FAQs for quick answers about registration, participation, and submissions. Still have questions? Reach out to us!</p>
          </div>
        </Layer>
        <Link to="/faq" className="pointer-events-auto absolute left-1/2 top-[88%] z-[35] -translate-x-1/2 whitespace-nowrap border-[5px] border-[#281506] bg-[#9d713b] px-12 py-6 font-['Press_Start_2P',monospace] text-[20px] tracking-[.08em] text-[#fff0c2] [background-image:repeating-linear-gradient(0deg,rgba(48,25,7,.18)_0_5px,transparent_5px_13px),linear-gradient(90deg,rgba(255,225,154,.22),transparent_35%_65%,rgba(35,19,7,.2))] [text-shadow:3px_3px_0_#38200d] shadow-[inset_5px_5px_0_rgba(255,220,145,.28),inset_-5px_-5px_0_rgba(44,24,8,.38),0_9px_0_#38200d,0_13px_22px_rgba(0,0,0,.55)] transition-transform hover:-translate-y-1 hover:brightness-110 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#e7c3ff] max-[600px]:top-[65%] max-[600px]:border-[3px] max-[600px]:px-5 max-[600px]:py-3 max-[600px]:text-[12px]" aria-label="Open FAQ page">FAQ</Link>
        {geodes.map(item=><FloatLayer key={item[0]} item={item}/>)}
        {shards.map((q,i)=><FloatLayer key={`shard-${i}`} item={[`sh${(i*3+1)%12}`,q[0],q[1],q[2],q[3],13,"shard",6+i%4,i,.95]}/>)}
        <Layer section="s3" image="gceil" top="-24vw" z={30} filter="brightness(.9)" className="max-[600px]:!top-[-20vh]"/>
        <TeleportEnderman label="amethyst" className="max-[600px]:top-[2%]"/>
      </section>
    </div>
    {/* Mobile: soft-light blending on a full-screen fixed layer is very expensive to scroll, so phones use a plain tint. */}
    <div className="world-grade pointer-events-none fixed inset-0 z-[60] mix-blend-soft-light transition-colors duration-[800ms] max-[600px]:mix-blend-normal max-[600px]:opacity-60" /><div className="pointer-events-none fixed inset-0 z-[60] bg-[radial-gradient(ellipse_at_50%_50%,transparent_55%,rgba(0,0,0,.5)_100%)]"/>

      </div>;
    </CascadeSection>
  )
}
