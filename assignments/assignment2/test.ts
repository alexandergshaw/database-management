import { describe, expect, it } from "vitest";

import { result } from "./solution";

describe("assignment2 starter", () => {
  it("exports a structured result object", () => {
    expect(result).toHaveProperty("isComplete");
    expect(typeof result.isComplete).toBe("boolean");
    expect(result).toHaveProperty("topic");
    expect(typeof result.topic).toBe("string");
    expect(result).toHaveProperty("artifact");
    expect(typeof result.artifact).toBe("object");
  });
});
