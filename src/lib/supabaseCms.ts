import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { defaultSiteContent, mergeContent, type SiteContent } from '@/lib/cms'

const cmsTable = 'cms_data'
const cmsRowId = 'site'

export const cmsDataUpdatedEvent = 'center-tyani-cms-data-updated'

interface CmsDataRow {
  id: string
  content: SiteContent
  updated_at: string
}

let cachedClient: SupabaseClient | null = null

function envValue(key: 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY') {
  return import.meta.env[key] as string | undefined
}

export function isSupabaseBrowserConfigured() {
  return Boolean(envValue('VITE_SUPABASE_URL') && envValue('VITE_SUPABASE_ANON_KEY'))
}

export function getSupabaseBrowserClient() {
  const url = envValue('VITE_SUPABASE_URL')
  const anonKey = envValue('VITE_SUPABASE_ANON_KEY')

  if (!url || !anonKey) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  }

  if (!cachedClient) {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      realtime: {
        params: {
          eventsPerSecond: 2,
        },
      },
    })
  }

  return cachedClient
}

function emitCmsUpdate(content: SiteContent) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<SiteContent>(cmsDataUpdatedEvent, { detail: content }))
}

export async function fetchCmsContentFromSupabase() {
  if (!isSupabaseBrowserConfigured()) return defaultSiteContent

  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from(cmsTable)
    .select('content, updated_at')
    .eq('id', cmsRowId)
    .maybeSingle<CmsDataRow>()

  if (error) throw error

  return mergeContent(data?.content ?? defaultSiteContent)
}

export async function upsertCmsContentToSupabase(content: SiteContent) {
  const supabase = getSupabaseBrowserClient()
  const nextContent = mergeContent({
    ...content,
    updatedAt: new Date().toISOString(),
  })

  const { data, error } = await supabase
    .from(cmsTable)
    .upsert(
      {
        id: cmsRowId,
        content: nextContent,
        updated_at: nextContent.updatedAt,
      },
      { onConflict: 'id' }
    )
    .select('content, updated_at')
    .single<CmsDataRow>()

  if (error) throw error

  const savedContent = mergeContent(data?.content ?? nextContent)
  emitCmsUpdate(savedContent)
  return savedContent
}

export function subscribeToCmsDataChanges(onContent: (content: SiteContent) => void) {
  if (!isSupabaseBrowserConfigured()) return () => undefined

  const supabase = getSupabaseBrowserClient()
  const channel = supabase
    .channel('center-tyani-cms-data')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: cmsTable,
        filter: `id=eq.${cmsRowId}`,
      },
      (payload) => {
        const row = payload.new as CmsDataRow | null
        if (!row?.content) return
        const content = mergeContent(row.content)
        onContent(content)
        emitCmsUpdate(content)
      }
    )
    .subscribe()

  return () => {
    void supabase.removeChannel(channel)
  }
}
