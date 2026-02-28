# Influencer Marketplace Demo (Frontend-Only)

Hackathon demo web app built with Next.js App Router + Tailwind CSS to simulate a complete micro-influencer marketplace workflow.

## Features

- Landing page with two entry points:
  - `I'm a Brand` (onboarding-first flow)
  - `View Demo Flow` (seeds mock state and jumps to campaign setup)
- Brand onboarding flow
- Campaign creation flow
- Pre-programmed influencer matching with filters and fit scores
- Coordination workspace with:
  - Offer statuses and simulated transitions
  - Message threads per influencer
  - Deliverables checklist
- Top navigation + stepper + reset demo action
- All app data is localStorage only (`demoAppState`)

## Tech Stack

- Next.js 14+ App Router (TypeScript)
- Tailwind CSS
- LocalStorage persistence only (no backend, no auth, no external APIs)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Tests

Run unit tests with:

```bash
npm test
```

## Production Build

```bash
npm run build
npm start
```

The app binds to `0.0.0.0` and uses `$PORT` (default `8080`).

## Cloud Run Deployment (Source Deploy)

1. Authenticate and select project:

```bash
gcloud auth login
gcloud config set project PROJECT_ID
```

2. Enable required APIs (one-time):

```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
```

3. Deploy:

```bash
gcloud run deploy SERVICE_NAME --source . --region REGION --allow-unauthenticated
```

4. Print service URL:

```bash
gcloud run services describe SERVICE_NAME --region REGION --format='value(status.url)'
```

## Cloud Run Deployment (Dockerfile)

Build + deploy with your own image if preferred:

```bash
gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/influencer-marketplace-demo:latest
gcloud run deploy SERVICE_NAME --image REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/influencer-marketplace-demo:latest --region REGION --allow-unauthenticated
```
