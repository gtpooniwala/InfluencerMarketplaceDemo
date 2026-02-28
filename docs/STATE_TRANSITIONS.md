# State Transition Reference

This document captures major state transitions in the frontend-only demo.

## Global State

Stored as `DemoAppState` in localStorage key `demoAppState`.

## Transition Matrix

### Landing

Action: `View Demo Flow`
- effect: create seeded state
- next route: `/brand/campaign/new`

Action: `I'm a Brand`
- effect: no write required
- next route: `/brand/onboarding`

### Onboarding

Action: `Save & Next: Campaign Setup`
- write: `brandProfile`
- next route: `/brand/campaign/new`

### Campaign Creation

Action: `Save & Next: Find Matches`
- write: append campaign with status `Draft`
- write: `activeCampaignId = newCampaignId`
- next route: `/brand/campaign/[id]/matches`

### Matches

Action: `Send Offers & Next`
- write: create/update `Offer[]` for selected influencers
- write: campaign status updated to `Active`
- write: `activeCampaignId = campaign.id`
- next route: `/brand/campaign/[id]/coord`

Action: `Next: Coordination`
- write: none
- next route: `/brand/campaign/[id]/coord`

### Coordination

Action: `Simulate Accept`
- write: target offer `status = Accepted`
- write: append influencer system message

Action: `Simulate Decline`
- write: target offer `status = Declined`
- write: append influencer system message

Action: `Simulate Deliverable Submitted`
- write: target offer `status = Delivered`
- write: append influencer system message

Action: send message
- write: append brand message to offer thread

Action: checklist toggle
- write: flip `ChecklistItem.done`

### Reset

Action: `Reset Demo`
- write: remove `demoAppState`
- next route: `/`

## Route Fallback Behavior

If route campaign ID is missing/stale/placeholder (`demo`):

1. resolve active campaign if available
2. else resolve latest campaign
3. redirect to canonical route if a valid campaign exists

This prevents dead-end routing when navigating from static links.
