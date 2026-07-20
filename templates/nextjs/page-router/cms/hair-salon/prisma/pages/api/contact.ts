import type { NextApiRequest, NextApiResponse } from "next";
import { contactSchema } from "@/lib/validations/forms";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendEmail } from "@/lib/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid form data" });
  }

  const { name, email, phone, message, recaptchaToken } = parsed.data;

  const humanVerified = await verifyRecaptcha(recaptchaToken);
  if (!humanVerified) {
    return res.status(400).json({ error: "reCAPTCHA verification failed" });
  }

  try {
    await sendEmail({
      subject: `New contact message from ${name}`,
      html: `
        <h2>New contact enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone ?? "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Failed to send message" });
  }
}
