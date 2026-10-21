import plankBanner from "../assets/pageassets-clean/plank-long-banner-footer.webp";

export default function ComingSoonBanner({
  text = "COMING SOON",
  subtitle = "",
  withChains = false,
  className = "",
  size = "default", // "small" | "default" | "large"
}) {
  const sizeClasses = {
    small: "max-w-[440px]",
    default: "max-w-[640px]",
    large: "max-w-[780px]",
  }[size] || "max-w-[640px]";

  const textSizeClasses = {
    small: "text-[clamp(9px,2vw,14px)]",
    default: "text-[clamp(11px,2.5vw,20px)]",
    large: "text-[clamp(13px,3vw,26px)]",
  }[size] || "text-[clamp(11px,2.5vw,20px)]";

  return (
    <div className={`relative mx-auto flex flex-col items-center justify-center select-none ${className}`}>
      {withChains && (
        <div className="flex justify-between w-[60%] max-w-[360px] mx-auto -mb-1 relative z-0">
          <div className="w-[4px] h-5 bg-[repeating-linear-gradient(to_bottom,#6E6E6E_0px,#6E6E6E_4px,#222222_4px,#222222_8px)] shadow-[1px_0_0_#9E9E9E,-1px_0_0_#000]" />
          <div className="w-[4px] h-5 bg-[repeating-linear-gradient(to_bottom,#6E6E6E_0px,#6E6E6E_4px,#222222_4px,#222222_8px)] shadow-[1px_0_0_#9E9E9E,-1px_0_0_#000]" />
        </div>
      )}

      {/* Main Wooden Plank Banner */}
      <div className={`relative w-full ${sizeClasses} px-2`}>
        <div className="relative aspect-[1400/278] w-full flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)]">
          <img
            src={plankBanner}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full object-fill [image-rendering:pixelated]"
          />
          <div className="relative z-10 flex items-center justify-center px-[8%] w-full">
            <span
              className={`font-['Press_Start_2P',monospace] ${textSizeClasses} font-bold uppercase tracking-[2px] text-[#FFFF55] [text-shadow:3px_3px_0_#2A170A,0_0_14px_rgba(255,255,85,0.45)] whitespace-nowrap text-center`}
            >
              ★ {text} ★
            </span>
          </div>
        </div>

        {/* Optional Subtitle in a Minecraft styled pixel frame */}
        {subtitle && (
          <div className="mt-2.5 mx-auto max-w-fit px-3 py-1.5 border-2 border-[#281508] bg-[#3B2616]/90 shadow-[inset_2px_2px_0_#6E4423,inset_-2px_-2px_0_#201107,0_4px_8px_rgba(0,0,0,0.5)]">
            <p className="m-0 text-center font-['Press_Start_2P',monospace] text-[8px] sm:text-[10px] text-[#FFF4DB] [text-shadow:1px_1px_0_#000] tracking-wide leading-relaxed">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

