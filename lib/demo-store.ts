"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BrandProfile,
  Campaign,
  Contracts,
  Outreach,
  Performance,
  Selection,
  buildContractPreview,
  buildOutreachTemplate,
  demoBrandProfile,
  demoCampaign,
  demoPerformance
} from "@/lib/demo-data";

export const AGORA_STORAGE_KEY = "agora_demo_state";
export const AGORA_STATE_EVENT = "agora-demo-state-updated";

export type DemoState = {
  brandProfile: BrandProfile | null;
  campaign: Campaign | null;
  selection: Selection;
  outreach: Outreach;
  contracts: Contracts;
  performance: Performance;
};

type Updater = DemoState | ((prev: DemoState) => DemoState);

const emptySelection = (): Selection => ({ selectedCreatorIds: [] });

const emptyOutreach = (): Outreach => ({
  perCreatorStatus: {},
  generatedMessageTemplate: "",
  perCreatorMessages: {}
});

const emptyContracts = (): Contracts => ({
  perCreatorContractStatus: {},
  contractPreviewText: ""
});

export const createEmptyDemoState = (): DemoState => ({
  brandProfile: null,
  campaign: null,
  selection: emptySelection(),
  outreach: emptyOutreach(),
  contracts: emptyContracts(),
  performance: demoPerformance
});

export const createSeededDemoState = (): DemoState => ({
  brandProfile: demoBrandProfile,
  campaign: demoCampaign,
  selection: emptySelection(),
  outreach: {
    ...emptyOutreach(),
    generatedMessageTemplate: buildOutreachTemplate(demoBrandProfile, demoCampaign)
  },
  contracts: {
    ...emptyContracts(),
    contractPreviewText: buildContractPreview(demoBrandProfile, demoCampaign)
  },
  performance: demoPerformance
});

const isBrowser = () => typeof window !== "undefined";

const normalizeState = (raw: unknown): DemoState => {
  const fallback = createEmptyDemoState();
  if (!raw || typeof raw !== "object") return fallback;

  const candidate = raw as Partial<DemoState>;
  return {
    brandProfile: candidate.brandProfile ?? null,
    campaign: candidate.campaign ?? null,
    selection: candidate.selection ?? fallback.selection,
    outreach: {
      ...fallback.outreach,
      ...(candidate.outreach ?? {})
    },
    contracts: {
      ...fallback.contracts,
      ...(candidate.contracts ?? {})
    },
    performance: candidate.performance ?? fallback.performance
  };
};

export const loadDemoState = (): DemoState => {
  if (!isBrowser()) return createEmptyDemoState();

  const stored = window.localStorage.getItem(AGORA_STORAGE_KEY);
  if (!stored) return createEmptyDemoState();

  try {
    return normalizeState(JSON.parse(stored));
  } catch {
    return createEmptyDemoState();
  }
};

export const saveDemoState = (state: DemoState) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(AGORA_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(AGORA_STATE_EVENT));
};

export const resetDemoState = () => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(AGORA_STORAGE_KEY);
  window.dispatchEvent(new Event(AGORA_STATE_EVENT));
};

export const buildWorkspaceState = (base: DemoState, selectedCreatorIds: string[]) => {
  const normalizedIds = [...new Set(selectedCreatorIds)];
  const perCreatorStatus: Outreach["perCreatorStatus"] = {};
  const perCreatorContractStatus: Contracts["perCreatorContractStatus"] = {};

  for (const creatorId of normalizedIds) {
    perCreatorStatus[creatorId] = "invited";
    perCreatorContractStatus[creatorId] = "draft";
  }

  const brand = base.brandProfile ?? demoBrandProfile;
  const campaign = base.campaign ?? demoCampaign;

  return {
    ...base,
    selection: { selectedCreatorIds: normalizedIds },
    outreach: {
      ...base.outreach,
      perCreatorStatus,
      generatedMessageTemplate: buildOutreachTemplate(brand, campaign)
    },
    contracts: {
      ...base.contracts,
      perCreatorContractStatus,
      contractPreviewText: buildContractPreview(brand, campaign)
    }
  };
};

export const useDemoStore = () => {
  const [state, setState] = useState<DemoState>(() => createEmptyDemoState());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!isBrowser()) return;

    const refresh = () => setState(loadDemoState());
    refresh();
    setHydrated(true);

    window.addEventListener(AGORA_STATE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(AGORA_STATE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const setDemoState = useCallback((updater: Updater) => {
    setState((prev) => {
      const next = typeof updater === "function" ? (updater as (prev: DemoState) => DemoState)(prev) : updater;
      saveDemoState(next);
      return next;
    });
  }, []);

  const seedDemoState = useCallback(() => {
    const seeded = createSeededDemoState();
    saveDemoState(seeded);
    setState(seeded);
    return seeded;
  }, []);

  const clearDemoState = useCallback(() => {
    resetDemoState();
    setState(createEmptyDemoState());
  }, []);

  return useMemo(
    () => ({
      state,
      hydrated,
      setDemoState,
      seedDemoState,
      clearDemoState
    }),
    [clearDemoState, hydrated, seedDemoState, setDemoState, state]
  );
};
