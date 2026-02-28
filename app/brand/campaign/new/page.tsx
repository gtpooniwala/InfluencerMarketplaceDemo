"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { nicheOptions, platformOptions } from "@/lib/constants";
import { appendCampaign } from "@/lib/demo-actions";
import { SummaryCard } from "@/components/summary-card";
import { useDemoState } from "@/lib/useDemoState";

export default function NewCampaignPage() {
  const router = useRouter();
  const { state, updateState } = useDemoState();

  const [name, setName] = useState("Spring UGC Push");
  const [objective, setObjective] = useState("Drive high-intent traffic and creator-led conversions.");
  const [platforms, setPlatforms] = useState<string[]>(["TikTok", "Instagram"]);
  const [tags, setTags] = useState<string[]>(["fitness", "wellness"]);
  const [budget, setBudget] = useState(18000);
  const [timeline, setTimeline] = useState("6 weeks");

  const toggleArrayValue = (list: string[], value: string) =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || platforms.length === 0 || tags.length === 0) return;

    let nextCampaignId = "";

    updateState((prev) => {
      const result = appendCampaign(prev, {
        name: name.trim(),
        objective: objective.trim(),
        platforms,
        nicheTags: tags,
        budget,
        timeline
      });
      nextCampaignId = result.campaignId;
      return result.state;
    });

    if (nextCampaignId) {
      router.push(`/brand/campaign/${nextCampaignId}/matches`);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="demo-card">
        <h1 className="text-2xl font-semibold text-ink">Create Marketing Campaign</h1>
        <p className="mt-2 text-sm text-slate-600">
          Define campaign details and we will pre-rank the most relevant micro-influencers.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label className="label" htmlFor="name">
              Campaign name
            </label>
            <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="label" htmlFor="objective">
              Objective
            </label>
            <textarea
              id="objective"
              className="input min-h-24"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              required
            />
          </div>

          <div>
            <span className="label">Platforms</span>
            <div className="flex flex-wrap gap-2">
              {platformOptions.map((platform) => {
                const active = platforms.includes(platform);
                return (
                  <button
                    type="button"
                    key={platform}
                    onClick={() => setPlatforms((prev) => toggleArrayValue(prev, platform))}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                      active ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {platform}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="label">Niche tags</span>
            <div className="flex flex-wrap gap-2">
              {nicheOptions.map((tag) => {
                const active = tags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setTags((prev) => toggleArrayValue(prev, tag))}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                      active ? "bg-blue-100 text-blue-800" : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label" htmlFor="budget">
                Budget (USD)
              </label>
              <input
                id="budget"
                className="input"
                type="number"
                min={1000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="label" htmlFor="timeline">
                Timeline
              </label>
              <input
                id="timeline"
                className="input"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="6 weeks"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-sm text-slate-500">Step 2 of 4</span>
            <button className="btn-primary" type="submit">
              Save & Next: Find Matches
            </button>
          </div>
        </form>
      </section>

      <SummaryCard
        brandName={state?.brandProfile?.companyName}
        industry={state?.brandProfile?.industry}
        geo={state?.brandProfile?.targetGeo}
        campaignPreview={{
          name,
          objective,
          budget,
          platforms
        }}
      />
    </div>
  );
}
