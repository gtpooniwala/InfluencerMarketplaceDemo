import { Campaign, DemoAppState } from "@/lib/types";

export const getFallbackCampaign = (state: DemoAppState): Campaign | null => {
  if (state.activeCampaignId) {
    const active = state.campaigns.find((campaign) => campaign.id === state.activeCampaignId);
    if (active) return active;
  }

  return state.campaigns[state.campaigns.length - 1] ?? null;
};

export const getCampaignForRoute = (state: DemoAppState, routeCampaignId: string): Campaign | null => {
  const direct = state.campaigns.find((campaign) => campaign.id === routeCampaignId);
  if (direct) return direct;

  // Allow placeholder ids (e.g. /demo/) to resolve to a real campaign when available.
  if (routeCampaignId === "demo") {
    return getFallbackCampaign(state);
  }

  return null;
};

export const getActiveOrLatestCampaignId = (state: DemoAppState | null): string | null => {
  if (!state) return null;
  return getFallbackCampaign(state)?.id ?? null;
};
