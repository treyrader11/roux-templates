import Head from "next/head";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Testimonials from "@/components/sections/Testimonials";
import BookingCTA from "@/components/sections/BookingCTA";
import { SITE_NAME, TAGLINE } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{`${SITE_NAME} — ${TAGLINE}`}</title>
        <meta name="description" content={TAGLINE} />
      </Head>
      <main>
        <Hero />
        <Stats />
        <FeaturedWork />
        <Testimonials />
        <BookingCTA />
      </main>
    </>
  );
}
