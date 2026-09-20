import React, { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";

export default function Achievements() {
  const [achievements, setAchievements] = useState(DEFAULT_SITE_DATA.achievements);
  useEffect(() => {
    getDocs(collection(db, "achievements"))
      .then(snap => { if (!snap.empty) setAchievements(snap.docs.map(d => ({ id: d.id, ...d.data() }))); })
      .catch(() => {});
  }, []);

  return (
    <div style={{ backgroundColor: "#F2F8FA", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)", borderBottom: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Honours & Recognitions · IEEE EMBS VCE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#172121] tracking-tight" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>Chapter Achievements</h1>
          <p className="text-[#647070] text-lg max-w-2xl leading-relaxed">Research honours, national hackathon titles, and IEEE section recognitions earned by Vardhaman EMBS members.</p>
        </div>
      </section>

      {/* Editorial list */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-14 space-y-3">
        {achievements.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-white border border-[#DDE4E1] rounded-xl p-6 flex items-start gap-6 hover:border-[#087F8C]/30 hover:shadow-card transition-all"
          >
            {/* Coral left accent */}
            <div className="w-1 self-stretch rounded-full bg-[#E76F51] flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#087F8C] border border-[#087F8C]/20 bg-[#087F8C]/6 px-2 py-0.5 rounded inline-block">
                    {item.category || "Recognition"}
                  </span>
                  <h3 className="text-base font-bold text-[#172121] group-hover:text-[#087F8C] transition-colors">{item.title}</h3>
                </div>
                <Trophy className="w-5 h-5 text-[#E9C46A] flex-shrink-0 mt-0.5" />
              </div>
              <p className="text-[#647070] text-sm leading-relaxed mt-2">{item.description}</p>
              {item.date && <p className="text-[11px] font-mono text-[#647070] mt-3 pt-3 border-t border-[#DDE4E1]">Awarded: {item.date}</p>}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}


