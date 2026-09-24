import React, { useRef, useEffect, useState } from "react";
import { Activity, Heart, Zap } from "lucide-react";

export default function InteractiveBioSignal() {
  const canvasRef = useRef(null);
  const [bpm, setBpm] = useState(72);
  const [mode, setMode] = useState("normal");
  const [pulseActive, setPulseActive] = useState(false);

  const phaseRef = useRef(0);
  const dataPointsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    const width = (canvas.width = canvas.offsetWidth * 2);
    const height = (canvas.height = canvas.offsetHeight * 2);

    const pointsCount = Math.floor(width / 4);
    if (dataPointsRef.current.length === 0) {
      dataPointsRef.current = new Array(pointsCount).fill(height / 2);
    }

    const ecgSignal = (p) => {
      const cycle = p % 1;
      const base = height / 2;

      // P wave
      if (cycle > 0.1 && cycle < 0.2) {
        return base - Math.sin((cycle - 0.1) * Math.PI * 10) * (height * 0.08);
      }
      // Q dip
      if (cycle >= 0.22 && cycle < 0.26) {
        return base + (height * 0.06);
      }
      // R peak (sharp spike)
      if (cycle >= 0.26 && cycle < 0.32) {
        const t = (cycle - 0.26) / 0.06;
        return base - Math.sin(t * Math.PI) * (height * 0.42);
      }
      // S dip
      if (cycle >= 0.32 && cycle < 0.36) {
        return base + (height * 0.12);
      }
      // T wave
      if (cycle > 0.45 && cycle < 0.65) {
        return base - Math.sin((cycle - 0.45) * Math.PI * 5) * (height * 0.14);
      }
      // Baseline micro-noise
      return base + (Math.random() - 0.5) * 1.5;
    };

    const render = () => {
      const speed = (bpm / 60) * 0.008;
      phaseRef.current += speed;

      const currentCycle = phaseRef.current % 1;
      if (currentCycle >= 0.28 && currentCycle <= 0.32) {
        setPulseActive(true);
      } else {
        setPulseActive(false);
      }

      let newY = ecgSignal(phaseRef.current);
      if (mode === "arrhythmia" && Math.random() < 0.04) {
        newY += (Math.random() - 0.5) * (height * 0.3);
      }

      dataPointsRef.current.push(newY);
      if (dataPointsRef.current.length > pointsCount) {
        dataPointsRef.current.shift();
      }

      ctx.clearRect(0, 0, width, height);

      // Grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 98, 155, 0.07)";
      const gridSize = 28;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Signal Trace
      ctx.beginPath();
      const len = dataPointsRef.current.length;
      for (let i = 0; i < len; i++) {
        const x = (i / (len - 1)) * width;
        const y = dataPointsRef.current[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "#00629B";
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.shadowColor = "#12A8C4";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Lead cursor
      if (len > 0) {
        const lastX = width;
        const lastY = dataPointsRef.current[len - 1];
        ctx.beginPath();
        ctx.arc(lastX - 2, lastY, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#12A8C4";
        ctx.shadowColor = "#12A8C4";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [bpm, mode]);

  const handleModeChange = (newMode, newBpm) => {
    setMode(newMode);
    setBpm(newBpm);
  };

  const handleCanvasClick = () => {
    if (dataPointsRef.current.length > 0) {
      dataPointsRef.current[dataPointsRef.current.length - 1] -= 55;
    }
  };

  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Heart
              className={`w-4 h-4 transition-transform duration-100 ${
                pulseActive ? "text-[#D84A5A] scale-125" : "text-[#00629B] scale-100"
              }`}
            />
            {pulseActive && (
              <span className="absolute -inset-1 rounded-full bg-[#D84A5A]/30 animate-ping pointer-events-none" />
            )}
          </div>
          <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#00629B]">
            Live Bio-Telemetry
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="text-[#102A43] font-bold">{bpm} <span className="text-[#52606D] font-normal">BPM</span></span>
          <span className="flex items-center gap-1 text-[#238B68]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#238B68] animate-pulse" /> QRS OK
          </span>
        </div>
      </div>

      <div
        onClick={handleCanvasClick}
        title="Click waveform to inject pacing spike"
        className="w-full h-36 rounded-xl relative overflow-hidden cursor-crosshair border border-slate-200/80 shadow-inner group"
        style={{
          background: "linear-gradient(180deg, rgba(240, 247, 251, 0.7) 0%, rgba(255, 255, 255, 0.95) 100%)",
          backdropFilter: "blur(12px)"
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute top-2 right-2 text-[9px] font-mono text-[#52606D] opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none">
          Click to stimulate
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {[
          { id: "normal", label: "Normal Sinus", bpm: 72 },
          { id: "tachy", label: "Tachycardia", bpm: 115 },
          { id: "brady", label: "Bradycardia", bpm: 48 },
          { id: "arrhythmia", label: "Arrhythmia", bpm: 84 },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleModeChange(item.id, item.bpm)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all ${
              mode === item.id
                ? "bg-[#00629B] text-white shadow-sm"
                : "bg-black/[0.03] text-[#52606D] hover:text-[#102A43] hover:bg-black/[0.06] border border-black/5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
