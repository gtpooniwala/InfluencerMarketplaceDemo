export type Positioning = "Premium" | "Playful" | "Clinical" | "Bold";

export type CampaignLaunchType =
  | "New product"
  | "Restock"
  | "Retail launch"
  | "Seasonal"
  | "Always-on"
  | "Sale";

export type CampaignSuccessGoal =
  | "Revenue"
  | "UGC"
  | "Awareness"
  | "Retail footfall"
  | "Test audience";

export type CampaignAudienceType = "Existing customers" | "Lookalikes" | "New category buyers";

export type CampaignVibe =
  | "Premium & polished"
  | "Relatable everyday"
  | "Bold & expressive"
  | "Educational expert"
  | "Playful & fun";

export type BrandMemory = {
  brandName: string;
  website?: string;
  positioning: Positioning;
  assets: string[];
};

export type BrandBrief = {
  summary: string;
  category: string;
  subcategory: string;
  productFocus: string;
  priceTier: string;
  positioningStatement: string;
  toneTags: string[];
  primaryCustomer: string;
  geography: string;
  targetSegments: string[];
  keyClaims: string[];
  messagingPillars: string[];
  doGuidelines: string[];
  dontGuidelines: string[];
};

export type IntakeAnswers = {
  launchType: CampaignLaunchType;
  successGoal: CampaignSuccessGoal;
  audienceType: CampaignAudienceType;
  vibe: CampaignVibe;
  contextSources: string[];
};

export type CampaignBrief = {
  campaignName: string;
  objective: string;
  audience: string;
  deliverables: string;
  usageRights: string;
  timeline: string;
  budget: string;
  budgetAllocation: string;
  geo: string;
  platformMix: string;
  kpiFocus: string;
  advancedControls: {
    demographics: string;
    hashtags: string;
  };
};

export type CampaignPlan = {
  recommendedTargeting: string;
  targetingChips: string[];
  messagingPillars: Array<{ title: string; description: string }>;
  creatorArchetypes: Array<{ title: string; description: string }>;
  riskFlags: string[];
  assumptions: string[];
  predictedPerformance: Array<{ label: string; range: string }>;
};

export type CreatorRecommendation = {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  followerRange: string;
  vibeTags: string[];
  fitScore: number;
  conversionLikelihood: "Low" | "Med" | "High";
  overlapPct: number;
  whyRelevant: string;
  suggestedIntro: string;
  suggestedMessageDirection: string;
  examplePosts: string[];
  audienceHighlights: string[];
  contentStyleTags: string[];
  brandSafetyNotes: string[];
  priorCollabs: string[];
  profileUrl: string;
  signals: string[];
};

export type OutreachDraft = {
  creatorId: string;
  creatorName: string;
  message: string;
};

export type CampaignReport = {
  summary: string;
  whatToDoNext: string[];
  metrics: {
    spend: string;
    budgetUsedPct: string;
    impressions: string;
    reach: string;
    engagementRate: string;
    saves: string;
    ctr: string;
    linkClicks: string;
    conversions: string;
    cpa: string;
    cpm: string;
    sentimentShift: "Up" | "Down";
  };
  chartSeries: {
    spendVsBudget: Array<{ label: string; value: number }>;
    performanceByWeek: Array<{ label: string; reach: number; engagement: number }>;
  };
  creatorComparison: Array<{
    creator: string;
    reach: string;
    engagementRate: string;
    ctr: string;
    conversions: string;
  }>;
  recommendations: string[];
};

export const positioningOptions: Positioning[] = ["Premium", "Playful", "Clinical", "Bold"];

export const launchOptions: CampaignLaunchType[] = [
  "New product",
  "Restock",
  "Retail launch",
  "Seasonal",
  "Always-on",
  "Sale"
];

export const successOptions: CampaignSuccessGoal[] = ["Revenue", "UGC", "Awareness", "Retail footfall", "Test audience"];

export const audienceOptions: CampaignAudienceType[] = ["Existing customers", "Lookalikes", "New category buyers"];

export const vibeOptions: CampaignVibe[] = [
  "Premium & polished",
  "Relatable everyday",
  "Bold & expressive",
  "Educational expert",
  "Playful & fun"
];

export const contextActions = [
  "Upload product images",
  "Paste website",
  "Upload pitch deck",
  "Paste recent TikTok/IG links",
  "Paste notes/transcript from team call"
] as const;

export const brandMemory: BrandMemory = {
  brandName: "Bamboo Bump",
  website: "https://bamboobump.co.uk",
  positioning: "Playful",
  assets: ["logo.svg", "product-packshot-01.jpg", "retail-line-sheet.pdf", "recent-content-examples.zip"]
};

export const sampleContext = {
  title: "Bamboo Bump Mother’s Day Campaign",
  summary:
    "Bamboo Bump is launching bamboo maternity leggings in the UK for a Mother’s Day push. Goal is direct revenue with creator-led short-form content.",
  launchType: "New product" as CampaignLaunchType,
  successGoal: "Revenue" as CampaignSuccessGoal,
  audienceType: "New category buyers" as CampaignAudienceType,
  vibe: "Relatable everyday" as CampaignVibe,
  contextSources: [
    "Website parsed",
    "Product images uploaded",
    "Pitch deck uploaded",
    "Recent social links reviewed",
    "Team call notes parsed"
  ]
};

export const emptyCampaignBrief = (): CampaignBrief => ({
  campaignName: "",
  objective: "",
  audience: "",
  deliverables: "",
  usageRights: "",
  timeline: "",
  budget: "",
  budgetAllocation: "",
  geo: "",
  platformMix: "",
  kpiFocus: "",
  advancedControls: {
    demographics: "",
    hashtags: ""
  }
});

const positioningToneMap: Record<Positioning, string[]> = {
  Premium: ["Confident", "Curated", "Elevated"],
  Playful: ["Warm", "Relatable", "Light-hearted"],
  Clinical: ["Evidence-led", "Clear", "Precise"],
  Bold: ["Expressive", "High-energy", "Attention-grabbing"]
};

export const buildBrandBrief = (memory: BrandMemory, extraSummary?: string): BrandBrief => {
  const toneTags = positioningToneMap[memory.positioning];

  return {
    summary:
      extraSummary && extraSummary.trim().length > 0
        ? extraSummary.trim()
        : `${memory.brandName} is a comfort-first maternitywear brand focused on helping mothers feel confident in daily life. ` +
          `The strongest brand territory is practical comfort with authentic social proof, making micro-influencer storytelling a high-fit channel.`,
    category: "Apparel",
    subcategory: "Maternity and postpartum comfortwear",
    productFocus: "Bamboo maternity leggings and stretch essentials",
    priceTier: "Mid-premium",
    positioningStatement:
      "Everyday confidence and comfort for mothers, delivered through practical, body-positive creator storytelling.",
    toneTags,
    primaryCustomer: "Mothers aged 24-38 balancing work, home, and convenience-led shopping.",
    geography: "United Kingdom (priority), with expansion to Ireland in follow-up cycles.",
    targetSegments: [
      "Expecting mothers in second/third trimester",
      "Postpartum mothers seeking comfort-first wardrobe staples",
      "Style-conscious parents buying via social proof"
    ],
    keyClaims: [
      "Soft bamboo fabric with all-day stretch",
      "Designed for maternity and postpartum comfort",
      "Easy styling for routine-heavy days"
    ],
    messagingPillars: [
      "Comfort you can feel in real-life movement",
      "Confidence-led fit across pregnancy and postpartum",
      "Practical everyday styling with clear value"
    ],
    doGuidelines: [
      "Show real-life movement and everyday context",
      "Use confidence-forward language with clear shopping cues"
    ],
    dontGuidelines: [
      "Avoid over-produced luxury-only framing",
      "Avoid clinical or technical claims without clear proof"
    ]
  };
};

const vibeToPositioning: Record<CampaignVibe, Positioning> = {
  "Premium & polished": "Premium",
  "Relatable everyday": "Playful",
  "Bold & expressive": "Bold",
  "Educational expert": "Clinical",
  "Playful & fun": "Playful"
};

export const toPositioning = (vibe: CampaignVibe): Positioning => vibeToPositioning[vibe];

export const buildCampaignBriefFromIntake = (intake: IntakeAnswers, brand: BrandMemory): CampaignBrief => {
  const objectiveByGoal: Record<CampaignSuccessGoal, string> = {
    Revenue: "Drive attributable ecommerce revenue from creator-led short-form content.",
    UGC: "Generate reusable creator assets for paid social and lifecycle channels.",
    Awareness: "Increase qualified awareness among likely maternitywear buyers.",
    "Retail footfall": "Drive store-intent in high-priority urban catchments.",
    "Test audience": "Validate message-market fit with one new buyer segment."
  };

  const deliverablesByLaunch: Record<CampaignLaunchType, string> = {
    "New product": "6 creator videos + 12 story frames + 6 cutdowns",
    Restock: "4 creator videos + 8 story frames",
    "Retail launch": "5 creator videos + 5 location-led stories",
    Seasonal: "6 creator videos + 10 stories",
    "Always-on": "8 creator videos per month + evergreen story support",
    Sale: "5 urgency-led creator videos + 8 offer stories"
  };

  const budgetByGoal: Record<CampaignSuccessGoal, string> = {
    Revenue: "GBP 12,000",
    UGC: "GBP 10,000",
    Awareness: "GBP 9,000",
    "Retail footfall": "GBP 11,000",
    "Test audience": "GBP 7,500"
  };

  return {
    campaignName: `${brand.brandName} ${intake.launchType} Campaign`,
    objective: objectiveByGoal[intake.successGoal],
    audience:
      intake.audienceType === "Existing customers"
        ? "Existing Bamboo Bump customers and warm site traffic"
        : intake.audienceType === "Lookalikes"
          ? "Lookalike audiences modeled from converters and high-intent engagers"
          : "New category buyers comparing comfortwear alternatives",
    deliverables: deliverablesByLaunch[intake.launchType],
    usageRights: "Paid social amplification rights for 30 days",
    timeline: "3 weeks",
    budget: budgetByGoal[intake.successGoal],
    budgetAllocation: "60% creators, 25% paid amplification, 15% creative ops",
    geo: "UK (London, Manchester, Birmingham, Leeds)",
    platformMix: "TikTok 60% / Instagram 40%",
    kpiFocus: intake.successGoal === "Revenue" ? "CTR, link clicks, conversion rate" : "Reach, saves, engagement quality",
    advancedControls: {
      demographics: "Women 24-38, parenting and comfortwear affinity",
      hashtags: "#maternitystyle #mumlife #comfortwear"
    }
  };
};

const planByPositioning: Record<Positioning, Omit<CampaignPlan, "recommendedTargeting" | "targetingChips">> = {
  Premium: {
    messagingPillars: [
      { title: "Quality-led confidence", description: "Lead with premium comfort proof and elevated styling outcomes." },
      { title: "Everyday versatility", description: "Show one product across multiple daily contexts." },
      { title: "Trust and polish", description: "Use creators with reliable delivery and clean narrative structure." }
    ],
    creatorArchetypes: [
      { title: "Style educator", description: "Explains fit and styling decisions clearly." },
      { title: "Midsize fashion curator", description: "High trust with conversion-oriented audiences." },
      { title: "Confident routine creator", description: "Balances aspiration with practical proof." }
    ],
    riskFlags: [
      "Premium tone can reduce relatability if scripting is over-styled.",
      "CPM can rise if creator mix skews too polished-only."
    ],
    assumptions: ["Brand can provide clear usage rights quickly."],
    predictedPerformance: [
      { label: "Projected reach", range: "220k-300k" },
      { label: "Projected engagement rate", range: "4.9%-6.2%" },
      { label: "Projected conversion likelihood", range: "Medium" }
    ]
  },
  Playful: {
    messagingPillars: [
      { title: "Real routine moments", description: "Anchor messaging in morning chaos and day-long comfort." },
      { title: "Body-positive confidence", description: "Center confidence outcomes rather than product specs." },
      { title: "Clear shopping cue", description: "Close every concept with one explicit purchase action." }
    ],
    creatorArchetypes: [
      { title: "Relatable mum storyteller", description: "High save-rate and trust in routine content." },
      { title: "Light-comedy lifestyle creator", description: "Efficient shareability with broad relevance." },
      { title: "Try-on proof creator", description: "Strong conversion from fit-focused demos." }
    ],
    riskFlags: [
      "Comedic creative can drift from core product claim.",
      "Inconsistent CTA language can hurt conversion efficiency."
    ],
    assumptions: [
      "Creator scripts include product-link CTA in first story frame.",
      "Stock can support conversion spikes from week-2 content."
    ],
    predictedPerformance: [
      { label: "Projected reach", range: "290k-380k" },
      { label: "Projected engagement rate", range: "6.3%-8.1%" },
      { label: "Projected conversion likelihood", range: "High" }
    ]
  },
  Clinical: {
    messagingPillars: [
      { title: "Proof-led comfort", description: "Use creator demos to validate fit and utility claims." },
      { title: "Problem-solution narrative", description: "Frame around common maternitywear pain points." },
      { title: "Clear comparisons", description: "Show why this product wins in practical scenarios." }
    ],
    creatorArchetypes: [
      { title: "Wellness explainer", description: "Balances educational tone with social-native pacing." },
      { title: "Review-first creator", description: "Strong credibility in recommendation format." },
      { title: "Routine analyst", description: "High retention in detail-oriented audiences." }
    ],
    riskFlags: ["Overly technical language can lower emotional pull.", "Educational scripts need clear CTA for conversion."],
    assumptions: ["Claims in script are already compliant and approved."],
    predictedPerformance: [
      { label: "Projected reach", range: "180k-250k" },
      { label: "Projected engagement rate", range: "4.0%-5.2%" },
      { label: "Projected conversion likelihood", range: "Medium" }
    ]
  },
  Bold: {
    messagingPillars: [
      { title: "Scroll-stopping openings", description: "Use bold visual intros to maximize first-second retention." },
      { title: "Confidence identity", description: "Position product as an identity upgrade, not just comfortwear." },
      { title: "Campaign momentum", description: "Deploy higher-volume creative variants quickly." }
    ],
    creatorArchetypes: [
      { title: "Trend-forward stylist", description: "High discovery potential and visual punch." },
      { title: "High-energy storyteller", description: "Strong top-funnel watch-through rates." },
      { title: "Culture-led creator", description: "Drives relevance with younger lookalike audiences." }
    ],
    riskFlags: ["Tone may polarize older audience segments.", "Creative variance increases review overhead."],
    assumptions: ["Brand is comfortable with expressive creative experimentation."],
    predictedPerformance: [
      { label: "Projected reach", range: "300k-400k" },
      { label: "Projected engagement rate", range: "5.9%-7.8%" },
      { label: "Projected conversion likelihood", range: "Medium" }
    ]
  }
};

export const buildCampaignPlan = (brief: CampaignBrief, vibe: CampaignVibe): CampaignPlan => {
  const positioning = toPositioning(vibe);
  const base = planByPositioning[positioning];

  return {
    ...base,
    recommendedTargeting:
      `Prioritize ${brief.geo} audiences with high maternitywear intent, then expand to lookalikes after week 1 performance signals.`,
    targetingChips: [brief.geo, brief.platformMix, brief.kpiFocus]
  };
};

export const buildInterpretation = (brief: CampaignBrief, plan: CampaignPlan): string[] => [
  `Targeting recommendation: ${plan.recommendedTargeting}`,
  `Messaging priority: lead with “${plan.messagingPillars[0]?.title ?? "Comfort-led proof"}”.`,
  `Creator strategy: start with ${plan.creatorArchetypes[0]?.title ?? "relatable routine creators"} to validate conversion signals.`,
  `Execution guardrail: align deliverables (${brief.deliverables}) with clear usage rights (${brief.usageRights}).`
];

export const creators: CreatorRecommendation[] = [
  {
    id: "cr-1",
    name: "Mina Harper",
    handle: "@mina.mornings",
    avatarUrl: "https://placehold.co/96x96/FDE68A/111827?text=MH",
    followerRange: "48k",
    vibeTags: ["Relatable", "Mum-life", "Warm humor"],
    fitScore: 95,
    conversionLikelihood: "High",
    overlapPct: 83,
    whyRelevant: "Her audience mirrors the target UK maternity comfort segment with proven click intent.",
    suggestedIntro: "Morning routine stress test in one pair of leggings.",
    suggestedMessageDirection: "Confidence + comfort in real school-run context.",
    examplePosts: [
      "https://placehold.co/280x160/F8FAFC/0F172A?text=Routine+Look",
      "https://placehold.co/280x160/F1F5F9/0F172A?text=Try-On"
    ],
    audienceHighlights: ["Women 24-36", "UK 72%", "Parents 61%"],
    contentStyleTags: ["Routine storytelling", "Short-form humor", "Try-on demos"],
    brandSafetyNotes: ["No sensitive-category violations", "Consistent FTC disclosure history"],
    priorCollabs: ["ASOS", "H&M", "Boots"],
    profileUrl: "https://example.com/creator/mina",
    signals: ["High saves per view", "Comments ask for links", "Low drop-off in first 5 seconds"]
  },
  {
    id: "cr-2",
    name: "Asha Noor",
    handle: "@ashastyles",
    avatarUrl: "https://placehold.co/96x96/FECACA/111827?text=AN",
    followerRange: "61k",
    vibeTags: ["Body-positive", "Style-led", "Confident"],
    fitScore: 92,
    conversionLikelihood: "High",
    overlapPct: 79,
    whyRelevant: "Strong conversion track record on fashion recommendations with high trust in product links.",
    suggestedIntro: "One product, three confidence-first looks.",
    suggestedMessageDirection: "Premium comfort without sacrificing style identity.",
    examplePosts: [
      "https://placehold.co/280x160/F8FAFC/0F172A?text=Style+Edit",
      "https://placehold.co/280x160/F1F5F9/0F172A?text=OOTD"
    ],
    audienceHighlights: ["Women 25-39", "UK 64%", "Fashion affinity 78%"],
    contentStyleTags: ["Style transitions", "Product spotlight", "Voiceover education"],
    brandSafetyNotes: ["Low controversy profile", "Ad disclosure consistent"],
    priorCollabs: ["M&S", "Zalando", "New Look"],
    profileUrl: "https://example.com/creator/asha",
    signals: ["High profile taps", "Strong link CTR", "Positive sentiment in fit comments"]
  },
  {
    id: "cr-3",
    name: "Liv & Theo",
    handle: "@livtheo.home",
    avatarUrl: "https://placehold.co/96x96/BFE3FF/111827?text=LT",
    followerRange: "54k",
    vibeTags: ["Playful", "Couple skits", "Lifestyle"],
    fitScore: 89,
    conversionLikelihood: "Med",
    overlapPct: 74,
    whyRelevant: "Strong top-of-funnel shareability and reliable branded content cadence.",
    suggestedIntro: "When maternity jeans fail at 8am.",
    suggestedMessageDirection: "Humor-led transition to practical product proof.",
    examplePosts: [
      "https://placehold.co/280x160/F8FAFC/0F172A?text=Skit+1",
      "https://placehold.co/280x160/F1F5F9/0F172A?text=Skit+2"
    ],
    audienceHighlights: ["Women 23-34", "UK 69%", "Lifestyle affinity 72%"],
    contentStyleTags: ["Comedy beats", "Quick cuts", "Partner POV"],
    brandSafetyNotes: ["Brand-safe language history", "Occasional trend audio risk"],
    priorCollabs: ["Next", "Primark", "Very"],
    profileUrl: "https://example.com/creator/liv-theo",
    signals: ["Share rate above category average", "Fast first-second retention", "Medium click-to-convert"]
  },
  {
    id: "cr-4",
    name: "Erin Wells",
    handle: "@erin.explains",
    avatarUrl: "https://placehold.co/96x96/D9F99D/111827?text=EW",
    followerRange: "39k",
    vibeTags: ["Educational", "Wellness", "Evidence-led"],
    fitScore: 86,
    conversionLikelihood: "Med",
    overlapPct: 71,
    whyRelevant: "High trust with detail-oriented buyers who respond to product comparisons.",
    suggestedIntro: "Can one legging handle a full-day movement test?",
    suggestedMessageDirection: "Problem-solution narrative with clear CTA.",
    examplePosts: [
      "https://placehold.co/280x160/F8FAFC/0F172A?text=Review+1",
      "https://placehold.co/280x160/F1F5F9/0F172A?text=Review+2"
    ],
    audienceHighlights: ["Women 27-40", "UK 58%", "Wellness affinity 66%"],
    contentStyleTags: ["Comparison format", "Voiceover explanation", "Routine test"],
    brandSafetyNotes: ["High compliance consistency", "Lower entertainment-driven shares"],
    priorCollabs: ["Sweaty Betty", "Lululemon", "MyProtein"],
    profileUrl: "https://example.com/creator/erin",
    signals: ["Strong watch-through", "Comment quality indicates intent", "Moderate shareability"]
  },
  {
    id: "cr-5",
    name: "Nadia Cole",
    handle: "@nadiaedits",
    avatarUrl: "https://placehold.co/96x96/F5D0FE/111827?text=NC",
    followerRange: "43k",
    vibeTags: ["Bold", "Street-style", "Expressive"],
    fitScore: 84,
    conversionLikelihood: "Med",
    overlapPct: 68,
    whyRelevant: "Strong creator style identity with high engagement in lookbook and outfit transition formats.",
    suggestedIntro: "Three bold looks for one busy day.",
    suggestedMessageDirection: "Expressive styling with practical comfort payoff.",
    examplePosts: [
      "https://placehold.co/280x160/F8FAFC/0F172A?text=Lookbook",
      "https://placehold.co/280x160/F1F5F9/0F172A?text=Street+Style"
    ],
    audienceHighlights: ["Women 21-33", "UK 55%", "Fashion-forward affinity 81%"],
    contentStyleTags: ["Transition edits", "Voice-led reactions", "Fast trend hooks"],
    brandSafetyNotes: ["Occasional edgy language", "Needs explicit brand-safe script guidance"],
    priorCollabs: ["Bershka", "PrettyLittleThing", "ASOS"],
    profileUrl: "https://example.com/creator/nadia",
    signals: ["Strong engagement depth", "Mid-tier CTR", "High trend participation"]
  },
  {
    id: "cr-6",
    name: "Jules Meyer",
    handle: "@jules.parents",
    avatarUrl: "https://placehold.co/96x96/FDE68A/111827?text=JM",
    followerRange: "35k",
    vibeTags: ["Parenting", "Trust-led", "Routine"],
    fitScore: 82,
    conversionLikelihood: "Low",
    overlapPct: 65,
    whyRelevant: "High trust and authenticity make this creator strong for awareness and mid-funnel consideration.",
    suggestedIntro: "48 hours in one pair, from nursery drop-off to bedtime.",
    suggestedMessageDirection: "Routine reliability and practical comfort framing.",
    examplePosts: [
      "https://placehold.co/280x160/F8FAFC/0F172A?text=Day+In+Life",
      "https://placehold.co/280x160/F1F5F9/0F172A?text=Parenting+Routine"
    ],
    audienceHighlights: ["Women 25-39", "UK 63%", "Parents 74%"],
    contentStyleTags: ["Vlog format", "Voice notes", "Routine checklists"],
    brandSafetyNotes: ["Very brand-safe content history", "Lower historical conversion intensity"],
    priorCollabs: ["Mamas & Papas", "Mothercare", "Boots"],
    profileUrl: "https://example.com/creator/jules",
    signals: ["High comment trust", "Lower link clicks", "Good retention in day-in-life"]
  }
];

export const buildOutreachDrafts = (
  selectedCreators: CreatorRecommendation[],
  brief: CampaignBrief,
  options: { autoPersonalize: boolean }
): OutreachDraft[] => {
  const targets = selectedCreators.slice(0, 4);
  return targets.map((creator) => {
    const intro = options.autoPersonalize
      ? `Hi ${creator.name}, your ${creator.vibeTags[0].toLowerCase()} content style is a strong fit for ${brief.campaignName}.`
      : `Hi ${creator.name}, we'd love to include you in ${brief.campaignName}.`;

    return {
      creatorId: creator.id,
      creatorName: creator.name,
      message: [
        intro,
        `Suggested intro: ${creator.suggestedIntro}`,
        `Message direction: ${creator.suggestedMessageDirection}`,
        `Deliverables: ${brief.deliverables}`,
        `Timeline: ${brief.timeline}. Usage rights: ${brief.usageRights}.`,
        "If this fits your schedule, we can share final script notes today."
      ].join("\n\n")
    };
  });
};

export const baseReport: CampaignReport = {
  summary:
    "Campaign pacing is healthy: creator mix delivered strong saves and efficient click quality while staying under budget.",
  whatToDoNext: [
    "Increase spend on top two creators for week-3 retargeting.",
    "Standardize CTA language across all story frames.",
    "Reuse highest-saving creative in paid social cutdowns."
  ],
  metrics: {
    spend: "GBP 9,600",
    budgetUsedPct: "80%",
    impressions: "690k",
    reach: "338k",
    engagementRate: "7.2%",
    saves: "9,120",
    ctr: "2.9%",
    linkClicks: "9,620",
    conversions: "428",
    cpa: "GBP 22.43",
    cpm: "GBP 13.91",
    sentimentShift: "Up"
  },
  chartSeries: {
    spendVsBudget: [
      { label: "Budget", value: 12000 },
      { label: "Spend", value: 9600 }
    ],
    performanceByWeek: [
      { label: "Week 1", reach: 94000, engagement: 5.8 },
      { label: "Week 2", reach: 122000, engagement: 7.4 },
      { label: "Week 3", reach: 122000, engagement: 8.1 }
    ]
  },
  creatorComparison: [
    { creator: "Mina Harper", reach: "126k", engagementRate: "8.2%", ctr: "3.4%", conversions: "188" },
    { creator: "Asha Noor", reach: "102k", engagementRate: "7.0%", ctr: "3.0%", conversions: "149" },
    { creator: "Liv & Theo", reach: "110k", engagementRate: "6.2%", ctr: "2.2%", conversions: "91" }
  ],
  recommendations: [
    "Scale relatable routine creators before adding more top-funnel talent.",
    "Test one offer-led creative variant in first 5 seconds.",
    "Expand lookalike audience once conversion consistency holds for 5 days."
  ]
};

export const buildReportFromSelection = (selectedCreators: CreatorRecommendation[]): CampaignReport => {
  const chosen = selectedCreators.length > 0 ? selectedCreators.slice(0, 3) : creators.slice(0, 3);
  const estimatedReach = 300000 + chosen.length * 14000;
  const estimatedClicks = 7800 + chosen.length * 600;
  const estimatedConversions = 340 + chosen.length * 30;

  return {
    ...baseReport,
    summary:
      `Performance is tracking above plan for the selected ${chosen.length}-creator mix, with stronger save-to-click behavior than expected.`,
    metrics: {
      ...baseReport.metrics,
      reach: `${estimatedReach.toLocaleString()}`,
      linkClicks: `${estimatedClicks.toLocaleString()}`,
      conversions: `${estimatedConversions}`
    },
    creatorComparison: chosen.map((creator, index) => ({
      creator: creator.name,
      reach: `${(116000 - index * 12000).toLocaleString()}`,
      engagementRate: index === 0 ? "8.0%" : index === 1 ? "7.1%" : "6.2%",
      ctr: index === 0 ? "3.3%" : index === 1 ? "2.9%" : "2.4%",
      conversions: `${176 - index * 42}`
    }))
  };
};
