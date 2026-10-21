import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
const BACKGROUND_SRC = "/images/winners_section.webp";

const BANNER_SRC = "src/assets/pageassets-clean/plank-long-banner-footer.webp";
const DEBUG_LAYOUT = false;

const EMPTY_DETAILS = {
  projectName: "",
  members: [],
  description: "",
  techStack: [],
  githubUrl: "",
  projectUrl: "",
};

const EDITIONS = [
  {
    id: "hackfusion-3",
    name: "HackFusion 3",
    winners: [
      {
        ...EMPTY_DETAILS,
        position: 1,
        label: "1ST PRIZE",
        teamName: "TEAM LUCARIO",
        image: "/images/winners/hackfusion-3-first.webp",
      },
      {
        ...EMPTY_DETAILS,
        position: 2,
        label: "2ND PRIZE",
        teamName: "TEAM BULBASAUR",
        image: "/images/winners/hackfusion-3-second.webp",
      },
      {
        ...EMPTY_DETAILS,
        position: 3,
        label: "3RD PRIZE",
        teamName: "TEAM MEOWTH",
        image: "/images/winners/hackfusion-3-third.webp",
      },
    ],
  }
];


const PIXEL_FONT = "font-['Press_Start_2P',monospace]";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#79C9F2]";


const PLACEHOLDER_ROWS = [
  ".XXX.",
  "X...X",
  "....X",
  "..XX.",
  "..X..",
  ".....",
  "..X..",
];

const PLACEHOLDER_COLORS = {
  X: "bg-[#777777]",
};

function PixelGrid({ rows, colors, cellClass }) {
  return (
    <div
      aria-hidden="true"
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${rows[0].length}, auto)`,
      }}
    >
      {rows.flatMap((row, rowIndex) =>
        [...row].map((character, columnIndex) => (
          <span
            key={`${rowIndex}-${columnIndex}`}
            className={`${cellClass} ${colors[character] ?? ""}`}
          />
        ))
      )}
    </div>
  );
}

function WinnerImage({
  src,
  alt,
  placeholderLabel = "NO IMAGE",
  cellClass = "h-1.5 w-1.5 sm:h-2 sm:w-2",
  textClass = "text-[8px] sm:text-[10px]",
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} — image not available`}
        className="
          flex h-full w-full flex-col
          items-center justify-center gap-[8%]
          bg-[#1B211C]/90
        "
      >
        <PixelGrid
          rows={PLACEHOLDER_ROWS}
          colors={PLACEHOLDER_COLORS}
          cellClass={cellClass}
        />

        <span
          aria-hidden="true"
          className={`${PIXEL_FONT} text-center leading-snug text-[#C5C9BE] ${textClass}`}
        >
          {placeholderLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}


const GUI_PANEL =
  "bg-[#C6C6C6] border-4 border-[#151A17] shadow-[inset_4px_4px_0_0_#FFFFFF,inset_-4px_-4px_0_0_#555555,8px_8px_0_0_#0C100D]";

const GUI_SLOT =
  "bg-[#8B8B8B] shadow-[inset_3px_3px_0_0_#373737,inset_-3px_-3px_0_0_#FFFFFF]";

const HAIR = [
  "bg-[#3B2A1A]",
  "bg-[#151A17]",
  "bg-[#A47748]",
  "bg-[#F2C14E]",
  "bg-[#7847AB]",
  "bg-[#5E9C45]",
];
const SKIN = ["bg-[#E0AC82]", "bg-[#C68A5E]", "bg-[#8D5A3B]", "bg-[#F1C9A5]"];
const EYES = ["bg-[#3B6FD1]", "bg-[#2E7D32]", "bg-[#4A2C17]"];

const HEAD_ROWS = [
  "HHHHHHHH",
  "HHHHHHHH",
  "HSSSSSSH",
  "SSSSSSSS",
  "SWESSEWS",
  "SSSSSSSS",
  "SSMMMMSS",
  "SSSSSSSS",
];

function hashString(text) {
  let hash = 0;
  for (const character of String(text)) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  return hash;
}

/* Pixel "player head" generated from a name, so every team / member
   gets its own little Steve-like face. */
function Head({ seed, cellClass = "h-1.5 w-1.5 sm:h-2 sm:w-2" }) {
  const hash = hashString(seed || "tba");

  const colors = {
    H: HAIR[hash % HAIR.length],
    S: SKIN[(hash >> 3) % SKIN.length],
    E: EYES[(hash >> 5) % EYES.length],
    W: "bg-[#FFFFFF]",
    M: "bg-[#7A3E2A]",
  };

  return <PixelGrid rows={HEAD_ROWS} colors={colors} cellClass={cellClass} />;
}

/* Small coloured cube used as an "item" icon */
const CUBE_COLORS = [
  "bg-[#5E9C45]",
  "bg-[#79C9F2]",
  "bg-[#F2C14E]",
  "bg-[#B53A2E]",
  "bg-[#7847AB]",
  "bg-[#A47748]",
];

function Cube({ index }) {
  return (
    <span
      aria-hidden="true"
      className={`
        inline-block h-4 w-4 border-2 border-[#151A17]
        shadow-[inset_2px_2px_0_0_rgba(255,255,255,0.45),inset_-2px_-2px_0_0_rgba(0,0,0,0.35)]
        ${CUBE_COLORS[index % CUBE_COLORS.length]}
      `}
    />
  );
}

/* Heading used on the grey GUI panel, like a chest / inventory title */
function GuiLabel({ children }) {
  return (
    <p
      className={`
        ${PIXEL_FONT}
        text-[8px] leading-relaxed text-[#3F3F3F] sm:text-[9px]
      `}
    >
      {children}
    </p>
  );
}

/* Classic Minecraft button (grey, goes blue on hover) */
function McButton({ href, children, onClick, buttonRef, label }) {
  const className = `
    ${PIXEL_FONT}
    inline-block border-4 border-[#151A17]
    bg-[#6D6D6D] px-3 py-3
    text-center text-[9px] leading-relaxed text-[#E0E0E0]
    shadow-[inset_3px_3px_0_0_#A0A0A0,inset_-3px_-3px_0_0_#373737]
    transition-colors
    hover:bg-[#7A86C9] hover:text-[#FFFFA0]
    hover:shadow-[inset_3px_3px_0_0_#A9B3EA,inset_-3px_-3px_0_0_#4A5499]
    active:shadow-[inset_3px_3px_0_0_#373737,inset_-3px_-3px_0_0_#A0A0A0]
    motion-reduce:transition-none
    sm:text-[10px]
    ${FOCUS_RING}
  `;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={label}
      className={className}
    >
      {children}
    </button>
  );
}


const RANK = {
  1: {
    ribbon: "bg-[#F2C14E]",
    name: "text-[#FFAA00]",
    xp: 10,
    title: "LEGENDARY",
  },
  2: {
    ribbon: "bg-[#79C9F2]",
    name: "text-[#55FFFF]",
    xp: 7,
    title: "RARE",
  },
  3: {
    ribbon: "bg-[#A47748]",
    name: "text-[#55FF55]",
    xp: 5,
    title: "UNCOMMON",
  },
};

function InfoCard({ winner, editionName, onClose }) {
  const closeRef = useRef(null);
  const rank = RANK[winner.position] ?? RANK[3];

  const members = winner.members ?? [];
  const techStack = winner.techStack ?? [];
  const hasLinks = Boolean(winner.githubUrl || winner.projectUrl);

  /* Escape to close, lock page scroll, focus the close button */
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const tba = <span className="opacity-60">TBA</span>;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-4"
      onClick={onClose}
    >
      {/* Local keyframes for the pop-in animation */}
      <style>{`
        @keyframes mc-pop {
          0% { transform: scale(0.85) translateY(12px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .mc-pop { animation: mc-pop 180ms steps(5, end) both; }
        @media (prefers-reduced-motion: reduce) {
          .mc-pop { animation: none; }
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-card-title"
        onClick={(event) => event.stopPropagation()}
        className={`
          mc-pop relative flex w-full max-w-xl flex-col
          max-h-[90vh] max-h-[90dvh]
          ${GUI_PANEL}
        `}
      >
        {/* Prize-coloured ribbon */}
        <div
          aria-hidden="true"
          className={`h-3 w-full shrink-0 ${rank.ribbon}`}
        />

        {/* Title row */}
        <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-2 pt-3">
          <div className="min-w-0">
            <h3
              id="info-card-title"
              className={`
                ${PIXEL_FONT}
                break-words text-xs leading-[1.8] text-[#3F3F3F]
                sm:text-sm
              `}
            >
              Team Info
            </h3>
            <p
              className={`
                ${PIXEL_FONT}
                mt-1 text-[8px] leading-relaxed text-[#6B6B6B] sm:text-[9px]
              `}
            >
              {editionName.toUpperCase()}
            </p>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close team info"
            className={`
              ${PIXEL_FONT}
              shrink-0 border-4 border-[#151A17]
              bg-[#B53A2E] px-3 py-2
              text-[10px] leading-none text-[#F5F2E8]
              shadow-[inset_3px_3px_0_0_#E06A5C,inset_-3px_-3px_0_0_#7A241B]
              transition-colors
              hover:bg-[#D24C3E]
              motion-reduce:transition-none
              sm:text-xs
              ${FOCUS_RING}
            `}
          >
            X
          </button>
        </div>

        <div
          data-lenis-prevent
          tabIndex={0}
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
          className={`
            min-h-0 flex-1 overflow-y-auto overscroll-contain
            px-4 pb-4 pt-2
            [scrollbar-width:thin]
            [scrollbar-color:#8B8B8B_#373737]
            [&::-webkit-scrollbar]:w-3
            [&::-webkit-scrollbar-track]:bg-[#373737]
            [&::-webkit-scrollbar-thumb]:border-2
            [&::-webkit-scrollbar-thumb]:border-[#373737]
            [&::-webkit-scrollbar-thumb]:bg-[#C6C6C6]
            ${FOCUS_RING}
          `}
        >
          <div className="flex flex-col gap-5">
            {/* Hero: head + team + prize + XP rank bar */}
            <div className="flex items-center gap-4">
              <div className={`shrink-0 p-2 ${GUI_SLOT}`}>
                <Head
                  seed={winner.teamName}
                  cellClass="h-2 w-2 sm:h-2.5 sm:w-2.5"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p
                  className={`
                    ${PIXEL_FONT}
                    break-words text-[10px] leading-[1.8]
                    text-[#2B2B2B] sm:text-xs
                  `}
                >
                  {winner.teamName}
                </p>

                <span
                  className={`
                    ${PIXEL_FONT}
                    inline-block self-start border-4 border-[#151A17]
                    px-2 py-1 text-[8px] leading-relaxed
                    text-[#151A17] sm:text-[9px]
                    ${rank.ribbon}
                  `}
                >
                  {winner.label}
                </span>

                {/* XP bar */}
                <div
                  role="img"
                  aria-label={`Rank ${winner.position} of 3`}
                  className="flex h-3 w-full gap-[2px] border-2 border-[#151A17] bg-[#373737] p-[2px]"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <span
                      key={i}
                      className={`h-full flex-1 ${
                        i < rank.xp ? "bg-[#7EFC20]" : "bg-[#555555]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Project: item tooltip */}
            <div className="flex flex-col gap-2">
              <GuiLabel>Project</GuiLabel>
              <div
                className="
                  border-4 border-[#2D0A63] bg-[#100010] p-3
                  shadow-[inset_0_0_0_2px_#5B1FA0]
                "
              >
                <p
                  className={`
                    ${PIXEL_FONT}
                    break-words text-[10px] leading-[1.8] sm:text-xs
                    ${rank.name}
                  `}
                >
                  {winner.projectName || "Unnamed Project"}
                </p>
                <p
                  className={`
                    ${PIXEL_FONT}
                    mt-2 text-[8px] leading-[2] text-[#AAAAAA] sm:text-[9px]
                  `}
                >
                  {rank.title} / {winner.label}
                </p>
                <p
                  className={`
                    ${PIXEL_FONT}
                    text-[8px] leading-[2] text-[#5555FF] sm:text-[9px]
                  `}
                >
                  +{members.length} Members
                </p>
                <p
                  className={`
                    ${PIXEL_FONT}
                    text-[8px] leading-[2] text-[#AA00AA] sm:text-[9px]
                  `}
                >
                  {editionName}
                </p>
              </div>
            </div>

            {/* Members: player-head slots */}
            <div className="flex flex-col gap-2">
              <GuiLabel>Members</GuiLabel>
              {members.length ? (
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {members.map((member) => (
                    <li
                      key={member}
                      className={`flex items-center gap-3 p-2 ${GUI_SLOT}`}
                    >
                      <Head seed={member} cellClass="h-1 w-1 sm:h-1.5 sm:w-1.5" />
                      <span
                        className={`
                          ${PIXEL_FONT}
                          min-w-0 break-words text-[8px] leading-[1.8]
                          text-[#F5F2E8] sm:text-[9px]
                        `}
                      >
                        {member}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={`p-3 ${GUI_SLOT}`}>
                  <p
                    className={`${PIXEL_FONT} text-[9px] leading-[2] text-[#F5F2E8] sm:text-[10px]`}
                  >
                    {tba}
                  </p>
                </div>
              )}
            </div>

            {/* About: written book page */}
            <div className="flex flex-col gap-2">
              <GuiLabel>About</GuiLabel>
              <div
                className="
                  flex border-4 border-[#5A3B1E] bg-[#E9D8A6]
                  shadow-[inset_-3px_-3px_0_0_#C9B57F]
                "
              >
                <div
                  aria-hidden="true"
                  className="w-3 shrink-0 bg-[#795438] shadow-[inset_-2px_0_0_0_#5A3B1E]"
                />
                <p
                  className={`
                    ${PIXEL_FONT}
                    min-w-0 break-words p-3 text-[8px] leading-[2.2]
                    text-[#3B2A14] sm:text-[9px]
                  `}
                >
                  {winner.description || tba}
                </p>
              </div>
            </div>

            {/* Tech stack: inventory slots */}
            <div className="flex flex-col gap-2">
              <GuiLabel>Tech Stack</GuiLabel>
              {techStack.length ? (
                <ul className="flex flex-wrap gap-2">
                  {techStack.map((tech, i) => (
                    <li
                      key={tech}
                      className={`flex items-center gap-2 px-2 py-2 ${GUI_SLOT}`}
                    >
                      <Cube index={i} />
                      <span
                        className={`
                          ${PIXEL_FONT}
                          text-[8px] leading-none text-[#F5F2E8] sm:text-[9px]
                        `}
                      >
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={`p-3 ${GUI_SLOT}`}>
                  <p
                    className={`${PIXEL_FONT} text-[9px] leading-[2] text-[#F5F2E8] sm:text-[10px]`}
                  >
                    {tba}
                  </p>
                </div>
              )}
            </div>

            {/* Hotbar: links + close */}
            <div className="flex flex-wrap items-center gap-3 border-t-4 border-[#8B8B8B] pt-4">
              {winner.projectUrl && (
                <McButton href={winner.projectUrl}>VIEW PROJECT</McButton>
              )}
              {winner.githubUrl && (
                <McButton href={winner.githubUrl}>GITHUB</McButton>
              )}
              {!hasLinks && (
                <p
                  className={`
                    ${PIXEL_FONT}
                    text-[8px] leading-[2] text-[#6B6B6B] sm:text-[9px]
                  `}
                >
                  LINKS COMING SOON
                </p>
              )}
              <span className="ml-auto">
                <McButton onClick={onClose}>DONE</McButton>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


const MORE_INFO_STYLES = {
  stage: `
    absolute -translate-x-1/2 -translate-y-1/2
    w-[9.8cqw] border-2 border-[#151A17]
    bg-[#6D6D6D] py-[0.55cqw]
    text-center text-[clamp(6px,0.78cqw,13px)] leading-none
    text-[#E0E0E0]
    shadow-[inset_2px_2px_0_0_#A0A0A0,inset_-2px_-2px_0_0_#373737]
    transition-colors
    hover:bg-[#5E9C45] hover:text-[#151A17]
    motion-reduce:transition-none
  `,
  mobile: `
    inline-block border-4 border-[#151A17]
    bg-[#6D6D6D] px-4 py-3
    text-[10px] leading-relaxed text-[#E0E0E0]
    shadow-[inset_3px_3px_0_0_#A0A0A0,inset_-3px_-3px_0_0_#373737,3px_3px_0_0_#151A17]
    transition-colors
    hover:bg-[#5E9C45] hover:text-[#151A17]
    active:translate-y-0.5
    motion-reduce:transition-none
  `,
};



const DEBUG_CLASS = "outline outline-1 outline-dashed outline-[#ff3b3b]";
const dbg = DEBUG_LAYOUT ? DEBUG_CLASS : "";

const at = (x, y) => ({ left: `${x}%`, top: `${y}%` });

const PODIUM_ART = { 1: "", 2: "", 3: "" };


const TEX_SIZE = 16;
const TILE = "2.2cqw";

/* palette: random pixel colours, speck: [colourA, colourB, chance],
   cobble: mortar colour, bevel: [highlight, shadow] edge pixels */
const TEX = {
  stone: { palette: ["#7d7d7d", "#8a8a8a", "#6e6e6e", "#979797"], cobble: "#4e4e4e" },
  darkstone: { palette: ["#555555", "#4a4a4a", "#606060", "#505050"], cobble: "#2c2c2c" },
  mosscobble: {
    palette: ["#6f7f5f", "#7e9068", "#5f6f50", "#8aa070"],
    cobble: "#3c4a33",
    speck: ["#4f7f3a", "#5f9a45", 0.2],
  },
  moss: {
    palette: ["#4f7f3a", "#5b8f43", "#477336", "#69a64d"],
    speck: ["#2f5224", "#3a6a2c", 0.16],
  },
  mossdark: {
    palette: ["#2e5226", "#36612c", "#274a20", "#2b4d23"],
    speck: ["#183016", "#1f3d1b", 0.14],
  },
  quartz: {
    palette: ["#ece8df", "#e6e1d6", "#f2efe8", "#e9e5db"],
    bevel: ["#ffffff", "#cfc9bb"],
  },
  amethyst: {
    palette: ["#8a4fd0", "#9a62dc", "#7a40c0", "#a672e6"],
    speck: ["#c9a0ff", "#d8b8ff", 0.1],
    bevel: ["#b98bf0", "#5b2c99"],
  },
  gold: {
    palette: ["#f7d85a", "#f2c14e", "#fbe58a", "#ecb93c"],
    bevel: ["#fff3a8", "#c28a1c"],
  },
  redstone: {
    palette: ["#b5251c", "#c93024", "#9e1d15", "#d9402f"],
    speck: ["#6e120c", "#7c150e", 0.2],
    bevel: ["#e5493a", "#6e120c"],
  },
  obsidian: {
    palette: ["#1d1233", "#241640", "#170e2b", "#201339"],
    speck: ["#5b3aa8", "#7a52d6", 0.07],
  },
  copper: {
    palette: ["#c8693a", "#d47840", "#b85d30", "#e08a52"],
    speck: ["#4fb29a", "#6fd1b6", 0.1],
    bevel: ["#e8905a", "#8a3f1f"],
  },
};

/* Fallback colours shown for one frame before textures are ready */
const MAT_BG = {
  stone: "#707070",
  darkstone: "#515151",
  mosscobble: "#657A55",
  moss: "#4F7F3A",
  mossdark: "#2E5226",
  quartz: "#E8E4DC",
  amethyst: "#8A4FD0",
  gold: "#F2C14E",
  redstone: "#B5251C",
  obsidian: "#1D1233",
  copper: "#C8693A",
};

/* [light facet, base] colours for pixel crystals */
const CRYSTAL = {
  amethyst: ["#D2AEFF", "#8A4FD0"],
  blue: ["#8FDAFF", "#2F7FD0"],
  green: ["#A5EA7E", "#3F9A2F"],
};

function makeRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function paintTexture(name) {
  const spec = TEX[name];
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext("2d");
  const rand = makeRng(hashString(name) + 7);

  // Random pixel noise from the palette (+ optional specks)
  for (let y = 0; y < TEX_SIZE; y += 1) {
    for (let x = 0; x < TEX_SIZE; x += 1) {
      let colour = spec.palette[Math.floor(rand() * spec.palette.length)];
      if (spec.speck && rand() < spec.speck[2]) {
        colour = rand() < 0.5 ? spec.speck[0] : spec.speck[1];
      }
      ctx.fillStyle = colour;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Cobblestone mortar lines
  if (spec.cobble) {
    const rows = [
      [0, 5, [0, 6, 11]],
      [5, 10, [3, 9, 14]],
      [10, 16, [0, 5, 12]],
    ];
    ctx.fillStyle = spec.cobble;
    for (const [y0, y1, xs] of rows) {
      ctx.fillRect(0, y0, TEX_SIZE, 1);
      for (const x of xs) ctx.fillRect(x, y0, 1, y1 - y0);
    }
    ctx.fillStyle = "rgba(255,255,255,0.14)";
    for (const [y0, , xs] of rows) {
      for (const x of xs) ctx.fillRect((x + 1) % TEX_SIZE, y0 + 1, 3, 1);
    }
  }

  // Bevelled edge (light top/left, dark bottom/right)
  if (spec.bevel) {
    ctx.fillStyle = spec.bevel[0];
    ctx.fillRect(0, 0, TEX_SIZE, 1);
    ctx.fillRect(0, 0, 1, TEX_SIZE);
    ctx.fillStyle = spec.bevel[1];
    ctx.fillRect(0, TEX_SIZE - 1, TEX_SIZE, 1);
    ctx.fillRect(TEX_SIZE - 1, 0, 1, TEX_SIZE);
  }

  return canvas.toDataURL();
}

let textureCache = null;

function buildTextures() {
  if (textureCache || typeof document === "undefined") return textureCache;
  const out = {};
  for (const name of Object.keys(TEX)) out[name] = paintTexture(name);
  textureCache = out;
  return out;
}

/* Textures are painted once, in the browser, after mount. */
function useTextures() {
  const [tex, setTex] = useState(textureCache);

  useEffect(() => {
    if (!tex) setTex(buildTextures());
  }, [tex]);

  return tex;
}

/* ---------- 3D building blocks ---------- */

const U = (n) => `calc(${n} * var(--u))`;
const V = (n) => `calc(${n} * var(--v))`;

/* Minecraft-style face lighting: top brightest, sides darker */
const FACE_LIGHT = { front: 1, top: 1.22, right: 0.68, left: 0.56 };

function faceStyle(material, tex, face) {
  const url = tex?.[material];
  const shade =
    face === "front"
      ? "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(0,0,0,0.2))"
      : "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.12))";

  return {
    position: "absolute",
    backgroundColor: MAT_BG[material],
    backgroundImage: url ? `${shade}, url(${url})` : undefined,
    backgroundSize: url ? `100% 100%, ${TILE} ${TILE}` : undefined,
    imageRendering: "pixelated",
    boxShadow: "inset 0 0 0 0.1cqw rgba(0,0,0,0.35)",
    backfaceVisibility: "hidden",
    filter: face === "front" ? undefined : `brightness(${FACE_LIGHT[face]})`,
  };
}

function Cuboid({ b, tex, children }) {
  const d = b.d ?? 20;

  return (
    <div
      style={{
        position: "absolute",
        left: U(b.x),
        top: V(b.y),
        width: U(b.w),
        height: V(b.h),
        transformStyle: "preserve-3d",
        transform: `translateZ(${U(b.z ?? 0)})`,
      }}
    >
      {/* Front */}
      <div
        style={{
          ...faceStyle(b.m, tex, "front"),
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>

      {/* Top */}
      <div
        style={{
          ...faceStyle(b.m, tex, "top"),
          left: 0,
          top: U(-d),
          width: "100%",
          height: U(d),
          transformOrigin: "bottom",
          transform: "rotateX(90deg)",
        }}
      />

      {/* Right side */}
      <div
        style={{
          ...faceStyle(b.m, tex, "right"),
          left: "100%",
          top: 0,
          width: U(d),
          height: "100%",
          transformOrigin: "left",
          transform: "rotateY(90deg)",
        }}
      />

      {/* Left side */}
      <div
        style={{
          ...faceStyle(b.m, tex, "left"),
          left: U(-d),
          top: 0,
          width: U(d),
          height: "100%",
          transformOrigin: "right",
          transform: "rotateY(-90deg)",
        }}
      />
    </div>
  );
}

/* Crystal made of three crossed planes so it has volume */
function Crystal3D({ b }) {
  const [light, base] = CRYSTAL[b.c];

  const plane = (rotateY) => (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(100deg, ${light} 0 42%, ${base} 42% 100%)`,
        clipPath: "polygon(50% 0, 100% 32%, 86% 100%, 14% 100%, 0 32%)",
        transform: `rotateY(${rotateY}deg)`,
      }}
    />
  );

  return (
    <div
      style={{
        position: "absolute",
        left: U(b.x),
        top: V(b.y),
        width: U(b.w),
        height: V(b.h),
        transformStyle: "preserve-3d",
        transform: `translateZ(${U(b.z ?? 0)}) rotate(${b.r ?? 0}deg)`,
      }}
    >
      {plane(38)}
      {plane(-38)}
      {plane(0)}
    </div>
  );
}

function Part({ p, tex }) {
  if (p.t === "cry") return <Crystal3D b={p} />;

  if (p.t === "glow") {
    return (
      <div
        style={{
          position: "absolute",
          left: U(p.x),
          top: V(p.y),
          width: U(p.w),
          height: V(p.h),
          background: p.c,
          filter: "blur(1.6cqw)",
          borderRadius: "50%",
          transform: `translateZ(${U(p.z ?? -30)})`,
        }}
      />
    );
  }

  if (p.t === "chain") {
    return (
      <div
        style={{
          position: "absolute",
          left: U(p.x),
          top: V(p.y),
          width: U(p.w),
          height: V(p.h),
          transform: `translateZ(${U(p.z ?? 0)})`,
          backgroundImage:
            "repeating-linear-gradient(180deg, #A3A3A3 0 0.45cqw, #3C3C3C 0.45cqw 0.72cqw, transparent 0.72cqw 1.05cqw)",
        }}
      />
    );
  }

  return <Cuboid b={p} tex={tex} />;
}

const box = (m, x, y, w, h, d, z = 0) => ({ t: "box", m, x, y, w, h, d, z });
const cry = (c, x, y, w, h, r = 0, z = 6) => ({ t: "cry", c, x, y, w, h, r, z });
const glow = (c, x, y, w, h, z = -40) => ({ t: "glow", c, x, y, w, h, z });
const chain = (x, y, w, h, z = -9) => ({ t: "chain", x, y, w, h, z });

const ARCH_CLIP = "polygon(5% 0, 95% 0, 100% 4%, 100% 100%, 0 100%, 0 4%)";

const PODIUM = {
  /* ---------- 2ND: amethyst + quartz ---------- */
  2: {
    x: 27,
    w: 20,
    h: 25.5,
    tilt: { x: -6, y: 16 },
    plate: { x: 27, y: 78.4 },
    button: { x: 27, y: 84.6 },
    placeholder: "NO IMAGE",
    win: { x: 22, y: 27, w: 56, h: 40, z: -22, glow: "rgba(170,100,255,0.7)" },
    plaque: { m: "quartz", x: 30, y: 11.5, w: 40, h: 8, d: 4, z: -4, color: "text-[#3F3F3F]" },
    parts: [
      glow("rgba(150,80,255,0.55)", 15, 18, 70, 54),
      // cry("amethyst", 2, 0, 11, 17, -10, -4),
      // cry("amethyst", 12, 6, 8, 12, 8, -4),
      // cry("amethyst", 87, 0, 11, 17, 10, -4),
      // cry("amethyst", 80, 6, 8, 12, -8, -4),

      box("stone", 0, 83, 100, 17, 64, 0),
      box("darkstone", 6, 70, 88, 14, 54, -6),

      box("quartz", 5, 14, 13, 58, 32, -10),
      box("quartz", 82, 14, 13, 58, 32, -10),
      box("quartz", 5, 14, 90, 10, 32, -8),

      box("amethyst", 18, 24, 4, 48, 26, -12),
      box("amethyst", 78, 24, 4, 48, 26, -12),
      box("amethyst", 18, 24, 64, 3, 26, -12),
      box("amethyst", 18, 67, 64, 5, 26, -12),

      chain(9, 24, 3.2, 46, -9),
      chain(87.8, 24, 3.2, 46, -9),

      // cry("blue", 2, 73, 8, 13, 0, 8),
      // cry("blue", 90, 73, 8, 13, 0, 8),
      // cry("amethyst", -3, 58, 10, 19, -8, 10),
      // cry("amethyst", 93, 58, 10, 19, 8, 10),
      // cry("amethyst", 11, 70, 6, 11, 0, 8),
      // cry("amethyst", 83, 70, 6, 11, 0, 8),
    ],
  },

  /* ---------- 1ST: gold + obsidian + redstone ---------- */
  1: {
    x: 51.5,
    w: 25,
    h: 29,
    tilt: { x: -6, y: 0 },
    plate: { x: 51.5, y: 78.6 },
    button: { x: 51.5, y: 85.4 },
    win: {
      x: 23,
      y: 24,
      w: 54,
      h: 45,
      z: -22,
      clip: "polygon(6% 0, 94% 0, 100% 5%, 100% 100%, 0 100%, 0 5%)",
      glow: "rgba(255,140,40,0.75)",
    },
    plaque: { m: "gold", x: 32, y: 2.5, w: 36, h: 7.5, d: 4, z: 2, color: "text-[#151A17]" },
    parts: [
      glow("rgba(255,150,40,0.5)", 14, 16, 72, 58),

      box("gold", 0, 87, 100, 13, 60, 0),
      box("gold", 4, 75, 92, 12, 50, -6),
      // box("redstone", 3, 66, 8, 9, 16, -4),
      // box("redstone", 89, 66, 8, 9, 16, -4),

      box("gold", 6, 18, 13, 58, 30, -12),
      box("gold", 81, 18, 13, 58, 30, -12),
      box("gold", 6, 9, 88, 11, 30, -10),

box("gold", 18, 19, 5, 55, 26, -14),
box("gold", 77, 19, 5, 55, 26, -14),
box("gold", 18, 19, 64, 5, 26, -14),
box("gold", 18, 69, 64, 5, 26, -14),

      box("gold", 2, 9, 15, 13, 34, -4),
      box("gold", 83, 9, 15, 13, 34, -4),
      // box("redstone", 5, 3, 8, 8, 20, -2),
      // box("redstone", 87, 3, 8, 8, 20, -2),

      // cry("blue", 12, 68, 6, 10, 0, 8),
      // cry("blue", 82, 68, 6, 10, 0, 8),
      // cry("blue", -1, 80, 6, 10, 0, 10),
      // cry("blue", 95, 80, 6, 10, 0, 10),
    ],
  },

  /* ---------- 3RD: mossy cobblestone + copper ---------- */
  3: {
    x: 76.6,
    w: 22,
    h: 25,
    tilt: { x: -6, y: -16 },
    plate: { x: 76.6, y: 78.4 },
    button: { x: 76.6, y: 84.6 },
    placeholder: "NO IMAGE",
    win: { x: 22, y: 27, w: 56, h: 39, z: -22, glow: "rgba(80,255,130,0.65)" },
    plaque: { m: "moss", x: 30, y: 10, w: 40, h: 8, d: 4, z: -4, color: "text-[#E8FFE0]" },
    parts: [
      glow("rgba(70,255,120,0.4)", 15, 20, 70, 52),

      box("moss", 0, 85, 100, 15, 60, 0),
      box("mosscobble", 6, 71, 88, 15, 52, -6),

      box("mosscobble", 4, 15, 14, 58, 30, -12),
      box("mosscobble", 82, 15, 14, 58, 30, -12),
      box("moss", 3, 13, 94, 11, 32, -10),

      box("mossdark", 18, 24, 4, 47, 26, -14),
      box("mossdark", 78, 24, 4, 47, 26, -14),
      box("mossdark", 18, 24, 64, 3, 26, -14),
      box("mossdark", 18, 66, 64, 5, 26, -14),

      box("copper", 1, 9, 13, 13, 34, -6),
      box("copper", 86, 9, 13, 13, 34, -6),
      box("copper", 1, 69, 9, 11, 20, -4),
      box("copper", 90, 69, 9, 11, 20, -4),
      box("moss", 22, 8, 12, 5, 14, -8),
      box("moss", 62, 7, 14, 6, 14, -8),

      // cry("green", 12, 78, 5, 10, 0, 8),
      // cry("green", 83, 78, 5, 10, 0, 8),
      // cry("green", 17, 80, 4, 8, 0, 8),
    ],
  },
};

const podiumTransform = (tilt) =>
  `translateX(-50%) perspective(80cqw) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

function Podium({ winner, editionName }) {
  const P = PODIUM[winner.position];
  const tex = useTextures();
  const art = PODIUM_ART[winner.position];
  const alt = `${winner.teamName} - ${winner.label} winner, ${editionName}`;
  const winZ = art ? -1 : P.win.z;

  return (
    <div
      className="absolute"
      style={{
        left: `${P.x}%`,
        bottom: "11.5%",
        width: `${P.w}cqw`,
        aspectRatio: `${P.w} / ${P.h}`,
        "--u": `${P.w / 100}cqw`,
        "--v": `${P.h / 100}cqw`,
        transformStyle: "preserve-3d",
        transform: podiumTransform(P.tilt),
        transformOrigin: "50% 100%",
      }}
    >
      {/* Soft shadow on the ground */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-8%",
          right: "-8%",
          bottom: "-3%",
          height: "9%",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.6), transparent 70%)",
          transform: `translateZ(${U(-24)})`,
        }}
      />

      {art ? (
        <img
          src={art}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
        />
      ) : (
        P.parts.map((p, i) => <Part key={i} p={p} tex={tex} />)
      )}

      {/* Team photo inside the portal opening (recessed into the arch) */}
      <div
        className={dbg}
        style={{
          position: "absolute",
          left: U(P.win.x),
          top: V(P.win.y),
          width: U(P.win.w),
          height: V(P.win.h),
          overflow: "hidden",
          clipPath: P.win.clip,
          backgroundColor: "#12161A",
          transform: `translateZ(${U(winZ)})`,
        }}
      >
        <WinnerImage
          src={winner.image}
          alt={alt}
          placeholderLabel={P.placeholder}
          cellClass="h-[0.55cqw] w-[0.55cqw]"
          textClass="text-[clamp(6px,0.8cqw,13px)]"
        />

        {/* Inner glow so the photo sits inside the portal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: `inset 0 0 2.4cqw ${P.win.glow}, inset 0 0 0 0.25cqw rgba(0,0,0,0.75)`,
          }}
        />
      </div>

      {/* Prize plaque */}
      {!art && (
        <Cuboid b={{ ...P.plaque, t: "box" }} tex={tex}>
          <span
            className={`
              ${PIXEL_FONT}
              whitespace-nowrap text-[clamp(6px,0.78cqw,13px)] leading-none
              ${P.plaque.color}
            `}
          >
            {winner.label}
          </span>
        </Cuboid>
      )}
    </div>
  );
}

/* Wooden plank styling (team plates, edition sign) */
const WOOD_STYLE = {
  backgroundColor: "#B88A50",
  backgroundImage:
    "repeating-linear-gradient(180deg, transparent 0 0.85cqw, rgba(0,0,0,0.2) 0.85cqw 1cqw)",
  border: "0.25cqw solid #2B1B0C",
  boxShadow: "inset 0.25cqw 0.25cqw 0 #A98350, inset -0.25cqw -0.25cqw 0 #5A3B1E",
};
/* Enchanted obsidian name plate: rank-coloured rim + glowing gems */
const PLATE_RANK = {
  1: { rim: "#F2C14E", rimDark: "#B8821C", text: "#FFF3B0", glow: "rgba(242,193,78,0.55)" },
  2: { rim: "#B58CE8", rimDark: "#5B2C99", text: "#F1E4FF", glow: "rgba(170,100,255,0.55)" },
  3: { rim: "#5E9C45", rimDark: "#2F5224", text: "#E6FFD8", glow: "rgba(80,255,130,0.45)" },
};

const plateStyle = (r) => ({
  backgroundColor: "#171021",
  backgroundImage: [
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 0.35cqw, transparent 0.35cqw 0.7cqw)",
    "repeating-linear-gradient(180deg, rgba(255,255,255,0.035) 0 0.35cqw, transparent 0.35cqw 0.7cqw)",
    "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(0,0,0,0.3))",
  ].join(", "),
  border: `0.3cqw solid ${r.rim}`,
  boxShadow: `inset 0 0 0 0.25cqw #0B0713, inset 0 0.3cqw 0 0.25cqw rgba(255,255,255,0.08), 0 0.45cqw 0 ${r.rimDark}, 0 0.45cqw 0 0.3cqw #0C100D, 0 0 1.6cqw ${r.glow}`,
});

const gem = (r, side) => (
  <span
    aria-hidden="true"
    className={`absolute top-1/2 h-[0.7cqw] w-[0.7cqw] -translate-y-1/2 rotate-45 ${side}`}
    style={{
      background: r.rim,
      boxShadow: `inset 0.12cqw 0.12cqw 0 rgba(255,255,255,0.7), inset -0.12cqw -0.12cqw 0 ${r.rimDark}, 0 0 0.8cqw ${r.glow}`,
    }}
  />
);
function StageWinner({ winner, editionName }) {
  const P = PODIUM[winner.position];

  return (
    <li>
      <Podium winner={winner} editionName={editionName} />

<h4
  className={`
    ${PIXEL_FONT}
    absolute flex h-[3.1cqw] w-[13.4cqw] -translate-x-1/2 -translate-y-1/2
    items-center justify-center overflow-hidden break-words
    px-[1.3cqw] py-[0.3cqw]
    text-center text-[clamp(6px,0.66cqw,11px)]
    ${dbg}
  `}
  style={{
    ...at(P.plate.x, P.plate.y),
    ...plateStyle(PLATE_RANK[winner.position]),
    color: PLATE_RANK[winner.position].text,
    textShadow: `0.15cqw 0.15cqw 0 ${PLATE_RANK[winner.position].rimDark}`,
  }}
>
  {gem(PLATE_RANK[winner.position], "left-[0.7cqw]")}
  {winner.teamName}
  {gem(PLATE_RANK[winner.position], "right-[0.7cqw]")}
</h4>
    </li>
  );
}

const PICK_COLORS = { S: "bg-[#A8A8A8]", B: "bg-[#795438]" };

function StageEditionButton({ label, x, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={at(x, 95.4)}
      className={`
        ${PIXEL_FONT}
        absolute -translate-x-1/2 -translate-y-1/2
        w-[11cqw] border-2 bg-[#6D6D6D] py-[0.7cqw]
        text-center text-[clamp(6px,0.78cqw,13px)] leading-none
        shadow-[inset_2px_2px_0_0_#A0A0A0,inset_-2px_-2px_0_0_#373737]
        transition-colors
        hover:bg-[#5E9C45] hover:text-[#151A17]
        motion-reduce:transition-none
        ${
          active
            ? "border-[#F2C14E] text-[#F2C14E]"
            : "border-[#151A17] text-[#E0E0E0]"
        }
        ${dbg}
        ${FOCUS_RING}
      `}
    >
      {label}
    </button>
  );
}

/* Per-rank "material" used by the mobile frames */
const MOBILE_TONE = {
  1: {
    fill: "#F2C14E", light: "#FFE58A", dark: "#B8821C", rim: "#5A3B0F",
    stud: "#B5251C", glow: "rgba(242,193,78,0.45)", base: "#B8821C",
    badge: "bg-[#F2C14E] text-[#151A17]", mark: "#FFE58A",
  },
  2: {
    fill: "#8A4FD0", light: "#B98BF0", dark: "#5B2C99", rim: "#2A1252",
    stud: "#79C9F2", glow: "rgba(150,80,255,0.4)", base: "#5B2C99",
    badge: "bg-[#B58CE8] text-[#151A17]", mark: "#D8B8FF",
  },
  3: {
    fill: "#5E9C45", light: "#8FCB6E", dark: "#2F5224", rim: "#14260F",
    stud: "#C8693A", glow: "rgba(94,156,69,0.4)", base: "#2F5224",
    badge: "bg-[#5E9C45] text-[#151A17]", mark: "#A5EA7E",
  },
};

const PX_TEXTURE =
  "repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0 4px, transparent 4px 8px), repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 4px, transparent 4px 8px)";

const CHAIN_BG =
  "repeating-linear-gradient(180deg, #A3A3A3 0 4px, #3C3C3C 4px 6px, transparent 6px 9px)";

function MobileWinner({ winner, editionName, active = false, onSelect }) {
  const t = MOBILE_TONE[winner.position];
  const alt = `${winner.teamName} - ${winner.label} winner, ${editionName}`;

  const stud = (pos) => (
    <span
      aria-hidden="true"
      className={`absolute h-3 w-3 border-2 border-[#151A17] ${pos}`}
      style={{
        background: t.stud,
        boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.5)",
      }}
    />
  );

  return (
    <li
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={`
        relative flex w-[70vw] max-w-[12.5rem] shrink-0
        snap-center flex-col items-center
        transition-all duration-300 ease-out
        motion-reduce:transition-none
        ${active ? "z-10 scale-110 opacity-100" : "scale-90 opacity-65"}
      `}
    >
      {/* Prize badge hanging from two chains */}
      <div className="relative flex w-full justify-center">
        <span
          aria-hidden="true"
          className="absolute left-[22%] top-full z-0 h-3 w-[6px]"
          style={{ backgroundImage: CHAIN_BG }}
        />
        <span
          aria-hidden="true"
          className="absolute right-[22%] top-full z-0 h-3 w-[6px]"
          style={{ backgroundImage: CHAIN_BG }}
        />
        <span
          className={`
            ${PIXEL_FONT}
            relative z-10 border-4 border-[#151A17] px-3 py-1.5
            text-[8px] leading-relaxed
            shadow-[inset_2px_2px_0_0_rgba(255,255,255,0.55),inset_-2px_-2px_0_0_rgba(0,0,0,0.3),3px_3px_0_0_#151A17]
            ${t.badge}
          `}
        >
          {winner.label}
        </span>
      </div>

      {/* Block-style picture frame */}
      <div
        className="relative mt-3 aspect-square w-full border-4 border-[#151A17] p-[10px]"
        style={{
          backgroundColor: t.fill,
          backgroundImage: PX_TEXTURE,
          boxShadow: `inset 4px 4px 0 0 ${t.light}, inset -4px -4px 0 0 ${t.dark}, 4px 4px 0 0 #0C100D, 0 0 18px 2px ${t.glow}`,
        }}
      >
        {stud("left-[2px] top-[2px]")}
        {stud("right-[2px] top-[2px]")}
        {stud("bottom-[2px] left-[2px]")}
        {stud("bottom-[2px] right-[2px]")}

        {/* Recessed picture */}
        <div
          className="relative h-full w-full overflow-hidden border-4"
          style={{
            borderColor: t.rim,
            backgroundColor: "#12161A",
            boxShadow: `0 0 0 2px ${t.dark}`,
          }}
        >
          <WinnerImage
            src={winner.image}
            alt={alt}
            cellClass="h-1 w-1"
            textClass="text-[7px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: `inset 0 0 14px ${t.glow}, inset 3px 3px 0 rgba(0,0,0,0.55), inset -3px -3px 0 rgba(255,255,255,0.08)`,
            }}
          />
        </div>
      </div>

      {/* Wooden sign for the team name, nailed on */}
      <div
        className="relative mt-3 w-[92%] border-4 border-[#2B1B0C] px-3 py-2"
        style={{
  backgroundColor: "#B88A50",
  backgroundImage:
    "repeating-linear-gradient(180deg, transparent 0 6px, rgba(100,62,24,0.28) 6px 8px)",
  boxShadow:
    "inset 3px 3px 0 #D0A468, inset -3px -3px 0 #8A6234, 3px 3px 0 #0C100D",
}}
      >
        <span aria-hidden="true" className="absolute left-1 top-1 h-1 w-1 bg-[#2B1B0C]" />
        <span aria-hidden="true" className="absolute right-1 top-1 h-1 w-1 bg-[#2B1B0C]" />
        <h4
          className={`
            ${PIXEL_FONT}
            break-words text-center text-[8px] leading-[1.8]
            text-[#F5F2E8] [text-shadow:1px_1px_0_#2B1B0C]
          `}
        >
          {winner.teamName}
        </h4>
      </div>

      {/* Little block pedestal */}
      <div
        aria-hidden="true"
        className="mt-2 h-5 w-[70%] border-[3px] border-[#151A17]"
        style={{
          backgroundColor: t.base,
          backgroundImage: PX_TEXTURE,
          boxShadow: `inset 0 3px 0 0 ${t.mark}`,
        }}
      />
    </li>
  );
}

export default function PrevWinners() {
  // HackFusion 3 is the default edition (EDITIONS index 0).
  const [index, setIndex] = useState(0);
  const edition = EDITIONS[index];

  /* Mobile carousel: which card is centred (starts on 1st prize) */
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const frameRef = useRef(null);

  /* Pick the card whose centre is closest to the track's centre */
  const handleTrackScroll = () => {
    if (frameRef.current) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const track = trackRef.current;
      if (!track) return;

      const centre = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDistance = Infinity;

      Array.from(track.children).forEach((child, i) => {
        const childCentre = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(childCentre - centre);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = i;
        }
      });

      setActiveIndex(closest);
    });
  };

  const scrollToCard = (i) => {
    const child = trackRef.current?.children[i];
    child?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  /* Cancel any pending frame on unmount */
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const mobileNav = `
    ${PIXEL_FONT}
    border-4 border-[#777777]
    bg-[#242B25]
    px-4 py-3
    text-[9px] leading-relaxed
    text-[#F5F2E8]
    shadow-[3px_3px_0_0_#151A17]
    transition-colors
    hover:border-[#5E9C45]
    hover:text-[#F2C14E]
    motion-reduce:transition-none
    ${FOCUS_RING}
  `;

  return (
  <section
    id="previous-winners"
    aria-label="Winners of HackFusion 3"
    className="relative isolate w-full overflow-x-clip bg-[#0E1210]"
  >
    <p className="sr-only" aria-live="polite">
      {`Showing winners of ${edition.name}`}
    </p>

    {/* DESKTOP STAGE */}
    <div className="relative hidden w-full [container-type:inline-size] md:block">
      <img
        src={BACKGROUND_SRC}
        alt=""
        aria-hidden="true"
        draggable={false}
        decoding="async"
        className="block h-auto w-full select-none"
      />
    {/* WINNERS heading */}
<h2
className={`
    ${PIXEL_FONT}
    absolute left-1/2 top-[12%]
    -translate-x-1/2 -translate-y-1/2
    whitespace-nowrap text-center
    text-[clamp(27px,5cqw,80px)]
    leading-none
    text-[#F2C14E]
    [text-shadow:3px_3px_0_#795438,5px_5px_0_#151A17]
  `}
>
  WINNERS
</h2>


{/* HackFusion 3 banner: plank image with the name written on top */}
<div
  aria-live="polite"
  className={`absolute -translate-x-1/2 -translate-y-1/2 ${dbg}`}
  style={{
    ...at(50.4, 27.5),
    width: "24cqw",
  }}
>
  <img
    src={BANNER_SRC}
    alt=""
    aria-hidden="true"
    draggable={false}
    decoding="async"
    className="block h-auto w-full select-none [image-rendering:pixelated]"
  />
  <span
    className={`
      ${PIXEL_FONT}
      absolute inset-0 flex items-center justify-center
      whitespace-nowrap px-[8%] text-center
      text-[clamp(7px,1.45cqw,24px)] leading-none
      text-[#2B1B0C]
      [text-shadow:0.1cqw_0.1cqw_0_rgba(255,255,255,0.22)]
    `}
  >
    {edition.name.toUpperCase()}
  </span>
</div>



      {/* Winners */}
      <ul className="absolute inset-0 m-0 list-none p-0">
        {edition.winners.map((winner) => (
          <StageWinner
            key={`${edition.id}-${winner.position}`}
            winner={winner}
            editionName={edition.name}
          />
        ))}
      </ul>
    </div>

    {/* MOBILE LAYOUT */}
    <div className="relative md:hidden">
      <img
        src={BACKGROUND_SRC}
        alt=""
        aria-hidden="true"
        draggable={false}
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-35"
      />

      <div className="relative z-10 flex flex-col items-center py-10">
        {/* WINNERS */}
        <h2
          className={`
            ${PIXEL_FONT}
            mx-auto px-4 text-center
            text-4xl leading-relaxed
            text-[#F2C14E]
            [text-shadow:3px_3px_0_#795438,5px_5px_0_#151A17]
            sm:text-3xl
          `}
        >
          WINNERS
        </h2>

        {/* HackFusion 3 banner: plank image with the name written on top */}
        <div className="relative mt-5 w-[min(86vw,22rem)]">
          <img
            src={BANNER_SRC}
            alt=""
            aria-hidden="true"
            draggable={false}
            decoding="async"
            className="block h-auto w-full select-none [image-rendering:pixelated]"
          />
          <span
            className={`
              ${PIXEL_FONT}
              absolute inset-0 flex items-center justify-center
              whitespace-nowrap px-[12%] text-center
              text-[clamp(9px,3.6vw,15px)] leading-none
              text-[#2B1B0C]
              [text-shadow:1px_1px_0_rgba(255,255,255,0.22)]
            `}
          >
            {edition.name.toUpperCase()}
          </span>
        </div>

        {/* Winners: horizontal swipe carousel (1st → 2nd → 3rd) */}
        <ul
          ref={trackRef}
          onScroll={handleTrackScroll}
          aria-label="Swipe to see the winners"
          className="
            relative m-0 mt-4 flex w-full list-none items-center gap-6
            overflow-x-auto overflow-y-hidden overscroll-x-contain
            snap-x snap-mandatory scroll-smooth
            py-12
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            motion-reduce:scroll-auto
          "
          style={{
            /* side padding so the first and last cards can sit in the centre */
            paddingLeft: "calc(50% - min(35vw, 6.25rem))",
            paddingRight: "calc(50% - min(35vw, 6.25rem))",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {edition.winners.map((winner, i) => (
            <MobileWinner
              key={`${edition.id}-${winner.position}`}
              winner={winner}
              editionName={edition.name}
              active={i === activeIndex}
              onSelect={() => scrollToCard(i)}
            />
          ))}
        </ul>
      </div>
    </div>
  </section>
);
}