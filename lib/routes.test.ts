import { describe, expect, it } from "vitest";
import { getCampaignIdFromPath, resolveCampaignAwareHref } from "@/lib/routes";

describe("campaign route helpers", () => {
  it("extracts campaign id from dynamic campaign routes", () => {
    expect(getCampaignIdFromPath("/brand/campaign/cmp-123/matches")).toBe("cmp-123");
    expect(getCampaignIdFromPath("/brand/campaign/cmp-xyz/coord")).toBe("cmp-xyz");
  });

  it("returns null for non-dynamic campaign routes", () => {
    expect(getCampaignIdFromPath("/brand/campaign/new")).toBeNull();
    expect(getCampaignIdFromPath("/brand/onboarding")).toBeNull();
  });

  it("replaces demo placeholder with active campaign id", () => {
    expect(resolveCampaignAwareHref("/brand/campaign/demo/matches", "cmp-77")).toBe(
      "/brand/campaign/cmp-77/matches"
    );
    expect(resolveCampaignAwareHref("/brand/onboarding", "cmp-77")).toBe("/brand/onboarding");
  });
});
