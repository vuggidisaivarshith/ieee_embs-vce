import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Users, Shield, Award, Activity, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import { resolveImage } from '../utils/resolveImage';

export default function Team() {
  const defaultList = DEFAULT_SITE_DATA.teamMembers || DEFAULT_SITE_DATA.team || [];
  const [teamMembers, setTeamMembers] = useState(defaultList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        let list = [];
        const snapTeam = await getDocs(collection(db, 'team'));
        if (!snapTeam.empty) {
          list = snapTeam.docs.map(d => ({ id: d.id, ...d.data() }));
        } else {
          const snapMembers = await getDocs(collection(db, 'teamMembers'));
          if (!snapMembers.empty) {
            list = snapMembers.docs.map(d => ({ id: d.id, ...d.data() }));
          }
        }
        
        if (list && list.length > 0) {
          setTeamMembers(list);
        } else {
          setTeamMembers(defaultList);
        }
      } catch (err) {
        console.log("Using default team list:", err);
        setTeamMembers(defaultList);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = resolveImage('/assets/chair.jpeg');
  };

  const safeTeam = Array.isArray(teamMembers) && teamMembers.length > 0 ? teamMembers : defaultList;
  const faculty = safeTeam.filter(m => m.category === 'faculty' || m.role?.toLowerCase().includes('faculty') || m.role?.toLowerCase().includes('coordinator'));
  const students = safeTeam.filter(m => m.category !== 'faculty' && !m.role?.toLowerCase().includes('faculty') && !m.role?.toLowerCase().includes('coordinator'));

  return (
    <div className="pt-24 pb-20 bg-slate-50 text-slate-800 min-h-screen">
      
      {/* Hero Header Banner */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-sky-500/5 to-transparent pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 text-xs font-mono font-bold text-embs-purple shadow-sm">
            <Activity className="w-3.5 h-3.5 animate-pulse text-embs-purple" />
            <span>Connective Intercellular Network & Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Executive Committee & Leadership
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the student leaders, researchers, and innovators driving the IEEE EMBS Chapter at Vardhaman College of Engineering.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
        
        {/* Faculty Leadership Section */}
        {faculty.length > 0 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono font-bold text-embs-purple uppercase tracking-widest block">Chapter Mentorship</span>
              <h2 className="text-2xl font-extrabold text-slate-900">Faculty Advisor & Coordinator</h2>
            </div>

            <div className="flex justify-center">
              {faculty.map((member, idx) => (
                <motion.div
                  key={member.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bright-card rounded-3xl p-6 max-w-md w-full flex flex-col sm:flex-row items-center gap-6 shadow-bright hover:shadow-bright-hover"
                >
                  <div className="w-28 h-36 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-embs-purple shadow-md">
                    <img 
                      src={resolveImage(member.photoUrl || '/assets/faculty.jpeg')} 
                      alt={member.name}
                      onError={handleImgError}
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-50 text-embs-purple border border-purple-200 inline-block">
                      {member.role}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 pt-1">{member.name}</h3>
                    <p className="text-xs text-slate-600">{member.department || "Department of Information Technology"}</p>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-xs text-embs-blue font-semibold hover:underline block pt-1">
                        {member.email}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Student Executive Committee Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono font-bold text-embs-blue uppercase tracking-widest block">Student Leadership</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Executive Committee (2025–2026)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {students.map((member, idx) => (
              <motion.div
                key={member.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bright-card rounded-3xl overflow-hidden shadow-bright hover:shadow-bright-hover flex flex-col group border border-slate-200/80 transition-all"
              >
                {/* 3:4 Aspect Ratio Portrait Container with object-top */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <img 
                    src={resolveImage(member.photoUrl || '/assets/chair.jpeg')} 
                    alt={member.name}
                    onError={handleImgError}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono bg-white/95 text-embs-blue border border-slate-200 shadow-sm backdrop-blur-md">
                    {member.role}
                  </span>
                </div>

                {/* Member Details */}
                <div className="p-6 space-y-2 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-embs-blue transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                      {member.department ? `${member.department} • ${member.year || ''}` : "Leading IEEE EMBS initiatives, research workshops, and student engineering development."}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-embs-blue hover:bg-embs-blue hover:text-white transition shadow-sm"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`} 
                        className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-embs-purple hover:bg-embs-purple hover:text-white transition shadow-sm"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}
