import type { GetStaticProps } from "next";
import Head from "next/head";
import { PricingPage, type PricingPageProps } from "@/components/pricing/PricingPage";
import { eq, asc } from "drizzle-orm";
import { getContentBySlugs, safeList } from "@/lib/cms";
import { parseCms } from "@/lib/utils";
import { db, dbProps } from "@/lib/db";
import { pricingPackage } from "@/db/schema";
import { DEFAULT_PRICING_HERO, PRICING_SECTION_SLUGS } from "@/lib/pricing-defaults";

function parseFeatures(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export const getStaticProps: GetStaticProps<PricingPageProps & { dbConnected: boolean }> = async () => {
  const [records, rows] = await Promise.all([
    getContentBySlugs([PRICING_SECTION_SLUGS.hero]),
    safeList(() =>
      db
        .select()
        .from(pricingPackage)
        .where(eq(pricingPackage.active, true))
        .orderBy(asc(pricingPackage.order))
    ),
  ]);

  const packages = rows.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    description: p.description,
    features: parseFeatures(p.features),
    featured: p.featured,
  }));

  return {
    props: {
      ...dbProps,
      hero: parseCms(records[PRICING_SECTION_SLUGS.hero], DEFAULT_PRICING_HERO),
      packages,
    },
    revalidate: 60,
  };
};

export default function Pricing(props: PricingPageProps) {
  return (
    <>
      <Head>
        <title>Pricing — Reverse Gen</title>
        <meta name="description" content="Transparent pricing for cut, color, and treatment packages." />
      </Head>
      <PricingPage {...props} />
    </>
  );
}
