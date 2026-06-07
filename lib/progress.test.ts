import { describe, expect, it } from "vitest";

import { isValidAssignmentResult } from "./progress";

describe("isValidAssignmentResult", () => {
  it("locks null and undefined values", () => {
    expect(isValidAssignmentResult(null)).toBe(false);
    expect(isValidAssignmentResult(undefined)).toBe(false);
  });

  it("requires isComplete=true when completion flag exists", () => {
    expect(isValidAssignmentResult({ isComplete: false })).toBe(false);
    expect(isValidAssignmentResult({ isComplete: true })).toBe(true);
  });

  it("accepts non-empty schema-like exports", () => {
    expect(isValidAssignmentResult({ table: "employees" })).toBe(true);
    expect(isValidAssignmentResult("SELECT * FROM employees")).toBe(true);
  });
});
