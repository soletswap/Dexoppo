# Deployment Guide (Dexoppo)

This document explains how to deploy Dexoppo in production.

We recommend deploying:
- Frontend (Next.js) on Vercel
- Backend (Node/Express) on either Fly.io or Render

You can deploy with any alternative (VPS + Docker, Railway, etc.). Below are ready-to-use configs and GitHub Actions workflows.

---

## 1) Frontend on Vercel

Requirements:
- Vercel account and a project created for the frontend folder
- Set environment variables in the Vercel Project Settings → Environment Variables

Required env:
- NEXT_PUBLIC_API_BASE → Your backend HTTPS URL (example: https://dexoppo-backend.fly.dev)

Steps:
1. In Vercel, create a new Project from this repository and set the root directory to `frontend`.
2. Set Project Environment Variable:
   - Key: `NEXT_PUBLIC_API_BASE`
   - Value: your backend public URL
   - Environment: Production (and Preview if you want)
3. Build & Deploy.

Optional: You can trigger deploys from GitHub Actions using the workflow `.github/workflows/deploy-frontend-vercel.yml` by providing secrets below.

Vercel GitHub Action required secrets:
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID
- NEXT_PUBLIC_API_BASE (same value as above)

Run it manually from the Actions tab (workflow_dispatch).

---

## 2) Backend on Fly.io

We included a `backend/fly.toml` template. To deploy:

Prerequisites:
- Install flyctl: https://fly.io/docs/hands-on/install-flyctl/
- `fly auth signup` then `fly auth login`

Steps (local CLI):
1. cd backend
2. fly launch --generate-name --no-deploy
   - If a `fly.toml` exists, edit the `app` name or keep the generated one.
3. fly deploy --remote-only
4. After deploy, run `fly open` to get the backend URL.
5. Set `NEXT_PUBLIC_API_BASE` on your frontend (Vercel) to the Fly URL.

GitHub Action deploy (optional):
- Use `.github/workflows/deploy-backend-fly.yml`
- Required repo secrets:
  - FLY_API_TOKEN (from flyctl tokens create deploy)
  - FLY_APP (your Fly app name)

---

## 3) Backend on Render (alternative)

A `render.yaml` is provided to create a Render Web Service via Blueprint.

Steps:
1. Connect your GitHub to Render.
2. Create New + Blueprint, choose this repo.
3. Render will detect `render.yaml` and set up a Node Web Service for the backend (rootDir: backend).
4. Set Environment variable (optional since default is 4000): PORT=4000
5. Deploy. Copy the backend URL and set it as `NEXT_PUBLIC_API_BASE` in Vercel.

---

## 4) GitHub Actions (CI)

The workflow `.github/workflows/ci.yml` builds both backend and frontend on push/PR to main.

Node version: 20.x (npm 10). Adjust if needed.

---

## 5) Environment Variables Summary

- Frontend (Vercel):
  - `NEXT_PUBLIC_API_BASE` → points to the backend URL

- Backend:
  - `PORT` (default 4000)

Note: CORS is open by default in the backend for demo. You can restrict origins in `backend/src/server.ts` using `cors({ origin: [...] })` for production.

---

## 6) Health Check

Backend exposes `/health` returning `{ ok: true }`.
Configure health checks accordingly (Render: healthCheckPath, Fly.io default works over HTTP 200).

---

## 7) Production Tips

- Use a database (e.g., Postgres) if you plan to store OHLC/snapshots.
- Add rate limiting and error handling.
- For live updates: consider WebSocket / Server-Sent Events instead of polling.
- Add logging/metrics (pino, OpenTelemetry) for observability.
