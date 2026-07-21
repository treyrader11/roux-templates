import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import BookingCTA from "@/components/sections/BookingCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <FeaturedWork />
      <Testimonials />
      <BookingCTA />
    </main>
  );
}
