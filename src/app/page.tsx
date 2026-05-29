import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-1 items-center justify-center bg-[#0A0D10] px-6 py-16">
      <div className="flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        <div className="relative flex items-center justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[420px] w-[420px] rounded-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 60%)",
            }}
          />
          <Image
            src="/smidhus_character_logo.svg"
            alt="Smidhus character artwork"
            width={360}
            height={360}
            priority
            className="relative z-10"
            style={{ width: "100%", height: "auto", maxWidth: "360px" }}
          />
        </div>
        <div className="flex max-w-3xl flex-col items-center gap-5">
          <h1 className="font-mono text-2xl font-bold uppercase tracking-[0.08em] text-zinc-100 sm:text-3xl md:text-4xl">
            WE ARE BUSY FORGING, DO NOT DISTURB...{" "}
            <span className="text-[#FF6B00]">READY SOON!</span>
          </h1>
          <p className="font-sans max-w-2xl text-base text-zinc-300 sm:text-lg">
            Rephora and other Smidhus projects in development.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#services"
              className="min-w-40 border border-dashed border-[#1F242C] px-6 py-3 text-center font-mono text-sm font-semibold tracking-[0.12em] text-zinc-200 transition-all duration-300 ease-in-out hover:border-[#FF6B00] hover:text-zinc-50 hover:shadow-[0_0_24px_rgba(255,107,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
            >
              SERVICES
            </a>
            <a
              href="#portfolio"
              className="min-w-40 border border-dashed border-[#1F242C] px-6 py-3 text-center font-mono text-sm font-semibold tracking-[0.12em] text-zinc-200 transition-all duration-300 ease-in-out hover:border-[#FF6B00] hover:text-zinc-50 hover:shadow-[0_0_24px_rgba(255,107,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
            >
              PORTFOLIO
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}