import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, CheckCircle, ExternalLink } from 'lucide-react';
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
      <section className="bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold">Chapter Achievements</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            Honoring student research accomplishments, national hackathon titles, and IEEE section recognitions.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, idx) => (
            <div 
              key={item.id || idx}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4 relative overflow-hidden group hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center justify-between">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: item.categoryColor || '#00629B' }}
                >
                  {item.category || 'Recognition'}
                </span>
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-ieee-blue transition">
                {item.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {item.description}
              </p>

              {item.date && (
                <p className="text-xs text-slate-400 font-medium pt-2 border-t border-slate-100 dark:border-slate-700">
                  Awarded: {item.date}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
