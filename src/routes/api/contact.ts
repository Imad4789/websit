import { createFileRoute } from '@tanstack/react-router'
import { createId, type ContactMessageRecord } from '@/lib/cms'
import { requireAdmin } from '@/lib/server/adminAuth'
import { sendContactEmail } from '@/lib/server/email'
import {
  deleteContactMessage,
  insertContactMessage,
  isSupabaseConfigured,
  listContactMessages,
} from '@/lib/server/supabase'

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function contactFromBody(body: unknown): ContactMessageRecord | null {
  const data = body as Record<string, unknown>
  const record: ContactMessageRecord = {
    id: createId('message'),
    fullName: clean(data.fullName),
    phone: clean(data.phone),
    email: clean(data.email),
    message: clean(data.message),
    createdAt: new Date().toISOString(),
  }

  if (!record.fullName || !record.message) return null
  return record
}

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const unauthorized = requireAdmin(request)
        if (unauthorized) return unauthorized

        return Response.json({
          messages: await listContactMessages(),
          databaseConfigured: isSupabaseConfigured(),
        })
      },
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null)
        const record = contactFromBody(body)

        if (!record) {
          return Response.json({ error: 'Missing required contact fields' }, { status: 400 })
        }

        const databaseSaved = await insertContactMessage(record)
        let emailSent = false
        let emailError = ''

        try {
          emailSent = await sendContactEmail(record)
        } catch (error) {
          emailError = error instanceof Error ? error.message : 'Email failed'
        }

        return Response.json(
          {
            message: record,
            databaseSaved,
            databaseConfigured: isSupabaseConfigured(),
            emailSent,
            emailError,
          },
          { status: databaseSaved || emailSent ? 201 : 202 }
        )
      },
      DELETE: async ({ request }) => {
        const unauthorized = requireAdmin(request)
        if (unauthorized) return unauthorized

        const id = new URL(request.url).searchParams.get('id')
        if (!id) return Response.json({ error: 'Missing message id' }, { status: 400 })

        const deleted = await deleteContactMessage(id)
        return Response.json({ deleted })
      },
    },
  },
})
