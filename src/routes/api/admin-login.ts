import { createFileRoute } from '@tanstack/react-router'
import { createAdminToken, isValidAdminPassword } from '@/lib/server/adminAuth'

export const Route = createFileRoute('/api/admin-login')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as { password?: string } | null

        if (!body?.password || !isValidAdminPassword(body.password)) {
          return Response.json({ error: 'Invalid password' }, { status: 401 })
        }

        return Response.json(createAdminToken())
      },
    },
  },
})
