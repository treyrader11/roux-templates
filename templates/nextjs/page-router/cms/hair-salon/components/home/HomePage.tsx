import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Hero } from "@/components/home/Hero";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import SplashScreen from "@/components/home/SplashScreen";
import { Showcase, type ShowcaseItem } from "@/components/home/Showcase";
import { Scissors, Palette, Sparkles } from "lucide-react";
import type { CollectionImage } from "@/lib/collections";
import type {
  HomeHero,
  HomeServicesOverview,
  HomeFeaturedStylists,
  HomeGalleryPreview,
  HomeCta,
  HomeShowcase,
  HomeSplash,
} from "@/lib/home-defaults";

export type HomeStylist = {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
};

export type HomeGalleryItem = {
  id: string;
  url: string;
  alt: string | null;
};

export interface HomePageProps {
  content: {
    hero: HomeHero;
    splash: HomeSplash;
    showcase: HomeShowcase;
    servicesOverview: HomeServicesOverview;
    featuredStylists: HomeFeaturedStylists;
    galleryPreview: HomeGalleryPreview;
    cta: HomeCta;
  };
  stylists: HomeStylist[];
  gallery: HomeGalleryItem[];
  showcaseItems: ShowcaseItem[];
  splashImages: CollectionImage[];
  heroCarousel: CollectionImage[];
}

const OVERVIEW_ICONS = [Scissors, Palette, Sparkles];

export function HomePage({
  content,
  stylists,
  gallery,
  showcaseItems,
  splashImages,
  heroCarousel,
}: HomePageProps) {
  const {
    hero,
    splash,
    showcase,
    servicesOverview,
    featuredStylists,
    galleryPreview,
    cta,
  } = content;

  return (
    <>
      {/* Intro splash — reveals CMS-managed images; frequency set in admin */}
      <SplashScreen images={splashImages} showOnce={splash.showOnce} />

      {/* Hero — split portrait layout matching Reverse Generation brand */}
      <Hero hero={hero} />

      {/* Hero carousel — full-width CMS-managed slider below the hero */}
      <HeroCarousel images={heroCarousel} />

      {/* Showcase carousel — CMS-managed product/style slides */}
      {showcaseItems.length > 0 && (
        <Showcase
          title={showcase.title}
          items={showcaseItems}
          autoplaySeconds={showcase.autoplaySeconds}
        />
      )}

      {/* Services overview */}
      <Section className="border-t border-border">
        <SectionHeading
          kicker={servicesOverview.title}
          title={servicesOverview.subtitle}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesOverview.items.map((item, i) => {
            const Icon = OVERVIEW_ICONS[i % OVERVIEW_ICONS.length];
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Featured stylists */}
      {stylists.length > 0 && (
        <Section className="border-t border-border">
          <SectionHeading
            kicker={featuredStylists.title}
            title={featuredStylists.subtitle}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stylists.map((s) => (
              <div key={s.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                  {s.imageUrl && (
                    <Image
                      src={s.imageUrl}
                      alt={s.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  )}
                </div>
                <h3 className="mt-4 font-display text-lg text-foreground">
                  {s.name}
                </h3>
                <p className="text-sm text-brand">{s.role}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Gallery preview */}
      {gallery.length > 0 && (
        <Section className="border-t border-border">
          <SectionHeading
            kicker={galleryPreview.title}
            title={galleryPreview.subtitle}
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((g) => (
              <div
                key={g.id}
                className="relative aspect-square overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={g.url}
                  alt={g.alt ?? "Portfolio image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <LinkButton href="/gallery" variant="outlined">
              View full gallery
            </LinkButton>
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="border-t border-border">
        <Reveal className="rounded-3xl bg-brand px-8 py-16 text-center text-brand-foreground">
          <h2 className="font-display text-3xl sm:text-4xl">{cta.title}</h2>
          <p className="mx-auto mt-3 max-w-md opacity-90">{cta.subtitle}</p>
          <LinkButton
            href={cta.buttonHref}
            variant="outlined"
            className="mt-8 border-brand-foreground text-brand-foreground hover:bg-brand-foreground/10"
          >
            {cta.buttonLabel}
          </LinkButton>
        </Reveal>
      </Section>
    </>
  );
}
