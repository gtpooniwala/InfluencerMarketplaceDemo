# Routes and Demo Flow

## Route Map

- `/`: landing page
- `/brand/onboarding`: brand onboarding form
- `/brand/campaign/new`: campaign creation form
- `/brand/campaign/[id]/matches`: influencer matching and offer creation
- `/brand/campaign/[id]/coord`: offer coordination workspace

## End-to-End Flow

1. Landing
- `I'm a Brand` goes to onboarding.
- `View Demo Flow` seeds state and jumps to campaign creation.

2. Onboarding
- Captures brand profile (company, website optional, industry, budget range, target geo).
- Persists to local storage.
- Continues to campaign creation.

3. Campaign Creation
- Captures objective, platforms, tags, budget, timeline.
- Creates a campaign with deterministic ID.
- Routes to `/matches` for that campaign.

4. Matching
- Renders ranked influencer cards with fit score and match reasons.
- Supports filters (platform, niche tag, geo, follower range).
- Supports multi-select + send offers.
- Sending offers updates campaign to `Active` and routes to coordination.

5. Coordination
- Shows offer records per influencer.
- Simulates status transitions (accept/decline/delivered).
- Supports message thread append.
- Supports deliverables checklist toggles.

## Stepper and Nav Behavior

- Stepper appears on all `/brand/*` routes.
- Nav links are campaign-aware and replace `/demo/` placeholders with the active/latest campaign ID when available.
- If route ID is `demo` or stale, campaign helpers resolve to active/latest campaign and redirect to canonical URL.

## Reset Behavior

The header `Reset Demo` button clears local storage and returns to `/`.
