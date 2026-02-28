export const industryOptions = [
  "Consumer Goods",
  "Health & Fitness",
  "Beauty & Skincare",
  "Food & Beverage",
  "Travel & Hospitality",
  "SaaS / Technology",
  "Fintech"
];

export const budgetRanges = [
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+"
];

export const geoOptions = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
  "Global"
];

export const platformOptions = ["TikTok", "Instagram", "YouTube"] as const;

export const nicheOptions = [
  "fitness",
  "food",
  "tech",
  "beauty",
  "travel",
  "wellness",
  "meal-prep",
  "reviews",
  "productivity",
  "city-guides"
];

export const followerRangeOptions = [
  { label: "All", value: "all" },
  { label: "10k - 30k", value: "10-30" },
  { label: "30k - 50k", value: "30-50" },
  { label: "50k+", value: "50+" }
] as const;

export const navItems = [
  { label: "Landing", href: "/" },
  { label: "Onboarding", href: "/brand/onboarding" },
  { label: "New Campaign", href: "/brand/campaign/new" },
  { label: "Matches", href: "/brand/campaign/demo/matches" },
  { label: "Coordination", href: "/brand/campaign/demo/coord" }
];

export const steps = [
  { label: "Onboarding", href: "/brand/onboarding" },
  { label: "Campaign", href: "/brand/campaign/new" },
  { label: "Matches", href: "/brand/campaign/demo/matches" },
  { label: "Coordination", href: "/brand/campaign/demo/coord" }
];
