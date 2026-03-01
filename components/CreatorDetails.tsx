import { CreatorRecommendation } from "@/lib/mockData";

type CreatorDetailsProps = {
  creator: CreatorRecommendation | null;
};

export const CreatorDetails = ({ creator }: CreatorDetailsProps) => {
  if (!creator) {
    return (
      <aside className="demo-card h-fit">
        <h2 className="text-lg font-semibold text-ink">Creator details</h2>
        <p className="mt-2 text-sm text-slate-600">Select a creator to view signal interpretation and outreach hook.</p>
      </aside>
    );
  }

  return (
    <aside className="demo-card h-fit space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">{creator.name}</h2>
        <p className="text-sm text-slate-600">{creator.niche}</p>
      </div>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Signal interpretation</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {creator.signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Suggested outreach angle + hook</p>
        <p className="mt-2 font-semibold text-slate-900">{creator.suggestedAngle}</p>
        <p className="mt-1">{creator.suggestedHook}</p>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Example post thumbnails</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {creator.examplePosts.slice(0, 2).map((item) => (
            <div key={item} className="flex h-24 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-xs text-slate-500">
              Placeholder
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};
