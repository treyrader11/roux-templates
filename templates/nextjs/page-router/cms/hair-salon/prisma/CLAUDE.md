# CLAUDE.md — Reverse Gen Hair Salon Marketing Site

> This file configures Claude AI agent behavior when working on the reverse-gen codebase. Keep it at the project root and update it as the project evolves.

---

## Project Identity

- **Name:** Reverse Gen
- **Purpose:** Hair salon marketing site with a custom CMS for managing all page content, images, staff, services, and bookings
- **URL (local):** http://localhost:3001
- **Package Manager:** Bun (NEVER use npm, yarn, or pnpm)
- **Framework:** Next.js 15 — **Pages Router ONLY** (no App Router, no `app/` directory)
- **Language:** TypeScript (strict mode)
- **Database:** PostgreSQL via Neon (serverless) + Drizzle ORM
- **Auth:** NextAuth 4
- **Styling:** Tailwind CSS v3
- **Animation:** GSAP 3 + Framer Motion 11 + Locomotive Scroll 5
- **Media:** Cloudinary (all images and uploads — NO Git LFS, no local video files)
- **Reference Codebase:** `../em-cms-example` — follow its CMS architecture, admin patterns, and component organization exactly

---

## What Reverse Gen Is

Reverse Gen is a marketing and booking site for a hair salon. The site showcases services, stylists, portfolio work, pricing, and contact information. All page content is managed through a custom CMS admin dashboard — no content is hardcoded. The CMS architecture mirrors the em-cms-example project exactly.

---

## Folder Structure & Architecture

This project uses the **Pages Router**. Do NOT use App Router patterns, Server Components, or the `app/` directory. Follow the exact same page-scoped component organization as em-cms-example.

```
reverse-gen/
├── animation/           # Reusable GSAP timelines and animation configs
├── components/
│   ├── ui/              # Global reusable primitives (Button, Badge, Input, etc.)
│   ├── layout/          # Header, Footer, Navigation, PageWrapper
│   ├── home/            # Components used only on the home page
│   ├── services/        # Components used only on the services page
│   ├── stylists/        # Components used only on the stylists page
│   ├── gallery/         # Components used only on the gallery page
│   ├── pricing/         # Components used only on the pricing page
│   ├── contact/         # Components used only on the contact page
│   ├── booking/         # Components used only on the booking page
│   └── admin/           # CMS admin dashboard components
├── constants/           # Site-wide constants, nav links, page config
├── container/           # Layout wrapper components
├── docs/                # Project documentation
├── db/                  # Drizzle schema, client wiring, seed/reset scripts
├── lib/                 # Shared utilities, Drizzle client, auth config, Cloudinary, Resend
├── motion/              # Shared Framer Motion variants
├── pages/
│   ├── api/
│   │   ├── admin/       # CMS API routes
│   │   └── auth/        # NextAuth API routes
│   ├── admin/           # Admin CMS pages (protected)
│   ├── services/
│   ├── stylists/
│   ├── gallery/
│   ├── pricing/
│   ├── contact/
│   ├── booking/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── 404.tsx
│   └── index.tsx
├── public/              # Static assets ONLY — no video or large binary files
├── styles/              # Global CSS, Tailwind base
└── types/               # Global TypeScript types
```

### The Rule: Pages Are Thin, Components Are Rich

Every file in `pages/` is a thin shell. All UI, logic, and sub-components live in `components/<page-name>/`.

```typescript
// ✅ CORRECT — thin page file
import { ServicesPage } from "@/components/services/services-page"
import type { GetStaticProps } from "next"

export const getStaticProps: GetStaticProps = async () => {
  const content = await getPageContent("services")
  return { props: { content }, revalidate: 60 }
}

export default function Services({ content }: ServicesProps) {
  return <ServicesPage content={content} />
}
```

---

## Critical Rules (Always Follow)

### Commands

- ALWAYS use `bun` for installs: `bun add <package>`, `bun add -d <package>`
- NEVER use npm, yarn, or pnpm
- Dev server: `bun run dev`
- Build: `bun run build`
- Lint: `bun run lint`
- Generate SQL migrations: `bun run db:generate` (drizzle-kit generate)
- Database push: `bun run db:push` (**DANGEROUS — confirm before running; drizzle-kit push**)
- Reset schema (drops everything): `bun run db:reset` (**DESTRUCTIVE — dev only**)
- Seed admin user: `bun run db:seed`
- Drizzle Studio: `bun run db:studio`

### Pages Router Rules (CRITICAL)

- `getStaticProps` — use for marketing pages (most pages)
- `getServerSideProps` — use for admin pages (always fresh data)
- `useRouter` from `next/router` — NOT `next/navigation`
- API routes live in `pages/api/`
- No `"use client"` or `"use server"` directives — Pages Router only
- No Server Components, no `next/headers`, no `cookies()`

### TypeScript & React

- ALWAYS use TypeScript — never `.js` or `.jsx` (except config files)
- NEVER use `React.FC` — plain function declarations with typed props
- No `any` types
- No unused imports

---

## CMS Architecture (Mirror em-cms-example Exactly)

All page content is stored in the `siteContent` Drizzle table keyed by slug. Images go in `siteImage` via Cloudinary. Follow em-cms-example's CMS patterns exactly — same slug conventions, same `SectionEditor` component pattern, same admin hub structure.

### Content Storage Pattern

```typescript
// db/schema.ts (Drizzle + Postgres)
export const siteContent = pgTable("site_content", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(), // JSON-stringified content
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  updatedBy: text("updated_by"),
});

export const siteImage = pgTable("site_image", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  url: text("url").notNull(),        // Cloudinary secure_url
  publicId: text("public_id").notNull(), // Cloudinary public_id (for destroy)
  alt: text("alt"),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});
```

### Slug Conventions

```
home:hero
home:services-overview
home:featured-stylists
home:gallery-preview
home:cta
services:hero
services:list
stylists:hero
stylists:team
gallery:hero
gallery:images
pricing:hero
pricing:packages
contact:hero
contact:info
booking:hero
```

### CMS Admin Route Map

```
/admin                   # Dashboard hub
/admin/home              # Home page sections hub
/admin/home/hero         # Hero section
/admin/home/services-overview
/admin/home/featured-stylists
/admin/home/gallery-preview
/admin/home/cta
/admin/services          # Services hub
/admin/services/hero
/admin/services/list     # CRUD for individual services
/admin/stylists          # Stylists hub
/admin/stylists/hero
/admin/stylists/team     # CRUD for stylist profiles
/admin/gallery           # Gallery hub
/admin/gallery/images    # Upload and manage portfolio images
/admin/pricing           # Pricing hub
/admin/pricing/packages  # CRUD for pricing packages
/admin/contact           # Contact hub
/admin/contact/hero
/admin/contact/info      # Address, phone, hours, social links
/admin/booking           # Booking settings
/admin/users             # User management
/admin/account           # Account settings
```

### How to Add a New CMS Section (follow em-cms-example)

1. Add TypeScript types and defaults in `lib/<page>-defaults.ts`
2. Add the slug to `lib/<page>-defaults.ts` constants
3. Create `pages/admin/<page>/[section].tsx` using `SectionEditor`
4. Add `getStaticProps` to the public page to fetch from Drizzle (`db` from `lib/db.ts`)
5. Update `pages/admin/<page>/index.tsx` hub with the new section card
6. Update `pages/admin/index.tsx` dashboard

---

## Database (Drizzle ORM + Neon PostgreSQL)

- **NO Git LFS** — this project has no large binary files committed to Git
- **NO local video files** — all media goes through Cloudinary
- Schema in `db/schema.ts`; drizzle-kit config in `drizzle.config.ts`
- Neon connection string in `DATABASE_URL` env var
- Drizzle client singleton in `lib/db.ts` — uses the `drizzle-orm/neon-http` driver (serverless-friendly for Vercel)
- Never instantiate a new Drizzle client outside `lib/db.ts`
- Always include `createdAt` and `updatedAt` on every table (`$onUpdate(() => new Date())`)

```typescript
// lib/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

const globalForDb = globalThis as unknown as {
  db?: ReturnType<typeof drizzle<typeof schema>>;
};
const sql = neon(process.env.DATABASE_URL ?? "");
export const db = globalForDb.db ?? drizzle(sql, { schema });
if (process.env.NODE_ENV !== "production") globalForDb.db = db;
```

Query with the Drizzle core API, e.g. `db.select().from(siteContent).where(eq(siteContent.slug, slug))`, and upsert with `.onConflictDoUpdate({ target, set })`. Read helpers wrap DB calls in try/catch so public pages fall back to in-code defaults when the DB is unreachable (`lib/cms.ts`).

### CRITICAL: keep `lib/db` out of client bundles

`lib/db.ts` calls `neon(process.env.DATABASE_URL ?? "")` at **import time**. If any module reachable from client code (a page component, an admin component, a shared `lib/*` file it imports) transitively imports `lib/db`, the whole DB client is bundled into the browser and throws `No database connection string was provided to 'neon()'`, blanking the page.

- Never import `lib/db` (or a module that imports it) from a client component.
- Split shared modules by environment: put **client-safe constants/types** in a plain module (e.g. `lib/collections.ts`) and put **DB read helpers** in a sibling `*-server.ts` module (e.g. `lib/collections-server.ts`) imported only from `getStaticProps` / `getServerSideProps` / API routes.
- Rule of thumb: if a file imports `@/lib/db` or `@/db/schema`, it is server-only — a client component may import its **types** but never its runtime code.

**NEVER run `bun run db:push` or `bun run db:reset` without warning the user — push can alter/drop columns and reset drops the entire schema. Prefer generating a migration (`bun run db:generate`) and reviewing it.**

### Applying a new table (schema is not the database)

Adding a `pgTable` to `db/schema.ts` does **nothing** until the table actually exists in Neon. A missing table produces a signature failure mode: admin list views show "failed to load," and direct-to-Cloudinary uploads appear to succeed but "disappear" because the row insert (`POST`) silently fails against the nonexistent table.

- For a **brand-new** table, prefer a targeted, idempotent `CREATE TABLE IF NOT EXISTS` that matches the schema exactly (safe and additive — touches nothing else) over a broad `db:push`.
- Use `db:push`/`db:generate` only with explicit user confirmation (see the warning above), since they diff and can alter/drop across every table.
- The `DATABASE_URL` in `.env.local` points at the same Neon instance Vercel uses, so applying a table locally also fixes production.

---

## Authentication (NextAuth 4)

- Config in `pages/api/auth/[...nextauth].ts`
- `NEXTAUTH_SECRET` and `NEXTAUTH_URL` env vars
- `getServerSession(req, res, authOptions)` in API routes and `getServerSideProps`
- `useSession()` in client components
- All `/admin/**` pages must check session in `getServerSideProps` and redirect if unauthenticated

---

## Media (Cloudinary — No Git LFS)

- ALL images and uploads go through Cloudinary
- Use `next-cloudinary`'s `<CldImage>` for Cloudinary assets
- Use `next/image` for local static assets in `/public/`
- Generate upload signatures in API routes — never expose `CLOUDINARY_API_SECRET` to the client
- Store Cloudinary public IDs in the database

---

## Animation Stack (GSAP + Framer Motion + Locomotive Scroll)

Same rules as em-cms-example:

- Register ScrollTrigger once in `lib/gsap.ts`
- Always clean up GSAP ScrollTrigger in useEffect return
- Store shared Framer Motion variants in `motion/variants.ts`
- Initialize Locomotive Scroll in `_app.tsx`, destroy on route change
- No Locomotive Scroll on admin pages

---

## Styling (Tailwind CSS v3)

- Tailwind v3 — config in `tailwind.config.js`
- `cn()` helper in `lib/utils.ts` using `clsx` + `tailwind-merge`
- Always support dark mode with `dark:` variants
- Brand colors defined in `tailwind.config.js` under `theme.extend.colors`

---

## Environment Variables

```env
DATABASE_URL=""                    # Neon PostgreSQL connection string
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
RESEND_API_KEY=""
NEXT_PUBLIC_SITE_URL=""
RECAPTCHA_SECRET_KEY=""
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=""
```

---

## Code Quality Checks

Before any task is complete:

1. `bun run build` succeeds — no TypeScript errors
2. `bun run lint` passes
3. No `any` types
4. No unused imports
5. No `console.log` in production code
6. Pages Router patterns only — no App Router imports
7. All admin routes have session check in `getServerSideProps`
8. GSAP ScrollTrigger cleanup in every useEffect
9. Dark mode works
10. Mobile responsive at 375px, 768px, 1024px, 1440px
11. Loading and error states on every async operation

---

## What NOT to Do

- Never use npm, yarn, or pnpm
- Never create an `app/` directory
- Never use `"use client"` or `"use server"`
- Never import from `next/navigation` — use `next/router`
- Never put logic in `pages/` files — keep pages thin
- Never commit video or large binary files — use Cloudinary
- Never expose secret keys to the client
- Never initialize GSAP or Locomotive Scroll outside `useEffect`
- Never skip session check on admin pages
- Never call Drizzle (`db`) directly from a component — use API routes or `getServerSideProps`
- Never run `bun run db:push` or `bun run db:reset` without user confirmation

---

## Git Commit Messages (MANDATORY)

End every response that changes code with a brief commit message.

**Always present the commit message on its own inside a fenced code block** (```) so it renders with a one-click copy icon — never inline in a sentence or highlighted prose. Output exactly one commit message per response, and put nothing else inside that code block.

```
feat(admin): add services CMS editor with Cloudinary image upload
```

Keep it to a single concise line. Prefixes: `feat`, `fix`, `docs`, `refactor`, `chore`, `style`, `perf`, `content`, `anim`
