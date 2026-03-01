import { ReactNode } from "react";
import {
  IntakeAnswers,
  audienceOptions,
  contextActions,
  launchOptions,
  successOptions,
  vibeOptions
} from "@/lib/mockData";

type ChatPanelProps = {
  intake: IntakeAnswers;
  onSelect: <K extends "launchType" | "successGoal" | "audienceType" | "vibe">(field: K, value: IntakeAnswers[K]) => void;
  onUseSampleContext: () => void;
  onUploadContext: (label: string) => void;
  contextOpen: boolean;
  onToggleContextOpen: () => void;
};

const Chip = ({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
      active ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
    }`}
  >
    {label}
  </button>
);

const QuestionBlock = ({ title, children }: { title: string; children: ReactNode }) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-sm font-semibold text-slate-900">{title}</p>
    <div className="mt-3 flex flex-wrap gap-2">{children}</div>
  </article>
);

export const ChatPanel = ({
  intake,
  onSelect,
  onUseSampleContext,
  onUploadContext,
  contextOpen,
  onToggleContextOpen
}: ChatPanelProps) => {
  return (
    <section className="demo-card space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-ink">Campaign starter</h2>
        <p className="mt-1 text-sm text-slate-600">Answer four quick prompts. We will draft the brief for you.</p>
      </div>

      <button type="button" className="btn-secondary w-full" onClick={onUseSampleContext}>
        Use sample campaign
      </button>

      <QuestionBlock title="1) What are you launching?">
        {launchOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            active={intake.launchType === option}
            onClick={() => onSelect("launchType", option)}
          />
        ))}
      </QuestionBlock>

      <QuestionBlock title="2) What does success look like?">
        {successOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            active={intake.successGoal === option}
            onClick={() => onSelect("successGoal", option)}
          />
        ))}
      </QuestionBlock>

      <QuestionBlock title="3) Who is this for?">
        {audienceOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            active={intake.audienceType === option}
            onClick={() => onSelect("audienceType", option)}
          />
        ))}
      </QuestionBlock>

      <QuestionBlock title="4) What’s the vibe?">
        {vibeOptions.map((option) => (
          <Chip key={option} label={option} active={intake.vibe === option} onClick={() => onSelect("vibe", option)} />
        ))}
      </QuestionBlock>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <button type="button" onClick={onToggleContextOpen} className="w-full text-left text-sm font-semibold text-slate-800">
          Add context {contextOpen ? "-" : "+"}
        </button>

        {contextOpen && (
          <div className="mt-3 flex flex-wrap gap-2">
            {contextActions.map((action) => (
              <button key={action} type="button" className="btn-secondary" onClick={() => onUploadContext(action)}>
                {action}
              </button>
            ))}
          </div>
        )}

        {intake.contextSources.length > 0 && (
          <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-600">
            {intake.contextSources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};
