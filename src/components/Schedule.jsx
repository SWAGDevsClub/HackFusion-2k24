import { useCallback, useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react"; // if you installed framer-motion instead: "framer-motion"
import bg from "../assets/schedulebg.jpg"

/* ------------------------------------------------------------------ */
/*  DEMO CONTENT — edit this array, nothing else needs to change       */
/* ------------------------------------------------------------------ */
const CHECKPOINTS = [
    {
        title: "Registrations",
        date: "01 Nov – 15 Nov",
        icon: "📜",
        blurb: "Register your team and claim your spot in the mine.",
        time: "Online · All day",
        details: [
            "Teams of 2 to 4 members",
            "Fill the form on the Register page",
            "Confirmation mail within 24 hours",
        ],
    },
    {
        title: "Idea Submission",
        date: "16 Nov – 25 Nov",
        icon: "🔦",
        blurb: "Submit your idea and the problem it solves.",
        time: "Deadline · 11:59 PM",
        details: [
            "One PDF, max 5 slides",
            "Pick a track: Web, AI, Hardware or Open",
            "Late submissions are not accepted",
        ],
    },
    {
        title: "Idea Evaluation",
        date: "26 Nov – 30 Nov",
        icon: "⚖️",
        blurb: "Our panel reviews every idea and picks the finalists.",
        time: "Results · 30 Nov, 6:00 PM",
        details: [
            "Scored on impact, feasibility and originality",
            "Shortlisted teams get an email",
            "Feedback shared with all teams",
        ],
    },
    {
        title: "Hacking Begins",
        date: "12 Dec · 10:00 AM",
        icon: "⛏️",
        blurb: "24 hours on campus. Build, break, ship.",
        time: "Main Auditorium",
        details: [
            "Mentors available all night",
            "Food and refreshments provided",
            "Mid-way check-in at 10:00 PM",
        ],
    },
    {
        title: "Demo & Results",
        date: "13 Dec · 10:00 AM",
        icon: "💎",
        blurb: "Pitch to the judges and find out who wins.",
        time: "5 min pitch + 3 min Q&A",
        details: [
            "Live demo in front of the judges",
            "Prize distribution at 4:00 PM",
            "Certificates for every participant",
        ],
    },
];

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */
const STEEL = "#8b8f99";
const WOOD = "#5a3a1e";
const GOLD = "#f5c542";
const GOLD_WOOD = "#b9852e";

// two steel rails + wooden sleepers, drawn with CSS only (no image assets)
const railBg = (steel, wood) =>
    `linear-gradient(90deg, transparent 0 3px, ${steel} 3px 6px, transparent 6px 22px, ${steel} 22px 25px, transparent 25px),
   repeating-linear-gradient(180deg, ${wood} 0 5px, transparent 5px 18px)`;

const EMBERS = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 37 + 7) % 100}%`,
    delay: (i * 0.9) % 7,
    duration: 7 + (i % 5) * 2,
    size: 2 + (i % 3),
}));

function Minecart() {
    return (
        <svg width="40" height="34" viewBox="0 0 32 28" aria-hidden="true">
            <rect x="9" y="1" width="5" height="4" fill={GOLD} stroke="#2a1a0a" strokeWidth="1.5" />
            <rect x="16" y="2" width="4" height="3" fill="#7dd3fc" stroke="#2a1a0a" strokeWidth="1.5" />
            <path d="M3 6h26l-3 14H6z" fill="#6b4a2b" stroke="#2a1a0a" strokeWidth="2" />
            <rect x="2" y="5" width="28" height="4" fill={STEEL} stroke="#2a1a0a" strokeWidth="2" />
            <circle cx="9" cy="23" r="3.5" fill="#3b3b44" stroke="#2a1a0a" strokeWidth="2" />
            <circle cx="23" cy="23" r="3.5" fill="#3b3b44" stroke="#2a1a0a" strokeWidth="2" />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/*  Checkpoint row (card + junction box)                               */
/* ------------------------------------------------------------------ */
function Checkpoint({ data, index, reached, current, open, onToggle, rowRef }) {
    const onLeft = index % 2 === 0;
    const unlocked = reached > index;

    return (
        <li
            ref={rowRef}
            className="relative py-6 pl-[72px] md:grid md:grid-cols-2 md:py-10 md:pl-0"
        >
            {/* card */}
            <div
                className={`${onLeft ? "md:col-start-1 md:pr-14" : "md:col-start-2 md:pl-14"
                    }`}
            >
                <button
                    type="button"
                    onClick={onToggle}
                    aria-expanded={open}
                    className={`group w-full border-2 bg-[#e8d6a2] text-left text-[#2a1a0a] transition-[filter,opacity,box-shadow] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5c542] ${current
                        ? "border-[#f5c542] shadow-[0_0_0_2px_#2a1a0a,6px_6px_0_#2a1a0a,0_0_28px_rgba(245,197,66,0.35)]"
                        : "border-[#5a3a1e] shadow-[0_0_0_2px_#2a1a0a,5px_5px_0_#2a1a0a]"
                        } ${unlocked ? "opacity-100" : "opacity-60 saturate-50"}`}
                >
                    {/* header strip */}
                    <div className="flex items-center justify-between gap-3 border-b-2 border-[#5a3a1e] bg-[#c9ad6a] px-3 py-2">
                        <span className="font-['Press_Start_2P'] text-[8px] leading-4 sm:text-[9px]">
                            {data.date}
                        </span>
                        <span
                            className={`font-['Press_Start_2P'] text-[7px] ${unlocked ? "text-[#2f6b2f]" : "text-[#7a2d1f]"
                                }`}
                        >
                            {unlocked ? "UNLOCKED" : "LOCKED"}
                        </span>
                    </div>

                    {/* body */}
                    <div className="flex gap-3 p-3 sm:p-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center border-2 border-[#2a1a0a] bg-[#7a2d1f] text-xl">
                            {data.icon}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-['Press_Start_2P'] text-[11px] leading-5 sm:text-xs">
                                {data.title}
                            </h3>
                            <p className="mt-2 text-sm leading-snug text-[#4a3520]">{data.blurb}</p>
                        </div>
                    </div>

                    {/* expandable details */}
                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.div
                                key="details"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28, ease: "easeOut" }}
                                className="overflow-hidden"
                            >
                                <div className="border-t-2 border-dashed border-[#5a3a1e] px-4 py-3">
                                    <p className="font-['Press_Start_2P'] text-[8px] leading-4 text-[#7a2d1f]">
                                        {data.time}
                                    </p>
                                    <ul className="mt-3 space-y-1.5 text-sm text-[#2a1a0a]">
                                        {data.details.map((d) => (
                                            <li key={d} className="flex gap-2">
                                                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-[#7a2d1f]" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="border-t-2 border-[#5a3a1e]/40 px-3 py-1.5 text-right font-['Press_Start_2P'] text-[7px] text-[#7a5a30]">
                        {open ? "TAP TO CLOSE" : "TAP FOR INFO"}
                    </div>
                </button>
            </div>

            {/* junction box sitting on the rail */}
            <div className="absolute left-7 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
                {unlocked && (
                    <motion.span
                        aria-hidden="true"
                        className="absolute -inset-5 rounded-full bg-[radial-gradient(circle,rgba(245,197,66,0.55),transparent_70%)]"
                        animate={{ opacity: [0.5, 1, 0.6, 0.95, 0.5] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                )}
                <div
                    className={`relative grid h-11 w-11 place-items-center border-2 font-['Press_Start_2P'] text-[10px] shadow-[3px_3px_0_#000] transition-colors duration-500 ${unlocked
                        ? "border-[#2a1a0a] bg-[#f5c542] text-[#2a1a0a]"
                        : "border-[#14100c] bg-[#4b4f5a] text-[#a3a7b3]"
                        }`}
                >
                    {String(index + 1).padStart(2, "0")}
                </div>
            </div>
        </li>
    );
}

/* ------------------------------------------------------------------ */
/*  Schedule section                                                   */
/* ------------------------------------------------------------------ */
export default function Schedule() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const rowRefs = useRef([]);
    const marks = useRef(CHECKPOINTS.map(() => 2)); // fraction of track height per checkpoint
    const prevReached = useRef(0);

    const [reached, setReached] = useState(0);
    const [open, setOpen] = useState(null);
    const [toast, setToast] = useState(null);

    // progress 0 -> 1 as the track passes a line at 65% of the viewport.
    // Works with Lenis because Lenis drives the real window scroll.
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start 65%", "end 65%"],
    });
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

    const litClip = useTransform(progress, (v) => `inset(0 0 ${(1 - v) * 100}% 0)`);
    const cartTop = useTransform(progress, (v) => `${v * 100}%`);
    const xpScale = useTransform(progress, [0, 1], [0, 1]);

    const update = useCallback((v) => {
        setReached(marks.current.filter((m) => m <= v).length);
    }, []);
    useMotionValueEvent(progress, "change", update);

    // measure where each checkpoint sits along the rail (re-runs when a card expands)
    useEffect(() => {
        const measure = () => {
            const track = trackRef.current;
            if (!track) return;
            const t = track.getBoundingClientRect();
            marks.current = rowRefs.current.map((row) => {
                const b = row.getBoundingClientRect();
                return (b.top + b.height / 2 - t.top) / t.height;
            });
            update(progress.get());
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(trackRef.current);
        return () => ro.disconnect();
    }, [progress, update]);

    // "checkpoint reached" toast
    useEffect(() => {
        if (reached > prevReached.current && reached > 0) {
            setToast(CHECKPOINTS[reached - 1]);
            const id = setTimeout(() => setToast(null), 2600);
            prevReached.current = reached;
            return () => clearTimeout(id);
        }
        prevReached.current = reached;
    }, [reached]);

    const backToBase = () => {
        const el = sectionRef.current;
        if (!el) return;
        // use Lenis if you expose it on window, otherwise native smooth scroll
        if (window.lenis?.scrollTo) window.lenis.scrollTo(el, { offset: -20 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            id="schedule"
            ref={sectionRef}
            className="relative overflow-clip bg-[#0b0806] px-4 pb-6 pt-24 text-white sm:px-8"
        >
            {/* cave backdrop: pinned, screen-sized image that stays until the section ends */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <img
                        src={bg}
                        alt=""
                        draggable={false}
                        className="h-full w-full object-cover object-center"
                    />
                    {/* dark overlay so the rail and cards stay readable */}
                    <div className="absolute inset-0 bg-[#0b0806]/70" />
                    {/* lantern glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(122,45,31,0.35),transparent_60%),radial-gradient(ellipse_at_20%_60%,rgba(245,197,66,0.08),transparent_50%),radial-gradient(ellipse_at_85%_85%,rgba(245,197,66,0.08),transparent_45%)]" />
                </div>
                {/* fade the top and bottom edges into the neighbouring sections */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b0806] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0806] to-transparent" />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                {EMBERS.map((e, i) => (
                    <motion.span
                        key={i}
                        className="absolute bg-[#f5c542]"
                        style={{ left: e.left, width: e.size, height: e.size }}
                        initial={{ top: "100%", opacity: 0 }}
                        animate={{ top: "0%", opacity: [0, 0.8, 0] }}
                        transition={{ duration: e.duration, delay: e.delay, repeat: Infinity, ease: "linear" }}
                    />
                ))}
            </div>

            {/* heading */}
            <div className="relative mx-auto max-w-5xl text-center">
                <h2 className="font-['Press_Start_2P'] text-2xl leading-snug text-[#f5c542] [text-shadow:4px_4px_0_#2a1a0a] sm:text-4xl">
                    Schedule
                </h2>
                <p className="mx-auto mt-5 max-w-md text-sm text-[#d8c79a] sm:text-base">
                    Ride the rail down the mine. Five checkpoints stand between you and the grand prize.
                </p>
            </div>

            {/* rail + checkpoints */}
            <div className="relative mx-auto mt-12 max-w-5xl">
                <div ref={trackRef} className="relative py-10">
                    {/* rail */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-y-0 left-[14px] w-7 md:left-1/2 md:-translate-x-1/2"
                    >
                        <div className="absolute inset-0 opacity-90" style={{ background: railBg("#4d505a", "#2c1d10") }} />
                        <motion.div
                            className="absolute inset-0 drop-shadow-[0_0_6px_rgba(245,197,66,0.55)]"
                            style={{ background: railBg(GOLD, GOLD_WOOD), clipPath: litClip }}
                        />
                        <motion.div className="absolute left-1/2 z-20" style={{ top: cartTop }}>
                            <div className="-translate-x-1/2 -translate-y-1/2">
                                <Minecart />
                            </div>
                        </motion.div>
                    </div>

                    <ol className="relative">
                        {CHECKPOINTS.map((c, i) => (
                            <Checkpoint
                                key={c.title}
                                data={c}
                                index={i}
                                reached={reached}
                                current={reached === i + 1}
                                open={open === i}
                                onToggle={() => setOpen(open === i ? null : i)}
                                rowRef={(el) => (rowRefs.current[i] = el)}
                            />
                        ))}
                    </ol>
                </div>
            </div>

            {/* HUD (sticks to the bottom while the section is on screen) */}
            <div className="sticky bottom-3 z-30 mx-auto mt-10 max-w-5xl">
                <AnimatePresence>
                    {toast && (
                        <motion.div
                            key={toast.title}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            className="absolute bottom-full right-0 mb-3 flex items-center gap-3 border-2 border-[#2a1a0a] bg-[#1b1510] px-3 py-2 shadow-[4px_4px_0_#000]"
                            role="status"
                        >
                            <span className="text-xl">{toast.icon}</span>
                            <div>
                                <p className="font-['Press_Start_2P'] text-[8px] leading-4 text-[#f5c542]">
                                    Checkpoint reached
                                </p>
                                <p className="mt-1 text-xs text-[#d8c79a]">{toast.title} · +200 XP</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* <div className="flex items-center gap-3 border-2 border-[#5a3a1e] bg-[#e8d6a2] px-3 py-2 text-[#2a1a0a] shadow-[0_0_0_2px_#2a1a0a,4px_4px_0_#2a1a0a] sm:gap-4 sm:px-4">
                    <span className="font-['Press_Start_2P'] text-[9px] sm:text-[10px]">
                        LVL {Math.max(1, reached)}
                    </span>
                    <div className="h-3 flex-1 border-2 border-[#2a1a0a] bg-[#c9ad6a]">
                        <motion.div className="h-full origin-left bg-[#c2410c]" style={{ scaleX: xpScale }} />
                    </div>
                    <span className="hidden font-['Press_Start_2P'] text-[8px] sm:inline">
                        {reached * 200} / {CHECKPOINTS.length * 200} XP
                    </span>
                    <button
                        type="button"
                        onClick={backToBase}
                        className="border-2 border-[#2a1a0a] bg-[#f5c542] px-2 py-1.5 font-['Press_Start_2P'] text-[8px] shadow-[2px_2px_0_#2a1a0a] transition-transform active:translate-x-[1px] active:translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a1a0a]"
                    >
                        Back to base
                    </button>
                </div> */}
            </div>
        </section>
    );
}