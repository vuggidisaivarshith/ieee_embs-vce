import React, { useEffect, useState } from 'react';

/**
 * BiologicalCursor.jsx
 * Organic fluid disturbance cursor overlay.
 * Renders a subtle bioluminescent microscopic focus reticle that responds to interactive elements.
 */
export default function BiologicalCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setActive(true);

      // Check if hovering over interactive element
      const target = e.target;
      if (target) {
        const isInteractive = target.closest('a, button, input, textarea, [role="button"], .interactive-target');
        setIsHoveringInteractive(!!isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setActive(false);
      setIsHoveringInteractive(false);
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
      {/* Bioluminescent Micro-Reticle with Focus Ring Expansion */}
      <div 
        className={`absolute rounded-full border border-sky-400/35 bg-sky-500/5 backdrop-blur-[0.5px] transition-all duration-100 ease-out shadow-[0_0_12px_rgba(0,168,198,0.18)] flex items-center justify-center ${
          isHoveringInteractive 
            ? 'w-10 h-10 -ml-5 -mt-5 border-embs-cyan/60 scale-110' 
            : 'w-6 h-6 -ml-3 -mt-3'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      >
        <div className="w-1 h-1 rounded-full bg-sky-400/90 shadow-sm" />
      </div>
    </div>
  );
}
