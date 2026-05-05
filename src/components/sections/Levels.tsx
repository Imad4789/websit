'use client'
import { motion } from 'framer-motion'
import { School, BookMarked, Award } from 'lucide-react'

const levels = [
  {
    icon: <School size={32} className="text-[#c9a227]" />,
    name: 'Collège',
    ar: 'الإعدادي',
    grades: ['1ère Collège', '2ème Collège', '3ème Collège'],
    desc: 'Renforcement des bases scolaires et accompagnement des collégiens vers une progression continue.',
    color: 'from-[#c9a227]/8 to-[#c9a227]/3',
    delay: 0,
  },
  {
    icon: <BookMarked size={32} className="text-[#c9a227]" />,
    name: 'Lycée',
    ar: 'الثانوي',
    grades: ['1ère Bac', '2ème Bac'],
    desc: 'Préparation solide aux spécialités du lycée avec un encadrement axé sur les résultats.',
    color: 'from-[#0f172a] to-[#1e293b]',
    dark: true,
    delay: 0.15,
  },
  {
    icon: <Award size={32} className="text-[#c9a227]" />,
    name: 'BAC',
    ar: 'الباكالوريا',
    grades: ['Sciences Maths', 'Sciences Phys.', 'Sciences de la Vie'],
    desc: 'Préparation intensive et ciblée pour réussir le Baccalauréat avec les meilleures notes.',
    color: 'from-[#c9a227]/8 to-[#c9a227]/3',
    delay: 0.3,
  },
]

export default function Levels() {
  return (
    <section id="levels" className="py-28 bg-[#f5f5f5] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-30" />
      <div className="absolute inset-0 hero-geometric" />

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
            Niveaux Académiques
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] leading-tight">
            Pour Chaque
            <br />
            <span className="gold-text">Niveau Scolaire</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((level) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: level.delay }}
              whileHover={{ y: -6 }}
              className={`rounded-2xl overflow-hidden border ${
                level.dark
                  ? 'border-[rgba(201,162,39,0.25)]'
                  : 'border-[rgba(201,162,39,0.15)]'
              } group cursor-default`}
            >
              <div
                className={`h-full bg-gradient-to-b ${level.color} ${
                  level.dark ? 'bg-[#0f172a]' : 'bg-white'
                } p-8 flex flex-col`}
                style={level.dark ? { background: 'linear-gradient(180deg, #0f172a, #1e293b)' } : {}}
              >
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    level.dark ? 'bg-[rgba(201,162,39,0.12)]' : 'bg-[rgba(201,162,39,0.1)]'
                  } group-hover:bg-[rgba(201,162,39,0.2)] transition-colors`}>
                    {level.icon}
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    level.dark
                      ? 'bg-[rgba(201,162,39,0.15)] text-[#c9a227]'
                      : 'bg-[#0f172a]/5 text-[#0f172a]/60'
                  }`}>
                    {level.ar}
                  </span>
                </div>

                <h3 className={`text-2xl font-black mb-2 ${level.dark ? 'text-white' : 'text-[#0f172a]'}`}>
                  {level.name}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 flex-1 ${
                  level.dark ? 'text-white/80' : 'text-[#6b7280]'
                }`}>
                  {level.desc}
                </p>

                {/* Grade tags */}
                <div className="flex flex-wrap gap-2">
                  {level.grades.map((g) => (
                    <span
                      key={g}
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        level.dark
                          ? 'bg-[#111827] text-white/85 border border-white/15'
                          : 'bg-[rgba(201,162,39,0.08)] text-[#0f172a]/70 border border-[rgba(201,162,39,0.2)]'
                      }`}
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Gold bottom line on hover */}
                <div className="mt-6 h-0.5 rounded-full gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
