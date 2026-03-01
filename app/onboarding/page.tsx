"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast-provider";
import {
  budgetRangeOptions,
  categoryOptions,
  demoBrandProfile,
  marketOptions,
  vibeTagOptions,
  BrandProfile
} from "@/lib/demo-data";
import { useDemoStore } from "@/lib/demo-store";

const toggleArrayValue = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export default function OnboardingPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const { state, hydrated, setDemoState } = useDemoStore();

  const [useDemoData, setUseDemoData] = useState(true);
  const [form, setForm] = useState<BrandProfile>(demoBrandProfile);

  useEffect(() => {
    if (!hydrated) return;
    if (state.brandProfile) {
      setForm(state.brandProfile);
      setUseDemoData(state.brandProfile.brandName === demoBrandProfile.brandName);
    }
  }, [hydrated, state.brandProfile]);

  const applyDemoValues = (enabled: boolean) => {
    setUseDemoData(enabled);
    if (enabled) {
      setForm(demoBrandProfile);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.brandName.trim()) return;

    const payload: BrandProfile = {
      ...form,
      brandName: form.brandName.trim(),
      website: form.website?.trim() || undefined,
      doList: form.doList.trim(),
      dontList: form.dontList.trim()
    };

    setDemoState((prev) => ({
      ...prev,
      brandProfile: payload
    }));

    pushToast("Brand profile saved.");
    router.push("/campaign/new");
  };

  return (
    <section className="demo-card mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Brand onboarding</h1>
        <p className="mt-2 text-sm text-slate-600">High-signal setup so Agora can generate a better campaign fit story.</p>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={useDemoData}
          onChange={(event) => applyDemoValues(event.target.checked)}
          className="h-4 w-4"
        />
        Use demo data (CurveComfort)
      </label>

      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="brandName" className="label">
              Brand name
            </label>
            <input
              id="brandName"
              className="input"
              value={form.brandName}
              onChange={(event) => setForm((prev) => ({ ...prev, brandName: event.target.value }))}
              required
            />
          </div>
          <div>
            <label htmlFor="website" className="label">
              Website (optional)
            </label>
            <input
              id="website"
              className="input"
              value={form.website ?? ""}
              onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
              placeholder="https://curvecomfort.co.uk"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="category" className="label">
              Category
            </label>
            <select
              id="category"
              className="input"
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="market" className="label">
              Market
            </label>
            <select
              id="market"
              className="input"
              value={form.market}
              onChange={(event) => setForm((prev) => ({ ...prev, market: event.target.value as BrandProfile["market"] }))}
            >
              {marketOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="label">
              Budget range
            </label>
            <select
              id="budget"
              className="input"
              value={form.budgetRange}
              onChange={(event) => setForm((prev) => ({ ...prev, budgetRange: event.target.value }))}
            >
              {budgetRangeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <span className="label">Vibe tags</span>
          <div className="flex flex-wrap gap-2">
            {vibeTagOptions.map((tag) => {
              const active = form.vibeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, vibeTags: toggleArrayValue(prev.vibeTags, tag) }))}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    active ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="doList" className="label">
              Do
            </label>
            <textarea
              id="doList"
              className="input min-h-24"
              value={form.doList}
              onChange={(event) => setForm((prev) => ({ ...prev, doList: event.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="dontList" className="label">
              Don&apos;t
            </label>
            <textarea
              id="dontList"
              className="input min-h-24"
              value={form.dontList}
              onChange={(event) => setForm((prev) => ({ ...prev, dontList: event.target.value }))}
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-4">
          <button className="btn-primary px-5 py-2.5" type="submit">
            Next: Create campaign
          </button>
        </div>
      </form>
    </section>
  );
}
