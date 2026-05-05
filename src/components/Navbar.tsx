'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Niveaux', href: '#levels' },
  { label: 'Matières', href: '#subjects' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Inscription', href: '#registration' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0f172a] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-[#0f172a]/95'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => scrollTo('#hero')} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[rgba(201,162,39,0.4)] gold-glow">
              <img src="/gallery/457477211_879188057607088_4773325454540207494_n.jpg" alt="Center Tyani" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-white text-sm tracking-wider uppercase">
              Center <span className="gold-text">Tyani</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="nav-link bg-transparent border-none cursor-pointer font-[inherit]"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <button onClick={() => scrollTo('#registration')} className="btn-gold text-sm px-5 py-2.5">
              <span>S'inscrire</span>
            </button>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20, pointerEvents: 'none' }}
        transition={{ duration: 0.3 }}
        className="fixed top-16 left-0 right-0 z-40 bg-[#0f172a] border-b border-[rgba(201,162,39,0.15)] lg:hidden"
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-white/80 hover:text-[#c9a227] text-left py-2 border-b border-white/5 text-sm font-medium tracking-wide bg-transparent border-x-0 border-t-0 cursor-pointer font-[inherit] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#registration')} className="btn-gold mt-2 text-sm w-full">
            <span>S'inscrire maintenant</span>
          </button>
        </div>
      </motion.div>
    </>
  )
}
