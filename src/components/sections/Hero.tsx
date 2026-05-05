'use client'
import { motion } from 'framer-motion'
import { GraduationCap, Star } from 'lucide-react'

const floatingOrb = (className: string, delay: number) => (
  <motion.div
    className={className}
    animate={{ y: [0, -18, 0], opacity: [0.4, 0.7, 0.4] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
)

const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center bg-[#0f172a] overflow-hidden hero-geometric"
    >
      {/* Background photo overlay */}
      <div className="absolute inset-0">
        <img
          src="/gallery/pc.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0f172a]/95 to-[#1e293b]/90" />
      </div>

      {/* Floating orbs */}
      {floatingOrb(
        'absolute top-1/4 left-10 w-64 h-64 rounded-full bg-[#c9a227] opacity-10',
        0
      )}
      {floatingOrb(
        'absolute bottom-1/4 right-16 w-80 h-80 rounded-full bg-[#c9a227] opacity-10',
        1.5
      )}
      {floatingOrb(
        'absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-[#1e4080] opacity-10',
        0.8
      )}

      {/* Geometric decorations */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-[rgba(201,162,39,0.12)] rotate-45 hidden lg:block" />
      <div className="absolute bottom-32 left-16 w-20 h-20 border border-[rgba(201,162,39,0.1)] rotate-12 hidden lg:block" />

      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px]">
        <div className="h-full gold-gradient opacity-60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[rgba(201,162,39,0.3)] bg-[rgba(201,162,39,0.06)]"
        >
          <Star size={13} className="text-[#c9a227]" fill="#c9a227" />
          <span className="text-[#c9a227] text-xs font-semibold tracking-[0.12em] uppercase">
            Centre d'Excellence Académique
          </span>
          <Star size={13} className="text-[#c9a227]" fill="#c9a227" />
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#c9a227] shadow-[0_0_40px_rgba(201,162,39,0.4)]">
              <img
                src="/gallery/457477211_879188057607088_4773325454540207494_n.jpg"
                alt="Center Tyani"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -inset-2 rounded-full border border-[rgba(201,162,39,0.3)]"
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-3">
            <span className="gold-text">CENTER</span>
            <br />
            <span className="text-white">TYANI</span>
          </h1>
          <div className="flex justify-center mt-4 mb-6">
            <div className="h-[2px] w-24 gold-gradient rounded-full" />
          </div>
        </motion.div>

        {/* French title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg md:text-xl font-semibold text-white/90 mb-4 tracking-wide"
        >
          Centre de Formation et Cours de Soutien
        </motion.p>

        {/* English subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed mb-10 font-light"
        >
          Helping students achieve academic excellence through professional support
          and modern learning.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={() => scrollTo('#contact')} className="btn-gold text-base px-8 py-3.5">
            <span className="flex items-center gap-2">
              <GraduationCap size={18} />
              Nous Contacter
            </span>
          </button>
          <button onClick={() => scrollTo('#registration')} className="btn-outline text-base px-8 py-3.5">
            S'inscrire Maintenant
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 pt-10 border-t border-white/8 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: '500+', label: 'Élèves formés' },
            { value: '95%', label: 'Taux de réussite' },
            { value: '8+', label: 'Années d\'expérience' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gold-text">{stat.value}</div>
              <div className="text-white/40 text-xs mt-1 font-light">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5 cursor-pointer"
          onClick={() => scrollTo('#about')}
        >
          <div className="w-1 h-2 bg-[#c9a227] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
