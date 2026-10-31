import { chromium } from "playwright";
import fs from "fs";

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "tablet-landscape-1024", width: 1024, height: 768 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-small-341", width: 341, height: 700 },
];

const TARGET_DIR = "screenshots/refined";

async function run() {
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

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
    await page.waitForTimeout(600);

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

    // If mobile (< 1024px), capture mobile drawer
    if (vp.width <= 768) {
      const menuBtn = await page.$('button[aria-label="Mở danh mục điều hướng"]');
      if (menuBtn && (await menuBtn.isVisible())) {
        await menuBtn.click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${TARGET_DIR}/${vp.name}-mobile-menu.png` });
        console.log(`  Saved: ${TARGET_DIR}/${vp.name}-mobile-menu.png`);
        
        // close menu
        const closeBtn = await page.$('button[aria-label="Đóng danh mục"]');
        if (closeBtn) {
          await closeBtn.click();
        } else {
          await menuBtn.click();
        }
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
        await page.click('button[aria-label="Đóng chi tiết phòng"]');
        await page.waitForTimeout(300);
      }

      // Test Booking Modal
      const bookBtn = await page.$('button:has-text("Đặt Phòng Này")');
      if (bookBtn) {
        await bookBtn.click();
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${TARGET_DIR}/booking-modal.png` });
        console.log(`  Saved: ${TARGET_DIR}/booking-modal.png`);
        await page.click('button[aria-label="Đóng cửa sổ đặt phòng"]');
        await page.waitForTimeout(300);
      }

      // Test Subpages
      const subpages = ["rooms", "about", "experiences", "gallery", "contact"];
      for (const sp of subpages) {
        console.log(`Capturing subpage /${sp}...`);
        await page.goto(`${baseUrl}/${sp}`, { waitUntil: "networkidle" });
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${TARGET_DIR}/page-${sp}-desktop.png`, fullPage: true });
        console.log(`  Saved: ${TARGET_DIR}/page-${sp}-desktop.png`);
      }
    }

    await context.close();
  }

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
