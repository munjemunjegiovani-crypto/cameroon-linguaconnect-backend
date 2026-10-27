import { Router } from "express";
import { getDashboard } from "../services/content.js";

export const dashboardRouter = Router();

// GET /api/dashboard
dashboardRouter.get("/", async (_req, res) => {
  res.json({ data: await getDashboard() });
});
