import { describe, expect, it } from "vitest";
import { createDefaultChecklist, createEmptyState, createOfferDraft } from "@/lib/storage";

describe("storage factories", () => {
  it("creates seeded state with 20 influencers", () => {
    const state = createEmptyState();
    expect(state.influencers).toHaveLength(20);
    expect(state.seeded).toBe(true);
  });

  it("creates checklist with default deliverables", () => {
    const checklist = createDefaultChecklist();
    expect(checklist).toHaveLength(3);
    expect(checklist.every((item) => item.done === false)).toBe(true);
  });

  it("creates offers in sent state", () => {
    const offer = createOfferDraft("cmp-1", "inf-1", 1200);
    expect(offer.campaignId).toBe("cmp-1");
    expect(offer.influencerId).toBe("inf-1");
    expect(offer.amount).toBe(1200);
    expect(offer.status).toBe("Sent");
    expect(offer.messages.length).toBeGreaterThan(0);
  });
});
