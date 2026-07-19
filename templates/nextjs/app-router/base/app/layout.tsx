import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Roux UI App",
  description: "Built with Roux UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
