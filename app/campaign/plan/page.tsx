"use client";

import { useRouter } from "next/navigation";
import { InterpretationBox } from "@/components/InterpretationBox";
import { useDemoFlowStore } from "@/lib/demoFlowStore";

export default function CampaignPlanPage() {
  const router = useRouter();
  const { state, generatePlan } = useDemoFlowStore();

  const plan = state.plan;

  return (
    <div className="space-y-6">
      <section className="demo-card space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Campaign Plan Summary</h1>
        <p className="text-sm text-slate-600">Strategic recommendation generated from your campaign brief.</p>
      </section>

      {plan ? (
        <>
          <section className="demo-card">
            <h2 className="text-lg font-semibold text-ink">Recommended targeting</h2>
            <p className="mt-2 text-sm text-slate-700">{plan.recommendedTargeting}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {plan.targetingChips.map((chip) => (
                <span key={chip} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
                  {chip}
                </span>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <article className="demo-card">
              <h3 className="text-base font-semibold text-ink">Messaging pillars</h3>
              <div className="mt-3 space-y-2">
                {plan.messagingPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-900">{pillar.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="demo-card">
              <h3 className="text-base font-semibold text-ink">Creator archetypes</h3>
              <div className="mt-3 space-y-2">
                {plan.creatorArchetypes.map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="demo-card space-y-4">
              <div>
                <h3 className="text-base font-semibold text-ink">Risk flags</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {plan.riskFlags.map((flag) => (
                    <li key={flag}>{flag}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-ink">Assumptions</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {plan.assumptions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {plan.predictedPerformance.map((item) => (
              <article key={item.label} className="demo-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-ink">{item.range}</p>
              </article>
            ))}
          </section>

          <section className="demo-card">
            <h2 className="text-lg font-semibold text-ink">Campaign structure check</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2 text-sm text-slate-700">
              <p><span className="font-semibold text-slate-900">Deliverables:</span> {state.brief.deliverables}</p>
              <p><span className="font-semibold text-slate-900">Usage rights:</span> {state.brief.usageRights}</p>
              <p><span className="font-semibold text-slate-900">Timeline:</span> {state.brief.timeline}</p>
              <p><span className="font-semibold text-slate-900">Budget allocation:</span> {state.brief.budgetAllocation}</p>
              <p><span className="font-semibold text-slate-900">Platform mix:</span> {state.brief.platformMix}</p>
              <p><span className="font-semibold text-slate-900">KPI focus:</span> {state.brief.kpiFocus}</p>
            </div>
          </section>

          <InterpretationBox bullets={state.interpretation} />
        </>
      ) : (
        <section className="demo-card">
          <p className="text-sm text-slate-600">Generate a campaign brief first to view plan recommendations.</p>
        </section>
      )}

      <div className="flex justify-center">
        <button
          type="button"
          className="btn-primary px-6 py-3"
          onClick={() => {
            generatePlan();
            router.push("/campaign/match");
          }}
        >
          Show recommended creators
        </button>
      </div>
    </div>
  );
}
