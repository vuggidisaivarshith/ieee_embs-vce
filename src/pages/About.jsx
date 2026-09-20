import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";
import { resolveImage } from "../utils/resolveImage";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

export default function About() {
  const [settings, setSettings] = useState(DEFAULT_SITE_DATA.siteSettings);
  useEffect(() => {
    getDoc(doc(db, "siteSettings", "singletonDoc"))
      .then(s => { if (s.exists()) setSettings(p => ({ ...p, ...s.data() })); })
      .catch(() => {});
  }, []);
  const handleImgError = e => { e.currentTarget.onerror = null; e.currentTarget.src = resolveImage("/assets/embs-logo.png"); };

  const values = [
    { num: "01", title: "Our Vision", desc: "To be a premier student society fostering breakthrough innovation at the intersection of biological science, engineering, and digital healthcare.", tag: "Clinical Breakthroughs" },
    { num: "02", title: "Our Mission", desc: "To bridge academic engineering concepts with real-world clinical needs through hands-on technical workshops, symposia, and global IEEE research.", tag: "Translational Engineering" },
    { num: "03", title: "Continuous Learning", desc: "Equipping student researchers with cutting-edge knowledge in neural engineering, medical signal processing, genomics, and telemedicine standards.", tag: "Advanced Research" },
    { num: "04", title: "Collaborative Community", desc: "Cultivating a multidisciplinary ecosystem connecting biomedical engineers, clinicians, computer scientists, and healthcare industry leaders.", tag: "Global IEEE Network" },
  ];

  const milestones = [
    { year: "2021", title: "Chapter Founded", desc: "IEEE EMBS Vardhaman chapter officially chartered under the IEEE Hyderabad Section." },
    { year: "2022", title: "First Symposium", desc: "Inaugural biomedical engineering national symposium with 100+ attendees." },
    { year: "2023", title: "100+ Members", desc: "Crossed 100 active student researchers and innovators." },
    { year: "2024", title: "Expert Keynotes", desc: "International speaker series and dedicated workshop series launched." },
    { year: "2025", title: "Healthcare AI Focus", desc: "Chapter pivots to AI-driven diagnostics and telemedicine systems." },
    { year: "2026", title: "Dr. Ajit Kumar Keynote", desc: "Landmark expert talk on Digital Health and Telemedicine Architectures." },
  ];

  return (
    <div style={{ backgroundColor: "#F2F8FA", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)", borderBottom: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl space-y-6">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-[#087F8C]" />
              <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">IEEE EMBS Vardhaman · Chapter Overview</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-[#172121] tracking-tight leading-tight" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>
              About IEEE EMBS<br />Vardhaman
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#647070] text-lg leading-relaxed">
              Engineering in Medicine and Biology Society — Empowering the next generation of biomedical innovators, researchers, and clinical engineers at Vardhaman College of Engineering, Hyderabad.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-8 pt-2">
              {[{ v: "50+", l: "Active Members" }, { v: "6+", l: "Events Hosted" }, { v: "3+", l: "Years Active" }].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-[#172121]">{s.v}</div>
                  <div className="text-[11px] font-mono uppercase tracking-wide text-[#647070] mt-0.5">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Core Values</span>
          </div>
          <div className="space-y-3">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-start gap-6 p-6 bg-white border border-[#DDE4E1] rounded-xl hover:border-[#087F8C]/35 hover:shadow-card transition-all"
              >
                <span className="text-[11px] font-black font-mono text-[#DDE4E1] group-hover:text-[#087F8C] transition-colors pt-0.5 flex-shrink-0">{v.num}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-1.5">
                    <h3 className="text-base font-bold text-[#172121] group-hover:text-[#087F8C] transition-colors">{v.title}</h3>
                    <span className="text-[10px] font-mono font-bold text-[#087F8C] bg-[#087F8C]/6 border border-[#087F8C]/12 px-2.5 py-0.5 rounded uppercase tracking-wide flex-shrink-0">{v.tag}</span>
                  </div>
                  <p className="text-[#647070] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Thin rule */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8"><div className="h-px bg-black/6" /></div>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-[#087F8C]" />
              <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Chapter History</span>
            </div>
            <h2 className="text-3xl font-bold text-[#172121]">Our Timeline</h2>
            <p className="text-[#647070] mt-2 max-w-xl">A chronological record of milestones, discoveries, and growth in biomedical engineering at Vardhaman.</p>
          </div>

          <div className="relative pl-6 border-l-2 border-[#DDE4E1] space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Node */}
                <div className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full border-2 border-[#087F8C] bg-white" />
                <div className="bg-[#F8F7F2] border border-[#DDE4E1] rounded-xl p-5 hover:border-[#087F8C]/30 hover:shadow-card transition-all">
                  <span className="text-[11px] font-black font-mono text-[#087F8C] uppercase tracking-widest block mb-1">{m.year}</span>
                  <h4 className="text-base font-bold text-[#172121]">{m.title}</h4>
                  <p className="text-sm text-[#647070] mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-20" style={{ backgroundColor: "#F2F8FA" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-xl p-8 sm:p-12 shadow-card"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-[#087F8C]" />
                  <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Leadership & Mentorship</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#172121]">Faculty Advisor & Chapter Coordinator</h2>
                <p className="text-[#647070] leading-relaxed">Under the visionary mentorship of our faculty advisor, IEEE EMBS Vardhaman provides students direct access to medical instrumentation labs, clinical simulation software, and international IEEE networking opportunities.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Advanced Bio-Signal Laboratory", "IEEE Global Research Collaborations", "Healthcare AI & Telemedicine Focus", "Student Leadership Mentorship"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#087F8C] flex-shrink-0" />
                      <span className="text-sm text-[#172121] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 bg-[#F8F7F2] border border-[#DDE4E1] rounded-xl p-6 flex items-center gap-5">
                <img src={resolveImage(settings.facultyPhoto || "/assets/faculty.jpeg")} alt={settings.facultyName} onError={handleImgError} className="w-20 h-20 rounded-lg object-cover border border-[#DDE4E1] flex-shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-[#172121]">{settings.facultyName}</h4>
                  <p className="text-xs font-semibold text-[#087F8C]">{settings.facultyRole}</p>
                  <p className="text-xs text-[#647070] mt-0.5">{settings.facultyDept}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}


