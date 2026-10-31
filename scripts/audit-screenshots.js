import { chromium } from "playwright";

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-small-341", width: 341, height: 700 },
];

const TARGET_DIR = process.argv[2] || "screenshots/initial";

async function run() {
  console.log(`Starting capture into ${TARGET_DIR}...`);
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-gpu", "--headless=new"],
  });

  const url = "http://localhost:5174/";

  for (const vp of VIEWPORTS) {
    console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);

    const fullPath = `${TARGET_DIR}/${vp.name}-full.png`;
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`  Saved: ${fullPath}`);

    // If mobile (< 768px), capture mobile menu
    if (vp.width < 768) {
      const menuBtn = await page.$('button[aria-label="Mở danh mục điều hướng"]');
      if (menuBtn && (await menuBtn.isVisible())) {
        await menuBtn.click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${TARGET_DIR}/${vp.name}-mobile-menu.png` });
        console.log(`  Saved: ${TARGET_DIR}/${vp.name}-mobile-menu.png`);
        await menuBtn.click();
        await page.waitForTimeout(200);
      }
    }

    // Modal screenshot on desktop
    if (vp.name === "desktop-1440") {
      const bookBtn = await page.$('button:has-text("Đặt Phòng Này")');
      if (bookBtn) {
        await bookBtn.click();
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${TARGET_DIR}/modal-desktop.png` });
        console.log(`  Saved: ${TARGET_DIR}/modal-desktop.png`);
        const closeBtn = await page.$('button[aria-label="Đóng cửa sổ đặt phòng"]');
        if (closeBtn) await closeBtn.click();
        await page.waitForTimeout(200);
      }
    }

    await context.close();
  }

  // Also capture /design-system page
  console.log("Capturing design system page...");
  const dsContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const dsPage = await dsContext.newPage();
  await dsPage.goto("http://localhost:5174/design-system", { waitUntil: "domcontentloaded" });
  await dsPage.waitForTimeout(800);
  await dsPage.screenshot({ path: `${TARGET_DIR}/design-system-desktop.png`, fullPage: true });
  console.log(`  Saved: ${TARGET_DIR}/design-system-desktop.png`);
  await dsContext.close();

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
