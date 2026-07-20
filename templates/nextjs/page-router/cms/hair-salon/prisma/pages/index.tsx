import type { GetStaticProps } from "next";
import Head from "next/head";
import { HomePage, type HomePageProps } from "@/components/home/HomePage";
import { eq, asc } from "drizzle-orm";
import { getContentBySlugs, safeList } from "@/lib/cms";
import { parseCms } from "@/lib/utils";
import { db } from "@/lib/db";
import { stylist, galleryImage, showcaseItem } from "@/db/schema";
import { COLLECTION_SLUGS } from "@/lib/collections";
import { getCollectionImages } from "@/lib/collections-server";
import {
  DEFAULT_HOME_HERO,
  DEFAULT_HOME_SPLASH,
  DEFAULT_HOME_SHOWCASE,
  DEFAULT_HOME_SERVICES_OVERVIEW,
  DEFAULT_HOME_FEATURED_STYLISTS,
  DEFAULT_HOME_GALLERY_PREVIEW,
  DEFAULT_HOME_CTA,
  HOME_SECTION_SLUGS,
} from "@/lib/home-defaults";

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const slugs = Object.values(HOME_SECTION_SLUGS);
  const [
    records,
    stylists,
    gallery,
    showcaseItems,
    splashImages,
    heroCarousel,
  ] = await Promise.all([
    getContentBySlugs(slugs),
    safeList(() =>
      db
        .select({
          id: stylist.id,
          name: stylist.name,
          role: stylist.role,
          imageUrl: stylist.imageUrl,
        })
        .from(stylist)
        .where(eq(stylist.active, true))
        .orderBy(asc(stylist.order))
        .limit(3),
    ),
    safeList(() =>
      db
        .select({
          id: galleryImage.id,
          url: galleryImage.url,
          alt: galleryImage.alt,
        })
        .from(galleryImage)
        .orderBy(asc(galleryImage.order))
        .limit(8),
    ),
    safeList(() =>
      db
        .select({
          id: showcaseItem.id,
          imageUrl: showcaseItem.imageUrl,
          name: showcaseItem.name,
          subtitle: showcaseItem.subtitle,
          price: showcaseItem.price,
          href: showcaseItem.href,
        })
        .from(showcaseItem)
        .where(eq(showcaseItem.active, true))
        .orderBy(asc(showcaseItem.order)),
    ),
    getCollectionImages(COLLECTION_SLUGS.splash),
    getCollectionImages(COLLECTION_SLUGS.homeHeroCarousel),
  ]);

  return {
    props: {
      content: {
        hero: parseCms(records[HOME_SECTION_SLUGS.hero], DEFAULT_HOME_HERO),
        splash: parseCms(records[HOME_SECTION_SLUGS.splash], DEFAULT_HOME_SPLASH),
        showcase: parseCms(
          records[HOME_SECTION_SLUGS.showcase],
          DEFAULT_HOME_SHOWCASE,
        ),
        servicesOverview: parseCms(
          records[HOME_SECTION_SLUGS.servicesOverview],
          DEFAULT_HOME_SERVICES_OVERVIEW,
        ),
        featuredStylists: parseCms(
          records[HOME_SECTION_SLUGS.featuredStylists],
          DEFAULT_HOME_FEATURED_STYLISTS,
        ),
        galleryPreview: parseCms(
          records[HOME_SECTION_SLUGS.galleryPreview],
          DEFAULT_HOME_GALLERY_PREVIEW,
        ),
        cta: parseCms(records[HOME_SECTION_SLUGS.cta], DEFAULT_HOME_CTA),
      },
      stylists,
      gallery,
      showcaseItems,
      splashImages,
      heroCarousel,
    },
    revalidate: 60,
  };
};

export default function Home(props: HomePageProps) {
  return (
    <>
      <Head>
        <title>Reverse Gen — Modern Hair Studio</title>
        <meta
          name="description"
          content="A boutique hair salon for cut, color, and care. Book your appointment with Reverse Gen."
        />
      </Head>
      <HomePage {...props} />
    </>
  );
}
