import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-card md:p-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl" />
        <div className="absolute -bottom-24 left-12 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl" />

        <div className="relative max-w-3xl space-y-5">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Vaporware Demo
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Brief to fit-matched micro creators, then outreach and performance in one flow.
          </h1>
          <p className="text-lg text-slate-600">
            Agora helps SME brands turn a campaign brief into explainable creator matches and a clean execution workspace.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/onboarding" className="btn-primary px-6 py-3 text-base">
              Create campaign
            </Link>
            <Link href="/demo" className="btn-secondary px-6 py-3 text-base">
              View demo
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Brief in minutes",
            copy: "Capture brand tone, campaign objective, and creative constraints without heavy setup."
          },
          {
            title: "Explainable fit",
            copy: "Rank creators by audience/message/vibe fit, not just keyword overlap."
          },
          {
            title: "Ops-ready workspace",
            copy: "Move from shortlist to outreach, contracts, and KPI snapshots in one guided path."
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
