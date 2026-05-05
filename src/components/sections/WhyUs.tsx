'use client'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { GraduationCap, BarChart3, Lightbulb, Heart } from 'lucide-react'

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true)
          let start = 0
          const step = Math.ceil(to / 60)
          const timer = setInterval(() => {
            start += step
            if (start >= to) {
              setValue(to)
              clearInterval(timer)
            } else {
              setValue(start)
            }
          }, 25)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to, started])

  return (
    <span ref={ref}>
      {value}{suffix}
    </span>
  )
}

const stats = [
  { value: 500, suffix: '+', label: 'Élèves Formés', icon: <GraduationCap size={20} /> },
  { value: 95, suffix: '%', label: 'Taux de Réussite', icon: <BarChart3 size={20} /> },
  { value: 8, suffix: '+', label: "Années d'Expérience", icon: <Lightbulb size={20} /> },
  { value: 100, suffix: '%', label: 'Satisfaction Parents', icon: <Heart size={20} /> },
]

const reasons = [
  {
    title: 'Professeurs Qualifiés',
    desc: 'Tous nos enseignants sont diplômés, expérimentés et passionnés par la transmission du savoir.',
    num: '01',
  },
  {
    title: 'Taux de Réussite Élevé',
    desc: 'Nos élèves obtiennent en moyenne de bien meilleures notes après quelques semaines de soutien.',
    num: '02',
  },
  {
    title: 'Méthodes Modernes',
    desc: 'Nous adoptons des techniques pédagogiques innovantes adaptées aux programmes actuels.',
    num: '03',
  },
  {
    title: 'Accompagnement Personnalisé',
    desc: 'Chaque élève bénéficie d\'un suivi individuel et d\'un programme adapté à ses besoins.',
    num: '04',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-28 bg-white relative overflow-hidden">
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
            Pourquoi Nous Choisir
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] leading-tight">
            Ce qui Nous
            <br />
            <span className="gold-text">Distingue</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl bg-[#0f172a] border border-[rgba(201,162,39,0.2)] group hover:border-[rgba(201,162,39,0.5)] transition-all duration-300"
            >
              <div className="flex justify-center mb-3 text-[#c9a227]">{s.icon}</div>
              <div className="text-3xl font-black gold-text mb-1">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/50 text-xs font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Reasons */}
        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex gap-5 p-6 rounded-xl border border-[rgba(201,162,39,0.1)] hover:border-[rgba(201,162,39,0.3)] bg-white hover:shadow-[0_8px_30px_rgba(201,162,39,0.08)] transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[rgba(201,162,39,0.12)] to-[rgba(201,162,39,0.05)] flex items-center justify-center group-hover:from-[rgba(201,162,39,0.2)] transition-all">
                <span className="text-lg font-black gold-text">{r.num}</span>
              </div>
              <div>
                <h4 className="font-bold text-[#0f172a] mb-1.5">{r.title}</h4>
                <p className="text-[#6b7280] text-sm leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
