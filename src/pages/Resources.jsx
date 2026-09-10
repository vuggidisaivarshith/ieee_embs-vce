import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, Download, Search, FileText, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';

export default function Resources() {
  const [resources, setResources] = useState(DEFAULT_SITE_DATA.resources);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadResources() {
      try {
        const snap = await getDocs(collection(db, 'resources'));
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setResources(list);
        }
      } catch (err) {
        console.log("Using default resources dataset:", err);
      }
    }
    loadResources();
  }, []);

  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    (r.category && r.category.toLowerCase().includes(search.toLowerCase()))
  );

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
            <BookOpen className="w-3.5 h-3.5 animate-pulse text-embs-blue" />
            <span>Academic & Research Repository</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Student & Member Resources
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Quick links to IEEE Xplore, journals, student grants, career portals, and downloadable study materials.
          </p>
        </motion.div>
      </section>

      {/* Main Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Search */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search resources by title or category..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-embs-blue shadow-sm"
          />
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res, idx) => (
            <motion.div 
              key={res.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bright-card rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-bright hover:shadow-bright-hover group border border-slate-200/80 transition-all"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-embs-blue uppercase tracking-wider block">
                  {res.category || 'General Resource'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-embs-blue transition">{res.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{res.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-embs-blue hover:bg-ieee-dark transition shadow-sm"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

    </div>
  );
}
