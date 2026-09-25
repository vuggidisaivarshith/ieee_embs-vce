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
      {/* Outer fluid trailing aura ring — original teal (#008C95) at rest, cyan (#00B8D9) on hover */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 -ml-6 -mt-6 rounded-full pointer-events-none will-change-transform transition-[width,height,background-color,border-color,opacity,box-shadow] duration-200"
        style={{
          width: isHovering ? (hoverLabel ? "64px" : "52px") : "36px",
          height: isHovering ? (hoverLabel ? "64px" : "52px") : "36px",
          backgroundColor: isHovering
            ? "rgba(0, 184, 217, 0.12)"          /* cyan fill on hover */
            : "rgba(0, 140, 149, 0.08)",          /* teal fill at rest */
          border: isHovering
            ? "1.5px solid rgba(0, 184, 217, 0.65)"   /* cyan ring on hover */
            : "1px solid rgba(0, 140, 149, 0.35)",    /* teal ring at rest */
          boxShadow: isHovering
            ? "0 0 20px rgba(0, 184, 217, 0.40), inset 0 0 8px rgba(0, 184, 217, 0.12)"
            : "0 0 10px rgba(0, 140, 149, 0.15), inset 0 0 4px rgba(0, 140, 149, 0.06)",
          backdropFilter: "blur(1px)",
          transform: "translate3d(-100px, -100px, 0)"
        }}
      >
        {hoverLabel && (
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold uppercase tracking-wider animate-fade-in"
            style={{ color: "#00B8D9" }}>
            {hoverLabel}
          </span>
        )}
      </div>

      {/* Center dot & inner glow halo — RESTORED PREVIOUS ORIGINAL TEAL/CYAN COLOURS (#00B8D9 / #008C95) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full pointer-events-none will-change-transform transition-[transform,background-color,opacity,box-shadow] duration-75"
        style={{
          backgroundColor: isHovering ? "#00B8D9" : "#008C95",
          transform: `translate3d(-100px, -100px, 0) scale(${isPressed ? 0.6 : isHovering ? 1.5 : 1})`,
          boxShadow: isHovering
            ? "0 0 14px #00B8D9, 0 0 24px rgba(0, 184, 217, 0.80), 0 0 2px #ffffff"
            : "0 0 10px #087F8C, 0 0 16px rgba(8, 127, 140, 0.70), 0 0 2px #ffffff",
          border: "1px solid rgba(255, 255, 255, 0.9)"
        }}
      />
    </div>
  );
}
