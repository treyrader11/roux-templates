import type { GetStaticProps } from "next";
import Head from "next/head";
import { StylistsPage, type StylistsPageProps } from "@/components/stylists/StylistsPage";
import { eq, asc } from "drizzle-orm";
import { getContentBySlugs, safeList } from "@/lib/cms";
import { parseCms } from "@/lib/utils";
import { db, dbProps } from "@/lib/db";
import { stylist } from "@/db/schema";
import { DEFAULT_STYLISTS_HERO, STYLISTS_SECTION_SLUGS } from "@/lib/stylists-defaults";

export const getStaticProps: GetStaticProps<StylistsPageProps & { dbConnected: boolean }> = async () => {
  const [records, stylists] = await Promise.all([
    getContentBySlugs([STYLISTS_SECTION_SLUGS.hero]),
    safeList(() =>
      db
        .select({
          id: stylist.id,
          name: stylist.name,
          role: stylist.role,
          bio: stylist.bio,
          imageUrl: stylist.imageUrl,
          instagram: stylist.instagram,
        })
        .from(stylist)
        .where(eq(stylist.active, true))
        .orderBy(asc(stylist.order))
    ),
  ]);

  return {
    props: {
      ...dbProps,
      hero: parseCms(records[STYLISTS_SECTION_SLUGS.hero], DEFAULT_STYLISTS_HERO),
      stylists,
    },
    revalidate: 60,
  };
};

export default function Stylists(props: StylistsPageProps) {
  return (
    <>
      <Head>
        <title>Stylists — Reverse Gen</title>
        <meta name="description" content="Meet the senior stylists and colorists at Reverse Gen." />
      </Head>
      <StylistsPage {...props} />
    </>
  );
}
