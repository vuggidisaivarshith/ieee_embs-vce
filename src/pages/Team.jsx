import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, Phone, UserCheck, Shield, GraduationCap } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import Skeleton from '../components/ui/Skeleton';

export default function Team() {
  const [team, setTeam] = useState(DEFAULT_SITE_DATA.teamMembers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const snap = await getDocs(collection(db, 'team'));
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          list.sort((a, b) => (a.order || 99) - (b.order || 99));
          setTeam(list);
        }
      } catch (err) {
        console.log("Using default fallback team members:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  const facultyMembers = team.filter(m => m.category === 'faculty');
  const studentLeaders = team.filter(m => m.category !== 'faculty');

  return (
    <div className="pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold">Office Bearers & Team</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            Meet the faculty advisors, student executive committee, and lead organizers driving IEEE EMBS Vardhaman.
          </p>
        </div>
      </section>

      {/* Team Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Faculty Advisor Section */}
        {facultyMembers.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-ieee-blue/10 text-ieee-blue dark:bg-ieee-blue/20 dark:text-sky-400 uppercase tracking-wider">
                Faculty Guidance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">Faculty Co-ordinator</h2>
            </div>

            <div className="max-w-xl mx-auto">
              {facultyMembers.map(member => (
                <div key={member.id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 text-center space-y-4">
                  <img 
                    src={member.photoUrl || "/assets/faculty.jpeg"} 
                    alt={member.name} 
                    className="w-32 h-32 rounded-3xl object-cover border-4 border-ieee-blue mx-auto shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm font-semibold text-ieee-blue dark:text-sky-400">{member.role}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{member.department}</p>
                  </div>

                  <div className="pt-3 flex justify-center gap-3 border-t border-slate-100 dark:border-slate-700">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-ieee-blue text-slate-600 dark:text-slate-300 hover:text-white transition">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-vardhaman-orange text-slate-600 dark:text-slate-300 hover:text-white transition">
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Student Executive Committee */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-embs-purple/10 text-embs-purple dark:bg-embs-purple/20 dark:text-purple-300 uppercase tracking-wider">
              Student Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">Executive Committee</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {studentLeaders.map(member => (
              <div 
                key={member.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 text-center space-y-4 hover:shadow-2xl transition duration-300 group"
              >
                <div className="relative w-28 h-28 mx-auto">
                  <img 
                    src={member.photoUrl || "/assets/embs-logo.png"} 
                    alt={member.name} 
                    className="w-full h-full rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 group-hover:border-ieee-blue transition"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-ieee-blue transition">{member.name}</h3>
                  <p className="text-xs font-bold text-ieee-blue dark:text-sky-400">{member.role}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{member.department} • {member.year}</p>
                </div>

                <div className="pt-3 flex justify-center gap-2 border-t border-slate-100 dark:border-slate-700">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-ieee-blue text-slate-600 dark:text-slate-300 hover:text-white transition">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-embs-purple text-slate-600 dark:text-slate-300 hover:text-white transition">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-vardhaman-orange text-slate-600 dark:text-slate-300 hover:text-white transition">
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}
