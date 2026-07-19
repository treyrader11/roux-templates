import { Inter, Playfair_Display } from "next/font/google";

// Matches the ReverseGen editorial pairing: Inter body + Playfair Display headings.
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
