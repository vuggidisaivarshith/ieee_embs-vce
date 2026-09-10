import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, CheckCircle, ExternalLink, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';

export default function Achievements() {
  const [achievements, setAchievements] = useState(DEFAULT_SITE_DATA.achievements);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const snap = await getDocs(collection(db, 'achievements'));
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setAchievements(list);
        }
      } catch (err) {
        console.log("Using default achievements dataset:", err);
      }
    }
    loadAchievements();
  }, []);

  return (
    <div className="pt-24 pb-20">
      
      {/* Header */}
      <section className="py-16 text-white text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-400/30 text-xs font-mono text-amber-400">
            <Trophy className="w-3.5 h-3.5 animate-pulse" />
            <span>Honors & Recognitions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold">Chapter Achievements</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Honoring student research accomplishments, national hackathon titles, and IEEE section recognitions.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, idx) => (
            <motion.div 
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="specular-card rounded-3xl p-8 space-y-4 hover-card-lift flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span 
                    className="px-3 py-1 rounded-full text-[11px] font-mono font-bold text-white shadow-sm"
                    style={{ backgroundColor: item.categoryColor || '#00629B' }}
                  >
                    {item.category || 'Recognition'}
                  </span>
                  <Trophy className="w-6 h-6 text-amber-400" />
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.date && (
                <p className="text-xs text-slate-400 font-mono pt-4 border-t border-white/10">
                  Awarded: {item.date}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
