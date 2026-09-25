import React, { useEffect, useRef } from "react";

export default function InteractiveMeshCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;
    const isPointer = window.matchMedia("(pointer: fine)").matches;
    // On touch-only devices skip the canvas entirely
    if (!isPointer) return;

    let animId;
    let paused = false;
    let width  = (canvas.width  = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -2000, y: -2000, radius: 120 };

    // Fewer particles = smoother on all hardware
    const particleCount = Math.min(Math.floor((width * height) / 28000), 45);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * width;
        this.y  = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.r  = Math.random() * 1.4 + 0.8;
        this.baseAlpha = Math.random() * 0.25 + 0.10;
        this.colorType = Math.random();
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width)  this.vx *= -1;
        if (this.y < 0 || this.y > height)  this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist2 = dx * dx + dy * dy;
        const rr = mouse.radius * mouse.radius;
        if (dist2 < rr) {
          const dist  = Math.sqrt(dist2);
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 0.65;
          this.y += Math.sin(angle) * force * 0.65;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        // Original palette: teal (#008C95), cyan (#00B8D9), blue (#0066CC)
        const color = this.colorType > 0.65
          ? `rgba(0,184,217,${this.baseAlpha})`
          : this.colorType > 0.35
            ? `rgba(0,102,204,${this.baseAlpha})`
            : `rgba(0,140,149,${this.baseAlpha})`;
        ctx.fillStyle = color;
        // NO shadowBlur — it's very expensive on canvas
        ctx.fill();
      }
    }

    const particles = Array.from({ length: particleCount }, () => new Particle());
    const MAX_DIST  = 110;
    const MAX_DIST2 = MAX_DIST * MAX_DIST;

    function connect() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx    = particles[i].x - particles[j].x;
          const dy    = particles[i].y - particles[j].y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < MAX_DIST2) {
            const dist  = Math.sqrt(dist2);
            const alpha = (1 - dist / MAX_DIST) * 0.13;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,140,149,${alpha})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
        // Mouse connection lines
        const mdx   = mouse.x - particles[i].x;
        const mdy   = mouse.y - particles[i].y;
        const mDist2 = mdx * mdx + mdy * mdy;
        if (mDist2 < mouse.radius * mouse.radius) {
          const mDist = Math.sqrt(mDist2);
          const alpha = (1 - mDist / mouse.radius) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0,184,217,${alpha})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width  = canvas.width  = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    // Pause animation when tab is hidden
    const onVisibilityChange = () => { paused = document.hidden; };

    window.addEventListener("resize",    onResize,     { passive: true });
    window.addEventListener("mousemove", onMouseMove,  { passive: true });
    document.addEventListener("mouseleave",       onMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (paused) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) { p.update(); p.draw(); }
      connect();
    };
    animate();

    return () => {
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave",       onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.35, willChange: "auto" }}
      aria-hidden="true"
    />
  );
}
