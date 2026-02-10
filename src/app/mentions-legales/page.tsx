import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Addict AI Technology.",
};

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-heading text-4xl font-bold text-text-primary mb-8">
            Mentions légales
          </h1>

          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Éditeur du site
              </h2>
              <p>
                Addict AI Technology
                <br />
                Immeuble les Mimosas
                <br />
                20213 Folelli, Corse
                <br />
                Email : contact@addictai.tech
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Hébergement
              </h2>
              <p>
                Ce site est hébergé par Hostinger.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, logos,
                design) est la propriété d&apos;Addict AI Technology, sauf
                mention contraire. Toute reproduction est interdite sans
                autorisation préalable.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Données personnelles
              </h2>
              <p>
                Consultez notre{" "}
                <a
                  href="/confidentialite"
                  className="text-flame hover:underline"
                >
                  politique de confidentialité
                </a>{" "}
                pour en savoir plus sur le traitement de vos données.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
