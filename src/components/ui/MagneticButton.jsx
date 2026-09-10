import React, { useRef, useState, useEffect } from 'react';

/**
 * MagneticButton.jsx
 * Tactile magnetic pull micro-interaction for primary CTAs.
 * Features REST -> HOVER -> PRESS -> RELEASE physics states.
 */
export default function MagneticButton({ 
  children, 
  className = "", 
  onClick, 
  strength = 0.25, 
  as = 'button',
  ...props 
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (reducedMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsPressed(false);
  };

  const Component = as;

  return (
    <Component
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isPressed ? 0.97 : 1})`,
        transition: position.x === 0 && position.y === 0 
          ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
          : 'transform 0.1s ease-out'
      }}
      className={`relative inline-flex items-center justify-center transform-gpu will-change-transform active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}