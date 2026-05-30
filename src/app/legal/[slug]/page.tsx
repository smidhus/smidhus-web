import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import ForgeParticles from "../../components/ForgeParticles";
import { getLegalDocument, getLegalSlugs } from "../../../lib/legal";

interface LegalPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getLegalSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const document = await getLegalDocument(slug);

  if (!document) {
    notFound();
  }

  return (
    <div className="relative isolate mx-auto w-full max-w-3xl px-6 py-14 md:py-20">
      <ForgeParticles />

      <div className="relative z-20">

        <article className="rounded-sm border border-dashed border-[#1F242C] bg-[#0A0D10]/50 p-7 shadow-[0_0_30px_rgba(255,107,0,0.03)] md:p-8">
          <header className="border-b border-dashed border-[#1F242C] pb-6">
            <p className="font-mono text-xs tracking-wider text-[#00FF66]">
              STATUS: OFFICIALLY_PUBLISHED
            </p>
            {document.metadata.title ? (
              <h1 className="mt-4 font-mono text-3xl font-bold tracking-wider text-smidhus-bone md:text-4xl">
                {document.metadata.title}
              </h1>
            ) : null}
            {document.metadata.subtitle ? (
              <p className="mt-3 font-sans text-sm text-smidhus-bone-dim md:text-base">
                {document.metadata.subtitle}
              </p>
            ) : null}
            {document.metadata.lastUpdated ? (
              <p className="mt-4 font-mono text-xs tracking-wide text-smidhus-bone-dim/50">
                LAST UPDATED: {document.metadata.lastUpdated}
              </p>
            ) : null}
          </header>

          <div className="prose prose-invert prose-headings:font-mono prose-headings:tracking-wide prose-headings:text-zinc-100 prose-p:font-inter prose-p:leading-7 prose-p:text-zinc-200 prose-strong:text-zinc-100 mt-8 max-w-none font-inter text-zinc-200">
            <ReactMarkdown
              components={{
                h1: ({ ...props }) => (
                  <h1 className="font-mono text-2xl font-bold text-smidhus-bone mt-8 mb-4 border-b border-dashed border-[#1F242C] pb-2 uppercase tracking-wide" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2 className="font-mono text-xl font-bold text-smidhus-bone mt-8 mb-4 uppercase tracking-wide" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="font-mono text-base md:text-lg font-bold tracking-[0.1em] text-[#D38B5b] mt-8 mb-4 uppercase" {...props} />
                ),
                p: ({ ...props }) => (
                  <p className="font-sans text-sm md:text-base leading-relaxed text-smidhus-bone-dim mb-5" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul className="list-none mb-5 pl-0 space-y-3" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="list-decimal pl-5 mb-5 space-y-3 font-sans text-sm md:text-base text-smidhus-bone-dim" {...props} />
                ),
                li: ({ ...props }) => (
                  <li className="relative pl-5 font-sans text-sm md:text-base leading-relaxed text-smidhus-bone-dim">
                    <span className="absolute left-0 text-[#D38B5b] font-mono select-none">&gt;</span>
                    <span {...props} />
                  </li>
                ),
                strong: ({ ...props }) => (
                  <strong className="font-bold text-smidhus-bone font-sans" {...props} />
                ),
                a: ({ ...props }) => (
                  <a className="font-mono text-sm text-[#D38B5b] underline transition-colors duration-200 hover:text-smidhus-bone" {...props} />
                ),
                hr: ({ ...props }) => (
                  <hr className="border-dashed border-[#1F242C] my-8" {...props} />
                ),
              }}
            >
              {document.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
