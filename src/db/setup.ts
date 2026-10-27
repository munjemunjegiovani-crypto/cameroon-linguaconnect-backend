// Creates the tables and fills them with the starting content. Safe to run repeatedly.
//   npm run db:setup   (development)   |   npm run db:setup:prod   (after npm run build)
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./client.js";
import { cultureItems, proverbs } from "../data/culture.js";
import { dashboard } from "../data/dashboard.js";
import { languages } from "../data/languages.js";

async function main() {
  if (!pool) {
    console.error("DATABASE_URL is not set. Add it to your .env file first.");
    process.exit(1);
  }

  const here = dirname(fileURLToPath(import.meta.url));
  const schemaPath = [join(here, "schema.sql"), join(here, "../../src/db/schema.sql")].find((p) => {
    try {
      readFileSync(p);
      return true;
    } catch {
      return false;
    }
  });
  if (!schemaPath) throw new Error("schema.sql not found");

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(readFileSync(schemaPath, "utf8"));

    for (const [i, l] of languages.entries()) {
      await client.query(
        `INSERT INTO languages (slug, name, region, speakers, difficulty, greeting, meaning, description, position)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (slug) DO UPDATE SET name=$2, region=$3, speakers=$4, difficulty=$5,
           greeting=$6, meaning=$7, description=$8, position=$9`,
        [l.slug, l.name, l.region, l.speakers, l.difficulty, l.greeting, l.meaning, l.description, i],
      );
    }

    for (const [i, c] of cultureItems.entries()) {
      await client.query(
        `INSERT INTO culture_items (image, tag, title, description, position)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (title) DO UPDATE SET image=$1, tag=$2, description=$4, position=$5`,
        [c.image, c.tag, c.title, c.description, i],
      );
    }

    for (const [i, p] of proverbs.entries()) {
      await client.query(
        `INSERT INTO proverbs (lang, text, meaning, position)
         VALUES ($1,$2,$3,$4)
         ON CONFLICT (text) DO UPDATE SET lang=$1, meaning=$3, position=$4`,
        [p.lang, p.text, p.meaning, i],
      );
    }

    const learner = await client.query<{ id: number }>(
      `INSERT INTO learners (name, daily_goal_xp) VALUES ($1,$2)
       ON CONFLICT (name) DO UPDATE SET daily_goal_xp=$2 RETURNING id`,
      [dashboard.user.name, dashboard.user.dailyGoalXp],
    );
    const learnerId = learner.rows[0].id;

    for (const [i, s] of dashboard.stats.entries()) {
      await client.query(
        `INSERT INTO learner_stats (learner_id, key, label, value, position)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (learner_id, key) DO UPDATE SET label=$3, value=$4, position=$5`,
        [learnerId, s.key, s.label, s.value, i],
      );
    }

    for (const [i, l] of dashboard.lessons.entries()) {
      await client.query(
        `INSERT INTO learner_lessons (learner_id, lang, title, progress, position)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (learner_id, title) DO UPDATE SET lang=$2, progress=$4, position=$5`,
        [learnerId, l.lang, l.title, l.progress, i],
      );
    }

    for (const [i, b] of dashboard.badges.entries()) {
      await client.query(
        `INSERT INTO learner_badges (learner_id, name, description, position)
         VALUES ($1,$2,$3,$4)
         ON CONFLICT (learner_id, name) DO UPDATE SET description=$3, position=$4`,
        [learnerId, b.name, b.desc, i],
      );
    }

    await client.query("COMMIT");
    console.log(
      `Database ready: ${languages.length} languages, ${cultureItems.length} culture items, ` +
        `${proverbs.length} proverbs, demo learner "${dashboard.user.name}".`,
    );
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Database setup failed:", err);
  process.exit(1);
});
