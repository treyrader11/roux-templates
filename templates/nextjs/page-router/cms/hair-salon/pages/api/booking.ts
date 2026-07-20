import type { NextApiRequest, NextApiResponse } from "next";
import { bookingSchema } from "@/lib/validations/forms";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendEmail } from "@/lib/email";
import { db } from "@/lib/db";
import { booking } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid form data" });
  }

  const {
    name,
    email,
    phone,
    service,
    stylist,
    date,
    time,
    notes,
    recaptchaToken,
  } = parsed.data;

  const humanVerified = await verifyRecaptcha(recaptchaToken);
  if (!humanVerified) {
    return res.status(400).json({ error: "reCAPTCHA verification failed" });
  }

  try {
    await db.insert(booking).values({
      name,
      email,
      phone: phone ?? null,
      service: service ?? null,
      stylist: stylist ?? null,
      date: date ?? null,
      time: time ?? null,
      notes: notes ?? null,
    });

    await sendEmail({
      subject: `New booking request from ${name}`,
      html: `
        <h2>New booking request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone ?? "—"}</p>
        <p><strong>Service:</strong> ${service ?? "—"}</p>
        <p><strong>Stylist:</strong> ${stylist ?? "—"}</p>
        <p><strong>Preferred date/time:</strong> ${date ?? "—"} ${time ?? ""}</p>
        <p><strong>Notes:</strong> ${notes ?? "—"}</p>
      `,
    });

    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Failed to submit booking" });
  }
}
