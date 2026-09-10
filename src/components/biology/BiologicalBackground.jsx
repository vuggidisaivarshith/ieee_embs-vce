import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RBCSimulation } from './RBCSimulation';
import { WBCSimulation } from './WBCSimulation';
import { PlateletSimulation } from './PlateletSimulation';
import { VesselEnvironment } from './VesselEnvironment';
import { CellMatrixSimulation } from './CellMatrixSimulation';
import { BioSignalSimulation } from './BioSignalSimulation';

export default function BiologicalBackground() {
  const canvasRef = useRef(null);
  const location = useLocation();
  const [reducedMotion, setReducedMotion] = useState(false);
  const animFrameId = useRef(null);

  // Simulation instances
  const rbcSim = useRef(null);
  const wbcSim = useRef(null);
  const plateletSim = useRef(null);
  const vesselEnv = useRef(null);
  const cellMatrixSim = useRef(null);
  const bioSignalSim = useRef(null);

  // Mouse state
  const mouseState = useRef({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
    active: false
  });

  // Check accessibility reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth < 768;

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (rbcSim.current) rbcSim.current.resize(canvas.width, canvas.height);
      if (cellMatrixSim.current) cellMatrixSim.current.init();
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Instantiate simulations based on device capacity
    rbcSim.current = new RBCSimulation(canvas, { count: isMobile ? 14 : 26 });
    wbcSim.current = new WBCSimulation(canvas, { count: isMobile ? 1 : 2 });
    plateletSim.current = new PlateletSimulation(canvas, { count: isMobile ? 16 : 30 });
    vesselEnv.current = new VesselEnvironment(canvas);
    cellMatrixSim.current = new CellMatrixSimulation(canvas);
    bioSignalSim.current = new BioSignalSimulation(canvas);

    // Mouse velocity tracker
    const handleMouseMove = (e) => {
      const ms = mouseState.current;
      ms.vx = (e.clientX - ms.prevX) * 0.5;
      ms.vy = (e.clientY - ms.prevY) * 0.5;
      ms.x = e.clientX;
      ms.y = e.clientY;
      ms.prevX = e.clientX;
      ms.prevY = e.clientY;
      ms.active = true;

      // Broadcast to active simulations
      if (rbcSim.current) rbcSim.current.setMouse(ms.x, ms.y, ms.vx, ms.vy, true);
      if (wbcSim.current) wbcSim.current.setMouse(ms.x, ms.y, ms.vx, ms.vy, true);
      if (plateletSim.current) plateletSim.current.setMouse(ms.x, ms.y, true);
      if (cellMatrixSim.current) cellMatrixSim.current.setMouse(ms.x, ms.y, true);
    };

    const handleMouseLeave = () => {
      mouseState.current.active = false;
      if (rbcSim.current) rbcSim.current.setMouse(-1000, -1000, 0, 0, false);
      if (wbcSim.current) wbcSim.current.setMouse(-1000, -1000, 0, 0, false);
      if (plateletSim.current) plateletSim.current.setMouse(-1000, -1000, false);
      if (cellMatrixSim.current) cellMatrixSim.current.setMouse(-1000, -1000, false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Main 60 FPS Render Loop
    let scrollY = window.scrollY || 0;
    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const path = location.pathname;

      // 1. Home Page: Full Bloodstream Intravascular Lumen
      if (path === '/') {
        if (vesselEnv.current) {
          vesselEnv.current.update(scrollY);
          vesselEnv.current.draw();
        }
        if (plateletSim.current) {
          plateletSim.current.update();
          plateletSim.current.draw();
        }
        if (rbcSim.current) {
          rbcSim.current.update(scrollY);
          rbcSim.current.draw();
        }
        if (wbcSim.current) {
          wbcSim.current.update();
          wbcSim.current.draw();
        }
      } 
      // 2. About & Team: Cellular Tissue Histology Matrix
      else if (path === '/about' || path === '/team') {
        if (cellMatrixSim.current) {
          cellMatrixSim.current.update();
          cellMatrixSim.current.draw();
        }
        if (wbcSim.current) {
          wbcSim.current.update();
          wbcSim.current.draw();
        }
      }
      // 3. Events & Research: Clinical Bio-Signal Diagnostics & Waveforms
      else if (path.startsWith('/events')) {
        if (bioSignalSim.current) {
          bioSignalSim.current.update();
          bioSignalSim.current.draw();
        }
        if (rbcSim.current) {
          rbcSim.current.update(scrollY);
          rbcSim.current.draw();
        }
      }
      // 4. Contact, Membership, Gallery, Resources: Minimal Plasma Fluid
      else {
        if (vesselEnv.current) {
          vesselEnv.current.update(scrollY);
          vesselEnv.current.draw();
        }
        if (plateletSim.current) {
          plateletSim.current.update();
          plateletSim.current.draw();
        }
        if (rbcSim.current) {
          rbcSim.current.update(scrollY);
          rbcSim.current.draw();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [location.pathname, reducedMotion]);

  if (reducedMotion) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-b from-slate-950 via-[#070B14] to-slate-950" 
        aria-hidden="true" 
      />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85 dark:opacity-95"
      />
      {/* Subtle Vignette & Specular Bioluminescent Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/5 via-transparent to-slate-950/40 pointer-events-none"></div>
    </div>
  );
}
