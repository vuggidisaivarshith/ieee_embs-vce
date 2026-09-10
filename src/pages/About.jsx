import React, { useState, useEffect } from 'react';
import { Target, Compass, BookOpen, Users, Award, ShieldCheck, HeartPulse, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import { resolveImage } from '../utils/resolveImage';

import TiltCard from '../components/ui/TiltCard';

export default function About() {
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_DATA.siteSettings);

  useEffect(() => {
    async function loadAbout() {
      try {
        const snap = await getDoc(doc(db, 'siteSettings', 'singletonDoc'));
        if (snap.exists()) {
          setSiteSettings(prev => ({ ...prev, ...snap.data() }));
        }
      } catch (err) {
        console.log("Using default about page settings");
      }
    }
    loadAbout();
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = resolveImage('/assets/embs-logo.png');
  };

  const values = [
    {
      icon: Target,
      title: "Our Vision",
      desc: "To be a premier student society fostering breakthrough innovation at the intersection of biological science, engineering, and digital healthcare.",
      impact: "Clinical Breakthroughs",
      color: "text-embs-purple",
      bg: "bg-purple-50",
      border: "hover:border-embs-purple/40"
    },
    {
      icon: Compass,
      title: "Our Mission",
      desc: "To bridge academic engineering concepts with real-world clinical needs through hands-on technical workshops, symposia, and global IEEE research.",
      impact: "Translational Engineering",
      color: "text-bio-red",
      bg: "bg-rose-50",
      border: "hover:border-bio-red/40"
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      desc: "Equipping student researchers with cutting-edge knowledge in neural engineering, medical signal processing, genomics, and telemedicine standards.",
      impact: "Advanced Bio-Signal Lab",
      color: "text-embs-blue",
      bg: "bg-sky-50",
      border: "hover:border-embs-blue/40"
    },
    {
      icon: Users,
      title: "Collaborative Community",
      desc: "Cultivating a multidisciplinary ecosystem connecting biomedical engineers, clinicians, computer scientists, and healthcare industry leaders.",
      impact: "Global IEEE Network",
      color: "text-clinical-green",
      bg: "bg-emerald-50",
      border: "hover:border-clinical-green/40"
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 text-slate-800 min-h-screen">
      
      {/* Hero Header Banner */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-sky-500/5 to-transparent pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 text-xs font-mono font-bold text-embs-purple shadow-sm">
            <Activity className="w-3.5 h-3.5 animate-pulse text-embs-purple" />
            <span>Cellular Histology Transformation Active</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About IEEE EMBS Vardhaman
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Engineering in Medicine and Biology Society — Empowering the next generation of biomedical innovators, researchers, and clinical engineers.
          </p>
        </motion.div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Core Values Cards with Spatial Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <TiltCard
                key={idx}
                maxTilt={5}
                className={`bright-card p-6 rounded-3xl space-y-4 ${v.border} transition-all group flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl ${v.bg} ${v.color} flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{v.desc}</p>
                </div>
                
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 group-hover:text-slate-800">
                  <span>{v.impact}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-clinical-green"></span>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Chapter Overview & Coordinator Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bright-card p-8 sm:p-12 rounded-3xl space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold text-embs-purple uppercase tracking-widest block">
                Leadership & Mentorship
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Faculty Advisor & Chapter Coordinator
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Under the visionary mentorship of our faculty advisor and departmental leadership, IEEE EMBS Vardhaman provides students with direct access to state-of-the-art medical instrumentation labs, clinical simulation software, and international IEEE networking opportunities.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Advanced Bio-Signal Laboratory",
                  "IEEE Global Research Collaborations",
                  "Healthcare AI & Telemedicine Focus",
                  "Student Leadership Mentorship"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-clinical-green flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-inner flex items-center gap-4">
              <img 
                src={resolveImage(siteSettings.facultyPhoto || '/assets/faculty.jpeg')} 
                alt={siteSettings.facultyName} 
                onError={handleImgError}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-embs-purple shadow-md flex-shrink-0"
              />
              <div className="space-y-0.5">
                <h4 className="text-base font-bold text-slate-900">{siteSettings.facultyName}</h4>
                <p className="text-xs font-semibold text-embs-purple">{siteSettings.facultyRole}</p>
                <p className="text-[11px] text-slate-500">{siteSettings.facultyDept}</p>
              </div>
            </div>

          </div>
        </motion.div>

      </section>

    </div>
  );
}
