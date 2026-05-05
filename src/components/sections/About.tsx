'use client'
import { motion } from 'framer-motion'
import { Users, BookOpen, UserCheck, Trophy, Heart } from 'lucide-react'

const features = [
  {
    icon: <Users size={22} className="text-[#c9a227]" />,
    title: 'Professeurs Professionnels',
    desc: 'Une équipe d\'enseignants qualifiés et expérimentés, dédiés à la réussite de chaque élève.',
  },
  {
    icon: <BookOpen size={22} className="text-[#c9a227]" />,
    title: 'Soutien Académique',
    desc: 'Des programmes de soutien adaptés aux besoins individuels, pour renforcer les bases et exceller.',
  },
  {
    icon: <Users size={22} className="text-[#c9a227]" />,
    title: 'Petits Groupes',
    desc: 'Des classes à effectif réduit pour garantir un suivi personnalisé et une meilleure attention.',
  },
  {
    icon: <Trophy size={22} className="text-[#c9a227]" />,
    title: 'Réussite des Élèves',
    desc: 'Résultats prouvés avec un taux de réussite exceptionnel aux examens nationaux.',
  },
  {
    icon: <Heart size={22} className="text-[#c9a227]" />,
    title: 'Suivi Personnalisé',
    desc: 'Un accompagnement continu tout au long de l\'année scolaire, avec un bilan régulier.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function About() {
  return (
    <section id="about" className="py-28 bg-white geometric-pattern relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#c9a227] opacity-[0.03]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#0f172a] opacity-[0.035]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
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
            Qui Sommes-Nous
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] leading-tight mb-5">
            L'Excellence au Service
            <br />
            <span className="gold-text">de Votre Avenir</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto leading-relaxed text-base">
            Center Tyani est un centre de formation et de soutien scolaire fondé avec la
            conviction que chaque élève mérite un accompagnement de qualité. Nous offrons
            un cadre académique stimulant et bienveillant.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/gallery/waa3.jpg"
                alt="Centre Tyani – salle de classe"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-5 -right-5 glass-card rounded-xl px-5 py-4 gold-border"
            >
              <div className="text-2xl font-black gold-text">8+</div>
              <div className="text-[#374151] text-xs font-medium">Années d'expérience</div>
            </motion.div>
            {/* Gold accent line */}
            <div className="absolute -left-4 top-8 bottom-8 w-1 gold-gradient rounded-full" />
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
              Une approche pédagogique moderne
            </h3>
            <p className="text-[#6b7280] leading-relaxed mb-6 text-sm">
              Chez Center Tyani, nous combinons des méthodes d'enseignement éprouvées avec
              des outils pédagogiques innovants pour offrir une expérience d'apprentissage
              unique. Notre priorité : la réussite de chaque élève.
            </p>
            <p className="text-[#6b7280] leading-relaxed mb-8 text-sm">
              Que ce soit pour renforcer les bases, préparer les examens ou explorer de
              nouvelles matières, nos enseignants sont là pour guider chaque étape du
              parcours académique.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => document.querySelector('#registration')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gold text-sm"
              >
                <span>S'inscrire</span>
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[#0f172a] text-sm font-semibold hover:text-[#c9a227] transition-colors underline underline-offset-4"
              >
                En savoir plus →
              </button>
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="glass-card rounded-xl p-5 group hover:shadow-[0_8px_32px_rgba(201,162,39,0.15)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(201,162,39,0.1)] flex items-center justify-center mb-3 group-hover:bg-[rgba(201,162,39,0.18)] transition-colors">
                {f.icon}
              </div>
              <h4 className="font-semibold text-[#0f172a] text-sm mb-1.5">{f.title}</h4>
              <p className="text-[#6b7280] text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
