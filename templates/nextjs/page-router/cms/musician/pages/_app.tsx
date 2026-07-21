import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Playfair_Display, Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdminSidebar from "@/components/layout/AdminSidebar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const AUTH_ROUTES = ["/sign-in", "/sign-up", "/error"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");
  const isAuth = AUTH_ROUTES.includes(router.pathname);

  return (
    <SessionProvider session={pageProps.session}>
      <div className={`${playfair.variable} ${inter.variable} font-body`}>
        {isAuth ? (
          <Component {...pageProps} />
        ) : isAdmin ? (
          <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <main className="ml-64 flex-1 p-8">
              <Component {...pageProps} />
            </main>
          </div>
        ) : (
          <>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </>
        )}
      </div>
    </SessionProvider>
  );
}
