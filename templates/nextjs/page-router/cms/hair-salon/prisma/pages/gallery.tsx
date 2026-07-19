import Head from "next/head";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Gallery } from "@/components/sections/Gallery";
import { SITE } from "@/lib/content";

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>{`Gallery — ${SITE.name}`}</title>
      </Head>
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
