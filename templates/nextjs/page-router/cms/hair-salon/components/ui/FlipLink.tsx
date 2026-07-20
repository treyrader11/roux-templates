import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Ported from the marcella-simien TransitionLink: on hover each letter slides
// up and out while a duplicate slides up into its place, staggered per letter.
const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipLinkProps {
  href: string;
  children: string;
  className?: string;
  onClick?: () => void;
}

export function FlipLink({ href, children, className, onClick }: FlipLinkProps) {
  const letters = children.split("");

  const renderLayer = (
    from: string | number,
    to: string | number
  ) =>
    letters.map((letter, i) => (
      <motion.span
        key={i}
        variants={{ initial: { y: from }, hovered: { y: to } }}
        transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
        className="inline-block"
      >
        {letter === " " ? " " : letter}
      </motion.span>
    ));

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={children}
      className={cn(
        "relative inline-block overflow-hidden whitespace-nowrap",
        className
      )}
    >
      <motion.span
        initial="initial"
        whileHover="hovered"
        animate="initial"
        className="relative block"
      >
        <span aria-hidden="true" className="block">
          {renderLayer(0, "-100%")}
        </span>
        <span aria-hidden="true" className="absolute inset-0">
          {renderLayer("100%", 0)}
        </span>
      </motion.span>
    </Link>
  );
}
