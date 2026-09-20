import React, { useState, useEffect } from "react";
import { ExternalLink, Calendar, Clock, MapPin, Trophy, ArrowRight, CheckCircle2, Zap, Shield, Cpu, FileCode } from "lucide-react";
import { motion } from "framer-motion";
import { optiforgeFlyer } from "../assets/images";

/* Palette */
const C = {
  teal:   "#008C95",
  tealDk: "#006E76",
  blue:   "#0066CC",
  blueDk: "#004FA3",
  cyan:   "#00B8D9",
  navy:   "#071A2B",
  navyLt: "#0D2844",
  ice:    "#F2F8FA",
  char:   "#17202A",
};

function useCountdown(target) {
  const calc = () => {
    const d = new Date(target) - new Date();
    if (d <= 0) return { days:0,hours:0,mins:0,secs:0 };
    return { days:Math.floor(d/86400000), hours:Math.floor((d%86400000)/3600000), mins:Math.floor((d%3600000)/60000), secs:Math.floor((d%60000)/1000) };
  };
  const [t,setT] = useState(calc());
  useEffect(() => { const id = setInterval(()=>setT(calc()),1000); return ()=>clearInterval(id); },[]);
  return t;
}

function Tile({value,label,accent}) {
  return (
    <div className="flex flex-col items-center rounded-2xl px-5 py-4 min-w-[76px]"
      style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,0.12)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.1)" }}>
      <span className="text-3xl font-black font-mono tabular-nums" style={{ color: accent || C.cyan }}>{String(value).padStart(2,"0")}</span>
      <span className="text-[10px] font-mono uppercase tracking-widest mt-1" style={{ color:"rgba(255,255,255,0.45)" }}>{label}</span>
    </div>
  );
}

const fadeUp = { hidden:{opacity:0,y:22}, visible:{opacity:1,y:0,transition:{duration:.55,ease:[0.16,1,.3,1]}} };
const stagger = { hidden:{}, visible:{transition:{staggerChildren:.08}} };

const stages = [
  { num:"01", time:"09:00–09:30", title:"Problem Selection & Strategy",   desc:"Teams review all 6 real-world challenges, submit track preferences, and analyze domain formulations.",             tag:"Strategy" },
  { num:"02", time:"09:30–10:00", title:"Starter Code & Test Harness",    desc:"Download official Python starter scripts, offline evaluation harness, and synthetic test datasets.",              tag:"Distribution" },
  { num:"03", time:"10:00–11:15", title:"Attempt 1 — Baseline",           desc:"Implement core heuristic algorithm for the base scenario. Immediate sandboxed auto-score on leaderboard.",        tag:"Scored #1" },
  { num:"04", time:"11:30–12:45", title:"Hidden Shift #1 & Attempt 2",    desc:"Surprise parameter perturbation injected. Adapt code and submit mandatory reflection note.",                     tag:"Scored #2" },
  { num:"05", time:"13:15–14:15", title:"Hidden Shift #2 & Attempt 3",    desc:"Stress edge case injected. Final algorithm refinement for maximum convergence, efficiency, and stability.",        tag:"Scored #3" },
  { num:"06", time:"14:15",       title:"Leaderboard Freeze",              desc:"Public rankings freeze. Teams lock their final submissions before confidential judging rounds begin.",              tag:"Lock" },
  { num:"07", time:"14:30–15:00", title:"The Live Patch Round",            desc:"15–20 minute surprise constraint — ZERO AI ALLOWED. Tests real-time problem-solving agility and mental model.",  tag:"Zero AI", highlight:true },
  { num:"08", time:"15:00–16:00", title:"Judges' Viva Q&A & Results",      desc:"1-on-1 viva defense before domain faculty judges. Defend representations, operators, and shift handling.",         tag:"Expert Jury" },
];

const tracks = [
  { num:"P1", title:"Hospital Resource Allocation",      tag:"Genetic Algorithm",       desc:"Optimize ICU bed distribution across triage categories and regional demand surges using GA chromosome encoding.",           accent:C.teal },
  { num:"P2", title:"Drug Supply Chain Routing",         tag:"Ant Colony Optimization", desc:"Minimize delivery latency for cold-chain pharmaceuticals across multi-warehouse networks under disruption.",               accent:C.cyan },
  { num:"P3", title:"Medical Image Segmentation Tuning", tag:"Particle Swarm (PSO)",    desc:"Tune U-Net hyperparameters (learning rate, batch size, dropout) for maximum IoU on synthetic MRI slices.",                accent:C.blue },
  { num:"P4", title:"Biomedical Signal Anomaly Filter",  tag:"Fuzzy Logic",             desc:"Design a fuzzy inference system to classify and filter ECG / EEG anomalies under noisy sensor conditions.",               accent:C.teal },
  { num:"P5", title:"Multi-Robot Search & Rescue",       tag:"Swarm Intelligence",      desc:"Coordinate autonomous drones and ground rovers to locate survivors in a dynamically collapsing disaster zone.",            accent:C.cyan, flagship:true },
  { num:"P6", title:"Clinical Trial Scheduling",         tag:"Hybrid Evolutionary",     desc:"Allocate patient cohorts, investigator slots, and lab resources across a multi-site trial timeline.",                      accent:C.blue },
];

const whatYouGet = [
  "Modular Python starter scripts (.py) and notebooks (.ipynb) for all 6 tracks",
  "Pre-built synthetic data generators and scenario loaders",
  "Offline verification harness with identical scoring metrics",
  "Isolated sandbox execution environment with standard scientific libraries",
  "Instant multi-metric feedback: solution quality, runtime, AST design, consistency",
  "Working baseline heuristic solution for rapid experimentation",
];
const whatYouBring = [
  "Algorithmic formulation: choosing representation (chromosomes, particles, pheromone paths)",
  "Fitness function engineering: formulating multi-objective trade-offs and penalties",
  "Hyperparameter tuning: population size, crossover rates, inertia damping, evaporation",
  "Dynamic resilience: adapting code when hidden scenario shifts alter constraints",
  "Interpretability & defense: explaining choices and convergence curves during viva",
  "Teamwork & agility: rapid live patch implementation under tight 20-minute countdown",
];
const faqs = [
  { q:"Who can participate?", a:"Any registered student from any institution in India. A team of 2–4 members is required. No prior competition experience needed." },
  { q:"What is the registration fee?", a:"₹50 per team member, payable at the venue on the day of the event." },
  { q:"What programming language is allowed?", a:"Python only. Libraries: NumPy, SciPy, Matplotlib, scikit-learn, NetworkX. No custom C extensions." },
  { q:"Is internet access allowed?", a:"No internet access during coding rounds. Stage 7 (Live Patch) is strictly offline and zero-AI." },
  { q:"How is scoring done?", a:"Multi-metric auto-scoring: solution quality (fitness score), runtime efficiency, AST structure analysis, and cross-attempt consistency. Judges' viva adds up to 20% of total." },
  { q:"Will AI tools be allowed?", a:"AI tools are PROHIBITED during Stage 7. Reflection Notes and viva defense require genuine understanding regardless." },
];

export default function OptiForge() {
  const cd = useCountdown("2026-09-25T09:00:00+05:30");

  return (
    <div style={{ backgroundColor: C.navy, minHeight:"100vh", color:"rgba(255,255,255,0.85)" }}>

      {/* ── Ambient background glows ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] rounded-full opacity-25" style={{ background:`radial-gradient(ellipse, ${C.teal} 0%, transparent 70%)`, filter:"blur(80px)" }} />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-20" style={{ background:`radial-gradient(ellipse, ${C.blue} 0%, transparent 70%)`, filter:"blur(80px)" }} />
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] rounded-full opacity-15" style={{ background:`radial-gradient(ellipse, ${C.cyan} 0%, transparent 70%)`, filter:"blur(100px)" }} />
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-0 px-4 sm:px-8 max-w-[1280px] mx-auto">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center space-y-7">

          {/* Pill */}
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-mono font-bold"
            style={{ background:"rgba(0,140,149,0.12)", border:`1px solid rgba(0,140,149,0.30)`, color:C.cyan, backdropFilter:"blur(12px)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:C.cyan }} />
            IEEE EMBS × IEEE CIS · Vardhaman College of Engineering
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight leading-none uppercase"
            style={{ fontFamily:"Sora,Outfit,sans-serif" }}>
            <span style={{ color:"#fff" }}>OPTI</span>
            <span style={{ color:C.teal }}>FORGE</span>
            <br />
            <span className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-widest"
              style={{ WebkitTextStroke:`1.5px ${C.blue}`, color:"transparent",
                backgroundImage:`linear-gradient(135deg,${C.teal},${C.blue},${C.cyan})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              2026
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="font-mono text-sm uppercase tracking-widest font-semibold" style={{ color:C.cyan }}>
            Student Algorithm Design Challenge · Computational Intelligence
          </motion.p>

          <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed" style={{ color:"rgba(255,255,255,0.60)" }}>
            Engineer high-performance evolutionary heuristics, swarm intelligence, and fuzzy inference systems. Compete across 6 real-world challenges with live multi-attempt scoring, scenario shifts, a live surprise patch round, and expert judge defense.
          </motion.p>

          {/* Metadata chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            {[
              { icon:<Calendar className="w-3.5 h-3.5" style={{color:C.teal}} />, text:"25 September 2026" },
              { icon:<Clock    className="w-3.5 h-3.5" style={{color:C.blue}} />, text:"9:00 AM – 4:00 PM IST" },
              { icon:<MapPin   className="w-3.5 h-3.5" style={{color:"#E76F51"}} />, text:"Vardhaman College of Engineering" },
            ].map(({icon,text},i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium"
                style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", backdropFilter:"blur(12px)", color:"rgba(255,255,255,0.85)" }}>
                {icon} {text}
              </div>
            ))}
          </motion.div>

          {/* Countdown */}
          <motion.div variants={fadeUp} className="max-w-sm mx-auto space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-widest" style={{ color:"rgba(255,255,255,0.35)" }}>Countdown to Challenge Launch</p>
            <div className="flex items-center justify-center gap-3">
              <Tile value={cd.days}  label="Days"  accent={C.teal} />
              <Tile value={cd.hours} label="Hours" accent={C.teal} />
              <Tile value={cd.mins}  label="Mins"  accent={C.blue} />
              <Tile value={cd.secs}  label="Secs"  accent={C.cyan} />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://optiforge-2026.vercel.app/register" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-white transition-all hover:brightness-110 hover:scale-105 active:scale-97"
              style={{ background:`linear-gradient(135deg, ${C.teal} 0%, ${C.blue} 100%)`, boxShadow:`0 4px 24px rgba(0,140,149,0.40), 0 8px 40px rgba(0,102,204,0.20), inset 0 1px 0 rgba(255,255,255,0.25)` }}>
              Register Team (₹50/member) <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://optiforge-2026.vercel.app/leaderboard" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", backdropFilter:"blur(12px)" }}>
              <Trophy className="w-4 h-4" style={{ color:C.cyan }} /> Live Leaderboard
            </a>
            <a href="https://optiforge-2026.vercel.app/" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", backdropFilter:"blur(12px)" }}>
              <ExternalLink className="w-4 h-4" style={{ color:C.teal }} /> Full Portal
            </a>
          </motion.div>
        </motion.div>

        {/* ── FULL-WIDTH FLYER BANNER ── */}
        <motion.div initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.5,ease:[0.16,1,.3,1]}}
          className="mt-16 rounded-3xl overflow-hidden"
          style={{ border:`1px solid rgba(0,140,149,0.30)`, boxShadow:`0 0 0 1px rgba(0,102,204,0.15), 0 40px 80px -20px rgba(0,140,149,0.30), 0 8px 32px rgba(0,0,0,0.40)` }}>
          <img src={optiforgeFlyer} alt="OptiForge 2026 Event Flyer" className="w-full h-auto block" />
        </motion.div>
      </section>

      {/* ── 8-Stage Lifecycle ── */}
      <section className="py-24 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono font-semibold"
            style={{ background:"rgba(0,140,149,0.12)", border:`1px solid rgba(0,140,149,0.25)`, color:C.cyan }}>
            Complete Tournament Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily:"Sora,Outfit,sans-serif" }}>The 8-Stage Lifecycle</h2>
          <p className="text-sm max-w-2xl mx-auto" style={{ color:"rgba(255,255,255,0.50)" }}>
            Structured progression testing formulation, dynamic scenario adaptation, real-time agility, and academic defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((s,i) => (
            <motion.div key={i} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:.45,delay:i*.06,ease:[0.16,1,.3,1]}}
              className="rounded-2xl p-5 space-y-3 transition-all"
              style={ s.highlight
                ? { background:"rgba(231,111,81,0.10)", border:"2px solid rgba(231,111,81,0.40)", backdropFilter:"blur(16px)" }
                : { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", backdropFilter:"blur(16px)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06)" }
              }>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold" style={{ color:C.teal }}>Stage {s.num}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${s.highlight ? "text-[#E76F51]" : ""}`}
                  style={ s.highlight ? { background:"rgba(231,111,81,0.20)", border:"1px solid rgba(231,111,81,0.40)" } : { background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.08)" }}>
                  {s.tag}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color:"rgba(255,255,255,0.40)" }}>
                <Clock className="w-3 h-3" style={{ color:C.blue }} /> {s.time}
              </div>
              <h3 className="font-semibold text-white text-sm">{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color:"rgba(255,255,255,0.50)" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6 Problem Tracks ── */}
      <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono font-semibold"
            style={{ background:"rgba(0,102,204,0.12)", border:`1px solid rgba(0,102,204,0.25)`, color:C.cyan }}>
            <FileCode className="w-3.5 h-3.5" /> 6 Problem Domains
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily:"Sora,Outfit,sans-serif" }}>Challenge Tracks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tracks.map((t,i) => (
            <motion.div key={i} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:.45,delay:i*.07,ease:[0.16,1,.3,1]}}
              className="group rounded-2xl p-6 space-y-3 transition-all"
              style={ t.flagship
                ? { background:`rgba(0,140,149,0.10)`, border:`1px solid rgba(0,140,149,0.35)`, backdropFilter:"blur(16px)" }
                : { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", backdropFilter:"blur(16px)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06)" }
              }>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono" style={{ color:"rgba(255,255,255,0.12)" }}>{t.num}</span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border" style={{ color:t.accent, background:`${t.accent}18`, borderColor:`${t.accent}35` }}>{t.tag}</span>
              </div>
              {t.flagship && <p className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color:"#E76F51" }}>★ Flagship Problem</p>}
              <h3 className="font-bold text-white text-base leading-snug">{t.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color:"rgba(255,255,255,0.50)" }}>{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Provide / Bring ── */}
      <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-8" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* You get */}
          <motion.div initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            className="rounded-2xl p-7 space-y-5"
            style={{ background:"rgba(0,140,149,0.08)", border:`1px solid rgba(0,140,149,0.25)`, backdropFilter:"blur(20px)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 pb-4" style={{ borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:`rgba(0,140,149,0.15)`, border:`1px solid rgba(0,140,149,0.30)`, color:C.teal }}>
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">What OptiForge Provides</h3>
                <p className="text-xs" style={{ color:"rgba(255,255,255,0.40)" }}>Pre-packaged starter kits & verification harness</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {whatYouGet.map((item,i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color:"rgba(255,255,255,0.60)" }}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color:C.teal }} />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* You bring */}
          <motion.div initial={{opacity:0,x:16}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            className="rounded-2xl p-7 space-y-5"
            style={{ background:"rgba(0,102,204,0.08)", border:`1px solid rgba(0,102,204,0.25)`, backdropFilter:"blur(20px)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 pb-4" style={{ borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:`rgba(0,102,204,0.15)`, border:`1px solid rgba(0,102,204,0.30)`, color:C.blue }}>
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">What You Must Bring</h3>
                <p className="text-xs" style={{ color:"rgba(255,255,255,0.40)" }}>Algorithmic reasoning & problem-solving ability</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {whatYouBring.map((item,i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color:"rgba(255,255,255,0.60)" }}>
                  <Zap className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color:C.blue }} />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Integrity ── */}
      <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-8" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="rounded-3xl p-8 sm:p-12 relative overflow-hidden"
          style={{ background:`linear-gradient(135deg, rgba(0,102,204,0.12) 0%, rgba(0,140,149,0.08) 100%)`, border:`1px solid rgba(0,102,204,0.25)`, backdropFilter:"blur(24px)" }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background:`radial-gradient(ellipse, ${C.blue}25 0%, transparent 70%)`, filter:"blur(60px)" }} />
          <div className="relative z-10 space-y-7 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-mono font-bold"
              style={{ background:"rgba(0,102,204,0.15)", border:`1px solid rgba(0,102,204,0.35)`, color:C.cyan }}>
              <Shield className="w-4 h-4" /> OptiForge Integrity Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily:"Sora,Outfit,sans-serif" }}>
              Why OptiForge Cannot Simply Be "Prompted" Into a Win
            </h2>
            <p className="text-sm leading-relaxed" style={{ color:"rgba(255,255,255,0.55)" }}>
              Most engineering competitions collapse when participants paste problem prompts into LLMs. OptiForge is explicitly engineered with multiple defensive layers to evaluate genuine computational intelligence intuition and engineering skill.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title:"Hidden Scenario Shifts",      color:C.teal,  desc:"Static prompt solutions break on Attempts 2 & 3 when dynamic perturbations (resource drops, surges) are injected into held-out test data." },
                { title:"Mandatory Reflection Notes",  color:C.teal,  desc:"Every submission after Attempt 1 requires a 'what changed and why' note detailing parameter adaptation and algorithmic defense." },
                { title:"Stage 7 Live Patch (Zero AI)","color":"#E76F51", desc:"A 15–20 minute live surprise constraint with ZERO AI. Tests live code modification, mental model clarity, and edge-case handling." },
                { title:"Stage 8 Expert Viva Defense", color:C.blue,  desc:"Faculty judges question teams on fitness functions, defuzzification math, chromosome representations, and convergence graphs." },
              ].map((d,i) => (
                <div key={i} className="p-4 rounded-2xl space-y-1.5" style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)" }}>
                  <div className="flex items-center gap-2 text-xs font-semibold" style={{ color:d.color }}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> {d.title}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color:"rgba(255,255,255,0.50)" }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-8 space-y-6" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily:"Sora,Outfit,sans-serif" }}>Rules & FAQ</h2>
          <p className="text-sm" style={{ color:"rgba(255,255,255,0.45)" }}>Everything you need to know before registering.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f,i) => (
            <motion.div key={i} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:.4,delay:i*.05}}
              className="rounded-2xl p-5 space-y-2 transition-all"
              style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", backdropFilter:"blur(16px)" }}>
              <h4 className="font-semibold text-white text-sm">{f.q}</h4>
              <p className="text-xs leading-relaxed" style={{ color:"rgba(255,255,255,0.52)" }}>{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 sm:px-8 text-center space-y-7" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <h2 className="text-3xl sm:text-5xl font-black text-white" style={{ fontFamily:"Sora,Outfit,sans-serif" }}>Ready to Compete?</h2>
        <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color:"rgba(255,255,255,0.55)" }}>
          Register your team of 2–4 members. ₹50 per member, payable at the venue on 25 September 2026.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="https://optiforge-2026.vercel.app/register" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl font-black text-base text-white transition-all hover:brightness-110 hover:scale-105 active:scale-97"
            style={{ background:`linear-gradient(135deg,${C.teal} 0%,${C.blue} 100%)`, boxShadow:`0 4px 28px rgba(0,140,149,0.45), 0 10px 48px rgba(0,102,204,0.25), inset 0 1px 0 rgba(255,255,255,0.25)` }}>
            Register Team (₹50/member) <ArrowRight className="w-5 h-5" />
          </a>
          <a href="https://optiforge-2026.vercel.app/" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", backdropFilter:"blur(12px)" }}>
            <ExternalLink className="w-4 h-4" /> Visit OptiForge Portal
          </a>
        </div>
      </section>

    </div>
  );
}
