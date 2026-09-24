import React, { useState, useEffect } from "react";
import { Play, Pause, AlertTriangle, RefreshCw, Radio, Crosshair, Battery, Activity } from "lucide-react";
import { motion } from "framer-motion";

const GRID_SIZE = 8;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const INITIAL_ROBOTS = [
  { id: "drone", name: "Drone-Alpha", symbol: "D", color: "#00B8D9", x: 1, y: 1, battery: 94, role: "Aerial Recon" },
  { id: "rover", name: "Rover-Beta", symbol: "R", color: "#00629B", x: 6, y: 1, battery: 88, role: "Heavy Rover" },
  { id: "scout", name: "Scout-Gamma", symbol: "S", color: "#E76F51", x: 1, y: 6, battery: 82, role: "Fast Probe" },
  { id: "relay", name: "Relay-Delta", symbol: "R", color: "#772583", x: 6, y: 6, battery: 91, role: "Comms Anchor" },
];

const INITIAL_HAZARDS = new Set(["2,2", "3,2", "4,5", "5,5", "2,6"]);
const INITIAL_SURVIVORS = new Set(["3,4", "5,3"]);

export default function SwarmSimulationArena({ compact = false }) {
  const [robots, setRobots] = useState(INITIAL_ROBOTS);
  const [explored, setExplored] = useState(new Set(["1,1", "6,1", "1,6", "6,6", "0,1", "1,0", "6,2", "7,1"]));
  const [hazards, setHazards] = useState(INITIAL_HAZARDS);
  const [survivors, setSurvivors] = useState(INITIAL_SURVIVORS);
  const [rescued, setRescued] = useState(new Set());
  const [isRunning, setIsRunning] = useState(true);
  const [stepCount, setStepCount] = useState(0);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [logs, setLogs] = useState([
    "Initialization: 4 autonomous swarm nodes deployed across 8x8 disaster zone.",
    "Drone-Alpha telemetry link established (94% batt).",
    "Rover-Beta calculating primary path around sector (2,2) debris."
  ]);

  const addLog = (msg) => {
    setLogs((prev) => [msg, ...prev.slice(0, 7)]);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setStepCount((s) => s + 1);

      setRobots((prevRobots) => {
        const nextRobots = prevRobots.map((robot) => {
          const moves = [
            { x: robot.x + 1, y: robot.y },
            { x: robot.x - 1, y: robot.y },
            { x: robot.x, y: robot.y + 1 },
            { x: robot.x, y: robot.y - 1 },
          ].filter(
            (pos) =>
              pos.x >= 0 &&
              pos.x < GRID_SIZE &&
              pos.y >= 0 &&
              pos.y < GRID_SIZE &&
              !hazards.has(`${pos.x},${pos.y}`)
          );

          if (moves.length === 0) return robot;

          const scoredMoves = moves.map((pos) => {
            const key = `${pos.x},${pos.y}`;
            let score = Math.random();
            if (survivors.has(key) && !rescued.has(key)) score += 10;
            if (!explored.has(key)) score += 3;
            return { pos, score };
          });

          scoredMoves.sort((a, b) => b.score - a.score);
          const chosen = scoredMoves[0].pos;

          const newBattery = Math.max(10, robot.battery - (Math.random() > 0.6 ? 1 : 0));

          return { ...robot, x: chosen.x, y: chosen.y, battery: newBattery };
        });

        setExplored((prevExplored) => {
          const nextExplored = new Set(prevExplored);
          nextRobots.forEach((r) => {
            const key = `${r.x},${r.y}`;
            nextExplored.add(key);

            if (survivors.has(key) && !rescued.has(key)) {
              setRescued((prev) => new Set(prev).add(key));
              addLog(`✦ Survivor detected at (${r.x},${r.y}) by ${r.name}! Swarm dynamic replan triggered.`);
            }
          });
          return nextExplored;
        });

        return nextRobots;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [isRunning, hazards, survivors, rescued, explored]);

  const handleSimulateShift = () => {
    const newHazards = new Set(hazards);
    const added = [];
    while (added.length < 3) {
      const rx = Math.floor(Math.random() * GRID_SIZE);
      const ry = Math.floor(Math.random() * GRID_SIZE);
      const key = `${rx},${ry}`;
      const hasRobot = robots.some((r) => r.x === rx && r.y === ry);
      if (!newHazards.has(key) && !hasRobot) {
        newHazards.add(key);
        added.push(`(${rx},${ry})`);
      }
    }
    setHazards(newHazards);
    addLog(`⚠ SEISMIC SHIFT INJECTED: New debris collapsed at ${added.join(", ")}. Swarm recalculating heuristics.`);
  };

  const handleCellClick = (x, y) => {
    const key = `${x},${y}`;
    if (hazards.has(key)) {
      const nextH = new Set(hazards);
      nextH.delete(key);
      setHazards(nextH);
      addLog(`User clear: Debris removed at (${x},${y}).`);
    } else if (survivors.has(key)) {
      const nextS = new Set(survivors);
      nextS.delete(key);
      setSurvivors(nextS);
      addLog(`User action: Survivor marker removed at (${x},${y}).`);
    } else {
      const nextS = new Set(survivors);
      nextS.add(key);
      setSurvivors(nextS);
      addLog(`User target: Survivor ping placed at (${x},${y}). Swarm reprioritizing vector.`);
    }
  };

  const handleReset = () => {
    setRobots(INITIAL_ROBOTS);
    setExplored(new Set(["1,1", "6,1", "1,6", "6,6"]));
    setHazards(INITIAL_HAZARDS);
    setSurvivors(INITIAL_SURVIVORS);
    setRescued(new Set());
    setStepCount(0);
    addLog("Arena reset: Initial deployment parameters restored.");
  };

  const coveragePercent = Math.min(100, Math.round((explored.size / TOTAL_CELLS) * 100));

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 space-y-6 transition-all"
      style={{
        background: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        boxShadow: "0 20px 50px -10px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)"
      }}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/8 pb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(0, 98, 155, 0.10)",
              border: "1px solid rgba(0, 98, 155, 0.25)",
              boxShadow: "0 0 16px rgba(0, 98, 155, 0.15)"
            }}
          >
            <Radio className="w-5 h-5 animate-pulse text-[#00629B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-[#102A43]" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>
                Problem 5 Flagship Arena
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#00629B]/10 text-[#00629B] border border-[#00629B]/25">
                Swarm Telemetry
              </span>
            </div>
            <p className="text-xs text-[#52606D]">
              Multi-Robot Disaster Zone Exploration &amp; Dynamic Heuristic Replanning
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#102A43] border transition-all flex items-center gap-1.5 shadow-sm"
            style={{
              background: isRunning ? "rgba(255,255,255,0.85)" : "rgba(0, 98, 155, 0.15)",
              borderColor: isRunning ? "rgba(0,0,0,0.1)" : "#00629B"
            }}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5 text-[#00629B]" /> : <Play className="w-3.5 h-3.5 text-[#00629B]" />}
            <span>{isRunning ? "Pause" : "Resume"}</span>
          </button>

          <button
            onClick={handleSimulateShift}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#E76F51] border border-[#E76F51]/30 transition-all flex items-center gap-1.5 hover:bg-[#E76F51]/10 shadow-sm"
            style={{ background: "rgba(231, 111, 81, 0.08)" }}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Simulate Shift (Debris Collapse)</span>
          </button>

          <button
            onClick={handleReset}
            title="Reset Arena"
            className="p-2 rounded-xl text-[#52606D] hover:text-[#102A43] border border-black/8 hover:border-black/16 transition-all shadow-sm"
            style={{ background: "rgba(255,255,255,0.8)" }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Arena Content: 8x8 Grid + Telemetry Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 8x8 Grid */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            className="p-3.5 rounded-2xl border border-black/8 shadow-inner w-full max-w-[420px] aspect-square grid grid-cols-8 gap-1.5 relative select-none"
            style={{ background: "rgba(240, 247, 251, 0.85)" }}
          >
            {Array.from({ length: TOTAL_CELLS }).map((_, idx) => {
              const x = idx % GRID_SIZE;
              const y = Math.floor(idx / GRID_SIZE);
              const key = `${x},${y}`;

              const isHazard = hazards.has(key);
              const isSurvivor = survivors.has(key);
              const isRescued = rescued.has(key);
              const isCellExplored = explored.has(key);
              const robotHere = robots.find((r) => r.x === x && r.y === y);

              return (
                <div
                  key={key}
                  onClick={() => handleCellClick(x, y)}
                  onMouseEnter={() => setHoveredCell({ x, y, isHazard, isSurvivor, isCellExplored })}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`rounded-lg transition-all duration-300 relative flex items-center justify-center cursor-pointer text-[10px] font-mono border ${
                    robotHere
                      ? "border-black/20 shadow-md"
                      : isHazard
                      ? "bg-red-50 border-red-300 text-red-600 shadow-sm"
                      : isSurvivor
                      ? isRescued
                        ? "bg-emerald-50 border-emerald-400 text-emerald-600"
                        : "bg-[#00B8D9]/20 border-[#00B8D9] text-[#00B8D9] animate-pulse"
                      : isCellExplored
                      ? "bg-[#00629B]/10 border-[#00629B]/25"
                      : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                  style={{
                    backgroundColor: robotHere ? `${robotHere.color}25` : undefined,
                    borderColor: robotHere ? robotHere.color : undefined
                  }}
                >
                  {/* Robot Indicator */}
                  {robotHere && (
                    <motion.div
                      layoutId={robotHere.id}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-md"
                      style={{
                        backgroundColor: robotHere.color,
                        boxShadow: `0 0 10px ${robotHere.color}`
                      }}
                      title={`${robotHere.name} (${robotHere.battery}% batt)`}
                    >
                      {robotHere.symbol}
                    </motion.div>
                  )}

                  {/* Hazard Mark */}
                  {!robotHere && isHazard && (
                    <span className="text-red-500 font-black text-xs">✕</span>
                  )}

                  {/* Survivor Ping */}
                  {!robotHere && !isHazard && isSurvivor && (
                    <Crosshair className="w-3.5 h-3.5 text-[#00B8D9]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#52606D]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#00629B]/15 border border-[#00629B]" /> Explored
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-red-100 border border-red-400" /> Hazard Zone
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#00B8D9]/30 border border-[#00B8D9]" /> Survivor Ping
            </span>
            <span className="text-[10px] text-[#52606D]/70 italic">Click cell to toggle</span>
          </div>
        </div>

        {/* Right: Real-time Telemetry Dashboard */}
        <div className="lg:col-span-5 space-y-4">
          {/* Coverage Metric */}
          <div className="p-4 rounded-2xl bg-white/80 border border-black/8 space-y-2 shadow-sm">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#52606D]">Disaster Zone Coverage</span>
              <span className="text-[#00629B] font-bold">
                {coveragePercent}% ({explored.size}/{TOTAL_CELLS})
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${coveragePercent}%`,
                  background: "linear-gradient(90deg, #00629B 0%, #12A8C4 100%)",
                  boxShadow: "0 0 10px rgba(0, 98, 155, 0.4)"
                }}
              />
            </div>
          </div>

          {/* Node Health Cards */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#52606D]">
              <span>Swarm Node Telemetry</span>
              <span>Step: {stepCount}</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {robots.map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded-xl bg-white/80 border border-black/8 flex items-center justify-between transition-all hover:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: r.color, boxShadow: `0 0 6px ${r.color}` }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#102A43] truncate max-w-[85px]">{r.name}</p>
                      <p className="text-[9px] text-[#52606D] font-mono">({r.x},{r.y})</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#00629B]">
                    <Battery className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{r.battery}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Swarm Event Log */}
          <div className="p-4 rounded-2xl bg-white/80 border border-black/8 text-xs font-mono space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#52606D]">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#00629B]" /> Live Event Stream
              </span>
              <span className="text-[9px] text-emerald-600">● SYNCED</span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-[11px] leading-relaxed">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`truncate ${
                    log.includes("⚠")
                      ? "text-[#E76F51] font-semibold"
                      : log.includes("✦")
                      ? "text-[#00629B] font-bold"
                      : "text-[#52606D]"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
