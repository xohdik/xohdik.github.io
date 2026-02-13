import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from './AnimatedSection'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [failedIds, setFailedIds] = useState(new Set())
  
  const images = [
    { id: 1, src: '/images/gallery/photo-1.jpeg', alt: 'Gallery image 1' },
    { id: 2, src: '/images/gallery/photo-2.jpeg', alt: 'Gallery image 2' },
    { id: 3, src: '/images/gallery/photo-3.jpeg', alt: 'Gallery image 3' },
    { id: 4, src: '/images/gallery/photo-4.jpeg', alt: 'Gallery image 4' },
    { id: 5, src: '/images/gallery/photo-5.jpeg', alt: 'Gallery image 5' },
    { id: 6, src: '/images/gallery/photo-6.jpeg', alt: 'Gallery image 6' },
  ]

  const loadedImages = images.filter(img => !failedIds.has(img.id))

  return (
    <AnimatedSection id="gallery" className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="section-title mb-12">Gallery</h2>
        
        {loadedImages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 rounded-3xl"
            style={{ background: 'var(--color-surface-raised)', border: '2px dashed var(--color-border)' }}
          >
            <i className="fa-solid fa-images text-5xl mb-5 block" style={{ color: 'var(--color-border)' }}></i>
            <p className="text-lg font-bold mb-2" style={{ color: 'var(--color-ink-muted)' }}>Gallery Coming Soon</p>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--color-ink-muted)', opacity: 0.7 }}>
              Add images to <code className="font-mono px-2 py-0.5 rounded" style={{ background: 'var(--color-border-light)' }}>/public/images/gallery/</code> as photo-1.jpeg, photo-2.jpeg, etc.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((img) => failedIds.has(img.id) ? null : (
              <motion.button
                key={img.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLightbox(img)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={() => setFailedIds(prev => new Set([...prev, img.id]))}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              src={lightbox.src} alt={lightbox.alt}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center text-xl hover:bg-white/20 transition"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  )
}