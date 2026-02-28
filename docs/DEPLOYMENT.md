# Deployment Runbook

## Local Production-Like Run (Docker)

Build and run:

```bash
docker compose up --build
```

Open:

```text
http://localhost:8080
```

Stop:

```bash
docker compose down
```

## Docker Image Details

`Dockerfile` uses a multi-stage build:

1. `deps`: install dependencies (`npm ci`)
2. `builder`: `npm run build` (Next standalone output)
3. `runner`: lightweight runtime with `node server.js`

Runtime env:

- `PORT=8080`
- `HOSTNAME=0.0.0.0`

## Cloud Run (Source Deploy)

```bash
gcloud auth login
gcloud config set project PROJECT_ID
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
gcloud run deploy SERVICE_NAME --source . --region REGION --allow-unauthenticated
gcloud run services describe SERVICE_NAME --region REGION --format='value(status.url)'
```

## Cloud Run (Image Deploy)

```bash
gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/influencer-marketplace-demo:latest
gcloud run deploy SERVICE_NAME \
  --image REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/influencer-marketplace-demo:latest \
  --region REGION \
  --allow-unauthenticated
```

## Cloud Build Pipeline

Use included `cloudbuild.yaml`:

```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_SERVICE_NAME=SERVICE_NAME,_REGION=REGION,_IMAGE=REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/influencer-marketplace-demo:latest
```

This pipeline builds, pushes, and deploys.
