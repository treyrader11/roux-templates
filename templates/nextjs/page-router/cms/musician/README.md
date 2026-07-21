# Roux UI — Musician / Artist CMS (Pages Router)

A film-production / musician / artist website with a **Vintage Dark** aesthetic — warm browns, aged-paper whites, and a film-grain overlay. Built with Next.js Pages Router, Tailwind v4, NextAuth v4, and Drizzle ORM.

Bootstrapped with [`rouxui create`](https://rouxui.com).

## Getting Started

```bash
bun install
cp .env.example .env.local
# Add DATABASE_URL (neon.tech) and NEXTAUTH_SECRET (`openssl rand -base64 32`)
bun run db:push     # create the schema
bun dev             # http://localhost:3000
```

## Features

- Cinematic public site — Hero, Featured Work, Stats, Testimonials, Booking CTA
- Marketing pages — Work, Music, Shows, About, Booking, Contact
- Admin CMS at `/admin/*` — dashboard, projects, bookings, media, settings (auth-guarded via `getServerSideProps`)
- NextAuth v4 — Google, Apple, and Credentials (bcrypt) sign-in + sign-up
- Drizzle ORM (Neon PostgreSQL), null-safe so a missing `DATABASE_URL` never crashes
- Tailwind v4 with the Vintage Dark theme in `styles/globals.css`
- Playfair Display headings + Inter body via `next/font`

## Notes

- **NextAuth v4** is used here (idiomatic for the Pages Router). The App Router
  version of this template (`app-router/cms/musician`) uses NextAuth v5.
- Admin routes live at `/admin`, `/admin/projects`, etc.; auth pages at
  `/sign-in`, `/sign-up`, `/error`.

## Add Roux UI Components

```bash
npx rouxui add <component-name>
```

Visit [rouxui.com/components](https://rouxui.com/components) to browse all components.
