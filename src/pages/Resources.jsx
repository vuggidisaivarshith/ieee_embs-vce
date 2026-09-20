import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, Download, Search, FileText, Activity, Network, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';

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
    <div style={{ backgroundColor: "#F2F8FA", minHeight: "100vh" }}>
      
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)", borderBottom: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)" }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-4 relative z-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Interactive Biomedical Knowledge Network</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#172121] tracking-tight" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>
            Student &amp; Member Resources
          </h1>
          <p className="text-[#647070] text-lg max-w-2xl leading-relaxed">
            Curated repositories, research papers, IEEE Xplore digital portals, student grants, and biomedical engineering guides.
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
                    ? 'bg-[#087F8C] text-white shadow-md'
                    : 'glass-card text-[#647070] hover:text-[#172121]'
                }`}
              >
                {cat === 'all' ? 'All Clusters' : cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#647070]" />
            <input 
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter nodes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-card text-[#172121] placeholder-[#647070] text-sm focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
            />
          </div>

        </div>

        {/* Resource Cards with Apple Glass */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl p-8">
            <BookOpen className="w-12 h-12 text-[#647070] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#172121]">No Resources Found</h3>
            <p className="text-[#647070] text-sm mt-1">Try searching another term or resetting the cluster filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((res, idx) => (
              <div 
                key={res.id || idx}
                className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#087F8C] uppercase tracking-wider block">
                    {res.category || 'General Resource'}
                  </span>
                  <h3 className="text-lg font-bold text-[#172121] group-hover:text-[#087F8C] transition">{res.title}</h3>
                  <p className="text-[#647070] text-xs leading-relaxed">{res.description}</p>
                </div>

                <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 shadow-sm"
                    style={{ background: "linear-gradient(160deg, #0A8F9C 0%, #087F8C 100%)" }}
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] font-mono text-[#647070]">IEEE Xplore Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

    </div>
  );
}
