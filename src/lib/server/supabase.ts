import type { ContactMessageRecord, RegistrationRecord, SiteContent } from '@/lib/cms'

interface SupabaseRegistrationRow {
  id: string
  full_name: string
  phone: string
  parent_phone: string
  academic_level: string
  selected_subject: string
  message: string | null
  status: RegistrationRecord['status']
  created_at: string
}

interface SupabaseContactRow {
  id: string
  full_name: string
  phone: string | null
  email: string | null
  message: string
  created_at: string
}

function getConfig() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  return { url, key, configured: Boolean(url && key) }
}

export function isSupabaseConfigured() {
  return getConfig().configured
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const { url, key, configured } = getConfig()
  if (!configured || !url || !key) {
    throw new Error('Supabase is not configured')
  }

  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
      ...(init.headers ?? {}),
    },
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Supabase request failed with ${response.status}`)
  }

  if (response.status === 204) return null
  return response.json()
}

export async function getCmsContentFromDatabase() {
  if (!isSupabaseConfigured()) return null
  const rows = (await supabaseFetch('cms_data?id=eq.site&select=content&limit=1')) as {
    content: SiteContent
  }[]
  return rows[0]?.content ?? null
}

export async function saveCmsContentToDatabase(content: SiteContent) {
  if (!isSupabaseConfigured()) return false

  await supabaseFetch('cms_data', {
    method: 'POST',
    headers: {
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({
      id: 'site',
      content,
      updated_at: content.updatedAt,
    }),
  })

  return true
}

function mapRegistration(row: SupabaseRegistrationRow): RegistrationRecord {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    parentPhone: row.parent_phone,
    academicLevel: row.academic_level,
    selectedSubject: row.selected_subject,
    message: row.message ?? '',
    status: row.status,
    createdAt: row.created_at,
  }
}

function mapContact(row: SupabaseContactRow): ContactMessageRecord {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone ?? '',
    email: row.email ?? '',
    message: row.message,
    createdAt: row.created_at,
  }
}

export async function insertRegistration(record: RegistrationRecord) {
  if (!isSupabaseConfigured()) return false

  await supabaseFetch('registrations', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      id: record.id,
      full_name: record.fullName,
      phone: record.phone,
      parent_phone: record.parentPhone,
      academic_level: record.academicLevel,
      selected_subject: record.selectedSubject,
      message: record.message || null,
      status: record.status,
      created_at: record.createdAt,
    }),
  })

  return true
}

export async function listRegistrations() {
  if (!isSupabaseConfigured()) return []
  const rows = (await supabaseFetch(
    'registrations?select=*&order=created_at.desc'
  )) as SupabaseRegistrationRow[]
  return rows.map(mapRegistration)
}

export async function deleteRegistration(id: string) {
  if (!isSupabaseConfigured()) return false
  await supabaseFetch(`registrations?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  })
  return true
}

export async function insertContactMessage(record: ContactMessageRecord) {
  if (!isSupabaseConfigured()) return false

  await supabaseFetch('contact_messages', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      id: record.id,
      full_name: record.fullName,
      phone: record.phone || null,
      email: record.email || null,
      message: record.message,
      created_at: record.createdAt,
    }),
  })

  return true
}

export async function listContactMessages() {
  if (!isSupabaseConfigured()) return []
  const rows = (await supabaseFetch(
    'contact_messages?select=*&order=created_at.desc'
  )) as SupabaseContactRow[]
  return rows.map(mapContact)
}

export async function deleteContactMessage(id: string) {
  if (!isSupabaseConfigured()) return false
  await supabaseFetch(`contact_messages?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  })
  return true
}
