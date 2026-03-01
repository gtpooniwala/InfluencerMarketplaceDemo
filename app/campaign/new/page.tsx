"use client";

import { useMemo, useState } from "react";
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
    setChatAnswer,
    addContextSource,
    applySampleContext,
    generateBrief,
    generatePlan,
    updateBriefField,
    updateAdvancedBriefField
  } = useDemoFlowStore();

  const [contextOpen, setContextOpen] = useState(false);

  const interpretation = useMemo(() => {
    if (state.interpretation.length > 0) return state.interpretation;
    return [
      "Pick a launch type, goal, audience, and vibe to generate a first-pass campaign brief.",
      "You can then edit all brief fields before reviewing the plan."
    ];
  }, [state.interpretation]);

  return (
    <div className="space-y-6">
      <section className="demo-card space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Create campaign</h1>
        <p className="text-sm text-slate-600">
          Two ways to start: <span className="font-semibold text-slate-900">Help me create it</span> with AI, or edit the manual brief below.
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <button
            type="button"
            className="rounded-xl border border-slate-300 bg-slate-900 px-4 py-3 text-left text-white"
            onClick={() => {
              generateBrief();
              pushToast("Campaign brief generated.");
            }}
          >
            <p className="text-sm font-semibold">Help me create it</p>
            <p className="mt-1 text-xs text-slate-200">Generate and prefill the brief from quick campaign signals.</p>
          </button>
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left"
            onClick={() => pushToast("Manual editing is available below.")}
          >
            <p className="text-sm font-semibold text-slate-900">I already know my campaign</p>
            <p className="mt-1 text-xs text-slate-600">Use the manual editor and keep full control.</p>
          </button>
        </div>
      </section>

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

        <div className="space-y-4">
          <InterpretationBox title="Operator read" bullets={interpretation} />
          <section className="demo-card">
            <div className="flex justify-center">
              <button
                type="button"
                className="btn-primary px-6 py-3"
                onClick={() => {
                  generateBrief();
                  pushToast("Campaign brief generated.");
                }}
              >
                Generate campaign brief
              </button>
            </div>
          </section>
        </div>
      </div>

      <BriefPanel
        brief={state.brief}
        generated={state.briefGenerated}
        onChangeField={updateBriefField}
        onChangeAdvanced={updateAdvancedBriefField}
      />

      <div className="flex justify-center">
        <button
          type="button"
          className="btn-primary px-6 py-3"
          onClick={() => {
            generatePlan();
            router.push("/campaign/plan");
          }}
        >
          Review campaign plan
        </button>
      </div>
    </div>
  );
}
