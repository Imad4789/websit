import { createHmac, timingSafeEqual } from 'node:crypto'
import { adminPassword } from '@/lib/cms'

const tokenLifetimeMs = 1000 * 60 * 60 * 8

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || adminPassword
}

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET || getAdminPassword()
}

function sign(expiresAt: number) {
  return createHmac('sha256', getAdminSecret()).update(String(expiresAt)).digest('hex')
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

export function isValidAdminPassword(password: string) {
  return safeEqual(password, getAdminPassword())
}

export function createAdminToken() {
  const expiresAt = Date.now() + tokenLifetimeMs
  return {
    token: `${expiresAt}.${sign(expiresAt)}`,
    expiresAt,
  }
}

export function verifyAdminToken(token: string | null) {
  if (!token) return false
  const [expiresAtRaw, signature] = token.split('.')
  const expiresAt = Number(expiresAtRaw)
  if (!expiresAt || !signature || Date.now() > expiresAt) return false

  return safeEqual(signature, sign(expiresAt))
}

export function requireAdmin(request: Request) {
  const auth = request.headers.get('authorization')
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null

  if (verifyAdminToken(token)) return null

  return Response.json({ error: 'Unauthorized admin request' }, { status: 401 })
}
