import { TimelineState } from "@/lib/demoFlowStore";

type OpsTimelineProps = {
  timeline: TimelineState;
};

const timelineRows = (timeline: TimelineState) => [
  { id: "outreach", label: "Outreach sent", done: timeline.outreachSent },
  { id: "replies", label: "Replies pending", done: timeline.repliesPending },
  { id: "shipping", label: "Shipping deadline", done: timeline.shippingDeadline },
  { id: "review", label: "Content review due", done: timeline.contentReviewDue }
];

export const OpsTimeline = ({ timeline }: OpsTimelineProps) => {
  return (
    <section className="demo-card">
      <h2 className="text-lg font-semibold text-ink">Ops timeline</h2>
      <ul className="mt-4 space-y-2">
        {timelineRows(timeline).map((item) => (
          <li key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            <span className="text-slate-700">{item.label}</span>
            <span className={`text-xs font-semibold ${item.done ? "text-emerald-700" : "text-slate-500"}`}>
              {item.done ? "Done" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
