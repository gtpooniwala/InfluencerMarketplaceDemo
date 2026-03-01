import { OutreachDraft } from "@/lib/mockData";

type OutreachReviewModalProps = {
  open: boolean;
  drafts: OutreachDraft[];
  onClose: () => void;
  onSend: () => void;
};

export const OutreachReviewModal = ({ open, drafts, onClose, onSend }: OutreachReviewModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 p-4">
      <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-ink">Outreach drafts</h2>
          <button type="button" onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-600">Review tailored scripts before sending.</p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {drafts.slice(0, 4).map((draft) => (
            <article key={draft.creatorId} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">{draft.creatorName}</p>
              <div className="mt-2 rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-600">
                <p className="font-semibold text-slate-700">AI suggestions</p>
                <p className="mt-1">Suggested intro: {draft.suggestedIntro ?? "Use the campaign headline naturally."}</p>
                <p className="mt-1">Suggested message direction: {draft.suggestedMessageDirection ?? "Lead with clear product value and CTA."}</p>
              </div>
              <textarea
                readOnly
                value={draft.message}
                className="mt-2 min-h-36 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700"
                aria-label={`${draft.creatorName} outreach message`}
              />
            </article>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <button type="button" onClick={onSend} className="btn-primary px-6 py-2.5">
            Send outreach
          </button>
        </div>
      </div>
    </div>
  );
};
