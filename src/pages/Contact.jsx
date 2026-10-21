import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   ASSETS  (this file lives in src/pages, so every path starts with ../assets)
   src/assets/characters-clean/   -> the 3 character pngs
   src/assets/pageassets-clean/   -> the Minecraft page art
------------------------------------------------------------------ */
import khushwantImage from "../assets/characters-clean/khushwant.webp";
import hrishikeshImage from "../assets/characters-clean/hrishikesh.webp";
import pradeepImage from "../assets/characters-clean/pradeep.webp";

import contactBackground from "../assets/pageassets-clean/contact-background.webp";
import titleImg from "../assets/pageassets-clean/title-contact-us.webp";
import plankBanner from "../assets/pageassets-clean/plank-long-banner-footer.webp";
import bookOpen from "../assets/pageassets-clean/book-open.webp";
import lectern from "../assets/pageassets-clean/lectern-with-books.webp";
import quill from "../assets/pageassets-clean/feather-quill.webp";
import envelope from "../assets/pageassets-clean/envelope.webp";
import stonePlate from "../assets/pageassets-clean/stone-texture-header-plate.webp";
import boardFrame from "../assets/pageassets-clean/board-stone-frame-lanterns.webp";
import parchmentLarge from "../assets/pageassets-clean/parchment-large.webp";
import parchmentSmall from "../assets/pageassets-clean/parchment-card-small.webp";
import postsPair from "../assets/pageassets-clean/posts-wooden-pair.webp";
import woodPlank from "../assets/pageassets-clean/plank-panel-wood-spare.webp";
import lanternHanging from "../assets/pageassets-clean/lantern-hanging.webp"; // eslint-disable-line no-unused-vars

import Navbar from "../components/Navbar";

const teamMembers = [
  {
    id: 1,
    name: "Khushwant Singh Mahajan",
    role: "SWAG President",
    phone: "7020942799",
    image: khushwantImage,
  },
  {
    id: 2,
    name: "Hrishikesh Karale",
    role: "SWAG Vice President",
    phone: "97677533091",
    image: hrishikeshImage,
  },
  {
    id: 3,
    name: "Pradeep Salunke",
    role: "Hackfusion Coordinator",
    phone: "8956467929",
    image: pradeepImage,
  },
];

// Opening animation style: "smooth" (fluid, default) or "blocky" (chunky Minecraft steps)
const ANIMATION = "smooth";

// While testing, ignore the OS "reduce motion" setting so the opening animation always plays.
// Set to false before shipping if you want to respect the visitor's OS setting.
const IGNORE_REDUCED_MOTION = true;

/* ------------------------------------------------------------------
   TAILWIND HELPERS
   Breakpoint used everywhere: mobile = base / max-[700px], desktop = min-[701px]
   (same split as the old CSS, so nothing shifts).
   Class strings are always written out in full so Tailwind can see them.
------------------------------------------------------------------ */
const PIXEL = "[image-rendering:pixelated]";
const HEAD = "[font-family:'Press_Start_2P','Courier_New',monospace]";
const BODY = "[font-family:VT323,'Courier_New',monospace]";
const FILL = "bg-center bg-no-repeat [background-size:100%_100%]";
const COVER = "bg-center bg-cover bg-no-repeat";
const FOCUS_GOLD =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ffd24a] focus-visible:outline-offset-2";
const FOCUS_BROWN =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#6b2f0c] focus-visible:outline-offset-2";

// images go in through inline background-image so Vite can hash/bundle them
const art = (src) => ({ backgroundImage: `url(${src})` });
const artOver = (src, tint) => ({
  backgroundImage: `linear-gradient(${tint}, ${tint}), url(${src})`,
});

const cx = (...parts) => parts.filter(Boolean).join(" ");

/* easing variables for the opening animation */
const EASE_SMOOTH = cx(
  "[--e-title:cubic-bezier(0.2,0.9,0.25,1.15)]",
  "[--e-plank:cubic-bezier(0.2,0.8,0.3,1)]",
  "[--e-drop:cubic-bezier(0.3,1.45,0.5,1)]",
  "[--e-rise:cubic-bezier(0.16,1,0.3,1)]",
  "[--e-pop:cubic-bezier(0.34,1.56,0.64,1)]",
  "[--e-fade:cubic-bezier(0.4,0,0.2,1)]"
);
const EASE_BLOCKY = cx(
  "[--e-title:steps(6,end)]",
  "[--e-plank:steps(8,end)]",
  "[--e-drop:steps(8,end)]",
  "[--e-rise:steps(10,end)]",
  "[--e-pop:steps(5,end)]",
  "[--e-fade:steps(6,end)]"
);

/* opening animation classes (defined in the injected <style> below) */
const A_TITLE = "mc-a-title";
const A_PLANK = "mc-a-plank";
const A_DROP = "mc-a-drop";
const A_RISE = "mc-a-rise";
const A_POP_H2 = "mc-a-pop-h2";
const A_SPAWN = "mc-a-spawn";
const A_FADE_CARD = "mc-a-fade-card";
const A_POP_INFO = "mc-a-pop-info";
const A_POP_HEAD = "mc-a-pop-head";
const A_POP_CARD = "mc-a-pop-card"; // delay set inline per card
const A_FOOTER = "mc-a-footer"; // eslint-disable-line no-unused-vars
const A_POSTS = "mc-a-posts";
const A_GLOW = "mc-a-glow"; // eslint-disable-line no-unused-vars
const A_EMBER_1 = "mc-a-ember-1";
const A_EMBER_2 = "mc-a-ember-2";
const A_LANTERN_SWAY = "mc-a-lantern-sway";
const A_LANTERN_BLINK = "mc-a-lantern-blink";
const A_LANTERN_HALO = "mc-a-lantern-halo";

/* ------------------------------------------------------------------
   LANTERN WINDOWS  (the swaying + blinking lanterns on the stone board)
   The lanterns are painted into the board art, so we lay a copy of just the
   lantern area on top of each one and animate that copy.
   All numbers are % of the board art (width for x/w, height for y/h).
     x = gap from the board's outer edge to the lantern window
     w = window width   (must NOT reach the stone pillar, or the pillar will sway too)
     y = where the window starts (just under the wooden beam, at the top of the chain)
     h = window height  (down to just under the lantern)
   If a lantern looks cut off or a bit of pillar/beam moves, nudge these.
------------------------------------------------------------------ */
const LANTERN = { x: 0, w: 8.6, y: 11.5, h: 28.5 };

const CARD_DELAYS = ["2.05s", "2.15s", "2.25s", "2.35s"];

/* stone header plates + wooden item frame + wood buttons */
const FRAME_BORDER =
  "border-solid border-[#7a4e27] border-t-[#a47341] border-l-[#8f5f32] border-b-[#4d2f17] border-r-[#5b361b]";
const FRAME_BG = "bg-[linear-gradient(180deg,#2a1a10,#3b2616)]";
const WOOD_BTN = cx(
  "mt-auto min-h-[44px] min-w-[140px] flex-none text-[#f1dcae] text-[22px] leading-none",
  "[padding:6px_20px] [text-shadow:2px_2px_0_#2a1608]",
  "border-[3px] border-solid border-[#3a2110]",
  "[box-shadow:inset_0_0_0_2px_rgba(255,220,160,0.25),0_3px_0_rgba(0,0,0,0.4)]",
  "active:translate-y-[2px]",
  BODY,
  FILL,
  PIXEL,
  FOCUS_GOLD
);
const WOOD_BTN_STYLE = artOver(woodPlank, "rgba(60,32,12,0.5)");

/* < > arrows on the member list */
const ARROW_BTN = cx(
  "pointer-events-auto flex flex-none items-center justify-center text-[#f1dcae] leading-none",
  "h-[40px] w-[26px] text-[16px]",
  "min-[701px]:h-[max(30px,2.9cqw)] min-[701px]:w-[max(16px,1.55cqw)] min-[701px]:text-[length:max(10px,1.1cqw)]",
  "[text-shadow:2px_2px_0_#2a1608]",
  "border-[3px] border-solid border-[#3a2110]",
  "[box-shadow:inset_0_0_0_2px_rgba(255,220,160,0.25),0_3px_0_rgba(0,0,0,0.4)]",
  "transition-[opacity,filter] duration-150",
  "hover:brightness-110 active:brightness-90",
  "disabled:cursor-default disabled:opacity-30 disabled:hover:brightness-100",
  HEAD,
  FILL,
  PIXEL,
  FOCUS_GOLD
);

/* page shade (readability overlay) */
// eslint-disable-next-line no-unused-vars
const SHADE_DESKTOP =
  "radial-gradient(ellipse at 50% 58%, rgba(0,0,0,0) 52%, rgba(6,3,14,0.42) 100%), linear-gradient(180deg, rgba(10,6,20,0.45) 0%, rgba(10,6,20,0) 35%, rgba(10,6,20,0.12) 100%), linear-gradient(rgba(8,5,18,0.24), rgba(8,5,18,0.24))";
// eslint-disable-next-line no-unused-vars
const SHADE_MOBILE =
  "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(6,3,14,0.4) 100%), linear-gradient(180deg, rgba(10,6,20,0.35) 0%, rgba(10,6,20,0) 25%), linear-gradient(180deg, rgba(255,140,40,0.3) 0%, rgba(255,140,40,0) 60%), linear-gradient(rgba(8,5,18,0.24), rgba(8,5,18,0.24))";

/* lantern glow (desktop) */
// eslint-disable-next-line no-unused-vars
const GLOW =
  "radial-gradient(ellipse 7.8% 12% at 10.3% 33%, rgba(255,190,90,0.5) 0%, rgba(255,150,50,0.2) 45%, rgba(255,150,50,0) 100%), radial-gradient(ellipse 7.8% 12% at 89.7% 33%, rgba(255,190,90,0.5) 0%, rgba(255,150,50,0.2) 45%, rgba(255,150,50,0) 100%), radial-gradient(ellipse 10.3% 34% at 16.4% 40%, rgba(255,170,60,0.1) 0%, rgba(255,170,60,0) 100%), radial-gradient(ellipse 10.3% 34% at 83.6% 40%, rgba(255,170,60,0.1) 0%, rgba(255,170,60,0) 100%)";

/* floating embers */
const EMBERS = {
  desktopA:
    "4vw 62vh 1px 0 #ffd36b, 12vw 40vh 1px 0 #ffb347, 21vw 70vh 1px 0 #ffd36b, 30vw 34vh 1px 0 #ffe9a8, 9vw 78vh 1px 0 #ffb347, 38vw 22vh 1px 0 #ffd36b, 52vw 20vh 1px 0 #ffe9a8, 70vw 19vh 1px 0 #ffb347, 89vw 58vh 1px 0 #ffd36b, 95vw 40vh 1px 0 #ffb347, 92vw 74vh 1px 0 #ffe9a8",
  desktopB:
    "7vw 52vh 1px 0 #ffe9a8, 17vw 30vh 1px 0 #ffd36b, 26vw 66vh 1px 0 #ffb347, 34vw 48vh 1px 0 #ffd36b, 3vw 36vh 1px 0 #ffb347, 46vw 21vh 1px 0 #ffd36b, 62vw 18vh 1px 0 #ffe9a8, 80vw 22vh 1px 0 #ffd36b, 97vw 66vh 1px 0 #ffe9a8, 91vw 30vh 1px 0 #ffb347",
  mobileA:
    "6vw 30vh 1px 0 #ffd36b, 90vw 44vh 1px 0 #ffb347, 12vw 66vh 1px 0 #ffe9a8, 84vw 80vh 1px 0 #ffd36b, 5vw 96vh 1px 0 #ffb347, 94vw 110vh 1px 0 #ffd36b, 50vw 52vh 1px 0 #ffe9a8, 70vw 24vh 1px 0 #ffb347",
  mobileB:
    "92vw 28vh 1px 0 #ffe9a8, 8vw 50vh 1px 0 #ffd36b, 88vw 62vh 1px 0 #ffb347, 4vw 84vh 1px 0 #ffd36b, 96vw 94vh 1px 0 #ffe9a8, 10vw 118vh 1px 0 #ffb347, 40vw 40vh 1px 0 #ffd36b",
};
const EMBER_BASE =
  "pointer-events-none absolute left-0 top-0 z-[1] h-[3px] w-[3px] bg-transparent opacity-0 [will-change:transform,opacity]";

const contactPageAnimations = `\
@keyframes mc-sign-drop {
  0%   { transform: translate3d(0, -140%, 0) rotate(-7deg); opacity: 0; }
  35%  { opacity: 1; }
  100% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 1; }
}
@keyframes mc-sway {
  0%, 100% { rotate: 0deg; }
  25% { rotate: 0.9deg; }
  75% { rotate: -0.9deg; }
}
@keyframes mc-title-in {
  0%   { opacity: 0; transform: translate3d(0, -18px, 0) scale(0.8); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes mc-plank-in {
  0%   { opacity: 0; transform: scaleX(0.35); }
  100% { opacity: 1; transform: scaleX(1); }
}
@keyframes mc-drop {
  0%   { opacity: 0; transform: translate3d(0, -110px, 0); }
  30%  { opacity: 1; }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes mc-rise {
  0%   { opacity: 0; transform: translate3d(0, 80px, 0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes mc-pop {
  0%   { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.7); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes mc-spawn {
  0%   { opacity: 0; filter: brightness(3.5); }
  45%  { opacity: 1; filter: brightness(2); }
  100% { opacity: 1; filter: brightness(1); }
}
@keyframes mc-fade {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes mc-footer-rise {
  0%   { opacity: 0; transform: translate3d(0, 34px, 0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes mc-flicker {
  0%, 100% { opacity: 0.85; }
  7%  { opacity: 1; }
  14% { opacity: 0.7; }
  23% { opacity: 0.95; }
  37% { opacity: 0.78; }
  52% { opacity: 1; }
  66% { opacity: 0.72; }
  81% { opacity: 0.92; }
}
@keyframes contact-lantern-air {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(-0.6deg); }
  25% { transform: translate3d(2px, 1px, 0) rotate(0.35deg); }
  50% { transform: translate3d(0, 2px, 0) rotate(0.6deg); }
  75% { transform: translate3d(-2px, 1px, 0) rotate(-0.35deg); }
}
@keyframes contact-lantern-blink {
  0%, 100% { opacity: 0.94; filter: brightness(1); }
  22% { opacity: 1; filter: brightness(1.08); }
  48% { opacity: 0.86; filter: brightness(0.92); }
  72% { opacity: 0.98; filter: brightness(1.04); }
}
@keyframes mc-embers {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  15%  { opacity: 1; }
  50%  { transform: translate3d(14px, -14vh, 0); opacity: 0.85; }
  85%  { opacity: 0.9; }
  100% { transform: translate3d(-10px, -26vh, 0); opacity: 0; }
}

/* lanterns: gentle sway from the top of the chain, and a light blink every few seconds */
@keyframes mc-lantern-sway {
  0%, 100% { transform: rotate(-1deg); }
  50%      { transform: rotate(1deg); }
}
@keyframes mc-lantern-blink {
  0%, 84%, 100% { filter: brightness(1); }
  88% { filter: brightness(1.28); }
  92% { filter: brightness(0.94); }
  96% { filter: brightness(1.14); }
}
@keyframes mc-lantern-halo {
  0%, 84%, 100% { opacity: 0.25; }
  88% { opacity: 1; }
  92% { opacity: 0.3; }
  96% { opacity: 0.8; }
}

/* animation classes (plain CSS so Tailwind never has to parse them) */
.mc-a-title     { animation: mc-title-in 0.8s var(--e-title) 0.35s backwards; }
.mc-a-plank     { animation: mc-plank-in 0.7s var(--e-plank) 0.7s backwards; }
.mc-a-drop      { animation: mc-drop 1.1s var(--e-drop) 0.8s backwards; }
.mc-a-rise      { animation: mc-rise 1s var(--e-rise) 0.7s backwards; }
.mc-a-pop-h2    { animation: mc-pop 0.55s var(--e-pop) 1.5s backwards; }
.mc-a-spawn     { animation: mc-spawn 0.9s var(--e-fade) 1.65s backwards; }
.mc-a-fade-card { animation: mc-fade 0.8s var(--e-fade) 1.65s backwards; }
.mc-a-pop-info  { animation: mc-pop 0.55s var(--e-pop) 1.8s backwards; }
.mc-a-pop-head  { animation: mc-pop 0.55s var(--e-pop) 1.95s backwards; }
.mc-a-pop-card  { animation: mc-pop 0.55s var(--e-pop) backwards; } /* delay set inline per card */
.mc-a-footer    { animation: mc-footer-rise 0.7s var(--e-rise) 2.4s backwards; }
.mc-a-posts     { animation: mc-fade 0.9s var(--e-fade) 0.7s backwards; }
.mc-a-glow      { animation: mc-flicker 3.6s steps(1,end) infinite, mc-fade 1s var(--e-fade) 1.7s backwards; }
.mc-a-ember-1   { animation: mc-embers 9s linear infinite; }
.mc-a-ember-2   { animation: mc-embers 12s linear 4.5s infinite; }
.mc-a-lantern-sway  { animation: mc-lantern-sway 4.6s ease-in-out infinite; transform-origin: 50% 0; will-change: transform; }
.mc-a-lantern-blink { animation: mc-lantern-blink 5s linear infinite; }
.mc-a-lantern-halo  { animation: mc-lantern-halo 5s linear infinite; }
`;

function Contact() {
  useEffect(() => {
    const preconnectGoogle = document.createElement("link");
    preconnectGoogle.rel = "preconnect";
    preconnectGoogle.href = "https://fonts.googleapis.com";

    const preconnectGstatic = document.createElement("link");
    preconnectGstatic.rel = "preconnect";
    preconnectGstatic.href = "https://fonts.gstatic.com";
    preconnectGstatic.crossOrigin = "anonymous";

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap";

    document.head.appendChild(preconnectGoogle);
    document.head.appendChild(preconnectGstatic);
    document.head.appendChild(fontLink);

    return () => {
      preconnectGoogle.remove();
      preconnectGstatic.remove();
      fontLink.remove();
    };
  }, []);

  const [selectedContact, setSelectedContact] = useState(teamMembers[0]);
  const [showInfo, setShowInfo] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduceMotion] = useState(
    () =>
      !IGNORE_REDUCED_MOTION &&
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // animations run only when the page is ready and the visitor allows motion
  const anim = (cls) => (ready && !reduceMotion ? cls : "");
  const hold = ready ? "" : "opacity-0";

  // member list: scroll position drives the < > arrows
  const listRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return undefined;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateArrows);
      ro.observe(el);
    }
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
      if (ro) ro.disconnect();
    };
  }, [updateArrows]);

  const scrollList = (dir) => {
    const el = listRef.current;
    if (!el) return;
    const first = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 10;
    const step = first ? first.getBoundingClientRect().width + gap : el.clientWidth * 0.6;
    el.scrollBy({ left: dir * step, behavior: reduceMotion ? "auto" : "smooth" });
  };

  // start the opening animation only after fonts + images have finished loading,
  // so it never stutters while files are still downloading
  useEffect(() => {
    let cancelled = false;
    const go = () => {
      if (cancelled) return;
      // two frames so the browser has painted the hidden state first
      requestAnimationFrame(() =>
        requestAnimationFrame(() => !cancelled && setReady(true))
      );
    };
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true })
          );
    Promise.all([
      loaded,
      document.fonts ? document.fonts.ready : Promise.resolve(),
    ]).then(go);
    const fallback = setTimeout(go, 1200); // safety fallback

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, []);

  // page-level tweaks that must not leak to other routes:
  // dark <html> background (no white flash) + no scrolling on desktop
  useEffect(() => {
    const html = document.documentElement;
    const prevBg = html.style.backgroundColor;
    const scrollbarClasses = [
      "min-[701px]:[scrollbar-width:none]",
      "min-[701px]:[&::-webkit-scrollbar]:hidden",
      "min-[701px]:overflow-hidden",
    ];
    html.style.backgroundColor = "#1d1530";
    html.classList.add(...scrollbarClasses);
    return () => {
      html.style.backgroundColor = prevBg;
      html.classList.remove(...scrollbarClasses);
    };
  }, []);

  const selectContact = (member) => {
    setSelectedContact(member);
    setShowInfo(false);
  };

  // Contact-page-only animations; kept here so no global CSS file is modified.
  const animationStyles = <style>{contactPageAnimations}</style>;

  return (
    <>
      <Navbar/>
      {animationStyles}
    <div
      className={cx(
        "relative isolate flex min-h-[100dvh] w-full flex-col overflow-x-clip",
        // desktop: one single page, exactly the screen height, never scrolls
        "min-[701px]:h-[100dvh] min-[701px]:min-h-0 min-[701px]:overflow-hidden",
        "bg-cover bg-no-repeat bg-[#3a1d1a] [background-position:70%_center]",
        "min-[701px]:bg-[#1d1530] min-[701px]:[background-position:center_58%]",
        "text-[#3b2414]",
        BODY,
        // scene units (desktop only)
        "[--strip-h:56px]",
        "min-[701px]:[--u:min(1vw,1.36vh)]",
        "min-[701px]:[--strip-h:clamp(40px,calc(var(--u)_*_7),100px)]",
        "min-[701px]:[--board-bottom-pad:clamp(18px,calc(var(--u)_*_3.2),64px)]",
        ANIMATION === "blocky" ? EASE_BLOCKY : EASE_SMOOTH
      )}
      style={art(contactBackground)}
    >


      {/* ================================ MAIN ================================ */}
      <main className={cx("relative flex-[1_0_auto] min-[701px]:flex min-[701px]:flex-col", hold)}>
        {/* floating embers (decorative) */}
        <span
          aria-hidden="true"
          className={cx(EMBER_BASE, "max-[700px]:hidden", anim(A_EMBER_1))}
          style={{ boxShadow: EMBERS.desktopA }}
        />
        <span
          aria-hidden="true"
          className={cx(EMBER_BASE, "max-[700px]:hidden", anim(A_EMBER_2))}
          style={{ boxShadow: EMBERS.desktopB }}
        />
        <span
          aria-hidden="true"
          className={cx(EMBER_BASE, "min-[701px]:hidden", anim(A_EMBER_1))}
          style={{ boxShadow: EMBERS.mobileA }}
        />
        <span
          aria-hidden="true"
          className={cx(EMBER_BASE, "min-[701px]:hidden", anim(A_EMBER_2))}
          style={{ boxShadow: EMBERS.mobileB }}
        />

        {/* ---------- heading: stone title + wooden subtitle plank ---------- */}
        <section className="px-[14px] pt-[100px] text-center min-[701px]:px-4 min-[701px]:pt-[80px]">
          <h1
            className={cx(
              "mx-auto mb-2 aspect-[1400/256] w-[min(78vw,340px)]",
              "min-[701px]:mb-[clamp(6px,var(--u),14px)] min-[701px]:w-[clamp(180px,calc(var(--u)_*_31),480px)]",
              "[filter:drop-shadow(0_3px_0_rgba(0,0,0,0.4))]",
              anim(A_TITLE)
            )}
          >
            <img
              src={titleImg}
              alt="Contact Us"
              className={cx("block h-full w-full object-contain md:mt-15", PIXEL)}
            />
          </h1>
          <p
            className={cx(
              "inline-block max-w-full text-white",
              "[padding:9px_22px] text-[15px] leading-[1.1]",
              "min-[701px]:[padding:clamp(7px,calc(var(--u)_*_1.1),15px)_clamp(26px,calc(var(--u)_*_3.4),48px)]",
              "min-[701px]:text-[length:clamp(13px,calc(var(--u)_*_1.6),22px)] min-[701px]:leading-[1.15]",
              "[text-shadow:0_1px_0_rgba(255,226,170,0.5)]",
              FILL,
              PIXEL,
              anim(A_PLANK)
            )}
            style={art(plankBanner)}
          >
            Have a question? Get in touch with the HackFusion team.
          </p>
        </section>

        {/* ------------------- book column + stone board ------------------- */}
        <div
          className={cx(
            "relative mx-auto grid w-full max-w-[560px] grid-cols-[minmax(0,1fr)] gap-[16px]",
            "[padding:40px_14px_28px] max-[380px]:px-[10px]",
            "[container-type:inline-size]",
            "[filter:drop-shadow(0_0_2px_rgba(0,0,0,0.9))_drop-shadow(0_8px_16px_rgba(0,0,0,0.6))]",
            // --hdr = exact height of the heading (title + plank) above the board.
            //   (80px + 60px = the heading's fixed top spacing: pt-[80px] and the title's md:mt-15; change them if you change that.)
            // --gap-top = the small space left between the plank and the board. Want it bigger? raise the 0.8.
            // --S = size of the book + board group. 0.5162 = board height / group width (frame aspect ratio + column split),
            //   so the group fills the space under the heading exactly and the page never scrolls.
            //   If the bottom ever gets clipped raise 0.5162 a little (0.53).
            // --mid-gap = extra space opened in the middle (book moves left, board moves right by half each).
            //   It shrinks to 0 by itself on screens with no spare width. Max is 9vw.
            "min-[701px]:[--hdr:calc(80px_+_60px_+_8px_+_clamp(180px,calc(var(--u)_*_31),480px)_*_0.18286_+_clamp(6px,var(--u),14px)_+_2_*_clamp(7px,calc(var(--u)_*_1.1),15px)_+_1.15_*_clamp(13px,calc(var(--u)_*_1.6),22px))]",
            "min-[701px]:[--gap-top:clamp(6px,calc(var(--u)_*_0.8),14px)]",
            "min-[701px]:[--S:min(2200px,98vw,calc((100dvh_-_var(--hdr)_-_var(--gap-top)_-_clamp(6px,calc(var(--u)_*_0.9),14px)_-_var(--board-bottom-pad))_/_0.5162_+_2vw))]",
            "min-[701px]:[--mid-gap:clamp(0px,calc(98vw_-_var(--S)),9vw)]",
            "min-[701px]:mt-auto min-[701px]:mb-0 min-[701px]:max-w-[var(--S)]",
            "min-[701px]:grid-cols-[minmax(0,30fr)_minmax(0,70fr)] min-[701px]:items-start min-[701px]:gap-x-[1%] min-[701px]:gap-y-0",
            "min-[701px]:[padding:clamp(6px,calc(var(--u)_*_0.9),14px)_1%_var(--board-bottom-pad)]"
          )}
        >
          {/* wooden posts that hold the board (desktop) */}
          <div
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute z-[-1] max-[700px]:hidden",
              "col-start-2 col-end-3 row-start-1 row-end-2 left-[calc(11%_+_var(--mid-gap)_*_0.5)] top-[78%] w-[72%]",
              "h-[calc(22%_+_var(--board-bottom-pad)_-_var(--strip-h)_*_0.083_+_12px)]",
              "bg-bottom bg-no-repeat [background-size:100%_auto]",
              PIXEL,
              anim(A_POSTS)
            )}
            style={art(postsPair)}
          />

          {/* ---------------- EMAIL SUPPORT = open book on a lectern ---------------- */}
          <section
            aria-labelledby="email-heading"
            className={cx(
              "relative isolate grid aspect-[1088/674] w-full max-w-[460px] grid-cols-2 items-center justify-items-center justify-self-center",
              "text-[#3b2414] [padding:3.5%_11%_12.5%_11%]",
              "min-[701px]:max-w-none min-[701px]:self-end",
              // --bk = book size multiplier (1 = column width). left = moves it out into the middle gap's other side.
              "min-[701px]:[--bk:1.2] min-[701px]:w-[calc(100%_*_var(--bk))] min-[701px]:left-[calc(var(--mid-gap)_*_-0.5)]",
              "min-[701px]:mb-[calc(51.1%_*_var(--bk)_-_var(--board-bottom-pad)_+_var(--strip-h)_*_0.083_-_10px)]",
              anim(A_DROP)
            )}
          >
            {/* book art */}
            <div
              aria-hidden="true"
              className={cx("pointer-events-none absolute inset-0 z-[-1]", FILL, PIXEL)}
              style={art(bookOpen)}
            />
            {/* lectern under the book (desktop) */}
            <div
              aria-hidden="true"
              className={cx(
                "pointer-events-none absolute left-1/2 top-[76%] z-[-2] aspect-[513/627] w-[54%] -translate-x-1/2 max-[700px]:hidden",
                FILL,
                PIXEL
              )}
              style={art(lectern)}
            />

            <h2
              id="email-heading"
              className="text-center text-[#3b2414] leading-none text-[length:clamp(15px,4.6cqw,22px)] min-[701px]:text-[length:max(12px,calc(2.2cqw_*_var(--bk)))]"
            >
              <img
                src={quill}
                alt=""
                aria-hidden="true"
                className={cx(
                  "mx-auto mb-[0.3em] block aspect-[749/801] w-[clamp(34px,11cqw,56px)] min-[701px]:w-[clamp(40px,calc(6.3cqw_*_var(--bk)),108px)]",
                  PIXEL
                )}
              />
              Email Support
            </h2>

            <div className="flex w-full min-w-0 flex-col items-center gap-2 min-[701px]:gap-[calc(1.4cqw_*_var(--bk))]">
              {["gdg@sggs.ac.in", "swag@sggs.ac.in"].map((mail) => (
                <a
                  key={mail}
                  href={`mailto:${mail}`}
                  className={cx(
                    "flex max-w-full flex-col items-center text-center text-[#3b2414] underline underline-offset-[3px] [overflow-wrap:anywhere]",
                    "leading-[1.05] text-[length:clamp(12px,3.7cqw,17px)] min-[701px]:text-[length:max(10px,calc(1.6cqw_*_var(--bk)))]",
                    "min-[701px]:hover:text-[#6b2f0c]",
                    FOCUS_BROWN
                  )}
                >
                  <img
                    src={envelope}
                    alt=""
                    aria-hidden="true"
                    className={cx(
                      "mb-[2px] block aspect-[616/443] w-[clamp(20px,6.5cqw,30px)] min-[701px]:w-[clamp(26px,calc(3cqw_*_var(--bk)),50px)]",
                      PIXEL
                    )}
                  />
                  {mail}
                </a>
              ))}
            </div>
          </section>

          {/* ---------------- CONTACT PERSON = stone board on posts ---------------- */}
          <section
            id="contact"
            aria-labelledby="contact-heading"
            className={cx(
              // desktop size knobs (bigger number = bigger):
              //   --is = header + info paper + avatar frame, --cs = member cards + arrows, --ps = "OTHER TEAM MEMBERS" plate.
              // (--bs is no longer used for these.)
              "relative block w-full text-[#f4f1e8] [--bs:0.72] [--is:1.12] [--cs:1.35] [--ps:0.85] [--mw:calc(100%_-_16px)]",
              // mobile frame slices: --hn = natural art height, --m = stretched middle height
              // --k = vertical stretch of the top/bottom art slices (1.0 = natural proportions, so the lanterns are not squished)
              "[--k:1.0] [--hn:calc(100cqw_*_0.7026_*_var(--k))] [--m:calc(var(--board-h)_-_var(--hn)_*_0.67)]",
              // mobile: board art stretched to --board-h, derived from the flip-card height
              "[--win:clamp(170px,45vw,225px)] [--card-h:calc(var(--win)_+_84px)] [--board-h:calc((var(--card-h)_+_56px)_/_0.7)]",
              "[padding:calc(var(--board-h)_*_0.185)_18.5%_0_18%] bg-top bg-no-repeat",
              // desktop: board fills its box
              // NOTE: if board-stone-frame-lanterns.webp is not 1288x905, put its real W/H in aspect-[W/H]
              "min-[701px]:grid min-[701px]:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] min-[701px]:grid-rows-[auto_auto_auto_auto]",
              "min-[701px]:content-evenly min-[701px]:items-stretch min-[701px]:gap-x-[3%] min-[701px]:gap-y-0",
              // BOARD SIZE (desktop): the frame fills the right column and sticks out to the left by (grow - 1).
              // If you change --board-grow, also move two things by the same amount:
              //   posts:  left-[11%]  = 14% - half of the extra   (1.06 -> extra 6% -> 14% - 3%)
              //   glow:   [inset:0_-8%_0_-14%] left value = -8% - the extra
              // PADDING = the parchment opening of the frame art: top / right / bottom / left.
              // (the side values are a % of the column, and the board is 6% wider than its column,
              //  so they are about 6% larger than the opening itself: 18% * 1.06 = 19.5%)
              "min-[701px]:[--board-grow:1.06] min-[701px]:w-[calc(100%_*_var(--board-grow))] min-[701px]:max-w-none min-[701px]:justify-self-end min-[701px]:left-[calc(var(--mid-gap)_*_0.5)]",
              "min-[701px]:aspect-[1288/905] min-[701px]:min-h-0 min-[701px]:[padding:15.9%_19.8%_18%_19.5%]",
              "min-[701px]:[background-size:100%_100%] min-[701px]:bg-center min-[701px]:[background-image:var(--board-img)]",
              PIXEL,
              anim(A_RISE)
            )}
            style={{ "--board-img": `url("${boardFrame}")` }}
          >

            {/* mobile frame art, drawn in 3 slices so the lanterns keep their real proportions:
                top + bottom at natural aspect, only the plain stone middle is stretched */}
            <div
              aria-hidden="true"
              className={cx("pointer-events-none absolute inset-x-0 top-0 z-0 bg-no-repeat min-[701px]:hidden", PIXEL)}
              style={{
                height: "calc(var(--hn) * 0.45)",
                backgroundImage: `url(${boardFrame})`,
                backgroundSize: "100% var(--hn)",
                backgroundPosition: "center top",
              }}
            />
            <div
              aria-hidden="true"
              className={cx("pointer-events-none absolute inset-x-0 z-0 bg-no-repeat min-[701px]:hidden", PIXEL)}
              style={{
                top: "calc(var(--hn) * 0.45 - 1px)",
                height: "calc(var(--m) + 2px)",
                backgroundImage: `url(${boardFrame})`,
                backgroundSize: "100% calc(var(--m) / 0.33)",
                backgroundPosition: "0 calc(var(--m) * -1.3636)",
              }}
            />
            <div
              aria-hidden="true"
              className={cx("pointer-events-none absolute inset-x-0 z-0 bg-no-repeat min-[701px]:hidden", PIXEL)}
              style={{
                top: "calc(var(--board-h) - var(--hn) * 0.22)",
                height: "calc(var(--hn) * 0.22)",
                backgroundImage: `url(${boardFrame})`,
                backgroundSize: "100% var(--hn)",
                backgroundPosition: "center bottom",
              }}
            />

            {/* swaying + blinking lanterns: a copy of just the lantern area of the frame art,
                laid exactly over the originals (mobile slices and desktop background share the same art box) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-0 h-[var(--hn)] w-full min-[701px]:h-full"
            >
              {["left", "right"].map((side, i) => {
                const left = side === "left" ? LANTERN.x : 100 - LANTERN.x - LANTERN.w;
                return (
                  <div
                    key={side}
                    className={anim(A_LANTERN_SWAY)}
                    style={{
                      position: "absolute",
                      left: `${left}%`,
                      top: `${LANTERN.y}%`,
                      width: `${LANTERN.w}%`,
                      height: `${LANTERN.h}%`,
                      overflow: "hidden",
                      animationDelay: i ? "-2.3s" : "0s",
                    }}
                  >
                    <div
                      className={cx(PIXEL, anim(A_LANTERN_BLINK))}
                      style={{
                        position: "absolute",
                        left: `${(-left / LANTERN.w) * 100}%`,
                        top: `${(-LANTERN.y / LANTERN.h) * 100}%`,
                        width: `${(100 / LANTERN.w) * 100}%`,
                        height: `${(100 / LANTERN.h) * 100}%`,
                        backgroundImage: `url(${boardFrame})`,
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        animationDelay: i ? "-2.5s" : "0s",
                      }}
                    />
                    <div
                      className={anim(A_LANTERN_HALO)}
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.25,
                        mixBlendMode: "screen",
                        background:
                          "radial-gradient(ellipse closest-side at 50% 72%, rgba(255,190,90,0.55) 0%, rgba(255,150,50,0.18) 55%, rgba(255,150,50,0) 100%)",
                        animationDelay: i ? "-2.5s" : "0s",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* "Contact Person" stone header plate */}
            <h2
              id="contact-heading"
              className={cx(
                "relative z-[1] mx-auto mb-2 w-[70%] text-center text-[#f4f1e8] leading-[1.2]",
                "[padding:0.5em_0.4em_0.55em] text-[length:clamp(9px,3.15cqw,13px)]",
                "[text-shadow:2px_2px_0_#1b1b1b]",
                "border-[3px] border-solid border-[#1f1f1f]",
                "[box-shadow:inset_0_0_0_2px_rgba(190,190,190,0.35),0_3px_0_rgba(0,0,0,0.35)]",
                "min-[701px]:col-span-full min-[701px]:row-start-1 min-[701px]:justify-self-center min-[701px]:w-[54%] min-[701px]:mx-0",
                "min-[701px]:mb-[calc(1.1cqw_*_var(--is))] min-[701px]:[padding:0.55em_0.4em_0.6em]",
                "min-[701px]:text-[length:max(9px,calc(1.1cqw_*_var(--is)))]",
                HEAD,
                COVER,
                PIXEL,
                anim(A_POP_H2)
              )}
              style={artOver(stonePlate, "rgba(0,0,0,0.22)")}
            >
              Contact Person
            </h2>

            {/* organiser card: mobile = block, desktop = children join the board grid */}
            <div className="relative z-[1] mb-[calc(var(--board-h)_*_0.115_+_12px)] min-[701px]:contents">
              {/* ---- desktop: wooden item frame with the character ---- */}
              <div
                className={cx(
                  "relative z-[1] hidden min-w-0 overflow-hidden min-[701px]:block",
                  "min-[701px]:col-start-1 min-[701px]:row-start-2 min-[701px]:row-end-5 min-[701px]:self-stretch",
                  "[border-width:max(6px,calc(0.75cqw_*_var(--is)))]",
                  FRAME_BORDER,
                  FRAME_BG,
                  "[box-shadow:0_0_0_2px_#1a0f08,inset_0_0_0_2px_#24140a,inset_0_0_18px_rgba(0,0,0,0.6),0_4px_0_2px_rgba(0,0,0,0.35)]",
                  anim(A_SPAWN)
                )}
              >
                <img
                  src={selectedContact.image}
                  alt={`${selectedContact.name} Minecraft character`}
                  className={cx(
                    "absolute inset-0 block h-full w-full object-cover object-top",
                    "[filter:drop-shadow(0_6px_0_rgba(0,0,0,0.35))]",
                    PIXEL
                  )}
                />
              </div>

              {/* ---- desktop: info on parchment ---- */}
              <div
                className={cx(
                  "relative z-[1] hidden min-w-0 flex-col items-center justify-center text-center text-[#3b2414] [overflow-wrap:anywhere]",
                  "min-[701px]:flex min-[701px]:col-start-2 min-[701px]:row-start-2",
                  "min-[701px]:min-h-[calc(8cqw_*_var(--is))] [padding:4.5%_8%]",
                  "[filter:drop-shadow(0_3px_0_rgba(0,0,0,0.35))]",
                  FILL,
                  PIXEL,
                  anim(A_POP_INFO)
                )}
                style={art(parchmentLarge)}
              >
                <div>
                  <h3 className="mb-[0.15em] text-[#2b1608] leading-[0.95] [overflow-wrap:break-word] [text-wrap:balance] text-[length:max(13px,calc(2.25cqw_*_var(--is)))]">
                    {selectedContact.name}
                  </h3>
                  <p className="my-[0.1em] text-[#3b2414] leading-none text-[length:max(11px,calc(1.6cqw_*_var(--is)))]">
                    {selectedContact.role}
                  </p>
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className={cx(
                      "text-[#5a2d0a] underline underline-offset-[3px] hover:text-[#8a3d0c] leading-none text-[length:max(11px,calc(1.6cqw_*_var(--is)))]",
                      FOCUS_BROWN
                    )}
                  >
                    {selectedContact.phone}
                  </a>
                </div>
              </div>

              {/* ---- mobile: flip card (front = character, back = parchment) ---- */}
              <div
                className={cx(
                  "relative z-[1] mx-auto h-[var(--card-h)] w-[var(--mw)] overflow-hidden [perspective:1000px] min-[701px]:hidden",
                  anim(A_FADE_CARD)
                )}
              >
                <div
                  className={cx(
                    "relative h-full w-full [transform-style:preserve-3d] transition-transform duration-[600ms] ease-[ease]",
                    showInfo ? "[transform:rotateY(180deg)]" : ""
                  )}
                >
                  {/* front */}
                  <div
                    className={cx(
                      "absolute inset-0 flex flex-col items-center justify-start gap-[10px] overflow-hidden [padding:6px_6px_8px] text-[#f4f1e8]",
                      "border-[6px]",
                      FRAME_BORDER,
                      FRAME_BG,
                      "[box-shadow:0_0_0_2px_#1a0f08,inset_0_0_0_2px_#24140a,inset_0_0_18px_rgba(0,0,0,0.6)]",
                      "[backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                    )}
                  >
                    <img
                      src={selectedContact.image}
                      alt={`${selectedContact.name} Minecraft character`}
                      className={cx(
                        "block h-[var(--win)] w-full flex-none object-cover object-top",
                        "[mask-image:linear-gradient(to_bottom,#000_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_78%,transparent_100%)]",
                        PIXEL
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowInfo(true)}
                      className={WOOD_BTN}
                      style={WOOD_BTN_STYLE}
                    >
                      Contact
                    </button>
                  </div>

                  {/* back */}
                  <div
                    className={cx(
                      "absolute inset-0 flex flex-col items-center justify-center overflow-hidden text-center text-[#3b2414] [overflow-wrap:anywhere]",
                      "[padding:8%_10%] [transform:rotateY(180deg)]",
                      "[backface-visibility:hidden] [-webkit-backface-visibility:hidden]",
                      FILL,
                      PIXEL
                    )}
                    style={art(parchmentLarge)}
                  >
                    <h3 className="mb-[6px] text-[#2b1608] leading-[0.95] [text-wrap:balance] text-[length:clamp(25px,7cqw,34px)]">
                      {selectedContact.name}
                    </h3>
                    <p className="my-[2px] text-[#3b2414] leading-none text-[length:clamp(20px,5.4cqw,26px)]">
                      {selectedContact.role}
                    </p>
                    <p className="my-[2px] text-[#3b2414] leading-none text-[length:clamp(20px,5.4cqw,26px)]">
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-[#5a2d0a] underline underline-offset-[3px]"
                      >
                        {selectedContact.phone}
                      </a>
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowInfo(false)}
                      className={WOOD_BTN}
                      style={WOOD_BTN_STYLE}
                    >
                      Show Avatar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- OTHER TEAM MEMBERS plate ---- */}
            <h3
              className={cx(
                "relative z-[1] block text-center text-[#1b1b1b] leading-[1.2]",
                "box-border w-[var(--mw)] [margin:0_auto] [padding:0.7em_0.4em_0.75em] text-[length:clamp(9px,3.3cqw,13px)]",
                "[text-shadow:0_1px_0_rgba(255,255,255,0.45)]",
                "border-[3px] border-solid border-[#2e2e2e]",
                "[box-shadow:inset_0_0_0_2px_rgba(255,255,255,0.3),0_3px_0_rgba(0,0,0,0.35)]",
                "min-[701px]:col-start-2 min-[701px]:row-start-3 min-[701px]:self-end min-[701px]:w-full",
                "min-[701px]:[margin:calc(1.3cqw_*_var(--ps))_0_calc(0.8cqw_*_var(--ps))] min-[701px]:[padding:0.55em_0.4em_0.6em]",
                "min-[701px]:text-[length:max(8px,calc(0.95cqw_*_var(--ps)))]",
                HEAD,
                COVER,
                PIXEL,
                anim(A_POP_HEAD)
              )}
              style={artOver(stonePlate, "rgba(255,255,255,0.2)")}
            >
              OTHER TEAM MEMBERS
            </h3>

            {/* ---- member cards: scroll-snap row with < > arrows (wooden tray on mobile) ---- */}
            <div
              className={cx(
                "relative z-[1] box-border min-w-0 w-[var(--mw)] [margin:0_auto]",
                "min-[701px]:col-start-2 min-[701px]:row-start-4 min-[701px]:m-0 min-[701px]:w-full min-[701px]:max-w-full"
              )}
            >
            <div
              ref={listRef}
              className={cx(
                "relative flex w-full min-w-0 flex-nowrap items-start overflow-x-auto overflow-y-hidden min-h-max",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]",
                "[scroll-snap-type:x_mandatory]",
                // mobile tray (30px side padding leaves room for the arrows)
                // border matches the Contact Person card above (6px, same bevel colours) so the edges line up
                "gap-[10px] [padding:12px_30px_24px] [scroll-padding-inline:30px]",
                "max-[700px]:border-[6px] max-[700px]:border-solid max-[700px]:border-[#7a4e27] max-[700px]:border-t-0",
                "max-[700px]:border-l-[#8f5f32] max-[700px]:border-b-[#4d2f17] max-[700px]:border-r-[#5b361b]",
                "max-[700px]:bg-[linear-gradient(180deg,#3b2616,#2a1a10)]",
                "max-[700px]:[box-shadow:inset_0_0_14px_rgba(0,0,0,0.5)]",
                // desktop row
                "min-[701px]:max-w-full min-[701px]:items-stretch",
                "min-[701px]:gap-[calc(1cqw_*_var(--cs))] min-[701px]:[padding:max(5px,0.8cqw)_max(16px,1.75cqw)_max(8px,1.2cqw)] min-[701px]:[scroll-padding-inline:max(16px,1.75cqw)]"
              )}
            >
              {teamMembers.map((member, index) => {
                const selected = selectedContact.id === member.id;
                return (
                  <button
                    type="button"
                    key={member.id}
                    aria-pressed={selected}
                    onClick={() => selectContact(member)}
                    style={{
                      ...art(parchmentSmall),
                      animationDelay: CARD_DELAYS[Math.min(index, 3)],
                    }}
                    className={cx(
                      "snap-start shrink-0 grow-0 aspect-[1032/488]",
                      "[--cw:min(clamp(150px,44vw,190px),100%)] min-[701px]:[--cw:calc((100%_-_calc(1cqw_*_var(--cs)))_/_2)]",
                      "w-[var(--cw)] min-w-[var(--cw)] max-w-[var(--cw)]",
                      "flex flex-col items-center justify-center text-center text-[#3b2414] [padding:5%_9%] min-[701px]:[padding:calc(var(--cw)_*_0.04)_calc(var(--cw)_*_0.055)] [overflow-wrap:anywhere]",
                      "[transition:transform_0.12s_steps(2),translate_0.12s_steps(2),filter_0.12s_steps(2)] motion-reduce:[transition:none]",
                      selected
                        ? "-translate-y-[3px] [filter:drop-shadow(0_0_6px_#ffd24a)_drop-shadow(0_0_2px_#ffd24a)] motion-reduce:translate-y-0"
                        : "hover:brightness-[1.08]",
                      FILL,
                      PIXEL,
                      FOCUS_GOLD,
                      anim(A_POP_CARD)
                    )}
                  >
                    <h4 className="mb-[0.2em] w-full text-[19px] leading-[0.95] text-[#2b1608] [text-wrap:balance] [overflow-wrap:anywhere] min-[701px]:text-[length:max(11px,calc(1.45cqw_*_var(--cs)))]">
                      {member.name}
                    </h4>
                    <p className="w-full text-[15px] leading-none text-[#3b2414] [overflow-wrap:anywhere] min-[701px]:text-[length:max(9px,calc(1.15cqw_*_var(--cs)))]">
                      {member.role}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* < > arrows: show that the list scrolls */}
            <div className="pointer-events-none absolute inset-y-0 left-[2px] z-[2] flex items-center pb-[14px] min-[701px]:pb-[6px]">
              <button
                type="button"
                aria-label="Show previous team members"
                disabled={!canLeft}
                onClick={() => scrollList(-1)}
                className={ARROW_BTN}
                style={WOOD_BTN_STYLE}
              >
                &lt;
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-[2px] z-[2] flex items-center pb-[14px] min-[701px]:pb-[6px]">
              <button
                type="button"
                aria-label="Show next team members"
                disabled={!canRight}
                onClick={() => scrollList(1)}
                className={ARROW_BTN}
                style={WOOD_BTN_STYLE}
              >
                &gt;
              </button>
            </div>
            </div>
          </section>
        </div>
      </main>

    </div>
    </>

  );
}

export default Contact;