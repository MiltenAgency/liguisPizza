import { test, expect } from "@playwright/test";

test("pages and query parameters render before JavaScript runs", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    for (const [path, title] of [
      ["/", "Good times, great pizza"],
      ["/about", "About us"],
      ["/menu", "Our menu"],
      ["/contact", "Contact us"],
      ["/menu/margherita", "Margherita"],
    ]) {
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      await expect(page).toHaveTitle(`${title} — Luigi’s Pizza`);
    }
    await page.goto("/menu?category=pizzas");
    await expect(page.locator(".product-grid .product-card")).toHaveCount(4);
    await expect(page.getByRole("button", { name: "Pizzas", exact: true })).toHaveAttribute("aria-pressed", "true");
    await page.goto("/contact?product=margherita#message");
    await expect(page.getByLabel("Subject", { exact: true })).toHaveValue("Order enquiry: Margherita");
  } finally {
    await context.close();
  }
});

test("unknown pages return HTTP 404 and legacy products redirect", async ({ request }) => {
  for (const path of ["/does-not-exist", "/team", "/menu/unknown-pizza"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
    expect(await response.text()).toContain("fresh out of reach");
  }
  const response = await request.get("/menu/berry-bliss", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/menu/margherita");
});
