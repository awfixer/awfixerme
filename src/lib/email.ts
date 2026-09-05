import { Resend } from 'resend'

// Placeholder key/sender — replace with a real Resend API key
// (https://resend.com/api-keys) and a verified domain sender.
// Env vars take precedence when set.
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? 're_placeholder'
const RESEND_FROM = process.env.RESEND_FROM ?? 'AWFixer Auth <auth@awfixer.me>'

const resend = new Resend(RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string
  subject: string
  text: string
}) {
  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to,
    subject,
    text,
  })
  if (error) {
    throw new Error(`Failed to send email: ${error.message}`)
  }
}
