import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(5, "Please enter a message"),
  recaptchaToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  service: z.string().optional(),
  stylist: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  notes: z.string().optional(),
  recaptchaToken: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
