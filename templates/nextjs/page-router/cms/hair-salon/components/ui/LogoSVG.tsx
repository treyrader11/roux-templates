/**
 * LogoSVG — vector "Reverse Generation" wordmark.
 *
 * "Reverse"    → high-contrast Didone display serif (Bodoni Moda italic carries
 *                the swash/curled R leg from the original mark).
 * "Generation" → lighter classical serif, letter-spaced (Cormorant Garamond).
 *
 * The two Google fonts are pulled in via an @import inside the SVG so the mark
 * is fully self-contained and scales without rasterization. If you need the
 * exact proprietary cut (ITC Bodoni Seventy-Two Swash), load it via @font-face
 * in global CSS and update the fontFamily below.
 */

type LogoSVGProps = {
  /** Rendered width; height scales proportionally. Default 220. */
  width?: number | string;
  /** Fill color for both lines. Default #000000. */
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function LogoSVG({
  width = 220,
  color = "#000000",
  className,
  style,
}: LogoSVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 80"
      width={width}
      className={className}
      style={{ display: "inline-block", overflow: "visible", ...style }}
      aria-label="Reverse Generation"
      role="img"
    >
      <defs>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@1,6..96,700&family=Cormorant+Garamond:wght@400&display=swap');
        `}</style>
      </defs>

      {/* "Reverse" — italic Bodoni Moda Bold, spanning the full viewBox width. */}
      <text
        x="110"
        y="52"
        textAnchor="middle"
        fontFamily="'Bodoni Moda', 'Didot', 'Bodoni MT', Georgia, serif"
        fontSize="58"
        fontWeight="700"
        fontStyle="italic"
        fill={color}
        textLength="216"
        lengthAdjust="spacingAndGlyphs"
      >
        Reverse
      </text>

      {/* "Generation" — Cormorant Garamond, letter-spaced, centered beneath. */}
      <text
        x="110"
        y="72"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'IM Fell English', 'Bodoni MT', Georgia, serif"
        fontSize="13"
        fontWeight="400"
        fontStyle="normal"
        letterSpacing="3.5"
        fill={color}
      >
        Generation
      </text>
    </svg>
  );
}

export default LogoSVG;
