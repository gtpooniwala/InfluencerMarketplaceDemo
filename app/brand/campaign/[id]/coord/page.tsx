"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { createId } from "@/lib/storage";
import { useDemoState } from "@/lib/useDemoState";
import { StatusBadge } from "@/components/status-badge";
import { OfferStatus } from "@/lib/types";

const influencerSystemMessage = (status: OfferStatus) => {
  if (status === "Accepted") return "Great fit. I can commit to the timeline and deliverables.";
  if (status === "Declined") return "Thanks for reaching out. I have a conflicting campaign window.";
  if (status === "Delivered") return "Deliverables are now submitted for your review.";
  return "Thanks for the update!";
};

export default function CampaignCoordinationPage() {
  const params = useParams<{ id: string }>();
  const campaignId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { state, updateState, hydrated } = useDemoState();

  const [draftMessages, setDraftMessages] = useState<Record<string, string>>({});

  const campaign = useMemo(
    () => state?.campaigns.find((item) => item.id === campaignId),
    [campaignId, state?.campaigns]
  );

  const campaignOffers = useMemo(
    () => state?.offers.filter((item) => item.campaignId === campaignId) ?? [],
    [campaignId, state?.offers]
  );

  const updateOffer = (offerId: string, updater: (status: OfferStatus) => OfferStatus) => {
    updateState((prev) => ({
      ...prev,
      offers: prev.offers.map((offer) => {
        if (offer.id !== offerId) return offer;
        const nextStatus = updater(offer.status);
        return {
          ...offer,
          status: nextStatus,
          messages: [
            ...offer.messages,
            {
              id: createId("msg"),
              sender: "Influencer",
              text: influencerSystemMessage(nextStatus),
              ts: new Date().toISOString()
            }
          ]
        };
      })
    }));
  };

  const sendMessage = (offerId: string, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draftMessages[offerId]?.trim();
    if (!text) return;

    updateState((prev) => ({
      ...prev,
      offers: prev.offers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              messages: [
                ...offer.messages,
                {
                  id: createId("msg"),
                  sender: "Brand",
                  text,
                  ts: new Date().toISOString()
                }
              ]
            }
          : offer
      )
    }));

    setDraftMessages((prev) => ({ ...prev, [offerId]: "" }));
  };

  const toggleChecklistItem = (offerId: string, checklistId: string) => {
    updateState((prev) => ({
      ...prev,
      offers: prev.offers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              checklist: offer.checklist.map((item) =>
                item.id === checklistId
                  ? {
                      ...item,
                      done: !item.done
                    }
                  : item
              )
            }
          : offer
      )
    }));
  };

  if (!hydrated) {
    return <div className="demo-card">Loading coordination workspace...</div>;
  }

  if (!state || !campaign) {
    return (
      <section className="demo-card space-y-4">
        <h1 className="text-2xl font-semibold text-ink">Campaign Not Found</h1>
        <p className="text-slate-600">Launch a campaign and send offers before opening coordination.</p>
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
          <h1 className="text-2xl font-semibold text-ink">Coordination Workspace</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage offers, message threads, and deliverables for <span className="font-medium">{campaign.name}</span>.
          </p>
        </div>
        <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">Step 4 of 4</span>
      </section>

      {campaignOffers.length === 0 ? (
        <section className="demo-card space-y-4">
          <p className="text-slate-700">No offers exist yet for this campaign. Send offers from matching first.</p>
          <Link href={`/brand/campaign/${campaign.id}/matches`} className="btn-primary">
            Go to Matches
          </Link>
        </section>
      ) : (
        <section className="grid gap-4">
          {campaignOffers.map((offer) => {
            const influencer = state.influencers.find((item) => item.id === offer.influencerId);
            if (!influencer) return null;

            return (
              <article key={offer.id} className="demo-card space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-ink">
                      {influencer.name} <span className="text-sm font-normal text-slate-500">{influencer.handle}</span>
                    </h2>
                    <p className="text-sm text-slate-600">
                      {influencer.platform} · Offer ${offer.amount.toLocaleString()} · Deliverables: {offer.deliverables.join(", ")}
                    </p>
                  </div>
                  <StatusBadge status={offer.status} />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="btn-secondary" onClick={() => updateOffer(offer.id, () => "Accepted")}>
                    Simulate Accept
                  </button>
                  <button className="btn-secondary" onClick={() => updateOffer(offer.id, () => "Declined")}>
                    Simulate Decline
                  </button>
                  <button className="btn-secondary" onClick={() => updateOffer(offer.id, () => "Delivered")}>
                    Simulate Deliverable Submitted
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-sm font-semibold text-slate-700">Messages</h3>
                    <div className="mt-3 max-h-52 space-y-2 overflow-y-auto pr-1">
                      {offer.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                            message.sender === "Brand"
                              ? "ml-auto bg-slate-900 text-white"
                              : "bg-white text-slate-700 border border-slate-200"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className="mt-1 text-[11px] opacity-75">{new Date(message.ts).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    <form className="mt-3 flex gap-2" onSubmit={(event) => sendMessage(offer.id, event)}>
                      <input
                        className="input"
                        placeholder="Type a message..."
                        value={draftMessages[offer.id] ?? ""}
                        onChange={(event) => setDraftMessages((prev) => ({ ...prev, [offer.id]: event.target.value }))}
                      />
                      <button className="btn-primary" type="submit">
                        Send
                      </button>
                    </form>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-sm font-semibold text-slate-700">Deliverables Checklist</h3>
                    <ul className="mt-3 space-y-2 text-sm">
                      {offer.checklist.map((item) => (
                        <li key={item.id} className="flex items-center gap-2 rounded-lg bg-white p-2">
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toggleChecklistItem(offer.id, item.id)}
                          />
                          <span className={item.done ? "text-slate-400 line-through" : "text-slate-700"}>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
