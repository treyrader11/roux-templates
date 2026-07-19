import Head from "next/head";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { SITE } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{`${SITE.name} — Hair Studio`}</title>
        <meta name="description" content={SITE.tagline} />
      </Head>
      <Hero />
      <Stats />
      <Services />
      <Gallery />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
