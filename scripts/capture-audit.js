import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const TARGET_DIR = "screenshots/initial_audit";
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function preparePage(page) {
  await page.evaluate(() => {
    document.querySelectorAll("img[loading='lazy']").forEach((img) => {
      img.setAttribute("loading", "eager");
    });
  });
  await page.waitForTimeout(1000);
}

async function run() {
  console.log("Launching Chromium for comprehensive audit capture...");
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-gpu", "--headless=new"],
  });

  const baseUrl = "http://localhost:5173";

  // 1. Capture Full Page across viewports
  const viewports = [
    { name: "desktop-1440", width: 1440, height: 900 },
    { name: "laptop-1280", width: 1280, height: 800 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "mobile-390", width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1.5,
    });
    const page = await ctx.newPage();
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await preparePage(page);

    const fullPath = path.join(TARGET_DIR, `${vp.name}-full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved: ${fullPath}`);
    await ctx.close();
  }

  // 2. Capture Section by Section on Desktop 1440
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const page = await ctx.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await preparePage(page);

  const sections = [
    { name: "01-header", selector: "header" },
    { name: "02-hero", selector: "section:nth-of-type(1)" },
    { name: "03-about", selector: "section:nth-of-type(2)" },
    { name: "04-rooms", selector: "#rooms" },
    { name: "05-experiences", selector: "section:nth-of-type(4)" },
    { name: "06-amenities", selector: "section:nth-of-type(5)" },
    { name: "07-gallery", selector: "section:nth-of-type(6)" },
    { name: "08-testimonials", selector: "section:nth-of-type(7)" },
    { name: "09-location", selector: "section:nth-of-type(8)" },
    { name: "10-faq", selector: "section:nth-of-type(9)" },
    { name: "11-booking-cta", selector: "section:nth-of-type(10)" },
    { name: "12-footer", selector: "footer" },
  ];

  for (const sec of sections) {
    try {
      const el = await page.$(sec.selector);
      if (el) {
        const secPath = path.join(TARGET_DIR, `section-${sec.name}.png`);
        await el.screenshot({ path: secPath });
        console.log(`Saved section: ${secPath}`);
      }
    } catch (e) {
      console.warn(`Could not screenshot ${sec.name}:`, e.message);
    }
  }

  await ctx.close();
  await browser.close();
  console.log("Audit capture finished successfully.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
