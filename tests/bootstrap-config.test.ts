import { describe, expect, it } from "vitest";

import nextConfig from "../next.config";
import tailwindConfig from "../tailwind.config";

describe("bootstrap configuration", () => {
  it("exposes Smidhus color tokens in Tailwind", () => {
    const colors = tailwindConfig.theme?.extend?.colors as
      | Record<string, string>
      | undefined;

    expect(colors?.smidhusBackground).toBe("#0A0D10");
    expect(colors?.smidhusForgeOrange).toBe("#FF6B00");
    expect(colors?.smidhusTerminalGreen).toBe("#00FF66");
    expect(colors?.smidhusBorder).toBe("#1F242C");
  });

  it("configures strict security headers", async () => {
    const headers = await nextConfig.headers?.();
    const allHeaders = headers?.flatMap((entry) => entry.headers) ?? [];

    expect(allHeaders).toEqual(
      expect.arrayContaining([
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ]),
    );
  });
});
