import Image from "next/image";
import ForgeParticles from "./components/ForgeParticles";

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
];

export default function Home() {
  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden bg-[#0A0D10]">
      <ForgeParticles />

      <section className="relative flex items-center justify-center px-6 py-16">
        <div className="relative z-20 flex w-full max-w-5xl flex-col items-center gap-10 text-center">
          <div className="relative isolate flex items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-[430px] w-[430px] rounded-full opacity-80 blur-[70px]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,107,0,0.24) 0%, rgba(255,107,0,0.10) 42%, rgba(255,107,0,0.03) 62%, transparent 74%)",
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
                  "drop-shadow(0 0 1px rgba(10,13,16,0.95)) drop-shadow(0 0 2px rgba(10,13,16,0.85)) drop-shadow(0 18px 36px rgba(0,0,0,0.45)) drop-shadow(0 0 28px rgba(255,107,0,0.12))",
              }}
            />
          </div>

          <div className="flex max-w-3xl flex-col items-center gap-5">
            <h1 className="font-mono text-2xl font-bold uppercase tracking-[0.08em] text-zinc-100 sm:text-3xl md:text-4xl">
              WE ARE BUSY FORGING, DO NOT DISTURB...{" "}
              <span className="text-[#FF6B00] drop-shadow-[0_0_15px_rgba(255,107,0,0.35)]">
                READY SOON!
              </span>
            </h1>

            <p className="font-sans max-w-2xl text-base text-zinc-400 sm:text-lg">
              Rephora and other Smidhus projects in development.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#services"
                className="min-w-40 border border-dashed border-[#1F242C] bg-[#0A0D10]/40 px-6 py-3 text-center font-mono text-sm font-semibold tracking-[0.12em] text-zinc-300 transition-all duration-300 ease-in-out hover:border-[#FF6B00] hover:text-white hover:shadow-[0_0_24px_rgba(255,107,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
              >
                SERVICES
              </a>

              <a
                href="#portfolio"
                className="min-w-40 border border-dashed border-[#1F242C] bg-[#0A0D10]/40 px-6 py-3 text-center font-mono text-sm font-semibold tracking-[0.12em] text-zinc-300 transition-all duration-300 ease-in-out hover:border-[#FF6B00] hover:text-white hover:shadow-[0_0_24px_rgba(255,107,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
              >
                PORTFOLIO
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-20 px-6 pb-20 pt-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <h2 className="font-mono text-xl font-bold uppercase tracking-[0.1em] text-zinc-100 sm:text-2xl">
            [THE FORGE OUTPUT]
          </h2>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {PRODUCTS.map((product) => (
              <article
                key={product.name}
                className="flex min-h-64 flex-col gap-5 border border-[#1F242C] bg-[#0A0D10]/70 p-6"
              >
                <header className="space-y-3">
                  <h3 className="font-mono text-xl font-bold tracking-[0.08em] text-zinc-100">
                    {product.name}
                  </h3>
                  <p className="inline-flex border border-dashed border-[#1F242C] px-3 py-1 font-mono text-xs font-semibold tracking-[0.12em] text-zinc-300">
                    {product.status}
                  </p>
                </header>

                <p className="font-sans text-base leading-relaxed text-zinc-400">
                  {product.description}
                </p>

                <div className="mt-auto flex justify-center pt-2">
                  <a
                    href="#"
                    className="border border-dashed border-[#1F242C] bg-[#0A0D10]/40 px-6 py-3 text-center font-mono text-xs font-semibold tracking-[0.12em] text-zinc-300 transition-all duration-300 ease-in-out hover:border-[#FF6B00] hover:text-white hover:shadow-[0_0_24px_rgba(255,107,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
                  >
                    VIEW TECHNICAL SPECS
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
