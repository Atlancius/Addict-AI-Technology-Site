import type { Metadata } from "next";
import { Chakra_Petch, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addictai.tech";

const chakraPetch = Chakra_Petch({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Addict — Tech, Réparation & Innovation | Folelli, Corse",
    template: "%s | Addict",
  },
  description:
    "Réparation mobile & PC, boutique tech, café manga. Accompagnement digital, IA et automatisation pour les pros. Folelli, Corse.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Addict — Tech, Réparation & Innovation | Folelli, Corse",
    description:
      "Réparation mobile & PC, boutique tech, café manga. Accompagnement digital, IA et automatisation pour les pros. Folelli, Corse.",
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Addict AI Technology",
  },
  twitter: {
    card: "summary",
    title: "Addict — Tech, Réparation & Innovation | Folelli, Corse",
    description:
      "Réparation mobile & PC, boutique tech, café manga. Accompagnement digital, IA et automatisation pour les pros. Folelli, Corse.",
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
      <body
        className={`${chakraPetch.variable} ${plusJakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
