# Cameroon LinguaConnect — Backend

REST API for **Cameroon Culture Tongues**. It serves the languages, cultural content, learner
dashboard and AI tutor replies that the frontend displays.

## Tech stack

- Node.js 20+ and Express 5
- TypeScript
- PostgreSQL (Neon) via `pg`
- Zod (request validation), Helmet (security headers), CORS, express-rate-limit

## Getting started

```bash
npm install
cp .env.example .env
npm run dev          # http://localhost:4000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start with auto-reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server |
| `npm run typecheck` | Type-check without building |
| `npm run db:setup` | Create the tables and add the starting content (development) |
| `npm run db:setup:prod` | Same, using the compiled code (after `npm run build`) |

## Environment variables

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port the API listens on (Railway sets it) | `4000` |
| `CORS_ORIGINS` | Comma-separated frontend URLs allowed to call the API | `http://localhost:5173,http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection string (Neon). Empty = use built-in content | _(empty)_ |
| `NODE_ENV` | `development` or `production` | `development` |

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| GET | `/api/languages` | All languages. Optional `?region=West&q=ewo` filters |
| GET | `/api/languages/regions` | Region names for the filter buttons |
| GET | `/api/languages/:slug` | One language, e.g. `/api/languages/ewondo` |
| GET | `/api/culture` | Cultural highlights and proverbs |
| GET | `/api/dashboard` | Demo learner stats, lessons and badges |
| POST | `/api/tutor/chat` | AI tutor reply. Body: `{ "message": "...", "language": "Ewondo" }` |

Responses are JSON of the form `{ "data": ... }`. Errors are `{ "error": "..." }`.

Example:

```bash
curl -X POST http://localhost:4000/api/tutor/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"How do I say hello?","language":"Ewondo"}'
```

## Database (Neon PostgreSQL)

The API reads languages, culture content and the demo dashboard from PostgreSQL. If
`DATABASE_URL` is empty, it serves the same content from `src/data/`, so it always works.

1. Create a free project at [neon.tech](https://neon.tech) and copy the **connection string**
   (it looks like `postgresql://user:password@ep-xxxx.neon.tech/neondb?sslmode=require`).
2. Put it in `.env` as `DATABASE_URL=...`.
3. Create the tables and add the starting content (safe to run again at any time):

   ```bash
   npm run db:setup
   ```

4. Start the API and check `GET /api/health`: it should say `"database": "connected"`.

Tables: `languages`, `culture_items`, `proverbs`, `learners`, `learner_stats`, `learner_lessons`,
`learner_badges`. The schema is in `src/db/schema.sql`.

## Deploying to Railway

1. Push this repo to GitHub and create a new Railway project from it.
2. Railway detects Node and runs `npm run build` then `npm start`.
3. Add the variables `DATABASE_URL` (from Neon) and `CORS_ORIGINS` (your frontend URL, for example
   `https://your-site.netlify.app`).
4. Run `npm run db:setup:prod` once to create the tables (Railway shell, or locally with the Neon
   `DATABASE_URL` in your `.env` using `npm run db:setup`).
5. Copy the generated Railway URL into the frontend's `VITE_API_URL`.

## Project structure

```
src/
  index.ts        Server entry
  app.ts          Express app (middleware + routes)
  config.ts       Environment configuration
  routes/         languages, culture, dashboard, tutor
  services/       Business logic (tutor replies)
  data/           Content served by the API
  middleware/     404 and error handling
```

## Next steps

- Add authentication so the dashboard shows each learner's own progress.
- Replace the rule-based replies in `src/services/tutor.ts` with a real AI model.
