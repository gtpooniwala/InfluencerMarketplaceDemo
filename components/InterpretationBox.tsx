type InterpretationBoxProps = {
  title?: string;
  bullets: string[];
};

export const InterpretationBox = ({ title = "What this means", bullets }: InterpretationBoxProps) => {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-900">{title}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-emerald-950">
        {bullets.slice(0, 5).map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
};
