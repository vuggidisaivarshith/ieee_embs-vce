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
            <BookOpen className="w-3.5 h-3.5 animate-pulse" />
            <span>Academic & Research Repository</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold">Student & Member Resources</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
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
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-xl backdrop-blur-md"
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
              className="specular-card rounded-3xl p-6 flex flex-col justify-between space-y-4 hover-card-lift group"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
                  {res.category || 'General Resource'}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition">{res.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{res.description}</p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-ieee-blue hover:bg-ieee-dark transition shadow-md border border-sky-400/30"
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
