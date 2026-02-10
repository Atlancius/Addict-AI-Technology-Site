import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addictai.tech";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
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
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Addict AI Technology",
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
        className={`${spaceGrotesk.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
