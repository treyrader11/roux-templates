// Reverse Gen — Drizzle schema (PostgreSQL via Neon)
import {
  pgTable,
  pgEnum,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
]);

const primaryId = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

// ---------------------------------------------------------------------------
// CMS core — slug-keyed JSON store
// ---------------------------------------------------------------------------

export const siteContent = pgTable("site_content", {
  id: primaryId(),
  slug: text("slug").notNull().unique(), // e.g. "home:hero"
  content: text("content").notNull(), // JSON-stringified section object
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  updatedBy: text("updated_by"),
});

export const siteImage = pgTable("site_image", {
  id: primaryId(),
  slug: text("slug").notNull().unique(),
  url: text("url").notNull(),
  publicId: text("public_id").notNull(),
  alt: text("alt"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  updatedBy: text("updated_by"),
});

// ---------------------------------------------------------------------------
// Structured CMS lists
// ---------------------------------------------------------------------------

export const service = pgTable("service", {
  id: primaryId(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull().default(""),
  price: text("price").notNull().default(""),
  category: text("category"),
  imageUrl: text("image_url"),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const stylist = pgTable("stylist", {
  id: primaryId(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull().default(""),
  imageUrl: text("image_url"),
  instagram: text("instagram"),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const pricingPackage = pgTable("pricing_package", {
  id: primaryId(),
  name: text("name").notNull(),
  price: text("price").notNull(),
  description: text("description"),
  features: text("features").notNull().default("[]"), // JSON-stringified string[]
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const galleryImage = pgTable("gallery_image", {
  id: primaryId(),
  url: text("url").notNull(),
  publicId: text("public_id").notNull(),
  alt: text("alt"),
  category: text("category"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Ordered image collections keyed by a `collection` slug (e.g. "splash",
// "home-hero-carousel"). One row per image; reorder via the `order` column.
export const collectionImage = pgTable("collection_image", {
  id: primaryId(),
  collection: text("collection").notNull(), // e.g. "splash", "home-hero-carousel"
  url: text("url").notNull(),
  publicId: text("public_id").notNull(),
  alt: text("alt"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const showcaseItem = pgTable("showcase_item", {
  id: primaryId(),
  imageUrl: text("image_url").notNull(),
  publicId: text("public_id").notNull(),
  name: text("name").notNull().default(""),
  subtitle: text("subtitle"),
  price: text("price"),
  href: text("href"),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const booking = pgTable("booking", {
  id: primaryId(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  stylist: text("stylist"),
  date: text("date"),
  time: text("time"),
  notes: text("notes"),
  status: bookingStatusEnum("status").notNull().default("PENDING"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// ---------------------------------------------------------------------------
// Auth (NextAuth 4, credentials + JWT — no adapter tables needed)
// ---------------------------------------------------------------------------

export const user = pgTable("user", {
  id: primaryId(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  hashedPassword: text("hashed_password"),
  role: roleEnum("role").notNull().default("USER"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type BookingStatus = (typeof bookingStatusEnum.enumValues)[number];
export type Role = (typeof roleEnum.enumValues)[number];
