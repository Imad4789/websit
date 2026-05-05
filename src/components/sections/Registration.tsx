'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const levels = ['Collège', 'Lycée', 'BAC – Sciences Maths', 'BAC – Sciences Physiques', 'BAC – Sciences de la Vie']
const subjects = ['Mathématiques', 'Physique', 'SVT', 'Français', 'English', 'Plusieurs matières']

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Registration() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', phone: '', level: '', subject: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200))
    setState('success')
  }

  const inputClass = `w-full bg-[#111827] border border-white/25 rounded-lg px-4 py-3 text-white placeholder-white/45 text-sm transition-all duration-200 focus:border-[rgba(201,162,39,0.6)] focus:bg-[#111827]`
  const labelClass = `block text-white/70 text-xs font-semibold tracking-wider uppercase mb-2`

  return (
    <section id="registration" className="py-28 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0 hero-geometric" />
      {/* Gold orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a227] opacity-[0.025]" />

      <div className="max-w-3xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="section-divider" />
          </div>
          <p className="text-[#c9a227] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Inscription
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Rejoignez
            <br />
            <span className="gold-text">Center Tyani</span>
          </h2>
          <p className="text-white/45 text-sm mt-4 max-w-md mx-auto">
            Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les plus brefs délais.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-dark rounded-2xl p-8 md:p-10 border border-[rgba(201,162,39,0.2)]"
          style={{
            background: '#0f172a',
          }}
        >
          {state === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[rgba(201,162,39,0.15)] flex items-center justify-center">
                  <CheckCircle size={32} className="text-[#c9a227]" />
                </div>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Inscription envoyée !</h3>
              <p className="text-white/50 text-sm max-w-sm mx-auto">
                Merci pour votre inscription. Notre équipe vous contactera bientôt.
              </p>
              <button
                onClick={() => { setState('idle'); setForm({ name: '', phone: '', level: '', subject: '' }) }}
                className="mt-6 btn-gold text-sm"
              >
                <span>Nouvelle inscription</span>
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Nom complet</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom complet"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
                <div>
                  <label className={labelClass}>Numéro de téléphone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+212 6 XX XX XX XX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Niveau scolaire</label>
                <select
                  required
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className={`${inputClass} cursor-pointer`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <option value="" disabled style={{ background: '#0f172a' }}>Sélectionner un niveau</option>
                  {levels.map((l) => (
                    <option key={l} value={l} style={{ background: '#0f172a' }}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Matière souhaitée</label>
                <select
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={`${inputClass} cursor-pointer`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <option value="" disabled style={{ background: '#0f172a' }}>Sélectionner une matière</option>
                  {subjects.map((s) => (
                    <option key={s} value={s} style={{ background: '#0f172a' }}>{s}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={state === 'loading'}
                className="w-full btn-gold py-4 text-base mt-2 disabled:opacity-70"
              >
                <span className="flex items-center justify-center gap-2">
                  {state === 'loading' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-[#0f172a]/30 border-t-[#0f172a] rounded-full"
                      />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer ma demande d'inscription
                    </>
                  )}
                </span>
              </button>

              <p className="text-center text-white/30 text-xs pt-1">
                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
