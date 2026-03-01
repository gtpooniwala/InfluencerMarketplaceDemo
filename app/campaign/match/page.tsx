"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreatorDetails } from "@/components/CreatorDetails";
import { CreatorTile } from "@/components/CreatorTile";
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
          suggestedIntro: creator.suggestedIntro,
          suggestedMessageDirection: creator.suggestedMessageDirection,
          message: [
            `Hi ${creator.name}, we are inviting you to ${prev.brief.campaignName || "this campaign"}.`,
            `Deliverables: ${prev.brief.deliverables || "Creator post + story support"}.`,
            `Timeline: ${prev.brief.timeline || "3 weeks"}. Usage rights: ${prev.brief.usageRights || "Paid social amplification rights for 30 days"}.`,
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
            <p className="mt-1 text-sm text-slate-600">Browse creator content, audience fit, and pricing before sending outreach.</p>
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
