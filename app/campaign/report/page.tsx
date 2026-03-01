"use client";

import { ReportSummary } from "@/components/ReportSummary";
import { useDemoFlowStore } from "@/lib/demoFlowStore";

const metricOrder = [
  "spend",
  "budgetUsedPct",
  "impressions",
  "reach",
  "engagementRate",
  "saves",
  "ctr",
  "linkClicks",
  "conversions",
  "cpa",
  "cpm",
  "sentimentShift"
] as const;

const metricLabels: Record<(typeof metricOrder)[number], string> = {
  spend: "Spend",
  budgetUsedPct: "Budget used",
  impressions: "Impressions",
  reach: "Reach",
  engagementRate: "Engagement rate",
  saves: "Saves",
  ctr: "CTR",
  linkClicks: "Link clicks",
  conversions: "Conversions",
  cpa: "CPA",
  cpm: "CPM",
  sentimentShift: "Sentiment shift"
};

export default function CampaignReportPage() {
  const { state } = useDemoFlowStore();

  return (
    <div className="space-y-5">
      <ReportSummary report={state.report} />

      <section className="grid gap-3 md:grid-cols-4">
        {metricOrder.map((key) => (
          <article key={key} className="demo-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{metricLabels[key]}</p>
            <p className="mt-2 text-xl font-semibold text-ink">{state.report.metrics[key]}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="demo-card">
          <h2 className="text-lg font-semibold text-ink">Spend vs budget</h2>
          <div className="mt-4 space-y-3">
            {state.report.chartSeries.spendVsBudget.map((row) => (
              <div key={row.label}>
                <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
                  <span>{row.label}</span>
                  <span>GBP {row.value.toLocaleString()}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-slate-900" style={{ width: `${Math.min(100, (row.value / 12000) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="demo-card">
          <h2 className="text-lg font-semibold text-ink">Weekly performance trend</h2>
          <div className="mt-4 space-y-2">
            {state.report.chartSeries.performanceByWeek.map((row) => (
              <div key={row.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">{row.label}</p>
                <p>Reach: {row.reach.toLocaleString()}</p>
                <p>Engagement: {row.engagement}%</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="demo-card">
        <h2 className="text-lg font-semibold text-ink">Creator comparison</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-2 py-2">Creator</th>
                <th className="px-2 py-2">Reach</th>
                <th className="px-2 py-2">Engagement</th>
                <th className="px-2 py-2">CTR</th>
                <th className="px-2 py-2">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {state.report.creatorComparison.slice(0, 3).map((row) => (
                <tr key={row.creator} className="border-b border-slate-100">
                  <td className="px-2 py-2 font-medium text-slate-900">{row.creator}</td>
                  <td className="px-2 py-2">{row.reach}</td>
                  <td className="px-2 py-2">{row.engagementRate}</td>
                  <td className="px-2 py-2">{row.ctr}</td>
                  <td className="px-2 py-2">{row.conversions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="demo-card">
        <h2 className="text-lg font-semibold text-ink">Next campaign recommendations</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {state.report.recommendations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
