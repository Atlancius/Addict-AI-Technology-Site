type StrapiInstance = {
  db: {
    query: (uid: string) => {
      count: () => Promise<number>;
      create: (params: { data: Record<string, unknown> }) => Promise<unknown>;
    };
  };
};

const now = () => new Date();

const locationSeed = [
  {
    name: "Addict AI Technology",
    address_line1: "Immeuble les Mimosas",
    postal_code: "20213",
    city: "Folelli",
    region: "Corse",
    country: "FR",
    phone: "+33 4 95 31 12 90",
    email: "contact@addictai.tech",
    geo_lat: 42.4474697,
    geo_lng: 9.5067658,
    google_maps_url: "https://www.google.com/maps?q=42.4474697,9.5067658",
    opening_hours: {
      mon: [{ open: "09:00", close: "18:00" }],
      tue: [{ open: "09:00", close: "18:00" }],
      wed: [{ open: "09:00", close: "18:00" }],
      thu: [{ open: "09:00", close: "18:00" }],
      fri: [{ open: "09:00", close: "18:00" }],
      sat: [{ open: "10:00", close: "16:00" }],
    },
  },
];

const serviceSeed = [
  {
    title: "Audit & Roadmap 90 jours",
    slug: "audit-roadmap-90-jours",
    category: "Audit",
    summary:
      "Cartographie des process, scoring ROI et plan d'action priorisé pour exécuter vite.",
    description:
      "Nous analysons vos flux critiques, estimons le ROI et livrons une roadmap priorisée. Vous repartez avec un plan clair et actionnable.",
    deliverables: [
      "Cartographie des process",
      "Score ROI par action",
      "Roadmap priorisée 90 jours",
      "Plan de déploiement",
    ],
    duration_estimate: "1-2 semaines",
    starting_price_text: "À partir de 1 200€",
    cta_label: "Demander un audit",
    cta_link: "/pro#contact-pro",
    sort_order: 1,
    seo_title: "Audit & Roadmap 90 jours",
    seo_description:
      "Audit complet, scoring ROI et roadmap 90 jours pour prioriser vos automatisations.",
  },
  {
    title: "Automatisation IA & Ops",
    slug: "automatisation-ia-ops",
    category: "Automation",
    summary:
      "Workflows Make/n8n, intégrations API et agents IA pour réduire les tâches manuelles.",
    description:
      "Nous concevons des automatisations robustes, testées et documentées. Objectif : fiabilité, gain de temps et visibilité.",
    deliverables: [
      "Workflows automatisés",
      "Intégrations API",
      "Monitoring & alerting",
      "Documentation & formation",
    ],
    duration_estimate: "2-6 semaines",
    starting_price_text: "À partir de 2 500€",
    cta_label: "Automatiser mes process",
    cta_link: "/pro#contact-pro",
    sort_order: 2,
    seo_title: "Automatisation IA & Ops",
    seo_description:
      "Automatisez vos process avec des workflows fiables, intégrations API et monitoring.",
  },
  {
    title: "Formation No-code & IA",
    slug: "formation-no-code-ia",
    category: "Training",
    summary:
      "Parcours pratiques pour rendre vos équipes autonomes sur les outils no-code et IA.",
    description:
      "Sessions orientées résultats : cas d'usage, exercices, supports et adoption rapide.",
    deliverables: [
      "Programme personnalisé",
      "Supports & templates",
      "Ateliers pratiques",
      "Plan d'adoption",
    ],
    duration_estimate: "1-3 jours",
    starting_price_text: "Sur devis",
    cta_label: "Voir les formations",
    cta_link: "/formations",
    sort_order: 3,
    seo_title: "Formation No-code & IA",
    seo_description:
      "Formation opérationnelle no-code et IA pour des équipes autonomes et efficaces.",
  },
];

const caseStudySeed = [
  {
    title: "Reporting hebdo automatisé",
    slug: "reporting-hebdo-automatise",
    client_type: "PME retail",
    problem:
      "Reporting manuel sur 4 outils, données incohérentes et perte de temps hebdomadaire.",
    solution:
      "Automatisation via Make + Airtable, consolidation des KPIs et alertes Slack.",
    results: "12h/semaine économisées, erreurs divisées par 4.",
    tools: ["Make", "Airtable", "Slack", "Google Sheets"],
    sort_order: 1,
    seo_title: "Reporting automatisé pour PME retail",
    seo_description:
      "Automatisation des reportings hebdo : 12h économisées et KPIs fiables.",
  },
  {
    title: "CRM no-code pour agence",
    slug: "crm-no-code-agence",
    client_type: "Agence digitale",
    problem:
      "Suivi commercial dispersé et absence de pipeline fiable.",
    solution:
      "CRM sur mesure + automatisations email + dashboard pipeline.",
    results: "Cycle de vente accéléré de 22% et visibilité temps réel.",
    tools: ["Notion", "Zapier", "Gmail"],
    sort_order: 2,
    seo_title: "CRM no-code pour agence digitale",
    seo_description:
      "CRM sur mesure et automatisations pour accélérer le cycle de vente.",
  },
  {
    title: "Support IA pour équipe terrain",
    slug: "support-ia-equipe-terrain",
    client_type: "Réseau multi-sites",
    problem:
      "FAQ interne éclatée, temps de réponse trop long et dépendance aux experts.",
    solution:
      "Base de connaissances + assistant IA + workflows de support.",
    results: "Temps de réponse réduit de 45% et adoption rapide.",
    tools: ["OpenAI", "Notion", "Make"],
    sort_order: 3,
    seo_title: "Assistant IA support terrain",
    seo_description:
      "Assistant IA + base de connaissances pour réduire le temps de réponse.",
  },
];

const repairSeed = [
  { device_brand: "Apple", device_model: "iPhone 13", repair_type: "Écran", price_from: 149, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 1 },
  { device_brand: "Apple", device_model: "iPhone 13", repair_type: "Batterie", price_from: 79, duration_text: "45-60 min", warranty_text: "6 mois", sort_order: 2 },
  { device_brand: "Apple", device_model: "iPhone 12", repair_type: "Écran", price_from: 139, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 3 },
  { device_brand: "Apple", device_model: "iPhone 12", repair_type: "Connecteur", price_from: 69, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 4 },
  { device_brand: "Samsung", device_model: "Galaxy S22", repair_type: "Écran", price_from: 169, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 5 },
  { device_brand: "Samsung", device_model: "Galaxy S22", repair_type: "Batterie", price_from: 89, duration_text: "45-60 min", warranty_text: "6 mois", sort_order: 6 },
  { device_brand: "Samsung", device_model: "Galaxy A52", repair_type: "Écran", price_from: 119, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 7 },
  { device_brand: "Samsung", device_model: "Galaxy A52", repair_type: "Batterie", price_from: 69, duration_text: "45-60 min", warranty_text: "6 mois", sort_order: 8 },
  { device_brand: "Xiaomi", device_model: "Redmi Note 12", repair_type: "Écran", price_from: 89, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 9 },
  { device_brand: "Xiaomi", device_model: "Redmi Note 12", repair_type: "Batterie", price_from: 59, duration_text: "45-60 min", warranty_text: "6 mois", sort_order: 10 },
  { device_brand: "Huawei", device_model: "P30", repair_type: "Écran", price_from: 109, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 11 },
  { device_brand: "Huawei", device_model: "P30", repair_type: "Connecteur", price_from: 59, duration_text: "45-60 min", warranty_text: "6 mois", sort_order: 12 },
  { device_brand: "Google", device_model: "Pixel 7", repair_type: "Écran", price_from: 179, duration_text: "60-120 min", warranty_text: "6 mois", sort_order: 13 },
  { device_brand: "Google", device_model: "Pixel 7", repair_type: "Batterie", price_from: 89, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 14 },
  { device_brand: "OnePlus", device_model: "9 Pro", repair_type: "Écran", price_from: 159, duration_text: "60-120 min", warranty_text: "6 mois", sort_order: 15 },
  { device_brand: "OnePlus", device_model: "9 Pro", repair_type: "Batterie", price_from: 79, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 16 },
  { device_brand: "Apple", device_model: "iPhone 11", repair_type: "Écran", price_from: 119, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 17 },
  { device_brand: "Apple", device_model: "iPhone 11", repair_type: "Batterie", price_from: 69, duration_text: "45-60 min", warranty_text: "6 mois", sort_order: 18 },
  { device_brand: "Samsung", device_model: "Galaxy S21", repair_type: "Écran", price_from: 159, duration_text: "60-90 min", warranty_text: "6 mois", sort_order: 19 },
  { device_brand: "Samsung", device_model: "Galaxy S21", repair_type: "Batterie", price_from: 79, duration_text: "45-60 min", warranty_text: "6 mois", sort_order: 20 },
];

const faqSeed = [
  {
    scope: "b2c",
    question: "Combien coûte un changement d'écran iPhone ?",
    answer:
      "Les tarifs varient selon le modèle. Comptez à partir de 119€ avec garantie 6 mois.",
    sort_order: 1,
  },
  {
    scope: "b2c",
    question: "Quel est le délai moyen de réparation ?",
    answer:
      "La majorité des réparations sont réalisées en 45 à 90 minutes selon la pièce.",
    sort_order: 2,
  },
  {
    scope: "b2c",
    question: "Proposez-vous une garantie ?",
    answer: "Oui, pièces et main d'œuvre sont garanties 6 mois.",
    sort_order: 3,
  },
  {
    scope: "b2c",
    question: "Faut-il prendre rendez-vous ?",
    answer:
      "Pas obligatoire, mais un RDV garantit une prise en charge immédiate.",
    sort_order: 4,
  },
  {
    scope: "b2c",
    question: "Mes données sont-elles en sécurité ?",
    answer:
      "Nous ne touchons pas à vos données. Nous recommandons une sauvegarde préventive.",
    sort_order: 5,
  },
  {
    scope: "b2c",
    question: "Quelles marques réparez-vous ?",
    answer:
      "Apple, Samsung, Huawei, Xiaomi, OnePlus, Google Pixel et la plupart des marques courantes.",
    sort_order: 6,
  },
  {
    scope: "b2b",
    question: "Combien coûte un audit digital ?",
    answer:
      "Un audit démarre à 1 200€ et inclut un scoring ROI + une roadmap 90 jours.",
    sort_order: 1,
  },
  {
    scope: "b2b",
    question: "Quels délais pour une automatisation ?",
    answer:
      "Un flux simple prend 1 à 2 semaines. Les projets complexes s'étalent sur 1 à 3 mois.",
    sort_order: 2,
  },
  {
    scope: "b2b",
    question: "Quels outils utilisez-vous ?",
    answer:
      "Make, n8n, Airtable, Notion, OpenAI et d'autres selon vos besoins.",
    sort_order: 3,
  },
  {
    scope: "b2b",
    question: "Proposez-vous un support ?",
    answer:
      "Oui, nous proposons des contrats de support et de monitoring pour garantir la stabilité.",
    sort_order: 4,
  },
  {
    scope: "b2b",
    question: "Est-ce compatible RGPD ?",
    answer:
      "Oui, nous configurons les flux avec des règles de conformité et pouvons signer un NDA.",
    sort_order: 5,
  },
  {
    scope: "b2b",
    question: "Travaillez-vous hors Corse ?",
    answer:
      "Oui, nous accompagnons des clients dans toute la France, principalement à distance.",
    sort_order: 6,
  },
];

const trainingSeed = [
  {
    title: "No-code & Automatisation",
    slug: "no-code-automatisation",
    summary:
      "Concevoir des workflows fiables et automatiser les tâches répétitives.",
    description:
      "Formation intensive orientée actions rapides, documentation et monitoring.",
    audience: "Dirigeants, équipes ops, assistants",
    format: "Présentiel ou distanciel",
    duration: "1 jour (7h)",
    objectives: [
      "Identifier les gains rapides",
      "Concevoir un workflow robuste",
      "Déployer et monitorer les automatisations",
    ],
    prerequisites: ["Aucun prérequis technique", "Accès à vos outils"],
    program_outline:
      "Diagnostic, design des workflows, atelier Make/n8n, tests & monitoring.",
    cta_label: "Demander le programme",
    cta_link: "/contact",
    sort_order: 1,
    seo_title: "Formation no-code & automatisation",
    seo_description:
      "Formation opérationnelle pour automatiser vos process avec Make/n8n.",
  },
  {
    title: "IA pour équipes terrain",
    slug: "ia-equipes-terrain",
    summary:
      "Intégrer l'IA dans les routines quotidiennes sans complexité.",
    description:
      "Prompts efficaces, assistants personnalisés et plan d'adoption rapide.",
    audience: "Commerciaux, managers, équipes terrain",
    format: "Présentiel",
    duration: "1 jour (7h)",
    objectives: [
      "Écrire plus vite et mieux",
      "Analyser des données sans friction",
      "Créer des routines IA utiles",
    ],
    prerequisites: ["Ordinateur portable", "Cas d'usage interne"],
    program_outline:
      "Cas d'usage, prompts efficaces, assistants personnalisés, plan d'adoption.",
    cta_label: "Réserver une session",
    cta_link: "/contact",
    sort_order: 2,
    seo_title: "Formation IA opérationnelle",
    seo_description:
      "Formation IA pour équipes terrain : prompts, routines, adoption rapide.",
  },
  {
    title: "Atelier Roadmap digitale",
    slug: "atelier-roadmap-digitale",
    summary:
      "Cadrer les priorités, définir les KPI et livrer une feuille de route actionnable.",
    description:
      "Atelier stratégique pour aligner les équipes et estimer le ROI.",
    audience: "Direction, équipes projet",
    format: "Présentiel ou distanciel",
    duration: "0,5 jour (4h)",
    objectives: [
      "Prioriser les initiatives",
      "Chiffrer les gains",
      "Planifier les prochaines étapes",
    ],
    prerequisites: ["Accès aux KPIs clés", "Temps de préparation"],
    program_outline:
      "Interview, mapping, scoring ROI, restitution roadmap & quick wins.",
    cta_label: "Planifier l'atelier",
    cta_link: "/contact",
    sort_order: 3,
    seo_title: "Atelier roadmap digitale",
    seo_description:
      "Atelier express pour prioriser les automatisations et livrer une roadmap ROI.",
  },
];

async function createIfEmpty(strapi: StrapiInstance, uid: string, items: Record<string, unknown>[]) {
  const count = await strapi.db.query(uid).count();
  if (count > 0) return;

  for (const item of items) {
    await strapi.db.query(uid).create({
      data: {
        ...item,
        publishedAt: now(),
      },
    });
  }
}

export async function seedPremium(strapi: StrapiInstance) {
  await createIfEmpty(strapi, "api::location.location", locationSeed);
  await createIfEmpty(strapi, "api::b2b-service.b2b-service", serviceSeed);
  await createIfEmpty(strapi, "api::case-study.case-study", caseStudySeed);
  await createIfEmpty(strapi, "api::b2c-repair.b2c-repair", repairSeed);
  await createIfEmpty(strapi, "api::faq.faq", faqSeed);
  await createIfEmpty(strapi, "api::training.training", trainingSeed);
}
