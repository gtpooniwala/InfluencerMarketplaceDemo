"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ToastProvider } from "@/components/toast-provider";
import { resetDemoFlowState } from "@/lib/demoFlowStore";

type AppShellProps = {
  children: ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  const router = useRouter();

  const resetDemo = () => {
    resetDemoFlowState();
    router.push("/");
    router.refresh();
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
            <Link href="/" className="text-xl font-semibold tracking-tight text-ink">
              Agora
            </Link>
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
