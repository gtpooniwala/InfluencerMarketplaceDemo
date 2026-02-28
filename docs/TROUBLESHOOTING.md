# Troubleshooting

## App shows "Demo state not found"

Cause:
- local storage is empty, cleared, or inaccessible.

Fix:
1. Go to `/brand/onboarding` and complete step 1.
2. Or start from `/` and click `View Demo Flow`.

## Navigation links go to `/demo/` placeholders

Cause:
- no active campaign exists yet.

Fix:
1. Complete campaign creation first.
2. Links auto-resolve to real campaign IDs after a campaign is created.

## E2E tests fail because browser is missing

Fix:
```bash
npx playwright install chromium
```

## E2E tests fail due to port/listen permission in restricted environments

Symptoms:
- `EPERM: operation not permitted ... :3000`

Fix options:
1. Run tests in a shell/session with localhost bind permission.
2. Re-run with elevated permissions in restricted sandbox environments.
3. Ensure no stale process blocks test startup.

## Docker app starts but browser cannot load localhost:8080

Checks:
1. Run `docker compose ps` and verify `web` is `running`.
2. Check logs: `docker compose logs --tail=100`.
3. Confirm port mapping in `docker-compose.yml` is `8080:8080`.

## Build fails on TypeScript errors after edits

Fix:
```bash
npm test
npm run build
```

Address typed return/value issues in `lib/` helpers before retrying.
