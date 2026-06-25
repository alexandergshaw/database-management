import type { CSSProperties } from "react";

import Link from "next/link";

import { TopBar } from "@/components/top-bar";
import { getDb } from "@/lib/db";
import { resolveModuleProgress } from "@/lib/progress";

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

// Deterministic PRNG so each planet keeps a stable, distinct surface.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Build a layered radial-gradient "surface" — continents, craters, polar caps —
// over the base sphere shading, giving each planet its own topography.
function planetSurface(hue: number, seed: number): string {
  const rng = mulberry32(seed + 1);
  const layers: string[] = [
    `radial-gradient(circle at 30% 24%, hsl(${hue} 100% 92% / 0.85), transparent 40%)`,
    `radial-gradient(circle at 72% 80%, hsl(${hue} 80% 10% / 0.6), transparent 55%)`,
  ];

  const featureCount = 4 + Math.floor(rng() * 4);
  for (let i = 0; i < featureCount; i++) {
    const x = Math.round(rng() * 100);
    const y = Math.round(rng() * 100);
    const inner = Math.round(8 + rng() * 24);
    const outer = inner + 5 + Math.round(rng() * 9);
    const dark = rng() < 0.45;
    const h = (hue + Math.round((rng() - 0.5) * 34) + 360) % 360;
    const light = dark ? 20 + Math.round(rng() * 12) : 62 + Math.round(rng() * 18);
    const alpha = (0.35 + rng() * 0.35).toFixed(2);
    const color = `hsl(${h} ${dark ? 55 : 62}% ${light}% / ${alpha})`;
    layers.push(
      `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, ${color} ${inner}%, transparent ${outer}%)`
    );
  }

  if (rng() < 0.5) {
    layers.push(
      `radial-gradient(ellipse 58% 26% at 50% 7%, hsl(${hue} 60% 90% / 0.5), transparent 70%)`
    );
  }

  layers.push(
    `radial-gradient(circle at 50% 45%, hsl(${hue} 72% 56%), hsl(${hue} 76% 40%) 62%, hsl(${hue} 82% 26%) 100%)`
  );
  return layers.join(", ");
}

export default async function Home() {
  const db = await getDb();
  let modules;
  try {
    modules = await resolveModuleProgress(db);
  } finally {
    await db.dispose?.();
  }
  const count = modules.length;
  const unlocked = modules.filter((m) => m.isUnlocked).length;
  const stars = makeStars(180);

  const hueOf = (index: number) => Math.round(index * (360 / count));

  const topBarItems = modules.map((module, index) => ({
    week: module.week,
    slug: module.slug,
    title: module.title,
    type: module.type,
    hue: hueOf(index),
    unlocked: module.isUnlocked,
  }));

  // Ringed planets (reviews/tests) each get a slightly different ring.
  const ringStyles = ["solid", "dashed", "dotted", "solid", "dashed"];
  const ringWidths = ["0.34em", "0.26em", "0.4em", "0.22em", "0.46em"];
  const ringSpreads = ["0.5em", "0.56em", "0.43em", "0.6em", "0.47em"];
  const ringTilts = ["-20deg", "-14deg", "-26deg", "-18deg", "-24deg"];
  const ringFlats = ["0.34", "0.3", "0.38", "0.32", "0.36"];
  const ringVariant: Record<string, number> = {};
  let ringSeq = 0;
  for (const m of modules) {
    if (m.type !== "assignment") {
      ringVariant[m.slug] = ringSeq % ringStyles.length;
      ringSeq += 1;
    }
  }

  return (
    <main className="solar-stage">
      <TopBar items={topBarItems} />

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

      <div className="relative z-10 mb-10 w-full max-w-2xl px-4 text-center">
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
          Planet Catalog · Course Map
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {count} planets, one per week — {unlocked} unlocked. Each planet lights
          up when its SQL is in place.
        </p>
      </div>

      <div className="solar-system">
        <Link href="/dashboard" className="solar-sun" aria-label="Open the catalog dashboard">
          <span>
            Catalog
            <br />
            Dashboard
          </span>
        </Link>

        {modules.map((module, index) => {
          const diameter = 12 + index * 2.8;
          const duration = 14 + index * 5.5;
          const delay = -(duration * (index / count));
          const startAngle = index * (360 / count);
          const hue = hueOf(index);

          const orbitStyle = {
            "--d": `${diameter}em`,
            "--dur": `${duration}s`,
            "--delay": `${delay.toFixed(2)}s`,
            "--start": `${startAngle.toFixed(2)}deg`,
            "--hue": `${hue}`,
            "--planet": "2.3em",
          } as CSSProperties;

          const ringed = module.type !== "assignment";
          const variant = ringVariant[module.slug] ?? 0;

          const planetClasses = [
            "solar-planet",
            module.isUnlocked ? "is-unlocked" : "is-locked",
            ringed ? "has-ring" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const bodyStyle = {
            backgroundImage: planetSurface(hue, index),
            ...(ringed
              ? {
                  "--ring-w": ringWidths[variant],
                  "--ring-style": ringStyles[variant],
                  "--ring-spread": ringSpreads[variant],
                  "--ring-tilt": ringTilts[variant],
                  "--ring-flat": ringFlats[variant],
                }
              : {}),
          } as CSSProperties;

          return (
            <div key={module.slug} className="solar-orbit" style={orbitStyle}>
              <div className="solar-anchor">
                <Link
                  id={`planet-${module.slug}`}
                  href={`/week/${module.slug}`}
                  className={planetClasses}
                  aria-label={`Week ${module.week}: ${module.title} (${module.statusLabel})`}
                >
                  <span className="solar-planet-body" style={bodyStyle}>
                    {module.week}
                  </span>
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
        Use the top bar or click a planet to open its week · the sun is your
        catalog dashboard
      </p>
    </main>
  );
}
