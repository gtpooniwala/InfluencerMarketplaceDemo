export type Market = "UK" | "US" | "EU";
export type CampaignObjective = "Awareness" | "Conversions" | "UGC library";
export type CampaignPlatform = "TikTok" | "IG";
export type OutreachStatus = "invited" | "interested" | "negotiating" | "contracted" | "declined";
export type ContractStatus = "draft" | "sent" | "signed";

export type BrandProfile = {
  brandName: string;
  website?: string;
  category: string;
  market: Market;
  budgetRange: string;
  vibeTags: string[];
  doList: string;
  dontList: string;
};

export type Campaign = {
  name: string;
  objective: CampaignObjective;
  platforms: CampaignPlatform[];
  timeline: string;
  deliverablesCount: number;
  briefText: string;
  productInfo?: string;
  offer?: string;
  chosenCreativeAngleId: string;
};

export type Creator = {
  id: string;
  name: string;
  handle: string;
  platform: "TikTok" | "IG";
  avatarUrl: string;
  nicheTags: string[];
  location: string;
  followers: number;
  avgViews: number;
  estRateRange: string;
  estRateMin: number;
  estRateMax: number;
  fitScore: number;
  fitBreakdown: { audience: number; message: number; vibe: number };
  whyMatch: string[];
  sampleContent: { title: string; thumbnailUrl: string }[];
  risks?: string[];
};

export type Selection = {
  selectedCreatorIds: string[];
};

export type Outreach = {
  perCreatorStatus: Record<string, OutreachStatus>;
  generatedMessageTemplate: string;
  perCreatorMessages?: Record<string, string>;
};

export type Contracts = {
  perCreatorContractStatus: Record<string, ContractStatus>;
  contractPreviewText: string;
};

export type Performance = {
  kpis: {
    spend: number;
    estReach: number;
    clicks: number;
    estCAC: number;
  };
  chartData: Array<{ day: string; reach: number }>;
};

export type CreativeAngle = {
  id: string;
  title: string;
  description: string;
  whyItWorks: string[];
};

export const categoryOptions = ["Apparel", "Beauty", "Food", "Wellness", "Home", "SaaS"];
export const marketOptions: Market[] = ["UK", "US", "EU"];
export const budgetRangeOptions = ["£2k–£5k", "£5k–£10k", "£10k–£20k", "£20k+"];
export const vibeTagOptions = ["Playful", "Premium", "Minimal", "Bold", "Warm", "Funny", "Educational"];

export const demoBrandProfile: BrandProfile = {
  brandName: "CurveComfort",
  website: "https://curvecomfort.co.uk",
  category: "Apparel",
  market: "UK",
  budgetRange: "£10k–£20k",
  vibeTags: ["Warm", "Funny", "Playful"],
  doList: "Show movement, daily routines, and realistic body-positive styling moments.",
  dontList: "Avoid over-produced edits or luxury-only framing."
};

export const creativeAngles: CreativeAngle[] = [
  {
    id: "angle-real-mornings",
    title: "Real Mornings, Real Comfort",
    description: "Creators show how CurveComfort pieces hold up in hectic real-life mornings.",
    whyItWorks: [
      "Connects comfort directly to practical daily use.",
      "Naturally supports conversion-focused creator CTAs."
    ]
  },
  {
    id: "angle-comfort-comedy",
    title: "Comfort Saves The Day",
    description: "Warm comedic storylines where the outfit solves awkward everyday moments.",
    whyItWorks: [
      "Matches CurveComfort's warm, funny brand tone.",
      "Comedy creators drive saves/shares beyond strict fashion audiences."
    ]
  },
  {
    id: "angle-style-challenges",
    title: "7-Day Comfort Style Challenge",
    description: "Creators style one comfortwear item across different weekly scenarios.",
    whyItWorks: [
      "Creates repeatable episodic content for TikTok + IG.",
      "Demonstrates versatility and fit confidence across contexts."
    ]
  }
];

export const demoCampaign: Campaign = {
  name: "Spring Comfort Drop",
  objective: "Conversions",
  platforms: ["TikTok", "IG"],
  timeline: "4 weeks",
  deliverablesCount: 6,
  briefText:
    "Launch CurveComfort's spring comfortwear line in the UK with creator-led short videos focused on realistic fit, movement, and everyday humor. Prioritize conversion efficiency and lower blended CAC with highly trusted micro creators.",
  productInfo: "Core products: stretch lounge sets, wide-leg joggers, breathable tees (sizes 14-32).",
  offer: "Guide rate: £300-£900 per short video depending on fit score and average views.",
  chosenCreativeAngleId: "angle-comfort-comedy"
};

export const creators: Creator[] = [
  {
    id: "cr-01",
    name: "Holly James",
    handle: "@hollyfitsreal",
    platform: "TikTok",
    avatarUrl: "https://placehold.co/96x96/E2E8F0/0F172A?text=HJ",
    nicheTags: ["fashion", "body-positive", "haul"],
    location: "Manchester, UK",
    followers: 58200,
    avgViews: 45200,
    estRateRange: "£650-£900",
    estRateMin: 650,
    estRateMax: 900,
    fitScore: 92,
    fitBreakdown: { audience: 95, message: 89, vibe: 92 },
    whyMatch: [
      "Audience overlaps heavily with body-positive comfortwear shoppers.",
      "Past videos convert well on fit-led try-ons with direct purchase prompts.",
      "Tone balances practical advice with playful delivery."
    ],
    sampleContent: [
      { title: "Desk-to-dinner comfort fits", thumbnailUrl: "https://placehold.co/280x160/F8FAFC/0F172A?text=Desk+to+Dinner" },
      { title: "Stretch test: joggers", thumbnailUrl: "https://placehold.co/280x160/F1F5F9/0F172A?text=Stretch+Test" }
    ]
  },
  {
    id: "cr-02",
    name: "Sara Ali",
    handle: "@saraedits",
    platform: "IG",
    avatarUrl: "https://placehold.co/96x96/E2E8F0/0F172A?text=SA",
    nicheTags: ["fashion", "minimal", "lookbook"],
    location: "London, UK",
    followers: 43900,
    avgViews: 26100,
    estRateRange: "£500-£760",
    estRateMin: 500,
    estRateMax: 760,
    fitScore: 86,
    fitBreakdown: { audience: 88, message: 82, vibe: 84 },
    whyMatch: [
      "Strong UK audience concentration in 24-38 working women segment.",
      "High save-rate on comfort-first capsule styling posts.",
      "Clean format suits IG Reels conversion creatives."
    ],
    sampleContent: [
      { title: "5 outfits, 1 pair of trousers", thumbnailUrl: "https://placehold.co/280x160/F8FAFC/0F172A?text=5+Outfits" },
      { title: "Soft office layers", thumbnailUrl: "https://placehold.co/280x160/F1F5F9/0F172A?text=Office+Layers" }
    ]
  },
  {
    id: "cr-03",
    name: "Tasha Reed",
    handle: "@tashatries",
    platform: "TikTok",
    avatarUrl: "https://placehold.co/96x96/E2E8F0/0F172A?text=TR",
    nicheTags: ["lifestyle", "new-mum", "home"],
    location: "Bristol, UK",
    followers: 36200,
    avgViews: 29400,
    estRateRange: "£380-£580",
    estRateMin: 380,
    estRateMax: 580,
    fitScore: 84,
    fitBreakdown: { audience: 86, message: 81, vibe: 85 },
    whyMatch: [
      "Audience index overweights comfort-led practical purchases.",
      "Strong completion on relatable, low-production routines.",
      "Can feature all-day wear contexts beyond styling-only content."
    ],
    sampleContent: [
      { title: "Mum schedule outfit test", thumbnailUrl: "https://placehold.co/280x160/F8FAFC/0F172A?text=Mum+Schedule" },
      { title: "Laundry day comfy looks", thumbnailUrl: "https://placehold.co/280x160/F1F5F9/0F172A?text=Laundry+Looks" }
    ],
    risks: ["Sometimes posts fewer than 3 videos/week."]
  },
  {
    id: "cr-04",
    name: "Mina & Joe",
    handle: "@flatsharelaughs",
    platform: "TikTok",
    avatarUrl: "https://placehold.co/96x96/E2E8F0/0F172A?text=MJ",
    nicheTags: ["comedy", "lifestyle", "couple"],
    location: "Leeds, UK",
    followers: 69100,
    avgViews: 62100,
    estRateRange: "£700-£950",
    estRateMin: 700,
    estRateMax: 950,
    fitScore: 96,
    fitBreakdown: { audience: 93, message: 95, vibe: 99 },
    whyMatch: [
      "Non-fashion audience still over-indexes on practical comfort purchases.",
      "Warm comedic sketches fit the campaign's real-life tone perfectly.",
      "Past branded posts drive strong share-rate and lower click CPC."
    ],
    sampleContent: [
      { title: "Missed train chaos skit", thumbnailUrl: "https://placehold.co/280x160/F8FAFC/0F172A?text=Chaos+Skit" },
      { title: "Sunday reset couple bit", thumbnailUrl: "https://placehold.co/280x160/F1F5F9/0F172A?text=Sunday+Reset" }
    ],
    risks: ["Comedy tone needs clear brand-safe guidance in brief."]
  },
  {
    id: "cr-05",
    name: "Emma D",
    handle: "@emmamoves",
    platform: "IG",
    avatarUrl: "https://placehold.co/96x96/E2E8F0/0F172A?text=ED",
    nicheTags: ["wellness", "pilates", "fashion"],
    location: "Birmingham, UK",
    followers: 31800,
    avgViews: 20100,
    estRateRange: "£300-£470",
    estRateMin: 300,
    estRateMax: 470,
    fitScore: 82,
    fitBreakdown: { audience: 84, message: 80, vibe: 82 },
    whyMatch: [
      "High saves on movement-comfort content themes.",
      "Affordable rate card supports target CAC objectives.",
      "Audience trusts direct fit commentary and comparisons."
    ],
    sampleContent: [
      { title: "Pilates then errands", thumbnailUrl: "https://placehold.co/280x160/F8FAFC/0F172A?text=Pilates+Errands" },
      { title: "Soft fabric review", thumbnailUrl: "https://placehold.co/280x160/F1F5F9/0F172A?text=Fabric+Review" }
    ]
  },
  {
    id: "cr-06",
    name: "Nadia K",
    handle: "@nadiaonreels",
    platform: "IG",
    avatarUrl: "https://placehold.co/96x96/E2E8F0/0F172A?text=NK",
    nicheTags: ["fashion", "midsize", "daily-style"],
    location: "Glasgow, UK",
    followers: 49800,
    avgViews: 35600,
    estRateRange: "£560-£820",
    estRateMin: 560,
    estRateMax: 820,
    fitScore: 89,
    fitBreakdown: { audience: 91, message: 86, vibe: 88 },
    whyMatch: [
      "Midsize styling audience aligns with CurveComfort conversion segment.",
      "Frequent story polls create strong click intent.",
      "Voice feels warm and approachable rather than editorial."
    ],
    sampleContent: [
      { title: "Commuter comfort edits", thumbnailUrl: "https://placehold.co/280x160/F8FAFC/0F172A?text=Commuter+Comfort" },
      { title: "3-day wear test", thumbnailUrl: "https://placehold.co/280x160/F1F5F9/0F172A?text=3-Day+Test" }
    ]
  },
  {
    id: "cr-07",
    name: "Liv Carter",
    handle: "@livlaughslife",
    platform: "TikTok",
    avatarUrl: "https://placehold.co/96x96/E2E8F0/0F172A?text=LC",
    nicheTags: ["comedy", "office-life", "lifestyle"],
    location: "London, UK",
    followers: 40200,
    avgViews: 38900,
    estRateRange: "£480-£730",
    estRateMin: 480,
    estRateMax: 730,
    fitScore: 90,
    fitBreakdown: { audience: 87, message: 92, vibe: 94 },
    whyMatch: [
      "Office-life humor gives natural use-cases for comfortwear positioning.",
      "Audience conversion spikes on products tied to daily pain-point jokes.",
      "Great bridge creator for non-fashion discovery audiences."
    ],
    sampleContent: [
      { title: "Monday meeting panic", thumbnailUrl: "https://placehold.co/280x160/F8FAFC/0F172A?text=Meeting+Panic" },
      { title: "WFH outfit reality", thumbnailUrl: "https://placehold.co/280x160/F1F5F9/0F172A?text=WFH+Reality" }
    ]
  },
  {
    id: "cr-08",
    name: "Rina Shah",
    handle: "@rinamakes",
    platform: "IG",
    avatarUrl: "https://placehold.co/96x96/E2E8F0/0F172A?text=RS",
    nicheTags: ["craft", "lifestyle", "slow-living"],
    location: "Nottingham, UK",
    followers: 27500,
    avgViews: 15400,
    estRateRange: "£250-£390",
    estRateMin: 250,
    estRateMax: 390,
    fitScore: 75,
    fitBreakdown: { audience: 78, message: 73, vibe: 76 },
    whyMatch: [
      "Budget-friendly creator for test-cell expansion.",
      "Audience responds to authentic, low-polish product integrations.",
      "Can support secondary retargeting content volumes."
    ],
    sampleContent: [
      { title: "Craft room morning", thumbnailUrl: "https://placehold.co/280x160/F8FAFC/0F172A?text=Craft+Morning" },
      { title: "Easy weekend routine", thumbnailUrl: "https://placehold.co/280x160/F1F5F9/0F172A?text=Weekend+Routine" }
    ]
  },
  {
    id: "cr-09",
    name: "Bea Winters",
    handle: "@beainthecity",
    platform: "TikTok",
    avatarUrl: "https://placehold.co/96x96/E2E8F0/0F172A?text=BW",
    nicheTags: ["fashion", "street-style", "london"],
    location: "London, UK",
    followers: 54800,
    avgViews: 33800,
    estRateRange: "£620-£850",
    estRateMin: 620,
    estRateMax: 850,
    fitScore: 83,
    fitBreakdown: { audience: 85, message: 79, vibe: 84 },
    whyMatch: [
      "Strong top-funnel visibility in urban UK fashion audience.",
      "Styled edits can anchor hero creative assets.",
      "Brand-safe and consistent posting cadence."
    ],
    sampleContent: [
      { title: "City style in rain", thumbnailUrl: "https://placehold.co/280x160/F8FAFC/0F172A?text=City+Rain" },
      { title: "Comfy set, 3 ways", thumbnailUrl: "https://placehold.co/280x160/F1F5F9/0F172A?text=Set+3+Ways" }
    ]
  },
  {
    id: "cr-10",
    name: "Harriet Cole",
    handle: "@harriethome",
    platform: "IG",
    avatarUrl: "https://placehold.co/96x96/E2E8F0/0F172A?text=HC",
    nicheTags: ["home", "family", "lifestyle"],
    location: "Cardiff, UK",
    followers: 33400,
    avgViews: 21100,
    estRateRange: "£330-£520",
    estRateMin: 330,
    estRateMax: 520,
    fitScore: 79,
    fitBreakdown: { audience: 81, message: 78, vibe: 80 },
    whyMatch: [
      "Family routines provide practical comfortwear demonstration context.",
      "Solid click-through despite modest follower count.",
      "Good candidate for lower-rate retest bundles."
    ],
    sampleContent: [
      { title: "School run outfit reality", thumbnailUrl: "https://placehold.co/280x160/F8FAFC/0F172A?text=School+Run" },
      { title: "Home day comfort", thumbnailUrl: "https://placehold.co/280x160/F1F5F9/0F172A?text=Home+Day" }
    ]
  }
];

export const creatorsAgoraRanked = ["cr-04", "cr-01", "cr-07", "cr-06", "cr-02", "cr-03", "cr-09", "cr-05", "cr-10", "cr-08"];
export const creatorsProxyRanked = ["cr-01", "cr-06", "cr-02", "cr-09", "cr-05", "cr-04", "cr-07", "cr-10", "cr-03", "cr-08"];

export const proxyFitOverrides: Record<string, { fitScore: number; fitBreakdown: { audience: number; message: number; vibe: number } }> = {
  "cr-01": { fitScore: 89, fitBreakdown: { audience: 91, message: 80, vibe: 78 } },
  "cr-06": { fitScore: 86, fitBreakdown: { audience: 88, message: 77, vibe: 74 } },
  "cr-02": { fitScore: 84, fitBreakdown: { audience: 86, message: 76, vibe: 72 } },
  "cr-09": { fitScore: 82, fitBreakdown: { audience: 84, message: 75, vibe: 71 } },
  "cr-05": { fitScore: 79, fitBreakdown: { audience: 80, message: 72, vibe: 70 } },
  "cr-04": { fitScore: 76, fitBreakdown: { audience: 78, message: 70, vibe: 68 } },
  "cr-07": { fitScore: 74, fitBreakdown: { audience: 75, message: 69, vibe: 67 } },
  "cr-10": { fitScore: 72, fitBreakdown: { audience: 73, message: 68, vibe: 66 } },
  "cr-03": { fitScore: 70, fitBreakdown: { audience: 71, message: 66, vibe: 65 } },
  "cr-08": { fitScore: 68, fitBreakdown: { audience: 69, message: 64, vibe: 63 } }
};

export const demoPerformance: Performance = {
  kpis: {
    spend: 9840,
    estReach: 642000,
    clicks: 12480,
    estCAC: 17.2
  },
  chartData: [
    { day: "Day 1", reach: 54000 },
    { day: "Day 2", reach: 79000 },
    { day: "Day 3", reach: 92000 },
    { day: "Day 4", reach: 103000 },
    { day: "Day 5", reach: 88000 },
    { day: "Day 6", reach: 116000 },
    { day: "Day 7", reach: 110000 }
  ]
};

export const findCreativeAngle = (id: string) => creativeAngles.find((angle) => angle.id === id) ?? creativeAngles[0];

export const buildOutreachTemplate = (brand: BrandProfile, campaign: Campaign) => {
  const angle = findCreativeAngle(campaign.chosenCreativeAngleId);
  return `Hi {{creator_name}},\n\nI lead partnerships at ${brand.brandName}. We're launching ${campaign.name} in ${brand.market} and your tone feels ideal for \"${angle.title}\".\n\nDeliverable: 1 short-form video (${campaign.platforms.join(" + ")}) focused on real-life comfort storytelling.\nRate guide: ${campaign.offer ?? "£300-£900 depending on scope and usage"}.\n\nIf interested, we'd love to share a quick brief and move fast this week.\n\nThanks!`;
};

export const buildContractPreview = (brand: BrandProfile, campaign: Campaign) => {
  const angle = findCreativeAngle(campaign.chosenCreativeAngleId);
  return `Campaign Agreement Preview\n\nBrand: ${brand.brandName}\nCampaign: ${campaign.name}\nCreative Angle: ${angle.title}\nTerm: ${campaign.timeline}\nDeliverable: 1 short-form video per selected creator\nUsage: Paid social whitelisting for 30 days\nPayment: 50% on signature, 50% within 14 days of approved delivery\nCompliance: FTC/ASA disclosure required\nRevision policy: 1 light revision round\nTermination: Either party may terminate prior to production with written notice.`;
};
