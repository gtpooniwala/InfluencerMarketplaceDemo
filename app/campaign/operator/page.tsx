"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { OpsTimeline } from "@/components/OpsTimeline";
import { useToast } from "@/components/toast-provider";
import { useDemoFlowStore } from "@/lib/demoFlowStore";

export default function CampaignOperatorPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const { state, sendFollowUp, snoozeFollowUp, advanceTimeline } = useDemoFlowStore();

  const selectedCreators = state.creators.filter((creator) => state.selectedCreatorIds.includes(creator.id));
  const pipelineCreators = selectedCreators.length > 0 ? selectedCreators : state.creators.slice(0, 6);

  return (
    <div className="space-y-5">
      <section className="demo-card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">Campaign Operator</h1>
            <p className="mt-1 text-sm text-slate-600">Agent-run campaign pipeline with today&apos;s actions and deadlines.</p>
          </div>
        </div>

        <div className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 md:grid-cols-4">
          <p><span className="font-semibold text-slate-900">Campaign:</span> {state.brief.campaignName || "Campaign draft"}</p>
          <p><span className="font-semibold text-slate-900">Goal:</span> {state.intake.successGoal}</p>
          <p><span className="font-semibold text-slate-900">Vibe:</span> {state.intake.vibe}</p>
          <p><span className="font-semibold text-slate-900">KPI:</span> {state.brief.kpiFocus || "CTR, link clicks"}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/campaign/match" className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
            Creator Match
          </Link>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Campaign Operator</span>
          <Link href="/campaign/report" className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
            Campaign Dashboard
          </Link>
        </div>
      </section>

      <OpsTimeline creators={pipelineCreators} />

      <section className="demo-card space-y-4">
        <h2 className="text-lg font-semibold text-ink">Today&apos;s actions</h2>

        <div className="grid gap-3 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-900">Follow up pending creator</p>
            <p className="mt-1 text-xs text-slate-600">Mina has not replied in 48 hours. Deadline next week.</p>
            <button
              type="button"
              className="btn-primary mt-3 w-full"
              onClick={() => {
                sendFollowUp();
                pushToast("Follow-up sent to Mina.");
              }}
            >
              Send follow-up
            </button>
          </article>

          <article className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-900">Request shipping details</p>
            <p className="mt-1 text-xs text-slate-600">Two confirmed creators still need shipping addresses.</p>
            <button
              type="button"
              className="btn-primary mt-3 w-full"
              onClick={() => {
                advanceTimeline("shippingDeadline");
                pushToast("Shipping request sent.");
              }}
            >
              Request now
            </button>
          </article>

          <article className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-900">Handle review workload</p>
            <p className="mt-1 text-xs text-slate-600">Drafts are expected tomorrow. Queue review slot now.</p>
            <button
              type="button"
              className="btn-secondary mt-3 w-full"
              onClick={() => {
                snoozeFollowUp();
                advanceTimeline("contentReviewDue");
                pushToast("Review slot reserved.");
              }}
            >
              Reserve review slot
            </button>
          </article>
        </div>
      </section>

      <div className="flex justify-center">
        <button type="button" className="btn-primary px-6 py-3" onClick={() => router.push("/campaign/report")}>
          Open campaign dashboard
        </button>
      </div>
    </div>
  );
}
