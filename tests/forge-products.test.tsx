import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import TechnicalSpecsExperience from "../src/app/components/TechnicalSpecsExperience";

describe("forge product cards", () => {
  it("links Rephora to the technical log and product site", () => {
    const markup = renderToStaticMarkup(<TechnicalSpecsExperience />);

    expect(markup).toContain("REPHORA");
    expect(markup).toContain('href="/forge-logs/rephora-portal"');
    expect(markup).toContain("TECHNICAL LOG");
    expect(markup).toContain('href="https://rephora.app"');
    expect(markup).toContain("PRODUCT SITE");
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noreferrer"');
    expect(markup.indexOf("PRODUCT SITE")).toBeLessThan(
      markup.indexOf("TECHNICAL LOG")
    );
  });

  it("marks Smidhus SDD Harness as building instead of opening removed specs", () => {
    const markup = renderToStaticMarkup(<TechnicalSpecsExperience />);

    expect(markup).toContain("SMIDHUS-SDD-HARNESS");
    expect(markup).toContain("BUILDING");
    expect(markup).toContain('aria-disabled="true"');
    expect(markup).not.toContain("VIEW TECHNICAL SPECS");
  });
});
