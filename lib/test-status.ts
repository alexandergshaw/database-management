import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Maps an assignment folder (e.g. "week1") to whether its test suite passed.
 * This is the source of truth for unlocking: a module unlocks only when the
 * unit tests on the file the student writes pass.
 */
export type ModuleTestStatus = Record<string, boolean>;

const RESULTS_PATH = path.join(process.cwd(), ".test-results.json");

interface JsonTestFile {
  name: string;
  status: string;
}

interface JsonReport {
  testResults?: JsonTestFile[];
}

export function getModuleTestStatus(): ModuleTestStatus {
  let report: JsonReport;
  try {
    report = JSON.parse(readFileSync(RESULTS_PATH, "utf8")) as JsonReport;
  } catch {
    // No results yet (tests never run) — everything stays locked.
    return {};
  }

  const status: ModuleTestStatus = {};
  for (const file of report.testResults ?? []) {
    const match = file.name.replace(/\\/g, "/").match(/\/assignments\/([^/]+)\/test\.ts$/);
    if (match) {
      status[match[1]] = file.status === "passed";
    }
  }
  return status;
}
