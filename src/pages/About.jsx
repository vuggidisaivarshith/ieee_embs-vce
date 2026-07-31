import React, { useState, useEffect } from 'react';
import { Target, Heart, Award, Shield, BookOpen, UserCheck } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';

export default function About() {
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_DATA.siteSettings);

  useEffect(() => {
    async function loadAboutData() {
      try {
        const settingsSnap = await getDoc(doc(db, 'siteSettings', 'singletonDoc'));
        if (settingsSnap.exists()) {
          setSiteSettings(prev => ({ ...prev, ...settingsSnap.data() }));
        }
      } catch (err) {
        console.log("Using default fallback for About page");
      }
    }
    loadAboutData();
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/assets/embs-logo.png";
  };

  return (
    <div className="pt-24 pb-20 animate-fade-in">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange text-white py-16 animate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">About Our Chapter</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto">
            Empowering students at Vardhaman College of Engineering to explore biomedical technologies, digital health systems, and healthcare engineering innovations.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 hover-card-lift animate-slide-up">
            <div className="p-3 bg-ieee-blue/10 text-ieee-blue rounded-2xl w-fit mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Chapter Mission</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {siteSettings.missionStatement}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 hover-card-lift animate-slide-up">
            <div className="p-3 bg-embs-purple/10 text-embs-purple rounded-2xl w-fit mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">IEEE EMBS Parent Society</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              IEEE Engineering in Medicine and Biology Society (EMBS) is the world's largest international society of biomedical engineers, with over 12,000 members across 97 countries.
            </p>
          </div>

        </div>
      </section>

      {/* Faculty Coordinator Highlight */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-10 hover-card-lift animate-slide-up">
            <img 
              src={siteSettings.facultyPhoto || "/assets/faculty.jpeg"} 
              alt={siteSettings.facultyName}
              onError={handleImgError}
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl object-cover border-4 border-ieee-blue shadow-xl flex-shrink-0"
            />
            <div className="space-y-4 text-center md:text-left">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-ieee-blue/10 text-ieee-blue dark:bg-ieee-blue/20 dark:text-sky-400 uppercase tracking-wider">
                Faculty Coordinator
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{siteSettings.facultyName}</h2>
              <p className="text-sm font-semibold text-ieee-blue dark:text-sky-400">{siteSettings.facultyRole}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{siteSettings.facultyDept}</p>
              <blockquote className="text-slate-600 dark:text-slate-300 text-sm italic leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-700">
                "{siteSettings.facultyQuote}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
