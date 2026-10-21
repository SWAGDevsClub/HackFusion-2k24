import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Link, useLocation } from "react-router-dom"
import chainSignA from "../assets/pageassets-clean/nav-sign-chain-a.webp"
import chainSignB from "../assets/pageassets-clean/nav-sign-chain-b.webp"
import woodPlank from "../assets/pageassets-clean/plank-panel-wood-spare.webp"

const MotionLink = motion.create(Link)
const SIGN_IMAGES = [chainSignA, chainSignB]

// change these paths to match your routes
const LEFT_LINKS = [
    { label: "Home", to: "/" },
    { label: "Schedule", to: "/schedule" },
    { label: "Sponsors", to: "/sponsors" },
]

const RIGHT_LINKS = [
    { label: "Problem Statement", to: "/problem-statement" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
]

const MOBILE_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]

// hide the desktop nav once the Info section's top edge is within this many px of the viewport top
// (roughly the height of the hanging signs; raise it to hide earlier, lower it to hide later)
const NAV_HEIGHT = 110

// lives at module level so it survives Navbar remounts / route changes,
// but resets on a full page load (i.e. when the user enters the site)
let introPlayed = false

/* A single wooden sign hanging from two chains. Renders a link when `to` is given, otherwise a button. */
function HangingSign({ to, index, children, square = false, onClick, label, expanded, skipIntro }) {
    const Tag = to ? MotionLink : motion.button
    const tagProps = to ? { to } : { type: "button", onClick, "aria-label": label, "aria-expanded": expanded }

    return (
        <motion.div
            className="pointer-events-auto"
            initial={skipIntro ? false : { y: -180, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 9,
                delay: 0.12 * index,
            }}
        >
            <Tag
                {...tagProps}
                className="group block cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 600, damping: 14 }}
            >
                <div
                    className={`relative aspect-[1.406] transition-[filter] duration-150 sm:group-hover:brightness-125 sm:group-hover:drop-shadow-[0_6px_0_rgba(0,0,0,0.35)] ${square ? "w-[5rem] sm:w-[4.5rem]" : "w-[clamp(4.5rem,11vw,9rem)]"
                        }`}
                >
                    <img
                        src={SIGN_IMAGES[index % SIGN_IMAGES.length]}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-fill"
                    />
                    <span
                        className={`absolute inset-x-[8%] flex items-center justify-center text-center font-['Press_Start_2P',monospace] text-[7px] uppercase leading-tight tracking-[0.5px] text-black [text-shadow:1px_1px_0_rgba(255,255,255,0.3)] sm:text-[10px] ${square
                                ? "top-[58%] bottom-[6%]"
                                : "top-[61%] bottom-[8%] sm:group-hover:animate-[sign-bob_0.5s_ease-in-out_infinite]"
                            }`}
                    >
                        {children}
                    </span>
                </div>
            </Tag>
        </motion.div>
    )
}

/* Small pixel grass block used as the centre "logo" sign */
function GrassBlock() {
    return (
        <span
            aria-label="Home"
            className="block h-5 w-5 shrink-0 border-[3px] border-[#2a1808] bg-[#7b5230] [image-rendering:pixelated] [background-image:linear-gradient(#63b23b_0_34%,#3f7d24_34%_42%,transparent_42%),repeating-linear-gradient(90deg,rgba(0,0,0,0.15)_0_4px,transparent_4px_8px)] sm:h-[34px] sm:w-[34px]"
        />
    )
}

/* Three chunky pixel bars that morph into an X when the menu is open (16px tall so it fits the plank) */
function BurgerIcon({ open }) {
    return (
        <span className="relative block h-4 w-5 shrink-0">
            <motion.span
                className="absolute left-0 top-0 block h-1 w-5 bg-[#2a1808] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)]"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <motion.span
                className="absolute left-0 top-[6px] block h-1 w-5 bg-[#2a1808] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)]"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
            />
            <motion.span
                className="absolute left-0 top-[12px] block h-1 w-5 bg-[#2a1808] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)]"
                animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </span>
    )
}

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()
    const [pastHero, setPastHero] = useState(false)
    const [hovered, setHovered] = useState(false)
    const leaveTimer = useRef(null)

    // true if the intro already played earlier in this session
    const [skipIntro] = useState(() => introPlayed)
    useEffect(() => {
        introPlayed = true
    }, [])

    // The hero stays pinned while Info slides over it, so "is the hero visible?" never turns false
    // at the right time. Instead, hide the desktop nav as soon as the top edge of the Info section
    // (the element with id="info") reaches the navbar area.
    useEffect(() => {
        setPastHero(false)
        const info = document.getElementById("info")
        if (!info) return // no Info section on this page -> navbar stays visible

        let raf = 0
        const check = () => {
            raf = 0
            setPastHero(info.getBoundingClientRect().top <= NAV_HEIGHT)
        }
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(check)
        }

        check()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [pathname])

    useEffect(() => () => clearTimeout(leaveTimer.current), [])

    // small delay on leave so the nav doesn't flicker if the cursor slips off
    const showNav = () => {
        clearTimeout(leaveTimer.current)
        setHovered(true)
    }
    const hideNav = () => {
        leaveTimer.current = setTimeout(() => setHovered(false), 200)
    }

    const desktopVisible = !pastHero || hovered

    // close mobile menu on Escape
    useEffect(() => {
        if (!open) return
        const onKey = (e) => e.key === "Escape" && setOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open])

    return (
        <>
            {/* label bob keyframes used by the desktop hover effect */}
            <style>{`@keyframes sign-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }`}</style>

            {/* desktop / tablet nav: shown in the hero, otherwise only on hover */}
            <div
                className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden sm:block"
                onMouseEnter={showNav}
                onMouseLeave={hideNav}
                onFocus={showNav}
                onBlur={hideNav}
            >
                {/* invisible hover strip at the very top of the screen */}
                <div className="pointer-events-auto absolute inset-x-0 top-0 h-20" />

                <motion.nav
                    className="pointer-events-none flex items-start justify-center gap-1 sm:gap-2 lg:gap-6"
                    animate={{ y: desktopVisible ? 0 : "-120%" }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                >
                    {LEFT_LINKS.map((l, i) => (
                        <HangingSign key={l.label} to={l.to} index={i} skipIntro={skipIntro}>
                            {l.label}
                        </HangingSign>
                    ))}

                    <HangingSign to="/" index={2} square skipIntro={skipIntro}>
                        <GrassBlock />
                    </HangingSign>

                    {RIGHT_LINKS.map((l, i) => (
                        <HangingSign key={l.label} to={l.to} index={i + 3} skipIntro={skipIntro}>
                            {l.label}
                        </HangingSign>
                    ))}
                </motion.nav>
            </div>

            {/* mobile nav: home sign on the left, hamburger sign on the right (always visible) */}
            <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-3 sm:hidden">
                <HangingSign to="/" index={0} square skipIntro={skipIntro}>
                    <GrassBlock />
                </HangingSign>

                <HangingSign
                    index={1}
                    square
                    skipIntro={skipIntro}
                    onClick={() => setOpen((v) => !v)}
                    label={open ? "Close menu" : "Open menu"}
                    expanded={open}
                >
                    <BurgerIcon open={open} />
                </HangingSign>
            </nav>

            {/* mobile menu */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* dim backdrop, tap to close */}
                        <motion.div
                            key="backdrop"
                            className="fixed inset-0 z-40 bg-black/50 sm:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setOpen(false)}
                        />

                        {/* board hanging from chains */}
                        <motion.div
                            key="panel"
                            className="fixed right-3 top-[78px] z-50 w-[min(14rem,calc(100vw-1.5rem))] sm:hidden"
                            style={{ transformOrigin: "100% 0%" }}
                            initial={{ opacity: 0, y: -24, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -24, scale: 0.92 }}
                            transition={{ type: "spring", stiffness: 220, damping: 16 }}
                        >
                            <div className="relative p-5">
                                <img
                                    src={woodPlank}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 h-full w-full object-fill"
                                />
                                <div className="relative z-10">
                                    <p className="mb-3 mt-1 text-center font-['Press_Start_2P',monospace] text-[9px] uppercase leading-none tracking-[0.5px] text-[#2a1808] [text-shadow:2px_2px_0_rgba(255,255,255,0.2)]">
                                        Menu
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        {MOBILE_LINKS.map((l, i) => (
                                            <MotionLink
                                                key={l.label}
                                                to={l.to}
                                                onClick={() => setOpen(false)}
                                                className="block w-full cursor-pointer border-4 border-black bg-[#7d7d7d] px-4 py-3 text-center font-['Press_Start_2P',monospace] text-[10px] uppercase leading-snug text-white [text-shadow:2px_2px_0_rgba(0,0,0,0.55)] shadow-[inset_4px_4px_0_rgba(255,255,255,0.38),inset_-4px_-4px_0_rgba(0,0,0,0.38),0_4px_0_rgba(0,0,0,0.4)] transition-[filter] duration-150 ease-in-out hover:brightness-[1.2] active:brightness-[1.2]"
                                                initial={{ opacity: 0, x: 24 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                                                whileTap={{ scale: 0.96 }}
                                            >
                                                {l.label}
                                            </MotionLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}