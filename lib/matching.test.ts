import { describe, expect, it } from "vitest";
import { calculateFitScore, matchReasons } from "@/lib/matching";
import { Campaign, Influencer } from "@/lib/types";

const campaign: Campaign = {
  id: "cmp-abc",
  name: "Fitness Push",
  objective: "Drive trial signups",
  platforms: ["TikTok", "Instagram"],
  nicheTags: ["fitness", "wellness"],
  budget: 20000,
  timeline: "4 weeks",
  status: "Draft"
};

const strongFit: Influencer = {
  id: "inf-strong",
  name: "Strong Fit",
  handle: "@strongfit",
  platform: "TikTok",
  followers: 30000,
  engagementRate: 7.2,
  nicheTags: ["fitness", "wellness"],
  audienceGeoTop: "United States",
  estCPM: 20,
  verified: true,
  samplePosts: [
    { title: "Workout", description: "Tips" },
    { title: "Recovery", description: "Guide" }
  ]
};

const weakFit: Influencer = {
  ...strongFit,
  id: "inf-weak",
  platform: "YouTube",
  nicheTags: ["travel"],
  audienceGeoTop: "Spain",
  engagementRate: 3.4
};

describe("matching", () => {
  it("gives higher scores for better campaign alignment", () => {
    const high = calculateFitScore(campaign, strongFit, "United States");
    const low = calculateFitScore(campaign, weakFit, "United States");
    expect(high).toBeGreaterThan(low);
  });

  it("returns concise match reasons", () => {
    const reasons = matchReasons(campaign, strongFit, "United States");
    expect(reasons.length).toBeGreaterThan(0);
    expect(reasons.length).toBeLessThanOrEqual(3);
  });

  it("boosts score when target geography aligns", () => {
    const geoSensitiveFit: Influencer = {
      ...strongFit,
      nicheTags: ["fitness"],
      engagementRate: 1.2,
      estCPM: 30
    };
    const aligned = calculateFitScore(campaign, geoSensitiveFit, "United States");
    const misaligned = calculateFitScore(campaign, geoSensitiveFit, "Canada");
    expect(aligned).toBeGreaterThan(misaligned);
  });

  it("clamps score to configured bounds", () => {
    const floor = calculateFitScore(campaign, { ...weakFit, engagementRate: 0.1 }, "France");
    const ceiling = calculateFitScore(campaign, { ...strongFit, engagementRate: 20 }, "United States");
    expect(floor).toBeGreaterThanOrEqual(35);
    expect(ceiling).toBeLessThanOrEqual(98);
  });
});
