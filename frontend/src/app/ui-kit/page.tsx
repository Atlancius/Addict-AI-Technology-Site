import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import Card, { CardTitle, CardDescription } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Accordion from "@/components/ui/Accordion";
import { Input, Textarea } from "@/components/ui/Input";
import RepairsTable from "@/components/sections/RepairsTable";
import { fallbackRepairs, fallbackServices, fallbackCaseStudies } from "@/lib/fallback-data";

const FAQ_SAMPLE = [
  { question: "Question exemple", answer: "Réponse courte pour démonstration." },
  { question: "Deuxieme question", answer: "Contenu simple pour l'accordeon." },
];

export default function UiKitPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <section>
            <h1 className="font-heading text-4xl font-bold text-text-primary mb-6">
              UI Kit
            </h1>
            <p className="text-text-muted">Composants de base et états principaux.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl text-text-primary">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="flame">Primary Flame</Button>
              <Button variant="metal">Primary Metal</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl text-text-primary">Badges</h2>
            <div className="flex flex-wrap gap-3">
              <Badge variant="local">Local</Badge>
              <Badge variant="express">Express</Badge>
              <Badge variant="quality">Qualite</Badge>
              <Badge variant="default">Default</Badge>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl text-text-primary">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="service">
                <CardTitle>Service Card</CardTitle>
                <CardDescription>Texte descriptif court.</CardDescription>
              </Card>
              <Card variant="bento">
                <CardTitle>Bento Card</CardTitle>
                <CardDescription>Carte avec hover plus visible.</CardDescription>
              </Card>
              <Card variant="pricing">
                <CardTitle>Pricing Card</CardTitle>
                <CardDescription>Bloc tarifaire ou offre.</CardDescription>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="caseStudy">
                <CardTitle>Case Study</CardTitle>
                <CardDescription>
                  Réduction de 12h/semaine grâce à l&apos;automatisation des reportings.
                </CardDescription>
              </Card>
              <Card variant="repair">
                <CardTitle>Repair Card</CardTitle>
                <CardDescription>
                  Écran iPhone 13 — à partir de 149€ • 60-90 min • Garantie 6 mois.
                </CardDescription>
              </Card>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl text-text-primary">Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Champ" placeholder="Votre nom" tone="flame" />
              <Input label="Email" placeholder="email@exemple.fr" type="email" tone="metal" />
              <Textarea label="Message" placeholder="Votre message" tone="flame" />
              <Input label="Erreur" placeholder="Erreur" error="Message d'erreur" tone="metal" />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl text-text-primary">Accordion</h2>
            <Accordion items={FAQ_SAMPLE} />
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl text-text-primary">Table Tarifs</h2>
            <RepairsTable items={fallbackRepairs} />
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl text-text-primary">Data Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fallbackServices.map((service) => (
                <Card key={service.id} variant="service">
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.summary}</CardDescription>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fallbackCaseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} variant="caseStudy">
                  <CardTitle>{caseStudy.title}</CardTitle>
                  <CardDescription>{caseStudy.results}</CardDescription>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
