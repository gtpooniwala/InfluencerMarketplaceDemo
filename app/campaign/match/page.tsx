"use client";

import Link from "next/link";
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
    setDemoState,
    toggleCreator,
    setAutoPersonalize,
    generateOutreach,
    markOutreachSent
  } = useDemoFlowStore();

  const [activeCreatorId, setActiveCreatorId] = useState<string | null>(state.creators[0]?.id ?? null);
  const [showOutreachReview, setShowOutreachReview] = useState(false);

  const activeCreator = state.creators.find((creator) => creator.id === activeCreatorId) ?? null;

  const matchInterpretation = useMemo(() => {
    if (!activeCreator) {
      return [
        "Operator recommendation: start with top-fit creators and one creative wildcard for testing.",
        "Use bulk outreach after selecting 3-4 creators for faster launch."
      ];
    }

    return [
      `Why they're a fit: ${activeCreator.whyRelevant}`,
      `Suggested intro: ${activeCreator.suggestedIntro}`,
      `Suggested message direction: ${activeCreator.suggestedMessageDirection}`
    ];
  }, [activeCreator]);

  const openBulkOutreach = () => {
    if (state.selectedCreatorIds.length === 0) {
      pushToast("Select at least one creator first.");
      return;
    }

    generateOutreach();
    setShowOutreachReview(true);
  };

  const draftSingleCreator = (creatorId: string) => {
    setDemoState((prev) => {
      const selected = prev.selectedCreatorIds.includes(creatorId) ? prev.selectedCreatorIds : [...prev.selectedCreatorIds, creatorId];
      const selectedCreators = prev.creators.filter((creator) => selected.includes(creator.id));
      return {
        ...prev,
        selectedCreatorIds: selected,
        outreachDrafts: selectedCreators.slice(0, 4).map((creator) => ({
          creatorId: creator.id,
          creatorName: creator.name,
          message: [
            `Hi ${creator.name}, we are inviting you to ${prev.brief.campaignName || "this campaign"}.`,
            `Suggested intro: ${creator.suggestedIntro}`,
            `Suggested message direction: ${creator.suggestedMessageDirection}`,
            `Deliverables: ${prev.brief.deliverables || "Creator post + story support"}.`,
            "If this aligns, we can share final details today."
          ].join("\n\n")
        }))
      };
    });

    setShowOutreachReview(true);
  };

  const sendOutreach = () => {
    markOutreachSent();
    setShowOutreachReview(false);
    pushToast("Outreach sent.");
    router.push("/campaign/operator");
  };

  return (
    <div className="space-y-5">
      <section className="demo-card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">Recommended creators</h1>
            <p className="mt-1 text-sm text-slate-600">Review content style, fit rationale, and message direction before outreach.</p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
            {state.selectedCreatorIds.length} selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Creator Match</span>
          <Link href="/campaign/operator" className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
            Campaign Operator
          </Link>
          <Link href="/campaign/report" className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
            Campaign Dashboard
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={state.autoPersonalizeScripts}
              onChange={(e) => setAutoPersonalize(e.target.checked)}
              className="h-4 w-4"
            />
            Auto-generate personalized scripts per creator tone
          </label>

          <button type="button" className="btn-primary" onClick={openBulkOutreach}>
            Reach out to selected
          </button>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-3">
          {state.creators.map((creator) => (
            <CreatorTile
              key={creator.id}
              creator={creator}
              selected={state.selectedCreatorIds.includes(creator.id)}
              active={activeCreatorId === creator.id}
              onOpen={() => setActiveCreatorId(creator.id)}
              onSelect={() => toggleCreator(creator.id)}
              onDraftOutreach={() => draftSingleCreator(creator.id)}
            />
          ))}
        </section>

        <section className="space-y-4">
          <CreatorDetails creator={activeCreator} />
          <InterpretationBox title="Operator recommendation" bullets={matchInterpretation} />
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
