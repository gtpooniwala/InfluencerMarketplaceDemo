import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-card md:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-100/70 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-emerald-100/70 blur-3xl" />

        <div className="relative max-w-4xl space-y-5">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Influence AI
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Run high-ROI micro-influencer campaigns with an AI operator, not another dashboard.
          </h1>
          <p className="text-lg text-slate-600">
            Influence AI turns messy brand context into a launch-ready campaign plan, creator shortlist, tailored outreach, and a clear performance dashboard.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/brand/onboarding" className="btn-primary px-6 py-3 text-base">
              Start campaign
            </Link>
            <Link href="/campaign/new" className="btn-secondary px-6 py-3 text-base">
              Get a demo
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="demo-card">
          <h2 className="text-lg font-semibold text-ink">Higher ROI via micro-influencers</h2>
          <p className="mt-2 text-sm text-slate-600">
            Better niche fit, authentic engagement, and more creative variations per budget than macro-only spends.
          </p>
        </article>
        <article className="demo-card">
          <h2 className="text-lg font-semibold text-ink">Operator workflow</h2>
          <p className="mt-2 text-sm text-slate-600">
            We interpret your context, recommend a strategy, and execute outreach actions with one click.
          </p>
        </article>
        <article className="demo-card">
          <h2 className="text-lg font-semibold text-ink">Closed loop improvement</h2>
          <p className="mt-2 text-sm text-slate-600">
            End every campaign with a performance dashboard and concrete recommendations for the next launch.
          </p>
        </article>
      </section>
    </div>
  );
}
