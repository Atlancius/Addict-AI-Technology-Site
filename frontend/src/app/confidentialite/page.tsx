import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles d'Addict AI Technology.",
};

export default function Confidentialite() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-heading text-4xl font-bold text-text-primary mb-8">
            Politique de confidentialité
          </h1>

          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Responsable du traitement
              </h2>
              <p>
                Addict AI Technology
                <br />
                Immeuble les Mimosas, 20213 Folelli, Corse
                <br />
                Email : contact@addictai.tech
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Données collectées
              </h2>
              <p>
                Nous collectons uniquement les données que vous nous fournissez
                volontairement via nos formulaires de contact et de demande de
                devis :
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Informations relatives à votre demande</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Finalité du traitement
              </h2>
              <p>
                Vos données sont utilisées exclusivement pour répondre à vos
                demandes, vous recontacter et assurer le suivi de votre projet
                ou réparation.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Durée de conservation
              </h2>
              <p>
                Les données sont conservées pendant une durée maximale de 3 ans
                à compter du dernier contact, sauf obligation légale contraire.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Vos droits
              </h2>
              <p>
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
                rectification, de suppression et de portabilité de vos données.
                Pour exercer ces droits, contactez-nous à contact@addictai.tech.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Cookies
              </h2>
              <p>
                Ce site n&apos;utilise pas de cookies de tracking tiers. Seuls
                des cookies techniques essentiels au fonctionnement du site
                peuvent être utilisés.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
