export type Positioning = "Premium" | "Playful" | "Clinical" | "Bold";
export type CampaignGoal = "Sales" | "Awareness" | "UGC" | "Retail footfall";
export type AudienceType = "Existing audience" | "New audience";

export type BrandMemory = {
  brandName: string;
  website?: string;
  positioning: Positioning;
  assets: string[];
};

export type IntakeAnswers = {
  launch: string;
  vibe: Positioning;
  goal: CampaignGoal;
  audience: AudienceType;
  contextSources: string[];
};

export type CampaignBrief = {
  objective: string;
  audience: string;
  deliverables: string[];
  timeline: string;
  budgetRange: string;
  advancedFilters: {
    demographics: string;
    hashtags: string[];
  };
};

export type CampaignPlan = {
  predictions: {
    reach: string;
    engagement: string;
    conversionLikelihood: "Low" | "Medium" | "High";
  };
  messagingPillars: string[];
  riskFlags: string[];
  archetypes: string[];
};

export type CreatorRecommendation = {
  id: string;
  name: string;
  niche: string;
  vibe: Positioning;
  fitScore: number;
  overlapPct: number;
  conversionLikelihood: "Low" | "Med" | "High";
  whyMatch: string;
  signals: string[];
  suggestedAngle: string;
  suggestedHook: string;
  examplePosts: string[];
};

export type OutreachDraft = {
  creatorId: string;
  creatorName: string;
  message: string;
};

export type CampaignReport = {
  narrative: {
    predictedVsActual: string;
    whatWorked: string;
    whatToChange: string;
  };
  metrics: {
    spendUsed: string;
    reach: string;
    engagementRate: string;
    saves: string;
    ctr: string;
    conversions: string;
    sentimentShift: "Up" | "Down";
  };
  creatorComparison: Array<{
    creator: string;
    reach: string;
    ctr: string;
    conversions: string;
  }>;
  recommendations: string[];
};

export const positioningOptions: Positioning[] = ["Premium", "Playful", "Clinical", "Bold"];
export const goalOptions: CampaignGoal[] = ["Sales", "Awareness", "UGC", "Retail footfall"];
export const audienceOptions: AudienceType[] = ["Existing audience", "New audience"];

export const brandMemory: BrandMemory = {
  brandName: "Bamboo Bump",
  website: "https://bamboobump.co.uk",
  positioning: "Playful",
  assets: ["logo.svg", "hero-product.jpg", "ugc-guidelines.pdf"]
};

export const sampleContext = {
  title: "Bamboo Bump Mother’s Day Push",
  summary:
    "Bamboo maternity leggings for UK launch. Prioritize warm, body-positive creator storytelling with clear purchase hooks.",
  launch: "Bamboo maternity leggings",
  vibe: "Playful" as Positioning,
  goal: "Sales" as CampaignGoal,
  audience: "New audience" as AudienceType
};

export const campaignBrief: CampaignBrief = {
  objective: "Drive Mother’s Day conversion intent for Bamboo Bump’s new leggings line.",
  audience: "UK mothers (25-38) prioritizing comfort, confidence, and everyday wear.",
  deliverables: ["3 TikTok videos", "3 IG Reels", "6 Story frames with link stickers"],
  timeline: "3 weeks",
  budgetRange: "GBP 8k-12k",
  advancedFilters: {
    demographics: "Women 24-40, UK metro + suburban",
    hashtags: ["#maternitystyle", "#mumlife", "#comfortwear"]
  }
};

const planByVibe: Record<Positioning, CampaignPlan> = {
  Premium: {
    predictions: {
      reach: "220k-300k",
      engagement: "4.8%-6.1%",
      conversionLikelihood: "Medium"
    },
    messagingPillars: ["Quality fabric confidence", "Day-to-night styling", "Trustworthy product proof"],
    riskFlags: ["Tone may feel too polished for relatable creators", "Higher CPM if only premium creators are used"],
    archetypes: ["Styling educator", "Midsize fashion curator", "Expert-led reviewer"]
  },
  Playful: {
    predictions: {
      reach: "280k-360k",
      engagement: "6.2%-8.4%",
      conversionLikelihood: "High"
    },
    messagingPillars: ["Real-life comfort moments", "Body-positive humor", "Quick try-on proof"],
    riskFlags: ["Comedic hooks can drift off-message", "Need clear CTA consistency across creators"],
    archetypes: ["Mum-life comedian", "Relatable routine creator", "Try-on storyteller"]
  },
  Clinical: {
    predictions: {
      reach: "180k-240k",
      engagement: "3.9%-5.0%",
      conversionLikelihood: "Medium"
    },
    messagingPillars: ["Material and fit evidence", "Pain-point comparisons", "Clear utility framing"],
    riskFlags: ["May reduce emotional resonance", "Needs simple language to avoid sounding technical"],
    archetypes: ["Evidence-first explainer", "Wellness educator", "Comparison review creator"]
  },
  Bold: {
    predictions: {
      reach: "300k-390k",
      engagement: "6.0%-8.0%",
      conversionLikelihood: "Medium"
    },
    messagingPillars: ["Standout visual hooks", "Confidence-first narrative", "High-energy social proof"],
    riskFlags: ["Potential mismatch with conservative audience segments", "Creative variance can increase review load"],
    archetypes: ["Trend-forward stylist", "Performance storyteller", "High-energy lifestyle host"]
  }
};

export const buildCampaignPlan = (vibe: Positioning): CampaignPlan => {
  return planByVibe[vibe];
};

export const campaignPlan = buildCampaignPlan(sampleContext.vibe);

export const creators: CreatorRecommendation[] = [
  {
    id: "cr-1",
    name: "Mina Harper",
    niche: "Mum-life comedy",
    vibe: "Playful",
    fitScore: 95,
    overlapPct: 82,
    conversionLikelihood: "High",
    whyMatch: "Her audience responds strongly to practical comfortwear moments with direct shopping cues.",
    signals: ["High save-rate on try-ons", "Comment intent around fit questions", "Strong UK mum audience overlap"],
    suggestedAngle: "Real mornings, real comfort",
    suggestedHook: "Three outfit saves before nursery drop-off.",
    examplePosts: ["placeholder-1", "placeholder-2"]
  },
  {
    id: "cr-2",
    name: "Asha Noor",
    niche: "Body-positive style",
    vibe: "Premium",
    fitScore: 91,
    overlapPct: 78,
    conversionLikelihood: "High",
    whyMatch: "Consistent conversion lifts on confidence-led fashion recommendations.",
    signals: ["Audience asks for product links", "High profile tap-through", "Positive sentiment on fit inclusivity"],
    suggestedAngle: "Confidence without compromise",
    suggestedHook: "From school run to dinner in one legging.",
    examplePosts: ["placeholder-3", "placeholder-4"]
  },
  {
    id: "cr-3",
    name: "Liv & Theo",
    niche: "Couple skits",
    vibe: "Playful",
    fitScore: 89,
    overlapPct: 75,
    conversionLikelihood: "Med",
    whyMatch: "Funny day-in-the-life format gives repeatable hooks and broad top-funnel reach.",
    signals: ["Strong shares on relatable skits", "Repeat branded format success", "Low drop-off in first 5 seconds"],
    suggestedAngle: "Comfort saves the day",
    suggestedHook: "When maternity jeans lose and bamboo wins.",
    examplePosts: ["placeholder-5", "placeholder-6"]
  },
  {
    id: "cr-4",
    name: "Erin Wells",
    niche: "Wellness routines",
    vibe: "Clinical",
    fitScore: 86,
    overlapPct: 71,
    conversionLikelihood: "Med",
    whyMatch: "Her audience values practical product comparisons and routine-led purchase choices.",
    signals: ["High completion on review content", "Comment quality indicates purchase intent", "Reliable posting cadence"],
    suggestedAngle: "All-day movement test",
    suggestedHook: "Can these leggings survive a 12-hour day?",
    examplePosts: ["placeholder-7", "placeholder-8"]
  },
  {
    id: "cr-5",
    name: "Nadia C",
    niche: "Affordable style edits",
    vibe: "Bold",
    fitScore: 84,
    overlapPct: 69,
    conversionLikelihood: "Med",
    whyMatch: "Strong engagement among price-conscious buyers and practical wardrobe builders.",
    signals: ["High saves on budget picks", "Good click-through from stories", "Frequent audience polls"],
    suggestedAngle: "One item, three looks",
    suggestedHook: "My week in one pair of leggings.",
    examplePosts: ["placeholder-9", "placeholder-10"]
  },
  {
    id: "cr-6",
    name: "Jules Meyer",
    niche: "Parenting vlogs",
    vibe: "Playful",
    fitScore: 82,
    overlapPct: 67,
    conversionLikelihood: "Low",
    whyMatch: "Great authenticity and trust, but conversion usually needs stronger CTA support.",
    signals: ["High comments, lower clicks", "Strong trust cues", "Effective for awareness-to-consideration"],
    suggestedAngle: "Mum-mode comfort challenge",
    suggestedHook: "48 hours, one pair, zero wardrobe stress.",
    examplePosts: ["placeholder-11", "placeholder-12"]
  }
];

export const report: CampaignReport = {
  narrative: {
    predictedVsActual:
      "Predicted performance held: creator mix reached target UK mothers efficiently, with slightly higher engagement than expected.",
    whatWorked:
      "Relatable hooks and confidence-led framing drove saves and link-click momentum in week 2.",
    whatToChange:
      "Tighten creator CTA language and add one explicit offer-led variant earlier in flight."
  },
  metrics: {
    spendUsed: "GBP 9.6k / 12k",
    reach: "332k",
    engagementRate: "7.1%",
    saves: "8,940",
    ctr: "2.9%",
    conversions: "412",
    sentimentShift: "Up"
  },
  creatorComparison: [
    { creator: "Mina Harper", reach: "124k", ctr: "3.3%", conversions: "182" },
    { creator: "Asha Noor", reach: "98k", ctr: "3.0%", conversions: "141" },
    { creator: "Liv & Theo", reach: "110k", ctr: "2.1%", conversions: "89" }
  ],
  recommendations: [
    "Keep playful tone, but standardize CTA to one purchase action.",
    "Prioritize creators with high save-rate + strong comment intent overlap.",
    "Run a 7-day retargeting burst with top two hooks before next launch."
  ]
};

const audienceRecommendationByGoal: Record<CampaignGoal, string> = {
  Sales: "Prioritize high-intent mums actively comparing comfortwear options.",
  Awareness: "Expand into adjacent parenting and lifestyle audiences for efficient reach.",
  UGC: "Select creators with repeatable formats and reliable delivery cadence.",
  "Retail footfall": "Focus on local-city creators with strong location-specific response."
};

const archetypeByVibe: Record<Positioning, string> = {
  Premium: "Editorial confidence creators with polished product storytelling.",
  Playful: "Relatable routine creators who blend humor with practical proof.",
  Clinical: "Evidence-first explainers who can simplify product claims.",
  Bold: "High-energy creators who can create immediate scroll-stop attention."
};

export const buildInterpretation = (params: {
  positioning: Positioning;
  audience: AudienceType;
  goal: CampaignGoal;
  launch: string;
}): string[] => {
  return [
    `Positioning signal: ${params.positioning} tone should lead the opening hook in every script.`,
    `Audience recommendation: ${audienceRecommendationByGoal[params.goal]}`,
    `Messaging pillar: connect ${params.launch.toLowerCase()} to daily comfort and confidence moments.`,
    `Creator archetype: ${archetypeByVibe[params.positioning]}`,
    `Delivery guardrail: keep first 3 seconds benefit-led for ${params.audience.toLowerCase()} targeting.`
  ];
};

export const buildOutreachDrafts = (
  selectedCreators: CreatorRecommendation[],
  brief: CampaignBrief,
  options: { autoPersonalize: boolean }
): OutreachDraft[] => {
  const targets = selectedCreators.slice(0, 4);
  return targets.map((creator) => {
    const opener = options.autoPersonalize
      ? `Hi ${creator.name} - your ${creator.niche.toLowerCase()} content is a strong fit for this campaign.`
      : `Hi ${creator.name} - we are inviting a small creator group for a new campaign.`;

    const message = [
      opener,
      `Campaign objective: ${brief.objective}`,
      `Suggested angle: ${creator.suggestedAngle}. Hook: ${creator.suggestedHook}`,
      `Deliverables: ${brief.deliverables.join(", ")}. Timeline: ${brief.timeline}.`,
      "If this feels aligned, we can confirm details today."
    ].join("\n\n");

    return {
      creatorId: creator.id,
      creatorName: creator.name,
      message
    };
  });
};

export const buildReportFromSelection = (selectedCreators: CreatorRecommendation[]): CampaignReport => {
  const chosen = selectedCreators.length > 0 ? selectedCreators.slice(0, 3) : creators.slice(0, 3);
  const reachBase = 290000 + chosen.length * 14000;
  const conversionsBase = 300 + chosen.length * 34;

  return {
    ...report,
    narrative: {
      predictedVsActual: `Predicted vs Actual: the selected ${chosen.length}-creator mix delivered stable efficiency with stronger-than-expected saves.`,
      whatWorked: "Creator hooks tied product comfort to real routines, boosting click intent.",
      whatToChange: "Add one offer-led variant in week 1 and tighten story-frame CTA sequencing."
    },
    metrics: {
      spendUsed: "GBP 9.6k / 12k",
      reach: `${reachBase.toLocaleString()}`,
      engagementRate: "7.0%",
      saves: `${(8200 + chosen.length * 360).toLocaleString()}`,
      ctr: "2.8%",
      conversions: `${conversionsBase}`,
      sentimentShift: "Up"
    },
    creatorComparison: chosen.map((creator, index) => ({
      creator: creator.name,
      reach: `${(95000 - index * 12000).toLocaleString()}`,
      ctr: index === 0 ? "3.2%" : index === 1 ? "2.9%" : "2.4%",
      conversions: `${160 - index * 37}`
    }))
  };
};
