"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast-provider";
import { useDemoFlowStore } from "@/lib/demoFlowStore";
import { Positioning, positioningOptions } from "@/lib/mockData";

export default function BrandOnboardingPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const { state, hydrated, setBrandMemory } = useDemoFlowStore();

  const [brandName, setBrandName] = useState("Bamboo Bump");
  const [website, setWebsite] = useState("https://bamboobump.co.uk");
  const [positioning, setPositioning] = useState<Positioning>("Playful");
  const [assets, setAssets] = useState<string[]>(["logo.svg", "hero-product.jpg"]);

  useEffect(() => {
    if (!hydrated) return;
    setBrandName(state.brandMemory.brandName);
    setWebsite(state.brandMemory.website ?? "");
    setPositioning(state.brandMemory.positioning);
    setAssets(state.brandMemory.assets);
  }, [hydrated, state.brandMemory]);

  const addAssetPlaceholder = (label: string) => {
    if (assets.includes(label)) return;
    setAssets((prev) => [...prev, label]);
    pushToast(`${label} added to Brand Memory.`);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setBrandMemory({
      brandName,
      website: website || undefined,
      positioning,
      assets
    });

    pushToast("Brand Memory saved.");
    router.push("/campaign/new");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="demo-card space-y-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Brand Memory</h1>
          <p className="mt-2 text-sm text-slate-600">Set core context once. The operator uses this memory across the campaign flow.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="brandName" className="label">
              Brand name
            </label>
            <input id="brandName" className="input" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          </div>

          <div>
            <label htmlFor="website" className="label">
              Website URL (optional)
            </label>
            <input id="website" className="input" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <div>
            <label htmlFor="positioning" className="label">
              Positioning
            </label>
            <select
              id="positioning"
              className="input"
              value={positioning}
              onChange={(e) => setPositioning(e.target.value as Positioning)}
            >
              {positioningOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="label">Upload brand assets (placeholder)</span>
            <div className="flex flex-wrap gap-2">
              {[
                "logo.svg",
                "product-front.jpg",
                "product-detail.jpg",
                "brand-guidelines.pdf"
              ].map((asset) => (
                <button
                  key={asset}
                  type="button"
                  onClick={() => addAssetPlaceholder(asset)}
                  className="btn-secondary"
                >
                  {asset}
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              Selected: {assets.join(", ")}
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-4">
            <button type="submit" className="btn-primary px-5 py-2.5">
              Continue
            </button>
          </div>
        </form>
      </section>

      <aside className="demo-card h-fit">
        <h2 className="text-lg font-semibold text-ink">What we already know</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">Tone extracted</li>
          <li className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">Values detected</li>
          <li className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">Price positioning inferred</li>
          <li className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">Target customer summary</li>
        </ul>
      </aside>
    </div>
  );
}
