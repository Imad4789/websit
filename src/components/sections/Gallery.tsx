'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

const images = [
  { src: '/gallery/457477211_879188057607088_4773325454540207494_n.jpg', caption: 'Center Tyani – Notre équipe', span: 'col-span-1 row-span-2' },
  { src: '/gallery/ddd.jpg', caption: 'Séances de soutien scolaire', span: 'col-span-1' },
  { src: '/gallery/pc.jpg', caption: 'Espace d\'apprentissage moderne', span: 'col-span-1' },
  { src: '/gallery/pfff.jpg', caption: 'Activités pédagogiques', span: 'col-span-1' },
  { src: '/gallery/waa3.jpg', caption: 'Cours intensifs et encadrement', span: 'col-span-1' },
  { src: '/gallery/zin.jpg', caption: 'Réussite des élèves', span: 'col-span-1' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section id="gallery" className="py-28 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0 hero-geometric" />
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-1 gold-gradient opacity-40" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="section-divider" />
          </div>
          <p className="text-[#c9a227] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Notre Galerie
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            La Vie au
            <br />
            <span className="gold-text">Centre Tyani</span>
          </h2>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative group overflow-hidden rounded-xl cursor-pointer ${
                i === 0 ? 'row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '3/4' : '4/3' }}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {/* Caption */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white text-xs font-medium">{img.caption}</p>
              </div>
              {/* Zoom icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[rgba(201,162,39,0.9)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                <ZoomIn size={14} className="text-[#0f172a]" />
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-xl border border-[rgba(201,162,39,0)] group-hover:border-[rgba(201,162,39,0.4)] transition-colors duration-400" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  )
}
