import { createId, createOfferDraft } from "@/lib/storage";
import { Campaign, DemoAppState, Message, Offer, OfferStatus } from "@/lib/types";

export type CampaignDraftInput = {
  name: string;
  objective: string;
  platforms: string[];
  nicheTags: string[];
  budget: number;
  timeline: string;
};

export const appendCampaign = (
  state: DemoAppState,
  draft: CampaignDraftInput
): { campaignId: string; state: DemoAppState } => {
  const id = createId("cmp");
  const campaign: Campaign = {
    id,
    name: draft.name,
    objective: draft.objective,
    platforms: draft.platforms,
    nicheTags: draft.nicheTags,
    budget: draft.budget,
    timeline: draft.timeline,
    status: "Draft"
  };
  return {
    campaignId: id,
    state: {
      ...state,
      campaigns: [...state.campaigns, campaign],
      activeCampaignId: id
    }
  };
};

export const applySendOffers = (state: DemoAppState, campaignId: string, influencerIds: string[]): DemoAppState => {
  const campaignExists = state.campaigns.some((campaign) => campaign.id === campaignId);
  if (!campaignExists) return state;

  const selected = Array.from(new Set(influencerIds));
  const offers: Offer[] = [...state.offers];

  for (const influencerId of selected) {
    const existingIndex = offers.findIndex(
      (offer) => offer.campaignId === campaignId && offer.influencerId === influencerId
    );

    if (existingIndex >= 0) {
      offers[existingIndex] = {
        ...offers[existingIndex],
        status: "Sent"
      };
      continue;
    }

    const influencer = state.influencers.find((item) => item.id === influencerId);
    if (!influencer) continue;

    const amount = Math.round((influencer.estCPM * influencer.followers) / 1000);
    offers.push(createOfferDraft(campaignId, influencer.id, amount));
  }

  return {
    ...state,
    campaigns: state.campaigns.map((campaign) =>
      campaign.id === campaignId
        ? {
            ...campaign,
            status: "Active"
          }
        : campaign
    ),
    offers,
    activeCampaignId: campaignId
  };
};

const systemMessageByStatus: Record<OfferStatus, string> = {
  Draft: "I reviewed the draft and can confirm details shortly.",
  Sent: "Offer received. Reviewing deliverables and timeline.",
  Accepted: "Great fit. I can commit to the timeline and deliverables.",
  Declined: "Thanks for reaching out. I have a conflicting campaign window.",
  Delivered: "Deliverables are now submitted for your review."
};

export const transitionOfferStatus = (
  state: DemoAppState,
  offerId: string,
  nextStatus: OfferStatus
): DemoAppState => {
  return {
    ...state,
    offers: state.offers.map((offer) => {
      if (offer.id !== offerId) return offer;
      const message: Message = {
        id: createId("msg"),
        sender: "Influencer",
        text: systemMessageByStatus[nextStatus],
        ts: new Date().toISOString()
      };
      return {
        ...offer,
        status: nextStatus,
        messages: [...offer.messages, message]
      };
    })
  };
};

export const appendOfferMessage = (
  state: DemoAppState,
  offerId: string,
  sender: Message["sender"],
  text: string
): DemoAppState => {
  const trimmed = text.trim();
  if (!trimmed) return state;

  return {
    ...state,
    offers: state.offers.map((offer) => {
      if (offer.id !== offerId) return offer;
      const message: Message = {
        id: createId("msg"),
        sender,
        text: trimmed,
        ts: new Date().toISOString()
      };
      return {
        ...offer,
        messages: [...offer.messages, message]
      };
    })
  };
};

export const toggleOfferChecklistItem = (state: DemoAppState, offerId: string, checklistId: string): DemoAppState => {
  return {
    ...state,
    offers: state.offers.map((offer) =>
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
  };
};
