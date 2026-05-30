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

    expect(markup).toContain('id="core-craft"');
    expect(markup).toContain("[CORE CRAFT]");
  });

  it("uses responsive grid classes for one-column mobile, medium screens, and extra large screens", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("grid");
    expect(markup).toContain("grid-cols-1");
    expect(markup).toContain("md:grid-cols-2");
    expect(markup).toContain("xl:grid-cols-4");
  });

  it("renders all architecture blocks with required labels and technical content", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("BACKEND SYSTEMS");
    expect(markup).toContain("designed to survive real production usage");

    expect(markup).toContain("PRODUCT ENGINEERING");
    expect(markup).toContain("From product idea to usable software");

    expect(markup).toContain("CLOUD &amp; AUTOMATION");
    expect(markup).toContain("operational workflows built for maintainable systems");

    expect(markup).toContain("SDD WORKFLOWS");
    expect(markup).toContain("Spec-driven engineering workflows");
  });

  it("applies dashed structural borders and readable panel styling", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("border-dashed");
    expect(markup).toContain("border-[#1F242C]");
    expect(markup).toContain("bg-[#0A0D10]/40");
    expect(markup).toContain("shadow-[0_0_30px_rgba(255,107,0,0.03)]");
    expect(markup).toContain("hover:shadow-[0_0_30px_rgba(255,107,0,0.22)]");
  });

  it("styles technical section identifiers with forge orange monospace accents", async () => {
    const { default: Home } = await import("../src/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("text-[#D38B5b]");
    expect(markup).toContain("font-mono");
  });
});

