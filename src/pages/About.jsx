import React, { useState, useEffect } from 'react';
import { Target, Compass, BookOpen, Users, Award, ShieldCheck, HeartPulse, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import { resolveImage } from '../utils/resolveImage';

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
      color: "text-sky-400"
    },
    {
      icon: Compass,
      title: "Our Mission",
      desc: "To bridge academic engineering concepts with real-world clinical needs through hands-on technical workshops, symposia, and global IEEE research.",
      color: "text-rose-400"
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      desc: "Equipping student researchers with cutting-edge knowledge in neural engineering, medical signal processing, genomics, and telemedicine standards.",
      color: "text-purple-400"
    },
    {
      icon: Users,
      title: "Collaborative Community",
      desc: "Cultivating a multidisciplinary ecosystem connecting biomedical engineers, clinicians, computer scientists, and healthcare industry leaders.",
      color: "text-emerald-400"
    }
  ];

  return (
    <div className="pt-24 pb-20">
      
      {/* Hero Header Banner */}
      <section className="py-16 text-white text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-400/30 text-xs font-mono text-sky-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Cellular Matrix Histology Environment</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold">About IEEE EMBS Vardhaman</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Engineering in Medicine and Biology Society — Empowering the next generation of biomedical innovators, researchers, and clinical engineers.
          </p>
        </motion.div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Core Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="specular-card p-6 rounded-3xl space-y-3 hover-card-lift"
              >
                <div className={`w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/10 ${v.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{v.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Chapter Overview & Coordinator Showcase */}
        <div className="specular-card p-8 sm:p-12 rounded-3xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block">Leadership & Mentorship</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Faculty Advisor & Coordinator</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Under the visionary mentorship of our faculty advisor and departmental leadership, IEEE EMBS Vardhaman provides students with access to state-of-the-art medical instrumentation labs, clinical simulation software, and international IEEE networking opportunities.
              </p>
            </div>

            <div className="lg:col-span-4 flex items-center gap-4 bg-slate-900/90 p-5 rounded-2xl border border-white/15">
              <img 
                src={resolveImage(siteSettings.facultyPhoto || '/assets/faculty.jpeg')} 
                alt={siteSettings.facultyName} 
                onError={handleImgError}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-400 shadow-md flex-shrink-0"
              />
              <div>
                <h4 className="text-base font-bold text-white">{siteSettings.facultyName}</h4>
                <p className="text-xs font-semibold text-sky-400">{siteSettings.facultyRole}</p>
                <p className="text-[11px] text-slate-400">{siteSettings.facultyDept}</p>
              </div>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
