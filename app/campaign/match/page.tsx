"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CreatorDetails } from "@/components/CreatorDetails";
import { CreatorTile } from "@/components/CreatorTile";
import { InterpretationBox } from "@/components/InterpretationBox";
import { OutreachReviewModal } from "@/components/OutreachReviewModal";
import { useToast } from "@/components/toast-provider";
import { useDemoFlowStore } from "@/lib/demoFlowStore";

export default function CampaignMatchPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const {
    state,
    toggleCreator,
    setAutoPersonalize,
    generateOutreach,
    markOutreachSent,
    advanceTimeline
  } = useDemoFlowStore();

  const [activeCreatorId, setActiveCreatorId] = useState<string | null>(state.creators[0]?.id ?? null);
  const [showOutreachReview, setShowOutreachReview] = useState(false);

  const selectedCount = state.selectedCreatorIds.length;
  const activeCreator = state.creators.find((creator) => creator.id === activeCreatorId) ?? null;

  const matchInterpretation = useMemo(() => {
    if (!activeCreator) {
      return [
        "Operator signal: select creators to activate tailored outreach scripts.",
        "Balance high-fit creators with one broad-reach profile for testing."
      ];
    }

    return [
      `Primary fit signal: ${activeCreator.whyMatch}`,
      `Tone mapping: ${activeCreator.vibe} style supports the selected campaign positioning.`,
      `Suggested opener: ${activeCreator.suggestedHook}`
    ];
  }, [activeCreator]);

  const openOutreachReview = () => {
    if (selectedCount === 0) {
      pushToast("Select at least one creator first.");
      return;
    }

    generateOutreach();
    setShowOutreachReview(true);
  };

  const sendOutreach = () => {
    markOutreachSent();
    advanceTimeline("shippingDeadline");
    setShowOutreachReview(false);
    pushToast("Outreach sent.");
    router.push("/campaign/operator");
  };

  return (
    <div className="space-y-5">
      <section className="demo-card flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Recommended creators</h1>
          <p className="mt-2 text-sm text-slate-600">Select creators, review reasoning, then send tailored outreach in one click.</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
          {selectedCount} selected
        </span>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-3">
          {state.creators.map((creator) => (
            <CreatorTile
              key={creator.id}
              creator={creator}
              selected={state.selectedCreatorIds.includes(creator.id)}
              active={activeCreatorId === creator.id}
              onSelect={() => toggleCreator(creator.id)}
              onOpen={() => setActiveCreatorId(creator.id)}
            />
          ))}
        </section>

        <section className="space-y-4">
          <CreatorDetails creator={activeCreator} />
          <InterpretationBox bullets={matchInterpretation} />

          <section className="demo-card space-y-3">
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={state.autoPersonalizeScripts}
                onChange={(e) => setAutoPersonalize(e.target.checked)}
                className="h-4 w-4"
              />
              Auto-generate personalized scripts per creator tone
            </label>

            <button type="button" className="btn-primary w-full py-3" onClick={openOutreachReview}>
              Reach out with tailored scripts
            </button>
          </section>
        </section>
      </div>

      <OutreachReviewModal
        open={showOutreachReview}
        drafts={state.outreachDrafts}
        onClose={() => setShowOutreachReview(false)}
        onSend={sendOutreach}
      />
    </div>
  );
}
