import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
  Fira_Code: () => ({ variable: "--font-fira-code" }),
}));

describe("global footer", () => {
  it("renders a semantic footer with legal and profile links", async () => {
    const { default: Footer } = await import("../src/app/components/Footer");
    const markup = renderToStaticMarkup(<Footer />);

    expect(markup).toContain("<footer");
    expect(markup).toContain("text-[11px]");
    expect(markup).toContain("tracking-wider");
    expect(markup).toContain("text-zinc-500");
    expect(markup).toContain("font-mono");

    expect(markup).toContain("PRIVACY POLICY");
    expect(markup).toContain("LEGAL NOTICE");
    expect(markup).toContain('href="/legal/privacy-policy"');
    expect(markup).toContain('href="/legal/legal-notice"');
    expect(markup).toContain("X_TWITTER");
    expect(markup).toContain("GITHUB");
    expect(markup).toContain("LINKEDIN");

    expect(markup).toContain("hover:opacity-80");
    expect(markup).toContain("focus-visible:opacity-80");
    expect(markup).toContain("focus-visible:outline");
    expect(markup).toContain("focus-visible:outline-2");
    expect(markup).toContain("focus-visible:outline-offset-2");

    expect(markup).toContain("© Copyright 2026, all smidhus dev");
  });

  it("mounts footer after main content in root layout", async () => {
    const { default: RootLayout } = await import("../src/app/layout");
    const markup = renderToStaticMarkup(
      <RootLayout>
        <p>Route Content</p>
      </RootLayout>,
    );

    const mainIndex = markup.indexOf("<main");
    const footerIndex = markup.indexOf("<footer");

    expect(mainIndex).toBeGreaterThanOrEqual(0);
    expect(footerIndex).toBeGreaterThan(mainIndex);
    expect(markup).toContain("Route Content");
  });
});
