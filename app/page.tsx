import { ModulePanel } from "@/components/module-panel";
import { ProgressTracker } from "@/components/progress-tracker";
import { courseModules } from "@/lib/course-modules";
import { resolveModuleProgress } from "@/lib/progress";

export default async function Home() {
  const modules = await resolveModuleProgress(courseModules);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-start">
      <ProgressTracker modules={modules} />
      <section className="grid flex-1 gap-4">
        <header className="rounded-xl border border-slate-700 bg-slate-900/80 p-6">
          <h1 className="text-3xl font-semibold text-white">
            Enterprise Database Management Portal
          </h1>
          <p className="mt-3 text-slate-300">
            Build each weekly assignment in /assignments, then watch your dashboard
            modules unlock automatically.
          </p>
        </header>
        {modules.map((module) => (
          <ModulePanel key={module.slug} module={module} />
        ))}
      </section>
    </main>
  );
}
