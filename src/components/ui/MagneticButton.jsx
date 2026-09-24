import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.28,
  as = "button",
  to,
  href,
  glare = true,
  ...props
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e) => {
    if (reducedMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    setPosition({ x, y });

    if (glare) {
      setGlarePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
        opacity: 0.25
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setGlarePos((p) => ({ ...p, opacity: 0 }));
    setIsPressed(false);
  };

  let Component = as;
  let elementProps = { ...props };
  if (to) {
    Component = Link;
    elementProps.to = to;
  } else if (href) {
    Component = "a";
    elementProps.href = href;
  }

  return (
    <Component
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isPressed ? 0.96 : 1})`,
        transition:
          position.x === 0 && position.y === 0
            ? "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            : "transform 0.08s ease-out"
      }}
      className={`relative inline-flex items-center justify-center transform-gpu will-change-transform overflow-hidden ${className}`}
      {...elementProps}
    >
      {glare && (
        <span
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.45) 0%, transparent 65%)`
          }}
        />
      )}
      {children}
    </Component>
  );
}
