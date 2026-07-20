import type { GetStaticProps } from "next";
import Head from "next/head";
import { ServicesPage, type ServicesPageProps } from "@/components/services/ServicesPage";
import { eq, asc } from "drizzle-orm";
import { getContentBySlugs, safeList } from "@/lib/cms";
import { parseCms } from "@/lib/utils";
import { db } from "@/lib/db";
import { service } from "@/db/schema";
import { DEFAULT_SERVICES_HERO, SERVICES_SECTION_SLUGS } from "@/lib/services-defaults";

export const getStaticProps: GetStaticProps<ServicesPageProps> = async () => {
  const [records, services] = await Promise.all([
    getContentBySlugs([SERVICES_SECTION_SLUGS.hero]),
    safeList(() =>
      db
        .select({
          id: service.id,
          name: service.name,
          description: service.description,
          duration: service.duration,
          price: service.price,
          category: service.category,
        })
        .from(service)
        .where(eq(service.active, true))
        .orderBy(asc(service.order))
    ),
  ]);

  return {
    props: {
      hero: parseCms(records[SERVICES_SECTION_SLUGS.hero], DEFAULT_SERVICES_HERO),
      services,
    },
    revalidate: 60,
  };
};

export default function Services(props: ServicesPageProps) {
  return (
    <>
      <Head>
        <title>Services — Reverse Gen</title>
        <meta name="description" content="Explore our full menu of cut, color, and treatment services." />
      </Head>
      <ServicesPage {...props} />
    </>
  );
}
