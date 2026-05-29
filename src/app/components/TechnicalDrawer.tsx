"use client";

export type TechnicalSpec = {
  productId: string;
  name: string;
  summary: string;
  architecture: string[];
  promptStrategy: string[];
  codeSample: string;
};

type TechnicalDrawerProps = {
  open: boolean;
  loading: boolean;
  titleId: string;
  content: TechnicalSpec | null;
  onClose: () => void;
};

export default function TechnicalDrawer({
  open,
  loading,
  titleId,
  content,
  onClose,
}: TechnicalDrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl border-l border-[#1F242C] bg-[#0A0D10]/40 shadow-[0_0_30px_rgba(255,107,0,0.03)]"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b border-[#1F242C] px-5 py-4 sm:px-6">
          <h2 id={titleId} className="font-mono text-sm font-bold tracking-[0.12em] text-zinc-100 sm:text-base">
            {content?.name ?? "TECHNICAL SPECS"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="border border-dashed border-[#1F242C] bg-[#0A0D10]/40 px-3 py-2 font-mono text-xs font-semibold tracking-[0.12em] text-zinc-300 shadow-[0_0_30px_rgba(255,107,0,0.03)] transition-all duration-300 ease-in-out hover:border-[#FF6B00] hover:text-white hover:shadow-[0_0_30px_rgba(255,107,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1116]"
          >
            CLOSE
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {loading ? (
            <p className="font-mono text-sm text-zinc-300">Loading technical payload...</p>
          ) : null}

          {!loading && !content ? (
            <p className="font-sans text-sm leading-relaxed text-zinc-400">
              No technical specification is available for this module yet.
            </p>
          ) : null}

          {!loading && content ? (
            <div className="space-y-6">
              <section className="space-y-2">
                <h3 className="font-mono text-xs font-semibold tracking-[0.12em] text-[#00FF66]">SUMMARY</h3>
                <p className="font-sans text-sm leading-relaxed text-zinc-300">{content.summary}</p>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs font-semibold tracking-[0.12em] text-[#00FF66]">ARCHITECTURE</h3>
                <ul className="list-disc space-y-2 pl-5 font-sans text-sm leading-relaxed text-zinc-300">
                  {content.architecture.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs font-semibold tracking-[0.12em] text-[#00FF66]">PROMPT ENGINEERING</h3>
                <ul className="list-disc space-y-2 pl-5 font-sans text-sm leading-relaxed text-zinc-300">
                  {content.promptStrategy.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs font-semibold tracking-[0.12em] text-[#00FF66]">TYPESCRIPT SAMPLE</h3>
                <pre className="overflow-x-auto border border-dashed border-[#1F242C] bg-[#0A0D10]/40 p-4 shadow-[0_0_30px_rgba(255,107,0,0.03)]">
                  <code className="font-mono text-xs leading-relaxed text-zinc-300">{content.codeSample}</code>
                </pre>
              </section>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
