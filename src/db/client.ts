import pg from "pg";
import { config } from "../config.js";

// The database is optional: without DATABASE_URL the API serves its built-in content (src/data).
export const pool: pg.Pool | null = config.databaseUrl
  ? new pg.Pool({
      connectionString: config.databaseUrl,
      // Neon and most hosted Postgres require SSL; plain local databases do not.
      ssl: /localhost|127\.0\.0\.1/.test(config.databaseUrl) ? false : { rejectUnauthorized: false },
      max: 5,
    })
  : null;
