"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { BriefPanel } from "@/components/BriefPanel";
import { ChatPanel } from "@/components/ChatPanel";
import { InterpretationBox } from "@/components/InterpretationBox";
import { useToast } from "@/components/toast-provider";
import { useDemoFlowStore } from "@/lib/demoFlowStore";
import { buildInterpretation } from "@/lib/mockData";

export default function CampaignNewPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const { state, setChatAnswer, addContextSource, applySampleContext, generatePlan } = useDemoFlowStore();

  const interpretation = useMemo(
    () =>
      buildInterpretation({
        positioning: state.intake.vibe,
        audience: state.intake.audience,
        goal: state.intake.goal,
        launch: state.intake.launch
      }),
    [state.intake]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-4">
        <ChatPanel
          intake={state.intake}
          onSelect={setChatAnswer}
          onUploadContext={(label) => {
            addContextSource(label);
            pushToast(`${label} attached.`);
          }}
          onUseSampleContext={() => {
            applySampleContext();
            pushToast("Sample context applied.");
          }}
        />
      </section>

      <section className="space-y-4">
        <BriefPanel brief={state.brief} />
        <InterpretationBox bullets={interpretation} />

        <div className="demo-card">
          <button
            type="button"
            className="btn-primary w-full py-3"
            onClick={() => {
              generatePlan();
              router.push("/campaign/plan");
            }}
          >
            Generate campaign plan
          </button>
        </div>
      </section>
    </div>
  );
}
