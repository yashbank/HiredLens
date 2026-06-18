/**
 * Capture case-study screenshots across all three themes.
 *
 * Usage (local machine with internet access for the browser download):
 *   1. bun run build && PORT=3100 bun run start   # in one terminal
 *   2. bun add -d playwright && npx playwright install chromium
 *   3. node scripts/screenshots.mjs               # in another terminal
 *
 * Output: designs/screens/<theme>-<page>.png  (1440×900 @2x, full page)
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const THEMES = ["aurora", "porcelain", "pulse"];
const PAGES = [
  ["landing", "/"],
  ["login", "/login"],
  ["overview", "/app/overview"],
  ["keywords", "/app/keywords"],
  ["rewrites", "/app/rewrites?sample=1"],
  ["mock-interview", "/app/mock-interview"],
  ["skill-roadmap", "/app/skill-roadmap"],
  ["history", "/app/history"],
  ["settings", "/app/settings"]
];
const OUT = "designs/screens";

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
try {
  for (const theme of THEMES) {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });
    await ctx.addInitScript((t) => {
      try {
        localStorage.setItem("hiredlens-theme", t);
        localStorage.setItem("hiredlens-demo-welcome-dismissed", "1");
      } catch {
        /* ignore */
      }
    }, theme);

    const page = await ctx.newPage();
    for (const [name, path] of PAGES) {
      await page.goto(BASE + path, { waitUntil: "networkidle" });
      await page.waitForTimeout(2000); // let entrance + 3D settle
      await page.screenshot({ path: `${OUT}/${theme}-${name}.png`, fullPage: true });
      console.log("saved", `${theme}-${name}.png`);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}
