import { test, expect } from "@playwright/test";
import products from "../src/products.json" with { type: "json" };

test("every public route and product renders directly without browser errors", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of [
    "/",
    "/about",
    "/contact",
    "/menu",
    "/404",
    ...products.map((p) => `/menu/${p.slug}`),
  ]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".template-links")).toHaveCount(0);
    await expect(page.locator('a[href="/team"], .team-grid, .crew-section')).toHaveCount(0);
    await expect(page.getByText(/\b(drinks?|coffee|mocha|lemonade|cooler|shake)\b/i)).toHaveCount(0);
    await expect(
      page.getByText(
        /Get It For Free|See More Templates|Customization Service|Made in Framer/,
      ),
    ).toHaveCount(0);
    if (path.startsWith("/menu/"))
      await expect(page.locator("h1")).toHaveText(
        products.find((p) => path === `/menu/${p.slug}`).name,
      );
  }
  expect(errors).toEqual([]);
});

test("category filters support query URLs, load more, and browser history", async ({
  page,
}) => {
  await page.goto("/menu");
  await expect(page.locator(".product-grid .product-card")).toHaveCount(9);
  await page.getByRole("button", { name: "Load more", exact: true }).click();
  await expect(page.locator(".product-grid .product-card")).toHaveCount(11);
  await expect(
    page.getByRole("button", { name: "Load more", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Burgers", exact: true }).click();
  await expect(page).toHaveURL(/category=burgers/);
  await expect(page.locator(".product-grid .product-card")).toHaveCount(5);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Burgers", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Pizzas", exact: true }).click();
  await expect(page.locator(".product-grid .product-card")).toHaveCount(4);
  await page.goBack();
  await expect(
    page.getByRole("button", { name: "Burgers", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goto("/menu?category=invalid");
  await expect(
    page.getByRole("button", { name: "All", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("desktop dropdown, product links, and order enquiry work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Essentials" }).click();
  await expect(page.locator("#essentials-links")).toBeVisible();
  await expect(page.getByRole("link", { name: "Team", exact: true })).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(page.locator("#essentials-links")).toHaveCount(0);
  await page.getByRole("button", { name: "Essentials" }).click();
  await page
    .locator("#essentials-links")
    .getByRole("link", { name: "Shop", exact: true })
    .click();
  await page
    .getByRole("link", { name: "View Margherita", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("Margherita");
  await page
    .locator(".detail-copy")
    .getByRole("link", { name: "Order now", exact: true })
    .click();
  await expect(page).toHaveURL(/contact\?product=margherita#message/);
  await expect(page.getByLabel("Subject", { exact: true })).toHaveValue(
    "Order enquiry: Margherita",
  );
});

test("mobile navigation closes after route changes and with Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("About us");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("button", { name: "Essentials" }).click();
  await page
    .locator("#essentials-links")
    .getByRole("link", { name: "Shop", exact: true })
    .click();
  await expect(page.locator("h1")).toContainText("Find your");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("FAQ is keyboard accessible and toggles answers", async ({ page }) => {
  await page.goto("/about");
  const first = page.getByRole("button", { name: /How can I place an order/i });
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await first.focus();
  await page.keyboard.press("Enter");
  await expect(first).toHaveAttribute("aria-expanded", "false");
  const second = page.getByRole("button", { name: /How long does it take/i });
  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#faq-answer-1")).toBeVisible();
});

test("contact and newsletter validate and honestly report local demo outcomes", async ({
  page,
}) => {
  const posts = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("/contact");
  await page
    .getByRole("button", { name: "Send a message", exact: true })
    .click();
  await expect(page.locator(".contact-form-card [role=status]")).toHaveText("");
  await page.getByLabel("First name", { exact: true }).fill("Test");
  await page.getByLabel("Last name", { exact: true }).fill("Visitor");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.getByLabel("Subject", { exact: true }).fill("Bakery enquiry");
  await page
    .getByLabel("Message", { exact: true })
    .fill("I would like to enquire about a cake.");
  await page
    .getByRole("button", { name: "Send a message", exact: true })
    .click();
  await expect(page.locator(".contact-form-card [role=status]")).toContainText(
    "has not been sent",
  );
  await page.getByLabel("Newsletter", { exact: true }).fill("test@example.com");
  await page.getByRole("button", { name: "Subscribe to newsletter" }).click();
  await expect(page.locator(".newsletter [role=status]")).toContainText(
    "No email was sent",
  );
  expect(posts).toEqual([]);
});

test("carousel moves and reduced motion disables animations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Goodies", exact: true });
  const track = carousel.locator(".carousel-track");
  await carousel.scrollIntoViewIfNeeded();
  const initial = await track.evaluate((el) => el.scrollLeft);
  expect(initial).toBeGreaterThan(0);
  await carousel.getByRole("button", { name: "Next goodies" }).click();
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(initial);
  await carousel.getByRole("button", { name: "Previous goodies" }).click();
  await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBe(initial);
  await carousel.getByRole("button", { name: "Previous goodies" }).click();
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeLessThan(initial);
  expect(
    await page
      .locator(".marquee-track")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("assets are local, all displayed images load, and layouts stay within viewport", async ({
  page,
  baseURL,
}) => {
  test.setTimeout(60_000); // Six page templates across six viewport sizes.
  const remote = [];
  page.on("request", (r) => {
    if (
      /^https?:/.test(r.url()) &&
      !r.url().startsWith(baseURL)
    )
      remote.push(r.url());
  });
  for (const width of [320, 390, 768, 1440, 1600, 1880]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/menu",
      "/contact",
      "/about",
      "/menu/margherita",
      "/404",
    ]) {
      await page.goto(path);
      await page.evaluate(async () => {
        document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
        await Promise.all(
          [...document.images].map((i) => i.decode().catch(() => {})),
        );
        await document.fonts.ready;
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${path} at ${width}px has horizontal overflow`,
      ).toBe(true);
      await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
      expect(await page.locator("footer").evaluate(el => Math.abs(el.getBoundingClientRect().width - innerWidth))).toBeLessThan(2);
      expect(
        await page.evaluate(() =>
          [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src),
        ),
      ).toEqual([]);
    }
  }
  expect(remote).toEqual([]);
});

test("unknown paths show the custom 404 with a working home link", async ({
  page,
}) => {
  for (const path of ["/does-not-exist", "/team", "/team/"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toContainText("fresh out of reach");
    await expect(page).toHaveTitle("Page not found — Luigi’s Pizza");
  }
  await page.getByRole("link", { name: "Back to home", exact: true }).click();
  await expect(page).toHaveURL("/");
  await expect(page.locator("h1")).toContainText("Good times");
});

test("category spotlight cycles and opens the selected menu category", async ({
  page,
}) => {
  await page.goto("/");
  const stage = page.getByRole("region", { name: "Pizza categories" });
  await expect(stage.locator(".category-caption strong")).toHaveText("Pizzas");
  await stage
    .getByRole("button", { name: "Next category", exact: true })
    .click();
  await expect(stage.locator(".category-caption strong")).toHaveText("Sides");
  await stage
    .getByRole("button", { name: "Previous category", exact: true })
    .click();
  await expect(stage.locator(".category-caption strong")).toHaveText("Pizzas");
  await stage.locator(".category-caption").click();
  await expect(page).toHaveURL(/category=pizzas/);
  await expect(page.locator(".product-grid .product-card")).toHaveCount(4);
});

test("autoplay loops, pauses, and scroll effects follow motion preferences", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Goodies", exact: true });
  const track = carousel.locator(".carousel-track");
  await track.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  const initial = await track.evaluate((el) => el.scrollLeft);
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(initial + 5);
  await carousel
    .getByRole("button", { name: "Pause goodies autoplay" })
    .click();
  const paused = await track.evaluate((el) => el.scrollLeft);
  await page.mouse.move(1, 1);
  await page.evaluate(() => document.activeElement?.blur());
  await page.waitForTimeout(250);
  expect(await track.evaluate((el) => el.scrollLeft)).toBe(paused);
  const group = await track.evaluate(
    (el) => (el.firstElementChild.getBoundingClientRect().width + 20) * 5,
  );
  await track.evaluate((el, group) => (el.scrollLeft = group * 2 + 10), group);
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeLessThan(group * 2);
  const heading = page.locator(".category-section h2");
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveClass(/is-revealed/);
  await page.locator(".why-statement").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".why-statement")
        .evaluate((el) => parseFloat(el.style.getPropertyValue("--word-fill"))),
    )
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator(".why-statement")
        .evaluate((el) => el.style.getPropertyValue("--word-fill")),
    )
    .toBe("");
  expect(
    await page
      .locator(".marquee-track")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
