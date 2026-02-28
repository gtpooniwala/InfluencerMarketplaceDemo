# Demo Script (60-90 seconds)

Use this script for hackathon judging demos.

## Goal

Show the complete brand workflow from onboarding to coordination without backend dependencies.

## Script

1. Landing (`/`)
- Click `I'm a Brand`.
- Say: "This is a frontend-only simulation of the brand side of a micro-influencer marketplace."

2. Onboarding (`/brand/onboarding`)
- Enter company details.
- Click `Save & Next: Campaign Setup`.
- Say: "Brand profile is persisted locally and reused across the flow."

3. Campaign Creation (`/brand/campaign/new`)
- Set objective, tags, and budget.
- Click `Save & Next: Find Matches`.
- Say: "A campaign record is created and routed into matching."

4. Matches (`/brand/campaign/[id]/matches`)
- Show fit scores + reasons.
- Apply one filter (for example platform).
- Select 2 influencers.
- Click `Send Offers & Next`.
- Say: "Ranking and reasons are deterministic and preprogrammed for demo reliability."

5. Coordination (`/brand/campaign/[id]/coord`)
- Click `Simulate Accept`.
- Send one message.
- Toggle one checklist item.
- Say: "Offer state transitions, messaging, and deliverables are simulated and persisted locally."

6. Reset
- Click `Reset Demo` in header.
- Say: "Reset clears local state and returns to landing for repeated demos."

## Backup Path

If you need a fast skip path from landing, click `View Demo Flow` to preload demo state.
