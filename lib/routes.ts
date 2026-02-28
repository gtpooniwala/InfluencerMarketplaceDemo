export const getCampaignIdFromPath = (pathname: string): string | null => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "brand") return null;
  if (segments[1] !== "campaign") return null;

  const candidate = segments[2];
  if (!candidate || candidate === "new") return null;

  return candidate;
};

export const resolveCampaignAwareHref = (href: string, campaignId: string) => {
  if (!href.includes("/demo/")) return href;
  return href.replace("/demo/", `/${campaignId}/`);
};
