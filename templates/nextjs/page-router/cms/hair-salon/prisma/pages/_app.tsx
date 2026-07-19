import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { fontSans, fontDisplay } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function App({ Component, pageProps, router }: AppProps) {
  const isAdmin = router.pathname.startsWith("/admin");

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${fontSans.variable} ${fontDisplay.variable} font-sans`}>
        {isAdmin ? (
          <div className="flex h-screen bg-background">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-5xl px-6 py-8">
                <Component {...pageProps} />
              </div>
            </main>
          </div>
        ) : (
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        )}
      </div>
    </SessionProvider>
  );
}
