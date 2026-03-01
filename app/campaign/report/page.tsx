"use client";

import { ReportSummary } from "@/components/ReportSummary";
import { useDemoFlowStore } from "@/lib/demoFlowStore";

export default function CampaignReportPage() {
  const { state } = useDemoFlowStore();

  return (
    <div className="space-y-5">
      <ReportSummary report={state.report} />

      <section className="grid gap-3 md:grid-cols-4">
        {[
          ["Spend / budget", state.report.metrics.spendUsed],
          ["Reach", state.report.metrics.reach],
          ["Engagement rate", state.report.metrics.engagementRate],
          ["Saves", state.report.metrics.saves],
          ["CTR", state.report.metrics.ctr],
          ["Conversions", state.report.metrics.conversions],
          ["Sentiment shift", state.report.metrics.sentimentShift],
          ["Link clicks", "9,620"]
        ].map(([label, value]) => (
          <article key={label} className="demo-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-2 text-xl font-semibold text-ink">{value}</p>
          </article>
        ))}
      </section>

      <section className="demo-card">
        <h2 className="text-lg font-semibold text-ink">Creator comparison</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-2 py-2">Creator</th>
                <th className="px-2 py-2">Reach</th>
                <th className="px-2 py-2">CTR</th>
                <th className="px-2 py-2">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {state.report.creatorComparison.slice(0, 3).map((row) => (
                <tr key={row.creator} className="border-b border-slate-100">
                  <td className="px-2 py-2 font-medium text-slate-900">{row.creator}</td>
                  <td className="px-2 py-2">{row.reach}</td>
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
          {state.report.recommendations.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
