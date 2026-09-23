import React, { useState, useEffect } from "react";
import { ExternalLink, Calendar, Clock, MapPin, Trophy, ArrowRight, CheckCircle2, Zap, Shield, Cpu, Layers, Activity, BrainCircuit, HeartPulse, Stethoscope, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { optiforgeFlyer } from "../assets/images";

/* 🎨 Palette */
const C = {
  bg: "#F8FAFC", white: "#FFFFFF", softBlue: "#F0F7FB", softPurple: "#F6F1F8",
  ieeeBlue: "#00629B", embsPurple: "#772583", cyan: "#12A8C4", navy: "#102A43", slate: "#52606D", border: "#D9E6EE",
  success: "#238B68", warning: "#D58A19", medRed: "#D84A5A", aiPurple: "#7657D9"
};

const glassLevel1 = { background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.75)" };
const glassLevel2 = { background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.85)", boxShadow: "0 12px 40px rgba(16,42,67,0.08)" };

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null, nX: 0, nY: 0 });
  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ 
        x: ev.clientX, y: ev.clientY,
        nX: (ev.clientX / window.innerWidth - 0.5) * 2,
        nY: (ev.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
}

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
    <div className="flex flex-col items-center rounded-2xl px-5 py-4 min-w-[76px] transition-transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
      style={{ ...glassLevel2, borderBottom: `3px solid ${accent}` }}>
      <span className="text-3xl font-black tabular-nums" style={{ fontFamily: "JetBrains Mono, monospace", color: C.navy }}>{String(value).padStart(2,"0")}</span>
      <span className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: C.slate }}>{label}</span>
    </div>
  );
}

const fadeUp = { hidden:{opacity:0,y:22}, visible:{opacity:1,y:0,transition:{duration:.55,ease:[0.16,1,.3,1]}} };
const stagger = { hidden:{}, visible:{transition:{staggerChildren:.08}} };

const stages = [
  { num:"01", time:"09:00–12:30", title:"1st Round",      desc:"AI evaluation",      tag:"Round 1", highlight:true },
  { num:"02", time:"12:30–13:15", title:"Lunch Break",       desc:"Networking and lunch break. Teams regroup, analyze leaderboard metrics, and adjust strategy for afternoon rounds.",             tag:"Break" },
  { num:"03", time:"13:15–15:00", title:"2nd Round",       desc:"AI evaluation",    tag:"Round 2", highlight:true },
  { num:"04", time:"15:00–16:00", title:"Final Panel Evaluation & Results",     desc:"Live defense and presentation before the domain expert faculty jury, followed by felicitation and awards ceremony.",          tag:"Panel Jury" },
];

const tracks = [
  // 🟣 IEEE EMBS Domains
  { num:"01", title:"Biomedical Artificial Intelligence", tag:"EMBS Domain", desc:"Develop AI and machine-learning solutions for healthcare, including disease prediction, clinical decision support, and personalized medicine.", accent: C.aiPurple, bg: "#F4F1FF", icon: <BrainCircuit className="w-6 h-6" /> },
  { num:"02", title:"Biomedical Signals & Intelligent Systems", tag:"EMBS Domain", desc:"Apply intelligent algorithms to ECG, EEG, EMG, and PPG for signal processing, anomaly detection, and physiological monitoring.", accent: C.medRed, bg: "#FFF2F4", icon: <Activity className="w-6 h-6" /> },
  { num:"03", title:"Medical Imaging & Computer Vision", tag:"EMBS Domain", desc:"Develop intelligent systems for MRI, CT, ultrasound, and histopathological image analysis, segmentation, and automated interpretation.", accent: C.cyan, bg: "#EFFBFD", icon: <HeartPulse className="w-6 h-6" /> },

  // 🔵 IEEE CIS Domains
  { num:"04", title:"Machine Learning & Artificial Intelligence", tag:"CIS Domain", desc:"Explore machine learning, deep learning, generative AI, and intelligent algorithms for solving complex real-world problems.", accent: C.ieeeBlue, bg: C.softBlue, icon: <Cpu className="w-6 h-6" /> },
  { num:"05", title:"Intelligent Systems & Autonomous Computing", tag:"CIS Domain", desc:"Develop autonomous, adaptive, and multi-agent systems capable of intelligent decision-making, learning, and real-time operation.", accent: C.ieeeBlue, bg: C.softBlue, icon: <Zap className="w-6 h-6" /> },

  // 🟣🔵 Flagship
  { num:"06", title:"Open Innovation: CIS × EMBS", tag:"Flagship Domain", desc:"An interdisciplinary track for novel solutions combining computational intelligence with biomedical engineering and healthcare challenges. Encourages innovative applications of AI, optimization, intelligent systems, vision, signals, and robotics to real-world biomedical problems.", accent: C.cyan, bg: "#EFFBFD", icon: <Stethoscope className="w-6 h-6" />, flagship:true },
];

export default function OptiForge() {
  const cd = useCountdown("2026-09-30T09:00:00+05:30");
  const mouse = useMousePosition();
  
  return (
    <div style={{ backgroundColor: C.bg, minHeight:"100vh", color: C.navy, overflow: "hidden", fontFamily: "Inter, sans-serif" }}>

      {/* Interactive Global Mouse Light */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-soft-light transition-opacity duration-300"
        style={{
          background: mouse.x ? `radial-gradient(800px circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.8), transparent 40%)` : 'none',
          opacity: mouse.x ? 1 : 0
        }} 
      />

      {/* Mouse Parallax Background */}
      <div className="fixed inset-0 pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mouse.nX * -15}px, ${mouse.nY * -15}px)` }}>
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: `linear-gradient(135deg, ${C.bg} 0%, #EEF8FC 50%, #F7F0F9 100%)` }} />
        {/* Soft Ambient Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply opacity-20 blur-[100px]" style={{ background: C.softBlue }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply opacity-25 blur-[120px]" style={{ background: C.softPurple }} />
      </div>

      <div className="relative z-10">
        {/* ── HERO ── */}
        <section className="relative pt-32 pb-16 px-4 sm:px-8 max-w-[1280px] mx-auto">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center space-y-7 transition-transform duration-700 ease-out" style={{ transform: `translate(${mouse.nX * 10}px, ${mouse.nY * 10}px)` }}>
            
            {/* Pill */}
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-bold shadow-sm"
              style={{ ...glassLevel2, color: C.ieeeBlue }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.embsPurple }} />
              IEEE EMBS × IEEE CIS · Vardhaman College of Engineering
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none uppercase"
              style={{ fontFamily: "Sora, sans-serif", color: C.ieeeBlue }}>
              OPTIFORGE
              <br />
              <span className="text-5xl sm:text-6xl lg:text-7xl mt-2 block"
                style={{ color: C.embsPurple }}>
                2026
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm sm:text-base uppercase tracking-widest font-semibold" style={{ color: C.slate, fontFamily: "Inter, sans-serif" }}>
              Computational Intelligence Challenge
            </motion.p>
            <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed" style={{ color: C.slate }}>
              Engineer high-performance evolutionary heuristics, machine learning models, and intelligent systems. Compete across 6 innovation themes with live development rounds, AI evaluation, scenario shifts, and expert panel defense.
            </motion.p>

            {/* Metadata chips */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              {[
                { icon:<Calendar className="w-3.5 h-3.5" style={{color:C.ieeeBlue}} />, text:"30 September 2026" },
                { icon:<Clock    className="w-3.5 h-3.5" style={{color:C.embsPurple}} />, text:"9:00 AM – 4:00 PM IST" },
                { icon:<MapPin   className="w-3.5 h-3.5" style={{color:C.medRed}} />, text:"Vardhaman College of Engineering" },
              ].map(({icon,text},i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md cursor-default"
                  style={{ ...glassLevel1, color: C.navy }}>
                  {icon} {text}
                </div>
              ))}
            </motion.div>

            {/* Countdown */}
            <motion.div variants={fadeUp} className="max-w-sm mx-auto space-y-4 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.slate, fontFamily: "Inter, sans-serif" }}>Countdown to Challenge Launch</p>
              <div className="flex items-center justify-center gap-3">
                <Tile value={cd.days}  label="Days"  accent={C.ieeeBlue} />
                <Tile value={cd.hours} label="Hours" accent={C.embsPurple} />
                <Tile value={cd.mins}  label="Mins"  accent={C.cyan} />
                <Tile value={cd.secs}  label="Secs"  accent={C.success} />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <a href="https://optiforge-2026.vercel.app/register" target="_blank" rel="noreferrer"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg"
                style={{ background: C.ieeeBlue }}>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2">Register Now (₹100/member) <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </a>
              <a href="https://optiforge-2026.vercel.app/leaderboard" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold transition-all hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-md"
                style={{ ...glassLevel1, color: C.ieeeBlue }}>
                <Trophy className="w-4 h-4" /> Live Leaderboard
              </a>
              <a href="https://optiforge-2026.vercel.app/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold transition-all hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-md"
                style={{ ...glassLevel1, color: C.embsPurple }}>
                <ExternalLink className="w-4 h-4" /> Full Portal
              </a>
            </motion.div>
          </motion.div>

          {/* ── FULL-WIDTH FLYER BANNER ── */}
          <motion.div initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.5,ease:[0.16,1,.3,1]}}
            className="mt-20 rounded-3xl overflow-hidden relative group transition-transform duration-700 ease-out hover:shadow-2xl"
            style={{ ...glassLevel2, padding: "8px", transform: `translate(${mouse.nX * 5}px, ${mouse.nY * 5}px)` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <img src={optiforgeFlyer} alt="OptiForge 2026 Event Flyer" className="w-full h-auto block rounded-2xl" />
          </motion.div>
        </section>

        {/* ── 6 Innovation Themes / Challenge Tracks ── */}
        <section className="py-24 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider"
              style={{ ...glassLevel1, color: C.cyan }}>
              <Layers className="w-3.5 h-3.5" /> 6 Innovation Themes
            </div>
            <h2 className="text-3xl sm:text-5xl font-black" style={{ fontFamily: "Sora, sans-serif", color: C.navy }}>Problem Domains</h2>
            <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: C.slate }}>
              Explore our 6 problem domains engineered for computational intelligence, algorithm design, and interdisciplinary healthcare innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((t,i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:"-50px"}}
                transition={{duration:.5,delay:i*.07,ease:[0.16,1,.3,1]}}
                className="group relative rounded-3xl p-8 space-y-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                style={{ ...glassLevel2, background: C.white }}>
                
                {/* Background Wash */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${t.bg}, transparent)` }} />
                
                {/* Highlight Border */}
                <div className="absolute inset-x-0 bottom-0 h-1 transition-colors duration-300" style={{ background: t.accent }} />

                <div className="relative z-10 flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" style={{ background: t.bg, color: t.accent }}>
                    {t.icon}
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-colors duration-300 group-hover:bg-white" 
                    style={{ color: t.accent, background: `${t.accent}15`, border: `1px solid ${t.accent}30` }}>
                    {t.tag}
                  </span>
                </div>
                
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black opacity-20" style={{ fontFamily: "JetBrains Mono, monospace" }}>{t.num}</span>
                    {t.flagship && <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.warning }}>★ Flagship</span>}
                  </div>
                  <h3 className="font-bold text-lg leading-snug transition-colors duration-300 group-hover:text-[#102A43]" style={{ color: C.navy }}>{t.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.slate }}>{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Hackathon Schedule & Lifecycle ── */}
        <section className="py-24 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider"
              style={{ ...glassLevel1, color: C.embsPurple }}>
              <Activity className="w-3.5 h-3.5" /> Timeline
            </div>
            <h2 className="text-3xl sm:text-5xl font-black" style={{ fontFamily: "Sora, sans-serif", color: C.navy }}>Hackathon Schedule</h2>
            <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: C.slate }}>
              Structured progression across development rounds, automated AI evaluation, scenario shift handling, and final panel evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stages.map((s,i) => (
              <motion.div key={i} initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
                transition={{duration:.4,delay:i*.05,ease:[0.16,1,.3,1]}}
                className="group relative rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={ s.highlight 
                  ? { ...glassLevel2, border: `1px solid ${C.embsPurple}40`, background: `linear-gradient(135deg, #FFFFFF, ${C.softPurple})` }
                  : { ...glassLevel1, background: C.white }
                }>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg opacity-30 group-hover:opacity-60 transition-opacity" style={{ fontFamily: "JetBrains Mono, monospace" }}>{s.num}</span>
                  <span className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider"
                    style={ s.highlight ? { background: `${C.embsPurple}15`, color: C.embsPurple } : { background: C.softBlue, color: C.ieeeBlue }}>
                    {s.tag}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold group-hover:scale-105 transition-transform origin-left" style={{ color: C.ieeeBlue, fontFamily: "JetBrains Mono, monospace" }}>
                  <Clock className="w-3.5 h-3.5" /> {s.time}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm" style={{ color: C.navy }}>{s.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: C.slate }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Integrity ── */}
        <section className="py-24 max-w-[1280px] mx-auto px-4 sm:px-8">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl group transition-transform duration-700 ease-out"
            style={{ background: `linear-gradient(135deg, #FFFFFF 0%, ${C.softBlue} 100%)`, border: `1px solid ${C.border}`, transform: `translate(${mouse.nX * -5}px, ${mouse.nY * -5}px)` }}>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 group-hover:scale-110 transition-transform duration-1000" style={{ background: `radial-gradient(circle, ${C.ieeeBlue} 0%, transparent 70%)`, filter:"blur(80px)", transform:"translate(30%, -30%)" }} />
            <div className="relative z-10 space-y-8 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                style={{ background: `${C.ieeeBlue}15`, color: C.ieeeBlue }}>
                <Shield className="w-4 h-4" /> Integrity Architecture
              </div>
              <h2 className="text-3xl sm:text-5xl font-black" style={{ fontFamily: "Sora, sans-serif", color: C.navy }}>
                Why OptiForge Cannot Simply Be "Prompted" Into a Win
              </h2>
              <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.slate }}>
                Most engineering competitions collapse when participants paste problem prompts into LLMs. OptiForge is explicitly engineered with multiple defensive layers to evaluate genuine computational intelligence intuition and engineering skill.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title:"Hidden Scenario Shifts",      color:C.cyan,      desc:"Static prompt solutions break during 2nd Development when dynamic perturbations are injected into test data." },
                  { title:"AI Evaluation & Reflection",  color:C.aiPurple,  desc:"1st Development solutions undergo automated AI scoring. Teams submit reflection notes on parameter adaptation." },
                  { title:"Live Patch Agility",          color:C.warning,   desc:"A surprise constraint during 2nd Development tests real-time code refactoring and mental model clarity." },
                  { title:"Final Panel Defense",         color:C.ieeeBlue,  desc:"Expert faculty judges rigorously question teams on algorithmic representations and convergence." },
                ].map((d,i) => (
                  <div key={i} className="p-6 rounded-2xl space-y-3 transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: C.white, border: `1px solid ${C.border}` }}>
                    <div className="flex items-center gap-3 font-bold" style={{ color: d.color }}>
                      <CheckCircle2 className="w-5 h-5" /> {d.title}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: C.slate }}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 max-w-3xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black" style={{ fontFamily: "Sora, sans-serif", color: C.navy }}>Rules & FAQ</h2>
            <p className="text-base" style={{ color: C.slate }}>Everything you need to know before registering.</p>
          </div>
          <div className="space-y-4">
            {[
              { q:"Who can participate?", a:"Any registered student from any institution in India. A team of 2–4 members is required. No prior competition experience needed." },
              { q:"What is the registration fee?", a:"₹100 per team member, payable at the venue on the day of the event." },
              { q:"How is scoring done?", a:"Multi-metric scoring: automated solution quality (fitness score), runtime efficiency, AST structure analysis, and AI evaluation feedback." },
            ].map((f,i) => (
              <motion.div key={i} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:.4,delay:i*.05}}
                className="rounded-2xl p-6 space-y-3 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ background: C.white, border: `1px solid ${C.border}` }}>
                <h4 className="font-bold text-base" style={{ color: C.navy }}>{f.q}</h4>
                <p className="text-sm leading-relaxed" style={{ color: C.slate }}>{f.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-32 max-w-[1280px] mx-auto px-4 sm:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-6xl font-black" style={{ fontFamily: "Sora, sans-serif", color: C.navy }}>Ready to Compete?</h2>
          <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: C.slate }}>
            Register your team of 2–4 members. ₹100 per member, payable at the venue on 30 September 2026.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="https://optiforge-2026.vercel.app/register" target="_blank" rel="noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-base text-white transition-all hover:scale-105 active:scale-95 shadow-lg overflow-hidden relative"
              style={{ background: C.ieeeBlue }}>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2">Register Now (₹100/member) <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            </a>
            <a href="https://optiforge-2026.vercel.app/" target="_blank" rel="noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-5 rounded-2xl text-base font-bold transition-all hover:scale-105 shadow-sm hover:shadow-md"
              style={{ background: C.white, border: `2px solid ${C.ieeeBlue}`, color: C.ieeeBlue }}>
              <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Visit OptiForge Portal
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
