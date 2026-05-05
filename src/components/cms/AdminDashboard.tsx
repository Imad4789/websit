'use client'

import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  FileDown,
  GripVertical,
  Image,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Megaphone,
  Palette,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  Users,
} from 'lucide-react'
import { useEffect, useMemo, useState, type DragEvent } from 'react'
import {
  adminTokenStorageKey,
  createId,
  defaultSiteContent,
  orderedSections,
  type Announcement,
  type CmsSection,
  type ContactMessageRecord,
  type GalleryAlbum,
  type GalleryImage,
  type LevelItem,
  type RegistrationRecord,
  type SectionType,
  type SiteContent,
  type SubjectItem,
  type TeacherItem,
} from '@/lib/cms'
import {
  fetchCmsContentFromSupabase,
  isSupabaseBrowserConfigured,
  subscribeToCmsDataChanges,
  upsertCmsContentToSupabase,
} from '@/lib/supabaseCms'

type AdminTab =
  | 'builder'
  | 'text'
  | 'media'
  | 'levels'
  | 'subjects'
  | 'teachers'
  | 'contact'
  | 'design'
  | 'registrations'
  | 'messages'
  | 'setup'

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

const adminEase = [0.22, 1, 0.36, 1]

const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  { id: 'builder', label: 'Builder', icon: <LayoutDashboard size={17} /> },
  { id: 'text', label: 'Text', icon: <Megaphone size={17} /> },
  { id: 'media', label: 'Media', icon: <Image size={17} /> },
  { id: 'levels', label: 'Levels', icon: <Users size={17} /> },
  { id: 'subjects', label: 'Subjects', icon: <Settings size={17} /> },
  { id: 'teachers', label: 'Teachers', icon: <Users size={17} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={17} /> },
  { id: 'design', label: 'Design', icon: <Palette size={17} /> },
  { id: 'registrations', label: 'Registrations', icon: <FileDown size={17} /> },
  { id: 'messages', label: 'Messages', icon: <Mail size={17} /> },
  { id: 'setup', label: 'Setup', icon: <Lock size={17} /> },
]

const sectionTypes: SectionType[] = [
  'custom',
  'about',
  'levels',
  'subjects',
  'teachers',
  'gallery',
  'whyUs',
  'registration',
  'contact',
]

function adminReveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 18, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.42, delay, ease: adminEase },
  }
}

function adminHover(lift = 2) {
  return {
    whileHover: { y: -lift },
    whileTap: { scale: 0.985, y: 0 },
    transition: { duration: 0.22, ease: adminEase },
  }
}

function cloneContent(content: SiteContent) {
  return JSON.parse(JSON.stringify(content)) as SiteContent
}

function authHeaders(token: string) {
  return {
    authorization: `Bearer ${token}`,
  }
}

function readStoredToken() {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(adminTokenStorageKey) || ''
}

function csvEscape(value: string) {
  const normalized = value.replace(/\r?\n/g, ' ')
  return `"${normalized.replace(/"/g, '""')}"`
}

async function filesToDataUrls(files: FileList | File[]) {
  const readers = Array.from(files).map(
    (file) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
      })
  )
  return Promise.all(readers)
}

function LoginPanel({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) throw new Error('Invalid password')
      const data = (await response.json()) as { token: string }
      window.localStorage.setItem(adminTokenStorageKey, data.token)
      onLogin(data.token)
    } catch {
      setError('Password incorrect or admin API unavailable.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div {...adminReveal()} className="min-h-screen bg-slate-950 flex items-center justify-center px-5">
      <motion.form {...adminHover(3)} onSubmit={submit} className="premium-card w-full max-w-md rounded-lg bg-white p-7 shadow-2xl">
        <motion.div
          animate={loading ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 0.8, repeat: loading ? Infinity : 0, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-lg bg-slate-950 text-white flex items-center justify-center mb-5"
        >
          <Lock size={22} />
        </motion.div>
        <h1 className="text-2xl font-black text-slate-950">Center Tyani Admin</h1>
        <p className="text-sm text-slate-500 mt-2">Protected CMS dashboard with session management.</p>
        <label className="block mt-6">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Admin password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
            autoFocus
          />
        </label>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-sm text-red-600 mt-3"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <motion.button {...adminHover(2)} type="submit" disabled={loading} className="premium-button mt-6 w-full rounded-lg bg-slate-950 text-white font-bold py-3 disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign in'}
        </motion.button>
      </motion.form>
    </motion.div>
  )
}

function Field({
  label,
  value,
  onChange,
  multiline,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  type?: string
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none" />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      )}
    </label>
  )
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <motion.button
      {...adminHover(1)}
      type="button"
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-bold ${checked ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
    >
      {checked ? <Eye size={16} /> : <EyeOff size={16} />}
      {label}
    </motion.button>
  )
}

function DropUpload({ label, onUpload, multiple = true }: { label: string; onUpload: (urls: string[]) => void; multiple?: boolean }) {
  const [over, setOver] = useState(false)

  const handleFiles = async (files: FileList | File[]) => {
    const urls = await filesToDataUrls(files)
    onUpload(urls)
  }

  const drop = async (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setOver(false)
    await handleFiles(event.dataTransfer.files)
  }

  return (
    <motion.label
      {...adminHover(1)}
      onDragOver={(event) => {
        event.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={drop}
      className={`premium-card rounded-lg border border-dashed p-5 flex flex-col items-center justify-center text-center cursor-pointer ${over ? 'border-slate-950 bg-slate-100' : 'border-slate-300 bg-slate-50'}`}
    >
      <motion.span animate={over ? { y: [-2, 2, -2] } : { y: 0 }} transition={{ duration: 0.9, repeat: over ? Infinity : 0, ease: 'easeInOut' }}>
        <Upload size={22} className="text-slate-500" />
      </motion.span>
      <span className="text-sm font-bold text-slate-700 mt-2">{label}</span>
      <span className="text-xs text-slate-400 mt-1">Drag and drop or click to upload</span>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          if (event.target.files) void handleFiles(event.target.files)
          event.target.value = ''
        }}
      />
    </motion.label>
  )
}

function StatusPill({ state }: { state: SaveState }) {
  const label = state === 'saving' ? 'Saving...' : state === 'saved' ? 'Saved to Supabase' : state === 'error' ? 'Supabase save failed' : 'Ready'
  const color = state === 'error' ? 'bg-amber-100 text-amber-800' : state === 'saved' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-700'
  return (
    <motion.span
      key={state}
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}
    >
      {label}
    </motion.span>
  )
}

function SectionEditor({
  section,
  onChange,
  onDelete,
}: {
  section: CmsSection
  onChange: (patch: Partial<CmsSection>) => void
  onDelete: () => void
}) {
  return (
    <motion.div {...adminReveal()} layout className="premium-card rounded-lg border border-slate-200 bg-white p-5 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">{section.type}</p>
          <h3 className="text-lg font-black text-slate-950">{section.label}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Toggle checked={section.visible} onChange={(visible) => onChange({ visible })} label={section.visible ? 'Visible' : 'Hidden'} />
          <select value={section.status} onChange={(event) => onChange({ status: event.target.value as CmsSection['status'] })} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <motion.button {...adminHover(1)} type="button" onClick={onDelete} className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2">
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Navigation label" value={section.label} onChange={(label) => onChange({ label })} />
        <Field label="Eyebrow" value={section.eyebrow} onChange={(eyebrow) => onChange({ eyebrow })} />
        <Field label="Title" value={section.title} onChange={(title) => onChange({ title })} />
        <Field label="Subtitle" value={section.subtitle} onChange={(subtitle) => onChange({ subtitle })} />
      </div>
      <Field label="Description" value={section.body} onChange={(body) => onChange({ body })} multiline />
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Image or banner URL" value={section.image} onChange={(image) => onChange({ image })} />
        <DropUpload label="Upload section image" multiple={false} onUpload={(urls) => onChange({ image: urls[0] ?? section.image })} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Primary button label" value={section.primaryButton?.label ?? ''} onChange={(label) => onChange({ primaryButton: { label, href: section.primaryButton?.href ?? '#registration' } })} />
        <Field label="Primary button link" value={section.primaryButton?.href ?? ''} onChange={(href) => onChange({ primaryButton: { label: section.primaryButton?.label ?? '', href } })} />
        <Field label="Secondary button label" value={section.secondaryButton?.label ?? ''} onChange={(label) => onChange({ secondaryButton: { label, href: section.secondaryButton?.href ?? '#contact' } })} />
        <Field label="Secondary button link" value={section.secondaryButton?.href ?? ''} onChange={(href) => onChange({ secondaryButton: { label: section.secondaryButton?.label ?? '', href } })} />
      </div>
    </motion.div>
  )
}

function BuilderTab({ content, mutate }: { content: SiteContent; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  const [dragId, setDragId] = useState<string | null>(null)
  const [newType, setNewType] = useState<SectionType>('custom')
  const sections = orderedSections(content)

  const reorder = (targetId: string) => {
    if (!dragId || dragId === targetId) return
    mutate((draft) => {
      const sorted = orderedSections(draft)
      const from = sorted.findIndex((section) => section.id === dragId)
      const to = sorted.findIndex((section) => section.id === targetId)
      const [moved] = sorted.splice(from, 1)
      if (!moved) return
      sorted.splice(to, 0, moved)
      draft.sections = sorted.map((section, order) => ({ ...section, order }))
    })
    setDragId(null)
  }

  const addSection = () => {
    mutate((draft) => {
      draft.sections.push({
        id: createId(newType),
        type: newType,
        label: newType === 'custom' ? 'New section' : newType,
        eyebrow: 'New',
        title: 'New section title',
        subtitle: '',
        body: 'Edit this section from the admin dashboard.',
        image: '',
        visible: true,
        status: 'draft',
        order: draft.sections.length,
        primaryButton: { label: 'Contact', href: '#contact' },
      })
    })
  }

  return (
    <motion.div {...adminReveal()} className="space-y-5">
      <Panel title="Add new section" action={
        <div className="flex gap-2">
          <select value={newType} onChange={(event) => setNewType(event.target.value as SectionType)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
            {sectionTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          <motion.button {...adminHover(1)} type="button" onClick={addSection} className="premium-button rounded-lg bg-slate-950 text-white px-3 py-2 inline-flex items-center gap-2 text-sm font-bold">
            <Plus size={16} />
            Add
          </motion.button>
        </div>
      }>
        <p className="text-sm text-slate-500">Drag sections to reorder them. Toggle visibility or switch content between draft and published.</p>
      </Panel>

      <div className="space-y-3">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            layout
            {...adminHover(2)}
            draggable
            onDragStart={() => setDragId(section.id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => reorder(section.id)}
            className="premium-card rounded-lg border border-slate-200 bg-white p-4 flex flex-col lg:flex-row lg:items-center gap-4"
          >
            <GripVertical size={18} className="text-slate-400" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-black text-slate-950">{section.label}</h3>
                <span className="rounded-full bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1">{section.type}</span>
                <span className={`rounded-full text-xs font-bold px-2 py-1 ${section.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{section.status}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{section.title}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Toggle checked={section.visible} onChange={(visible) => mutate((draft) => {
                const target = draft.sections.find((item) => item.id === section.id)
                if (target) target.visible = visible
              })} label={section.visible ? 'Shown' : 'Hidden'} />
              <motion.button {...adminHover(1)} type="button" onClick={() => mutate((draft) => {
                const target = draft.sections.find((item) => item.id === section.id)
                if (target) target.status = target.status === 'published' ? 'draft' : 'published'
              })} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                Publish
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function TextTab({ content, mutate }: { content: SiteContent; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  return (
    <motion.div {...adminReveal()} className="space-y-5">
      {orderedSections(content).map((section) => (
        <SectionEditor
          key={section.id}
          section={section}
          onChange={(patch) => mutate((draft) => {
            const target = draft.sections.find((item) => item.id === section.id)
            if (target) Object.assign(target, patch)
          })}
          onDelete={() => mutate((draft) => {
            draft.sections = draft.sections.filter((item) => item.id !== section.id).map((item, order) => ({ ...item, order }))
          })}
        />
      ))}
    </motion.div>
  )
}

function AnnouncementsTab({ content, mutate }: { content: SiteContent; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  const addAnnouncement = (kind: Announcement['kind']) => {
    mutate((draft) => {
      draft.announcements.push({
        id: createId(kind),
        title: kind === 'promotion' ? 'New promotion' : 'New announcement',
        message: 'Edit this message.',
        kind,
        visible: true,
      })
    })
  }

  return (
    <Panel title="Announcements and promotions" action={
      <div className="flex gap-2">
        <motion.button {...adminHover(1)} type="button" onClick={() => addAnnouncement('announcement')} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">Add announcement</motion.button>
        <motion.button {...adminHover(1)} type="button" onClick={() => addAnnouncement('promotion')} className="premium-button rounded-lg bg-slate-950 text-white px-3 py-2 text-sm font-bold">Add promotion</motion.button>
      </div>
    }>
      <div className="space-y-4">
        {content.announcements.map((item) => (
          <motion.div key={item.id} layout {...adminHover(1)} className="premium-card rounded-lg border border-slate-200 p-4 grid md:grid-cols-[1fr_1fr_auto] gap-3 items-end">
            <Field label="Title" value={item.title} onChange={(title) => mutate((draft) => {
              const target = draft.announcements.find((entry) => entry.id === item.id)
              if (target) target.title = title
            })} />
            <Field label="Message" value={item.message} onChange={(message) => mutate((draft) => {
              const target = draft.announcements.find((entry) => entry.id === item.id)
              if (target) target.message = message
            })} />
            <div className="flex gap-2">
              <Toggle checked={item.visible} label="Visible" onChange={(visible) => mutate((draft) => {
                const target = draft.announcements.find((entry) => entry.id === item.id)
                if (target) target.visible = visible
              })} />
              <motion.button {...adminHover(1)} type="button" onClick={() => mutate((draft) => {
                draft.announcements = draft.announcements.filter((entry) => entry.id !== item.id)
              })} className="rounded-lg border border-red-200 text-red-700 px-3 py-2">
                <Trash2 size={16} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  )
}

function MediaTab({ content, mutate }: { content: SiteContent; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  const addAlbum = () => mutate((draft) => {
    draft.galleryAlbums.push({ id: createId('album'), title: 'New album', description: '', visible: true, images: [] })
  })

  return (
    <div className="space-y-5">
      <Panel title="Logo and homepage banners">
        <div className="grid lg:grid-cols-3 gap-4">
          <ImageSetting title="Logo" value={content.design.logoUrl} onChange={(logoUrl) => mutate((draft) => { draft.design.logoUrl = logoUrl })} />
          <ImageSetting title="Hero banner" value={content.design.heroImage} onChange={(heroImage) => mutate((draft) => { draft.design.heroImage = heroImage })} />
          <ImageSetting title="Background image" value={content.design.backgroundImage} onChange={(backgroundImage) => mutate((draft) => { draft.design.backgroundImage = backgroundImage })} />
        </div>
      </Panel>

      <Panel title="Gallery albums" action={<button type="button" onClick={addAlbum} className="rounded-lg bg-slate-950 text-white px-3 py-2 text-sm font-bold inline-flex items-center gap-2"><Plus size={16} />Album</button>}>
        <div className="space-y-5">
          {content.galleryAlbums.map((album) => (
            <AlbumEditor key={album.id} album={album} mutate={mutate} />
          ))}
        </div>
      </Panel>
    </div>
  )
}

function ImageSetting({ title, value, onChange }: { title: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <h3 className="font-black text-slate-950 mb-3">{title}</h3>
      {value && <img src={value} alt={title} className="w-full aspect-[4/3] object-cover rounded-lg mb-3" />}
      <Field label="Image URL" value={value} onChange={onChange} />
      <div className="mt-3">
        <DropUpload label={`Upload ${title}`} multiple={false} onUpload={(urls) => onChange(urls[0] ?? value)} />
      </div>
    </div>
  )
}

function AlbumEditor({ album, mutate }: { album: GalleryAlbum; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  const patchAlbum = (patch: Partial<GalleryAlbum>) => mutate((draft) => {
    const target = draft.galleryAlbums.find((item) => item.id === album.id)
    if (target) Object.assign(target, patch)
  })

  const patchImage = (imageId: string, patch: Partial<GalleryImage>) => mutate((draft) => {
    const targetAlbum = draft.galleryAlbums.find((item) => item.id === album.id)
    const targetImage = targetAlbum?.images.find((image) => image.id === imageId)
    if (targetImage) Object.assign(targetImage, patch)
  })

  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-4">
      <div className="grid md:grid-cols-[1fr_1fr_auto] gap-3 items-end">
        <Field label="Album title" value={album.title} onChange={(title) => patchAlbum({ title })} />
        <Field label="Description" value={album.description} onChange={(description) => patchAlbum({ description })} />
        <div className="flex gap-2">
          <Toggle checked={album.visible} label="Visible" onChange={(visible) => patchAlbum({ visible })} />
          <button type="button" onClick={() => mutate((draft) => { draft.galleryAlbums = draft.galleryAlbums.filter((item) => item.id !== album.id) })} className="rounded-lg border border-red-200 text-red-700 px-3 py-2">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <DropUpload label="Upload gallery photos" onUpload={(urls) => mutate((draft) => {
        const target = draft.galleryAlbums.find((item) => item.id === album.id)
        if (!target) return
        target.images.push(...urls.map((src) => ({ id: createId('image'), src, caption: 'New image', featured: false })))
      })} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {album.images.map((image) => (
          <div key={image.id} className="rounded-lg border border-slate-200 p-3">
            <img src={image.src} alt={image.caption} className="w-full aspect-[4/3] object-cover rounded-lg mb-3" />
            <Field label="Caption" value={image.caption} onChange={(caption) => patchImage(image.id, { caption })} />
            <div className="flex gap-2 mt-3">
              <Toggle checked={image.featured} label="Featured" onChange={(featured) => patchImage(image.id, { featured })} />
              <button type="button" onClick={() => mutate((draft) => {
                const target = draft.galleryAlbums.find((item) => item.id === album.id)
                if (target) target.images = target.images.filter((entry) => entry.id !== image.id)
              })} className="rounded-lg border border-red-200 text-red-700 px-3 py-2">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LevelsTab({ content, mutate }: { content: SiteContent; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  const addLevel = () => mutate((draft) => {
    draft.levels.push({ id: createId('level'), name: 'New level', label: '', icon: 'school', description: '', grades: ['New grade'], visible: true })
  })

  return (
    <ListPanel title="Academic levels" onAdd={addLevel}>
      {content.levels.map((level) => (
        <LevelEditor key={level.id} level={level} mutate={mutate} />
      ))}
    </ListPanel>
  )
}

function LevelEditor({ level, mutate }: { level: LevelItem; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  const patch = (patchValue: Partial<LevelItem>) => mutate((draft) => {
    const target = draft.levels.find((item) => item.id === level.id)
    if (target) Object.assign(target, patchValue)
  })

  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-3">
      <div className="grid md:grid-cols-3 gap-3">
        <Field label="Name" value={level.name} onChange={(name) => patch({ name })} />
        <Field label="Label" value={level.label} onChange={(label) => patch({ label })} />
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Icon</span>
          <select value={level.icon} onChange={(event) => patch({ icon: event.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
            <option value="school">School</option>
            <option value="book">Book</option>
            <option value="award">Award</option>
          </select>
        </label>
      </div>
      <Field label="Description" value={level.description} onChange={(description) => patch({ description })} multiline />
      <Field label="Grades, comma separated" value={level.grades.join(', ')} onChange={(grades) => patch({ grades: grades.split(',').map((grade) => grade.trim()).filter(Boolean) })} />
      <div className="flex gap-2">
        <Toggle checked={level.visible} label="Visible" onChange={(visible) => patch({ visible })} />
        <button type="button" onClick={() => mutate((draft) => { draft.levels = draft.levels.filter((item) => item.id !== level.id) })} className="rounded-lg border border-red-200 text-red-700 px-3 py-2">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

function SubjectsTab({ content, mutate }: { content: SiteContent; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  const subjects = [...content.subjects].sort((a, b) => a.order - b.order)
  const addSubject = () => mutate((draft) => {
    draft.subjects.push({ id: createId('subject'), name: 'New subject', icon: 'calculator', description: '', visible: true, order: draft.subjects.length })
  })

  const moveSubject = (id: string, direction: -1 | 1) => mutate((draft) => {
    const sorted = [...draft.subjects].sort((a, b) => a.order - b.order)
    const index = sorted.findIndex((item) => item.id === id)
    const target = index + direction
    if (target < 0 || target >= sorted.length) return
    const [item] = sorted.splice(index, 1)
    if (!item) return
    sorted.splice(target, 0, item)
    draft.subjects = sorted.map((subject, order) => ({ ...subject, order }))
  })

  return (
    <ListPanel title="Subjects" onAdd={addSubject}>
      {subjects.map((subject) => (
        <SubjectEditor key={subject.id} subject={subject} mutate={mutate} move={(direction) => moveSubject(subject.id, direction)} />
      ))}
    </ListPanel>
  )
}

function SubjectEditor({ subject, mutate, move }: { subject: SubjectItem; mutate: (mutator: (draft: SiteContent) => void) => void; move: (direction: -1 | 1) => void }) {
  const patch = (patchValue: Partial<SubjectItem>) => mutate((draft) => {
    const target = draft.subjects.find((item) => item.id === subject.id)
    if (target) Object.assign(target, patchValue)
  })

  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-3">
      <div className="grid md:grid-cols-[1fr_180px_auto] gap-3 items-end">
        <Field label="Name" value={subject.name} onChange={(name) => patch({ name })} />
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Icon</span>
          <select value={subject.icon} onChange={(event) => patch({ icon: event.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
            <option value="calculator">Calculator</option>
            <option value="atom">Science</option>
            <option value="dna">SVT</option>
            <option value="languages">Languages</option>
            <option value="message">Speaking</option>
          </select>
        </label>
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} className="rounded-lg border border-slate-200 p-2"><ArrowUp size={16} /></button>
          <button type="button" onClick={() => move(1)} className="rounded-lg border border-slate-200 p-2"><ArrowDown size={16} /></button>
        </div>
      </div>
      <Field label="Description" value={subject.description} onChange={(description) => patch({ description })} multiline />
      <div className="flex gap-2">
        <Toggle checked={subject.visible} label="Visible" onChange={(visible) => patch({ visible })} />
        <button type="button" onClick={() => mutate((draft) => { draft.subjects = draft.subjects.filter((item) => item.id !== subject.id) })} className="rounded-lg border border-red-200 text-red-700 px-3 py-2">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

function TeachersTab({ content, mutate }: { content: SiteContent; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  const addTeacher = () => mutate((draft) => {
    draft.teachers.push({ id: createId('teacher'), name: 'New teacher', photo: draft.design.logoUrl, specialty: 'Specialty', bio: '', visible: true })
  })

  return (
    <ListPanel title="Teachers" onAdd={addTeacher}>
      {content.teachers.map((teacher) => (
        <TeacherEditor key={teacher.id} teacher={teacher} mutate={mutate} />
      ))}
    </ListPanel>
  )
}

function TeacherEditor({ teacher, mutate }: { teacher: TeacherItem; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  const patch = (patchValue: Partial<TeacherItem>) => mutate((draft) => {
    const target = draft.teachers.find((item) => item.id === teacher.id)
    if (target) Object.assign(target, patchValue)
  })

  return (
    <div className="rounded-lg border border-slate-200 p-4 grid lg:grid-cols-[220px_1fr] gap-4">
      <div>
        <img src={teacher.photo} alt={teacher.name} className="w-full aspect-square object-cover rounded-lg mb-3" />
        <DropUpload label="Upload teacher photo" multiple={false} onUpload={(urls) => patch({ photo: urls[0] ?? teacher.photo })} />
      </div>
      <div className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <Field label="Teacher name" value={teacher.name} onChange={(name) => patch({ name })} />
          <Field label="Specialty" value={teacher.specialty} onChange={(specialty) => patch({ specialty })} />
        </div>
        <Field label="Bio" value={teacher.bio} onChange={(bio) => patch({ bio })} multiline />
        <div className="flex gap-2">
          <Toggle checked={teacher.visible} label="Visible" onChange={(visible) => patch({ visible })} />
          <button type="button" onClick={() => mutate((draft) => { draft.teachers = draft.teachers.filter((item) => item.id !== teacher.id) })} className="rounded-lg border border-red-200 text-red-700 px-3 py-2">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

function ContactTab({ content, mutate }: { content: SiteContent; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  return (
    <Panel title="Contact management">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Phone number" value={content.contact.phone} onChange={(phone) => mutate((draft) => { draft.contact.phone = phone })} />
        <Field label="WhatsApp number" value={content.contact.whatsapp} onChange={(whatsapp) => mutate((draft) => { draft.contact.whatsapp = whatsapp })} />
        <Field label="Email" value={content.contact.email} onChange={(email) => mutate((draft) => { draft.contact.email = email })} />
        <Field label="Address" value={content.contact.address} onChange={(address) => mutate((draft) => { draft.contact.address = address })} />
        <Field label="Facebook URL" value={content.contact.facebook} onChange={(facebook) => mutate((draft) => { draft.contact.facebook = facebook })} />
        <Field label="Instagram URL" value={content.contact.instagram} onChange={(instagram) => mutate((draft) => { draft.contact.instagram = instagram })} />
        <Field label="Google Maps URL" value={content.contact.mapsUrl} onChange={(mapsUrl) => mutate((draft) => { draft.contact.mapsUrl = mapsUrl })} />
        <Field label="Google Maps embed URL" value={content.contact.mapsEmbed} onChange={(mapsEmbed) => mutate((draft) => { draft.contact.mapsEmbed = mapsEmbed })} />
      </div>
    </Panel>
  )
}

function DesignTab({ content, mutate }: { content: SiteContent; mutate: (mutator: (draft: SiteContent) => void) => void }) {
  return (
    <Panel title="Design management">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Field type="color" label="Primary color" value={content.design.primaryColor} onChange={(primaryColor) => mutate((draft) => { draft.design.primaryColor = primaryColor })} />
        <Field type="color" label="Accent color" value={content.design.accentColor} onChange={(accentColor) => mutate((draft) => { draft.design.accentColor = accentColor })} />
        <Field type="color" label="Dark color" value={content.design.darkColor} onChange={(darkColor) => mutate((draft) => { draft.design.darkColor = darkColor })} />
        <Field type="color" label="Light background" value={content.design.lightBackground} onChange={(lightBackground) => mutate((draft) => { draft.design.lightBackground = lightBackground })} />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Homepage layout</span>
          <select value={content.design.homepageLayout} onChange={(event) => mutate((draft) => { draft.design.homepageLayout = event.target.value as SiteContent['design']['homepageLayout'] })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
            <option value="classic">Classic</option>
            <option value="compact">Compact</option>
            <option value="gallery-first">Gallery first</option>
          </select>
        </label>
        <div className="flex items-end">
          <Toggle checked={content.design.animationsEnabled} label="Animations" onChange={(animationsEnabled) => mutate((draft) => { draft.design.animationsEnabled = animationsEnabled })} />
        </div>
      </div>
      <div className="mt-5">
        <Field label="SEO title" value={content.seoTitle} onChange={(seoTitle) => mutate((draft) => { draft.seoTitle = seoTitle })} />
      </div>
      <div className="mt-4">
        <Field label="SEO description" value={content.seoDescription} onChange={(seoDescription) => mutate((draft) => { draft.seoDescription = seoDescription })} multiline />
      </div>
    </Panel>
  )
}

function RegistrationsTab({
  token,
  registrations,
  setRegistrations,
  levels,
  subjects,
}: {
  token: string
  registrations: RegistrationRecord[]
  setRegistrations: (records: RegistrationRecord[]) => void
  levels: LevelItem[]
  subjects: SubjectItem[]
}) {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('')
  const [subject, setSubject] = useState('')

  const filtered = useMemo(() => {
    const query = search.toLowerCase()
    return registrations.filter((record) => {
      const matchesSearch = [record.fullName, record.phone, record.parentPhone, record.message].join(' ').toLowerCase().includes(query)
      const matchesLevel = !level || record.academicLevel === level
      const matchesSubject = !subject || record.selectedSubject === subject
      return matchesSearch && matchesLevel && matchesSubject
    })
  }, [level, registrations, search, subject])

  const exportCsv = () => {
    const header = ['Date', 'Full Name', 'Phone', 'Parent Phone', 'Academic Level', 'Subject', 'Message', 'Status']
    const rows = filtered.map((record) => [
      record.createdAt,
      record.fullName,
      record.phone,
      record.parentPhone,
      record.academicLevel,
      record.selectedSubject,
      record.message,
      record.status,
    ])
    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `center-tyani-registrations-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const remove = async (id: string) => {
    await fetch(`/api/registrations?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    })
    setRegistrations(registrations.filter((record) => record.id !== id))
  }

  return (
    <Panel title="Student registrations" action={<button type="button" onClick={exportCsv} className="rounded-lg bg-slate-950 text-white px-3 py-2 text-sm font-bold inline-flex items-center gap-2"><FileDown size={16} />Export CSV</button>}>
      <div className="grid lg:grid-cols-[1fr_220px_220px] gap-3 mb-5">
        <label className="relative block">
          <Search size={17} className="absolute left-3 top-3 text-slate-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search registrations" className="w-full rounded-lg border border-slate-200 pl-10 pr-3 py-2.5 text-sm" />
        </label>
        <select value={level} onChange={(event) => setLevel(event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm">
          <option value="">All levels</option>
          {levels.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
        </select>
        <select value={subject} onChange={(event) => setSubject(event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm">
          <option value="">All subjects</option>
          {subjects.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
              <th className="py-3 pr-4">Student</th>
              <th className="py-3 pr-4">Phones</th>
              <th className="py-3 pr-4">Level</th>
              <th className="py-3 pr-4">Subject</th>
              <th className="py-3 pr-4">Message</th>
              <th className="py-3 pr-4">Date</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <tr key={record.id} className="border-b border-slate-100 align-top">
                <td className="py-3 pr-4 font-bold text-slate-950">{record.fullName}</td>
                <td className="py-3 pr-4 text-slate-600">{record.phone}<br /><span className="text-slate-400">{record.parentPhone}</span></td>
                <td className="py-3 pr-4 text-slate-600">{record.academicLevel}</td>
                <td className="py-3 pr-4 text-slate-600">{record.selectedSubject}</td>
                <td className="py-3 pr-4 text-slate-500 max-w-xs">{record.message}</td>
                <td className="py-3 pr-4 text-slate-500">{new Date(record.createdAt).toLocaleString()}</td>
                <td className="py-3">
                  <button type="button" onClick={() => void remove(record.id)} className="rounded-lg border border-red-200 text-red-700 p-2">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <p className="text-sm text-slate-500 py-8 text-center">No registrations found.</p>}
      </div>
    </Panel>
  )
}

function MessagesTab({ token, messages, setMessages }: { token: string; messages: ContactMessageRecord[]; setMessages: (records: ContactMessageRecord[]) => void }) {
  const remove = async (id: string) => {
    await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    })
    setMessages(messages.filter((message) => message.id !== id))
  }

  return (
    <Panel title="Contact messages">
      <div className="grid gap-4">
        {messages.map((message) => (
          <div key={message.id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-black text-slate-950">{message.fullName}</h3>
                <p className="text-sm text-slate-500">{message.phone} {message.email}</p>
                <p className="text-sm text-slate-700 mt-3">{message.message}</p>
                <p className="text-xs text-slate-400 mt-3">{new Date(message.createdAt).toLocaleString()}</p>
              </div>
              <button type="button" onClick={() => void remove(message.id)} className="rounded-lg border border-red-200 text-red-700 p-2">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {!messages.length && <p className="text-sm text-slate-500 py-8 text-center">No contact messages found.</p>}
      </div>
    </Panel>
  )
}

function SetupTab({ databaseConfigured }: { databaseConfigured: boolean }) {
  return (
    <div className="space-y-5">
      <Panel title="Backend status">
        <div className="grid md:grid-cols-3 gap-4">
          <StatusCard label="Admin routes" value="Protected by password session" />
          <StatusCard label="CMS database" value={databaseConfigured ? 'Supabase live sync configured' : 'Set VITE Supabase env vars'} warning={!databaseConfigured} />
          <StatusCard label="Email" value="Resend API via server route" />
        </div>
      </Panel>
      <Panel title="Required environment variables">
        <pre className="rounded-lg bg-slate-950 text-slate-100 text-xs p-4 overflow-x-auto">{`ADMIN_PASSWORD=Ixvm67@@tyani
ADMIN_SESSION_SECRET=change-this-long-random-secret
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_key
RESEND_FROM_EMAIL=Center Tyani <notifications@yourdomain.com>`}</pre>
        <p className="text-sm text-slate-500 mt-4">
          The CMS reads and writes the public cms_data row with the browser Supabase client. Registrations and messages still use server routes.
        </p>
      </Panel>
    </div>
  )
}

function StatusCard({ label, value, warning }: { label: string; value: string; warning?: boolean }) {
  return (
    <motion.div {...adminHover(1)} className={`premium-card rounded-lg border p-4 ${warning ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white'}`}>
      <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">{label}</p>
      <p className="font-black text-slate-950 mt-1">{value}</p>
    </motion.div>
  )
}

function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <motion.section {...adminReveal()} layout className="premium-card rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h2 className="text-lg font-black text-slate-950">{title}</h2>
        {action}
      </div>
      {children}
    </motion.section>
  )
}

function ListPanel({ title, children, onAdd }: { title: string; children: React.ReactNode; onAdd: () => void }) {
  return (
    <Panel title={title} action={<motion.button {...adminHover(1)} type="button" onClick={onAdd} className="premium-button rounded-lg bg-slate-950 text-white px-3 py-2 text-sm font-bold inline-flex items-center gap-2"><Plus size={16} />Add</motion.button>}>
      <div className="space-y-4">{children}</div>
    </Panel>
  )
}

export default function AdminDashboard() {
  const [token, setToken] = useState('')
  const [tab, setTab] = useState<AdminTab>('builder')
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [dirty, setDirty] = useState(false)
  const [databaseConfigured, setDatabaseConfigured] = useState(false)
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([])
  const [messages, setMessages] = useState<ContactMessageRecord[]>([])

  useEffect(() => {
    setToken(readStoredToken())
    setDatabaseConfigured(isSupabaseBrowserConfigured())
  }, [])

  useEffect(() => {
    if (!token) return

    const load = async () => {
      try {
        setDatabaseConfigured(isSupabaseBrowserConfigured())
        setContent(await fetchCmsContentFromSupabase())

        const [registrationResponse, messageResponse] = await Promise.all([
          fetch('/api/registrations', { headers: authHeaders(token) }),
          fetch('/api/contact', { headers: authHeaders(token) }),
        ])

        if (registrationResponse.ok) {
          const data = (await registrationResponse.json()) as { registrations: RegistrationRecord[] }
          setRegistrations(data.registrations)
        }

        if (messageResponse.ok) {
          const data = (await messageResponse.json()) as { messages: ContactMessageRecord[] }
          setMessages(data.messages)
        }
      } catch {
        setSaveState('error')
      }
    }

    void load()
  }, [token])

  useEffect(() => {
    if (!token) return

    return subscribeToCmsDataChanges((remoteContent) => {
      if (dirty) return
      setContent(remoteContent)
      setSaveState('saved')
    })
  }, [dirty, token])

  useEffect(() => {
    if (!token || !dirty) return
    setSaveState('saving')

    const timer = window.setTimeout(async () => {
      try {
        const savedContent = await upsertCmsContentToSupabase(content)
        setContent(savedContent)
        setDatabaseConfigured(true)
        setSaveState('saved')
        setDirty(false)
      } catch {
        setSaveState('error')
      }
    }, 650)

    return () => window.clearTimeout(timer)
  }, [content, dirty, token])

  const mutate = (mutator: (draft: SiteContent) => void) => {
    setContent((current) => {
      const draft = cloneContent(current)
      mutator(draft)
      draft.updatedAt = new Date().toISOString()
      setDirty(true)
      return draft
    })
  }

  const logout = () => {
    window.localStorage.removeItem(adminTokenStorageKey)
    setToken('')
  }

  const resetCms = () => {
    setContent(defaultSiteContent)
    setDirty(true)
  }

  if (!token) return <LoginPanel onLogin={setToken} />

  return (
    <MotionConfig transition={{ duration: 0.34, ease: adminEase }} reducedMotion="user">
    <motion.div {...adminReveal()} className="premium-page min-h-screen bg-slate-100">
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.42, ease: adminEase }}
        className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">CMS Dashboard</p>
            <h1 className="font-black text-slate-950">{content.siteName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill state={saveState} />
            <motion.a {...adminHover(1)} href="/" className="hidden sm:inline-flex rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 no-underline">View site</motion.a>
            <motion.button {...adminHover(1)} type="button" onClick={logout} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold inline-flex items-center gap-2">
              <LogOut size={16} />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid lg:grid-cols-[240px_1fr] gap-6">
        <motion.aside {...adminReveal(0.04)} className="premium-card rounded-lg bg-white border border-slate-200 p-3 h-fit lg:sticky lg:top-24">
          <nav className="grid gap-1">
            {tabs.map((item) => (
              <motion.button
                key={item.id}
                {...adminHover(1)}
                type="button"
                onClick={() => setTab(item.id)}
                className={`rounded-lg px-3 py-2.5 text-sm font-bold flex items-center gap-2 text-left ${tab === item.id ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {item.icon}
                {item.label}
              </motion.button>
            ))}
          </nav>
          <motion.button {...adminHover(1)} type="button" onClick={resetCms} className="mt-4 w-full rounded-lg border border-amber-200 bg-amber-50 text-amber-800 px-3 py-2 text-sm font-bold">
            Reset CMS draft
          </motion.button>
        </motion.aside>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: adminEase }}
            >
              {tab === 'builder' && <BuilderTab content={content} mutate={mutate} />}
              {tab === 'text' && (
                <div className="space-y-5">
                  <AnnouncementsTab content={content} mutate={mutate} />
                  <TextTab content={content} mutate={mutate} />
                </div>
              )}
              {tab === 'media' && <MediaTab content={content} mutate={mutate} />}
              {tab === 'levels' && <LevelsTab content={content} mutate={mutate} />}
              {tab === 'subjects' && <SubjectsTab content={content} mutate={mutate} />}
              {tab === 'teachers' && <TeachersTab content={content} mutate={mutate} />}
              {tab === 'contact' && <ContactTab content={content} mutate={mutate} />}
              {tab === 'design' && <DesignTab content={content} mutate={mutate} />}
              {tab === 'registrations' && (
                <RegistrationsTab
                  token={token}
                  registrations={registrations}
                  setRegistrations={setRegistrations}
                  levels={content.levels}
                  subjects={content.subjects}
                />
              )}
              {tab === 'messages' && <MessagesTab token={token} messages={messages} setMessages={setMessages} />}
              {tab === 'setup' && <SetupTab databaseConfigured={databaseConfigured} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
    </MotionConfig>
  )
}
