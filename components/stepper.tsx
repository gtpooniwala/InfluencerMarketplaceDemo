"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { steps } from "@/lib/constants";
import { resolveCampaignAwareHref } from "@/lib/routes";

const getStepIndex = (pathname: string) => {
  if (pathname.includes("/onboarding")) return 0;
  if (pathname.includes("/campaign/new")) return 1;
  if (pathname.includes("/matches")) return 2;
  if (pathname.includes("/coord")) return 3;
  return 0;
};

type StepperProps = {
  campaignId: string;
};

export const Stepper = ({ campaignId }: StepperProps) => {
  const pathname = usePathname();
  const activeIndex = getStepIndex(pathname);

  return (
    <ol className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card md:grid-cols-4">
      {steps.map((step, index) => {
        const state = index < activeIndex ? "done" : index === activeIndex ? "active" : "todo";
        const resolvedHref = resolveCampaignAwareHref(step.href, campaignId);
        return (
          <li key={step.label}>
            <Link
              href={resolvedHref}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition ${
                state === "active"
                  ? "border-slateblue bg-blue-50 text-slateblue"
                  : state === "done"
                    ? "border-mint bg-teal-50 text-teal-700"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold">
                {index + 1}
              </span>
              <span>Step {index + 1} {step.label}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
