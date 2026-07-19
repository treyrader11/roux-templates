import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontDisplay } from "@/lib/fonts";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Hair Studio`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.tagline,
};

// Applies the stored theme before hydration to avoid a flash.
const themeScript = `(function(){try{var s=localStorage.getItem('lumiere-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontDisplay.variable} font-sans`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
