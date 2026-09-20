import React, { useState, useEffect } from "react";
import { Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";
import { resolveImage } from "../utils/resolveImage";

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

export default function Team() {
  const defaultList = DEFAULT_SITE_DATA.teamMembers || DEFAULT_SITE_DATA.team || [];
  const [teamMembers, setTeamMembers] = useState(defaultList);

  useEffect(() => {
    async function load() {
      try {
        let list = [];
        const s = await getDocs(collection(db, "team"));
        if (!s.empty) list = s.docs.map(d => ({ id: d.id, ...d.data() }));
        else { const s2 = await getDocs(collection(db, "teamMembers")); if (!s2.empty) list = s2.docs.map(d => ({ id: d.id, ...d.data() })); }
        if (list.length > 0) setTeamMembers(list);
      } catch { setTeamMembers(defaultList); }
    }
    load();
  }, []);

  const handleImgError = e => { e.currentTarget.onerror = null; e.currentTarget.src = resolveImage("/assets/chair.jpeg"); };
  const safe = Array.isArray(teamMembers) && teamMembers.length > 0 ? teamMembers : defaultList;
  const faculty  = safe.filter(m => m.category === "faculty" || m.role?.toLowerCase().includes("faculty") || m.role?.toLowerCase().includes("coordinator"));
  const students = safe.filter(m => !faculty.includes(m));

  return (
    <div style={{ backgroundColor: "#F2F8FA", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)", borderBottom: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Executive Committee · 2025–2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#172121] tracking-tight" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>Leadership Team</h1>
          <p className="text-[#647070] text-lg max-w-2xl leading-relaxed">
            The faculty advisor and student executive committee steering IEEE EMBS Vardhaman's research programmes, workshops, and chapter initiatives.
          </p>
        </div>
      </section>

      {/* Faculty */}
      {faculty.length > 0 && (
        <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Faculty Advisor</span>
          </div>
          <div className="flex justify-center">
            {faculty.map((m, i) => (
              <div key={m.id || i} className="glass-card rounded-xl p-7 flex flex-col sm:flex-row items-center gap-6 max-w-lg w-full shadow-card">
                <img src={resolveImage(m.photoUrl || "/assets/faculty.jpeg")} alt={m.name} onError={handleImgError}
                  className="w-24 h-32 rounded-lg object-cover object-top border border-[#DDE4E1] flex-shrink-0" />
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#087F8C] border border-[#087F8C]/20 bg-[#087F8C]/6 px-2.5 py-0.5 rounded inline-block">{m.role}</span>
                  <h3 className="text-lg font-bold text-[#172121] pt-1">{m.name}</h3>
                  <p className="text-xs text-[#647070]">{m.department || "Department of Information Technology"}</p>
                  {m.email && <a href={`mailto:${m.email}`} className="text-xs text-[#087F8C] font-semibold hover:underline block pt-0.5">{m.email}</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Student grid */}
      <section className="py-8 pb-20 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Student Executive Committee</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172121]">Student Leadership</h2>
          <p className="text-[#647070] text-sm max-w-xl">Each member leads key chapter initiatives, workshops, and research programmes.</p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {students.map((m, i) => (
            <motion.div key={m.id || i} variants={scaleIn}
              className="group bg-white border border-[#DDE4E1] rounded-xl overflow-hidden hover:border-[#087F8C]/30 hover:shadow-card-hover transition-all flex flex-col"
            >
              {/* Portrait */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F7F2]">
                <img src={resolveImage(m.photoUrl || "/assets/chair.jpeg")} alt={m.name} onError={handleImgError}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500" />
                <span className="absolute top-3 left-3 text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/90 text-[#087F8C] border border-[#DDE4E1]">{m.role}</span>
              </div>

              {/* Details */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[#172121] group-hover:text-[#087F8C] transition-colors">{m.name}</h3>
                  <p className="text-xs text-[#647070] mt-0.5 line-clamp-2">{m.department ? `${m.department}${m.year ? ` · ${m.year}` : ""}` : "IEEE EMBS Vardhaman"}</p>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-[#DDE4E1]">
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noreferrer"
                      className="p-1.5 rounded-lg border border-[#DDE4E1] text-[#647070] hover:border-[#087F8C] hover:text-[#087F8C] transition-colors">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {m.email && (
                    <a href={`mailto:${m.email}`}
                      className="p-1.5 rounded-lg border border-[#DDE4E1] text-[#647070] hover:border-[#087F8C] hover:text-[#087F8C] transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}


