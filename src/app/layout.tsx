import type { Metadata } from "next";
import localFont from "next/font/local";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import ScrollDepthTracker from "@/components/analytics/ScrollDepthTracker";
import Preloader from "@/components/animations/Preloader";
import ScrollProgressLine from "@/components/animations/ScrollProgressLine";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addictai.tech";

const rajdhani = localFont({
  variable: "--font-heading-raw",
  display: "swap",
  src: [
    { path: "../../public/fonts/rajdhani-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/rajdhani-latin-700.woff2", weight: "700", style: "normal" },
  ],
});

const inter = localFont({
  variable: "--font-body-raw",
  display: "swap",
  src: [
    { path: "../../public/fonts/inter-latin-variable.woff2", weight: "400 600", style: "normal" },
  ],
});

const chakraPetch = localFont({
  variable: "--font-accent-raw",
  display: "swap",
  src: [
    { path: "../../public/fonts/chakra-petch-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/chakra-petch-latin-600.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Addict AI Technology - Services Pro, Formations, Boutique",
    template: "%s | Addict AI Technology",
  },
  description:
    "Hub premium Addict AI Technology: services pro (marketing, IA, CRM, transition), formations, réalisations et boutique particuliers.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Addict AI Technology - Services Pro, Formations, Boutique",
    description:
      "Hub premium Addict AI Technology: services pro (marketing, IA, CRM, transition), formations, réalisations et boutique particuliers.",
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Addict AI Technology",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Addict AI Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Addict AI Technology",
    description:
      "Hub premium Addict AI Technology: services pro, formations, réalisations et boutique particuliers.",
    images: ["/twitter-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${rajdhani.variable} ${inter.variable} ${chakraPetch.variable} antialiased min-h-screen`}
      >
        <Preloader />
        <ScrollProgressLine />
        <AnalyticsScripts />
        <ScrollDepthTracker />
        {children}
      </body>
    </html>
  );
}
