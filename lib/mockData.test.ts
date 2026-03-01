import { describe, expect, it } from "vitest";
import {
  buildInterpretation,
  buildOutreachDrafts,
  buildReportFromSelection,
  campaignBrief,
  creators
} from "@/lib/mockData";

describe("mockData deterministic behavior", () => {
  it("caps creator list to six entries", () => {
    expect(creators.length).toBeLessThanOrEqual(6);
  });

  it("builds deterministic interpretation bullets", () => {
    const first = buildInterpretation({
      positioning: "Playful",
      audience: "New audience",
      goal: "Sales",
      launch: "Bamboo maternity leggings"
    });
    const second = buildInterpretation({
      positioning: "Playful",
      audience: "New audience",
      goal: "Sales",
      launch: "Bamboo maternity leggings"
    });

    expect(first).toEqual(second);
    expect(first.length).toBeGreaterThanOrEqual(3);
  });

  it("generates stable outreach drafts for selected creators", () => {
    const selected = creators.slice(0, 3);
    const first = buildOutreachDrafts(selected, campaignBrief, { autoPersonalize: true });
    const second = buildOutreachDrafts(selected, campaignBrief, { autoPersonalize: true });

    expect(first).toEqual(second);
    expect(first).toHaveLength(3);
    expect(first[0].message).toContain(selected[0].name);
  });

  it("builds deterministic report from selection", () => {
    const selected = creators.slice(0, 3);
    const reportA = buildReportFromSelection(selected);
    const reportB = buildReportFromSelection(selected);

    expect(reportA).toEqual(reportB);
    expect(reportA.creatorComparison).toHaveLength(3);
  });
});
