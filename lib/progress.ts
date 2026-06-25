import type { Db } from "@/lib/db";
import { weeks, type ModuleType } from "@/lib/weeks";

export interface ModuleProgress {
  week: number;
  slug: string;
  folder: string;
  title: string;
  summary: string;
  type: ModuleType;
  isUnlocked: boolean;
  statusLabel: string;
}

/**
 * Runs every week's probe against the live database. A module unlocks only when
 * the objects its assignment creates actually exist — there is no file, flag, or
 * test artifact to game, just the real schema the student built.
 */
export async function resolveModuleProgress(db: Db): Promise<ModuleProgress[]> {
  return Promise.all(
    weeks.map(async ({ probe, ...meta }) => {
      const isUnlocked = await probe(db).catch(() => false);
      return {
        ...meta,
        isUnlocked,
        statusLabel: isUnlocked ? "Unlocked" : "Locked",
      } satisfies ModuleProgress;
    })
  );
}
