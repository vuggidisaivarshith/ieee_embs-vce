import React, { useState, useEffect } from "react";
import { Pin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(DEFAULT_SITE_DATA.announcements);
  useEffect(() => {
    getDocs(query(collection(db, "announcements"), orderBy("date", "desc")))
      .then(snap => { if (!snap.empty) setAnnouncements(snap.docs.map(d => ({ id: d.id, ...d.data() }))); })
      .catch(() => {});
  }, []);

  const pinned  = announcements.filter(a => a.isPinned);
  const regular = announcements.filter(a => !a.isPinned);

  return (
    <div style={{ backgroundColor: "#F8F7F2", minHeight: "100vh" }}>
      <section className="pt-32 pb-16 bg-white border-b border-[#DDE4E1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Chapter Notices · IEEE EMBS VCE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#172121] tracking-tight" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>Announcements</h1>
          <p className="text-[#647070] text-lg max-w-2xl leading-relaxed">Chapter updates, event registrations, competition results, and society news.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-8 py-12 space-y-4">
        {/* Pinned */}
        {pinned.map(item => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white border-2 border-[#087F8C]/30 rounded-xl p-6 sm:p-8 space-y-3 shadow-card"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono uppercase tracking-wider text-white bg-[#087F8C] px-2.5 py-1 rounded">
                <Pin className="w-3 h-3" /> Pinned
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#647070] font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#087F8C]" /> {item.date}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#172121]">{item.title}</h3>
            <p className="text-[#647070] text-sm leading-relaxed whitespace-pre-line">{item.body}</p>
          </motion.div>
        ))}

        {/* Thin rule between pinned and regular */}
        {pinned.length > 0 && regular.length > 0 && <div className="h-px bg-[#DDE4E1]" />}

        {/* Regular */}
        {regular.map((item, idx) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: idx * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-white border border-[#DDE4E1] rounded-xl p-6 space-y-3 hover:border-[#087F8C]/30 hover:shadow-card transition-all"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Notice</span>
              <span className="flex items-center gap-1.5 text-xs text-[#647070] font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#087F8C]" /> {item.date}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#172121] group-hover:text-[#087F8C] transition-colors">{item.title}</h3>
            <p className="text-[#647070] text-sm leading-relaxed whitespace-pre-line">{item.body}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
