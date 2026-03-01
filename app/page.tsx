import Link from "next/link";

const workflowTabs = ["Onboard", "Find creators", "Communicate", "Analytics"];

export default function LandingPage() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-card md:p-12">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-100/70 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-emerald-100/70 blur-3xl" />

      <div className="relative max-w-4xl space-y-6">
        <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Agora
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Find the best micro-influencers for your campaign.
        </h1>

        <p className="max-w-3xl text-lg text-slate-600">
          We help brands turn creator partnerships into measurable, repeat sales by converting messy context into a
          launch-ready campaign plan, tailored shortlist, outreach, and a clear performance dashboard.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/brand/onboarding" className="btn-primary px-6 py-3 text-base">
            Start campaign
          </Link>
          <Link href="/brand/onboarding" className="btn-secondary px-6 py-3 text-base">
            Get a demo
          </Link>
        </div>

        <div className="pt-2">
          <div className="inline-flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2">
            {workflowTabs.map((tab) => (
              <span
                key={tab}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
