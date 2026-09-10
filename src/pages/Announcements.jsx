import React, { useState, useEffect } from 'react';
import { Megaphone, Pin, Calendar, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(DEFAULT_SITE_DATA.announcements);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const snap = await getDocs(query(collection(db, 'announcements'), orderBy('date', 'desc')));
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setAnnouncements(list);
        }
      } catch (err) {
        console.log("Using default announcements dataset:", err);
      }
    }
    loadAnnouncements();
  }, []);

  const pinned = announcements.filter(a => a.isPinned);
  const regular = announcements.filter(a => !a.isPinned);

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-400/30 text-xs font-mono text-sky-400">
            <Megaphone className="w-3.5 h-3.5 animate-pulse" />
            <span>Official Chapter Dispatches</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold">Announcements & News</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Stay updated with chapter results, event registration deadlines, competition notices, and society achievements.
          </p>
        </motion.div>
      </section>

      {/* Main Feed */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Pinned Announcements */}
        {pinned.map(item => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="specular-card rounded-3xl p-6 sm:p-8 border-2 border-sky-400/50 shadow-2xl space-y-4 hover-card-lift"
          >
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-ieee-blue text-white flex items-center gap-1.5 shadow-sm border border-sky-400/40">
                <Pin className="w-3.5 h-3.5" /> Pinned Bulletin
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-sky-400" /> {item.date}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {item.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {item.body}
            </p>
          </motion.div>
        ))}

        {/* Regular Announcements */}
        {regular.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="specular-card rounded-3xl p-6 sm:p-8 space-y-3 hover-card-lift"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">Dispatched Notice</span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-sky-400" /> {item.date}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {item.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {item.body}
            </p>
          </motion.div>
        ))}

      </section>

    </div>
  );
}
