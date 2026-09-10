import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, Download, Search, FileText, Activity, Network, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import TiltCard from '../components/ui/TiltCard';

export default function Resources() {
  const [resources, setResources] = useState(DEFAULT_SITE_DATA.resources);
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const categories = ['all', ...new Set(resources.map(r => r.category || 'General Resource'))];

  const filteredResources = resources.filter(r => {
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
                          (r.description && r.description.toLowerCase().includes(search.toLowerCase())) ||
                          (r.category && r.category.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
            <Network className="w-3.5 h-3.5 animate-pulse text-embs-blue" />
            <span>Interactive Biomedical Knowledge Network</span>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Controls: Search + Cluster Filter Nodes */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Node Category Clusters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition font-mono ${
                  selectedCategory === cat
                    ? 'bg-embs-blue text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Clusters' : cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input 
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter nodes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-embs-blue shadow-sm"
            />
          </div>

        </div>

        {/* Resource Cards with Spatial Tilt */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16 bright-card rounded-3xl p-8">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No Resources Found</h3>
            <p className="text-slate-500 text-sm mt-1">Try searching another term or resetting the cluster filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((res, idx) => (
              <TiltCard 
                key={res.id || idx}
                maxTilt={4}
                className="bright-card rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-bright hover:shadow-bright-hover group border border-slate-200/80 transition-all"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-embs-blue uppercase tracking-wider block">
                    {res.category || 'General Resource'}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-embs-blue transition">{res.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{res.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-embs-blue hover:bg-ieee-dark transition shadow-sm"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] font-mono text-slate-400">IEEE Xplore Verified</span>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

      </section>

    </div>
  );
}
