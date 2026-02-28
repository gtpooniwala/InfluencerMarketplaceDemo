import { OfferStatus } from "@/lib/types";

type StatusBadgeProps = {
  status: OfferStatus;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const className =
    status === "Accepted"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Declined"
        ? "bg-rose-100 text-rose-700"
        : status === "Delivered"
          ? "bg-indigo-100 text-indigo-700"
          : "bg-amber-100 text-amber-700";

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{status}</span>;
};
