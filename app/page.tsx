import Link from "next/link";

const workflowTabs = ["Onboard", "Find creators", "Communicate", "Analytics"];

export default function LandingPage() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-card md:p-12">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-100/70 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-emerald-100/70 blur-3xl" />

      <div className="relative mx-auto flex min-h-[28rem] max-w-4xl flex-col items-center">
        <div className="space-y-6 text-center">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Agora
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Find influencers that actually drive sales.
          </h1>

          <p className="max-w-3xl text-lg text-slate-600">
            From brief to outreach, launch creator campaigns in minutes.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <Link href="/brand/onboarding" className="btn-primary px-6 py-3 text-base">
              Create Campaign
            </Link>
            <Link href="/brand/onboarding" className="btn-secondary px-6 py-3 text-base">
              Get a demo
            </Link>
          </div>
        </div>

        <div className="mt-auto flex w-full justify-center pt-8">
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
