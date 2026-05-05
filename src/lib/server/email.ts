import type { ContactMessageRecord, RegistrationRecord } from '@/lib/cms'

const notificationEmail = 'centretyanibelfaa@gmail.com'

function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY)
}

function fromEmail() {
  return process.env.RESEND_FROM_EMAIL || 'Center Tyani <onboarding@resend.dev>'
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 12px;color:#64748b;font-weight:600">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#0f172a">${escapeHtml(value || '-')}</td></tr>`
}

async function sendEmail(subject: string, html: string, replyTo?: string) {
  if (!emailConfigured()) return false

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail(),
      to: [notificationEmail],
      reply_to: replyTo || notificationEmail,
      subject,
      html,
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Resend failed with ${response.status}`)
  }

  return true
}

export async function sendRegistrationEmail(record: RegistrationRecord) {
  const html = `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:620px;margin:auto;background:white;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
        <div style="background:#0f172a;color:white;padding:20px 24px">
          <h1 style="margin:0;font-size:20px">Nouvelle inscription Center Tyani</h1>
          <p style="margin:6px 0 0;color:#c9a227">${new Date(record.createdAt).toLocaleString('fr-FR')}</p>
        </div>
        <table style="width:100%;border-collapse:collapse">
          ${row('Nom complet', record.fullName)}
          ${row('Telephone', record.phone)}
          ${row('Telephone parent', record.parentPhone)}
          ${row('Niveau scolaire', record.academicLevel)}
          ${row('Matiere choisie', record.selectedSubject)}
          ${row('Message', record.message)}
        </table>
      </div>
    </div>
  `

  return sendEmail(`Nouvelle inscription - ${record.fullName}`, html)
}

export async function sendContactEmail(record: ContactMessageRecord) {
  const html = `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:620px;margin:auto;background:white;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
        <div style="background:#0f172a;color:white;padding:20px 24px">
          <h1 style="margin:0;font-size:20px">Nouveau message de contact</h1>
          <p style="margin:6px 0 0;color:#c9a227">${new Date(record.createdAt).toLocaleString('fr-FR')}</p>
        </div>
        <table style="width:100%;border-collapse:collapse">
          ${row('Nom complet', record.fullName)}
          ${row('Telephone', record.phone)}
          ${row('Email', record.email)}
          ${row('Message', record.message)}
        </table>
      </div>
    </div>
  `

  return sendEmail(`Message contact - ${record.fullName}`, html, record.email)
}
