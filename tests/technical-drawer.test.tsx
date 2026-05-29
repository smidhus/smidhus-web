import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import TechnicalDrawer from "../src/app/components/TechnicalDrawer";
import {
  loadTechnicalSpec,
  TECHNICAL_SPECS,
} from "../src/app/components/TechnicalSpecsExperience";

describe("technical drawer", () => {
  it("renders dialog semantics and close control", () => {
    const markup = renderToStaticMarkup(
      <TechnicalDrawer
        open
        loading={false}
        titleId="drawer-title"
        content={TECHNICAL_SPECS.REPHORA}
        onClose={() => undefined}
      />,
    );

    expect(markup).toContain('role="dialog"');
    expect(markup).toContain('aria-modal="true"');
    expect(markup).toContain('aria-labelledby="drawer-title"');
    expect(markup).toContain("CLOSE");
  });

  it("renders a loading state while async content resolves", () => {
    const markup = renderToStaticMarkup(
      <TechnicalDrawer
        open
        loading
        titleId="drawer-title"
        content={null}
        onClose={() => undefined}
      />,
    );

    expect(markup).toContain("Loading technical payload...");
  });

  it("renders a safe fallback state when content is missing", () => {
    const markup = renderToStaticMarkup(
      <TechnicalDrawer
        open
        loading={false}
        titleId="drawer-title"
        content={null}
        onClose={() => undefined}
      />,
    );

    expect(markup).toContain("No technical specification is available for this module yet.");
  });

  it("resolves mapped product specs asynchronously", async () => {
    const rephora = await loadTechnicalSpec("REPHORA");
    const harness = await loadTechnicalSpec("SMIDHUS-HARNESS");
    const unknown = await loadTechnicalSpec("UNKNOWN");

    expect(rephora?.name).toBe("REPHORA");
    expect(harness?.name).toBe("SMIDHUS-HARNESS");
    expect(unknown).toBeNull();
  });
});
