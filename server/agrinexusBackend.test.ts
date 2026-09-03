import { afterEach, describe, expect, it } from "vitest";
import { gemini, safeSatellite } from "./agrinexusBackend";

describe("AgriNexus backend provider fallbacks", () => {
  const originalKey = process.env.GOOGLE_GEMINI_API_KEY;
  afterEach(() => {
    if (originalKey === undefined) delete process.env.GOOGLE_GEMINI_API_KEY;
    else process.env.GOOGLE_GEMINI_API_KEY = originalKey;
  });

  it("returns a safe, actionable response when Gemini is not configured", async () => {
    delete process.env.GOOGLE_GEMINI_API_KEY;
    const result = await gemini("Give cautious wheat guidance");
    expect(result.available).toBe(false);
    expect(result.provider).toBe("Google Gemini");
    expect(result.text).toContain("temporarily unavailable");
  });

  it("keeps the satellite response typed and explicit about unavailable providers", () => {
    const result = safeSatellite("farm_demo", "7d");
    expect(result.farmId).toBe("farm_demo");
    expect(result.period).toBe("7d");
    expect(result.available).toBe(false);
    expect(result.zones).toHaveLength(3);
    expect(result.zones[2]?.status).toBe("stressed");
  });
});
