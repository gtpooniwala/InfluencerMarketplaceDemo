# Release Checklist

Use this before sharing a demo build, creating a release tag, or deploying.

## Product Readiness

- [ ] Primary flow works end-to-end (`/` -> onboarding -> campaign -> matches -> coordination)
- [ ] Stepper and navigation links resolve to real campaign IDs
- [ ] Reset Demo works and returns to clean landing state
- [ ] No visible placeholder/TODO text in UI

## Engineering Validation

- [ ] `npm test` passes
- [ ] `npm run test:e2e` passes
- [ ] `npm run build` passes
- [ ] `docker compose up --build` serves app on `http://localhost:8080`

## Docs and Config

- [ ] `README.md` commands are accurate
- [ ] `docs/` updated for behavior/config changes
- [ ] Deployment files present and current:
  - `Dockerfile`
  - `docker-compose.yml`
  - `cloudbuild.yaml`

## Git Hygiene

- [ ] Working tree is clean
- [ ] Commit messages clearly describe behavior changes
- [ ] Branch is pushed to remote
