# Dexoppo

Basit bir DexScreener benzeri demo: Uniswap v2 subgraph'tan en çok hacme sahip pariteleri çeker, backend'de normalize eder ve frontend'de listeler.

- Backend: Node.js (Express) + fetcher (The Graph / Uniswap v2)
- Frontend: Next.js 14 (App Router)
- Cache: In-memory (MVP)
- Dağıtım: Dockerfile'lar ve docker-compose ile tek komut

## Hızlı Başlangıç (Yerel)

### Gereksinimler
- Node.js 20+
- npm 10+

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Tarayıcı: http://localhost:3000

### Docker Compose ile
```bash
docker-compose up --build
```
Frontend: http://localhost:3000, Backend: http://localhost:4000

## Mimari (MVP)
- Fetcher her 30 saniyede Uniswap v2 subgraph'tan pariteleri çeker.
- Backend normalleştirir ve in-memory cache'e koyar.
- Frontend 15 saniyede bir polling ile tabloyu günceller; detay sayfası mevcuttur.

## Dosya Yapısı
```
backend/
  src/
    server.ts
    routes/pairs.ts
    services/
      pairService.ts
      fetch/uniswapFetcher.ts
    jobs/schedule.ts
    cache/memoryCache.ts
    types/pair.ts
  package.json
  tsconfig.json
  Dockerfile
  .env.example
frontend/
  app/
    layout.tsx
    page.tsx
    pairs/[id]/page.tsx
  components/
    PairTable.tsx
    Sparkline.tsx
  lib/api.ts
  package.json
  next.config.js
  Dockerfile
  .env.local.example

docker-compose.yml
```

## Uyarılar
- Demo amaçlıdır; yatırım tavsiyesi değildir.
- Subgraph limitleri ve gecikmeler olabilir.

## Lisans
MIT
