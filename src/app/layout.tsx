import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aruvi-bananachips.example"),
  title: {
    default: "ARUVI Banana Chips | Tamil Nadu's Favourite Crispy Banana Chips",
    template: "%s | ARUVI Banana Chips",
  },
  description:
    "Premium Tamil Nadu banana chips made with fresh ingredients, traditional taste, modern packaging, and distributor supply across Tamil Nadu.",
  keywords: [
    "ARUVI Banana Chips",
    "Tamil Nadu banana chips",
    "banana chips distributor",
    "premium snacks",
    "crispy banana chips",
  ],
  openGraph: {
    title: "ARUVI Banana Chips",
    description: "Fresh. Crunchy. Irresistible. Premium banana chips from Tamil Nadu.",
    images: ["/images/aruvi-pack.svg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4C430",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
