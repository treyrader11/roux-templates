# Lumière Hair Studio — Next.js Pages Router + Prisma CMS

A hair-salon / beauty starter with a public marketing site and an admin CMS,
scaffolded by [`rouxui create`](https://rouxui.com). Design derived from the
ReverseGen editorial salon theme (warm terracotta + cream, Playfair Display + Inter).
Uses the **Pages Router** and **Tailwind v3**.

## Getting Started

```bash
bun install
cp .env.example .env.local   # set DATABASE_URL + AUTH_SECRET
bunx prisma db push
bun dev
```

## Structure

- `pages/` — public site (index, services, gallery, about, contact, booking)
- `pages/admin/` — CMS dashboard (services, gallery, bookings, staff) behind NextAuth
- `pages/api/` — auth, bookings, and services API routes
- `components/` — `layout/`, `sections/`, and `ui/` (pure Tailwind + lucide-react)
- `prisma/schema.prisma` — Service, Booking, StaffMember, GalleryImage, Testimonial, User
- `lib/content.ts` — placeholder salon content (swap for live Prisma queries)

## Add Roux UI components

```bash
npx rouxui add <component-name>
```
