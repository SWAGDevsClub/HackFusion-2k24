import { useState, useEffect } from 'react';
import { motion, MotionConfig } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bgImage from '../assets/ps_bg.webp';

const BG_IMAGE = bgImage;
const ACCENT = '#55FFFF'; // Diamond Cyan
const EMERALD = '#55FF55';
const GOLD = '#FFAA00';
const REDSTONE = '#FF5555';
const AMETHYST = '#C77DFF';
const LAPIS = '#5599FF';

/* ------------------------------------------------------------------ */
/*  OFFICIAL PROBLEM STATEMENT DATA                                     */
/* ------------------------------------------------------------------ */
export const problemStatementData = {
  id: 'agentic-grievance-redressal',
  badge: 'HACKFUSION 4.0 // OFFICIAL CHALLENGE',
  category: 'AGENTIC AI TRACK',
  title: 'Agentic AI for Intelligent Grievance Redressal',
  tagline:
    'Transform a traditional submit-and-wait grievance portal into an autonomous, proactive, multi-agent redressal ecosystem.',
  overview:
    'You have to build an Agentic AI System that transforms a traditional submit-and-wait grievance portal (college or district) into an intelligent redressal ecosystem. The system should behave like an expert grievance officer: understand voice/text complaints in multiple languages, consult similar past cases, detect duplicates, enforce sensitivity and policy rules, predict delays, and autonomously execute backend tasks such as routing, status updates and notifications, with human review wherever risk or uncertainty is high.',

  capabilities: [
    {
      id: 'intake',
      title: 'Conversational Intake',
      subtitle: 'Multimodal & Multilingual Interface',
      tag: 'VOICE + TEXT',
      tagColor: EMERALD,
      description:
        'A natural interface (text-based and voice-based) that accepts messy, human-like complaints in Marathi, Hindi or English and converts them into a structured draft (category, description, location, urgency, missing details) for the citizen to confirm before submission.',
      bullets: [
        'Voice & text intake handling informal, colloquial complaints',
        'Fluent support for Marathi, Hindi, and English',
        'Extracts structured payload: Category, Description, Location, Urgency, & Missing Details',
        'Citizen confirmation gate before final ticket submission',
      ],
      icon: (
        <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
          <rect x="3" y="2" width="10" height="8" fill="#55FF55" />
          <rect x="4" y="3" width="8" height="6" fill="#1b4d24" />
          <rect x="5" y="4" width="2" height="2" fill="#55FF55" />
          <rect x="9" y="4" width="2" height="2" fill="#55FF55" />
          <rect x="6" y="7" width="4" height="1" fill="#55FF55" />
          <rect x="4" y="10" width="3" height="3" fill="#55FF55" />
          <rect x="7" y="11" width="6" height="2" fill="#2b7a3a" />
          <rect x="11" y="13" width="2" height="2" fill="#55FF55" />
        </svg>
      ),
    },
    {
      id: 'safety',
      title: 'Safety & Policy Enforcement',
      subtitle: 'Grievance Category Master Gatekeeper',
      tag: 'SOURCE OF TRUTH',
      tagColor: REDSTONE,
      description:
        'The system must use the provided Grievance Category Master Sheet as its "Source of Truth." It must autonomously decide whether a case can be auto-resolved or must stay under human review, based on the "Sensitive" and "Identity-Hiding" flags and a confidence threshold. Sensitive cases must never be auto-closed.',
      bullets: [
        'Grievance Category Master Sheet strictly enforced as ground truth',
        'Autonomous evaluation of "Sensitive" & "Identity-Hiding" policy flags',
        'Confidence threshold gating for automatic decisions',
        'CRITICAL RULE: Sensitive cases must NEVER be auto-closed under any circumstances',
      ],
      icon: (
        <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
          <rect x="3" y="1" width="10" height="2" fill="#FF5555" />
          <rect x="2" y="3" width="12" height="6" fill="#7A0000" />
          <rect x="3" y="9" width="10" height="3" fill="#7A0000" />
          <rect x="5" y="12" width="6" height="2" fill="#FF5555" />
          <rect x="7" y="14" width="2" height="1" fill="#FF5555" />
          <rect x="7" y="4" width="2" height="4" fill="#FFAAAA" />
          <rect x="7" y="9" width="2" height="2" fill="#FFAAAA" />
        </svg>
      ),
    },
    {
      id: 'rag',
      title: 'Case Memory (RAG)',
      subtitle: 'Vector Store Semantic Retrieval',
      tag: 'EVIDENCE-BASED',
      tagColor: ACCENT,
      description:
        'Embed grievances in a vector store and retrieve the top-k similar cases from the Mock Grievance History. Retrieved cases are supporting evidence, not the final decision.',
      bullets: [
        'Dense semantic vector embeddings of inbound complaints',
        'Top-k similarity retrieval from the Mock Grievance History dataset',
        'Synthesizes past resolutions and precedents as supporting context',
        'Explainable evidence rationale supplied to both agents and reviewers',
      ],
      icon: (
        <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
          <rect x="2" y="2" width="12" height="12" fill="#55FFFF" />
          <rect x="3" y="3" width="10" height="10" fill="#003333" />
          <rect x="5" y="5" width="6" height="1" fill="#55FFFF" />
          <rect x="5" y="7" width="6" height="1" fill="#00AAAA" />
          <rect x="5" y="9" width="4" height="1" fill="#55FFFF" />
          <rect x="11" y="9" width="2" height="2" fill="#FFAA00" />
        </svg>
      ),
    },
    {
      id: 'dedup',
      title: 'Duplicate Detection & Grouping',
      subtitle: 'Semantic, Temporal & Geo Clustering',
      tag: 'NO SILENT DROPS',
      tagColor: GOLD,
      description:
        'Use semantic similarity, location and time windows to group related complaints into one incident. Every grievance keeps its own reference number and updates; never silently merge or discard a complaint.',
      bullets: [
        'Multi-factor clustering: semantic embeddings + geographic location + time windows',
        'Consolidates related reports into single root incidents',
        'Preserves unique tracking reference numbers for every citizen',
        'Zero silent drops: every grievance receives individual updates & status notifications',
      ],
      icon: (
        <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
          <rect x="2" y="4" width="6" height="6" fill="#FFAA00" />
          <rect x="3" y="5" width="4" height="4" fill="#3D2800" />
          <rect x="8" y="2" width="6" height="6" fill="#FFAA00" />
          <rect x="9" y="3" width="4" height="4" fill="#3D2800" />
          <rect x="6" y="8" width="6" height="6" fill="#FFFF55" />
          <rect x="7" y="9" width="4" height="4" fill="#665500" />
        </svg>
      ),
    },
    {
      id: 'predictive',
      title: 'Predictive Intelligence',
      subtitle: 'Proactive SLA Breach Escalation',
      tag: 'PROACTIVE AI',
      tagColor: AMETHYST,
      description:
        'The system must be "Proactive." Based on the Mock Grievance History and configured SLAs, it should identify cases likely to breach their deadline or recur, and raise an escalation alert before the delay occurs.',
      bullets: [
        'Analyzes historical resolution durations against configured department SLAs',
        'Identifies tickets at high risk of deadline breach or chronic recurrence',
        'Dispatches pre-emptive escalation alerts before breaches materialize',
        'Surfaces bottleneck insights directly to department supervisors',
      ],
      icon: (
        <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
          <rect x="4" y="2" width="8" height="2" fill="#C77DFF" />
          <rect x="5" y="4" width="6" height="2" fill="#4B0082" />
          <rect x="7" y="6" width="2" height="4" fill="#C77DFF" />
          <rect x="5" y="10" width="6" height="2" fill="#4B0082" />
          <rect x="4" y="12" width="8" height="2" fill="#C77DFF" />
          <rect x="2" y="7" width="2" height="2" fill="#FFFF55" />
          <rect x="12" y="7" width="2" height="2" fill="#FFFF55" />
        </svg>
      ),
    },
    {
      id: 'tooluse',
      title: 'Real-world Action (Tool Use)',
      subtitle: 'Autonomous Backend Execution',
      tag: 'AGENTIC TOOLS',
      tagColor: LAPIS,
      description:
        'The system shouldn’t just "talk." It must execute actions such as updating your mock database, assigning the responsible department, triggering webhooks (mock webhooks or n8n/Zapier), or sending status updates via channels like email, WhatsApp.',
      bullets: [
        'Executes state changes directly in the mock database/backend',
        'Autonomous assignment to designated department assignees',
        'Dispatches webhooks to trigger external workflows (mock/n8n/Zapier)',
        'Delivers real-time status updates via simulated channels (email, WhatsApp)',
      ],
      icon: (
        <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
          <rect x="11" y="2" width="3" height="3" fill="#5599FF" />
          <rect x="9" y="5" width="3" height="3" fill="#5599FF" />
          <rect x="7" y="7" width="3" height="3" fill="#2244AA" />
          <rect x="5" y="9" width="3" height="3" fill="#888888" />
          <rect x="3" y="11" width="3" height="3" fill="#555555" />
          <rect x="2" y="13" width="2" height="2" fill="#333333" />
        </svg>
      ),
    },
  ],

  dataAssets: [
    {
      number: '1',
      title: 'Grievance Category Master',
      format: 'Excel / CSV',
      desc: 'Contains categories and subcategories, responsible department, default assignee, SLA days, and "Sensitive" / "Identity-Hiding" flags.',
      badges: ['Master Source', 'SLA Config', 'Security Flags'],
    },
    {
      number: '2',
      title: 'Mock Grievance History',
      format: 'Excel / CSV',
      desc: 'Contains anonymised past grievances with complaint text, category, broad location, submission and resolution dates, status, resolution text and feedback.',
      badges: ['RAG Vector Store', 'Historical SLA', 'Resolution Precedents'],
    },
    {
      number: '3',
      title: 'Department Directory',
      format: 'Excel / CSV',
      desc: 'Contains departments, jurisdiction mapping and contact channels for routing and notifications.',
      badges: ['Jurisdiction Map', 'Routing Channels', 'Officer Contacts'],
    },
  ],

  backendRules: [
    {
      title: 'No CMS Provided',
      desc: 'You must build a mock API / Backend service to host and serve the provided data assets.',
    },
    {
      title: 'Full Agent Interaction',
      desc: 'Agents must interact with this backend to read categories, check history, write new grievances, and update status and assignment.',
    },
    {
      title: 'Mandatory AI_SYSTEM Actor Logging',
      desc: 'Every AI action must be logged under a reserved AI_SYSTEM actor (model, confidence, timestamp, reasoning) so reviewers can tell whether a human or the AI handled the case.',
    },
  ],

  observability: {
    title: 'Observability & Chain of Thought (MANDATORY)',
    tag: 'NON-NEGOTIABLE',
    quote: 'Since this is an agentic system, traceability is non-negotiable.',
    points: [
      'Must integrate an observability platform (e.g., Langfuse, LangSmith).',
      'The judges must be able to see the Chain of Thought (CoT): How the Intake Agent talked to the Policy Agent, which cases were retrieved, and why auto-resolution was approved or rejected.',
      'Submissions without a live Trace Log link is a must.',
    ],
  },

  uiRequirements: [
    {
      title: 'Citizen Chat Interface',
      desc: 'Chat-based interface to submit and track complaints. Voice and Marathi / Hindi support are high-value priorities.',
      tag: 'CITIZEN FACING',
    },
    {
      title: 'Officer / Admin View',
      desc: 'Queue showing AI summary, sentiment, confidence, policy-gate reason, duplicate groups, and any "SLA Breach / Escalation" alerts generated.',
      tag: 'ADMIN VIEW',
    },
    {
      title: 'Workflow Automation',
      desc: 'When a grievance is routed, resolved or escalated, agents must trigger a department work-order or escalation request via mock Webhook or API.',
      tag: 'WEBHOOK / API',
    },
    {
      title: 'Citizen Dispute Mechanism',
      desc: 'Citizens must be able to confirm or dispute a resolution; a dispute reopens the case automatically.',
      tag: 'DISPUTE LOOP',
    },
    {
      title: 'Optional Bonuses',
      desc: 'Automate confirmation emails / WhatsApp messages, a GIS hotspot map, or image-based before/after verification.',
      tag: 'BONUS CREDITS',
    },
  ],

  responsibleAiRules: [
    {
      rule: 'No Automated Rejections or Liability',
      desc: 'AI must not automatically reject a grievance, determine legal liability, or close a sensitive case.',
      severity: 'CRITICAL',
    },
    {
      rule: 'Holistic Priority Scoring',
      desc: 'Priority should reflect severity, urgency and affected population, not just the raw number of submissions.',
      severity: 'POLICY',
    },
    {
      rule: 'Full Explainability',
      desc: 'Every decision must be explainable: show confidence, retrieved past cases, and the exact policy rule applied.',
      severity: 'AUDIT',
    },
    {
      rule: 'No Fabricated Truths',
      desc: 'Do not present AI summaries, risk scores or image assessments as verified facts.',
      severity: 'ETHICS',
    },
  ],

  evaluationRubric: [
    { label: 'Real-world problem understanding', percentage: '20%' },
    { label: 'Technical quality & working agentic implementation', percentage: '20%' },
    { label: 'Innovation and appropriate AI use', percentage: '15%' },
    { label: 'Feasibility and integration potential', percentage: '15%' },
    { label: 'Security, privacy and responsible AI', percentage: '10%' },
    { label: 'Accessibility and inclusion (language, voice)', percentage: '10%' },
    { label: 'Observability, traceability and demo quality', percentage: '10%' },
  ],

  submissionChecklist: [
    {
      id: 'repo',
      title: 'GitHub Repository',
      desc: 'Clean code repository with comprehensive README for your Mock APIs and architecture.',
    },
    {
      id: 'trace',
      title: 'Observability Public Link',
      desc: 'Publicly accessible dashboard link to view your live agentic trace logs (e.g. Langfuse / LangSmith).',
    },
    {
      id: 'video',
      title: 'Demo Walkthrough Video (2 to 5 minutes)',
      desc: 'Demonstrate: 1 auto-resolved routine case, 1 sensitive case kept in human review, and 1 duplicate or escalation scenario.',
    },
  ],
};

// Backwards-compatible export for any legacy consumers
export const demoProblemStatement = problemStatementData;
export const problemStatementsData = [problemStatementData];

/* ------------------------------------------------------------------ */
/*  MOTION SETTINGS                                                    */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/*  FLOATING PARTICLES                                                 */
/* ------------------------------------------------------------------ */
const PARTICLE_COLORS = ['#55FF55', '#FFFF55', '#55FFFF', '#FFAA00', '#FF5555', '#C77DFF'];

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 41 + 7) % 100,
  size: 4 + (i % 3) * 2,
  duration: 9 + (i % 6) * 2.2,
  delay: -((i * 1.4) % 14),
  sway: ((i % 5) - 2) * 16,
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

/* Wait for pixel fonts */
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
  const ps = problemStatementData;
  const maxPct = Math.max(...ps.evaluationRubric.map((r) => parseInt(r.percentage, 10)));

  // Interactive state for checklist
  const [checkedItems, setCheckedItems] = useState({
    repo: false,
    trace: false,
    video: false,
  });

  const [copied, setCopied] = useState(false);

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyBriefToClipboard = () => {
    const text = `HACKFUSION 4.0 - PROBLEM STATEMENT
=====================================================
Title: ${ps.title}
Track: ${ps.category}

OVERVIEW:
${ps.overview}

CORE AGENTIC CAPABILITIES:
1. Conversational Intake: Text & Voice (Marathi, Hindi, English), structured draft generation.
2. Safety & Policy Enforcement: Category Master as Source of Truth. Sensitive cases NEVER auto-closed.
3. Case Memory (RAG): Vector store retrieval from Mock Grievance History as supporting evidence.
4. Duplicate Detection & Incident Grouping: Semantic + Geo + Time clustering. No silent drops.
5. Predictive Intelligence: Proactive SLA breach & recurrence prediction before delay occurs.
6. Real-world Action (Tool Use): Updates mock DB, assigns dept, triggers webhooks (n8n/Zapier).

OBSERVABILITY (MANDATORY):
- Langfuse / LangSmith live tracing required. Chain of Thought must be inspectable.

EVALUATION RUBRIC:
${ps.evaluationRubric.map((r) => `- ${r.label}: ${r.percentage}`).join('\n')}

SUBMISSION CHECKLIST:
- GitHub Repo with Mock API README
- Live Trace Log Link (Langfuse/LangSmith)
- Demo Walkthrough Video (2 to 5 mins)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="ps-page relative flex min-h-screen flex-col overflow-x-hidden text-white">
        <style>{CSS}</style>

        {/* Background & Atmosphere */}
        <div
          className="ps-bg"
          style={BG_IMAGE ? { backgroundImage: `url(${BG_IMAGE})` } : undefined}
        />
        <div className="ps-shade" />
        <Particles />

        <Navbar />

        <main
          className="relative z-[5] mx-auto w-full max-w-5xl flex-1 px-4 pb-24 sm:px-6 lg:px-8"
          style={{ paddingTop: 'clamp(96px, 13vh, 135px)' }}
        >
          {/* Top Floating Copy Feedback */}
          {copied && (
            <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-3 bg-[#111116] border-2 border-[#55FF55] px-4 py-3 shadow-[0_0_20px_rgba(85,255,85,0.4)] animate-bounce sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm">
              <span className="text-[#55FF55] text-lg shrink-0">✔</span>
              <span className="font-['Press_Start_2P',monospace] text-[10px] leading-relaxed text-[#55FF55] sm:text-xs">
                BRIEF COPIED TO INVENTORY!
              </span>
            </div>
          )}

          {/* ============================================================== */}
          {/*  HERO / HEADER                                                 */}
          {/* ============================================================== */}
          <header className="relative mb-10 text-center sm:mb-14">
            <motion.h1
              className="ps-title m-0 leading-[1.25] text-center mt-0 md:mt-7 text-3xl md:text-5xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={ready ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              Problem Statement
            </motion.h1>

            <motion.p
              className="ps-sub mx-auto text-[#d4efff] leading-snug"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              {ps.tagline}
            </motion.p>

            {/* Quick Navigation Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
            >
              <button
                onClick={() => scrollToSection('overview-section')}
                className="ps-nav-pill"
              >
                📜 Overview
              </button>
              <button
                onClick={() => scrollToSection('capabilities-section')}
                className="ps-nav-pill"
              >
                ⚡ 6 Agentic Powers
              </button>
              <button
                onClick={() => scrollToSection('data-backend-section')}
                className="ps-nav-pill"
              >
                📦 Data & Backend
              </button>
              <button
                onClick={() => scrollToSection('observability-section')}
                className="ps-nav-pill text-[#C77DFF] border-[#C77DFF]/60"
              >
                👁️ Observability
              </button>
              <button
                onClick={() => scrollToSection('ui-workflow-section')}
                className="ps-nav-pill"
              >
                🖥️ UI & Workflows
              </button>
              <button
                onClick={() => scrollToSection('responsible-ai-section')}
                className="ps-nav-pill text-[#FF5555] border-[#FF5555]/60"
              >
                🛡️ Responsible AI
              </button>
              <button
                onClick={() => scrollToSection('rubric-section')}
                className="ps-nav-pill text-[#55FFFF] border-[#55FFFF]/60"
              >
                📊 Rubric
              </button>
              <button
                onClick={() => scrollToSection('checklist-section')}
                className="ps-nav-pill text-[#55FF55] border-[#55FF55]/60"
              >
                ✅ Checklist
              </button>
              <button
                onClick={copyBriefToClipboard}
                className="ps-nav-pill bg-[#FFAA00]/20 text-[#FFAA00] border-[#FFAA00] hover:bg-[#FFAA00]/40 transition-colors"
                title="Copy entire problem statement to clipboard"
              >
                📋 Copy Brief
              </button>
            </motion.div>
          </header>

          {/* ============================================================== */}
          {/*  SECTION 1: OVERVIEW & MISSION STATEMENT                      */}
          {/* ============================================================== */}
          <section id="overview-section" className="mb-12 scroll-mt-28">
            <motion.article
              className="ps-card relative p-6 sm:p-9"
              variants={cardVariants}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            >
              <div className="ps-card-bar" style={{ background: ACCENT }} />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b-2 border-black/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="ps-slot-sm shrink-0">
                    <svg viewBox="0 0 16 16" className="w-6 h-6" shapeRendering="crispEdges">
                      <rect x="2" y="2" width="12" height="12" fill="#55FFFF" />
                      <rect x="4" y="4" width="8" height="8" fill="#141418" />
                      <rect x="6" y="6" width="4" height="4" fill="#55FFFF" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="ps-section-eyebrow">MISSION DIRECTIVE</span>
                    <h2 className="ps-section-title text-xl sm:text-2xl m-0 text-white">
                      Executive Overview
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#55FFFF] font-mono">
                  <span className="inline-block w-2.5 h-2.5 bg-[#55FFFF] animate-ping" />
                  <span>PARADIGM SHIFT</span>
                </div>
              </div>

              <div className="pt-6 space-y-6">
                <div className="ps-callout-box border-l-4 border-[#55FFFF]">
                  <p className="m-0 text-xl sm:text-2xl leading-relaxed text-[#f0f9ff]">
                    {ps.overview}
                  </p>
                </div>

                {/* Paradigm Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="ps-compare-card border-red-500/40 bg-red-950/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#FF5555] text-lg font-bold">✕</span>
                      <h4 className="font-['Press_Start_2P',monospace] text-xs text-[#FF5555] m-0 leading-relaxed">
                        Traditional Portals
                      </h4>
                    </div>
                    <ul className="text-lg space-y-1.5 text-[#e0cfcf] list-none p-0 m-0">
                      <li>• Rigid submit-and-wait forms</li>
                      <li>• Language barriers & lost colloquial nuances</li>
                      <li>• Siloed departments with manual dispatch delays</li>
                      <li>• Duplicate complaints choke queues silently</li>
                      <li>• Reactive triage only after deadlines breach</li>
                    </ul>
                  </div>

                  <div className="ps-compare-card border-emerald-500/40 bg-emerald-950/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#55FF55] text-lg font-bold">✔</span>
                      <h4 className="font-['Press_Start_2P',monospace] text-xs text-[#55FF55] m-0 leading-relaxed">
                        HackFusion Agentic Redressal
                      </h4>
                    </div>
                    <ul className="text-lg space-y-1.5 text-[#cfe0d4] list-none p-0 m-0">
                      <li>• Conversational intake in Marathi, Hindi & English</li>
                      <li>• Voice-enabled messy human complaint structuring</li>
                      <li>• Vector RAG memory referencing past precedents</li>
                      <li>• Proactive SLA breach alerts before delays occur</li>
                      <li>• Autonomous tool execution with policy gates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          </section>

          {/* ============================================================== */}
          {/*  SECTION 2: 6 CORE AGENTIC CAPABILITIES                        */}
          {/* ============================================================== */}
          <section id="capabilities-section" className="mb-12 scroll-mt-28">
            <div className="text-center mb-8">
              <span className="ps-section-eyebrow text-[#FFAA00]">
                CORE FUNCTIONAL REQUIREMENTS
              </span>
              <h2 className="ps-section-title ps-lg text-2xl sm:text-3xl text-white mt-1">
                The 6 Agentic Capabilities
              </h2>
              <p className="ps-sub text-[#c8d6e5] mx-auto text-lg sm:text-xl mt-2 max-w-2xl">
                Your system will be judged on its ability to autonomously orchestrate these six capabilities:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ps.capabilities.map((cap, idx) => (
                <motion.article
                  key={cap.id}
                  className="ps-card relative p-6 flex flex-col justify-between min-w-0"
                  variants={cardVariants}
                  initial="hidden"
                  animate={ready ? 'show' : 'hidden'}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div
                    className="ps-card-bar"
                    style={{ background: cap.tagColor, boxShadow: `0 0 12px ${cap.tagColor}` }}
                  />

                  <div>
                    {/* Header */}
                    <div className="flex items-start gap-4 pb-4 border-b-2 border-black/40">
                      <div className="ps-slot shrink-0 my-0">
                        <div className="ps-icon">{cap.icon}</div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span
                            className="ps-chip text-[9px] px-2 py-0.5"
                            style={{ background: cap.tagColor, color: '#000' }}
                          >
                            {cap.tag}
                          </span>
                          <span className="font-['Press_Start_2P',monospace] text-[10px] text-white/50 shrink-0">
                            0{idx + 1}
                          </span>
                        </div>
                        <h3 className="ps-card-title text-lg sm:text-xl m-0 leading-tight">
                          {cap.title}
                        </h3>
                        <p className="font-['Press_Start_2P',monospace] text-[10px] leading-relaxed text-[#55FFFF] mt-1 m-0">
                          {cap.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Summary Description */}
                    <p className="text-lg leading-relaxed text-[#e6f1f5] my-4">
                      {cap.description}
                    </p>

                    {/* Technical Bullets */}
                    <div className="space-y-2 pt-2 border-t border-black/40">
                      <span className="font-['Press_Start_2P',monospace] text-[9px] text-[#FFAA00] tracking-wider block">
                        KEY SPECS & BEHAVIORS:
                      </span>
                      <ul className="ps-checklist text-base space-y-1.5">
                        {cap.bullets.map((b, i) => (
                          <li
                            key={i}
                            className={
                              b.includes('NEVER')
                                ? 'text-[#ff9999] font-bold'
                                : 'text-[#d8d8d8]'
                            }
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Safety flag highlight if applicable */}
                  {cap.id === 'safety' && (
                    <div className="mt-4 p-2.5 bg-[#FF5555]/15 border-2 border-[#FF5555] text-[10px] sm:text-xs leading-relaxed font-['Press_Start_2P',monospace] text-[#FFAAAA] flex items-center gap-2">
                      <span className="text-[#FF5555] text-sm shrink-0">⚠</span>
                      <span className="min-w-0">SENSITIVE CASES MUST NEVER BE AUTO-CLOSED!</span>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/*  SECTION 3: DATA & ENVIRONMENT (ASSETS + BACKEND)              */}
          {/* ============================================================== */}
          <section id="data-backend-section" className="mb-12 scroll-mt-28">
            <motion.article
              className="ps-card relative p-6 sm:p-9"
              variants={cardVariants}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            >
              <div className="ps-card-bar" style={{ background: GOLD }} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-black/50">
                <div className="min-w-0">
                  <span className="ps-section-eyebrow text-[#FFAA00]">DATA & ENVIRONMENT</span>
                  <h2 className="ps-section-title text-xl sm:text-2xl m-0 text-white">
                    Data Assets & Mock Backend
                  </h2>
                </div>
                <span className="ps-chip bg-[#FFAA00] text-black self-start sm:self-auto">CSV / EXCEL SPECS</span>
              </div>

              {/* Data Assets */}
              <div className="mt-6">
                <h3 className="font-['Press_Start_2P',monospace] text-xs sm:text-sm leading-relaxed text-[#55FFFF] mb-4">
                  A. Three Core Data Assets Provided:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ps.dataAssets.map((asset) => (
                    <div key={asset.number} className="ps-inner-panel flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-['Press_Start_2P',monospace] text-xs text-[#FFAA00]">
                            ASSET #{asset.number}
                          </span>
                          <span className="font-['Press_Start_2P',monospace] text-[9px] bg-black/60 px-2 py-0.5 text-white/80 border border-white/20 shrink-0">
                            {asset.format}
                          </span>
                        </div>
                        <h4 className="font-['Press_Start_2P',monospace] text-xs text-white leading-relaxed mb-2">
                          {asset.title}
                        </h4>
                        <p className="text-base text-[#cfd8dc] leading-relaxed">
                          {asset.desc}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-black/40">
                        {asset.badges.map((b) => (
                          <span
                            key={b}
                            className="font-['Press_Start_2P',monospace] text-[8px] bg-[#111] px-1.5 py-0.5 text-[#55FFFF]"
                          >
                            #{b}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock Backend Rules */}
              <div className="mt-8 pt-6 border-t-2 border-black/50">
                <h3 className="font-['Press_Start_2P',monospace] text-xs sm:text-sm leading-relaxed text-[#55FF55] mb-4">
                  B. Mock Backend & Audit Actor Requirements:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ps.backendRules.map((rule, idx) => (
                    <div key={idx} className="ps-inner-panel min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-[#55FF55] font-['Press_Start_2P',monospace] text-xs shrink-0">
                          [0{idx + 1}]
                        </span>
                        <h4 className="font-['Press_Start_2P',monospace] text-xs text-white leading-relaxed m-0 min-w-0">
                          {rule.title}
                        </h4>
                      </div>
                      <p className="text-base text-[#d0dcdc] leading-relaxed m-0">
                        {rule.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* AI_SYSTEM Callout */}
                <div className="mt-5 p-4 bg-[#141418] border-2 border-[#55FF55] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[inset_2px_2px_0_#2b7a3a]">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0">🤖</span>
                    <div className="min-w-0">
                      <span className="font-['Press_Start_2P',monospace] text-[10px] sm:text-xs leading-relaxed text-[#55FF55] block">
                        AUDIT ACTOR FORMAT SPECIFICATION
                      </span>
                      <p className="font-mono text-xs sm:text-sm text-[#99e6aa] m-0 break-words">
                        {'{ actor: "AI_SYSTEM", model: "gpt-4o / gemini", confidence: 0.94, timestamp: "...", reasoning: "..." }'}
                      </p>
                    </div>
                  </div>
                  <span className="font-['Press_Start_2P',monospace] text-[9px] bg-[#55FF55] text-black px-2.5 py-1 shrink-0 self-start sm:self-auto">
                    MANDATORY LOG
                  </span>
                </div>
              </div>
            </motion.article>
          </section>

          {/* ============================================================== */}
          {/*  SECTION 4: OBSERVABILITY (MANDATORY BEACON)                  */}
          {/* ============================================================== */}
          <section id="observability-section" className="mb-12 scroll-mt-28">
            <motion.article
              className="ps-card relative p-6 sm:p-9 border-2 border-[#C77DFF]"
              variants={cardVariants}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            >
              <div
                className="ps-card-bar"
                style={{ background: AMETHYST, boxShadow: '0 0 16px #C77DFF' }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-black/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="ps-slot-sm bg-[#2b1040] shrink-0">
                    <svg viewBox="0 0 16 16" className="w-6 h-6" shapeRendering="crispEdges">
                      <rect x="4" y="2" width="8" height="12" fill="#C77DFF" />
                      <rect x="6" y="4" width="4" height="8" fill="#FFFFFF" />
                      <rect x="7" y="6" width="2" height="4" fill="#6B00B6" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="ps-section-eyebrow text-[#C77DFF]">
                      CRITICAL COMPLIANCE
                    </span>
                    <h2 className="ps-section-title text-xl sm:text-2xl m-0 text-white">
                      C. Observability (Mandatory)
                    </h2>
                  </div>
                </div>
                <span className="ps-chip bg-[#C77DFF] text-black font-bold animate-pulse self-start sm:self-auto">
                  TRACEABILITY IS NON-NEGOTIABLE
                </span>
              </div>

              <div className="pt-6 space-y-6">
                <div className="p-4 bg-[#231230] border-2 border-[#C77DFF] text-[#f2e6ff]">
                  <p className="font-['Press_Start_2P',monospace] text-[10px] sm:text-xs leading-relaxed text-[#FFD6FF] m-0">
                    &ldquo;Since this is an agentic system, traceability is non-negotiable.&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="ps-inner-panel border-[#C77DFF]/40 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-['Press_Start_2P',monospace] text-xs text-[#C77DFF]">01</span>
                      <h4 className="font-['Press_Start_2P',monospace] text-xs text-white m-0 leading-relaxed">
                        Integrated Platform
                      </h4>
                    </div>
                    <p className="text-base text-[#e0d0f0] leading-relaxed m-0">
                      You must integrate an observability platform (e.g., <strong>Langfuse</strong>, <strong>LangSmith</strong>).
                    </p>
                  </div>

                  <div className="ps-inner-panel border-[#C77DFF]/40 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-['Press_Start_2P',monospace] text-xs text-[#C77DFF]">02</span>
                      <h4 className="font-['Press_Start_2P',monospace] text-xs text-white m-0 leading-relaxed">
                        Chain of Thought (CoT)
                      </h4>
                    </div>
                    <p className="text-base text-[#e0d0f0] leading-relaxed m-0">
                      Judges must see how the Intake Agent talked to the Policy Agent, which cases were retrieved, and why auto-resolution was approved or rejected.
                    </p>
                  </div>

                  <div className="ps-inner-panel border-[#C77DFF]/40 bg-[#351040]/40 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-['Press_Start_2P',monospace] text-xs text-[#FF5555]">03</span>
                      <h4 className="font-['Press_Start_2P',monospace] text-xs text-[#FFAAAA] m-0 leading-relaxed">
                        Live Trace Link
                      </h4>
                    </div>
                    <p className="text-base text-[#ffd0d0] leading-relaxed m-0">
                      <strong>Submissions without a live Trace Log link is a must</strong>. Include public dashboard access in your submission.
                    </p>
                  </div>
                </div>

                {/* CoT Visual Pipe */}
                <div className="p-3 bg-black/60 border border-white/20">
                  <span className="font-['Press_Start_2P',monospace] text-[9px] leading-relaxed text-[#C77DFF] block mb-2">
                    EXPECTED AGENTIC TRACE PIPELINE:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#e6f1ff]">
                    <span className="px-2 py-1 bg-[#1a1a24] border border-[#55FF55] max-w-full">Intake Agent (Audio/Text)</span>
                    <span className="text-[#55FFFF]">➜</span>
                    <span className="px-2 py-1 bg-[#1a1a24] border border-[#FFAA00] max-w-full">Vector RAG Retrieval</span>
                    <span className="text-[#55FFFF]">➜</span>
                    <span className="px-2 py-1 bg-[#1a1a24] border border-[#FF5555] max-w-full">Policy Agent (Master Gate)</span>
                    <span className="text-[#55FFFF]">➜</span>
                    <span className="px-2 py-1 bg-[#1a1a24] border border-[#C77DFF] max-w-full">Decision (Auto-resolve or Human Queue)</span>
                    <span className="text-[#55FFFF]">➜</span>
                    <span className="px-2 py-1 bg-[#1a1a24] border border-[#5599FF] max-w-full">Webhook / Notification Action</span>
                  </div>
                </div>
              </div>
            </motion.article>
          </section>

          {/* ============================================================== */}
          {/*  SECTION 5: MINIMAL UI & WORKFLOW AUTOMATION                   */}
          {/* ============================================================== */}
          <section id="ui-workflow-section" className="mb-12 scroll-mt-28">
            <motion.article
              className="ps-card relative p-6 sm:p-9"
              variants={cardVariants}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            >
              <div className="ps-card-bar" style={{ background: LAPIS }} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-black/50">
                <div className="min-w-0">
                  <span className="ps-section-eyebrow text-[#5599FF]">USER EXPERIENCE & INTEGRATIONS</span>
                  <h2 className="ps-section-title text-xl sm:text-2xl m-0 text-white">
                    UI Specifications & Workflow Automation
                  </h2>
                </div>
                <span className="ps-chip bg-[#5599FF] text-black self-start sm:self-auto">PARTS D & E</span>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Minimal UI */}
                <div className="ps-inner-panel min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl shrink-0">🖥️</span>
                    <h3 className="font-['Press_Start_2P',monospace] text-xs text-[#55FFFF] m-0 leading-relaxed min-w-0">
                      D. Minimal UI Requirements
                    </h3>
                  </div>
                  <ul className="text-lg space-y-3 text-[#dce7ee] list-none p-0 m-0">
                    <li className="flex items-start gap-2">
                      <span className="text-[#55FFFF] font-bold">▶</span>
                      <div className="min-w-0">
                        <strong>Simple UI is enough:</strong> Focus on clear functionality, but enhancements that showcase agentic features are welcomed.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#55FFFF] font-bold">▶</span>
                      <div className="min-w-0">
                        <strong>Citizen Chat Portal:</strong> Chat-based interface to submit and track complaints. Voice and Marathi / Hindi language support are high-value priorities.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#55FFFF] font-bold">▶</span>
                      <div className="min-w-0">
                        <strong>Officer / Admin View:</strong> Queue showing grievance AI summary, sentiment, confidence, policy-gate reason, duplicate groups, and any generated SLA Breach / Escalation alerts.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Workflow Automation */}
                <div className="ps-inner-panel min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl shrink-0">⚙️</span>
                    <h3 className="font-['Press_Start_2P',monospace] text-xs text-[#FFAA00] m-0 leading-relaxed min-w-0">
                      E. Workflow Automation & Dispute Loop
                    </h3>
                  </div>
                  <ul className="text-lg space-y-3 text-[#eedecf] list-none p-0 m-0">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAA00] font-bold">▶</span>
                      <div className="min-w-0">
                        <strong>Action Dispatch:</strong> When routed, resolved or escalated, agent must trigger a department work-order or escalation via mock Webhook or API.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAA00] font-bold">▶</span>
                      <div className="min-w-0">
                        <strong>Citizen Dispute Mechanism:</strong> Citizen must be able to confirm or dispute a resolution; a dispute reopens the case automatically.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#55FF55] font-bold">★</span>
                      <div className="min-w-0">
                        <strong>Optional Bonus Features:</strong> Automated confirmation emails or WhatsApp messages, a GIS hotspot map, or image-based before/after verification.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.article>
          </section>

          {/* ============================================================== */}
          {/*  SECTION 6: HUMAN OVERSIGHT & RESPONSIBLE AI                   */}
          {/* ============================================================== */}
          <section id="responsible-ai-section" className="mb-12 scroll-mt-28">
            <motion.article
              className="ps-card relative p-6 sm:p-9 border-2 border-[#FF5555]"
              variants={cardVariants}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            >
              <div
                className="ps-card-bar"
                style={{ background: REDSTONE, boxShadow: '0 0 16px #FF5555' }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-black/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="ps-slot-sm bg-[#3a0808] shrink-0">
                    <svg viewBox="0 0 16 16" className="w-6 h-6" shapeRendering="crispEdges">
                      <rect x="7" y="1" width="2" height="14" fill="#FF5555" />
                      <rect x="1" y="7" width="14" height="2" fill="#FF5555" />
                      <rect x="3" y="3" width="10" height="10" fill="#7A0000" />
                      <rect x="5" y="5" width="6" height="6" fill="#FFAAAA" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="ps-section-eyebrow text-[#FF5555]">SAFETY & ETHICS GATE</span>
                    <h2 className="ps-section-title text-xl sm:text-2xl m-0 text-white">
                      F. Human Oversight & Responsible AI
                    </h2>
                  </div>
                </div>
                <span className="ps-chip bg-[#FF5555] text-white font-bold self-start sm:self-auto">
                  NON-NEGOTIABLE DIRECTIVES
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ps.responsibleAiRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-black/40 border-2 border-black shadow-[inset_2px_2px_0_#4a2020] flex flex-col justify-between min-w-0"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-['Press_Start_2P',monospace] text-[9px] bg-[#FF5555] text-white px-2 py-0.5">
                          {rule.severity}
                        </span>
                        <span className="font-['Press_Start_2P',monospace] text-[9px] text-[#FFAAAA]">
                          RULE 0{idx + 1}
                        </span>
                      </div>
                      <h4 className="font-['Press_Start_2P',monospace] text-xs text-white leading-relaxed mb-2">
                        {rule.rule}
                      </h4>
                      <p className="text-base text-[#e5d5d5] leading-relaxed m-0">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning Banner */}
              <div className="mt-6 p-4 bg-[#2b0c0c] border-2 border-[#FF5555] flex items-center gap-3">
                <span className="text-2xl text-[#FF5555] shrink-0">⛔</span>
                <p className="font-['Press_Start_2P',monospace] text-[9px] sm:text-xs text-[#FFAAAA] leading-relaxed m-0 min-w-0">
                  CRITICAL: AI must not automatically reject a grievance, determine legal liability, or close a sensitive case. Priority must reflect severity & affected populace, not raw submission volume!
                </p>
              </div>
            </motion.article>
          </section>

          {/* ============================================================== */}
          {/*  SECTION 7: EVALUATION RUBRIC                                  */}
          {/* ============================================================== */}
          <section id="rubric-section" className="mb-12 scroll-mt-28">
            <motion.article
              className="ps-card relative p-6 sm:p-9"
              variants={cardVariants}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            >
              <div className="ps-card-bar" style={{ background: ACCENT }} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-black/50">
                <div className="min-w-0">
                  <span className="ps-section-eyebrow text-[#55FFFF]">SCORING WEIGHTAGE</span>
                  <h2 className="ps-section-title text-xl sm:text-2xl m-0 text-white">
                    G. Evaluation Criteria
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="ps-chip bg-[#55FFFF] text-black">TOTAL: 100% XP</span>
                </div>
              </div>

              <p className="text-lg text-[#d0eef7] my-4">
                The judges will evaluate submissions across these seven core dimensions:
              </p>

              <div className="space-y-4 pt-2">
                {ps.evaluationRubric.map((r, i) => {
                  const pct = parseInt(r.percentage, 10);
                  return (
                    <div key={r.label} className="ps-rubric-card">
                      <div className="ps-rubric-top">
                        <span className="flex items-start gap-2 min-w-0">
                          <span className="font-['Press_Start_2P',monospace] text-[10px] text-[#55FFFF] mt-1.5 shrink-0">
                            0{i + 1}
                          </span>
                          <span className="min-w-0">{r.label}</span>
                        </span>
                        <strong className="text-[#55FFFF] font-['Press_Start_2P',monospace] text-xs sm:text-sm shrink-0">
                          {r.percentage}
                        </strong>
                      </div>
                      <div className="ps-xp mt-2">
                        <motion.div
                          className="ps-xp-fill"
                          initial={{ width: 0 }}
                          animate={ready ? { width: `${(pct / maxPct) * 100}%` } : undefined}
                          transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.08 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.article>
          </section>

          {/* ============================================================== */}
          {/*  SECTION 8: SUBMISSION CHECKLIST (INTERACTIVE)                 */}
          {/* ============================================================== */}
          <section id="checklist-section" className="mb-8 scroll-mt-28">
            <motion.article
              className="ps-card relative p-6 sm:p-9 border-2 border-[#55FF55]"
              variants={cardVariants}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            >
              <div
                className="ps-card-bar"
                style={{ background: EMERALD, boxShadow: '0 0 16px #55FF55' }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-black/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="ps-slot-sm bg-[#0f3317] shrink-0">
                    <svg viewBox="0 0 16 16" className="w-6 h-6" shapeRendering="crispEdges">
                      <rect x="2" y="2" width="12" height="12" fill="#55FF55" />
                      <rect x="4" y="4" width="8" height="8" fill="#0b1b0e" />
                      <rect x="6" y="8" width="2" height="2" fill="#55FF55" />
                      <rect x="8" y="6" width="2" height="2" fill="#55FF55" />
                      <rect x="10" y="4" width="2" height="2" fill="#55FF55" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="ps-section-eyebrow text-[#55FF55]">DELIVERY CRITERIA</span>
                    <h2 className="ps-section-title text-xl sm:text-2xl m-0 text-white">
                      H. Submission Checklist
                    </h2>
                  </div>
                </div>
                <span className="ps-chip bg-[#55FF55] text-black font-bold self-start sm:self-auto">
                  INTERACTIVE TRACKER
                </span>
              </div>

              <p className="text-lg text-[#d5eedb] my-4">
                Verify each deliverable before submitting your project on the HackFusion portal:
              </p>

              <div className="space-y-4 pt-2">
                {ps.submissionChecklist.map((item) => {
                  const isChecked = checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-4 border-2 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#14331c] border-[#55FF55] shadow-[0_0_15px_rgba(85,255,85,0.25)]'
                          : 'bg-black/30 border-black/60 hover:border-[#55FF55]/60'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-6 h-6 shrink-0 mt-0.5 border-2 flex items-center justify-center font-['Press_Start_2P',monospace] text-xs transition-colors ${
                            isChecked
                              ? 'bg-[#55FF55] border-[#55FF55] text-black font-bold'
                              : 'bg-black/60 border-white/40 text-transparent'
                          }`}
                        >
                          ✔
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-['Press_Start_2P',monospace] text-xs leading-relaxed mb-1 transition-colors ${
                              isChecked ? 'text-[#55FF55]' : 'text-white'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <p className="text-base text-[#cfd8d2] leading-relaxed m-0">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Demo Video Breakdown Box */}
              <div className="mt-6 p-4 bg-[#141418] border border-white/20">
                <span className="font-['Press_Start_2P',monospace] text-[10px] leading-relaxed text-[#FFAA00] block mb-2">
                  DEMO VIDEO (2 TO 5 MINUTES) MANDATORY SCENARIOS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-2.5 bg-black/40 border border-white/10 text-sm">
                    <span className="text-[#55FF55] font-bold block mb-1">Scenario 1:</span>
                    1 auto-resolved routine grievance case
                  </div>
                  <div className="p-2.5 bg-black/40 border border-white/10 text-sm">
                    <span className="text-[#FF5555] font-bold block mb-1">Scenario 2:</span>
                    1 sensitive case kept in human review
                  </div>
                  <div className="p-2.5 bg-black/40 border border-white/10 text-sm">
                    <span className="text-[#FFAA00] font-bold block mb-1">Scenario 3:</span>
                    1 duplicate grouping or escalation scenario
                  </div>
                </div>
              </div>
            </motion.article>
          </section>

          {/* Bottom Call to Action */}
          <div className="text-center pt-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ps-nav-pill px-6 py-3 text-sm bg-black/60 hover:bg-[#55FFFF]/20 border-[#55FFFF]/60"
            >
              ▲ Return to Top of Brief
            </button>
          </div>
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
  --stone: #24242b;
  --stone-hi: #555562;
  --stone-lo: #121216;
  --accent: #55FFFF;
  font-family: var(--body);
  font-size: 21px;
  line-height: 1.3;
}
.ps-page *, .ps-page *::before, .ps-page *::after { box-sizing: border-box; }
.ps-page .px { font-family: var(--px); font-weight: 400; }

/* never let text push past its box (pixel font is very wide) */
.ps-page h1, .ps-page h2, .ps-page h3, .ps-page h4,
.ps-page p, .ps-page li, .ps-page span, .ps-page strong, .ps-page div {
  overflow-wrap: anywhere;
}

/* ---------- background ---------- */
.ps-bg {
  position: fixed; inset: 0; z-index: 0;
  background-color: #121d2c;
  background-size: cover; background-position: center; background-repeat: no-repeat;
}
.ps-shade {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,.75) 100%),
    linear-gradient(180deg, rgba(10,15,25,.4) 0%, rgba(5,8,15,.75) 100%);
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
  10%  { opacity: .85; }
  50%  { transform: translate(var(--sway), -55vh); }
  90%  { opacity: .65; }
  100% { transform: translate(calc(var(--sway) * -1), -112vh); opacity: 0; }
}

/* ---------- typography & headers ---------- */
.ps-hero-badge {
  display: inline-block; padding: 4px 10px;
  font-family: var(--px); font-size: 0.65rem; line-height: 1.2;
  box-shadow: inset -2px -2px 0 rgba(0,0,0,.4), inset 2px 2px 0 rgba(255,255,255,.6), 0 2px 6px rgba(0,0,0,.5);
}

.ps-title {
  letter-spacing: .02em; color: #fff;
  font-family: var(--px);
  text-shadow: 0 4px 0 #737373, 0 8px 0 #2b2b2b
}
/* fluid size: "Problem Statement" (17 chars) always fits, down to ~320px */
.ps-page .ps-title { font-size: clamp(0.9rem, 5vw, 3rem) !important; }

.ps-sub {
  max-width: 760px; margin-top: clamp(14px, 2.5vw, 22px);
  font-size: clamp(1.25rem, 2.3vw, 1.55rem);
  text-shadow: 2px 2px 0 #000;
}

.ps-section-eyebrow {
  display: block; font-family: var(--px); font-size: 0.65rem;
  letter-spacing: 0.08em; margin-bottom: 4px; line-height: 1.5;
}
.ps-section-title {
  font-family: var(--px); font-weight: 400; text-shadow: 2px 2px 0 #000;
}
/* fluid section headings (longest word "Specifications" still fits at 340px) */
.ps-page .ps-section-title { font-size: clamp(0.8rem, 4.4vw, 1.5rem) !important; line-height: 1.4; }
.ps-page .ps-section-title.ps-lg { font-size: clamp(0.95rem, 5.2vw, 1.875rem) !important; }

/* ---------- navigation pills ---------- */
.ps-nav-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; font-family: var(--px); font-size: 0.62rem;
  color: #fff; background: #16161c;
  border: 2px solid #3d3d48;
  box-shadow: inset 1px 1px 0 #6b6b7a, inset -1px -1px 0 #0a0a0d, 0 2px 4px rgba(0,0,0,.5);
  cursor: pointer; transition: all 0.15s ease;
}
.ps-nav-pill:hover {
  transform: translateY(-2px);
  border-color: #55FFFF;
  box-shadow: inset 1px 1px 0 #55FFFF, inset -1px -1px 0 #005555, 0 4px 8px rgba(0,0,0,.7);
}

/* ---------- stone panel ---------- */
.ps-card {
  background-color: var(--stone);
  background-image:
    linear-gradient(45deg, rgba(255,255,255,.03) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.03) 75%),
    linear-gradient(45deg, rgba(0,0,0,.18) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.18) 75%);
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
  box-shadow:
    inset 4px 4px 0 var(--stone-hi),
    inset -4px -4px 0 var(--stone-lo),
    0 0 0 3px #000,
    0 0 24px rgba(0, 0, 0, 0.6),
    8px 10px 0 2px rgba(0,0,0,.6);
}
.ps-card-bar {
  position: absolute; left: 4px; right: 4px; top: 4px; height: 6px;
}

.ps-slot {
  width: 76px; height: 76px;
  display: grid; place-items: center;
  background: #141418;
  border: 3px solid #000;
  box-shadow: inset 3px 3px 0 #000, inset -3px -3px 0 #4a4a52;
}
.ps-slot-sm {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  background: #141418;
  border: 2px solid #000;
  box-shadow: inset 2px 2px 0 #000, inset -2px -2px 0 #4a4a52;
}
.ps-icon { width: 52px; height: 52px; }

.ps-chip {
  display: inline-block; padding: 3px 7px; max-width: 100%;
  font-family: var(--px); font-size: .6rem; line-height: 1.4;
  box-shadow: inset -2px -2px 0 rgba(0,0,0,.35), inset 2px 2px 0 rgba(255,255,255,.5);
}
.ps-card-title {
  font-family: var(--px); font-weight: 400;
  color: #fff; text-shadow: 2px 2px 0 #000;
}
/* fluid card titles (longest word "Conversational" fits at 340px) */
.ps-page .ps-card-title { font-size: clamp(0.7rem, 3.6vw, 1.25rem) !important; line-height: 1.35; }

.ps-callout-box {
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid #000;
  box-shadow: inset 2px 2px 0 #000, inset -2px -2px 0 #3a3a42;
  padding: 18px 22px;
}

.ps-inner-panel {
  background: rgba(14, 14, 18, 0.7);
  border: 2px solid #000;
  box-shadow: inset 2px 2px 0 #3a3a42, inset -2px -2px 0 #0a0a0d;
  padding: 16px 18px;
}

.ps-compare-card {
  padding: 14px 18px;
  border: 2px solid;
  box-shadow: inset 2px 2px 0 rgba(0,0,0,0.6);
}

.ps-checklist { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.ps-checklist li {
  position: relative; padding-left: 24px; line-height: 1.25;
}
.ps-checklist li::before {
  content: '▶';
  position: absolute; left: 0; top: 0;
  color: var(--accent); font-size: 0.85rem;
}

.ps-rubric-card {
  background: rgba(0, 0, 0, 0.35);
  border: 2px solid #000;
  box-shadow: inset 2px 2px 0 #000, inset -2px -2px 0 #3a3a40;
  padding: 12px 16px;
}
.ps-rubric-top {
  display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
  font-size: 1.25rem; color: #e8e8e8;
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

/* ---------- small phones (≈320–480px) ---------- */
@media (max-width: 480px) {
  .ps-page .ps-card { padding: 16px !important; }
  .ps-slot { width: 56px; height: 56px; }
  .ps-icon { width: 36px; height: 36px; }
  .ps-callout-box { padding: 12px 14px; }
  .ps-inner-panel { padding: 12px; }
  .ps-compare-card { padding: 12px; }
  .ps-rubric-card { padding: 10px 12px; }
  .ps-title { text-shadow: 0 3px 0 #737373, 0 6px 0 #2b2b2b; }
  .ps-section-title, .ps-card-title { text-shadow: 1px 1px 0 #000; }
  .ps-nav-pill { font-size: 0.55rem; padding: 6px 9px; }
}
`;