import type { GetStaticProps } from "next";
import Head from "next/head";
import { ContactPage, type ContactPageProps } from "@/components/contact/ContactPage";
import { getContentBySlugs } from "@/lib/cms";
import { parseCms } from "@/lib/utils";
import {
  DEFAULT_CONTACT_HERO,
  DEFAULT_CONTACT_INFO,
  CONTACT_SECTION_SLUGS,
} from "@/lib/contact-defaults";

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  const records = await getContentBySlugs([
    CONTACT_SECTION_SLUGS.hero,
    CONTACT_SECTION_SLUGS.info,
  ]);

  return {
    props: {
      hero: parseCms(records[CONTACT_SECTION_SLUGS.hero], DEFAULT_CONTACT_HERO),
      info: parseCms(records[CONTACT_SECTION_SLUGS.info], DEFAULT_CONTACT_INFO),
    },
    revalidate: 60,
  };
};

export default function Contact(props: ContactPageProps) {
  return (
    <>
      <Head>
        <title>Contact — Reverse Gen</title>
        <meta name="description" content="Get in touch with Reverse Gen — address, hours, and contact form." />
      </Head>
      <ContactPage {...props} />
    </>
  );
}
