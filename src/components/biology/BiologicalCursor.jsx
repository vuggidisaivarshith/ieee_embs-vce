import React, { useEffect, useState, useRef } from 'react';

/**
 * BiologicalCursor.jsx
 * Organic fluid disturbance cursor overlay.
 * Renders a subtle bioluminescent microscopic focus reticle and fluid wake trail.
 */
export default function BiologicalCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const trailRef = useRef([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let lastX = -100;
    let lastY = -100;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setActive(true);
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseLeave = () => {
      setActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion || !active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden transition-opacity duration-300">
      {/* Bioluminescent Micro-Reticle */}
      <div 
        className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full border border-sky-400/30 bg-sky-500/5 backdrop-blur-[1px] transition-transform duration-75 ease-out shadow-[0_0_15px_rgba(56,189,248,0.2)]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      >
        <div className="absolute inset-1.5 rounded-full border border-pink-500/20"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 -ml-0.5 -mt-0.5 rounded-full bg-sky-300"></div>
      </div>
    </div>
  );
}
