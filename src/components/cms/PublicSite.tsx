'use client'

import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import {
  AlertCircle,
  Award,
  BookOpen,
  Calculator,
  CheckCircle,
  Dna,
  Facebook,
  FlaskConical,
  GraduationCap,
  Heart,
  Instagram,
  Languages,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  School,
  Send,
  Trophy,
  Users,
  X,
  ZoomIn,
} from 'lucide-react'
import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react'
import {
  defaultSiteContent,
  orderedSections,
  type CmsSection,
  type SiteContent,
  type SubjectItem,
} from '@/lib/cms'
import {
  cmsDataUpdatedEvent,
  fetchCmsContentFromSupabase,
  subscribeToCmsDataChanges,
} from '@/lib/supabaseCms'
import Footer from '@/components/sections/Footer'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

const sectionPadding = 'py-20 md:py-28'
const premiumEase = [0.22, 1, 0.36, 1]

function scrollToTarget(href: string) {
  if (href.startsWith('#')) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    return
  }
  window.location.href = href
}

function useCmsContent() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)

  useEffect(() => {
    const refresh = async () => {
      try {
        setContent(await fetchCmsContentFromSupabase())
      } catch {
        setContent(defaultSiteContent)
      }
    }

    const onCmsUpdate = (event: Event) => {
      const detail = (event as CustomEvent<SiteContent>).detail
      if (detail) setContent(detail)
    }

    window.addEventListener(cmsDataUpdatedEvent, onCmsUpdate)
    const unsubscribe = subscribeToCmsDataChanges(setContent)
    void refresh()
    const timer = window.setInterval(refresh, 12000)

    return () => {
      window.removeEventListener(cmsDataUpdatedEvent, onCmsUpdate)
      window.clearInterval(timer)
      unsubscribe()
    }
  }, [])

  return content
}

function motionProps(content: SiteContent, delay = 0) {
  if (!content.design.animationsEnabled) return {}
  return {
    initial: { opacity: 0, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -80px 0px' },
    transition: { duration: 0.72, delay, ease: premiumEase },
  }
}

function interactiveProps(content: SiteContent, lift = 3) {
  if (!content.design.animationsEnabled) return {}
  return {
    whileHover: { y: -lift, scale: 1.015 },
    whileTap: { y: 0, scale: 0.985 },
    transition: { duration: 0.26, ease: premiumEase },
  }
}

function PageLoader({ enabled, color }: { enabled: boolean; color: string }) {
  const [visible, setVisible] = useState(enabled)

  useEffect(() => {
    if (!enabled) return
    const timer = window.setTimeout(() => setVisible(false), 720)
    return () => window.clearTimeout(timer)
  }, [enabled])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: premiumEase }}
          className="fixed inset-x-0 top-0 z-[120] h-[3px] pointer-events-none"
        >
          <div className="loading-bar h-full" style={{ background: color }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function KineticBackdrop({ enabled }: { enabled: boolean }) {
  if (!enabled) return null

  return (
    <>
      <div className="absolute inset-0 kinetic-lines opacity-10" />
    </>
  )
}

function SectionHeading({ section, dark, content }: { section: CmsSection; dark?: boolean; content: SiteContent }) {
  return (
    <motion.div {...motionProps(content)} className="text-center mb-12 md:mb-16">
      <div className="flex justify-center mb-4">
        <div className="h-[3px] w-14 rounded-full" style={{ background: content.design.primaryColor }} />
      </div>
      {section.eyebrow && (
        <p
          className="text-xs font-semibold uppercase mb-3"
          style={{ color: content.design.primaryColor, letterSpacing: '0.18em' }}
        >
          {section.eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl md:text-5xl font-black leading-tight ${dark ? 'text-white' : 'text-slate-950'}`}
      >
        {section.title}
      </h2>
      {section.body && (
        <p className={`mt-4 max-w-2xl mx-auto text-sm leading-relaxed ${dark ? 'text-white/80' : 'text-slate-600'}`}>
          {section.body}
        </p>
      )}
    </motion.div>
  )
}

function Navbar({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navItems = orderedSections(content)
    .filter((section) => section.visible && section.status === 'published')
    .map((section) => ({ label: section.label, href: `#${section.id}` }))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={content.design.animationsEnabled ? { y: -72, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.68, ease: premiumEase }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
        style={{
          background: scrolled ? content.design.darkColor : `${content.design.darkColor}f0`,
          boxShadow: scrolled ? '0 8px 28px rgba(0,0,0,0.22)' : '0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto h-16 px-5 md:px-6 flex items-center justify-between">
          <motion.button
            {...interactiveProps(content, 1)}
            onClick={() => scrollToTarget('#hero')}
            className="flex items-center gap-3 bg-transparent border-0 cursor-pointer"
          >
            <img src={content.design.logoUrl} alt={content.siteName} className="w-9 h-9 rounded-full object-cover border" style={{ borderColor: content.design.primaryColor }} />
            <span className="text-white font-bold uppercase tracking-wide text-sm">{content.siteName}</span>
          </motion.button>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                {...interactiveProps(content, 1)}
                onClick={() => scrollToTarget(item.href)}
                className="nav-motion-link bg-transparent border-0 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wide cursor-pointer transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <motion.button
            {...interactiveProps(content, 2)}
            onClick={() => scrollToTarget('#registration')}
            className="premium-button hidden lg:inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold"
            style={{ background: content.design.primaryColor, color: content.design.darkColor }}
          >
            <GraduationCap size={16} />
            S'inscrire
          </motion.button>

          <motion.button {...interactiveProps(content, 1)} onClick={() => setOpen(!open)} className="lg:hidden text-white p-2 bg-transparent border-0">
            {open ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={content.design.animationsEnabled ? { opacity: 0, y: -14 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: premiumEase }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden border-t border-white/10"
            style={{ background: content.design.darkColor }}
          >
            <div className="px-6 py-5 flex flex-col gap-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={content.design.animationsEnabled ? { opacity: 0, x: -12 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.24, delay: index * 0.035, ease: premiumEase }}
                  onClick={() => {
                    setOpen(false)
                    scrollToTarget(item.href)
                  }}
                  className="text-left text-white/80 py-2 bg-transparent border-0 border-b border-white/10 cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function AnnouncementBar({ content }: { content: SiteContent }) {
  const visible = content.announcements.filter((item) => item.visible)
  if (!visible.length) return null

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24">
      <div className="grid gap-3">
        {visible.map((item, index) => (
          <motion.div
            key={item.id}
            {...motionProps(content, index * 0.04)}
            className="premium-card rounded-lg border px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-slate-950"
            style={{ borderColor: `${content.design.primaryColor}55` }}
          >
            <span className="font-bold" style={{ color: content.design.primaryColor }}>
              {item.kind === 'promotion' ? 'Promotion' : 'Annonce'}
            </span>
            <span className="text-white/85">{item.title}: {item.message}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function HeroSection({ section, content }: { section: CmsSection; content: SiteContent }) {
  return (
    <section
      id={section.id}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: content.design.darkColor }}
    >
      <img src={section.image || content.design.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${content.design.darkColor} 0%, ${content.design.darkColor}ee 54%, #111827dd 100%)` }} />
      <KineticBackdrop enabled={content.design.animationsEnabled} />
      <AnnouncementBar content={content} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center">
        <motion.div {...motionProps(content)} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 mb-8 bg-slate-950" style={{ borderColor: `${content.design.primaryColor}88`, color: content.design.primaryColor }}>
          <Trophy size={14} />
          <span className="text-xs font-bold uppercase tracking-wide">{section.eyebrow}</span>
        </motion.div>

        <motion.div {...motionProps(content, 0.08)} className="flex justify-center mb-8">
          <img src={content.design.logoUrl} alt={content.siteName} className="w-28 h-28 rounded-full object-cover border-2 shadow-xl" style={{ borderColor: content.design.primaryColor }} />
        </motion.div>

        <motion.h1 {...motionProps(content, 0.12)} className="text-5xl md:text-7xl font-black leading-none text-white mb-5">
          <span style={{ color: content.design.primaryColor }}>{section.title.split(' ')[0] || content.siteName}</span>
          <br />
          <span>{section.title.split(' ').slice(1).join(' ') || content.siteName}</span>
        </motion.h1>

        <motion.p {...motionProps(content, 0.18)} className="text-lg md:text-xl text-white/90 font-semibold mb-4">
          {section.subtitle}
        </motion.p>
        <motion.p {...motionProps(content, 0.22)} className="text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed mb-9">
          {section.body}
        </motion.p>

        <motion.div {...motionProps(content, 0.28)} className="flex flex-col sm:flex-row gap-4 justify-center">
          {section.primaryButton && (
            <motion.button
              {...interactiveProps(content, 3)}
              onClick={() => scrollToTarget(section.primaryButton?.href ?? '#registration')}
              className="premium-button rounded-md px-7 py-3.5 font-bold inline-flex items-center justify-center gap-2"
              style={{ background: content.design.primaryColor, color: content.design.darkColor }}
            >
              <GraduationCap size={18} />
              {section.primaryButton.label}
            </motion.button>
          )}
          {section.secondaryButton && (
            <motion.button
              {...interactiveProps(content, 3)}
              onClick={() => scrollToTarget(section.secondaryButton?.href ?? '#contact')}
              className="premium-button rounded-md px-7 py-3.5 font-bold border text-white"
              style={{ borderColor: `${content.design.primaryColor}99` }}
            >
              {section.secondaryButton.label}
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection({ section, content }: { section: CmsSection; content: SiteContent }) {
  const cards = [
    { icon: <Users size={22} />, title: 'Petits groupes', text: 'Un suivi plus attentif pour chaque eleve.' },
    { icon: <BookOpen size={22} />, title: 'Programmes adaptes', text: 'Des cours alignes avec les besoins et les examens.' },
    { icon: <Heart size={22} />, title: 'Suivi personnalise', text: 'Un accompagnement regulier avec les familles.' },
  ]

  return (
    <section id={section.id} className={`${sectionPadding} bg-white`}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading section={section} content={content} />
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div {...motionProps(content, 0.08)} {...interactiveProps(content, 2)} className="relative overflow-hidden rounded-lg">
            <img src={section.image || content.design.backgroundImage} alt={section.title} className="w-full aspect-[4/3] object-cover rounded-lg transition-transform duration-700 ease-in-out hover:scale-[1.025]" />
          </motion.div>
          <motion.div {...motionProps(content, 0.14)}>
            <h3 className="text-2xl font-black text-slate-950 mb-4">{section.subtitle}</h3>
            <p className="text-slate-500 leading-relaxed text-sm mb-7">{section.body}</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {cards.map((card, index) => (
                <motion.div key={card.title} {...motionProps(content, 0.18 + index * 0.04)} {...interactiveProps(content, 2)} className="premium-card soft-sheen rounded-lg border border-slate-200 p-4">
                  <div style={{ color: content.design.primaryColor }}>{card.icon}</div>
                  <h4 className="text-sm font-bold text-slate-950 mt-3">{card.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function levelIcon(icon: string, color: string) {
  const props = { size: 30, style: { color } }
  if (icon === 'book') return <BookOpen {...props} />
  if (icon === 'award') return <Award {...props} />
  return <School {...props} />
}

function LevelsSection({ section, content }: { section: CmsSection; content: SiteContent }) {
  return (
    <section id={section.id} className={sectionPadding} style={{ background: content.design.lightBackground }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading section={section} content={content} />
        <div className="grid md:grid-cols-3 gap-5">
          {content.levels.filter((level) => level.visible).map((level, index) => (
            <motion.div key={level.id} {...motionProps(content, index * 0.06)} {...interactiveProps(content, 4)} className="premium-card soft-sheen rounded-lg border border-slate-200 bg-white p-6">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-5" style={{ background: `${content.design.primaryColor}18` }}>
                {levelIcon(level.icon, content.design.primaryColor)}
              </div>
              <h3 className="text-xl font-black text-slate-950">{level.name}</h3>
              <p className="text-xs font-semibold mt-1" style={{ color: content.design.primaryColor }}>{level.label}</p>
              <p className="text-sm text-slate-500 mt-4 leading-relaxed">{level.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {level.grades.map((grade) => (
                  <span key={grade} className="rounded-full px-3 py-1 text-xs bg-slate-100 text-slate-600">{grade}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function subjectIcon(subject: SubjectItem, color: string) {
  const props = { size: 30, style: { color } }
  if (subject.icon === 'atom') return <FlaskConical {...props} />
  if (subject.icon === 'dna') return <Dna {...props} />
  if (subject.icon === 'languages') return <Languages {...props} />
  if (subject.icon === 'message') return <MessageCircle {...props} />
  return <Calculator {...props} />
}

function SubjectsSection({ section, content }: { section: CmsSection; content: SiteContent }) {
  const subjects = [...content.subjects].filter((subject) => subject.visible).sort((a, b) => a.order - b.order)

  return (
    <section id={section.id} className={`${sectionPadding} bg-white`}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading section={section} content={content} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {subjects.map((subject, index) => (
            <motion.div key={subject.id} {...motionProps(content, index * 0.05)} {...interactiveProps(content, 4)} className="premium-card soft-sheen rounded-lg border border-slate-200 p-5 bg-white hover:shadow-lg transition-shadow">
              {subjectIcon(subject, content.design.primaryColor)}
              <h3 className="font-black text-slate-950 mt-4">{subject.name}</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{subject.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeachersSection({ section, content }: { section: CmsSection; content: SiteContent }) {
  const teachers = content.teachers.filter((teacher) => teacher.visible)
  if (!teachers.length) return null

  return (
    <section id={section.id} className={sectionPadding} style={{ background: content.design.lightBackground }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading section={section} content={content} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teachers.map((teacher, index) => (
            <motion.div key={teacher.id} {...motionProps(content, index * 0.06)} {...interactiveProps(content, 4)} className="premium-card rounded-lg bg-white border border-slate-200 overflow-hidden">
              <img src={teacher.photo || content.design.logoUrl} alt={teacher.name} className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-in-out hover:scale-[1.035]" />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: content.design.primaryColor }}>{teacher.specialty}</p>
                <h3 className="text-lg font-black text-slate-950 mt-1">{teacher.name}</h3>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">{teacher.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GallerySection({ section, content }: { section: CmsSection; content: SiteContent }) {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const images = content.galleryAlbums
    .filter((album) => album.visible)
    .flatMap((album) => album.images.map((image) => ({ ...image, album: album.title })))

  return (
    <section id={section.id} className={sectionPadding} style={{ background: content.design.darkColor }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading section={section} content={content} dark />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              {...motionProps(content, index * 0.04)}
              {...interactiveProps(content, 2)}
              onClick={() => setLightbox(image.src)}
              className="premium-card relative rounded-lg overflow-hidden border border-white/10 bg-transparent p-0 text-left group"
              style={{ aspectRatio: image.featured ? '3/4' : '4/3' }}
            >
              <img src={image.src} alt={image.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute left-3 bottom-3 right-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">{image.caption}</div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100" style={{ background: content.design.primaryColor, color: content.design.darkColor }}>
                <ZoomIn size={15} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: premiumEase }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.button
              {...interactiveProps(content, 1)}
              className="absolute top-5 right-5 rounded-full bg-white/15 text-white p-3"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.32, ease: premiumEase }}
              src={lightbox}
              alt="Gallery preview"
              className="max-w-full max-h-[90vh] rounded-lg object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function WhyUsSection({ section, content }: { section: CmsSection; content: SiteContent }) {
  const items = [
    { icon: <GraduationCap size={22} />, value: '500+', label: 'Eleves formes' },
    { icon: <Trophy size={22} />, value: '95%', label: 'Taux de reussite' },
    { icon: <BookOpen size={22} />, value: '8+', label: "Annees d'experience" },
    { icon: <Heart size={22} />, value: '100%', label: 'Satisfaction parents' },
  ]

  return (
    <section id={section.id} className={`${sectionPadding} bg-white`}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading section={section} content={content} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <motion.div key={item.label} {...motionProps(content, index * 0.06)} {...interactiveProps(content, 3)} className="premium-card rounded-lg p-6 text-center" style={{ background: content.design.darkColor }}>
              <div className="flex justify-center" style={{ color: content.design.primaryColor }}>{item.icon}</div>
              <div className="text-3xl font-black mt-3" style={{ color: content.design.primaryColor }}>{item.value}</div>
              <div className="text-white/80 text-xs font-semibold mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RegistrationSection({ section, content }: { section: CmsSection; content: SiteContent }) {
  const [state, setState] = useState<SubmitState>('idle')
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    parentPhone: '',
    academicLevel: '',
    selectedSubject: '',
    message: '',
  })

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setState('loading')

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok && response.status !== 202) throw new Error('Registration failed')
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <section id={section.id} className={sectionPadding} style={{ background: content.design.darkColor }}>
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading section={section} content={content} dark />
        <motion.div {...motionProps(content, 0.08)} className="rounded-lg border border-white/20 bg-slate-950 p-6 md:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <AnimatePresence mode="wait">
          {state === 'success' ? (
            <motion.div
              key="registration-success"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.3, ease: premiumEase }}
              className="text-center py-8"
            >
              <CheckCircle size={40} className="mx-auto mb-4" style={{ color: content.design.primaryColor }} />
              <h3 className="text-white font-black text-xl">Inscription envoyee</h3>
              <p className="text-white/80 text-sm mt-2">Merci. Notre equipe vous contactera bientot.</p>
              <motion.button
                {...interactiveProps(content, 2)}
                onClick={() => {
                  setState('idle')
                  setForm({ fullName: '', phone: '', parentPhone: '', academicLevel: '', selectedSubject: '', message: '' })
                }}
                className="premium-button rounded-md px-5 py-3 mt-6 font-bold"
                style={{ background: content.design.primaryColor, color: content.design.darkColor }}
              >
                Nouvelle inscription
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="registration-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: premiumEase }}
              onSubmit={submit}
              className="space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <FormInput label="Nom complet" value={form.fullName} onChange={(value) => setForm({ ...form, fullName: value })} required dark />
                <FormInput label="Numero de telephone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} required dark />
              </div>
              <FormInput label="Telephone du parent" value={form.parentPhone} onChange={(value) => setForm({ ...form, parentPhone: value })} required dark />
              <div className="grid md:grid-cols-2 gap-5">
                <FormSelect label="Niveau scolaire" value={form.academicLevel} onChange={(value) => setForm({ ...form, academicLevel: value })} options={content.levels.filter((level) => level.visible).map((level) => level.name)} dark />
                <FormSelect label="Matiere choisie" value={form.selectedSubject} onChange={(value) => setForm({ ...form, selectedSubject: value })} options={content.subjects.filter((subject) => subject.visible).map((subject) => subject.name)} dark />
              </div>
              <FormTextarea label="Message optionnel" value={form.message} onChange={(value) => setForm({ ...form, message: value })} dark />

              {state === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-200 bg-red-500/10 border border-red-300/20 rounded-lg px-4 py-3">
                  <AlertCircle size={16} />
                  Impossible d'envoyer le formulaire pour le moment.
                </div>
              )}

              <motion.button {...interactiveProps(content, 2)} type="submit" disabled={state === 'loading'} className="premium-button w-full rounded-md px-5 py-4 font-black disabled:opacity-60" style={{ background: content.design.primaryColor, color: content.design.darkColor }}>
                <span className="inline-flex items-center justify-center gap-2">
                  <motion.span
                    animate={state === 'loading' ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.9, repeat: state === 'loading' ? Infinity : 0, ease: 'linear' }}
                    className="inline-flex"
                  >
                    <Send size={17} />
                  </motion.span>
                  {state === 'loading' ? 'Envoi en cours...' : "Envoyer ma demande d'inscription"}
                </span>
              </motion.button>
            </motion.form>
          )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function ContactSection({ section, content }: { section: CmsSection; content: SiteContent }) {
  const [state, setState] = useState<SubmitState>('idle')
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', message: '' })

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setState('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok && response.status !== 202) throw new Error('Contact failed')
      setState('success')
      setForm({ fullName: '', phone: '', email: '', message: '' })
    } catch {
      setState('error')
    }
  }

  const items = [
    { icon: <Phone size={19} />, label: 'Telephone', value: content.contact.phone, href: `tel:${content.contact.phone.replace(/\s/g, '')}` },
    { icon: <Mail size={19} />, label: 'Email', value: content.contact.email, href: `mailto:${content.contact.email}` },
    { icon: <MapPin size={19} />, label: 'Adresse', value: content.contact.address, href: content.contact.mapsUrl },
  ]

  return (
    <section id={section.id} className={sectionPadding} style={{ background: content.design.lightBackground }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading section={section} content={content} />
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.a key={item.label} {...motionProps(content, index * 0.04)} {...interactiveProps(content, 3)} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="premium-card rounded-lg bg-white border border-slate-200 p-5 flex gap-4 items-center no-underline">
                <span className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: `${content.design.primaryColor}18`, color: content.design.primaryColor }}>{item.icon}</span>
                <span>
                  <span className="block text-xs font-bold text-slate-500">{item.label}</span>
                  <span className="block text-sm font-bold text-slate-950">{item.value}</span>
                </span>
              </motion.a>
            ))}
            <div className="flex gap-3">
              <motion.a {...interactiveProps(content, 2)} href={content.contact.facebook} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white border border-slate-200 p-3 text-slate-700"><Facebook size={18} /></motion.a>
              <motion.a {...interactiveProps(content, 2)} href={content.contact.instagram} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white border border-slate-200 p-3 text-slate-700"><Instagram size={18} /></motion.a>
            </div>
            <iframe title={`${content.siteName} map`} src={content.contact.mapsEmbed} className="w-full h-72 rounded-lg border border-slate-200" loading="lazy" />
          </div>

          <motion.form {...motionProps(content, 0.08)} onSubmit={submit} className="premium-card rounded-lg bg-white border border-slate-200 p-6 space-y-4">
            <FormInput label="Nom complet" value={form.fullName} onChange={(value) => setForm({ ...form, fullName: value })} required />
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput label="Telephone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
              <FormInput label="Email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
            </div>
            <FormTextarea label="Message" value={form.message} onChange={(value) => setForm({ ...form, message: value })} required />
            {state === 'success' && <p className="text-sm text-green-700">Message envoye avec succes.</p>}
            {state === 'error' && <p className="text-sm text-red-700">Impossible d'envoyer le message.</p>}
            <motion.button {...interactiveProps(content, 2)} type="submit" disabled={state === 'loading'} className="premium-button rounded-md px-5 py-3 font-bold disabled:opacity-60" style={{ background: content.design.primaryColor, color: content.design.darkColor }}>
              {state === 'loading' ? 'Envoi...' : 'Envoyer le message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function CustomSection({ section, content }: { section: CmsSection; content: SiteContent }) {
  return (
    <section id={section.id} className={`${sectionPadding} bg-white`}>
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading section={section} content={content} />
        {section.image && (
          <motion.img
            {...motionProps(content, 0.08)}
            {...interactiveProps(content, 2)}
            src={section.image}
            alt={section.title}
            className="w-full rounded-lg object-cover max-h-[520px]"
          />
        )}
      </div>
    </section>
  )
}

function FormInput({ label, value, onChange, required, dark }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; dark?: boolean }) {
  return (
    <label className="block">
      <span className={`block text-xs font-bold uppercase tracking-wide mb-2 ${dark ? 'text-white/85' : 'text-slate-600'}`}>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} required={required} className={`w-full rounded-lg px-4 py-3 text-sm border ${dark ? 'bg-slate-900 border-white/25 text-white placeholder-white/45' : 'bg-white border-slate-200 text-slate-950'}`} />
    </label>
  )
}

function FormTextarea({ label, value, onChange, required, dark }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; dark?: boolean }) {
  return (
    <label className="block">
      <span className={`block text-xs font-bold uppercase tracking-wide mb-2 ${dark ? 'text-white/85' : 'text-slate-600'}`}>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} required={required} rows={4} className={`w-full rounded-lg px-4 py-3 text-sm border resize-none ${dark ? 'bg-slate-900 border-white/25 text-white placeholder-white/45' : 'bg-white border-slate-200 text-slate-950'}`} />
    </label>
  )
}

function FormSelect({ label, value, onChange, options, dark }: { label: string; value: string; onChange: (value: string) => void; options: string[]; dark?: boolean }) {
  return (
    <label className="block">
      <span className={`block text-xs font-bold uppercase tracking-wide mb-2 ${dark ? 'text-white/85' : 'text-slate-600'}`}>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} required className={`w-full rounded-lg px-4 py-3 text-sm border ${dark ? 'bg-slate-950 border-white/15 text-white' : 'bg-white border-slate-200 text-slate-950'}`}>
        <option value="">Selectionner</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}

function renderSection(section: CmsSection, content: SiteContent) {
  if (section.type === 'hero') return <HeroSection key={section.id} section={section} content={content} />
  if (section.type === 'about') return <AboutSection key={section.id} section={section} content={content} />
  if (section.type === 'levels') return <LevelsSection key={section.id} section={section} content={content} />
  if (section.type === 'subjects') return <SubjectsSection key={section.id} section={section} content={content} />
  if (section.type === 'teachers') return <TeachersSection key={section.id} section={section} content={content} />
  if (section.type === 'gallery') return <GallerySection key={section.id} section={section} content={content} />
  if (section.type === 'whyUs') return <WhyUsSection key={section.id} section={section} content={content} />
  if (section.type === 'registration') return <RegistrationSection key={section.id} section={section} content={content} />
  if (section.type === 'contact') return <ContactSection key={section.id} section={section} content={content} />
  return <CustomSection key={section.id} section={section} content={content} />
}

export default function PublicSite() {
  const content = useCmsContent()
  const style = {
    '--gold': content.design.primaryColor,
    '--gold-light': content.design.accentColor,
    '--navy': content.design.darkColor,
  } as CSSProperties

  const sections = useMemo(() => {
    const visible = orderedSections(content).filter((section) => section.visible && section.status === 'published')
    if (content.design.homepageLayout !== 'gallery-first') return visible
    const gallery = visible.find((section) => section.type === 'gallery')
    return gallery ? [visible[0], gallery, ...visible.filter((section) => section.id !== gallery.id && section.id !== visible[0]?.id)].filter(Boolean) as CmsSection[] : visible
  }, [content])

  return (
    <MotionConfig transition={{ duration: 0.42, ease: premiumEase }} reducedMotion="user">
      <PageLoader enabled={content.design.animationsEnabled} color={content.design.primaryColor} />
      <motion.div
        initial={content.design.animationsEnabled ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: premiumEase }}
        className="premium-page min-h-screen"
        style={style}
      >
        <Navbar content={content} />
        <main>
          <AnimatePresence mode="popLayout">
            {sections.map((section) => renderSection(section, content))}
          </AnimatePresence>
        </main>
        <Footer content={content} />
        <motion.a
          href={`https://wa.me/${content.contact.whatsapp.replace(/[^\d]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={content.design.animationsEnabled ? { scale: 0, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={content.design.animationsEnabled ? { scale: 1.1, y: -3 } : undefined}
          whileTap={content.design.animationsEnabled ? { scale: 0.94 } : undefined}
          className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: '#25d366' }}
          aria-label="Contactez-nous sur WhatsApp"
        >
          <MessageCircle size={26} fill="white" color="white" />
        </motion.a>
      </motion.div>
    </MotionConfig>
  )
}
