import { describe, expect, it } from "vitest";
import {
  appendCampaign,
  appendOfferMessage,
  applySendOffers,
  toggleOfferChecklistItem,
  transitionOfferStatus
} from "@/lib/demo-actions";
import { createEmptyState } from "@/lib/storage";
import { DemoAppState } from "@/lib/types";

const withCampaign = (): DemoAppState => ({
  ...createEmptyState(),
  campaigns: [
    {
      id: "cmp-1",
      name: "Seed Campaign",
      objective: "Test flow",
      platforms: ["TikTok"],
      nicheTags: ["fitness"],
      budget: 12000,
      timeline: "4 weeks",
      status: "Draft"
    }
  ],
  activeCampaignId: "cmp-1"
});

describe("demo actions", () => {
  it("appends a campaign and sets it active", () => {
    const state = createEmptyState();
    const result = appendCampaign(state, {
      name: "New Campaign",
      objective: "Grow awareness",
      platforms: ["Instagram"],
      nicheTags: ["beauty"],
      budget: 9000,
      timeline: "3 weeks"
    });

    expect(result.campaignId.startsWith("cmp-")).toBe(true);
    expect(result.state.campaigns).toHaveLength(1);
    expect(result.state.activeCampaignId).toBe(result.campaignId);
  });

  it("creates offers and does not duplicate existing campaign+influencer offers", () => {
    const state = withCampaign();
    const firstPass = applySendOffers(state, "cmp-1", ["inf-001", "inf-002"]);
    expect(firstPass.offers).toHaveLength(2);
    expect(firstPass.campaigns[0].status).toBe("Active");

    const secondPass = applySendOffers(firstPass, "cmp-1", ["inf-001"]);
    expect(secondPass.offers).toHaveLength(2);
    expect(secondPass.offers.find((offer) => offer.influencerId === "inf-001")?.status).toBe("Sent");
  });

  it("transitions offer status and appends influencer system message", () => {
    const state = applySendOffers(withCampaign(), "cmp-1", ["inf-001"]);
    const targetOffer = state.offers[0];
    const next = transitionOfferStatus(state, targetOffer.id, "Accepted");

    const updated = next.offers.find((offer) => offer.id === targetOffer.id);
    expect(updated?.status).toBe("Accepted");
    expect(updated?.messages[updated.messages.length - 1].sender).toBe("Influencer");
  });

  it("appends a brand message and toggles checklist items", () => {
    const state = applySendOffers(withCampaign(), "cmp-1", ["inf-001"]);
    const offer = state.offers[0];

    const withMessage = appendOfferMessage(state, offer.id, "Brand", "  Please share draft copy by Friday.  ");
    const updatedOffer = withMessage.offers.find((item) => item.id === offer.id);
    expect(updatedOffer?.messages[updatedOffer.messages.length - 1].text).toBe("Please share draft copy by Friday.");

    const checklistId = updatedOffer?.checklist[0].id;
    expect(checklistId).toBeDefined();

    const toggled = toggleOfferChecklistItem(withMessage, offer.id, checklistId ?? "");
    const toggledItem = toggled.offers.find((item) => item.id === offer.id)?.checklist[0];
    expect(toggledItem?.done).toBe(true);
  });
});
