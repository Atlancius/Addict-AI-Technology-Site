# Refonte 2026 - Cahier des charges opérationnel

Date: 2026-02-11  
Scope: Frontend Next.js (`frontend/`)

## 1. Baseline initiale (avant refonte)

Mesure Lighthouse mobile réalisée sur `https://addictai.tech`:

- Performance: 74
- Accessibility: 96
- Best Practices: 92
- SEO: 100
- FCP: 2.5s
- LCP: 5.8s
- TBT: 110ms
- CLS: 0

Problèmes principaux identifiés:

- Texture `noise.png` trop lourde pour l'arriere-plan (gain estime important).
- Animation JS surchargee (GSAP partout) et surcout runtime.
- Parcours conversion home trop ambigu (B2C/B2B en concurrence).
- Friction des formulaires et signaux d'accessibilite perfectibles.
- CSP analytics incomplète pour certaines regions GA.

## 2. Objectifs cibles

- LCP mobile <= 2.8s (objectif réaliste court terme), puis <= 2.5s.
- Performance Lighthouse home >= 90.
- Accessibility >= 98.
- Conversion: clarifier CTA principal et parcours secondaire sur home.
- Motion premium: sobre, lisible, non bloquant, compatible `prefers-reduced-motion`.

## 3. Exécution phase par phase

### Phase 0 - Baseline, pilotage et qualité (terminee)

Livrables:

- Baseline chiffrée.
- Plan de priorisation.
- Pipeline de verification locale (`lint`, `build`).

Validation:

- `npm run lint` OK
- `npm run build` OK

### Phase 1 - Architecture conversion (terminee)

Actions:

- Hero refondu autour d'une promesse unique et deux parcours explicites.
- CTA principal et secondaire clarifiés.
- Cartes de segmentation "Particuliers / Entreprises" avec bénéfices.

Fichiers:

- `frontend/src/components/sections/HeroSplit.tsx`

### Phase 2 - Design system premium v2 (terminee)

Actions:

- Harmonisation des tokens, surfaces et profondeur visuelle.
- Cohérence composants clés (navigation, boutons, cartes, champs).
- Rythme vertical amélioré sur sections critiques.

Fichiers:

- `frontend/src/app/globals.css`
- `frontend/src/components/ui/*`

### Phase 3 - Direction image et art direction (terminee)

Actions:

- Bibliothèque locale d'images libres de droits ajoutée.
- Crédits/licence traçables dans le repo.
- Intégration images sur sections stratégiques (home, B2C, B2B).

Fichiers:

- `frontend/public/images/stock/*`
- `frontend/public/images/stock/CREDITS.md`
- `frontend/src/components/sections/HeroSplit.tsx`
- `frontend/src/app/addict-2-0/page.tsx`
- `frontend/src/app/pro/page.tsx`

### Phase 4 - Motion system 2026 (terminee)

Actions:

- Preloader premium session-aware (une fois par session).
- Reveals scroll réécrits en `IntersectionObserver` (plus léger que GSAP ScrollTrigger).
- Navigation mobile animée en CSS native.
- Skeleton global App Router (`loading.tsx`).

Fichiers:

- `frontend/src/components/animations/Preloader.tsx`
- `frontend/src/components/animations/ScrollReveal.tsx`
- `frontend/src/components/ui/Navbar.tsx`
- `frontend/src/app/loading.tsx`
- `frontend/src/app/layout.tsx`

### Phase 5 - Performance hardening (terminee)

Actions:

- Suppression du bruit PNG lourd au profit d'un bruit SVG léger.
- Réduction de la dépendance animation runtime.
- Préparation à l'amélioration LCP par réduction JS/CSS perçu.

Fichiers:

- `frontend/public/noise.svg`
- `frontend/public/noise.png` (supprimé)
- `frontend/src/app/globals.css`

### Phase 6 - Accessibilité et conformité (terminee)

Actions:

- Focus management du menu mobile lorsque fermé.
- Durcissement CSP GA région (collect endpoint).
- Inputs/Textareas avec `aria-invalid`/`aria-describedby`.
- Auto-completion des formulaires B2B/B2C.

Fichiers:

- `frontend/src/components/ui/Navbar.tsx`
- `frontend/next.config.ts`
- `frontend/src/components/ui/Input.tsx`
- `frontend/src/components/forms/LeadB2BForm.tsx`
- `frontend/src/components/forms/LeadB2CForm.tsx`

### Phase 7 - Release, QA et rollback (terminee)

Checklist release:

- Lint/build validés avant push.
- Commits atomiques et taggés par phase.
- Déploiement VPS avec rebuild frontend.
- Revalidation cache ciblée.

## 4. Procédure de mise à jour VPS (ordre optimal)

```bash
cd /root/Addict-AI-Technology-Site
git pull origin main
docker compose up -d --build frontend
docker compose ps frontend
```

Revalidation:

```bash
curl -s -X POST "https://addictai.tech/api/revalidate?secret=$(grep -E '^REVALIDATE_SECRET=' .env | cut -d= -f2)" \
  -H "Content-Type: application/json" \
  -d '{"paths":["/","/addict-2-0","/pro","/services","/contact","/reparations","/realisations","/formations"]}'
```

## 5. Références 2026 et standards utilisés

- Core Web Vitals: https://web.dev/articles/vitals
- LCP: https://web.dev/articles/optimize-lcp
- INP: https://web.dev/articles/optimize-inp
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- Next.js App Router `loading.js`: https://nextjs.org/docs/app/api-reference/file-conventions/loading
- Awwwards SOTD (références design): https://www.awwwards.com/websites/sites_of_the_day/
- Adobe Creative Trends 2026: https://blog.adobe.com/en/publish/2025/12/09/four-creative-trends-define-marketing-2026
- Baymard (required/optional forms): https://baymard.com/guidelines/686-indicating-required-and-optional-fields
