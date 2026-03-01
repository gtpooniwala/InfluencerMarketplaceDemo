"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useToast } from "@/components/toast-provider";
import { creators, demoPerformance, findCreativeAngle } from "@/lib/demo-data";
import { useDemoStore } from "@/lib/demo-store";

type Tab = "Outreach" | "Contracts" | "Performance";

type Point = {
  x: number;
  y: number;
};

const linePathFromData = (points: Point[]) => {
  if (points.length === 0) return "";
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
};

export default function CampaignWorkspacePage() {
  const { pushToast } = useToast();
  const { state, setDemoState } = useDemoStore();

  const [tab, setTab] = useState<Tab>("Outreach");
  const [showContractModal, setShowContractModal] = useState(false);

  const selectedCreators = useMemo(() => {
    const selected = new Set(state.selection.selectedCreatorIds);
    return creators.filter((creator) => selected.has(creator.id));
  }, [state.selection.selectedCreatorIds]);

  if (selectedCreators.length === 0) {
    return (
      <section className="demo-card space-y-4">
        <h1 className="text-2xl font-semibold text-ink">Workspace</h1>
        <p className="text-slate-600">No creators selected yet. Start from matching and build your shortlist first.</p>
        <Link href="/match" className="btn-primary">
          Go to matching
        </Link>
      </section>
    );
  }

  const outreachStatuses = state.outreach.perCreatorStatus;
  const contractStatuses = state.contracts.perCreatorContractStatus;
  const campaign = state.campaign;
  const performance = state.performance ?? demoPerformance;

  const statusOf = (creatorId: string) => outreachStatuses[creatorId] ?? "invited";

  const bins = {
    invited: selectedCreators.filter((creator) => statusOf(creator.id) === "invited"),
    interested: selectedCreators.filter((creator) => statusOf(creator.id) === "interested"),
    negotiating: selectedCreators.filter((creator) => statusOf(creator.id) === "negotiating"),
    contracted: selectedCreators.filter((creator) => statusOf(creator.id) === "contracted")
  };

  const changeOutreachStatus = (creatorId: string, status: "invited" | "interested" | "negotiating" | "contracted" | "declined") => {
    setDemoState((prev) => ({
      ...prev,
      outreach: {
        ...prev.outreach,
        perCreatorStatus: {
          ...prev.outreach.perCreatorStatus,
          [creatorId]: status
        }
      }
    }));
  };

  const sendInvites = () => {
    setDemoState((prev) => {
      const nextStatuses = { ...prev.outreach.perCreatorStatus };
      for (const creator of selectedCreators) {
        if (nextStatuses[creator.id] === "invited") {
          nextStatuses[creator.id] = "interested";
        }
      }

      return {
        ...prev,
        outreach: {
          ...prev.outreach,
          perCreatorStatus: nextStatuses
        }
      };
    });
    pushToast("Invites sent. Pipeline updated.");
  };

  const setTemplate = (value: string) => {
    setDemoState((prev) => ({
      ...prev,
      outreach: {
        ...prev.outreach,
        generatedMessageTemplate: value
      }
    }));
  };

  const setContractStatus = (creatorId: string, status: "draft" | "sent" | "signed") => {
    setDemoState((prev) => {
      const nextOutreach = { ...prev.outreach.perCreatorStatus };
      if (status === "signed") {
        nextOutreach[creatorId] = "contracted";
      }

      return {
        ...prev,
        outreach: {
          ...prev.outreach,
          perCreatorStatus: nextOutreach
        },
        contracts: {
          ...prev.contracts,
          perCreatorContractStatus: {
            ...prev.contracts.perCreatorContractStatus,
            [creatorId]: status
          }
        }
      };
    });

    if (status === "sent") {
      pushToast("Contract sent.");
    }
    if (status === "signed") {
      pushToast("Contract marked signed.");
    }
  };

  const maxReach = Math.max(...performance.chartData.map((point) => point.reach));
  const chartPoints = performance.chartData.map((point, index) => {
    const x = (index / (performance.chartData.length - 1)) * 560;
    const y = 160 - (point.reach / maxReach) * 140;
    return { x, y };
  });

  const angleLabel = campaign ? findCreativeAngle(campaign.chosenCreativeAngleId).title : "Comfort Saves The Day";

  return (
    <div className="space-y-5">
      <section className="demo-card flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Campaign workspace</h1>
          <p className="mt-2 text-sm text-slate-600">Outreach, contracts, and performance in one scripted workspace.</p>
        </div>
        <div className="flex gap-2 rounded-xl border border-slate-200 p-1">
          {(["Outreach", "Contracts", "Performance"] as Tab[]).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${tab === item ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {tab === "Outreach" && (
        <section className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                { key: "invited", label: "Invited", items: bins.invited },
                { key: "interested", label: "Interested", items: bins.interested },
                { key: "negotiating", label: "Negotiating", items: bins.negotiating },
                { key: "contracted", label: "Contracted", items: bins.contracted }
              ].map((column) => (
                <div key={column.key} className="rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-700">{column.label}</h3>
                    <span className="text-xs text-slate-500">{column.items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {column.items.map((creator) => (
                      <article key={creator.id} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                        <p className="text-sm font-semibold text-ink">{creator.name}</p>
                        <p className="text-xs text-slate-500">{creator.handle}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {column.key === "interested" && (
                            <button
                              onClick={() => changeOutreachStatus(creator.id, "negotiating")}
                              className="rounded-md border border-slate-200 px-2 py-1 text-xs"
                            >
                              Mark negotiating
                            </button>
                          )}
                          {column.key === "negotiating" && (
                            <button
                              onClick={() => changeOutreachStatus(creator.id, "contracted")}
                              className="rounded-md border border-slate-200 px-2 py-1 text-xs"
                            >
                              Mark contracted
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={sendInvites}>
              Send invites
            </button>
          </div>

          <aside className="demo-card space-y-3">
            <h2 className="text-base font-semibold text-ink">Generated outreach message</h2>
            <textarea
              className="input min-h-64 text-sm"
              value={state.outreach.generatedMessageTemplate}
              onChange={(event) => setTemplate(event.target.value)}
            />
            <p className="text-xs text-slate-500">Template includes campaign angle, deliverable expectations, and rate guidance.</p>
          </aside>
        </section>
      )}

      {tab === "Contracts" && (
        <section className="demo-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-ink">Contracting</h2>
            <button
              className="btn-secondary"
              onClick={() => {
                setShowContractModal(true);
                pushToast("Contract preview generated.");
              }}
            >
              Generate contract
            </button>
          </div>

          <div className="space-y-2">
            {selectedCreators.map((creator) => {
              const status = contractStatuses[creator.id] ?? "draft";
              return (
                <article key={creator.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 p-3">
                  <div>
                    <p className="font-semibold text-ink">{creator.name}</p>
                    <p className="text-xs text-slate-500">{creator.handle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase text-slate-600">
                      {status}
                    </span>
                    <button className="btn-secondary" onClick={() => setContractStatus(creator.id, "sent")}>
                      Send contract
                    </button>
                    <button className="btn-primary" onClick={() => setContractStatus(creator.id, "signed")}>
                      Mark signed
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {tab === "Performance" && (
        <section className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            <article className="demo-card">
              <p className="text-xs uppercase tracking-wide text-slate-500">Spend</p>
              <p className="mt-2 text-2xl font-semibold text-ink">£{performance.kpis.spend.toLocaleString()}</p>
            </article>
            <article className="demo-card">
              <p className="text-xs uppercase tracking-wide text-slate-500">Est Reach</p>
              <p className="mt-2 text-2xl font-semibold text-ink">{performance.kpis.estReach.toLocaleString()}</p>
            </article>
            <article className="demo-card">
              <p className="text-xs uppercase tracking-wide text-slate-500">Clicks</p>
              <p className="mt-2 text-2xl font-semibold text-ink">{performance.kpis.clicks.toLocaleString()}</p>
            </article>
            <article className="demo-card">
              <p className="text-xs uppercase tracking-wide text-slate-500">Est CAC</p>
              <p className="mt-2 text-2xl font-semibold text-ink">£{performance.kpis.estCAC}</p>
            </article>
          </div>

          <div className="demo-card">
            <h2 className="text-lg font-semibold text-ink">Estimated reach over time</h2>
            <svg viewBox="0 0 560 180" className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 p-2">
              <path d={linePathFromData(chartPoints)} fill="none" stroke="#0f172a" strokeWidth="3" />
              {chartPoints.map((point, idx) => (
                <circle key={idx} cx={point.x} cy={point.y} r="3" fill="#0f172a" />
              ))}
            </svg>
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              {performance.chartData.map((point) => (
                <span key={point.day}>{point.day}</span>
              ))}
            </div>
          </div>

          <div className="demo-card">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Insights</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Top creator by CAC: Mina & Joe (@flatsharelaughs) based on click-to-conversion estimate.</li>
              <li>Recommended next campaign angle: {angleLabel} with two comedy-led retargeting variants.</li>
            </ul>
          </div>
        </section>
      )}

      {showContractModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 p-4">
          <div className="mx-auto mt-20 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-semibold text-ink">Contract preview</h2>
              <button onClick={() => setShowContractModal(false)} className="rounded-lg border border-slate-200 px-3 py-1 text-sm">
                Close
              </button>
            </div>
            <pre className="mt-4 max-h-96 overflow-y-auto rounded-xl bg-slate-50 p-4 text-xs text-slate-700">
              {state.contracts.contractPreviewText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
