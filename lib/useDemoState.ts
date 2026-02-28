"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createEmptyState, DEMO_STATE_EVENT, loadState, resetState, saveState } from "@/lib/storage";
import { DemoAppState } from "@/lib/types";

type Updater = DemoAppState | ((prev: DemoAppState) => DemoAppState);

export const useDemoState = () => {
  const [state, setState] = useState<DemoAppState | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setState(loadState());
    };

    refresh();
    setHydrated(true);

    window.addEventListener(DEMO_STATE_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(DEMO_STATE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const updateState = useCallback((updater: Updater) => {
    setState((prev) => {
      const base = prev ?? createEmptyState();
      const next = typeof updater === "function" ? (updater as (prev: DemoAppState) => DemoAppState)(base) : updater;
      saveState(next);
      return next;
    });
  }, []);

  const seedFreshState = useCallback(() => {
    const seeded = createEmptyState();
    saveState(seeded);
    setState(seeded);
  }, []);

  const clearState = useCallback(() => {
    resetState();
    setState(null);
  }, []);

  return useMemo(
    () => ({
      state,
      hydrated,
      hasState: Boolean(state),
      updateState,
      seedFreshState,
      clearState
    }),
    [clearState, hydrated, seedFreshState, state, updateState]
  );
};
