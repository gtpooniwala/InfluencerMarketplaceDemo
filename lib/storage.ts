import { DemoAppState, Influencer, Message, Offer } from "@/lib/types";

export const STORAGE_KEY = "demoAppState";

const defaultDeliverables = ["1x TikTok Post", "1x IG Story", "1x Link in bio"];

const influencerSeed: Influencer[] = [
  {
    id: "inf-001",
    name: "Maya Brooks",
    handle: "@fitwithmaya",
    platform: "TikTok",
    followers: 28000,
    engagementRate: 7.4,
    nicheTags: ["fitness", "wellness", "home-workouts"],
    audienceGeoTop: "United States",
    estCPM: 26,
    verified: true,
    samplePosts: [
      { title: "No-Equipment HIIT", description: "20-minute routine designed for small apartments." },
      { title: "Protein Breakfast Prep", description: "Three quick high-protein breakfast options." },
      { title: "Sunday Reset", description: "Habit stack checklist for the week ahead." }
    ]
  },
  {
    id: "inf-002",
    name: "Leo Park",
    handle: "@bytebites",
    platform: "Instagram",
    followers: 41000,
    engagementRate: 5.9,
    nicheTags: ["food", "street-food", "reviews"],
    audienceGeoTop: "United States",
    estCPM: 21,
    verified: false,
    samplePosts: [
      { title: "$15 Lunch Challenge", description: "Top downtown food spots under $15." },
      { title: "Hidden Ramen Spots", description: "Neighborhood ramen shops worth the wait." }
    ]
  },
  {
    id: "inf-003",
    name: "Nia Coleman",
    handle: "@techwithnia",
    platform: "YouTube",
    followers: 62000,
    engagementRate: 4.7,
    nicheTags: ["tech", "productivity", "gadgets"],
    audienceGeoTop: "Canada",
    estCPM: 32,
    verified: true,
    samplePosts: [
      { title: "Creator Desk Under $500", description: "Budget setup for content creators and founders." },
      { title: "Top 5 App Automations", description: "Simple workflows that save 5+ hours weekly." },
      { title: "Laptop Buyer Guide", description: "Specs that matter for startup teams." }
    ]
  },
  {
    id: "inf-004",
    name: "Ari Singh",
    handle: "@glowbyari",
    platform: "Instagram",
    followers: 35000,
    engagementRate: 6.6,
    nicheTags: ["beauty", "skincare", "self-care"],
    audienceGeoTop: "United Kingdom",
    estCPM: 24,
    verified: true,
    samplePosts: [
      { title: "AM Skincare Stack", description: "Three-step routine for sensitive skin." },
      { title: "Ingredient Spotlight", description: "What niacinamide does and when to use it." }
    ]
  },
  {
    id: "inf-005",
    name: "Daniel Rivera",
    handle: "@wanderdan",
    platform: "TikTok",
    followers: 54000,
    engagementRate: 8.1,
    nicheTags: ["travel", "budget-travel", "city-guides"],
    audienceGeoTop: "United States",
    estCPM: 28,
    verified: false,
    samplePosts: [
      { title: "48 Hours in Lisbon", description: "Creator-friendly itinerary with map pins." },
      { title: "Carry-On Packing Rules", description: "How to fit 7 days into one backpack." },
      { title: "Airport Hacks", description: "Time-saving travel tips for founders on the go." }
    ]
  },
  {
    id: "inf-006",
    name: "Jules Kim",
    handle: "@plantplatejules",
    platform: "Instagram",
    followers: 29000,
    engagementRate: 7,
    nicheTags: ["food", "healthy-recipes", "meal-prep"],
    audienceGeoTop: "Australia",
    estCPM: 19,
    verified: false,
    samplePosts: [
      { title: "15-Minute Meal Prep", description: "Four plant-forward lunches for busy weekdays." },
      { title: "One-Pan Dinners", description: "Low-cleanup recipes with high flavor." }
    ]
  },
  {
    id: "inf-007",
    name: "Tyler Grant",
    handle: "@liftlabty",
    platform: "YouTube",
    followers: 47000,
    engagementRate: 4.9,
    nicheTags: ["fitness", "strength", "nutrition"],
    audienceGeoTop: "United States",
    estCPM: 30,
    verified: true,
    samplePosts: [
      { title: "Strength Split for Beginners", description: "4-day program with progressive overload." },
      { title: "Supplements Explained", description: "What to buy and what to skip." }
    ]
  },
  {
    id: "inf-008",
    name: "Priya Shah",
    handle: "@beautybypriya",
    platform: "TikTok",
    followers: 38000,
    engagementRate: 7.8,
    nicheTags: ["beauty", "makeup", "tutorials"],
    audienceGeoTop: "India",
    estCPM: 22,
    verified: true,
    samplePosts: [
      { title: "No-Filter Base Routine", description: "Everyday base routine that holds all day." },
      { title: "3-Minute Eye Looks", description: "Fast eye makeup for client calls and events." },
      { title: "Shade Matching 101", description: "How to find undertones quickly." }
    ]
  },
  {
    id: "inf-009",
    name: "Marco Liu",
    handle: "@microtripmarco",
    platform: "Instagram",
    followers: 25000,
    engagementRate: 6.8,
    nicheTags: ["travel", "photography", "city-guides"],
    audienceGeoTop: "Singapore",
    estCPM: 20,
    verified: false,
    samplePosts: [
      { title: "24h Photo Walk", description: "Most photogenic spots before 10am." },
      { title: "Weekend Escapes", description: "Sub-3-hour trips from major cities." }
    ]
  },
  {
    id: "inf-010",
    name: "Sofia Lin",
    handle: "@codeandchai",
    platform: "TikTok",
    followers: 45000,
    engagementRate: 6.1,
    nicheTags: ["tech", "ai-tools", "founder-life"],
    audienceGeoTop: "United States",
    estCPM: 27,
    verified: true,
    samplePosts: [
      { title: "AI Stack for Startups", description: "Tools I use to run marketing solo." },
      { title: "Founder Desk Setup", description: "Portable setup for hybrid work." },
      { title: "No-Code Launch", description: "From idea to MVP in one weekend." }
    ]
  },
  {
    id: "inf-011",
    name: "Kara Woods",
    handle: "@trailwithkara",
    platform: "YouTube",
    followers: 53000,
    engagementRate: 5.3,
    nicheTags: ["travel", "hiking", "outdoor"],
    audienceGeoTop: "United States",
    estCPM: 29,
    verified: false,
    samplePosts: [
      { title: "Beginner Day Hikes", description: "Starter trails with safety checklist." },
      { title: "Backpacking Gear Test", description: "Gear comparison after 100 miles." }
    ]
  },
  {
    id: "inf-012",
    name: "Hana Mori",
    handle: "@hanasbento",
    platform: "Instagram",
    followers: 33000,
    engagementRate: 7.3,
    nicheTags: ["food", "japanese-food", "meal-prep"],
    audienceGeoTop: "Japan",
    estCPM: 23,
    verified: true,
    samplePosts: [
      { title: "Workday Bento Guide", description: "Balanced lunches with prep timeline." },
      { title: "Sauce Basics", description: "Three sauces to level up rice bowls." }
    ]
  },
  {
    id: "inf-013",
    name: "Ethan Cole",
    handle: "@ethanrunsdaily",
    platform: "TikTok",
    followers: 22000,
    engagementRate: 8.5,
    nicheTags: ["fitness", "running", "wellness"],
    audienceGeoTop: "United States",
    estCPM: 18,
    verified: false,
    samplePosts: [
      { title: "5K Training Week", description: "How I structure beginner run plans." },
      { title: "Recovery Essentials", description: "Sleep, fuel, and mobility checklist." },
      { title: "Race Day Prep", description: "Simple pre-race routine to reduce nerves." }
    ]
  },
  {
    id: "inf-014",
    name: "Lina Gomez",
    handle: "@skinlablina",
    platform: "YouTube",
    followers: 40000,
    engagementRate: 5.8,
    nicheTags: ["beauty", "skincare", "derm-tips"],
    audienceGeoTop: "Spain",
    estCPM: 25,
    verified: true,
    samplePosts: [
      { title: "Night Routine by Skin Type", description: "Tailored PM routine for oily and dry skin." },
      { title: "SPF Myth Busting", description: "Common sunscreen myths, tested." }
    ]
  },
  {
    id: "inf-015",
    name: "Noah Tran",
    handle: "@snackstacknoah",
    platform: "TikTok",
    followers: 37000,
    engagementRate: 7.2,
    nicheTags: ["food", "snacks", "reviews"],
    audienceGeoTop: "United States",
    estCPM: 22,
    verified: false,
    samplePosts: [
      { title: "Office Snack Draft", description: "Top 10 snacks for all-day energy." },
      { title: "Protein Bars Ranked", description: "Taste + nutrition scorecard." }
    ]
  },
  {
    id: "inf-016",
    name: "Riya Patel",
    handle: "@buildwithriya",
    platform: "Instagram",
    followers: 44000,
    engagementRate: 6.2,
    nicheTags: ["tech", "startups", "productivity"],
    audienceGeoTop: "United Kingdom",
    estCPM: 26,
    verified: true,
    samplePosts: [
      { title: "Weekly Founder Stack", description: "How I plan launches and creator campaigns." },
      { title: "Async Team Workflow", description: "A 3-tool method for distributed teams." },
      { title: "MVP Scope Rules", description: "What to include before your first launch." }
    ]
  },
  {
    id: "inf-017",
    name: "Brielle Hart",
    handle: "@jetsetbri",
    platform: "Instagram",
    followers: 51000,
    engagementRate: 5.5,
    nicheTags: ["travel", "luxury", "hotels"],
    audienceGeoTop: "United States",
    estCPM: 31,
    verified: true,
    samplePosts: [
      { title: "Hotel Amenity Score", description: "What actually matters for short stays." },
      { title: "City Weekend Plan", description: "Curated 3-day premium itinerary." }
    ]
  },
  {
    id: "inf-018",
    name: "Cam Wilson",
    handle: "@camfitfuel",
    platform: "TikTok",
    followers: 27000,
    engagementRate: 7.7,
    nicheTags: ["fitness", "meal-prep", "fat-loss"],
    audienceGeoTop: "Canada",
    estCPM: 20,
    verified: false,
    samplePosts: [
      { title: "Low-Prep Meal Plan", description: "Three days of meals in 45 minutes." },
      { title: "Gym Form Cues", description: "Simple form fixes for common lifts." }
    ]
  },
  {
    id: "inf-019",
    name: "Yuki Tan",
    handle: "@beautydiaryyuki",
    platform: "Instagram",
    followers: 31000,
    engagementRate: 6.9,
    nicheTags: ["beauty", "k-beauty", "self-care"],
    audienceGeoTop: "South Korea",
    estCPM: 23,
    verified: false,
    samplePosts: [
      { title: "Sheet Mask Showdown", description: "Hydration test across six mask brands." },
      { title: "Desk-to-Dinner Look", description: "Fast transitions with minimal products." },
      { title: "Barrier Repair Week", description: "Reset routine after over-exfoliation." }
    ]
  },
  {
    id: "inf-020",
    name: "Owen Reed",
    handle: "@owenscircuits",
    platform: "YouTube",
    followers: 58000,
    engagementRate: 4.5,
    nicheTags: ["tech", "hardware", "reviews"],
    audienceGeoTop: "United States",
    estCPM: 34,
    verified: true,
    samplePosts: [
      { title: "Camera Gear for UGC", description: "Budget and pro kit picks for creators." },
      { title: "Microphone Test Lab", description: "Audio quality comparisons in noisy rooms." }
    ]
  }
];

export const createEmptyState = (): DemoAppState => ({
  brandProfile: null,
  campaigns: [],
  influencers: influencerSeed,
  offers: [],
  activeCampaignId: null,
  seeded: true
});

export const loadState = (): DemoAppState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoAppState;
    return {
      ...createEmptyState(),
      ...parsed,
      influencers: parsed.influencers?.length ? parsed.influencers : influencerSeed
    };
  } catch {
    return null;
  }
};

export const saveState = (state: DemoAppState): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const resetState = (): void => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
};

export const ensureState = (): DemoAppState => {
  const state = loadState();
  if (state) return state;
  const seeded = createEmptyState();
  saveState(seeded);
  return seeded;
};

export const createId = (prefix: string): string =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export const createDefaultChecklist = () =>
  defaultDeliverables.map((label) => ({
    id: createId("chk"),
    label,
    done: false
  }));

export const createDefaultMessages = (): Message[] => [
  {
    id: createId("msg"),
    sender: "Brand",
    text: "Hi! We'd love to collaborate on this campaign. Let us know if you're interested.",
    ts: new Date().toISOString()
  }
];

export const createOfferDraft = (
  campaignId: string,
  influencerId: string,
  amount: number
): Offer => ({
  id: createId("off"),
  campaignId,
  influencerId,
  amount,
  deliverables: [...defaultDeliverables],
  status: "Sent",
  messages: createDefaultMessages(),
  checklist: createDefaultChecklist()
});
