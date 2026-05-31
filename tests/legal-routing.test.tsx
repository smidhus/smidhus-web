import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";

const mockNotFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});

vi.mock("next/navigation", () => ({
  notFound: mockNotFound,
}));

describe("legal routing and content loading", () => {
  beforeEach(() => {
    mockNotFound.mockClear();
  });

  it("loads available legal slugs from markdown files", async () => {
    const { getLegalSlugs } = await import("../src/lib/legal");
    const slugs = await getLegalSlugs();

    expect(slugs).toEqual(
      expect.arrayContaining(["privacy-policy", "legal-notice"]),
    );
  });

  it("parses metadata and markdown body from filesystem", async () => {
    const { getLegalDocument } = await import("../src/lib/legal");
    const document = await getLegalDocument("privacy-policy");

    expect(document).not.toBeNull();
    expect(document?.slug).toBe("privacy-policy");
    expect(document?.metadata.title).toBe("PRIVACY POLICY");
    expect(document?.metadata.subtitle).toBe("SMIDHUS SOFTWARE FOUNDRY");
    expect(document?.metadata.lastUpdated).toBe("MAY 2026");
    expect(document?.content).toContain("### 1. WHO WE ARE");
  });

  it("returns null for unknown legal slugs", async () => {
    const { getLegalDocument } = await import("../src/lib/legal");
    const document = await getLegalDocument("not-a-real-slug");

    expect(document).toBeNull();
  });

  it("exports static params from legal markdown filenames", async () => {
    const { generateStaticParams } = await import("../src/app/legal/[slug]/page");
    const params = await generateStaticParams();

    expect(params).toEqual(
      expect.arrayContaining([
        { slug: "privacy-policy" },
        { slug: "legal-notice" },
      ]),
    );
  });

  it("renders a legal page for a known slug", async () => {
    const { default: LegalPage } = await import("../src/app/legal/[slug]/page");
    const page = await LegalPage({ params: Promise.resolve({ slug: "privacy-policy" }) });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("PRIVACY POLICY");
    expect(markup).toContain("SMIDHUS SOFTWARE FOUNDRY");
    expect(markup).toContain("WHO WE ARE");
  });

  it("applies the industrial legal shell and typography contract", async () => {
    const { default: LegalPage } = await import("../src/app/legal/[slug]/page");
    const page = await LegalPage({ params: Promise.resolve({ slug: "privacy-policy" }) });
    const markup = renderToStaticMarkup(page);
    expect(markup).toContain("max-w-3xl");
    expect(markup).toContain("bg-[#0A0D10]/50");
    expect(markup).toContain("border-dashed");
    expect(markup).toContain("border-[#1F242C]");
    expect(markup).toContain("shadow-[0_0_30px_rgba(255,107,0,0.03)]");
    expect(markup).toContain("STATUS: OFFICIALLY_PUBLISHED");
    expect(markup).toContain("text-[#00FF66]");
    expect(markup).toContain("font-inter");
    expect(markup).toContain("prose-headings:font-mono");
  });

  it("calls notFound for an unknown slug", async () => {
    const { default: LegalPage } = await import("../src/app/legal/[slug]/page");

    await expect(
      LegalPage({ params: Promise.resolve({ slug: "missing-slug" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(mockNotFound).toHaveBeenCalledOnce();
  });
});
