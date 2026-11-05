import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({executablePath:'/usr/bin/chromium', args:['--no-sandbox']});
const page = await browser.newPage({reducedMotion:'reduce'});
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const slugs = ['napoli-burger', 'spicy-chicken', 'house-cheeseburger'];
for (const width of [390, 1880]) {
  await page.setViewportSize({width, height:width===390?844:950});
  for (const slug of slugs) {
    await page.goto(`http://127.0.0.1:5173/menu/${slug}`, {waitUntil:'networkidle'});
    const picture = page.locator('.detail-image img');
    assert.match(await picture.getAttribute('src'), new RegExp(`/pizza/${slug}\\.png$`));
    await picture.evaluate(image => image.decode());
    assert.ok(await picture.evaluate(image => image.naturalWidth > 500));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({path:`docs/${slug}-${width===390?'mobile':'desktop'}.png`});
    if (slug === 'napoli-burger') await page.screenshot({path:`docs/burger-product-${width===390?'mobile':'desktop'}.png`});
  }
  await page.goto('http://127.0.0.1:5173/menu?category=burgers', {waitUntil:'networkidle'});
  await page.locator('.product-grid').scrollIntoViewIfNeeded();
  const sources = await page.locator('.product-grid .product-image img').evaluateAll(async images => {
    await Promise.all(images.map(image => image.decode()));
    return images.map(image => image.currentSrc);
  });
  assert.equal(sources.length, 5);
  assert.equal(new Set(sources).size, 5);
  await page.screenshot({path:`docs/burger-menu-${width===390?'mobile':'desktop'}.png`});
}
assert.deepEqual(errors, []);
console.log('Verified all three new product photos on desktop/mobile and five distinct burger images in the menu; no page errors or horizontal overflow.');
await browser.close();
