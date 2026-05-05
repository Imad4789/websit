export type SectionType =
  | 'hero'
  | 'about'
  | 'levels'
  | 'subjects'
  | 'teachers'
  | 'gallery'
  | 'whyUs'
  | 'registration'
  | 'contact'
  | 'custom'

export type SectionStatus = 'published' | 'draft'

export interface CmsButton {
  label: string
  href: string
}

export interface CmsSection {
  id: string
  type: SectionType
  label: string
  eyebrow: string
  title: string
  subtitle: string
  body: string
  image: string
  visible: boolean
  status: SectionStatus
  order: number
  primaryButton?: CmsButton
  secondaryButton?: CmsButton
}

export interface LevelItem {
  id: string
  name: string
  label: string
  icon: string
  description: string
  grades: string[]
  visible: boolean
}

export interface SubjectItem {
  id: string
  name: string
  icon: string
  description: string
  visible: boolean
  order: number
}

export interface TeacherItem {
  id: string
  name: string
  photo: string
  specialty: string
  bio: string
  visible: boolean
}

export interface GalleryImage {
  id: string
  src: string
  caption: string
  featured: boolean
}

export interface GalleryAlbum {
  id: string
  title: string
  description: string
  images: GalleryImage[]
  visible: boolean
}

export interface Announcement {
  id: string
  title: string
  message: string
  kind: 'announcement' | 'promotion'
  visible: boolean
}

export interface SiteDesign {
  primaryColor: string
  accentColor: string
  darkColor: string
  lightBackground: string
  logoUrl: string
  heroImage: string
  backgroundImage: string
  animationsEnabled: boolean
  homepageLayout: 'classic' | 'compact' | 'gallery-first'
}

export interface ContactSettings {
  phone: string
  whatsapp: string
  email: string
  address: string
  mapsUrl: string
  mapsEmbed: string
  facebook: string
  instagram: string
}

export interface SiteContent {
  version: number
  updatedAt: string
  siteName: string
  seoTitle: string
  seoDescription: string
  design: SiteDesign
  contact: ContactSettings
  announcements: Announcement[]
  sections: CmsSection[]
  levels: LevelItem[]
  subjects: SubjectItem[]
  teachers: TeacherItem[]
  galleryAlbums: GalleryAlbum[]
}

export interface RegistrationRecord {
  id: string
  fullName: string
  phone: string
  parentPhone: string
  academicLevel: string
  selectedSubject: string
  message: string
  status: 'new' | 'contacted' | 'archived'
  createdAt: string
}

export interface ContactMessageRecord {
  id: string
  fullName: string
  phone: string
  email: string
  message: string
  createdAt: string
}

export const adminPassword = 'Ixvm67@@tyani'
export const adminTokenStorageKey = 'center-tyani-admin-token'

const logo = '/gallery/457477211_879188057607088_4773325454540207494_n.jpg'

export const defaultSiteContent: SiteContent = {
  version: 1,
  updatedAt: new Date('2026-05-04T00:00:00.000Z').toISOString(),
  siteName: 'Center Tyani',
  seoTitle: 'Center Tyani - Centre de Formation et Cours de Soutien',
  seoDescription:
    'Center Tyani a Belfaa: cours de soutien pour college, lycee et BAC en mathematiques, physique, SVT, francais et anglais.',
  design: {
    primaryColor: '#c9a227',
    accentColor: '#e8c84a',
    darkColor: '#0f172a',
    lightBackground: '#f5f5f5',
    logoUrl: logo,
    heroImage: '/gallery/pc.jpg',
    backgroundImage: '/gallery/waa3.jpg',
    animationsEnabled: true,
    homepageLayout: 'classic',
  },
  contact: {
    phone: '+212 6 64 22 69 60',
    whatsapp: '+212664226960',
    email: 'centretyanibelfaa@gmail.com',
    address: 'Belfaa, Maroc',
    mapsUrl: 'https://maps.app.goo.gl/VCZRBQQrZ2PJAU7U9',
    mapsEmbed:
      'https://maps.google.com/maps?q=Centre%20Tyani%20Belfaa&ll=30.047226,-9.5651862&z=16&hl=fr&output=embed',
    facebook: 'https://www.facebook.com/profile.php?id=100065477044363',
    instagram: 'https://instagram.com/centretyanibelfaa',
  },
  announcements: [
    {
      id: 'announcement-new-groups',
      title: 'Inscriptions ouvertes',
      message: 'Les nouveaux groupes de soutien scolaire sont maintenant ouverts.',
      kind: 'announcement',
      visible: true,
    },
  ],
  sections: [
    {
      id: 'hero',
      type: 'hero',
      label: 'Homepage hero',
      eyebrow: "Centre d'excellence academique",
      title: 'CENTER TYANI',
      subtitle: 'Centre de Formation et Cours de Soutien',
      body: 'Helping students achieve academic excellence through professional support and modern learning.',
      image: '/gallery/pc.jpg',
      visible: true,
      status: 'published',
      order: 0,
      primaryButton: { label: "S'inscrire Maintenant", href: '#registration' },
      secondaryButton: { label: 'Nous Contacter', href: '#contact' },
    },
    {
      id: 'about',
      type: 'about',
      label: 'About center',
      eyebrow: 'Qui Sommes-Nous',
      title: "L'Excellence au Service de Votre Avenir",
      subtitle: 'Une approche pedagogique moderne',
      body: "Center Tyani est un centre de formation et de soutien scolaire fonde avec la conviction que chaque eleve merite un accompagnement de qualite.",
      image: '/gallery/waa3.jpg',
      visible: true,
      status: 'published',
      order: 1,
      primaryButton: { label: "S'inscrire", href: '#registration' },
      secondaryButton: { label: 'En savoir plus', href: '#contact' },
    },
    {
      id: 'levels',
      type: 'levels',
      label: 'Academic levels',
      eyebrow: 'Niveaux Academiques',
      title: 'Pour Chaque Niveau Scolaire',
      subtitle: '',
      body: '',
      image: '',
      visible: true,
      status: 'published',
      order: 2,
    },
    {
      id: 'subjects',
      type: 'subjects',
      label: 'Subjects',
      eyebrow: 'Matieres Enseignees',
      title: 'Toutes les Matieres pour Reussir',
      subtitle: '',
      body: '',
      image: '',
      visible: true,
      status: 'published',
      order: 3,
    },
    {
      id: 'teachers',
      type: 'teachers',
      label: 'Teachers',
      eyebrow: 'Notre Equipe',
      title: 'Des Enseignants Specialises',
      subtitle: '',
      body: '',
      image: '',
      visible: true,
      status: 'published',
      order: 4,
    },
    {
      id: 'gallery',
      type: 'gallery',
      label: 'Gallery',
      eyebrow: 'Notre Galerie',
      title: 'La Vie au Centre Tyani',
      subtitle: '',
      body: '',
      image: '',
      visible: true,
      status: 'published',
      order: 5,
    },
    {
      id: 'why-us',
      type: 'whyUs',
      label: 'Why choose us',
      eyebrow: 'Pourquoi Nous Choisir',
      title: 'Ce qui Nous Distingue',
      subtitle: '',
      body: 'Professeurs qualifies, petits groupes, methodes modernes et suivi personnalise pour chaque eleve.',
      image: '',
      visible: true,
      status: 'published',
      order: 6,
    },
    {
      id: 'registration',
      type: 'registration',
      label: 'Registration form',
      eyebrow: 'Inscription',
      title: 'Rejoignez Center Tyani',
      subtitle: '',
      body: 'Remplissez le formulaire ci-dessous et notre equipe vous contactera dans les plus brefs delais.',
      image: '',
      visible: true,
      status: 'published',
      order: 7,
    },
    {
      id: 'contact',
      type: 'contact',
      label: 'Contact',
      eyebrow: 'Contactez-Nous',
      title: 'Nous Sommes A Votre Ecoute',
      subtitle: '',
      body: 'Envoyez-nous un message ou contactez-nous directement par telephone, WhatsApp ou email.',
      image: '',
      visible: true,
      status: 'published',
      order: 8,
    },
  ],
  levels: [
    {
      id: 'college',
      name: 'College',
      label: '1ere, 2eme et 3eme College',
      icon: 'school',
      description:
        'Renforcement des bases scolaires et accompagnement des collegiens vers une progression continue.',
      grades: ['1ere College', '2eme College', '3eme College'],
      visible: true,
    },
    {
      id: 'lycee',
      name: 'Lycee',
      label: 'Tronc commun, 1ere Bac et 2eme Bac',
      icon: 'book',
      description:
        'Preparation solide aux specialites du lycee avec un encadrement axe sur les resultats.',
      grades: ['Tronc commun', '1ere Bac', '2eme Bac'],
      visible: true,
    },
    {
      id: 'bac',
      name: 'BAC',
      label: 'Sciences Maths, Physiques et SVT',
      icon: 'award',
      description:
        'Preparation intensive et ciblee pour reussir le Baccalaureat avec les meilleures notes.',
      grades: ['Sciences Maths', 'Sciences Physiques', 'Sciences de la Vie'],
      visible: true,
    },
  ],
  subjects: [
    {
      id: 'math',
      name: 'Mathematiques',
      icon: 'sigma',
      description: 'Algebre, geometrie, analyse et probabilites pour tous les niveaux.',
      visible: true,
      order: 0,
    },
    {
      id: 'physics',
      name: 'Physique',
      icon: 'atom',
      description: 'Mecanique, electricite, optique et thermodynamique.',
      visible: true,
      order: 1,
    },
    {
      id: 'svt',
      name: 'SVT',
      icon: 'dna',
      description: 'Sciences de la vie et de la Terre pour les filieres scientifiques.',
      visible: true,
      order: 2,
    },
    {
      id: 'french',
      name: 'Francais',
      icon: 'languages',
      description: 'Grammaire, expression ecrite, litterature et comprehension.',
      visible: true,
      order: 3,
    },
    {
      id: 'english',
      name: 'English',
      icon: 'message',
      description: 'Grammar, vocabulary, reading, writing and spoken English.',
      visible: true,
      order: 4,
    },
  ],
  teachers: [
    {
      id: 'teacher-math',
      name: 'Professeur de Mathematiques',
      photo: logo,
      specialty: 'Mathematiques',
      bio: 'Cours de soutien, preparation aux examens et suivi personnalise.',
      visible: true,
    },
    {
      id: 'teacher-science',
      name: 'Professeur de Sciences',
      photo: '/gallery/ddd.jpg',
      specialty: 'Physique et SVT',
      bio: 'Explications pratiques, exercices corriges et methodes de travail.',
      visible: true,
    },
  ],
  galleryAlbums: [
    {
      id: 'activities',
      title: 'Activites du centre',
      description: 'Photos des cours, evenements et espaces du centre.',
      visible: true,
      images: [
        {
          id: 'gallery-logo',
          src: logo,
          caption: 'Center Tyani - Notre equipe',
          featured: true,
        },
        {
          id: 'gallery-ddd',
          src: '/gallery/ddd.jpg',
          caption: 'Seances de soutien scolaire',
          featured: false,
        },
        {
          id: 'gallery-pc',
          src: '/gallery/pc.jpg',
          caption: "Espace d'apprentissage moderne",
          featured: true,
        },
        {
          id: 'gallery-pfff',
          src: '/gallery/pfff.jpg',
          caption: 'Activites pedagogiques',
          featured: false,
        },
        {
          id: 'gallery-waa3',
          src: '/gallery/waa3.jpg',
          caption: 'Cours intensifs et encadrement',
          featured: false,
        },
        {
          id: 'gallery-zin',
          src: '/gallery/zin.jpg',
          caption: 'Reussite des eleves',
          featured: false,
        },
      ],
    },
  ],
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function orderedSections(content: SiteContent) {
  return [...content.sections].sort((a, b) => a.order - b.order)
}

export function visibleSections(content: SiteContent) {
  return orderedSections(content).filter(
    (section) => section.visible && section.status === 'published'
  )
}

export function mergeContent(candidate: Partial<SiteContent> | null | undefined): SiteContent {
  if (!candidate) return defaultSiteContent

  return {
    ...defaultSiteContent,
    ...candidate,
    design: { ...defaultSiteContent.design, ...candidate.design },
    contact: { ...defaultSiteContent.contact, ...candidate.contact },
    announcements: candidate.announcements ?? defaultSiteContent.announcements,
    sections: candidate.sections ?? defaultSiteContent.sections,
    levels: candidate.levels ?? defaultSiteContent.levels,
    subjects: candidate.subjects ?? defaultSiteContent.subjects,
    teachers: candidate.teachers ?? defaultSiteContent.teachers,
    galleryAlbums: candidate.galleryAlbums ?? defaultSiteContent.galleryAlbums,
  }
}
