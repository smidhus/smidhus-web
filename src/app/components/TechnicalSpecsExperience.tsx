"use client";

import { useId, useState } from "react";
import Image from "next/image";

import ForgeParticles from "./ForgeParticles";
import TechnicalDrawer, { type TechnicalSpec } from "./TechnicalDrawer";

const PRODUCTS = [
  {
    name: "REPHORA",
    status: "STATUS: STABLE // BETA ACCESS",
    description: "Cognitive Flashcard Engine powered by LLM Feedbacks",
  },
  {
    name: "SMIDHUS-HARNESS",
    status: "STATUS: IN DEVELOPMENT // OPEN SOURCE",
    description: "SDD (Spec-Driven Development) Framework for AI-Assisted Workflows",
  },
] as const;

const SYSTEM_BLOCKS = [
  {
    title: "AI ARCH",
    description:
      "Streaming inference flows are orchestrated with strict validation protocols so each response stage remains observable, auditable, and safe under production load.",
  },
  {
    title: "SDD MENTALITY",
    description:
      "Spec-Driven Development constrains LLM behavior through deterministic simulation environments, reducing hallucinations before changes reach runtime systems.",
  },
  {
    title: "EDGE RUNTIME",
    description:
      "Distributed execution on Vercel Edge keeps latency near sub-100ms for critical interactions while preserving globally consistent delivery characteristics.",
  },
];

type ProductId = (typeof PRODUCTS)[number]["name"];

export const TECHNICAL_SPECS: Record<ProductId, TechnicalSpec> = {
  REPHORA: {
    productId: "REPHORA",
    name: "REPHORA",
    summary:
      "Adaptive cognitive flashcard engine that calibrates review cadence from model-generated confidence and user correction signals.",
    architecture: [
      "Ingestion pipeline scores prompts and answers with structured grading phases.",
      "Review scheduler computes spaced repetition windows from feedback volatility.",
      "Audit logs preserve rationale traces for each revision decision.",
    ],
    promptStrategy: [
      "Use constrained templates with schema validation for every generated hint.",
      "Enforce source-grounded answer feedback before updating card memory state.",
      "Fallback to deterministic hints when model confidence falls below threshold.",
    ],
    codeSample: `type ReviewSignal = {\n  cardId: string;\n  confidence: number;\n  corrected: boolean;\n};\n\nexport function computeNextWindow(signal: ReviewSignal): number {\n  const base = signal.corrected ? 2 : 1;\n  const confidenceFactor = Math.max(1, Math.floor(signal.confidence * 3));\n\n  return base * confidenceFactor;\n}`,
  },
  "SMIDHUS-HARNESS": {
    productId: "SMIDHUS-HARNESS",
    name: "SMIDHUS-HARNESS",
    summary:
      "Spec-Driven Development harness that executes requirement simulation loops before implementation reaches merge-ready status.",
    architecture: [
      "Task graph parser links requirements, design, and implementation checkpoints.",
      "Agent orchestration layer enforces test-first contracts and validation gates.",
      "History ledger captures technical deltas for reproducible review cycles.",
    ],
    promptStrategy: [
      "Prompt contracts bind every coding step to explicit requirement identifiers.",
      "Reasoning instructions isolate unknowns and block unsupported assumptions.",
      "Verification prompts run lint, typecheck, and scenario tests before completion.",
    ],
    codeSample: `type TaskSpec = {\n  id: string;\n  requirements: string[];\n};\n\nexport async function executeSpec(task: TaskSpec): Promise<boolean> {\n  if (task.requirements.length === 0) return false;\n\n  await Promise.resolve();\n  return true;\n}`,
  },
};

export async function loadTechnicalSpec(productId: string): Promise<TechnicalSpec | null> {
  await Promise.resolve();
  return TECHNICAL_SPECS[productId as ProductId] ?? null;
}

export default function TechnicalSpecsExperience() {
  const titleId = useId();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState<TechnicalSpec | null>(null);

  const handleOpenDrawer = async (productId: ProductId) => {
    setIsDrawerOpen(true);
    setIsLoading(true);
    const payload = await loadTechnicalSpec(productId);
    setSelectedSpec(payload);
    setIsLoading(false);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setIsLoading(false);
    setSelectedSpec(null);
  };

  const framedSurfaceClass =
    "border border-[#1F242C] bg-[#0A0D10]/40 shadow-[0_0_30px_rgba(255,107,0,0.03)] transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_rgba(255,107,0,0.25)]";

  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden bg-[#0f1316]">
      <ForgeParticles />

      <div className={isDrawerOpen ? "relative z-20 opacity-30 blur-sm pointer-events-none" : "relative z-20"}>
        <section className="relative flex items-center justify-center px-6 py-16">
          <div className="relative z-20 flex w-full max-w-5xl flex-col items-center gap-10 text-center">
            <div className="relative isolate flex items-center justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-[430px] w-[430px] rounded-full opacity-80 blur-[70px]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,107,0,0.30) 0%, transparent 60%)",
                }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-[370px] w-[370px] rounded-full opacity-80 blur-[28px]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(10,13,16,0) 0%, rgba(10,13,16,0.15) 48%, rgba(10,13,16,0.75) 100%)",
                }}
              />

              <Image
                src="/smidhus_character_logo.svg"
                alt="Smidhus character artwork"
                width={360}
                height={360}
                priority
                className="relative z-10 h-auto w-[280px] object-contain sm:w-[320px] md:w-[360px]"
                style={{
                  filter:
                    "drop-shadow(0 0 1px rgba(10,13,16,0.95)) drop-shadow(0 0 2px rgba(10,13,16,0.85)) drop-shadow(0 18px 36px rgba(0,0,0,0.45)) drop-shadow(0 0 28px rgba(255,107,0,0.25))",
                }}
              />
            </div>

            <div className="flex max-w-3xl flex-col items-center gap-5">
              <h1 className="font-mono text-2xl font-bold uppercase tracking-[0.08em] text-smidhus-bone sm:text-3xl md:text-4xl">
                WE ARE BUSY FORGING, DO NOT DISTURB...{" "}
                <span className="text-[#D38B5b]">READY SOON!</span>
              </h1>

              <p className="font-sans max-w-2xl text-base text-smidhus-bone-dim sm:text-lg">
                Rephora and other Smidhus projects in development.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href="#services"
                  className="min-w-40 border border-dashed border-[#1F242C] bg-[#0A0D10]/40 px-6 py-3 text-center font-mono text-sm font-semibold tracking-[0.12em] text-smidhus-bone-dim transition-all duration-300 ease-in-out hover:border-[#D38B5b] hover:text-smidhus-bone hover:shadow-[0_0_24px_rgba(255,107,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
                >
                  SERVICES
                </a>

                <a
                  href="#portfolio"
                  className="min-w-40 border border-dashed border-[#1F242C] bg-[#0A0D10]/40 px-6 py-3 text-center font-mono text-sm font-semibold tracking-[0.12em] text-smidhus-bone-dim transition-all duration-300 ease-in-out hover:border-[#D38B5b] hover:text-smidhus-bone hover:shadow-[0_0_24px_rgba(255,107,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
                >
                  PORTFOLIO
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="relative z-20 px-6 pb-20 pt-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <h2 className="font-mono text-xl font-bold uppercase tracking-[0.1em] text-smidhus-bone sm:text-2xl">[THE FORGE OUTPUT]</h2>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {PRODUCTS.map((product) => (
                <article
                  key={product.name}
                  className={`${framedSurfaceClass} flex min-h-64 flex-col gap-5 p-6`}
                >
                  <header className="space-y-3">
                    <h3 className="font-mono text-xl font-bold tracking-[0.08em] text-smidhus-bone">{product.name}</h3>
                    <p className="inline-flex border border-dashed border-[#1F242C] px-3 py-1 font-mono text-xs font-semibold tracking-[0.12em] text-smidhus-bone-dim">
                      {product.status}
                    </p>
                  </header>

                  <p className="font-sans text-base leading-relaxed text-smidhus-bone-dim">{product.description}</p>

                  <div className="mt-auto flex justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => void handleOpenDrawer(product.name)}
                      className="border border-dashed border-[#1F242C] bg-[#0A0D10]/40 px-6 py-3 text-center font-mono text-xs font-semibold tracking-[0.12em] text-smidhus-bone-dim shadow-[0_0_30px_rgba(255,107,0,0.03)] transition-all duration-300 ease-in-out hover:border-[#D38B5b] hover:text-smidhus-bone hover:shadow-[0_0_30px_rgba(255,107,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
                    >
                      VIEW TECHNICAL SPECS
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="systems" className="relative z-20 px-6 pb-24 pt-4">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <h2 className="font-mono text-xl font-bold uppercase tracking-[0.1em] text-smidhus-bone sm:text-2xl">
              [CORE STACK &amp; SYSTEMS]
            </h2>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {SYSTEM_BLOCKS.map((block) => (
                <article
                  key={block.title}
                  className={`${framedSurfaceClass} flex min-h-64 flex-col gap-4 border-dashed p-6`}
                >
                  <h3 className="font-mono text-base font-bold tracking-[0.1em] text-[#D38B5b] sm:text-lg">{block.title}</h3>

                  <p className="font-sans text-sm leading-relaxed text-smidhus-bone-dim sm:text-base">{block.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <TechnicalDrawer
        open={isDrawerOpen}
        loading={isLoading}
        titleId={titleId}
        content={selectedSpec}
        onClose={handleCloseDrawer}
      />
    </main>
  );
}
