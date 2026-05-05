'use client'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

const contactItems = [
  {
    icon: <Phone size={20} className="text-[#c9a227]" />,
    label: 'Téléphone',
    value: '+212 6 64 22 69 60',
    href: 'tel:+212664226960',
  },
  {
    icon: <Mail size={20} className="text-[#c9a227]" />,
    label: 'Email',
    value: 'centretyanibelfaa@gmail.com',
    href: 'mailto:centretyanibelfaa@gmail.com',
  },
  {
    icon: <MapPin size={20} className="text-[#c9a227]" />,
    label: 'Adresse',
    value: 'Belfaa, Maroc',
    href: 'https://maps.app.goo.gl/VCZRBQQrZ2PJAU7U9',
  },
]

const socials = [
  {
    icon: <Facebook size={18} />,
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100065477044363',
  },
  {
    icon: <Instagram size={18} />,
    label: 'Instagram',
    href: 'https://instagram.com/centretyanibelfaa',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-28 bg-[#f5f5f5] relative overflow-hidden">
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
            Contactez-Nous
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] leading-tight">
            Nous Sommes
            <br />
            <span className="gold-text">À Votre Écoute</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {contactItems.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-[rgba(201,162,39,0.12)] hover:border-[rgba(201,162,39,0.4)] hover:shadow-[0_8px_24px_rgba(201,162,39,0.1)] transition-all duration-300 group no-underline"
              >
                <div className="w-11 h-11 rounded-lg bg-[rgba(201,162,39,0.1)] flex items-center justify-center group-hover:bg-[rgba(201,162,39,0.18)] transition-colors flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="text-[#6b7280] text-xs font-medium mb-0.5">{c.label}</p>
                  <p className="text-[#0f172a] font-semibold text-sm">{c.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="flex gap-3 pt-2"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-[rgba(201,162,39,0.12)] hover:border-[rgba(201,162,39,0.4)] hover:shadow-[0_4px_16px_rgba(201,162,39,0.1)] text-[#0f172a] hover:text-[#c9a227] transition-all duration-300 text-sm font-medium no-underline"
                >
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-[rgba(201,162,39,0.2)] shadow-[0_8px_32px_rgba(15,23,42,0.08)] h-[380px]"
          >
            <iframe
              src="https://maps.google.com/maps?q=Centre%20Tyani%20Belfaa&ll=30.047226,-9.5651862&z=16&hl=fr&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Center Tyani – Belfaa, Maroc"
            />
          </motion.div>
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 rounded-2xl bg-[#0f172a] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[rgba(201,162,39,0.2)]"
        >
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Prêt à rejoindre Center Tyani ?</h3>
            <p className="text-white/45 text-sm">Inscrivez-vous dès maintenant et commencez votre parcours vers l'excellence.</p>
          </div>
          <button
            onClick={() => document.querySelector('#registration')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold whitespace-nowrap"
          >
            <span>S'inscrire Maintenant</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
