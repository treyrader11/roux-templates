// // import Image from "next/image";
// // import { useHeroReveal } from "@/animation/useHeroReveal";
// // import { LinkButton } from "@/components/ui/button";
// // import type { HomeHero } from "@/lib/home-defaults";

// // interface HeroProps {
// //   hero: HomeHero;
// // }

// // export function Hero({ hero }: HeroProps) {
// //   const heroRef = useHeroReveal<HTMLDivElement>();
// //   const hasImage = Boolean(hero.image);

// //   return (
// //     <section id="hero" className="relative w-full overflow-hidden bg-[#f5f0eb]">
// //       {/* Unified split layout — works on ALL screen sizes including mobile */}
// //       <div ref={heroRef} className="flex w-full min-h-[55vw] sm:min-h-[92vh]">
// //         {/* Left — portrait image, fixed proportion */}
// //         <div className="relative w-[38%] sm:w-[44%] flex-shrink-0 self-stretch">
// //           {hasImage ? (
// //             <Image
// //               src={hero.image}
// //               alt="Reverse Generation salon model"
// //               fill
// //               priority
// //               className="object-cover object-top"
// //               sizes="(max-width: 640px) 38vw, 44vw"
// //             />
// //           ) : (
// //             <div className="h-full w-full bg-stone-200" />
// //           )}
// //           {/* Vertical brand rule on right edge */}
// //           <div className="absolute right-0 inset-y-0 w-[2px] sm:w-[3px] bg-brand opacity-80" />
// //         </div>

// //         {/* Right — content panel, cream background */}
// //         <div className="flex flex-1 flex-col justify-center bg-[#f5f0eb] px-4 py-6 sm:pl-16 sm:pr-12 lg:pl-24 lg:pr-20">
// //           {/* Kicker */}
// //           <span
// //             data-reveal
// //             className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-brand"
// //           >
// //             {hero.kicker}
// //           </span>

// //           {/* Headline */}
// //           <h1
// //             data-reveal
// //             className="mt-2 sm:mt-5 font-display text-xl sm:text-5xl font-black uppercase leading-[0.92] tracking-tight text-stone-900 lg:text-6xl xl:text-7xl"
// //           >
// //             {hero.headline}
// //           </h1>

// //           {/* Subheadline — hidden on very small screens to avoid clutter */}
// //           <p
// //             data-reveal
// //             className="mt-2 sm:mt-6 text-[7px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-stone-400 leading-snug"
// //           >
// //             {hero.subheadline}
// //           </p>

// //           {/* CTAs */}
// //           <div
// //             data-reveal
// //             className="mt-4 sm:mt-10 flex flex-col gap-2 sm:gap-3 w-full sm:max-w-[340px]"
// //           >
// //             {hero.ctas.map((c, i) => (
// //               <LinkButton
// //                 key={c.href}
// //                 href={c.href}
// //                 variant={c.variant}
// //                 className={
// //                   i === 0
// //                     ? "w-full rounded-none bg-stone-900 px-2 sm:px-8 py-2 sm:py-4 text-[7px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white hover:bg-brand"
// //                     : "hidden sm:flex w-full rounded-none border border-stone-900 bg-transparent px-8 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-stone-900 hover:border-brand hover:text-brand"
// //                 }
// //               >
// //                 {c.label}
// //               </LinkButton>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// import Image from "next/image";
// import { useHeroReveal } from "@/animation/useHeroReveal";
// import { LinkButton } from "@/components/ui/button";
// import type { HomeHero } from "@/lib/home-defaults";

// interface HeroProps {
//   hero: HomeHero;
// }

// export function Hero({ hero }: HeroProps) {
//   const heroRef = useHeroReveal<HTMLDivElement>();
//   const hasImage = Boolean(hero.image);

//   return (
//     <section
//       id="hero"
//       className="relative w-full overflow-hidden"
//       style={{ backgroundColor: "#e8e4de" }}
//     >
//       <div ref={heroRef} className="flex w-full" style={{ minHeight: "80vh" }}>
//         {/* Left — portrait + logo overlay */}
//         <div className="relative flex-shrink-0" style={{ width: "42%" }}>
//           {/* Portrait image — contained, does NOT bleed past the column */}
//           {hasImage && (
//             <div className="absolute inset-0">
//               <Image
//                 src={hero.image}
//                 alt="Reverse Generation salon model"
//                 fill
//                 priority
//                 className="object-cover object-top"
//                 sizes="42vw"
//               />
//             </div>
//           )}

//           {/* Logo — top left corner, overlaid on the image */}
//           <div className="absolute top-6 left-6 z-10 sm:top-8 sm:left-8">
//             <Image
//               src="/logo.png"
//               alt="Reverse Generation logo"
//               width={120}
//               height={120}
//               className="object-contain sm:w-[160px] sm:h-[160px]"
//             />
//           </div>

//           {/* Vertical divider rule — right edge of the image column */}
//           <div
//             className="absolute right-0 top-0 bottom-0 z-10"
//             style={{ width: 3, backgroundColor: "#7c5c8a", opacity: 0.7 }}
//           />
//         </div>

//         {/* Right — content */}
//         <div
//           className="flex flex-1 flex-col justify-center"
//           style={{
//             backgroundColor: "#e8e4de",
//             paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
//             paddingRight: "clamp(1rem, 3vw, 4rem)",
//             paddingTop: "2rem",
//             paddingBottom: "2rem",
//           }}
//         >
//           {/* Kicker */}
//           <span
//             data-reveal
//             className="block font-bold uppercase text-brand"
//             style={{
//               fontSize: "clamp(9px, 1vw, 13px)",
//               letterSpacing: "0.3em",
//             }}
//           >
//             {hero.kicker}
//           </span>

//           {/* Headline */}
//           <h1
//             data-reveal
//             className="font-display font-black uppercase text-stone-900"
//             style={{
//               marginTop: "clamp(0.5rem, 1.5vw, 1.25rem)",
//               fontSize: "clamp(1.5rem, 5vw, 5rem)",
//               lineHeight: 0.92,
//               letterSpacing: "-0.01em",
//             }}
//           >
//             {hero.headline}
//           </h1>

//           {/* Subheadline */}
//           <p
//             data-reveal
//             className="font-semibold uppercase text-stone-400"
//             style={{
//               marginTop: "clamp(0.5rem, 1.5vw, 1.5rem)",
//               fontSize: "clamp(7px, 0.9vw, 12px)",
//               letterSpacing: "0.18em",
//               lineHeight: 1.5,
//               maxWidth: "38ch",
//             }}
//           >
//             {hero.subheadline}
//           </p>

//           {/* CTAs */}
//           <div
//             data-reveal
//             className="flex flex-col"
//             style={{
//               marginTop: "clamp(1rem, 3vw, 2.5rem)",
//               gap: "clamp(0.4rem, 0.8vw, 0.75rem)",
//               maxWidth: "clamp(160px, 30vw, 380px)",
//             }}
//           >
//             {hero.ctas.map((c, i) => (
//               <LinkButton
//                 key={c.href}
//                 href={c.href}
//                 variant={c.variant}
//                 className={[
//                   "w-full rounded-none font-black uppercase",
//                   i === 0
//                     ? "bg-stone-900 text-white hover:bg-brand"
//                     : "border border-stone-900 bg-transparent text-stone-900 hover:border-brand hover:text-brand",
//                 ].join(" ")}
//                 style={{
//                   fontSize: "clamp(7px, 0.85vw, 11px)",
//                   letterSpacing: "0.22em",
//                   padding:
//                     "clamp(0.4rem, 1vw, 1rem) clamp(0.5rem, 1.5vw, 2rem)",
//                 }}
//               >
//                 {c.label}
//               </LinkButton>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import { useHeroReveal } from "@/animation/useHeroReveal";
import { LinkButton } from "@/components/ui/button";
import type { HomeHero } from "@/lib/home-defaults";

interface HeroProps {
  hero: HomeHero;
}

export function Hero({ hero }: HeroProps) {
  const heroRef = useHeroReveal<HTMLDivElement>();
  const hasImage = Boolean(hero.image);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-muted"
    >
      <div
        ref={heroRef}
        className="flex w-full"
        style={{ minHeight: "clamp(200px, 55vw, 92vh)" }}
      >
        {/* Left — portrait image column, never bleeds right */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{ width: "clamp(120px, 38%, 560px)" }}
        >
          {hasImage && (
            <Image
              src={hero.image}
              alt="Reverse Generation salon model"
              fill
              priority
              className="object-cover object-top"
              sizes="38vw"
            />
          )}
          {/* Divider rule — hard right edge */}
          <div
            className="absolute right-0 top-0 bottom-0 z-10 bg-brand opacity-60"
            style={{ width: 2 }}
          />
        </div>

        {/* Right — content, vertically centered, no excess padding */}
        <div
          className="flex flex-1 flex-col justify-center bg-muted"
          style={{
            padding:
              "clamp(1rem, 3vw, 4rem) clamp(0.75rem, 3vw, 4rem) clamp(1rem, 3vw, 4rem) clamp(1rem, 4vw, 5rem)",
          }}
        >
          {/* Kicker */}
          <span
            data-reveal
            className="block font-bold uppercase text-brand"
            style={{
              fontSize: "clamp(6px, 1.1vw, 12px)",
              letterSpacing: "0.28em",
            }}
          >
            {hero.kicker}
          </span>

          {/* Headline */}
          <h1
            data-reveal
            className="font-display font-black uppercase text-foreground"
            style={{
              marginTop: "clamp(0.25rem, 1vw, 1rem)",
              fontSize: "clamp(1rem, 4.5vw, 5rem)",
              lineHeight: 0.93,
              letterSpacing: "-0.01em",
            }}
          >
            {hero.headline}
          </h1>

          {/* Subheadline */}
          <p
            data-reveal
            className="font-semibold uppercase text-muted-foreground"
            style={{
              marginTop: "clamp(0.35rem, 1vw, 1.25rem)",
              fontSize: "clamp(5.5px, 0.85vw, 11px)",
              letterSpacing: "0.15em",
              lineHeight: 1.5,
            }}
          >
            {hero.subheadline}
          </p>

          {/* CTAs */}
          <div
            data-reveal
            className="flex flex-col"
            style={{
              marginTop: "clamp(0.6rem, 2vw, 2rem)",
              gap: "clamp(0.3rem, 0.6vw, 0.6rem)",
              width: "100%",
              maxWidth: "clamp(140px, 28vw, 360px)",
            }}
          >
            {hero.ctas.map((c, i) => (
              <LinkButton
                key={c.href}
                href={c.href}
                variant={c.variant}
                className={[
                  "w-full rounded-none font-black uppercase",
                  i === 0
                    ? "bg-foreground text-background hover:bg-brand hover:text-brand-foreground"
                    : "border border-foreground bg-transparent text-foreground hover:border-brand hover:text-brand",
                ].join(" ")}
                style={{
                  fontSize: "clamp(6px, 0.8vw, 10px)",
                  letterSpacing: "0.22em",
                  padding:
                    "clamp(0.35rem, 0.8vw, 0.9rem) clamp(0.4rem, 1.2vw, 1.5rem)",
                }}
              >
                {c.label}
              </LinkButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
