import { createFileRoute } from '@tanstack/react-router'
import { mergeContent, type SiteContent } from '@/lib/cms'
import { requireAdmin } from '@/lib/server/adminAuth'
import {
  getCmsContentFromDatabase,
  isSupabaseConfigured,
  saveCmsContentToDatabase,
} from '@/lib/server/supabase'

export const Route = createFileRoute('/api/cms')({
  server: {
    handlers: {
      GET: async () => {
        const content = mergeContent(await getCmsContentFromDatabase())
        return Response.json(
          {
            content,
            databaseConfigured: isSupabaseConfigured(),
          },
          { headers: { 'cache-control': 'no-store' } }
        )
      },
      PUT: async ({ request }) => {
        const unauthorized = requireAdmin(request)
        if (unauthorized) return unauthorized

        const body = (await request.json().catch(() => null)) as { content?: SiteContent } | null
        if (!body?.content) {
          return Response.json({ error: 'Missing CMS content' }, { status: 400 })
        }

        const content = mergeContent({
          ...body.content,
          updatedAt: new Date().toISOString(),
        })
        const databaseSaved = await saveCmsContentToDatabase(content)

        return Response.json({
          content,
          databaseSaved,
          databaseConfigured: isSupabaseConfigured(),
        })
      },
    },
  },
})
