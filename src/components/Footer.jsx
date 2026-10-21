import { useState } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaHouse,
  FaEnvelope,
  FaCircleQuestion,
} from "react-icons/fa6";

const BEDROCK_SRC = "/images/footer/bedrock.webp";
const MAP_SRC = "/images/footer/map.webp";

const VENUE = {
  name: "Shri Guru Gobind Singhji Institute of Engineering and Technology",
  address: "Vishnupuri, Nanded 431-606, Maharashtra, India",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Shri+Guru+Gobind+Singhji+Institute+of+Engineering+and+Technology+Vishnupuri+Nanded",
};

const SOCIALS = [
  {
    label: "INSTAGRAM",
    href: "https://www.instagram.com/sggs_swag/",
    aria: "SWAG on Instagram (opens in a new tab)",
    Icon: FaInstagram,
  },
  {
    label: "LINKEDIN",
    href: "https://in.linkedin.com/company/swag-developer-s-club",
    aria: "SWAG on LinkedIn (opens in a new tab)",
    Icon: FaLinkedinIn,
  },
];

const QUICK_LINKS = [
  { label: "HOME", href: "#home", Icon: FaHouse },
  { label: "CONTACT", href: "#contact", Icon: FaEnvelope },
  { label: "FAQ", href: "#faq", Icon: FaCircleQuestion },
];

const PIXEL_FONT = "font-['Press_Start_2P',monospace]";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E]";

const P = (n) => `calc(var(--p) * ${n})`;

const WOOD_BASE = "#B98B53";
const WOOD_JOINT = "rgba(70, 42, 16, 0.55)";
const WOOD_LINE = "rgba(60, 36, 14, 0.62)";
const WOOD_LIGHT = "rgba(255, 236, 190, 0.34)";
const WOOD_DARK = "rgba(50, 28, 10, 0.45)";

const WOOD_SPECKLE =
  "repeating-conic-gradient(rgba(255,255,255,0.07) 0% 25%, rgba(0,0,0,0.06) 0% 50%)";

const joint = (at) =>
  `linear-gradient(90deg, transparent ${P(at)}, ${WOOD_JOINT} ${P(at)}, ${WOOD_JOINT} ${P(at + 1)}, transparent ${P(at + 1)})`;

const BAND_STYLE = {
  backgroundColor: WOOD_BASE,
  backgroundImage: [
    `linear-gradient(${WOOD_LIGHT}, ${WOOD_LIGHT})`,
    `linear-gradient(${WOOD_DARK}, ${WOOD_DARK})`,
    `linear-gradient(180deg, transparent ${P(5)}, ${WOOD_LINE} ${P(5)})`,
    joint(11),
    joint(21),
    joint(15),
    WOOD_SPECKLE,
  ].join(", "),
  backgroundSize: [
    `100% ${P(1)}`,
    `100% ${P(1)}`,
    `100% ${P(6)}`,
    `${P(30)} ${P(5)}`,
    `${P(26)} ${P(5)}`,
    `${P(34)} ${P(5)}`,
    `${P(2)} ${P(2)}`,
  ].join(", "),
  backgroundPosition: [
    "0 0",
    "0 100%",
    "0 0",
    "0 0",
    `0 ${P(6)}`,
    `0 ${P(12)}`,
    "0 0",
  ].join(", "),
  backgroundRepeat: [
    "no-repeat",
    "no-repeat",
    "repeat-y",
    "repeat-x",
    "repeat-x",
    "repeat-x",
    "repeat",
  ].join(", "),
  imageRendering: "pixelated",
  boxShadow: `0 ${P(1)} 0 rgba(0, 0, 0, 0.5)`,
};

const TOP_BLOCKS = [
  [1.5, 4.5],
  [9, 3.2],
  [15.5, 5.6],
  [24, 3.8],
  [31, 5],
  [40, 3.4],
  [47.5, 6],
  [57, 3.6],
  [63, 5.2],
  [72, 3.4],
  [79.5, 5.8],
  [88, 3.6],
  [94, 4.6],
];

const HANG_BLOCKS = [
  [3.5, 3.4],
  [11, 2.8],
  [19.5, 4.2],
  [27, 3],
  [35.5, 3.8],
  [44, 2.8],
  [52, 4.4],
  [60.5, 3],
  [68, 3.8],
  [76, 2.8],
  [83, 4.2],
  [91, 3.2],
];

const BLOCK_STYLE = {
  backgroundColor: WOOD_BASE,
  backgroundImage: [
    `linear-gradient(${WOOD_LIGHT}, ${WOOD_LIGHT})`,
    `linear-gradient(${WOOD_DARK}, ${WOOD_DARK})`,
    joint(4),
    WOOD_SPECKLE,
  ].join(", "),
  backgroundSize: [
    `100% ${P(1)}`,
    `100% ${P(1)}`,
    `${P(14)} 100%`,
    `${P(2)} ${P(2)}`,
  ].join(", "),
  backgroundPosition: "0 0, 0 100%, 0 0, 0 0",
  backgroundRepeat: "no-repeat, no-repeat, repeat-x, repeat",
  imageRendering: "pixelated",
  minWidth: P(6),
  height: P(3),
};

function WoodenSeam() {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 w-full"
      style={{ height: P(20) }}
    >
      {/* Notched wooden blocks */}
      {TOP_BLOCKS.map(([left, width]) => (
        <span
          key={`top-${left}`}
          className="absolute top-0"
          style={{
            ...BLOCK_STYLE,
            left: `${left}%`,
            width: `${width}%`,
          }}
        />
      ))}

      {/* Main wooden fence/plank */}
      <div
        className="absolute inset-x-0"
        style={{
          ...BAND_STYLE,
          top: P(3),
          height: P(17),
        }}
      />

      {/* Hanging wooden blocks */}
      {HANG_BLOCKS.map(([left, width]) => (
        <span
          key={`hang-${left}`}
          className="absolute"
          style={{
            ...BLOCK_STYLE,
            left: `${left}%`,
            width: `${width}%`,
            top: P(20),
            boxShadow: `0 ${P(1)} 0 rgba(0, 0, 0, 0.45)`,
          }}
        />
      ))}
    </div>
  );
}

const BEDROCK_STYLE = {
  backgroundColor: "#141414",
  backgroundImage: `linear-gradient(rgba(8, 8, 8, 0.58), rgba(8, 8, 8, 0.72)), url(${BEDROCK_SRC})`,
  backgroundRepeat: "repeat",
  backgroundSize: "auto, 96px 96px",
  imageRendering: "pixelated",
};

const PIN_ROWS = [
  ".DDDD.",
  "DGGGGD",
  "DGDDGD",
  "DGGGGD",
  ".DGGD.",
  "..DD..",
];

const PIN_COLORS = {
  D: "bg-[#151A17]",
  G: "bg-[#F2C14E]",
};

function MapPin() {
  return (
    <span aria-hidden="true" className="grid grid-cols-6">
      {PIN_ROWS.flatMap((row, r) =>
        [...row].map((cell, c) => (
          <span
            key={`${r}-${c}`}
            className={`h-1 w-1 sm:h-[5px] sm:w-[5px] ${PIN_COLORS[cell] ?? ""}`}
          />
        ))
      )}
    </span>
  );
}

function SectionHeading({ children }) {
  return (
    <h3
      className={`
        ${PIXEL_FONT}
        flex items-center gap-2
        text-[10px] leading-relaxed text-[#F2C14E]
        [text-shadow:2px_2px_0_#151A17]
      `}
    >
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 shrink-0 bg-[#5E9C45]"
      />
      {children}
    </h3>
  );
}

function GrassButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${PIXEL_FONT}
        inline-block self-start border-4 border-[#151A17]
        bg-[#5E9C45] px-3 py-2
        text-[9px] leading-relaxed text-[#151A17]
        shadow-[inset_2px_2px_0_0_#8CCB6F,inset_-2px_-2px_0_0_#3E7A2C,3px_3px_0_0_#0C100D]
        transition-[transform,background-color,box-shadow]
        hover:-translate-y-0.5 hover:bg-[#F2C14E]
        hover:shadow-[inset_2px_2px_0_0_#F8DE95,inset_-2px_-2px_0_0_#C49A28,3px_3px_0_0_#0C100D]
        active:translate-y-0.5
        motion-reduce:transition-none motion-reduce:hover:translate-y-0
        ${FOCUS_RING}
      `}
    >
      {children}
    </a>
  );
}

function VenueCard() {
  const [mapFailed, setMapFailed] = useState(false);

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <SectionHeading>FIND US</SectionHeading>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
        {/* Minecraft map */}
        <div
          className="
            relative w-full max-w-[9rem] shrink-0
            border-4 border-[#151A17] bg-[#0C100D]
            shadow-[3px_3px_0_0_#0C100D,0_0_0_2px_#5A3B1E]
            sm:max-w-none sm:w-40 md:w-44
          "
        >
          {mapFailed ? (
            <div
              role="img"
              aria-label="Minecraft map of the venue; image not available"
              className={`
                ${PIXEL_FONT}
                flex aspect-square items-center justify-center p-2
                text-center text-[8px] leading-relaxed text-[#C5C9BE]
              `}
            >
              MAP IMAGE NOT FOUND
            </div>
          ) : (
            <img
              src={MAP_SRC}
              alt="Minecraft-style map showing the SGGSIE&T campus in Nanded"
              loading="lazy"
              draggable="false"
              onError={() => setMapFailed(true)}
              className="block h-auto w-full select-none [image-rendering:pixelated]"
            />
          )}

          <a
            href={VENUE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the venue location in Google Maps (opens in a new tab)"
            title="Open in Google Maps"
            className={`
              absolute left-[58%] top-[44%]
              -translate-x-1/2 -translate-y-full
              transition-transform hover:-translate-y-[130%]
              motion-reduce:transition-none motion-reduce:hover:-translate-y-full
              ${FOCUS_RING}
            `}
          >
            <MapPin />
          </a>
        </div>

        {/* Venue details */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-3">
          <div className="flex flex-col gap-2">
            <p
              className={`
                ${PIXEL_FONT}
                break-words text-[9px] leading-[1.9] text-[#F5F2E8]
              `}
            >
              {VENUE.name}
            </p>

            <address
              className={`
                ${PIXEL_FONT}
                break-words text-[8px] not-italic leading-[2] text-[#C5C9BE]
              `}
            >
              {VENUE.address}
            </address>
          </div>

          <GrassButton href={VENUE.mapsUrl}>OPEN MAPS</GrassButton>
        </div>
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <SectionHeading>CONNECT WITH US</SectionHeading>

      <p
        className={`
          ${PIXEL_FONT}
          max-w-xs text-[8px] leading-[2] text-[#C5C9BE]
        `}
      >
        Follow SWAG for updates, projects, and community news.
      </p>

      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {SOCIALS.map(({ label, href, aria, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={aria}
              className={`group flex flex-col items-center gap-2 ${FOCUS_RING}`}
            >
              <span
                className="
                  flex h-11 w-11 items-center justify-center
                  border-4 border-[#151A17] bg-[#242B25]
                  text-[#F5F2E8]
                  shadow-[inset_2px_2px_0_0_#3A443B,inset_-2px_-2px_0_0_#0C100D,3px_3px_0_0_#0C100D]
                  transition-[transform,border-color,color,box-shadow]
                  group-hover:-translate-y-1
                  group-hover:border-[#5E9C45] group-hover:text-[#F2C14E]
                  group-hover:shadow-[inset_2px_2px_0_0_#3A443B,inset_-2px_-2px_0_0_#0C100D,4px_5px_0_0_#0C100D]
                  group-focus-visible:-translate-y-1
                  motion-reduce:transition-none
                  motion-reduce:group-hover:translate-y-0
                "
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>

              <span
                className={`
                  ${PIXEL_FONT}
                  text-[7px] leading-none text-[#C5C9BE]
                  transition-colors group-hover:text-[#F2C14E]
                `}
              >
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickLinks() {
  return (
    <nav aria-label="Footer quick links" className="flex flex-col gap-3">
      <SectionHeading>QUICK LINKS</SectionHeading>

      <ul className="flex flex-col gap-2 sm:gap-2.5">
        {QUICK_LINKS.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              className={`
                group inline-flex items-center gap-3
                ${PIXEL_FONT}
                text-[9px] leading-none text-[#F5F2E8]
                transition-colors hover:text-[#F2C14E]
                motion-reduce:transition-none
                ${FOCUS_RING}
              `}
            >
              <span
                className="
                  flex h-6 w-6 items-center justify-center
                  border-2 border-[#151A17] bg-[#242B25] text-[#A8E063]
                  shadow-[inset_1px_1px_0_0_#3A443B,2px_2px_0_0_#0C100D]
                  transition-[transform,border-color,color]
                  group-hover:-translate-y-0.5
                  group-hover:border-[#F2C14E] group-hover:text-[#F2C14E]
                  motion-reduce:transition-none
                  motion-reduce:group-hover:translate-y-0
                "
              >
                <Icon aria-hidden="true" className="h-3 w-3" />
              </span>

              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="relative w-full [--p:3px] sm:[--p:4px]"
      style={{ background: "transparent", marginTop: P(-3) }}
    >
      <WoodenSeam />

      {/* Bedrock footer background */}
      <div style={BEDROCK_STYLE}>
        <div className="mx-auto flex w-full max-w-6xl flex-col px-3 pb-3 pt-6 sm:px-6 sm:pb-4 sm:pt-6 lg:px-8">
          {/* Community heading */}
          <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2">
            <p
              className={`
                ${PIXEL_FONT}
                text-[8px] leading-relaxed tracking-wider text-[#A8E063]
                [text-shadow:2px_2px_0_#0C100D]
                sm:text-[10px]
              `}
            >
              BUILD YOUR NEXT ADVENTURE
            </p>

            <h2
              className={`
                ${PIXEL_FONT}
                text-base leading-[1.6] text-[#FFD966]
                [text-shadow:3px_3px_0_#5A3B1E]
                min-[400px]:text-xl sm:text-2xl md:text-3xl
              `}
            >
              JOIN THE COMMUNITY
            </h2>

            <p
              className={`
                ${PIXEL_FONT}
                max-w-xl text-[8px] leading-[1.9] text-white
                [text-shadow:2px_2px_0_#0C100D]
                sm:text-[10px]
              `}
            >
              BUILD. COLLABORATE. CREATE SOMETHING LEGENDARY.
            </p>
          </div>

          {/* Footer columns */}
          <div
            className="
              mt-4 grid grid-cols-1 gap-x-8 gap-y-5
              md:mt-6 md:grid-cols-2 md:gap-y-6
              lg:grid-cols-[1.4fr_1fr_0.7fr]
            "
          >
            <div className="md:col-span-2 lg:col-span-1">
              <VenueCard />
            </div>

            {/* Mobile: Connect + Quick Links side by side. md+: wrapper disappears */}
            <div className="grid grid-cols-2 items-start gap-x-4 md:contents">
              <SocialLinks />
              <QuickLinks />
            </div>
          </div>

          {/* Copyright */}
          <div
            className="
              mt-4 flex flex-col items-center justify-between gap-2
              border-t-2 border-white/10 pt-3
              text-center sm:mt-6 sm:flex-row sm:text-left
            "
          >
            <p
              className={`${PIXEL_FONT} text-[7px] leading-relaxed text-[#C5C9BE] sm:text-[8px]`}
            >
              &copy; {year} HACKFUSION. ALL RIGHTS RESERVED.
            </p>

            <p
              className={`${PIXEL_FONT} text-[7px] leading-relaxed text-[#A8E063] sm:text-[8px]`}
            >
              MADE WITH BLOCKS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
