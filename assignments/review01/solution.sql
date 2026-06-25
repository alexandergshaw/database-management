-- Review 1 — consolidates weeks 1-5 as a set of views.

-- Relationships (week 2): moon count per planet.
create or replace view review1_planet_moons as
select p.name as planet, count(m.id)::int as moons
from planets p
left join moons m on m.planet_id = p.id
group by p.name
order by moons desc, planet;

-- Many-to-many (week 3): how many missions visited each planet.
create or replace view review1_planet_missions as
select p.name as planet, count(mt.mission_id)::int as missions
from planets p
left join mission_targets mt on mt.planet_id = p.id
group by p.name
order by missions desc, planet;

-- Normalization (week 4): the 3NF tables joined back together.
create or replace view review1_body_normalized as
select b.body, s.name as star, s.star_class
from nf_bodies b
join nf_stars s on s.id = b.star_id
order by b.body;

-- Keys / referential integrity (week 5): astronomers and their site counts.
create or replace view review1_astronomer_directory as
select a.full_name, a.email, count(si.id)::int as sites
from astronomers a
left join astronomer_sites si on si.astronomer_id = a.id
group by a.full_name, a.email
order by a.full_name;
