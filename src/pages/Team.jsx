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
    <div className="pt-24 pb-20">
      
      {/* Hero Header Banner */}
      <section className="py-16 text-white text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-purple-400/30 text-xs font-mono text-purple-400 shadow-sm">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Connective Intercellular Network & Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold">Executive Committee & Leadership</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
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
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block">Chapter Mentorship</span>
              <h2 className="text-2xl font-bold text-white">Faculty Advisor & Coordinator</h2>
            </div>

            <div className="flex justify-center">
              {faculty.map((member, idx) => (
                <motion.div
                  key={member.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="specular-card rounded-3xl p-6 max-w-md w-full flex flex-col sm:flex-row items-center gap-6 shadow-2xl hover-card-lift"
                >
                  <div className="w-28 h-36 rounded-2xl overflow-hidden bg-slate-950 flex-shrink-0 border-2 border-sky-400 shadow-lg">
                    <img 
                      src={resolveImage(member.photoUrl || '/assets/faculty.jpeg')} 
                      alt={member.name}
                      onError={handleImgError}
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      {member.role}
                    </span>
                    <h3 className="text-lg font-bold text-white pt-1">{member.name}</h3>
                    <p className="text-xs text-slate-400">{member.department || "Department of Information Technology"}</p>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-xs text-sky-400 hover:underline block pt-1">
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
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block">Student Leadership</span>
            <h2 className="text-2xl font-bold text-white">Executive Committee (2025–2026)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {students.map((member, idx) => (
              <motion.div
                key={member.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="specular-card rounded-3xl overflow-hidden shadow-xl hover-card-lift flex flex-col group"
              >
                {/* 3:4 Aspect Ratio Portrait Container with object-top */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                  <img 
                    src={resolveImage(member.photoUrl || '/assets/chair.jpeg')} 
                    alt={member.name}
                    onError={handleImgError}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono bg-slate-950/80 text-sky-400 border border-white/20 backdrop-blur-md">
                    {member.role}
                  </span>
                </div>

                {/* Member Details */}
                <div className="p-6 space-y-2 text-center">
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {member.department ? `${member.department} • ${member.year || ''}` : "Leading IEEE EMBS initiatives, research workshops, and student engineering development."}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-3 pt-3">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-2 rounded-xl bg-slate-900 border border-white/10 text-sky-400 hover:bg-ieee-blue hover:text-white transition"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`} 
                        className="p-2 rounded-xl bg-slate-900 border border-white/10 text-purple-400 hover:bg-embs-purple hover:text-white transition"
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
