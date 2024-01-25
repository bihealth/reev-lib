import { describe, expect, it } from "vitest";

describe.concurrent("dummy", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
});
