import type { Db, Row } from "@/lib/db";

export interface CatalogSettings {
  name: string;
  tagline: string;
}

export interface Planet {
  id: string;
  name: string;
  type: string;
  radiusKm: number;
  distanceAu: number;
  meanTempC: number;
  moonCount: number;
  missions: string[];
}

export interface Mission {
  id: string;
  name: string;
  agency: string;
  targetCount: number;
}

export interface CatalogStats {
  planetCount: number;
  moonCount: number;
  missionCount: number;
  observationCount: number;
  avgRadiusKm: number;
}

export interface ObservationRow {
  id: string;
  astronomer: string;
  planet: string;
  magnitude: number;
  observedAt: string;
}

export interface TypeRow {
  type: string;
  planets: number;
  avgRadiusKm: number;
}

export interface CatalogData {
  source: "supabase" | "local";
  settings: CatalogSettings | null;
  planets: Planet[];
  missions: Mission[];
  normalization: { importRows: number; stars: number } | null;
  astronomerCount: number;
  observationCount: number;
  stats: CatalogStats | null;
  observationLog: ObservationRow[];
  typeBreakdown: TypeRow[];
  hasBooking: boolean;
  security: { rls: boolean; publicView: boolean };
}

const num = (v: unknown) => Number(v ?? 0);

async function sq(db: Db, sql: string): Promise<Row[]> {
  try {
    return await db.query(sql);
  } catch {
    return [];
  }
}

const one = async (db: Db, sql: string): Promise<Row | null> => (await sq(db, sql))[0] ?? null;

export async function getCatalogData(db: Db, source: CatalogData["source"]): Promise<CatalogData> {
  const settingsRow = await one(db, "select catalog_name, tagline from catalog_settings limit 1");

  const planetRows = await sq(
    db,
    "select id, name, type, radius_km, distance_au, mean_temp_c from planets order by distance_au"
  );
  const moonCounts = await sq(db, "select planet_id, count(*)::int as n from moons group by planet_id");
  const missionLinks = await sq(
    db,
    "select mt.planet_id, m.name from mission_targets mt join missions m on m.id = mt.mission_id"
  );
  const missionRows = await sq(
    db,
    `select m.id, m.name, m.agency, count(mt.planet_id)::int as targets
     from missions m left join mission_targets mt on mt.mission_id = m.id
     group by m.id, m.name, m.agency order by m.name`
  );
  const importRow = await one(db, "select count(*)::int as n from body_import");
  const starRow = await one(db, "select count(*)::int as n from nf_stars");
  const astronomerRow = await one(db, "select count(*)::int as n from astronomers");
  const observationRow = await one(db, "select count(*)::int as n from observations");
  const statsRow = await one(
    db,
    "select planet_count, moon_count, mission_count, observation_count, avg_radius_km from catalog_stats"
  );
  const logRows = await sq(
    db,
    "select id, astronomer, planet, magnitude, observed_at from observation_log limit 10"
  );
  const typeRows = await sq(db, "select type, planets, avg_radius_km from type_summary");
  const bookingRow = await one(
    db,
    "select to_regprocedure('book_nights(text,integer)') is not null as ok"
  );
  const rlsRow = await one(db, "select relrowsecurity as rls from pg_class where relname = 'proposal_secrets'");
  const publicViewRow = await one(db, "select to_regclass('public.public_catalog') is not null as ok");

  const moonByPlanet = new Map(moonCounts.map((r) => [String(r.planet_id), num(r.n)]));
  const missionsByPlanet = new Map<string, string[]>();
  for (const link of missionLinks) {
    const key = String(link.planet_id);
    const list = missionsByPlanet.get(key) ?? [];
    list.push(String(link.name));
    missionsByPlanet.set(key, list);
  }

  const planets: Planet[] = planetRows.map((r) => ({
    id: String(r.id),
    name: String(r.name),
    type: String(r.type),
    radiusKm: num(r.radius_km),
    distanceAu: num(r.distance_au),
    meanTempC: num(r.mean_temp_c),
    moonCount: moonByPlanet.get(String(r.id)) ?? 0,
    missions: missionsByPlanet.get(String(r.id)) ?? [],
  }));

  return {
    source,
    settings: settingsRow
      ? { name: String(settingsRow.catalog_name), tagline: String(settingsRow.tagline) }
      : null,
    planets,
    missions: missionRows.map((r) => ({
      id: String(r.id),
      name: String(r.name),
      agency: String(r.agency),
      targetCount: num(r.targets),
    })),
    normalization: starRow ? { importRows: num(importRow?.n), stars: num(starRow.n) } : null,
    astronomerCount: num(astronomerRow?.n),
    observationCount: num(observationRow?.n),
    stats: statsRow
      ? {
          planetCount: num(statsRow.planet_count),
          moonCount: num(statsRow.moon_count),
          missionCount: num(statsRow.mission_count),
          observationCount: num(statsRow.observation_count),
          avgRadiusKm: num(statsRow.avg_radius_km),
        }
      : null,
    observationLog: logRows.map((r) => ({
      id: String(r.id),
      astronomer: String(r.astronomer),
      planet: String(r.planet),
      magnitude: num(r.magnitude),
      observedAt: String(r.observed_at),
    })),
    typeBreakdown: typeRows.map((r) => ({
      type: String(r.type),
      planets: num(r.planets),
      avgRadiusKm: num(r.avg_radius_km),
    })),
    hasBooking: Boolean(bookingRow?.ok),
    security: {
      rls: Boolean(rlsRow?.rls),
      publicView: Boolean(publicViewRow?.ok),
    },
  };
}
