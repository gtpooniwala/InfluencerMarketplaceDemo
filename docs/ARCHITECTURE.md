# Architecture

## Purpose

This project is a **frontend-only hackathon demo** for a micro-influencer marketplace. It intentionally has:

- no backend
- no external APIs
- no authentication
- no database

All state is browser-local and persisted in local storage.

## Tech Stack

- Next.js 14 App Router (TypeScript)
- React 18
- Tailwind CSS
- Vitest for unit tests
- Playwright for end-to-end tests

## High-Level Structure

- `app/`: App Router pages and route-level UI
- `components/`: shared UI primitives and layout components
- `lib/`: domain logic, state helpers, matching/filtering logic, and typed models
- `tests/e2e/`: browser-level workflow tests

## State Architecture

State is stored under one local storage key:

- `demoAppState`

Core helpers:

- `lib/storage.ts`
  - load/save/reset local storage
  - seeds influencer catalog
  - emits `demo-state-updated` events after write/reset
- `lib/useDemoState.ts`
  - hook wrapper around state reads/writes
  - listens to both custom `demo-state-updated` and browser `storage` events

This event-based sync keeps header/nav/page sections consistent when separate parts of the UI call `useDemoState`.

## Domain Logic Modules

- `lib/demo-actions.ts`: pure state transitions for campaign creation, offer creation/status, messaging, checklist toggles
- `lib/matching.ts`: deterministic fit score + match reasons
- `lib/filtering.ts`: influencer filter predicates
- `lib/campaigns.ts`: route-to-campaign resolution with fallback support
- `lib/routes.ts`: campaign-aware link generation for nav/stepper

## UI Shell Pattern

`components/app-shell.tsx` provides:

- top navigation
- brand flow stepper
- breadcrumb
- reset demo action
- missing-state banner

Pages focus on route-specific forms and interactions while shared shell behavior stays centralized.
