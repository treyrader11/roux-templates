import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookingCTA } from "@/components/sections/BookingCTA";

// Server Component — composes the marketing sections in ReverseGen's rhythm.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Gallery />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
