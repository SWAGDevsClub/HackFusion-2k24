import { useState, useEffect } from 'react';
import { motion, MotionConfig } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ComingSoonToast from '../components/ComingSoonToast';
import bgImage from '../assets/ps_bg.webp';

const BG_IMAGE = bgImage;
const ACCENT = '#55FFFF'; // Cyan diamond accent

/* ------------------------------------------------------------------ */
/*  DEMO PROBLEM STATEMENT DATA                                        */
/* ------------------------------------------------------------------ */
export const demoProblemStatement = {
  id: 'realm-protocol',
  badge: 'OFFICIAL CHALLENGE // HACKFUSION 4.0',
  title: 'AUTONOMOUS AGENTS & REALM SIMULATION',
  shortDescription:
    'Architect an intelligent, self-organizing multi-agent ecosystem where cognitive AI entities perceive world state, negotiate resource trade, and enforce decentralized realm governance.',
  fullContext: [
    'Virtual worlds and sandbox simulations frequently suffer from static, predictable non-player entities with scripted behaviors. Traditional game loops lack persistent episodic memory, emergent social coordination, and resilient economic mechanisms.',
    'Your mission is to construct an autonomous multi-agent simulation framework. Agents must independently form strategies, adapt to resource shocks, negotiate bilateral trades, and coordinate community-driven realm proposals without centralized oversight.',
  ],
  requirements: [
    'Cognitive decision pipeline with vector memory and contextual goal-planning',
    'Autonomous barter & liquidity exchange engine driven by emergent supply and demand',
    'Tamper-resistant consensus mechanism for rule adjustments and crisis arbitration',
    'Real-time observer dashboard with spatial pathing, dialogue logs, and state telemetry',
    'Robustness under resource scarcity, network latency, and adversarial agent behaviors',
  ],
  techStack: [
    'Python',
    'FastAPI',
    'LangChain / LangGraph',
    'React / Vite',
    'WebSockets',
    'ChromaDB / Pinecone',
    'Solidity / Web3',
  ],
  evaluationRubric: [
    { label: 'Agent Autonomy & Intelligence Depth', percentage: '30%' },
    { label: 'Technical Execution & Architecture Scalability', percentage: '30%' },
    { label: 'Economic Simulation & Emergent Behavior', percentage: '20%' },
    { label: 'Real-Time Visualization & UX Polish', percentage: '20%' },
  ],
  image: (
    <svg width="80" height="80" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="6" y="2" width="4" height="1" fill="#FFFFFF" />
      <rect x="4" y="3" width="2" height="1" fill="#FFFFFF" />
      <rect x="6" y="3" width="4" height="1" fill="#55FFFF" />
      <rect x="10" y="3" width="2" height="1" fill="#00AAAA" />
      <rect x="3" y="4" width="1" height="2" fill="#FFFFFF" />
      <rect x="4" y="4" width="2" height="2" fill="#55FFFF" />
      <rect x="6" y="4" width="4" height="2" fill="#00AAAA" />
      <rect x="10" y="4" width="2" height="2" fill="#00AAAA" />
      <rect x="12" y="4" width="1" height="2" fill="#005555" />
      <rect x="2" y="6" width="1" height="2" fill="#FFFFFF" />
      <rect x="3" y="6" width="2" height="2" fill="#55FFFF" />
      <rect x="5" y="6" width="6" height="2" fill="#00AAAA" />
      <rect x="11" y="6" width="2" height="2" fill="#005555" />
      <rect x="13" y="6" width="1" height="2" fill="#000000" />
      <rect x="3" y="8" width="2" height="2" fill="#00AAAA" />
      <rect x="5" y="8" width="6" height="2" fill="#00AAAA" />
      <rect x="11" y="8" width="2" height="2" fill="#005555" />
      <rect x="4" y="10" width="2" height="2" fill="#00AAAA" />
      <rect x="6" y="10" width="4" height="2" fill="#005555" />
      <rect x="10" y="10" width="2" height="2" fill="#005555" />
      <rect x="5" y="12" width="2" height="2" fill="#005555" />
      <rect x="7" y="12" width="2" height="2" fill="#003333" />
      <rect x="9" y="12" width="2" height="2" fill="#003333" />
      <rect x="7" y="14" width="2" height="1" fill="#000000" />
    </svg>
  ),
};

// Backwards-compatible export array for any legacy consumers
export const problemStatementsData = [demoProblemStatement];

/* ------------------------------------------------------------------ */
/*  MOTION SETTINGS                                                    */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/*  FLOATING PARTICLES                                                 */
/* ------------------------------------------------------------------ */
const PARTICLE_COLORS = ['#55FF55', '#FFFF55', '#55FFFF', '#FFAA00', '#FF5555'];

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47 + 13) % 100,
  size: 4 + (i % 3) * 2,
  duration: 9 + (i % 6) * 2,
  delay: -((i * 1.3) % 14),
  sway: ((i % 5) - 2) * 14,
  color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
}));

function Particles() {
  return (
    <div className="ps-particles" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--sway': `${p.sway}px`,
          }}
        />
      ))}
    </div>
  );
}

/* Wait for the pixel fonts so text doesn't change size mid-animation */
function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const go = () => alive && setReady(true);
    const fonts = typeof document !== 'undefined' ? document.fonts : null;
    const loading = fonts
      ? Promise.all([fonts.load("1em 'Press Start 2P'"), fonts.load('1em VT323')])
      : Promise.resolve();
    const timeout = new Promise((r) => setTimeout(r, 1500));
    Promise.race([loading, timeout]).then(() => setTimeout(go, 100));
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */
export default function ProblemStatement() {
  const ready = useFontsReady();
  const ps = demoProblemStatement;
  const maxPct = Math.max(...ps.evaluationRubric.map((r) => parseInt(r.percentage, 10)));

  return (
    <MotionConfig reducedMotion="user">
      <div className="ps-page relative flex min-h-screen flex-col overflow-x-hidden text-white">
        <style>{CSS}</style>

        {/* Coming Soon Toast Overlay */}
        <ComingSoonToast
          pageName="Problem Statement"
          title="COMING SOON"
          subtitle="Official HackFusion 4.0 problem statements and challenges will be revealed soon!"
        />

        {/* Background & Atmosphere */}
        <div
          className="ps-bg"
          style={BG_IMAGE ? { backgroundImage: `url(${BG_IMAGE})` } : undefined}
        />
        <div className="ps-shade" />
        <Particles />

        <Navbar />

        <main
          className="relative z-[5] mx-auto w-full max-w-4xl flex-1 px-4 pb-20 sm:px-6"
          style={{ paddingTop: 'clamp(96px, 13vh, 135px)' }}
        >
          {/* Header */}
          <header className="relative mb-8 text-center sm:mb-12">
            <motion.h1
              className="ps-title m-0 leading-[1.35] lg:mt-10"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
              initial={{ opacity: 0, y: -24 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Problem Statement
            </motion.h1>

            <motion.p
              className="ps-sub mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            >
              The challenge is live. Read the official mission briefing below and build your solution.
            </motion.p>
          </header>

          {/* Single Attractive Problem Statement Card */}
          <motion.article
            className="ps-card relative flex flex-col items-start p-6 sm:p-10"
            style={{ '--accent': ACCENT }}
            variants={cardVariants}
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
          >
            {/* Top glowing accent bar */}
            <div className="ps-card-bar" />

            {/* Header: Icon + Title & Badge */}
            <div className="flex w-full flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 pb-6 border-b-4 border-black/40">
              <div className="ps-slot shrink-0 my-0">
                <div className="ps-icon">{ps.image}</div>
              </div>
              <div className="min-w-0 flex-1">
                <span className="ps-chip mb-2">{ps.badge}</span>
                <h2 className="ps-card-title text-xl sm:text-2xl md:text-3xl m-0 leading-snug">
                  {ps.title}
                </h2>
              </div>
            </div>

            {/* Short Description (Just under the title as requested) */}
            <div className="w-full pt-6 pb-4">
              <div className="ps-desc-box">
                <p className="ps-card-desc m-0 text-lg sm:text-xl md:text-2xl text-[#b8fffe] leading-snug">
                  {ps.shortDescription}
                </p>
              </div>
            </div>

            {/* Body Content Sections */}
            <div className="w-full space-y-7 pt-4">
              {/* Context Section */}
              <section className="space-y-3">
                <h3 className="ps-section-heading">Mission Context</h3>
                {ps.fullContext.map((para, i) => (
                  <p key={i} className="text-[#e2e2e2] text-lg sm:text-xl leading-relaxed m-0">
                    {para}
                  </p>
                ))}
              </section>

              {/* Core Deliverables / Requirements */}
              <section className="space-y-3 pt-2">
                <h3 className="ps-section-heading">Key Deliverables</h3>
                <ul className="ps-checklist">
                  {ps.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </section>

              {/* Suggested Tech Stack */}
              <section className="space-y-3 pt-2">
                <h3 className="ps-section-heading">Suggested Tech Stack</h3>
                <div className="flex flex-wrap gap-2.5">
                  {ps.techStack.map((tech) => (
                    <span key={tech} className="ps-item">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Judging Criteria */}
              <section className="space-y-3 pt-2">
                <h3 className="ps-section-heading">Evaluation Rubric</h3>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {ps.evaluationRubric.map((r, i) => {
                    const pct = parseInt(r.percentage, 10);
                    return (
                      <div key={r.label} className="ps-rubric-card">
                        <div className="ps-rubric-top">
                          <span>{r.label}</span>
                          <strong className="text-[#55FFFF]">{r.percentage}</strong>
                        </div>
                        <div className="ps-xp mt-1.5">
                          <motion.div
                            className="ps-xp-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${(pct / maxPct) * 100}%` }}
                            transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.12 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </motion.article>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

.ps-page {
  --px: 'Press Start 2P', 'Courier New', monospace;
  --body: 'VT323', 'Courier New', monospace;
  --stone: #2f2f35;
  --stone-hi: #64646c;
  --stone-lo: #141418;
  --accent: #55FFFF;
  font-family: var(--body);
  font-size: 22px;
  line-height: 1.25;
}
.ps-page *, .ps-page *::before, .ps-page *::after { box-sizing: border-box; }
.ps-page .px { font-family: var(--px); font-weight: 400; }

/* ---------- background ---------- */
.ps-bg {
  position: fixed; inset: 0; z-index: 0;
  background-color: #1a2f4a;
  // background-image: linear-gradient(180deg, #0b1330 0%, #1d3557 45%, #2f6b4f 100%);
  background-size: cover; background-position: center; background-repeat: no-repeat;
}
.ps-shade {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,.6) 100%),
    // linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.55));
}

/* ---------- floating pixels ---------- */
.ps-particles { position: fixed; inset: 0; z-index: 2; pointer-events: none; overflow: hidden; }
.ps-particles span {
  position: absolute; bottom: -12px; opacity: 0;
  box-shadow: 0 0 8px currentColor;
  animation: ps-rise linear infinite;
}
@keyframes ps-rise {
  0%   { transform: translate(0, 0); opacity: 0; }
  10%  { opacity: .8; }
  50%  { transform: translate(var(--sway), -55vh); }
  90%  { opacity: .6; }
  100% { transform: translate(calc(var(--sway) * -1), -112vh); opacity: 0; }
}

/* ---------- title ---------- */
.ps-title {
  letter-spacing: .02em; color: #fff;
  font-family: var(--px);
  text-shadow: 0 4px 0 #8b8b8b, 0 8px 0 #3a3a3a, 0 12px 0 #000, 4px 4px 0 #000, -4px 4px 0 #000;
}
.ps-sub {
  max-width: 640px; margin-top: clamp(20px, 3vw, 28px);
  font-size: clamp(1.2rem, 2.2vw, 1.45rem);
  color: #e6e6e6; text-shadow: 2px 2px 0 #000;
}

/* ---------- stone panel ---------- */
.ps-card {
  background-color: var(--stone);
  background-image:
    linear-gradient(45deg, rgba(255,255,255,.03) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.03) 75%),
    linear-gradient(45deg, rgba(0,0,0,.15) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.15) 75%);
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
  box-shadow:
    inset 4px 4px 0 var(--stone-hi),
    inset -4px -4px 0 var(--stone-lo),
    0 0 0 4px #000,
    0 0 28px rgba(85, 255, 255, 0.15),
    12px 14px 0 4px rgba(0,0,0,.5);
}
.ps-card-bar {
  position: absolute; left: 4px; right: 4px; top: 4px; height: 8px;
  background: var(--accent); box-shadow: 0 0 16px var(--accent);
}

.ps-slot {
  width: 96px; height: 96px;
  display: grid; place-items: center;
  background: #1b1b20;
  border: 3px solid #000;
  box-shadow: inset 3px 3px 0 #000, inset -3px -3px 0 #4a4a52;
}
.ps-icon { width: 72px; height: 72px; }
.ps-icon svg { width: 100%; height: 100%; display: block; }

.ps-chip {
  display: inline-block; padding: 4px 8px;
  font-family: var(--px); font-size: .62rem; line-height: 1.2;
  color: #000; background: var(--accent);
  box-shadow: inset -2px -2px 0 rgba(0,0,0,.35), inset 2px 2px 0 rgba(255,255,255,.6);
}
.ps-card-title {
  font-family: var(--px); font-weight: 400;
  color: #fff; text-shadow: 2px 2px 0 #000;
}

.ps-desc-box {
  background: rgba(0, 0, 0, 0.35);
  border: 3px solid #000;
  box-shadow: inset 3px 3px 0 #000, inset -3px -3px 0 #3a3a42;
  padding: 16px 18px;
}
.ps-card-desc {
  font-family: var(--body);
  text-shadow: 1px 1px 0 #000;
}

.ps-section-heading {
  margin: 0;
  font-family: var(--px); font-size: 0.85rem; line-height: 1.4;
  color: var(--accent); text-shadow: 2px 2px 0 #000;
  text-transform: uppercase;
}

.ps-checklist { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.ps-checklist li {
  position: relative; padding-left: 28px; font-size: 1.35rem; line-height: 1.25; color: #ececec;
}
.ps-checklist li::before {
  content: '▶';
  position: absolute; left: 0; top: 0;
  color: var(--accent); font-size: 0.9rem;
}

.ps-item {
  display: inline-block; padding: 5px 12px;
  font-family: var(--px); font-size: 0.65rem; color: #fff;
  background: #1d1d22; border: 3px solid #000;
  box-shadow: inset 2px 2px 0 #4a4a52, inset -2px -2px 0 #111;
  text-shadow: 1px 1px 0 #000;
}

.ps-rubric-card {
  background: rgba(0, 0, 0, 0.28);
  border: 3px solid #000;
  box-shadow: inset 2px 2px 0 #000, inset -2px -2px 0 #3a3a40;
  padding: 12px 14px;
}
.ps-rubric-top {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 1.2rem; color: #e8e8e8;
}
.ps-rubric-top strong {
  font-family: var(--px); font-size: 0.72rem;
}

.ps-xp {
  height: 14px; background: #0b0b0d;
  border: 2px solid #000;
  box-shadow: inset 2px 2px 0 #000, inset -2px -2px 0 #2c2c30;
}
.ps-xp-fill {
  height: 100%;
  background: linear-gradient(90deg, #00aaaa, #55ffff);
  box-shadow: 0 0 10px rgba(85, 255, 255, 0.6);
}
`;
