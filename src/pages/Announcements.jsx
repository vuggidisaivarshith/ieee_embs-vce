import React, { useState, useEffect } from 'react';
import { Megaphone, Pin, Calendar, ArrowRight } from 'lucide-react';
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
      <section className="bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold">Announcements & News</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            Stay updated with chapter results, event registration deadlines, competition notices, and society achievements.
          </p>
        </div>
      </section>

      {/* Main Feed */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        
        {/* Pinned Announcements */}
        {pinned.map(item => (
          <div 
            key={item.id}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-ieee-blue relative overflow-hidden space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-ieee-blue text-white flex items-center gap-1.5 shadow-sm">
                <Pin className="w-3.5 h-3.5" /> Pinned Update
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {item.date}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {item.title}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {item.body}
            </p>
          </div>
        ))}

        {/* Regular Announcements */}
        {regular.map(item => (
          <div 
            key={item.id}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-embs-purple uppercase tracking-wider">News Update</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {item.date}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {item.title}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {item.body}
            </p>
          </div>
        ))}

      </section>

    </div>
  );
}
