import { CampaignBrief } from "@/lib/mockData";

type BriefPanelProps = {
  brief: CampaignBrief;
};

export const BriefPanel = ({ brief }: BriefPanelProps) => {
  return (
    <section className="demo-card space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-ink">Campaign Brief</h2>
        <p className="mt-1 text-sm text-slate-600">Live summary updated from intake signals.</p>
      </div>

      <div className="space-y-3 text-sm text-slate-700">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Objective</p>
          <p className="mt-1">{brief.objective}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Audience</p>
          <p className="mt-1">{brief.audience}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Deliverables</p>
          <ul className="mt-1 list-disc pl-5">
            {brief.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Timeline</p>
            <p className="mt-1">{brief.timeline}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Budget range</p>
            <p className="mt-1">{brief.budgetRange}</p>
          </div>
        </div>
      </div>

      <details className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <summary className="cursor-pointer text-sm font-semibold text-slate-700">Advanced filters</summary>
        <div className="mt-3 space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-semibold text-slate-700">Demographics:</span> {brief.advancedFilters.demographics}
          </p>
          <p>
            <span className="font-semibold text-slate-700">Hashtags:</span> {brief.advancedFilters.hashtags.join(", ")}
          </p>
        </div>
      </details>
    </section>
  );
};
