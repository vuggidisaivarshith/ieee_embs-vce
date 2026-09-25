import { useRef, useEffect } from "react";

/**
 * useMousePosition — returns a STABLE ref object (not state) so consumers
 * can READ the latest mouse position without causing React re-renders.
 * Use mouse.current.x / .y / .nX / .nY.
 *
 * For components that DO need reactive re-renders, they should manage their
 * own local state and subscribe selectively.
 */
export default function useMousePosition() {
  const position = useRef({ x: null, y: null, nX: 0, nY: 0 });

  useEffect(() => {
    const isPointer = window.matchMedia("(pointer: fine)").matches;
    if (!isPointer) return;

    const update = (ev) => {
      position.current = {
        x: ev.clientX,
        y: ev.clientY,
        nX: (ev.clientX / window.innerWidth  - 0.5) * 2,
        nY: (ev.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("mousemove", update, { passive: true });
    return () => window.removeEventListener("mousemove", update);
  }, []);

  return position; // stable ref — no re-render on move
}
