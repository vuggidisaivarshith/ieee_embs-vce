import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }) {
  if (!isOpen || !images || images.length === 0) return null;

  const currentImg = images[currentIndex] || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 transition"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button 
            onClick={onPrev}
            className="absolute left-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={onNext}
            className="absolute right-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
        <img 
          src={currentImg.url || currentImg.imageUrl} 
          alt={currentImg.caption || "Gallery Preview"} 
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
        />
        {currentImg.caption && (
          <p className="mt-4 text-white/90 text-center text-sm font-medium bg-black/40 px-4 py-2 rounded-full">
            {currentImg.caption}
          </p>
        )}
      </div>
    </div>
  );
}
