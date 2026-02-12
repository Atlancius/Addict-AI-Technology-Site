import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { canonicalFor } from "@/lib/seo";

const SWATCH_GROUPS = [
  {
    title: "Neutrals",
    items: [
      { token: "bg-deep", label: "bg-deep" },
      { token: "bg-main", label: "bg-main" },
      { token: "bg-section", label: "bg-section" },
      { token: "surface-1-token", label: "surface-1" },
      { token: "surface-2-token", label: "surface-2" },
      { token: "text-primary", label: "text-primary" },
      { token: "text-secondary", label: "text-secondary" },
      { token: "text-muted", label: "text-muted" },
      { token: "border-soft", label: "border-soft" },
      { token: "border-strong", label: "border-strong" },
    ],
  },
  {
    title: "Ember",
    items: [
      { token: "ember-900", label: "ember-900" },
      { token: "ember-700", label: "ember-700" },
      { token: "ember-500", label: "ember-500" },
      { token: "ember-400", label: "ember-400" },
      { token: "ember-300", label: "ember-300" },
    ],
  },
  {
    title: "Copper",
    items: [
      { token: "copper-700", label: "copper-700" },
      { token: "copper-500", label: "copper-500" },
      { token: "copper-400", label: "copper-400" },
    ],
  },
  {
    title: "Tints",
    items: [
      { token: "tint-ember-8", label: "tint-ember-8" },
      { token: "tint-ember-12", label: "tint-ember-12" },
      { token: "tint-copper-8", label: "tint-copper-8" },
      { token: "tint-copper-12", label: "tint-copper-12" },
    ],
  },
];

const SPACING_SCALE = [
  "0.25rem",
  "0.5rem",
  "0.75rem",
  "1rem",
  "1.5rem",
  "2rem",
  "3rem",
  "4rem",
  "6rem",
  "8rem",
];

const HERO_VARIANTS = [
  { name: "signature", title: "Hero Signature" },
  { name: "clarity", title: "Hero Clarity" },
  { name: "proof", title: "Hero Proof" },
  { name: "human", title: "Hero Human" },
  { name: "local", title: "Hero Local" },
  { name: "minimal", title: "Hero Minimal" },
];

export const metadata: Metadata = {
  title: "Style Guide",
  description:
    "Style guide Client-First: tokens, typo, spacing, components, FAQ, tabs, heroes et CTA.",
  alternates: {
    canonical: canonicalFor("/style-guide"),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function StyleGuidePage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <section className="section_style-guide is-main">
          <div className="padding-global">
            <div className="container-large stack is-lg">
              <p className="text-style-label text-copper-400">Style Guide</p>
              <h1 className="text-style-h1 text-text-primary">Client-First + Unites Clean</h1>
              <p className="text-style-body text-text-secondary max-width-medium">
                Base de reference pour produire les pages en coherence totale:
                structure, typographie, composants et etats.
              </p>
            </div>
          </div>
        </section>

        <section className="section_style-guide is-alt">
          <div className="padding-global">
            <div className="container-large stack is-lg">
              <h2 className="text-style-h2 text-text-primary">1. Color Swatches</h2>
              <div className="stack is-lg">
                {SWATCH_GROUPS.map((group) => (
                  <div key={group.title} className="sg_block stack">
                    <h3 className="text-style-h4 text-text-primary">{group.title}</h3>
                    <div className="sg_grid-swatches">
                      {group.items.map((item) => (
                        <div key={item.token} className="stack is-sm">
                          <div
                            className="sg_swatch"
                            style={{ background: `var(--${item.token})` }}
                          />
                          <p className="sg_label">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section_style-guide is-main">
          <div className="padding-global">
            <div className="container-large stack is-lg">
              <h2 className="text-style-h2 text-text-primary">2. Typography Scale</h2>
              <div className="grid-2col">
                <div className="sg_type-row">
                  <p className="text-style-h1 text-text-primary">H1 4rem / 1.05</p>
                  <p className="sg_label">Rajdhani 700</p>
                </div>
                <div className="sg_type-row">
                  <p className="text-style-h2 text-text-primary">H2 2.75rem / 1.1</p>
                  <p className="sg_label">Rajdhani 700</p>
                </div>
                <div className="sg_type-row">
                  <p className="text-style-h3 text-text-primary">H3 2rem / 1.15</p>
                  <p className="sg_label">Rajdhani 700</p>
                </div>
                <div className="sg_type-row">
                  <p className="text-style-h4 text-text-primary">H4 1.5rem / 1.2</p>
                  <p className="sg_label">Rajdhani 700</p>
                </div>
                <div className="sg_type-row">
                  <p className="text-style-body text-text-secondary">
                    Body 1.125rem / 1.6. Texte premium lisible sur desktop et mobile.
                  </p>
                  <p className="sg_label">Inter 400-500</p>
                </div>
                <div className="sg_type-row">
                  <p className="text-style-small text-text-muted">Small 0.875rem / 1.45</p>
                  <p className="text-style-label text-copper-400">
                    Label 0.8125rem / 1.3 - Chakrapetch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section_style-guide is-alt">
          <div className="padding-global">
            <div className="container-large stack is-lg">
              <h2 className="text-style-h2 text-text-primary">3. Spacing Scale (rem)</h2>
              <div className="sg_block stack">
                {SPACING_SCALE.map((size) => (
                  <div key={size} className="sg_spacing-row">
                    <p className="sg_label" style={{ minWidth: "5rem" }}>
                      {size}
                    </p>
                    <div className="sg_spacing-bar" style={{ width: size }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section_style-guide is-main">
          <div className="padding-global">
            <div className="container-large stack is-lg">
              <h2 className="text-style-h2 text-text-primary">4. Buttons</h2>
              <div className="sg_block stack">
                <div className="flex flex-wrap gap-4">
                  <button className="button is-primary" type="button">
                    Primary
                  </button>
                  <button className="button is-secondary" type="button">
                    Secondary
                  </button>
                  <button className="button is-ghost" type="button">
                    Ghost
                  </button>
                </div>
                <p className="form_help">
                  Hover, lift et focus-visible actifs sur chaque variante.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section_style-guide is-alt">
          <div className="padding-global">
            <div className="container-large stack is-lg">
              <h2 className="text-style-h2 text-text-primary">5. Cards</h2>
              <div className="grid-3col">
                <article className="card card_service is-hoverable">
                  <div className="card_service-icon">S</div>
                  <h3 className="card_service-title text-text-primary">Service Card</h3>
                  <p className="card_service-text">
                    Base de service premium avec elevation subtile et lecture claire.
                  </p>
                </article>

                <article className="card card_pack is-hoverable">
                  <div className="flex items-center gap-2">
                    <span className="badge is-copper">Signature</span>
                    <span className="badge is-ember">Essentiel</span>
                  </div>
                  <h3 className="card_service-title text-text-primary">Pack Card</h3>
                  <p className="card_service-text">
                    Structure de pack avec badge, titre et bloc descriptif.
                  </p>
                </article>

                <article className="card card_portfolio is-hoverable">
                  <div className="card_portfolio-thumb">
                    <div className="card_portfolio-overlay" />
                  </div>
                  <h3 className="card_service-title text-text-primary">Portfolio Card</h3>
                  <p className="card_service-text">
                    Thumbnail ratio fixe et overlay premium au survol.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section_style-guide is-main">
          <div className="padding-global">
            <div className="container-large stack is-lg">
              <h2 className="text-style-h2 text-text-primary">6. Forms</h2>
              <form className="form_component stack is-lg">
                <div className="grid-2col">
                  <div className="form_field">
                    <label htmlFor="sg-name" className="form_label">
                      Nom
                    </label>
                    <input id="sg-name" className="form_input" placeholder="Votre nom" />
                  </div>
                  <div className="form_field">
                    <label htmlFor="sg-email" className="form_label">
                      Email
                    </label>
                    <input id="sg-email" className="form_input" placeholder="nom@entreprise.fr" />
                  </div>
                </div>
                <div className="form_field">
                  <label htmlFor="sg-message" className="form_label">
                    Message
                  </label>
                  <textarea id="sg-message" className="form_input" placeholder="Contexte, besoin, objectif" />
                </div>
                <p className="form_help">Aide: tous les champs utilisent une echelle rem coherente.</p>
                <p className="form_success">Succes: message envoye.</p>
                <p className="form_error">Erreur: un champ requis est manquant.</p>
              </form>
            </div>
          </div>
        </section>

        <section className="section_style-guide is-alt">
          <div className="padding-global">
            <div className="container-large stack is-lg">
              <h2 className="text-style-h2 text-text-primary">7. FAQ + Tabs</h2>
              <div className="grid-2col">
                <div className="tabs_component sg_block">
                  <div className="tabs_menu">
                    <button type="button" className="tabs_link is-active">
                      Pro
                    </button>
                    <button type="button" className="tabs_link">
                      Particulier
                    </button>
                    <button type="button" className="tabs_link">
                      Mixte
                    </button>
                  </div>
                  <p className="card_service-text">
                    Le switch de formations reprend le style ghost + active tint/border.
                  </p>
                </div>

                <div className="faq_component">
                  <div className="faq_item">
                    <button type="button" className="faq_question">
                      <span>Quel format de session recommandez-vous ?</span>
                      <span>+</span>
                    </button>
                    <p className="faq_answer">
                      Demarrer en atelier de cadrage puis passer en suivi court orienté execution.
                    </p>
                  </div>
                  <div className="faq_item">
                    <button type="button" className="faq_question">
                      <span>Peut-on mixer pro et particulier ?</span>
                      <span>+</span>
                    </button>
                    <p className="faq_answer">
                      Oui, avec un routing clair des objectifs et des CTA par contexte.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section_style-guide is-main">
          <div className="padding-global">
            <div className="container-large stack is-lg">
              <h2 className="text-style-h2 text-text-primary">8. Hero Variants + CTA</h2>
              <div className="grid-2col">
                {HERO_VARIANTS.map((hero) => (
                  <article key={hero.name} className={`hero_component is-${hero.name}`}>
                    <div className="hero_background" />
                    <div className="padding-global h-full flex items-center">
                      <div className="grid-2col w-full items-center">
                        <div className="hero_content">
                          <p className="text-style-label text-copper-400">
                            section_hero-{hero.name}
                          </p>
                          <h3 className="text-style-h4 text-text-primary">{hero.title}</h3>
                          <p className="card_service-text">
                            Variante de hero avec meme structure et tonalite adaptee au contexte.
                          </p>
                          <div>
                            <button className="button is-primary" type="button">
                              CTA principal
                            </button>
                          </div>
                        </div>
                        <div className="hero_visual" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="cta_component stack is-lg">
                <p className="text-style-label text-copper-400">CTA Signature</p>
                <h3 className="text-style-h3 text-text-primary">
                  Bloc final premium pour conclure chaque page.
                </h3>
                <p className="text-style-body text-text-secondary max-width-small">
                  Fond sombre, overlay subtil, radius 1.5rem et double CTA lisible.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="button is-primary" type="button">
                    Demander un audit
                  </button>
                  <button className="button is-secondary" type="button">
                    Contacter l&apos;equipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
