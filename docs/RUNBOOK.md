# Runbook — Addict AI Technology

## Prérequis
- Node.js 20+
- Docker + Docker Compose

## Variables d’environnement
Frontend (`frontend/.env.local` ou `.env`):
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_STRAPI_URL`
- `STRAPI_API_TOKEN`
- `REVALIDATE_SECRET`
- `NEXT_PUBLIC_GA_ID` (optionnel)
- `SITE_BUILD_DATE` (optionnel, format ISO)

CMS (`cms/.env`):
- `DATABASE_CLIENT=postgres`
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_NAME`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`

## Développement local
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### CMS (Strapi)
```bash
cd cms
npm install
npm run develop
```

## Docker Compose
```bash
docker compose up -d --build
```

## Mise à jour production (VPS)
```bash
cd /chemin/vers/le/repo
git pull origin <votre-branche>
docker compose up -d --build frontend
docker compose up -d --build strapi
docker compose ps
```

Contrôles rapides :
```bash
curl -I https://addictai.tech
curl -I https://cms.addictai.tech
```

## Seed Strapi (auto)
Le seed premium est exécuté automatiquement au bootstrap si les collections sont vides.

## Build
```bash
cd frontend
npm run lint
npm run build
```
