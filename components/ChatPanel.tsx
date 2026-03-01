import { ReactNode } from "react";
import { AudienceType, CampaignGoal, IntakeAnswers, Positioning, audienceOptions, goalOptions, positioningOptions } from "@/lib/mockData";

type ChatPanelProps = {
  intake: IntakeAnswers;
  onSelect: <K extends "launch" | "vibe" | "goal" | "audience">(field: K, value: IntakeAnswers[K]) => void;
  onUploadContext: (label: string) => void;
  onUseSampleContext: () => void;
};

const launchOptions = [
  "Bamboo maternity leggings",
  "Nursing tees and lounge set",
  "Postpartum comfort bundle"
] as const;

const uploadActions = [
  "Paste Canva link",
  "Upload pitch deck",
  "Upload meeting transcript",
  "Upload product images"
] as const;

const ChipButton = ({
  active,
  label,
  onClick
}: {
  active?: boolean;
  label: string;
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

const PromptBlock = ({
  prompt,
  children
}: {
  prompt: string;
  children: ReactNode;
}) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-sm font-semibold text-slate-900">{prompt}</p>
    <div className="mt-3 flex flex-wrap gap-2">{children}</div>
  </article>
);

export const ChatPanel = ({ intake, onSelect, onUploadContext, onUseSampleContext }: ChatPanelProps) => {
  return (
    <section className="demo-card space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-ink">Conversational intake</h2>
        <p className="mt-1 text-sm text-slate-600">No form-filling needed. Tap quick replies to shape the campaign.</p>
      </div>

      <button type="button" onClick={onUseSampleContext} className="btn-secondary w-full">
        Use sample context
      </button>

      <PromptBlock prompt="What are you launching?">
        {launchOptions.map((option) => (
          <ChipButton
            key={option}
            label={option}
            active={intake.launch === option}
            onClick={() => onSelect("launch", option)}
          />
        ))}
      </PromptBlock>

      <PromptBlock prompt="What’s the vibe?">
        {positioningOptions.map((option: Positioning) => (
          <ChipButton
            key={option}
            label={option}
            active={intake.vibe === option}
            onClick={() => onSelect("vibe", option)}
          />
        ))}
      </PromptBlock>

      <PromptBlock prompt="Goal?">
        {goalOptions.map((option: CampaignGoal) => (
          <ChipButton
            key={option}
            label={option}
            active={intake.goal === option}
            onClick={() => onSelect("goal", option)}
          />
        ))}
      </PromptBlock>

      <PromptBlock prompt="Existing vs new audience?">
        {audienceOptions.map((option: AudienceType) => (
          <ChipButton
            key={option}
            label={option}
            active={intake.audience === option}
            onClick={() => onSelect("audience", option)}
          />
        ))}
      </PromptBlock>

      <PromptBlock prompt="Upload context">
        {uploadActions.map((action) => (
          <ChipButton key={action} label={action} onClick={() => onUploadContext(action)} />
        ))}
      </PromptBlock>

      {intake.contextSources.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          <p className="font-semibold uppercase tracking-wide text-slate-500">Context loaded</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            {intake.contextSources.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
