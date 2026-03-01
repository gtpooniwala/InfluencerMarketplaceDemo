import { describe, expect, it } from "vitest";
import {
  brandMemory,
  buildBrandBrief,
  buildCampaignBriefFromIntake,
  buildCampaignPlan,
  buildOutreachDrafts,
  buildReportFromSelection,
  creators,
  sampleContext
} from "@/lib/mockData";

describe("mockData deterministic behavior", () => {
  it("caps creator list to six entries", () => {
    expect(creators.length).toBeLessThanOrEqual(6);
  });

  it("builds deterministic brand brief", () => {
    const first = buildBrandBrief(brandMemory);
    const second = buildBrandBrief(brandMemory);
    expect(first).toEqual(second);
    expect(first.doGuidelines.length).toBeGreaterThan(0);
  });

  it("builds deterministic campaign brief and plan", () => {
    const intake = {
      launchType: sampleContext.launchType,
      successGoal: sampleContext.successGoal,
      audienceType: sampleContext.audienceType,
      vibe: sampleContext.vibe,
      contextSources: [...sampleContext.contextSources]
    };

    const briefA = buildCampaignBriefFromIntake(intake, brandMemory);
    const briefB = buildCampaignBriefFromIntake(intake, brandMemory);
    expect(briefA).toEqual(briefB);

    const planA = buildCampaignPlan(briefA, intake.vibe);
    const planB = buildCampaignPlan(briefA, intake.vibe);
    expect(planA).toEqual(planB);
    expect(planA.messagingPillars).toHaveLength(3);
  });

  it("generates stable outreach drafts and report", () => {
    const selected = creators.slice(0, 3);
    const brief = buildCampaignBriefFromIntake(
      {
        launchType: sampleContext.launchType,
        successGoal: sampleContext.successGoal,
        audienceType: sampleContext.audienceType,
        vibe: sampleContext.vibe,
        contextSources: [...sampleContext.contextSources]
      },
      brandMemory
    );

    const draftsA = buildOutreachDrafts(selected, brief, { autoPersonalize: true });
    const draftsB = buildOutreachDrafts(selected, brief, { autoPersonalize: true });
    expect(draftsA).toEqual(draftsB);

    const reportA = buildReportFromSelection(selected);
    const reportB = buildReportFromSelection(selected);
    expect(reportA).toEqual(reportB);
    expect(reportA.creatorComparison).toHaveLength(3);
  });
});
