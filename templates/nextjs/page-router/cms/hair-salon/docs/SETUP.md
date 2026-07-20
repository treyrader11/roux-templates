# Reverse Gen — Setup

Hair-salon marketing + booking site with a custom CMS. Next.js 15 (Pages Router), Bun, Drizzle ORM / Neon Postgres, NextAuth 4, Cloudinary, GSAP + Framer Motion + Locomotive Scroll.

## Local development

```bash
bun install          # install deps
bun run dev          # http://localhost:3001
```

The site builds and runs against **placeholder env values** — every public page
falls back to in-code CMS defaults (`lib/*-defaults.ts`) when the database is
unreachable, so you can develop the UI before wiring services.

## Going live (real services)

1. **Database (Neon Postgres)** — set `DATABASE_URL`, then:
   ```bash
   bun run db:push        # create tables from db/schema.ts (or db:generate for SQL migrations)
   bun run db:seed        # create the admin user from SEED_ADMIN_* env vars
   ```
2. **Auth** — set `NEXTAUTH_SECRET` (e.g. `openssl rand -base64 32`) and `NEXTAUTH_URL`.
3. **Cloudinary** — set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
   `CLOUDINARY_API_SECRET`, and create an **unsigned upload preset**; put its name
   in `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`. (Image deletes use the API secret
   server-side; uploads are unsigned via `<CldUploadWidget>`.)
4. **Email (Resend)** — set `RESEND_API_KEY`, `EMAIL_FROM`, `CONTACT_TO_EMAIL`.
5. **reCAPTCHA** — set `RECAPTCHA_SECRET_KEY` and `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   (when unset, verification is skipped so forms stay testable locally).

> The `db:*` scripts load `.env.local` via `dotenv-cli` (drizzle-kit and the
> seed/reset scripts read `DATABASE_URL` from there).

## Content model

Section copy lives in `site_content` rows keyed `page:section` (JSON string);
defaults are in `lib/<page>-defaults.ts`. Structured lists (services, stylists,
pricing packages, gallery, bookings) are their own Drizzle tables (`db/schema.ts`)
managed via the admin CRUD pages under `/admin/*`.

Admin dashboard: `/admin` (sign in at `/admin/login`).

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Dev server on :3001 |
| `bun run build` | Production build |
| `bun run lint` | ESLint |
| `bun run db:generate` | Generate SQL migrations (drizzle-kit) |
| `bun run db:push` | Push schema to the database (drizzle-kit) |
| `bun run db:reset` | Drop & recreate the public schema (dev only) |
| `bun run db:seed` | Seed admin user |
| `bun run db:studio` | Drizzle Studio |
