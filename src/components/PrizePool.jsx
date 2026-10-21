import React, { useEffect, useRef, useState } from 'react';
import UnderwaterEffects from '../components/UnderwaterEffects.jsx';
// import MinecraftAnimals3D from './components/MinecraftAnimals3D.jsx';
import bgImage from '../assets/minecraft_coral_ocean.webp';
import parchmentCardImg from '../assets/parchment_card.webp';

/* Real Minecraft WebP item icons */
import diamondIcon from '../assets/icons/diamond.webp';
import paperIcon from '../assets/icons/paper.webp';
import bedIcon from '../assets/icons/bed.webp';
import enchantedBookIcon from '../assets/icons/enchanted_book.webp';
import beaconIcon from '../assets/icons/beacon.webp';
import enderChestIcon from '../assets/icons/ender_chest.webp';
import elytraIcon from '../assets/icons/elytra.webp';
import goldenAppleIcon from '../assets/icons/golden_apple.webp';
import pickaxeIcon from '../assets/icons/pickaxe.webp';
import compassIcon from '../assets/icons/compass.webp';
import emeraldIcon from '../assets/icons/emerald.webp';
import clockIcon from '../assets/icons/clock.webp';
import totemIcon from '../assets/icons/totem.webp';

function EmbeddedStyles() {
    return (
        <style dangerouslySetInnerHTML={{ __html: `
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&display=swap'); 
            
            @font-face { 
                font-family: 'Minecraft'; 
                src: url('/fonts/Minecraft.woff2') format('woff2'), 
                     url('https://minecraft.wiki/images/Minecraft.woff2') format('woff2'), 
                     url('https://fonts.cdnfonts.com/s/14883/MinecraftRegular-Bmg3.woff') format('woff'); 
                font-weight: normal; 
                font-style: normal; 
                font-display: swap; 
            }

            /* Press Start 2P everywhere inside the section */
            .pp-root,
            .pp-root * {
                font-family: 'Press Start 2P', 'Silkscreen', 'VT323', monospace !important;
                -webkit-font-smoothing: none;
                font-smooth: never;
            }
            .pp-root p {
                line-height: 1.9 !important;
            }

            @keyframes parchmentFloat {
                0%, 100% { transform: translateY(0); }
                50%      { transform: translateY(-6px); }
            }
        `}} />
    );
}


/* ── Scroll-reveal hook ── */
function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
            { threshold: 0.1, ...options }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return [ref, visible];
}

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
    const [ref, visible] = useScrollReveal();
    const transforms = { up: 'translateY(24px)', down: 'translateY(-24px)', left: 'translateX(-24px)', right: 'translateX(24px)' };
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translate(0,0)' : transforms[direction],
                transition: `opacity 0.5s cubic-bezier(.4,0,.2,1) ${delay}ms, transform 0.5s cubic-bezier(.4,0,.2,1) ${delay}ms`,
                willChange: 'opacity, transform',
            }}
        >
            {children}
        </div>
    );
}

/* ── Parchment card (replaces .mc-parchment-card from index.css) ──
   - background image is applied inline so Vite resolves the asset import
   - drop-shadow filter + hover float animation are Tailwind arbitrary values
   - @keyframes parchmentFloat now lives in EmbeddedStyles above
*/
function ParchmentCard({ children, className = '' }) {
    return (
        <div
            className={
                'relative bg-transparent bg-[length:100%_100%] bg-no-repeat border-none ' +
                '[filter:drop-shadow(0_14px_32px_rgba(1,14,28,0.72))_drop-shadow(0_2px_8px_rgba(0,0,0,0.45))] ' +
                'hover:animate-[parchmentFloat_2.4s_ease-in-out_infinite] ' +
                className
            }
            style={{ backgroundImage: `url(${parchmentCardImg})` }}
        >
            {children}
        </div>
    );
}

export default function PrizePool() {

    const perks = [
        { id: 1, title: "₹2,30,000 Prize Pool", desc: "Top ranking team awards", icon: diamondIcon, rarity: "DIAMOND", color: "#0284c7" },
        { id: 2, title: "Certificate", desc: "Official participation proof", icon: paperIcon, rarity: "CREDENTIAL", color: "#b45309" },
        { id: 3, title: "Free Accommodation", desc: "Stay for the full 36 hours", icon: bedIcon, rarity: "STAY", color: "#dc2626" },
        { id: 4, title: "Skill Development", desc: "Workshops & mentor support", icon: enchantedBookIcon, rarity: "EXPERIENCE", color: "#9333ea" },
        { id: 5, title: "Networking", desc: "Connect with sponsors & peers", icon: beaconIcon, rarity: "NETWORK", color: "#0d9488" },
        { id: 6, title: "Portfolio Enhancement", desc: "Showcase real projects", icon: enderChestIcon, rarity: "PORTFOLIO", color: "#7c3aed" },
        { id: 7, title: "Career Advancement", desc: "Fast-track interviews", icon: elytraIcon, rarity: "CAREER", color: "#c2410c" },
        { id: 8, title: "Personal Growth", desc: "Push your limits", icon: goldenAppleIcon, rarity: "GROWTH", color: "#ca8a04" },
        { id: 9, title: "Internship Opportunity", desc: "Exclusive recruiter rounds", icon: pickaxeIcon, rarity: "INTERNSHIP", color: "#0369a1" },
        { id: 10, title: "Mentorship", desc: "Guidance from industry leaders", icon: compassIcon, rarity: "MENTORSHIP", color: "#16a34a" },
    ];

    return (
        <section className="pp-root relative px-2.5 sm:px-5 text-[#ede5da] font-pressstart selection:bg-[#55ff55] selection:text-black overflow-x-clip">

            {/* Fonts + keyframes */}
            <EmbeddedStyles />

            {/* Background — pinned to the viewport while this section is on screen.
          It scrolls away only when the section ends. h/-mb = one screen tall, content overlays it. */}
            <div className="top-0 h-[100dvh] -mb-[100dvh] -mx-2.5 sm:-mx-5 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 40%',
                        backgroundRepeat: 'no-repeat',
                        filter: 'brightness(1.15) contrast(1.02) saturate(1.06)',
                    }}
                />
                {/* Soft ambient water tint */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 30%, rgba(30,120,180,0.12) 0%, transparent 70%)',
                    }}
                />
                {/* Effects live inside the pinned layer so they stay on screen too */}
                <UnderwaterEffects />
                {/* <MinecraftAnimals3D /> */}
            </div>

            {/* ── Main Content (scrolls over the pinned background) ── */}
            <div className="relative z-20 max-w-[840px] mx-auto w-full px-1.5 sm:px-4 space-y-5 sm:space-y-6 select-none py-10 sm:py-14">

                {/* ═══ BLOCK 1: HIGHLIGHTS & PRIZES ═══ */}
                <div className="flex flex-col space-y-4 sm:space-y-5">

                    {/* Title */}
                    <Reveal direction="down" delay={0}>
                        <div className="text-center space-y-2">
                            <h2 className="font-pressstart text-[22px] sm:text-[40px] md:text-[52px] text-[#ffd54f] tracking-wider uppercase leading-tight [text-shadow:3px_3px_0px_#422006,5px_5px_0px_#051829]">
                                PERKS &amp; PRIZES
                            </h2>
                            <p className="font-minecraft text-[9px] sm:text-xs md:text-sm text-[#c5ecf8] tracking-widest uppercase leading-relaxed [text-shadow:2px_2px_0px_#1f1f1f]">
                                HACKFUSION 4 — WHAT AWAITS YOUR SQUAD
                            </p>
                        </div>
                    </Reveal>

                    {/* Prize Pool Card */}
                    <Reveal direction="up" delay={80}>
                        <ParchmentCard className="px-6 py-7 sm:px-12 sm:py-9 md:px-14 md:py-10 text-[#2b1608]">
                            <div className="flex flex-col items-center text-center">

                                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 bg-[#2d1b0f] border-2 border-[#5c371a] mb-2 shadow-[inset_1px_1px_0px_rgba(255,240,200,0.2),0_2px_6px_rgba(0,0,0,0.35)]">
                                    <img src={diamondIcon} alt="Diamond" className="w-4 h-4 sm:w-6 sm:h-6 object-contain [image-rendering:pixelated]" />
                                    <span className="font-pressstart text-[8px] sm:text-xs text-[#55ffff] tracking-widest uppercase [text-shadow:2px_2px_0px_#093f38,4px_4px_0px_#031412]">PRIZE POOL</span>
                                </div>

                                <div className="font-pressstart text-3xl sm:text-5xl md:text-6xl text-[#5c2d0f] tracking-wider [text-shadow:2px_2px_0px_rgba(180,130,60,0.45),4px_4px_0px_rgba(90,50,15,0.2)] my-2 sm:my-3">
                                    ₹2,30,000
                                </div>
                                <div className="font-minecraft text-[11px] sm:text-xs text-[#5c371a] tracking-[0.25em] uppercase font-bold [text-shadow:1px_1px_0px_rgba(255,245,215,0.85)] mb-3 sm:mb-5">
                                    TOTAL AWARDS
                                </div>

                                {/* Special prizes */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 w-full px-1 sm:px-3 pt-3 sm:pt-5 border-t-2 border-[#8f5e30]/40">
                                    <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 bg-[#e8c88e]/95 border-2 border-[#8f5e30] text-left shadow-[inset_1px_1px_0px_rgba(255,250,230,0.85),0_2px_4px_rgba(60,35,10,0.15)]">
                                        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                                            <img src={totemIcon} alt="Totem of Undying" className="w-6 h-6 sm:w-8 sm:h-8 object-contain [image-rendering:pixelated]" />
                                        </div>
                                        <p className="font-minecraft text-xs sm:text-[13px] text-[#2b1608] leading-relaxed font-bold">
                                            Special prize for specially-abled teams. <span className="text-[#b45309] font-bold">(Min 2 in team)</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 bg-[#e8c88e]/95 border-2 border-[#8f5e30] text-left shadow-[inset_1px_1px_0px_rgba(255,250,230,0.85),0_2px_4px_rgba(60,35,10,0.15)]">
                                        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                                            <img src={goldenAppleIcon} alt="Golden Apple" className="w-6 h-6 sm:w-8 sm:h-8 object-contain [image-rendering:pixelated]" />
                                        </div>
                                        <p className="font-minecraft text-xs sm:text-[13px] text-[#2b1608] leading-relaxed font-bold">
                                            Special prize for all-girls teams. <span className="text-[#b45309] font-bold">(100% girls Team)</span>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </ParchmentCard>
                    </Reveal>

                    {/* Community + Hours */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">

                        <Reveal direction="left" delay={50}>
                            <ParchmentCard className="min-h-[170px] sm:min-h-[210px] flex flex-col justify-start px-6 py-7 sm:px-8 sm:py-8 md:px-10 md:py-9 text-[#2b1608]">
                                <div className="flex items-center gap-2 pt-1 sm:pt-0 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b-2 border-[#8f5e30]/40">
                                    <img src={emeraldIcon} alt="Emerald" className="w-5 h-5 sm:w-7 sm:h-7 object-contain [image-rendering:pixelated] flex-shrink-0" />
                                    <h3 className="font-pressstart text-[9.5px] sm:text-xs md:text-sm text-[#15803d] uppercase tracking-wide font-bold [text-shadow:1px_1px_0px_rgba(255,245,215,0.85)]">GREAT COMMUNITY</h3>
                                </div>
                                <p className="font-minecraft text-xs sm:text-[13px] md:text-sm text-[#3a200f] leading-relaxed tracking-wide font-medium px-1 sm:px-1.5">
                                    Embark on a journey of collaboration and knowledge exchange. Seize networking opportunities with enthusiasts and industry experts. Create lasting connections that propel your success!
                                </p>
                            </ParchmentCard>
                        </Reveal>

                        <Reveal direction="right" delay={50}>
                            <ParchmentCard className="min-h-[170px] sm:min-h-[210px] flex flex-col justify-start px-6 py-7 sm:px-8 sm:py-8 md:px-10 md:py-9 text-[#2b1608]">
                                <div className="flex items-center gap-2 pt-1 sm:pt-0 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b-2 border-[#8f5e30]/40">
                                    <img src={clockIcon} alt="Clock" className="w-5 h-5 sm:w-7 sm:h-7 object-contain [image-rendering:pixelated] flex-shrink-0" />
                                    <h3 className="font-pressstart text-[9.5px] sm:text-xs md:text-sm text-[#b45309] uppercase tracking-wide font-bold [text-shadow:1px_1px_0px_rgba(255,245,215,0.85)]">36+ HOURS</h3>
                                </div>
                                <p className="font-minecraft text-xs sm:text-[13px] md:text-sm text-[#3a200f] leading-relaxed tracking-wide font-medium px-1 sm:px-1.5">
                                    Two days of intense brainstorming and coding. Dynamic discussions, exchange ideas with top professionals, and harness collaborative problem-solving.
                                </p>
                            </ParchmentCard>
                        </Reveal>

                    </div>

                </div>

                {/* ═══ BLOCK 2: SQUAD PASS & 749 RUPEES PERKS ═══ */}
                <Reveal direction="up" delay={80}>
                    <div id="squad-pass" className="w-full">
                        <ParchmentCard className="px-5 py-7 sm:px-10 sm:py-9 md:px-12 md:py-10 text-[#2b1608]">

                            {/* Header */}
                            <div className="flex flex-col items-center text-center pt-8 sm:pt-6 pb-3 sm:pb-4 border-b-2 border-[#8f5e30]/40 mb-3.5 sm:mb-[18px]">
                                <div className="font-pressstart text-3xl sm:text-5xl md:text-6xl text-[#5c2d0f] tracking-wider [text-shadow:2px_2px_0px_rgba(180,130,60,0.45),4px_4px_0px_rgba(90,50,15,0.2)]">
                                    ₹749/-
                                </div>
                                <div className="mt-2 font-pressstart text-[8px] sm:text-[11px] text-[#5c371a] tracking-widest uppercase [text-shadow:1px_1px_0px_rgba(255,245,215,0.85)]">
                                    [ 100% REFUNDABLE ]
                                </div>
                            </div>

                            {/* 10 Perks */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3.5 px-0.5 sm:px-2">
                                {perks.map((perk, i) => (
                                    <Reveal key={perk.id} direction="up" delay={i * 30}>
                                        <div
                                            className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 p-2 sm:p-3 bg-[#e8c88e]/95 border-2 border-[#8f5e30] hover:bg-[#edd29b] hover:border-[#b45309] hover:-translate-y-0.5 transition-all cursor-default group min-h-[68px] sm:min-h-[82px] shadow-[inset_1px_1px_0px_rgba(255,250,230,0.85),0_2px_4px_rgba(40,20,5,0.15)]"
                                        >
                                            <div className="flex items-center gap-1.5 sm:contents">
                                                <div className="w-7 h-7 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center bg-[#2d1b0f] border-2 border-[#5c371a] group-hover:border-[#d97706] transition-colors shadow-[inset_1px_1px_0px_rgba(0,0,0,0.5)]">
                                                    <img src={perk.icon} alt={perk.title} className="w-4 h-4 sm:w-7 sm:h-7 object-contain [image-rendering:pixelated]" />
                                                </div>
                                                <span className="sm:hidden font-pressstart text-[6px] tracking-wide uppercase font-bold truncate" style={{ color: perk.color }}>
                                                    {perk.rarity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0 w-full">
                                                <span className="hidden sm:block font-pressstart text-[8px] sm:text-[9px] tracking-wider uppercase font-bold" style={{ color: perk.color }}>
                                                    {perk.rarity}
                                                </span>
                                                <h4 className="font-pressstart text-[7px] sm:text-[10px] md:text-[11px] text-[#241306] group-hover:text-[#b45309] transition-colors leading-snug font-bold mt-0.5 line-clamp-2">
                                                    {perk.title}
                                                </h4>
                                                <p className="font-minecraft text-[9px] sm:text-xs text-[#523319] leading-tight mt-0.5 line-clamp-1 sm:line-clamp-2">
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
    );
}