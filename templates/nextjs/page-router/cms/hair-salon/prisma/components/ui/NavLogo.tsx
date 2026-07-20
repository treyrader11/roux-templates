import Image from "next/image";
import { cn } from "@/lib/utils";

// Intrinsic aspect of the brand files (public/sticky-logo-*.png, ~1824×560).
const LOGO_ASPECT = 1824 / 560;

type NavLogoProps = {
  /** Rendered logo height in px; width scales to the image aspect. Default 44. */
  size?: number;
  /** Light-mode source. */
  src?: string;
  /** Dark-mode source. Falls back to `src` when omitted. */
  srcDark?: string;
  alt?: string;
  className?: string;
};

export default function NavLogo({
  size = 44,
  src = "/sticky-logo-transparent.png",
  srcDark = "/sticky-logo-transparent-oncolor.png",
  alt = "Reverse Generation",
  className,
}: NavLogoProps) {
  const width = Math.round(size * LOGO_ASPECT);
  return (
    <>
      {/* Light mode */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={size}
        priority
        className={cn("object-contain dark:hidden", className)}
      />
      {/* Dark mode */}
      <Image
        src={srcDark}
        alt={alt}
        width={width}
        height={size}
        priority
        className={cn("hidden object-contain dark:block", className)}
      />
    </>
  );
}
