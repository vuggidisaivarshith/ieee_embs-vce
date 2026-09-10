import React, { useState, useEffect, useRef } from "react";
import { Target, Compass, BookOpen, Users, Activity, CheckCircle2, Dna } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";
import { resolveImage } from "../utils/resolveImage";
import TiltCard from "../components/ui/TiltCard";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
};

export default function About() {
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_DATA.siteSettings);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    async function loadAbout() {
      try {
        const snap = await getDoc(doc(db, "siteSettings", "singletonDoc"));
        if (snap.exists()) setSiteSettings(prev => ({ ...prev, ...snap.data() }));
      } catch (err) {
        console.log("Using default about page settings");
      }
    }
    loadAbout();
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = resolveImage("/assets/embs-logo.png");
  };

  const values = [
    { icon: Target, title: "Our Vision", desc: "To be a premier student society fostering breakthrough innovation at the intersection of biological science, engineering, and digital healthcare.", impact: "Clinical Breakthroughs", color: "text-embs-purple", gradientFrom: "from-purple-500/20", gradientTo: "to-indigo-500/5", border: "hover:border-embs-purple/40", dot: "bg-embs-purple" },
    { icon: Compass, title: "Our Mission", desc: "To bridge academic engineering concepts with real-world clinical needs through hands-on technical workshops, symposia, and global IEEE research.", impact: "Translational Engineering", color: "text-bio-red", gradientFrom: "from-rose-500/20", gradientTo: "to-orange-500/5", border: "hover:border-bio-red/40", dot: "bg-bio-red" },
    { icon: BookOpen, title: "Continuous Learning", desc: "Equipping student researchers with cutting-edge knowledge in neural engineering, medical signal processing, genomics, and telemedicine standards.", impact: "Advanced Bio-Signal Lab", color: "text-embs-blue", gradientFrom: "from-sky-500/20", gradientTo: "to-cyan-500/5", border: "hover:border-embs-blue/40", dot: "bg-embs-blue" },
    { icon: Users, title: "Collaborative Community", desc: "Cultivating a multidisciplinary ecosystem connecting biomedical engineers, clinicians, computer scientists, and healthcare industry leaders.", impact: "Global IEEE Network", color: "text-clinical-green", gradientFrom: "from-emerald-500/20", gradientTo: "to-teal-500/5", border: "hover:border-clinical-green/40", dot: "bg-clinical-green" }
  ];

  const milestones = [
    { year: "2021", label: "Chapter Founded", desc: "IEEE EMBS Vardhaman chapter officially chartered." },
    { year: "2022", label: "First Symposium", desc: "Inaugural biomedical engineering national symposium." },
    { year: "2023", label: "100+ Members", desc: "Crossed 100 active student researchers and innovators." },
    { year: "2024", label: "Expert Keynotes", desc: "International speaker series and workshop launches." },
    { year: "2025", label: "Healthcare AI", desc: "Focus pivot to AI-driven diagnostics and telemedicine." },
    { year: "2026", label: "Dr. Ajit Kumar", desc: "Expert talk on Digital Health and Telemedicine Architectures." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B16] text-slate-800 dark:text-slate-100">

      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/8 via-sky-500/5 to-transparent pointer-events-none" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, ease: "linear", repeat: Infinity }} className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-embs-purple/10 pointer-events-none" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, ease: "linear", repeat: Infinity }} className="absolute -top-16 -right-16 w-[350px] h-[350px] rounded-full border border-embs-blue/8 pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6 max-w-4xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/90 border border-purple-300/40 dark:border-purple-500/20 backdrop-blur-md text-xs font-mono font-bold text-embs-purple shadow-sm">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Cellular Histology · Chapter Anatomy · Living System</span>
              <span className="w-1.5 h-1.5 rounded-full bg-clinical-green animate-ping" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06]">
              <span className="text-slate-900 dark:text-white">About IEEE</span>{" "}
              <span className="bg-gradient-to-r from-embs-purple via-embs-blue to-embs-cyan bg-clip-text text-transparent">EMBS Vardhaman</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-slate-600 dark:text-slate-300 text-base sm:text-xl leading-relaxed max-w-2xl font-light">
              Engineering in Medicine and Biology Society — Empowering the next generation of{" "}
              <span className="font-semibold text-slate-800 dark:text-white">biomedical innovators</span>, researchers, and clinical engineers at Vardhaman College.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 pt-2">
              {[{ val: "50+", label: "Active Members", color: "text-embs-blue" }, { val: "6+", label: "Events Hosted", color: "text-embs-purple" }, { val: "3+", label: "Years Active", color: "text-embs-cyan" }].map((s, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className={`text-3xl font-black ${s.color}`}>{s.val}</span>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <motion.div key={idx} variants={fadeUp}>
                <TiltCard maxTilt={5} className={`bright-card dark:bg-slate-900/80 p-6 rounded-3xl space-y-4 ${v.border} transition-all group flex flex-col justify-between h-full`}>
                  <div className="space-y-3">
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${v.gradientFrom} ${v.gradientTo} flex items-center justify-center border border-slate-100 dark:border-white/10 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${v.color}`} />
                      <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${v.dot} opacity-70`} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-embs-blue dark:group-hover:text-sky-400 transition-colors">{v.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                    <span>{v.impact}</span>
                    <span className={`w-2 h-2 rounded-full ${v.dot} animate-pulse`} />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Chapter Timeline */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">
          <div className="text-center space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-embs-blue/10 dark:bg-embs-blue/15 text-embs-blue border border-embs-blue/20 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
              <Dna className="w-3.5 h-3.5" /> Chapter Genome · Historical Sequence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Our Chapter Timeline</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">A chronological record of milestones, discoveries, and growth in biomedical engineering at Vardhaman.</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-embs-blue/40 via-embs-purple/40 to-embs-cyan/20 hidden md:block" />
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-8">
              {milestones.map((m, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="bright-card dark:bg-slate-900/70 p-5 rounded-2xl group hover:border-embs-blue/40 transition-all">
                    <span className="text-xs font-black font-mono text-embs-cyan uppercase tracking-widest block mb-1">{m.year}</span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-embs-blue dark:group-hover:text-sky-400 transition-colors">{m.label}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Faculty Coordinator */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="bright-card dark:bg-slate-900/80 p-8 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="text-xs font-mono font-bold text-embs-purple uppercase tracking-widest block">Leadership & Mentorship</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Faculty Advisor & Chapter Coordinator</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">Under the visionary mentorship of our faculty advisor and departmental leadership, IEEE EMBS Vardhaman provides students with direct access to state-of-the-art medical instrumentation labs, clinical simulation software, and international IEEE networking opportunities.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {["Advanced Bio-Signal Laboratory", "IEEE Global Research Collaborations", "Healthcare AI & Telemedicine Focus", "Student Leadership Mentorship"].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-clinical-green flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-inner flex items-center gap-4">
              <img src={resolveImage(siteSettings.facultyPhoto || "/assets/faculty.jpeg")} alt={siteSettings.facultyName} onError={handleImgError} className="w-20 h-20 rounded-2xl object-cover border-2 border-embs-purple shadow-md flex-shrink-0" />
              <div className="space-y-0.5">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{siteSettings.facultyName}</h4>
                <p className="text-xs font-semibold text-embs-purple">{siteSettings.facultyRole}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{siteSettings.facultyDept}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
