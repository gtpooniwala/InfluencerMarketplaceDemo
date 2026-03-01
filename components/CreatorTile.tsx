import { CreatorRecommendation } from "@/lib/mockData";

type CreatorTileProps = {
  creator: CreatorRecommendation;
  selected: boolean;
  active: boolean;
  onSelect: () => void;
  onOpen: () => void;
};

const scoreClass = (score: number) => {
  if (score >= 90) return "bg-emerald-50 text-emerald-800";
  if (score >= 85) return "bg-blue-50 text-blue-800";
  return "bg-slate-100 text-slate-700";
};

export const CreatorTile = ({ creator, selected, active, onSelect, onOpen }: CreatorTileProps) => {
  return (
    <article
      className={`rounded-2xl border p-4 transition ${
        active ? "border-slate-900 bg-white shadow-card" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink">{creator.name}</h3>
          <p className="text-sm text-slate-600">{creator.niche}</p>
        </div>
        <span className={`rounded-xl px-3 py-1 text-sm font-semibold ${scoreClass(creator.fitScore)}`}>Fit {creator.fitScore}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
        <span className="rounded-full border border-slate-200 px-2 py-1">{creator.vibe}</span>
        <span className="rounded-full border border-slate-200 px-2 py-1">Conv. {creator.conversionLikelihood}</span>
        <span className="rounded-full border border-slate-200 px-2 py-1">Overlap {creator.overlapPct}%</span>
      </div>

      <p className="mt-3 text-sm text-slate-700">{creator.whyMatch}</p>

      <div className="mt-4 flex gap-2">
        <button type="button" onClick={onOpen} className="btn-secondary flex-1">
          View why
        </button>
        <button type="button" onClick={onSelect} className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold ${selected ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
          {selected ? "Selected" : "Select"}
        </button>
      </div>
    </article>
  );
};
