-- Review 1 — consolidates weeks 1-2 (relational, keys, modeling, ERDs).

-- One-to-many (week 2): moon count per planet.
create or replace view review1_planet_moons as
select p.name as planet, count(m.id)::int as moons
from planets p
left join moons m on m.planet_id = p.id
group by p.name
order by moons desc, planet;

-- Many-to-many (week 2): how many missions visited each planet.
create or replace view review1_planet_missions as
select p.name as planet, count(mt.mission_id)::int as missions
from planets p
left join mission_targets mt on mt.planet_id = p.id
group by p.name
order by missions desc, planet;

-- Keys / referential integrity (week 1): astronomers and their site counts.
create or replace view review1_astronomer_directory as
select a.full_name, a.email, count(si.id)::int as sites
from astronomers a
left join astronomer_sites si on si.astronomer_id = a.id
group by a.full_name, a.email
order by a.full_name;
