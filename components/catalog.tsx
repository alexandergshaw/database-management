import type { Planet } from "@/lib/store-data";

interface CatalogProps {
  planets: Planet[];
}

const km = new Intl.NumberFormat("en-US");

export function Catalog({ planets }: CatalogProps) {
  if (planets.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
        <h2 className="text-lg font-semibold text-slate-200">No planets yet</h2>
        <p className="mt-2 text-sm text-slate-400">
          Complete <span className="font-mono">Week 1</span> — create the{" "}
          <span className="font-mono">planets</span> table and seed it — to fill
          the catalog.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-white">Planet catalog</h2>
        <span className="text-sm text-slate-400">{planets.length} planets</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {planets.map((planet) => (
          <article
            key={planet.id}
            className="flex flex-col rounded-xl border border-slate-700 bg-slate-900/70 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-white">{planet.name}</h3>
              <span className="whitespace-nowrap rounded-full bg-sky-500/15 px-2 py-0.5 text-xs font-medium text-sky-300">
                {planet.type}
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-y-1 text-sm text-slate-300">
              <dt className="text-slate-400">Radius</dt>
              <dd className="text-right">{km.format(planet.radiusKm)} km</dd>
              <dt className="text-slate-400">Distance</dt>
              <dd className="text-right">{planet.distanceAu} AU</dd>
              <dt className="text-slate-400">Mean temp</dt>
              <dd className="text-right">{planet.meanTempC}°C</dd>
            </dl>

            {planet.missions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {planet.missions.map((mission) => (
                  <span
                    key={mission}
                    className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-300"
                  >
                    {mission}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-4 inline-flex w-fit rounded px-2 py-0.5 text-xs font-medium text-slate-300">
              {planet.moonCount === 1 ? "1 moon" : `${planet.moonCount} moons`}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
