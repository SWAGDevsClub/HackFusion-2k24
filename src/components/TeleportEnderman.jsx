import { useEffect, useRef, useState } from "react";
import enderman from "../assets/digvijay's_assets/enderman-teleport.webm";
import particles from "../assets/digvijay's_assets/portal-particles.gif";
import teleportSound from "../assets/digvijay's_assets/enderman-teleport.mp3";

const randomPosition = (previous) => {
  let next = 13 + Math.random() * 74;
  while (previous !== undefined && Math.abs(next - previous) < 18) next = 8 + Math.random() * 84;
  return next;
};

export default function TeleportEnderman({ className = "", label = "Amethyst" }) {
  const [position, setPosition] = useState(() => randomPosition());
  const [burst, setBurst] = useState(null);
  const [hasTeleported, setHasTeleported] = useState(false);
  const timer = useRef(null);
  const burstTimer = useRef(null);
  const sound = useRef(null);

  const teleport = () => {
    setHasTeleported(true);
    clearTimeout(timer.current);
    const from = position;
    setBurst({ id: Date.now(), left: from });
    sound.current?.pause();
    if (sound.current) {
      sound.current.currentTime = 0;
      sound.current.play().catch(() => {});
    }
    setPosition(() => randomPosition(from));
    clearTimeout(burstTimer.current);
    burstTimer.current = setTimeout(() => setBurst(null), 1100);
  };

  const startDwell = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(teleport, 250);
  };
  const cancelDwell = () => clearTimeout(timer.current);

  useEffect(() => () => {
    clearTimeout(timer.current);
    clearTimeout(burstTimer.current);
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 z-[45] overflow-visible ${className}`} aria-label={`${label} Enderman teleport effect`}>
      <button
        type="button"
        className="pointer-events-auto absolute top-[88%] z-[2] block w-[clamp(78px,11vw,150px)] -translate-x-1/2 group cursor-pointer border-0 bg-transparent p-0 outline-none transition-[left,filter,transform] duration-250 ease-in-out hover:scale-110 focus-visible:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300 max-[600px]:top-[84%] max-[600px]:w-[25vw]"
        style={{ left: `${position}%` }}
        onPointerEnter={startDwell}
        onPointerLeave={cancelDwell}
        onFocus={startDwell}
        onBlur={cancelDwell}
        onClick={() => { cancelDwell(); teleport(); }}
        aria-label={`Teleport Enderman in ${label}`}
        title="Hover for a moment to teleport"
      >
        <span className={`pointer-events-none absolute left-1/2 top-[-1.7rem] z-[3] -translate-x-1/2 whitespace-nowrap border-2 border-[#281229] bg-[#170c20]/90 px-2 py-1 font-[Press_Start_2P] text-[7px] leading-none text-fuchsia-200 [text-shadow:1px_1px_0_#351044] shadow-[0_2px_0_#08040c] transition-all duration-500 ease-out group-hover:text-white ${hasTeleported ? "scale-75 opacity-0 blur-sm" : "animate-[enderman-prompt_1.8s_ease-in-out_infinite] opacity-100"} max-[600px]:top-[-1.25rem] max-[600px]:px-1.5 max-[600px]:py-[3px] max-[600px]:text-[5px]`} aria-hidden="true">CLICK TO TELEPORT</span>
        <video className="block h-auto w-full animate-[enderman-idle_2.4s_ease-in-out_infinite] drop-shadow-[0_5px_8px_rgba(0,0,0,.65)]" src={enderman} autoPlay loop muted playsInline aria-hidden="true" />
      </button>
      {burst && <img key={burst.id} className="pointer-events-none absolute top-[86%] z-[1] w-[clamp(110px,15vw,210px)] -translate-x-1/2 animate-[portal-burst_1.1s_ease-out_forwards] select-none max-[600px]:top-[82%] max-[600px]:w-[36vw]" style={{ left: `${burst.left}%` }} src={particles} alt="" aria-hidden="true" draggable="false" />}
      <audio ref={sound} src={teleportSound} preload="none" />
      <style>{`@keyframes enderman-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}@keyframes enderman-prompt{0%,100%{opacity:.72;filter:brightness(.92)}50%{opacity:1;filter:brightness(1.25)}}@keyframes portal-burst{0%{opacity:0;transform:translateX(-50%) scale(.55)}15%{opacity:1}75%{opacity:.9}100%{opacity:0;transform:translateX(-50%) scale(1.05)}}`}</style>
    </div>
  );
}







