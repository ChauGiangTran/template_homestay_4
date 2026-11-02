import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const TARGET_DIR = "screenshots/refined";
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-small-341", width: 341, height: 700 },
];

async function preparePage(page) {
  await page.evaluate(() => {
    document.querySelectorAll("img[loading='lazy']").forEach((img) => {
      img.setAttribute("loading", "eager");
    });
  });
  await page.waitForTimeout(800);
}

async function run() {
  console.log(`Starting post-refinement capture into ${TARGET_DIR}...`);
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-gpu", "--headless=new"],
  });

  const baseUrl = "http://localhost:5173";
  const overflowIssues = [];

  for (const vp of VIEWPORTS) {
    console.log(`Testing ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await preparePage(page);

    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        hasOverflow: doc.scrollWidth > doc.clientWidth,
      };
    });

    if (overflow.hasOverflow) {
      overflowIssues.push({ viewport: vp.name, ...overflow });
      console.warn(`  [OVERFLOW DETECTED] in ${vp.name}: scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`);
    } else {
      console.log(`  [OVERFLOW PASS] in ${vp.name}: width=${overflow.clientWidth}`);
    }

    const fullPath = `${TARGET_DIR}/${vp.name}-full.png`;
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`  Saved: ${fullPath}`);

    // If mobile (<= 768px), capture mobile drawer
    if (vp.width <= 768 && vp.name === "mobile-390") {
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

    // Modal interactions on desktop-1440
    if (vp.name === "desktop-1440") {
      // Test Gallery Lightbox
      const galleryItem = await page.$('div[aria-label^="Xem ảnh lớn"]');
      if (galleryItem) {
        await galleryItem.click();
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${TARGET_DIR}/gallery-lightbox.png` });
        console.log(`  Saved: ${TARGET_DIR}/gallery-lightbox.png`);
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
      }

      // Test Room Quick Detail
      const detailBtn = await page.$('button[aria-label^="Xem chi tiết"]');
      if (detailBtn) {
        await detailBtn.click();
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${TARGET_DIR}/room-detail-modal.png` });
        console.log(`  Saved: ${TARGET_DIR}/room-detail-modal.png`);
        const closeBtn = await page.$('button[aria-label="Đóng chi tiết phòng"]');
        if (closeBtn) await closeBtn.click();
        await page.waitForTimeout(300);
      }

      // Test Booking Modal
      const bookBtn = await page.$('button:has-text("Đặt Hạng Phòng")');
      if (bookBtn) {
        await bookBtn.click();
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${TARGET_DIR}/booking-modal.png` });
        console.log(`  Saved: ${TARGET_DIR}/booking-modal.png`);
        const closeBtn = await page.$('button[aria-label="Đóng cửa sổ đặt phòng"]');
        if (closeBtn) await closeBtn.click();
        await page.waitForTimeout(300);
      }

      // Test Subpages
      const subpages = ["rooms", "about", "experiences", "gallery", "contact"];
      for (const sp of subpages) {
        console.log(`Capturing subpage /${sp}...`);
        await page.goto(`${baseUrl}/${sp}`, { waitUntil: "networkidle" });
        await preparePage(page);
        await page.screenshot({ path: `${TARGET_DIR}/page-${sp}-desktop.png`, fullPage: true });
        console.log(`  Saved: ${TARGET_DIR}/page-${sp}-desktop.png`);
      }
    }

    await context.close();
  }

  // Also capture Section by Section on Desktop 1440
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
        console.log(`  Saved section: ${secPath}`);
      }
    } catch (e) {
      console.warn(`Could not screenshot ${sec.name}:`, e.message);
    }
  }

  await ctx.close();
  await browser.close();

  console.log("\n==============================");
  console.log("REFINEMENT VERIFICATION SUMMARY");
  console.log("==============================");
  if (overflowIssues.length === 0) {
    console.log("✅ 0 Horizontal Overflow issues across all tested viewports!");
  } else {
    console.error(`❌ Found overflow in ${overflowIssues.length} viewports:`, overflowIssues);
  }
}

run().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
