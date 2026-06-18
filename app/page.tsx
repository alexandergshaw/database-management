import type { CSSProperties } from "react";

import Link from "next/link";

import { courseModules } from "@/lib/course-modules";
import { resolveModuleProgress } from "@/lib/progress";
import { getModuleTestStatus } from "@/lib/test-status";

export const dynamic = "force-dynamic";

export default function Home() {
  const modules = resolveModuleProgress(courseModules, getModuleTestStatus());
  const count = modules.length;
  const unlocked = modules.filter((m) => m.isUnlocked).length;

  return (
    <main className="solar-stage">
      <div className="pointer-events-none absolute left-1/2 top-6 z-10 w-full max-w-2xl -translate-x-1/2 px-4 text-center">
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
          Storefront DB · Course Map
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {count} planets, one per week — {unlocked} unlocked. Each planet lights
          up when its unit tests pass.
        </p>
      </div>

      <div className="solar-system">
        <Link href="/dashboard" className="solar-sun" aria-label="Open the storefront dashboard">
          <span>
            Storefront
            <br />
            Dashboard
          </span>
        </Link>

        {modules.map((module, index) => {
          const diameter = 9 + index * 3.25;
          const duration = 14 + index * 5.5;
          const delay = -(duration * (index / count));
          const startAngle = index * (360 / count);
          const hue = Math.round(index * (360 / count));

          const orbitStyle = {
            "--d": `${diameter}em`,
            "--dur": `${duration}s`,
            "--delay": `${delay.toFixed(2)}s`,
            "--start": `${startAngle.toFixed(2)}deg`,
            "--hue": `${hue}`,
            "--planet": "2.1em",
          } as CSSProperties;

          const planetClasses = [
            "solar-planet",
            module.isUnlocked ? "is-unlocked" : "is-locked",
            module.type === "assignment" ? "" : "has-ring",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={module.slug} className="solar-orbit" style={orbitStyle}>
              <div className="solar-anchor">
                <Link
                  href={`/week/${module.slug}`}
                  className={planetClasses}
                  aria-label={`Week ${module.week}: ${module.title} (${module.statusLabel})`}
                >
                  <span className="solar-planet-body">{module.week}</span>
                  <span className="solar-tooltip">
                    <strong>Week {module.week}</strong> · {module.title}
                    <br />
                    <span className="text-slate-400">
                      {module.type} · {module.statusLabel}
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <p className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 px-4 text-center text-xs text-slate-500">
        Hover to pause the orbits · click a planet to open its week · the sun is
        your storefront
      </p>
    </main>
  );
}
