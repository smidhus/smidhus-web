import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) =>
    createElement("img", { ...props, alt: props.alt ?? "" }),
}));

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
  Fira_Code: () => ({ variable: "--font-fira-code" }),
}));

describe("global navbar", () => {
  it("renders a semantic navigation landmark with brand image and text", async () => {
    const { default: Navbar } = await import("../src/app/components/Navbar");
    const markup = renderToStaticMarkup(<Navbar />);

    expect(markup).toContain("<nav");
    expect(markup).toContain("backdrop-blur-md");
    expect(markup).toContain("bg-[#0A0D10]/80");
    expect(markup).toContain("border-b");
    expect(markup).toContain("border-[#1F242C]");
    expect(markup).toContain('src="/smidhus_logo.svg"');
    expect(markup).toContain('width="32"');
    expect(markup).toContain('height="32"');
    expect(markup).toContain('alt="Smidhus Logo"');
    expect(markup).toContain("SMIDHUS");
    expect(markup).toContain("font-mono");
    expect(markup).toContain("tracking-wider");
    expect(markup).toContain("font-bold");
  });

  it("mounts navbar before main content in root layout", async () => {
    const { default: RootLayout } = await import("../src/app/layout");
    const markup = renderToStaticMarkup(
      <RootLayout>
        <p>Route Content</p>
      </RootLayout>,
    );

    const navbarIndex = markup.indexOf("<nav");
    const mainIndex = markup.indexOf("<main");

    expect(navbarIndex).toBeGreaterThanOrEqual(0);
    expect(mainIndex).toBeGreaterThan(navbarIndex);
    expect(markup).toContain("Route Content");
  });
});
