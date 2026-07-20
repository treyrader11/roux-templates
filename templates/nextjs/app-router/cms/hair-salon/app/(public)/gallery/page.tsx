import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Gallery } from "@/components/sections/Gallery";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <Section>
        <SectionHeading
          kicker="Portfolio"
          title="Our work"
          subtitle="A look at the cuts, colors, and transformations from our chairs."
        />
      </Section>
      <Gallery full />
    </>
  );
}
