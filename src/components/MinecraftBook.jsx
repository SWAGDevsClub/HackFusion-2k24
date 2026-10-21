import { useState, useRef, useEffect } from "react";
import bookImg from "./book.webp";        // your exact book image (arrow removed)
import nextImg from "./arrow_next.webp";  // the arrow, cut out of your image
import prevImg from "./arrow_prev.webp";  // same arrow, mirrored

/* ------------------------------------------------------------------
   MinecraftBook — uses your screenshot as the book art, so it looks
   exactly like it. Only the page area (inside the frame) turns.

   <MinecraftBook pages={["page 1 text", "page 2 text", ...]} />

   Geometry below is measured on the 736 x 904 image.
------------------------------------------------------------------- */

const LINE_MS = 160;
const LINE_STAGGER_MS = 0;

const IMG = { w: 736, h: 904 };
const pct = (v, total) => `${(v / total) * 100}%`;

function PageText({ text, index, total, phase }) {
  const [title, ...lines] = text.split("\n");
  return (
    <div className="absolute inset-0 text-[#1c1c1c]">
      <div className="absolute top-[5.2%] right-[12%] text-[clamp(8px,2.4cqw,18px)] text-[#4a4a4a]">Page {index + 1} of {total}</div>
      <div className="absolute left-[12.5%] right-[12%] top-[11%] bottom-[14%] overflow-hidden break-words" aria-live="polite">
        <h2 className="mb-[.8em] text-[clamp(14px,4.2cqw,31px)] font-bold leading-[1.25] text-[#4a2a18]">{title}</h2>
        <div className="whitespace-pre-wrap text-[clamp(10px,3cqw,22px)] leading-[1.5]">
          {lines.map((line, lineIndex) => (
            <span className={`block min-h-[1.5em] ${phase === "out" ? "[animation:mcb-line-out_160ms_ease-in_forwards] [animation-delay:calc(var(--line-index)_*_35ms)]" : phase === "in" ? "opacity-0 [animation:mcb-line-in_160ms_ease-out_forwards] [animation-delay:calc(var(--line-index)_*_35ms)]" : ""} motion-reduce:[animation-duration:1ms] motion-reduce:[animation-delay:0ms]`} key={`${index}-${lineIndex}`} style={{ "--line-index": lineIndex }}>
              {line || " "}
            </span>
          ))}
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
  PPT SUBMISSION IS OPTIONAL.
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
YASH WAGHMARE  +91 91728 58260
PRACHI DAFRE   +91 70577 44394
SWAG@SGGS.AC.IN | GDG@SGGS.AC.IN`,
  ],
}) {
  const [page, setPage] = useState(0);
  const [transition, setTransition] = useState(null);
  const timer = useRef(null);
  const total = pages.length;

  useEffect(() => () => clearTimeout(timer.current), []);

  const go = (dir) => {
    if (transition) return;
    const to = page + (dir === "next" ? 1 : -1);
    if (to < 0 || to >= total) return;
    const outgoingDuration = Math.max(1, pages[page].split("\n").length) * LINE_STAGGER_MS + LINE_MS;
    setTransition({ phase: "out", to });
    timer.current = window.setTimeout(() => {
      setPage(to);
      setTransition({ phase: "in", to });
      const incomingDuration = Math.max(1, pages[to].split("\n").length) * LINE_STAGGER_MS + LINE_MS;
      timer.current = window.setTimeout(() => setTransition(null), incomingDuration);
    }, outgoingDuration);
  };

  return (
    <div className="relative mx-auto w-full select-none [aspect-ratio:736/904] [container-type:inline-size] [perspective:1500px] [font-family:'Press_Start_2P',monospace]">
        <div className="absolute inset-0 bg-center bg-no-repeat [background-size:100%_100%]" style={{ backgroundImage: `url(${bookImg})` }}>
          <PageText text={pages[page]} index={page} total={total} phase={transition?.phase} />
        </div>

        {page > 0 && !transition && <button className="absolute z-10 cursor-pointer border-0 bg-transparent bg-center bg-no-repeat p-0 transition-[filter] duration-[80ms] hover:brightness-[.82] hover:contrast-[1.15] active:translate-y-px focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-[#7b2a1a] focus-visible:outline-offset-0" style={{ width: pct(106, IMG.w), height: pct(56, IMG.h), top: pct(787, IMG.h), left: pct(110, IMG.w), backgroundImage: `url(${prevImg})`, backgroundSize: "100% 100%" }} onClick={() => go("prev")} aria-label="Previous page" />}
        {page < total - 1 && !transition && <button className="absolute z-10 cursor-pointer border-0 bg-transparent bg-center bg-no-repeat p-0 transition-[filter] duration-[80ms] hover:brightness-[.82] hover:contrast-[1.15] active:translate-y-px focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-[#7b2a1a] focus-visible:outline-offset-0" style={{ width: pct(106, IMG.w), height: pct(56, IMG.h), top: pct(787, IMG.h), left: pct(497, IMG.w), backgroundImage: `url(${nextImg})`, backgroundSize: "100% 100%" }} onClick={() => go("next")} aria-label="Next page" />}
    </div>
  );
}