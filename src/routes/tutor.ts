import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { tutorReply } from "../services/tutor.js";

export const tutorRouter = Router();

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages, please slow down." },
});

const chatSchema = z.object({
  message: z.string().trim().min(1, "Message is required").max(1000, "Message is too long"),
  language: z.string().trim().min(1).max(50).default("Ewondo"),
});

// POST /api/tutor/chat   { message, language }
tutorRouter.post("/chat", chatLimiter, (req, res) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten().fieldErrors });
    return;
  }

  const { message, language } = parsed.data;
  res.json({ data: { reply: tutorReply(message, language) } });
});
