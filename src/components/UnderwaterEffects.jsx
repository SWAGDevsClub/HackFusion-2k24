import React, { useState, useEffect } from 'react';

/**
 * UnderwaterEffects — Pure React + Tailwind
 * Floating plankton particles + rising bubbles, all CSS-animated divs.
 * No Canvas API, no external dependencies.
 */

// Generate random particles on mount
function generatePlankton(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `p-${i}`,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 18 + 14,
    delay: Math.random() * -20,
    driftX: (Math.random() - 0.5) * 30,
    opacity: Math.random() * 0.4 + 0.2,
    warm: Math.random() > 0.65, // golden tint if in "sun" zone
  }));
}

function generateBubbles(count) {
  return Array.from({ length: count }, (_, i) => {
    // Kelp zones: left 5-22% or right 78-95%
    const isKelp = Math.random() < 0.45;
    let left;
    if (isKelp) {
      left = Math.random() < 0.55
        ? 4 + Math.random() * 18
        : 78 + Math.random() * 17;
    } else {
      left = Math.random() * 100;
    }
    return {
      id: `b-${i}`,
      left,
      size: Math.random() * 5 + 3,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * -15,
      wobble: Math.random() * 15 + 5,
      opacity: Math.random() * 0.5 + 0.35,
    };
  });
}

export const UnderwaterEffects = () => {
  const [plankton] = useState(() => generatePlankton(30));
  const [bubbles] = useState(() => generateBubbles(24));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {/* CSS keyframes injected once */}
      <style>{`
        @keyframes uw-float-up {
          0% { transform: translateY(105vh) translateX(0px); opacity: 0; }
          10% { opacity: var(--uw-opacity); }
          90% { opacity: var(--uw-opacity); }
          100% { transform: translateY(-10vh) translateX(var(--uw-drift)); opacity: 0; }
        }
        @keyframes uw-rise {
          0% { transform: translateY(105vh) translateX(0px); opacity: 0; }
          5% { opacity: var(--uw-opacity); }
          95% { opacity: var(--uw-opacity); }
          100% { transform: translateY(-10vh) translateX(0px); opacity: 0; }
        }
        @keyframes uw-wobble {
          0%, 100% { transform: translateX(0px); }
          25% { transform: translateX(var(--uw-wobble)); }
          75% { transform: translateX(calc(var(--uw-wobble) * -1)); }
        }
        @keyframes uw-pulse {
          0%, 100% { opacity: var(--uw-opacity); }
          50% { opacity: calc(var(--uw-opacity) * 0.5); }
        }
      `}</style>

      {/* Plankton particles */}
      {plankton.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.warm
              ? `rgba(255, 220, 180, ${p.opacity})`
              : `rgba(140, 240, 255, ${p.opacity})`,
            '--uw-opacity': p.opacity,
            '--uw-drift': `${p.driftX}px`,
            animation: `uw-float-up ${p.duration}s linear ${p.delay}s infinite, uw-pulse ${4 + Math.random() * 3}s ease-in-out ${p.delay}s infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Rising bubbles */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.left}%`,
            '--uw-opacity': b.opacity,
            '--uw-wobble': `${b.wobble}px`,
            animation: `uw-rise ${b.duration}s linear ${b.delay}s infinite`,
            willChange: 'transform, opacity',
          }}
        >
          {/* Bubble body */}
          <div
            className="rounded-full border"
            style={{
              width: b.size,
              height: b.size,
              backgroundColor: `rgba(130, 225, 255, ${b.opacity * 0.2})`,
              borderColor: `rgba(190, 245, 255, ${b.opacity * 0.7})`,
              animation: `uw-wobble ${3 + Math.random() * 2}s ease-in-out ${b.delay}s infinite`,
              willChange: 'transform',
            }}
          >
            {/* Specular glint */}
            <div
              className="absolute rounded-full bg-white"
              style={{
                width: Math.max(1, b.size * 0.28),
                height: Math.max(1, b.size * 0.28),
                top: b.size * 0.15,
                left: b.size * 0.18,
                opacity: b.opacity * 0.85,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnderwaterEffects;
