import { Router } from "express";
import { getCulture } from "../services/content.js";

export const cultureRouter = Router();

// GET /api/culture
cultureRouter.get("/", async (_req, res) => {
  res.json({ data: await getCulture() });
});
