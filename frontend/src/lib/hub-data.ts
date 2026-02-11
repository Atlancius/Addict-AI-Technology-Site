export type ProServiceSlug =
  | "marketing-digital"
  | "automatisation-ia"
  | "crm-saas-integrations"
  | "transition-digitale";

export type AuditContext =
  | "general"
  | "marketing"
  | "ia"
  | "crm"
  | "transition"
  | "formation-pro";

export interface ServicePack {
  name: "Essentiel" | "Signature" | "Elite";
  label: string;
  price: string;
  details: string[];
  highlighted?: boolean;
}

export interface ProServiceBranch {
  slug: ProServiceSlug;
  title: string;
  menuLabel: string;
  shortDescription: string;
  heroPain: string;
  heroPromise: string;
  image: string;
  auditContext: AuditContext;
  problems: Array<{ problem: string; solution: string }>;
  packs: ServicePack[];
  bespoke: string[];
  method: string[];
  faq: Array<{ question: string; answer: string }>;
  relatedCaseStudies: string[];
  crossNav: ProServiceSlug[];
}

export interface HubCaseStudy {
  slug: string;
  title: string;
  summary: string;
  impact: string;
  sector: string;
  tags: string[];
  serviceSlugs: ProServiceSlug[];
  image: string;
}

export interface FormationOffer {
  title: string;
  summary: string;
  packs: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface BoutiqueOffer {
  title: string;
  summary: string;
  points: string[];
}

export const SERVICE_MENU_ITEMS: Array<{ slug: ProServiceSlug; label: string }> = [
  { slug: "marketing-digital", label: "Marketing & Image de marque" },
  { slug: "automatisation-ia", label: "Automatisation & IA" },
  { slug: "crm-saas-integrations", label: "CRM / SaaS sur-mesure & Intégrations" },
  { slug: "transition-digitale", label: "Transition digitale (audit & formation interne)" },
];

export const PRO_SERVICES: ProServiceBranch[] = [
  {
    slug: "marketing-digital",
    title: "Marketing & Image de marque",
    menuLabel: "Marketing & Image de marque",
    shortDescription:
      "Positionnement clair, narration de marque et tunnel de conversion piloté par la data.",
    heroPain:
      "Ton image ne reflète pas ton niveau de service, et tes actions marketing manquent de cohérence.",
    heroPromise:
      "On aligne ton message, ton identité et ton acquisition pour transformer l'attention en demandes qualifiées.",
    image: "/images/stock/team-meeting.jpg",
    auditContext: "marketing",
    problems: [
      {
        problem: "Positionnement flou et discours peu différenciant.",
        solution:
          "Clarification de proposition de valeur, architecture d'offre et ligne éditoriale orientée conversion.",
      },
      {
        problem: "Site et contenus qui génèrent peu d'actions.",
        solution:
          "Refonte du parcours, pages orientées preuve et plan de contenu rythmé par les objectifs business.",
      },
      {
        problem: "Investissements marketing sans visibilité ROI.",
        solution:
          "Plan de tracking, KPI partagés et rituels de pilotage mensuels.",
      },
    ],
    packs: [
      {
        name: "Essentiel",
        label: "Cadrage d'image",
        price: "Dès 1 400 EUR",
        details: [
          "Audit express image et tunnel",
          "Positionnement + message principal",
          "Plan d'actions sur 30 jours",
        ],
      },
      {
        name: "Signature",
        label: "Système d'acquisition",
        price: "Dès 2 900 EUR",
        highlighted: true,
        details: [
          "Refonte des pages clés et CTA",
          "Framework contenu (4 semaines)",
          "Mise en place KPIs et tableau de bord",
        ],
      },
      {
        name: "Elite",
        label: "Pilotage continu",
        price: "Dès 5 400 EUR",
        details: [
          "Direction marketing fractionnée",
          "Optimisations hebdomadaires",
          "Reporting stratégique mensuel",
        ],
      },
    ],
    bespoke: [
      "Mission hybride branding + acquisition",
      "Accompagnement lancement d'offre premium",
      "Renfort ponctuel direction marketing",
    ],
    method: [
      "Diagnostic des points de friction business et image",
      "Priorisation des actions à impact rapide",
      "Déploiement des assets et du plan d'acquisition",
      "Mesure, apprentissage, amélioration continue",
    ],
    faq: [
      {
        question: "Vous gérez aussi la production de contenus ?",
        answer:
          "Oui, on peut cadrer la ligne éditoriale et produire les assets clés ou piloter vos ressources internes.",
      },
      {
        question: "Est-ce compatible avec une petite équipe ?",
        answer:
          "Oui. La méthode est pensée pour des structures légères, avec une priorisation stricte des actions utiles.",
      },
      {
        question: "Quand voit-on les premiers résultats ?",
        answer:
          "Les premiers gains apparaissent souvent entre 3 et 6 semaines selon la base existante.",
      },
    ],
    relatedCaseStudies: ["launch-atelier-nova", "retargeting-pme-corse", "refonte-site-vitrine"],
    crossNav: ["automatisation-ia", "transition-digitale"],
  },
  {
    slug: "automatisation-ia",
    title: "Automatisation & IA",
    menuLabel: "Automatisation & IA",
    shortDescription:
      "Automatiser les opérations répétitives, accélérer la production et fiabiliser les workflows métier.",
    heroPain:
      "Les tâches manuelles ralentissent ton équipe, multiplient les erreurs et bloquent la croissance.",
    heroPromise:
      "On conçoit des flux robustes IA + no-code qui libèrent du temps et sécurisent l'exécution.",
    image: "/images/stock/data-center.jpg",
    auditContext: "ia",
    problems: [
      {
        problem: "Saisie manuelle et doublons entre outils.",
        solution:
          "Automatisations entre CRM, emails, facturation et suivi de projet avec règles de contrôle.",
      },
      {
        problem: "Temps perdu sur la production documentaire.",
        solution:
          "Assistants IA sur prompts métier, modèles validés et garde-fous qualité.",
      },
      {
        problem: "Workflows fragiles, dépendants d'une personne.",
        solution:
          "Documentation, monitoring et transfert de compétence pour autonomie de l'équipe.",
      },
    ],
    packs: [
      {
        name: "Essentiel",
        label: "Quick wins IA",
        price: "Dès 1 900 EUR",
        details: [
          "Audit flux et irritants",
          "2 automatisations prioritaires",
          "Guide d'usage équipe",
        ],
      },
      {
        name: "Signature",
        label: "Ops automatisées",
        price: "Dès 3 800 EUR",
        highlighted: true,
        details: [
          "Architecture workflow multi-outils",
          "Automatisations IA + QA",
          "Dashboard de suivi opérationnel",
        ],
      },
      {
        name: "Elite",
        label: "Scale & gouvernance",
        price: "Dès 6 900 EUR",
        details: [
          "Roadmap automatisation 90 jours",
          "Supervision avancée et alerting",
          "Formation des référents internes",
        ],
      },
    ],
    bespoke: [
      "Automatisation sur stack existante sans refonte lourde",
      "POC IA métier avec cadrage sécurité",
      "Migration progressive vers un socle opérationnel unifié",
    ],
    method: [
      "Cartographie des workflows et estimation des gains",
      "Prototype rapide sur cas d'usage critique",
      "Industrialisation et fiabilisation des scénarios",
      "Passation, gouvernance et amélioration continue",
    ],
    faq: [
      {
        question: "Travaillez-vous avec nos outils actuels ?",
        answer:
          "Oui, la priorité est d'exploiter l'existant avant d'ajouter une complexité inutile.",
      },
      {
        question: "Les données sensibles sont-elles protégées ?",
        answer:
          "Oui. Nous appliquons un principe de moindre privilège, journalisation et validation RGPD.",
      },
      {
        question: "Qui maintient les automatisations ensuite ?",
        answer:
          "Vous pouvez nous confier la maintenance ou former un référent interne avec notre documentation.",
      },
    ],
    relatedCaseStudies: ["reporting-ops-auto", "onboarding-rh-ia", "support-ticket-triage"],
    crossNav: ["crm-saas-integrations", "transition-digitale"],
  },
  {
    slug: "crm-saas-integrations",
    title: "CRM / SaaS sur-mesure & Intégrations",
    menuLabel: "CRM / SaaS sur-mesure & Intégrations",
    shortDescription:
      "Concevoir un socle CRM/SaaS adapté à ton cycle de vente et connecté à ton écosystème réel.",
    heroPain:
      "Tes données clients sont dispersées, le suivi commercial est irrégulier et les intégrations cassent.",
    heroPromise:
      "On construit un système CRM robuste, lisible par l'équipe et prêt à scaler sans dette.",
    image: "/images/stock/pro-workspace.jpg",
    auditContext: "crm",
    problems: [
      {
        problem: "Pipeline commercial incomplet, peu fiable.",
        solution:
          "Modélisation d'un pipeline unique, règles de qualification et routines de pilotage.",
      },
      {
        problem: "SaaS empilés sans logique d'ensemble.",
        solution:
          "Architecture cible, matrice d'intégration et standardisation des flux critiques.",
      },
      {
        problem: "Difficile de personnaliser sans casser l'existant.",
        solution:
          "Développement sur-mesure progressif avec contrôle qualité et documentation métier.",
      },
    ],
    packs: [
      {
        name: "Essentiel",
        label: "CRM fondation",
        price: "Dès 2 200 EUR",
        details: [
          "Audit CRM + process vente",
          "Structure pipeline + champs clés",
          "Plan d'adoption équipe",
        ],
      },
      {
        name: "Signature",
        label: "CRM connecté",
        price: "Dès 4 600 EUR",
        highlighted: true,
        details: [
          "Intégrations SaaS prioritaires",
          "Automatisations relance et suivi",
          "Tableaux de bord business",
        ],
      },
      {
        name: "Elite",
        label: "Socle sur-mesure",
        price: "Dès 8 500 EUR",
        details: [
          "Modules métier spécifiques",
          "Qualité de données et gouvernance",
          "Support évolutif trimestriel",
        ],
      },
    ],
    bespoke: [
      "Refonte progressive sans interruption commerciale",
      "Connecteurs API spécifiques métier",
      "Accompagnement à la gouvernance des données",
    ],
    method: [
      "Audit des données, pipeline et outils",
      "Design de la cible CRM/SaaS",
      "Déploiement par lots pour limiter le risque",
      "Formation utilisateurs et pilotage qualité",
    ],
    faq: [
      {
        question: "Faut-il migrer tout de suite vers un nouvel outil ?",
        answer:
          "Pas forcément. On décide selon les contraintes métier, le coût et la continuité opérationnelle.",
      },
      {
        question: "Pouvez-vous intervenir en co-pilotage avec notre équipe ?",
        answer:
          "Oui, nous travaillons souvent en binôme avec vos équipes internes ou votre DSI.",
      },
      {
        question: "Comment évitez-vous la dette technique ?",
        answer:
          "Architecture modulaire, documentation et standards d'intégration sont posés dès le début.",
      },
    ],
    relatedCaseStudies: ["crm-distributeur-b2b", "migration-saas-pme", "lead-ops-atelier"],
    crossNav: ["automatisation-ia", "marketing-digital"],
  },
  {
    slug: "transition-digitale",
    title: "Transition digitale (audit & formation interne)",
    menuLabel: "Transition digitale (audit & formation interne)",
    shortDescription:
      "Structurer la transformation interne avec une feuille de route réaliste et l'adhésion des équipes.",
    heroPain:
      "Les initiatives digitales s'accumulent sans cap commun, et les équipes peinent à suivre.",
    heroPromise:
      "On aligne direction, opérations et montée en compétence dans une trajectoire claire et mesurable.",
    image: "/images/stock/team-meeting.jpg",
    auditContext: "transition",
    problems: [
      {
        problem: "Transformation lancée mais peu adoptée.",
        solution:
          "Diagnostic d'adoption, plan de conduite du changement et rituels de suivi.",
      },
      {
        problem: "Priorités digitales floues.",
        solution:
          "Roadmap 90 jours avec quick wins et chantiers structurants.",
      },
      {
        problem: "Compétences internes inégales.",
        solution:
          "Parcours de formation interne ciblés par rôle, avec coaching terrain.",
      },
    ],
    packs: [
      {
        name: "Essentiel",
        label: "Audit de maturité",
        price: "Dès 1 600 EUR",
        details: [
          "Diagnostic organisation + outils",
          "Priorités de transformation",
          "Plan d'actions 45 jours",
        ],
      },
      {
        name: "Signature",
        label: "Roadmap + formation",
        price: "Dès 3 400 EUR",
        highlighted: true,
        details: [
          "Roadmap 90 jours",
          "2 sessions formation interne",
          "Coaching des référents",
        ],
      },
      {
        name: "Elite",
        label: "Transformation pilotée",
        price: "Dès 6 200 EUR",
        details: [
          "Pilotage mensuel multi-équipes",
          "Programme formation continue",
          "Mesure d'impact et arbitrages",
        ],
      },
    ],
    bespoke: [
      "Mission flash d'alignement direction/équipes",
      "Plan de montée en compétence par service",
      "Interventions sur-site + distanciel",
    ],
    method: [
      "Évaluation maturité digitale et freins adoption",
      "Coconstruction d'une roadmap praticable",
      "Exécution accompagnée et formation en situation",
      "Boucle d'amélioration avec indicateurs d'impact",
    ],
    faq: [
      {
        question: "Est-ce adapté à une PME sans équipe digitale dédiée ?",
        answer:
          "Oui. Le dispositif est pensé pour des organisations avec peu de ressources internes.",
      },
      {
        question: "Peut-on commencer par une mission courte ?",
        answer:
          "Oui, l'audit initial permet de décider ensuite du niveau d'accompagnement pertinent.",
      },
      {
        question: "La formation est-elle personnalisée par métier ?",
        answer:
          "Oui, chaque module est ajusté aux rôles et aux cas d'usage de vos équipes.",
      },
    ],
    relatedCaseStudies: ["transition-retail-local", "formation-equipe-terrain", "gouvernance-digitale-groupe"],
    crossNav: ["marketing-digital", "crm-saas-integrations"],
  },
];

export const CASE_STUDIES: HubCaseStudy[] = [
  {
    slug: "launch-atelier-nova",
    title: "Atelier Nova - relancement image premium",
    summary:
      "Repositionnement de marque, refonte des pages d'offre et orchestration contenu sur 6 semaines.",
    impact: "+38% de demandes qualifiées en 2 mois.",
    sector: "Services B2B",
    tags: ["Branding", "Conversion", "Analytics"],
    serviceSlugs: ["marketing-digital"],
    image: "/images/stock/team-meeting.jpg",
  },
  {
    slug: "retargeting-pme-corse",
    title: "PME Corse - pipeline marketing stabilisé",
    summary:
      "Structuration du tunnel, contenus de preuve et pilotage hebdomadaire sur KPI commerciaux.",
    impact: "Coût d'acquisition réduit de 24%.",
    sector: "B2B local",
    tags: ["Acquisition", "KPI", "Pilotage"],
    serviceSlugs: ["marketing-digital"],
    image: "/images/stock/pro-workspace.jpg",
  },
  {
    slug: "refonte-site-vitrine",
    title: "Cabinet conseil - refonte site vitrine orientée lead",
    summary:
      "Nouveau parcours web, offres clarifiées et CTA contextuels par intention.",
    impact: "Taux de conversion multiplié par 1.7.",
    sector: "Conseil",
    tags: ["UX", "Copywriting", "SEO"],
    serviceSlugs: ["marketing-digital"],
    image: "/images/stock/cafe-cozy.jpg",
  },
  {
    slug: "reporting-ops-auto",
    title: "Réseau multi-sites - reporting automatisé",
    summary:
      "Automatisation de consolidation data et génération de synthèses hebdomadaires assistées par IA.",
    impact: "11h gagnées par semaine pour l'équipe pilotage.",
    sector: "Retail",
    tags: ["Automation", "Data", "IA"],
    serviceSlugs: ["automatisation-ia"],
    image: "/images/stock/data-center.jpg",
  },
  {
    slug: "onboarding-rh-ia",
    title: "Scale-up RH - onboarding semi-automatique",
    summary:
      "Scénarios no-code pour onboarding, validation documentaire et relances intelligentes.",
    impact: "Délai d'onboarding réduit de 32%.",
    sector: "Ressources humaines",
    tags: ["No-code", "Process", "IA"],
    serviceSlugs: ["automatisation-ia"],
    image: "/images/stock/team-meeting.jpg",
  },
  {
    slug: "support-ticket-triage",
    title: "Service client - triage automatique des tickets",
    summary:
      "Classification IA des demandes entrantes et routage vers la bonne équipe.",
    impact: "Temps de première réponse divisé par 2.",
    sector: "SaaS",
    tags: ["Support", "Workflows", "IA"],
    serviceSlugs: ["automatisation-ia"],
    image: "/images/stock/pro-workspace.jpg",
  },
  {
    slug: "crm-distributeur-b2b",
    title: "Distributeur B2B - CRM unique et fiable",
    summary:
      "Fusion de bases, nouveau pipeline commercial et automatisations de relance devis.",
    impact: "Vision pipeline en temps réel pour toute la direction.",
    sector: "Distribution",
    tags: ["CRM", "Data", "Sales Ops"],
    serviceSlugs: ["crm-saas-integrations"],
    image: "/images/stock/data-center.jpg",
  },
  {
    slug: "migration-saas-pme",
    title: "PME industrielle - migration SaaS sans rupture",
    summary:
      "Migration progressive d'outils historiques vers un socle SaaS connecté.",
    impact: "Aucune interruption des opérations.",
    sector: "Industrie",
    tags: ["Migration", "API", "Gouvernance"],
    serviceSlugs: ["crm-saas-integrations"],
    image: "/images/stock/pro-workspace.jpg",
  },
  {
    slug: "lead-ops-atelier",
    title: "Atelier technique - lead ops sur-mesure",
    summary:
      "Conception d'un mini-SaaS interne pour orchestrer devis, suivi client et relances.",
    impact: "+29% de devis transformés.",
    sector: "Services techniques",
    tags: ["SaaS", "Integrations", "Ops"],
    serviceSlugs: ["crm-saas-integrations"],
    image: "/images/stock/team-meeting.jpg",
  },
  {
    slug: "transition-retail-local",
    title: "Commerce local - transition digitale pilotée",
    summary:
      "Audit de maturité, roadmap et formation des responsables magasin.",
    impact: "Adoption des nouveaux outils en 8 semaines.",
    sector: "Retail",
    tags: ["Audit", "Formation", "Conduite du changement"],
    serviceSlugs: ["transition-digitale"],
    image: "/images/stock/cafe-cozy.jpg",
  },
  {
    slug: "formation-equipe-terrain",
    title: "Équipe terrain - montée en compétence IA/no-code",
    summary:
      "Programme de formation orienté cas réels et routines d'équipe.",
    impact: "Autonomie opérationnelle sur les tâches répétitives.",
    sector: "Services",
    tags: ["Formation", "Adoption", "IA"],
    serviceSlugs: ["transition-digitale"],
    image: "/images/stock/team-meeting.jpg",
  },
  {
    slug: "gouvernance-digitale-groupe",
    title: "Groupe multi-entités - gouvernance digitale",
    summary:
      "Cadre de pilotage transverse, rôles, standards et arbitrage des priorités.",
    impact: "Roadmap consolidée et décisions accélérées.",
    sector: "Groupe",
    tags: ["Stratégie", "Gouvernance", "Roadmap"],
    serviceSlugs: ["transition-digitale"],
    image: "/images/stock/data-center.jpg",
  },
];

export const SERVICES_FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "Comment choisir entre les 4 branches services ?",
    answer:
      "On commence par un audit court pour qualifier votre point de blocage principal, puis on priorise la branche avec le meilleur impact immédiat.",
  },
  {
    question: "Les packs sont-ils figés ?",
    answer:
      "Non. La structure Essentiel / Signature / Elite est commune pour la lisibilité, mais le contenu est ajusté à votre contexte.",
  },
  {
    question: "Travaillez-vous uniquement en Corse ?",
    answer:
      "Nous intervenons en Corse et partout en France, en présentiel ciblé et en distanciel.",
  },
  {
    question: "Quel est le délai de démarrage ?",
    answer:
      "En général 7 a 14 jours après cadrage, selon la charge et la criticité de votre projet.",
  },
];

export const GLOBAL_PROCESS_STEPS = [
  {
    title: "Audit ciblé",
    detail:
      "Comprendre la situation actuelle, identifier les points de friction et estimer l'impact business.",
  },
  {
    title: "Priorisation",
    detail:
      "Choisir les actions qui combinent vitesse d'exécution, faisabilité et ROI visible.",
  },
  {
    title: "Déploiement",
    detail:
      "Mettre en production avec standards qualité, documentation et points de contrôle.",
  },
  {
    title: "Transmission",
    detail:
      "Rendre vos équipes autonomes et installer un pilotage durable des résultats.",
  },
];

export const TRUST_ITEMS = [
  "Expérience terrain en TPE/PME",
  "Méthode orientée résultats mesurables",
  "Stack no-code, IA et web moderne",
  "Accompagnement local en Corse + distanciel France",
];

export const STACK_ITEMS = [
  "Make",
  "n8n",
  "Airtable",
  "Notion",
  "HubSpot",
  "Brevo",
  "OpenAI",
  "Next.js",
  "Strapi",
  "Caddy",
];

export const FORMATIONS_PRO: FormationOffer = {
  title: "Formations Pro",
  summary:
    "Parcours entreprise orientés adoption : IA pratique, automatisation métier, structuration process et gouvernance digitale.",
  packs: [
    "Pack Essentiel : atelier découverte + plan d'actions",
    "Pack Signature : parcours de montée en compétence sur 4 à 6 semaines",
    "Pack Elite : accompagnement équipe + coaching managers",
  ],
  ctaLabel: "Demander un audit formation",
  ctaHref: "/contact?audit=formation-pro#audit-pro",
};

export const FORMATIONS_PARTICULIERS: FormationOffer = {
  title: "Formations Particuliers",
  summary:
    "Cours accessibles pour gagner en autonomie numérique : informatique du quotidien, IA/no-code et bonnes pratiques productivité.",
  packs: [
    "Informatique pratique : prise en main PC/mobile",
    "IA utile : prompts, assistants et automatisations simples",
    "No-code découverte : créer ses workflows personnels",
  ],
  ctaLabel: "Parler de mon besoin",
  ctaHref: "/contact",
};

export const FORMATION_TESTIMONIALS: Testimonial[] = [
  {
    name: "Claire M.",
    role: "Dirigeante PME",
    quote:
      "Nous avons clarifié nos priorités en une journée et l'équipe applique enfin une méthode commune.",
  },
  {
    name: "Nicolas R.",
    role: "Responsable opérations",
    quote:
      "Les ateliers IA ont été concrets, immédiatement exploitables et adaptés à notre réalité terrain.",
  },
  {
    name: "Julie A.",
    role: "Particulière",
    quote:
      "Formation très claire, je me sens enfin autonome sur mes outils numériques.",
  },
];

export const BOUTIQUE_OFFERS: BoutiqueOffer[] = [
  {
    title: "Réparation express",
    summary:
      "Diagnostic rapide pour smartphone, PC et tablette avec explication claire avant intervention.",
    points: [
      "Écran, batterie, connectique, entretien",
      "Garantie sur intervention",
      "Devis transparent avant validation",
    ],
  },
  {
    title: "Dépannage à domicile",
    summary:
      "Intervention locale pour installation, optimisation réseau, sécurité de base et remise en route.",
    points: [
      "Assistance poste fixe et laptop",
      "Configuration box et périphériques",
      "Aide à la prise en main",
    ],
  },
  {
    title: "Formations particuliers",
    summary:
      "Sessions individuelles pour gagner du temps au quotidien avec les bons usages numériques.",
    points: [
      "Initiation informatique",
      "IA utile pour le quotidien",
      "No-code découverte",
    ],
  },
];

export const CONTACT_FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "Quel délai pour un retour audit pro ?",
    answer: "Nous revenons en general sous 24h ouvrées avec un premier cadrage.",
  },
  {
    question: "Puis-je vous contacter pour un besoin particulier non listé ?",
    answer:
      "Oui, le formulaire et le téléphone servent aussi pour les demandes hors catalogue.",
  },
  {
    question: "Intervenez-vous sur place ?",
    answer:
      "Oui, sur zone locale pour la boutique/dépannage et sur site pour certaines missions pro.",
  },
];

export const AUDIT_CONTEXT_LABELS: Record<AuditContext, string> = {
  general: "Audit global",
  marketing: "Audit marketing",
  ia: "Audit automatisation & IA",
  crm: "Audit CRM / SaaS",
  transition: "Audit transition digitale",
  "formation-pro": "Audit formation pro",
};

export function buildAuditHref(context: AuditContext) {
  return `/contact?audit=${context}#audit-pro`;
}

export function getProServiceBySlug(slug: string) {
  return PRO_SERVICES.find((service) => service.slug === slug);
}

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((item) => item.slug === slug);
}

export function getCaseStudiesForService(slug: ProServiceSlug, limit = 3) {
  return CASE_STUDIES.filter((item) => item.serviceSlugs.includes(slug)).slice(0, limit);
}
