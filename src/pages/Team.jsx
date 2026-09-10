import React, { useState, useEffect, useRef } from "react";
import { Mail, Linkedin, Users, Activity, Network } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";
import { resolveImage } from "../utils/resolveImage";
import TiltCard from "../components/ui/TiltCard";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};

export default function Team() {
  const defaultList = DEFAULT_SITE_DATA.teamMembers || DEFAULT_SITE_DATA.team || [];
  const [teamMembers, setTeamMembers] = useState(defaultList);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    async function loadTeam() {
      try {
        let list = [];
        const snapTeam = await getDocs(collection(db, "team"));
        if (!snapTeam.empty) {
          list = snapTeam.docs.map(d => ({ id: d.id, ...d.data() }));
        } else {
          const snapMembers = await getDocs(collection(db, "teamMembers"));
          if (!snapMembers.empty) {
            list = snapMembers.docs.map(d => ({ id: d.id, ...d.data() }));
          }
        }
        if (list && list.length > 0) setTeamMembers(list);
        else setTeamMembers(defaultList);
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
    e.currentTarget.src = resolveImage("/assets/chair.jpeg");
  };

  const safeTeam = Array.isArray(teamMembers) && teamMembers.length > 0 ? teamMembers : defaultList;
  const faculty = safeTeam.filter(m => m.category === "faculty" || m.role?.toLowerCase().includes("faculty") || m.role?.toLowerCase().includes("coordinator"));
  const students = safeTeam.filter(m => m.category !== "faculty" && !m.role?.toLowerCase().includes("faculty") && !m.role?.toLowerCase().includes("coordinator"));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B16] text-slate-800 dark:text-slate-100">

      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/8 via-sky-500/5 to-transparent pointer-events-none" />
        {/* Scientific network node rings */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, ease: "linear", repeat: Infinity }} className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full border border-embs-purple/8 pointer-events-none" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 55, ease: "linear", repeat: Infinity }} className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full border border-embs-blue/8 pointer-events-none" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, ease: "linear", repeat: Infinity }} className="absolute top-8 right-8 w-[200px] h-[200px] rounded-full border border-embs-cyan/10 pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6 max-w-4xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/90 border border-purple-300/40 dark:border-purple-500/20 backdrop-blur-md text-xs font-mono font-bold text-embs-purple shadow-sm">
              <Network className="w-3.5 h-3.5 animate-pulse" />
              <span>Intercellular Network · Leadership Architecture · Scientific Graph</span>
              <span className="w-1.5 h-1.5 rounded-full bg-embs-purple animate-ping" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06]">
              <span className="text-slate-900 dark:text-white">Executive Committee</span>{" "}
              <span className="bg-gradient-to-r from-embs-purple via-embs-blueAlt to-embs-cyan bg-clip-text text-transparent">&amp; Leadership</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-slate-600 dark:text-slate-300 text-base sm:text-xl leading-relaxed max-w-2xl font-light">
              Meet the student leaders, researchers, and innovators driving the IEEE EMBS Chapter at{" "}
              <span className="font-semibold text-slate-800 dark:text-white">Vardhaman College of Engineering</span>.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 space-y-20">

        {/* Faculty Leadership */}
        {faculty.length > 0 && (
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-1">
              <span className="text-xs font-mono font-bold text-embs-purple uppercase tracking-widest block">Chapter Mentorship</span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Faculty Advisor &amp; Coordinator</h2>
            </motion.div>

            <div className="flex justify-center">
              {faculty.map((member, idx) => (
                <TiltCard key={member.id || idx} maxTilt={4} className="bright-card dark:bg-slate-900/80 rounded-3xl p-6 max-w-md w-full flex flex-col sm:flex-row items-center gap-6 shadow-bright hover:shadow-bright-hover">
                  <div className="w-28 h-36 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border-2 border-embs-purple shadow-md">
                    <img src={resolveImage(member.photoUrl || "/assets/faculty.jpeg")} alt={member.name} onError={handleImgError} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-50 dark:bg-purple-900/30 text-embs-purple border border-purple-200 dark:border-purple-500/30 inline-block">{member.role}</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-1">{member.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{member.department || "Department of Information Technology"}</p>
                    {member.email && <a href={`mailto:${member.email}`} className="text-xs text-embs-blue font-semibold hover:underline block pt-1">{member.email}</a>}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}

        {/* Student Executive Committee — Scientific Network Grid */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-embs-blue/10 dark:bg-embs-blue/15 text-embs-blue border border-embs-blue/20 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Student Leadership Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Executive Committee (2025–2026)</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">Each member is a node in our biomedical research and innovation network.</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {students.map((member, idx) => (
              <motion.div key={member.id || idx} variants={scaleIn}>
                <TiltCard maxTilt={5} className="bright-card dark:bg-slate-900/80 rounded-3xl overflow-hidden shadow-bright hover:shadow-bright-hover flex flex-col group border border-slate-200/80 dark:border-white/10 transition-all h-full">
                  {/* Portrait */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img src={resolveImage(member.photoUrl || "/assets/chair.jpeg")} alt={member.name} onError={handleImgError} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    {/* Network node overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Role badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono bg-white/95 dark:bg-slate-900/95 text-embs-blue border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md">
                      {member.role}
                    </span>
                    {/* Hover: network connection lines hint */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-px bg-gradient-to-r from-embs-blue/60 to-embs-cyan/60" />
                        <div className="w-2 h-2 rounded-full bg-embs-cyan" />
                      </div>
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="p-5 space-y-2 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-embs-blue dark:group-hover:text-sky-400 transition-colors">{member.name}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed pt-1">
                        {member.department ? `${member.department}${member.year ? " · " + member.year : ""}` : "Leading IEEE EMBS initiatives, research workshops, and student engineering development."}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-embs-blue hover:bg-embs-blue hover:text-white transition shadow-sm" title="LinkedIn">
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-embs-purple hover:bg-embs-purple hover:text-white transition shadow-sm" title="Email">
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </section>
    </div>
  );
}
