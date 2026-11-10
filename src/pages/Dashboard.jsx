import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Camera, X, Check, Crop, UserPlus, Trash2 } from "lucide-react";
import { BASE_URL, convertToWebp, getApiErrorMessage, uploadToSwagServer } from "../hooks/api";
// import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import beestacklogo from "../assets/beestacklogo.png"
/* ------------------------------------------------------------------ */
/*  Things to update                                                   */
/* ------------------------------------------------------------------ */
const BG_IMAGE = ""; // optional: import bg from "../assets/bg.jpg" and set BG_IMAGE = bg

const ACCENT = {
    team: "#b074ff",
    abstract: "#ff8a1f",
    lead: "#e5484d",
    member1: "#4c8dff",
    member2: "#f2b705",
    member3: "#55c038",
};

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

.hf4 { --accent:#55c038; font-family:'VT323', ui-monospace, monospace; font-size:22px; color:#e8e8e8; }
.hf4 .px { font-family:'Press Start 2P', ui-monospace, monospace; letter-spacing:0; }
.hf4 *, .hf4 *::before, .hf4 *::after { box-sizing:border-box; }

/* ---------- background scene (kept deliberately light) ---------- */
.hf4 .mc-scene { position:fixed; inset:0; z-index:0; overflow:hidden; pointer-events:none; background:#0a0e2e; contain:layout paint; }
.hf4 .mc-sky { position:absolute; inset:0; background:linear-gradient(#0a0e2e 0%, #1f1650 32%, #52277a 58%, #b9504f 82%, #f0a05a 100%); }
.hf4 .mc-stars { position:absolute; left:0; top:0; width:2px; height:2px; animation:mc-twinkle 4s steps(2) infinite; }
.hf4 .mc-stars.b { animation-delay:-2s; }
.hf4 .mc-stars.big { width:4px; height:4px; animation-duration:6s; }
.hf4 .mc-moon { position:absolute; top:9%; right:10%; width:64px; height:64px; background:#fff6c9;
  box-shadow: 0 0 0 8px rgba(255,246,201,.12), 0 0 0 16px rgba(255,246,201,.06), inset -12px -12px 0 #e6d99a; }
.hf4 .mc-cloud { position:absolute; left:-220px; width:16px; height:16px; background:rgba(255,255,255,.15); will-change:transform;
  box-shadow: 16px 0 rgba(255,255,255,.15), 32px 0 rgba(255,255,255,.15), 48px 0 rgba(255,255,255,.15), 64px 0 rgba(255,255,255,.15),
              16px -16px rgba(255,255,255,.15), 32px -16px rgba(255,255,255,.15), 48px -16px rgba(255,255,255,.15);
  animation:mc-drift var(--dur) linear var(--delay) infinite; }
.hf4 .mc-hill { position:absolute; left:0; right:0; bottom:0; }
.hf4 .mc-hill.far { height:40vh; background:#2a1d5c; opacity:.9;
  clip-path:polygon(0 100%,0 62%,6% 62%,6% 52%,12% 52%,12% 44%,19% 44%,19% 36%,26% 36%,26% 44%,33% 44%,33% 56%,40% 56%,40% 48%,47% 48%,47% 38%,53% 38%,53% 30%,60% 30%,60% 40%,67% 40%,67% 52%,75% 52%,75% 44%,82% 44%,82% 54%,90% 54%,90% 46%,95% 46%,95% 58%,100% 58%,100% 100%); }
.hf4 .mc-hill.near { height:26vh; background:#120d2b;
  clip-path:polygon(0 100%,0 55%,8% 55%,8% 40%,15% 40%,15% 55%,24% 55%,24% 68%,34% 68%,34% 52%,42% 52%,42% 38%,50% 38%,50% 52%,58% 52%,58% 66%,70% 66%,70% 50%,78% 50%,78% 36%,86% 36%,86% 50%,93% 50%,93% 62%,100% 62%,100% 100%); }
.hf4 .mc-orb { position:absolute; bottom:-24px; background:#b6ff3b; box-shadow:0 0 0 2px rgba(182,255,59,.3); will-change:transform, opacity;
  animation:mc-orb linear infinite; opacity:0; }

@keyframes mc-twinkle { 0%,100%{opacity:.95} 50%{opacity:.15} }
@keyframes mc-drift { from{transform:translate3d(0,0,0)} to{transform:translate3d(calc(100vw + 460px),0,0)} }
@keyframes mc-orb { 0%{transform:translate3d(0,0,0);opacity:0} 10%{opacity:.9} 85%{opacity:.9} 100%{transform:translate3d(var(--dx),-115vh,0);opacity:0} }

/* ---------- entrance animations (paused until the page is ready) ---------- */
.hf4 .mc-shell-in { animation:mc-pop .55s steps(7) .05s backwards; }
.hf4 .mc-card-in { animation:mc-in .45s steps(7) backwards; animation-delay:var(--d, 0s); }
.hf4:not(.go) .mc-shell-in, .hf4:not(.go) .mc-card-in { animation-play-state:paused; }
.hf4 .mc-pop { animation:mc-pop .3s steps(5) backwards; }
@keyframes mc-pop { from{opacity:0; transform:translateY(24px) scale(.97)} to{opacity:1; transform:translateY(0) scale(1)} }
@keyframes mc-in { from{opacity:0; transform:translateY(14px)} to{opacity:1; transform:translateY(0)} }

/* ---------- shells & cards ---------- */
.hf4 .mc-shell {
  background:rgba(28,28,32,.92); border:4px solid #000;
  box-shadow: inset 4px 4px 0 #5e5e5e, inset -4px -4px 0 #1a1a1a, 0 12px 0 rgba(0,0,0,.45);
}
.hf4 .mc-grass { height:20px; border-bottom:4px solid #000;
  background:
    linear-gradient(#7fc944,#7fc944) top / 100% 10px no-repeat,
    repeating-linear-gradient(90deg,#5ea231 0 16px,#4e8d28 16px 32px) 0 10px / 100% 10px no-repeat; }
.hf4 .mc-card { background:rgba(30,30,34,.93); border:4px solid #000;
  box-shadow: inset 4px 4px 0 #555, inset -4px -4px 0 #1a1a1a, 0 8px 0 rgba(0,0,0,.4); }
.hf4 .mc-card-bar { height:12px; background:var(--accent); border-bottom:4px solid #000; box-shadow: inset 0 3px 0 rgba(255,255,255,.35); }
.hf4 .mc-title { text-shadow:3px 3px 0 #000; }
.hf4 .mc-panel { background:#1c1c1c; border:3px solid #000; box-shadow: inset 3px 3px 0 #0a0a0a, inset -3px -3px 0 #484848; }

/* ---------- form controls ---------- */
.hf4 .mc-label { display:block; margin-bottom:6px; color:#d9d9d9; font-size:21px; line-height:1.1; }
.hf4 .mc-input {
  display:block; width:100%; min-height:48px; border-radius:0; outline:none;
  background:#111; color:#fff; font:inherit; font-size:23px; line-height:1.15; padding:9px 12px;
  border:3px solid #000; box-shadow: inset 3px 3px 0 #000, inset -3px -3px 0 #505050;
  caret-color:var(--accent); transition:box-shadow .12s;
}
.hf4 .mc-input::placeholder { color:#777; }
.hf4 .mc-input:focus { outline:3px solid var(--accent); outline-offset:2px; }
.hf4 .mc-input.err { border-color:#d23232; animation:mc-shake .35s steps(7) 1; }
@keyframes mc-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
.hf4 select.mc-input {
  appearance:none; -webkit-appearance:none; padding-right:42px; cursor:pointer;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><path fill='%23ffffff' d='M1 2h6v1H6v1H5v1H4v1H3V5H2V4H1z'/></svg>");
  background-repeat:no-repeat; background-position:right 12px center; background-size:18px 18px;
}
.hf4 select.mc-input option { background:#1b1b1b; color:#fff; }
.hf4 textarea.mc-input { resize:vertical; min-height:160px; }
.hf4 input[type=file].mc-input { padding:8px; cursor:pointer; font-size:20px; }
.hf4 input[type=file].mc-input::file-selector-button {
  font-family:'Press Start 2P', monospace; font-size:10px; margin-right:12px; padding:10px 12px; cursor:pointer;
  background:var(--accent); color:#fff; border:3px solid #000; text-shadow:2px 2px 0 rgba(0,0,0,.5);
  box-shadow: inset 3px 3px 0 rgba(255,255,255,.4), inset -3px -3px 0 rgba(0,0,0,.35);
}
.hf4 .mc-value { background:#151515; border:3px solid #000; box-shadow: inset 3px 3px 0 #0a0a0a, inset -3px -3px 0 #3a3a3a;
  padding:9px 12px; min-height:46px; color:#fff; font-size:23px; line-height:1.15; overflow-wrap:anywhere; }
.hf4 .mc-error { color:#ff7b7b; margin-top:6px; font-size:21px; line-height:1.1; }
.hf4 .mc-error::before { content:"! "; }
.hf4 .mc-ok { color:#7dea2b; margin-top:6px; font-size:20px; word-break:break-all; }

/* ---------- buttons ---------- */
.hf4 .mc-btn {
  display:inline-flex; align-items:center; justify-content:center; gap:10px; cursor:pointer;
  font-family:'Press Start 2P', monospace; font-size:10px; line-height:1.4; color:#fff; text-align:center;
  padding:14px 16px; min-height:48px; background:#7b7b7b; border:3px solid #000; border-radius:0;
  text-shadow:2px 2px 0 #3b3b3b; box-shadow: inset 3px 3px 0 #b9b9b9, inset -3px -3px 0 #4a4a4a;
  transition:background-color .08s, transform .08s;
}
.hf4 .mc-btn:hover:not(:disabled) { background:#6b7bd1; box-shadow: inset 3px 3px 0 #a8b4f2, inset -3px -3px 0 #3d4a97; transform:translateY(-2px); }
.hf4 .mc-btn:active:not(:disabled) { transform:translateY(3px); }
.hf4 .mc-btn:focus-visible { outline:3px solid #fff; outline-offset:3px; }
.hf4 .mc-btn:disabled { cursor:not-allowed; color:#8a8a8a; text-shadow:none; background:#4a4a4a; box-shadow: inset 3px 3px 0 #5f5f5f, inset -3px -3px 0 #333; }
.hf4 .mc-btn.green { background:#4fa22a; box-shadow: inset 3px 3px 0 #8fe05f, inset -3px -3px 0 #2e6a14; text-shadow:2px 2px 0 #1d4a0a; }
.hf4 .mc-btn.green:hover:not(:disabled) { background:#5bb832; box-shadow: inset 3px 3px 0 #a6f07a, inset -3px -3px 0 #2e6a14; }
.hf4 .mc-btn.red { background:#c0392b; box-shadow: inset 3px 3px 0 #f08a7e, inset -3px -3px 0 #7a1f15; text-shadow:2px 2px 0 #4a120b; }
.hf4 .mc-btn.red:hover:not(:disabled) { background:#d4493a; box-shadow: inset 3px 3px 0 #ffa095, inset -3px -3px 0 #7a1f15; }
.hf4 .mc-btn.orange { background:#d9791a; box-shadow: inset 3px 3px 0 #ffb866, inset -3px -3px 0 #8a4709; text-shadow:2px 2px 0 #4f2904; }
.hf4 .mc-btn.orange:hover:not(:disabled) { background:#ea8a2b; box-shadow: inset 3px 3px 0 #ffc98a, inset -3px -3px 0 #8a4709; }
.hf4 .mc-btn.blue { background:#3b6fd8; box-shadow: inset 3px 3px 0 #8fb0ff, inset -3px -3px 0 #1f3f8a; text-shadow:2px 2px 0 #14285a; }
.hf4 .mc-btn.blue:hover:not(:disabled) { background:#4c80ec; box-shadow: inset 3px 3px 0 #a9c3ff, inset -3px -3px 0 #1f3f8a; }
.hf4 .mc-btn.sm { padding:10px 12px; min-height:40px; font-size:9px; }
.hf4 .mc-btn.block { width:100%; }
.hf4 .mc-btn.big { padding:20px 22px; font-size:12px; }

.hf4 .mc-x { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; flex:0 0 36px; cursor:pointer; color:#fff;
  background:#7b7b7b; border:3px solid #000; box-shadow: inset 2px 2px 0 #b9b9b9, inset -2px -2px 0 #4a4a4a; }
.hf4 .mc-x:hover { background:#c0392b; }
.hf4 .mc-x:focus-visible { outline:3px solid #fff; outline-offset:2px; }

/* ---------- badges ---------- */
.hf4 .mc-badge { display:inline-block; font-family:'Press Start 2P', monospace; font-size:9px; line-height:1.3; color:#fff; padding:9px 10px; border:3px solid #000;
  text-shadow:2px 2px 0 rgba(0,0,0,.55); box-shadow: inset 3px 3px 0 rgba(255,255,255,.35), inset -3px -3px 0 rgba(0,0,0,.3); }
.hf4 .mc-badge.green { background:#4fa22a; }
.hf4 .mc-badge.gold { background:#c79a0a; }
.hf4 .mc-badge.red { background:#c0392b; }

/* ---------- avatars ---------- */
.hf4 .mc-avatar { position:relative; width:84px; height:84px; overflow:hidden; background:#1b1b1b; border:4px solid var(--accent);
  box-shadow: 0 0 0 3px #000, 0 4px 0 3px rgba(0,0,0,.4); }
.hf4 .mc-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
.hf4 .mc-avatar-letter { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:22px; text-shadow:3px 3px 0 #000; }
.hf4 .mc-avatar-hover { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.55); color:#fff; opacity:0; cursor:pointer; transition:opacity .12s; }
.hf4 .group:hover .mc-avatar-hover { opacity:1; }
.hf4 .mc-cam { position:absolute; right:-10px; bottom:-10px; display:flex; align-items:center; justify-content:center; width:32px; height:32px; cursor:pointer; color:#fff;
  background:var(--accent); border:3px solid #000; box-shadow: inset 2px 2px 0 rgba(255,255,255,.45), inset -2px -2px 0 rgba(0,0,0,.35); }
.hf4 .mc-cam:hover { filter:brightness(1.15); }
.hf4 .mc-cam:focus-visible { outline:3px solid #fff; outline-offset:2px; }
.hf4 .mc-logo-sq { width:72px; height:72px; flex:0 0 72px; object-fit:cover; background:#1b1b1b; border:4px solid #f2b705; box-shadow: 0 0 0 3px #000, 0 4px 0 3px rgba(0,0,0,.4); }

/* ---------- misc ---------- */
.hf4 .mc-note { background:#2b2307; border:3px solid #f0b90b; color:#ffe27a; padding:10px 14px; font-size:22px; line-height:1.15; }
.hf4 .mc-scroll::-webkit-scrollbar { width:12px; height:12px; }
.hf4 .mc-scroll::-webkit-scrollbar-track { background:#111; }
.hf4 .mc-scroll::-webkit-scrollbar-thumb { background:#7b7b7b; border:2px solid #000; }
.hf4 .mc-scroll { scrollbar-width:thin; scrollbar-color:#7b7b7b #111; }
.hf4 .mc-xp { position:relative; height:18px; background:#111; border:3px solid #000; box-shadow: inset 2px 2px 0 #000, inset -2px -2px 0 #3d3d3d; overflow:hidden; }
.hf4 .mc-xp-load { position:absolute; top:0; bottom:0; width:40%; background:#7dea2b; box-shadow: inset 0 3px 0 rgba(255,255,255,.45), inset 0 -3px 0 rgba(0,0,0,.3); animation:mc-load 1.4s steps(12) infinite; }
@keyframes mc-load { from{transform:translateX(-100%)} to{transform:translateX(260%)} }

@media (max-width:640px) { .hf4 { font-size:21px; } }
@media (prefers-reduced-motion: reduce) {
  .hf4 *, .hf4 *::before, .hf4 *::after { transition:none !important; animation:none !important; }
}
`;

/* ------------------------------------------------------------------ */
/*  Background scene                                                   */
/* ------------------------------------------------------------------ */
/* stars are drawn as box-shadows on 3 elements instead of 46 animated elements */
const starShadow = (n, seed, maxTop) =>
    Array.from(
        { length: n },
        (_, i) =>
            `${(i * 37 + seed * 11) % 100}vw ${(i * 53 + seed * 7) % maxTop}vh 0 0 #fff`
    ).join(",");
const STARS_A = starShadow(14, 1, 58);
const STARS_B = starShadow(14, 2, 58);
const STARS_BIG = starShadow(6, 3, 50);

const CLOUDS = [
    { top: "12%", dur: 90, delay: -20 },
    { top: "24%", dur: 120, delay: -70 },
    { top: "7%", dur: 150, delay: -110 },
];
const ORBS = Array.from({ length: 10 }, (_, i) => ({
    left: (i * 61) % 100,
    size: 6 + (i % 3) * 3,
    dur: 9 + (i % 5) * 2.2,
    delay: -((i * 3.7) % 14),
    dx: (i % 2 ? 1 : -1) * (20 + (i % 4) * 14),
}));

const Scene = ({ bgImage }) => (
    <div className="mc-scene" aria-hidden="true">
        {bgImage ? (
            <>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="absolute inset-0 bg-black/45" />
            </>
        ) : (
            <>
                <div className="mc-sky" />
                <div className="mc-stars" style={{ boxShadow: STARS_A }} />
                <div className="mc-stars b" style={{ boxShadow: STARS_B }} />
                <div className="mc-stars big" style={{ boxShadow: STARS_BIG }} />
                <div className="mc-moon" />
                {CLOUDS.map((c, i) => (
                    <div
                        key={i}
                        className="mc-cloud"
                        style={{ top: c.top, "--dur": `${c.dur}s`, "--delay": `${c.delay}s` }}
                    />
                ))}
                <div className="mc-hill far" />
                <div className="mc-hill near" />
            </>
        )}
        {ORBS.map((o, i) => (
            <span
                key={i}
                className="mc-orb"
                style={{
                    left: `${o.left}%`,
                    width: o.size,
                    height: o.size,
                    animationDuration: `${o.dur}s`,
                    animationDelay: `${o.delay}s`,
                    "--dx": `${o.dx}px`,
                }}
            />
        ))}
    </div>
);

/* ------------------------------------------------------------------ */
/*  UI building blocks (outside Dashboard so inputs keep focus)        */
/* ------------------------------------------------------------------ */
const statusTone = (v = "") => {
    const s = String(v).toLowerCase();
    if (s.includes("pend")) return "gold";
    if (s.includes("reject") || s.includes("fail")) return "red";
    return "green";
};

const genderText = (g) => {
    if (!g) return "Other";
    const s = String(g).trim().toLowerCase();
    if (s === "m" || s === "male") return "Male";
    if (s === "f" || s === "female") return "Female";
    return "Other";
};

const normGender = (g) => {
    const s = String(g || "").trim().toLowerCase();
    if (s === "f" || s === "female") return "F";
    if (s === "m" || s === "male") return "M";
    return "O";
};

export const SWAG_IMAGE_BASE_URL = "https://swagserver.co.in/hackfusion/uploads/images/";

export const getProfileImageUrl = (src) => {
    if (!src || typeof src !== "string") return "";
    const trimmed = src.trim();
    if (!trimmed || trimmed === "null" || trimmed === "undefined") return "";

    // If it's a temporary blob URL or data URL (from browser local upload/cropping)
    if (trimmed.startsWith("blob:") || trimmed.startsWith("data:")) {
        return trimmed;
    }

    // If it already has the exact swagserver uploads URL prefix
    if (trimmed.startsWith(SWAG_IMAGE_BASE_URL)) {
        return trimmed;
    }

    // If it's already an absolute URL pointing to swagserver images
    if (trimmed.includes("swagserver.co.in/hackfusion/uploads/images/")) {
        const filePart = trimmed.split("swagserver.co.in/hackfusion/uploads/images/").pop();
        return `${SWAG_IMAGE_BASE_URL}${filePart}`;
    }

    // If it's another absolute external URL (e.g. google, gravatar)
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
    }

    // Strip leading slashes, "uploads/images/", etc. so we never duplicate the path
    const cleanFileName = trimmed.replace(/^\/?(hackfusion\/uploads\/images\/|uploads\/images\/|\/)+/, "");
    return `${SWAG_IMAGE_BASE_URL}${cleanFileName}`;
};

const Card = ({ title, accent, delay = 0, leading, action, className = "", children }) => (
    <section
        className={`mc-card mc-card-in ${className}`}
        style={{ "--accent": accent, "--d": `${delay}s` }}
    >
        <div className="mc-card-bar" />
        <div className="p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-4">
                    {leading}
                    <h2 className="px mc-title text-[11px] leading-relaxed text-white sm:text-sm">
                        {title}
                    </h2>
                </div>
                {action}
            </div>
            {children}
        </div>
    </section>
);

const EditableField = ({
    label,
    name,
    value,
    onChange,
    editing,
    type = "text",
    options,
    display,
}) => (
    <div>
        <label className="mc-label" htmlFor={editing ? name : undefined}>
            {label}
        </label>
        {editing ? (
            options ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="mc-input"
                >
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.text}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="mc-input"
                />
            )
        ) : (
            <p className="mc-value">{display !== undefined ? display : value}</p>
        )}
    </div>
);

const MemberCard = ({
    title,
    prefix,
    accent,
    delay,
    avatar,
    editing,
    showEdit,
    showRemove,
    onEdit,
    onRemove,
    teamData,
    onChange,
}) => {
    const v = (k) => teamData[`${prefix}${k}`];
    return (
        <Card
            title={title}
            accent={accent}
            delay={delay}
            leading={avatar}
            action={
                <div className="flex flex-wrap justify-end gap-2">
                    {showEdit && (
                        <button
                            type="button"
                            onClick={onEdit}
                            className={`mc-btn sm ${editing ? "green" : ""}`}
                        >
                            {editing ? "Save" : "Edit"}
                        </button>
                    )}
                    {showRemove && (
                        <button type="button" onClick={onRemove} className="mc-btn sm red">
                            <Trash2 size={14} />
                            Remove
                        </button>
                    )}
                </div>
            }
        >
            <div className="space-y-4">
                <EditableField
                    label="Full Name"
                    name={`${prefix}Name`}
                    value={v("Name")}
                    onChange={onChange}
                    editing={editing}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <EditableField
                        label="Email"
                        type="email"
                        name={`${prefix}Email`}
                        value={v("Email")}
                        onChange={onChange}
                        editing={editing}
                    />
                    <EditableField
                        label="Mobile"
                        type="tel"
                        name={`${prefix}Mobile`}
                        value={v("Mobile")}
                        onChange={onChange}
                        editing={editing}
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <EditableField
                        label="Gender"
                        name={`${prefix}Gender`}
                        value={v("Gender")}
                        onChange={onChange}
                        editing={editing}
                        options={[
                            { value: "M", text: "Male" },
                            { value: "F", text: "Female" },
                            { value: "O", text: "Other" },
                        ]}
                        display={genderText(v("Gender"))}
                    />
                    <EditableField
                        label="PWD Status"
                        name={`${prefix}Pwd`}
                        value={v("Pwd")}
                        onChange={onChange}
                        editing={editing}
                        options={[
                            { value: "no", text: "No" },
                            { value: "yes", text: "Yes" },
                        ]}
                        display={v("Pwd") === "yes" ? "Yes" : "No"}
                    />
                </div>
            </div>
        </Card>
    );
};

const FormField = ({ label, name, type = "text", value, onChange, error, className = "", ...rest }) => (
    <div className={className}>
        <label htmlFor={name} className="mc-label">
            {label}
        </label>
        <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`mc-input ${error ? "err" : ""}`}
            {...rest}
        />
        {error && <p className="mc-error">{error}</p>}
    </div>
);

const Modal = ({ title, accent, onClose, wide, children }) => (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label={title}
    >
        <div
            className={`mc-shell mc-pop mc-scroll max-h-[92vh] w-full overflow-y-auto ${wide ? "max-w-2xl" : "max-w-md"
                }`}
            style={{ "--accent": accent }}
        >
            <div className="mc-grass" />
            <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <h2
                        className="px mc-title text-xs leading-relaxed sm:text-sm"
                        style={{ color: "var(--accent)" }}
                    >
                        {title}
                    </h2>
                    <button type="button" onClick={onClose} className="mc-x" aria-label="Close">
                        <X size={18} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    </div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
function Dashboard() {
    const [teamData, setTeamData] = useState(null);
    const [editMode, setEditMode] = useState({
        teamInfo: false,
        lead: false,
        member1: false,
        member2: false,
        member3: false,
        abstract: false,
    });

    const [hideEditButtons, setHideEditButtons] = useState(true);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [imageEditMode, setImageEditMode] = useState({
        lead: false,
        member1: false,
        member2: false,
        member3: false,
    });

    const [croppingMode, setCroppingMode] = useState({
        lead: false,
        member1: false,
        member2: false,
        member3: false,
    });

    const [cropPosition, setCropPosition] = useState({
        lead: { x: 0, y: 0 },
        member1: { x: 0, y: 0 },
        member2: { x: 0, y: 0 },
        member3: { x: 0, y: 0 },
    });

    const [cropSize, setCropSize] = useState({
        lead: 100,
        member1: 100,
        member2: 100,
        member3: 100,
    });

    const [isDragging, setIsDragging] = useState({
        lead: false,
        member1: false,
        member2: false,
        member3: false,
    });

    const [dragStart, setDragStart] = useState({
        lead: { x: 0, y: 0 },
        member1: { x: 0, y: 0 },
        member2: { x: 0, y: 0 },
        member3: { x: 0, y: 0 },
    });

    const cropContainerRefs = {
        lead: useRef(null),
        member1: useRef(null),
        member2: useRef(null),
        member3: useRef(null),
    };

    const [selectedImages, setSelectedImages] = useState({
        lead: null,
        member1: null,
        member2: null,
        member3: null,
    });

    const canvasRef = useRef(null);
    const fileInputRefs = {
        lead: useRef(null),
        member1: useRef(null),
        member2: useRef(null),
        member3: useRef(null),
    };

    const navigate = useNavigate();
    const [isLead, setIsLead] = useState(false);
    const [userId, setUserId] = useState(null);

    // New state for adding member
    const [showAddMemberForm, setShowAddMemberForm] = useState(false);
    const [newMemberData, setNewMemberData] = useState({
        name: "",
        email: "",
        mobile: "",
        gender: "M",
        isPwd: "no",
        profilePic: null,
    });
    const [addMemberErrors, setAddMemberErrors] = useState({});
    const [isSubmittingMember, setIsSubmittingMember] = useState(false);

    // Change password state
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [passwordErrors, setPasswordErrors] = useState({});
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Delete member state
    const [showDeleteMemberModal, setShowDeleteMemberModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState("");
    const [isDeletingMember, setIsDeletingMember] = useState(false);

    // UI only: entrance animations start once fonts are ready and the content is painted
    const [fontsReady, setFontsReady] = useState(false);
    const [entered, setEntered] = useState(false);

    const linkify = (text) => {
        if (!text) return "";

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(
            urlRegex,
            (url) =>
                `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-yellow-400 underline hover:text-yellow-300">${url}</a>`
        );
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userIdFromStorage = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).member_id
            : null;
        const isLeadFromStorage = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).is_lead
            : null;
        setIsLead(isLeadFromStorage);
        setUserId(userIdFromStorage);

        if (!token) {
            navigate("/login");
            return;
        }

        fetchDashboardData(token);
    }, [navigate]);

    useEffect(() => {
        let cancelled = false;
        const done = () => {
            if (!cancelled) setFontsReady(true);
        };
        const timer = setTimeout(done, 1200); // never wait longer than this
        if (document.fonts && document.fonts.load) {
            Promise.all([
                document.fonts.load("12px 'Press Start 2P'"),
                document.fonts.load("22px 'VT323'"),
            ])
                .then(done)
                .catch(done);
        } else {
            done();
        }
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!teamData) return;
        let id2;
        const id1 = requestAnimationFrame(() => {
            id2 = requestAnimationFrame(() => setEntered(true));
        });
        return () => {
            cancelAnimationFrame(id1);
            cancelAnimationFrame(id2);
        };
    }, [teamData]);

    const fetchDashboardData = async (token) => {
        try {
            const authHeader = { Authorization: `Bearer ${token}` };

            // 1. Fetch current authenticated user profile
            const meRes = await axios.get(`${BASE_URL}/auth/me`, { headers: authHeader });
            const meUser = meRes.data;

            let currentTeamId = null;
            let currentIsLead = false;

            // 2. Fetch player info from /players/{user_id}
            try {
                const playerRes = await axios.get(`${BASE_URL}/players/${meUser.id}`, {
                    headers: authHeader,
                });
                if (playerRes.data) {
                    currentTeamId = playerRes.data.team_id;
                    currentIsLead = Boolean(playerRes.data.is_leader);
                }
            } catch {
                // If not found in /players, try cached user in localStorage
            }

            if (!currentTeamId) {
                const storedUser = localStorage.getItem("user")
                    ? JSON.parse(localStorage.getItem("user"))
                    : null;
                currentTeamId = storedUser?.team_id || null;
                if (storedUser?.is_lead) currentIsLead = true;
            }

            // Fallback: list teams if teamId still not known
            if (!currentTeamId) {
                try {
                    const teamsRes = await axios.get(`${BASE_URL}/teams?limit=1`, {
                        headers: authHeader,
                    });
                    const teams = Array.isArray(teamsRes.data)
                        ? teamsRes.data
                        : teamsRes.data?.items || [];
                    if (teams.length > 0) {
                        currentTeamId = teams[0].id;
                    }
                } catch {
                    // ignore
                }
            }

            if (!currentTeamId) {
                alert("No team associated with your account.");
                return;
            }

            setIsLead(currentIsLead ? 1 : 0);
            setUserId(meUser.id);

            // 3. Fetch team details, team players, and coupon balance in parallel
            const [teamRes, playersRes, couponRes] = await Promise.allSettled([
                axios.get(`${BASE_URL}/teams/${currentTeamId}`, { headers: authHeader }),
                axios.get(`${BASE_URL}/teams/${currentTeamId}/players`, { headers: authHeader }),
                axios.get(`${BASE_URL}/coupons/me`, { headers: authHeader }),
            ]);

            const team = teamRes.status === "fulfilled" ? teamRes.value.data : {};
            const couponData = couponRes.status === "fulfilled" ? couponRes.value.data : null;

            // Merge players from both /teams/{id} and /teams/{id}/players
            // team.players directly contains name, email, phone, gender, pwd as shown in backend response
            const teamPlayersFromTeam = Array.isArray(team.players) ? team.players : [];
            const teamPlayersFromEndpoint =
                playersRes.status === "fulfilled" && Array.isArray(playersRes.value.data)
                    ? playersRes.value.data
                    : [];

            const playerMap = new Map();
            for (const p of teamPlayersFromEndpoint) {
                const key = p.user_id || p.id || p.email || p.name;
                if (key) playerMap.set(key, { ...p });
            }
            for (const p of teamPlayersFromTeam) {
                const key = p.user_id || p.id || p.email || p.name;
                if (key) {
                    const existing = playerMap.get(key) || {};
                    playerMap.set(key, { ...existing, ...p });
                }
            }

            const teamPlayers =
                playerMap.size > 0
                    ? Array.from(playerMap.values())
                    : teamPlayersFromTeam.length > 0
                        ? teamPlayersFromTeam
                        : teamPlayersFromEndpoint;

            // Separate leader and teammates
            const leadPlayer =
                teamPlayers.find((p) => Boolean(p.is_leader) || Boolean(p.is_lead)) ||
                teamPlayers.find((p) => p.user_id === meUser.id || p.id === meUser.id) ||
                teamPlayers[0];

            const otherPlayers = teamPlayers.filter((p) => p !== leadPlayer);

            const getPlayerProp = (player, ...keys) => {
                if (!player) return "";
                for (const k of keys) {
                    if (player[k] !== undefined && player[k] !== null && String(player[k]).trim() !== "") {
                        return String(player[k]).trim();
                    }
                    if (
                        player.user &&
                        player.user[k] !== undefined &&
                        player.user[k] !== null &&
                        String(player.user[k]).trim() !== ""
                    ) {
                        return String(player.user[k]).trim();
                    }
                }
                return "";
            };

            const transformedData = {
                teamId: team.id || currentTeamId,
                teamName: team.name || "My Team",
                theme: team.theme || "",
                abstract: team.abstract || "",
                pptLink: team.ppt_link || "",
                teamSize: team.size || teamPlayers.length || 3,
                city: team.city || "",
                college: team.college || "",
                state: team.state || "",
                coupon: couponData?.coupon_balance ?? 0,
                round1Passed: Boolean(team.round_1_passed),
                allottedLab: team.allotted_lab || null,
                verificationStatus: team.verification_status || "APPROVED",
                teamLogo: getProfileImageUrl(team.team_profile_pic),
                paymentProof: team.receipt_url || "",

                leadId: leadPlayer?.user_id || leadPlayer?.id || leadPlayer?.user?.id || (currentIsLead ? meUser.id : ""),
                leadName: getPlayerProp(leadPlayer, "name", "full_name") || (currentIsLead ? meUser.name : "Team Lead"),
                leadEmail: getPlayerProp(leadPlayer, "email") || (currentIsLead ? meUser.email : ""),
                leadMobile: getPlayerProp(leadPlayer, "phone", "mobile", "contact_number"),
                leadGender: normGender(getPlayerProp(leadPlayer, "gender")),
                leadPwd: (leadPlayer?.pwd === true || leadPlayer?.pwd === "yes" || leadPlayer?.is_pwd === true) ? "yes" : "no",
                leadProfilePic: getProfileImageUrl(
                    team.team_profile_pic ||
                    getPlayerProp(leadPlayer, "profile_url", "profile_pic", "profile_picture", "image_url", "image") ||
                    ""
                ),

                m1Id: otherPlayers[0]?.user_id || otherPlayers[0]?.id || otherPlayers[0]?.user?.id || "",
                m1Name: getPlayerProp(otherPlayers[0], "name", "full_name"),
                m1Email: getPlayerProp(otherPlayers[0], "email"),
                m1Mobile: getPlayerProp(otherPlayers[0], "phone", "mobile", "contact_number"),
                m1Gender: normGender(getPlayerProp(otherPlayers[0], "gender")),
                m1Pwd: (otherPlayers[0]?.pwd === true || otherPlayers[0]?.pwd === "yes" || otherPlayers[0]?.is_pwd === true) ? "yes" : "no",
                m1ProfilePic: getProfileImageUrl(
                    getPlayerProp(otherPlayers[0], "profile_url", "profile_pic", "profile_picture", "image_url", "image")
                ),

                m2Id: otherPlayers[1]?.user_id || otherPlayers[1]?.id || otherPlayers[1]?.user?.id || "",
                m2Name: getPlayerProp(otherPlayers[1], "name", "full_name"),
                m2Email: getPlayerProp(otherPlayers[1], "email"),
                m2Mobile: getPlayerProp(otherPlayers[1], "phone", "mobile", "contact_number"),
                m2Gender: normGender(getPlayerProp(otherPlayers[1], "gender")),
                m2Pwd: (otherPlayers[1]?.pwd === true || otherPlayers[1]?.pwd === "yes" || otherPlayers[1]?.is_pwd === true) ? "yes" : "no",
                m2ProfilePic: getProfileImageUrl(
                    getPlayerProp(otherPlayers[1], "profile_url", "profile_pic", "profile_picture", "image_url", "image")
                ),

                m3Id: otherPlayers[2]?.user_id || otherPlayers[2]?.id || otherPlayers[2]?.user?.id || "",
                m3Name: getPlayerProp(otherPlayers[2], "name", "full_name"),
                m3Email: getPlayerProp(otherPlayers[2], "email"),
                m3Mobile: getPlayerProp(otherPlayers[2], "phone", "mobile", "contact_number"),
                m3Gender: normGender(getPlayerProp(otherPlayers[2], "gender")),
                m3Pwd: (otherPlayers[2]?.pwd === true || otherPlayers[2]?.pwd === "yes" || otherPlayers[2]?.is_pwd === true) ? "yes" : "no",
                m3ProfilePic: getProfileImageUrl(
                    getPlayerProp(otherPlayers[2], "profile_url", "profile_pic", "profile_picture", "image_url", "image")
                ),
            };

            setTeamData(transformedData);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            alert(getApiErrorMessage(err, "Failed to load dashboard data. Please log in again."));
            navigate("/login");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeamData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEditMode = (section) => {
        setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // Change Password handlers
    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));

        if (passwordErrors[name]) {
            setPasswordErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validatePasswordChange = () => {
        const errors = {};

        if (!passwordData.oldPassword) {
            errors.oldPassword = "Current password is required";
        }
        if (!passwordData.newPassword) {
            errors.newPassword = "New password is required";
        }
        if (passwordData.newPassword.length < 12) {
            errors.newPassword = "Password must be at least 12 characters";
        }
        if (!passwordData.confirmNewPassword) {
            errors.confirmNewPassword = "Please confirm new password";
        }
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            errors.confirmNewPassword = "Passwords do not match";
        }

        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!validatePasswordChange()) {
            return;
        }

        setIsChangingPassword(true);

        try {
            const token = localStorage.getItem("authToken");

            const response = await axios.post(
                `${BASE_URL}/auth/change-password`,
                {
                    current_password: passwordData.oldPassword,
                    new_password: passwordData.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                alert(response.data?.message || "Password changed successfully!");
                setShowChangePasswordModal(false);
                setPasswordData({
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                });
                setPasswordErrors({});
            } else {
                alert("Failed to change password: " + (response.data?.message || "Error"));
            }
        } catch (error) {
            console.error("Error changing password:", error);
            alert(getApiErrorMessage(error, "Error changing password. Please try again."));
        } finally {
            setIsChangingPassword(false);
        }
    };

    // Delete Member handlers
    const handleDeleteMemberClick = (memberId, memberName) => {
        setMemberToDelete({ id: memberId, name: memberName });
        setShowDeleteMemberModal(true);
        setDeletePassword("");
        setDeleteError("");
    };

    const handleDeleteMember = async (e) => {
        e.preventDefault();
        alert("Member deletions cannot be performed directly. Please contact an organizer or admin.");
        setShowDeleteMemberModal(false);
        setMemberToDelete(null);
        setDeletePassword("");
    };

    const saveChanges = async (section) => {
        const token = localStorage.getItem("authToken");
        const authHeader = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        try {
            if (section === "teamInfo") {
                await axios.patch(
                    `${BASE_URL}/teams/${teamData.teamId}`,
                    {
                        college: teamData.college,
                        city: teamData.city,
                    },
                    { headers: authHeader }
                );
                alert("Team information updated successfully");
                toggleEditMode(section);
            } else if (section === "abstract") {
                await axios.patch(
                    `${BASE_URL}/teams/${teamData.teamId}`,
                    {
                        abstract: teamData.abstract,
                        ppt_link: teamData.pptLink || null,
                    },
                    { headers: authHeader }
                );
                alert("Abstract & PPT link updated successfully");
                toggleEditMode(section);
            } else if (["lead", "member1", "member2", "member3"].includes(section)) {
                const prefixMap = {
                    lead: "lead",
                    member1: "m1",
                    member2: "m2",
                    member3: "m3",
                };
                const prefix = prefixMap[section];
                const memberUserId = teamData[`${prefix}Id`];
                if (memberUserId) {
                    await axios.patch(
                        `${BASE_URL}/teams/${teamData.teamId}`,
                        {
                            members: [
                                {
                                    user_id: memberUserId,
                                    name: teamData[`${prefix}Name`],
                                    email: teamData[`${prefix}Email`],
                                    phone: teamData[`${prefix}Mobile`],
                                    gender: genderText(teamData[`${prefix}Gender`]),
                                    pwd: teamData[`${prefix}Pwd`] === "yes",
                                },
                            ],
                        },
                        { headers: authHeader }
                    );
                    alert("Member details updated successfully");
                }
                toggleEditMode(section);
            } else {
                toggleEditMode(section);
            }
        } catch (err) {
            console.error(err);
            alert(getApiErrorMessage(err, "Something went wrong while updating information."));
        }
    };

    // New member form handlers
    const handleNewMemberInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setNewMemberData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setNewMemberData((prev) => ({ ...prev, [name]: value }));
        }

        if (addMemberErrors[name]) {
            setAddMemberErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validateNewMember = () => {
        const errors = {};

        if (!newMemberData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!newMemberData.email.trim()) {
            errors.email = "Email is required";
        }
        if (!newMemberData.mobile.trim()) {
            errors.mobile = "Mobile number is required";
        }
        if (newMemberData.mobile.trim().length !== 10) {
            errors.mobile = "Mobile number must be 10 digits";
        }
        if (!newMemberData.profilePic) {
            errors.profilePic = "Profile picture is required";
        }

        setAddMemberErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        alert("Team member changes after registration require approval from organizers.");
        setShowAddMemberForm(false);
    };

    const handleImageSelect = (memberType, event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size should be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImages((prev) => ({
                ...prev,
                [memberType]: e.target.result,
            }));
            setImageEditMode((prev) => ({
                ...prev,
                [memberType]: true,
            }));

            setCropPosition((prev) => ({
                ...prev,
                [memberType]: { x: 0, y: 0 },
            }));

            const img = new Image();
            img.onload = () => {
                const size = Math.min(img.width, img.height, 100);
                setCropSize((prev) => ({
                    ...prev,
                    [memberType]: size,
                }));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const startManualCrop = (memberType) => {
        setCroppingMode((prev) => ({
            ...prev,
            [memberType]: true,
        }));
    };

    const cancelManualCrop = (memberType) => {
        setCroppingMode((prev) => ({
            ...prev,
            [memberType]: false,
        }));
    };

    const applyManualCrop = (memberType) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            const container = cropContainerRefs[memberType].current;
            if (!container) return;

            const scaleX = img.width / container.offsetWidth;
            const scaleY = img.height / container.offsetHeight;

            const cropX = cropPosition[memberType].x * scaleX;
            const cropY = cropPosition[memberType].y * scaleY;
            const cropSizePx = cropSize[memberType] * Math.min(scaleX, scaleY);

            canvas.width = 400;
            canvas.height = 400;

            ctx.drawImage(img, cropX, cropY, cropSizePx, cropSizePx, 0, 0, 400, 400);

            canvas.toBlob(
                (blob) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setSelectedImages((prev) => ({
                            ...prev,
                            [memberType]: e.target.result,
                        }));
                    };
                    reader.readAsDataURL(blob);
                },
                "image/jpeg",
                0.9
            );

            setCroppingMode((prev) => ({
                ...prev,
                [memberType]: false,
            }));
        };

        img.src = selectedImages[memberType];
    };

    const handleCropStart = (memberType, clientX, clientY, corner) => {
        setIsDragging((prev) => ({
            ...prev,
            [memberType]: corner,
        }));

        setDragStart((prev) => ({
            ...prev,
            [memberType]: {
                x: clientX,
                y: clientY,
                initialX: cropPosition[memberType].x,
                initialY: cropPosition[memberType].y,
                initialSize: cropSize[memberType],
            },
        }));
    };

    const handleCropMouseDown = (memberType, e, corner) => {
        e.preventDefault();
        e.stopPropagation();
        handleCropStart(memberType, e.clientX, e.clientY, corner);
    };

    const handleCropTouchStart = (memberType, e, corner) => {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        handleCropStart(memberType, touch.clientX, touch.clientY, corner);
    };

    const handleCropMove = (memberType, clientX, clientY) => {
        const corner = isDragging[memberType];
        if (!corner) return;

        const container = cropContainerRefs[memberType].current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const deltaX = clientX - dragStart[memberType].x;
        const deltaY = clientY - dragStart[memberType].y;

        if (corner === "move") {
            const newX = Math.max(
                0,
                Math.min(
                    dragStart[memberType].initialX + deltaX,
                    rect.width - cropSize[memberType]
                )
            );
            const newY = Math.max(
                0,
                Math.min(
                    dragStart[memberType].initialY + deltaY,
                    rect.height - cropSize[memberType]
                )
            );
            setCropPosition((prev) => ({
                ...prev,
                [memberType]: { x: newX, y: newY },
            }));
        } else if (corner === "resize") {
            const maxDelta = Math.max(deltaX, deltaY);
            const newSize = Math.max(
                50,
                Math.min(
                    Math.min(
                        rect.width - dragStart[memberType].initialX,
                        rect.height - dragStart[memberType].initialY
                    ),
                    dragStart[memberType].initialSize + maxDelta
                )
            );

            setCropSize((prev) => ({
                ...prev,
                [memberType]: newSize,
            }));
        }
    };

    const handleCropMouseMove = (memberType, e) => {
        const corner = isDragging[memberType];
        if (!corner) return;
        e.preventDefault();
        handleCropMove(memberType, e.clientX, e.clientY);
    };

    const handleCropTouchMove = (memberType, e) => {
        const corner = isDragging[memberType];
        if (!corner) return;
        e.preventDefault();
        const touch = e.touches[0];
        handleCropMove(memberType, touch.clientX, touch.clientY);
    };

    const handleCropEnd = (memberType) => {
        setIsDragging((prev) => ({
            ...prev,
            [memberType]: null,
        }));
    };

    const handleCropMouseUp = (memberType) => {
        handleCropEnd(memberType);
    };

    const handleCropTouchEnd = (memberType) => {
        handleCropEnd(memberType);
    };

    const cropImageToSquare = async (imageSrc, memberType) => {
        if (croppingMode[memberType] && selectedImages[memberType]) {
            return new Promise((resolve) => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const img = new Image();

                img.onload = () => {
                    const container = cropContainerRefs[memberType].current;
                    if (!container) return;

                    const scaleX = img.width / container.offsetWidth;
                    const scaleY = img.height / container.offsetHeight;

                    const cropX = cropPosition[memberType].x * scaleX;
                    const cropY = cropPosition[memberType].y * scaleY;
                    const cropSizePx = cropSize[memberType] * Math.min(scaleX, scaleY);

                    canvas.width = 400;
                    canvas.height = 400;

                    ctx.drawImage(
                        img,
                        cropX,
                        cropY,
                        cropSizePx,
                        cropSizePx,
                        0,
                        0,
                        400,
                        400
                    );

                    canvas.toBlob(
                        (blob) => {
                            resolve(blob);
                        },
                        "image/webp",
                        0.92
                    );
                };

                img.src = imageSrc;
            });
        }

        return new Promise((resolve) => {
            const canvas = canvasRef.current || document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();

            img.onload = () => {
                const size = Math.min(img.width, img.height);
                const offsetX = (img.width - size) / 2;
                const offsetY = (img.height - size) / 2;

                canvas.width = 400;
                canvas.height = 400;

                ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, 400, 400);

                canvas.toBlob(
                    (blob) => {
                        resolve(blob);
                    },
                    "image/webp",
                    0.92
                );
            };

            img.src = imageSrc;
        });
    };

    const saveProfilePicture = async (memberType) => {
        try {
            const token = localStorage.getItem("authToken");
            const imageSrc = selectedImages[memberType];

            if (!imageSrc) {
                alert("No image selected");
                return;
            }

            setIsUploadingImage(true);

            // 1. Crop to square (outputting WebP format blob)
            const croppedBlob = await cropImageToSquare(imageSrc, memberType);

            // 2. Upload to SwagServer endpoint: POST https://swagserver.co.in/hackfusion/upload_image.php
            const uploadResult = await uploadToSwagServer(croppedBlob, `${memberType}_profile.webp`);

            if (!uploadResult) {
                throw new Error("Did not receive a valid image response from SwagServer");
            }

            const fileName =
                typeof uploadResult === "object" && uploadResult.fileName
                    ? uploadResult.fileName
                    : String(uploadResult).split("/").pop();

            const imageUrl =
                typeof uploadResult === "object" && uploadResult.imageUrl
                    ? uploadResult.imageUrl
                    : `${SWAG_IMAGE_BASE_URL}${fileName}`;

            // 3. Store the image filename in beeserver.online using POST /users/me/profile-picture
            // Send only the bare filename (without the SwagServer URL prefix) per API expectation
            await axios.post(
                `${BASE_URL}/users/me/profile-picture`,
                {
                    profile_url: fileName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // 4. Update local state with the newly uploaded image
            const profilePicKey =
                memberType === "lead"
                    ? "leadProfilePic"
                    : memberType === "member1"
                        ? "m1ProfilePic"
                        : memberType === "member2"
                            ? "m2ProfilePic"
                            : "m3ProfilePic";

            setTeamData((prev) => ({
                ...prev,
                [profilePicKey]: imageUrl,
                teamLogo: memberType === "lead" ? imageUrl : prev.teamLogo,
                ...(memberType === "lead" ? { leadProfilePic: imageUrl } : {}),
            }));

            setSelectedImages((prev) => ({
                ...prev,
                [memberType]: null,
            }));

            setImageEditMode((prev) => ({
                ...prev,
                [memberType]: false,
            }));

            setCroppingMode((prev) => ({
                ...prev,
                [memberType]: false,
            }));

            alert("Profile picture updated successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            alert(getApiErrorMessage(error, "Failed to upload and update profile picture."));
        } finally {
            setIsUploadingImage(false);
        }
    };

    const cancelImageEdit = (memberType) => {
        setSelectedImages((prev) => ({
            ...prev,
            [memberType]: null,
        }));
        setImageEditMode((prev) => ({
            ...prev,
            [memberType]: false,
        }));
        setCroppingMode((prev) => ({
            ...prev,
            [memberType]: false,
        }));
        if (fileInputRefs[memberType].current) {
            fileInputRefs[memberType].current.value = "";
        }
    };

    /* ---- UI helpers (close handlers reuse the exact resets the original inlined) ---- */
    const closeAddMember = () => {
        setShowAddMemberForm(false);
        setNewMemberData({
            name: "",
            email: "",
            mobile: "",
            gender: "M",
            isPwd: "no",
            profilePic: null,
        });
        setAddMemberErrors({});
    };

    const closeChangePassword = () => {
        setShowChangePasswordModal(false);
        setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
        setPasswordErrors({});
    };

    const closeDeleteMember = () => {
        setShowDeleteMemberModal(false);
        setMemberToDelete(null);
        setDeletePassword("");
        setDeleteError("");
    };

    const renderProfileImage = (
        memberType,
        profilePic,
        name,
        accent,
        canEdit
    ) => {
        const isEditing = imageEditMode[memberType];
        const selectedImage = selectedImages[memberType];
        const isCropping = croppingMode[memberType];
        const finalPicUrl = getProfileImageUrl(profilePic);

        return (
            <div className="group relative shrink-0">
                <div className="mc-avatar" style={{ "--accent": accent }}>
                    {selectedImage && !isCropping ? (
                        <img src={selectedImage} alt={name} />
                    ) : finalPicUrl ? (
                        <img
                            src={finalPicUrl}
                            alt={name}
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    ) : (
                        <div className="mc-avatar-letter px" style={{ color: accent }}>
                            {name?.charAt(0) || "M"}
                        </div>
                    )}

                    {canEdit && !isEditing && (
                        <div
                            className="mc-avatar-hover"
                            onClick={() => fileInputRefs[memberType].current?.click()}
                        >
                            <Camera size={24} />
                        </div>
                    )}
                </div>

                {canEdit && !isEditing && (
                    <button
                        type="button"
                        className="mc-cam"
                        style={{ "--accent": accent }}
                        onClick={() => fileInputRefs[memberType].current?.click()}
                        aria-label="Change photo"
                    >
                        <Camera size={14} />
                    </button>
                )}

                {isEditing && selectedImage && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-3">
                        <div
                            className="mc-shell mc-pop mc-scroll max-h-[94vh] w-full max-w-sm overflow-y-auto p-5"
                            style={{ "--accent": accent }}
                        >
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h4 className="px mc-title text-[10px] leading-relaxed text-white sm:text-xs">
                                    Crop Profile Picture
                                </h4>
                                <button
                                    type="button"
                                    onClick={() => cancelImageEdit(memberType)}
                                    className="mc-x"
                                    aria-label="Close"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {!isCropping ? (
                                <div className="space-y-4">
                                    <div
                                        className="mx-auto h-48 w-48 overflow-hidden border-4 border-black"
                                        style={{ boxShadow: "0 0 0 3px var(--accent)" }}
                                    >
                                        <img
                                            src={selectedImage}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => startManualCrop(memberType)}
                                            className="mc-btn sm blue flex-1"
                                        >
                                            <Crop size={14} />
                                            Crop
                                        </button>
                                        <button
                                            type="button"
                                            disabled={isUploadingImage}
                                            onClick={() => saveProfilePicture(memberType)}
                                            className="mc-btn sm green flex-1"
                                        >
                                            <Check size={14} />
                                            {isUploadingImage ? "Uploading..." : "Use As Is"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div
                                        ref={cropContainerRefs[memberType]}
                                        className="relative mx-auto h-64 w-64 select-none overflow-hidden border-4 border-black bg-black"
                                        onMouseMove={(e) => handleCropMouseMove(memberType, e)}
                                        onMouseUp={() => handleCropMouseUp(memberType)}
                                        onMouseLeave={() => handleCropMouseUp(memberType)}
                                        onTouchMove={(e) => handleCropTouchMove(memberType, e)}
                                        onTouchEnd={() => handleCropTouchEnd(memberType)}
                                    >
                                        <img
                                            src={selectedImage}
                                            alt="Crop preview"
                                            className="pointer-events-none h-full w-full object-contain"
                                            style={{ touchAction: "none" }}
                                        />

                                        <div
                                            className="absolute select-none border-2 border-white shadow-lg"
                                            style={{
                                                left: cropPosition[memberType].x,
                                                top: cropPosition[memberType].y,
                                                width: cropSize[memberType],
                                                height: cropSize[memberType],
                                                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                                                cursor: "move",
                                                touchAction: "none",
                                            }}
                                            onMouseDown={(e) =>
                                                handleCropMouseDown(memberType, e, "move")
                                            }
                                            onTouchStart={(e) =>
                                                handleCropTouchStart(memberType, e, "move")
                                            }
                                        >
                                            <div
                                                className="absolute bottom-0 right-0 h-6 w-6 cursor-nwse-resize select-none bg-white"
                                                style={{
                                                    transform: "translate(25%, 25%)",
                                                    touchAction: "none",
                                                }}
                                                onMouseDown={(e) => {
                                                    e.stopPropagation();
                                                    handleCropMouseDown(memberType, e, "resize");
                                                }}
                                                onTouchStart={(e) => {
                                                    e.stopPropagation();
                                                    handleCropTouchStart(memberType, e, "resize");
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <p className="text-center text-[21px] text-gray-300">
                                        Drag to move • Drag the corner to resize
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => cancelManualCrop(memberType)}
                                            className="mc-btn sm flex-1"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => applyManualCrop(memberType)}
                                            className="mc-btn sm blue flex-1"
                                        >
                                            Apply
                                        </button>
                                        <button
                                            type="button"
                                            disabled={isUploadingImage}
                                            onClick={() => saveProfilePicture(memberType)}
                                            className="mc-btn sm green flex-1"
                                        >
                                            <Check size={14} />
                                            {isUploadingImage ? "Uploading..." : "Save"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <input
                    ref={fileInputRefs[memberType]}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageSelect(memberType, e)}
                    className="hidden"
                />
            </div>
        );
    };

    const canAddMember =
        !!teamData && teamData.teamSize === 3 && !teamData.m3Name && isLead;
    const go = fontsReady && entered;

    const editAction = (key) => () =>
        editMode[key] ? saveChanges(key) : toggleEditMode(key);

    const EVENT_NAME = "Hackfusion 4"

    return (
        <div className={`hf4 relative min-h-screen w-full overflow-x-hidden ${go ? "go" : ""}`}>
            <style>{styles}</style>
            <Scene bgImage={BG_IMAGE} />
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {!teamData ? (
                <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                    <div className="mc-shell w-full max-w-xs p-6 text-center">
                        <p className="px mc-title text-[10px] leading-relaxed text-white">
                            Loading dashboard...
                        </p>
                        <div className="mc-xp mt-5">
                            <div className="mc-xp-load" />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <main className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-14 pt-24 sm:px-6 sm:pt-28">
                        {/* Header */}
                        <Navbar/>
                        {/* <img
                            src={logo}
                            alt={EVENT_NAME}
                            className="mc-logo mx-auto h-auto w-full max-w-[220px] sm:max-w-[450px]"
                        /> */}
                        <header className="mc-shell mc-shell-in mb-6">

                            <div className="mc-grass" />
                            <div className="p-4 sm:p-6">
                                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                    {/* Team Info */}
                                    <div className="flex min-w-0 items-center gap-4">
                                        {teamData.teamLogo ? (
                                            <img
                                                src={getProfileImageUrl(teamData.teamLogo)}
                                                alt="Team Logo"
                                                className="mc-logo-sq"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : (
                                            <div className="mc-logo-sq flex items-center justify-center">
                                                <span className="px text-xl text-yellow-400">
                                                    {teamData.teamName?.charAt(0) || "T"}
                                                </span>
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <h1
                                                className="px mc-title text-xs leading-snug sm:text-lg"
                                                style={{ color: "#f2b705" }}
                                            >
                                                Team Dashboard
                                            </h1>
                                            <h2 className="mt-2 break-words text-[30px] leading-none text-white sm:text-[38px]">
                                                {teamData.teamName}
                                            </h2>
                                            <p className="mt-1 text-[22px] text-gray-400">
                                                {teamData.theme}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-3 md:items-end">
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`mc-badge ${teamData.round1Passed ? "green" : "gold"}`}>
                                                Round 1: {teamData.round1Passed ? "Passed" : "Pending"}
                                            </span>
                                            {teamData.allottedLab && (
                                                <span className="mc-badge green">
                                                    Lab: {teamData.allottedLab}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {/* {teamData.registrationStatus !== "Pending" &&
                                                teamData.registrationStatus !== "Rejected" && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            window.open(
                                                                `/receipt?team_id=${teamData.teamId}`,
                                                                "_blank"
                                                            )
                                                        }
                                                        className="mc-btn sm orange"
                                                    >
                                                        View Receipt
                                                    </button>
                                                )} */}
                                            <button
                                                type="button"
                                                onClick={() => setShowChangePasswordModal(true)}
                                                className="mc-btn sm blue"
                                            >
                                                Change Password
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="mc-btn sm red"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Branding */}
                                <div className="mt-5 flex items-center justify-center gap-2 border-t-4 border-black/60 pt-3 text-[20px] text-gray-400">
                                    Powered by{" "}
                                    <a
                                        href="https://beestack.in"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={beestacklogo}
                                            alt="BeeStack"
                                            className="h-4 w-auto md:h-7"
                                        />
                                    </a>
                                </div>
                            </div>
                        </header>

                        {/* Add Member Button */}
                        {canAddMember && (
                            <div className="mc-card-in mb-6" style={{ "--d": "0.15s" }}>
                                <button
                                    type="button"
                                    onClick={() => setShowAddMemberForm(true)}
                                    className="mc-btn green block big"
                                >
                                    <UserPlus size={22} />
                                    Add 4th Team Member
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Team Information Card */}
                            <Card
                                title="Team Information"
                                accent={ACCENT.team}
                                delay={0.2}
                                action={
                                    isLead && hideEditButtons ? (
                                        <button
                                            type="button"
                                            onClick={editAction("teamInfo")}
                                            className={`mc-btn sm ${editMode.teamInfo ? "green" : ""}`}
                                        >
                                            {editMode.teamInfo ? "Save" : "Edit"}
                                        </button>
                                    ) : null
                                }
                            >
                                <div className="space-y-4">
                                    <EditableField
                                        label="College"
                                        name="college"
                                        value={teamData.college}
                                        onChange={handleInputChange}
                                        editing={editMode.teamInfo}
                                    />
                                    <EditableField
                                        label="City"
                                        name="city"
                                        value={teamData.city}
                                        onChange={handleInputChange}
                                        editing={editMode.teamInfo}
                                    />
                                    <div>
                                        <span className="mc-label">Team Size</span>
                                        <p className="mc-value">{teamData.teamSize} Members</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Abstract Card */}
                            <Card
                                title="Project Abstract & PPT"
                                accent={ACCENT.abstract}
                                delay={0.28}
                                action={
                                    isLead && hideEditButtons ? (
                                        <button
                                            type="button"
                                            onClick={editAction("abstract")}
                                            className={`mc-btn sm ${editMode.abstract ? "green" : ""}`}
                                        >
                                            {editMode.abstract ? "Save" : "Edit"}
                                        </button>
                                    ) : null
                                }
                            >
                                {editMode.abstract ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mc-label text-yellow-300">Project Abstract</label>
                                            <textarea
                                                name="abstract"
                                                value={teamData.abstract}
                                                onChange={handleInputChange}
                                                rows="6"
                                                className="mc-input"
                                                placeholder="Enter project abstract..."
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="mc-label text-yellow-300 !mb-0">Presentation PPT Google Drive Link</label>
                                                <a
                                                    href="https://docs.google.com/presentation/d/1B4rz5M5U-V7qcySXisUqlYIv3D__50-gkGkBehU4xgg/edit?usp=sharing"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-[#7dea2b] hover:text-white underline inline-flex items-center gap-1"
                                                >
                                                    <span>PPT Template</span>
                                                    <span>↗</span>
                                                </a>
                                            </div>
                                            <input
                                                type="url"
                                                name="pptLink"
                                                value={teamData.pptLink || ""}
                                                onChange={handleInputChange}
                                                className="mc-input"
                                                placeholder="https://docs.google.com/presentation/d/... or Google Drive link"
                                            />
                                            <p className="mc-hint">Ensure link access is set to 'Anyone with the link can view'</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-gray-700/60">
                                            <span className="text-xs uppercase tracking-wider text-gray-400">Round 1 Evaluation</span>
                                            <span className={`mc-badge ${teamData.round1Passed ? "green" : "gold"}`}>
                                                {teamData.round1Passed ? "Passed" : "Pending"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs uppercase tracking-wider text-gray-400">Abstract</span>
                                            <p className="mc-value mc-scroll max-h-56 overflow-auto whitespace-pre-wrap mt-1">
                                                {teamData.abstract || "No abstract provided."}
                                            </p>
                                        </div>
                                        <div className="pt-3 border-t border-gray-700/60">
                                            <span className="text-xs uppercase tracking-wider text-gray-400">Presentation (PPT) Link</span>
                                            <div className="mt-1 flex items-center gap-3">
                                                {teamData.pptLink ? (
                                                    <a
                                                        href={teamData.pptLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mc-btn sm text-xs inline-flex items-center gap-2 text-yellow-300 hover:text-white"
                                                    >
                                                        <span>Open Google Drive PPT</span>
                                                        <span>↗</span>
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">No PPT link submitted yet.</span>
                                                )}
                                                <a
                                                    href="https://docs.google.com/presentation/d/1B4rz5M5U-V7qcySXisUqlYIv3D__50-gkGkBehU4xgg/edit?usp=sharing"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mc-btn sm text-xs inline-flex items-center gap-2 text-green-300 hover:text-white"
                                                >
                                                    <span>Official PPT Template</span>
                                                    <span>↗</span>
                                                </a>
                                            </div>
                                            {teamData.pptLink && (
                                                <p className="text-xs text-gray-400 truncate mt-1 select-all font-mono">
                                                    {teamData.pptLink}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Card>

                            {/* Team Lead Card */}
                            <MemberCard
                                title="Team Lead"
                                prefix="lead"
                                accent={ACCENT.lead}
                                delay={0.36}
                                avatar={renderProfileImage(
                                    "lead",
                                    teamData.leadProfilePic,
                                    teamData.leadName,
                                    ACCENT.lead,
                                    isLead
                                )}
                                editing={editMode.lead}
                                showEdit={isLead && hideEditButtons}
                                showRemove={false}
                                onEdit={editAction("lead")}
                                teamData={teamData}
                                onChange={handleInputChange}
                            />

                            {/* Member 1 Card */}
                            {teamData.m1Name && (
                                <MemberCard
                                    title="Member 1"
                                    prefix="m1"
                                    accent={ACCENT.member1}
                                    delay={0.44}
                                    avatar={renderProfileImage(
                                        "member1",
                                        teamData.m1ProfilePic,
                                        teamData.m1Name,
                                        ACCENT.member1,
                                        isLead || userId === teamData.m1Id
                                    )}
                                    editing={editMode.member1}
                                    showEdit={(isLead || userId === teamData.m1Id) && hideEditButtons}
                                    showRemove={isLead && teamData?.teamSize === 4 && hideEditButtons}
                                    onEdit={editAction("member1")}
                                    onRemove={() =>
                                        handleDeleteMemberClick(teamData.m1Id, teamData.m1Name)
                                    }
                                    teamData={teamData}
                                    onChange={handleInputChange}
                                />
                            )}

                            {/* Member 2 Card */}
                            {teamData.m2Name && (
                                <MemberCard
                                    title="Member 2"
                                    prefix="m2"
                                    accent={ACCENT.member2}
                                    delay={0.52}
                                    avatar={renderProfileImage(
                                        "member2",
                                        teamData.m2ProfilePic,
                                        teamData.m2Name,
                                        ACCENT.member2,
                                        isLead || userId === teamData.m2Id
                                    )}
                                    editing={editMode.member2}
                                    showEdit={(isLead || userId === teamData.m2Id) && hideEditButtons}
                                    showRemove={isLead && teamData?.teamSize === 4 && hideEditButtons}
                                    onEdit={editAction("member2")}
                                    onRemove={() =>
                                        handleDeleteMemberClick(teamData.m2Id, teamData.m2Name)
                                    }
                                    teamData={teamData}
                                    onChange={handleInputChange}
                                />
                            )}

                            {/* Member 3 Card */}
                            {teamData.m3Name && (
                                <MemberCard
                                    title="Member 3"
                                    prefix="m3"
                                    accent={ACCENT.member3}
                                    delay={0.6}
                                    avatar={renderProfileImage(
                                        "member3",
                                        teamData.m3ProfilePic,
                                        teamData.m3Name,
                                        ACCENT.member3,
                                        isLead || userId === teamData.m3Id
                                    )}
                                    editing={editMode.member3}
                                    showEdit={(isLead || userId === teamData.m3Id) && hideEditButtons}
                                    showRemove={isLead && teamData?.teamSize === 4 && hideEditButtons}
                                    onEdit={editAction("member3")}
                                    onRemove={() =>
                                        handleDeleteMemberClick(teamData.m3Id, teamData.m3Name)
                                    }
                                    teamData={teamData}
                                    onChange={handleInputChange}
                                />
                            )}
                        </div>
                    </main>

                    {/* Add Member Form Modal */}
                    {showAddMemberForm && (
                        <Modal
                            title="Add New Team Member"
                            accent="#55c038"
                            wide
                            onClose={closeAddMember}
                        >
                            <form onSubmit={handleAddMember} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <FormField
                                        label="Full Name *"
                                        name="name"
                                        value={newMemberData.name}
                                        onChange={handleNewMemberInputChange}
                                        error={addMemberErrors.name}
                                    />
                                    <FormField
                                        label="Email *"
                                        type="email"
                                        name="email"
                                        value={newMemberData.email}
                                        onChange={handleNewMemberInputChange}
                                        error={addMemberErrors.email}
                                    />
                                    <FormField
                                        label="Mobile *"
                                        type="tel"
                                        name="mobile"
                                        value={newMemberData.mobile}
                                        onChange={handleNewMemberInputChange}
                                        error={addMemberErrors.mobile}
                                    />

                                    <div>
                                        <label htmlFor="gender" className="mc-label">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={newMemberData.gender}
                                            onChange={handleNewMemberInputChange}
                                            className="mc-input"
                                        >
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                            <option value="O">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="isPwd" className="mc-label">
                                            PWD (Person with Disability)
                                        </label>
                                        <select
                                            id="isPwd"
                                            name="isPwd"
                                            value={newMemberData.isPwd}
                                            onChange={handleNewMemberInputChange}
                                            className="mc-input"
                                        >
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="profilePic" className="mc-label">
                                            Profile Picture *
                                        </label>
                                        <input
                                            id="profilePic"
                                            type="file"
                                            name="profilePic"
                                            onChange={handleNewMemberInputChange}
                                            accept="image/*"
                                            className={`mc-input ${addMemberErrors.profilePic ? "err" : ""}`}
                                        />
                                        {addMemberErrors.profilePic && (
                                            <p className="mc-error">{addMemberErrors.profilePic}</p>
                                        )}
                                        {newMemberData.profilePic && (
                                            <p className="mc-ok">Selected: {newMemberData.profilePic.name}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button type="button" onClick={closeAddMember} className="mc-btn flex-1">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmittingMember}
                                        className="mc-btn green flex-1"
                                    >
                                        {isSubmittingMember ? "Adding..." : "Add Member"}
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    )}

                    {/* Change Password Modal */}
                    {showChangePasswordModal && (
                        <Modal title="Change Password" accent="#4c8dff" onClose={closeChangePassword}>
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <FormField
                                    label="Current Password *"
                                    type="password"
                                    name="oldPassword"
                                    value={passwordData.oldPassword}
                                    onChange={handlePasswordInputChange}
                                    error={passwordErrors.oldPassword}
                                />
                                <FormField
                                    label="New Password *"
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordInputChange}
                                    error={passwordErrors.newPassword}
                                />
                                <FormField
                                    label="Confirm New Password *"
                                    type="password"
                                    name="confirmNewPassword"
                                    value={passwordData.confirmNewPassword}
                                    onChange={handlePasswordInputChange}
                                    error={passwordErrors.confirmNewPassword}
                                />

                                <div className="mt-6 flex gap-3">
                                    <button type="button" onClick={closeChangePassword} className="mc-btn flex-1">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isChangingPassword}
                                        className="mc-btn blue flex-1"
                                    >
                                        {isChangingPassword ? "Changing..." : "Change Password"}
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    )}

                    {/* Delete Member Confirmation Modal */}
                    {showDeleteMemberModal && (
                        <Modal title="Remove Member" accent="#e5484d" onClose={closeDeleteMember}>
                            <div className="mb-5">
                                <p className="mb-2 text-[24px] text-white">
                                    Are you sure you want to Remove{" "}
                                    <span className="text-red-400">{memberToDelete?.name}</span>?
                                </p>
                                <div className="mc-note">
                                    This action cannot be undone. Please enter your password to confirm.
                                </div>
                            </div>

                            <form onSubmit={handleDeleteMember} className="space-y-4">
                                <div>
                                    <label htmlFor="deletePassword" className="mc-label">
                                        Your Password *
                                    </label>
                                    <input
                                        id="deletePassword"
                                        type="password"
                                        value={deletePassword}
                                        onChange={(e) => {
                                            setDeletePassword(e.target.value);
                                            setDeleteError("");
                                        }}
                                        className={`mc-input ${deleteError ? "err" : ""}`}
                                        placeholder="Enter your password"
                                    />
                                    {deleteError && <p className="mc-error">{deleteError}</p>}
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button type="button" onClick={closeDeleteMember} className="mc-btn flex-1">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isDeletingMember}
                                        className="mc-btn red flex-1"
                                    >
                                        {isDeletingMember ? "Removing..." : "Remove Member"}
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    )}
                </>
            )}
            <Footer/>
        </div>
    );
}

export default Dashboard;