# Components and Module Map

## App Router Pages

- `app/page.tsx`
  - Landing page and entry CTAs.
- `app/brand/onboarding/page.tsx`
  - Brand profile collection.
- `app/brand/campaign/new/page.tsx`
  - Campaign creation form and live summary preview.
- `app/brand/campaign/[id]/matches/page.tsx`
  - Influencer ranking, filtering, and offer sending.
- `app/brand/campaign/[id]/coord/page.tsx`
  - Offer coordination, messages, and checklist actions.

## Shared UI Components

- `components/app-shell.tsx`
  - Global layout, top nav, breadcrumbs, reset demo action, missing-state banner.
- `components/stepper.tsx`
  - Brand journey progress (Onboarding -> Campaign -> Matches -> Coordination).
- `components/summary-card.tsx`
  - Right-side context card for brand/campaign snapshot.
- `components/status-badge.tsx`
  - Offer status label styles.

## Core State and Logic Modules

- `lib/types.ts`
  - Source-of-truth TypeScript domain types.
- `lib/storage.ts`
  - localStorage read/write/reset + seed data + ID factories.
- `lib/useDemoState.ts`
  - React hook for read/write access with event-driven synchronization.
- `lib/demo-actions.ts`
  - Pure mutation functions for campaigns, offers, messages, and checklists.

## Matching and Routing Helpers

- `lib/matching.ts`
  - Fit score + reason generation.
- `lib/filtering.ts`
  - Influencer filtering predicates.
- `lib/routes.ts`
  - Campaign-aware link resolution for placeholder routes.
- `lib/campaigns.ts`
  - Active/latest campaign fallback resolution for dynamic routes.

## Test Layout

- `lib/*.test.ts`
  - Unit tests for pure logic modules.
- `tests/e2e/flow.spec.ts`
  - End-to-end browser tests for primary user journey.
