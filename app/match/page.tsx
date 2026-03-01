"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast-provider";
import {
  Creator,
  creators,
  creatorsAgoraRanked,
  creatorsProxyRanked,
  demoBrandProfile,
  demoCampaign,
  findCreativeAngle,
  proxyFitOverrides
} from "@/lib/demo-data";
import { buildWorkspaceState, useDemoStore } from "@/lib/demo-store";

type MatchMode = "agora" | "proxies";

const creatorById = new Map(creators.map((creator) => [creator.id, creator]));

const scoreClass = (score: number) => {
  if (score >= 90) return "text-emerald-700 bg-emerald-50";
  if (score >= 80) return "text-blue-700 bg-blue-50";
  return "text-slate-700 bg-slate-100";
};

const FitBar = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-xs text-slate-500">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-2 rounded-full bg-slate-100">
      <div className="h-2 rounded-full bg-slate-700" style={{ width: `${value}%` }} />
    </div>
  </div>
);

const deriveCreatorForMode = (creator: Creator, mode: MatchMode): Creator => {
  if (mode === "agora") return creator;

  const override = proxyFitOverrides[creator.id];
  if (!override) return creator;

  return {
    ...creator,
    fitScore: override.fitScore,
    fitBreakdown: override.fitBreakdown,
    whyMatch: [
      `Keyword overlap detected for ${creator.nicheTags.slice(0, 2).join(" + ")}.`,
      "Proxy mode has limited context about tone and storytelling fit."
    ]
  };
};

export default function MatchPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const { state, hydrated, setDemoState } = useDemoStore();

  const [mode, setMode] = useState<MatchMode>("agora");
  const [platformFilter, setPlatformFilter] = useState<"all" | "TikTok" | "IG">("all");
  const [maxRate, setMaxRate] = useState(1000);
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeCreatorId, setActiveCreatorId] = useState<string | null>(null);

  const campaign = state.campaign ?? demoCampaign;
  const brand = state.brandProfile ?? demoBrandProfile;
  const chosenAngle = findCreativeAngle(campaign.chosenCreativeAngleId);

  useEffect(() => {
    if (!hydrated) return;
    setSelectedIds(state.selection.selectedCreatorIds);
  }, [hydrated, state.selection.selectedCreatorIds]);

  const rankedIds = mode === "agora" ? creatorsAgoraRanked : creatorsProxyRanked;

  const locationOptions = useMemo(() => {
    const allLocations = creators.map((creator) => creator.location).sort();
    return ["all", ...allLocations];
  }, []);

  const rankedCreators = useMemo(() => {
    return rankedIds
      .map((id) => creatorById.get(id))
      .filter((creator): creator is Creator => Boolean(creator))
      .map((creator) => deriveCreatorForMode(creator, mode))
      .filter((creator) => platformFilter === "all" || creator.platform === platformFilter)
      .filter((creator) => creator.estRateMax <= maxRate)
      .filter((creator) => locationFilter === "all" || creator.location === locationFilter);
  }, [locationFilter, maxRate, mode, platformFilter, rankedIds]);

  const activeCreator = activeCreatorId ? rankedCreators.find((creator) => creator.id === activeCreatorId) : null;

  const toggleCreatorSelection = (creatorId: string) => {
    setSelectedIds((prev) => {
      const exists = prev.includes(creatorId);
      if (exists) {
        const next = prev.filter((id) => id !== creatorId);
        setDemoState((current) => ({ ...current, selection: { selectedCreatorIds: next } }));
        return next;
      }

      if (prev.length >= campaign.deliverablesCount) {
        pushToast(`You can select up to ${campaign.deliverablesCount} creators.`);
        return prev;
      }

      const next = [...prev, creatorId];
      setDemoState((current) => ({ ...current, selection: { selectedCreatorIds: next } }));
      return next;
    });
  };

  const openWorkspace = () => {
    if (selectedIds.length === 0) return;

    setDemoState((prev) => {
      const base = {
        ...prev,
        brandProfile: prev.brandProfile ?? brand,
        campaign: prev.campaign ?? campaign
      };
      return buildWorkspaceState(base, selectedIds);
    });

    pushToast("Outreach template generated.");
    router.push("/campaign/workspace");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <aside className="demo-card h-fit space-y-4">
        <div>
          <h2 className="text-base font-semibold text-ink">Filters</h2>
          <p className="mt-1 text-xs text-slate-500">Light constraints for quick shortlist exploration.</p>
        </div>

        <div>
          <label htmlFor="platform" className="label">
            Platform
          </label>
          <select
            id="platform"
            className="input"
            value={platformFilter}
            onChange={(event) => setPlatformFilter(event.target.value as "all" | "TikTok" | "IG")}
          >
            <option value="all">All</option>
            <option value="TikTok">TikTok</option>
            <option value="IG">IG Reels</option>
          </select>
        </div>

        <div>
          <label htmlFor="maxRate" className="label">
            Max rate (£)
          </label>
          <input
            id="maxRate"
            className="input"
            type="range"
            min={350}
            max={1000}
            step={50}
            value={maxRate}
            onChange={(event) => setMaxRate(Number(event.target.value))}
          />
          <p className="mt-1 text-xs text-slate-500">Up to £{maxRate}</p>
        </div>

        <div>
          <label htmlFor="location" className="label">
            Location
          </label>
          <select id="location" className="input" value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)}>
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location === "all" ? "All UK" : location}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <section className="space-y-4">
        <div className="demo-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-ink">Creator matches</h1>
              <p className="mt-2 text-sm text-slate-600">
                {brand.brandName} · {campaign.objective} · {chosenAngle.title}
              </p>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              Match mode
              <button
                onClick={() => setMode("proxies")}
                className={`ml-2 rounded-full px-2 py-1 ${mode === "proxies" ? "bg-slate-900 text-white" : "text-slate-600"}`}
              >
                Proxies
              </button>
              <button
                onClick={() => setMode("agora")}
                className={`ml-1 rounded-full px-2 py-1 ${mode === "agora" ? "bg-slate-900 text-white" : "text-slate-600"}`}
              >
                Agora Fit
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            {mode === "agora"
              ? "Agora Fit includes audience, message, and vibe explainability."
              : "Proxy mode is mostly keyword overlap and produces weaker rationale."}
          </p>
        </div>

        <div className="space-y-3">
          {rankedCreators.map((creator) => {
            const selected = selectedIds.includes(creator.id);
            return (
              <article key={creator.id} className="demo-card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img src={creator.avatarUrl} alt={creator.name} className="h-12 w-12 rounded-full border border-slate-200" />
                    <div>
                      <h3 className="text-lg font-semibold text-ink">
                        {creator.name} <span className="text-sm font-normal text-slate-500">{creator.handle}</span>
                      </h3>
                      <p className="text-sm text-slate-600">
                        {creator.platform === "IG" ? "IG Reels" : creator.platform} · {creator.location}
                      </p>
                      <p className="text-xs text-slate-500">
                        {creator.followers.toLocaleString()} followers · {creator.avgViews.toLocaleString()} avg views · {creator.estRateRange}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`rounded-xl px-3 py-2 text-sm font-semibold ${scoreClass(creator.fitScore)}`}>
                      Fit {creator.fitScore}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleCreatorSelection(creator.id)}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        selected ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {selected ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <FitBar label="Audience" value={creator.fitBreakdown.audience} />
                  <FitBar label="Message" value={creator.fitBreakdown.message} />
                  <FitBar label="Vibe" value={creator.fitBreakdown.vibe} />
                </div>

                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {creator.whyMatch.slice(0, 3).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setActiveCreatorId(creator.id)}
                  className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
                >
                  View rationale
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {activeCreator && (
        <div className="fixed inset-0 z-40 bg-slate-900/20">
          <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-ink">Explainability panel</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {activeCreator.name} {activeCreator.handle}
                </p>
              </div>
              <button onClick={() => setActiveCreatorId(null)} className="rounded-lg border border-slate-200 px-3 py-1 text-sm">
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <FitBar label="Audience" value={activeCreator.fitBreakdown.audience} />
              <FitBar label="Message" value={activeCreator.fitBreakdown.message} />
              <FitBar label="Vibe" value={activeCreator.fitBreakdown.vibe} />
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Content themes detected</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {activeCreator.nicheTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {activeCreator.sampleContent.slice(0, 2).map((sample) => (
                <article key={sample.title} className="overflow-hidden rounded-xl border border-slate-200">
                  <img src={sample.thumbnailUrl} alt={sample.title} className="h-28 w-full object-cover" />
                  <p className="px-3 py-2 text-xs font-medium text-slate-700">{sample.title}</p>
                </article>
              ))}
            </div>

            {activeCreator.risks && activeCreator.risks.length > 0 && (
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <p className="font-semibold">Potential risks</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {activeCreator.risks.map((risk) => (
                    <li key={risk}>{risk}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => toggleCreatorSelection(activeCreator.id)}
                className="btn-primary"
              >
                {selectedIds.includes(activeCreator.id) ? "Remove" : "Select creator"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 left-1/2 z-30 w-[min(860px,95vw)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Selected {selectedIds.length}/{campaign.deliverablesCount} creators
          </p>
          <button className="btn-primary" onClick={openWorkspace} disabled={selectedIds.length === 0}>
            Generate outreach + open workspace
          </button>
        </div>
      </div>
    </div>
  );
}
