import { describe, expect, it } from "vitest";
import { getActiveOrLatestCampaignId, getCampaignForRoute, getFallbackCampaign } from "@/lib/campaigns";
import { createEmptyState } from "@/lib/storage";
import { DemoAppState } from "@/lib/types";

const withCampaigns = (): DemoAppState => ({
  ...createEmptyState(),
  campaigns: [
    {
      id: "cmp-1",
      name: "Campaign One",
      objective: "Objective one",
      platforms: ["TikTok"],
      nicheTags: ["fitness"],
      budget: 5000,
      timeline: "2 weeks",
      status: "Draft"
    },
    {
      id: "cmp-2",
      name: "Campaign Two",
      objective: "Objective two",
      platforms: ["Instagram"],
      nicheTags: ["beauty"],
      budget: 8000,
      timeline: "3 weeks",
      status: "Active"
    }
  ],
  activeCampaignId: "cmp-2"
});

describe("campaign helpers", () => {
  it("returns active campaign as fallback", () => {
    const state = withCampaigns();
    expect(getFallbackCampaign(state)?.id).toBe("cmp-2");
  });

  it("resolves demo route to fallback campaign", () => {
    const state = withCampaigns();
    expect(getCampaignForRoute(state, "demo")?.id).toBe("cmp-2");
  });

  it("resolves exact campaign route id", () => {
    const state = withCampaigns();
    expect(getCampaignForRoute(state, "cmp-1")?.id).toBe("cmp-1");
  });

  it("returns latest campaign id when active id missing", () => {
    const state = { ...withCampaigns(), activeCampaignId: null };
    expect(getActiveOrLatestCampaignId(state)?.startsWith("cmp-")).toBe(true);
    expect(getActiveOrLatestCampaignId(state)).toBe("cmp-2");
  });
});
