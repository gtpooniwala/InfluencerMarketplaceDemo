# Data Model and Local Storage

## Storage Key

- `demoAppState`

The app persists a single typed object to local storage.

## Type Summary

Defined in `lib/types.ts`:

- `BrandProfile`
- `Campaign`
- `Influencer`
- `Offer`
- `Message`
- `ChecklistItem`
- `DemoAppState`

### `DemoAppState`

```ts
{
  brandProfile: BrandProfile | null;
  campaigns: Campaign[];
  influencers: Influencer[];
  offers: Offer[];
  activeCampaignId: string | null;
  seeded: boolean;
}
```

## Seed Data

`lib/storage.ts` seeds 20 influencers across niches and platforms with:

- follower counts
- engagement rates
- niche tags
- audience top geo
- estimated CPM
- sample posts

## State Write Model

All writes call `saveState(...)` in `lib/storage.ts`, which:

1. updates local storage
2. dispatches `demo-state-updated`

All clears call `resetState(...)`, which:

1. removes local storage key
2. dispatches `demo-state-updated`

`useDemoState` listens to:

- `demo-state-updated` (same-tab updates)
- `storage` (cross-tab updates)

## Deterministic ID Generation

`createId(prefix)` in `lib/storage.ts` creates short IDs like:

- `cmp-xxxxxxx`
- `off-xxxxxxx`
- `msg-xxxxxxx`

## Preprogrammed Business Logic

State transitions are centralized in `lib/demo-actions.ts`:

- `appendCampaign`
- `applySendOffers`
- `transitionOfferStatus`
- `appendOfferMessage`
- `toggleOfferChecklistItem`

This keeps pages thin and behavior testable.
