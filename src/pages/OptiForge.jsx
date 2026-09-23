import React, { useState, useEffect } from "react";
import { ExternalLink, Calendar, Clock, MapPin, Trophy, ArrowRight, CheckCircle2, Zap, Shield, Cpu, Layers } from "lucide-react";
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
  { num:"01", time:"09:00–10:00", title:"Problem Selection & Kickoff",          desc:"Review all 9 innovation themes, strategize representations, and download official starter kits & evaluation harnesses.",       tag:"Kickoff" },
  { num:"02", time:"10:00–12:30", title:"1st Development & AI Evaluation",      desc:"Core heuristic algorithm engineering, initial implementation, baseline benchmarking, and automated AI evaluation scoring.",      tag:"AI Evaluation", highlight:true },
  { num:"03", time:"12:30–13:15", title:"Lunch Break & Strategy Refresh",       desc:"Networking and lunch break. Teams regroup, analyze leaderboard metrics, and adjust strategy for afternoon rounds.",             tag:"Break" },
  { num:"04", time:"13:15–15:00", title:"2nd Development & Optimization",       desc:"Surprise scenario shifts injected. Adapt models, execute live patch refactoring, and optimize convergence for final freeze.",    tag:"Deep Hack" },
  { num:"05", time:"15:00–16:00", title:"Final Panel Evaluation & Results",     desc:"Live defense and presentation before the domain expert faculty jury, followed by felicitation and awards ceremony.",          tag:"Panel Jury", highlight:true },
];

const tracks = [
  { num:"01", title:"Biomedical Artificial Intelligence",          tag:"Machine Learning & AI",   desc:"Develop predictive algorithms, deep learning models, and automated diagnostic tools for complex disease classification and personalized clinical care.",         accent:C.teal },
  { num:"02", title:"EdTech",                                      tag:"Intelligent Learning",    desc:"Design intelligent tutoring systems, adaptive learning algorithms, and gamified pedagogical platforms for healthcare and engineering education.",                  accent:C.cyan },
  { num:"03", title:"Digital Health & Telemedicine",               tag:"Remote Care & Health IT", desc:"Create secure remote consultation architectures, FHIR/SNOMED compliant EMR pipelines, and distributed patient monitoring systems.",                   accent:C.blue },
  { num:"04", title:"Neurotechnology & Rehabilitation",            tag:"Neural Engineering",      desc:"Engineer Brain-Computer Interfaces (BCI), neural decoding algorithms, assistive robotics, and neuroprosthetic rehabilitation feedback loops.",                     accent:C.teal },
  { num:"05", title:"Medical Imaging & Computer Vision",           tag:"Computer Vision",         desc:"Design high-accuracy segmentation, registration, and enhancement algorithms for MRI, CT, ultrasound, and histopathological scans.",                               accent:C.blue },
  { num:"06", title:"Biomedical Signals & Intelligent Systems",     tag:"Signal Processing",       desc:"Implement real-time denoising, feature extraction, and fuzzy/heuristic anomaly detection for ECG, EEG, EMG, and PPG physiological waveforms.",                    accent:C.teal },
  { num:"07", title:"Smart Healthcare & Medical IoT",              tag:"IoMT & Embedded AI",      desc:"Develop low-latency, edge-computed wearable sensor networks, vitals streaming telemetric protocols, and battery-optimized IoMT nodes.",                          accent:C.cyan },
  { num:"08", title:"Healthcare Robotics & Automation",            tag:"Robotics & Automation",   desc:"Formulate motion planning, kinematics optimization, and autonomous guidance algorithms for surgical robotic arms and hospital rovers.",                            accent:C.blue },
  { num:"09", title:"Open Innovation on (CIS and EMBS only)",       tag:"CIS & EMBS Flagship",     desc:"Exclusive interdisciplinary track for novel breakthroughs combining Computational Intelligence (evolutionary computing, neural nets, fuzzy logic) and Bioengineering.", accent:C.teal, flagship:true },
];

const whatYouGet = [
  "Modular Python starter scripts (.py) and notebooks (.ipynb) across all 9 challenge themes",
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
  "Teamwork & agility: rapid live patch implementation under tight countdown",
];
const faqs = [
  { q:"Who can participate?", a:"Any registered student from any institution in India. A team of 2–4 members is required. No prior competition experience needed." },
  { q:"What is the registration fee?", a:"₹50 per team member, payable at the venue on the day of the event." },
  { q:"What programming language is allowed?", a:"Python only. Libraries: NumPy, SciPy, Matplotlib, scikit-learn, NetworkX. No custom C extensions." },
  { q:"Is internet access allowed?", a:"No internet access during coding rounds. Live patch challenges are strictly offline and zero-AI." },
  { q:"How is scoring done?", a:"Multi-metric scoring: automated solution quality (fitness score), runtime efficiency, AST structure analysis, and AI evaluation feedback. Final panel evaluation adds up to 30% of total score." },
  { q:"Will AI tools be allowed?", a:"AI evaluation is performed on 1st Development submissions. Live patch and final panel defense require genuine algorithmic defense and understanding." },
];

export default function OptiForge() {
  const cd = useCountdown("2026-09-30T09:00:00+05:30");

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
            Hackathon & Algorithm Design Challenge · Computational Intelligence
          </motion.p>

          <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed" style={{ color:"rgba(255,255,255,0.60)" }}>
            Engineer high-performance evolutionary heuristics, machine learning models, and intelligent systems. Compete across 9 innovation themes with live development rounds, AI evaluation, scenario shifts, and expert panel defense.
          </motion.p>

          {/* Metadata chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            {[
              { icon:<Calendar className="w-3.5 h-3.5" style={{color:C.teal}} />, text:"30 September 2026" },
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

      {/* ── Hackathon Schedule & Lifecycle ── */}
      <section className="py-24 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono font-semibold"
            style={{ background:"rgba(0,140,149,0.12)", border:`1px solid rgba(0,140,149,0.25)`, color:C.cyan }}>
            Tournament Schedule & Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily:"Sora,Outfit,sans-serif" }}>Hackathon Schedule & Lifecycle</h2>
          <p className="text-sm max-w-2xl mx-auto" style={{ color:"rgba(255,255,255,0.50)" }}>
            Structured progression across development rounds, automated AI evaluation, scenario shift handling, and final panel evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

      {/* ── 9 Innovation Themes / Challenge Tracks ── */}
      <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono font-semibold"
            style={{ background:"rgba(0,102,204,0.12)", border:`1px solid rgba(0,102,204,0.25)`, color:C.cyan }}>
            <Layers className="w-3.5 h-3.5" /> 9 Innovation Themes
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily:"Sora,Outfit,sans-serif" }}>Hackathon Themes & Challenge Tracks</h2>
          <p className="text-sm max-w-2xl mx-auto" style={{ color:"rgba(255,255,255,0.50)" }}>
            Explore our 9 problem domains engineered for computational intelligence, algorithm design, and interdisciplinary healthcare innovation.
          </p>
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
                { title:"Hidden Scenario Shifts",      color:C.teal,  desc:"Static prompt solutions break during 2nd Development when dynamic perturbations (resource drops, surges) are injected into test data." },
                { title:"AI Evaluation & Reflection",  color:C.teal,  desc:"1st Development solutions undergo multi-metric automated AI scoring. Teams submit reflection notes on parameter adaptation." },
                { title:"Live Patch Agility",          color:"#E76F51", desc:"A surprise constraint during 2nd Development tests real-time code refactoring, mental model clarity, and edge-case handling." },
                { title:"Final Panel Defense (3–4 PM)",color:C.blue,  desc:"Expert faculty judges rigorously question teams on algorithmic representations, mathematical formulations, and convergence." },
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
          Register your team of 2–4 members. ₹50 per member, payable at the venue on 30 September 2026.
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
