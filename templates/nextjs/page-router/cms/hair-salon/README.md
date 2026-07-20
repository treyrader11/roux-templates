# Roux UI — Hair Salon CMS (Pages Router)

A full-featured hair salon CMS built with Next.js Pages Router, Drizzle ORM, and NextAuth.

Bootstrapped with [`rouxui create`](https://rouxui.com).

> **Note on the ORM:** this template ships **Drizzle ORM** (Neon PostgreSQL), not Prisma.

## Deploy

The fastest way to get started — one click provisions a Neon PostgreSQL database and deploys to Vercel automatically:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/treyrader11/roux-templates/tree/main/templates/nextjs/page-router/cms/hair-salon&env=AUTH_SECRET,NEXTAUTH_URL&envDescription=Required%20environment%20variables&project-name=my-salon-app&integration-ids=oac_jUduyjQgOyzev1fjrW6s9QS3)

> After deploying, apply the schema against your provisioned database with `bun run db:push` (this project uses Drizzle, not Prisma).

Without a `DATABASE_URL` the app renders a **Setup Required** screen with these
instructions instead of crashing, so a fresh clone always boots.

## Local Development

```bash
bun install
cp .env.example .env.local
# Fill in your environment variables
bun run db:push     # create the schema
bun run db:seed     # optional: seed an admin user + demo content
bun dev             # http://localhost:3001
```

## Features

- Public marketing site (Home, Services, Stylists, Gallery, Pricing, Contact, Booking)
- Admin CMS dashboard — page content, images, staff, services, pricing and bookings are all editable, nothing is hardcoded
- NextAuth v4 authentication (credentials + JWT)
- Drizzle ORM with PostgreSQL (Neon serverless)
- Tailwind CSS v3 styling with light/dark theming
- Cloudinary media uploads, Resend transactional email, reCAPTCHA-protected forms

## Scripts

| Script | Purpose |
| --- | --- |
| `bun dev` | Dev server on port 3001 |
| `bun run build` | Production build |
| `bun run db:push` | Push the Drizzle schema to the database |
| `bun run db:seed` | Seed admin user + demo content |
| `bun run db:studio` | Open Drizzle Studio |
| `bun run db:reset` | Drop and recreate the schema |

## Add Roux UI Components

```bash
npx rouxui add <component-name>
```

Visit [rouxui.com/components](https://rouxui.com/components) to browse all components.
