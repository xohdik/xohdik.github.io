import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from './AnimatedSection'

// 50 placeholder slots — replace src with actual images
const images = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/photo-${i + 1}.jpeg`, // ✅ Your actual images!
  alt: `Gallery image ${i + 1}`,
}))

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [loadedImages] = useState(() => images.filter(img => img.src))

  // Show placeholder message if no images uploaded yet
  if (loadedImages.length === 0) {
    return (
      <AnimatedSection id="gallery" className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="section-title mb-12">Gallery</h2>
          <div
            className="portfolio-card text-center py-16"
            style={{ borderStyle: 'dashed' }}
          >
            <i
              className="fa-solid fa-images text-5xl mb-4 block"
              style={{ color: 'var(--color-border)', opacity: 0.5 }}
            ></i>
            <p className="text-lg font-semibold" style={{ color: 'var(--color-ink-muted)' }}>
              Gallery coming soon
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-ink-muted)', opacity: 0.7 }}>
              50 image slots ready — upload images to <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-border-light)' }}>/images/gallery/</code>
            </p>
          </div>
        </div>
      </AnimatedSection>
    )
  }

  return (
    <AnimatedSection id="gallery" className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="section-title mb-12">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {loadedImages.map((img) => (
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
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
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