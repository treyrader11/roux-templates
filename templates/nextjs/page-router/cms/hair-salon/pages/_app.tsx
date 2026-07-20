import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextRouter } from "next/router";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { fontDisplay, fontSans } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TopBanner } from "@/components/ui/TopBanner";

function AppContent({
  Component,
  pageProps,
  router,
}: {
  Component: AppProps["Component"];
  pageProps: Record<string, unknown>;
  router: NextRouter;
}) {
  const isAdminRoute = router.pathname.startsWith("/admin");

  // Smooth scrolling on public routes only; destroyed on cleanup.
  useEffect(() => {
    if (isAdminRoute) return;
    let instance: { destroy?: () => void } | undefined;
    (async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        instance = new LocomotiveScroll();
      } catch {
        // Locomotive is progressive enhancement — ignore init failures.
      }
    })();
    return () => instance?.destroy?.();
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return <Component key={router.route} {...pageProps} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdminRoute && <TopBanner />}
      <Header />
      <main id="main-content" className="flex-1">
        <Component key={router.route} {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default function App(props: AppProps) {
  return (
    <SessionProvider session={props.pageProps.session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${fontSans.variable} ${fontDisplay.variable} font-sans`}>
        <AppContent {...props} />
      </div>
    </SessionProvider>
  );
}
