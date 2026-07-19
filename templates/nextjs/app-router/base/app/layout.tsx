import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "roux-template",
  description: "Created with rouxui create",
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
