import Navbar from "@/components/ui/Navbar";
import HeroSplit from "@/components/sections/HeroSplit";
import Manifesto from "@/components/sections/Manifesto";
import TrustBar from "@/components/sections/TrustBar";
import BentoGrid from "@/components/sections/BentoGrid";
import LocationMap from "@/components/sections/LocationMap";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { buildLocalBusinessJsonLd } from "@/lib/jsonld";
import { getLocationWithFallback } from "@/lib/content";

export default async function Home() {
  const location = await getLocationWithFallback();
  const localBusiness = buildLocalBusinessJsonLd(location);

  return (
    <>
      <JsonLd data={localBusiness} />
      <Navbar />
      <main>
        <HeroSplit />
        <Manifesto />
        <TrustBar />
        <BentoGrid />
        <LocationMap location={location} />
      </main>
      <Footer />
    </>
  );
}
