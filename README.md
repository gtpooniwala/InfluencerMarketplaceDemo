# Agora Influencer Marketplace Demo

Frontend-only hackathon app that simulates an end-to-end brand-to-creator workflow: onboarding, campaign setup, creator matching, outreach/contracting, and performance review.

No backend database or auth is used. State is persisted in browser `localStorage`.

## What The Codebase Does

The app is built around a scripted "micro-influencer campaign ops" journey for demo purposes:

1. Capture brand context and creative constraints.
2. Define campaign objective, platforms, brief text, and creative angle.
3. Show ranked creators with explainable fit signals and filters.
4. Select creators and generate outreach + contract templates.
5. Track outreach pipeline, contract status, and synthetic performance metrics.

## Flows In This Repo

There are currently two coexisting flows in the codebase.

### 1) Primary Agora Flow (newer UI)

Routes:

- `/` landing page (`Create campaign` and `View demo`)
- `/onboarding` brand onboarding form
- `/campaign/new` campaign setup + creative angle selection
- `/match` creator matching and explainability panel
- `/campaign/workspace` outreach/contracts/performance workspace
- `/demo` seeds demo data and redirects to `/match`

Primary modules:

- `lib/demo-data.ts` seeded brand/campaign/creator data + template builders
- `lib/demo-store.ts` `agora_demo_state` store + workspace state construction
- `components/app-shell.tsx` shared shell, progress header, reset action

### 2) Legacy Brand Flow (`/brand/*`)

Routes:

- `/brand/onboarding`
- `/brand/campaign/new`
- `/brand/campaign/[id]/matches`
- `/brand/campaign/[id]/coord`

Primary modules:

- `lib/types.ts`
- `lib/storage.ts` (`demoAppState`)
- `lib/demo-actions.ts`
- `lib/useDemoState.ts`
- `lib/matching.ts`, `lib/filtering.ts`, `lib/campaigns.ts`

This legacy flow is still implemented and tested at the unit level, but it is no longer the default journey from `/`.

## Matching And Workspace Behavior

- Matching is deterministic (pre-seeded creators, no external scoring service).
- In `/match`, users can switch between:
  - `Agora Fit` mode (audience/message/vibe breakdowns from seeded fit values)
  - `Proxies` mode (intentionally weaker keyword-style scoring via overrides)
- Filters include platform, location, and max rate.
- Selection is capped by campaign deliverable count.
- Workspace initializes:
  - outreach statuses per selected creator
  - generated outreach message template
  - generated contract preview text

## Data And Persistence

All data is client-side and local:

- `agora_demo_state` key for the primary flow
- `demoAppState` key for the legacy `/brand` flow

Resetting demo data from the header clears only the primary flow store.

## API Surface

- `GET /api/demo` returns seeded objects for brand profile, campaign, creative angles, and creators.

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Vitest (unit tests)
- Playwright (E2E scaffolding)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tests

Run unit tests:

```bash
npm test
```

Run E2E tests:

```bash
npx playwright install chromium
npm run test:e2e
```

Note: current E2E specs target the legacy `/brand/*` journey and older landing copy, so they need refresh if used as canonical coverage for the primary flow.

## Production Build

```bash
npm run build
npm start
```

Server runs on `0.0.0.0:${PORT:-8080}`.

## Docker

```bash
docker compose up --build
```

Open [http://localhost:8080](http://localhost:8080), then stop with:

```bash
docker compose down
```

## Cloud Run

Source deploy:

```bash
gcloud run deploy SERVICE_NAME --source . --region REGION --allow-unauthenticated
```

Docker image deploy:

```bash
gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/influencer-marketplace-demo:latest
gcloud run deploy SERVICE_NAME --image REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/influencer-marketplace-demo:latest --region REGION --allow-unauthenticated
```

Cloud Build pipeline:

```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_SERVICE_NAME=SERVICE_NAME,_REGION=REGION,_IMAGE=REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/influencer-marketplace-demo:latest
```

## Additional Docs

Detailed docs are in [`docs/`](./docs/README.md).
