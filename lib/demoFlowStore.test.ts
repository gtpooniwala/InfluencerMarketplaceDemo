import { describe, expect, it } from "vitest";
import {
  applyAdvanceTimelineToState,
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

  it("applies sample context and updates context sources", () => {
    const base = createDefaultDemoFlowState();
    const next = applySampleContextToState({
      ...base,
      intake: {
        ...base.intake,
        contextSources: []
      }
    });

    expect(next.intake.contextSources.length).toBeGreaterThan(0);
    expect(next.plan.predictions.reach.length).toBeGreaterThan(0);
  });

  it("generates plan from intake without randomization", () => {
    const base = createDefaultDemoFlowState();
    const next = applyGeneratePlanToState({
      ...base,
      intake: {
        ...base.intake,
        vibe: "Bold",
        goal: "Awareness"
      }
    });

    expect(next.plan.messagingPillars.length).toBe(3);
    expect(next.interpretation.length).toBeGreaterThanOrEqual(3);
  });

  it("toggles creator selection and generates outreach", () => {
    const base = createDefaultDemoFlowState();
    const selectedOnce = applyToggleCreatorToState(base, base.creators[0].id);
    const selectedTwice = applyToggleCreatorToState(selectedOnce, base.creators[1].id);
    const withDrafts = applyGenerateOutreachToState(selectedTwice);

    expect(selectedTwice.selectedCreatorIds).toHaveLength(2);
    expect(withDrafts.outreachDrafts).toHaveLength(2);
  });

  it("marks outreach sent, follow-up, and timeline progression", () => {
    const base = createDefaultDemoFlowState();
    const selected = applyToggleCreatorToState(base, base.creators[0].id);
    const sent = applyMarkOutreachSentToState(selected);
    const followUp = applySendFollowUpToState(sent);
    const advanced = applyAdvanceTimelineToState(followUp, "contentReviewDue");

    expect(sent.timeline.outreachSent).toBe(true);
    expect(followUp.timeline.followUpSent).toBe(true);
    expect(advanced.timeline.contentReviewDue).toBe(true);
  });
});
