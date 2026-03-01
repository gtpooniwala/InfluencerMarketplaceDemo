import { describe, expect, it } from "vitest";
import {
  applyGenerateBrandBriefToState,
  applyGenerateBriefToState,
  applyGenerateOutreachToState,
  applyGeneratePlanToState,
  applyMarkOutreachSentToState,
  applySampleContextToState,
  applySendFollowUpToState,
  applyToggleCreatorToState,
  createDefaultDemoFlowState,
  normalizeDemoFlowState
} from "@/lib/demoFlowStore";

describe("demoFlowStore transitions", () => {
  it("normalizes invalid state to fallback", () => {
    const fallback = createDefaultDemoFlowState();
    const normalized = normalizeDemoFlowState(null);

    expect(normalized.brandMemory.brandName).toBe(fallback.brandMemory.brandName);
    expect(normalized.creators.length).toBe(fallback.creators.length);
  });

  it("generates brand brief from brand memory", () => {
    const base = createDefaultDemoFlowState();
    const next = applyGenerateBrandBriefToState(base);
    expect(next.brandBrief).not.toBeNull();
    expect(next.brandBrief?.toneTags.length).toBeGreaterThan(0);
  });

  it("applies sample context and generates brief", () => {
    const base = createDefaultDemoFlowState();
    const sampled = applySampleContextToState(base);

    expect(sampled.intake.contextSources.length).toBeGreaterThan(0);
    expect(sampled.briefGenerated).toBe(true);

    const generated = applyGenerateBriefToState(base);
    expect(generated.brief.campaignName.length).toBeGreaterThan(0);
  });

  it("generates plan, outreach and selection transitions", () => {
    const base = applyGeneratePlanToState(createDefaultDemoFlowState());
    const selectedOnce = applyToggleCreatorToState(base, base.creators[0].id);
    const selectedTwice = applyToggleCreatorToState(selectedOnce, base.creators[1].id);
    const withDrafts = applyGenerateOutreachToState(selectedTwice);

    expect(base.plan).not.toBeNull();
    expect(selectedTwice.selectedCreatorIds).toHaveLength(2);
    expect(withDrafts.outreachDrafts).toHaveLength(2);
  });

  it("marks outreach sent and follow-up", () => {
    const base = applyGeneratePlanToState(createDefaultDemoFlowState());
    const selected = applyToggleCreatorToState(base, base.creators[0].id);
    const sent = applyMarkOutreachSentToState(selected);
    const followUp = applySendFollowUpToState(sent);

    expect(sent.timeline.outreachSent).toBe(true);
    expect(followUp.timeline.followUpSent).toBe(true);
    expect(followUp.report.metrics.reach.length).toBeGreaterThan(0);
  });
});
