import nodemailer, { type Transporter } from 'nodemailer';

/**
 * Lazily-built, cached SMTP transport. Configured entirely from env vars so no
 * credentials live in source. Returns null when SMTP is not configured, which
 * lets callers degrade gracefully (the lead/booking is still persisted; we just
 * skip the email instead of failing the request).
 *
 * Required env: SMTP_HOST, SMTP_USER, SMTP_PASS
 * Optional env: SMTP_PORT (default 465), SMTP_FROM (default SMTP_USER)
 */
let cached: Transporter | null = null;

function getTransport(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  if (cached) return cached;

  const port = Number(process.env.SMTP_PORT) || 465;
  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user, pass },
  });
  return cached;
}

export interface MailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/**
 * Sends one email. Never throws — returns true on success, false if SMTP is
 * unconfigured or the send fails (errors are logged). Callers should not let a
 * failed notification break the user-facing request.
 */
export async function sendMail(input: MailInput): Promise<boolean> {
  const transport = getTransport();
  if (!transport) {
    console.warn('[mailer] SMTP not configured — skipping email:', input.subject);
    return false;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  try {
    await transport.sendMail({ from, ...input });
    return true;
  } catch (err) {
    console.error('[mailer] Failed to send email:', err);
    return false;
  }
}
