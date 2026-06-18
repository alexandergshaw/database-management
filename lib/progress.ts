import type { CourseModule } from "@/lib/course-modules";
import type { ModuleTestStatus } from "@/lib/test-status";

export interface ModuleProgress extends CourseModule {
  isUnlocked: boolean;
  statusLabel: string;
}

/**
 * A module unlocks when the unit tests on the file the student edits pass.
 * Status comes straight from the Vitest results — there is no DB probe or
 * self-reported flag to game.
 */
export const resolveModuleProgress = (
  modules: CourseModule[],
  testStatus: ModuleTestStatus
): ModuleProgress[] =>
  modules.map((module) => {
    const isUnlocked = testStatus[module.folder] === true;

    return {
      ...module,
      isUnlocked,
      statusLabel: isUnlocked ? "Unlocked" : "Locked",
    } satisfies ModuleProgress;
  });
