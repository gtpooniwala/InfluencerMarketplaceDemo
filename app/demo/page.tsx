"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSeededDemoState, saveDemoState } from "@/lib/demo-store";

export default function DemoLaunchPage() {
  const router = useRouter();

  useEffect(() => {
    const seeded = createSeededDemoState();
    saveDemoState(seeded);
    router.replace("/match");
  }, [router]);

  return (
    <section className="demo-card">
      <h1 className="text-2xl font-semibold text-ink">Loading demo scenario</h1>
      <p className="mt-2 text-sm text-slate-600">Prefilling CurveComfort campaign and opening creator matches...</p>
    </section>
  );
}
