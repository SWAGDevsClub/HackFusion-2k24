import { Link } from "react-router-dom";
import plankBanner from "../assets/pageassets-clean/plank-long-banner-footer.webp";

export default function ComingSoonToast({
  pageName = "",
  title = "COMING SOON",
  subtitle = "This section is currently under development. Content will be unlocked soon!",
}) {
  return (
    <div
      className="fixed inset-0 z-[45] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto"
      role="alertdialog"
      aria-modal="true"
      aria-label={`${pageName || "Page"} Coming Soon`}
    >
      {/* Toast Notification Window */}
      <div className="relative w-full max-w-[640px] border-4 border-[#3F2312] bg-[#D28F47] px-5 py-8 sm:px-10 sm:py-10 shadow-[inset_4px_4px_0px_#F5BD7D,inset_-4px_-4px_0px_#6E3C15,0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center text-center">
        {/* Pixel Corner Bolts */}
        <span className="absolute top-2 left-2 w-2.5 h-2.5 bg-[#2D3036] border border-black shadow-[inset_1px_1px_0_#808590]" />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#2D3036] border border-black shadow-[inset_1px_1px_0_#808590]" />
        <span className="absolute bottom-2 left-2 w-2.5 h-2.5 bg-[#2D3036] border border-black shadow-[inset_1px_1px_0_#808590]" />
        <span className="absolute bottom-2 right-2 w-2.5 h-2.5 bg-[#2D3036] border border-black shadow-[inset_1px_1px_0_#808590]" />

        {/* Category / Page Tag */}
        {pageName && (
          <div className="mb-4 inline-block border-2 border-[#281508] bg-[#7A4926] px-3.5 py-1.5 shadow-[inset_2px_2px_0_#A86D3F,inset_-2px_-2px_0_#4B2B12]">
            <span className="font-['Press_Start_2P',monospace] text-[9px] sm:text-[11px] text-[#FFFF55] [text-shadow:1px_1px_0_#2A170A] uppercase tracking-wider">
              [ {pageName} ]
            </span>
          </div>
        )}

        {/* Wooden Plank Banner */}
        <div className="relative w-full aspect-[1400/278] flex items-center justify-center mb-6 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
          <img
            src={plankBanner}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full object-fill [image-rendering:pixelated]"
          />
          <span className="relative z-10 font-['Press_Start_2P',monospace] text-[clamp(13px,3vw,24px)] font-bold uppercase tracking-[2px] text-[#FFFF55] [text-shadow:3px_3px_0_#2A170A,0_0_16px_rgba(255,255,85,0.45)] animate-pulse whitespace-nowrap">
            ★ {title} ★
          </span>
        </div>

        {/* Subtitle / Description */}
        <p className="font-['Press_Start_2P',monospace] text-[10px] sm:text-[12px] leading-relaxed text-[#FFFFFF] [text-shadow:2px_2px_0px_#2A170A] max-w-[500px] mb-8">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-block border-4 border-black bg-[#7d7d7d] px-5 py-3 font-['Press_Start_2P',monospace] text-[10px] sm:text-[11px] uppercase text-white [text-shadow:2px_2px_0_rgba(0,0,0,0.55)] shadow-[inset_4px_4px_0_rgba(255,255,255,0.38),inset_-4px_-4px_0_rgba(0,0,0,0.38),0_4px_0_rgba(0,0,0,0.4)] transition-[filter] hover:brightness-[1.2] active:brightness-[1.2]"
          >
            &lt; RETURN TO HOME &gt;
          </Link>
          <Link
            to="/contact"
            className="inline-block border-4 border-black bg-[#555a63] px-5 py-3 font-['Press_Start_2P',monospace] text-[10px] sm:text-[11px] uppercase text-white [text-shadow:2px_2px_0_rgba(0,0,0,0.55)] shadow-[inset_4px_4px_0_rgba(255,255,255,0.38),inset_-4px_-4px_0_rgba(0,0,0,0.38),0_4px_0_rgba(0,0,0,0.4)] transition-[filter] hover:brightness-[1.2] active:brightness-[1.2]"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
}

