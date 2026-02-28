# Testing Guide

## Test Types

1. Unit tests (Vitest)
- location: `lib/*.test.ts`
- scope: pure logic modules (matching, filters, routes, campaign resolution, state actions)

2. End-to-end tests (Playwright)
- location: `tests/e2e/flow.spec.ts`
- scope: browser flow from landing through coordination interactions

## Commands

Install dependencies:

```bash
npm install
```

Run unit tests:

```bash
npm test
```

Install Playwright browser once:

```bash
npx playwright install chromium
```

Run E2E tests:

```bash
npm run test:e2e
```

Run production build validation:

```bash
npm run build
```

## Current E2E Coverage

- onboarding -> campaign -> matches -> coordination navigation
- selecting influencers and sending offers
- simulation of offer acceptance
- appending message in thread
- toggling deliverables checklist checkbox

## Notes

- Playwright config starts a local web server (`next dev -p 3000`).
- If a local dev server is already running on the same port, Playwright reuses it.
