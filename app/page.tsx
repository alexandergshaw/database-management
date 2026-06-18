import type { CSSProperties } from "react";

import Link from "next/link";

import { courseModules } from "@/lib/course-modules";
import { resolveModuleProgress } from "@/lib/progress";
import { getModuleTestStatus } from "@/lib/test-status";

export const dynamic = "force-dynamic";

function makeStars(quantity: number) {
  return Array.from({ length: quantity }, () => {
    const size = Math.random() * 1.8 + 0.5;
    const opacity = Math.random() * 0.6 + 0.25;
    return {
      left: Math.random() * 100,
      top: Math.random() * 100,
      size,
      opacity,
      twinkle: Math.random() < 0.4,
      duration: (Math.random() * 4 + 2.5).toFixed(1),
      delay: (Math.random() * 6).toFixed(1),
    };
  });
}

export default function Home() {
  const modules = resolveModuleProgress(courseModules, getModuleTestStatus());
  const count = modules.length;
  const unlocked = modules.filter((m) => m.isUnlocked).length;
  const stars = makeStars(180);

  return (
    <main className="solar-stage">
      <div className="solar-stars" aria-hidden="true">
        {stars.map((star, i) => (
          <span
            key={i}
            className={`solar-star${star.twinkle ? " tw" : ""}`}
            style={
              {
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                "--o": `${star.opacity}`,
                "--tw": `${star.duration}s`,
                "--td": `${star.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

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
            "--planet": "2.3em",
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
        Click a planet to open its week · the sun is your storefront
      </p>
    </main>
  );
}
