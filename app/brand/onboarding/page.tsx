"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { budgetRanges, geoOptions, industryOptions } from "@/lib/constants";
import { useDemoState } from "@/lib/useDemoState";
import { SummaryCard } from "@/components/summary-card";

export default function BrandOnboardingPage() {
  const router = useRouter();
  const { state, updateState, hydrated } = useDemoState();

  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState(industryOptions[0]);
  const [budgetRange, setBudgetRange] = useState(budgetRanges[0]);
  const [targetGeo, setTargetGeo] = useState(geoOptions[0]);

  useEffect(() => {
    if (!state?.brandProfile) return;
    setCompanyName(state.brandProfile.companyName || "");
    setWebsite(state.brandProfile.website || "");
    setIndustry(state.brandProfile.industry || industryOptions[0]);
    setBudgetRange(state.brandProfile.budgetRange || budgetRanges[0]);
    setTargetGeo(state.brandProfile.targetGeo || geoOptions[0]);
  }, [state]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!companyName.trim()) return;

    updateState((prev) => ({
      ...prev,
      brandProfile: {
        companyName: companyName.trim(),
        website: website.trim() || undefined,
        industry,
        budgetRange,
        targetGeo
      }
    }));

    router.push("/brand/campaign/new");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="demo-card">
        <h1 className="text-2xl font-semibold text-ink">Brand Onboarding</h1>
        <p className="mt-2 text-sm text-slate-600">
          Tell us about your brand so we can personalize campaign recommendations and matching.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="companyName">
              Company name
            </label>
            <input
              id="companyName"
              className="input"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Northstar Nutrition"
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="website">
              Website (optional)
            </label>
            <input
              id="website"
              className="input"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label" htmlFor="industry">
                Industry
              </label>
              <select id="industry" className="input" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                {industryOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="budgetRange">
                Budget range
              </label>
              <select id="budgetRange" className="input" value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)}>
                {budgetRanges.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label" htmlFor="geo">
              Target geography
            </label>
            <select id="geo" className="input" value={targetGeo} onChange={(e) => setTargetGeo(e.target.value)}>
              {geoOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-sm text-slate-500">Step 1 of 4</span>
            <button className="btn-primary" type="submit">
              Save & Next: Campaign Setup
            </button>
          </div>
        </form>
      </section>

      <SummaryCard
        brandName={hydrated ? companyName : state?.brandProfile?.companyName}
        industry={hydrated ? industry : state?.brandProfile?.industry}
        geo={hydrated ? targetGeo : state?.brandProfile?.targetGeo}
      />
    </div>
  );
}
