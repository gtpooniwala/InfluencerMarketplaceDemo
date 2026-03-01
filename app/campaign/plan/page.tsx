"use client";

import { useRouter } from "next/navigation";
import { InterpretationBox } from "@/components/InterpretationBox";
import { useToast } from "@/components/toast-provider";
import { useDemoFlowStore } from "@/lib/demoFlowStore";
import { positioningOptions } from "@/lib/mockData";

export default function CampaignPlanPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const { state, setChatAnswer, generatePlan } = useDemoFlowStore();

  const regenerate = () => {
    const currentIndex = positioningOptions.indexOf(state.intake.vibe);
    const nextVibe = positioningOptions[(currentIndex + 1) % positioningOptions.length];
    setChatAnswer("vibe", nextVibe);
    generatePlan();
    pushToast(`Regenerated with ${nextVibe} vibe.`);
  };

  return (
    <div className="space-y-5">
      <section className="demo-card">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Campaign plan</h1>
        <p className="mt-2 text-sm text-slate-600">Operator interpretation: predicted outcomes, messaging priorities, and risk controls.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="demo-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Predicted reach</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{state.plan.predictions.reach}</p>
        </article>
        <article className="demo-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Predicted engagement</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{state.plan.predictions.engagement}</p>
        </article>
        <article className="demo-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conversion likelihood</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{state.plan.predictions.conversionLikelihood}</p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="demo-card">
          <h2 className="text-base font-semibold text-ink">Messaging pillars</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {state.plan.messagingPillars.map((pillar) => (
              <li key={pillar} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                {pillar}
              </li>
            ))}
          </ul>
        </article>

        <article className="demo-card">
          <h2 className="text-base font-semibold text-ink">Risk flags</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {state.plan.riskFlags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </article>

        <article className="demo-card">
          <h2 className="text-base font-semibold text-ink">Top creator archetypes</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {state.plan.archetypes.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <InterpretationBox bullets={state.interpretation} />

      <section className="demo-card flex flex-wrap items-center justify-between gap-3">
        <button type="button" className="btn-secondary" onClick={regenerate}>
          Regenerate with different vibe
        </button>
        <button type="button" className="btn-primary px-5 py-2.5" onClick={() => router.push("/campaign/match")}>
          Show recommended creators
        </button>
      </section>
    </div>
  );
}
