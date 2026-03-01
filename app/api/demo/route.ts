import { NextResponse } from "next/server";
import { creativeAngles, creators, demoBrandProfile, demoCampaign } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    brandProfile: demoBrandProfile,
    campaign: demoCampaign,
    creativeAngles,
    creators
  });
}
