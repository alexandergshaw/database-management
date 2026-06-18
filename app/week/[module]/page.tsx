import { notFound } from "next/navigation";

import { ModulePanel } from "@/components/module-panel";
import { ProgressTracker } from "@/components/progress-tracker";
import { courseModules } from "@/lib/course-modules";
import { resolveModuleProgress } from "@/lib/progress";
import { getModuleTestStatus } from "@/lib/test-status";

export const dynamic = "force-dynamic";

export default async function WeekModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleSlug } = await params;
  const modules = resolveModuleProgress(courseModules, getModuleTestStatus());
  const selectedModule = modules.find((entry) => entry.slug === moduleSlug);

  if (!selectedModule) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-start">
      <ProgressTracker modules={modules} />
      <section className="flex-1 space-y-4">
        <ModulePanel module={selectedModule} />
      </section>
    </main>
  );
}
