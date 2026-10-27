import "dotenv/config";

const originsFromEnv = (process.env.CORS_ORIGINS ?? "http://localhost:5173,http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

export const config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV ?? "development",
  databaseUrl: process.env.DATABASE_URL?.trim() || undefined,
  corsOrigins: originsFromEnv,
  isProduction: process.env.NODE_ENV === "production",
};
