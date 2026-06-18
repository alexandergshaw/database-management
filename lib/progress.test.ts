import { describe, expect, it } from "vitest";

import { courseModules } from "./course-modules";
import { resolveModuleProgress } from "./progress";

describe("resolveModuleProgress", () => {
  it("locks every module when no tests have passed", () => {
    const result = resolveModuleProgress(courseModules, {});
    expect(result.every((module) => !module.isUnlocked)).toBe(true);
    expect(result.every((module) => module.statusLabel === "Locked")).toBe(true);
  });

  it("unlocks a module whose test passed", () => {
    const result = resolveModuleProgress(courseModules, { week0: true });
    const week0 = result.find((module) => module.folder === "week0");
    expect(week0?.isUnlocked).toBe(true);
    expect(week0?.statusLabel).toBe("Unlocked");
  });

  it("keeps a module locked when its test failed", () => {
    const result = resolveModuleProgress(courseModules, { week1: false });
    expect(result.find((module) => module.folder === "week1")?.isUnlocked).toBe(false);
  });

  it("keys unlocking on the module's own folder", () => {
    const result = resolveModuleProgress(courseModules, { week0: true });
    expect(result.find((module) => module.folder === "week1")?.isUnlocked).toBe(false);
  });
});
