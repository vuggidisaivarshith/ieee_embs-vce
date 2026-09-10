import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Users, Shield, Award, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import { resolveImage } from '../utils/resolveImage';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState(DEFAULT_SITE_DATA.team);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const snap = await getDocs(collection(db, 'team'));
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setTeamMembers(list);
        }
      } catch (err) {
        console.log("Using default team list");
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-purple-400/30 text-xs font-mono text-purple-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Connective Intercellular Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold">Executive Committee & Leadership</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the student leaders, innovators, and researchers driving the IEEE EMBS Chapter at Vardhaman College of Engineering.
          </p>
        </motion.div>
      </section>

      {/* Main Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
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
                  {member.bio || "Leading IEEE EMBS initiatives, research workshops, and student engineering development."}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 pt-3">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2 rounded-xl bg-slate-900 border border-white/10 text-sky-400 hover:bg-ieee-blue hover:text-white transition"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`} 
                      className="p-2 rounded-xl bg-slate-900 border border-white/10 text-purple-400 hover:bg-embs-purple hover:text-white transition"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
