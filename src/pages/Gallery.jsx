import React, { useState, useEffect } from "react";
import { Maximize2 } from "lucide-react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";
import { resolveImage } from "../utils/resolveImage";
import Lightbox from "../components/ui/Lightbox";
import { eventSlide1, eventSlide2, eventSlide3 } from "../assets/images";

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};

export default function Gallery() {
  const [albums, setAlbums]              = useState(DEFAULT_SITE_DATA.gallery);
  const [selectedAlbum, setSelectedAlbum] = useState("all");
  const [lightboxOpen, setLightboxOpen]   = useState(false);
  const [activeIdx, setActiveIdx]         = useState(0);

  useEffect(() => {
    getDocs(collection(db, "gallery")).then(snap => {
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const merged = [...DEFAULT_SITE_DATA.gallery];
        list.forEach(item => {
          const ix = merged.findIndex(m => m.id === item.id);
          if (ix >= 0) merged[ix] = { ...merged[ix], ...item };
          else merged.push(item);
        });
        setAlbums(merged);
      }
    }).catch(() => {});
  }, []);

  const handleImgError = e => { e.currentTarget.onerror = null; e.currentTarget.src = resolveImage("/assets/embs-logo.png"); };

  const allImages = albums.flatMap(a => a.images || []);
  const displayed = selectedAlbum === "all" ? allImages : (albums.find(a => a.id === selectedAlbum)?.images || []);

  return (
    <div style={{ backgroundColor: "#101418", minHeight: "100vh", color: "#DDD" }}>

      {/* Hero */}
      <section className="pt-32 pb-14 border-b border-white/8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Photo Archive · IEEE EMBS VCE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>
            Event Gallery
          </h1>
          <p className="text-[#8A9E9A] text-base max-w-2xl leading-relaxed">
            Photographs from workshops, keynote sessions, symposia, and chapter milestones at Vardhaman College of Engineering.
          </p>
        </div>
      </section>

      {/* Album filters */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedAlbum("all")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${selectedAlbum === "all" ? "bg-[#087F8C] text-white border-[#087F8C]" : "border-white/12 text-[#8A9E9A] hover:text-white hover:border-white/25 bg-transparent"}`}
          >
            All ({allImages.length})
          </button>
          {albums.map(a => (
            <button
              key={a.id}
              onClick={() => setSelectedAlbum(a.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${selectedAlbum === a.id ? "bg-[#087F8C] text-white border-[#087F8C]" : "border-white/12 text-[#8A9E9A] hover:text-white hover:border-white/25 bg-transparent"}`}
            >
              {a.title}
            </button>
          ))}
        </div>
        {displayed.length > 0 && (
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#647070] mt-4">{displayed.length} photographs</p>
        )}
      </section>

      {/* Image grid */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-20">
        {displayed.length === 0 ? (
          <div className="text-center py-16 border border-white/8 rounded-xl p-8">
            <p className="text-[#647070] text-sm">No photographs in this album.</p>
          </div>
        ) : (
          <motion.div
            key={selectedAlbum}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {displayed.map((img, idx) => (
              <motion.button
                key={img.id || idx}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => { setActiveIdx(idx); setLightboxOpen(true); }}
                className="group relative aspect-square overflow-hidden rounded-lg bg-[#1A1F26] border border-white/6 hover:border-[#087F8C]/50 focus:outline-none focus:ring-2 focus:ring-[#087F8C] transition-all"
              >
                <img
                  src={resolveImage(img.url || img.imageUrl)}
                  alt={img.caption || "Gallery photo"}
                  onError={handleImgError}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101418]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <p className="text-xs text-white font-medium line-clamp-2 leading-snug">{img.caption}</p>
                  <div className="flex items-center gap-1 mt-1.5 text-[#087F8C]">
                    <Maximize2 className="w-3 h-3" />
                    <span className="text-[10px] font-mono font-bold uppercase">View</span>
                  </div>
                </div>
                {/* Index label */}
                <span className="absolute top-2 left-2 text-[9px] font-black font-mono text-white/40 bg-black/40 px-1.5 py-0.5 rounded">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </section>

      <Lightbox
        images={displayed}
        currentIndex={activeIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActiveIdx(p => (p > 0 ? p - 1 : displayed.length - 1))}
        onNext={() => setActiveIdx(p => (p < displayed.length - 1 ? p + 1 : 0))}
      />
    </div>
  );
}
