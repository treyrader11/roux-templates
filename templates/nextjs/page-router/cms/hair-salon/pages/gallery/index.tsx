import type { GetStaticProps } from "next";
import Head from "next/head";
import { GalleryPage, type GalleryPageProps } from "@/components/gallery/GalleryPage";
import { asc } from "drizzle-orm";
import { getContentBySlugs, safeList } from "@/lib/cms";
import { parseCms } from "@/lib/utils";
import { db } from "@/lib/db";
import { galleryImage } from "@/db/schema";
import { DEFAULT_GALLERY_HERO, GALLERY_SECTION_SLUGS } from "@/lib/gallery-defaults";

export const getStaticProps: GetStaticProps<GalleryPageProps> = async () => {
  const [records, images] = await Promise.all([
    getContentBySlugs([GALLERY_SECTION_SLUGS.hero]),
    safeList(() =>
      db
        .select({
          id: galleryImage.id,
          url: galleryImage.url,
          alt: galleryImage.alt,
          category: galleryImage.category,
        })
        .from(galleryImage)
        .orderBy(asc(galleryImage.order))
    ),
  ]);

  return {
    props: {
      hero: parseCms(records[GALLERY_SECTION_SLUGS.hero], DEFAULT_GALLERY_HERO),
      images,
    },
    revalidate: 60,
  };
};

export default function Gallery(props: GalleryPageProps) {
  return (
    <>
      <Head>
        <title>Gallery — Reverse Gen</title>
        <meta name="description" content="Browse our portfolio of cuts, color, and transformations." />
      </Head>
      <GalleryPage {...props} />
    </>
  );
}
