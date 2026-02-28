"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { calculateFitScore, matchReasons } from "@/lib/matching";
import { createOfferDraft } from "@/lib/storage";
import { followerRangeOptions, nicheOptions, platformOptions } from "@/lib/constants";
import { useDemoState } from "@/lib/useDemoState";

const inFollowerRange = (followers: number, range: string) => {
  if (range === "10-30") return followers >= 10000 && followers <= 30000;
  if (range === "30-50") return followers > 30000 && followers <= 50000;
  if (range === "50+") return followers > 50000;
  return true;
};

export default function CampaignMatchesPage() {
  const params = useParams<{ id: string }>();
  const campaignId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { state, updateState, hydrated } = useDemoState();

  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [geoFilter, setGeoFilter] = useState<string>("all");
  const [followerFilter, setFollowerFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const campaign = useMemo(
    () => state?.campaigns.find((item) => item.id === campaignId),
    [campaignId, state?.campaigns]
  );

  const rankedInfluencers = useMemo(() => {
    if (!state || !campaign) return [];

    const targetGeo = state.brandProfile?.targetGeo;

    return state.influencers
      .filter((influencer) => {
        if (platformFilter !== "all" && influencer.platform !== platformFilter) return false;
        if (tagFilter !== "all" && !influencer.nicheTags.includes(tagFilter)) return false;
        if (geoFilter !== "all" && influencer.audienceGeoTop !== geoFilter) return false;
        if (!inFollowerRange(influencer.followers, followerFilter)) return false;
        return true;
      })
      .map((influencer) => ({
        influencer,
        score: calculateFitScore(campaign, influencer, targetGeo),
        reasons: matchReasons(campaign, influencer, targetGeo)
      }))
      .sort((a, b) => b.score - a.score);
  }, [campaign, followerFilter, geoFilter, platformFilter, state, tagFilter]);

  const existingOffers = useMemo(
    () => state?.offers.filter((offer) => offer.campaignId === campaignId) ?? [],
    [campaignId, state?.offers]
  );

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const sendOffers = () => {
    if (!campaign || selectedIds.length === 0) return;

    updateState((prev) => {
      const offers = [...prev.offers];

      for (const influencerId of selectedIds) {
        const existingIndex = offers.findIndex(
          (offer) => offer.campaignId === campaign.id && offer.influencerId === influencerId
        );

        if (existingIndex >= 0) {
          offers[existingIndex] = {
            ...offers[existingIndex],
            status: "Sent"
          };
          continue;
        }

        const influencer = prev.influencers.find((item) => item.id === influencerId);
        if (!influencer) continue;

        const amount = Math.round((influencer.estCPM * influencer.followers) / 1000);
        offers.push(createOfferDraft(campaign.id, influencer.id, amount));
      }

      return {
        ...prev,
        campaigns: prev.campaigns.map((item) =>
          item.id === campaign.id
            ? {
                ...item,
                status: "Active"
              }
            : item
        ),
        offers,
        activeCampaignId: campaign.id
      };
    });

    router.push(`/brand/campaign/${campaign.id}/coord`);
  };

  if (!hydrated) {
    return <div className="demo-card">Loading campaign context...</div>;
  }

  if (!campaign || !state) {
    return (
      <section className="demo-card space-y-4">
        <h1 className="text-2xl font-semibold text-ink">Campaign Not Found</h1>
        <p className="text-slate-600">Create a campaign first, then return to view ranked influencers.</p>
        <Link href="/brand/campaign/new" className="btn-primary">
          Create Campaign
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className="demo-card flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Influencer Matches</h1>
          <p className="mt-1 text-sm text-slate-600">
            Ranked for <span className="font-medium text-slate-900">{campaign.name}</span> based on tags, platform fit, budget,
            and engagement.
          </p>
        </div>
        <div className="text-right text-sm text-slate-600">
          <p>{selectedIds.length} selected</p>
          <p>{existingOffers.length} offers already in this campaign</p>
        </div>
      </section>

      <section className="demo-card">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Filters</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <select className="input" value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
            <option value="all">All platforms</option>
            {platformOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select className="input" value={tagFilter} onChange={(e) => setTagFilter(e.target.value)}>
            <option value="all">All niche tags</option>
            {nicheOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select className="input" value={geoFilter} onChange={(e) => setGeoFilter(e.target.value)}>
            <option value="all">All geographies</option>
            {Array.from(new Set(state.influencers.map((item) => item.audienceGeoTop))).map((geo) => (
              <option key={geo} value={geo}>
                {geo}
              </option>
            ))}
          </select>

          <select className="input" value={followerFilter} onChange={(e) => setFollowerFilter(e.target.value)}>
            {followerRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid gap-4">
        {rankedInfluencers.map(({ influencer, score, reasons }) => (
          <article key={influencer.id} className="demo-card border-l-4 border-l-slateblue">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-ink">
                  {influencer.name} <span className="text-sm font-normal text-slate-500">{influencer.handle}</span>
                </h3>
                <p className="text-sm text-slate-600">
                  {influencer.platform} · {influencer.followers.toLocaleString()} followers · {influencer.engagementRate}% engagement
                </p>
                <p className="text-sm text-slate-600">Top audience geo: {influencer.audienceGeoTop}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800">Fit Score: {score}</span>
                <button
                  type="button"
                  onClick={() => toggleSelected(influencer.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    selectedIds.includes(influencer.id)
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {selectedIds.includes(influencer.id) ? "Selected" : "Select"}
                </button>
              </div>
            </div>

            <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-slate-700">
              {reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
              {influencer.nicheTags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 px-2 py-1">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-4 grid gap-2 md:grid-cols-3">
              {influencer.samplePosts.map((post) => (
                <div key={post.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-ink">{post.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{post.description}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="demo-card flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-slate-600">Step 3 of 4 · Select influencers then send offers.</span>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => router.push(`/brand/campaign/${campaignId}/coord`)}>
            Next: Coordination
          </button>
          <button className="btn-primary" onClick={sendOffers} disabled={selectedIds.length === 0}>
            Send Offers & Next
          </button>
        </div>
      </section>
    </div>
  );
}
