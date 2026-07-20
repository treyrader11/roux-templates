import { Resend } from "resend";

/**
 * Send a transactional email via Resend. When no API key is configured,
 * the send is skipped (logged) so local flows still succeed.
 */
export async function sendEmail(opts: {
  subject: string;
  html: string;
  to?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Reverse Gen <onboarding@resend.dev>";
  const to = opts.to ?? process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.log(`[email skipped] ${opts.subject}`);
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    subject: opts.subject,
    html: opts.html,
  });
}
