import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ priority, ...props }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) =>
    createElement("img", { ...props, alt: props.alt ?? "" }),
}));

describe("home hero presentation", () => {
  it("centers the Smidhus character image from the public folder", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('src="/smidhus_character_logo.svg"');
    expect(markup).toContain('alt="Smidhus character artwork"');
    expect(markup).toContain("items-center");
  });

  it("renders the exact uppercase headline with READY SOON in forge orange", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain(
      "WE ARE BUSY FORGING, DO NOT DISTURB... <span class=\"text-[#FF6B00]\">READY SOON!</span>",
    );
    expect(markup).toContain("text-[#FF6B00]");
    expect(markup).toContain("font-mono");
  });

  it("shows the subtitle text under the headline", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain(
      "Rephora and other Smidhus projects in development.",
    );
    expect(markup).toContain("font-sans");
  });

  it("renders a decorative radial forge glow behind the character artwork", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("pointer-events-none");
    expect(markup).toContain(
      "background-image:radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 60%)",
    );
  });

  it("mounts a fixed particle overlay without blocking CTAs", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("fixed");
    expect(markup).toContain("inset-0");
    expect(markup).toContain("z-10");
    expect(markup).toContain("relative z-20");
  });

  it("renders SERVICES and PORTFOLIO action links with dashed style", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('href="#services"');
    expect(markup).toContain('href="#portfolio"');
    expect(markup).toContain(">SERVICES</a>");
    expect(markup).toContain(">PORTFOLIO</a>");
    expect(markup).toContain("border-dashed");
    expect(markup).toContain("ease-in-out");
    expect(markup).toContain("flex-wrap");
  });
});
