import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Maximize2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import { resolveImage } from '../utils/resolveImage';
import Lightbox from '../components/ui/Lightbox';

export default function Gallery() {
  const [albums, setAlbums] = useState(DEFAULT_SITE_DATA.gallery);
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function loadGallery() {
      try {
        const snap = await getDocs(collection(db, 'gallery'));
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setAlbums(list);
        }
      } catch (err) {
        console.log("Using default gallery album data");
      }
    }
    loadGallery();
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = resolveImage('/assets/embs-logo.png');
  };

  const allImages = albums.flatMap(album => album.images || []);
  const displayedImages = selectedAlbum === 'all' 
    ? allImages 
    : (albums.find(a => a.id === selectedAlbum)?.images || []);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange text-white py-16 animate-gradient">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold">Photo Gallery & Memories</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            Browse through photo highlights from our workshops, expert seminars, guest lectures, and chapter gatherings.
          </p>
        </motion.div>
      </section>

      {/* Main Gallery Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Album Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedAlbum('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
              selectedAlbum === 'all'
                ? 'bg-ieee-blue text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Photos ({allImages.length})
          </motion.button>
          {albums.map(album => (
            <motion.button
              key={album.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedAlbum(album.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
                selectedAlbum === album.id
                  ? 'bg-ieee-blue text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {album.title}
            </motion.button>
          ))}
        </div>

        {/* Image Grid */}
        {displayedImages.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
            <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Images Found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedImages.map((img, idx) => (
              <motion.div 
                key={img.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => openLightbox(idx)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-ieee-blue hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                <img 
                  src={resolveImage(img.url || img.imageUrl)} 
                  alt={img.caption || "Gallery Photo"}
                  onError={handleImgError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <p className="text-xs font-semibold line-clamp-2">{img.caption}</p>
                  <span className="text-[10px] text-sky-300 flex items-center gap-1 mt-1 font-bold">
                    <Maximize2 className="w-3 h-3" /> Click to expand
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </section>

      {/* Lightbox Component */}
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
