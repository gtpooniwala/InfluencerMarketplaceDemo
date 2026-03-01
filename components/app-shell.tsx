"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { ToastProvider } from "@/components/toast-provider";
import { resetDemoState } from "@/lib/demo-store";

type AppShellProps = {
  children: ReactNode;
};

const flowSteps = [
  { href: "/onboarding", label: "Onboarding", step: 1 },
  { href: "/campaign/new", label: "Campaign", step: 2 },
  { href: "/match", label: "Match", step: 3 },
  { href: "/campaign/workspace", label: "Workspace", step: 4 }
];

const getProgress = (pathname: string) => {
  if (pathname === "/") {
    return { step: 0, label: "Landing" };
  }
  if (pathname === "/demo") {
    return { step: 2, label: "Load Demo" };
  }

  const matched = flowSteps.find((item) => pathname.startsWith(item.href));
  return matched ?? { step: 0, label: "Landing" };
};

export const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const progress = useMemo(() => getProgress(pathname), [pathname]);

  const resetDemo = () => {
    resetDemoState();
    router.push("/");
    router.refresh();
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-100">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
            <Link href="/" className="text-xl font-semibold tracking-tight text-ink">
              Agora
            </Link>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 md:px-4 md:py-2 md:text-sm">
              Step {progress.step}/4 · {progress.label}
            </div>
            <button
              onClick={resetDemo}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Reset demo
            </button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-6 py-8">{children}</main>
      </div>
    </ToastProvider>
  );
};
