import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import React from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

import ForgeParticles from "../../components/ForgeParticles";
import ImageLightbox from "../../components/ImageLightbox";
import Mermaid from "../../components/Mermaid";
import { getForgeLog, getForgeLogSlugs, getLogNavigation } from "../../../lib/forgeLogs";

interface ForgeLogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function hasImageLikeProps(child: React.ReactNode) {
  return (
    React.isValidElement<{ src?: unknown }>(child) &&
    (child.type === "img" || child.props.src !== undefined)
  );
}

function isMermaidCodeElement(child: React.ReactNode) {
  return (
    React.isValidElement<{ className?: string }>(child) &&
    child.props.className === "language-mermaid"
  );
}

export async function generateStaticParams() {
  const slugs = await getForgeLogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ForgeLogPage({ params }: ForgeLogPageProps) {
  const { slug } = await params;
  const [log, nav] = await Promise.all([
    getForgeLog(slug),
    getLogNavigation(slug)
  ]);

  if (!log) {
    notFound();
  }

  const hasSpecs =
    log.metadata.architecture ||
    log.metadata.promptStrategy ||
    log.metadata.codeSample ||
    log.metadata.imagePath;
  const mermaidCharts = Array.from(
    log.content.matchAll(/```mermaid\s*\n([\s\S]*?)```/g),
    (match) => match[1].trim()
  );

  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden bg-[#0f1316] min-h-[calc(100vh-4rem)]">
      <ForgeParticles />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/forge-logs"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-smidhus-bone-dim hover:text-[#D38B5b] transition-colors duration-200"
          >
            &lt; RETURN_TO_ARCHIVE
          </Link>
        </div>

        <article className="rounded-sm border border-dashed border-[#1F242C] bg-[#0A0D10]/50 p-6 md:p-8 shadow-[0_0_30px_rgba(255,107,0,0.03)]">
            <header className="border-b border-dashed border-[#1F242C] pb-6 mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-xs tracking-wider text-[#00FF66]">
                  {log.metadata.status}
                </span>
                <span className="font-mono text-xs tracking-wider text-[#D38B5b]">
                  • MODULE: {log.metadata.module}
                </span>
              </div>

              <h1 className="font-mono text-2xl font-bold tracking-wider text-smidhus-bone md:text-3xl uppercase">
                {log.metadata.title}
              </h1>

              {log.metadata.subtitle ? (
                <p className="mt-4 font-sans text-sm md:text-base leading-relaxed text-smidhus-bone-dim">
                  {log.metadata.subtitle}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-smidhus-bone-dim/50 border-t border-dashed border-[#1F242C]/40 pt-4">
                <span>DATE: {log.metadata.date}</span>
                <span>•</span>
                <span>{log.metadata.readingTime}</span>
                <span>•</span>
                <span>{log.metadata.difficulty}</span>
              </div>
            </header>

            {/* Technical Specifications Header Card */}
            {hasSpecs && (
              <section className="border border-[#1F242C] bg-[#0A0D10]/40 p-5 md:p-6 mb-8 rounded-sm shadow-[0_0_20px_rgba(255,107,0,0.02)] space-y-6">
                <header className="border-b border-[#1F242C] pb-3">
                  <h2 className="font-mono text-xs font-bold tracking-[0.12em] text-smidhus-bone">
                    [TECHNICAL SPECIFICATIONS]
                  </h2>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  {/* Left Column: Specs Lists */}
                  {(log.metadata.architecture || log.metadata.promptStrategy) && (
                    <div className="space-y-6 flex flex-col justify-between">
                      {log.metadata.architecture && (
                        <div className="space-y-3">
                          <h3 className="font-mono text-[10px] font-semibold tracking-[0.12em] text-[#00FF66] uppercase">
                            {"// SYSTEM ARCHITECTURE"}
                          </h3>
                          <ul className="space-y-2 font-sans text-xs leading-relaxed text-smidhus-bone-dim">
                            {log.metadata.architecture.map((item, idx) => (
                              <li key={idx} className="relative pl-4">
                                <span className="absolute left-0 text-[#00FF66] font-mono select-none">-</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {log.metadata.promptStrategy && (
                        <div className="space-y-3 border-t border-dashed border-[#1F242C]/40 pt-4">
                          <h3 className="font-mono text-[10px] font-semibold tracking-[0.12em] text-[#00FF66] uppercase">
                            {"// AI & PROMPT STRATEGY"}
                          </h3>
                          <ul className="space-y-2 font-sans text-xs leading-relaxed text-smidhus-bone-dim">
                            {log.metadata.promptStrategy.map((item, idx) => (
                              <li key={idx} className="relative pl-4">
                                <span className="absolute left-0 text-[#00FF66] font-mono select-none">-</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Right Column: Code block or Flow Diagram */}
                  {(log.metadata.codeSample || log.metadata.imagePath) && (
                    <div className="space-y-3 flex flex-col h-full justify-start">
                      <h3 className="font-mono text-[10px] font-semibold tracking-[0.12em] text-[#00FF66] uppercase">
                        {log.metadata.imagePath ? "// USER AUTHENTICATION & REFRESH FLOW" : "// CORE ALGORITHM IMPLEMENTATION"}
                      </h3>
                      {log.metadata.imagePath ? (
                        <div className="flex flex-col gap-2">
                          <ImageLightbox
                            src={log.metadata.imagePath}
                            alt={log.metadata.imageCaption || "Authentication Flow"}
                            className="max-h-56 w-auto object-contain rounded-sm border border-dashed border-[#1F242C]/60 bg-[#0A0D10]/20 p-2"
                          />
                          {log.metadata.imageCaption && (
                            <span className="font-mono text-[9px] text-smidhus-bone-dim/40 tracking-wider uppercase">
                              {`// ${log.metadata.imageCaption}`}
                            </span>
                          )}
                        </div>
                      ) : (
                        <pre className="overflow-x-auto flex-1 bg-transparent p-0 border-none shadow-none">
                          <code className="font-mono text-[10px] sm:text-xs leading-relaxed text-smidhus-bone-dim">
                            {log.metadata.codeSample}
                          </code>
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Main Markdown Body */}
            <div className="prose prose-invert prose-headings:font-mono prose-headings:tracking-wide prose-headings:text-zinc-100 prose-p:font-inter prose-p:leading-7 prose-p:text-zinc-200 prose-strong:text-zinc-100 max-w-none font-inter text-zinc-200">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={{
                  img: ({ src, alt }) => (
                    <div className="my-8 flex flex-col items-center gap-2">
                      <ImageLightbox
                        src={typeof src === "string" ? src : ""}
                        alt={alt || ""}
                        className="max-w-full md:max-w-2xl h-auto rounded border border-[#1F242C] shadow-[0_0_20px_rgba(255,107,0,0.02)]"
                      />
                      {alt && (
                        <span className="font-mono text-[9px] text-smidhus-bone-dim/40 tracking-wider uppercase mt-1">
                          {`// ${alt}`}
                        </span>
                      )}
                    </div>
                  ),
                  h1: ({ ...props }) => (
                    <h1
                      className="font-mono text-xl md:text-2xl font-bold text-smidhus-bone mt-8 mb-4 border-b border-dashed border-[#1F242C] pb-2 uppercase tracking-wide"
                      {...props}
                    />
                  ),
                  h2: ({ ...props }) => (
                    <h2
                      className="font-mono text-lg md:text-xl font-bold text-smidhus-bone mt-8 mb-4 uppercase tracking-wide"
                      {...props}
                    />
                  ),
                  h3: ({ children, ...props }) => {
                    const text =
                      typeof children === "string"
                        ? children
                        : Array.isArray(children)
                        ? children.join("")
                        : "";
                    const id = text
                      .toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, "")
                      .trim()
                      .replace(/\s+/g, "-");
                    return (
                      <h3
                        id={id}
                        className="font-mono text-sm md:text-base font-bold tracking-[0.1em] text-[#D38B5b] mt-8 mb-4 uppercase scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  p: ({ children, ...props }) => {
                    const hasImage = React.Children.toArray(children).some(hasImageLikeProps);

                    if (hasImage) {
                      return (
                        <div className="w-full flex flex-col items-center justify-center my-4" {...props}>
                          {children}
                        </div>
                      );
                    }

                    return (
                      <p
                        className="font-sans text-sm md:text-base leading-relaxed text-smidhus-bone-dim mb-5"
                        {...props}
                      >
                        {children}
                      </p>
                    );
                  },
                  ul: ({ ...props }) => (
                    <ul className="list-none mb-5 pl-0 space-y-3" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol
                      className="list-decimal pl-5 mb-5 space-y-3 font-sans text-sm md:text-base text-smidhus-bone-dim"
                      {...props}
                    />
                  ),
                  li: ({ ...props }) => (
                    <li className="relative pl-5 font-sans text-sm md:text-base leading-relaxed text-smidhus-bone-dim">
                      <span className="absolute left-0 text-[#D38B5b] font-mono select-none">
                        &gt;
                      </span>
                      <span {...props} />
                    </li>
                  ),
                  strong: ({ ...props }) => (
                    <strong className="font-bold text-smidhus-bone font-sans" {...props} />
                  ),
                  a: ({ ...props }) => (
                    <a
                      className="font-mono text-sm text-[#D38B5b] underline transition-colors duration-200 hover:text-smidhus-bone"
                      {...props}
                    />
                  ),
                  hr: ({ ...props }) => (
                    <hr className="border-dashed border-[#1F242C] my-8" {...props} />
                  ),
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code
                          className="bg-[#101418] text-[#E0A96D] px-1.5 py-0.5 rounded font-mono text-xs border border-[#1F242C] whitespace-nowrap"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }

                    const isMermaid = className === "language-mermaid";
                    if (isMermaid) {
                      const chartText = String(children).trim();
                      const diagramNumber = mermaidCharts.findIndex((item) => item === chartText) + 1;

                      return (
                        <Mermaid
                          chart={String(children)}
                          diagramNumber={diagramNumber > 0 ? diagramNumber : 1}
                        />
                      );
                    }

                    return (
                      <code className="font-mono text-xs leading-relaxed text-smidhus-bone-dim" {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children, ...props }) => {
                    const isMermaid = React.Children.toArray(children).some(isMermaidCodeElement);

                    if (isMermaid) {
                      return <>{children}</>;
                    }

                    return (
                      <pre
                        className="overflow-x-auto border border-dashed border-[#1F242C] bg-[#0A0D10]/40 p-4 shadow-[0_0_30px_rgba(255,107,0,0.03)] my-6 rounded-sm"
                        {...props}
                      >
                        {children}
                      </pre>
                    );
                  },
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto my-6 w-full border border-dashed border-[#1F242C] rounded-sm bg-[#0A0D10]/10">
                      <table className="w-full border-collapse font-sans text-xs md:text-sm text-smidhus-bone-dim" {...props} />
                    </div>
                  ),
                  thead: ({ ...props }) => (
                    <thead className="bg-[#0A0D10]/60 font-mono border-b border-dashed border-[#1F242C]" {...props} />
                  ),
                  th: ({ ...props }) => (
                    <th className="px-4 py-3 text-left font-bold text-[#D38B5b] uppercase tracking-wider text-[10px] sm:text-xs border-r border-dashed border-[#1F242C] whitespace-nowrap last:whitespace-normal last:border-r-0" {...props} />
                  ),
                  td: ({ ...props }) => (
                    <td className="px-4 py-3 border-b border-r border-dashed border-[#1F242C] whitespace-nowrap last:whitespace-normal last:border-r-0 last:border-b-0" {...props} />
                  ),
                  tr: ({ ...props }) => (
                    <tr className="hover:bg-[#101418]/30 transition-colors duration-150" {...props} />
                  ),
                }}
              >
                {log.content}
              </ReactMarkdown>
            </div>

            {/* Navigation Footer */}
            {(nav.previous || nav.next) && (
              <div className="mt-12 pt-6 border-t border-dashed border-[#1F242C] flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
                {nav.previous ? (
                  <Link
                    href={`/forge-logs/${nav.previous.slug}`}
                    className="flex-1 group decoration-transparent flex flex-col items-start"
                  >
                    <span className="font-mono text-[10px] tracking-wider text-smidhus-bone-dim/40 group-hover:text-[#D38B5b] transition-colors duration-200 uppercase">
                      {"// PREVIOUS_LOG"}
                    </span>
                    <span className="font-mono text-xs md:text-sm text-smidhus-bone group-hover:text-[#D38B5b] transition-all duration-200 mt-1 line-clamp-1">{nav.previous.title}</span>
                  </Link>
                ) : (
                  <div className="flex-1 hidden md:block" />
                )}
                {nav.next ? (
                  <Link
                    href={`/forge-logs/${nav.next.slug}`}
                    className="flex-1 md:text-right group decoration-transparent flex flex-col items-start md:items-end"
                  >
                    <span className="font-mono text-[10px] tracking-wider text-smidhus-bone-dim/40 group-hover:text-[#D38B5b] transition-colors duration-200 uppercase">
                      {"// NEXT_LOG //"}
                    </span>
                    <span className="font-mono text-xs md:text-sm text-smidhus-bone group-hover:text-[#D38B5b] transition-all duration-200 mt-1 line-clamp-1">{nav.next.title}</span>
                  </Link>
                ) : (
                  <div className="flex-1 hidden md:block" />
                )}
              </div>
            )}
          </article>
      </div>
    </main>
  );
}
