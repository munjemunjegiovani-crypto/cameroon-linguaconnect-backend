import { createApp } from "./app.js";
import { config } from "./config.js";

const app = createApp();

app.listen(config.port, () => {
  console.log(`LinguaConnect API running on port ${config.port} (${config.nodeEnv})`);
  console.log(`Allowed origins: ${config.corsOrigins.join(", ")}`);
});
