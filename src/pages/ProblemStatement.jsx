import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import Navbar from '../components/Navbar'; // remove this line if your Navbar is rendered elsewhere
import Footer from "../components/Footer"

/* ------------------------------------------------------------------ */
/*  BACKGROUND IMAGE                                                   */
/*  Add your image later, e.g.                                         */
/*    import bgImage from '../assets/problem-bg.png';                  */
/*    const BG_IMAGE = bgImage;                                        */
/*  Until then a pixel-sky gradient is shown.                          */
/* ------------------------------------------------------------------ */
const BG_IMAGE = '';

/* Minecraft chat-colour accent per track */
const ACCENTS = {
  web3: '#55FFFF',
  'ai-agents': '#FF5555',
  cybersecurity: '#FFFF55',
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
export const problemStatementsData = [
  {
    id: 'web3',
    trackName: 'WEB3',
    title: 'DECENTRALIZED REALM GOVERNANCE',
    shortDescription: 'Construct a trustless voting and treasury protocol for on-chain guilds. Enable transparent ballot execution, cryptographic token staking, and fraud-proof community-driven decision pipelines.',
    fullContext: [
      'Decentralized Autonomous Organizations and on-chain guilds struggle with voter apathy, plutocratic token-weighted governance, and vulnerable treasury management protocols. In open virtual metaverses, decisions require both democratic consensus and automated cryptographic enforcement to protect community assets from rogue manipulation.',
      'Hackfusion participants are tasked with architecting a verifiable, tamper-resistant realm governance protocol. The system must coordinate quadratic voting mechanisms, time-locked multi-sig escrow vaults, and verifiable on-chain proposal execution for multi-tiered autonomous organizations.',
    ],
    requirements: [
      'Smart contracts implementing sybil-resistant quadratic voting ballots',
      'Time-locked treasury execution vault requiring multi-signature threshold authorization',
      'On-chain delegation framework with liquid voting power mechanics',
      'Interactive frontend portal showing active ballots, quorum progress, and treasury balances',
      'Verifiable audit trail logging proposal status and cryptographic execution proofs',
    ],
    techStack: ['Solidity', 'Ethereum / Polygon', 'Ethers.js / Viem', 'IPFS / Arweave', 'The Graph', 'OpenZeppelin'],
    evaluationRubric: [
      { label: 'Innovation & Mechanism Design', percentage: '30%' },
      { label: 'Technical Execution & Smart Contract Security', percentage: '30%' },
      { label: 'Feasibility & Architecture Scalability', percentage: '20%' },
      { label: 'UI/UX & Presentation Quality', percentage: '20%' },
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
  },
  {
    id: 'ai-agents',
    trackName: 'AI & AGENTS',
    title: 'AUTONOMOUS NPC ECOSYSTEM',
    shortDescription: 'Develop multi-agent autonomous swarms capable of dynamic resource trading, environment adaptation, and decentralized goal resolution across simulated virtual worlds.',
    fullContext: [
      'Virtual sandbox environments often suffer from scripted, predictable non-player characters that fail to realistically adapt to player behaviors, market shocks, and evolving world conditions. Traditional state-machine AI lacks persistent episodic memory and contextual goal planning.',
      'Your objective is to construct an autonomous swarm ecosystem of cognitive AI agents operating within an open simulated economy. Agents must perceive spatial stimuli, negotiate resource exchanges, maintain dynamic social relationships, and collaborate or compete to fulfill self-generated long-term goals.',
    ],
    requirements: [
      'Multi-agent cognitive decision pipeline with long-term vector memory retrieval',
      'Autonomous barter and market pricing negotiation engine driven by resource supply/demand',
      'Real-time LLM inference coordinator optimizing token efficiency and agent latency',
      'Interactive agent monitoring dashboard visualising spatial paths, thoughts, and dialogues',
      'Emergent behavior stress test evaluating agent survival and coordination under scarcity',
    ],
    techStack: ['Python', 'FastAPI', 'LangChain / LlamaIndex', 'ChromaDB / Pinecone', 'WebSockets', 'OpenAI / Anthropic APIs'],
    evaluationRubric: [
      { label: 'Autonomy & Cognitive Depth', percentage: '30%' },
      { label: 'Technical Execution & Latency Management', percentage: '30%' },
      { label: 'Economic Model & Swarm Feasibility', percentage: '20%' },
      { label: 'Visual Dashboard & Live Demo', percentage: '20%' },
    ],
    image: (
      <svg width="80" height="80" viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="3" y="3" width="10" height="10" fill="#2B0A0A" />
        <rect x="4" y="4" width="8" height="8" fill="#7A0000" />
        <rect x="5" y="5" width="6" height="6" fill="#C40000" />
        <rect x="6" y="6" width="4" height="4" fill="#FF2222" />
        <rect x="7" y="7" width="2" height="2" fill="#FFAAAA" />
        <rect x="7" y="1" width="2" height="2" fill="#FF3333" />
        <rect x="7" y="13" width="2" height="2" fill="#FF3333" />
        <rect x="1" y="7" width="2" height="2" fill="#FF3333" />
        <rect x="13" y="7" width="2" height="2" fill="#FF3333" />
      </svg>
    ),
  },
  {
    id: 'cybersecurity',
    trackName: 'CYBERSECURITY',
    title: 'REDSTONE CIPHER VAULT',
    shortDescription: 'Engineer a zero-knowledge intrusion detection system protecting distributed networks against adversarial packet manipulation and state exploit injections.',
    fullContext: [
      'Distributed peer-to-peer infrastructure is increasingly vulnerable to sophisticated man-in-the-middle exploits, state tampering, and adversarial packet injection. Centralized intrusion prevention systems introduce single points of failure and privacy leaks when inspecting sensitive network telemetry.',
      'Build a decentralized Zero-Knowledge intrusion detection and automated mitigation vault. The solution must cryptographically verify incoming node transactions, generate succinct zero-knowledge proofs for security compliance, and isolate anomalous peer nodes without revealing confidential payload data.',
    ],
    requirements: [
      'Zero-knowledge proof generator for private payload anomaly verification',
      'Real-time peer-to-peer packet sniffing and heuristic intrusion classification engine',
      'Automated quarantine and consensus-driven blacklist synchronization network',
      'Cryptographic verification bench validating zero-knowledge proof validity under 200ms',
      'Security incident response dashboard featuring active threat telemetry and mitigation logs',
    ],
    techStack: ['Rust', 'Circom / SnarkJS', 'libp2p', 'WebAssembly', 'TypeScript', 'Docker'],
    evaluationRubric: [
      { label: 'Cryptographic Rigor & Zero-Knowledge Validity', percentage: '30%' },
      { label: 'Technical Execution & Performance Overhead', percentage: '30%' },
      { label: 'Resilience & Adversarial Robustness', percentage: '20%' },
      { label: 'Documentation & Threat Model Analysis', percentage: '20%' },
    ],
    image: (
      <svg width="80" height="80" viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="3" y="2" width="10" height="2" fill="#CCCCCC" />
        <rect x="2" y="4" width="12" height="6" fill="#888888" />
        <rect x="3" y="10" width="10" height="2" fill="#888888" />
        <rect x="4" y="12" width="8" height="2" fill="#555555" />
        <rect x="6" y="14" width="4" height="1" fill="#222222" />
        <rect x="7" y="5" width="2" height="2" fill="#FFFF55" />
        <rect x="6" y="7" width="4" height="4" fill="#FFFF55" />
        <rect x="7" y="8" width="2" height="2" fill="#333333" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  MOTION SETTINGS                                                    */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1];

/* Cards only fade and rise a little (opacity + y), so nothing reflows. */
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  hover: { y: -10, transition: { type: 'spring', stiffness: 380, damping: 24 } },
};
const iconVariants = {
  hover: {
    y: [0, -8, 0],
    transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' },
  },
};

/* ------------------------------------------------------------------ */
/*  SMALL PIECES                                                       */
/* ------------------------------------------------------------------ */
const PARTICLE_COLORS = ['#55FF55', '#FFFF55', '#55FFFF', '#FFAA00', '#FF5555'];

/* Deterministic values so the layout is identical on every render */
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

function TrackCard({ problem, isSelected, onOpen }) {
  const accent = ACCENTS[problem.id] || '#55FF55';
  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      className={`ps-card relative flex flex-col items-start px-[18px] pb-5 pt-[26px] sm:px-6 sm:pb-6 sm:pt-7${
        isSelected ? ' is-selected' : ''
      }`}
      style={{ '--accent': accent }}
    >
      <div className="ps-card-bar" />
      {isSelected && (
        <motion.span
          className="ps-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        >
          Selected
        </motion.span>
      )}

      <div className="ps-slot">
        <motion.div className="ps-icon" variants={iconVariants}>
          {problem.image}
        </motion.div>
      </div>

      <span className="ps-chip">{problem.trackName}</span>
      <h2 className="ps-card-title">{problem.title}</h2>
      <p className="ps-card-desc">{problem.shortDescription}</p>

      <button type="button" className="ps-btn ps-btn-green w-full" onClick={onOpen}>
        Read the brief
      </button>
    </motion.article>
  );
}

function TrackModal({ track, isSelected, onClose, onConfirm }) {
  const closeRef = useRef(null);
  const accent = ACCENTS[track.id] || '#55FF55';
  const maxPct = Math.max(...track.evaluationRubric.map((r) => parseInt(r.percentage, 10)));

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="ps-backdrop"
      onMouseDown={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="ps-modal"
        style={{ '--accent': accent }}
        role="dialog"
        aria-modal="true"
        aria-label={track.title}
        onMouseDown={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        <header className="ps-modal-head">
          <div className="ps-modal-icon">{track.image}</div>
          <div className="min-w-0 flex-1">
            <span className="ps-chip">{track.trackName}</span>
            <h2 className="ps-modal-title">{track.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="ps-close"
            onClick={onClose}
            aria-label="Close"
          >
            X
          </button>
        </header>

        <div className="ps-modal-body">
          <section>
            <h3>Context</h3>
            {track.fullContext.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </section>

          <section>
            <h3>What you must build</h3>
            <ul className="ps-checklist">
              {track.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Suggested tech stack</h3>
            <div className="flex flex-wrap gap-2.5">
              {track.techStack.map((tech) => (
                <span key={tech} className="ps-item">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3>How you will be judged</h3>
            <div className="grid gap-4">
              {track.evaluationRubric.map((r, i) => {
                const pct = parseInt(r.percentage, 10);
                return (
                  <div key={r.label}>
                    <div className="ps-rubric-top">
                      <span>{r.label}</span>
                      <strong>{r.percentage}</strong>
                    </div>
                    <div className="ps-xp">
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

        <footer className="ps-modal-foot">
          <button type="button" className="ps-btn" onClick={onClose}>
            Back
          </button>
          <button type="button" className="ps-btn ps-btn-green" onClick={() => onConfirm(track)}>
            {isSelected ? 'Selected' : 'Select track'}
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}

function Toast({ track, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      className="ps-toast"
      role="status"
      style={{ '--accent': ACCENTS[track.id] || '#55FF55' }}
      onClick={onClose}
      initial={{ x: '115%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '115%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
    >
      <div className="ps-toast-icon">{track.image}</div>
      <div className="flex min-w-0 flex-col">
        <strong className="ps-toast-title">Track selected</strong>
        <span className="ps-toast-name">{track.trackName}</span>
      </div>
      <motion.div
        className="ps-toast-timer"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 4.5, ease: 'linear' }}
      />
    </motion.div>
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
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function ProblemStatement() {
  const [activeTrack, setActiveTrack] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [toast, setToast] = useState(null);
  const ready = useFontsReady();

  const closeModal = useCallback(() => setActiveTrack(null), []);
  const closeToast = useCallback(() => setToast(null), []);

  const confirmSelection = (track) => {
    setSelectedId(track.id);
    setActiveTrack(null);
    setToast({ key: Date.now(), track });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="ps-page relative flex min-h-screen flex-col overflow-x-hidden bg-[#0d1b2a] text-white">
        <style>{CSS}</style>

        <div
          className="ps-bg"
          style={BG_IMAGE ? { backgroundImage: `url(${BG_IMAGE})` } : undefined}
        />
        <div className="ps-shade" />
        <Particles />

        <Navbar />

        <main
          className="relative z-[5] mx-auto w-full max-w-[1240px] flex-1 px-4 pb-16 sm:px-8"
          style={{ paddingTop: 'clamp(96px, 14vh, 140px)' }}
        >
          <header className="relative mb-9 text-center sm:mb-16">
            <motion.h1
              className="ps-title px m-0 leading-[1.35]"
              style={{ fontSize: 'clamp(1.35rem, 5.2vw, 3.2rem)' }}
              initial={{ opacity: 0, y: -24 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Problem Statement
            </motion.h1>

            {/* <motion.span
              className="ps-splash px"
              aria-hidden="true"
              style={{ rotate: -14 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                ready
                  ? { opacity: 1, scale: [0.92, 1.08] }
                  : undefined
              }
              transition={{
                opacity: { duration: 0.3, delay: 0.5 },
                scale: {
                  duration: 1,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
              }}
            >
              Pick your track!
            </motion.span> */}

            <motion.p
              className="ps-sub mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            >
              Three tracks, one build. Open a card to read the full brief, the requirements and how
              judges will score you.
            </motion.p>
          </header>

          <motion.section
            aria-label="Tracks"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-stretch gap-5 sm:gap-8"
            variants={gridVariants}
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
          >
            {problemStatementsData.map((problem) => (
              <TrackCard
                key={problem.id}
                problem={problem}
                isSelected={selectedId === problem.id}
                onOpen={() => setActiveTrack(problem)}
              />
            ))}
          </motion.section>
        </main>

        <AnimatePresence>
          {activeTrack && (
            <TrackModal
              key={activeTrack.id}
              track={activeTrack}
              isSelected={selectedId === activeTrack.id}
              onClose={closeModal}
              onConfirm={confirmSelection}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {toast && <Toast key={toast.key} track={toast.track} onClose={closeToast} />}
        </AnimatePresence>
      </div>
      
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/*  Layout and motion live in Tailwind + motion above. This block only */
/*  holds the Minecraft look (bevels, textures, pixel fonts).          */
/* ------------------------------------------------------------------ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

.ps-page {
  --px: 'Press Start 2P', 'Courier New', monospace;
  --body: 'VT323', 'Courier New', monospace;
  --stone: #3a3a3a;
  --stone-hi: #686868;
  --stone-lo: #1b1b1b;
  --grass: #5d9c2f;
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
  background-image: linear-gradient(180deg, #0b1330 0%, #1d3557 45%, #2f6b4f 100%);
  background-size: cover; background-position: center; background-repeat: no-repeat;
}
.ps-shade {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,.6) 100%),
    linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.55));
}

/* ---------- floating pixels (CSS only, runs on the GPU) ---------- */
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

/* ---------- hero ---------- */
.ps-title {
  letter-spacing: .02em; color: #fff;
  text-shadow: 0 4px 0 #8b8b8b, 0 8px 0 #3a3a3a, 0 12px 0 #000, 4px 4px 0 #000, -4px 4px 0 #000;
}
.ps-splash {
  position: absolute;
  right: clamp(0px, 4vw, 70px);
  bottom: clamp(-26px, -2vw, -8px);
  font-size: clamp(.6rem, 1.6vw, 1rem);
  color: #FFFF55; text-shadow: 3px 3px 0 #3f3f15;
  white-space: nowrap; pointer-events: none;
}
.ps-sub {
  max-width: 620px; margin-top: clamp(28px, 4vw, 40px);
  font-size: clamp(1.25rem, 2.4vw, 1.6rem);
  color: #e6e6e6; text-shadow: 2px 2px 0 #000;
}

/* ---------- stone panel (shared) ---------- */
.ps-card, .ps-modal {
  background-color: var(--stone);
  background-image:
    linear-gradient(45deg, rgba(255,255,255,.035) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.035) 75%),
    linear-gradient(45deg, rgba(0,0,0,.12) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.12) 75%);
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
  box-shadow:
    inset 4px 4px 0 var(--stone-hi),
    inset -4px -4px 0 var(--stone-lo),
    0 0 0 4px #000,
    10px 10px 0 4px rgba(0,0,0,.45);
}

/* ---------- card ---------- */
.ps-card { transition: box-shadow .2s ease; }
.ps-card-bar {
  position: absolute; left: 4px; right: 4px; top: 4px; height: 8px;
  background: var(--accent); box-shadow: 0 0 14px var(--accent);
}
.ps-card:hover, .ps-card:focus-within {
  box-shadow:
    inset 4px 4px 0 var(--stone-hi),
    inset -4px -4px 0 var(--stone-lo),
    0 0 0 4px var(--accent),
    0 0 28px 4px var(--accent),
    10px 18px 0 4px rgba(0,0,0,.45);
}
.ps-card.is-selected {
  box-shadow:
    inset 4px 4px 0 var(--stone-hi),
    inset -4px -4px 0 var(--stone-lo),
    0 0 0 4px #55FF55,
    10px 10px 0 4px rgba(0,0,0,.45);
}
.ps-badge {
  position: absolute; top: 20px; right: 16px;
  padding: 6px 8px;
  font-family: var(--px); font-size: .55rem;
  color: #000; background: #55FF55;
  box-shadow: inset -3px -3px 0 #2e8a2e, inset 3px 3px 0 #b0ffb0;
}
.ps-slot {
  width: 112px; height: 112px; margin: 12px 0 20px;
  display: grid; place-items: center;
  background: #8b8b8b;
  box-shadow: inset 4px 4px 0 #373737, inset -4px -4px 0 #fff;
}
.ps-icon { width: 80px; height: 80px; }
.ps-icon svg, .ps-modal-icon svg, .ps-toast-icon svg { width: 100%; height: 100%; display: block; }

.ps-chip {
  display: inline-block; padding: 6px 8px;
  font-family: var(--px); font-size: .6rem; line-height: 1.2;
  color: #000; background: var(--accent);
  box-shadow: inset -3px -3px 0 rgba(0,0,0,.3), inset 3px 3px 0 rgba(255,255,255,.45);
}
.ps-card-title {
  margin: 16px 0 12px;
  font-family: var(--px); font-weight: 400;
  font-size: clamp(.8rem, 1.5vw, .95rem); line-height: 1.7;
  color: #fff; text-shadow: 2px 2px 0 #000;
}
.ps-card-desc { margin: 0 0 24px; flex: 1; font-size: 1.35rem; line-height: 1.2; color: #d8d8d8; }

/* ---------- buttons ---------- */
.ps-btn {
  appearance: none; cursor: pointer; border: 0;
  padding: 14px 18px; min-height: 48px;
  font-family: var(--px); font-size: .65rem; line-height: 1.3; color: #fff;
  text-shadow: 2px 2px 0 #3f3f3f;
  background: #8b8b8b;
  box-shadow: inset 3px 3px 0 #c6c6c6, inset -3px -3px 0 #555, 0 0 0 3px #000;
  transition: transform .08s ease, background-color .1s;
}
.ps-btn:hover { background: #7a8bd0; box-shadow: inset 3px 3px 0 #a9b6ee, inset -3px -3px 0 #4a578f, 0 0 0 3px #000; }
.ps-btn:active { transform: translateY(3px); }
.ps-btn-green { background: #5b8731; box-shadow: inset 3px 3px 0 #8fc65a, inset -3px -3px 0 #3a5a1c, 0 0 0 3px #000; }
.ps-btn-green:hover { background: #6fa63b; box-shadow: inset 3px 3px 0 #a6e06f, inset -3px -3px 0 #3f6720, 0 0 0 3px #000; }
.ps-page button:focus-visible { outline: 3px solid #FFFF55; outline-offset: 4px; }

/* ---------- modal ---------- */
.ps-backdrop {
  position: fixed; inset: 0; z-index: 100;
  display: flex; align-items: center; justify-content: center;
  padding: 16px; background: rgba(0,0,0,.78);
}
.ps-modal {
  width: 100%; max-width: 760px;
  max-height: calc(100dvh - 32px);
  display: flex; flex-direction: column;
}
.ps-modal-head {
  display: flex; align-items: center; gap: 16px;
  padding: 24px 24px 16px;
  border-bottom: 4px solid #000;
  background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 22%, transparent), transparent);
}
.ps-modal-icon {
  flex: none; width: 64px; height: 64px; padding: 6px; background: #8b8b8b;
  box-shadow: inset 4px 4px 0 #373737, inset -4px -4px 0 #fff;
}
.ps-modal-title {
  margin: 10px 0 0;
  font-family: var(--px); font-weight: 400;
  font-size: clamp(.75rem, 2.4vw, 1.05rem); line-height: 1.6;
  text-shadow: 2px 2px 0 #000;
}
.ps-close {
  flex: none; align-self: flex-start;
  width: 44px; height: 44px; padding: 0; cursor: pointer; border: 0;
  font-family: var(--px); font-size: .8rem; color: #fff;
  background: #a33a3a;
  box-shadow: inset 3px 3px 0 #e07a7a, inset -3px -3px 0 #5e1f1f, 0 0 0 3px #000;
}
.ps-close:hover { background: #c24a4a; }

.ps-modal-body {
  flex: 1; overflow-y: auto; overscroll-behavior: contain;
  padding: 8px 24px; scrollbar-color: var(--accent) #1b1b1b;
}
.ps-modal-body section { padding: 16px 0; }
.ps-modal-body section + section { border-top: 4px dashed rgba(0,0,0,.45); }
.ps-modal-body h3 {
  margin: 0 0 14px;
  font-family: var(--px); font-weight: 400; font-size: .72rem; line-height: 1.5;
  color: var(--accent); text-shadow: 2px 2px 0 #000;
}
.ps-modal-body p { margin: 0 0 12px; font-size: 1.4rem; line-height: 1.2; color: #e4e4e4; max-width: 70ch; }

.ps-checklist { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.ps-checklist li { position: relative; padding-left: 30px; font-size: 1.4rem; line-height: 1.2; color: #e4e4e4; }
.ps-checklist li::before {
  content: ''; position: absolute; left: 0; top: .2em; width: 16px; height: 16px;
  background: var(--accent);
  box-shadow: inset -3px -3px 0 rgba(0,0,0,.35), inset 3px 3px 0 rgba(255,255,255,.5), 0 0 0 2px #000;
}
.ps-item {
  padding: 8px 12px; font-size: 1.3rem; color: #fff; background: #8b8b8b;
  text-shadow: 2px 2px 0 #3f3f3f;
  box-shadow: inset 3px 3px 0 #373737, inset -3px -3px 0 #c6c6c6;
}
.ps-rubric-top { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 6px; font-size: 1.35rem; line-height: 1.15; }
.ps-rubric-top strong { font-weight: 400; color: #FFFF55; text-shadow: 2px 2px 0 #3f3f15; }
.ps-xp { height: 16px; background: #1b1b1b; box-shadow: 0 0 0 3px #000, inset 0 0 0 2px #555; }
.ps-xp-fill {
  height: 100%;
  background: repeating-linear-gradient(90deg, #7ddc3a 0 12px, #5ab227 12px 15px);
  box-shadow: 0 0 10px #7ddc3a;
}
.ps-modal-foot { display: flex; justify-content: flex-end; gap: 16px; padding: 16px 24px 24px; border-top: 4px solid #000; }

/* ---------- toast ---------- */
.ps-toast {
  position: fixed; z-index: 120; top: 16px; right: 16px;
  width: min(360px, calc(100vw - 32px));
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px 18px; cursor: pointer; background: #2b2b2b;
  box-shadow: inset 3px 3px 0 #5a5a5a, inset -3px -3px 0 #111, 0 0 0 3px #000, 0 0 22px var(--accent);
}
.ps-toast-icon { flex: none; width: 52px; height: 52px; padding: 4px; background: #8b8b8b; box-shadow: inset 3px 3px 0 #373737, inset -3px -3px 0 #fff; }
.ps-toast-title { font-family: var(--px); font-weight: 400; font-size: .62rem; line-height: 1.5; color: #FFFF55; text-shadow: 2px 2px 0 #3f3f15; }
.ps-toast-name { font-size: 1.4rem; color: #fff; }
.ps-toast-timer {
  position: absolute; left: 3px; bottom: 3px; height: 5px; width: calc(100% - 6px);
  background: var(--accent); transform-origin: left;
}

/* ---------- footer: grass, dirt, sign ---------- */
.ps-grass {
  height: 20px;
  background:
    linear-gradient(180deg, #7fc24a 0 6px, transparent 6px),
    repeating-linear-gradient(90deg, var(--grass) 0 16px, #4e8a26 16px 32px);
  border-top: 4px solid #000;
}
.ps-dirt {
  padding: 28px 16px 32px; display: flex; justify-content: center;
  background-color: #7a5230;
  background-image:
    linear-gradient(45deg, rgba(0,0,0,.18) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.18) 75%),
    linear-gradient(45deg, rgba(255,255,255,.06) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.06) 75%);
  background-size: 32px 32px; background-position: 0 0, 16px 16px;
}
.ps-sign {
  max-width: 100%; padding: 12px 20px; background: #b98a52; color: #2b1a08; text-align: center;
  box-shadow: inset 3px 3px 0 #d9ae78, inset -3px -3px 0 #7d5a2e, 0 0 0 3px #000;
}
.ps-sign span { font-family: var(--px); font-size: clamp(.5rem, 1.8vw, .7rem); line-height: 1.7; }

/* ---------- phones ---------- */
@media (max-width: 600px) {
  .ps-page { font-size: 20px; }
  .ps-splash { position: static; display: block; margin: 20px auto 0; width: fit-content; }
  .ps-modal-head { padding: 18px 16px 14px; gap: 12px; }
  .ps-modal-icon { width: 52px; height: 52px; }
  .ps-modal-body { padding: 4px 16px; }
  .ps-modal-foot { padding: 14px 16px 18px; gap: 12px; }
  .ps-modal-foot .ps-btn { flex: 1; }
  .ps-modal-body p, .ps-checklist li { font-size: 1.3rem; }
}

@media (prefers-reduced-motion: reduce) {
  .ps-particles { display: none; }
}
`;