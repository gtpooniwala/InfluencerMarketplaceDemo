"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast-provider";
import { Campaign, creativeAngles, demoCampaign } from "@/lib/demo-data";
import { useDemoStore } from "@/lib/demo-store";

const objectiveOptions: Campaign["objective"][] = ["Awareness", "Conversions", "UGC library"];

export default function CampaignCreationPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const { state, hydrated, setDemoState } = useDemoStore();

  const [form, setForm] = useState<Campaign>(demoCampaign);

  useEffect(() => {
    if (!hydrated) return;
    if (state.campaign) {
      setForm(state.campaign);
    }
  }, [hydrated, state.campaign]);

  const canGenerate = useMemo(
    () => Boolean(form.name.trim() && form.briefText.trim() && form.chosenCreativeAngleId),
    [form.briefText, form.chosenCreativeAngleId, form.name]
  );

  const togglePlatform = (platform: "TikTok" | "IG") => {
    setForm((prev) => {
      const has = prev.platforms.includes(platform);
      return {
        ...prev,
        platforms: has ? prev.platforms.filter((item) => item !== platform) : [...prev.platforms, platform]
      };
    });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canGenerate) return;

    setDemoState((prev) => ({
      ...prev,
      campaign: {
        ...form,
        name: form.name.trim(),
        briefText: form.briefText.trim(),
        productInfo: form.productInfo?.trim() || undefined,
        offer: form.offer?.trim() || undefined,
        platforms: form.platforms.length === 0 ? demoCampaign.platforms : form.platforms
      }
    }));

    pushToast("Matches generated from selected creative angle.");
    router.push("/match");
  };

  return (
    <section className="demo-card mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Create campaign</h1>
        <p className="mt-2 text-sm text-slate-600">Set a concise brief and pick an angle before creator matching.</p>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="campaignName" className="label">
              Campaign name
            </label>
            <input
              id="campaignName"
              className="input"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="objective" className="label">
              Objective
            </label>
            <select
              id="objective"
              className="input"
              value={form.objective}
              onChange={(event) => setForm((prev) => ({ ...prev, objective: event.target.value as Campaign["objective"] }))}
            >
              {objectiveOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <span className="label">Platforms</span>
            <div className="flex gap-2">
              {(["TikTok", "IG"] as const).map((platform) => {
                const active = form.platforms.includes(platform);
                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => togglePlatform(platform)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      active ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700"
                    }`}
                  >
                    {platform === "IG" ? "IG Reels" : platform}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label htmlFor="deliverablesCount" className="label">
              # creators / deliverables
            </label>
            <input
              id="deliverablesCount"
              type="number"
              min={1}
              max={10}
              className="input"
              value={form.deliverablesCount}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  deliverablesCount: Number.isNaN(Number(event.target.value)) ? 6 : Number(event.target.value)
                }))
              }
            />
          </div>
        </div>

        <div>
          <label htmlFor="briefText" className="label">
            Brief text
          </label>
          <textarea
            id="briefText"
            className="input min-h-28"
            value={form.briefText}
            onChange={(event) => setForm((prev) => ({ ...prev, briefText: event.target.value }))}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="productInfo" className="label">
              Product info (optional)
            </label>
            <textarea
              id="productInfo"
              className="input min-h-24"
              value={form.productInfo ?? ""}
              onChange={(event) => setForm((prev) => ({ ...prev, productInfo: event.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="offer" className="label">
              Offer / rate guidance
            </label>
            <textarea
              id="offer"
              className="input min-h-24"
              value={form.offer ?? ""}
              onChange={(event) => setForm((prev) => ({ ...prev, offer: event.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Suggested creative angles</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {creativeAngles.map((angle) => {
              const selected = form.chosenCreativeAngleId === angle.id;
              return (
                <article
                  key={angle.id}
                  className={`rounded-xl border p-4 transition ${
                    selected ? "border-slate-900 bg-white" : "border-slate-200 bg-white/70"
                  }`}
                >
                  <h3 className="text-base font-semibold text-ink">{angle.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{angle.description}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-600">
                    {angle.whyItWorks.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, chosenCreativeAngleId: angle.id }));
                      pushToast(`Selected angle: ${angle.title}`);
                    }}
                    className={`mt-4 w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      selected ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700"
                    }`}
                  >
                    {selected ? "Selected" : "Select angle"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-4">
          <button type="submit" className="btn-primary px-5 py-2.5" disabled={!canGenerate}>
            Generate creator matches
          </button>
        </div>
      </form>
    </section>
  );
}
