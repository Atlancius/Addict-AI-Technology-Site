import type { Metadata } from "next";
import { Chakra_Petch, Inter, Rajdhani } from "next/font/google";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import ScrollDepthTracker from "@/components/analytics/ScrollDepthTracker";
import Preloader from "@/components/animations/Preloader";
import ScrollProgressLine from "@/components/animations/ScrollProgressLine";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addictai.tech";

const rajdhani = Rajdhani({
  variable: "--font-heading-raw",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body-raw",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  variable: "--font-accent-raw",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Addict Hub - Services Pro, Formations, Boutique",
    template: "%s | Addict Hub",
  },
  description:
    "Hub premium Addict: services pro (marketing, IA, CRM, transition), formations, réalisations et boutique particuliers.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Addict Hub - Services Pro, Formations, Boutique",
    description:
      "Hub premium Addict: services pro (marketing, IA, CRM, transition), formations, réalisations et boutique particuliers.",
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Addict Hub",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Addict Hub - Hub premium services et formations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Addict Hub - Services Pro, Formations, Boutique",
    description:
      "Hub premium Addict: services pro (marketing, IA, CRM, transition), formations, réalisations et boutique particuliers.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${rajdhani.variable} ${inter.variable} ${chakraPetch.variable} antialiased`}>
        <Preloader />
        <ScrollProgressLine />
        <AnalyticsScripts />
        <ScrollDepthTracker />
        {children}
      </body>
    </html>
  );
}
