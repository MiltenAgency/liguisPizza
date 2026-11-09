import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
const port = process.env.PLAYWRIGHT_PORT || "5173";
const production = process.env.PLAYWRIGHT_PRODUCTION === "1";
const baseURL = `http://127.0.0.1:${port}`;
const executablePath =
  process.env.CHROMIUM_PATH ||
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  timeout: 30000,
  reporter: [["list"]],
  use: {
    baseURL,
    browserName: "chromium",
    launchOptions: { executablePath },
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
  },
  webServer: {
    timeout: 120_000,
    command: `npm run ${production ? "start" : "dev"} -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
