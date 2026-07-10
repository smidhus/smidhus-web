"use client";

import Image from "next/image";

import ForgeParticles from "./ForgeParticles";

type ProductAction =
  | {
      label: string;
      href: string;
      external?: boolean;
      variant?: "primary" | "secondary";
      disabled?: false;
    }
  | {
      label: string;
      disabled: true;
    };

type ForgeProduct = {
  name: string;
  status: string;
  description: string;
  actions: ProductAction[];
};

const PRODUCTS: ForgeProduct[] = [
  {
    name: "REPHORA",
    status: "STATUS: BETA // PRODUCT BUILD",
    description:
      "A learning platform for structured study sessions, concept memorization, progress tracking, and AI-assisted feedback.",
    actions: [
      {
        label: "PRODUCT SITE",
        href: "https://rephora.app",
        external: true,
        variant: "primary",
      },
      {
        label: "TECHNICAL LOG",
        href: "/forge-logs/rephora-portal",
        variant: "secondary",
      },
    ],
  },
  {
    name: "SMIDHUS-SDD-HARNESS",
    status: "STATUS: LIVE // DEVTOOL CLI",
    description:
      "A Go-based CLI devtool for Spec-Driven Development workflows. It uses opencode as a bridge to the user’s own AI providers.",
    actions: [
      {
        label: "BUILDING",
        disabled: true,
      },
    ],
  },
];

const CORE_CRAFT_BLOCKS = [
  {
    title: "BACKEND SYSTEMS",
    description:
      "APIs, data models, business rules, integrations, and service layers designed to survive real production usage.",
  },
  {
    title: "PRODUCT ENGINEERING",
    description:
      "From product idea to usable software: scope, flows, architecture, trade-offs, implementation strategy, and delivery execution.",
  },
  {
    title: "CLOUD & AUTOMATION",
    description:
      "Cloud-ready services, deployment pipelines, background jobs, integrations, and operational workflows built for maintainable systems.",
  },
  {
    title: "SDD WORKFLOWS",
    description:
      "Spec-driven engineering workflows using structured agents, validation gates, documentation, and repeatable build processes.",
  },
] as const;

const SMITH_PROFILE = {
  name: "Juan Zuluaga",
  intro:
    "Smidhus is forged by Juan Zuluaga, a software engineer with 11+ years of experience turning business problems into backend systems, cloud-ready platforms, automations, and digital products.",
  description:
    "This forge is where I build focused products, experiment with AI-powered workflows, and shape technical ideas into systems that can run, scale, and be maintained.",
  experience: "11+ years building production software",
  focus: "Backend, cloud, automation, architecture, and product delivery",
  links: [
    {
      label: "PERSONAL LINKEDIN",
      href: "https://www.linkedin.com/in/juanfzuluagag",
    },
    {
      label: "PERSONAL GITHUB",
      href: "https://github.com/juanfzuluagag",
    },
  ],
} as const;

export default function TechnicalSpecsExperience() {
  const framedSurfaceClass =
    "border border-[#1F242C] bg-[#0A0D10]/40 shadow-[0_0_30px_rgba(255,107,0,0.03)] transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_rgba(255,107,0,0.22)]";

  const primaryActionClass =
    "min-w-40 border border-dashed border-[#1F242C] bg-[#0A0D10]/40 px-6 py-3 text-center font-mono text-sm font-semibold tracking-[0.12em] text-zinc-300 transition-all duration-300 ease-in-out hover:border-[#FF6B00] hover:text-white hover:shadow-[0_0_24px_rgba(255,107,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]";

  const secondaryActionClass =
    "border border-dashed border-[#1F242C] bg-[#0A0D10]/40 px-6 py-3 text-center font-mono text-xs font-semibold tracking-[0.12em] text-smidhus-bone-dim shadow-[0_0_30px_rgba(255,107,0,0.03)] transition-all duration-300 ease-in-out hover:border-[#D38B5b] hover:text-smidhus-bone hover:shadow-[0_0_30px_rgba(255,107,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]";

  const productActionClass =
    "border border-[#D38B5b] bg-[#D38B5b]/12 px-6 py-3 text-center font-mono text-xs font-semibold tracking-[0.12em] text-smidhus-bone shadow-[0_0_24px_rgba(211,139,91,0.12)] transition-all duration-300 ease-in-out hover:bg-[#D38B5b]/20 hover:text-white hover:shadow-[0_0_30px_rgba(211,139,91,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]";

  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden bg-[#0f1316]">
      <ForgeParticles />

      <div className="relative z-20">
        <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-20">
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
                width={210}
                height={297}
                priority
                className="relative z-10 h-auto w-[260px] object-contain sm:w-[320px] md:w-[360px]"
                style={{
                  height: "auto",
                  filter:
                    "drop-shadow(0 0 1px rgba(10,13,16,0.95)) drop-shadow(0 0 2px rgba(10,13,16,0.85)) drop-shadow(0 18px 36px rgba(0,0,0,0.45)) drop-shadow(0 0 28px rgba(255,107,0,0.25))",
                }}
              />
            </div>

            <div className="flex max-w-3xl flex-col items-center gap-5">
              <h1 className="font-mono text-2xl font-bold uppercase tracking-[0.08em] text-smidhus-bone sm:text-3xl md:text-4xl">
                BUSY FORGING REAL SOFTWARE.
                <br />
                DO NOT DISTURB THE BUILD.
              </h1>

              <p className="max-w-2xl font-sans text-base leading-relaxed text-smidhus-bone-dim sm:text-lg">
                Independent software foundry building backend systems, cloud-ready
                platforms, automations, and digital products.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a href="#forge-output" className={primaryActionClass}>
                  VIEW THE FORGE
                </a>

                <a href="#comms" className={primaryActionClass}>
                  OPEN COMMS
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="forge-output"
          className="relative z-20 scroll-mt-24 px-6 pb-20 pt-6"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <h2 className="font-mono text-xl font-bold uppercase tracking-[0.1em] text-smidhus-bone sm:text-2xl">
              [PRODUCTS FROM THE FORGE]
            </h2>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {PRODUCTS.map((product) => (
                <article
                  key={product.name}
                  className={`${framedSurfaceClass} flex min-h-64 flex-col gap-5 p-6`}
                >
                  <header className="space-y-3">
                    <h3 className="font-mono text-xl font-bold tracking-[0.08em] text-smidhus-bone">
                      {product.name}
                    </h3>

                    <p className="inline-flex border border-dashed border-[#1F242C] px-3 py-1 font-mono text-xs font-semibold tracking-[0.12em] text-smidhus-bone-dim">
                      {product.status}
                    </p>
                  </header>

                  <p className="font-sans text-base leading-relaxed text-smidhus-bone-dim">
                    {product.description}
                  </p>

                  <div className="mt-auto flex flex-wrap justify-center gap-3 pt-2">
                    {product.actions.map((action) =>
                      action.disabled ? (
                        <span
                          key={action.label}
                          aria-disabled="true"
                          className={`${secondaryActionClass} cursor-not-allowed opacity-55 hover:border-[#1F242C] hover:text-smidhus-bone-dim hover:shadow-[0_0_30px_rgba(255,107,0,0.03)]`}
                        >
                          {action.label}
                        </span>
                      ) : (
                        <a
                          key={action.label}
                          href={action.href}
                          target={action.external ? "_blank" : undefined}
                          rel={action.external ? "noreferrer" : undefined}
                          className={
                            action.variant === "primary"
                              ? productActionClass
                              : secondaryActionClass
                          }
                        >
                          {action.label}
                        </a>
                      )
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="core-craft"
          className="relative z-20 scroll-mt-24 px-6 pb-24 pt-4"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <h2 className="font-mono text-xl font-bold uppercase tracking-[0.1em] text-smidhus-bone sm:text-2xl">
              [CORE CRAFT]
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {CORE_CRAFT_BLOCKS.map((block) => (
                <article
                  key={block.title}
                  className={`${framedSurfaceClass} flex min-h-64 flex-col gap-4 border-dashed p-6`}
                >
                  <h3 className="font-mono text-base font-bold tracking-[0.1em] text-[#D38B5b] sm:text-lg">
                    {block.title}
                  </h3>

                  <p className="font-sans text-sm leading-relaxed text-smidhus-bone-dim sm:text-base">
                    {block.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="the-smith"
          className="relative z-20 scroll-mt-24 px-6 pb-24 pt-4"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <h2 className="font-mono text-xl font-bold uppercase tracking-[0.1em] text-smidhus-bone sm:text-2xl">
              [THE SMITH]
            </h2>

            <article className={`${framedSurfaceClass} border-dashed p-6 sm:p-8`}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="flex flex-col gap-5">
                  <p className="font-sans text-base leading-relaxed text-smidhus-bone-dim sm:text-lg">
                    {SMITH_PROFILE.intro}
                  </p>

                  <p className="font-sans text-base leading-relaxed text-smidhus-bone-dim sm:text-lg">
                    {SMITH_PROFILE.description}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {SMITH_PROFILE.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={secondaryActionClass}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="border border-dashed border-[#1F242C] bg-[#0A0D10]/40 p-4">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#D38B5b]">
                      EXPERIENCE
                    </p>
                    <p className="mt-2 font-mono text-sm leading-relaxed text-smidhus-bone-dim">
                      {SMITH_PROFILE.experience}
                    </p>
                  </div>

                  <div className="border border-dashed border-[#1F242C] bg-[#0A0D10]/40 p-4">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#D38B5b]">
                      FOCUS
                    </p>
                    <p className="mt-2 font-mono text-sm leading-relaxed text-smidhus-bone-dim">
                      {SMITH_PROFILE.focus}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section
          id="comms"
          className="relative z-20 scroll-mt-24 px-6 pb-24 pt-4"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <h2 className="font-mono text-xl font-bold uppercase tracking-[0.1em] text-smidhus-bone sm:text-2xl">
              [OPEN COMMS]
            </h2>

            <article className={`${framedSurfaceClass} border-dashed p-6 sm:p-8`}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="flex flex-col gap-5">
                  <header className="space-y-3">
                    <h3 className="font-mono text-base font-bold tracking-[0.1em] text-[#D38B5b] sm:text-lg">
                      HAVE SOMETHING TO FORGE?
                    </h3>
                  </header>

                  <p className="font-sans text-base leading-relaxed text-smidhus-bone-dim">
                    Have a product idea, a backend problem, or an automation that
                    should already exist?
                  </p>

                  <p className="font-sans text-base leading-relaxed text-smidhus-bone-dim">
                    Send a signal. The forge is open for selected builds, technical
                    consulting, integrations, and product engineering work.
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-5 border border-dashed border-[#1F242C] bg-[#0A0D10]/40 p-5">
                  <div className="space-y-2">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#D38B5b]">
                      MAIL_GATEWAY
                    </p>

                    <a
                      href="mailto:hello@smidhus.com"
                      className="break-all font-mono text-base text-smidhus-bone transition-colors duration-300 hover:text-[#D38B5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
                    >
                      hello@smidhus.com
                    </a>
                  </div>

                  <a
                    href="mailto:hello@smidhus.com"
                    className={`${secondaryActionClass} inline-flex w-fit`}
                  >
                    SEND TRANSMISSION
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
