import { Router } from "express";
import { getLanguage, listLanguages, listRegions } from "../services/content.js";

export const languagesRouter = Router();

// GET /api/languages?region=West&q=ewo
languagesRouter.get("/", async (req, res) => {
  const region = typeof req.query.region === "string" ? req.query.region : "All";
  const q = typeof req.query.q === "string" ? req.query.q : "";

  const data = await listLanguages(region, q);
  res.json({ count: data.length, data });
});

// GET /api/languages/regions
languagesRouter.get("/regions", async (_req, res) => {
  res.json({ data: await listRegions() });
});

// GET /api/languages/:slug
languagesRouter.get("/:slug", async (req, res) => {
  const language = await getLanguage(req.params.slug);
  if (!language) {
    res.status(404).json({ error: "Language not found" });
    return;
  }
  res.json({ data: language });
});
