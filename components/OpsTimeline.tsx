import { CreatorRecommendation } from "@/lib/mockData";

type PipelineStage = "Invited" | "Negotiating" | "Confirmed" | "Content due" | "Submitted" | "Approved";

type PipelineCard = {
  id: string;
  creatorName: string;
  avatarUrl: string;
  nextStep: string;
  deadline: string;
  stage: PipelineStage;
};

type OpsTimelineProps = {
  creators: CreatorRecommendation[];
};

const stages: PipelineStage[] = ["Invited", "Negotiating", "Confirmed", "Content due", "Submitted", "Approved"];

const mapToPipeline = (creators: CreatorRecommendation[]): PipelineCard[] => {
  const selected = creators.slice(0, 6);
  const defaults: PipelineStage[] = ["Invited", "Negotiating", "Confirmed", "Content due", "Submitted", "Approved"];

  return selected.map((creator, index) => ({
    id: creator.id,
    creatorName: creator.name,
    avatarUrl: creator.avatarUrl,
    nextStep:
      defaults[index] === "Invited"
        ? "Send intro script"
        : defaults[index] === "Negotiating"
          ? "Confirm rates"
          : defaults[index] === "Confirmed"
            ? "Share product pack"
            : defaults[index] === "Content due"
              ? "Chase draft"
              : defaults[index] === "Submitted"
                ? "Review edit"
                : "Approve final",
    deadline: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index] ?? "Mon",
    stage: defaults[index]
  }));
};

export const OpsTimeline = ({ creators }: OpsTimelineProps) => {
  const cards = mapToPipeline(creators);

  return (
    <section className="demo-card">
      <h2 className="text-lg font-semibold text-ink">Creator pipeline</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-6">
        {stages.map((stage) => (
          <div key={stage} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">{stage}</p>
            <div className="mt-2 space-y-2">
              {cards
                .filter((card) => card.stage === stage)
                .map((card) => (
                  <article key={card.id} className="rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <img src={card.avatarUrl} alt={card.creatorName} className="h-6 w-6 rounded-full border border-slate-200" />
                      <span className="font-semibold text-slate-900">{card.creatorName}</span>
                    </div>
                    <p className="mt-1">{card.nextStep}</p>
                    <p className="mt-1 text-slate-500">Deadline: {card.deadline}</p>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
