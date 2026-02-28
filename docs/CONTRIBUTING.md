# Contributing

## Branching

- Create feature branches from `main`.
- Keep commits small and scoped.
- Use clear commit messages that describe behavior changes.

## Local Setup

```bash
npm install
npm run dev
```

## Quality Gate Before PR

Run all checks:

```bash
npm test
npm run test:e2e
npm run build
```

## Implementation Guidelines

- Keep this app frontend-only.
- Do not add backend/API dependencies unless explicitly requested.
- Keep state transitions in `lib/` pure helpers where possible.
- Keep types in `lib/types.ts` authoritative.
- Keep UI components reusable and simple.

## Documentation Expectations

When adding or changing behavior:

1. Update root `README.md` if commands or setup changed.
2. Update relevant docs under `docs/`.
3. Add/adjust tests for behavior changes.

## Pull Request Checklist

- [ ] feature works via UI flow
- [ ] unit tests pass
- [ ] e2e tests pass
- [ ] production build passes
- [ ] docs updated
