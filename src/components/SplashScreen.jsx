import { useEffect, useState } from "react";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";

export default function HackfusionSplash({
  text = "HACKFUSION 4",
  duration = 2000,
  progress: controlled,
  onEnd,
  onComplete,
}) {
  const [auto, setAuto] = useState(0);
  const [visible, setVisible] = useState(false); // fade in
  const [leaving, setLeaving] = useState(false); // fade out
  const isControlled = typeof controlled === "number";
  const value = Math.min(100, Math.max(0, isControlled ? controlled : auto));

  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_HREF}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);

  // fade in
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // progress
  useEffect(() => {
    if (isControlled) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setAuto(eased * 100);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, isControlled]);

  // fade out, then tell the parent
  useEffect(() => {
    if (value < 100) return;
    const pause = setTimeout(() => setLeaving(true), 600); // brief hold on a full bar
    const done = setTimeout(() => {
      (onEnd || onComplete)?.();
    }, 300 + 700); // hold + fade duration
    return () => {
      clearTimeout(pause);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value >= 100]);

  return (
    <div
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      style={{
        ...styles.screen,
        opacity: visible && !leaving ? 1 : 0,
      }}
    >
      <div style={styles.center}>
        <h1 style={styles.title}>{text}</h1>
        <div style={styles.barRow}>
          <div style={styles.barOuter}>
            <div style={{ ...styles.barFill, width: `${value}%` }} />
          </div>
          <span style={styles.percent}>{Math.round(value)}%</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  screen: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "#EF323D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Press Start 2P', monospace",
    color: "#fff",
    transition: "opacity 400ms ease-in-out",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(24px, 5vw, 48px)",
    padding: "0 24px",
    maxWidth: "100%",
    boxSizing: "border-box",
  },
  title: {
    margin: 0,
    fontWeight: 400,
    fontSize: "clamp(20px, 6vw, 56px)",
    letterSpacing: "0.04em",
    lineHeight: 1.2,
    textAlign: "center",
    color: "#fff",
  },
  // bar + percentage side by side
  barRow: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(10px, 2vw, 20px)",
    width: "min(88vw, 640px)",
  },
  // No fixed height here: the fill sets the height, so the bar can never collapse to 0 on small screens
  // (the old clamp(14px, 2.4vw, 22px) minus 4px borders and 3px padding left 0px of fill on phones).
  barOuter: {
    flex: 1,
    minWidth: 0,
    border: "4px solid #fff",
    padding: 3,
    boxSizing: "border-box",
  },
  barFill: {
    height: "clamp(12px, 2vw, 18px)",
    background: "#fff",
  },
  percent: {
    minWidth: "4.2em",
    textAlign: "right",
    fontSize: "clamp(10px, 2.6vw, 18px)",
    fontVariantNumeric: "tabular-nums",
    color: "#fff",
  },
};