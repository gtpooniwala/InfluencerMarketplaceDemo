"use client";

import { useRouter } from "next/navigation";
import { OpsTimeline } from "@/components/OpsTimeline";
import { useToast } from "@/components/toast-provider";
import { useDemoFlowStore } from "@/lib/demoFlowStore";

export default function CampaignOperatorPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const { state, sendFollowUp, snoozeFollowUp, advanceTimeline } = useDemoFlowStore();

  return (
    <div className="space-y-5">
      <section className="demo-card">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Campaign Operator</h1>
        <p className="mt-2 text-sm text-slate-600">Proactive timeline tracking with one-click operational actions.</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <OpsTimeline timeline={state.timeline} />

        <section className="demo-card space-y-4">
          <h2 className="text-lg font-semibold text-ink">Proactive suggestion</h2>
          <p className="text-sm text-slate-700">
            We haven&apos;t heard back from two creators. Deadline is next week. Should I follow up?
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                sendFollowUp();
                advanceTimeline("contentReviewDue");
                pushToast("Follow-up sent.");
              }}
            >
              Send follow-up
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                snoozeFollowUp();
                pushToast("Suggestion snoozed.");
              }}
            >
              Snooze
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            <p>Follow-up sent: {state.timeline.followUpSent ? "Yes" : "No"}</p>
            <p>Snoozed: {state.timeline.snoozed ? "Yes" : "No"}</p>
          </div>
        </section>
      </div>

      <section className="demo-card flex justify-end">
        <button type="button" className="btn-primary px-5 py-2.5" onClick={() => router.push("/campaign/report")}>
          View auto report
        </button>
      </section>
    </div>
  );
}
