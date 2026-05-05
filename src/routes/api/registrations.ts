import { createFileRoute } from '@tanstack/react-router'
import { createId, type RegistrationRecord } from '@/lib/cms'
import { requireAdmin } from '@/lib/server/adminAuth'
import { sendRegistrationEmail } from '@/lib/server/email'
import {
  deleteRegistration,
  insertRegistration,
  isSupabaseConfigured,
  listRegistrations,
} from '@/lib/server/supabase'

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function registrationFromBody(body: unknown): RegistrationRecord | null {
  const data = body as Record<string, unknown>
  const record: RegistrationRecord = {
    id: createId('registration'),
    fullName: clean(data.fullName),
    phone: clean(data.phone),
    parentPhone: clean(data.parentPhone),
    academicLevel: clean(data.academicLevel),
    selectedSubject: clean(data.selectedSubject),
    message: clean(data.message),
    status: 'new',
    createdAt: new Date().toISOString(),
  }

  if (
    !record.fullName ||
    !record.phone ||
    !record.parentPhone ||
    !record.academicLevel ||
    !record.selectedSubject
  ) {
    return null
  }

  return record
}

export const Route = createFileRoute('/api/registrations')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const unauthorized = requireAdmin(request)
        if (unauthorized) return unauthorized

        return Response.json({
          registrations: await listRegistrations(),
          databaseConfigured: isSupabaseConfigured(),
        })
      },
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null)
        const record = registrationFromBody(body)

        if (!record) {
          return Response.json({ error: 'Missing required registration fields' }, { status: 400 })
        }

        const databaseSaved = await insertRegistration(record)
        let emailSent = false
        let emailError = ''

        try {
          emailSent = await sendRegistrationEmail(record)
        } catch (error) {
          emailError = error instanceof Error ? error.message : 'Email failed'
        }

        return Response.json(
          {
            registration: record,
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
        if (!id) return Response.json({ error: 'Missing registration id' }, { status: 400 })

        const deleted = await deleteRegistration(id)
        return Response.json({ deleted })
      },
    },
  },
})
