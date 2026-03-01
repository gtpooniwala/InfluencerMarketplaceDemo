"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { isDemoMode } from "@/lib/demoMode";
import {
  AudienceType,
  BrandMemory,
  CampaignBrief,
  CampaignGoal,
  CampaignPlan,
  CampaignReport,
  CreatorRecommendation,
  IntakeAnswers,
  OutreachDraft,
  Positioning,
  brandMemory,
  buildCampaignPlan,
  buildInterpretation,
  buildOutreachDrafts,
  buildReportFromSelection,
  campaignBrief,
  campaignPlan,
  creators,
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
  intake: IntakeAnswers;
  brief: CampaignBrief;
  interpretation: string[];
  plan: CampaignPlan;
  creators: CreatorRecommendation[];
  selectedCreatorIds: string[];
  autoPersonalizeScripts: boolean;
  outreachDrafts: OutreachDraft[];
  timeline: TimelineState;
  report: CampaignReport;
};

type Updater = DemoFlowState | ((prev: DemoFlowState) => DemoFlowState);

type IntakeField = "launch" | "vibe" | "goal" | "audience";

const isBrowser = () => typeof window !== "undefined";

const defaultTimeline = (): TimelineState => ({
  outreachSent: false,
  repliesPending: false,
  shippingDeadline: false,
  contentReviewDue: false,
  followUpSent: false,
  snoozed: false
});

const buildBriefFromIntake = (intake: IntakeAnswers): CampaignBrief => {
  const objectiveByGoal: Record<CampaignGoal, string> = {
    Sales: "Drive attributable product sales from creator-led social placements.",
    Awareness: "Maximize qualified reach and attention in the core UK segment.",
    UGC: "Generate reusable creator content for paid + owned channels.",
    "Retail footfall": "Increase in-store visit intent with location-relevant creator proof."
  };

  return {
    ...campaignBrief,
    objective: objectiveByGoal[intake.goal],
    audience:
      intake.audience === "New audience"
        ? "New UK shoppers who prioritize comfortwear and peer recommendations."
        : "Existing customers ready for repeat purchase and referral.",
    deliverables: [...campaignBrief.deliverables]
  };
};

export const createDefaultDemoFlowState = (): DemoFlowState => {
  const baseIntake: IntakeAnswers = {
    launch: sampleContext.launch,
    vibe: sampleContext.vibe,
    goal: sampleContext.goal,
    audience: sampleContext.audience,
    contextSources: ["Sample context loaded"]
  };

  return {
    brandMemory: { ...brandMemory, assets: [...brandMemory.assets] },
    intake: baseIntake,
    brief: { ...campaignBrief, deliverables: [...campaignBrief.deliverables] },
    interpretation: buildInterpretation({
      positioning: baseIntake.vibe,
      audience: baseIntake.audience,
      goal: baseIntake.goal,
      launch: baseIntake.launch
    }),
    plan: campaignPlan,
    creators: creators,
    selectedCreatorIds: [],
    autoPersonalizeScripts: true,
    outreachDrafts: [],
    timeline: defaultTimeline(),
    report: buildReportFromSelection([])
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
    intake: candidate.intake ? { ...fallback.intake, ...candidate.intake } : fallback.intake,
    brief: candidate.brief
      ? {
          ...fallback.brief,
          ...candidate.brief,
          deliverables: candidate.brief.deliverables ?? fallback.brief.deliverables,
          advancedFilters: {
            ...fallback.brief.advancedFilters,
            ...(candidate.brief.advancedFilters ?? {})
          }
        }
      : fallback.brief,
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

export const applySampleContextToState = (state: DemoFlowState): DemoFlowState => {
  const nextIntake: IntakeAnswers = {
    launch: sampleContext.launch,
    vibe: sampleContext.vibe,
    goal: sampleContext.goal,
    audience: sampleContext.audience,
    contextSources: [
      "Canva link imported",
      "Pitch deck uploaded",
      "Meeting transcript uploaded",
      "Product images uploaded"
    ]
  };

  const nextBrief = buildBriefFromIntake(nextIntake);

  return {
    ...state,
    intake: nextIntake,
    brief: nextBrief,
    interpretation: buildInterpretation({
      positioning: nextIntake.vibe,
      audience: nextIntake.audience,
      goal: nextIntake.goal,
      launch: nextIntake.launch
    }),
    plan: buildCampaignPlan(nextIntake.vibe)
  };
};

export const applyGeneratePlanToState = (state: DemoFlowState): DemoFlowState => {
  const intake = isDemoMode
    ? {
        ...state.intake,
        launch: state.intake.launch || sampleContext.launch,
        contextSources:
          state.intake.contextSources.length > 0
            ? state.intake.contextSources
            : ["Sample context loaded"]
      }
    : state.intake;

  const nextBrief = buildBriefFromIntake(intake);
  return {
    ...state,
    intake,
    brief: nextBrief,
    interpretation: buildInterpretation({
      positioning: intake.vibe,
      audience: intake.audience,
      goal: intake.goal,
      launch: intake.launch
    }),
    plan: buildCampaignPlan(intake.vibe)
  };
};

export const applyToggleCreatorToState = (state: DemoFlowState, creatorId: string): DemoFlowState => {
  const selected = state.selectedCreatorIds.includes(creatorId)
    ? state.selectedCreatorIds.filter((id) => id !== creatorId)
    : [...state.selectedCreatorIds, creatorId];

  return {
    ...state,
    selectedCreatorIds: selected
  };
};

export const applyGenerateOutreachToState = (state: DemoFlowState): DemoFlowState => {
  const selectedCreators = state.creators.filter((creator) => state.selectedCreatorIds.includes(creator.id));
  const drafts = buildOutreachDrafts(selectedCreators, state.brief, {
    autoPersonalize: state.autoPersonalizeScripts
  });

  return {
    ...state,
    outreachDrafts: drafts
  };
};

export const applyMarkOutreachSentToState = (state: DemoFlowState): DemoFlowState => {
  const selectedCreators = state.creators.filter((creator) => state.selectedCreatorIds.includes(creator.id));
  return {
    ...state,
    timeline: {
      ...state.timeline,
      outreachSent: true,
      repliesPending: true
    },
    report: buildReportFromSelection(selectedCreators)
  };
};

export const applySendFollowUpToState = (state: DemoFlowState): DemoFlowState => ({
  ...state,
  timeline: {
    ...state.timeline,
    followUpSent: true,
    snoozed: false
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

  const applySampleContext = useCallback(() => {
    setDemoState((prev) => applySampleContextToState(prev));
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

  const generatePlan = useCallback(() => {
    setDemoState((prev) => applyGeneratePlanToState(prev));
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
      applySampleContext,
      setChatAnswer,
      addContextSource,
      generatePlan,
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
      toggleCreator
    ]
  );
};
