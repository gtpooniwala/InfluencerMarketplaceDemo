import { Campaign, Influencer } from "@/lib/types";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const calculateFitScore = (campaign: Campaign, influencer: Influencer, targetGeo?: string) => {
  const tagOverlap = influencer.nicheTags.filter((tag) => campaign.nicheTags.includes(tag)).length;
  const geoMatch = targetGeo && (targetGeo === "Global" || targetGeo === influencer.audienceGeoTop) ? 16 : 0;
  const budgetAlignment = campaign.budget >= influencer.estCPM * 1000 ? 1 : 0;
  const platformBoost = campaign.platforms.includes(influencer.platform) ? 1 : 0;

  const raw =
    tagOverlap * 22 +
    platformBoost * 20 +
    budgetAlignment * 12 +
    Math.round(influencer.engagementRate * 3) +
    geoMatch;
  return clamp(raw, 35, 98);
};

export const matchReasons = (campaign: Campaign, influencer: Influencer, targetGeo?: string) => {
  const reasons: string[] = [];
  const sharedTags = influencer.nicheTags.filter((tag) => campaign.nicheTags.includes(tag));

  if (sharedTags.length) {
    reasons.push(`Shared audience interest: ${sharedTags.slice(0, 2).join(", ")}`);
  }
  if (campaign.platforms.includes(influencer.platform)) {
    reasons.push(`Strong ${influencer.platform} presence for this campaign format`);
  }
  if (campaign.budget >= influencer.estCPM * 1000) {
    reasons.push("Budget fit supports full deliverables package");
  }
  if (targetGeo && (targetGeo === "Global" || targetGeo === influencer.audienceGeoTop)) {
    reasons.push(`Audience concentration aligns with target geo (${influencer.audienceGeoTop})`);
  }
  reasons.push(`Above-average engagement at ${influencer.engagementRate.toFixed(1)}%`);

  return reasons.slice(0, 3);
};
