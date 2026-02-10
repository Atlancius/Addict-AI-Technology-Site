# Addict — CMS + DB

Ce repo contient :
- `frontend/` : Next.js (App Router, TypeScript, Tailwind v4)
- `cms/` : Strapi v5 (PostgreSQL)
- `docker-compose.yml` : PostgreSQL + Strapi

## Prérequis
- Node.js 20+ (ou 22+)
- Docker (optionnel pour la stack CMS/DB)

## Démarrage rapide (Frontend)
```bash
cd frontend
npm install
npm run dev
```
Accès : `http://localhost:3000`

## Démarrage rapide (Strapi + PostgreSQL via Docker)
```bash
docker compose up
```
Accès admin : `http://localhost:1337/admin`

Variables à définir (voir `.env.example`) :
- Secrets Strapi (`APP_KEYS`, `ADMIN_JWT_SECRET`, etc.)
- PostgreSQL (`POSTGRES_*` ou `DATABASE_*`)

## Démarrage Strapi en local (sans Docker)
```bash
cd cms
npm install
npm run develop
```
Configurer `.env` pour pointer vers PostgreSQL.

## Content types Strapi
- `Location`
- `B2C Repair`
- `B2B Service`
- `FAQ`
- `Case Study`
- `Lead`

## Frontend : pages principales
- `/` (Home)
- `/addict-2-0` (B2C)
- `/pro` (B2B)
- `/reparations`
- `/services`
- `/services/[slug]`
- `/realisations`
- `/realisations/[slug]`
- `/formations`
- `/evenements`
- `/contact`
- `/mentions-legales`
- `/confidentialite`

## API Leads (Next.js)
- `POST /api/leads/b2c`
- `POST /api/leads/b2b`

Anti-spam : honeypot + rate limit en mémoire.

## Revalidation (webhook)
`POST /api/revalidate` avec header `x-revalidate-secret` ou query `?secret=`

Payload optionnel :
```json
{ "paths": ["/", "/services"] }
```

## Build
```bash
cd frontend
npm run build
```

## Notes
- `NEXT_PUBLIC_STRAPI_URL` doit pointer vers l'URL Strapi.
- `STRAPI_API_TOKEN` doit être un token public en lecture pour les contenus.
- Pour la prod, utiliser HTTPS + secrets uniques.
