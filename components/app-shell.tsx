"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { navItems } from "@/lib/constants";
import { useDemoState } from "@/lib/useDemoState";
import { Stepper } from "@/components/stepper";
import { getCampaignIdFromPath, resolveCampaignAwareHref } from "@/lib/routes";
import { getActiveOrLatestCampaignId } from "@/lib/campaigns";

type AppShellProps = {
  children: ReactNode;
};

const toLabel = (segment: string) =>
  segment
    .replace("[id]", "campaign")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { hasState, state, clearState, hydrated } = useDemoState();

  const campaignId = getCampaignIdFromPath(pathname) ?? getActiveOrLatestCampaignId(state) ?? "demo";
  const isBrandRoute = pathname.startsWith("/brand");
  const breadcrumb = pathname
    .split("/")
    .filter(Boolean)
    .map((part) => toLabel(part))
    .join(" / ");

  const onReset = () => {
    clearState();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="font-semibold tracking-tight text-ink">
            InfluenceFlow Demo
          </Link>
          <nav className="hidden items-center gap-1 text-sm md:flex">
            {navItems.map((item) => {
              const resolvedHref = resolveCampaignAwareHref(item.href, campaignId);
              const active = pathname === resolvedHref;
              return (
                <Link
                  key={item.href}
                  href={resolvedHref}
                  className={`rounded-lg px-3 py-2 transition ${
                    active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={onReset}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Reset Demo
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-6 px-6 py-8">
        {isBrandRoute && (
          <>
            <p className="text-sm text-slate-500">{breadcrumb}</p>
            <Stepper campaignId={campaignId} />
          </>
        )}

        {isBrandRoute && hydrated && !hasState && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Demo state not found, start onboarding.
          </div>
        )}

        {children}
      </main>
    </div>
  );
};
