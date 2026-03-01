import { CreatorRecommendation } from "@/lib/mockData";

type CreatorTileProps = {
  creator: CreatorRecommendation;
  selected: boolean;
  active: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onDraftOutreach: () => void;
};

const scoreClass = (score: number) => {
  if (score >= 90) return "bg-emerald-50 text-emerald-800";
  if (score >= 85) return "bg-blue-50 text-blue-800";
  return "bg-slate-100 text-slate-700";
};

export const CreatorTile = ({ creator, selected, active, onSelect, onOpen, onDraftOutreach }: CreatorTileProps) => {
  return (
    <article className={`rounded-2xl border p-4 transition ${active ? "border-slate-900 shadow-card" : "border-slate-200"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <img src={creator.avatarUrl} alt={creator.name} className="h-12 w-12 rounded-full border border-slate-200 object-cover" />
          <div>
            <h3 className="text-base font-semibold text-ink">{creator.name}</h3>
            <p className="text-sm text-slate-600">{creator.handle} · {creator.followerRange}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {creator.vibeTags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <span className={`rounded-xl px-3 py-1 text-sm font-semibold ${scoreClass(creator.fitScore)}`}>Fit {creator.fitScore}</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {creator.examplePosts.slice(0, 2).map((post) => (
          <img key={post} src={post} alt="Creator sample" className="h-20 w-full rounded-lg border border-slate-200 object-cover" />
        ))}
      </div>

      <p className="mt-3 text-sm font-medium text-slate-700">Why relevant? {creator.whyRelevant}</p>
      <p className="mt-1 text-xs text-slate-500">Audience overlap {creator.overlapPct}% · Conversion likelihood {creator.conversionLikelihood}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={onOpen}>
          View details
        </button>
        <button type="button" className="btn-secondary" onClick={onDraftOutreach}>
          Draft outreach
        </button>
        <button
          type="button"
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${selected ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700"}`}
          onClick={onSelect}
        >
          {selected ? "Selected" : "Select"}
        </button>
      </div>
    </article>
  );
};
