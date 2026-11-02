import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Camera, X, Check, Crop, UserPlus, Trash2 } from "lucide-react";
import { BASE_URL } from "../hooks/api";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

const genderText = (g) => (g === "M" ? "Male" : g === "F" ? "Female" : "Other");

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

    const [hideEditButtons, setHideEditButtons] = useState(false);
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

    const fetchDashboardData = (token) => {
        axios
            .get(
                `${BASE_URL}/get_dashboard.php?token=${token}`
            )
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    const data = res.data.data;
                    const leadMember = data.members.find(
                        (member) => member.is_lead === 1
                    );
                    const otherMembers = data.members.filter(
                        (member) => member.is_lead === 0
                    );

                    const transformedData = {
                        teamId: data.team_id,
                        teamName: data.team_name,
                        theme: data.theme,
                        abstract: data.abstract,
                        teamSize: data.team_size,
                        city: data.city,
                        college: data.college,
                        coupon: data.coupon,
                        paymentStatus: data.payment_status,
                        registrationStatus: data.registration_status,
                        teamLogo: data.team_logo,
                        paymentProof: data.payment_proof,

                        leadId: leadMember?.member_id || "",
                        leadName: leadMember?.name || "",
                        leadEmail: leadMember?.email || "",
                        leadMobile: leadMember?.mobile || "",
                        leadGender: leadMember?.gender || "M",
                        leadPwd: leadMember?.is_pwd === 1 ? "yes" : "no",
                        leadProfilePic: leadMember?.profile_pic || "",

                        m1Id: otherMembers[0]?.member_id || "",
                        m1Name: otherMembers[0]?.name || "",
                        m1Email: otherMembers[0]?.email || "",
                        m1Mobile: otherMembers[0]?.mobile || "",
                        m1Gender: otherMembers[0]?.gender || "M",
                        m1Pwd: otherMembers[0]?.is_pwd === 1 ? "yes" : "no",
                        m1ProfilePic: otherMembers[0]?.profile_pic || "",

                        m2Id: otherMembers[1]?.member_id || "",
                        m2Name: otherMembers[1]?.name || "",
                        m2Email: otherMembers[1]?.email || "",
                        m2Mobile: otherMembers[1]?.mobile || "",
                        m2Gender: otherMembers[1]?.gender || "M",
                        m2Pwd: otherMembers[1]?.is_pwd === 1 ? "yes" : "no",
                        m2ProfilePic: otherMembers[1]?.profile_pic || "",

                        m3Id: otherMembers[2]?.member_id || "",
                        m3Name: otherMembers[2]?.name || "",
                        m3Email: otherMembers[2]?.email || "",
                        m3Mobile: otherMembers[2]?.mobile || "",
                        m3Gender: otherMembers[2]?.gender || "M",
                        m3Pwd: otherMembers[2]?.is_pwd === 1 ? "yes" : "no",
                        m3ProfilePic: otherMembers[2]?.profile_pic || "",
                    };

                    setTeamData(transformedData);
                } else {
                    alert(res.data.message);
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.error(err);
                navigate("/login");
            });
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
        if (passwordData.newPassword.length < 6) {
            errors.newPassword = "Password must be at least 6 characters";
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
            const userEmail = teamData.leadEmail;

            const response = await axios.post(
                `${BASE_URL}/change_password.php`,
                {
                    email: userEmail,
                    token: token,
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword,
                }
            );

            if (response.data.success) {
                alert("Password changed successfully!");
                setShowChangePasswordModal(false);
                setPasswordData({
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                });
                setPasswordErrors({});
            } else {
                alert("Failed to change password: " + response.data.message);
            }
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Error changing password. Please try again.");
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

        if (!deletePassword) {
            setDeleteError("Password is required");
            return;
        }

        setIsDeletingMember(true);
        setDeleteError("");

        try {
            const token = localStorage.getItem("authToken");
            const leadEmail = teamData.leadEmail;
            const teamId = teamData.teamId;

            const response = await axios.post(
                `${BASE_URL}/delete_member.php`,
                {
                    leadEmail: leadEmail,
                    leadToken: token,
                    teamId: teamId,
                    password: deletePassword,
                    memberId: memberToDelete.id,
                }
            );

            if (response.data.success) {
                alert(`Member ${memberToDelete.name} deleted successfully!`);
                setShowDeleteMemberModal(false);
                setMemberToDelete(null);
                setDeletePassword("");

                // Refresh dashboard data
                fetchDashboardData(token);
            } else {
                setDeleteError(response.data.message || "Failed to delete member");
            }
        } catch (error) {
            console.error("Error deleting member:", error);
            setDeleteError("Error deleting member. Please try again.");
        } finally {
            setIsDeletingMember(false);
        }
    };

    const saveChanges = async (section) => {
        const token = localStorage.getItem("authToken");
        let payload = { token };

        switch (section) {
            case "teamInfo":
                payload.edit_type = "team";
                payload.college = teamData.college;
                payload.city = teamData.city;
                break;

            case "abstract":
                payload.edit_type = "team";
                payload.abstract = teamData.abstract;
                break;

            case "lead":
                payload.edit_type = "member";
                payload.member_id = teamData.leadId;
                payload.name = teamData.leadName;
                payload.email = teamData.leadEmail;
                payload.mobile = teamData.leadMobile;
                break;

            case "member1":
                payload.edit_type = "member";
                payload.member_id = teamData.m1Id;
                payload.name = teamData.m1Name;
                payload.email = teamData.m1Email;
                payload.mobile = teamData.m1Mobile;
                break;

            case "member2":
                payload.edit_type = "member";
                payload.member_id = teamData.m2Id;
                payload.name = teamData.m2Name;
                payload.email = teamData.m2Email;
                payload.mobile = teamData.m2Mobile;
                break;

            case "member3":
                payload.edit_type = "member";
                payload.member_id = teamData.m3Id;
                payload.name = teamData.m3Name;
                payload.email = teamData.m3Email;
                payload.mobile = teamData.m3Mobile;
                break;

            default:
                return;
        }

        try {
            const res = await axios.post(
                `${BASE_URL}/edit_team.php`,
                payload
            );

            if (res.data.success) {
                alert("Information updated successfully");
                toggleEditMode(section);
            } else {
                alert("Update failed: " + res.data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong while updating information.");
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

        if (!validateNewMember()) {
            return;
        }

        setIsSubmittingMember(true);

        try {
            const token = localStorage.getItem("authToken");
            const leadEmail = teamData.leadEmail;
            const teamId = teamData.teamId;

            const formData = new FormData();
            formData.append("leadEmail", leadEmail);
            formData.append("leadToken", token);
            formData.append("teamId", teamId);
            formData.append("name", newMemberData.name);
            formData.append("email", newMemberData.email);
            formData.append("mobile", newMemberData.mobile);
            formData.append("gender", newMemberData.gender);
            formData.append("isPwd", newMemberData.isPwd === "yes" ? 1 : 0);
            formData.append("profilePic", newMemberData.profilePic);

            const response = await axios.post(
                `${BASE_URL}/add_team_member.php`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                alert("Member added successfully! Refreshing dashboard...");
                setShowAddMemberForm(false);
                setNewMemberData({
                    name: "",
                    email: "",
                    mobile: "",
                    gender: "M",
                    isPwd: "no",
                    profilePic: null,
                });

                // Refresh dashboard data
                fetchDashboardData(token);
            } else {
                alert("Failed to add member: " + response.data.message);
            }
        } catch (error) {
            console.error("Error adding member:", error);
            alert("Error adding member. Please try again.");
        } finally {
            setIsSubmittingMember(false);
        }
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
                        "image/jpeg",
                        0.9
                    );
                };

                img.src = imageSrc;
            });
        }

        return new Promise((resolve) => {
            const canvas = canvasRef.current;
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
                    "image/jpeg",
                    0.9
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

            let memberId;
            switch (memberType) {
                case "lead":
                    memberId = teamData.leadId;
                    break;
                case "member1":
                    memberId = teamData.m1Id;
                    break;
                case "member2":
                    memberId = teamData.m2Id;
                    break;
                case "member3":
                    memberId = teamData.m3Id;
                    break;
                default:
                    return;
            }

            const croppedBlob = await cropImageToSquare(imageSrc, memberType);

            const formData = new FormData();
            formData.append("token", token);
            formData.append("member_id", memberId);
            formData.append("profile_pic", croppedBlob, "profile_pic.jpg");

            const response = await axios.post(
                `${BASE_URL}/edit_img.php`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
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
                    [profilePicKey]: response.data.data.profile_pic,
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
            } else {
                alert("Failed to update profile picture: " + response.data.message);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image. Please try again.");
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

        return (
            <div className="group relative shrink-0">
                <div className="mc-avatar" style={{ "--accent": accent }}>
                    {selectedImage && !isCropping ? (
                        <img src={selectedImage} alt={name} />
                    ) : profilePic ? (
                        <img src={profilePic} alt={name} />
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
                                            onClick={() => saveProfilePicture(memberType)}
                                            className="mc-btn sm green flex-1"
                                        >
                                            <Check size={14} />
                                            Use As Is
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
                                            onClick={() => saveProfilePicture(memberType)}
                                            className="mc-btn sm green flex-1"
                                        >
                                            <Check size={14} />
                                            Save
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
                        <img
                            src={logo}
                            alt={EVENT_NAME}
                            className="mc-logo mx-auto h-auto w-full max-w-[220px] sm:max-w-[450px]"
                        />
                        <header className="mc-shell mc-shell-in mb-6">

                            <div className="mc-grass" />
                            <div className="p-4 sm:p-6">
                                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                    {/* Team Info */}
                                    <div className="flex min-w-0 items-center gap-4">
                                        {teamData.teamLogo ? (
                                            <img
                                                src={teamData.teamLogo}
                                                alt="Team Logo"
                                                className="mc-logo-sq"
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
                                            <span className={`mc-badge ${statusTone(teamData.registrationStatus)}`}>
                                                Team: {teamData.registrationStatus}
                                            </span>
                                            <span className={`mc-badge ${statusTone(teamData.paymentStatus)}`}>
                                                Payment: {teamData.paymentStatus}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {teamData.registrationStatus !== "Pending" &&
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
                                                )}
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
                                            src="/beestack_text_logo.png"
                                            alt="BeeStack"
                                            className="h-4 w-auto md:h-5"
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
                                title="Project Abstract"
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
                                    <textarea
                                        name="abstract"
                                        value={teamData.abstract}
                                        onChange={handleInputChange}
                                        rows="6"
                                        className="mc-input"
                                    />
                                ) : (
                                    <p className="mc-value mc-scroll max-h-72 overflow-auto whitespace-pre-wrap">
                                        {teamData.abstract}
                                    </p>
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