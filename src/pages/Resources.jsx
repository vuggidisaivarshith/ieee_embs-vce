import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, Download, Search, FileText } from 'lucide-react';
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
      <section className="bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold">Student & Member Resources</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            Quick links to IEEE Xplore, journals, student grants, career portals, and downloadable study materials.
          </p>
        </div>
      </section>

      {/* Main Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search resources by title or category..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-ieee-blue shadow-sm"
          />
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res, idx) => (
            <div 
              key={res.id || idx}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-4 hover:shadow-xl transition"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-ieee-blue uppercase tracking-wider block">
                  {res.category || 'General Resource'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{res.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{res.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-ieee-blue hover:bg-ieee-dark transition shadow-md"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
