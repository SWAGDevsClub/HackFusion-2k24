import { motion, MotionConfig } from "motion/react";
import UnderwaterEffects from "../components/UnderwaterEffects.jsx";
import bgImage from "../assets/minecraft_coral_ocean.webp";
import parchmentCardImg from "../assets/parchment_card.webp";

import diamondIcon from "../assets/icons/diamond.webp";
import paperIcon from "../assets/icons/paper.webp";
import bedIcon from "../assets/icons/bed.webp";
import enchantedBookIcon from "../assets/icons/enchanted_book.webp";
import beaconIcon from "../assets/icons/beacon.webp";
import enderChestIcon from "../assets/icons/ender_chest.webp";
import elytraIcon from "../assets/icons/elytra.webp";
import goldenAppleIcon from "../assets/icons/golden_apple.webp";
import pickaxeIcon from "../assets/icons/pickaxe.webp";
import compassIcon from "../assets/icons/compass.webp";
import emeraldIcon from "../assets/icons/emerald.webp";
import clockIcon from "../assets/icons/clock.webp";
import totemIcon from "../assets/icons/totem.webp";
import CountUp from "../animations/countUp.jsx";

/* ------------------------------------------------------------------ */
/*  Fonts + shared styles                                              */
/*  PIXEL = titles & numbers only. BODY = everything you read.         */
/* ------------------------------------------------------------------ */
const PIXEL = "font-['Press_Start_2P']";
const BODY = "font-['VT323']";

const TILE =
  "border-2 border-[#8f5e30] bg-[#e8c88e]/95 shadow-[inset_1px_1px_0_rgba(255,250,230,0.85),0_2px_4px_rgba(60,35,10,0.15)]";
const ICON_BOX =
  "flex items-center justify-center border-2 border-[#5c371a] bg-[#2d1b0f] shadow-[inset_1px_1px_0_rgba(0,0,0,0.5)]";
const ICON_IMG = "object-contain [image-rendering:pixelated]";

/* ------------------------------------------------------------------ */
/*  Fluid sizing                                                       */
/*  Every size below scales with the width of the card it sits in      */
/*  (cqi = 1% of that card's inner width), so text never outgrows its  */
/*  parchment, no matter the screen. Max values = the old desktop      */
/*  sizes, min values = the old mobile sizes. Fonts are unchanged.     */
/* ------------------------------------------------------------------ */
const SZ = {
  h2: "text-[length:clamp(1.25rem,6.5cqi,3.25rem)]",
  subtitle: "text-[length:clamp(1.0625rem,3cqi,1.5rem)]",
  chip: "text-[length:clamp(0.5rem,3.2cqi,0.75rem)]",
  bigNumber: "text-[length:clamp(1.25rem,9cqi,3.75rem)]",
  feeNumber: "text-[length:clamp(1.75rem,12cqi,3.75rem)]",
  label: "text-[length:clamp(1.0625rem,4cqi,1.25rem)]",
  special: "text-[length:clamp(1rem,3cqi,1.125rem)]",
  cardTitle: "text-[length:clamp(0.5625rem,4.4cqi,0.75rem)]",
  body: "text-2xl",
  rarity: "text-[length:clamp(0.9375rem,2.4cqi,1rem)]",
  perkTitle: "text-[length:clamp(0.5625rem,1.5cqi,0.625rem)]",
  perkDesc: "text-[length:clamp(0.9375rem,2.4cqi,1.0625rem)]",
};

/* Safe areas: the parchment has torn, uneven edges, so content is kept
   well inside them (percent = of card width, clamped to sensible rem). */
const PAD_MAIN =
  "px-[clamp(1.75rem,12%,3.5rem)] pt-[clamp(2.25rem,9%,3rem)] pb-[clamp(2rem,8%,2.75rem)]";
const PAD_INFO =
  "px-[clamp(1.75rem,11%,2.75rem)] pt-[clamp(2.25rem,9%,2.75rem)] pb-[clamp(2rem,8%,2.5rem)]";

/* Column counts come from available space, not screen breakpoints:
   as many columns as fit, never narrower than the minimum. */
const GRID_SPECIAL = "grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]";
const GRID_INFO = "grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))]";
const GRID_PERKS = "grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */
const SPECIAL_PRIZES = [
  { icon: totemIcon, alt: "Totem of Undying", text: "Special prize for specially-abled teams.", note: "(Min 2 in team)" },
  { icon: goldenAppleIcon, alt: "Golden Apple", text: "Special prize for all-girls teams.", note: "(100% girls Team)" },
];

const INFO_CARDS = [
  {
    icon: emeraldIcon,
    alt: "Emerald",
    title: "Great Community",
    titleColor: "text-[#15803d]",
    from: "left",
    text: "Embark on a journey of collaboration and knowledge exchange. Seize networking opportunities with enthusiasts and industry experts. Create lasting connections that propel your success!",
  },
  {
    icon: clockIcon,
    alt: "Clock",
    title: "36+ Hours",
    titleColor: "text-[#b45309]",
    from: "right",
    text: "Two days of intense brainstorming and coding. Dynamic discussions, exchange ideas with top professionals, and harness collaborative problem-solving.",
  },
];

const PERKS = [
  //   { title: "₹2,30,000 Prize Pool", desc: "Top ranking team awards", icon: diamondIcon, rarity: "Diamond", color: "#0284c7" },
  { title: "Certificate", desc: "Official participation proof", icon: paperIcon, rarity: "Credential", color: "#b45309" },
  { title: "Free Accommodation", desc: "Stay for the full 36 hours", icon: bedIcon, rarity: "Stay", color: "#dc2626" },
  //   { title: "Skill Development", desc: "Workshops & mentor support", icon: enchantedBookIcon, rarity: "Experience", color: "#9333ea" },
  //   { title: "Networking", desc: "Connect with sponsors & peers", icon: beaconIcon, rarity: "Network", color: "#0d9488" },
  { title: "Portfolio Enhancement", desc: "Showcase real projects", icon: enderChestIcon, rarity: "Portfolio", color: "#7c3aed" },
  //   { title: "Career Advancement", desc: "Fast-track interviews", icon: elytraIcon, rarity: "Career", color: "#c2410c" },
  //   { title: "Personal Growth", desc: "Push your limits", icon: goldenAppleIcon, rarity: "Growth", color: "#ca8a04" },
  { title: "Internship Opportunity", desc: "Exclusive recruiter rounds", icon: pickaxeIcon, rarity: "Internship", color: "#0369a1" },
  //   { title: "Mentorship", desc: "Guidance from industry leaders", icon: compassIcon, rarity: "Mentorship", color: "#16a34a" },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
const OFFSETS = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: -24 },
  right: { x: 24 },
};

function Reveal({ children, delay = 0, from = "up", className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...OFFSETS[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Outer layer = parchment art + shadow + hover lift.
   Inner layer = the safe area. It is a size container, so everything
   inside can size itself from the card's real inner width.
   `className` goes on the inner layer (padding, flex, min-height...). */
function ParchmentCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-full bg-[length:100%_100%] bg-no-repeat will-change-transform [filter:drop-shadow(0_14px_32px_rgba(1,14,28,0.72))_drop-shadow(0_2px_8px_rgba(0,0,0,0.45))]"
      style={{ backgroundImage: `url(${parchmentCardImg})` }}
    >
      <div className={`h-full ${className}`} style={{ containerType: "inline-size" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function PrizePool() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="prizes"
        className="relative select-none overflow-x-clip px-2.5 text-[#ede5da] selection:bg-[#55ff55] selection:text-black sm:px-5"
      >
        {/* Fonts (cleaner long-term: put this link in index.html and delete it here) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
        />

        {/* Background: a screen-sized layer pinned while the section scrolls.
            Never stretched over the whole section, so it stays sharp when zooming.
            100lvh (not dvh) so it doesn't resize/jump when mobile browser bars hide. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="sticky top-0 h-[100lvh] w-full overflow-hidden">
            <img
              src={bgImage}
              alt=""
              draggable={false}
              className="h-full w-full object-cover object-[center_40%] [filter:brightness(1.15)_contrast(1.02)_saturate(1.06)]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(30,120,180,0.12)_0%,transparent_70%)]" />
            <UnderwaterEffects />
          </div>
        </div>

        {/* Content */}
        <div
          className="relative z-20 mx-auto w-full max-w-[840px] space-y-5 px-1.5 py-10 sm:space-y-6 sm:px-4 sm:py-14"
          style={{ containerType: "inline-size" }}
        >
          {/* Title */}
          <Reveal from="down">
            <div className="space-y-3 text-center">
              <h2
                className={`${PIXEL} ${SZ.h2} uppercase leading-tight tracking-wider text-[#ffd54f] [text-shadow:3px_3px_0_#422006,5px_5px_0_#051829] [text-wrap:balance]`}
              >
                Perks &amp; Prizes
              </h2>
              <p
                className={`${BODY} ${SZ.subtitle} uppercase tracking-widest text-[#c5ecf8] [text-shadow:2px_2px_0_#1f1f1f] [text-wrap:balance]`}
              >
                HackFusion 4 — what awaits your squad
              </p>
            </div>
          </Reveal>

          {/* Prize pool */}
          <Reveal delay={80}>
            <ParchmentCard className={`text-[#2b1608] ${PAD_MAIN}`}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 inline-flex max-w-full items-center gap-2 border-2 border-[#5c371a] bg-[#2d1b0f] px-3 py-1 shadow-[inset_1px_1px_0_rgba(255,240,200,0.2),0_2px_6px_rgba(0,0,0,0.35)] sm:px-4">
                  <img src={diamondIcon} alt="" className={`h-5 w-5 shrink-0 ${ICON_IMG}`} />
                  <span
                    className={`${PIXEL} ${SZ.chip} uppercase tracking-widest text-[#55ffff] [text-shadow:2px_2px_0_#093f38]`}
                  >
                    Prize pool
                  </span>
                </div>

                <CountUp
                  from={0}
                  to={230000}
                  mode="count"
                  easing="expo"
                  format="standard"
                  separator=","
                  prefix=""
                  suffix=" Rs"
                  direction="up"
                  duration={2.5}
                  delay={0}
                  trigger="view"
                  className="count-up-text text-amber-900 font-['Press_Start_2P'] text-2xl md:text-5xl mt-4"
                  style={{}}
                />

                {/* <div
                  className={`${BODY} ${SZ.label} mb-4 font-bold uppercase tracking-[0.25em] text-[#5c371a] [text-shadow:1px_1px_0_rgba(255,245,215,0.85)] sm:mb-5`}
                >
                  Total awards
                </div> */}

                {/* <div
                  className={`grid w-full gap-3 border-t-2 border-[#8f5e30]/40 pt-4 sm:gap-4 sm:pt-5 ${GRID_SPECIAL}`}
                >
                  {SPECIAL_PRIZES.map((p) => (
                    <div key={p.alt} className={`flex items-center gap-3 p-3 text-left ${TILE}`}>
                      <img src={p.icon} alt={p.alt} className={`h-8 w-8 shrink-0 ${ICON_IMG}`} />
                      <p
                        className={`${BODY} ${SZ.special} min-w-0 flex-1 font-bold leading-tight text-[#2b1608] [text-wrap:pretty]`}
                      >
                        {p.text}
                        <span className="mt-0.5 block text-[#b45309]">{p.note}</span>
                      </p>
                    </div>
                  ))}
                </div> */}
              </div>
            </ParchmentCard>
          </Reveal>

          {/* Community + Hours */}
          <div className={`grid gap-4 sm:gap-5 ${GRID_INFO}`}>
            {INFO_CARDS.map((c) => (
              <Reveal key={c.title} from={c.from} delay={50} className="h-full">
                <ParchmentCard className={`flex flex-col justify-start text-[#2b1608] ${PAD_INFO}`}>
                  <div className="mb-3 flex items-start gap-2 border-b-2 border-[#8f5e30]/40 pb-3">
                    <img src={c.icon} alt={c.alt} className={`h-6 w-6 shrink-0 sm:h-7 sm:w-7 ${ICON_IMG}`} />
                    <h3
                      className={`${PIXEL} ${SZ.cardTitle} min-w-0 flex-1 break-words pt-1 uppercase leading-[1.6] tracking-wide [text-shadow:1px_1px_0_rgba(255,245,215,0.85)] ${c.titleColor}`}
                    >
                      {c.title}
                    </h3>
                  </div>
                  <p className={`${BODY} ${SZ.body} leading-snug text-black pl-4`}>
                    {c.text}
                  </p>
                </ParchmentCard>
              </Reveal>
            ))}
          </div>

          {/* Registration fee + perks */}
          <Reveal delay={80}>
            <div id="squad-pass" className="w-full">
              <ParchmentCard className={`text-[#2b1608] ${PAD_MAIN}`}>
                <div className="mb-5 flex flex-col items-center border-b-2 border-[#8f5e30]/40 pb-5 text-center">
                  <div className="mb-3 inline-flex max-w-full items-center gap-2 border-2 border-[#5c371a] bg-[#2d1b0f] px-3 py-1 shadow-[inset_1px_1px_0_rgba(255,240,200,0.2),0_2px_6px_rgba(0,0,0,0.35)] sm:px-4">
                    <img src={emeraldIcon} alt="" className={`h-5 w-5 shrink-0 ${ICON_IMG}`} />
                    <span
                      className={`${PIXEL} ${SZ.chip} uppercase tracking-widest text-[#55ff55] [text-shadow:2px_2px_0_#0a3d12]`}
                    >
                      Registration fee
                    </span>
                  </div>

                  <CountUp
                  from={2000}
                  to={749}
                  mode="count"
                  easing="expo"
                  format="standard"
                  separator=","
                  prefix=""
                  suffix="/- Rs"
                  direction="up"
                  duration={2.5}
                  delay={0}
                  trigger="view"
                  className="count-up-text text-amber-900 font-['Press_Start_2P'] text-3xl md:text-5xl mt-4"
                  style={{}}
                />
                  <div
                    className={`${BODY} ${SZ.label} mt-2 uppercase tracking-widest text-[#5c371a] [text-shadow:1px_1px_0_rgba(255,245,215,0.85)] [text-wrap:balance]`}
                  >
                    [ 100% refundable ]
                  </div>
                </div>

                <div className={`grid gap-2.5 sm:gap-3.5 ${GRID_PERKS}`}>
                  {PERKS.map((perk, i) => (
                    <Reveal key={perk.title} delay={i * 30} className="h-full">
                      <div
                        className={`group flex h-full min-h-[4.75rem] cursor-default items-center gap-3 p-3 transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#b45309] hover:bg-[#edd29b] ${TILE}`}
                      >
                        <div
                          className={`h-11 w-11 shrink-0 transition-colors group-hover:border-[#d97706] sm:h-12 sm:w-12 ${ICON_BOX}`}
                        >
                          <img src={perk.icon} alt="" className={`h-6 w-6 sm:h-7 sm:w-7 ${ICON_IMG}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`${BODY} ${SZ.rarity} block font-bold uppercase leading-none tracking-wider`}
                            style={{ color: perk.color }}
                          >
                            {perk.rarity}
                          </span>
                          <h4
                            className={`${PIXEL} ${SZ.perkTitle} mt-1 break-words leading-[1.6] text-[#241306] transition-colors group-hover:text-[#b45309]`}
                          >
                            {perk.title}
                          </h4>
                          <p
                            className={`${BODY} ${SZ.perkDesc} mt-1 leading-tight text-[#523319] [text-wrap:pretty]`}
                          >
                            {perk.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </ParchmentCard>
            </div>
          </Reveal>
        </div>
      </section>
    </MotionConfig>
  );
}