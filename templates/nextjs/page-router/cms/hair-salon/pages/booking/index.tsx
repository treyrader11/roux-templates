import type { GetStaticProps } from "next";
import Head from "next/head";
import { BookingPage, type BookingPageProps } from "@/components/booking/BookingPage";
import { eq, asc } from "drizzle-orm";
import { getContentBySlugs, safeList } from "@/lib/cms";
import { parseCms } from "@/lib/utils";
import { db, dbProps } from "@/lib/db";
import { stylist } from "@/db/schema";
import { DEFAULT_BOOKING_HERO, BOOKING_SECTION_SLUGS } from "@/lib/booking-defaults";

export const getStaticProps: GetStaticProps<BookingPageProps & { dbConnected: boolean }> = async () => {
  const [records, stylists] = await Promise.all([
    getContentBySlugs([BOOKING_SECTION_SLUGS.hero]),
    safeList(() =>
      db
        .select({ id: stylist.id, name: stylist.name })
        .from(stylist)
        .where(eq(stylist.active, true))
        .orderBy(asc(stylist.order))
    ),
  ]);

  return {
    props: {
      ...dbProps,
      hero: parseCms(records[BOOKING_SECTION_SLUGS.hero], DEFAULT_BOOKING_HERO),
      stylists,
    },
    revalidate: 60,
  };
};

export default function Booking(props: BookingPageProps) {
  return (
    <>
      <Head>
        <title>Book an Appointment — Reverse Gen</title>
        <meta name="description" content="Request an appointment at Reverse Gen hair studio." />
      </Head>
      <BookingPage {...props} />
    </>
  );
}
