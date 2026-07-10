import Link from "next/link";
import { getAllForgeLogs } from "../../lib/forgeLogs";
import ForgeParticles from "../components/ForgeParticles";

export const metadata = {
  title: "Forge Logs - Smidhus",
  description: "Technical writings, architecture logs, and product engineering journals from the Smidhus Software Foundry.",
};

export default async function ForgeLogsPage() {
  const logs = await getAllForgeLogs();

  const framedSurfaceClass =
    "border border-[#1F242C] bg-[#0A0D10]/40 shadow-[0_0_30px_rgba(255,107,0,0.03)] transition-all duration-300 ease-in-out hover:border-[#FF6B00]/40 hover:shadow-[0_0_30px_rgba(255,107,0,0.12)]";

  const secondaryActionClass =
    "border border-dashed border-[#1F242C] bg-[#0A0D10]/40 px-6 py-3 text-center font-mono text-xs font-semibold tracking-[0.12em] text-smidhus-bone-dim shadow-[0_0_30px_rgba(255,107,0,0.03)] transition-all duration-300 ease-in-out hover:border-[#D38B5b] hover:text-smidhus-bone hover:shadow-[0_0_30px_rgba(255,107,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]";

  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden bg-[#0f1316] min-h-[calc(100vh-4rem)]">
      <ForgeParticles />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <header className="border-b border-dashed border-[#1F242C] pb-8 mb-12">
          <p className="font-mono text-xs tracking-wider text-[#00FF66]">
            ARCHIVE: FORGE_LOGS
          </p>
          <h1 className="mt-4 font-mono text-3xl font-bold tracking-wider text-smidhus-bone md:text-4xl uppercase">
            [TECHNICAL ARTICLES & LOGS]
          </h1>
          <p className="mt-3 font-sans text-sm text-smidhus-bone-dim md:text-base max-w-2xl">
            Deep-dives into product architecture, database designs, prompt contracts, and scaling decisions made at the Smidhus Software Foundry.
          </p>
        </header>

        {logs.length === 0 ? (
          <div className="border border-dashed border-[#1F242C] bg-[#0A0D10]/20 p-10 text-center rounded-sm">
            <p className="font-mono text-sm text-smidhus-bone-dim">
              [SYSTEM_LOG: NO_ENTRIES_FOUND]
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {logs.map((log) => (
              <article
                key={log.slug}
                className={`${framedSurfaceClass} flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-sm`}
              >
                <div className="flex-1 space-y-4">
                  <header className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="border border-dashed border-[#1F242C] px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-[#00FF66]">
                        {log.metadata.status}
                      </span>
                      <span className="border border-[#1F242C] bg-[#0a0d10]/60 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-[#D38B5b]">
                        MODULE: {log.metadata.module}
                      </span>
                    </div>

                    <h2 className="font-mono text-xl font-bold tracking-wider text-smidhus-bone hover:text-[#D38B5b] transition-colors duration-200">
                      <Link href={`/forge-logs/${log.slug}`}>
                        {log.metadata.title}
                      </Link>
                    </h2>
                  </header>

                  <p className="font-sans text-sm md:text-base leading-relaxed text-smidhus-bone-dim line-clamp-3">
                    {log.metadata.subtitle}
                  </p>

                  <footer className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-smidhus-bone-dim/60">
                    <span>DATE: {log.metadata.date}</span>
                    <span>•</span>
                    <span>{log.metadata.readingTime}</span>
                    <span>•</span>
                    <span>{log.metadata.difficulty}</span>
                  </footer>
                </div>

                <div className="flex items-center justify-start md:justify-end md:min-w-[200px]">
                  <Link
                    href={`/forge-logs/${log.slug}`}
                    className={`${secondaryActionClass} w-full md:w-auto`}
                  >
                    READ DEEP DIVE
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
