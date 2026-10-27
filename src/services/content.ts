import { pool } from "../db/client.js";
import { cultureItems, proverbs, type CultureItem, type Proverb } from "../data/culture.js";
import { dashboard as staticDashboard } from "../data/dashboard.js";
import { languages as staticLanguages, type Language } from "../data/languages.js";

type Dashboard = typeof staticDashboard;

const languageColumns = "slug, name, region, speakers, difficulty, greeting, meaning, description";

export const databaseEnabled = pool !== null;

export async function listLanguages(region = "All", q = ""): Promise<Language[]> {
  const needle = q.trim().toLowerCase();

  if (!pool) {
    return staticLanguages.filter(
      (l) =>
        (region === "All" || l.region === region) &&
        (!needle || l.name.toLowerCase().includes(needle) || l.greeting.toLowerCase().includes(needle)),
    );
  }

  const { rows } = await pool.query<Language>(
    `SELECT ${languageColumns} FROM languages
     WHERE ($1 = 'All' OR region = $1)
       AND ($2 = '' OR LOWER(name) LIKE '%' || $2 || '%' OR LOWER(greeting) LIKE '%' || $2 || '%')
     ORDER BY position`,
    [region, needle],
  );
  return rows;
}

export async function listRegions(): Promise<string[]> {
  if (!pool) return ["All", ...new Set(staticLanguages.map((l) => l.region))];

  const { rows } = await pool.query<{ region: string }>(
    "SELECT region FROM languages GROUP BY region ORDER BY MIN(position)",
  );
  return ["All", ...rows.map((r) => r.region)];
}

export async function getLanguage(slug: string): Promise<Language | undefined> {
  if (!pool) return staticLanguages.find((l) => l.slug === slug);

  const { rows } = await pool.query<Language>(`SELECT ${languageColumns} FROM languages WHERE slug = $1`, [slug]);
  return rows[0];
}

export async function getCulture(): Promise<{ items: CultureItem[]; proverbs: Proverb[] }> {
  if (!pool) return { items: cultureItems, proverbs };

  const [items, sayings] = await Promise.all([
    pool.query<CultureItem>(
      "SELECT image, tag, title, description FROM culture_items ORDER BY position",
    ),
    pool.query<Proverb>("SELECT lang, text, meaning FROM proverbs ORDER BY position"),
  ]);
  return { items: items.rows, proverbs: sayings.rows };
}

export async function getDashboard(): Promise<Dashboard> {
  if (!pool) return staticDashboard;

  // Demo learner until authentication is added: the first learner in the table.
  const learner = await pool.query<{ id: number; name: string; daily_goal_xp: number }>(
    "SELECT id, name, daily_goal_xp FROM learners ORDER BY id LIMIT 1",
  );
  if (learner.rows.length === 0) return staticDashboard;
  const { id, name, daily_goal_xp } = learner.rows[0];

  const [stats, lessons, badges] = await Promise.all([
    pool.query("SELECT key, label, value FROM learner_stats WHERE learner_id = $1 ORDER BY position", [id]),
    pool.query("SELECT lang, title, progress FROM learner_lessons WHERE learner_id = $1 ORDER BY position", [id]),
    pool.query(
      'SELECT name, description AS "desc" FROM learner_badges WHERE learner_id = $1 ORDER BY position',
      [id],
    ),
  ]);

  return {
    user: { name, dailyGoalXp: daily_goal_xp },
    stats: stats.rows,
    lessons: lessons.rows,
    badges: badges.rows,
  } as Dashboard;
}
