import React, { useState, useEffect } from "react";
import { ExternalLink, Calendar, Clock, MapPin, Trophy, ArrowRight, CheckCircle2, Zap, Shield, Users, Code2, FileCode, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { optiforgeFlyer } from "../assets/images";

/* ── Countdown hook ── */
function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000)  / 60000),
      secs:  Math.floor((diff % 60000)    / 1000)
    };
  };
  const [time, setTime] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ── Countdown tile ── */
function Tile({ value, label }) {
  return (
    <div className="flex flex-col items-center bg-[#0E1520] border border-white/10 rounded-xl px-4 py-3 min-w-[68px]">
      <span className="text-3xl font-black font-mono text-white tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-[#647070] mt-1">{label}</span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const stages = [
  { num: "01", time: "09:00–09:30", title: "Problem Selection & Strategy",   desc: "Teams review all 6 real-world challenges, submit track preferences, and analyze domain formulations.",            tag: "Strategy" },
  { num: "02", time: "09:30–10:00", title: "Starter Code & Test Harness",    desc: "Download official Python starter scripts, offline evaluation harness, and synthetic test datasets.",             tag: "Distribution" },
  { num: "03", time: "10:00–11:15", title: "Attempt 1 — Baseline",           desc: "Implement core heuristic algorithm for the base scenario. Immediate sandboxed auto-score on leaderboard.",       tag: "Scored #1" },
  { num: "04", time: "11:30–12:45", title: "Hidden Shift #1 & Attempt 2",    desc: "Surprise parameter perturbation injected. Adapt code and submit mandatory reflection note.",                    tag: "Scored #2" },
  { num: "05", time: "13:15–14:15", title: "Hidden Shift #2 & Attempt 3",    desc: "Stress edge case injected. Final algorithm refinement for maximum convergence, efficiency, and stability.",       tag: "Scored #3" },
  { num: "06", time: "14:15",       title: "Leaderboard Freeze",              desc: "Public rankings freeze. Teams lock their final submissions before confidential judging rounds begin.",             tag: "Rankings Lock" },
  { num: "07", time: "14:30–15:00", title: "The Live Patch Round",            desc: "15–20 minute surprise constraint window — ZERO AI ALLOWED. Tests real-time problem-solving agility.",           tag: "Zero AI Test", highlight: true },
  { num: "08", time: "15:00–16:00", title: "Judges' Viva Q&A & Results",     desc: "1-on-1 viva defense before domain faculty judges. Defend representations, operators, and shift handling.",        tag: "Expert Jury" },
];

const tracks = [
  { num: "P1", title: "Hospital Resource Allocation",       tag: "Genetic Algorithm",        desc: "Optimize ICU bed distribution across triage categories and regional demand surges using GA chromosome encoding." },
  { num: "P2", title: "Drug Supply Chain Routing",          tag: "Ant Colony Optimization",  desc: "Minimize delivery latency for cold-chain pharmaceuticals across multi-warehouse networks under disruption." },
  { num: "P3", title: "Medical Image Segmentation Tuning",  tag: "Particle Swarm (PSO)",     desc: "Tune U-Net hyperparameters (learning rate, batch size, dropout) for maximum IoU on synthetic MRI slices." },
  { num: "P4", title: "Biomedical Signal Anomaly Filter",   tag: "Fuzzy Logic",              desc: "Design a fuzzy inference system to classify and filter ECG / EEG anomalies under noisy sensor conditions." },
  { num: "P5", title: "Multi-Robot Search & Rescue",        tag: "Swarm Intelligence",       desc: "Coordinate autonomous drones and ground rovers to locate survivors in a dynamically collapsing disaster zone.", flagship: true },
  { num: "P6", title: "Clinical Trial Scheduling",          tag: "Hybrid Evolutionary",      desc: "Allocate patient cohorts, investigator slots, and lab resources across a multi-site trial timeline." },
];

const whatYouGet = [
  "Modular Python starter scripts (.py) and notebooks (.ipynb) for all 6 tracks",
  "Pre-built synthetic data generators and scenario loaders",
  "Offline verification harness with identical scoring metrics",
  "Isolated sandbox execution environment with standard scientific libraries",
  "Instant multi-metric feedback (solution quality, runtime, AST design, consistency)",
  "Working baseline heuristic solution for rapid experimentation",
];

const whatYouBring = [
  "Algorithmic formulation: choosing representation (chromosomes, particles, pheromone paths)",
  "Fitness function engineering: formulating multi-objective trade-offs and penalties",
  "Hyperparameter tuning: population size, crossover rates, inertia damping, evaporation",
  "Dynamic resilience: adapting code when hidden scenario shifts alter constraints",
  "Interpretability & defense: ability to explain choices and convergence curves during viva",
  "Teamwork & agility: rapid live patch implementation under tight 20-minute countdown",
];

const faqs = [
  { q: "Who can participate?", a: "Any registered student from any institution in India. A team of 2–4 members is required. No prior competition experience needed." },
  { q: "What is the registration fee?", a: "₹50 per team member, payable at the venue on the day of the event. IEEE EMBS members get priority registration." },
  { q: "What programming language is allowed?", a: "Python only. No other languages. Libraries: NumPy, SciPy, Matplotlib, scikit-learn, NetworkX. No custom C extensions." },
  { q: "Is internet access allowed?", a: "No internet access during coding rounds. Documentation may be provided offline. Stage 7 (Live Patch) is strictly offline." },
  { q: "How is scoring done?", a: "Multi-metric auto-scoring: solution quality (fitness score), runtime efficiency, AST structure analysis, and cross-attempt consistency. Judges' viva adds up to 20% of total score." },
  { q: "Will AI tools be allowed?", a: "AI tools (ChatGPT, Copilot, etc.) are PROHIBITED for Stage 7. Permitted during coding rounds but Reflection Notes and viva defense require genuine understanding." },
];

export default function OptiForge() {
  const countdown = useCountdown("2026-09-25T09:00:00+05:30");

  return (
    <div style={{ backgroundColor: "#060C14", minHeight: "100vh", color: "#CBD5E0" }}>

      {/* ── Hero with flyer banner ── */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] rounded-full bg-[#087F8C]/12 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-[360px] h-[360px] rounded-full bg-[#6B46FA]/10 blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center space-y-6">

            {/* Organiser pill */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#087F8C]/35 bg-[#087F8C]/10 text-[#087F8C] text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#087F8C] animate-pulse" />
              IEEE EMBS × IEEE CIS · Vardhaman College of Engineering
            </motion.div>

            {/* Main title */}
            <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none uppercase"
              style={{ fontFamily: "Sora, Outfit, sans-serif" }}>
              <span className="text-white">OPTI</span>
              <span style={{ color: "#087F8C" }}>FORGE</span>{" "}
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #6B46FA" }}>2026</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="font-mono text-sm text-[#087F8C]/90 uppercase tracking-widest font-semibold">
              Student Algorithm Design Challenge · Computational Intelligence
            </motion.p>

            <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-[#8A9E9A] leading-relaxed text-sm sm:text-base">
              Engineer high-performance evolutionary heuristics, swarm intelligence, and fuzzy inference systems. Compete across 6 real-world challenges with live multi-attempt scoring, scenario shifts, a live surprise patch round, and expert judge defense.
            </motion.p>

            {/* Event metadata pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-white">
              {[
                { icon: <Calendar className="w-3.5 h-3.5 text-[#087F8C]" />, text: "25 September 2026" },
                { icon: <Clock    className="w-3.5 h-3.5 text-[#6B46FA]" />, text: "9:00 AM – 4:00 PM IST" },
                { icon: <MapPin   className="w-3.5 h-3.5 text-[#E76F51]" />, text: "Vardhaman College of Engineering" },
              ].map(({ icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0E1520] border border-white/8">
                  {icon}<span>{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Countdown */}
            <motion.div variants={fadeUp} className="max-w-sm mx-auto">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#647070] block mb-3">Countdown to Challenge Launch</span>
              <div className="flex items-center justify-center gap-3">
                <Tile value={countdown.days}  label="Days"  />
                <Tile value={countdown.hours} label="Hours" />
                <Tile value={countdown.mins}  label="Mins"  />
                <Tile value={countdown.secs}  label="Secs"  />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://optiforge-2026.vercel.app/register" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-[#060C14] transition-all"
                style={{ background: "linear-gradient(135deg, #087F8C 0%, #6B46FA 100%)" }}
                onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.12)"}
                onMouseLeave={e => e.currentTarget.style.filter = "none"}
              >
                Register Team (₹50/member)
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://optiforge-2026.vercel.app/leaderboard" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white border border-white/15 hover:border-[#087F8C]/60 transition-all bg-[#0E1520]">
                <Trophy className="w-4 h-4 text-[#6B46FA]" /> Live Leaderboard
              </a>
              <a href="https://optiforge-2026.vercel.app/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white border border-white/15 hover:border-[#087F8C]/60 transition-all bg-[#0E1520]">
                <ExternalLink className="w-4 h-4 text-[#087F8C]" /> Full OptiForge Site
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── FLYER BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 max-w-[1280px] mx-auto px-4 sm:px-8"
        >
          <div className="rounded-2xl overflow-hidden border border-[#087F8C]/20 shadow-2xl" style={{ boxShadow: "0 0 80px -20px rgba(8,127,140,0.25)" }}>
            <img
              src={optiforgeFlyer}
              alt="OptiForge 2026 — Dark & Light Blue Modern Hackathon Event Flyer"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* ── 8-Stage Lifecycle ── */}
      <section className="py-24 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#087F8C]/10 border border-[#087F8C]/25 text-[#087F8C] text-xs font-mono">
            Complete Tournament Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>
            How OptiForge Works: The 8-Stage Lifecycle
          </h2>
          <p className="text-[#8A9E9A] text-sm max-w-2xl mx-auto">
            A structured competition progression testing foundational formulation, dynamic scenario adaptation, real-time agility, and academic defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-2xl p-5 space-y-3 border transition-all ${s.highlight ? "bg-[#E76F51]/8 border-[#E76F51]/45" : "bg-[#0E1520] border-white/8 hover:border-[#087F8C]/35"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#087F8C]">Stage {s.num}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${s.highlight ? "bg-[#E76F51]/20 text-[#E76F51] border-[#E76F51]/40" : "bg-[#0E1520] text-[#647070] border-white/8"}`}>{s.tag}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#647070]">
                <Clock className="w-3 h-3 text-[#6B46FA]" /> {s.time}
              </div>
              <h3 className="font-semibold text-white text-sm">{s.title}</h3>
              <p className="text-xs text-[#8A9E9A] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6 Problem Tracks ── */}
      <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10 border-t border-white/6">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#6B46FA]/10 border border-[#6B46FA]/25 text-[#6B46FA] text-xs font-mono">
            <FileCode className="w-3.5 h-3.5" /> 6 Problem Domains
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>Challenge Tracks</h2>
          <p className="text-[#8A9E9A] text-sm max-w-xl mx-auto">Each track applies a core computational intelligence algorithm to a real biomedical or engineering domain.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tracks.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`group rounded-2xl p-6 border transition-all space-y-3 ${t.flagship ? "bg-[#087F8C]/8 border-[#087F8C]/40 hover:border-[#087F8C]/70" : "bg-[#0E1520] border-white/8 hover:border-[#087F8C]/30"}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-white/15 group-hover:text-[#087F8C]/40 transition-colors">{t.num}</span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${t.flagship ? "text-[#087F8C] bg-[#087F8C]/15 border-[#087F8C]/35" : "text-[#6B46FA] bg-[#6B46FA]/10 border-[#6B46FA]/25"}`}>{t.tag}</span>
              </div>
              {t.flagship && <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E76F51]">★ Flagship Problem</span>}
              <h3 className="font-bold text-white text-base leading-snug">{t.title}</h3>
              <p className="text-xs text-[#8A9E9A] leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What you get / bring ── */}
      <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-8 border-t border-white/6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* You get */}
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-[#0E1520] border border-[#087F8C]/25 rounded-2xl p-7 space-y-5">
            <div className="flex items-center gap-3 border-b border-white/8 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#087F8C]/15 border border-[#087F8C]/30 flex items-center justify-center text-[#087F8C]">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">What OptiForge Provides</h3>
                <p className="text-xs text-[#647070]">Pre-packaged starter kits & verification harness</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {whatYouGet.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-[#8A9E9A]">
                  <CheckCircle2 className="w-4 h-4 text-[#087F8C] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* You bring */}
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-[#0E1520] border border-[#6B46FA]/25 rounded-2xl p-7 space-y-5">
            <div className="flex items-center gap-3 border-b border-white/8 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#6B46FA]/15 border border-[#6B46FA]/30 flex items-center justify-center text-[#6B46FA]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">What You Must Bring</h3>
                <p className="text-xs text-[#647070]">Algorithmic reasoning & problem-solving ability</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {whatYouBring.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-[#8A9E9A]">
                  <Zap className="w-4 h-4 text-[#6B46FA] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Integrity Architecture ── */}
      <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-8 border-t border-white/6">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-[#0E1520] to-[#0A0E1A] border border-[#6B46FA]/35 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6B46FA]/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-[#6B46FA]/15 border border-[#6B46FA]/35 text-[#6B46FA] text-xs font-mono font-semibold">
              <Shield className="w-4 h-4" /> OptiForge Integrity Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>
              Why OptiForge Cannot Simply Be "Prompted" Into a Win
            </h2>
            <p className="text-sm text-[#8A9E9A] leading-relaxed">
              Most engineering competitions collapse when participants paste problem prompts into generic LLMs. OptiForge is explicitly engineered with multiple defensive architectural layers to evaluate genuine computational intelligence intuition and engineering skill.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Hidden Scenario Shifts",     color: "#087F8C", desc: "Static prompt solutions break on Attempts 2 & 3 when dynamic perturbations (resource drops, surges) are injected into held-out test data." },
                { title: "Mandatory Reflection Notes", color: "#087F8C", desc: "Every submission after Attempt 1 requires a 'what changed and why' note detailing parameter adaptation and algorithmic defense." },
                { title: "Stage 7 Live Patch (Zero AI)", color: "#E76F51", desc: "A 15–20 minute live surprise constraint with strictly ZERO AI allowed. Tests live code modification, mental model clarity, and edge-case handling." },
                { title: "Stage 8 Expert Viva Defense",  color: "#6B46FA", desc: "Faculty judges question teams on fitness functions, defuzzification math, chromosome representations, and convergence graphs." },
              ].map((d, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/4 border border-white/8 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: d.color }}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> {d.title}
                  </div>
                  <p className="text-xs text-[#8A9E9A] leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-8 space-y-6 border-t border-white/6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>Rules & FAQ</h2>
          <p className="text-[#8A9E9A] text-sm">Everything you need to know before registering.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-[#0E1520] border border-white/8 rounded-xl p-5 space-y-2 hover:border-[#087F8C]/30 transition-colors">
              <h4 className="font-semibold text-white text-sm">{f.q}</h4>
              <p className="text-[#8A9E9A] text-xs leading-relaxed">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-8 border-t border-white/6">
        <div className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>Ready to Compete?</h2>
          <p className="text-[#8A9E9A] max-w-xl mx-auto text-sm leading-relaxed">
            Register your team of 2–4 members and compete at Vardhaman College of Engineering on 25 September 2026. Registration fee: ₹50 per member, payable at the venue.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://optiforge-2026.vercel.app/register" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-[#060C14] transition-all"
              style={{ background: "linear-gradient(135deg, #087F8C 0%, #6B46FA 100%)" }}
              onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.12)"}
              onMouseLeave={e => e.currentTarget.style.filter = "none"}
            >
              Register Team (₹50/member) <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://optiforge-2026.vercel.app/" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-white border border-white/15 hover:border-[#087F8C]/50 transition-all bg-[#0E1520]">
              <ExternalLink className="w-4 h-4" /> Visit OptiForge Portal
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
