import express from "express";
import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { sdk } from "./_core/sdk";
import { registerAgriNexusRoutes } from "./agrinexusBackend";

function createApp() {
  const app = express();
  app.use(express.json());
  registerAgriNexusRoutes(app);
  return app;
}

describe("AgriNexus HTTP contracts", () => {
  afterEach(() => vi.restoreAllMocks());

  it("serves the frontend demo response without authentication", async () => {
    const response = await request(createApp()).get("/api/v1/demo/farmer");
    expect(response.status).toBe(200);
    expect(response.body.response.title).toBe("Crop Intelligence Report");
    expect(response.body.response.items).toHaveLength(5);
  });

  it("rejects protected profile access without a valid session", async () => {
    const response = await request(createApp()).get("/api/v1/profiles/me");
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Authentication required");
  });

  it("rejects a farm-scoped request when the authenticated user does not own the farm", async () => {
    vi.spyOn(sdk, "authenticateRequest").mockResolvedValue({ id: 999999, openId: "test-user", name: "Test User", email: null, loginMethod: "test", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() });
    const response = await request(createApp()).get("/api/v1/farms/not-owned").set("Authorization", "Bearer test");
    expect([404, 403]).toContain(response.status);
  });

  it("rejects malformed crop-assessment input with a validation error", async () => {
    vi.spyOn(sdk, "authenticateRequest").mockResolvedValue({ id: 999999, openId: "test-user", name: "Test User", email: null, loginMethod: "test", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() });
    const response = await request(createApp()).post("/api/v1/crop/assess").set("Authorization", "Bearer test").send({ crop: "wheat" });
    expect(response.status).toBe(400);
  });

  it("rejects unknown demo modes instead of returning arbitrary data", async () => {
    const response = await request(createApp()).get("/api/v1/demo/unknown");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Unknown demo mode");
  });
});
