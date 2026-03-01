export const isDemoMode =
  (process.env.NEXT_PUBLIC_DEMO_MODE ?? process.env.DEMO_MODE ?? "true").toLowerCase() !== "false";
