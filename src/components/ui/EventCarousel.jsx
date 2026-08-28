import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, CheckCircle2, Film, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveImage } from '../../utils/resolveImage';
import { eventSlide1, eventSlide2, eventSlide3 } from '../../assets/images';

export default function EventCarousel({ slides, title = "Digital Health & Telemedicine Expert Talk (13 Aug 2026)" }) {
  const images = slides && slides.length > 0 ? slides : [
    { url: eventSlide1, caption: "Dr. Ajit Kumar presenting Digital Health & Telemedicine Architectures" },
    { url: eventSlide2, caption: "Interactive session on Healthcare AI & Remote Patient Monitoring" },
    { url: eventSlide3, caption: "IEEE EMBS Vardhaman student felicitation & interactive Q&A" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const currentImage = images[currentIndex];
  const rawUrl = typeof currentImage === 'string' ? currentImage : currentImage.url;
  const imageUrl = resolveImage(rawUrl);
  const imageCaption = typeof currentImage === 'object' ? currentImage.caption : title;

  return (
    <div className="relative space-y-3 group">
      
      {/* Ambient Glow behind Cinematic Container */}
      <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/25 via-purple-500/30 to-amber-500/25 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-700"></div>

      {/* Header Bar */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-300 relative z-10 px-1">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Event Gallery Highlights
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition flex items-center gap-1 text-[11px]"
            title={isPlaying ? "Pause Auto-play" : "Play Slideshow"}
          >
            {isPlaying ? <Pause className="w-3 h-3 text-sky-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
            <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <span className="text-[11px] font-mono text-slate-400">
            0{currentIndex + 1} / 0{images.length}
          </span>
        </div>
      </div>

      {/* Cinematic Slide Frame Container */}
      <div 
        className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-white/20 shadow-2xl z-10 group/frame"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={imageUrl}
            alt={imageCaption || title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />
        </AnimatePresence>

        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-[11px] font-bold text-sky-300 flex items-center gap-1.5 shadow-lg">
            <Film className="w-3.5 h-3.5 text-vardhaman-orange" />
            <span>13 AUG 2026 • Live Session Capture</span>
          </span>
        </div>

        {/* Glassmorphic Bottom Caption Bar */}
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-12 pb-4 px-5 flex items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-sky-400 uppercase tracking-widest block">Dr. Ajit Kumar Keynote</span>
            <p className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1">{imageCaption}</p>
          </div>

          <button
            onClick={() => setLightboxOpen(true)}
            className="p-2.5 rounded-xl bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition shadow-lg flex-shrink-0 border border-white/20 hover:scale-105"
            title="Expand Fullscreen Preview"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Previous Navigation Button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-2xl transition hover:scale-110 opacity-70 group-hover/frame:opacity-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Navigation Button */}
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-2xl transition hover:scale-110 opacity-70 group-hover/frame:opacity-100"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicator Progress Line & Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setIsPlaying(false); setCurrentIndex(idx); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'w-8 bg-gradient-to-r from-sky-400 to-emerald-400 shadow-lg' 
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Preview */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center space-y-3">
            <img 
              src={imageUrl} 
              alt={imageCaption} 
              className="max-h-[82vh] w-auto max-w-full object-contain rounded-3xl border border-white/20 shadow-2xl" 
            />
            <div className="w-full text-center bg-slate-900/90 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">IEEE EMBS Event Screenshot • 13 Aug 2026</span>
              <p className="text-white text-sm font-semibold mt-0.5">{imageCaption}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
