import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import faqSunsetBackground from "../assets/digvijay's_assets/faq-sunset-background.webp";
import faqBlossomTree from "../assets/digvijay's_assets/faq-cherry-blossom-tree.webp";
import faqTabSandTexture from "../assets/digvijay's_assets/faq-tab-sand-texture.webp";
import Navbar from "../components/Navbar"

const questions = [
  {
    question: "What is HackFusion 4?",
    answer: "HackFusion 4 is a national 36-hour hackathon organised in late 2026",
  },
  {
    question: "What is the registration fee and refund policy?",
    answer: "The fee is ₹749 per team and includes food. Teams not selected for Stage 2 get a refund; participant-initiated cancellations are not refundable.",
  },
  {
    question: "How do we pay the registration fee?",
    answer: "Pay using the QR code on the Account Details page. Keep your payment screenshot and UTR number, and upload the screenshot when requested.",
  },
  {
    question: "What are the stages of the hackathon?",
    answer: "Stage 1 is abstract submission and PPT-based selection. Stage 2 is the grand finale at SGGSIE&T, Nanded, Maharashtra.",
  },
  {
    question: "What should we bring to the hackathon?",
    answer: "Bring a laptop and charger, phone, headphones, notebook and pen, USB drive, ID, water bottle, medicines, backup drive or USB hub, snacks, comfortable clothes, nap essentials, toiletries, and required software installed.",
  },
  {
    question: "Which academic years and branches can participate?",
    answer: "Students from any academic year and branch can participate.",
  },
  {
    question: "Is a girl team member compulsory?",
    answer: "No.",
  },
  {
    question: "Are a PPT & abstract required?",
    answer: "Yes, abstract and PPT are both required. Explain your approach to solving the problem statement.",
  },
  {
    question: "What is the last date to register?",
    answer: "The stated deadline is yet to be decleared",
  },
  {
    question: "Can we leave the venue during the hackathon?",
    answer: "Only in an emergency.",
  },
  {
    question: "Can we use ChatGPT during the competition?",
    answer: "Yes. You may use open-source tools, but make sure you understand your solution and approach.",
  },
  {
    question: "What do winning teams get besides prize money?",
    answer: "Benefits include skill development, networking, portfolio and career growth, personal growth, and internship opportunities.",
  },
  {
    question: "Will there be sleeping or rest areas?",
    answer: "Yes.",
  },
  {
    question: "Will reliable internet be available?",
    answer: "Yes, internet will be available.",
  },
  {
    question: "Can teammates be from different colleges?",
    answer: "Yes, participants from different colleges can form a team.",
  },
  {
    question: "I didn't receive an OTP email. What should I do?",
    answer: "Check your spam folder or contact the organizers.",
  },
  {
    question: "What will the problem statement be like?",
    answer: "Check the official problem statement for details.",
  },
  {
    question: "Will refreshments and breakfast be provided?",
    answer: "Yes, refreshments and breakfast will be provided at regular intervals.",
  },
  {
    question: "Is lunch and dinner included in the registration fee?",
    answer: "Yes, meals are included in the registration fee.",
  },
  {
    question: "Can I get a refund?",
    answer: "You can get a refund if your team is not selected for Stage 2.",
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* stone-ish scroll bar */
.faq-scroll { scrollbar-width: thin; scrollbar-color: transparent transparent; scroll-behavior: smooth; }
.faq-section.cursor-active .faq-scroll { scrollbar-color: #8b8b8b transparent; }
.faq-btn span:nth-child(2) { min-width: 0; overflow-wrap: anywhere; }
.faq-tip { overflow-wrap: anywhere; }
.faq-scroll::-webkit-scrollbar { width: 16px; }
.faq-scroll::-webkit-scrollbar-track { background: transparent; }
.faq-scroll::-webkit-scrollbar-thumb {
  background: transparent;
  border: 3px solid transparent;
  background-clip: padding-box;
  transition: background-color .25s ease;
}
.faq-section.cursor-active .faq-scroll::-webkit-scrollbar-thumb {
  background-color: #8b8b8b;
}
.faq-page-title {
  padding: 12px clamp(12px, 2vw, 20px);
  border: 3px solid #000;
  background-image:
    linear-gradient(180deg, rgba(60,36,16,.55), rgba(30,18,8,.68)),
    var(--title-tex);
  background-size: auto, 900px;
  background-position: center;
  box-shadow:
    inset 3px 3px 0 rgba(255,235,190,.28),
    inset -3px -3px 0 rgba(0,0,0,.4),
    0 6px 0 rgba(0,0,0,.5);
}
.faq-heading {
  max-height: 240px;
  overflow: hidden;
  transition: max-height .3s ease, opacity .25s ease;
}
.faq-heading.is-collapsed {
  max-height: 0;
  opacity: 0;
  pointer-events: none;
}

/* question panel */
.faq-card {
  position: relative;
  width: 100%;
  margin-inline: auto;
  border: 3px solid #000;
  background-image:
    linear-gradient(180deg, rgba(60,36,16,.55), rgba(30,18,8,.68)),
    var(--tex);
  background-size: auto, 900px;
  background-position: center;
  box-shadow:
    inset 3px 3px 0 rgba(255,235,190,.28),
    inset -3px -3px 0 rgba(0,0,0,.4),
    0 6px 0 rgba(0,0,0,.5);
  transition: filter .15s steps(3), box-shadow .15s steps(3);
}
.faq-card:hover { filter: brightness(1.15); }
.faq-card.is-open {
  box-shadow:
    inset 3px 3px 0 rgba(255,235,190,.35),
    inset -3px -3px 0 rgba(0,0,0,.4),
    0 6px 0 rgba(0,0,0,.5);
}

.faq-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 12px;
  text-align: left;
  background: transparent;
  border: 0;
  color: #fff;
  font: inherit;
  font-size: 10px;
  line-height: 1.6;
  text-shadow: 2px 2px 0 #000;
  cursor: pointer;
}
.faq-btn:focus-visible { outline: none; }
.faq-btn:focus-visible span:nth-child(2) {
  text-decoration: underline;
  text-decoration-color: #ffe48a;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
@media (min-width: 640px) {
  .faq-btn { font-size: 12px; padding: 13px 16px; gap: 12px; }
}

/* pink "XP" number badge */
.faq-badge {
  flex-shrink: 0;
  min-width: 34px;
  padding: 7px 5px 5px;
  text-align: center;
  font-size: 9px;
  color: #fff;
  background: linear-gradient(180deg, #ff8ec7 0%, #ea5ea5 100%);
  border: 2px solid #000;
  box-shadow: inset 2px 2px 0 #ffc2dd, inset -2px -2px 0 #a6276a;
  text-shadow: 2px 2px 0 #5d0f36;
}

/* +/- button */
.faq-toggle {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  font-size: 14px;
  color: #fff;
  background: #8b8b8b;
  border: 3px solid #000;
  box-shadow: inset 2px 2px 0 #c6c6c6, inset -2px -2px 0 #555;
  text-shadow: 2px 2px 0 #3f3f3f;
}
.faq-btn:hover .faq-toggle { background: #7b8fd1; }
@media (max-width: 640px) {
  .faq-scroll::-webkit-scrollbar { width: 8px; }
}
@media (max-width: 420px) {
  .faq-btn { gap: 8px; padding: 10px 8px; font-size: clamp(8px, 2.55vw, 10px); line-height: 1.55; }
  .faq-badge { min-width: 32px; padding: 7px 4px 5px; font-size: 8px; border-width: 2px; }
  .faq-toggle { width: 30px; height: 30px; border-width: 3px; font-size: 14px; flex-shrink: 0; }
  .faq-tip { margin: 0 8px 10px; padding: 10px; border-width: 3px; font-size: 9px; line-height: 1.8; }
}
@media (max-width: 350px) {
  .faq-btn { gap: 6px; padding: 8px 6px; font-size: 8px; }
  .faq-badge { min-width: 28px; padding: 6px 3px 4px; }
  .faq-toggle { width: 26px; height: 26px; border-width: 2px; }
  .faq-tip { margin-inline: 6px; padding: 8px; font-size: 8px; }
}

/* answer shown as an item tooltip */
.faq-tip {
  margin: 0 12px 12px;
  padding: 11px;
  font-size: 9px;
  line-height: 2;
  color: #fff;
  background: rgba(16, 0, 16, .94);
  border: 3px solid #8f245d;
  box-shadow: inset 0 0 0 2px #e85a9d, 0 0 0 2px #100010;
  text-shadow: 2px 2px 0 #3f3f3f;
}
@media (min-width: 640px) {
  .faq-tip { margin: 0 16px 16px; padding: 14px; font-size: 11px; }
}

@media (max-width: 420px) {
  .faq-btn { gap: 8px; padding: 10px 8px; font-size: clamp(8px, 2.55vw, 10px); line-height: 1.55; }
  .faq-badge { min-width: 32px; padding: 7px 4px 5px; font-size: 8px; border-width: 2px; }
  .faq-toggle { width: 30px; height: 30px; border-width: 3px; font-size: 14px; flex-shrink: 0; }
  .faq-tip { margin: 0 8px 10px; padding: 10px; border-width: 3px; font-size: 9px; line-height: 1.8; }
}
@media (max-width: 350px) {
  .faq-btn { gap: 6px; padding: 8px 6px; font-size: 8px; }
  .faq-badge { min-width: 28px; padding: 6px 3px 4px; }
  .faq-toggle { width: 26px; height: 26px; border-width: 2px; }
  .faq-tip { margin-inline: 6px; padding: 8px; font-size: 8px; }
}
@media (max-height: 640px) {
  .faq-scroll { padding-bottom: 6px; }
}
@media (max-width: 640px) {
  .faq-section {
    height: 100svh !important;
    min-height: 0;
    overflow: hidden !important;
  }
  .faq-content {
    height: 100svh !important;
    min-height: 0;
    transform: none;
    scale: 1;
  }
  .faq-scroll {
    min-height: 0;
    flex: 1 1 0%;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    overscroll-behavior-y: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #ff8bd1 transparent;
  }
  .faq-scroll::-webkit-scrollbar { display: block; width: 10px; }
  .faq-scroll::-webkit-scrollbar-track { background: transparent; }
  .faq-scroll::-webkit-scrollbar-thumb {
    background: #ff8bd1;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
  .faq-blossom { display: none; }
}
`;

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [cursorParticles, setCursorParticles] = useState([]);
  const [cursorActive, setCursorActive] = useState(false);
  const [titleHidden, setTitleHidden] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(
    () => window.matchMedia("(max-width: 640px)").matches,
  );
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const lastParticleTime = useRef(0);
  const nextParticleId = useRef(0);
  const cursorTimeout = useRef(null);
  const parallaxFrame = useRef(null);
  const targetScrollOffset = useRef(0);
  const currentScrollOffset = useRef(0);

  useEffect(() => () => clearTimeout(cursorTimeout.current), []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateLayout = () => setIsMobileLayout(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    const updateScrollOffset = () => {
      const section = sectionRef.current;
      if (!section) return;

      targetScrollOffset.current = scrollRef.current?.scrollTop ?? 0;
    };
    const animateParallax = () => {
      const section = sectionRef.current;
      if (!section) {
        parallaxFrame.current = null;
        return;
      }

      const target = reduceMotion ? 0 : targetScrollOffset.current;
      currentScrollOffset.current += (target - currentScrollOffset.current) * 0.12;
      if (Math.abs(target - currentScrollOffset.current) < 0.1) {
        currentScrollOffset.current = target;
      }

      const offset = currentScrollOffset.current;
      section.style.setProperty("--faq-blossom-offset", `${-offset * 0.2}px`);
      section.style.setProperty("--faq-title-offset", `${-offset * 0.03}px`);
      section.style.setProperty("--faq-cards-offset", `${-offset * 0.008}px`);

      if (offset !== target) {
        parallaxFrame.current = requestAnimationFrame(animateParallax);
      } else {
        parallaxFrame.current = null;
      }
    };
    const startParallax = () => {
      updateScrollOffset();
      if (parallaxFrame.current === null) {
        parallaxFrame.current = requestAnimationFrame(animateParallax);
      }
    };
    const scrollElement = scrollRef.current;
    scrollElement?.addEventListener("scroll", startParallax, { passive: true });
    window.addEventListener("scroll", startParallax, { passive: true });
    window.addEventListener("resize", startParallax);
    startParallax();

    return () => {
      scrollElement?.removeEventListener("scroll", startParallax);
      window.removeEventListener("scroll", startParallax);
      window.removeEventListener("resize", startParallax);
      if (parallaxFrame.current !== null) {
        cancelAnimationFrame(parallaxFrame.current);
      }
    };
  }, [reduceMotion]);

  const emitCursorParticles = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const burst = Array.from({ length: 2 }, () => ({
      id: nextParticleId.current++,
      x: event.clientX - bounds.left + (Math.random() - 0.5) * 14,
      y: event.clientY - bounds.top + (Math.random() - 0.5) * 14,
      size: 4 + Math.random() * 5,
      drift: (Math.random() - 0.5) * 36,
      rise: 22 + Math.random() * 28,
    }));

    setCursorParticles((particles) => [...particles, ...burst].slice(-36));
  };

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen" && event.pointerType !== "touch") return;
    if (event.pointerType === "touch" && event.buttons === 0) return;

    setCursorActive(true);
    clearTimeout(cursorTimeout.current);
    cursorTimeout.current = setTimeout(() => setCursorActive(false), 900);

    if (reduceMotion) return;

    const now = performance.now();
    if (now - lastParticleTime.current < 55) return;
    lastParticleTime.current = now;
    emitCursorParticles(event);
  };

  const handlePointerDown = (event) => {
    if (event.pointerType !== "touch" || reduceMotion) return;
    lastParticleTime.current = performance.now();
    emitCursorParticles(event);
  };

  const handleFaqScroll = (event) => {
    if (isMobileLayout) {
      setTitleHidden(event.currentTarget.scrollTop > 24);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`faq-section relative isolate h-svh overflow-hidden bg-[#1f3a1a] text-white [font-family:'Press_Start_2P',monospace] ${cursorActive ? "cursor-active" : ""}`}
      aria-labelledby="faq-title"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
    >
      <style>{CSS}</style>

      <Navbar/>
      {/* backdrop */}
      <img
        className="pointer-events-none absolute inset-0 z-[-1] h-full w-full object-cover object-center"
        src={faqSunsetBackground}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.3))]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[rgba(236,72,153,.2)] mix-blend-soft-light"
        aria-hidden="true"
      />
      <img
        className="faq-blossom pointer-events-none absolute inset-y-0 left-0 z-[3] h-full w-auto max-w-[40vw] -translate-x-[40%] object-contain object-left-bottom select-none"
        style={{ transform: "translateY(var(--faq-blossom-offset, 0px))" }}
        src={faqBlossomTree}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <img
        className="faq-blossom pointer-events-none absolute inset-y-0 right-0 z-[3] h-full w-auto max-w-[40vw] translate-x-[40%] -scale-x-100 object-contain object-right-bottom select-none"
        style={{ transform: "translateY(var(--faq-blossom-offset, 0px)) scaleX(-1)" }}
        src={faqBlossomTree}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      {cursorParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="pointer-events-none absolute z-[5] -translate-x-1/2 -translate-y-1/2 border border-[#ffb6dc] bg-[#ff8bd1] shadow-[0_0_8px_#ff4fb8] [image-rendering:pixelated]"
            style={{ left: particle.x, top: particle.y, width: particle.size, height: particle.size }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              x: particle.drift,
              y: -particle.rise,
              opacity: [0, 1, 0],
              scale: [0.3, 1, 0],
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onAnimationComplete={() =>
              setCursorParticles((particles) => particles.filter(({ id }) => id !== particle.id))
            }
            aria-hidden="true"
          />
        ))}

      <div className="faq-content relative z-[4] mx-auto flex h-[108.7%] min-h-0 w-full max-w-[1100px] origin-top scale-[.92] flex-col px-[clamp(.75rem,3vw,2rem)] pb-[clamp(.5rem,1.5vh,1rem)] pt-[clamp(8rem,16vh,10rem)] sm:px-8">
        {/* heading */}
        <motion.div
          className={`faq-heading shrink-0 ${isMobileLayout && titleHidden ? "is-collapsed" : ""}`}
          style={{ translate: "0 var(--faq-title-offset, 0px)" }}
          initial={reduceMotion ? false : { opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2
            id="faq-title"
            className="faq-page-title mb-10 max-w-full text-center text-pretty text-[clamp(1.5rem,4.4vw,3.2rem)] font-extrabold leading-[1.5] text-[#fff4dc] [text-shadow:3px_3px_0_#35190d,0_8px_22px_rgba(0,0,0,.45)] max-[640px]:!text-[clamp(1.15rem,5vw,1.65rem)] max-[640px]:!leading-[1.6]"
            style={{ "--title-tex": `url("${faqTabSandTexture}")` }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* list */}
        <div
          ref={scrollRef}
          className="faq-scroll mx-auto min-h-0 w-[80%] flex-1 overflow-x-hidden overscroll-y-contain pb-3 pt-1 max-[640px]:w-[92%]"
          style={{ translate: "0 var(--faq-cards-offset, 0px)" }}
          data-lenis-prevent
          onScroll={handleFaqScroll}
        >
          <div className="grid gap-3 pb-3 sm:gap-4">
            {questions.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index + 1}`;
              return (
                <motion.article
                  key={question}
                  className={`faq-card ${isOpen ? "is-open" : ""}`}
                  style={{ "--tex": `url("${faqTabSandTexture}")` }}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ root: isMobileLayout ? undefined : scrollRef, once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.025, 0.2), ease: "easeOut" }}
                  whileHover={reduceMotion ? undefined : { x: 6 }}
                >
                  <h3 className="m-0">
                    <button
                      className="faq-btn"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="faq-badge">{String(index + 1).padStart(2, "0")}</span>
                      <span className="min-w-0 flex-1">{question}</span>
                      <span className="faq-toggle" aria-hidden="true">
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="overflow-hidden"
                        id={answerId}
                        key="answer"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
                      >
                        <p className="faq-tip">{answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}