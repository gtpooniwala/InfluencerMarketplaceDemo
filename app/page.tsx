import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-card md:p-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl" />
        <div className="absolute -bottom-24 left-12 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />

        <div className="relative max-w-4xl space-y-5">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            AI Campaign Operator Demo
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Launch an influencer campaign without opening a dashboard.
          </h1>
          <p className="text-lg text-slate-600">
            Upload context. Pick a vibe. We recommend creators, draft tailored outreach, and generate the report.
          </p>
          <div className="pt-2">
            <Link href="/brand/onboarding" className="btn-primary px-6 py-3 text-base">
              Start a campaign
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Interpretation first",
            copy: "Each step explains what your inputs mean before suggesting the next move."
          },
          {
            title: "One-click actions",
            copy: "Generate outreach and send follow-up actions without manual drafting."
          },
          {
            title: "Narrative report",
            copy: "Close the loop with predicted vs actual outcomes and next recommendations."
          }
        ].map((item) => (
          <article key={item.title} className="demo-card">
            <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.copy}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
