import { sendMail } from './mailer';

/**
 * Email notifications for public form submissions (contact leads + consultation
 * bookings). Every public POST that captures a prospect fires one of these so
 * the team is alerted instantly and the prospect gets a confirmation.
 *
 * Notifications go to LEADS_NOTIFY_EMAIL (falls back to the SMTP account).
 * All functions await sendMail, which never throws — a mail failure is logged
 * but never breaks the request that created the lead/booking.
 */

const NOTIFY_TO = process.env.LEADS_NOTIFY_EMAIL || process.env.SMTP_USER || '';
const BRAND = 'NextGen Health';

/** Escape user-supplied text before interpolating into HTML email bodies. */
function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Renders a label/value row, skipping rows whose value is empty. */
function row(label: string, value: unknown): string {
  if (value === null || value === undefined || String(value).trim() === '') return '';
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#718096;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(label)}</td>
    <td style="padding:6px 0;color:#1A2438;font-size:14px;font-weight:600;">${esc(value)}</td>
  </tr>`;
}

function shell(heading: string, intro: string, rowsHtml: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f5f6fa;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid rgba(45,55,72,0.08);">
      <div style="background:#576DB5;padding:20px 28px;">
        <div style="color:#fff;font-size:16px;font-weight:700;letter-spacing:-0.01em;">${esc(BRAND)}</div>
      </div>
      <div style="padding:28px;">
        <h2 style="margin:0 0 8px;font-size:19px;color:#1A2438;">${esc(heading)}</h2>
        <p style="margin:0 0 20px;color:#4A5568;font-size:14px;line-height:1.5;">${esc(intro)}</p>
        <table style="border-collapse:collapse;width:100%;">${rowsHtml}</table>
      </div>
    </div>
  </div>`;
}

export interface LeadEmail {
  name: string;
  email: string;
  phone?: string | null;
  businessType?: string | null;
  budget?: string | null;
  message?: string | null;
  source?: string | null;
}

/** Alerts the team about a new contact lead and confirms receipt to the lead. */
export async function notifyLead(lead: LeadEmail): Promise<void> {
  const rows =
    row('Name', lead.name) +
    row('Email', lead.email) +
    row('Phone', lead.phone) +
    row('Business', lead.businessType) +
    row('Budget', lead.budget) +
    row('Message', lead.message) +
    row('Source', lead.source);

  await Promise.all([
    NOTIFY_TO
      ? sendMail({
          to: NOTIFY_TO,
          replyTo: lead.email,
          subject: `New contact lead — ${lead.name}`,
          html: shell('New contact lead', 'A new lead just came in from the website.', rows),
          text: `New contact lead\n\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || '—'}\nBusiness: ${lead.businessType || '—'}\nBudget: ${lead.budget || '—'}\nMessage: ${lead.message || '—'}\nSource: ${lead.source || '—'}`,
        })
      : Promise.resolve(false),
    sendMail({
      to: lead.email,
      subject: `Thanks for reaching out to ${BRAND}`,
      html: shell(
        `Thanks, ${lead.name.split(' ')[0] || 'there'}!`,
        `We've received your message and a member of our team will get back to you shortly. Here's a copy of what you sent us.`,
        rows,
      ),
      text: `Hi ${lead.name},\n\nThanks for reaching out to ${BRAND}. We've received your message and will get back to you shortly.\n\n— The ${BRAND} team`,
    }),
  ]);
}

export interface BookingEmail {
  email: string;
  name?: string | null;
  date: string;
  time: string;
  timezone?: string | null;
  source?: string | null;
}

/** Alerts the team about a consultation booking and confirms it to the booker. */
export async function notifyBooking(
  booking: BookingEmail,
  opts: { rescheduled?: boolean } = {},
): Promise<void> {
  const verb = opts.rescheduled ? 'rescheduled' : 'booked';
  const rows =
    row('Name', booking.name) +
    row('Email', booking.email) +
    row('Date', booking.date) +
    row('Time', booking.time) +
    row('Timezone', booking.timezone) +
    row('Source', booking.source);

  await Promise.all([
    NOTIFY_TO
      ? sendMail({
          to: NOTIFY_TO,
          replyTo: booking.email,
          subject: `Consultation ${verb} — ${booking.date} at ${booking.time}`,
          html: shell(
            `Consultation ${verb}`,
            `A free consultation call was just ${verb} from the website.`,
            rows,
          ),
          text: `Consultation ${verb}\n\nName: ${booking.name || '—'}\nEmail: ${booking.email}\nDate: ${booking.date}\nTime: ${booking.time}\nTimezone: ${booking.timezone || '—'}`,
        })
      : Promise.resolve(false),
    sendMail({
      to: booking.email,
      subject: `Your ${BRAND} consultation is ${opts.rescheduled ? 'rescheduled' : 'confirmed'}`,
      html: shell(
        `You're ${opts.rescheduled ? 'rescheduled' : 'confirmed'}!`,
        `Your free consultation call with ${BRAND} is set for the time below. We look forward to speaking with you.`,
        rows,
      ),
      text: `Your ${BRAND} consultation is ${opts.rescheduled ? 'rescheduled' : 'confirmed'} for ${booking.date} at ${booking.time}${booking.timezone ? ` (${booking.timezone})` : ''}.\n\nWe look forward to speaking with you.\n\n— The ${BRAND} team`,
    }),
  ]);
}
