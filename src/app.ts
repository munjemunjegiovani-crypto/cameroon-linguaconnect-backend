import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config.js";
import { pool } from "./db/client.js";
import { errorHandler, notFound } from "./middleware/errors.js";
import { cultureRouter } from "./routes/culture.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { languagesRouter } from "./routes/languages.js";
import { tutorRouter } from "./routes/tutor.js";

export function createApp() {
  const app = express();

  // Needed so rate limiting sees the real client IP behind Railway's proxy
  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        // Allow tools without an Origin header (curl, health checks) and the configured frontends
        if (!origin || config.corsOrigins.includes(origin)) return callback(null, true);
        callback(Object.assign(new Error("Origin not allowed by CORS"), { status: 403 }));
      },
    }),
  );
  app.use(express.json({ limit: "10kb" }));

  app.get("/", (_req, res) => {
    res.json({ name: "Cameroon LinguaConnect API", status: "ok", docs: "/api/health" });
  });

  app.get("/api/health", async (_req, res) => {
    let database: "connected" | "not configured" | "unreachable" = "not configured";
    if (pool) {
      database = await pool.query("SELECT 1").then(
        () => "connected" as const,
        () => "unreachable" as const,
      );
    }
    res.json({ status: "ok", database, uptime: process.uptime(), timestamp: new Date().toISOString() });
  });

  app.use("/api/languages", languagesRouter);
  app.use("/api/culture", cultureRouter);
  app.use("/api/dashboard", dashboardRouter);
  app.use("/api/tutor", tutorRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
