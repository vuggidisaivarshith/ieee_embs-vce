import { useState, useEffect } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null, nX: 0, nY: 0 });

  useEffect(() => {
    // Only track on fine pointer (desktop mouse/trackpad)
    const isPointer = window.matchMedia("(pointer: fine)").matches;
    if (!isPointer) return;

    const updateMousePosition = (ev) => {
      const nX = (ev.clientX / window.innerWidth - 0.5) * 2;
      const nY = (ev.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x: ev.clientX, y: ev.clientY, nX, nY });
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}
