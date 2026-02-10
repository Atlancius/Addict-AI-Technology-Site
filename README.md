# Addict — CMS + DB

Ce repo contient :
- `frontend/` : Next.js (App Router, TypeScript, Tailwind v4)
- `cms/` : Strapi v5 (PostgreSQL)
- `docker-compose.yml` : PostgreSQL + Strapi + Front + Caddy

## Prérequis
- Node.js 20+ (ou 22+)
- Docker + Docker Compose

## Déploiement full-docker (recommandé)
```bash
cp .env.example .env
# Remplir tous les secrets dans .env

docker compose up -d --build
```

Par défaut :
- Front : `http://localhost` (port 80 via Caddy)
- CMS : `http://localhost:1337` (ou via domaine `cms.*` si DNS configuré)

## Configuration DNS (prod)
- `FRONT_DOMAIN` et `CMS_DOMAIN` dans `.env` doivent correspondre aux domaines DNS.
- Caddy gère automatiquement le HTTPS si les domaines pointent vers le VPS.

## Variables importantes (.env)
- `POSTGRES_PASSWORD`
- `APP_KEYS`
- `ADMIN_JWT_SECRET`
- `API_TOKEN_SALT`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `ENCRYPTION_KEY`
- `REVALIDATE_SECRET`
- `NEXT_PUBLIC_STRAPI_URL`
- `STRAPI_API_TOKEN`
- `FRONT_DOMAIN` / `CMS_DOMAIN` / `CADDY_EMAIL`

## Démarrage rapide (Frontend local)
```bash
cd frontend
npm install
npm run dev
```

## Démarrage Strapi local (sans Docker)
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

## Build front (Docker)
Le Dockerfile front utilise le mode `standalone` Next.js.

## Notes
- `NEXT_PUBLIC_STRAPI_URL` doit pointer vers l'URL Strapi publique (`https://cms.domaine`).
- Pour la prod, utiliser HTTPS + secrets uniques.
