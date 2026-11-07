import { useCallback, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"
import firstFrame from "../assets/HeroFrames/frames3/frame_001.webp"
import Logo from "../assets/logo.png"
import Countdown from "../components/Countdown"
import ScrollFrames from "./ScrollFrames"

const REGISTRATION_OPEN = true
const REGISTER_PATH = "/register"
const PROBLEM_STATEMENT_PATH = "/problem-statement"
const LOGIN_PATH = "/login"

// The frame by which the hero section content is completely zoomed out.
const ZOOM_OUT_FRAME = 80
const MAX_SCALE = 6.5
const MOBILE_MAX_SCALE = 2.5

const mcBtn = [
    "group relative w-full overflow-hidden border-4 border-black bg-[var(--bg)] text-center uppercase text-white",
    "px-[22px] py-[14px] text-[10px] sm:px-7 sm:py-4 sm:text-[13px]",
    "font-['Press_Start_2P',monospace]",
    "[text-shadow:2px_2px_0_rgba(0,0,0,0.55)]",
    "shadow-[inset_4px_4px_0_rgba(255,255,255,0.38),inset_-4px_-4px_0_rgba(0,0,0,0.38),0_6px_0_rgba(0,0,0,0.4)]",
    "transition-[filter] duration-150 ease-in-out hover:brightness-[1.2]",
].join(" ")

// Local keyframes for the pixel-style hover effects
const hoverStyles = `
@keyframes mc-nudge-right {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(4px); }
}
@keyframes mc-nudge-left {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-4px); }
}
@keyframes mc-twinkle {
    0%, 100% { opacity: 0; transform: scale(0.4); }
    50% { opacity: 1; transform: scale(1); }
}
`

/**
 * Inner content shared by the link / disabled variants.
 * On hover (via the parent `group`):
 *  - a light "shine" sweeps diagonally across the button
 *  - pixel arrows slide in on both sides and nudge back and forth
 *  - the label slides up and a short detail line slides in
 *  - pixel sparkles twinkle in the corners
 *  - a thin pixel progress bar fills along the bottom edge
 */
function McButtonInner({ children, hint, icon }) {
    return (
        <>
            {/* Shine sweep */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] -skew-x-[20deg] bg-white/35 transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
            />

            {/* Pixel arrows */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 -translate-x-3 text-[10px] text-yellow-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:left-3 sm:text-xs"
            >
                <span className="inline-block group-hover:[animation:mc-nudge-right_0.7s_steps(4)_infinite]">
                    ▶
                </span>
            </span>
            <span
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 translate-x-3 text-[10px] text-yellow-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:right-3 sm:text-xs"
            >
                <span className="inline-block group-hover:[animation:mc-nudge-left_0.7s_steps(4)_infinite]">
                    ◀
                </span>
            </span>

            {/* Corner sparkles */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1 top-1 h-1.5 w-1.5 bg-white opacity-0 group-hover:[animation:mc-twinkle_0.9s_steps(3)_infinite]"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute right-1 top-1 h-1.5 w-1.5 bg-yellow-200 opacity-0 group-hover:[animation:mc-twinkle_0.9s_steps(3)_0.3s_infinite]"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1 left-1 h-1.5 w-1.5 bg-yellow-200 opacity-0 group-hover:[animation:mc-twinkle_0.9s_steps(3)_0.6s_infinite]"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1 right-1 h-1.5 w-1.5 bg-white opacity-0 group-hover:[animation:mc-twinkle_0.9s_steps(3)_0.15s_infinite]"
            />

            {/* Label + detail line (swap on hover, no layout shift) */}
            <span className="relative block px-4 sm:px-5">
                <span className="block transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                    {icon && <span className="mr-2">{icon}</span>}
                    {children}
                </span>
                {hint && (
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 flex translate-y-full items-center justify-center text-[8px] leading-snug text-yellow-200 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:text-[10px]"
                    >
                        {hint}
                    </span>
                )}
            </span>

            {/* Bottom progress bar */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-yellow-300 transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
        </>
    )
}

function McButton({ to, children, color = "#7d7d7d", disabled = false, delay = 0, hint, icon }) {
    const motionProps = {
        className: "w-full",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: disabled ? 0.65 : 1, y: 0 },
        transition: { duration: 0.5 },
        whileHover: disabled ? undefined : {  },
        whileTap: disabled ? undefined : { scale: 0.96, y: 2 },
    }

    // a disabled button is not a link at all
    if (disabled) {
        return (
            <motion.div {...motionProps}>
                <span
                    aria-disabled="true"
                    className={`${mcBtn.replace("group ", "")} cursor-not-allowed block`}
                    style={{ "--bg": color }}
                >
                    {children}
                </span>
            </motion.div>
        )
    }

    return (
        <motion.div {...motionProps}>
            <Link
                to={to}
                aria-label={hint ? `${children} - ${hint}` : undefined}
                className={`${mcBtn} cursor-pointer block`}
                style={{ "--bg": color }}
            >
                <McButtonInner hint={hint} icon={icon}>
                    {children}
                </McButtonInner>
            </Link>
        </motion.div>
    )
}

export default function HeroSection() {
    const zoomContainerRef = useRef(null)
    const problemBtnRef = useRef(null)
    const loginBtnRef = useRef(null)
    const hallTextRef = useRef(null)
    const originRef = useRef({ x: 50, y: 54 })
    const currentFrameRef = useRef(0)

    // Dynamically calculate the transform-origin exactly between
    // the "View Problem Statement" and "Login" buttons.
    // Guarded to only measure when unscaled to prevent reflow and distortion.
    const updateOrigin = useCallback(() => {
        if (!zoomContainerRef.current || !problemBtnRef.current || !loginBtnRef.current) return
        if (currentFrameRef.current > 0.5) return

        const pRect = problemBtnRef.current.getBoundingClientRect()
        const lRect = loginBtnRef.current.getBoundingClientRect()
        const containerRect = zoomContainerRef.current.getBoundingClientRect()

        if (containerRect.width > 0 && containerRect.height > 0) {
            const midpointX = (pRect.left + pRect.right) / 2
            const midpointY = (pRect.bottom + lRect.top) / 2

            const originX = ((midpointX - containerRect.left) / containerRect.width) * 100
            const originY = ((midpointY - containerRect.top) / containerRect.height) * 100

            if (Number.isFinite(originX) && Number.isFinite(originY)) {
                originRef.current = { x: originX, y: originY }
                zoomContainerRef.current.style.transformOrigin = `${originX.toFixed(2)}% ${originY.toFixed(2)}%`
            }
        }
    }, [])

    // Directly update DOM transform and opacity in the RAF tick for 60/120fps smooth animation
    const handleProgress = useCallback(({ frame }) => {
        currentFrameRef.current = frame

        // ----------------------------------------------------
        // 1. Initial Hero UI Zoom-Out (Frames 0 to 80)
        // ----------------------------------------------------
        const container = zoomContainerRef.current
        if (container) {
            const isMobile = window.innerWidth < 768
            const maxScale = isMobile ? MOBILE_MAX_SCALE : MAX_SCALE

            if (frame <= 0.5) {
                container.style.transform = ""
                container.style.opacity = ""
                container.style.visibility = ""
                container.style.pointerEvents = ""
            } else {
                const pZoom = Math.min(frame / ZOOM_OUT_FRAME, 1)

                if (pZoom >= 1) {
                    container.style.opacity = "0"
                    container.style.visibility = "hidden"
                    container.style.pointerEvents = "none"
                    container.style.transform = `scale3d(${maxScale}, ${maxScale}, 1)`
                } else {

                    // Visibility and pointerEvents are handled dynamically based on opacity below

                    const scale = 1 + Math.pow(pZoom, 2.2) * (maxScale - 1)

                    let opacity = 1
                    if (pZoom > 0.45) {
                        const fadeT = (pZoom - 0.45) / 0.55
                        opacity = Math.max(0, 1 - Math.pow(fadeT, 1.4))
                    }

                    // Keep hero buttons clickable throughout zoom until the content disappears
                    if (opacity <= 0.02) {
                        container.style.opacity = "0"
                        container.style.visibility = "hidden"
                        container.style.pointerEvents = "none"
                    } else {
    
                        container.style.visibility = "visible"
                        container.style.pointerEvents = "auto"
                        container.style.opacity = opacity.toFixed(3)
                    }
                    // Hardware accelerated 3D transform to keep on GPU composite layer
                    container.style.transform = `scale3d(${scale.toFixed(3)}, ${scale.toFixed(3)}, 1) translateZ(0)`
                }
            }
        }

        // ----------------------------------------------------
        // 2. Grand Hall Tagline: "CODE. COMPETE. CONQUER."
        // Appears stationary in screen center when camera passes through the doors
        // ----------------------------------------------------
        const hallEl = hallTextRef.current
        if (hallEl) {
            if (frame < 115) {
                hallEl.style.opacity = "0"
                hallEl.style.visibility = "hidden"
            } else {
                hallEl.style.visibility = "visible"

                // Fade in smoothly as camera passes past the doors (frame 115 to 126)
                const fadeIn = Math.min(Math.max((frame - 115) / 11, 0), 1)
                hallEl.style.opacity = fadeIn.toFixed(3)
            }
        }
    }, [])

    useEffect(() => {
        // Measure after initial button entrance transition has completed
        const timer = setTimeout(updateOrigin, 800)
        const onResize = () => {
            if (currentFrameRef.current <= 0.5) {
                updateOrigin()
            }
            handleProgress({ frame: currentFrameRef.current })
        }
        window.addEventListener("resize", onResize)
        return () => {
            clearTimeout(timer)
            window.removeEventListener("resize", onResize)
        }
    }, [updateOrigin, handleProgress])

    return (
        <section id="home" className="relative z-0 w-full">
            <style>{hoverStyles}</style>
            <ScrollFrames poster={firstFrame} scrollHeight="400vh" holdScreens={1} onProgress={handleProgress}>
                {/* Initial Hero UI (Zooms out and clears by frame 80) */}
                <div
                    ref={zoomContainerRef}
                    className="flex h-full w-full flex-col items-center justify-center gap-6 px-4 pt-28 pb-16 sm:gap-8 will-change-[transform,opacity] transform-gpu [backface-visibility:hidden] [contain:layout_style]"
                    style={{
                        transformOrigin: `${originRef.current.x}% ${originRef.current.y}%`,
                    }}
                >
                    <motion.img
                        src={Logo}
                        alt="HackFusion"
                        className="pointer-events-none select-none h-50 sm:h-56 md:h-75 drop-shadow-[0_10px_0_rgba(0,0,0,0.35)] -mt-20 md:mt-0 will-change-transform"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            opacity: { duration: 0.6 },
                            scale: { type: "spring", stiffness: 120, damping: 12 },
                        }}
                    />

                    <div className="flex flex-col items-center gap-4 sm:flex-col sm:gap-5 md:-mt-20">
                        <McButton
                            to={REGISTER_PATH}
                            color={REGISTRATION_OPEN ? "#4f9a2f" : "#7d7d7d"}
                            disabled={!REGISTRATION_OPEN ? true : false}
                            delay={0.4}
                            hint="Join the hackathon!"
                        >
                            {REGISTRATION_OPEN ? "Register Now" : "Registration Closed"}
                        </McButton>
                        <div ref={problemBtnRef} className="w-full">
                            <McButton
                                to={PROBLEM_STATEMENT_PATH}
                                color="#3a6fc4"
                                delay={0.6}
                                hint="See the challenges"
                            >
                                View Problem Statement
                            </McButton>
                        </div>
                        <div ref={loginBtnRef} className="w-full">
                            <McButton
                                to={LOGIN_PATH}
                                color="#c43a3a"
                                delay={0.8}
                                hint="Enter your dashboard"
                            >
                                Login
                            </McButton>
                        </div>
                    </div>

                    <Countdown />
                </div>

                {/* Grand Hall Tagline: Appears stationary in screen center when camera passes through the doors */}
                <div
                    ref={hallTextRef}
                    className="pointer-events-none absolute inset-0 z-20 flex select-none items-center justify-center px-4 will-change-[opacity]"
                    style={{
                        opacity: 0,
                        visibility: "hidden",
                    }}
                >
                    {/* <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 font-['Press_Start_2P',monospace] text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-wider text-[#FFE600] text-center [text-shadow:3px_3px_0_#000,5px_5px_0_rgba(0,0,0,0.8),0_0_24px_rgba(255,215,0,0.4)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]">
                        <span>CODE.</span>
                        <span>COMPETE.</span>
                        <span>CONQUER.</span>
                    </div> */}
                </div>
            </ScrollFrames>
        </section>
    )
}
