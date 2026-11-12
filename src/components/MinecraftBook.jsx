import { useState, useRef, useEffect } from "react";
import bookImg from "./book.webp";        // your exact book image (arrow removed)
import nextImg from "./arrow_next.webp";
import prevImg from "./arrow_prev.webp";

/* ------------------------------------------------------------------
   MinecraftBook — uses your screenshot as the book art, so it looks
   exactly like it. Only the page area (inside the frame) turns.

   <MinecraftBook pages={["page 1 text", "page 2 text", ...]} />

   Geometry below is measured on the 736 x 904 image.
------------------------------------------------------------------- */

const LINE_MS = 220;
const LINE_STAGGER_MS = 85;
const FADE_OUT_MS = 240;

const IMG = { w: 736, h: 904 };
const pct = (v, total) => `${(v / total) * 100}%`;

function PageText({ text, index, total, phase }) {
  const [title, ...lines] = text.split("\n");
  return (
    <div className="absolute inset-0 text-[#2c1d11]">
      <div className={`absolute top-[6.5%] right-[14%] text-[clamp(9px,2.2cqw,14px)] text-[#5c4033] font-bold ${phase === "hidden" ? "opacity-0" : ""}`}>Page {index + 1} of {total}</div>
      <div className="absolute left-[13.5%] right-[12.5%] top-[11.5%] bottom-[12.5%] overflow-hidden break-words max-[600px]:left-[11%] max-[600px]:right-[11%] max-[600px]:top-[9.5%] max-[600px]:bottom-[10%]" aria-live="polite">
        <h2 className={`mb-[.7em] text-center text-[clamp(13px,3.8cqw,24px)] font-bold min-[601px]:text-[clamp(11px,3.2cqw,21px)] leading-[1.3] text-[#3b1d0e] tracking-[0.05em] uppercase max-[600px]:text-[clamp(10px,3.1cqw,16px)] max-[600px]:leading-[1.2] ${phase === "hidden" ? "opacity-0" : phase === "out" ? "[animation:mcb-line-out_220ms_ease-in_forwards]" : phase === "in" ? "opacity-0 [animation:mcb-line-in_220ms_ease-out_forwards]" : ""} motion-reduce:[animation-duration:1ms]`}>{title}</h2>
        <div className="whitespace-pre-wrap text-[clamp(9px,2.5cqw,17px)] leading-[1.65] min-[601px]:text-[clamp(8.5px,2.2cqw,15px)] break-words [overflow-wrap:anywhere] max-[600px]:text-[clamp(7.5px,2.1cqw,12.5px)] max-[600px]:leading-[1.45]">
          {lines.map((line, lineIndex) => {
            const isBullet = line.trim().startsWith("-");
            const isSubBullet = line.trim().startsWith("  -") || line.trim().startsWith("-   -") || (line.startsWith("  ") && line.trim().startsWith("-"));
            return (
              <span 
                className={`block min-h-[1.4em] max-[600px]:min-h-[1.2em] break-words [overflow-wrap:anywhere] ${isBullet ? "pl-[1.2em] -indent-[1.2em] my-[0.15em]" : ""} ${isSubBullet ? "pl-[2.4em] -indent-[1.2em] my-[0.1em] text-[#422c1b]" : ""} ${phase === "hidden" ? "opacity-0" : phase === "out" ? "[animation:mcb-line-out_220ms_ease-in_forwards]" : phase === "in" ? "opacity-0 [animation:mcb-line-in_220ms_ease-out_forwards] [animation-delay:calc(var(--line-index)_*_85ms)]" : ""} motion-reduce:[animation-duration:1ms] motion-reduce:[animation-delay:0ms]`} 
                key={`${index}-${lineIndex}`} 
                style={{ "--line-index": lineIndex + 1 }}
              >
                {line.replace(/^\s*-\s*/, "• ")}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MinecraftBook({
  pages = [
        `WELCOME TO HACKFUSION 3

TO ENSURE A FAIR, ENJOYABLE, AND
INNOVATIVE EXPERIENCE FOR ALL
PARTICIPANTS, WE HAVE OUTLINED THE
FOLLOWING RULES AND GUIDELINES.
PLEASE READ CAREFULLY AND ADHERE TO
THEM THROUGHOUT THE EVENT.`,
        `TEAM & EVENT FORMAT

- EACH TEAM MUST HAVE 3-4 MEMBERS.

- THE HACKATHON HAS 2 STAGES:
  STAGE 1: ABSTRACT SUBMISSION AND
  PPT-BASED SELECTION (PPT OPTIONAL)

  STAGE 2: GRAND FINALE AT SGGSIE&T,
  NANDED, MAHARASHTRA`,
        `REGISTRATION & PROJECTS

- SUBMIT AN ABSTRACT FOR STAGE 1;
  PPT SUBMISSION IS COMPULSORY.
- SELECTED TEAMS ADVANCE TO STAGE 2.
- FEE: RS. 749 PER TEAM; FOOD INCLUDED.
- IF NOT SELECTED, THE FEE IS REFUNDED.
  TEAM CANCELLATIONS ARE NOT REFUNDABLE.
- BUILD AN ORIGINAL SOFTWARE PROJECT (WEB, MOBILE, OR RELEVANT TECH)
  DURING THE HACKATHON.
- DO NOT USE PRE-EXISTING CODE OR
  PROJECTS UNLESS ORGANIZERS ALLOW IT.
- SUBMIT WITHIN 36 HOURS.`,
        `FAIR PLAY & SCHEDULE

- FOLLOW THE EVENT SCHEDULE AND ATTEND
  MANDATORY OPENING AND CLOSING SESSIONS.
- DO NOT SABOTAGE, STEAL IDEAS, OR
  INTERFERE WITH ANOTHER TEAM'S WORK.
- SHARE POWER, INTERNET, AND WORKSPACE
  RESPONSIBLY.
- TREAT EVERYONE WITH RESPECT.
  HARASSMENT, DISCRIMINATION, OR
  MISCONDUCT MAY LEAD TO DISQUALIFICATION.
- HELP KEEP THE EVENT INCLUSIVE.`,
        `JUDGING & PRIZES

- PROJECTS ARE JUDGED ON:
  - INNOVATION AND ORIGINALITY
  - FUNCTIONALITY AND PROBLEM-SOLVING
  - FEASIBILITY
  - PRESENTATION AND DEMO CLARITY
  - CODE QUALITY AND DOCUMENTATION
- JUDGES' DECISIONS ARE FINAL.
- TOTAL PRIZE POOL: RS. 2,30,000.
- SPECIAL PRIZES FOR ALL-GIRLS TEAMS
  AND TEAMS WITH PARTICIPANTS WITH
  DISABILITIES.
- CERTIFICATES, TROPHIES, AND INDUSTRY
  NETWORKING; DETAILS AT THE EVENT.`,
        `ORGANIZERS & CONTACT

- ORGANIZERS MAY UPDATE THESE RULES
  AND WILL NOTIFY PARTICIPANTS.
- REGISTERING MEANS ACCEPTING THESE
  RULES AND ORGANIZER DECISIONS.
- THE COMMITTEE RESOLVES DISPUTES.

CONTACT THE ORGANIZERS:

Khushwant Singh Mahajan  
+91 7020942799

Hrishikesh Karale   
+91 97677533091

Priyanka Shinde
+91 8482820885

support@hackfusion.in
swag@sggs.ac.in
gdg@sggs.ac.in
`,
  ],
}) {
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState(null);
  const [revealPages, setRevealPages] = useState([]);
  const [fadePages, setFadePages] = useState([]);
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 600px)").matches);
  const timer = useRef(null);
  const revealTimer = useRef(null);
  const transitionLock = useRef(false);
  const total = pages.length;
  const step = mobile ? 1 : 2;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 600px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => () => {
    clearTimeout(timer.current);
    clearTimeout(revealTimer.current);
  }, []);

  const go = (dir) => {
    if (transitionLock.current) return;
    const to = page + (dir === "next" ? step : -step);
    if (to < 0 || to >= total) return;
    transitionLock.current = true;
    setRevealPages([]);
    clearTimeout(revealTimer.current);
    const outgoingPages = mobile ? [page] : [page, ...(page + 1 < total ? [page + 1] : [])];
    setFadePages(outgoingPages);
    timer.current = window.setTimeout(() => {
      setTurn({ from: page, to, dir });
      timer.current = window.setTimeout(() => {
  const visiblePages = mobile ? [to] : [to, ...(to + 1 < total ? [to + 1] : [])];
  const longestPage = Math.max(...visiblePages.map((index) => Math.max(0, pages[index].split("\n").length - 1)));
  setPage(to);
  setTurn(null);
  setFadePages([]);
  setRevealPages(visiblePages);

  // Unlock immediately: the text reveal is purely cosmetic and must not block navigation
  transitionLock.current = false;

  revealTimer.current = window.setTimeout(() => {
    setRevealPages([]);
  }, LINE_MS + longestPage * LINE_STAGGER_MS + 40);
}, 720);
    }, FADE_OUT_MS);
  };
  const pagePanel = (index, side) => (
    <div key={`${side}-${index}`} className="relative h-full min-w-0 flex-1 [container-type:inline-size]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-center bg-no-repeat [background-size:100%_100%]" style={{ backgroundImage: `url(${bookImg})`, transform: side === "left" && !mobile ? "scaleX(-1)" : undefined }} />
        <PageText text={pages[index]} index={index} total={total} phase={fadePages.includes(index) ? "out" : revealPages.includes(index) ? "in" : null} />
      </div>
      {page > 0 && (side === "left" || mobile) && !turn && (
        <button className="absolute bottom-[3.5%] left-[15%] z-10 h-[6.2%] w-[14.5%] cursor-pointer border-0 bg-transparent p-0 transition-[filter] duration-[100ms] hover:brightness-125 active:translate-y-px focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-[#7b2a1a]" onClick={() => go("prev")} aria-label="Previous page">
          <img src={prevImg} alt="" className="h-full w-full object-contain" style={{ filter: "contrast(1.5) drop-shadow(0 2px 3px rgba(12,6,2,1)) drop-shadow(0 0 5px rgba(18,9,2,.95)) drop-shadow(0 0 4px rgba(244,173,61,.45))" }} />
        </button>
      )}
      {side === "right" && page + step < total && !turn && (
        <button className="absolute bottom-[3.5%] right-[15%] z-10 h-[6.2%] w-[14.5%] cursor-pointer border-0 bg-transparent p-0 transition-[filter] duration-[100ms] hover:brightness-125 active:translate-y-px focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-[#7b2a1a]" onClick={() => go("next")} aria-label="Next page">
          <img src={nextImg} alt="" className="h-full w-full object-contain" style={{ filter: "contrast(1.5) drop-shadow(0 2px 3px rgba(12,6,2,1)) drop-shadow(0 0 5px rgba(18,9,2,.95)) drop-shadow(0 0 4px rgba(244,173,61,.45))" }} />
        </button>
      )}
    </div>
  );
  const turnFront = turn ? (mobile ? turn.from : turn.dir === "next" ? Math.min(turn.from + 1, total - 1) : turn.from) : 0;
  const turnBack = turn ? (mobile ? turn.to : turn.dir === "next" ? Math.min(turn.to, total - 1) : Math.min(turn.to + 1, total - 1)) : 0;

  return (
    <div className={`relative mx-auto flex h-full w-full select-none [perspective:1800px] [font-family:'Press_Start_2P',monospace] ${mobile ? "flex-col [aspect-ratio:736/904]" : "flex-row [aspect-ratio:1472/904]"}`}>
      {mobile ? pagePanel(page, "right") : <>{pagePanel(page, "left")}{page + 1 < total && pagePanel(page + 1, "right")}</>}

      {turn && (
        <div
          className={`mcb-page-roll absolute top-0 z-20 h-full overflow-visible [transform-style:preserve-3d] ${mobile ? "mcb-mobile-fold left-0 w-full" : turn.dir === "next" ? "left-1/2 w-1/2 origin-left" : "left-0 w-1/2 origin-right"}`}
          style={{
            transformOrigin: mobile ? (turn.dir === "next" ? "left center" : "right center") : undefined,
            animation: `${mobile ? "mcb-mobile-fold" : "mcb-page-roll"}-${turn.dir} 720ms cubic-bezier(.42,0,.18,1) both`,
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 overflow-hidden bg-[#fff8dc] [backface-visibility:hidden]">
            <div className="absolute inset-0 bg-center bg-no-repeat [background-size:100%_100%]" style={{ backgroundImage: `url(${bookImg})`, transform: !mobile && turn.dir === "prev" ? "scaleX(-1)" : undefined }} />
            <PageText text={pages[turnFront]} index={turnFront} total={total} phase="hidden" />
          </div>
          <div className="absolute inset-0 overflow-hidden bg-[#fff8dc] [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="absolute inset-0 bg-center bg-no-repeat [background-size:100%_100%]" style={{ backgroundImage: `url(${bookImg})`, transform: !mobile && turn.dir === "next" ? "scaleX(-1)" : undefined }} />
            <PageText text={pages[turnBack]} index={turnBack} total={total} phase="hidden" />
          </div>
        </div>
      )}
      <style>{`.mcb-mobile-fold{filter:drop-shadow(10px 0 12px rgba(0,0,0,.34))}.mcb-mobile-fold::before{content:"";position:absolute;inset:0;z-index:5;pointer-events:none;background:linear-gradient(90deg,transparent 55%,rgba(38,20,8,.08) 72%,rgba(22,10,4,.4) 96%,rgba(255,236,196,.3) 100%);opacity:0;animation:mcb-mobile-fold-shade 720ms cubic-bezier(.42,0,.18,1) both}@keyframes mcb-mobile-fold-shade{0%{opacity:0}28%{opacity:.45}58%{opacity:.9}100%{opacity:0}}@keyframes mcb-mobile-fold-next{0%{transform:rotateY(0) translateZ(0)}48%{transform:rotateY(-92deg) translateZ(8px)}100%{transform:rotateY(-180deg) translateZ(0)}}@keyframes mcb-mobile-fold-prev{0%{transform:rotateY(0) translateZ(0)}48%{transform:rotateY(92deg) translateZ(8px)}100%{transform:rotateY(180deg) translateZ(0)}}@keyframes mcb-line-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}@keyframes mcb-line-out{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-4px)}}@keyframes mcb-page-roll-next{from{transform:rotateY(0)}to{transform:rotateY(-180deg)}}@keyframes mcb-page-roll-prev{from{transform:rotateY(0)}to{transform:rotateY(180deg)}}@media(prefers-reduced-motion:reduce){.mcb-page-roll{animation-duration:1ms!important}}`}</style>
    </div>
  );
}
