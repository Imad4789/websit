'use client'

import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import { defaultSiteContent, orderedSections, type SiteContent } from '@/lib/cms'

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer({ content = defaultSiteContent }: { content?: SiteContent }) {
  const links = orderedSections(content).filter(
    (section) => section.visible && section.status === 'published' && section.type !== 'hero'
  )

  return (
    <footer className="border-t" style={{ background: '#0a101f', borderColor: `${content.design.primaryColor}33` }}>
      <div className="h-[1px]" style={{ background: content.design.primaryColor, opacity: 0.45 }} />
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={content.design.logoUrl} alt={content.siteName} className="w-10 h-10 rounded-full object-cover border" style={{ borderColor: content.design.primaryColor }} />
              <div>
                <div className="font-black text-white tracking-wide text-sm uppercase">{content.siteName}</div>
                <div className="text-white/35 text-xs">Excellence Academique</div>
              </div>
            </div>
            <p className="text-white/45 text-xs leading-relaxed max-w-xs">
              Centre de formation et cours de soutien a Belfaa. Nous accompagnons chaque eleve vers la reussite.
            </p>
            <div className="flex gap-3 mt-5">
              <a href={content.contact.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/75 hover:text-white">
                <Facebook size={15} />
              </a>
              <a href={content.contact.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/75 hover:text-white">
                <Instagram size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(`#${link.id}`)}
                    className="text-white/45 hover:text-white text-xs transition-colors bg-transparent border-0 cursor-pointer font-[inherit] text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Contact</h4>
            <div className="space-y-3">
              <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-white/45 hover:text-white transition-colors no-underline text-xs">
                <Phone size={13} style={{ color: content.design.primaryColor }} />
                {content.contact.phone}
              </a>
              <a href={`mailto:${content.contact.email}`} className="flex items-center gap-3 text-white/45 hover:text-white transition-colors no-underline text-xs break-all">
                <Mail size={13} style={{ color: content.design.primaryColor }} />
                {content.contact.email}
              </a>
            </div>
            <button
              onClick={() => scrollTo('#registration')}
              className="rounded-md text-xs px-5 py-2.5 font-bold mt-6"
              style={{ background: content.design.primaryColor, color: content.design.darkColor }}
            >
              S'inscrire
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            Copyright {new Date().getFullYear()} {content.siteName}. Tous droits reserves.
          </p>
          <a href="/admin" className="text-white/25 hover:text-white text-xs transition-colors no-underline font-medium tracking-wider">
            Admin
          </a>
        </div>
      </div>
    </footer>
  )
}
