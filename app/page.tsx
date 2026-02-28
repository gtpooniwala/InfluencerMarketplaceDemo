"use client";

import { useRouter } from "next/navigation";
import { createEmptyState } from "@/lib/storage";
import { useDemoState } from "@/lib/useDemoState";

export default function LandingPage() {
  const router = useRouter();
  const { updateState } = useDemoState();

  const startBrandFlow = () => {
    router.push("/brand/onboarding");
  };

  const startDemoFlow = () => {
    const seeded = createEmptyState();
    seeded.brandProfile = {
      companyName: "Northstar Nutrition",
      website: "https://northstar-demo.com",
      industry: "Health & Fitness",
      budgetRange: "$10,000 - $25,000",
      targetGeo: "United States"
    };
    updateState(seeded);
    router.push("/brand/campaign/new");
  };

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-card">
        <div className="absolute -right-28 -top-28 h-64 w-64 rounded-full bg-cyan-100 blur-3xl" />
        <div className="absolute -bottom-24 right-20 h-64 w-64 rounded-full bg-blue-100 blur-3xl" />

        <div className="relative max-w-3xl space-y-5">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Hackathon Demo · Frontend Only
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Micro-influencer campaign flow from onboarding to delivery.
          </h1>
          <p className="text-lg text-slate-600">
            InfluenceFlow demonstrates a full SaaS-like workflow for brands: onboarding, campaign setup, influencer matching,
            offers, and coordination.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={startBrandFlow} className="btn-primary px-6 py-3 text-base">
              I&apos;m a Brand
            </button>
            <button onClick={startDemoFlow} className="btn-secondary px-6 py-3 text-base">
              View Demo Flow
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Pre-programmed matching",
            copy: "Influencers are ranked with deterministic fit scores, reasons, and filters to mimic real discovery."
          },
          {
            title: "Offer coordination",
            copy: "Send multi-offers, simulate accept/decline transitions, and keep each relationship organized."
          },
          {
            title: "Message + deliverables",
            copy: "Track every thread and checklist item in one place with in-browser localStorage state."
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
