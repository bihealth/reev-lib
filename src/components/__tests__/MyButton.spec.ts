import { describe, expect, it } from "vitest";

describe.concurrent("MyButton.vue", () => {
  it("tautology", async () => {
    expect(true).toBe(true);
  });
});
