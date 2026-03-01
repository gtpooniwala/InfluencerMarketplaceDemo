"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BriefPanel } from "@/components/BriefPanel";
import { ChatPanel } from "@/components/ChatPanel";
import { InterpretationBox } from "@/components/InterpretationBox";
import { useToast } from "@/components/toast-provider";
import { useDemoFlowStore } from "@/lib/demoFlowStore";

export default function CampaignNewPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const {
    state,
    hydrated,
    setChatAnswer,
    addContextSource,
    applySampleContext,
    generateBrief,
    generatePlan,
    updateBriefField,
    updateAdvancedBriefField
  } = useDemoFlowStore();

  const [contextOpen, setContextOpen] = useState(false);
  const [showCampaignPage, setShowCampaignPage] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (state.briefGenerated) {
      setShowCampaignPage(true);
    }
  }, [hydrated, state.briefGenerated]);

  const insights = useMemo(() => {
    if (state.interpretation.length > 0) return state.interpretation;
    return [
      "AI recommendation: define launch type, success metric, audience, and vibe before setting deliverables.",
      "Campaign quality improves when context files (product pack, meeting notes, social links) are included.",
      "Once generated, this campaign page becomes your editable source of truth for planning and creator matching."
    ];
  }, [state.interpretation]);

  const handleGenerateCampaignPage = () => {
    generateBrief();
    setShowCampaignPage(true);
    pushToast("Campaign page generated.");
  };

  const handleViewEditCampaignPage = () => {
    setShowCampaignPage(true);
    pushToast("Campaign page opened for manual editing.");
  };

  return (
    <div className="space-y-6">
      {!showCampaignPage && (
        <section className="demo-card space-y-4">
          <div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-ink">Campaign Builder</h1>
              <p className="mt-2 text-sm text-slate-600">
                Upload context and let AI build your campaign page, or open the campaign page directly and edit it manually.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <ChatPanel
              intake={state.intake}
              onSelect={setChatAnswer}
              onUseSampleContext={() => {
                applySampleContext();
                pushToast("Sample campaign loaded.");
              }}
              onUploadContext={(label) => {
                addContextSource(label);
                pushToast(`${label} added.`);
              }}
              contextOpen={contextOpen}
              onToggleContextOpen={() => setContextOpen((prev) => !prev)}
            />

            <section className="space-y-4">
              <section className="demo-card space-y-3">
                <h2 className="text-lg font-semibold text-ink">Campaign Builder Actions</h2>
                <p className="text-sm text-slate-600">
                  Auto-create from uploaded context or jump straight into manual edits.
                </p>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                  Context loaded: {state.intake.contextSources.length > 0 ? state.intake.contextSources.join(", ") : "No files yet"}
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button type="button" className="btn-primary px-6 py-2.5" onClick={handleGenerateCampaignPage}>
                    Generate campaign page
                  </button>
                  <button type="button" className="btn-secondary px-6 py-2.5" onClick={handleViewEditCampaignPage}>
                    View / edit campaign page
                  </button>
                </div>
              </section>

              <InterpretationBox title="AI insights" bullets={insights} />
            </section>
          </div>
        </section>
      )}

      {showCampaignPage && (
        <>
          <BriefPanel
            brief={state.brief}
            generated={state.briefGenerated}
            onChangeField={updateBriefField}
            onChangeAdvanced={updateAdvancedBriefField}
          />

          <InterpretationBox title="AI insights" bullets={insights} />

          <div className="flex justify-center">
            <button
              type="button"
              className="btn-primary px-6 py-3"
              onClick={() => {
                generatePlan();
                router.push("/campaign/match");
              }}
            >
              Find a Creator
            </button>
          </div>
        </>
      )}
    </div>
  );
}
