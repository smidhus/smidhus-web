import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ForgeParticles, {
  createSparkBurst,
  mixSparkColor,
} from "../src/app/components/ForgeParticles";

describe("forge particles", () => {
  it("renders a fixed non-interactive canvas overlay", () => {
    const markup = renderToStaticMarkup(createElement(ForgeParticles));

    expect(markup).toContain("<canvas");
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain("pointer-events-none");
    expect(markup).toContain("fixed");
    expect(markup).toContain("inset-0");
    expect(markup).toContain("z-10");
  });

  it("creates spark bursts with radial speed and friction defaults", () => {
    const burst = createSparkBurst(120, 260, 32);

    expect(burst).toHaveLength(32);
    expect(burst.every((spark) => spark.x === 120 && spark.y === 260)).toBe(true);
    expect(burst.every((spark) => spark.friction === 0.95)).toBe(true);
    expect(burst.some((spark) => Math.abs(spark.vx) > 0.1)).toBe(true);
    expect(burst.some((spark) => Math.abs(spark.vy) > 0.1)).toBe(true);
  });

  it("interpolates spark colors from yellow to forge orange", () => {
    expect(mixSparkColor(0)).toBe("rgb(255 216 0)");
    expect(mixSparkColor(1)).toBe("rgb(255 107 0)");
    expect(mixSparkColor(0.5)).not.toBe("rgb(255 216 0)");
    expect(mixSparkColor(0.5)).not.toBe("rgb(255 107 0)");
  });
});
