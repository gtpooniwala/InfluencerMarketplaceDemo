"use client";

import { useState } from "react";

type WorkflowTab = {
  id: "Onboard" | "Find creators" | "Communicate" | "Analytics";
  label: string;
  title: string;
  summary: string;
  bullets: string[];
  highlight: string;
};

const tabs: WorkflowTab[] = [
  {
    id: "Onboard",
    label: "Onboard",
    title: "Build a usable brand brief in minutes",
    summary: "Upload site, assets, and notes once. Agora converts messy context into campaign-ready guidance.",
    bullets: [
      "Auto-generates brand summary, tone, and target customer profile.",
      "Extracts product claims and messaging guardrails for creators.",
      "Keeps brand safety and voice consistency from day one."
    ],
    highlight: "Outcome: clean brief, less manual setup."
  },
  {
    id: "Find creators",
    label: "Find creators",
    title: "Rank creators by fit, not just follower count",
    summary: "Discovery uses campaign intent and audience signals to recommend creators likely to convert.",
    bullets: [
      "Matches campaign goal to creator audience behavior signals.",
      "Surfaces brand-safe creators with relevant content style.",
      "Builds shortlists with clear fit rationale and overlap."
    ],
    highlight: "Outcome: higher-quality shortlists and more predictable outcomes."
  },
  {
    id: "Communicate",
    label: "Communicate",
    title: "Launch outreach and manage execution in one flow",
    summary: "Draft personalized outreach, send quickly, and track follow-ups and deadlines without context switching.",
    bullets: [
      "Creates ready-to-send creator messages with AI suggestions.",
      "Tracks replies, shipping deadlines, and content review milestones.",
      "Keeps campaign coordination centralized across creators."
    ],
    highlight: "Outcome: faster campaign launch with less coordination overhead."
  },
  {
    id: "Analytics",
    label: "Analytics",
    title: "Tie creator activity to revenue outcomes",
    summary: "Measure spend, reach, clicks, and conversions in one dashboard with clear next-step recommendations.",
    bullets: [
      "Compares predicted vs actual campaign performance.",
      "Shows creator-level performance and conversion contribution.",
      "Recommends optimizations to improve repeatable sales."
    ],
    highlight: "Signal from deck: micro-creator fit can drive +20-30% ROAS improvement."
  }
];

export const LandingWorkflowTabs = () => {
  const [activeTab, setActiveTab] = useState<WorkflowTab["id"]>("Onboard");
  const current = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
      <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
              tab.id === activeTab
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">How Agora Works</p>
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{current.title}</h2>
        <p className="max-w-3xl text-sm text-slate-600 md:text-base">{current.summary}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {current.bullets.map((item) => (
          <article key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            {item}
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-900">{current.highlight}</div>
    </section>
  );
};
