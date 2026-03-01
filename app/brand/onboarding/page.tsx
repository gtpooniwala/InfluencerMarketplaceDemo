"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InterpretationBox } from "@/components/InterpretationBox";
import { useToast } from "@/components/toast-provider";
import { useDemoFlowStore } from "@/lib/demoFlowStore";
import { buildBrandBrief } from "@/lib/mockData";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function BrandOnboardingPage() {
  const router = useRouter();
  const { pushToast } = useToast();
  const { state, hydrated, setDemoState } = useDemoFlowStore();

  const [brandName, setBrandName] = useState("Bamboo Bump");
  const [website, setWebsite] = useState("https://bamboobump.co.uk");
  const [assets, setAssets] = useState<string[]>([
    "logo.svg",
    "product-packshot-01.jpg",
    "retail-line-sheet.pdf",
    "recent-content-examples.zip"
  ]);
  const [brandSummary, setBrandSummary] = useState("");
  const [builderCollapsed, setBuilderCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    setBrandName(state.brandMemory.brandName);
    setWebsite(state.brandMemory.website ?? "");
    setAssets(state.brandMemory.assets);
    if (state.brandBrief) {
      setShowProfile(true);
      setBuilderCollapsed(true);
    }
  }, [hydrated, state.brandBrief, state.brandMemory]);

  const addAsset = (asset: string) => {
    if (assets.includes(asset)) return;
    setAssets((prev) => [...prev, asset]);
    pushToast(`${asset} attached.`);
  };

  const buildMemory = () => ({
    brandName,
    website: website || undefined,
    positioning: state.brandMemory.positioning,
    assets
  });

  const handleGenerateProfile = () => {
    const nextMemory = buildMemory();
    setDemoState((prev) => ({
      ...prev,
      brandMemory: nextMemory,
      brandBrief: buildBrandBrief(nextMemory, brandSummary)
    }));
    setShowProfile(true);
    setBuilderCollapsed(true);
    pushToast("Brand profile generated.");
  };

  const handleViewEditProfile = () => {
    const nextMemory = buildMemory();
    setDemoState((prev) => ({
      ...prev,
      brandMemory: nextMemory,
      brandBrief: prev.brandBrief ?? buildBrandBrief(nextMemory, brandSummary)
    }));
    setShowProfile(true);
    setBuilderCollapsed(true);
    pushToast("Brand profile opened for editing.");
  };

  const updateBrief = <K extends keyof NonNullable<typeof state.brandBrief>>(field: K, value: NonNullable<typeof state.brandBrief>[K]) => {
    setDemoState((prev) => {
      if (!prev.brandBrief) return prev;
      return {
        ...prev,
        brandBrief: {
          ...prev.brandBrief,
          [field]: value
        }
      };
    });
  };

  return (
    <div className="space-y-6">
      <section className="demo-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">Brand Brief Builder</h1>
            <p className="mt-2 text-sm text-slate-600">
              Upload context or paste a summary. Generate a full brand profile, then edit it below.
            </p>
          </div>
          {showProfile && (
            <button type="button" className="btn-secondary" onClick={() => setBuilderCollapsed((prev) => !prev)}>
              {builderCollapsed ? "Expand builder" : "Collapse builder"}
            </button>
          )}
        </div>

        {!builderCollapsed && (
          <div className="space-y-4">
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

            <div>
              <label className="label" htmlFor="summary">
                Brand summary (optional)
              </label>
              <textarea
                id="summary"
                className="input min-h-20"
                value={brandSummary}
                onChange={(e) => setBrandSummary(e.target.value)}
                placeholder="Paste internal notes, campaign goals, or positioning summary"
              />
            </div>

            <div>
              <span className="label">Sample files already uploaded</span>
              <div className="flex flex-wrap gap-2">
                {assets.map((asset) => (
                  <span key={asset} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                    {asset}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["packaging-guide.pdf", "new-product-angles.pptx", "founder-notes.txt"].map((asset) => (
                  <button key={asset} type="button" className="btn-secondary" onClick={() => addAsset(asset)}>
                    Add {asset}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 border-t border-slate-100 pt-4">
              <button type="button" className="btn-primary px-6 py-2.5" onClick={handleGenerateProfile}>
                Generate profile
              </button>
              <button type="button" className="btn-secondary px-6 py-2.5" onClick={handleViewEditProfile}>
                View / edit profile
              </button>
            </div>
          </div>
        )}
      </section>

      {showProfile && state.brandBrief && (
        <section className="demo-card space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-ink">Brand Profile</h2>
            <p className="mt-1 text-sm text-slate-600">AI-generated from your site + files. Edit any field before continuing.</p>
          </div>

          <div>
            <label className="label">Brand summary</label>
            <textarea
              className="input min-h-24"
              value={state.brandBrief.summary}
              onChange={(e) => updateBrief("summary", e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Category</label>
              <input className="input" value={state.brandBrief.category} onChange={(e) => updateBrief("category", e.target.value)} />
            </div>
            <div>
              <label className="label">Subcategory</label>
              <input className="input" value={state.brandBrief.subcategory} onChange={(e) => updateBrief("subcategory", e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Product focus</label>
              <input className="input" value={state.brandBrief.productFocus} onChange={(e) => updateBrief("productFocus", e.target.value)} />
            </div>
            <div>
              <label className="label">Price tier</label>
              <input className="input" value={state.brandBrief.priceTier} onChange={(e) => updateBrief("priceTier", e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label">Positioning statement</label>
            <textarea
              className="input min-h-20"
              value={state.brandBrief.positioningStatement}
              onChange={(e) => updateBrief("positioningStatement", e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Primary customer</label>
              <input className="input" value={state.brandBrief.primaryCustomer} onChange={(e) => updateBrief("primaryCustomer", e.target.value)} />
            </div>
            <div>
              <label className="label">Geography</label>
              <input className="input" value={state.brandBrief.geography} onChange={(e) => updateBrief("geography", e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label">Tone tags (comma separated)</label>
            <input
              className="input"
              value={state.brandBrief.toneTags.join(", ")}
              onChange={(e) => updateBrief("toneTags", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Target segments (one per line)</label>
              <textarea
                className="input min-h-24"
                value={state.brandBrief.targetSegments.join("\n")}
                onChange={(e) => updateBrief("targetSegments", parseLines(e.target.value))}
              />
            </div>
            <div>
              <label className="label">Key claims / themes (one per line)</label>
              <textarea
                className="input min-h-24"
                value={state.brandBrief.keyClaims.join("\n")}
                onChange={(e) => updateBrief("keyClaims", parseLines(e.target.value))}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Messaging pillars (one per line)</label>
              <textarea
                className="input min-h-24"
                value={state.brandBrief.messagingPillars.join("\n")}
                onChange={(e) => updateBrief("messagingPillars", parseLines(e.target.value))}
              />
            </div>
            <div>
              <label className="label">Voice guidelines (Do / Don&apos;t, one per line)</label>
              <div className="grid gap-3">
                <textarea
                  className="input min-h-20"
                  value={state.brandBrief.doGuidelines.join("\n")}
                  onChange={(e) => updateBrief("doGuidelines", parseLines(e.target.value))}
                />
                <textarea
                  className="input min-h-20"
                  value={state.brandBrief.dontGuidelines.join("\n")}
                  onChange={(e) => updateBrief("dontGuidelines", parseLines(e.target.value))}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <InterpretationBox
        bullets={[
          "Operator interpretation: this profile is now your source of truth for creator matching and outreach tone.",
          "Recommendation: keep positioning and claims tight to improve shortlist precision.",
          "Next step: continue to campaign creation and generate your campaign brief."
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
