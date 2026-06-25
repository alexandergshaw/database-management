import { readFileSync } from "node:fs";
import path from "node:path";

import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDb } from "@/lib/db";
import { resolveModuleProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

export default async function WeekModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleSlug } = await params;

  const db = await getDb();
  let modules;
  try {
    modules = await resolveModuleProgress(db);
  } finally {
    await db.dispose?.();
  }

  const selectedModule = modules.find((entry) => entry.slug === moduleSlug);
  if (!selectedModule) {
    notFound();
  }

  let html: string;
  try {
    const markdown = readFileSync(
      path.join(process.cwd(), "assignments", selectedModule.folder, "INSTRUCTIONS.md"),
      "utf8"
    );
    html = await marked.parse(markdown, { gfm: true });
  } catch {
    html = "<p>Instructions for this week haven't been added yet.</p>";
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link href="/" className="text-sm font-medium text-sky-300 transition hover:text-sky-200">
        ← Course map
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Week {selectedModule.week} · {selectedModule.type}
        </span>
        <span
          className={`rounded px-2 py-0.5 text-xs font-semibold ${
            selectedModule.isUnlocked
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-amber-500/20 text-amber-300"
          }`}
        >
          {selectedModule.statusLabel}
        </span>
      </div>

      <article className="md mt-6" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="mt-10 border-t border-slate-800 pt-4">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-sky-300 transition hover:text-sky-200"
        >
          View storefront dashboard →
        </Link>
      </div>
    </main>
  );
}
