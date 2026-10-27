import type { ErrorRequestHandler, RequestHandler } from "express";
import { config } from "../config.js";

export const notFound: RequestHandler = (req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Malformed JSON bodies and other client errors raised by Express
  const status =
    typeof err?.status === "number" && err.status >= 400 && err.status < 600 ? err.status : 500;

  if (status >= 500) console.error(err);

  res.status(status).json({
    error: status >= 500 && config.isProduction ? "Internal server error" : (err?.message ?? "Error"),
  });
};
