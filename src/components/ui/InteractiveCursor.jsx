import React, { useEffect, useState, useRef } from "react";

export default function InteractiveCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("");

  const mousePos = useRef({ x: -100, y: -100 });
  const auraPos = useRef({ x: -100, y: -100 });
  const auraRef = useRef(null);
  const dotRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    const isPointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isPointer || isReduced) return;

    setEnabled(true);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check card spotlight & interactive elements
      const target = e.target;
      if (target) {
        const card = target.closest?.(".glass-card, .glass-card-strong, .glass-dark, [data-card-spotlight]");
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        }

        const interactive = target.closest("a, button, input, textarea, select, [role='button'], .glass-card, .interactive");
        if (interactive) {
          setIsHovering(true);
          const customLabel = interactive.getAttribute("data-cursor-label");
          setHoverLabel(customLabel || "");
        } else {
          setIsHovering(false);
          setHoverLabel("");
        }
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => {
      mousePos.current = { x: -100, y: -100 };
      setIsHovering(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      auraPos.current.x += (mousePos.current.x - auraPos.current.x) * 0.18;
      auraPos.current.y += (mousePos.current.y - auraPos.current.y) * 0.18;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Outer fluid aura — green ring */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 -ml-5 -mt-5 rounded-full pointer-events-none will-change-transform transition-[width,height,background-color,border-color,opacity] duration-200"
        style={{
          width: isHovering ? (hoverLabel ? "60px" : "48px") : "30px",
          height: isHovering ? (hoverLabel ? "60px" : "48px") : "30px",
          backgroundColor: isHovering
            ? "rgba(239, 68, 68, 0.14)"       /* light red fill on hover */
            : "rgba(34, 197, 94, 0.10)",       /* soft green fill at rest */
          border: isHovering
            ? "1.8px solid rgba(239, 68, 68, 0.75)"   /* red ring on hover */
            : "1.5px solid rgba(34, 197, 94, 0.60)",  /* green ring at rest */
          boxShadow: isHovering
            ? "0 0 22px rgba(239, 68, 68, 0.45), inset 0 0 10px rgba(239, 68, 68, 0.18)"
            : "0 0 12px rgba(34, 197, 94, 0.30)",
          backdropFilter: isHovering ? "blur(2px)" : "none",
          transform: "translate3d(-100px, -100px, 0)"
        }}
      >
        {hoverLabel && (
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold uppercase tracking-wider animate-fade-in"
            style={{ color: isHovering ? "#ef4444" : "#22c55e" }}>
            {hoverLabel}
          </span>
        )}
      </div>

      {/* Center dot — black resting, light red on hover */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full pointer-events-none will-change-transform transition-[background-color,opacity] duration-75"
        style={{
          backgroundColor: isPressed
            ? "#dc2626"                       /* vivid red when clicked */
            : isHovering
              ? "#ef4444"                     /* light red on hover */
              : "#111111",                    /* near-black at rest */
          transform: `translate3d(-100px, -100px, 0) scale(${isPressed ? 0.5 : isHovering ? 1.5 : 1})`,
          boxShadow: isHovering
            ? "0 0 10px rgba(239, 68, 68, 0.90)"
            : "0 0 6px rgba(17, 17, 17, 0.50)"
        }}
      />
    </div>
  );
}
