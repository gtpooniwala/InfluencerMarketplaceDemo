import { CampaignReport } from "@/lib/mockData";

type ReportSummaryProps = {
  report: CampaignReport;
};

export const ReportSummary = ({ report }: ReportSummaryProps) => {
  return (
    <section className="demo-card space-y-4">
      <h2 className="text-2xl font-semibold text-ink">Campaign Dashboard</h2>
      <p className="text-sm text-slate-700">{report.summary}</p>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">What to do next</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {report.whatToDoNext.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
