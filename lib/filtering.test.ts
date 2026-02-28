import { describe, expect, it } from "vitest";
import { influencerMatchesFilters, inFollowerRange } from "@/lib/filtering";
import { Influencer } from "@/lib/types";

const influencer: Influencer = {
  id: "inf-x",
  name: "Test Creator",
  handle: "@test",
  platform: "Instagram",
  followers: 32000,
  engagementRate: 5.4,
  nicheTags: ["fitness", "wellness"],
  audienceGeoTop: "United States",
  estCPM: 20,
  verified: false,
  samplePosts: [
    { title: "Post 1", description: "Desc" },
    { title: "Post 2", description: "Desc" }
  ]
};

describe("filtering helpers", () => {
  it("applies follower range boundaries", () => {
    expect(inFollowerRange(10000, "10-30")).toBe(true);
    expect(inFollowerRange(30000, "10-30")).toBe(true);
    expect(inFollowerRange(30001, "10-30")).toBe(false);
    expect(inFollowerRange(50000, "30-50")).toBe(true);
    expect(inFollowerRange(50001, "30-50")).toBe(false);
    expect(inFollowerRange(50001, "50+")).toBe(true);
  });

  it("matches creators across combined filters", () => {
    expect(
      influencerMatchesFilters(influencer, {
        platform: "Instagram",
        tag: "fitness",
        geo: "United States",
        followerRange: "30-50"
      })
    ).toBe(true);

    expect(
      influencerMatchesFilters(influencer, {
        platform: "TikTok",
        tag: "fitness",
        geo: "United States",
        followerRange: "30-50"
      })
    ).toBe(false);
  });
});
