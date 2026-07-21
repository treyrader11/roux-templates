"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  SITE_NAME,
  TAGLINE,
  HERO_SUBTITLE,
  HERO_CTA,
  HERO_CTA_SECONDARY,
} from "@/lib/content";
import GrainOverlay from "@/components/ui/GrainOverlay";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/40 to-background" />

      {/* Film grain */}
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-6"
        >
          Film · Music · Production
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading text-6xl md:text-8xl font-bold text-foreground leading-none mb-6"
        >
          {SITE_NAME}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground font-light mb-4 italic"
        >
          {TAGLINE}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {HERO_SUBTITLE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            href="/work"
            className="bg-accent text-accent-foreground px-8 py-3 rounded-sm font-medium hover:bg-accent/90 transition-colors uppercase tracking-wider text-sm"
          >
            {HERO_CTA}
          </Link>
          <Link
            href="/booking"
            className="border border-border text-foreground px-8 py-3 rounded-sm font-medium hover:border-accent hover:text-accent transition-colors uppercase tracking-wider text-sm"
          >
            {HERO_CTA_SECONDARY}
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
