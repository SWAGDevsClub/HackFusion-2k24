import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import gsap from "gsap"

// TODO: set your real event start date (ISO format, with timezone)
const EVENT_DATE = "2026-12-31T00:00:00+05:30"

const pad = (n) => String(n).padStart(2, "0")

function getTimeLeft(target) {
    const diff = Math.max(0, new Date(target).getTime() - Date.now())
    return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000) % 24,
        minutes: Math.floor(diff / 60000) % 60,
        seconds: Math.floor(diff / 1000) % 60,
        done: diff === 0,
    }
}

/* One rolling digit: old one slides out the bottom, new one drops in from the top */
function Digit({ value, accent }) {
    return (
        <span className="relative inline-block h-[1.25em] w-[1.05em] overflow-hidden text-center align-top">
            <AnimatePresence initial={false}>
                <motion.span
                    key={value}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ color: accent || "#fff" }}
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}

/* Inventory-slot style block */
function Slot({ value, label, accent }) {
    const text = pad(value)
    return (
        <div className="cd-slot flex flex-col items-center gap-3">
            <div className="mc-cd-slot">
                {text.split("").map((ch, i) => (
                    <Digit key={`${label}-${i}`} value={ch} accent={accent} />
                ))}
            </div>
            <span className="mc-cd-label">{label}</span>
        </div>
    )
}

function Colon() {
    return (
        <motion.span
            className="mc-cd-colon"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
            :
        </motion.span>
    )
}

export default function Countdown({ targetDate = EVENT_DATE }) {
    const [time, setTime] = useState(() => getTimeLeft(targetDate))
    const root = useRef(null)

    useEffect(() => {
        const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000)
        return () => clearInterval(id)
    }, [targetDate])

    // GSAP entrance: slots pop in one after another
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".cd-slot", {
                y: 50,
                opacity: 0,
                scale: 0.7,
                duration: 0.7,
                ease: "back.out(1.9)",
                stagger: 0.12,
                delay: 0.5,
            })
        }, root)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={root} className="flex flex-col items-center">
            <style>{`
                .mc-cd-slot {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 22px;
                    line-height: 1;
                    padding: 14px 12px;
                    display: flex;
                    background:
                        repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 4px, transparent 4px 8px),
                        #2b2b2b;
                    border: 4px solid;
                    border-color: #111 #7a7a7a #7a7a7a #111;
                    box-shadow: 0 8px 0 rgba(0,0,0,.45), 0 0 24px rgba(0,0,0,.4);
                    text-shadow: 3px 3px 0 #000;
                }
                .mc-cd-label {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 9px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    color: #e8e8e8;
                    text-shadow: 2px 2px 0 #000;
                }
                .mc-cd-colon {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 20px;
                    color: #fff;
                    text-shadow: 3px 3px 0 #000;
                    padding-top: 16px;
                }
                @media (min-width: 640px) {
                    .mc-cd-slot { font-size: 36px; padding: 20px 18px; }
                    .mc-cd-label { font-size: 11px; }
                    .mc-cd-colon { font-size: 32px; padding-top: 26px; }
                }
                @media (min-width: 1024px) {
                    .mc-cd-slot { font-size: 44px; }
                }
            `}</style>

            {time.done ? (
                <p className="mc-cd-label !text-base sm:!text-xl">The game has begun!</p>
            ) : (
                <div className="flex items-start justify-center scale-75 sm:scale-100 gap-1.5 sm:gap-4">
                    <Slot value={time.days} label="Days" />
                    <Colon />
                    <Slot value={time.hours} label="Hours" />
                    <Colon />
                    <Slot value={time.minutes} label="Min" />
                    <Colon />
                    <Slot value={time.seconds} label="Sec" accent="#7cfc00" />
                </div>
            )}
        </div>
    )
}