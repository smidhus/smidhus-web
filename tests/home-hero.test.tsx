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

  it("renders the exact uppercase headline", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("BUSY FORGING REAL SOFTWARE.");
    expect(markup).toContain("DO NOT DISTURB THE BUILD.");
    expect(markup).toContain("font-mono");
  });

  it("shows the subtitle text under the headline", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain(
      "Independent software foundry building backend systems, cloud-ready"
    );
    expect(markup).toContain("font-sans");
  });

  it("renders a decorative radial forge glow behind the character artwork", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("pointer-events-none");
    expect(markup).toContain(
      "background-image:radial-gradient(circle, rgba(255,107,0,0.30) 0%, transparent 60%)"
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

  it("renders VIEW THE FORGE and OPEN COMMS action links with dashed style", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('href="#forge-output"');
    expect(markup).toContain('href="#comms"');
    expect(markup).toContain(">VIEW THE FORGE</a>");
    expect(markup).toContain(">OPEN COMMS</a>");
    expect(markup).toContain("border-dashed");
    expect(markup).toContain("ease-in-out");
    expect(markup).toContain("flex-wrap");
  });
});
