import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ priority, ...props }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) =>
    createElement("img", { ...props, alt: props.alt ?? "" }),
}));

describe("forge output products section", () => {
  it("renders a projects anchor section with the required heading", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('id="forge-output"');
    expect(markup).toContain("[PRODUCTS FROM THE FORGE]");
  });

  it("uses responsive grid classes for one-column mobile and two-column desktop", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("grid");
    expect(markup).toContain("grid-cols-1");
    expect(markup).toContain("lg:grid-cols-2");
  });

  it("renders both product cards with exact names, badges, and descriptions", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("REPHORA");
    expect(markup).toContain("STATUS: BETA // PRODUCT BUILD");
    expect(markup).toContain("A learning platform for structured study sessions, concept memorization, progress tracking, and AI-assisted feedback.");

    expect(markup).toContain("SMIDHUS-SDD-HARNESS");
    expect(markup).toContain("STATUS: LIVE // DEVTOOL CLI");
    expect(markup).toContain("A Go-based CLI devtool for Spec-Driven Development workflows. It uses opencode as a bridge to the user’s own AI providers.");
  });

  it("renders a centered technical specs call-to-action in each card with visible interaction states", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup.match(/VIEW TECHNICAL SPECS/g)?.length).toBe(2);
    expect(markup).toContain("justify-center");
    expect(markup).toContain("hover:border-[#D38B5b]");
    expect(markup).toContain("focus-visible:ring-2");
  });

  it("uses shared secondary surface and forge glow treatment for project cards", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("bg-[#0A0D10]/40");
    expect(markup).toContain("border-[#1F242C]");
    expect(markup).toContain("shadow-[0_0_30px_rgba(255,107,0,0.03)]");
    expect(markup).toContain("hover:shadow-[0_0_30px_rgba(255,107,0,0.22)]");
  });
});
