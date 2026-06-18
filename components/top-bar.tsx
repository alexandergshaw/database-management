"use client";

import Link from "next/link";

export interface TopBarItem {
  week: number;
  slug: string;
  title: string;
  type: string;
  hue: number;
  unlocked: boolean;
}

function highlight(slug: string, on: boolean) {
  const el = document.getElementById(`planet-${slug}`);
  if (el) {
    el.classList.toggle("is-highlighted", on);
  }
}

export function TopBar({ items }: { items: TopBarItem[] }) {
  return (
    <nav className="solar-topbar" aria-label="Course weeks">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/week/${item.slug}`}
          className="solar-topbar-item"
          title={`Week ${item.week}: ${item.title} (${item.unlocked ? "unlocked" : "locked"})`}
          onMouseEnter={() => highlight(item.slug, true)}
          onMouseLeave={() => highlight(item.slug, false)}
          onFocus={() => highlight(item.slug, true)}
          onBlur={() => highlight(item.slug, false)}
        >
          <span
            className="solar-topbar-dot"
            style={{ background: `hsl(${item.hue} 70% 55%)` }}
            aria-hidden="true"
          />
          <span className="solar-topbar-num">{item.week}</span>
        </Link>
      ))}
    </nav>
  );
}
