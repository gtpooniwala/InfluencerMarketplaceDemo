"use client";

import { Campaign } from "@/lib/types";

type CampaignPreview = {
  name?: string;
  objective?: string;
  budget?: number;
  platforms?: string[];
};

type SummaryCardProps = {
  brandName?: string;
  industry?: string;
  geo?: string;
  campaign?: Campaign;
  campaignPreview?: CampaignPreview;
};

export const SummaryCard = ({ brandName, industry, geo, campaign, campaignPreview }: SummaryCardProps) => {
  const campaignName = campaignPreview?.name ?? campaign?.name;
  const campaignObjective = campaignPreview?.objective ?? campaign?.objective;
  const campaignBudget = campaignPreview?.budget ?? campaign?.budget;
  const campaignPlatforms = campaignPreview?.platforms ?? campaign?.platforms;

  return (
    <aside className="sticky top-24 h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Live Summary</h3>
      <div className="mt-4 space-y-3 text-sm">
        <div>
          <p className="text-slate-500">Brand</p>
          <p className="font-medium text-ink">{brandName || "Not set yet"}</p>
        </div>
        <div>
          <p className="text-slate-500">Industry</p>
          <p className="font-medium text-ink">{industry || "Not set yet"}</p>
        </div>
        <div>
          <p className="text-slate-500">Target Geo</p>
          <p className="font-medium text-ink">{geo || "Not set yet"}</p>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4 text-sm">
        <p className="text-slate-500">Campaign</p>
        {campaignName ? (
          <div className="mt-2 space-y-1">
            <p className="font-medium text-ink">{campaignName}</p>
            <p className="text-slate-600">Objective: {campaignObjective || "Not set yet"}</p>
            <p className="text-slate-600">Budget: {campaignBudget ? `$${campaignBudget.toLocaleString()}` : "Not set yet"}</p>
            <p className="text-slate-600">Platforms: {campaignPlatforms?.length ? campaignPlatforms.join(", ") : "Not set yet"}</p>
          </div>
        ) : (
          <p className="mt-2 text-slate-600">No campaign drafted yet.</p>
        )}
      </div>
    </aside>
  );
};
