import { Influencer } from "@/lib/types";

export type MatchFilters = {
  platform: string;
  tag: string;
  geo: string;
  followerRange: string;
};

export const inFollowerRange = (followers: number, range: string) => {
  if (range === "10-30") return followers >= 10000 && followers <= 30000;
  if (range === "30-50") return followers > 30000 && followers <= 50000;
  if (range === "50+") return followers > 50000;
  return true;
};

export const influencerMatchesFilters = (influencer: Influencer, filters: MatchFilters) => {
  if (filters.platform !== "all" && influencer.platform !== filters.platform) return false;
  if (filters.tag !== "all" && !influencer.nicheTags.includes(filters.tag)) return false;
  if (filters.geo !== "all" && influencer.audienceGeoTop !== filters.geo) return false;
  if (!inFollowerRange(influencer.followers, filters.followerRange)) return false;
  return true;
};
