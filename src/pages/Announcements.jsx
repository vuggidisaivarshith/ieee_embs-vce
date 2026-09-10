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
    <div className="pt-24 pb-20 bg-slate-50 text-slate-800 min-h-screen">
      
      {/* Header */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-purple-500/5 to-transparent pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-mono font-bold text-embs-blue shadow-sm">
            <Megaphone className="w-3.5 h-3.5 animate-pulse text-embs-blue" />
            <span>Official Chapter Dispatches</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Announcements & News
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
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
            className="bright-card rounded-3xl p-6 sm:p-8 border-2 border-embs-blue/60 shadow-bright space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-embs-blue text-white flex items-center gap-1.5 shadow-sm">
                <Pin className="w-3.5 h-3.5" /> Pinned Bulletin
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-mono font-medium">
                <Calendar className="w-3.5 h-3.5 text-embs-blue" /> {item.date}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {item.title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
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
            className="bright-card rounded-3xl p-6 sm:p-8 space-y-3 shadow-bright hover:shadow-bright-hover transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-embs-purple uppercase tracking-wider font-mono">Dispatched Notice</span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-mono font-medium">
                <Calendar className="w-3.5 h-3.5 text-embs-blue" /> {item.date}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {item.title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {item.body}
            </p>
          </motion.div>
        ))}

      </section>

    </div>
  );
}
