# Roux UI — Musician / Artist CMS (App Router)

A film-production / musician / artist website with a **Vintage Dark** aesthetic — warm browns, aged-paper whites, and a film-grain overlay. Built with Next.js App Router, Tailwind v4, NextAuth v5, and Drizzle ORM.

Bootstrapped with [`rouxui create`](https://rouxui.com).

## Getting Started

```bash
bun install
cp .env.example .env.local
# Add DATABASE_URL (neon.tech) and AUTH_SECRET (`bunx auth secret`)
bun run db:push     # create the schema
bun dev             # http://localhost:3000
```

## Features

- Cinematic public site — Hero, Featured Work, Stats, Testimonials, Booking CTA
- Marketing pages — Work, Music, Shows, About, Booking, Contact
- Admin CMS — dashboard, projects, bookings, media, settings (auth-protected)
- NextAuth v5 — Google, Apple, and Credentials (bcrypt) sign-in + sign-up
- Drizzle ORM (Neon PostgreSQL), null-safe so a missing `DATABASE_URL` never crashes
- Tailwind v4 with the Vintage Dark theme baked into `app/globals.css`
- Playfair Display headings + Inter body via `next/font`

## Routes

Public pages render at `/`, `/work`, `/music`, `/shows`, `/about`, `/booking`,
`/contact`. The admin area uses the `(admin)` route group, so its pages resolve
to `/dashboard`, `/projects`, `/bookings`, `/media`, `/settings` (no `/admin`
prefix). Auth pages are `/sign-in`, `/sign-up`, `/error`.

## Add Roux UI Components

```bash
npx rouxui add <component-name>
```

Visit [rouxui.com/components](https://rouxui.com/components) to browse all components.
