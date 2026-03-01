import { CampaignReport } from "@/lib/mockData";

type ReportSummaryProps = {
  report: CampaignReport;
};

export const ReportSummary = ({ report }: ReportSummaryProps) => {
  return (
    <section className="demo-card space-y-4">
      <h2 className="text-xl font-semibold text-ink">Auto report summary</h2>

      <article>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Predicted vs Actual</h3>
        <p className="mt-1 text-sm text-slate-700">{report.narrative.predictedVsActual}</p>
      </article>

      <article>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">What worked</h3>
        <p className="mt-1 text-sm text-slate-700">{report.narrative.whatWorked}</p>
      </article>

      <article>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">What to change next time</h3>
        <p className="mt-1 text-sm text-slate-700">{report.narrative.whatToChange}</p>
      </article>
    </section>
  );
};
