# Addict — CMS + DB

Ce repo contient :
- `frontend/` : Next.js (App Router, TypeScript, Tailwind v4)
- `cms/` : Strapi v5 (PostgreSQL)
- `docker-compose.yml` : PostgreSQL + Strapi + Front (labels Traefik)

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
- Front : via Traefik (domaine public)
- CMS : via Traefik (domaine public)

## Déploiement Traefik (prod)
Pré-requis :
- Traefik déjà déployé sur le VPS.
- Le réseau Docker `traefik` existe.
- Traefik écoute sur 80/443 et a un `certResolver` configuré.

Étapes :
1. Mettre à jour `.env` :
```bash
FRONT_DOMAIN=addictai.tech
CMS_DOMAIN=cms.addictai.tech
NEXT_PUBLIC_SITE_URL=https://addictai.tech
NEXT_PUBLIC_STRAPI_URL=https://cms.addictai.tech
TRAEFIK_NETWORK=traefik
TRAEFIK_ENTRYPOINT=websecure
```
2. S'assurer que Traefik est connecté au réseau `traefik`.
3. Déployer :
```bash
docker compose down --remove-orphans
docker compose up -d --build
```
4. Créer un token API Strapi **custom** :
- `read` sur contenus publics (Location, Repairs, Services, FAQ, Case Studies)
- `create` sur `lead`
5. Mettre `STRAPI_API_TOKEN` dans `.env`, puis :
```bash
docker compose restart frontend
```

## Configuration DNS (prod)
- `FRONT_DOMAIN` et `CMS_DOMAIN` dans `.env` doivent correspondre aux domaines DNS.
- Le HTTPS est géré par Traefik (certResolver requis).

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

## DNS & Troubleshooting
Vérifier la résolution :
```bash
dig +short addictai.tech
dig +short cms.addictai.tech
```
Vérifier le HTTPS :
```bash
curl -I https://addictai.tech
curl -I https://cms.addictai.tech
```
Revalidate test :
```bash
curl -s -X POST https://addictai.tech/api/revalidate \
  -H "x-revalidate-secret: <NEW_SECRET>" \
  -H "Content-Type: application/json" \
  -d '{"paths":["/"]}'
```
Si TLS ne répond pas :
- Vérifier l’entrypoint Traefik utilisé (ex: `websecure`).
- Vérifier qu’un `certResolver` est configuré côté Traefik.
- Vérifier que Traefik écoute bien sur 80/443.
