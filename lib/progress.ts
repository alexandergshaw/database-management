import type { CourseModule } from "@/lib/course-modules";

export interface ModuleProgress extends CourseModule {
  isUnlocked: boolean;
  statusLabel: string;
}

interface AssignmentModule {
  result?: unknown;
  default?: unknown;
}

const readModuleResult = async (folder: string): Promise<unknown> => {
  try {
    const assignmentModule = (await import(
      `@/assignments/${folder}/solution`
    )) as AssignmentModule;

    return assignmentModule.result ?? assignmentModule.default ?? null;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Unable to load assignment module: ${folder}`, error);
    }
    return null;
  }
};

export const isValidAssignmentResult = (value: unknown): boolean => {
  if (value == null) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "object") {
    if ("isComplete" in value) {
      const completion = (value as { isComplete?: unknown }).isComplete;
      return completion === true;
    }

    return Object.keys(value).length > 0;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return true;
};

export const resolveModuleProgress = async (
  modules: CourseModule[]
): Promise<ModuleProgress[]> => {
  const progressEntries = await Promise.all(
    modules.map(async (module) => {
      const moduleResult = await readModuleResult(module.folder);
      const isUnlocked = isValidAssignmentResult(moduleResult);

      return {
        ...module,
        isUnlocked,
        statusLabel: isUnlocked ? "Unlocked" : "Locked",
      } satisfies ModuleProgress;
    })
  );

  return progressEntries;
};
