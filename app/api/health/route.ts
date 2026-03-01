import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.json(
      {
        status: "degraded",
        message: "BACKEND_URL is not configured for /api/health proxy"
      },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/health`, {
      cache: "no-store"
    });

    const body = await response.text();
    return new Response(body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/json; charset=utf-8"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to reach backend health endpoint",
        detail: error instanceof Error ? error.message : "unknown error"
      },
      { status: 502 }
    );
  }
}
