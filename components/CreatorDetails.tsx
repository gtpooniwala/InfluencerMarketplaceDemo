import { CreatorRecommendation } from "@/lib/mockData";

type CreatorDetailsProps = {
  creator: CreatorRecommendation | null;
};

export const CreatorDetails = ({ creator }: CreatorDetailsProps) => {
  if (!creator) {
    return (
      <aside className="demo-card h-fit">
        <h2 className="text-lg font-semibold text-ink">Creator details</h2>
        <p className="mt-2 text-sm text-slate-600">Pick a creator to inspect audience fit, safety notes, and message direction.</p>
      </aside>
    );
  }

  return (
    <aside className="demo-card h-fit space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">{creator.name}</h2>
        <p className="text-sm text-slate-600">{creator.handle}</p>
      </div>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Audience fit</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {creator.audienceHighlights.map((item) => (
            <span key={item} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Content style</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {creator.contentStyleTags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Suggested intro</p>
        <p className="mt-1 font-medium text-slate-900">{creator.suggestedIntro}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Suggested message direction</p>
        <p className="mt-1">{creator.suggestedMessageDirection}</p>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Brand safety notes</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {creator.brandSafetyNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prior brand collabs</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {creator.priorCollabs.map((logo) => (
            <span key={logo} className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">
              {logo}
            </span>
          ))}
        </div>
      </section>

      <a className="btn-secondary w-full" href={creator.profileUrl} target="_blank" rel="noreferrer">
        View profile
      </a>
    </aside>
  );
};
