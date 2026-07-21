import { Mail, Phone, MapPin } from "lucide-react";
import { FOOTER_EMAIL, FOOTER_PHONE } from "@/lib/content";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Get In Touch
        </p>
        <h1 className="mt-3 font-heading text-5xl font-bold text-foreground">
          Contact
        </h1>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <a
            href={`mailto:${FOOTER_EMAIL}`}
            className="flex flex-col gap-3 rounded-sm border border-border bg-card p-6 transition-colors hover:border-accent"
          >
            <Mail className="text-accent" size={22} />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Email
            </span>
            <span className="text-foreground">{FOOTER_EMAIL}</span>
          </a>
          <a
            href={`tel:${FOOTER_PHONE}`}
            className="flex flex-col gap-3 rounded-sm border border-border bg-card p-6 transition-colors hover:border-accent"
          >
            <Phone className="text-accent" size={22} />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Phone
            </span>
            <span className="text-foreground">{FOOTER_PHONE}</span>
          </a>
          <div className="flex flex-col gap-3 rounded-sm border border-border bg-card p-6">
            <MapPin className="text-accent" size={22} />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Based In
            </span>
            <span className="text-foreground">New Orleans, LA</span>
          </div>
        </div>
      </div>
    </main>
  );
}
