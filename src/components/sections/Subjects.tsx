'use client'
import { motion } from 'framer-motion'

const subjects = [
  {
    name: 'Mathématiques',
    ar: 'الرياضيات',
    symbol: '∑',
    desc: 'Algèbre, géométrie, analyse et probabilités pour tous les niveaux.',
    delay: 0,
  },
  {
    name: 'Physique',
    ar: 'الفيزياء',
    symbol: '⚛',
    desc: 'Mécanique, électricité, optique et thermodynamique.',
    delay: 0.1,
  },
  {
    name: 'SVT',
    ar: 'علوم الحياة والأرض',
    symbol: '🧬',
    desc: 'Sciences de la vie et de la Terre pour les filières scientifiques.',
    delay: 0.2,
  },
  {
    name: 'Français',
    ar: 'الفرنسية',
    symbol: 'A',
    desc: 'Grammaire, expression écrite, littérature et compréhension.',
    delay: 0.3,
  },
  {
    name: 'English',
    ar: 'الإنجليزية',
    symbol: 'Aa',
    desc: 'Grammar, vocabulary, reading, writing and spoken English.',
    delay: 0.4,
  },
]

export default function Subjects() {
  return (
    <section id="subjects" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 geometric-pattern" />

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
            Matières Enseignées
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] leading-tight">
            Toutes les Matières
            <br />
            <span className="gold-text">pour Réussir</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {subjects.map((s) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: s.delay }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="subject-card group relative bg-white rounded-2xl p-6 border border-[rgba(201,162,39,0.12)] hover:border-[rgba(201,162,39,0.4)] hover:shadow-[0_12px_40px_rgba(201,162,39,0.12)] transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,162,39,0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Symbol */}
              <div className="relative">
                <div className="subject-icon text-4xl font-black gold-text mb-4 transition-transform duration-300 inline-block">
                  {s.symbol}
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <h3 className="font-bold text-[#0f172a] text-base mb-1">{s.name}</h3>
              <p className="text-[#c9a227] text-xs font-medium mb-3">{s.ar}</p>
              <p className="text-[#6b7280] text-xs leading-relaxed">{s.desc}</p>

              {/* Bottom accent */}
              <div className="mt-4 h-0.5 rounded-full gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
