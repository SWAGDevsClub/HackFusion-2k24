import { motion } from "motion/react"
import { Link } from "react-router-dom"
import HeroImg from "../assets/mcmain.jpg"
import Logo from "../assets/logo.png"
import Countdown from "../components/Countdown"
import ScrollFrames from "./ScrollFrames"

const MotionLink = motion.create(Link)

const REGISTRATION_OPEN = true
const REGISTER_PATH = "/register"
const PROBLEM_STATEMENT_PATH = "/problem-statement"
const LOGIN_PATH = "/login"

const mcBtn = [
    "w-full border-4 border-black bg-[var(--bg)] text-center uppercase text-white",
    "px-[22px] py-[14px] text-[10px] sm:px-7 sm:py-4 sm:text-[13px]",
    "font-['Press_Start_2P',monospace]",
    "[text-shadow:2px_2px_0_rgba(0,0,0,0.55)]",
    "shadow-[inset_4px_4px_0_rgba(255,255,255,0.38),inset_-4px_-4px_0_rgba(0,0,0,0.38),0_6px_0_rgba(0,0,0,0.4)]",
    "transition-[filter] duration-150 ease-in-out hover:brightness-[1.2]",
].join(" ")

function McButton({ to, children, color = "#7d7d7d", disabled = false, delay = 0 }) {
    const shared = {
        className: `${mcBtn} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`,
        style: { "--bg": color },
        initial: { opacity: 0, y: 20 },
        animate: { opacity: disabled ? 0.65 : 1, y: 0 },
        transition: { delay, duration: 0.5 },
        whileHover: disabled ? undefined : { scale: 1.05 },
        whileTap: disabled ? undefined : { scale: 0.96 },
    }

    // a disabled button is not a link at all
    if (disabled) {
        return (
            <motion.span aria-disabled="true" {...shared}>
                {children}
            </motion.span>
        )
    }

    return (
        <MotionLink to={to} {...shared}>
            {children}
        </MotionLink>
    )
}

export default function HeroSection() {
    return (
        <section id="home" className="relative z-0 w-full">
            <ScrollFrames poster={HeroImg} scrollHeight="400vh" holdScreens={1}>
                <div className="flex h-full flex-col items-center justify-center gap-6 px-4 pt-28 pb-16 sm:gap-8">
                    <motion.img
                        src={Logo}
                        alt="HackFusion"
                        className="h-50 sm:h-56 md:h-70 drop-shadow-[0_10px_0_rgba(0,0,0,0.35)] -mt-20 md:-mt-5"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                        transition={{
                            opacity: { duration: 0.6 },
                            scale: { type: "spring", stiffness: 120, damping: 12 },
                        }}
                    />

                    <motion.p
                        className="text-center text-[11px] text-yellow-300 sm:text-sm md:text-base -mt-17 md:-mt-25 mb-5 font-['Press_Start_2P',monospace] [text-shadow:3px_3px_0_rgb(0,0,0)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        "Code. Compete. Survive."
                    </motion.p>

                    <div className="flex flex-col items-center gap-4 sm:flex-col sm:gap-5">
                        <McButton
                            to={REGISTER_PATH}
                            color={REGISTRATION_OPEN ? "#4f9a2f" : "#7d7Id7d"}
                            disabled={!REGISTRATION_OPEN}
                            delay={0.4}
                        >
                            {REGISTRATION_OPEN ? "Register Now" : "Registration Closed"}
                        </McButton>
                        <McButton to={PROBLEM_STATEMENT_PATH} color="#3a6fc4" delay={0.6}>
                            View Problem Statement
                        </McButton>
                        <McButton to={LOGIN_PATH} color="#c43a3a" delay={0.8}>
                            Login
                        </McButton>
                    </div>

                    <Countdown />
                </div>
            </ScrollFrames>
        </section>
    )
}