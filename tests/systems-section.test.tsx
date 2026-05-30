import { createElement } from "react";
import type { ImgHTMLAttributes } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ priority, ...props }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) =>
    createElement("img", { ...props, alt: props.alt ?? "" }),
}));

describe("core stack and systems section", () => {
  it("renders the systems anchor section with the required heading", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('id="systems"');
    expect(markup).toContain("[CORE STACK &amp; SYSTEMS]");
  });

  it("uses responsive grid classes for one-column mobile and three-column large screens", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("grid");
    expect(markup).toContain("grid-cols-1");
    expect(markup).toContain("lg:grid-cols-3");
  });

  it("renders all architecture blocks with required labels and technical content", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("AI ARCH");
    expect(markup).toContain("Streaming inference flows");
    expect(markup).toContain("strict validation protocols");

    expect(markup).toContain("SDD MENTALITY");
    expect(markup).toContain("Spec-Driven Development");
    expect(markup).toContain("deterministic simulation environments");

    expect(markup).toContain("EDGE RUNTIME");
    expect(markup).toContain("Vercel Edge");
    expect(markup).toContain("sub-100ms");
  });

  it("applies dashed structural borders and readable panel styling", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("border-dashed");
    expect(markup).toContain("border-[#1F242C]");
    expect(markup).toContain("bg-[#0A0D10]/40");
    expect(markup).toContain("shadow-[0_0_30px_rgba(255,107,0,0.03)]");
    expect(markup).toContain("hover:shadow-[0_0_30px_rgba(255,107,0,0.25)]");
  });

  it("styles technical section identifiers with forge orange monospace accents", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("text-[#D38B5b]");
    expect(markup).toContain("font-mono");
  });
});
