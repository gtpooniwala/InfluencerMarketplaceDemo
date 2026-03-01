"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BrandBrief,
  BrandMemory,
  CampaignBrief,
  CampaignPlan,
  CampaignReport,
  CreatorRecommendation,
  IntakeAnswers,
  OutreachDraft,
  baseReport,
  brandMemory,
  buildBrandBrief,
  buildCampaignBriefFromIntake,
  buildCampaignPlan,
  buildInterpretation,
  buildOutreachDrafts,
  buildReportFromSelection,
  creators,
  emptyCampaignBrief,
  sampleContext
} from "@/lib/mockData";

export const DEMO_FLOW_STORAGE_KEY = "ai_campaign_operator_state_v1";
export const DEMO_FLOW_EVENT = "ai-campaign-operator-state-updated";

export type TimelineState = {
  outreachSent: boolean;
  repliesPending: boolean;
  shippingDeadline: boolean;
  contentReviewDue: boolean;
  followUpSent: boolean;
  snoozed: boolean;
};

export type DemoFlowState = {
  brandMemory: BrandMemory;
  brandBrief: BrandBrief | null;
  intake: IntakeAnswers;
  brief: CampaignBrief;
  briefGenerated: boolean;
  interpretation: string[];
  plan: CampaignPlan | null;
  creators: CreatorRecommendation[];
  selectedCreatorIds: string[];
  autoPersonalizeScripts: boolean;
  outreachDrafts: OutreachDraft[];
  timeline: TimelineState;
  report: CampaignReport;
};

type Updater = DemoFlowState | ((prev: DemoFlowState) => DemoFlowState);
type IntakeField = "launchType" | "successGoal" | "audienceType" | "vibe";

const isBrowser = () => typeof window !== "undefined";

const defaultTimeline = (): TimelineState => ({
  outreachSent: false,
  repliesPending: false,
  shippingDeadline: false,
  contentReviewDue: false,
  followUpSent: false,
  snoozed: false
});

export const createDefaultDemoFlowState = (): DemoFlowState => {
  const intake: IntakeAnswers = {
    launchType: sampleContext.launchType,
    successGoal: sampleContext.successGoal,
    audienceType: sampleContext.audienceType,
    vibe: sampleContext.vibe,
    contextSources: []
  };

  return {
    brandMemory: { ...brandMemory, assets: [...brandMemory.assets] },
    brandBrief: null,
    intake,
    brief: emptyCampaignBrief(),
    briefGenerated: false,
    interpretation: [],
    plan: null,
    creators,
    selectedCreatorIds: [],
    autoPersonalizeScripts: true,
    outreachDrafts: [],
    timeline: defaultTimeline(),
    report: baseReport
  };
};

export const normalizeDemoFlowState = (raw: unknown): DemoFlowState => {
  const fallback = createDefaultDemoFlowState();
  if (!raw || typeof raw !== "object") return fallback;

  const candidate = raw as Partial<DemoFlowState>;

  return {
    brandMemory: candidate.brandMemory
      ? {
          ...fallback.brandMemory,
          ...candidate.brandMemory,
          assets: candidate.brandMemory.assets ?? fallback.brandMemory.assets
        }
      : fallback.brandMemory,
    brandBrief: candidate.brandBrief ?? fallback.brandBrief,
    intake: candidate.intake ? { ...fallback.intake, ...candidate.intake } : fallback.intake,
    brief: candidate.brief
      ? {
          ...fallback.brief,
          ...candidate.brief,
          advancedControls: {
            ...fallback.brief.advancedControls,
            ...(candidate.brief.advancedControls ?? {})
          }
        }
      : fallback.brief,
    briefGenerated: candidate.briefGenerated ?? fallback.briefGenerated,
    interpretation: candidate.interpretation ?? fallback.interpretation,
    plan: candidate.plan ?? fallback.plan,
    creators: candidate.creators ?? fallback.creators,
    selectedCreatorIds: candidate.selectedCreatorIds ?? fallback.selectedCreatorIds,
    autoPersonalizeScripts: candidate.autoPersonalizeScripts ?? fallback.autoPersonalizeScripts,
    outreachDrafts: candidate.outreachDrafts ?? fallback.outreachDrafts,
    timeline: candidate.timeline ? { ...fallback.timeline, ...candidate.timeline } : fallback.timeline,
    report: candidate.report ?? fallback.report
  };
};

export const applyGenerateBrandBriefToState = (state: DemoFlowState): DemoFlowState => ({
  ...state,
  brandBrief: buildBrandBrief(state.brandMemory)
});

export const applySampleContextToState = (state: DemoFlowState): DemoFlowState => {
  const intake: IntakeAnswers = {
    launchType: sampleContext.launchType,
    successGoal: sampleContext.successGoal,
    audienceType: sampleContext.audienceType,
    vibe: sampleContext.vibe,
    contextSources: [...sampleContext.contextSources]
  };

  const brief = buildCampaignBriefFromIntake(intake, state.brandMemory);
  const plan = buildCampaignPlan(brief, intake.vibe);

  return {
    ...state,
    intake,
    brief,
    briefGenerated: false,
    interpretation: buildInterpretation(brief, plan)
  };
};

export const applyGenerateBriefToState = (state: DemoFlowState): DemoFlowState => {
  const brief = buildCampaignBriefFromIntake(state.intake, state.brandMemory);
  const plan = buildCampaignPlan(brief, state.intake.vibe);

  return {
    ...state,
    brief,
    briefGenerated: true,
    interpretation: buildInterpretation(brief, plan)
  };
};

export const applyGeneratePlanToState = (state: DemoFlowState): DemoFlowState => {
  const sourceBrief = state.briefGenerated ? state.brief : buildCampaignBriefFromIntake(state.intake, state.brandMemory);
  const plan = buildCampaignPlan(sourceBrief, state.intake.vibe);

  return {
    ...state,
    brief: sourceBrief,
    briefGenerated: true,
    plan,
    interpretation: buildInterpretation(sourceBrief, plan)
  };
};

export const applyToggleCreatorToState = (state: DemoFlowState, creatorId: string): DemoFlowState => {
  const next = state.selectedCreatorIds.includes(creatorId)
    ? state.selectedCreatorIds.filter((id) => id !== creatorId)
    : [...state.selectedCreatorIds, creatorId];

  return {
    ...state,
    selectedCreatorIds: next
  };
};

export const applyGenerateOutreachToState = (state: DemoFlowState): DemoFlowState => {
  const selectedCreators = state.creators.filter((creator) => state.selectedCreatorIds.includes(creator.id));

  return {
    ...state,
    outreachDrafts: buildOutreachDrafts(selectedCreators, state.brief, {
      autoPersonalize: state.autoPersonalizeScripts
    })
  };
};

export const applyMarkOutreachSentToState = (state: DemoFlowState): DemoFlowState => {
  const selectedCreators = state.creators.filter((creator) => state.selectedCreatorIds.includes(creator.id));
  return {
    ...state,
    timeline: {
      ...state.timeline,
      outreachSent: true,
      repliesPending: true,
      shippingDeadline: true
    },
    report: buildReportFromSelection(selectedCreators)
  };
};

export const applySendFollowUpToState = (state: DemoFlowState): DemoFlowState => ({
  ...state,
  timeline: {
    ...state.timeline,
    followUpSent: true,
    snoozed: false,
    contentReviewDue: true
  }
});

export const applySnoozeFollowUpToState = (state: DemoFlowState): DemoFlowState => ({
  ...state,
  timeline: {
    ...state.timeline,
    snoozed: true
  }
});

export const applyAdvanceTimelineToState = (
  state: DemoFlowState,
  step: "repliesPending" | "shippingDeadline" | "contentReviewDue"
): DemoFlowState => ({
  ...state,
  timeline: {
    ...state.timeline,
    [step]: true
  }
});

export const loadDemoFlowState = (): DemoFlowState => {
  if (!isBrowser()) return createDefaultDemoFlowState();

  const raw = window.localStorage.getItem(DEMO_FLOW_STORAGE_KEY);
  if (!raw) return createDefaultDemoFlowState();

  try {
    return normalizeDemoFlowState(JSON.parse(raw));
  } catch {
    return createDefaultDemoFlowState();
  }
};

export const saveDemoFlowState = (state: DemoFlowState) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(DEMO_FLOW_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(DEMO_FLOW_EVENT));
};

export const resetDemoFlowState = () => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(DEMO_FLOW_STORAGE_KEY);
  window.dispatchEvent(new Event(DEMO_FLOW_EVENT));
};

export const useDemoFlowStore = () => {
  const [state, setState] = useState<DemoFlowState>(() => createDefaultDemoFlowState());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!isBrowser()) return;
    const refresh = () => setState(loadDemoFlowState());
    refresh();
    setHydrated(true);

    window.addEventListener(DEMO_FLOW_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(DEMO_FLOW_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const setDemoState = useCallback((updater: Updater) => {
    setState((prev) => {
      const next = typeof updater === "function" ? (updater as (prev: DemoFlowState) => DemoFlowState)(prev) : updater;
      saveDemoFlowState(next);
      return next;
    });
  }, []);

  const setBrandMemory = useCallback((next: BrandMemory) => {
    setDemoState((prev) => ({
      ...prev,
      brandMemory: {
        ...next,
        assets: [...next.assets]
      }
    }));
  }, [setDemoState]);

  const generateBrandBrief = useCallback(() => {
    setDemoState((prev) => applyGenerateBrandBriefToState(prev));
  }, [setDemoState]);

  const setChatAnswer = useCallback(
    <K extends IntakeField>(field: K, value: IntakeAnswers[K]) => {
      setDemoState((prev) => ({
        ...prev,
        intake: {
          ...prev.intake,
          [field]: value
        }
      }));
    },
    [setDemoState]
  );

  const addContextSource = useCallback((source: string) => {
    setDemoState((prev) => ({
      ...prev,
      intake: {
        ...prev.intake,
        contextSources: prev.intake.contextSources.includes(source)
          ? prev.intake.contextSources
          : [...prev.intake.contextSources, source]
      }
    }));
  }, [setDemoState]);

  const applySampleContext = useCallback(() => {
    setDemoState((prev) => applySampleContextToState(prev));
  }, [setDemoState]);

  const generateBrief = useCallback(() => {
    setDemoState((prev) => applyGenerateBriefToState(prev));
  }, [setDemoState]);

  const generatePlan = useCallback(() => {
    setDemoState((prev) => applyGeneratePlanToState(prev));
  }, [setDemoState]);

  const updateBriefField = useCallback((field: keyof CampaignBrief, value: string) => {
    setDemoState((prev) => {
      if (field === "advancedControls") return prev;
      return {
        ...prev,
        brief: {
          ...prev.brief,
          [field]: value
        }
      };
    });
  }, [setDemoState]);

  const updateAdvancedBriefField = useCallback((field: keyof CampaignBrief["advancedControls"], value: string) => {
    setDemoState((prev) => ({
      ...prev,
      brief: {
        ...prev.brief,
        advancedControls: {
          ...prev.brief.advancedControls,
          [field]: value
        }
      }
    }));
  }, [setDemoState]);

  const toggleCreator = useCallback((creatorId: string) => {
    setDemoState((prev) => applyToggleCreatorToState(prev, creatorId));
  }, [setDemoState]);

  const setAutoPersonalize = useCallback((enabled: boolean) => {
    setDemoState((prev) => ({ ...prev, autoPersonalizeScripts: enabled }));
  }, [setDemoState]);

  const generateOutreach = useCallback(() => {
    setDemoState((prev) => applyGenerateOutreachToState(prev));
  }, [setDemoState]);

  const markOutreachSent = useCallback(() => {
    setDemoState((prev) => applyMarkOutreachSentToState(prev));
  }, [setDemoState]);

  const sendFollowUp = useCallback(() => {
    setDemoState((prev) => applySendFollowUpToState(prev));
  }, [setDemoState]);

  const snoozeFollowUp = useCallback(() => {
    setDemoState((prev) => applySnoozeFollowUpToState(prev));
  }, [setDemoState]);

  const advanceTimeline = useCallback((step: "repliesPending" | "shippingDeadline" | "contentReviewDue") => {
    setDemoState((prev) => applyAdvanceTimelineToState(prev, step));
  }, [setDemoState]);

  const resetFlow = useCallback(() => {
    resetDemoFlowState();
    setState(createDefaultDemoFlowState());
  }, []);

  return useMemo(
    () => ({
      state,
      hydrated,
      setDemoState,
      setBrandMemory,
      generateBrandBrief,
      setChatAnswer,
      addContextSource,
      applySampleContext,
      generateBrief,
      generatePlan,
      updateBriefField,
      updateAdvancedBriefField,
      toggleCreator,
      setAutoPersonalize,
      generateOutreach,
      markOutreachSent,
      sendFollowUp,
      snoozeFollowUp,
      advanceTimeline,
      resetFlow
    }),
    [
      addContextSource,
      advanceTimeline,
      applySampleContext,
      generateBrief,
      generateBrandBrief,
      generateOutreach,
      generatePlan,
      hydrated,
      markOutreachSent,
      resetFlow,
      sendFollowUp,
      setAutoPersonalize,
      setBrandMemory,
      setChatAnswer,
      setDemoState,
      snoozeFollowUp,
      state,
      toggleCreator,
      updateAdvancedBriefField,
      updateBriefField
    ]
  );
};
