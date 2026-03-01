"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InterpretationBox } from "@/components/InterpretationBox";
import { useToast } from "@/components/toast-provider";
import { useDemoFlowStore } from "@/lib/demoFlowStore";
import { Positioning, buildBrandBrief, positioningOptions } from "@/lib/mockData";

export default function BrandOnboardingPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const { state, hydrated, setDemoState } = useDemoFlowStore();

  const [brandName, setBrandName] = useState("Bamboo Bump");
  const [website, setWebsite] = useState("https://bamboobump.co.uk");
  const [positioning, setPositioning] = useState<Positioning>("Playful");
  const [assets, setAssets] = useState<string[]>(["logo.svg", "product-front.jpg"]);

  useEffect(() => {
    if (!hydrated) return;
    setBrandName(state.brandMemory.brandName);
    setWebsite(state.brandMemory.website ?? "");
    setPositioning(state.brandMemory.positioning);
    setAssets(state.brandMemory.assets);
  }, [hydrated, state.brandMemory]);

  const addAsset = (asset: string) => {
    if (assets.includes(asset)) return;
    setAssets((prev) => [...prev, asset]);
    pushToast(`${asset} attached.`);
  };

  const handleGenerate = () => {
    const nextMemory = { brandName, website: website || undefined, positioning, assets };
    setDemoState((prev) => ({
      ...prev,
      brandMemory: nextMemory,
      brandBrief: buildBrandBrief(nextMemory)
    }));
    pushToast("Brand brief generated.");
  };

  return (
    <div className="space-y-6">
      <section className="demo-card space-y-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Brand Brief Builder</h1>
          <p className="mt-2 text-sm text-slate-600">Start from your existing brand assets. Let the operator draft the brief for you.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="website">
              Website URL
            </label>
            <input id="website" className="input" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <div>
            <label className="label" htmlFor="brandName">
              Brand name
            </label>
            <input id="brandName" className="input" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="positioning">
              Positioning
            </label>
            <select id="positioning" className="input" value={positioning} onChange={(e) => setPositioning(e.target.value as Positioning)}>
              {positioningOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="label">Upload brand assets</span>
            <div className="flex flex-wrap gap-2">
              {["logo.svg", "product-hero.jpg", "campaign-pack.pdf", "ugc-guide.pdf"].map((asset) => (
                <button key={asset} type="button" className="btn-secondary" onClick={() => addAsset(asset)}>
                  {asset}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          Attached: {assets.join(", ")}
        </div>

        <div className="flex justify-center">
          <button type="button" className="btn-primary px-6 py-2.5" onClick={handleGenerate}>
            Generate brand brief
          </button>
        </div>
      </section>

      {state.brandBrief && (
        <section className="demo-card space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-ink">Brand Brief</h2>
            <p className="mt-1 text-sm text-slate-600">AI-generated from your site + assets. Edit anything.</p>
          </div>

          <p className="text-sm text-slate-700">{state.brandBrief.summary}</p>

          <div className="flex flex-wrap gap-2">
            {state.brandBrief.toneTags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
                {tag}
              </span>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Primary customer:</span> {state.brandBrief.primaryCustomer}</p>
            <p><span className="font-semibold text-slate-900">Geography:</span> {state.brandBrief.geography}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Key product claims / themes</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                {state.brandBrief.keyClaims.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Do / Don&apos;t voice guidelines</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Do</p>
              <ul className="mt-1 list-disc pl-5 text-sm text-slate-700 space-y-1">
                {state.brandBrief.doGuidelines.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Don&apos;t</p>
              <ul className="mt-1 list-disc pl-5 text-sm text-slate-700 space-y-1">
                {state.brandBrief.dontGuidelines.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <details className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <summary className="cursor-pointer text-sm font-semibold text-slate-700">Advanced controls</summary>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <label className="label">Brand name</label>
                <input className="input" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
              </div>
              <div>
                <label className="label">Positioning</label>
                <select className="input" value={positioning} onChange={(e) => setPositioning(e.target.value as Positioning)}>
                  {positioningOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </details>
        </section>
      )}

      <InterpretationBox
        bullets={[
          "Operator interpretation: brand voice should balance confidence with practical daily proof.",
          "Recommendation: prioritize relatable creators with strong save-to-click behavior.",
          "Next step: generate campaign brief from this brand brief context."
        ]}
      />

      <div className="flex justify-center">
        <button type="button" className="btn-primary px-6 py-2.5" onClick={() => router.push("/campaign/new")}>
          Continue to campaign
        </button>
      </div>
    </div>
  );
}
