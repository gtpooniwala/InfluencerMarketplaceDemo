"use client";

import { useMemo } from "react";
import { useDemoFlowStore } from "@/lib/demoFlowStore";

const parseMetricNumber = (value: string): number => {
  const trimmed = value.trim().toLowerCase();
  const normalized = trimmed.replace(/gbp|\$|,/g, "").trim();

  if (normalized.endsWith("k")) return Number(normalized.slice(0, -1)) * 1000;
  if (normalized.endsWith("m")) return Number(normalized.slice(0, -1)) * 1000000;
  if (normalized.endsWith("%")) return Number(normalized.slice(0, -1));

  const direct = Number(normalized);
  return Number.isFinite(direct) ? direct : 0;
};

const formatPercentDelta = (delta: number) => `${delta > 0 ? "+" : ""}${delta.toFixed(1)}%`;

const buildPolylinePath = (points: Array<{ x: number; y: number }>) =>
  points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

const kpiCards = [
  { key: "reach", label: "Reach", delta: 12.4, targetDirection: "up", context: "vs last week" },
  { key: "engagementRate", label: "Engagement", delta: 9.1, targetDirection: "up", context: "quality score" },
  { key: "ctr", label: "CTR", delta: 6.8, targetDirection: "up", context: "traffic efficiency" },
  { key: "conversions", label: "Conversions", delta: 14.3, targetDirection: "up", context: "vs plan" },
  { key: "spend", label: "Spend", delta: -4.2, targetDirection: "down", context: "under pacing" },
  { key: "cpa", label: "CPA", delta: -6.1, targetDirection: "down", context: "cost improved" }
] as const;

const maxBarWidth = 180;

export default function CampaignReportPage() {
  const { state } = useDemoFlowStore();
  const { report } = state;

  const spendVsBudget = useMemo(() => {
    const budget = report.chartSeries.spendVsBudget.find((entry) => entry.label.toLowerCase().includes("budget"))?.value ?? 0;
    const spend = report.chartSeries.spendVsBudget.find((entry) => entry.label.toLowerCase().includes("spend"))?.value ?? 0;
    const usedPct = budget > 0 ? (spend / budget) * 100 : 0;
    return { budget, spend, usedPct, remaining: Math.max(0, budget - spend) };
  }, [report.chartSeries.spendVsBudget]);

  const weeklyPoints = useMemo(() => {
    const width = 680;
    const height = 260;
    const paddingX = 28;
    const paddingY = 26;
    const rows = report.chartSeries.performanceByWeek;
    const maxReach = Math.max(...rows.map((row) => row.reach), 1);
    const maxEngagement = Math.max(...rows.map((row) => row.engagement), 1);

    const points = rows.map((row, index) => {
      const step = rows.length > 1 ? index / (rows.length - 1) : 0;
      const x = paddingX + step * (width - paddingX * 2);
      const reachY = height - paddingY - (row.reach / maxReach) * (height - paddingY * 2);
      const engagementY = height - paddingY - (row.engagement / maxEngagement) * (height - paddingY * 2);
      return { label: row.label, x, reachY, engagementY, reach: row.reach, engagement: row.engagement };
    });

    const reachPath = buildPolylinePath(points.map((point) => ({ x: point.x, y: point.reachY })));
    const engagementPath = buildPolylinePath(points.map((point) => ({ x: point.x, y: point.engagementY })));
    const areaPath = [
      `M ${points[0]?.x ?? 0} ${height - paddingY}`,
      ...points.map((point) => `L ${point.x} ${point.reachY}`),
      `L ${points[points.length - 1]?.x ?? width} ${height - paddingY}`,
      "Z"
    ].join(" ");

    return { width, height, paddingY, maxReach, maxEngagement, points, reachPath, engagementPath, areaPath };
  }, [report.chartSeries.performanceByWeek]);

  const funnelData = useMemo(() => {
    const impressions = parseMetricNumber(report.metrics.impressions);
    const clicks = parseMetricNumber(report.metrics.linkClicks);
    const conversions = parseMetricNumber(report.metrics.conversions);
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const cvr = clicks > 0 ? (conversions / clicks) * 100 : 0;

    return {
      impressions,
      clicks,
      conversions,
      ctr,
      cvr,
      stages: [
        { label: "Impressions", value: impressions },
        { label: "Link clicks", value: clicks },
        { label: "Conversions", value: conversions }
      ]
    };
  }, [report.metrics.conversions, report.metrics.impressions, report.metrics.linkClicks]);

  const creatorLeaderboard = useMemo(() => {
    const rows = [...report.creatorComparison].sort(
      (a, b) => parseMetricNumber(b.conversions) - parseMetricNumber(a.conversions)
    );
    const maxReach = Math.max(...rows.map((row) => parseMetricNumber(row.reach)), 1);
    const maxCtr = Math.max(...rows.map((row) => parseMetricNumber(row.ctr)), 1);
    return { rows, maxReach, maxCtr };
  }, [report.creatorComparison]);

  return (
    <div className="space-y-5">
      <section className="demo-card relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-cyan-50">
        <div className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-cyan-100/90 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-24 h-40 w-40 rounded-full bg-emerald-100/80 blur-2xl" />

        <div className="relative grid gap-4 lg:grid-cols-[1.4fr,1fr]">
          <div>
            <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full border border-cyan-200 bg-cyan-100 px-3 py-1 text-cyan-800">Last 21 days</span>
              <span className="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-emerald-800">
                Sentiment: {report.metrics.sentimentShift}
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Campaign Performance Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">{report.summary}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Actionable insights</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {report.whatToDoNext.map((item) => (
                <li key={item} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {kpiCards.map((card) => {
          const value = report.metrics[card.key];
          const improving = card.targetDirection === "up" ? card.delta >= 0 : card.delta <= 0;

          return (
            <article key={card.key} className="demo-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{card.label}</p>
              <p className="mt-2 text-xl font-semibold text-ink">{value}</p>
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    improving ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {formatPercentDelta(card.delta)}
                </span>
                <span className="text-xs text-slate-500">{card.context}</span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.8fr,1fr]">
        <article className="demo-card">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Weekly performance trend</h2>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-900" />
                Reach
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                Engagement
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${weeklyPoints.width} ${weeklyPoints.height}`}
              className="h-64 min-w-[560px] w-full rounded-2xl border border-slate-100 bg-slate-50/60"
              role="img"
              aria-label="Weekly reach and engagement trend"
            >
              <defs>
                <linearGradient id="reachArea" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.03" />
                </linearGradient>
              </defs>

              <path d={weeklyPoints.areaPath} fill="url(#reachArea)" />
              <path d={weeklyPoints.reachPath} fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d={weeklyPoints.engagementPath} fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />

              {weeklyPoints.points.map((point) => (
                <g key={point.label}>
                  <circle cx={point.x} cy={point.reachY} r="4.5" fill="#0f172a" />
                  <circle cx={point.x} cy={point.engagementY} r="4.5" fill="#06b6d4" />
                  <text x={point.x} y={weeklyPoints.height - 6} textAnchor="middle" fontSize="12" fill="#475569">
                    {point.label}
                  </text>
                </g>
              ))}

              <text x={14} y={weeklyPoints.paddingY} fontSize="11" fill="#64748b">
                {Math.round(weeklyPoints.maxReach / 1000)}k reach
              </text>
              <text x={weeklyPoints.width - 12} y={weeklyPoints.paddingY} textAnchor="end" fontSize="11" fill="#0891b2">
                {weeklyPoints.maxEngagement.toFixed(1)}% engage
              </text>
            </svg>
          </div>
        </article>

        <article className="demo-card">
          <h2 className="text-lg font-semibold text-ink">Budget pacing</h2>
          <p className="mt-1 text-sm text-slate-600">Spend vs allocated budget in current campaign window.</p>

          <div className="mt-5 flex items-center gap-5">
            <div
              className="relative h-24 w-24 rounded-full"
              style={{
                background: `conic-gradient(#0f172a ${Math.min(100, spendVsBudget.usedPct)}%, #e2e8f0 0%)`
              }}
            >
              <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-900">
                {Math.round(spendVsBudget.usedPct)}%
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-600">
                <span className="font-semibold text-slate-900">GBP {spendVsBudget.spend.toLocaleString()}</span> spent
              </p>
              <p className="text-slate-600">
                <span className="font-semibold text-slate-900">GBP {spendVsBudget.remaining.toLocaleString()}</span> remaining
              </p>
              <p className="text-slate-600">
                Budget cap: <span className="font-semibold text-slate-900">GBP {spendVsBudget.budget.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 h-3 rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-slate-900 to-cyan-600"
              style={{ width: `${Math.min(100, spendVsBudget.usedPct)}%` }}
            />
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr,1.8fr]">
        <article className="demo-card">
          <h2 className="text-lg font-semibold text-ink">Conversion funnel</h2>
          <p className="mt-1 text-sm text-slate-600">Where audience drops through the campaign journey.</p>

          <div className="mt-4 space-y-3">
            {funnelData.stages.map((stage, index) => {
              const widthPct =
                funnelData.stages[0].value > 0 ? Math.max(18, (stage.value / funnelData.stages[0].value) * 100) : 0;
              const tone =
                index === 0 ? "from-slate-900 to-slate-700" : index === 1 ? "from-cyan-600 to-cyan-500" : "from-emerald-600 to-emerald-500";

              return (
                <div key={stage.label}>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
                    <span>{stage.label}</span>
                    <span>{Math.round(stage.value).toLocaleString()}</span>
                  </div>
                  <div className="h-8 rounded-xl bg-slate-100 p-1">
                    <div
                      className={`h-full rounded-lg bg-gradient-to-r ${tone}`}
                      style={{ width: `${Math.min(100, widthPct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-cyan-800">
              CTR: <span className="font-semibold">{funnelData.ctr.toFixed(2)}%</span>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800">
              CVR: <span className="font-semibold">{funnelData.cvr.toFixed(2)}%</span>
            </div>
          </div>
        </article>

        <article className="demo-card">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Creator leaderboard</h2>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              Ranked by conversions
            </span>
          </div>

          <div className="space-y-3">
            {creatorLeaderboard.rows.map((row, index) => {
              const reachNumber = parseMetricNumber(row.reach);
              const ctrNumber = parseMetricNumber(row.ctr);
              const conversionNumber = parseMetricNumber(row.conversions);
              const reachWidth = (reachNumber / creatorLeaderboard.maxReach) * maxBarWidth;
              const ctrWidth = (ctrNumber / creatorLeaderboard.maxCtr) * maxBarWidth;

              return (
                <div key={row.creator} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <p className="font-semibold text-slate-900">{row.creator}</p>
                      {index === 0 ? (
                        <span className="rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                          Top performer
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span>Engagement {row.engagementRate}</span>
                      <span>CTR {row.ctr}</span>
                      <span className="font-semibold text-slate-900">{conversionNumber.toLocaleString()} conv</span>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 text-xs text-slate-600 md:grid-cols-2">
                    <div>
                      <p className="mb-1">Reach</p>
                      <div className="h-2 rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-slate-900" style={{ width: `${Math.max(18, reachWidth)}px` }} />
                      </div>
                    </div>
                    <div>
                      <p className="mb-1">CTR strength</p>
                      <div className="h-2 rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${Math.max(18, ctrWidth)}px` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {report.recommendations.map((item) => (
          <article key={item} className="demo-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recommendation</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
