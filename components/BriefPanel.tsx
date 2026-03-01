import { CampaignBrief } from "@/lib/mockData";

type BriefPanelProps = {
  brief: CampaignBrief;
  generated: boolean;
  onChangeField: (field: keyof CampaignBrief, value: string) => void;
  onChangeAdvanced: (field: keyof CampaignBrief["advancedControls"], value: string) => void;
};

const Field = ({
  label,
  value,
  placeholder,
  onChange,
  multiline
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) => (
  <div>
    <label className="label">{label}</label>
    {multiline ? (
      <textarea className="input min-h-20" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <input className="input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    )}
  </div>
);

export const BriefPanel = ({ brief, generated, onChangeField, onChangeAdvanced }: BriefPanelProps) => {
  return (
    <section className="demo-card space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-ink">Campaign page</h2>
        <p className="mt-1 text-sm text-slate-600">
          {generated
            ? "AI generated this campaign page from your builder inputs. Edit anything before planning."
            : "Manual mode: edit this campaign page directly, or use the Campaign Builder above to auto-fill it."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Campaign name"
          value={brief.campaignName}
          placeholder="e.g. Bamboo Bump Mother’s Day Launch"
          onChange={(v) => onChangeField("campaignName", v)}
        />
        <Field label="Objective" value={brief.objective} placeholder="Revenue, UGC, awareness..." onChange={(v) => onChangeField("objective", v)} />
      </div>

      <Field
        label="Audience"
        value={brief.audience}
        placeholder="Who this campaign is for"
        onChange={(v) => onChangeField("audience", v)}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Deliverables"
          value={brief.deliverables}
          placeholder="Creator posts, stories, UGC outputs"
          onChange={(v) => onChangeField("deliverables", v)}
        />
        <Field
          label="Usage rights"
          value={brief.usageRights}
          placeholder="Whitelisting or paid usage terms"
          onChange={(v) => onChangeField("usageRights", v)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Timeline" value={brief.timeline} placeholder="e.g. 3 weeks" onChange={(v) => onChangeField("timeline", v)} />
        <Field label="Budget" value={brief.budget} placeholder="e.g. GBP 12,000" onChange={(v) => onChangeField("budget", v)} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Budget allocation"
          value={brief.budgetAllocation}
          placeholder="Creator spend / paid / ops"
          onChange={(v) => onChangeField("budgetAllocation", v)}
        />
        <Field label="Geo" value={brief.geo} placeholder="Target geography" onChange={(v) => onChangeField("geo", v)} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Platform mix"
          value={brief.platformMix}
          placeholder="TikTok / IG / YouTube split"
          onChange={(v) => onChangeField("platformMix", v)}
        />
        <Field
          label="KPI focus"
          value={brief.kpiFocus}
          placeholder="CTR, saves, conversions"
          onChange={(v) => onChangeField("kpiFocus", v)}
        />
      </div>

      <details className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <summary className="cursor-pointer text-sm font-semibold text-slate-700">Advanced targeting controls</summary>
        <div className="mt-3 grid gap-3">
          <Field
            label="Demographics"
            value={brief.advancedControls.demographics}
            placeholder="Audience demographics"
            onChange={(v) => onChangeAdvanced("demographics", v)}
          />
          <Field
            label="Hashtags"
            value={brief.advancedControls.hashtags}
            placeholder="#example #example2"
            onChange={(v) => onChangeAdvanced("hashtags", v)}
          />
        </div>
      </details>
    </section>
  );
};
