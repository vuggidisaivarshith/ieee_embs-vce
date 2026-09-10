import React, { useState, useEffect, useRef } from "react";
import { Image as ImageIcon, Maximize2, Activity, Microscope, Aperture } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";
import { resolveImage } from "../utils/resolveImage";
import Lightbox from "../components/ui/Lightbox";
import TiltCard from "../components/ui/TiltCard";
import { eventSlide1, eventSlide2, eventSlide3 } from "../assets/images";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};
const fadeIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};

export default function Gallery() {
  const [albums, setAlbums] = useState(DEFAULT_SITE_DATA.gallery);
  const [selectedAlbum, setSelectedAlbum] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    async function loadGallery() {
      try {
        const snap = await getDocs(collection(db, "gallery"));
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          const merged = [...DEFAULT_SITE_DATA.gallery];
          list.forEach(dbItem => {
            const existingIdx = merged.findIndex(m => m.id === dbItem.id);
            if (existingIdx >= 0) merged[existingIdx] = { ...merged[existingIdx], ...dbItem };
            else merged.push(dbItem);
          });
          setAlbums(merged);
        }
      } catch (err) {
        console.log("Using default gallery album data");
      }
    }
    loadGallery();
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = resolveImage("/assets/embs-logo.png");
  };

  const allImages = albums.flatMap(album => album.images || []);
  const displayedImages = selectedAlbum === "all"
    ? allImages
    : (albums.find(a => a.id === selectedAlbum)?.images || []);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040711] text-white">

      {/* Dark-Field Microscopy Hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-20">
        {/* Deep space glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-embs-blue/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-embs-purple/8 rounded-full blur-3xl pointer-events-none" />

        {/* Scanning ring animation — dark-field aperture */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.02, 1] }}
          transition={{ rotate: { duration: 40, ease: "linear", repeat: Infinity }, scale: { duration: 4, repeat: Infinity } }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-sky-400/4 pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-embs-purple/5 pointer-events-none"
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-sky-400/30 backdrop-blur-md text-xs font-mono font-bold text-sky-400 shadow-sm shadow-sky-500/10"
            >
              <Aperture className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "4s" }} />
              <span>Dark-Field Fluorescence · Specimen Archive · Event Memories</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06]"
            >
              <span className="text-white">Photo Gallery</span>{" "}
              <span className="bg-gradient-to-r from-sky-400 via-embs-cyan to-embs-purple bg-clip-text text-transparent">&amp; Event Memories</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light"
            >
              Browse through photo highlights from our workshops, expert seminars, keynote sessions, and chapter milestones — archived under dark-field fluorescence.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* Album Filters — specular dark pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedAlbum("all")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition font-mono border ${
              selectedAlbum === "all"
                ? "bg-embs-blue text-white shadow-lg border-sky-400/40 shadow-embs-blue/20"
                : "bg-slate-900/80 text-slate-300 hover:text-white border-white/10 hover:border-white/20 hover:bg-slate-800"
            }`}
          >
            All Specimens ({allImages.length})
          </motion.button>
          {albums.map(album => (
            <motion.button
              key={album.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedAlbum(album.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition font-mono border ${
                selectedAlbum === album.id
                  ? "bg-embs-blue text-white shadow-lg border-sky-400/40 shadow-embs-blue/20"
                  : "bg-slate-900/80 text-slate-300 hover:text-white border-white/10 hover:border-white/20 hover:bg-slate-800"
              }`}
            >
              {album.title}
            </motion.button>
          ))}
        </div>

        {/* Specimen count */}
        {displayedImages.length > 0 && (
          <div className="flex items-center gap-2 mb-6 justify-center">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-sky-400/30" />
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">{displayedImages.length} Specimens Catalogued</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-sky-400/30" />
          </div>
        )}

        {/* Image Grid — Dark-Field Archive */}
        {displayedImages.length === 0 ? (
          <div className="text-center py-16 specular-card rounded-3xl p-8">
            <ImageIcon className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Specimens Found</h3>
            <p className="text-slate-400 text-sm mt-1">Select a different album to view images.</p>
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {displayedImages.map((img, idx) => (
              <motion.div
                key={img.id || idx}
                variants={fadeIn}
                onClick={() => openLightbox(idx)}
                className="cursor-pointer"
              >
                <TiltCard
                  maxTilt={6}
                  glareColor="rgba(0, 168, 198, 0.25)"
                  className="group relative h-64 rounded-2xl overflow-hidden bg-slate-950 border border-white/8 hover:border-sky-400/50 shadow-xl shadow-black/40 transition-all duration-200"
                >
                  <img
                    src={resolveImage(img.url || img.imageUrl)}
                    alt={img.caption || "Gallery Photo"}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  {/* Dark-field specimen overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <p className="text-xs font-semibold line-clamp-2 leading-relaxed">{img.caption}</p>
                    <span className="text-[10px] text-sky-400 flex items-center gap-1.5 mt-1.5 font-bold font-mono">
                      <Maximize2 className="w-3 h-3" /> Open Specimen
                    </span>
                  </div>
                  {/* Index label in corner */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-mono text-slate-400">
                    #{String(idx + 1).padStart(2, "0")}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Lightbox */}
      <Lightbox
        images={displayedImages}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActiveImageIndex(prev => (prev > 0 ? prev - 1 : displayedImages.length - 1))}
        onNext={() => setActiveImageIndex(prev => (prev < displayedImages.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
}
