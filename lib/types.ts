export type BrandProfile = {
  companyName: string;
  website?: string;
  industry: string;
  budgetRange: string;
  targetGeo: string;
};

export type Campaign = {
  id: string;
  name: string;
  objective: string;
  platforms: string[];
  nicheTags: string[];
  budget: number;
  timeline: string;
  status: "Draft" | "Active" | "Completed";
};

export type SamplePost = {
  title: string;
  description: string;
};

export type Influencer = {
  id: string;
  name: string;
  handle: string;
  platform: "TikTok" | "Instagram" | "YouTube";
  followers: number;
  engagementRate: number;
  nicheTags: string[];
  audienceGeoTop: string;
  estCPM: number;
  verified: boolean;
  samplePosts: SamplePost[];
};

export type Message = {
  id: string;
  sender: "Brand" | "Influencer";
  text: string;
  ts: string;
};

export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export type OfferStatus = "Draft" | "Sent" | "Accepted" | "Declined" | "Delivered";

export type Offer = {
  id: string;
  campaignId: string;
  influencerId: string;
  amount: number;
  deliverables: string[];
  status: OfferStatus;
  messages: Message[];
  checklist: ChecklistItem[];
};

export type DemoAppState = {
  brandProfile: BrandProfile | null;
  campaigns: Campaign[];
  influencers: Influencer[];
  offers: Offer[];
  activeCampaignId: string | null;
  seeded: boolean;
};
