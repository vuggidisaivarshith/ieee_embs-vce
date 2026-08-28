import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventSlide1, eventSlide2, eventSlide3 } from '../../assets/images';

export default function EventCarousel({ slides, title = "Event Highlights — Digital Health & Telemedicine (13 Aug 2026)" }) {
  const images = slides && slides.length > 0 ? slides : [
    { url: eventSlide1, caption: "Dr. Ajit Kumar delivering expert talk on Digital Health & Telemedicine" },
    { url: eventSlide2, caption: "Interactive session on Telemedicine & Healthcare AI Architectures" },
    { url: eventSlide3, caption: "IEEE EMBS student interactive Q&A and felicitation" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const currentImage = images[currentIndex];
  const imageUrl = typeof currentImage === 'string' ? currentImage : currentImage.url;
  const imageCaption = typeof currentImage === 'object' ? currentImage.caption : title;

  return (
    <div className="space-y-3">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Session Completed (13 Aug 2026)
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Slide {currentIndex + 1} of {images.length}
        </span>
      </div>

      {/* Main Sliding Banner Container */}
      <div 
        className="relative group aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/15 shadow-2xl"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={imageUrl}
            alt={imageCaption || title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />
        </AnimatePresence>

        {/* Gradient Overlay for Caption */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 sm:p-5 flex items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">Live Session Screenshot</span>
            <p className="text-xs sm:text-sm font-semibold text-white line-clamp-1">{imageCaption}</p>
          </div>

          <button
            onClick={() => setLightboxOpen(true)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition flex-shrink-0"
            title="Expand Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/60 text-white backdrop-blur-md opacity-80 hover:opacity-100 transition hover:scale-110 shadow-lg border border-white/10"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/60 text-white backdrop-blur-md opacity-80 hover:opacity-100 transition hover:scale-110 shadow-lg border border-white/10"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setAutoPlay(false); setCurrentIndex(idx); }}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx 
                  ? 'w-6 bg-sky-400' 
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <img 
              src={imageUrl} 
              alt={imageCaption} 
              className="w-full h-full object-contain rounded-2xl border border-white/20 shadow-2xl" 
            />
            <p className="text-center text-white text-xs sm:text-sm font-semibold mt-3 bg-slate-900/80 p-3 rounded-xl border border-white/10">
              {imageCaption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
